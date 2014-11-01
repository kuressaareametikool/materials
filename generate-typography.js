var fs = require('fs')

var FeedParser = require('feedparser')
var request = require('request')
var each = require('each')

var filepath = './public/slides/typography-inspiration.md'

var file = fs.createWriteStream(filepath )

var images = []

var pat = /(http?:\/\/[\w\-\.]+\.[a-zA-Z]{2,3}(?:\/\S*)?(?:[\w])+\.(?:jpg|png|gif|jpeg))/ig

var sites = [
  {
    title: '8faces Blog',
    url: 'http://blog.8faces.com',
    rss: 'http://blog.8faces.com/rss'
  },
  {
    title: 'Incredible Types',
    url: 'http://incredibletypes.com',
    rss: 'http://feeds.feedburner.com/IncredibleTypes'
  },
  {
    title: 'Type Everything',
    url: 'http://typeverything.com',
    rss: 'http://feeds.feedburner.com/Typeverything'
  },
  {
    title: 'Myfonts Tumblr',
    url: 'myfonts.tumblr.com',
    rss: 'myfonts.tumblr.com/rss'
  },
  {
    title: 'Type Token',
    url: 'http://www.typetoken.net',
    rss: 'http://www.typetoken.net/feed'
  },
  {
    title: 'In a Brush',
    url: 'http://inabrush.com',
    rss: 'http://inabrush.com/rss'
  },
  {
    title: 'Betype',
    url: 'http://betype.co',
    rss: 'http://betype.co/rss'
  },
  {
    title: 'In a Brush',
    url: 'http://inabrush.com',
    rss: 'http://inabrush.com/rss'
  },
  {
    title: 'Typophile Gangsta',
    url: 'http://typophile-gangsta.tumblr.com/',
    rss: 'http://feeds.feedburner.com/TypophileGangsta'
  },
  {
    title: 'Typographic Posters',
    url: 'http://www.typographicposters.com/',
    rss: 'http://www.typographicposters.com/rss/thefeed.rss'
  }, 
  {
    title: 'Typographic Daily',
    url: 'http://typography-daily.com/',
    rss: 'http://feeds.feedburner.com/TypographyDaily'
  },
  
]

each(sites)
.parallel(8)
.on('item', function(el, idx, next) {

  request(el.rss, function(err, res, body) {
    next()
  })
  .pipe(new FeedParser())
  .on('readable', function() {
    var stream = this, item;
    while (item = stream.read()) {
      if (item.description) {
      var i = item.description.match(pat)
      if (i) {
      i.forEach(function(url) {
        var image = {url: url, date: item.pubdate}
        images.push(image)
      })
      }
      }
    }
  })

})
.on('end', function() {

  var output = ''
  var i = 1
  
  images = images.sort(function(a,b){
    a = new Date(a.date);
    b = new Date(b.date);
    return a<b ? 1 : a>b ? -1: 0;
  });
  
  output = '# Type Inspiration\n\n\nGenerated from:\n'
  output += sites.map(function(item) {return '[' + item.title + '](' + item.url + ')'}).join('\n') + '\n\n\n'
  
  images.forEach(function(item) {
    output += '![](' + item.url + ')\n' + 
      i++ +
      '\n' +
      '\\!\\[\\]\\(' + item.url + '\)\n<br><br>\n';
  })
  
  file.write(output)
  file.close()
  
  console.log(filepath + ' generated');

});