const config  = require('./config'),
      restify = require('restify'),
      mysql = require('mysql'),
      contactsRoutes = require('./routes/contacts.server.route')
      
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
var mv = require('mv');
      
var connection = config.db.get;

/**
 * Initialize Server
 */
const server = restify.createServer({
    name    : config.name,
    version : config.version,
    url : config.hostname
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// server.use('/api', contactsRoutes);

const apiURL = '/api/'

//rest api to get all results
server.get(apiURL, function (req, res) {
   return res.end('API Working!');
});

server.get(apiURL + 'contacts', function (req, res) {
   connection.query('SELECT * FROM contacts', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

server.get(apiURL + 'contacts/:id', function (req, res) {
   connection.query('SELECT * FROM contacts WHERE id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

server.post(apiURL + 'contacts', function (req, res, next) {
  
  var postData = req.body;
  var newPath = null
  
  //TODO Create checks for image
  
  // create new path for uploaded file
  if (req.files.image) {
    const nameArr = req.files.image.type.split('/')
    const extension = nameArr[nameArr.length - 1]
    var file = req.files.image;
    var img_name=file.name;
    newPath = `uploads/${img_name}_${new Date().getTime()}.${extension}`;
    
    // NPM Module to help store files
    mv(file.path, newPath, {
      mkdirp: true
    }, function(err, result) {
      if(err) {
        throw err;
      } else {
        return result
      }
    });
  }
  
  var params = [postData.first_name, postData.last_name, postData.phone_number, newPath] // callback function in query below must be second
  connection.query('INSERT INTO contacts SET first_name=?, last_name=?, phone_number=?, image=?', params, function (error, results, fields) {
     
	  if (error) throw error;
    connection.query('SELECT * FROM contacts WHERE `id`= LAST_INSERT_ID()', function (error, results, fields) {
      res.end(JSON.stringify(results));
    })
	});
});

server.put(apiURL + 'contacts', function (req, res) {
  var newPath = req.body.image
  
  //TODO Create checks for image
  
  // create new path for uploaded file
  if (req.files.image) {
    const nameArr = req.files.image.type.split('/')
    const extension = nameArr[nameArr.length - 1]
    var file = req.files.image;
    var img_name=file.name;
    newPath = `uploads/${img_name}_${new Date().getTime()}.${extension}`;
    
    // NPM Module to help store files
    mv(file.path, newPath, {
      mkdirp: true
    }, function(err, result) {
      if(err) {
        throw err;
      } else {
        return result
      }
    });
  }
  
  const params = [req.body.first_name, req.body.last_name, req.body.phone_number, newPath, req.body.id]
   connection.query('UPDATE contacts SET first_name=?, last_name=?, phone_number=?, image=? WHERE id=?', params, function (error, results, fields) {
	  if (error) throw error;
    connection.query('SELECT * FROM contacts WHERE `id`=?', req.body.id, function (error, results, fields) {
      res.end(JSON.stringify(results));
    })
	});
});

server.del(apiURL + 'contacts/:id/*', function (req, res) {
   connection.query('DELETE FROM `contacts` WHERE `id`=?', [req.params.id], function (error, results, fields) {
    
    if (error) throw error;
    
    // Remove photo from disk
    var fs = require('fs');
    var filePath = req.params['*']; 
    fs.unlink(filePath, function(err) {
      if(err){
        console.log(err);
      }
    });
    
    res.end(JSON.stringify(results));
  });
});

server.get('/uploads/*', restify.plugins.serveStatic({
  directory: __dirname,
  default: 'index.html'
}))

server.listen(3001, function () {
  console.log('%s listening at %s', server.name, server.url);
});