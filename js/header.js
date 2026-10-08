/* =====================================================================
   HEADER (js/header.js)
   - Jis section par ho uska link apne aap yellow ho jata hai
   - Scroll karne par bar ke neeche halka saaya aata hai
   - Mobile menu khulne par peeche ka page scroll nahi hota
   - Mobile menu ka WhatsApp button aur office time js/data.js se
   Is file mein kuch badalna nahi hai.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const site = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};
  const digits = (s) => String(s || "").replace(/\D/g, "");
  const withIndia = (d) => (d.length === 10 ? "91" + d : d);
  const wa = withIndia(digits(site.whatsappNumber));

  // ---------- mobile menu: office time + WhatsApp ----------
  const hours = document.getElementById("drawerHours");
  if (hours && site.officeHours) hours.textContent = site.officeHours;

  const navWa = document.getElementById("navWhatsapp");
  if (navWa && wa) {
    navWa.href = "https://wa.me/" + wa + "?text=" + encodeURIComponent(site.whatsappDefaultMessage || "");
    navWa.target = "_blank";
    navWa.rel = "noopener";
  }

  // ---------- active link + scroll effect ----------
  const sectionIds = ["about", "packages", "reviews", "contact"];
  function update() {
    header.classList.toggle("is-scrolled", window.scrollY > 40);

    const y = window.scrollY + header.offsetHeight + 90;
    let active = null;
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= y) active = id;
    });
    header.querySelectorAll('a[href^="#"]').forEach((a) => {
      if (a.classList.contains("nav-book") || a.classList.contains("drawer-book") || a.classList.contains("brand")) return;
      a.classList.toggle("is-active", !!active && a.getAttribute("href") === "#" + active);
    });
  }
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();

  // ---------- menu khulne par peeche ka scroll band ----------
  const drawer = document.getElementById("navDrawer");
  if (drawer && "MutationObserver" in window) {
    new MutationObserver(function () {
      document.body.classList.toggle("menu-lock", drawer.classList.contains("is-open"));
    }).observe(drawer, { attributes: true, attributeFilter: ["class"] });
  }
});
