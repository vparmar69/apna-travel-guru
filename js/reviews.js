/* =====================================================================
   APNA TRAVEL GURU — REVIEWS (home page)
   - Latest 4 reviews, 2x2 grid
   - Review 3 line ka, "...Read more" se poora
   - "View All" -> reviews.html
   - Owner apna review Edit/Delete kare, Admin sabka
   Is file mein kuch badalna nahi hai.
   ===================================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore, collection, addDoc, doc, updateDoc, deleteDoc,
  onSnapshot, query, orderBy, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig, ADMIN_EMAIL } from "./firebase-config.js";
import { esc, maskEmail, cardHtml, markClamped, watchClamp, toggleMore } from "./review-card.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const form = document.getElementById("reviewForm");
const list = document.getElementById("reviewList");
const submitBtn = document.getElementById("reviewSubmitBtn");
const viewAllBtn = document.getElementById("viewAllBtn");
const ratingInput = document.getElementById("reviewRating");
const tripInput = document.getElementById("reviewTrip");
const dateInput = document.getElementById("reviewDate");
const textInput = document.getElementById("reviewText");
const stars = document.querySelectorAll("#starRating span");

if (form && list && submitBtn) {
  const LIMIT = 4; // home page par kitne reviews
  let editingId = null;
  let pendingEditId = new URLSearchParams(location.search).get("edit");
  let allDocs = [];
  let reviewsById = {};

  const isAdmin = () =>
    !!auth.currentUser && auth.currentUser.email === ADMIN_EMAIL;

  // ---------- extra UI: cancel button + login info ----------
  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.className = "rv-cancel";
  cancelBtn.textContent = "Cancel edit";
  cancelBtn.style.display = "none";
  submitBtn.insertAdjacentElement("afterend", cancelBtn);

  const authInfo = document.createElement("p");
  authInfo.className = "rv-authinfo";
  cancelBtn.insertAdjacentElement("afterend", authInfo);

  function updateAuthUI() {
    const u = auth.currentUser;
    submitBtn.textContent = !u
      ? "Sign in to Submit"
      : editingId ? "Update Review" : "Submit Review";
    authInfo.innerHTML = u
      ? `Signed in as <strong>${esc(u.displayName || "User")}</strong>${isAdmin() ? " (Admin)" : ""} · <a href="#" id="signOutLink">Sign out</a>`
      : "";
    const so = document.getElementById("signOutLink");
    if (so) so.addEventListener("click", (e) => { e.preventDefault(); signOut(auth); });
  }

  // ---------- stars ----------
  function paintStars(value) {
    stars.forEach((s) =>
      s.classList.toggle("selected", Number(s.dataset.value) <= Number(value || 0))
    );
  }
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      ratingInput.value = star.dataset.value;
      paintStars(ratingInput.value);
    });
    star.addEventListener("mouseover", () => paintStars(star.dataset.value));
    star.addEventListener("mouseout", () => paintStars(ratingInput.value));
  });

  // ---------- render ----------
  function renderReviews() {
    reviewsById = {};
    allDocs.forEach((d) => {
      reviewsById[d.id] = d.data({ serverTimestamps: "estimate" });
    });

    if (!allDocs.length) {
      list.innerHTML = `<p class="rv-empty">Abhi tak koi review nahi hai. Pehla review aap likho! ✍️</p>`;
      if (viewAllBtn) viewAllBtn.style.display = "none";
      return;
    }

    const uid = auth.currentUser ? auth.currentUser.uid : null;
    const admin = isAdmin();

    list.innerHTML = allDocs
      .slice(0, LIMIT)
      .map((d) => cardHtml(d.id, reviewsById[d.id], !!uid && (reviewsById[d.id].uid === uid || admin)))
      .join("");

    markClamped(list);
    if (viewAllBtn) viewAllBtn.style.display = allDocs.length > LIMIT ? "block" : "none";
  }
  watchClamp(list);

  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", () => {
      window.location.href = "reviews.html";
    });
  }

  // ---------- edit helpers ----------
  function startEdit(id) {
    const r = reviewsById[id];
    if (!r) return;
    editingId = id;
    tripInput.value = r.trip || "";
    dateInput.value = r.tripDate || "";
    ratingInput.value = r.rating;
    paintStars(r.rating);
    textInput.value = r.text || "";
    cancelBtn.style.display = "block";
    updateAuthUI();
    form.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function endEdit() {
    editingId = null;
    form.reset();
    ratingInput.value = "";
    paintStars(0);
    cancelBtn.style.display = "none";
    updateAuthUI();
  }
  cancelBtn.addEventListener("click", endEdit);

  // reviews.html se "Edit" dabane par yahan aata hai (?edit=ID)
  function tryPendingEdit() {
    if (!pendingEditId) return;
    const r = reviewsById[pendingEditId];
    const u = auth.currentUser;
    if (!r || !u) return;
    if (r.uid === u.uid || isAdmin()) startEdit(pendingEditId);
    pendingEditId = null;
    history.replaceState(null, "", location.pathname + "#reviews");
  }

  // ---------- live reviews ----------
  onSnapshot(
    query(collection(db, "reviews"), orderBy("createdAt", "desc")),
    (snap) => {
      allDocs = snap.docs;
      renderReviews();
      tryPendingEdit();
    },
    (err) => {
      console.error("Reviews load error:", err);
      list.innerHTML = `<p class="rv-empty" style="color:#ff6b6b;">Reviews load nahi ho paaye. Thodi der baad try karo.</p>`;
    }
  );

  onAuthStateChanged(auth, () => {
    updateAuthUI();
    renderReviews();
    tryPendingEdit();
  });

  // ---------- clicks in list ----------
  list.addEventListener("click", async (e) => {
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
    if (btn.dataset.action === "edit") startEdit(id);
  });

  // ---------- Submit / Update ----------
  submitBtn.addEventListener("click", async () => {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (!ratingInput.value) {
      alert("Please star rating select karo.");
      return;
    }

    submitBtn.disabled = true;
    try {
      // Login popup seedha click par khulta hai
      if (!auth.currentUser) await signInWithPopup(auth, provider);
      const user = auth.currentUser;

      const payload = {
        trip: tripInput.value,
        tripDate: dateInput.value,
        rating: Number(ratingInput.value),
        text: textInput.value.trim(),
      };

      if (editingId) {
        await updateDoc(doc(db, "reviews", editingId), {
          ...payload,
          editedAt: serverTimestamp(),
        });
        endEdit();
      } else {
        await addDoc(collection(db, "reviews"), {
          ...payload,
          uid: user.uid,
          name: user.displayName || "Traveler",
          emailMasked: maskEmail(user.email), // sirf masked email save hota hai
          photo: user.photoURL || "",
          createdAt: serverTimestamp(),
        });
        form.reset();
        ratingInput.value = "";
        paintStars(0);
      }
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user" && err.code !== "auth/cancelled-popup-request") {
        console.error(err);
        alert("Kuch galat hua: " + (err.code || err.message));
      }
    }
    submitBtn.disabled = false;
    updateAuthUI();
  });

  updateAuthUI();
}

/* ===== Mobile: swipe + dots (. . . .) neeche ===== */
(function () {
  const list = document.getElementById("reviewList");
  if (!list) return;

  const dots = document.createElement("div");
  dots.className = "rv-dots";
  list.insertAdjacentElement("afterend", dots);

  const GAP = 14; // CSS ke gap se same
  const cards = () => Array.from(list.querySelectorAll(".rv-card"));
  const step = () => {
    const c = cards()[0];
    return c ? c.offsetWidth + GAP : list.clientWidth;
  };

  function update() {
    const idx = Math.round(list.scrollLeft / step());
    dots.querySelectorAll(".rv-dot").forEach((d, i) => d.classList.toggle("is-active", i === idx));
  }
  function build() {
    const n = cards().length;
    let h = "";
    for (let i = 0; i < n; i++) {
      h += '<button type="button" class="rv-dot" aria-label="Go to review ' + (i + 1) + '" data-i="' + i + '"></button>';
    }
    dots.innerHTML = h;
    update();
  }

  dots.addEventListener("click", (e) => {
    const b = e.target.closest(".rv-dot");
    if (b) list.scrollTo({ left: Number(b.dataset.i) * step(), behavior: "smooth" });
  });
  list.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  new MutationObserver(build).observe(list, { childList: true }); // naye reviews aane par dots badal jate hain
  build();
})();
