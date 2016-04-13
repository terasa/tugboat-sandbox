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
});
