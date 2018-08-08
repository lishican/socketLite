import aes from "./aesUtil";
// https://github.com/joewalnes/reconnecting-websocket
const ReconnectingWebSocket = window.ReconnectingWebSocket;
class socketHandle {
  constructor(options) {
    this.options = options;
    this.ws = null;
    this.key = "";
    this.heatTimer = null;
    this.calls = [];
    this.connected = false;
    this.closeCount = 0;
    this.readyFuns = [];
    this.connect();
  }
  connect() {
    let that = this;
    this.ws = new ReconnectingWebSocket(this.options.url, null, {
      debug: true,
      timeoutInterval: this.options.timeoutInterval || 3000,
      maxReconnectAttempts: this.options.maxReconnect,
      maxReconnectInterval: this.options.maxReconnectInterval || 3000,
      reconnectInterval: this.options.reconnectInterval || 1000,
      automaticOpen: true
    });

    this.ws.onopen = () => {
      console.log("socket onopen ");
      this.startHeart();
      this.emit("connected", {});
    };
    this.ws.onconnecting = () => {
      console.log("reconnecting...");
      this.stopHeart();
    };
    this.ws.onmessage = evt => {
      that.handleMessage(evt.data);
    };
    this.ws.onerror = () => {
      console.log("socket error");
      this.emit("error", {});
    };
    this.ws.onclose = () => {
      console.log("socket close");
      this.closeCount++;
      this.stopHeart();
      this.emit("close", {});
      this.connected = false;

      if (this.closeCount >= this.options.maxReconnect) {
        this.emit("illegal", { msg: "illegal id" });
        this.connected = false;
        this.ws.close();
      }
    };
  }
  getSocket() {
    return this.ws;
  }
  stopHeart() {
    this.heatTimer && clearInterval(this.heatTimer);
  }
  startHeart() {
    this.heatTimer && clearInterval(this.heatTimer);
    this.heatTimer = setInterval(() => {
      this.ws.send("ping");
    }, 5000);
  }
  handleMessage(data) {
    if (data == "pong") {
      return;
    } else if (data.length == 44) {
      let body = JSON.parse(data);
      this.key = body.key;
      this.emit("ready", body);
      this.connected = true;
      this.ready.apply(this);

      if (this.closeCount < 1) {
        for (let i = 0; i < this.readyFuns.length; i++) {
          this.readyFuns[i].call(this);
        }
        this.readyFuns = [];
      }
    } else {
      let body = aes.webDecrypt(aes.decrypt(data, this.key));
      if (body.data.instructions) {
        console.log("receive:[" + body.data.instructions + "] ==>", body);
        this.emit(body.data.instructions, body);
      }
      this.emit("message", body);
    }
  }
  offAll() {
    this.calls = [];
  }
  off(evtName) {
    this.calls = this.calls.filter(v => v.name != evtName);
  }
  close() {
    this.ws && this.ws.close();
  }
  ready(fn) {
    if (this.connected) {
      fn && fn();
    } else {
      fn && this.readyFuns.push(fn);
    }
  }
  sendCmd(instruction, data) {
    this.ready(() => {
      let msg = aes.webEncrypt({
        instructions: instruction,
        ...data
      });

      let body = aes.encrypt(msg, this.key);
      console.log(
        "send: [" + instruction + "] ==>",
        { instructions: instruction, ...data } || {}
      );
      this.ws && this.ws.send(body);
    });
  }
  send(data) {
    this.ready(() => {
      let msg = aes.webEncrypt(data);
      let body = aes.encrypt(msg, this.key);
      this.ws && this.ws.send(body);
    });
  }
  emit(evt) {
    let args = [].slice.call(arguments, 1);
    let match = this.calls.filter(v => v.name == evt);
    match.forEach(v => {
      v["fn"].apply(this, args);
    });
  }
  on(evt, fn) {
    let handle = { name: evt, fn: fn };
    this.calls.push(handle);
  }
}

export default socketHandle;
