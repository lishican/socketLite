{
  /* <meta name=viewport content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scale=no"> */
}
let arr = [
  "1",
  "2",
  "3",
  1,
  NaN,
  NaN,
  undefined,
  undefined,
  null,
  null,
  "a",
  "b",
  "b"
];

function unqie(arr) {
  let temp = {};
  for (let i of arr) {
    temp[i]++;
  }
  return Object.keys(temp);
}

function uq2(arr) {
  return Array.from(new Set(arr));
}

function uq3(arr) {
  let temp = [];
  for (let i of arr) {
    if (temp.indexOf(i) == -1) {
      temp.push(i);
    }
  }
  return temp;
}

console.log(uq3(arr));
function isObjArr(variable) {
  if (Object.prototype.toString.call(value) === "[object Array]") {
    console.log("value是数组");
  } else if (Object.prototype.toString.call(value) === "[object Object]") {
    //这个方法兼容性好一点
    console.log("value是对象");
  } else {
    console.log("value不是数组也不是对象");
  }
}

function is(obj, type) {
  let originType = Object.prototype.toString.call(obj);
  let len = originType.length;
  let type2 = originType
    .slice(7, len - 1)
    .trim()
    .toLowerCase();
  console.log(type2);
  return type2 == type;
}

console.log(is(undefined, "date"));
// alert(Object.prototype.toString.call(a) === ‘[object String]’)-------> true;
// alert(Object.prototype.toString.call(b) === ‘[object Number]’)-------> true;
// alert(Object.prototype.toString.call(c) === ‘[object Array]’)-------> true;
// alert(Object.prototype.toString.call(d) === ‘[object Date]’)-------> true;
// alert(Object.prototype.toString.call(e) === ‘[object Function]’)-------> true;
// alert(Object.prototype.toString.call(f) === ‘[object Function]’)-------> true;
function bind(fn, context) {
  return function() {
    return fn.apply(context, arguments);
  };
}
function deviceType() {
  var ua = navigator.userAgent;
  var agent = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  ];
  for (var i = 0; i < len, (len = agent.length); i++) {
    if (ua.indexOf(agent[i]) > 0) {
      break;
    }
  }
}
deviceType();
window.addEventListener("resize", function() {
  deviceType();
});

function isWeixin() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}
