
  button.btn(ng-click="settings.send()") GO
  
  function send() {
    console.log('send');
    socket.emit('process', 'test');
  }

  socket.on('process_run', function(data) {
    console.log('status', data);
  });

  this.send = send;
