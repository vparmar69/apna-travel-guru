/* =====================================================================
   APNA TRAVEL GURU — PACKAGES ENGINE  (js/packages.js)
   Is file mein kuch badalna nahi hai. Data js/packages-data.js mein hai.

   Flow:
   1. 9 cards (3x3, mobile par swipe + < > arrows)
   2. Card par click -> popup: Category + Members + Duration
   3. Teeno chunte hi price dikhta hai -> "Done · View Itinerary"
   4. Itinerary / Inclusions / Exclusions / Carry + Book on WhatsApp
   ===================================================================== */

(function () {
  "use strict";
  if (typeof PK_PACKAGES === "undefined" || typeof PK_CONFIG === "undefined") return;

  const CFG = PK_CONFIG;
  const PK = PK_PACKAGES;
  const site = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};

  // ---------------- helpers ----------------
  let wa = String(site.whatsappNumber || "").replace(/\D/g, "");
  if (wa.length === 10) wa = "91" + wa;
  const waLink = (msg) => "https://wa.me/" + wa + "?text=" + encodeURIComponent(msg);

  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  const money = (n) => "₹" + Number(n).toLocaleString("en-IN");
  const slabIdx = (n) => {
    const i = CFG.slabs.findIndex((max) => n <= max);
    return i < 0 ? CFG.slabs.length - 1 : i;
  };
  const isLive = (p) => !!(p.live && p.plans && p.plans.length);
  const tierOf = (id) => CFG.tiers.find((t) => t.id === id);
  const foodAdd = (plan, tier) => (plan.food && plan.food[tier]) || 0;
  const minPrice = (p) => {
    let m = Infinity;
    p.plans.forEach((pl) =>
      Object.keys(pl.price).forEach((t) =>
        pl.price[t].forEach((v) => { if (typeof v === "number" && v < m) m = v; })
      )
    );
    return m;
  };

  const PIN = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFC400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>';

  // ---------------- cards ----------------
  function cardHtml(p) {
    const live = isLive(p);
    const price = live
      ? '<div class="pk-from">From</div><div class="pk-price">' + money(minPrice(p)) + ' <span>/ person</span></div>'
      : '<div class="pk-soon">Details coming soon</div>';
    return (
      '<article class="pk-card package-card' + (live ? "" : " is-soon") + '" data-id="' + esc(p.id) + '" data-filter="' + esc(p.filter) + '" tabindex="0" role="button" aria-label="' + esc(p.title) + '">' +
        '<div class="pk-media" style="--tone:' + esc(p.tone || "#12304d") + '">' +
          '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy" onerror="this.style.display=\'none\'">' +
          '<span class="pk-tag">' + esc(p.filter) + "</span>" +
          (p.popular ? '<span class="pk-pop">Most Popular</span>' : "") +
        "</div>" +
        '<div class="pk-body">' +
          '<h3 class="pk-name">' + esc(p.title) + '<span class="pk-sr"> ' + esc(p.location) + " " + esc(p.filter) + "</span></h3>" +
          '<div class="pk-loc">' + PIN + esc(p.location) + "</div>" +
          '<div class="pk-foot"><div>' + price + '</div><span class="pk-go">→</span></div>' +
        "</div>" +
      "</article>"
    );
  }

  // ---------------- popup state ----------------
  let S = null;
  let overlay = null;
  let modal = null;

  const nextOpen = () => (!S.tier ? 1 : !S.members ? 2 : !S.plan ? 3 : 0);
  const planOf = () => (S.plan ? S.p.plans.find((x) => x.id === S.plan) : null);
  const perPerson = () => {
    const plan = planOf();
    if (!plan || !S.tier || !S.members) return 0;
    return plan.price[S.tier][slabIdx(S.members)] + (S.food ? foodAdd(plan, S.tier) : 0);
  };

  const closeBtn = '<button type="button" class="pk-x" data-close aria-label="Close">✕</button>';

  function selectView() {
    const p = S.p;
    const plan = planOf();
    const tier = S.tier ? tierOf(S.tier) : null;
    const n = (S.tier ? 1 : 0) + (S.members ? 1 : 0) + (plan ? 1 : 0);
    const all = n === 3;
    const curr = [S.tier, S.members, S.plan].findIndex((v) => !v) + 1;
    const segs = [0, 1, 2].map((i) => '<span class="pk-seg' + (i < n ? " on" : "") + '"></span>').join("");

    const sec = (i, title, val, done, inner) => {
      const open = S.open === i;
      const right = val ? '<span class="pk-val">' + esc(val) + "</span>" : '<span class="pk-sel">Select</span>';
      const tail = done && !open ? '<span class="pk-chg">Change</span>' : '<span class="pk-chev">' + (open ? "▴" : "▾") + "</span>";
      return (
        '<div class="pk-sec' + (open ? " is-open" : "") + (!done && !open ? " is-dim" : "") + '">' +
          '<button type="button" class="pk-sec-h" data-sec="' + i + '">' +
            '<span class="pk-num' + (done ? " done" : "") + '">' + (done ? "✓" : i) + "</span>" +
            '<span class="pk-sec-t">' + title + "</span>" + right + tail +
          "</button>" +
          (open ? '<div class="pk-sec-b">' + inner + "</div>" : "") +
        "</div>"
      );
    };

    const tierHtml = CFG.tiers.map((t) =>
      '<button type="button" class="pk-tier' + (S.tier === t.id ? " is-sel" : "") + '" data-tier="' + t.id + '">' +
        '<span class="pk-radio"></span><span class="pk-tier-t"><b>' + esc(t.label) + "</b><small>" + esc(t.note) + "</small></span>" +
      "</button>"
    ).join("");

    let memHtml = "";
    for (let m = CFG.minMembers; m <= CFG.maxMembers; m++) {
      memHtml += '<button type="button" class="pk-mem' + (S.members === m ? " is-sel" : "") + '" data-mem="' + m + '">' + m + "</button>";
    }

    const planHtml = p.plans.map((pl) =>
      '<button type="button" class="pk-plan' + (S.plan === pl.id ? " is-sel" : "") + '" data-plan="' + pl.id + '">' + esc(pl.label) + "</button>"
    ).join("");

    let foot;
    if (!all) {
      foot =
        '<div class="pk-hint">Select all 3 options to see the price</div>' +
        '<button type="button" class="pk-cta" disabled>Done · View Itinerary</button>';
    } else {
      const pp = perPerson();
      const add = foodAdd(plan, S.tier);
      const fresh = !S.priceShown;
      S.priceShown = true;
      foot =
        '<div class="pk-pricecard' + (fresh ? " is-new" : "") + '">' +
          '<div><div class="pk-l">Per person</div><div class="pk-big">' + money(pp) + "</div></div>" +
          '<div class="pk-r"><div class="pk-l">Total for ' + S.members + " members</div><div class=\"pk-tot\">" + money(pp * S.members) + "</div></div>" +
        "</div>" +
        (add ? '<label class="pk-food"><input type="checkbox" data-food' + (S.food ? " checked" : "") + '> <span>Add meals <em>· ' + esc(CFG.mealsNote) + '</em></span> <b>+' + money(add) + '</b> <small>per person</small></label>' : "") +
        '<div class="pk-note">' + esc(CFG.priceNote) + "</div>" +
        '<div class="pk-btnrow"><button type="button" class="pk-cta" data-act="view">Done · View Itinerary →</button>' +
        '<a class="pk-wa pk-wa-solid" target="_blank" rel="noopener" href="' + esc(waLink(waMessage())) + '">Book Now</a></div>';
    }

    return (
      '<div class="pk-head">' +
        '<div class="pk-top"><div><h2 class="pk-title">' + esc(p.title) + '</h2><div class="pk-sub">Choose your package</div></div>' + closeBtn + "</div>" +
        '<div class="pk-prog"><div class="pk-segs">' + segs + '</div><span class="pk-step">' + (all ? "All set" : "Step " + curr + " of 3") + "</span></div>" +
      "</div>" +
      '<div class="pk-body">' +
        sec(1, "Package category", tier ? tier.label : "", !!tier, '<div class="pk-tiers">' + tierHtml + "</div>") +
        sec(2, "Number of members", S.members ? S.members + " members" : "", !!S.members, '<div class="pk-mems">' + memHtml + "</div>") +
        sec(3, "Duration", plan ? plan.label : "", !!plan, '<div class="pk-plans">' + planHtml + "</div>") +
      "</div>" +
      '<div class="pk-foot-bar">' + foot + "</div>"
    );
  }

  function waMessage() {
    const plan = planOf();
    const tier = tierOf(S.tier);
    const pp = perPerson();
    const add = foodAdd(plan, S.tier);
    const lines = [
      'Hi Apna Travel Guru! I\'d like to book the "' + S.p.title + '" package.',
      "Category: " + tier.label,
      "Plan: " + plan.label,
      "Members: " + S.members,
      "Price: " + money(pp) + " per person (Total " + money(pp * S.members) + ")",
    ];
    if (add) lines.push("Meals: " + (S.food ? CFG.mealsNote + " (add-on)" : "Not included"));
    return lines.join("\n");
  }

  function detailsView() {
    const plan = planOf();
    const tier = tierOf(S.tier);
    const pp = perPerson();
    const total = pp * S.members;
    const add = foodAdd(plan, S.tier);
    const withMeals = S.food && add;

    const inc = (S.p.inclusions || []).slice();
    if (withMeals) inc.push("Meals add-on: " + CFG.mealsNote);
    const exc = (S.p.exclusions || []).filter((x) => !(withMeals && /^(food|meals)/i.test(x)));
    const list = (items, cls) =>
      items.length
        ? '<ul class="pk-list ' + cls + '">' + items.map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul>"
        : '<p class="pk-empty">Details will be updated soon.</p>';

    const days = plan.itinerary.map((d) =>
      '<div class="pk-day"><div class="pk-rail"><span class="pk-dot2"></span><span class="pk-line"></span></div>' +
      '<div class="pk-day-c"><div class="pk-day-h">' + esc(d.day) + " <span>" + esc(d.title) + "</span></div>" +
      String(d.text).split(/\n\s*\n/).map((x) => "<p>" + esc(x.trim()) + "</p>").join("") + "</div></div>"
    ).join("");

    const page = typeof location !== "undefined" ? location.href.split("#")[0] : "";
    const shareMsg = "Apna Travel Guru: " + S.p.title + ", " + plan.label + " (" + tier.label + ", " + S.members + " members) - " +
      money(pp) + " per person, total " + money(total) + ". " + page;
    const shareHref = "https://wa.me/?text=" + encodeURIComponent(shareMsg);
    const callNum = String(site.callNumber || site.whatsappNumber || "").replace(/\D/g, "");

    return (
      '<div class="pk-head">' +
        '<div class="pk-top"><button type="button" class="pk-back" data-act="back">← Change selection</button>' +
          '<div class="pk-top-r"><a class="pk-share" target="_blank" rel="noopener" href="' + esc(shareHref) + '">Share</a>' + closeBtn + "</div></div>" +
        '<div class="pk-sub pk-sub2">' + esc(S.p.title) + '</div><h2 class="pk-title pk-title2">' + esc(plan.label) + "</h2>" +
        '<div class="pk-pills"><span>' + esc(tier.label) + "</span><span>" + S.members + " members</span>" + (withMeals ? "<span>With meals</span>" : "") + "</div>" +
        '<div class="pk-jump">' +
          '<button type="button" class="is-on" data-jump="pk-s-itin">Itinerary</button>' +
          '<button type="button" data-jump="pk-s-inc">Included</button>' +
          '<button type="button" data-jump="pk-s-exc">Not included</button>' +
          '<button type="button" data-jump="pk-s-carry">Carry</button>' +
        "</div>" +
      "</div>" +
      '<div class="pk-body pk-two">' +
        '<section class="pk-main" id="pk-s-itin"><h4 class="pk-h4">Itinerary</h4><div class="pk-days">' + days + "</div></section>" +
        '<aside class="pk-side">' +
          '<div class="pk-box ok" id="pk-s-inc"><h4 class="pk-h4">Included</h4>' + list(inc, "ok") + "</div>" +
          '<div class="pk-box no" id="pk-s-exc"><h4 class="pk-h4">Not included</h4>' + list(exc, "no") + "</div>" +
          '<div class="pk-box" id="pk-s-carry"><h4 class="pk-h4">Things to carry</h4>' + list(S.p.carry || [], "dot") + "</div>" +
        "</aside>" +
      "</div>" +
      '<div class="pk-foot-bar pk-foot-row">' +
        '<div class="pk-sum">' +
          '<div class="pk-l">Per person</div><div class="pk-big2">' + money(pp) + "</div>" +
          '<div class="pk-l">' + money(pp) + " × " + S.members + " members = <b>" + money(total) + "</b></div>" +
        "</div>" +
        '<div class="pk-btns">' +
          (callNum ? '<a class="pk-call" href="tel:+' + callNum + '">Call</a>' : "") +
          '<a class="pk-wa" target="_blank" rel="noopener" href="' + esc(waLink(waMessage())) + '">Book Now</a>' +
        "</div>" +
        (add ? '<label class="pk-food pk-food-s pk-meals"><input type="checkbox" data-food' + (S.food ? " checked" : "") + '> Add meals <em>· ' + esc(CFG.mealsNote) + "</em> <b>+" + money(add) + "</b></label>" : "") +
        '<div class="pk-note pk-note-l">' + esc(CFG.priceNote) + "</div>" +
      "</div>"
    );
  }

  function soonView() {
    return (
      '<div class="pk-head"><div class="pk-top"><div><h2 class="pk-title">' + esc(S.p.title) + '</h2><div class="pk-sub">' + esc(S.p.location) + "</div></div>" + closeBtn + "</div></div>" +
      '<div class="pk-body pk-soon-b"><p>Details for this package are coming soon. Message us on WhatsApp and we will share the plans, prices and itinerary right away.</p></div>' +
      '<div class="pk-foot-bar"><a class="pk-wa pk-wa-full" target="_blank" rel="noopener" href="' + esc(waLink('Hi Apna Travel Guru! I\'d like to know about the "' + S.p.title + '" package.')) + '">Ask on WhatsApp</a></div>'
    );
  }

  function render() {
    if (!S) return;
    const old = modal.querySelector(".pk-body");
    const top = old ? old.scrollTop : 0;
    modal.innerHTML = S.view === "soon" ? soonView() : S.view === "details" ? detailsView() : selectView();
    modal.classList.toggle("is-wide", S.view === "details");
    const b = modal.querySelector(".pk-body");
    if (b && S.lastView === S.view) b.scrollTop = top;
    S.lastView = S.view;
  }

  function openPackage(id) {
    const p = PK.find((x) => x.id === id);
    if (!p) return;
    S = { p: p, tier: null, members: null, plan: null, food: false, open: 1, view: isLive(p) ? "select" : "soon", tab: "itinerary", priceShown: false, lastView: "" };
    render();
    overlay.classList.add("is-open");
    document.body.classList.add("pk-lock");
    modal.focus();
  }
  function closeModal() {
    overlay.classList.remove("is-open");
    document.body.classList.remove("pk-lock");
    S = null;
  }

  // ---------------- carousel (mobile) ----------------
  function initCarousel(grid) {
    const car = grid.parentElement;
    const mk = (cls, label, glyph) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "pk-arrow " + cls; b.setAttribute("aria-label", label); b.textContent = glyph;
      return b;
    };
    const prev = mk("pk-prev", "Previous", "‹");
    const next = mk("pk-next", "Next", "›");
    car.appendChild(prev); car.appendChild(next);
    const dots = document.createElement("div");
    dots.className = "pk-dots";
    car.insertAdjacentElement("afterend", dots);
    const GAP = 14;

    const vis = () => Array.from(grid.querySelectorAll(".pk-card")).filter((c) => c.offsetWidth > 0);
    const step = () => { const c = vis()[0]; return c ? c.offsetWidth + GAP : grid.clientWidth; };

    function update() {
      const max = grid.scrollWidth - grid.clientWidth - 2;
      prev.classList.toggle("is-hidden", grid.scrollLeft <= 2);
      next.classList.toggle("is-hidden", grid.scrollLeft >= max);
      const idx = Math.round(grid.scrollLeft / step());
      dots.querySelectorAll(".pk-dot").forEach((d, i) => d.classList.toggle("is-active", i === idx));
    }
    function build() {
      const n = vis().length;
      let h = "";
      for (let i = 0; i < n; i++) h += '<button type="button" class="pk-dot" aria-label="Go to package ' + (i + 1) + '" data-i="' + i + '"></button>';
      dots.innerHTML = h;
      update();
    }
    prev.addEventListener("click", () => grid.scrollBy({ left: -step(), behavior: "smooth" }));
    next.addEventListener("click", () => grid.scrollBy({ left: step(), behavior: "smooth" }));
    dots.addEventListener("click", (e) => {
      const b = e.target.closest(".pk-dot");
      if (b) grid.scrollTo({ left: Number(b.dataset.i) * step(), behavior: "smooth" });
    });
    grid.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", build);
    build();
    return build;
  }

  // ---------------- init ----------------
  function init() {
    const grid = document.getElementById("packageGrid");
    if (!grid) return;

    grid.innerHTML = PK.map(cardHtml).join("");

    // popup shell
    overlay = document.createElement("div");
    overlay.className = "pk-overlay";
    overlay.id = "pkOverlay";
    overlay.innerHTML = '<div class="pk-modal" id="pkModal" role="dialog" aria-modal="true" tabindex="-1"></div>';
    document.body.appendChild(overlay);
    modal = overlay.querySelector("#pkModal");

    // filter chips
    const filters = document.getElementById("pkFilters");
    const rebuild = initCarousel(grid);
    if (filters) {
      const names = ["All"];
      PK.forEach((p) => { if (names.indexOf(p.filter) < 0) names.push(p.filter); });
      filters.innerHTML = names.map((n, i) => '<button type="button" class="pk-chip' + (i === 0 ? " is-active" : "") + '" data-f="' + esc(n) + '">' + esc(n) + "</button>").join("");
      filters.addEventListener("click", (e) => {
        const b = e.target.closest(".pk-chip");
        if (!b) return;
        filters.querySelectorAll(".pk-chip").forEach((c) => c.classList.toggle("is-active", c === b));
        const f = b.dataset.f;
        grid.querySelectorAll(".pk-card").forEach((c) => c.classList.toggle("is-hidden", f !== "All" && c.dataset.filter !== f));
        grid.scrollTo({ left: 0 });
        rebuild();
      });
    }

    // search bar ke saath dots theek rakho (search ka kaam main.js karta hai)
    const si = document.getElementById("searchInput");
    const rs = document.getElementById("resetBtn");
    if (si) si.addEventListener("input", () => setTimeout(rebuild, 0));
    if (rs) rs.addEventListener("click", () => setTimeout(rebuild, 0));

    // cards: click / Enter
    grid.addEventListener("click", (e) => {
      const c = e.target.closest(".pk-card");
      if (c) openPackage(c.dataset.id);
    });
    grid.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const c = e.target.closest(".pk-card");
      if (c) { e.preventDefault(); openPackage(c.dataset.id); }
    });

    // scroll par cards ek-ek karke aate hain
    const cards = Array.from(grid.querySelectorAll(".pk-card"));
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("pk-in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      cards.forEach((c, i) => {
        c.style.setProperty("--d", (i % 3) * 0.1 + "s");
        c.classList.add("is-pre");
        io.observe(c);
      });
    }

    // popup ke andar ke clicks
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay || e.target.closest("[data-close]")) { closeModal(); return; }
      if (!S) return;
      const t = e.target;
      let el;
      if ((el = t.closest("[data-sec]"))) { const i = Number(el.dataset.sec); S.open = S.open === i ? 0 : i; render(); return; }
      if ((el = t.closest("[data-tier]"))) { S.tier = el.dataset.tier; S.open = nextOpen(); render(); return; }
      if ((el = t.closest("[data-mem]"))) { S.members = Number(el.dataset.mem); S.open = nextOpen(); render(); return; }
      if ((el = t.closest("[data-plan]"))) { S.plan = el.dataset.plan; S.open = nextOpen(); render(); return; }
      if ((el = t.closest("[data-tab]"))) { S.tab = el.dataset.tab; render(); return; }
      if ((el = t.closest("[data-jump]"))) {
        const target = modal.querySelector("#" + el.dataset.jump);
        if (target && target.scrollIntoView) target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if ((el = t.closest("[data-act]"))) {
        if (el.dataset.act === "view" && S.tier && S.members && S.plan) { S.view = "details"; S.tab = "itinerary"; render(); }
        else if (el.dataset.act === "back") { S.view = "select"; S.open = 0; render(); }
      }
    });
    overlay.addEventListener("change", (e) => {
      if (S && e.target.matches("[data-food]")) { S.food = e.target.checked; render(); }
    });
    // itinerary page par scroll karte waqt upar ka chip apne aap badalta hai
    overlay.addEventListener("scroll", (e) => {
      const body = e.target;
      if (!S || S.view !== "details" || !body.classList || !body.classList.contains("pk-body")) return;
      const ids = ["pk-s-itin", "pk-s-inc", "pk-s-exc", "pk-s-carry"];
      let active = ids[0];
      ids.forEach((id) => {
        const sec = body.querySelector("#" + id);
        if (sec && sec.offsetTop - body.offsetTop <= body.scrollTop + 70) active = id;
      });
      modal.querySelectorAll("[data-jump]").forEach((b) => b.classList.toggle("is-on", b.dataset.jump === active));
    }, true);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && S) closeModal();
    });
  }

  // main.js ke baad chalna zaruri hai (wo purane cards bharta hai)
  document.addEventListener("DOMContentLoaded", init);
})();
