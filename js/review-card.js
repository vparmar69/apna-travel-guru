/* =====================================================================
   REVIEW CARD — shared helper (home page + reviews.html dono use karte hain)
   Is file mein kuch badalna nahi hai.
   ===================================================================== */

export const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));

// nitesh123@gmail.com  ->  ni******23@gmail.com  (poora email kabhi save/show nahi hota)
export function maskEmail(email) {
  if (!email || !email.includes("@")) return "";
  const [local, domain] = email.split("@");
  if (local.length <= 4) return local.charAt(0) + "***@" + domain;
  return (
    local.slice(0, 2) +
    "*".repeat(Math.min(local.length - 4, 10)) +
    local.slice(-2) +
    "@" +
    domain
  );
}

function fmtTripDate(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "");
  return m ? `${m[3]}/${m[2]}/${m[1]}` : s || "";
}

export function cardHtml(id, r, canManage) {
  const rating = Math.max(1, Math.min(5, Number(r.rating) || 5));
  const created = r.createdAt ? r.createdAt.toDate() : null;
  const when = created
    ? `${created.toLocaleDateString("en-GB")} • ${created.toLocaleTimeString("en-US", {
        hour: "numeric", minute: "2-digit", hour12: true,
      })}`
    : "";
  const avatar = r.photo
    ? `<img src="${esc(r.photo)}" alt="${esc(r.name)}" referrerpolicy="no-referrer" />`
    : esc((r.name || "T").charAt(0).toUpperCase());
  const actions = canManage
    ? `<div class="rv-actions">
         <button type="button" data-action="edit" data-id="${id}">Edit</button>
         <button type="button" class="danger" data-action="delete" data-id="${id}">Delete</button>
       </div>`
    : "";

  return `
    <article class="rv-card">
      <div class="rv-head">
        <div class="rv-avatar">${avatar}</div>
        <div>
          <div class="rv-name">${esc(r.name)}</div>
          ${r.emailMasked ? `<div class="rv-email">${esc(r.emailMasked)}</div>` : ""}
        </div>
      </div>
      <div class="rv-rating" aria-label="${rating} out of 5 stars">${"★".repeat(rating)}<span class="rv-off">${"★".repeat(5 - rating)}</span></div>
      <div class="rv-meta">
        <div>${esc(when)}${r.editedAt ? '<span class="rv-edited">(edited)</span>' : ""}</div>
        <div class="rv-trip">${esc(r.trip)}</div>
        <div>Trip started on: ${esc(fmtTripDate(r.tripDate))}</div>
      </div>
      <div class="rv-body">
        <div class="rv-text">${esc(r.text)}</div>
        <span class="rv-more" role="button" tabindex="0" data-more>...Read more</span>
      </div>
      ${actions}
    </article>`;
}

// "Read more" sirf tab dikhao jab text 3 line se bada ho
export function markClamped(root) {
  root.querySelectorAll(".rv-body").forEach((b) => {
    if (b.classList.contains("expanded")) return;
    const t = b.querySelector(".rv-text");
    b.classList.toggle("clamped", t.scrollHeight > t.clientHeight + 1);
  });
}

export function watchClamp(root) {
  let timer;
  window.addEventListener("resize", () => {
    clearTimeout(timer);
    timer = setTimeout(() => markClamped(root), 150);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => markClamped(root));
  }
}

// Read more / Read less click. true return karta hai agar click isi ka tha
export function toggleMore(target) {
  const more = target.closest("[data-more]");
  if (!more) return false;
  const body = more.closest(".rv-body");
  const open = body.classList.toggle("expanded");
  more.textContent = open ? "Read less" : "...Read more";
  return true;
}
