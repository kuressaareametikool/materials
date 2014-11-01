var backboneRouter = Backbone.Router.extend({
    
  routes: {
    ':slide/slideshow' : 'slideShow',
    ':slide' : 'slideList',
    '' : 'front'
  },

  front: function() {
    
    $('body').removeAttr('class').removeAttr('style')
    
    $.get('/slides/index.md', function(data) {

    	var content = marked(data, {breaks: true})
        .replace(/href=\"/g, 'href=\"#/')

      $('.wrapper').html(
        Mustache.render($('#index').html(), {content: content})
      )

    }, 'text')

  },

  slideList: function(slide) {
    
    $('body').removeAttr('class').removeAttr('style')

    $.get('/slides/' + slide, function(data) {

      var y = 0;
      
      var content = marked(data, {breaks: true})
        .replace(/href/g, 'target="_blank" href')
      
      $('.wrapper').html(
        Mustache.render($('#slides').html(), {slide: slide, content: content})    
      )
      
    }, 'text')

  },

  slideShow: function(slide) {
      
    $.get('/slides/' + slide, function(data) {
      
      var slides = []
      var x = 0
      
      var data = data
        .split('\n\n\n')
        .map(function(item) { 
          return marked(item, {breaks: true})
        })
        .map(function(item) {
          return item.replace(/href/g, 'target="_blank" href')
        })
        .forEach(function(item) {
          slides.push({slide: item, x: x += 1500})
        })
        
      $('.wrapper').html(
        Mustache.render($('#slideshow').html(), {slide: slide, slides: slides})    
      )

      impress().init()
     // impress().goto(0)
      
    }, 'text')

  }

})


var router = new backboneRouter();
Backbone.history.start();