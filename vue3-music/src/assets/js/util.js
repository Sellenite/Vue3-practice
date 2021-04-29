// 经典随机算法
export const shuffle = (source) => {
  const arr = Array.prototype.slice.call(source);
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomNumber(0, i);
    swap(arr, i, j);
  }
  return arr;
}

// 获取最小，最大值区间中的随机数
function getRandomNumber(min = 0, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

// 交换数组数据
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}