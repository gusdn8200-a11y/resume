$(function () {
  // =========================
  // 1) Slide hover tilt
  // =========================
  const $slides = $(".carousel-slide");

  $slides.each(function () {
    const slideEl = this;
    const visual = $(slideEl).find(".carousel-visual img").get(0);
    if (!visual) return; // ✅ 이미지 없으면 이 슬라이드는 스킵

    let rafId = null;
    let lastX = 0;
    let lastY = 0;

    const onMove = (e) => {
      const rect = slideEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 중심 기준 -1 ~ 1 정규화
      const nx = (x / rect.width) * 2 - 1;
      const ny = (y / rect.height) * 2 - 1;

      // 회전값(살짝만)
      lastX = (-ny * 8); // rotateX
      lastY = (nx * 8);  // rotateY

      // ✅ requestAnimationFrame으로 부드럽게 (mousemove 과부하 방지)
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        visual.style.transform = `rotateX(${lastX}deg) rotateY(${lastY}deg)`;
        rafId = null;
      });
    };

    const onLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      visual.style.transform = "rotateX(0deg) rotateY(0deg)";
    };

    $(slideEl).on("mousemove", onMove);
    $(slideEl).on("mouseleave", onLeave);
  });

  // =========================
  // 2) Slider arrows
  // =========================
  const $track = $(".carousel-track");
  const $slideItems = $(".carousel-slide");
  const $prevBtn = $("[data-carousel-prev]");
  const $nextBtn = $("[data-carousel-next]");

  if ($track.length && $slideItems.length) {
    let index = 0;
    let autoTimer = null;

    const getGap = () => {
      const raw = $track.css("column-gap") || $track.css("gap") || "0";
      const value = parseFloat(raw);
      return Number.isNaN(value) ? 0 : value;
    };

    const getStep = () => {
      const first = $slideItems.get(0);
      if (!first) return 0;
      return first.getBoundingClientRect().width + getGap();
    };

    const getMaxIndex = () => {
      const step = getStep();
      const trackEl = $track.get(0);
      const parentEl = $track.parent().get(0);
      const maxOffset = Math.max(0, trackEl.scrollWidth - parentEl.clientWidth);
      const maxIndex = step > 0 ? Math.floor(maxOffset / step) : 0;
      return { maxIndex, maxOffset, step };
    };

    const update = () => {
      const { maxIndex, maxOffset, step } = getMaxIndex();
      index = Math.min(index, maxIndex);
      const offset = Math.min(index * step, maxOffset);
      $track.css("transform", `translateX(${-offset}px)`);

      $prevBtn.prop("disabled", offset <= 0);
      $nextBtn.prop("disabled", offset >= maxOffset - 1);
    };

    const move = (dir) => {
      const { maxIndex } = getMaxIndex();
      index = index + dir;
      if (index > maxIndex) index = 0;
      if (index < 0) index = maxIndex;
      update();
    };

    $prevBtn.on("click", () => move(-1));
    $nextBtn.on("click", () => move(1));

    $(window).on("resize", update);
    update();

    autoTimer = setInterval(() => {
      move(1);
    }, 3000);
  }

  // =========================
  // 3) Menu overlay open/close
  // =========================
  const $openBtn = $("[data-menu-toggle]");
  const $overlay = $("#menuPanel");

  const toggleMenu = () => {
    const $html = $("html");
    const isOpen = $html.hasClass("is-menu-open");
    $html.toggleClass("is-menu-open");
    if ($overlay.length) $overlay.attr("aria-hidden", isOpen ? "true" : "false");
  };

  const closeMenu = () => {
    $("html").removeClass("is-menu-open");
    if ($overlay.length) $overlay.attr("aria-hidden", "true");
  };

  $openBtn.on("click", toggleMenu);

  $overlay.on("click", (e) => {
    if (e.target === $overlay.get(0)) closeMenu();
  });

  $(".menu-item").on("click", closeMenu);

  $(window).on("keydown", (e) => {
    if (e.key === "Escape" && $("html").hasClass("is-menu-open")) {
      closeMenu();
    }
  });

  // =========================
  // 4) Story image parallax
  // =========================
  const $featuredItems = $(".story-item");

  if ($featuredItems.length) {
    $(window).on("scroll", () => {
      const vh = window.innerHeight;

      $featuredItems.each(function () {
        const item = this;
        const image = $(item).find(".story-media").get(0);
        if (!image) return;

        const rect = item.getBoundingClientRect();

        // 높이가 100vh여도 동작하도록 고정 범위로 진행률 계산 (빠르게)
        const range = vh * 0.8;
        const progress = Math.min(Math.max((vh - rect.top) / range, 0), 1);

        // 초반 40% 구간은 왼쪽에 고정, 이후 오른쪽으로 이동
        const hold = 0.3;
        const moveProgress = Math.min(Math.max((progress - hold) / (1 - hold), 0), 1);
        const translateX = moveProgress * 30;
        const direction = item.dataset.direction === "reverse" ? -1 : 1;

        image.style.setProperty("--box-shift", `${translateX * direction}vw`);
      });
    });
  }

  // =========================
  // 4-1) Side character reveal
  // =========================
  const floatHosts = document.querySelectorAll(".float-host");

  if (floatHosts.length && "IntersectionObserver" in window) {
    const floatObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-active", entry.isIntersecting);
        });
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -15% 0px",
      }
    );

    floatHosts.forEach((section) => floatObserver.observe(section));
  } else {
    floatHosts.forEach((section) => section.classList.add("is-active"));
  }

  // =========================
  // 5) Lineup hover preview
  // =========================
  const $items = $(".lineup-item");
  const $preview = $("#lineupPreview");

  if (!$items.length || !$preview.length) return;

  let currentSrc = $preview.attr("src") || "";

  const setActive = (item) => {
    $items.each(function () {
      $(this).toggleClass("is-current", this === item);
    });
  };

  const setPreview = (src) => {
    if (!src || src === currentSrc) return;
    currentSrc = src;

    // 페이드 아웃 -> 교체 -> 페이드 인
    $preview.css("opacity", "0.2");
    setTimeout(() => {
      $preview.attr("src", src);
      $preview.css("opacity", "1");
    }, 120);
  };

  $items.each(function () {
    const item = this;
    const src = item.dataset.img;

    $(item).on("mouseenter", () => {
      setActive(item);
      setPreview(src);
    });

    // 키보드 접근성(탭으로 포커스 시에도 변경)
    $(item).on("focus", () => {
      setActive(item);
      setPreview(src);
    });

    // 클릭해도 고정되게 하고 싶으면 유지
    $(item).on("click", () => {
      setActive(item);
      setPreview(src);
    });
  });
});
