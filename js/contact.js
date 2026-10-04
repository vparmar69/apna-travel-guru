/* =====================================================================
   CONTACT SECTION (design A)
   - Dark cards line-icons ke saath (Call, WhatsApp, Email, Office Hours)
   - WhatsApp / Call number mein 91 apne aap jud jata hai (agar nahi hai)
   - Map: click karne par hi chalta hai (scroll karte waqt atakta nahi)
   - Scroll par cards ek-ek karke aate hain
   Is file mein kuch badalna nahi hai. Data js/data.js se aata hai.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const section = document.getElementById("contact");
  const list = document.getElementById("contactList");
  if (!section || !list || typeof SITE_CONFIG === "undefined") return;

  section.classList.add("ct-ready");
  const C = SITE_CONFIG;

  // ---------- numbers ----------
  const digits = (s) => String(s || "").replace(/\D/g, "");
  const withIndia = (d) => (d.length === 10 ? "91" + d : d);
  const wa = withIndia(digits(C.whatsappNumber));
  const call = withIndia(digits(C.callNumber));
  const pretty = (d) =>
    d.length === 12 && d.indexOf("91") === 0
      ? "+91 " + d.slice(2, 7) + " " + d.slice(7)
      : d ? "+" + d : "";
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));

  const waHref = "https://wa.me/" + wa + "?text=" + encodeURIComponent(C.whatsappDefaultMessage || "");
  const telHref = "tel:+" + call;

  // baaki jagah ke WhatsApp / Call links bhi sahi number par
  ["contactWhatsapp", "fabWhatsapp", "heroWhatsapp"].forEach((id) => {
    const el = document.getElementById(id);
    if (el && wa) el.href = waHref;
  });
  ["fabCall", "heroCall"].forEach((id) => {
    const el = document.getElementById(id);
    if (el && call) el.href = telHref;
  });

  // ---------- icons ----------
  const svg = (color, body) =>
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="' + color +
    '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + "</svg>";
  const ICON = {
    phone: svg("#FFC400", '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'),
    chat: svg("#25d366", '<path d="M21 11.5a8.4 8.4 0 0 1-12.5 7.3L3 20l1.3-5.3A8.4 8.4 0 1 1 21 11.5z"/>'),
    mail: svg("#FFC400", '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'),
    clock: svg("#FFC400", '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  };

  // ---------- cards ----------
  const rows = [
    { label: "Call Us", value: pretty(call), href: call ? telHref : "", icon: ICON.phone, cls: "" },
    { label: "WhatsApp", value: pretty(wa), href: wa ? waHref : "", icon: ICON.chat, cls: "is-wa", ext: true },
    { label: "Email", value: C.email, href: C.email ? "mailto:" + C.email : "", icon: ICON.mail, cls: "" },
    { label: "Office Hours", value: C.officeHours, href: "", icon: ICON.clock, cls: "" },
  ].filter((r) => r.value);

  list.innerHTML = rows
    .map((r) => {
      const inner =
        '<span class="ct-ico">' + r.icon + "</span>" +
        '<span class="ct-text"><span class="ct-label">' + esc(r.label) + '</span><span class="ct-value">' + esc(r.value) + "</span></span>" +
        (r.href ? '<span class="ct-arrow">→</span>' : "");
      return r.href
        ? '<a class="ct-card ct-anim ' + r.cls + '" href="' + esc(r.href) + '"' + (r.ext ? ' target="_blank" rel="noopener"' : "") + ">" + inner + "</a>"
        : '<div class="ct-card ct-anim ' + r.cls + '">' + inner + "</div>";
    })
    .join("");

  // ---------- map: click karne par hi chalega ----------
  const frame = section.querySelector(".map-frame");
  if (frame) {
    frame.addEventListener("click", () => frame.classList.add("is-active"));
    frame.addEventListener("mouseleave", () => frame.classList.remove("is-active"));
    document.addEventListener("click", (e) => {
      if (!frame.contains(e.target)) frame.classList.remove("is-active");
    });
  }

  // ---------- scroll par animation ----------
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          section.classList.add("ct-in");
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(section);
  } else {
    section.classList.add("ct-in");
  }
});
