/* =====================================================================
   APNA TRAVEL GURU — ALL REVIEWS PAGE (reviews.html)
   Is file mein kuch badalna nahi hai.
   ===================================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore, collection, doc, deleteDoc, onSnapshot, query, orderBy,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig, ADMIN_EMAIL } from "./firebase-config.js";
import { esc, cardHtml, markClamped, watchClamp, toggleMore } from "./review-card.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const listEl = document.getElementById("allReviews");
const countEl = document.getElementById("count");
const authBox = document.getElementById("authBox");

let allDocs = [];

const isAdmin = () =>
  !!auth.currentUser && auth.currentUser.email === ADMIN_EMAIL;

function render() {
  if (countEl) countEl.textContent = allDocs.length ? `Total reviews: ${allDocs.length}` : "";
  if (!allDocs.length) {
    listEl.innerHTML = `<p class="rv-empty">Abhi tak koi review nahi hai.</p>`;
    return;
  }
  const uid = auth.currentUser ? auth.currentUser.uid : null;
  const admin = isAdmin();

  listEl.innerHTML = allDocs
    .map((d) => {
      const r = d.data({ serverTimestamps: "estimate" });
      return cardHtml(d.id, r, !!uid && (r.uid === uid || admin));
    })
    .join("");
  markClamped(listEl);
}
watchClamp(listEl);

function renderAuth() {
  const u = auth.currentUser;
  if (!authBox) return;
  authBox.innerHTML = u
    ? `Signed in as <strong>${esc(u.displayName || "User")}</strong>${isAdmin() ? " (Admin)" : ""} · <a href="#" id="soLink">Sign out</a>`
    : `<a href="#" id="siLink">Sign in with Google</a> <span style="color:#8FA0B8;">(apna review edit/delete karne ke liye)</span>`;
  const so = document.getElementById("soLink");
  const si = document.getElementById("siLink");
  if (so) so.addEventListener("click", (e) => { e.preventDefault(); signOut(auth); });
  if (si) si.addEventListener("click", (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).catch((err) => {
      if (err.code !== "auth/popup-closed-by-user") console.error(err);
    });
  });
}

onSnapshot(
  query(collection(db, "reviews"), orderBy("createdAt", "desc")),
  (snap) => {
    allDocs = snap.docs;
    render();
  },
  (err) => {
    console.error(err);
    listEl.innerHTML = `<p class="rv-empty" style="color:#ff6b6b;">Reviews load nahi ho paaye. Thodi der baad try karo.</p>`;
  }
);

onAuthStateChanged(auth, () => {
  renderAuth();
  render();
});

listEl.addEventListener("click", async (e) => {
  if (toggleMore(e.target)) return;

  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const id = btn.dataset.id;

  if (btn.dataset.action === "delete") {
    if (!confirm("Kya aap ye review delete karna chahte ho?")) return;
    try {
      await deleteDoc(doc(db, "reviews", id));
    } catch (err) {
      console.error(err);
      alert("Delete nahi ho paaya: " + (err.code || err.message));
    }
  }
  if (btn.dataset.action === "edit") {
    // Edit form home page par hai, wahan le jaate hain
    window.location.href = "index.html?edit=" + encodeURIComponent(id) + "#reviews";
  }
});
