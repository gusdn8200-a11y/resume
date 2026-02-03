$(function () {
  const $scroll = $("#scroll");
  const $html = $("html");
  const mq = window.matchMedia("(max-width: 980px)");
  let lock = false;
  let targets = [];

  function updateTargets() {
    const w = $scroll.innerWidth();
    const h = $scroll.innerHeight();
    $html.css("--view-w", w + "px");
    $html.css("--view-h", h + "px");
    targets = [
      { x: 0, y: 0 },
      { x: w, y: 0 },
      { x: w, y: h },
      { x: 0, y: h },
      { x: 0, y: h * 2 }
    ];
  }

  function nearestIndex() {
    const x = $scroll.scrollLeft();
    const y = $scroll.scrollTop();
    let best = 0;
    let bestDist = Infinity;

    targets.forEach(function (t, i) {
      const dx = t.x - x;
      const dy = t.y - y;
      const dist = Math.sqrt((dx * dx) + (dy * dy));
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });

    return best;
  }

  function goTo(i) {
    const idx = Math.max(0, Math.min(targets.length - 1, i));
    const t = targets[idx];
    $scroll.stop(true).animate({ scrollLeft: t.x, scrollTop: t.y }, 420);
  }

  updateTargets();
  $(window).on("resize", updateTargets);

  $scroll.on("wheel", function (e) {
    if (mq.matches) return;
    const oe = e.originalEvent;
    if (!oe) return;
    if (Math.abs(oe.deltaY) < 30) return;
    if (lock) {
      e.preventDefault();
      return;
    }

    lock = true;
    e.preventDefault();

    const idx = nearestIndex();
    if (oe.deltaY > 0) goTo(idx + 1);
    else goTo(idx - 1);

    setTimeout(function () { lock = false; }, 520);
  });

  $scroll.on("touchmove", function (e) {
    if (mq.matches) return;
    e.preventDefault();
  });
});
