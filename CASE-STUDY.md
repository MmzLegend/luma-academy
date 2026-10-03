# Luma Academy — a small creative learning system

## Brief and design response

A self-initiated concept for Muhammad Mukhtar Zikirullahi: make short digital/creative learning feel considered and genuinely usable. This is not a client commission. No interviews, institutional partnership, usability-study results or commercial outcomes are claimed.

The visual direction pairs warm paper, forest green and terracotta with editorial serif headings. Original geometric CSS illustrations connect discovery to the hands-on poster lesson. Quiet motion, roomy layouts and a compact learning sidebar support sustained reading.

## What was built

A dependency-free browser application with course discovery, category/search filters, detail pages, local bookmarks, a four-lesson original mini course, two forthcoming course previews, live poster composition controls, a reasoned three-question quiz, a progress dashboard, sample non-accredited achievement and cancelable reset. Hash URLs support direct linking and browser navigation. State persists locally without collecting personal information.

## Verification and actual iteration

An isolated Playwright/headless Chrome profile tested the complete learning journey at desktop and mobile sizes. Verification included wrong and incomplete quiz states, repeat navigation, refresh persistence, bookmark removal/reset, forthcoming courses and empty discovery. The first mobile lab check revealed horizontal overflow caused by the lesson navigation's intrinsic width; explicit minimum-width constraints fixed it. Two test expectations were corrected to match the actual accessible button label and zero-correct answer set. Final journey passed with no browser runtime errors.

Local screenshot evidence: discovery desktop/mobile, poster lab desktop/mobile and completed dashboard in `artifacts/`. These show the actual running application, not mockups.

## Honest boundary

One complete short course is implemented. Two catalog entries are previews. The product is a local demo, with no hosted service, accounts, server-side progress, payments or accredited qualification. System fonts and CSS art avoid remote assets. Automated tests and visual inspection are useful engineering evidence, but are not evidence of user outcomes or a complete accessibility audit.

A second smoke suite verified keyboard skip navigation, bookmark removal, Escape dismissal, arrow-key exercise adjustment, reduced motion, missing/invalid routes and unreadable storage recovery. It exposed initial route focus jumping past the navigation; initial load now leaves browser focus alone, while navigation from an active control moves focus to the new content.
