/* =====================================================================
   APNA TRAVEL GURU — MAIN SCRIPT
   Reads everything from data.js and renders the page.
   You should not need to edit this file to update content —
   edit js/data.js instead.
   ===================================================================== */

(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // ---------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------
  function waLink(number, message) {
    const clean = (number || "").replace(/[^\d]/g, "");
    return `https://wa.me/${clean}?text=${encodeURIComponent(message || "")}`;
  }

  function telLink(number) {
    return `tel:${(number || "").replace(/\s/g, "")}`;
  }

  function formatPrice(n) {
    return "₹" + Number(n).toLocaleString("en-IN");
  }

  function packageWaMessage(pkg) {
    return `Hi Apna Travel Guru! I'm interested in the "${pkg.title}" package. Could you share more details?`;
  }

  // ---------------------------------------------------------------
  // Header / nav
  // ---------------------------------------------------------------
  function initNav() {
    const toggle = $("#menuToggle");
    const drawer = $("#navDrawer");
    toggle.addEventListener("click", () => {
      const open = drawer.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "✕" : "☰";
    });
    $$("#navDrawer a").forEach((a) =>
      a.addEventListener("click", () => {
        drawer.classList.remove("is-open");
        toggle.textContent = "☰";
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  // ---------------------------------------------------------------
  // Global contact wiring (hero, fab, contact section)
  // ---------------------------------------------------------------
  function initContactLinks() {
    const wa = waLink(SITE_CONFIG.whatsappNumber, SITE_CONFIG.whatsappDefaultMessage);
    const call = telLink(SITE_CONFIG.callNumber);

    ["heroWhatsapp", "fabWhatsapp", "contactWhatsapp"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.href = wa;
    });
    ["heroCall", "fabCall"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.href = call;
    });

    $("#heroTagline").textContent = SITE_CONFIG.tagline;

    if (SITE_CONFIG.googleMapsEmbedUrl) {
      $("#mapFrame").src = SITE_CONFIG.googleMapsEmbedUrl;
    }
  }

  // ---------------------------------------------------------------
  // Trust strip (hero)
  // ---------------------------------------------------------------
  function renderTrustStrip() {
    const items = [
      `<strong>${SITE_CONFIG.stats.followers}</strong> Community`,
      `Millions of Views`,
      `Trusted by Travelers`,
      `Experienced Tour Management`,
    ];
    $("#trustStrip").innerHTML = items
      .map(
        (label) => `
      <div class="trust-item">
        <span class="check">✓</span>
        <span>${label}</span>
      </div>`
      )
      .join("");
  }

  // ---------------------------------------------------------------
  // About stats
  // ---------------------------------------------------------------
  function renderAboutStats() {
    const s = SITE_CONFIG.stats;
    const items = [
      [s.followers, s.followersLabel],
      [s.views, s.viewsLabel],
      [s.travelers, s.travelersLabel],
      [s.years, s.yearsLabel],
    ];
    $("#aboutStats").innerHTML = items
      .map(
        ([num, label]) => `
      <div class="stat-card">
        <div class="num">${num}</div>
        <div class="label">${label}</div>
      </div>`
      )
      .join("");
  }

  // ---------------------------------------------------------------
  // Package cards
  // ---------------------------------------------------------------
  function renderPackageGrid() {
    $("#packageGrid").innerHTML = PACKAGES.map(
      (pkg) => `
      <article class="package-card" data-id="${pkg.id}" tabindex="0" role="button" aria-label="View details for ${pkg.title}">
        <div class="package-media">
          <img src="${pkg.image}" alt="${pkg.title}" loading="lazy" />
          <div class="icon-badge">${pkg.icon}</div>
          <div class="price-badge">From <span>${formatPrice(pkg.startingPrice)}</span></div>
        </div>
        <div class="package-body">
          <h3>${pkg.title}</h3>
          <p class="subtitle">${pkg.subtitle}</p>
          <div class="package-meta">
            <span>🗓 ${pkg.duration}</span>
            <span>👥 ${pkg.group}</span>
          </div>
          <div class="package-actions">
            <button class="btn btn--navy btn--sm view-details-btn" data-id="${pkg.id}">View Details</button>
            <a class="btn btn--whatsapp btn--sm" href="${waLink(SITE_CONFIG.whatsappNumber, packageWaMessage(pkg))}" target="_blank" rel="noopener">Book</a>
          </div>
        </div>
      </article>`
    ).join("");

    $$(".package-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest("a")) return; // let WhatsApp link work normally
        openModal(card.dataset.id);
      });
      card.addEventListener("keypress", (e) => {
        if (e.key === "Enter") openModal(card.dataset.id);
      });
    });
  }

  // ---------------------------------------------------------------
  // Modal — package details
  // ---------------------------------------------------------------
  let activeTier = "standard";

  function buildTierTabsHtml(pkg) {
    return Object.keys(pkg.tiers)
      .map(
        (key) => `
      <button class="tier-tab ${key === activeTier ? "is-active" : ""}" data-tier="${key}">
        ${pkg.tiers[key].label}
      </button>`
      )
      .join("");
  }

  function buildPlansHtml(tier) {
    return Object.values(tier.plans)
      .map(
        (plan) => `
      <div class="plan-block">
        <div class="plan-block-head">
          <h4>${plan.duration}</h4>
          <div class="price-pair">
            <div>2 Persons<strong>${formatPrice(plan.price2)}</strong></div>
            <div>4+ Persons<strong>${formatPrice(plan.price4)}</strong></div>
          </div>
        </div>
      </div>`
      )
      .join("");
  }

  function buildDetailGridHtml(tier) {
    const listBlock = (title, items, extraClass = "") => `
      <div class="detail-block ${extraClass}">
        <h5>${title}</h5>
        <ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>
      </div>`;
    return `
      <div class="detail-grid">
        <div class="detail-block">
          <h5>Hotel</h5>
          <ul><li>${tier.hotel}</li></ul>
        </div>
        <div class="detail-block">
          <h5>Transport</h5>
          <ul><li>${tier.transport}</li></ul>
        </div>
        ${listBlock("Inclusions", tier.inclusions)}
        ${listBlock("Exclusions", tier.exclusions, "exclusions")}
        ${listBlock("Things to Carry", tier.thingsToCarry)}
      </div>`;
  }

  function renderModalBody(pkg) {
    const tier = pkg.tiers[activeTier];
    return `
      <div class="modal-hero">
        <img src="${pkg.image}" alt="${pkg.title}" />
        <button class="modal-close" id="modalCloseBtn" aria-label="Close">✕</button>
      </div>
      <div class="modal-body">
        <h2>${pkg.icon} ${pkg.title}</h2>
        <p class="subtitle">${pkg.duration} • ${pkg.group} • ${pkg.subtitle}</p>

        <ul class="highlight-list">
          ${pkg.highlights.map((h) => `<li>${h}</li>`).join("")}
        </ul>

        <div class="reel-row">
          <a class="reel-card" href="${pkg.youtubeReelUrl}" target="_blank" rel="noopener">
            <img src="${pkg.youtubeThumbnail}" alt="Watch on YouTube" />
            <div class="play"><span class="play-icon">▶</span><span class="platform-label">YOUTUBE REEL</span></div>
          </a>
          <a class="reel-card" href="${pkg.instagramReelUrl}" target="_blank" rel="noopener">
            <img src="${pkg.instagramThumbnail}" alt="Watch on Instagram" />
            <div class="play"><span class="play-icon">▶</span><span class="platform-label">INSTAGRAM REEL</span></div>
          </a>
        </div>

        <div class="tier-tabs" id="tierTabs">${buildTierTabsHtml(pkg)}</div>
        <div id="plansContainer">${buildPlansHtml(tier)}</div>
        <div id="detailContainer">${buildDetailGridHtml(tier)}</div>

        <div class="modal-cta-bar">
          <a class="btn btn--whatsapp btn--full" href="${waLink(SITE_CONFIG.whatsappNumber, packageWaMessage(pkg))}" target="_blank" rel="noopener">💬 Book on WhatsApp</a>
          <a class="btn btn--navy btn--full" href="${telLink(SITE_CONFIG.callNumber)}">📞 Call Now</a>
        </div>
      </div>`;
  }

  function openModal(pkgId) {
    const pkg = PACKAGES.find((p) => p.id === pkgId);
    if (!pkg) return;
    activeTier = "standard";

    const overlay = $("#modalOverlay");
    const content = $("#modalContent");
    content.innerHTML = renderModalBody(pkg);
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";

    $("#modalCloseBtn").addEventListener("click", closeModal);

    $$(".tier-tab", content).forEach((tab) => {
      tab.addEventListener("click", () => {
        activeTier = tab.dataset.tier;
        const tier = pkg.tiers[activeTier];
        $$(".tier-tab", content).forEach((t) => t.classList.toggle("is-active", t.dataset.tier === activeTier));
        $("#plansContainer").innerHTML = buildPlansHtml(tier);
        $("#detailContainer").innerHTML = buildDetailGridHtml(tier);
      });
    });
  }

  function closeModal() {
    $("#modalOverlay").classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function initModalDismiss() {
    $("#modalOverlay").addEventListener("click", (e) => {
      if (e.target.id === "modalOverlay") closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  // ---------------------------------------------------------------
  // Reviews
  // ---------------------------------------------------------------
  function renderReviews() {
    $("#reviewGrid").innerHTML = REVIEWS.map(
      (r) => `
      <div class="review-card">
        <div class="review-stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
        <p class="review-text">"${r.text}"</p>
        <div class="review-person">
          <div class="review-avatar"><img src="${r.photo}" alt="${r.name}" loading="lazy" /></div>
          <div>
            <strong>${r.name}</strong>
            <span>${r.location}</span>
          </div>
        </div>
      </div>`
    ).join("");
  }

  // ---------------------------------------------------------------
  // Social proof band
  // ---------------------------------------------------------------
  function renderSocialBand() {
    const s = SITE_CONFIG.stats;
    $("#socialBand").innerHTML = `
      <div>
        <div class="num">${s.followers}</div>
        <div class="label">${s.followersLabel}</div>
      </div>
      <div>
        <div class="num">${s.views}</div>
        <div class="label">${s.viewsLabel}</div>
      </div>
      <div class="social-links">
        <a class="social-icon-btn" href="${SITE_CONFIG.social.youtube}" target="_blank" rel="noopener" aria-label="YouTube">▶</a>
        <a class="social-icon-btn" href="${SITE_CONFIG.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">◎</a>
        <a class="social-icon-btn" href="${SITE_CONFIG.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">f</a>
      </div>`;
  }

  // ---------------------------------------------------------------
  // Contact list
  // ---------------------------------------------------------------
  function renderContactList() {
    $("#contactList").innerHTML = `
      <div class="contact-row">
        <span class="icon">📞</span>
        <div><strong>Call Us</strong><span>${SITE_CONFIG.callNumber}</span></div>
      </div>
      <div class="contact-row">
        <span class="icon">💬</span>
        <div><strong>WhatsApp</strong><span>+${SITE_CONFIG.whatsappNumber}</span></div>
      </div>
      <div class="contact-row">
        <span class="icon">✉️</span>
        <div><strong>Email</strong><span>${SITE_CONFIG.email}</span></div>
      </div>
      <div class="contact-row">
        <span class="icon">🕐</span>
        <div><strong>Office Hours</strong><span>${SITE_CONFIG.officeHours}</span></div>
      </div>`;
  }

  // ---------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------
  function init() {
  initNav();
  initContactLinks();
  renderTrustStrip();
  // renderAboutStats();   <-- ❌ is line ko comment kar diya
  renderPackageGrid();
  renderReviews();
  renderSocialBand();
  renderContactList();
  initModalDismiss();
  $("#year").textContent = new Date().getFullYear();
}
// 🔍 Search + Reset functionality
    const searchInput = document.getElementById("searchInput");
    const resetBtn = document.getElementById("resetBtn");

    if (searchInput && resetBtn) {
      searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll(".package-card");

        cards.forEach(card => {
          const title = card.querySelector("h3").textContent.toLowerCase();
          card.style.display = title.includes(query) ? "block" : "none";
        });
      });

      resetBtn.addEventListener("click", () => {
        searchInput.value = "";
        const cards = document.querySelectorAll(".package-card");
        cards.forEach(card => card.style.display = "block");
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);

})();   // IIFE close
