let io = require('socket.io-client');
export function socket($rootScope) {
  let socket = io.connect();
  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    }
  };
  // return {
  //   on: function (eventName, callback) {
  //     socket.on(eventName, ()=> {  
  //       let args = arguments;
  //       $rootScope.$apply(()=> {
  //         callback.apply(socket, args);
  //       });
  //     });
  //   },
  //   emit: function(eventName, data, callback) {
  //     socket.emit(eventName, data, ()=> {
  //       let args = arguments;
  //       $rootScope.$apply(()=> {
  //         if(callback) {
  //           callback.apply(socket, args);
  //         }
  //       });
  //     });
  //   }
  // };
}