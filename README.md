# Public portfolio concept

Source: https://github.com/MmzLegend/luma-academy
Demo: https://mmzlegend.github.io/luma-academy/

# Luma Academy

Self-initiated portfolio concept by Muhammad Mukhtar Zikirullahi. A fictional creative learning academy with an original warm editorial identity, original CSS artwork and written learning content. No clients, user research, measured outcomes or institutional affiliation are claimed.

## Run

Node.js 20+ recommended. No runtime dependencies or build step.

```sh
npm start
```

Open http://127.0.0.1:8894. Server binds only loopback. Port 8894 was checked vacant before starting. Keep the terminal open; Ctrl+C stops your own server.

## Use

Explore/filter/search courses, bookmark courses, start the complete visual hierarchy mini course, read lessons, experiment with a poster, and complete the three-question knowledge check. Dashboard tracks progress and bookmarks. Browser localStorage persists lessons, slider settings and quiz answers. Footer reset opens a cancelable confirmation. Two other courses are clearly labeled upcoming previews. Certificates are samples and non-accredited.

## Test

Install development tooling with `npm install`, then `npm test`. Tests launch a separate headless Chrome profile, use no shared browser tabs, and write local screenshots to `artifacts/`. Google Chrome must be installed at the macOS default path; update `executablePath` in `tests/journey.cjs` for other platforms. `PLAYWRIGHT_PATH` can point to an already installed Playwright package, so runtime stays dependency-free.

The verified journey covers discovery, bookmarks, persistence after reload, lesson completion/back/repeat, interactive exercise persistence, incomplete/wrong/correct quiz states, sample achievement persistence, dashboard, reset cancel/confirm, empty search, upcoming preview, mobile overflow and runtime errors. See `artifacts/test-results.txt` for the recorded final result.

## Structure

- `index.html`: semantic shell, navigation, footer, reset dialog.
- `style.css`: tokens, visual compositions, responsive layouts, reduced motion.
- `app.js`: course data, original content, hash navigation, rendering, local state.
- `server.js`: small static HTTP server.
- `tests/journey.cjs`: isolated end-to-end verification and screenshot capture.
- `LEARNING-GUIDE.md`: code-specific build and practice guide.

## Limitations

This is a browser-only demonstration, not an LMS service. No authentication, backend, video platform, payments, real enrolment, accreditation or analytics. Progress does not sync between devices. No external resources are required by the app. Text lessons have no asynchronous loading state because content is bundled locally; empty discovery/dashboard, missing page, incomplete quiz and storage failure states are implemented. Estimated lesson times are editorial estimates, not tested timing claims. Automated verification does not replace user research, a screen reader audit, cross-browser testing or a production security review.
