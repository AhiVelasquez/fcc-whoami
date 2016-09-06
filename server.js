var express = require('express')
var app = express()
var getIP = require('ipware')().get_ip
var port = process.env.PORT || 3000

app.get('/', function (req, res) {
  var useragent = req.headers
  var ip = req['X-Forwarded-For'].match(/[^::ffff:](\d+.+)/)
  var lang = useragent['accept-language'].match(/[a-zA-Z]{2}-[a-zA-Z]{1}[^;]/)
  var system = useragent['user-agent'].match(/\(([^()]+)\)/)
  var result = {}
  console.log(ip[0])
  if (!useragent) {
    result.ip = null
    result.language = null
    result.system = null
  } else {
    result.ipaddress = ip[0]
    result.language = lang[0]
    result.software = system[0].substring(1, system[0].length - 1)
  }
  res.send(JSON.stringify(result))
})

app.use(express.static('./'))
app.listen(port)
