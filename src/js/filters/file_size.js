export function fileSize() {
  return function(value, type) {
    let fixed = 2;
    for (let i = 4; i >= 0; i--) {
      let test = value / Math.pow(1024, i);
      if(test > 1) {
        if(!i) {
          fixed = 0;
        }
        if(type == 'size') {
          return test.toFixed(fixed) + ' ';
        }
        if(type == 'units') {
          return i;
        }
      }
    }

  };
}