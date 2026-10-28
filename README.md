# ExecutiveOS — CEO Simulator & Command Terminal

A responsive corporate satire game suite built with plain HTML, CSS and JavaScript. Designed for GitHub Pages: no build step, backend, account, or third-party dependencies required.

## Games and features

### CEO Simulator
- Company valuation, quarterly revenue and operating costs.
- Employee count, morale, synergy, brand reputation and market share.
- Strategic actions: meetings, hiring, rebranding, shareholder updates, AI-synergy theatre, product launches, wellbeing investment and competitor research.
- Advance quarters to settle the fictional books and trigger random market, investor, product or employee events with branching choices.
- Office upgrades, quarterly objectives, bankruptcy risk and New Game+ with a harder starting economy.
- Quick-earn button with a cooldown, daily cash bonus, XP/CEO levels and level-up bonuses.
- Buyable consulting firms, product studios and micro-factories that generate passive income while the game is open.
- Fictional share market with buy/sell controls and prices that fluctuate each quarter.
- 84+ text-only Asset Empire listings across vehicles, companies, real estate, crypto, islands, cities, fictional countries, luxury, infrastructure, cosmic, galactic, multiverse and megaverse tiers; search, category filters, portfolio tracking, resale and passive income.
- Universe-scale wealth milestones from millionaire and trillionaire to “rich in every universe”, plus research upgrades, rival CEO challenges, random universe events and optional prestige ascension.
- Expand into six fictional international branch markets to improve market share and passive income.
- Executive activity feed and unlockable achievements.

### Corporate Empire
- Create fictional subsidiaries across multiple sectors, acquire existing businesses, expand into regions, and hire executive leadership.
- Upgrade each subsidiary through ten levels, launch up to eight product lines, and sell businesses back into the market.
- IPO custom subsidiaries for capital, then receive recurring simulated dividends while they remain publicly listed.
- Upgrade corporate headquarters, unlock four corporate technologies, and resolve timed market-climate events that affect subsidiary income.
- Corporate treasury includes an optional credit facility, repayments, and 1% per-minute interest while debt remains outstanding; borrowing is capped at $5 million.
- Stock prices fluctuate during play, and rival conglomerates can be challenged for rewards.
- All corporate activity is fictional and local to the game. These systems do not connect to real markets or companies.

### CorpShell terminal
- Fictional commands including `help`, `status`, `whoami`, `scan`, `missions`, `finance`, `logs`, `daily`, `decrypt boardroom`, `quarterly prophecy`, `coffee`, `matrix` and `clear`.
- Six campaign objectives, fictional clearance progression, hidden messages, and a daily briefing reward.
- All terminal commands are harmless local simulations. They do not scan networks, access remote systems, or perform real security operations.

### Progress, settings and accessibility
- Manual browser-local saves using `localStorage`; autosave is disabled. Use **Save game** or **Save to slot** to keep progress; unsaved changes are lost on refresh or exit. Newly acquired assets, research, rival wins and prestige changes also require a manual save.
- Three local save slots, JSON export/import, and New Game+.
- Permanent dark-only corporate green/black theme, optional synthesized sound cue, reduced-motion option, and keyboard shortcuts.
- Landing page navigation, logo-to-home behavior, responsive layout and custom SVG favicon.

## Run locally

Open `index.html` in a modern browser. No dependencies or server are needed.

## Publish with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Open the **Actions** tab and check the **Deploy ExecutiveOS to GitHub Pages** workflow.
4. After the workflow succeeds, use the site URL shown in **Settings → Pages**.

The workflow in `.github/workflows/pages.yml` publishes the static files from the repository root whenever changes are pushed to `main`. GitHub Pages must be enabled for the repository, and the workflow requires the repository's Pages/Actions permissions to allow deployment.

## Important notes

- Local saves are tied to the browser/device. Clearing browser storage or switching devices does not sync progress; export a save as a backup.
- Imported saves are validated for basic shape, but only import JSON files you trust.
- All company figures, stock prices and outcomes are fictional; game money has no real-world value and is not financial advice.
- Online accounts, cloud saves, and leaderboards are not included because this project intentionally remains static and backend-free.

## Responsive design and installable PWA

- Fluid, mobile-first layouts for phones, tablets, laptops and wide desktop screens, including narrow 320px screens and landscape mobile.
- Safe-area support for notched phones, touch-friendly controls, flexible dashboards and panels, and reduced-motion support.
- Use the **Install** button when your browser offers the install prompt. If it does not, the button explains how to install from the browser menu.
- On iPhone/iPad, open the site in Safari, tap **Share → Add to Home Screen**.
- A web app manifest defines standalone display, orientation, app colors and SVG app icons.
- A service worker caches the app shell and assets for repeat visits and offline launch after the first successful load.

### PWA notes

The site must be served over HTTPS for service workers and install prompts; GitHub Pages provides HTTPS when enabled. Browser installation prompts vary by browser and operating system. A browser may offer “Add to Home Screen” instead of a one-tap install button. Offline use starts after the app shell has been cached once, and a first visit still needs a network connection.
