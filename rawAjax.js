function createXHR() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else {
    // 兼容IE5和IE6
    return new ActiveXObject("Microsoft.XMLHttp");
  }
}

var xhr = createXHR();
xhr.onReadyStateChange = function() {
  if (xhr.readyState == 4) {
    // 状态码为200至300之间或304都表示这一请求已经成功
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      console.log(xhr.responseText);
    } else {
    }
  }
};
// GET
xhr.open("GET", url);
xhr.send();

// POST
xhr.open("POST", url);
xhr.send(data);
