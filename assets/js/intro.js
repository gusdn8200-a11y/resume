$(function () {
  const $overlay = $('#introOverlay');
  const $enterBtn = $('#introEnterBtn');
  if (!$overlay.length || !$enterBtn.length) return;

  let done = false;

  function finishIntro() {
    if (done) return;
    done = true;

    $overlay.removeClass('is-active').addClass('is-done').attr('aria-hidden', 'true');
    $('body').removeClass('intro-lock');

    setTimeout(function () {
      $overlay.css('display', 'none');
    }, 560);

    $(document).off('keydown.intro');
  }

  $('body').addClass('intro-lock');

  requestAnimationFrame(function () {
    $overlay.addClass('is-active').attr('aria-hidden', 'false');
  });

  $enterBtn.on('click', function (event) {
    event.preventDefault();
    finishIntro();
  });

  $(document).on('keydown.intro', function (event) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    finishIntro();
  });
});
