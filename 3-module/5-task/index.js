function getMinMax(str) {
  let arr = str.split(' ').map((item) => Number(item));
  let min = 0;
  let max = 0;
  for (let item of arr) {
    if (item > max){
      max = item;
    }
    if (item < min){
      min = item;
    }
  }
  return {
    min: min,
    max: max
  };
}
