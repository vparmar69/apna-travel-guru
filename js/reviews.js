/* =====================================================================
   APNA TRAVEL GURU — REVIEWS (Firebase: permanent save)
   - Google login (Firebase Auth)
   - Reviews Firestore mein save hote hain (refresh par nahi jaate)
   - Review likhne wala apna review Edit / Delete kar sakta hai
   - Admin (aap) sabke reviews Edit / Delete kar sakte ho

   SIRF 2 JAGAH BADALNI HAI:
   1) firebaseConfig  (Firebase console se copy karke)
   2) ADMIN_EMAIL     (aapka Gmail)
   ===================================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore, collection, addDoc, doc, updateDoc, deleteDoc,
  onSnapshot, query, orderBy, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 👇 1) Yahan Firebase console wala config paste karo
const firebaseConfig = {
  apiKey: "AIzaSyCz8-YLTxfGZyHtqyYo_MLXc-cdhiHj098",
  authDomain: "apna-travel-guru.firebaseapp.com",
  projectId: "apna-travel-guru",
  storageBucket: "apna-travel-guru.firebasestorage.app",
  messagingSenderId: "435077093405",
  appId: "1:435077093405:web:1f71ab69eca65f04694ef4",
};

// 👇 2) Yahan apna Gmail likho (jisse aap admin banoge)
const ADMIN_EMAIL = "parmarnitesh237@gmail.com";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ---------- page elements ----------
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
  const LIMIT = 4;
  let showAll = false;
  let editingId = null;
  let allDocs = [];
  let reviewsById = {};

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));

  const isAdmin = () =>
    !!auth.currentUser && auth.currentUser.email === ADMIN_EMAIL;

  // ---------- extra UI: cancel button + login info ----------
  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.className = "btn";
  cancelBtn.textContent = "Cancel edit";
  cancelBtn.style.cssText =
    "display:none;width:100%;margin-top:10px;background:transparent;color:#FFC400;border:1px solid #FFC400;border-radius:16px;padding:10px;";
  submitBtn.insertAdjacentElement("afterend", cancelBtn);

  const authInfo = document.createElement("p");
  authInfo.style.cssText = "margin-top:12px;font-size:13px;color:#8FA0B8;text-align:center;";
  cancelBtn.insertAdjacentElement("afterend", authInfo);

  function updateAuthUI() {
    const u = auth.currentUser;
    submitBtn.textContent = !u
      ? "Sign in to Submit"
      : editingId ? "Update Review" : "Submit Review";
    authInfo.innerHTML = u
      ? `Signed in as <strong>${esc(u.displayName || "User")}</strong>${isAdmin() ? " (Admin)" : ""} · <a href="#" id="signOutLink" style="color:#FFC400;text-decoration:underline;">Sign out</a>`
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

  // ---------- render reviews ----------
  function renderReviews() {
    reviewsById = {};
    if (!allDocs.length) {
      list.innerHTML = `<p style="color:#8FA0B8;">Abhi tak koi review nahi hai. Pehla review aap likho! ✍️</p>`;
      if (viewAllBtn) viewAllBtn.style.display = "none";
      return;
    }
    const uid = auth.currentUser ? auth.currentUser.uid : null;
    const admin = isAdmin();

    list.innerHTML = allDocs
      .map((d, i) => {
        const r = d.data({ serverTimestamps: "estimate" });
        reviewsById[d.id] = r;
        const rating = Math.max(1, Math.min(5, Number(r.rating) || 5));
        const when = r.createdAt ? r.createdAt.toDate().toLocaleDateString("en-IN") : "";
        const avatar = r.photo
          ? `<img src="${esc(r.photo)}" alt="${esc(r.name)}" referrerpolicy="no-referrer" />`
          : `<div class="avatar">${esc((r.name || "T").charAt(0))}</div>`;
        const canManage = uid && (r.uid === uid || admin);
        const actions = canManage
          ? `<div class="review-actions">
               <button type="button" data-action="edit" data-id="${d.id}">Edit</button>
               <button type="button" class="danger" data-action="delete" data-id="${d.id}">Delete</button>
             </div>`
          : "";
        const hidden = !showAll && i >= LIMIT ? ' style="display:none"' : "";
        return `
          <div class="review-card"${hidden}>
            <div class="review-header">
              <div class="review-avatar">${avatar}</div>
              <div class="review-user"><strong class="review-name">${esc(r.name)}</strong></div>
            </div>
            <div class="review-stars stars">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</div>
            <div class="review-meta">
              <span class="trip-name">${esc(r.trip)}</span><br>
              <small>Trip started on: ${esc(r.tripDate)}</small><br>
              <small>Reviewed on: ${esc(when)}${r.editedAt ? " (edited)" : ""}</small>
            </div>
            <p class="review-text">${esc(r.text)}</p>
            ${actions}
          </div>`;
      })
      .join("");

    if (viewAllBtn) {
      viewAllBtn.style.display = allDocs.length > LIMIT ? "block" : "none";
      viewAllBtn.textContent = showAll ? "Show Less" : "View All";
    }
  }

  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", () => {
      showAll = !showAll;
      renderReviews();
    });
  }

  // ---------- live reviews from Firestore ----------
  const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
  onSnapshot(
    q,
    (snap) => {
      allDocs = snap.docs;
      renderReviews();
    },
    (err) => {
      console.error("Reviews load error:", err);
      list.innerHTML = `<p style="color:#ff6b6b;">Reviews load nahi ho paaye. Thodi der baad try karo.</p>`;
    }
  );

  onAuthStateChanged(auth, () => {
    updateAuthUI();
    renderReviews(); // login/logout par Edit-Delete buttons update
  });

  // ---------- Edit / Delete clicks ----------
  list.addEventListener("click", async (e) => {
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
  });

  function endEdit() {
    editingId = null;
    form.reset();
    ratingInput.value = "";
    paintStars(0);
    cancelBtn.style.display = "none";
    updateAuthUI();
  }
  cancelBtn.addEventListener("click", endEdit);

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
