# ExecutiveOS — CEO Simulator & Command Terminal

A responsive corporate parody game suite built with plain HTML, CSS and JavaScript. Designed for GitHub Pages: no build step, backend, account, or dependencies required.

## Games

- **CEO Simulator:** manage fictional company valuation, hire consultants, schedule meetings, launch rebrands, deploy a fictional synergy engine, upgrade the office, and unlock achievements.
- **CorpShell Command Terminal:** explore harmless simulated commands, complete four missions, unlock fictional boardroom secrets, and earn clearance.
- **Progress:** saved locally in the current browser using `localStorage`.
- **Branding:** custom ExecutiveOS logo and SVG favicon.
- **Navigation:** landing page at `/`; logo returns home; hash routes preserve the selected page on refresh.

## Run locally

Open `index.html` in a modern browser. No dependencies or server are needed.

## Publish with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main** and folder **/(root)**, then click **Save**.
4. Wait for GitHub Pages to finish publishing.

The included `.github/workflows/pages.yml` also provides an Actions-based deployment workflow. If you choose **GitHub Actions** as the Pages source in Settings → Pages, it will publish the static site after a push to `main`.

## Important notes

- Terminal actions are fictional local effects. They do not scan networks, access remote systems, or perform real security operations.
- Game saves are local to each browser/device; there is no shared global leaderboard.
- All company valuations and KPIs are fictional and are not financial advice.
