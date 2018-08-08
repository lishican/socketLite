let socket = new socketHandle({
  url: "ws:/127.0.0.1:8081/websocket/" + uid,
  maxReconnect: 3,
  reconnectInterval: 2000,
  timeoutInterval: 2000,
  maxReconnectInterval: 4000,
  heartInfo: "ping"
});
