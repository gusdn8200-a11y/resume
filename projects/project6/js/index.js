(() => {
  const heroImage = document.getElementById("heroImage");
  const dotWrap = document.getElementById("heroDots");
  const dots = dotWrap ? [...dotWrap.querySelectorAll(".dot")] : [];
  const sliderFrame = heroImage?.closest(".hero-frame");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const topbar = document.querySelector(".topbar");
  const menuToggle = document.getElementById("menuToggle");
  const mainNavMenu = document.getElementById("mainNavMenu");
  const mobileMenuQuery = window.matchMedia("(max-width: 760px)");
  const fadeOutMs = reducedMotion ? 0 : 240;
  const slideIntervalMs = 5200;
  let slideIndex = 0;
  let timerId = null;
  let fadeTimerId = null;

  const setMenuState = (isOpen) => {
    if (!topbar || !menuToggle) return;
    topbar.classList.toggle("nav-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  };

  if (topbar && menuToggle && mainNavMenu) {
    menuToggle.addEventListener("click", () => {
      const shouldOpen = !topbar.classList.contains("nav-open");
      setMenuState(shouldOpen);
    });

    [...mainNavMenu.querySelectorAll("a")].forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        if (!mobileMenuQuery.matches) return;
        setMenuState(false);
      });
    });

    document.addEventListener("click", (event) => {
      if (!mobileMenuQuery.matches) return;
      if (topbar.contains(event.target)) return;
      setMenuState(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      setMenuState(false);
    });

    const handleViewportChange = () => {
      if (!mobileMenuQuery.matches) {
        setMenuState(false);
      }
    };

    if (typeof mobileMenuQuery.addEventListener === "function") {
      mobileMenuQuery.addEventListener("change", handleViewportChange);
    } else {
      mobileMenuQuery.addListener(handleViewportChange);
    }

    setMenuState(false);
  }

  const setActiveDot = (index) => {
    dots.forEach((dot, idx) => {
      const isActive = idx === index;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
    });
  };

  const preloadSlides = () => {
    dots.forEach((dot) => {
      if (!dot.dataset.src) return;
      const img = new Image();
      img.src = dot.dataset.src;
    });
  };

  const showSlide = (index, { instant = false } = {}) => {
    if (!heroImage || dots.length === 0) return;

    const nextIndex = (index + dots.length) % dots.length;
    const activeDot = dots[nextIndex];
    const nextSrc = activeDot?.dataset.src;
    const nextAlt = activeDot?.dataset.alt;
    const nextPosition = activeDot?.dataset.position || "50% 50%";
    if (!nextSrc) return;

    setActiveDot(nextIndex);
    if (slideIndex === nextIndex && heroImage.getAttribute("src") === nextSrc) return;
    slideIndex = nextIndex;

    if (instant || reducedMotion) {
      if (fadeTimerId) {
        window.clearTimeout(fadeTimerId);
        fadeTimerId = null;
      }
      heroImage.classList.remove("is-fading");
      heroImage.src = nextSrc;
      heroImage.style.objectPosition = nextPosition;
      if (nextAlt) heroImage.alt = nextAlt;
      return;
    }

    if (fadeTimerId) window.clearTimeout(fadeTimerId);
    heroImage.classList.add("is-fading");
    fadeTimerId = window.setTimeout(() => {
      heroImage.src = nextSrc;
      heroImage.style.objectPosition = nextPosition;
      if (nextAlt) heroImage.alt = nextAlt;
      window.requestAnimationFrame(() => heroImage.classList.remove("is-fading"));
      fadeTimerId = null;
    }, fadeOutMs);
  };

  const startSlider = () => {
    if (dots.length < 2) return;
    if (timerId) window.clearInterval(timerId);
    timerId = window.setInterval(() => showSlide(slideIndex + 1), slideIntervalMs);
  };

  const stopSlider = () => {
    if (!timerId) return;
    window.clearInterval(timerId);
    timerId = null;
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startSlider();
    });
  });

  if (sliderFrame) {
    sliderFrame.addEventListener("mouseenter", stopSlider);
    sliderFrame.addEventListener("mouseleave", startSlider);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopSlider();
      return;
    }

    startSlider();
  });

  preloadSlides();
  showSlide(0, { instant: true });
  startSlider();

  const filterButtons = [...document.querySelectorAll(".chip")];
  const productCards = [...document.querySelectorAll(".product-card")];
  const hoverlessQuery = window.matchMedia("(hover: none)");
  const packSizes = ["180g", "200g", "225g", "250g", "340g", "454g"];
  const originMixes = [
    "하와이 카우아이 70% · 콜롬비아 30%",
    "과테말라 55% · 브라질 45%",
    "에티오피아 60% · 코스타리카 40%",
    "하와이 코나 40% · 페루 60%",
    "케냐 50% · 콜롬비아 50%",
    "브라질 65% · 엘살바도르 35%",
    "코스타리카 45% · 과테말라 55%",
  ];
  const processTypes = [
    "Washed",
    "Natural",
    "Honey",
    "Swiss Water Decaf",
    "Semi-Washed",
    "Anaerobic Natural",
  ];
  const roastProfiles = ["Light-Medium", "Medium", "Medium-Dark", "Dark"];

  const createMeta = (index) => ({
    size: packSizes[(index * 5 + 2) % packSizes.length],
    origin: originMixes[(index * 3 + 1) % originMixes.length],
    process: processTypes[(index * 4 + 2) % processTypes.length],
    roast: roastProfiles[(index * 2 + 1) % roastProfiles.length],
    lot: `KA-${2026 + (index % 2)}-${String(18 + index).padStart(2, "0")}`,
  });

  const setupProductFlipCards = () => {
    productCards.forEach((card, index) => {
      if (card.querySelector(".product-card-inner")) return;

      const front = document.createElement("div");
      front.className = "product-face product-front";
      [...card.children].forEach((child) => front.appendChild(child));

      const name = front.querySelector(".product-copy h3")?.textContent?.trim() || `Selection ${index + 1}`;
      const flavor =
        front.querySelector(".product-copy p")?.textContent?.trim() ||
        "향미 노트는 시즌별로 변동될 수 있습니다.";
      const meta = createMeta(index);

      const back = document.createElement("div");
      back.className = "product-face product-back";
      back.innerHTML = `
        <p class="meta-eyebrow">Island Lot Memo</p>
        <h3>${name}</h3>
        <ul class="product-meta" aria-label="${name} 상세 정보">
          <li><span>용량</span><strong>${meta.size}</strong></li>
          <li><span>원산지</span><strong>${meta.origin}</strong></li>
          <li><span>가공</span><strong>${meta.process}</strong></li>
          <li><span>로스팅</span><strong>${meta.roast}</strong></li>
          <li><span>LOT</span><strong>${meta.lot}</strong></li>
        </ul>
        <p class="meta-note">${flavor}</p>
      `;

      const inner = document.createElement("div");
      inner.className = "product-card-inner";
      inner.append(front, back);
      card.append(inner);

      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `${name} 카드 정보 뒤집기`);
    });
  };

  const closeFlippedCards = () => {
    productCards.forEach((card) => card.classList.remove("is-flipped"));
  };

  setupProductFlipCards();

  productCards.forEach((card) => {
    card.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        card.classList.remove("is-flipped");
        card.blur();
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.classList.toggle("is-flipped");
      }
    });

    card.addEventListener("click", (event) => {
      if (!hoverlessQuery.matches) return;
      event.preventDefault();

      const shouldFlip = !card.classList.contains("is-flipped");
      closeFlippedCards();
      if (shouldFlip) {
        card.classList.add("is-flipped");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!hoverlessQuery.matches) return;
    const clickedInsideCard = productCards.some((card) => card.contains(event.target));
    if (clickedInsideCard) return;
    closeFlippedCards();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      closeFlippedCards();

      productCards.forEach((card) => {
        const matched = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !matched);
      });
    });
  });

  const recommendMap = {
    calm: {
      nutty: ["Signature Estate", "고소하고 차분한 밸런스 중심"],
      floral: ["Garden Bloom", "은은한 꽃향으로 집중이 길게 이어짐"],
      choco: ["Moonlight Decaf", "카페인 부담 적고 부드러운 초콜릿 톤"],
    },
    bright: {
      nutty: ["Sunset House Blend", "상큼함 위에 고소한 단맛이 올라옴"],
      floral: ["Aloha Morning", "과일향 중심으로 아침 기분 전환에 적합"],
      choco: ["Kauai Classic", "밝지만 무게감 있는 데일리 컵"],
    },
    deep: {
      nutty: ["Royal Kona Dark", "묵직한 바디와 긴 여운"],
      floral: ["Island Breeze", "강도는 유지하면서 향은 화사하게"],
      choco: ["Volcanic Roast", "다크초콜릿 계열의 진한 피니시"],
    },
  };

  const moodSelect = document.getElementById("moodSelect");
  const aromaSelect = document.getElementById("aromaSelect");
  const recommendBtn = document.getElementById("recommendBtn");
  const recommendResult = document.getElementById("recommendResult");

  if (recommendBtn && moodSelect && aromaSelect && recommendResult) {
    recommendBtn.addEventListener("click", () => {
      const mood = moodSelect.value;
      const aroma = aromaSelect.value;
      const picked = recommendMap[mood]?.[aroma];

      if (!picked) {
        recommendResult.innerHTML = "<p>조건을 다시 선택해 주세요.</p>";
        return;
      }

      recommendResult.innerHTML = `
        <p><strong>추천 원두: ${picked[0]}</strong></p>
        <p>${picked[1]}</p>
      `;
    });
  }

  const newsletter = document.querySelector(".newsletter");
  if (newsletter) {
    newsletter.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailInput = newsletter.querySelector("input[type='email']");
      if (!emailInput || !emailInput.value.trim()) return;
      emailInput.value = "";
      window.alert("Aloha! 뉴스레터 구독이 접수되었습니다.");
    });
  }

  const revealElements = [...document.querySelectorAll(".reveal")];
  if ("IntersectionObserver" in window && revealElements.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -20px 0px" }
    );

    revealElements.forEach((section) => observer.observe(section));
  } else {
    revealElements.forEach((section) => section.classList.add("show"));
  }
})();
