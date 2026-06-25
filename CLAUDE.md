# CLAUDE.md — UK-HomeFinder

Single-file HTML/CSS/JS property search tool. Powered by Rightmove parsing + Land Registry price data.

## Live site
sahirvhora.github.io/UK-HomeFinder — deployed via GitHub Pages. Changes go through CI + deploy workflow.

## Rules
- Single `index.html` — all CSS inline in `<style>`, all JS inline in `<script>`
- Dark theme via CSS custom properties (`--bg`, `--surface`, `--text`)
- No external dependencies, no build step, no npm
- "Sold Prices" section depends on a local backend (`house_hunter_uk`) — don't remove the fallback UI

## Commands
- No test suite — verify by opening index.html in browser
- Push: `git push origin main` (rebased)
- CI: .github/workflows/ will auto-deploy to GitHub Pages
