document.getElementById("contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const firstName = (data.get("firstName") || "").trim();
  const lastName = (data.get("lastName") || "").trim();
  const email = (data.get("email") || "").trim();
  const goal = (data.get("goal") || "").trim();
  const subject = `Coaching-Anfrage von ${firstName} ${lastName}`.trim();
  const body = `Hallo Paul,\n\nich interessiere mich für ein PCT Coaching.\n\nName: ${firstName} ${lastName}\nE-Mail: ${email}\n\nMein Ziel:\n${goal}\n\nFreundliche Grüsse`;
  window.location.href = `mailto:welcome@pctransformation.ch?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const story = document.getElementById("story");
const frames = Array.from(document.querySelectorAll(".story-frame"));
const progressBars = Array.from(document.querySelectorAll(".story-progress i"));
const storyKicker = document.getElementById("story-kicker");
const storyTitle = document.getElementById("story-title");
const storyLead = document.getElementById("story-lead");
const storyNumber = document.getElementById("story-number");
const storyChapterLabel = document.getElementById("story-chapter-label");
const storyStages = [
  { kicker: "Dein Startpunkt", chapter: "KAPITEL 01 — ANKOMMEN", title: "DEINE BESTE<br>VERSION BEGINNT <em>HEUTE.</em>", lead: "Nicht mit Druck. Sondern mit einer Entscheidung, die deinen Alltag verändert." },
  { kicker: "Kapitel Zwei", chapter: "KAPITEL 02 — AUFBAUEN", title: "MEHR KRAFT.<br><em>MEHR ENERGIE.</em>", lead: "Du lernst, deinem Körper wieder zu vertrauen – mit einer Struktur, die dich trägt." },
  { kicker: "Kapitel Drei", chapter: "KAPITEL 03 — FOKUS", title: "FOKUS.<br><em>FORTSCHRITT.</em>", lead: "Training, Ernährung und Mindset greifen zusammen. Jeder Schritt hat eine Richtung." },
  { kicker: "Dein nächster Schritt", chapter: "KAPITEL 04 — ENTSCHEIDEN", title: "DEINE ZEIT.<br><em>DEINE TRANSFORMATION.</em>", lead: "Das Ziel ist nicht eine bessere Woche. Es ist eine Version von dir, die bleibt." },
];

let currentStage = -1;
function updateScrollStory() {
  if (!story || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = story.getBoundingClientRect();
  const travel = Math.max(1, story.offsetHeight - window.innerHeight);
  const progress = Math.min(0.999, Math.max(0, -rect.top / travel));
  const stage = Math.min(storyStages.length - 1, Math.floor(progress * storyStages.length));
  if (stage === currentStage) return;
  currentStage = stage;
  story.querySelector(".story-sticky")?.classList.add("is-transitioning");
  story.querySelector(".story-sticky")?.setAttribute("data-stage", String(stage));
  frames.forEach((frame, index) => frame.classList.toggle("is-active", index === stage));
  progressBars.forEach((bar, index) => bar.classList.toggle("is-current", index === stage));
  window.setTimeout(() => {
    storyKicker.textContent = storyStages[stage].kicker;
    storyTitle.innerHTML = storyStages[stage].title;
    storyLead.textContent = storyStages[stage].lead;
    storyChapterLabel.textContent = storyStages[stage].chapter;
    storyNumber.textContent = String(stage + 1).padStart(2, "0");
    story.querySelector(".story-sticky")?.classList.remove("is-transitioning");
  }, 160);
}

window.addEventListener("scroll", updateScrollStory, { passive: true });
window.addEventListener("resize", updateScrollStory);
updateScrollStory();
