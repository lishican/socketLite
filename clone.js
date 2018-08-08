function clone(obj) {
  if (obj == null || typeof obj !== "object") return obj;

  let newObj = null;

  // 时间对象有特殊性
  if (obj.constructor === Date) {
    newObj = new obj.constructor(obj);
  } else {
    obj.constructor();
  }

  for (let key in Object.getOwnPropertyDescriptors(obj)) {
    newObj[key] = clone(obj[key]);
  }
  return newObj;
}

function deepCompare(a, b) {
  if (
    a === null ||
    typeof a !== "object" ||
    b === null ||
    typeof b !== "object"
  ) {
    return a === b;
  }

  const propsA = Object.getOwnPropertyDescriptors(a);
  const propsB = Object.getOwnPropertyDescriptors(b);
  if (Object.keys(propsA).length !== Object.keys(propsB).length) {
    return false;
  }

  return Object.keys(propsA).every(key => deepCompare(a[key], b[key]));
}

function throttle(fn, delay) {
  delay = delay || 50;
  let statTime = 0;
  return function() {
    statTime === 0 && fn.apply(arguments);
    let currentTime = new Date();
    if ((currentTime = statTime > delay)) {
      fn.apply(arguments);
      statTime = currentTime;
    }
  };
}

function debounce(fn, delay) {
  delay = delay || 50;
  let timer = null;
  return function() {
    let self = this;
    clearTimeout(timer);
    timer = setTimeout(fn.bind(self, arguments), delay);
  };
}

Function.prototype._bind = function(context) {
  let self = this;
  let args_1 = [].prototype.slice.call(arguments, 1);
  return function() {
    let args_2 = [].prototype.slice.call(arguments);
    let args = args_1.concat(args_2);
    return this.apply(context, args);
  };
};

function flat(ary) {
  return ary.toString().split(",");
}
function shallowClone(o) {
  const obj = {};
  for (let i in o) {
    obj[i] = o[i];
  }
  return obj;
}
const clone = parent => {
  // 维护两个储存循环引用的数组
  const parents = [];
  const children = [];

  const _clone = parent => {
    if (parent === null) return null;
    if (typeof parent !== "object") return parent;

    let child, proto;

    if (isType(parent, "Array")) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, "RegExp")) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, "Date")) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent);
      // 利用Object.create切断原型链
      child = Object.create(proto);
    }

    // 处理循环引用
    const index = parents.indexOf(parent);

    if (index != -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index];
    }
    parents.push(parent);
    children.push(child);

    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i]);
    }

    return child;
  };
  return _clone(parent);
};
// JS 采用 IEEE 754 双精度版本（64位
for (i = 0, len = str.length; i < len; i++) {
  charCode = str.charCodeAt(i);
  if (charCode <= 0x007f) {
    total += 1;
  } else if (charCode <= 0x07ff) {
    total += 2;
  } else if (charCode <= 0xffff) {
    total += 3;
  } else {
    total += 4;
  }
}
