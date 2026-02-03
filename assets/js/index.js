const DEFAULT_VIDEO = './assets/img/v_1.mp4';

const copyTexts = [
  '디자인 <span class="copy-key">의도</span>를 정확히 구현한다.',
  '<span class="copy-key">반응형·접근성·성능</span>을 기본으로 한다.',
  '형태보다 <span class="copy-key">경험</span>을 설계한다.',
];

const copyState = {
  stage: 0,
  intent: 0,
  isTransitioning: false,
  $line: null,
  $gaugeFill: null,
  swapTimer: null,
  endTimer: null,
};

const PREVIEW_HOVER_DELAY_MS = 160;
let previewTimer = 0;

const COPY_SCROLL_THRESHOLD = 120;
const COPY_TOUCH_THRESHOLD = 90;
const COPY_SWAP_MS = 220;
const COPY_TRANSITION_MS = 560;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const isTouchDevice = () => (
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  window.matchMedia('(hover: none) and (pointer: coarse)').matches
);

const resolveCopyProgress = (stageValue) => {
  const stageSpan = copyTexts.length - 1;
  if (stageSpan <= 0) return 0;
  return clamp(stageValue / stageSpan, 0, 1);
};

const updateCopyGauge = (progressValue) => {
  const progress = clamp(progressValue, 0, 1);
  const percent = Math.round(progress * 100);
  if (copyState.$gaugeFill && copyState.$gaugeFill.length) {
    copyState.$gaugeFill.css('width', `${percent}%`);
  }
};

const updateCopyPosition = () => {
  if (!copyState.$line || copyState.$line.length === 0) return;
  const lastStage = copyTexts.length - 1;
  let positionClass = 'is-center';
  if (copyState.stage <= 0) {
    positionClass = 'is-left';
  } else if (copyState.stage >= lastStage) {
    positionClass = 'is-right';
  }
  copyState.$line.removeClass('is-left is-center is-right').addClass(positionClass);
};

const setupCopyStage = () => {
  const $line = $('#copyLine');
  if ($line.length === 0) return;
  copyState.$line = $line;
  copyState.$gaugeFill = $('#scrollGaugeFill');
  copyState.$line.html(copyTexts[0]);
  updateCopyPosition();
  updateCopyGauge(resolveCopyProgress(copyState.stage));
};

const changeCopyStage = (nextStage) => {
  if (!copyState.$line) return;
  const stage = clamp(nextStage, 0, copyTexts.length - 1);
  if (stage === copyState.stage || copyState.isTransitioning) return;

  copyState.isTransitioning = true;
  copyState.intent = 0;
  $('body').addClass('copy-transition');
  copyState.$line.addClass('is-switch');

  clearTimeout(copyState.swapTimer);
  clearTimeout(copyState.endTimer);

  copyState.swapTimer = window.setTimeout(() => {
    copyState.stage = stage;
    copyState.$line.html(copyTexts[stage]);
    updateCopyPosition();
    updateCopyGauge(resolveCopyProgress(copyState.stage));
    requestAnimationFrame(() => {
      if (copyState.$line) copyState.$line.removeClass('is-switch');
    });
  }, COPY_SWAP_MS);

  copyState.endTimer = window.setTimeout(() => {
    copyState.isTransitioning = false;
    $('body').removeClass('copy-transition');
  }, COPY_TRANSITION_MS);
};

const queueCopyByDelta = (delta, threshold) => {
  if (!copyState.$line || copyState.isTransitioning) return;
  if (!Number.isFinite(delta) || Math.abs(delta) < 1) return;

  const lastStage = copyTexts.length - 1;
  if (lastStage <= 0) return;

  copyState.intent = clamp(copyState.intent + delta, -threshold, threshold);
  const pendingStage = clamp(copyState.stage + (copyState.intent / threshold), 0, lastStage);
  const pendingProgress = resolveCopyProgress(pendingStage);
  updateCopyGauge(pendingProgress);

  if (copyState.intent >= threshold) {
    copyState.intent = 0;
    if (copyState.stage < lastStage) {
      changeCopyStage(copyState.stage + 1);
    } else {
      updateCopyGauge(1);
    }
    return;
  }

  if (copyState.intent <= -threshold) {
    copyState.intent = 0;
    if (copyState.stage > 0) {
      changeCopyStage(copyState.stage - 1);
    } else {
      updateCopyGauge(0);
    }
  }
};

