/* =====================================================================
   ABOUT SECTION — mobile par left-right swipe + < > arrows + dots
   Computer par kuch nahi badalta (3x2 grid hi rehta hai).
   Is file mein kuch badalna nahi hai.
   ===================================================================== */

(function () {
  const grid = document.querySelector("#about .ab-grid");
  if (!grid) return;
  const cards = grid.querySelectorAll(".ab-card");
  const GAP = 14; // CSS ke gap se same

  // grid ko ek wrapper mein daalo (arrows ki position ke liye)
  const wrap = document.createElement("div");
  wrap.className = "ab-carousel";
  grid.parentNode.insertBefore(wrap, grid);
  wrap.appendChild(grid);

  function makeArrow(cls, label, glyph) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "ab-arrow " + cls;
    b.setAttribute("aria-label", label);
    b.textContent = glyph;
    return b;
  }
  const prev = makeArrow("ab-prev", "Previous", "‹");
  const next = makeArrow("ab-next", "Next", "›");
  wrap.appendChild(prev);
  wrap.appendChild(next);

  // dots
  const dots = document.createElement("div");
  dots.className = "ab-dots";
  cards.forEach((_, i) => {
    const d = document.createElement("button");
    d.type = "button";
    d.className = "ab-dot";
    d.setAttribute("aria-label", "Go to card " + (i + 1));
    d.addEventListener("click", () => goTo(i));
    dots.appendChild(d);
  });
  wrap.insertAdjacentElement("afterend", dots);

  const step = () => (cards[0] ? cards[0].offsetWidth + GAP : grid.clientWidth);
  function goTo(i) {
    grid.scrollTo({ left: i * step(), behavior: "smooth" });
  }

  prev.addEventListener("click", () => grid.scrollBy({ left: -step(), behavior: "smooth" }));
  next.addEventListener("click", () => grid.scrollBy({ left: step(), behavior: "smooth" }));

  function update() {
    const max = grid.scrollWidth - grid.clientWidth - 2;
    prev.classList.toggle("is-hidden", grid.scrollLeft <= 2);
    next.classList.toggle("is-hidden", grid.scrollLeft >= max);
    const idx = Math.round(grid.scrollLeft / step());
    dots.querySelectorAll(".ab-dot").forEach((d, i) => d.classList.toggle("is-active", i === idx));
  }

  grid.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
