const KEY = "luma-academy-v1";
let storageError = false;
const fresh = () => ({
  saved: [],
  done: [],
  enrolled: false,
  lesson: 0,
  exercise: { size: 36, space: 18 },
  quiz: [],
  passed: false,
});
let state = fresh();
try {
  const s = JSON.parse(localStorage.getItem(KEY));
  if (
    s &&
    Array.isArray(s.saved) &&
    Array.isArray(s.done) &&
    Array.isArray(s.quiz)
  ) {
    state = { ...fresh(), ...s };
    state.lesson = Math.max(0, Math.min(3, Number(state.lesson) || 0));
    state.exercise = { ...fresh().exercise, ...s.exercise };
  }
} catch {
  storageError = true;
}
const main = document.querySelector("main");
let category = "All skills",
  search = "";
const courses = [
  {
    id: "hierarchy",
    title: "Design that speaks clearly",
    category: "Design",
    time: "18 min",
    tag: "COMPLETE MINI COURSE",
    description:
      "Turn visual noise into a clear, confident message. Learn the small decisions that make a big difference.",
    art: "one",
    available: true,
  },
  {
    id: "type",
    title: "The character of type",
    category: "Typography",
    time: "Coming soon",
    tag: "IN THE STUDIO",
    description:
      "Find the feeling in letterforms. A preview of our next creative exploration.",
    art: "two",
    available: false,
  },
  {
    id: "web",
    title: "A more thoughtful web",
    category: "Digital",
    time: "Coming soon",
    tag: "IN THE STUDIO",
    description:
      "Build digital spaces that feel good to use. An upcoming learning collection.",
    art: "three",
    available: false,
  },
];
const lessons = [
  "Notice what matters",
  "Build a visual rhythm",
  "Your poster lab",
  "Knowledge check",
];
const questions = [
  {
    q: "Your poster has five equally large headlines. What should you change first?",
    options: [
      "Add another colour",
      "Choose one main message and make it most prominent",
      "Make everything bold",
    ],
    answer: 1,
    reason:
      "Hierarchy starts with priority. One clear focal point gives the reader an entry point; colour and weight should support that decision.",
  },
  {
    q: "Why leave extra space between two different groups of information?",
    options: [
      "It shows they belong to different groups",
      "It fills the poster",
      "It makes all text equally important",
    ],
    answer: 0,
    reason:
      "Proximity communicates relationships. Close spacing connects related items; larger gaps separate groups.",
  },
  {
    q: "What is the best way to check your design?",
    options: [
      "Only look at it on a large screen",
      "Ask whether someone can identify the main message and next step quickly",
      "Use as many type sizes as possible",
    ],
    answer: 1,
    reason:
      "A useful design serves its reader. Check the message, reading order and next action at the size and context where it will actually be seen.",
  },
];
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    storageError = true;
    toast("Storage unavailable. Progress lasts only for this session.");
  }
}
function toast(t) {
  const el = document.querySelector("#toast");
  el.textContent = t;
  el.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove("show"), 3000);
}
function art(c) {
  return `<div class="course-art ${c.art}" role="img" aria-label="${c.art === "one" ? "Original green editorial poster composition" : c.art === "two" ? "Expressive serif letterform study" : "Abstract website composition"}"><span class="badge">${c.tag}</span>${c.art === "one" ? '<div class="poster"><span>LESS, BUT BETTER</span>Make<br>space.<i></i></div>' : c.art === "two" ? '<div class="type-art">Aa<small>FORM / FEELING</small></div>' : '<div class="web-art"><span></span><i></i><span></span></div>'}</div>`;
}
function card(c) {
  return `<article class="course-card"> <a href="#course/${c.id}" tabindex="-1" aria-hidden="true">${art(c)}</a><div class="card-body"><div class="meta">${c.category} <span>•</span> ${c.time} <span>•</span> Beginner</div><h3><a href="#course/${c.id}">${c.title}</a></h3><p class="micro">${c.description}</p><div class="card-bottom"><a href="#course/${c.id}">${c.available ? (state.enrolled ? "Continue learning" : "Explore course") : "Preview syllabus"} ↗</a><button class="bookmark ${state.saved.includes(c.id) ? "saved" : ""}" data-save="${c.id}" aria-label="${state.saved.includes(c.id) ? "Remove bookmark for" : "Bookmark"} ${c.title}" aria-pressed="${state.saved.includes(c.id)}">${state.saved.includes(c.id) ? "★" : "☆"}</button></div></div></article>`;
}
function warning() {
  return storageError
    ? '<p class="notice" role="status">Device storage is unavailable or was unreadable. You can continue in this session.</p>'
    : "";
}
function discover() {
  main.innerHTML = `${warning()}<section class="hero wrap"><div><span class="eyebrow">A SPACE FOR CURIOUS MINDS</span><h1>Small lessons.<br><em>Brighter ideas.</em></h1><p class="intro">Make room for the creative you. Thoughtful, hands-on learning for people who want to make things that matter.</p><a href="#course/hierarchy" class="primary">Find your first spark <span>↗</span></a><p class="micro" style="margin-top:18px">Learn at your pace. Make something your own.</p></div><div class="hero-art" role="img" aria-label="Original sculptural illustration: a textured terracotta sun rising above green steps"><div class="orb"></div><div class="stairs"></div><div class="art-card"><small>THE CREATIVE PRACTICE</small>Keep growing. ✳</div><span class="art-caption">CURIOSITY TAKES YOU PLACES</span></div></section><div class="ticker"><span><b>✳</b> Built for the doing</span><span><b>↗</b> Small steps, real skills</span><span><b>○</b> Your pace. Your possibilities.</span></div><section class="section wrap" id="courses"><div class="section-head"><div><span class="eyebrow">FOLLOW YOUR CURIOSITY</span><h2>Your next idea starts <em>here.</em></h2></div><span class="micro">One complete course. Two things to look forward to.</span></div><div class="catalog-tools"><div class="filters" aria-label="Course categories">${["All skills", "Design", "Typography", "Digital"].map((x) => `<button class="chip ${x === category ? "selected" : ""}" data-category="${x}" aria-pressed="${x === category}">${x}</button>`).join("")}</div><input class="search" id="search" aria-label="Search courses" placeholder="Search your next skill" value=""></div><div class="grid" id="course-grid"></div></section><aside class="quote wrap"><p>“Creativity is a practice.<br>Give it a little space, every day.”</p><span>THE LUMA PHILOSOPHY<br><br>No rush. No perfect starting point. Just a willingness to try.</span></aside>`;
  document.querySelector("#search").value = search;
  updateGrid();
}
function updateGrid() {
  const results = courses.filter(
    (c) =>
      (category === "All skills" || c.category === category) &&
      (c.title + " " + c.description)
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  document.querySelector("#course-grid").innerHTML =
    results.map(card).join("") ||
    '<div class="empty"><h3>No sparks here yet.</h3><p>Try another word or explore all skills.</p><button class="secondary" id="clear-search">Clear filters</button></div>';
}
function detail(id) {
  const c = courses.find((x) => x.id === id);
  if (!c) {
    main.innerHTML =
      '<section class="section wrap"><h1>That page wandered off.</h1><a href="#discover" class="primary">Back to explore</a></section>';
    return;
  }
  main.innerHTML = `<div class="wrap"><div class="breadcrumb"><a href="#discover">Explore</a> / ${c.category}</div><section class="detail"><div><span class="eyebrow">${c.available ? "A LITTLE LESSON. A LASTING SKILL." : "A LOOK INSIDE THE STUDIO"}</span><h1>${c.title}</h1><p class="intro">${c.description}</p><div class="meta">${c.time} · Beginner friendly · Original written materials</div>${c.available ? `<button class="primary" id="start-course">${state.enrolled ? "Continue course" : "Start learning — free demo"} ↗</button>` : '<p class="notice">This course is a concept preview. Lessons are not yet available.</p>'}<button class="secondary" data-save="${c.id}" aria-pressed="${state.saved.includes(c.id)}">${state.saved.includes(c.id) ? "★ Saved" : "☆ Save for later"}</button><h2 style="margin-top:40px">${c.available ? "What you’ll explore" : "Planned syllabus"}</h2><ul class="syllabus">${(c.available ? lessons : c.id === "type" ? ["Read the personality of a typeface", "Pair with purpose", "Create a type specimen"] : ["Sketch a useful journey", "Design clear actions", "Prototype a welcoming page"]).map((x, i) => `<li>${String(i + 1).padStart(2, "0")} &nbsp; ${x}<span>${c.available ? ["4 min", "4 min", "7 min", "3 min"][i] : "Preview"}</span></li>`).join("")}</ul></div><div>${art(c)}<div class="lesson-box"><h3>${c.available ? "Make something, not just notes." : "Good things take a little time."}</h3><p class="micro">${c.available ? "You’ll create a small event poster in an interactive lab, test your understanding, and leave with a clearer eye for design." : "Bookmark this concept to find it again in your learning dashboard. No email or enrolment required."}</p></div><p class="micro">Created for this portfolio demo. No payments, real enrolment or institutional affiliation.</p></div></section></div>`;
}
function shell(i, body) {
  return `<div class="learning-layout"><aside class="sidebar"><a class="micro" href="#course/hierarchy">← Course overview</a><h3 style="margin-top:25px">Design that speaks clearly</h3><div class="progress" role="progressbar" aria-label="Course progress" aria-valuemin="0" aria-valuemax="4" aria-valuenow="${state.done.length}"><div style="width:${(state.done.length / 4) * 100}%"></div></div><p class="micro">${state.done.length} of 4 lessons complete</p><div class="sidebar-links">${lessons.map((l, n) => `<a href="#learn/${n}" class="lesson-link ${n === i ? "current" : ""}" ${n === i ? 'aria-current="step"' : ""}>${state.done.includes(n) ? "✓" : String(n + 1).padStart(2, "0")} &nbsp; ${l}</a>`).join("")}</div><a href="#dashboard" class="micro">View my learning ↗</a></aside><section class="lesson-body"><span class="eyebrow">LESSON ${i + 1} OF 4 · ${["4", "4", "7", "3"][i]} MINUTES</span><h1>${lessons[i]}</h1>${body}</section></div>`;
}
function learn(i) {
  if (!Number.isInteger(i) || i < 0 || i > 3) {
    location.hash = "#learn/0";
    return;
  }
  state.enrolled = true;
  state.lesson = i;
  save();
  let body = "";
  if (i === 0)
    body = `<p>Before choosing a colour or a typeface, decide what your reader needs to notice. Visual hierarchy is the order in which a design asks for attention.</p><div class="lesson-box"><span class="eyebrow">THE THREE-SECOND TEST</span><h3>One message. One way in.</h3><p>Imagine a poster for a neighbourhood creative workshop. Its main message is “Make something together.” The date supports that message. The location and invitation come next.</p><p>Give the main message the largest type. Keep supporting information smaller, but comfortably readable. Make the invitation distinct enough to find.</p></div><h3>Look for the reading order</h3><p>Squint at a poster or view it from across a room. What reaches you first? If everything shouts, nothing leads. Aim for a clear first, second and third stop.</p><p><strong>Try this:</strong> Say the main message in one sentence. If you cannot, simplify the content before styling it.</p>`;
  if (i === 1)
    body = `<p>Good spacing works like pauses in a conversation. It separates ideas, groups related details and gives the reader time to understand.</p><div class="lesson-box"><h3>Close means connected.</h3><p>Keep the workshop date and time close together because they answer one question: when? Leave a larger gap before the address, which answers a different question.</p></div><h3>Make the rhythm intentional</h3><p>Choose a small spacing unit, such as 8 pixels. Use multiples of that unit for most gaps: 8 for closely related details, 16 for small groups and 32 for sections. Consistency creates a quieter composition.</p><p>Alignment gives the eye a path. Start with a single left edge; you can introduce variation after the reading order works.</p><div class="notice">Accessibility check: decorative contrast can be subtle, but essential text should remain readable. Do not use colour alone to show meaning.</div>`;
  if (i === 2)
    body = `<p>Build a poster for a fictional creative morning. Change the headline scale and the space between groups. Notice which combination makes the message easiest to scan.</p><div class="lesson-box"><h3>Your small design studio</h3><div class="controls"><label for="size">Headline size <output id="size-output">${state.exercise.size}px</output><input id="size" type="range" min="20" max="52" value="${state.exercise.size}"></label><label for="space">Group spacing <output id="space-output">${state.exercise.space}px</output><input id="space" type="range" min="4" max="40" value="${state.exercise.space}"></label></div><div class="exercise-preview"><div class="preview-tag">A NEIGHBOURHOOD CREATIVE MORNING</div><h3 id="poster-title">Make something<br>together.</h3><div id="poster-details"><strong>Saturday · 10:00–12:00</strong><br>Garden Room, 12 Willow Lane</div><div id="poster-action" style="font-size:12px;font-weight:bold">Bring your curiosity. We’ll bring the paper. ↗</div></div><p id="exercise-feedback" class="micro" aria-live="polite"></p><button class="text-button" id="restore-exercise">Restore starting composition</button></div><h3>Pause and reflect</h3><p>Can you find the message, date and invitation in that order? There is more than one successful composition. A larger headline can create emphasis; enough space separates information without breaking the connection.</p><p class="micro">Your settings save automatically on this device.</p>`;
  if (i === 3) body = quizMarkup();
  body += `<div class="actions"><a class="secondary" href="${i === 0 ? "#course/hierarchy" : "#learn/" + (i - 1)}">← ${i === 0 ? "Overview" : "Previous lesson"}</a>${i < 3 ? `<button class="primary" id="complete-lesson">${state.done.includes(i) ? "Continue" : "Mark complete & continue"} →</button>` : ""}</div>`;
  main.innerHTML = shell(i, body);
  if (i === 2) updateExercise();
  if (i === 3) renderQuizState();
}
function quizMarkup() {
  return `<p>Three quick questions to connect the ideas. You can retry as often as you like. Read the explanation after each answer.</p>${questions.map((q, n) => `<div class="lesson-box"><h3>${n + 1}. ${q.q}</h3><fieldset style="border:0;padding:0"><legend class="micro">Choose one answer</legend>${q.options.map((o, k) => `<label class="quiz-option ${state.quiz[n] === k ? "chosen" : ""}"><input type="radio" name="q${n}" value="${k}" data-question="${n}" ${state.quiz[n] === k ? "checked" : ""}> ${o}</label>`).join("")}</fieldset><div id="feedback-${n}"></div></div>`).join("")}<button id="check-quiz" class="primary">Check my understanding ↗</button><button id="retry-quiz" class="secondary">Try again</button><div id="quiz-result" aria-live="polite"></div>`;
}
function renderQuizState() {
  if (state.passed)
    document.querySelector("#quiz-result").innerHTML = certificate();
}
function certificate() {
  return `<div class="certificate"><span class="eyebrow">LUMA ACADEMY · SAMPLE ACHIEVEMENT</span><h2>A brighter eye for design.</h2><p>You completed “Design that speaks clearly”.</p><p class="micro">${state.done.length < 4 ? "Finish the other lessons to complete your course." : "Four lessons. One creative step forward."}</p><strong>Portfolio demo · non-accredited</strong><p class="micro">This sample has no institutional or professional standing.</p><a class="primary" href="#dashboard">See my learning ↗</a></div>`;
}
function updateExercise() {
  document.querySelector("#poster-title").style.fontSize =
    state.exercise.size + "px";
  document.querySelector("#poster-details").style.marginTop =
    state.exercise.space + "px";
  document.querySelector("#poster-action").style.marginTop =
    state.exercise.space + "px";
  document.querySelector("#size-output").textContent =
    state.exercise.size + "px";
  document.querySelector("#space-output").textContent =
    state.exercise.space + "px";
  document.querySelector("#exercise-feedback").textContent =
    state.exercise.size < 28
      ? "Your headline is close to the supporting text in scale. Try increasing it to create a clearer first stop."
      : state.exercise.space < 12
        ? "The headline leads well. Try a little more space to separate the date and invitation."
        : "A clear headline and distinct groups create a comfortable reading path. Compare with another setting to see what changes.";
}
function dashboard() {
  main.innerHTML = `<section class="section wrap"><span class="eyebrow">YOUR CREATIVE CORNER</span><h1>Keep your <em>spark.</em></h1><p class="intro">A small step today is still a step. Pick up where you left off.</p>${warning()}<div class="stats"><div class="stat"><b>${state.enrolled ? 1 : 0}</b>Courses started</div><div class="stat"><b>${state.done.length}/4</b>Lessons complete</div><div class="stat"><b>${state.saved.length}</b>Saved for later</div></div><h2>In your practice</h2>${state.enrolled ? `<div class="lesson-box"><h3>Design that speaks clearly</h3><div class="progress"><div style="width:${(state.done.length / 4) * 100}%"></div></div><p class="micro">${state.done.length === 4 ? "Course complete — beautifully done." : "Next: " + lessons[state.lesson]}</p><a class="primary" href="#learn/${state.lesson}">${state.done.length === 4 ? "Revisit course" : "Continue learning"} →</a>${state.done.length === 4 ? certificate() : ""}</div>` : '<div class="empty"><h3>Your next idea is waiting.</h3><p>Start with our complete mini course in visual hierarchy.</p><a href="#course/hierarchy" class="primary">Explore your first course ↗</a></div>'}<h2 style="margin-top:45px">Saved for a curious day</h2><div class="grid">${
    state.saved.length
      ? courses
          .filter((c) => state.saved.includes(c.id))
          .map(card)
          .join("")
      : '<div class="empty"><p>No bookmarks yet. Save a course with the star to keep it here.</p><a href="#discover" class="secondary">Find a spark ↗</a></div>'
  }</div></section>`;
}
function route() {
  const hash = location.hash.slice(1) || "discover",
    parts = hash.split("/");
  document
    .querySelectorAll("nav a")
    .forEach((a) => a.classList.toggle("active", a.hash === "#" + parts[0]));
  document.querySelector("#nav-count").textContent = state.enrolled ? 1 : 0;
  if (parts[0] === "discover") discover();
  else if (parts[0] === "course") detail(parts[1]);
  else if (parts[0] === "learn") learn(Number(parts[1]));
  else if (parts[0] === "dashboard") dashboard();
  else
    main.innerHTML =
      '<section class="section wrap"><h1>Page not found.</h1><a href="#discover" class="primary">Explore courses</a></section>';
  window.scrollTo(0, 0);
  if (document.activeElement !== document.body) main.focus({ preventScroll: true });
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.save) {
    const id = b.dataset.save;
    state.saved = state.saved.includes(id)
      ? state.saved.filter((x) => x !== id)
      : [...state.saved, id];
    save();
    const y = scrollY;
    route();
    window.scrollTo(0, y);
    toast(
      state.saved.includes(id)
        ? "Saved to your learning corner"
        : "Bookmark removed",
    );
  }
  if (b.dataset.category) {
    category = b.dataset.category;
    document.querySelectorAll("[data-category]").forEach((x) => {
      x.classList.toggle("selected", x.dataset.category === category);
      x.setAttribute("aria-pressed", x.dataset.category === category);
    });
    updateGrid();
  }
  if (b.id === "clear-search") {
    category = "All skills";
    search = "";
    discover();
  }
  if (b.id === "start-course") {
    state.enrolled = true;
    save();
    location.hash = "#learn/" + state.lesson;
  }
  if (b.id === "complete-lesson") {
    if (!state.done.includes(state.lesson)) state.done.push(state.lesson);
    save();
    location.hash = "#learn/" + (state.lesson + 1);
  }
  if (b.id === "restore-exercise") {
    state.exercise = fresh().exercise;
    save();
    document.querySelector("#size").value = state.exercise.size;
    document.querySelector("#space").value = state.exercise.space;
    updateExercise();
  }
  if (b.id === "check-quiz") {
    if (questions.some((q, n) => !Number.isInteger(state.quiz[n]))) {
      document.querySelector("#quiz-result").innerHTML =
        '<p class="notice" role="status">Answer all three questions, then check your understanding.</p>';
      return;
    }
    let correct = 0;
    questions.forEach((q, n) => {
      const right = state.quiz[n] === q.answer;
      if (right) correct++;
      document.querySelector("#feedback-" + n).innerHTML =
        `<div class="feedback ${right ? "" : "wrong"}"><strong>${right ? "That’s right." : "Keep exploring."}</strong> ${q.reason}</div>`;
    });
    state.passed = correct === 3;
    if (state.passed && !state.done.includes(3)) state.done.push(3);
    save();
    document.querySelector("#quiz-result").innerHTML = state.passed
      ? certificate()
      : `<p class="notice">${correct} of 3 correct. Read the explanations, adjust your choices and check again.</p>`;
    if (state.passed) toast("Knowledge check complete");
  }
  if (b.id === "retry-quiz") {
    state.quiz = [];
    state.passed = false;
    save();
    learn(3);
    toast("A fresh quiz is ready");
  }
  if (b.id === "reset") document.querySelector("#reset-dialog").showModal();
  if (b.id === "cancel-reset") document.querySelector("#reset-dialog").close();
  if (b.id === "confirm-reset") {
    state = fresh();
    save();
    document.querySelector("#reset-dialog").close();
    location.hash = "#discover";
    route();
    toast("Demo reset. A fresh start.");
  }
});
document.addEventListener("input", (e) => {
  if (e.target.id === "search") {
    search = e.target.value;
    updateGrid();
  }
  if (["size", "space"].includes(e.target.id)) {
    state.exercise[e.target.id] = Number(e.target.value);
    save();
    updateExercise();
  }
});
document.addEventListener("change", (e) => {
  if (e.target.dataset.question !== undefined) {
    state.quiz[Number(e.target.dataset.question)] = Number(e.target.value);
    save();
    document
      .querySelectorAll(`[name="${e.target.name}"]`)
      .forEach((x) => x.parentElement.classList.toggle("chosen", x.checked));
    document.querySelector("#feedback-" + e.target.dataset.question).innerHTML =
      "";
    document.querySelector("#quiz-result").innerHTML = "";
  }
});
window.addEventListener("hashchange", route);
route();
