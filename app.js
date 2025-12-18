const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

/* ---------------------------
   Mobile nav
--------------------------- */
const navBtn = $("#navBtn");
const nav = $("#nav");

navBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("isOpen");
  navBtn.setAttribute("aria-expanded", String(open));
});

nav?.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("isOpen");
    navBtn.setAttribute("aria-expanded", "false");
  }
});

/* ---------------------------
   Client cases
--------------------------- */
const cases = [
  {
    name: "Case A — Busy professional",
    tagline: "3x/week strength, 35–45 min sessions",
    result: "Stronger squat + fewer back flare-ups",
    details: {
      startingPoint: "Inconsistent training, lots of sitting, occasional low-back irritation.",
      plan: [
        "2 lower sessions + 1 upper",
        "RPE-based progression (auto-regulation)",
        "Daily 6-minute mobility micro-dose",
      ],
      changesThatWorked: [
        "Cut volume slightly, increased consistency",
        "Better bracing + hinge pattern clean-up",
        "Swapped random cardio for zone-2 walks",
      ],
      timeframe: "8–12 weeks",
    }
  },
  {
    name: "Case B — Strength + physique",
    tagline: "Hypertrophy blocks with performance focus",
    result: "Visible muscle gain + stronger presses",
    details: {
      startingPoint: "Training hard but not progressing—no structure, too much junk volume.",
      plan: [
        "Upper/lower split (4 days) OR 3-day full-body variant",
        "Progression targets on 4 main lifts",
        "Protein + sleep minimums",
      ],
      changesThatWorked: [
        "Fewer exercises, more intent",
        "Better load selection and rest times",
        "Simple weekly check-ins kept adherence high",
      ],
      timeframe: "10–16 weeks",
    }
  },
  {
    name: "Case C — Pain-resilient training",
    tagline: "Build tolerance, not fear",
    result: "Back to training without flare-ups",
    details: {
      startingPoint: "Avoiding lifts due to pain history; anxious about loading.",
      plan: [
        "Gradual exposure: ranges → tempo → load",
        "Hip + thoracic control",
        "Technique video feedback",
      ],
      changesThatWorked: [
        "Small weekly increases, no hero sessions",
        "Consistent warm-up flow",
        "Tracked symptoms like data, not drama",
      ],
      timeframe: "6–10 weeks",
    }
  }
];

const casesGrid = $("#casesGrid");
const modal = $("#modal");
const modalContent = $("#modalContent");

function openModal(html) {
  modalContent.innerHTML = html;
  modal.classList.add("isOpen");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("isOpen");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function renderCases() {
  if (!casesGrid) return;

  casesGrid.innerHTML = cases.map((c, idx) => `
    <article class="card" role="button" tabindex="0" data-case="${idx}" aria-label="Open ${escapeHtml(c.name)}">
      <h3>${escapeHtml(c.name)}</h3>
      <p class="muted">${escapeHtml(c.tagline)}</p>
      <div style="height:10px"></div>
      <p><strong>${escapeHtml(c.result)}</strong></p>
      <div style="height:12px"></div>
      <span class="tag">View details</span>
    </article>
  `).join("");

  // Click + keyboard open
  $$("#casesGrid .card").forEach(card => {
    card.addEventListener("click", () => openCase(card.dataset.case));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCase(card.dataset.case);
      }
    });
  });
}

function openCase(index) {
  const c = cases[Number(index)];
  if (!c) return;

  const html = `
    <h3>${escapeHtml(c.name)}</h3>
    <p class="muted">${escapeHtml(c.tagline)}</p>
    <div style="height:10px"></div>
    <p><strong>Result:</strong> ${escapeHtml(c.result)}</p>

    <div style="height:14px"></div>
    <div class="card" style="box-shadow:none">
      <p><strong>Starting point</strong></p>
      <p class="muted">${escapeHtml(c.details.startingPoint)}</p>

      <div style="height:12px"></div>
      <p><strong>Plan</strong></p>
      <ul class="list">${c.details.plan.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

      <p><strong>What changed</strong></p>
      <ul class="list">${c.details.changesThatWorked.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

      <p class="muted"><strong>Timeframe:</strong> ${escapeHtml(c.details.timeframe)}</p>
    </div>
  `;
  openModal(html);
}

modal?.addEventListener("click", (e) => {
  const close = e.target?.dataset?.close === "true";
  if (close) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("isOpen")) closeModal();
});

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

renderCases();

/* ---------------------------
   Booking link helper
--------------------------- */
const bookingFrame = $("#bookingFrame");
const openBookingNewTab = $("#openBookingNewTab");

function getBookingUrl() {
  // If you set CALENDAR_EMBED_URL correctly, we reuse it here.
  const src = bookingFrame?.getAttribute("src") || "";
  if (!src || src.includes("CALENDAR_EMBED_URL")) return "";
  return src;
}

openBookingNewTab?.addEventListener("click", (e) => {
  const url = getBookingUrl();
  if (!url) {
    e.preventDefault();
    alert("Add your Google Calendar embed URL first (replace CALENDAR_EMBED_URL in index.html).");
    return;
  }
  openBookingNewTab.setAttribute("href", url);
});

/* ---------------------------
   Forms (front-end demo)
--------------------------- */
$("#waitlistForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = $("#waitlistEmail")?.value?.trim();
  if (!email) return;

  // Replace this with a real endpoint later
  alert("You’re on the waitlist! (Demo) " + email);
  e.target.reset();
});

$("#contactForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = $("#name").value.trim();
  const email = $("#email").value.trim();
  const goal = $("#goal").value.trim();
  const message = $("#message").value.trim();

  if (!name || !email || !goal || !message) return;

  // Demo-only: mailto fallback (works instantly without backend)
  const subject = encodeURIComponent(`PT inquiry from ${name}`);
  const body = encodeURIComponent(
`Name: ${name}
Email: ${email}
Goal: ${goal}

Message:
${message}`
  );

  window.location.href = `mailto:you@domain.com?subject=${subject}&body=${body}`;
});

/* ---------------------------
   Footer year + theme toggle
--------------------------- */
$("#year").textContent = String(new Date().getFullYear());

const themeBtn = $("#themeBtn");
themeBtn?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "" : "light";
  if (next) document.documentElement.setAttribute("data-theme", next);
  else document.documentElement.removeAttribute("data-theme");

  try {
    localStorage.setItem("theme", next || "dark");
  } catch {}
});

try {
  const saved = localStorage.getItem("theme");
  if (saved === "light") document.documentElement.setAttribute("data-theme", "light");
} catch {}

// Simple carousel
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector("[data-track]");
  const slides = Array.from(track.querySelectorAll("img"));
  const prev = carousel.querySelector("[data-prev]");
  const next = carousel.querySelector("[data-next]");
  let idx = 0;

  function render(){
    track.style.transform = `translateX(${-idx * 100}%)`;
  }
  prev?.addEventListener("click", () => {
    idx = (idx - 1 + slides.length) % slides.length;
    render();
  });
  next?.addEventListener("click", () => {
    idx = (idx + 1) % slides.length;
    render();
  });

  render();
});
