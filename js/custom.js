$(document).ready(function() {
  /**
   * Tooltip settings.
   */
  $('[data-toggle="tooltip"]').tooltip({
    'placement': 'top'
  });

  $('body').addClass('js');

  /**
   * The main demo contact form.
   */
  // Handling the ajax form submission
  var demo_form = $('.demo-form');
  var thank_you_message = '<div class="demo-form__thanks"><h2 class="demo-form_thanks-title">Thank you!</h2><p class="lead">We will be in touch shortly to schedule a demo. We\'re looking forward to meeting you and learning more about your project!</p><span class="demo-form__thanks-check">Information sent<img src="/images/checkmark.png" /></span></div>';
  // Our callback for after the form is submitted.
  function form_submitted() {
    demo_form.addClass('was-submitted');
    $('#demo .row-padded').fadeOut(200, function() {
      $(this).html(thank_you_message).fadeIn(200);
    });
  };
  demo_form.submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: '//formspree.io/tugboat@lullabot.com',
      method: 'POST',
      data: $(this).serialize(),
      dataType: 'json',
      beforeSend: function() {
        console.log('Sending...');
      },
      success: function(data) {
        form_submitted();
      },
      error: function(error) {
        console.log(error);
      }
    });
  });

  /**
   * Toggle active state for containers around the forms. We
   * use this to add a border.
   */
  $('input, textarea', demo_form)
    .bind('focus', function() {
     $(this).parent().addClass('is-active');
    })
    .bind('focusout', function() {
      $(this).parent().removeClass('is-active');
    });


  /**
   * Pauses Vimeo video when the user closes the lightbox
   */

  var iframe = document.getElementById('video');

  // $f == Froogaloop
  var player = $f(iframe);

  var pauseButton = document.getElementById("close-video-button");
  pauseButton.addEventListener("click", function() {
    player.api("pause");
  });


  /**
   * Nyan cat nonsense
   */

  var posX = 100, posY = 100, px = 0, py = 0, an = false;
  var nyan = $('.nyan');
  var rainbow = null;
  var altura = 800;
  var largura = parseInt($('body').width());
  var tamanhoTela = parseInt(largura/9);
  var pilha = [];

  function getRandomInt(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }

  $(document).on('mousemove', function( event ) {
    posX = event.pageX;
    posY = event.pageY;
  })

  for(var i = 0; i < tamanhoTela; i++)
  {
    var rain = $('<div class="rainbow"/>').css('left', i*9+'px');
    $('body').append(rain);
  }
  rainbow = $('.rainbow');

  function criarEstrela()
  {
    var rand = getRandomInt(3, 14);
    var tempoDeVida = getRandomInt(5,10);
    var star = $('<div class="star"/>').css({
      width:rand+'px',
      height:rand+'px',
      left: largura-10+'px',
      top: Math.floor((Math.random()*altura)+1),
      '-webkit-transition': 'all '+tempoDeVida+'s linear',
      '-webkit-transform': 'translate(0px, 0px)'
    });
    $('body').append(star);

    window.setTimeout(function(){
      star.css({
        '-webkit-transform': 'translate(-'+largura+'px, 0px)'
      });
    }, getRandomInt(5,10)*10);

    window.setTimeout(function(){star.remove();}, tempoDeVida*1000);
  }

  function moveNyan()
  {
    var tamX = nyan.width()/2,
      tamY = nyan.height()/2;
    px += (posX - px - tamX) / 50;
    py += (posY - py - tamY) / 50;

    nyan.css({
      left: px + 'px',
      top: py + 'px'
    });
  }
  function peidaArcoIris()
  {
    var qnt = Math.floor(nyan.position().left/9)+2;

    if(pilha.length >= qnt) pilha.pop();

    pilha.unshift(py);

    rainbow.hide();
    for(var i = 0; i < qnt; i++)
    {
      var am = (i%2);
      if(an) am = (i%2) ? 0 : 1 ;

      rainbow.eq(qnt-i).css({top: pilha[i]+am}).show();
    }
  }

  window.setInterval(function(){
    moveNyan();
    peidaArcoIris();
  }, 10);

  window.setInterval(function(){ criarEstrela(); }, 300);

  window.setInterval(function(){ an = !an; }, 500);

  var frame = 0;
  window.setInterval(function(){
    nyan.css({'background-position': 34*frame+'px'});
    frame++;
  }, 100);

});


