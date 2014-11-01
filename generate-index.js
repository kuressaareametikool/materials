var fs = require('fs')
var path = require('path')

var glob = require("glob")

var filepath = './public/slides/index.md'

glob('**/*.md', {cwd: './public/slides'}, function (err, files) {

  var output = ''
  files.forEach(function(file) {
    output += (path.basename(file) !== 'index.md') ? '[' + file + '](' + file + ')\n\n' : ''
  })

  fs.writeFileSync(filepath, output)
  console.log(filepath + ' generated');

})