const openPreview = (src) => {
  const $videoModal = $('#videoModal');
  const $previewVideo = $('#previewVideo');
  const previewVideo = $previewVideo[0];
  if ($videoModal.length === 0 || !previewVideo) return;

  const nextSrc = src || DEFAULT_VIDEO;
  if ($previewVideo.attr('src') !== nextSrc) {
    $previewVideo.attr('src', nextSrc);
    previewVideo.currentTime = 0;
  }
  $videoModal.addClass('is-open').attr('aria-hidden', 'false');
  previewVideo.play().catch(() => {});
};

const closePreview = () => {
  const $videoModal = $('#videoModal');
  const $previewVideo = $('#previewVideo');
  const previewVideo = $previewVideo[0];
  if ($videoModal.length === 0 || !previewVideo) return;

  previewVideo.pause();
  $videoModal.removeClass('is-open').attr('aria-hidden', 'true');
};

const clearPreviewTimer = () => {
  if (!previewTimer) return;
  window.clearTimeout(previewTimer);
  previewTimer = 0;
};

const handleThumbEnter = (target, immediate = false) => {
  if (!target) return;
  const src = $(target).attr('data-video') || DEFAULT_VIDEO;
  clearPreviewTimer();
  if (immediate) {
    openPreview(src);
    return;
  }
  previewTimer = window.setTimeout(() => {
    openPreview(src);
    previewTimer = 0;
  }, PREVIEW_HOVER_DELAY_MS);
};

const setActiveThumb = (target) => {
  const $items = $('#thumbRow .thumb-item');
  if ($items.length === 0) return;
  $items.removeClass('is-selected');
  if (target) {
    $(target).addClass('is-selected');
  }
};

const handleThumbLeave = () => {
  clearPreviewTimer();
  closePreview();
};

const handleVideoError = () => {
  const $previewVideo = $('#previewVideo');
  const previewVideo = $previewVideo[0];
  if (!previewVideo) return;
  const current = $previewVideo.attr('src');
  if (current && current !== DEFAULT_VIDEO) {
    openPreview(DEFAULT_VIDEO);
  }
};

const openImageModal = (imageSrc) => {
  if (!imageSrc) return;
  const resolvedSrc = new URL(imageSrc, window.location.href).href;
  const $imageModal = $('#imageModal');
  const $previewImage = $('#previewImage');
  if ($imageModal.length === 0 || $previewImage.length === 0) return;
  $previewImage.attr('src', resolvedSrc);
  $imageModal.addClass('is-open').attr('aria-hidden', 'false');
};

const closeImageModal = () => {
  const $imageModal = $('#imageModal');
  const $previewImage = $('#previewImage');
  if ($imageModal.length === 0 || $previewImage.length === 0) return;
  $imageModal.removeClass('is-open').attr('aria-hidden', 'true');
  $previewImage.attr('src', '');
};

const toggleResumePanel = (forceOpen) => {
  const $panel = $('#resumePanel');
  const $backdrop = $('#resumeBackdrop');
  const $toggle = $('#badgeToggle');
  if ($panel.length === 0) return;
  const willOpen = typeof forceOpen === 'boolean' ? forceOpen : !$panel.hasClass('is-open');
  $panel.toggleClass('is-open', willOpen).attr('aria-hidden', String(!willOpen));
  $backdrop.toggleClass('is-open', willOpen).attr('aria-hidden', String(!willOpen));
  $toggle.attr('aria-expanded', String(willOpen));
};

const THUMB_SPEED = 90;
const MIN_THUMB_DURATION = 12;
const MAX_THUMB_DURATION = 36;

const updateThumbLoop = () => {
  const $track = $('#thumbTrack');
  if ($track.length === 0) return;
  const track = $track[0];
  const distance = track.scrollWidth / 2;
  if (!distance) return;
  const duration = clamp(distance / THUMB_SPEED, MIN_THUMB_DURATION, MAX_THUMB_DURATION);
  $track.css('--thumb-distance', `${distance.toFixed(2)}px`);
  $track.css('--thumb-duration', `${duration.toFixed(2)}s`);
};

