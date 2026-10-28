# ExecutiveOS — CEO Simulator & Command Terminal

A responsive corporate satire game suite built with plain HTML, CSS and JavaScript. Designed for GitHub Pages: no build step, backend, account, or third-party dependencies required.

## Free-to-play commitment

This project is designed to stay **100% free to play and non-pay-to-win**.

- No real-money purchases, microtransactions, premium currency, loot boxes, paid boosts, ads, subscriptions, or paywalls.
- No paid AI models, AI APIs, hosted AI services, or other metered third-party APIs.
- No paid game assets, asset-store dependencies, or paid hosting/backend requirement.
- Gameplay advantages must be earned in-game through decisions, progression, and risk; fictional in-game prices use simulated currency only and are not real purchases.
- Core gameplay uses local HTML, CSS, and JavaScript and is designed to run offline after the game files are available.
- Saves remain explicit and manual. No autosave or background persistent writes.

Any future feature must follow this policy. If a feature requires a paid service or creates a real-money gameplay advantage, it must not be added.

## Strategy Lab expansion

The Strategy Lab adds an offline-first management layer built with plain JavaScript:

- Finance and risk dashboard with operating snapshots, estimated subsidiary income, debt exposure, and paid in-game audits.
- Supply-chain resilience and warehouse investments.
- Six earnable research milestones, including forecasting, automation, advanced materials, biotechnology, fusion research, and orbital manufacturing.
- Five fictional acquisitions across food, energy, healthcare, transport, and technology; acquired businesses contribute to corporate income.
- A gated space-industry programme covering launch services, satellites, lunar surveys, mining, and Mars logistics.
- Local market-shock scenarios, temporary operating multipliers, and crisis stabilisation.
- A strategic decision ledger; changes remain in memory until the player uses an explicit save action.

These systems use local game logic and fictional currency. They do not call AI services, external APIs, payment providers, or advertising networks. The finance panel is a gameplay estimate, not audited accounting advice.

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

### Corporate expansion systems
- Global marketing, applied research, automated factories, workforce expansion, and supply-chain upgrades.
- Lunar mining, Mars industry, orbital manufacturing, deep-space logistics, and interstellar research sites.
- Corporate income multipliers, passive income from factories/workforce/space assets, stock trading volume, quarterly price history, and portfolio valuation.
- Rival conglomerate challenges and an optional prestige reset with a permanent empire multiplier.
- Entirely client-side, free-to-run, and offline-capable. No paid APIs, subscriptions, accounts, or external assets are required.
- **Manual saves only:** purchases and progress remain in the current session until the player explicitly saves. Export a save for a portable backup.

### Hardcore operating simulation
- Each subsidiary has its own workforce, morale, supply inventory, quality investment and operating result.
- Operating settlements apply recurring overhead and payroll; low inventory, low morale and market shocks reduce output.
- Hire or reduce staff, restock supplies, invest in product quality, and fulfil time-limited sector contracts with working-capital deposits and delivery rewards.
- Contract deadlines and settlement outcomes advance while the game is open. Data is not written to persistent storage automatically; use **Save game** or **Save to slot**.
- Entirely local and fictional, with no external services, APIs, paid assets or subscriptions.


### Expanded corporate simulation (v12)
- Corporate finance desk with estimated revenue, costs, working capital, assets and indicative credit quality; figures are gameplay estimates, not audited accounting.
- Supply chain inventory consumption, supplier redundancy, production facilities, shortage penalties and output-efficiency effects.
- Fictional stock exchange actions: share issuance/dilution, buybacks, dividends, share-price history, shareholder votes and takeover defence.
- Living market simulation: drifting demand, competitor pressure, market-share campaigns, market intelligence and international expansion.
- Workforce, morale, recurring payroll, legal exposure, training and compliance actions.
- International trade with tariffs, exchange-rate drift and route diversification.
- Local crisis scenarios (recession, cyber incident, recall, supplier failure and takeover attempt) with in-game response costs.
- Local analytics, profit history, five-cycle projection, orbital logistics and a legacy milestone.
- Free, local simulation with fictional currency; no paid APIs, subscriptions, ads, external assets or real-money purchases. No artificial wait-to-play timers. **Manual saves only:** expansion state is persisted only when the player explicitly saves.


### Income-generating asset portfolio
Every asset in the Assets catalog now generates recurring passive income through the existing 10-second game economy, including the original vehicles and crypto holdings as well as companies, properties, islands, cities, fictional countries, cosmic infrastructure, energy, and logistics acquisitions. Vehicles earn simulated charter, chauffeur, leasing, or event revenue; crypto-style game holdings receive small fictional yield while retaining their existing price movement. Newly added energy, data, rental, logistics, network, franchise, patent, water, and battery assets also earn automatically. All prices and income are fictional gameplay values; no real-world investments or transactions are involved.
