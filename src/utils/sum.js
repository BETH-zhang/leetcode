export const sum1 = (arr) => {
  var len = arr.length;
  if(len == 0){
    return 0;
  } else if (len == 1){
    return arr[0];
  } else {
    return arr[0] + sum1(arr.slice(1));
  }
}

export const sum2 = (arr) => {
  var s = 0;
  for (var i=arr.length-1; i>=0; i--) {
    s += arr[i];
  }
  return s;
}

export const sum3 = (arr) => {
  return arr.reduce(function(prev, curr, idx, arr){
    return prev + curr;
  });
}

export const sum4 = (arr) => {
  var s = 0;
  arr.forEach(function(val, idx, arr) {
    s += val;
  }, 0);
  
  return s;
}

export const sum5 = (arr) => {
  return eval(arr.join("+"));
}