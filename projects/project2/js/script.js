/* eslint-disable no-undef */
(() => {
  // ---------------------------
  // Data (여기 이미지/타이틀 바꾸면 됨)
  // ---------------------------
  const items = [
    {
      idx: "001",
      title: "101 LIP CONDITONER",
      image: "./img/001.png",
      detailTitle: "LA NUIT",
      detailSub: "lip conditioner 101(립 컨디셔너 101)",
      detailDesc: "시간과 성별의 경계를 넘어, 모든 입술을 위한 정제된 포뮬러. 시어버터와 망고씨버터의 풍부한 영양을 시작으로, 메도우폼·해바라기씨·코코넛·달맞이꽃·아보카도·아르간·동백씨 오일이 정교하게 어우러져, 자연에서 얻은 9가지 핵심 성분의 에너지가 입술 깊숙이 수분과 윤기를 채웁니다. 자연의 숨결과 과학의 정교함이 교차하는 순간, 입술은 고요하게 빛나는 본연의 품격을 되찾습니다.",
      detailSlides: ["./img/s1_1.jpg", "./img/s1_2.jpg", "./img/s1_3.jpg"]
    },
    {
      idx: "002",
      title: "102 LIP CONDITONER",
      image: "./img/002.png",
      detailTitle: "LA NUIT",
      detailSub: "lip conditioner 102(립 컨디셔너 102)",
      detailDesc: "시간과 성별의 경계를 넘어, 모든 입술을 위한 정제된 포뮬러. 시어버터와 망고씨버터의 풍부한 영양을 시작으로, 메도우폼·해바라기씨·코코넛·달맞이꽃·아보카도·아르간·동백씨 오일이 정교하게 어우러져, 자연에서 얻은 9가지 핵심 성분의 에너지가 입술 깊숙이 수분과 윤기를 채웁니다. 자연의 숨결과 과학의 정교함이 교차하는 순간, 입술은 고요하게 빛나는 본연의 품격을 되찾습니다.",
      detailSlides: ["./img/s2_1.jpg", "./img/s2_2.jpg", "./img/s2_3.jpg"]
    },
    {
      idx: "003",
      title: "103 LIP CONDITONER",
      image: "./img/003.png",
      detailTitle: "LA NUIT",
      detailSub: "lip conditioner 103(립 컨디셔너 103)",
      detailDesc: "테디와 블코의 만남 감성과 품격이 교차하는 순간. 블코의 정제된 포뮬러와 테디의 따뜻한 감성이 만나, 선물의 의미를 섬세하게 확장합니다. 시간이 머무는 듯한 질감, 은은한 향, 그리고 고요한 여운까지 — 이번 협업은 단순한 립 케어를 넘어, 감각과 감정이 조화를 이루는 예술적 경험으로 완성됩니다. 자연스러운 유연함 속에 머무는 감각. 시어버터와 자연에서 얻은 오일 블렌딩이 입술을 부드럽게 감싸며 깊은 보습과 탄력을 채워줍니다. 테디의 따뜻한 무드가 더해진 감각적인 디자인은, 하나의 립밤을 ‘감정이 머무는 오브제’로 완성합니다. 시간이 흐를수록 입술은 더 부드럽고, 더 빛나는 아름다움으로 이어집니다.",
      detailSlides: ["./img/s3_1.jpg", "./img/s3_2.jpg", "./img/s3_3.jpg"]
    },
    {
      idx: "004",
      title: "201 LIP ESSENCE",
      image: "./img/004.png",
      detailTitle: "LA NUIT",
      detailSub: "lip essence 201(립 에센스 201)",
      detailDesc: "프랑스 세더마의 보르피린이 전하는 탄력의 에너지와, 시어버터와 자연에서 얻은 7가지 오일 블렌딩이 만나 입술에 깊은 보습과 유연한 윤기를 더합니다. 풍부한 영양이 입술을 부드럽게 감싸며 수분의 결을 고요히 잠그고, 시간이 지나도 흐트러지지 않는 볼륨과 매끄러움을 되살립니다. 자연의 순수함과 과학의 정밀함이 교차하는 그 순간, 입술은 한층 더 탄탄하고 우아한 빛으로 완성됩니다.",
      detailSlides: ["./img/s4_1.jpg", "./img/s4_2.jpg", "./img/s4_3.jpg"]
    },
    {
      idx: "005",
      title: "202 LIP ESSENCE",
      image: "./img/005.png",
      detailTitle: "LA NUIT",
      detailSub: "lip essence 202(립 에센스 202)",
      detailDesc: "프랑스 세더마의 보르피린이 전하는 탄력의 에너지와, 시어버터와 자연에서 얻은 7가지 오일 블렌딩이 만나 입술에 깊은 보습과 유연한 윤기를 더합니다. 풍부한 영양이 입술을 부드럽게 감싸며 수분의 결을 고요히 잠그고, 시간이 지나도 흐트러지지 않는 볼륨과 매끄러움을 되살립니다. 자연의 순수함과 과학의 정밀함이 교차하는 그 순간, 입술은 한층 더 탄탄하고 우아한 빛으로 완성됩니다.",
      detailSlides: ["./img/s5_1.jpg", "./img/s5_2.jpg", "./img/s5_3.jpg"]
    },
    {
      idx: "006",
      title: "301 VWGAN LIP BALM",
      image: "./img/006.png",
      detailTitle: "LA NUIT",
      detailSub: "vegan lip balm 301(비건 립 밤 301)",
      detailDesc: "입술에 닿는 순간, 자연이 응축된 식물성 포뮬러가 부드럽게 녹아듭니다. 샤인머스캣·청사과·매실·그린 파파야에서 얻은 *내추럴 필링 콤플렉스가 각질을 정돈하고, 식물에서 얻은 레티놀의 정수인 바쿠치올이 자극 없이 탄력과 매끄러운 윤기를 되살립니다. 시어버터와 7가지 식물성 블렌딩 오일이 수분을 감싸듯 잠그어 풍부한 보습을 지속시키며, 머스크와 바닐라 앰버의 은은한 잔향이 시간마저 머무는 고요한 아름다움을 완성합니다.",
      detailSlides: ["./img/s6_1.png", "./img/s6_2.png"]
    },
    {
      idx: "007",
      title: "301 VWGAN LIP BALM(비건)",
      image: "./img/007.png",
      detailTitle: "LA NUIT",
      detailSub: "vegan lip balm 301(비건 립 밤 301)",
      detailDesc: "블코와 테디의 만남 감성과 품격이 교차하는 순간. 블코의 정제된 포뮬러와 테디의 따뜻한 감성이 만나, 선물의 의미를 섬세하게 확장합니다. 시간이 머무는 듯한 질감, 은은한 향, 그리고 고요한 여운까지 — 이번 협업은 단순한 립 케어를 넘어, 감각과 감정이 조화를 이루는 예술적 경험으로 완성됩니다. 입술 위에 머무는 정제된 따스함. 부드럽게 녹아드는 텍스처가 즉각적인 보습과 은은한 윤기를 선사하며, 클래식한 디자인 속에 테디의 감성을 담아 일상의 루틴을 특별한 의식으로 바꿔줍니다. 섬세하고 우아한 한 번의 터치로, 입술은 고요히 빛나는 자신만의 품격을 드러냅니다.",
      detailSlides: ["./img/s7_1.png", "./img/s7_2.png",]
    },
    {
      idx: "008",
      title: "302 LIP TINTED BALM",
      image: "./img/008.png",
      detailTitle: "LA NUIT",
      detailSub: "lip tinted balm 302(립 틴티드 밤 302)",
      detailDesc: "블코의 첫 발색 제품으로 자연 성분으로 케어 기능성과 시그니쳐 향 및 색조 임상 연구 개발 중입니다.",
      detailSlides: ["./img/s8_1.png", "./img/s8_2.png",]
    }
  ];

  // ---------------------------
  // DOM
  // ---------------------------
  const stage = document.getElementById("app");
  const listEl = document.getElementById("items");
  const pixiHost = document.getElementById("pixi");
  const previewWrap = document.getElementById("preview");
  const previewFallback = document.getElementById("fallback");
  const detailText = document.getElementById("detail");
  const detailTitle = document.getElementById("dTitle");
  const detailSub = document.getElementById("dSub");
  const detailDesc = document.getElementById("dDesc");
  const detailSlider = document.getElementById("gallery");
  let detailSlides = [];
  let detailSlideTimer = null;
  let detailSlideIndex = 0;
  const pixiEnabled = typeof window.PIXI !== "undefined" && window.location.protocol !== "file:";

  function updateFallback(index) {
    if (!previewFallback) return;
    const item = items[index];
    previewFallback.src = item?.image || "";
    previewFallback.alt = item?.title || "Preview";
  }

  function renderDetail(index) {
    const item = items[index];
    if (!item) return;
    if (detailTitle) detailTitle.textContent = item.detailTitle || "";
    if (detailSub) detailSub.textContent = item.detailSub || item.title || "";
    if (detailDesc) detailDesc.textContent = item.detailDesc || "";
    if (detailSlider) {
      detailSlider.innerHTML = "";
      detailSlides = (item.detailSlides || []).map((src, i) => {
        const img = document.createElement("img");
        img.className = `slide${i === 0 ? " active" : ""}`;
        img.src = src;
        img.alt = `Detail slide ${i + 1}`;
        detailSlider.appendChild(img);
        return img;
      });
    }
  }

  // floating petals (main page ambience)
  function createPetals(count = 18) {
    const field = document.createElement("div");
    field.className = "petal-field";
    stage.appendChild(field);

    for (let i = 0; i < count; i += 1) {
      const petal = document.createElement("span");
      petal.className = "petal";
      const size = 8 + Math.random() * 12;
      const left = Math.random() * 100;
      const delay = Math.random() * 10;
      const dur = 14 + Math.random() * 10;
      const drift = -120 + Math.random() * 240;
      const alpha = 0.75 + Math.random() * 0.25;

      petal.style.setProperty("--size", `${size}px`);
      petal.style.setProperty("--delay", `${delay}s`);
      petal.style.setProperty("--dur", `${dur}s`);
      petal.style.setProperty("--drift", `${drift}px`);
      petal.style.setProperty("--alpha", `${alpha}`);
      petal.style.left = `${left}vw`;

      field.appendChild(petal);
    }
  }

  createPetals(28);

  // ---------------------------
  // Build list
  // ---------------------------
  const frag = document.createDocumentFragment();
  items.forEach((it, i) => {
    const row = document.createElement("div");
    row.className = "item";
    row.dataset.index = String(i);
    const [code, ...rest] = it.title.split(" ");
    const rawName = rest.join(" ");
    const isVegan = rawName.includes("(비건)");
    const name = rawName.replace("(비건)", "<span class=\"vegan\">(비건)</span>");
    if (isVegan) row.classList.add("vegan");

    row.innerHTML = `
      <div class="title">
        <span class="code">${code}</span>
        <span class="name">${name}</span>
      </div>
    `;
    frag.appendChild(row);
  });
  listEl.appendChild(frag);

  const rows = Array.from(listEl.querySelectorAll(".item"));

  function layoutCircular() {
    const count = rows.length || 1;
    const rect = listEl.getBoundingClientRect();
    const radius = Math.min(rect.width, rect.height) * 0.32;
    const zRadius = radius * 1.1;
    const step = (Math.PI * 2) / count;

    rows.forEach((row, i) => {
      const offset = i - currentIndex;
      const angle = offset * step;
      const y = Math.sin(angle) * radius;
      const z = Math.cos(angle) * zRadius;
      const x = Math.cos(angle) * 18;
      const depthScale = 0.78 + ((z + zRadius) / (zRadius * 2)) * 0.4;
      row.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) translateZ(${z}px) scale(${depthScale})`;
      row.style.opacity = i === currentIndex ? "1" : String(0.2 + ((z + zRadius) / (zRadius * 2)) * 0.55);
      row.style.zIndex = String(100 - Math.abs(offset));
    });
  }

  // ---------------------------
  // PIXI (wavy image)
  // ---------------------------
  let app = null;
  let imageSprite = null;
  let centerSprite = () => {};
  let loadTexture = async () => null;

  if (pixiEnabled && pixiHost) {
    app = new PIXI.Application({
      resizeTo: pixiHost,
      backgroundAlpha: 0,
      antialias: true
    });
    pixiHost.appendChild(app.view);

    const resizeObserver = new ResizeObserver(() => {
      app.renderer.resize(pixiHost.clientWidth, pixiHost.clientHeight);
      centerSprite();
    });
    resizeObserver.observe(pixiHost);

    // Create a "noise texture" canvas for displacement
    function createNoiseCanvas(size = 256) {
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d");
      const img = ctx.createImageData(size, size);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      return c;
    }

    const noiseCanvas = createNoiseCanvas(256);
    const noiseTex = PIXI.Texture.from(noiseCanvas);
    const dispSprite = new PIXI.Sprite(noiseTex);
    dispSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    dispSprite.scale.set(2.0);

    const displacementFilter = new PIXI.DisplacementFilter(dispSprite);
    displacementFilter.scale.set(0, 0);

    app.stage.addChild(dispSprite);

    // Main image sprite
    imageSprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    imageSprite.anchor.set(0.5);
    app.stage.addChild(imageSprite);

    // Disable blur/distortion effect
    app.stage.filters = [];

    // Keep image fully visible inside the host area
    function fitSpriteContain(sprite, w, h) {
      const tex = sprite.texture;
      if (!tex?.valid) return;
      const tw = tex.width;
      const th = tex.height;
      const scale = Math.min(w / tw, h / th);
      sprite.scale.set(scale);
    }

    centerSprite = () => {
      imageSprite.x = app.renderer.width / 2;
      imageSprite.y = app.renderer.height / 2;
      fitSpriteContain(imageSprite, app.renderer.width, app.renderer.height);
    };

    // Build a fallback texture so every item shows an image even if remote loads fail.
    function createPlaceholderTexture(label, index) {
      const size = 900;
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d");
      const palette = [
        ["#f9d9d9", "#c61f1f"],
        ["#d7ecff", "#2b61ff"],
        ["#d9f6ec", "#0b8a6b"],
        ["#f3e9d9", "#8a5a2b"],
        ["#e9e1ff", "#5c38d1"]
      ];
      const [bg, accent] = palette[index % palette.length];
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = accent;
      ctx.fillRect(0, size * 0.62, size, size * 0.38);
      ctx.fillStyle = "#111";
      ctx.font = "700 56px ui-sans-serif, system-ui, -apple-system, sans-serif";
      ctx.fillText(label || "IMAGE", 60, size * 0.7);
      return PIXI.Texture.from(c);
    }

    // load image texture safely
    loadTexture = (url, { label, index }) => new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(PIXI.Texture.from(img));
      img.onerror = () => resolve(createPlaceholderTexture(label, index));
      img.src = url;
    });

    // animate wavy continuously + subtle rotation
    let t = 0;
    app.ticker.add((delta) => {
      t += 0.015 * delta;

      dispSprite.x += 1.2 * delta;
      dispSprite.y += 0.9 * delta;

      // subtle idle wobble
      imageSprite.rotation = Math.sin(t) * 0.045;
    });
  } else if (previewWrap) {
    previewWrap.classList.add("no-pixi");
    updateFallback(0);
  }

  let currentIndex = 0;
  let isTransitioning = false;

  function getDirection(from, to) {
    const count = items.length;
    const forward = (to - from + count) % count;
    const backward = (from - to + count) % count;
    if (forward === backward) return 1;
    return forward < backward ? 1 : -1;
  }

  async function setActive(index, { quick = false } = {}) {
    const next = (index + items.length) % items.length;
    if (next === currentIndex) return;

    const dir = getDirection(currentIndex, next);
    const fadeOutDur = quick ? 0.32 : 0.6;
    const fadeInDur = quick ? 0.5 : 0.9;
    const outY = -dir * 140;
    const inY = dir * 140;

    currentIndex = next;
    rows.forEach((r, i) => r.classList.toggle("active", i === currentIndex));
    layoutCircular();

    if (previewWrap) {
      gsap.killTweensOf(previewWrap);
      gsap.to(previewWrap, {
        opacity: 0.55,
        scale: 0.985,
        y: outY,
        duration: fadeOutDur,
        ease: "power1.out"
      });
    }
    if (previewFallback) gsap.killTweensOf(previewFallback);
    if (imageSprite) gsap.killTweensOf(imageSprite);

    if (!pixiEnabled || !imageSprite) {
      updateFallback(currentIndex);
      if (previewFallback) {
        gsap.set(previewFallback, { opacity: 0, scale: 0.985 });
        gsap.to(previewFallback, {
          opacity: 1,
          scale: 1,
          duration: fadeInDur,
          ease: "power2.out"
        });
      }
      if (previewWrap) {
        gsap.set(previewWrap, { y: inY });
        gsap.to(previewWrap, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: fadeInDur,
          ease: "power2.out"
        });
      }
      return;
    }

    const tex = await loadTexture(items[currentIndex].image, {
      label: items[currentIndex].title,
      index: currentIndex
    });
    if (!tex) return;

    // Wavy swap animation
    const tl = gsap.timeline();
    // No distortion during swap

    tl.to(imageSprite, {
      alpha: 0.2,
      duration: fadeOutDur,
      ease: "power1.out"
    }, 0);

    tl.add(() => {
      imageSprite.texture = tex;
      centerSprite();
      if (previewWrap) gsap.set(previewWrap, { y: inY });
    }, quick ? 0.08 : 0.12);

    tl.to(imageSprite, {
      alpha: 1,
      duration: fadeInDur,
      ease: "power2.out"
    }, quick ? 0.1 : 0.14);

    if (previewWrap) {
      tl.to(previewWrap, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: fadeInDur,
        ease: "power2.out"
      }, 0.02);
    }

    // No distortion during swap
  }

  // initial texture
  (async () => {
    rows[0].classList.add("active");
    if (!pixiEnabled || !imageSprite) {
      updateFallback(0);
      layoutCircular();
      return;
    }
    const tex = await loadTexture(items[0].image, {
      label: items[0].title,
      index: 0
    });
    imageSprite.texture = tex;
    centerSprite();
    layoutCircular();
  })();

  window.addEventListener("resize", () => {
    centerSprite();
    layoutCircular();
  });

  // ---------------------------
  // Wheel -> next/prev item
  // ---------------------------
  let wheelAcc = 0;
  const WHEEL_THRESHOLD = 80;
  let wheelLocked = false;

  function onWheel(e) {
    if (isTransitioning) return;
    if (document.body.classList.contains("detail")) return;
    // prevent page scroll
    e.preventDefault();

    if (wheelLocked) return;
    wheelAcc += e.deltaY;
    if (Math.abs(wheelAcc) < WHEEL_THRESHOLD) return;

    const dir = wheelAcc > 0 ? 1 : -1;
    wheelAcc = 0;

    setActive(currentIndex + dir);
    // also nudge list a tiny bit for feel
    gsap.fromTo(listEl, { y: -dir * 8 }, { y: 0, duration: 0.25, ease: "power2.out" });

    wheelLocked = true;
    setTimeout(() => {
      wheelLocked = false;
    }, 220);
  }

  // attach wheel on whole stage (like video overlay)
  stage.addEventListener("wheel", onWheel, { passive: false });

  // ---------------------------
  // Click -> transition to detail screen
  // ---------------------------

  function goDetail() {
    if (isTransitioning) return;
    isTransitioning = true;

    gsap.set(previewWrap, { position: "relative", zIndex: 45 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" }
    });

    // Simple zoom-in transition
    tl.to(previewWrap, {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1.06,
      duration: 0.35
    }, 0);

    // Fade out list screen bits
    tl.to(".right", { opacity: 0, duration: 0.25 }, 0);

    // Switch to detail state
    tl.add(() => {
      document.body.classList.remove("list");
      document.body.classList.add("detail");
      renderDetail(currentIndex);
      startDetailSlider();
    }, 0.35);

    // Text pop-in as detail view appears
    if (detailText) {
      gsap.set(detailText, { transformOrigin: "0 0" });
      tl.fromTo(detailText, {
        scale: 0.92,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out"
      }, 0.38);
    }

    // Hide main preview in detail view
    tl.to(previewWrap, {
      opacity: 0,
      duration: 0.18
    }, 0.18);

    tl.add(() => {
      gsap.set(previewWrap, { zIndex: 15 });
      isTransitioning = false;
    }, 0.8);
  }

  function goList() {
    if (isTransitioning) return;
    isTransitioning = true;

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    // hide detail UI
    tl.to(previewWrap, { rotate: 0, scale: 0.98, opacity: 0.9, duration: 0.2 }, 0);

    // switch body back
    tl.add(() => {
      document.body.classList.remove("detail");
      document.body.classList.add("list");
      stopDetailSlider();
    }, 0.18);

    // restore list
    tl.to(".right", { opacity: 1, duration: 0.25 }, 0.2);
    tl.to(previewWrap, { rotate: 0, scale: 1.0, opacity: 1, x: 0, y: 0, duration: 0.38 }, 0.35);
    tl.add(() => {
      gsap.set(previewWrap, { zIndex: 5 });
      isTransitioning = false;
    }, 0.5);
  }

  function stopDetailSlider() {
    if (detailSlideTimer) {
      clearInterval(detailSlideTimer);
      detailSlideTimer = null;
    }
  }

  function startDetailSlider() {
    if (!detailSlides.length) return;
    stopDetailSlider();
    detailSlides.forEach((el, i) => el.classList.toggle("active", i === 0));
    detailSlideIndex = 0;
    detailSlideTimer = setInterval(() => {
      detailSlideIndex = (detailSlideIndex + 1) % detailSlides.length;
      detailSlides.forEach((el, i) => el.classList.toggle("active", i === detailSlideIndex));
    }, 2000);
  }

  // click on list item -> only open detail if already active
  rows.forEach((row) => {
    row.addEventListener("click", () => {
      if (isTransitioning) return;
      const index = Number(row.dataset.index);
      if (index !== currentIndex) {
        setActive(index, { quick: true });
        return;
      }
      goDetail();
    });
  });

  // click on preview -> also go detail (like card click)
  previewWrap.addEventListener("click", () => {
    if (isTransitioning) return;
    goDetail();
  });

  // menu button returns to main screen
  document.getElementById("menuBtn").addEventListener("click", () => {
    if (document.body.classList.contains("detail")) goList();
  });

})();
