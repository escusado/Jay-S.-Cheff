recepie = [
  {
    a:'download',
    p:{url:'https://github.com/daneden/Toast/raw/master/reset.css', local:'css/reset.css'}
  },
  {
    a:'download',
    p:{url:'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js', local:'js/jquery.js'}
  },
  {
    a:'download',
    p:{url:'http://underscorejs.org/underscore.js', local:'js/underscore.js'}
  },
  {
    a:'download',
    p:{url:'https://github.com/azendal/neon/raw/master/neon.js', local:'js/neon.js'}
  },  
  { 
    a:'write',
    p:{filename: 'js/script.coffee', content: "\/\/Author: Toily\ninstance = new Project $('.project')"}
  },
  { 
    a:'write', 
    p:{filename: 'js/Project.coffee', content: "Class 'Project' (\n  prototype :\n    init : (element) ->\n      \n        )()\n"}
  },
  { 
    a:'write', 
    p:{filename: '/css/style.styl', content: ".project\n  background-color: red;\n"}
  },
  { 
    a:'write', 
    p:{filename: 'index.html', content: '<!DOCTYPE HTML>\n<html lang="en-US">\n<head>\n  <meta charset="UTF-8">\n  <title>My project</title>\n\n<link rel="stylesheet" type="text/css" href="style.css" media="all">\n\n  <!-- libs -->\n  <script type="text/javascript" src="js/jquery.js"></script>\n  <script type="text/javascript" src="js/underscore.js"></script>\n  <script type="text/javascript" src="js/neon.js"></script>\n\n  <!-- src -->\n  <script type="text/javascript" src="js/Project.js"></script>\n  <script type="text/javascript" src="js/script.js"></script>\n\n\n</head>\n<body>\n  \n</body>\n</html>\n\n\n\n<div class="container-fluid">'}
  } 
  // { 
  //   a:'mkdir',
  //   p:{foldername: 'css' }
  // }
];

//dependencies
var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var request = require('request');

//config
var newJaySCheffName = 'Jay S. Cheff';

var JaySCheff = {

    init: function(recepie){
      console.log(newJaySCheffName+': '+'Hi there, Im here to assist');

      var i = 0;

      next = function(){
        fileActions[recepie[i].a](recepie[i].p, function(){
          i++;
          if( i === recepie.length){
            console.log('Thankyou for choosing us, now exiting!');
            return false;
          }
          next();
        });
      };

      next();

    //   fileActions.write('css/test.k', 'jejejejejeje');
    // //   fileActions.mkdir('css');
    //   fileActions.download("http://code.jquery.com/jquery.min.js", function() {
    //     console.log('callbacksuccesfiull');
    //   });
    }

};


//Util

var fileActions = {

    write: function(params, callback) {
      var filename = params.filename
      var content  = params.content
      
      //check for path
      var path = filename.replace(/[^\/]*$/, '');
      if(path.length>0){
        this.mkdir({
          foldername: path
        });
      }

      fs.writeFile(filename, content, function(err) {
          if(err) {
              console.log(newJaySCheffName+': '+err);
          } else {
              console.log(newJaySCheffName+': '+filename+' file created!');
              if (callback && typeof(callback) === "function") {callback();}
          }
      }); 
    },

    mkdir: function(params, callback) {
      fs.mkdir(params.foldername, function(err) {
          if(err) {
              console.log(newJaySCheffName+': '+err);
          } else {
              console.log(newJaySCheffName+': '+params.foldername+' folder was created!');
              if (callback && typeof(callback) === "function") {callback();}
          }
      });
    },

    download: function (params,callback) {
      var fileUrl   = params.url;
      var localFile = params.local;

      var options = {
          host: url.parse(fileUrl).host,
          port: 80,
          path: url.parse(fileUrl).pathname
      };

      this.write({
        filename: localFile
      });

      request(fileUrl,function(e,r,b){
        if (callback && typeof(callback) === "function") {callback();}
      }).pipe(fs.createWriteStream(localFile));

      // var file = fs.createWriteStream(localFile);
      
      // request.get(fileUrl, function(error, res, body) {
      //     console.log(newJaySCheffName+': '+localFile + ' file downloaded!');
      //     if (callback && typeof(callback) === "function") {callback();}
      //     // res.on('data', function(data) {
      //     //         file.write(data);
      //     //         console.log(newJaySCheffName+':  downloading '+fileUrl+': '+file.bytesWritten);
      //     //     }).on('end', function() {
      //     //         file.end();
      //     //         console.log(newJaySCheffName+': '+localFile + ' file downloaded!');
      //     //         if (callback && typeof(callback) === "function") {callback();}
      //     //     }).on('error',function(err){
      //     //         console.log(err);
      //     //     });
      //     });
    }

};

JaySCheff.init(recepie);