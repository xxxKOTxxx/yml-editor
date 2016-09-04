'use strict';
var express = require('express');
var io = require('socket.io');
var path = require("path");
var http = require('http');
var url = require('url');
var sax = require('sax');
var fs = require('fs');

var app = express();
var server = http.createServer(app);
var socket = io.listen(server);

var appRoot = path.join(__dirname, 'www');

app.use(express.static(appRoot));
app.set('view engine', 'html');
app.get('/', function (req, res) {
  res.render('/www/index');
});

var default_options = {
  trim: true,           // Boolean. Whether or not to trim text and comment nodes.
  normalize: true,      // Boolean. If true, then turn any whitespace into a single space.
  lowercase: true,     // Boolean. If true, then lowercase tag names and attribute names in loose mode, rather than uppercasing them.
  xmlns: true,          // Boolean. If true, then namespaces are supported.
  position: false,      // Boolean. If false, then don't track line/col/position.
  strictEntities: false  // Boolean. If true, only parse predefined XML entities (&amp;, &apos;, &gt;, &lt;, and &quot;)
};

var strict = true;
var options = default_options;

var processUrl = function (settings) {
  var start_timestamp = new Date().getTime();
  var filename = 'result/' + start_timestamp + '.xml';
  var Url = settings.url;
  var prefix_check = 'http';
  var prefix = 'http://';
  if(Url.substr(0, prefix_check.length) !== prefix_check) {
      Url = prefix + Url;
      settings.url = Url;
  }
  var postfix = '.xml';
  if(Url.substr(Url.length - postfix.length) !== postfix) {
      Url += postfix;
      settings.url = Url;
  }
console.log('Url',Url);
  var req = http.get(Url, function(responce) {
console.log('responce',responce.statusCode);
    if(responce.statusCode == 200) {
      socket.emit('run', {
        status: 'started'
      });
console.error('filename',filename);
      var printer = fs.createWriteStream(filename, {flags: 'w'});
      printer.on('finish', function() {
console.error('Запись выполнена успешно.');
      });
      function print(string) {
        printer.write(string);
      }
      var saxStream = sax.createStream(strict, options);
      responce.pipe(saxStream);

      var is_self_closing = false;
      var is_url = false;

      if(settings.remove_code) {
console.log('remove_code!');
        var is_model = false;
      }

      if(!settings.minification) {
        var level = 0;
        var tab_width = 2;
        var is_prev_close_tag = false;
      }

      function setIndent(direction = 0) {
        if(direction < 0) {
          level--;
          if(!is_prev_close_tag) {
            return false;
          }
        }
        var indent = '\n';
        for (var i = level; i > 0; i--) {
          for (var j = tab_width; j > 0; j--) {
            indent += ' ';
          }
        }
        if(direction > 0) {
          level++;
        }
        print(indent);
      }

      function errorHandler(error) {
        console.error('Error', error);
        throw error;
      }
      saxStream.on('onerror', errorHandler);

      function entity(string) {
        return string;
        string = string.split('"').join('&quot;')
                       .split("'").join('&apos;')
                       .split('<').join('&lt;')
                       .split('>').join('&gt;')
                       .split('&').join('&amp;');
        return string;

      }
      function fixCamelcase(string) {
        var postfix_id = 'Id';
        if(string.length > 4 && string.substr(string.length - postfix_id.length) == postfix_id.toLowerCase()) {
          string = string.substr(0, string.length - postfix_id.length) + postfix_id;
        }
        return string;
      }
      function processingInstructionHandler(data) {
        var string = '<?' + data.name + ' ' + data.body + '?>';
        print(string);
      }
      saxStream.on('processinginstruction', processingInstructionHandler);

      function doctypeHandler(data) {
        setIndent();
        var string = '<!DOCTYPE' + data + '>';
        print(string);
      }
      saxStream.on('doctype', doctypeHandler);

      function openTagHandler(data) {
        if(settings.remove_code) {
          is_model = (data.name == 'model')? true : false;
        }

        is_url = (data.name == 'url')? true : false;

        if(!settings.minification) {
          is_prev_close_tag = false;
          setIndent(1);
        }
        var tag_name = fixCamelcase(data.name);
        var string = '<' + tag_name;
        if(data.attributes) {
          for(var attribute in data.attributes) {
            var name = fixCamelcase(attribute);
            string += ' ' + name + '="' + entity(data.attributes[attribute].value) + '"';
          }
        }
        if(data.isSelfClosing) {
          string += '/';
          is_self_closing = true;
        }
        string += '>';
        print(string);
      }
      saxStream.on('opentag', openTagHandler);

      function textHandler(data) {
        var string = data;
        if(settings.remove_code && is_model) {
          var string_array = string.split(',~(');
          string = string_array[0];
        }
        if(is_url) {
          string = entity(string);
        }
        print(string);
      }
      saxStream.on('text', textHandler);

      function closeTagHandler(data) {
        if(!settings.minification) {
          setIndent(-1);
          is_prev_close_tag = true;
        }
        if(is_self_closing) {
          is_self_closing = false;
          return;
        }
        var tag_name = fixCamelcase(data);
        var string = '</' + tag_name + '>';
        print(string);
      }
      saxStream.on('closetag', closeTagHandler);


      function cdataHandler(data) {
        setIndent();
        var string = '<![CDATA[' + data + ']]>';
        print(string);
      }
      saxStream.on('cdata', cdataHandler);

      function commentHandler(data) {
        setIndent();
        var string = '<!-- ' + data + ' -->';
        print(string);
      }
      saxStream.on('comment', commentHandler);

      saxStream.on('end', function() {
console.log('END');
        printer.end();
        var finish_timestamp = new Date().getTime();
        var total_time = finish_timestamp - start_timestamp;
console.log('total_time: '+total_time);
        var minutes = Math.floor(total_time / 60000);
        var seconds = Math.ceil(total_time % 60000 / 1000);
console.log(minutes+' minutes '+seconds+' seconds');
      });


    }
    else {
      socket.emit('error', {
        error: responce.statusCode
      });
    }
  });
  req.end();
}



socket.on('connection', function(socket) {
console.log('new connection');

  socket.on('process', function(data) {
console.log('process!');
    processUrl(data);
  });
});

server.listen(3000, function () {
  console.log('Server started on port 3000!');
});
