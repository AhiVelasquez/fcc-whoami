var express = require('express')
var app = express()
// var url = require('url-parse')
var moment = require('moment')
// var jquery = require('jquery')
var port = process.env.PORT || 8080

app.get('/:time', function (req, res) {
  var path = req.params.time
  var data = null
  var result = {}
  if (parseInt(path, 10)) {
    data = moment(parseInt(path, 10), 'X')
  } else {
    data = moment(path)
  }
  if (!data.isValid()) {
    result.unix = null
    result.natural = null
  } else {
    result.unix = data.format('X')
    result.natural = data.format('MMMM DD, YYYY')
  }
  res.send(JSON.stringify(result))
})
app.use(express.static('./'))
app.listen(port)
