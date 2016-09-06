var express = require('express')
var app = express()
var port = process.env.PORT || 3000

app.get('/', function (req, res) {
  var useragent = req.headers
  var ip = req.headers.host
  var lang = useragent['accept-language'].match(/[a-zA-Z]{2}-[a-zA-Z]{1}[^;]/)
  var system = useragent['user-agent'].match(/\(([^()]+)\)/)
  var result = {}
  console.log(req.connection.remoteAddress)
  if (!useragent) {
    result.ip = null
    result.language = null
    result.system = null
  } else {
    result.ipaddress = ip
    result.language = lang[0]
    result.software = system[0].substring(1, system[0].length - 1)
  }
  res.send(JSON.stringify(result))
})

app.use(express.static('./'))
app.listen(port)
