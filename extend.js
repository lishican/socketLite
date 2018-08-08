function a() {
  this.name = "张三";
}
a.prototype.getName = function() {
  return this.name;
};

var instance = new a();
console.log(instance.getName());

// 组合
function a() {
  this.colors = ["red", "blue", "green"];
}
function b() {
  a.call(this); //继承了a
}
b.prototype = new a();
b.prototype.constructor = b;
console.log(new b().colors);
function beget(obj) {
  // 生孩子函数 beget：龙beget龙，凤beget凤。

  var F = function() {};

  F.prototype = obj;

  return new F();
}

function Super() {
  // 只在此处声明基本属性和引用属性

  this.val = 1;

  this.arr = [1];
}

//  在此处声明函数

Super.prototype.fun1 = function() {};

Super.prototype.fun2 = function() {};

//Super.prototype.fun3...

function Sub() {
  Super.call(this); // 核心

  // ...
}

// var proto = beget(Super.prototype); // 核心
var proto = Object.create(Super.prototype); // 核心

proto.constructor = Sub; // 核心

Sub.prototype = proto; // 核心

var sub = new Sub();

console.log(sub.fun1);
