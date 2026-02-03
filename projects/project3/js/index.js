$(function () {
  var $scroller = $("#websiteScroll");
  var $topTrack = $("#marqueeTop");
  var $bottomTrack = $("#marqueeBottom");

  // ✅ 원본 HTML 백업 (리사이즈 때 되돌릴 용도)
  var baseTopHTML = $topTrack.html();
  var baseBottomHTML = $bottomTrack.html();

  // ✅ marquee: 트랙 길이가 충분해질 때까지 복제
  function duplicateMarqueeToFill($track) {
    var baseHTML = $track.html();

    // 기본 2배
    $track.html(baseHTML + baseHTML);

    // 화면 폭 기준으로 충분히 길게
    var targetWidth = $(window).width() * 2.2;
    var safety = 0;

    // jQuery로 scrollWidth 접근 (DOM 값이지만 접근만 통일)
    while ($track.prop("scrollWidth") < targetWidth && safety < 12) {
      $track.html($track.html() + baseHTML);
      safety++;
    }
  }

  function rebuildMarquee() {
    $topTrack.html(baseTopHTML);
    $bottomTrack.html(baseBottomHTML);

    duplicateMarqueeToFill($topTrack);
    duplicateMarqueeToFill($bottomTrack);
  }

  // ✅ 퀵메뉴 클릭 시 중앙 스크롤(#websiteScroll) 안에서 부드럽게 이동
  function setupQuickMenuScroll() {
    $(document).on("click", ".quickMenu__link[href^='#']", function (e) {
      e.preventDefault();

      var id = $(this).attr("href").replace("#", "");
      var $target = $("#" + id);
      if (!$target.length) return;

      // 중앙 스크롤 컨테이너 기준으로 목표 위치 계산
      var top =
        $target.offset().top -
        $scroller.offset().top +
        $scroller.scrollTop() -
        8;

      $scroller.stop(true).animate({ scrollTop: top }, 350);
    });
  }

  // ✅ 어디서 휠 굴려도 중앙 스크롤로 라우팅
  function setupWheelRoutingToCenter() {
    $(window).on("wheel", function (e) {
      // deltaY는 원본 이벤트에서 가져와야 함 (표준 값)
      var oe = e.originalEvent;
      var deltaY = (oe && oe.deltaY) ? oe.deltaY : 0;

      // 휠 이벤트가 중앙 스크롤 안에서 발생했는지 체크
      var $target = $(e.target);
      var inside = $target.closest("#websiteScroll").length > 0;

      if (!inside) {
        e.preventDefault();
        $scroller.scrollTop($scroller.scrollTop() + deltaY);
      }
    });
  }

  // ✅ 이미지 슬라이더: 3초마다 한 칸씩 이동
  function setupImageSlider() {
    var $sliderWrap = $(".imageSlider");
    var $slider = $sliderWrap.find("ul");
    if (!$slider.length) return;

    var slideIndex = 0;
    var timer = null;

    function getSlideWidth() {
      var $first = $sliderWrap.find("li").first();
      return $first.length ? $first.outerWidth(true) : 0;
    }

    function moveSlider() {
      var slideWidth = getSlideWidth();
      if (!slideWidth) return;

      slideIndex++;

      // 최대 이동 가능 거리 계산 (DOM scrollWidth 대신 jQuery prop)
      var maxTranslate = $slider.prop("scrollWidth") - $sliderWrap.width();
      var nextTranslate = slideIndex * slideWidth;

      if (nextTranslate >= maxTranslate) {
        slideIndex = 0;
      }

      $slider.css("transform", "translateX(-" + (slideIndex * slideWidth) + "px)");
    }

    // 기존 타이머 있으면 제거(안전)
    if (timer) clearInterval(timer);
    timer = setInterval(moveSlider, 3000);

    // 리사이즈 때도 부드럽게 유지하려면 외부에서 transform reset 함
  }

  // ✅ 초기 실행
  rebuildMarquee();
  setupQuickMenuScroll();
  setupWheelRoutingToCenter();
  setupImageSlider();

  // ✅ 리사이즈 디바운스
  var resizeTimer = null;
  $(window).on("resize", function () {
    if (resizeTimer) clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function () {
      rebuildMarquee();
      $(".imageSlider ul").css("transform", "translateX(0)");
    }, 120);
  });
});
