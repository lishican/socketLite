### sokcet lite

```
socket.send(data)
socket.sendCmd(instructions,data)
关闭socket
socket.close()
取消某个事件
socket.off(evtName)
取消全部事件
socket.offAll(evtName)

获取原生socket对象
socket.getSocket()

 事件监听
socket.on(evt,fn)
[evt] message error ready instructions
 mounted() {
    this.socket.on("message", data => {
      console.log(data);
    });
    this.socket.on("close", () => {
      console.log("close");
    });
    this.socket.on("ready", data => {
      console.log("index here");
      console.log("登陸成功");
    });
     this.socket.on('0x5b',data=>{
         console.log(data)
     })
    this.socket.sendCmd('0x5b',{name:lishican})
    this.socket.send({instructions:"0x5b",name:lishican})
}
```
