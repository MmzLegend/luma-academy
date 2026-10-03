# Build Luma yourself

Use this project as a readable system to dismantle and rebuild. Your IT and multimedia background is useful here: the art direction and the state model are both deliberate, but independent skills.

## Start with the working system

Run `npm start` with Node 20+. Open the browser developer tools alongside the site. `index.html` holds the persistent shell; `main` is replaced by route-specific content from `app.js`. `style.css` supplies the entire art direction. The artwork is made from CSS shapes, gradients and type rather than stock photos or a remote image service.

There is no framework or compilation layer. This keeps the learning surface small: DOM, CSS, events, URLs and localStorage. The tradeoff is explicit rendering and event wiring that a framework would help organize at larger scale.

## Trace one real journey

1. In `app.js`, read `courses`, `card()` and `discover()`. A course is data; a card is a rendering function. `updateGrid()` filters data by category and search phrase before rendering. It never inserts the user's search text into HTML, avoiding that injection path.
2. Follow `route()`. A hash such as `#learn/2` becomes lesson index 2. `learn()` validates the index, records the last visited lesson and renders the sidebar through `shell()`. Hashes make browser back and direct links work without server route configuration.
3. Find `fresh()`, `save()` and `KEY`. State is one versioned JSON document. Completing a lesson adds its index once to `done`; its progress percentage is derived from that array. `try/catch` lets the session continue when device storage fails. It is not a database or identity system.
4. Find `updateExercise()`. Slider events update state, save it and change only the poster styles and feedback. The exercise relates headline scale and group spacing to the actual lesson rather than substituting a blank video player.
5. Read `questions`, `quizMarkup()` and the `check-quiz` branch of the delegated click handler. Each answer has an explicit correct index and reason. The incomplete, incorrect and successful states are distinct. `passed` restores the sample achievement on refresh.
6. Follow reset from `index.html` to the `reset`, `cancel-reset` and `confirm-reset` event branches. A native modal dialog provides focus management and Escape cancellation; only confirmation replaces state.

## Reproduce the visual reasoning

The paper/forest/terracotta palette, serif display type and generous margins give the academy a quiet creative-studio feel. The steps and sun suggest incremental learning. System fonts avoid downloads and fragile font loading. Card art uses the same visual language as the poster exercise, making the brand and lesson feel related.

Read the variables at the top of `style.css`, then `.hero`, `.grid`, `.learning-layout` and the mobile media query. Each screen changes structure at 760px rather than merely shrinking desktop typography. Read `:focus-visible`, `.skip` and the reduced-motion query before adding animation. Motion is decorative and must never be required to understand an answer.

## Debug deliberately

- Console: check uncaught errors first. An error in a render function can leave a partially empty view.
- Application → localStorage: inspect `luma-academy-v1`. Reload and compare what persisted. Do not store confidential learner data here.
- Elements: inspect the poster's inline font size and margin changes while using the sliders.
- Network: all app assets should come from loopback; the application has no external requests.
- Keyboard: Tab through navigation and actions, use arrow keys on sliders/radio groups, Escape the reset dialog.
- Run `npm test` after behavior changes. `tests/journey.cjs` demonstrates selectors based on actual accessible labels and checks refresh and cancellation as well as successful completion.

## Practice ladder

1. Change one palette token and the hero headline. Check contrast, wrapping at 390px and focus visibility.
2. Add a new clearly fictional preview course to `courses`. Give it original CSS art, not a copied identity. Confirm search, filtering, detail and bookmarks work.
3. Add a fourth quiz question with a reasoned explanation. Remove hardcoded totals in feedback so the total derives from `questions.length`. Update the test to check an incorrect answer and a successful retry.
4. Rebuild the bookmark feature without looking: state array, pressed state, localStorage, dashboard empty state and reset. Compare your result only after testing back and refresh.
5. Independently build a second interactive exercise. Start with a written learning objective; define what input changes and what observation demonstrates understanding. Avoid “gamification” unrelated to the skill.
6. Split `app.js` into ES modules: course/content data, persistence and screen renderers. Preserve public route URLs. Write down which code owns state before moving it.

## Before offering this as a real LMS

A real service needs authenticated identities, server-validated progress, accessible content authoring, account/data lifecycle handling, robust state migrations, privacy decisions, monitored hosting and appropriate content/licensing processes. Add payments only with explicit scope and a real authorized provider. Certificates need truthful issuer and accreditation wording. This project is a design/engineering concept, not evidence of client results, learner outcomes or research.

A useful independent exercise is to implement a small backend for one feature in a new copy, document its trust boundaries, and explain why localStorage is insufficient for that feature. Keep this working demo as your comparison baseline.

## Current code entry points

In the formatted `app.js`: state key starts at line 1; persistence at `save()` line 107; discovery at line 133; lesson rendering at line 162; quiz markup at line 183; exercise updates at line 193; dashboard at line 211; routing at line 221. Search by function name after edits because line numbers will change.
