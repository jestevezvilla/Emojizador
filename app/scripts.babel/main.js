chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    var spans = [],
        txt = '',
        emoji = '',
        sentences = 0;

    $('.givemeagif').remove();
    $('body').blast({ delimiter: 'sentence' });

    spans = $('span.blast');

    nextgif(sentences);

    function nextgif(next){

      if(next > spans.length-1){
        return;
      }

      txt = spans.eq(next).text();

      if(txt.split(' ').length > 10){

        $.getJSON('//api.giphy.com/v1/gifs/translate?s='+txt+'&api_key=dc6zaTOxFJmzC', function(response){

          var img = new Image();
          spans.eq(next).append(img);
          spans.eq(next).css({'display': 'block', 'text-decoration': 'underscore'});
          $(img).addClass('givemeagif').css({'width': '100%', 'display': 'block', 'margin': '1em auto'});
          img.src = response.data.images.fixed_width.url;
          nextgif(sentences++);

        });
      }else{
        nextgif(sentences++);
      }

    }

});
