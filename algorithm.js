// 冒泡算法
let testArr = [10, 5, 20, 45, 30, 20, 400];
function Bubble(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

// 快速排序法
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pIndex = Math.floor(arr.length / 2);
  let pEle = arr.splice(pIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pEle) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat([pEle], quickSort(right));
}

function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      let lastGuard = arr[i];
      let j = i - 1;
      arr[i] = arr[j];
      while (j >= 0 && lastGuard < arr[j]) {
        arr[j - 1] = arr[j];
        j--;
      }
      arr[j + 1] = lastGuard;
    }
  }
  return arr;
}

// 二分查找法
function binarySearch(data, target, start1, end1) {
  let start = start1 || 0;
  let end = end1 || data.length - 1;
  let mid = Math.floor((start + end) / 2);
  console.log(start, end, data[mid]);
  if (target == data[mid]) {
    return target;
  }
  if (data[mid] > target) {
    return binarySearch(data, target, 0, mid - 1);
  } else {
    return binarySearch(data, target, mid + 1, end);
  }
  return false;
}

console.log("Bubble", Bubble(testArr));
console.log("quickSort", quickSort(testArr));
console.log("insertSort", insertSort(testArr));
console.log("binarySearch", binarySearch(testArr, 10));
