export class XlsxToJsonService {
  constructor() {
    this.read_as_binary_string = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";
  }

  getData(file) {
    let read_as_binary_string = this.read_as_binary_string;
    let fixData = this._fixData;
    let toJson = this._toJson;
    let reader = new FileReader();
    return new Promise(function(resolve, reject) {
      reader.onload = function(event) {
        let event_data = event.target.result;
        let data;
        if(read_as_binary_string) {
          data = XLSX.read(event_data, {type: 'binary'});
        }
        else {
          var data_arrray = fixData(event_data);
          data = XLSX.read(btoa(data_arrray), {type: 'base64'});
        }
        let result = JSON.stringify(toJson(data), 2, 2);
        resolve(result);
      };
      if(read_as_binary_string) {
        reader.readAsBinaryString(file);
      }
      else {
        reader.readAsArrayBuffer(file);
      }
    });
  }

  _fixData(data) {
    var o = "", l = 0, w = 10240;
    for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
    o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
    return o;
  }

  _toJson(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
      var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
      if(roa.length > 0){
        result[sheetName] = roa;
      }
    });
    return result;
  }
}

