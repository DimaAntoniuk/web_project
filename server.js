var express = require('express')
var bodyParser = require('body-parser')
var mongoClient = require('mongodb').MongoClient
var server = express()
var port = 3000

server.use('/', express.static('.'))
server.use(bodyParser.json())

var url = "mongodb://localhost:27017"

server.get('/fans_appeal', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      throw err
    }

    var dbo = db.db("web_project")
    var result = dbo.collection("fans_appeal").find().toArray().then((data) => {
      res.send(data)
    })
    db.close()
  })
})

server.post('/fans_appeal', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      throw err
    }

    if (req.body.length != 0) {
      var dbo = db.db("web_project")
      dbo.collection("fans_appeal").insert(req.body, (err, res) => {
        if (err) throw err
        db.close()
      })
    }
  })
  res.send()
})

server.get('/news', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      throw err
    }

    var dbo = db.db("web_project")
    var result = dbo.collection("news").find().toArray().then((data) => {
      res.send(data)
    })
    dbo.collection("news").deleteMany({})
    db.close()
  })
})

server.post('/news', (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      throw err
    }

    if (req.body.length != 0) {
      var dbo = db.db("web_project")
      dbo.collection("news").insert(req.body, (err, res) => {
        if (err) throw err
        db.close()
      })
    }
  })
  res.send()
})

server.listen(port, function (error) {
    if(error) {
        console.log('Somthing went wrong', error)
    } else {
        console.log('Server is listening on port', port)
    }
})