const resumeThumbLoop = () => {
  const $track = $('#thumbTrack');
  if ($track.length === 0) return;
  $track.css('animation-play-state', '');
};

const pauseThumbLoop = () => {
  const $track = $('#thumbTrack');
  if ($track.length === 0) return;
  $track.css('animation-play-state', 'paused');
};

let lastTouchY = 0;

const handleWheel = (event) => {
  if (!copyState.$line) return;
  event.preventDefault();
  const delta = event.originalEvent.deltaY;
  if (!Number.isFinite(delta) || Math.abs(delta) < 1) return;
  queueCopyByDelta(delta, COPY_SCROLL_THRESHOLD);
};

const handleTouchStart = (event) => {
  const touches = event.originalEvent.touches;
  if (!touches || touches.length === 0) return;
  lastTouchY = touches[0].clientY;
  copyState.intent = 0;
};

const handleTouchMove = (event) => {
  if (!copyState.$line) return;
  const touches = event.originalEvent.touches;
  if (!touches || touches.length === 0) return;
  const currentY = touches[0].clientY;
  const delta = lastTouchY - currentY;
  lastTouchY = currentY;
  if (Math.abs(delta) < 1) return;
  event.preventDefault();
  queueCopyByDelta(delta, COPY_TOUCH_THRESHOLD);
};

$(function () {
  const touchDevice = isTouchDevice();
  if (touchDevice) {
    document.body.classList.add('is-touch');
  }

  setupCopyStage();

  const $thumbTrack = $('#thumbTrack');
  if (!touchDevice && $thumbTrack.length && !$thumbTrack.data('looped')) {
    $thumbTrack.data('looped', true);
    $thumbTrack.children().clone().appendTo($thumbTrack);
    updateThumbLoop();
  }
  if ($thumbTrack.length) {
    setActiveThumb($thumbTrack.find('.thumb-item').first());
  }

  const $thumbRow = $('#thumbRow');
  if ($thumbRow.length) {
    $thumbRow.on('pointerenter focusin click', '.thumb-item', function () {
      setActiveThumb(this);
    });

    if (!touchDevice) {
      $thumbRow.on('pointerenter', () => {
        pauseThumbLoop();
      });
      $thumbRow.on('pointerenter', '.thumb-item', function () {
        handleThumbEnter(this);
      });
      $thumbRow.on('focusin', '.thumb-item', function () {
        pauseThumbLoop();
        handleThumbEnter(this, true);
      });
      $thumbRow.on('pointerleave', () => {
        handleThumbLeave();
        resumeThumbLoop();
      });
    }
    $thumbRow.on('click', '.thumb-action-preview', function (event) {
      event.preventDefault();
      event.stopPropagation();
      const $item = $(this).closest('.thumb-item');
      openImageModal($item.data('home'));
    });
    $thumbRow.on('click', '.thumb-action-detail', function () {
      // Keep marquee animation from staying paused after opening a new tab.
      this.blur();
      resumeThumbLoop();
    });
    if (!touchDevice) {
      $thumbRow.on('focusout', function (event) {
        if (!$.contains(this, event.relatedTarget)) {
          handleThumbLeave();
          resumeThumbLoop();
        }
      });
    }
  }

  $('#previewVideo').on('error', handleVideoError);
  $('#imageModal').on('click', (event) => {
    if (event.target.id === 'imageModal') {
      closeImageModal();
    }
  });
  $('#imageModal').on('click', '.image-close', closeImageModal);
  $('#badgeToggle').on('click', () => toggleResumePanel());
  $('#resumePanel').on('click', '.drawer-close', () => toggleResumePanel(false));

  if (!touchDevice) {
    $(window).on('wheel', handleWheel);
  }
  $(window).on('touchstart', handleTouchStart);
  if (!touchDevice) {
    $(window).on('touchmove', handleTouchMove);
  }
  $(window).on('load resize', updateThumbLoop);
  $(window).on('focus pageshow', () => {
    const active = document.activeElement;
    if (active && active.closest && active.closest('#thumbRow')) {
      active.blur();
    }
    resumeThumbLoop();
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      resumeThumbLoop();
    }
  });
  $(window).on('keydown', (event) => {
    if (event.key === 'Escape') {
      clearPreviewTimer();
      closePreview();
      closeImageModal();
      toggleResumePanel(false);
    }
  });
});
