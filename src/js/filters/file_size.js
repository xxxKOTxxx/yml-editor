export function fileSize() {
  return function(value) {
    let sizes = [
      {
        power: 0,
        units: 'bytes'
      },
      {
        power: 1,
        units: 'KiB'
      },
      {
        power: 2,
        units: 'MiB'
      },
      {
        power: 3,
        units: 'GiB'
      },
      {
        power: 4,
        units: 'TiB'
      }
    ];
    let sizes_length = sizes.length;
    let fixed = 2;
    for (let i = sizes_length - 1; i >= 0; i--) {
      let test = value / Math.pow(1024, sizes[i].power);
      if(test > 1) {
        if(!i) {
          fixed = 0;
        }
        return test.toFixed(fixed) + ' ' + sizes[i].units;
      }
    }

  }
}