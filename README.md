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

## Interface redesign

ExecutiveOS uses a clean black-and-white interface with flat charcoal cards, crisp borders, white actions and restrained monochrome contrast. The header logo, browser favicon and installed-app icons use the same ExecutiveOS monogram. Dashboard cards, simulator panels, strategy modules, asset views and World Simulation panels share one consistent flat-card treatment with matching charcoal surfaces, border weights, corner radii, control styles and spacing. Layout wrappers and list rows remain visually neutral instead of becoming nested cards. Navigation adapts across desktop, tablet and mobile; smaller screens use a collapsible menu, stacked layouts, touch-friendly controls and horizontally scrollable data tables. The external stylesheet is cached by the service worker for offline use. The redesign is presentation-only and preserves the existing game systems and local saves.

## World Simulation expansion

The World Simulation adds a separate corporate-world layer without replacing the original CEO Simulator save:
- Dynamic fictional market climate and quarterly world-cycle settlements.
- Four evolving rival conglomerates with challenge outcomes, rival strength and valuation changes.
- Boardroom decisions covering profit-sharing, compliance, strategy pivots, shareholder confidence and takeover defence.
- Executive recruitment and workforce development for finance, technology and operations.
- Six technology projects, including analytics, robotics, clean energy, advanced materials, biotechnology and orbital manufacturing.
- Regional offices, global campaigns, market intelligence, mission tracking and a historical event feed.
- Separate local save, explicit Save World action, JSON export/import, and offline service-worker caching.

This module uses its own World Treasury and local save key; it does not silently change the original CEO Simulator balance or overwrite its save. Changes remain in memory until explicitly saved. All entities and market outcomes are fictional.

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
- Consistent black-and-white clean monochrome theme, optional synthesized sound cue, reduced-motion option, and keyboard shortcuts.
- Landing page navigation, logo-to-home behavior, responsive layout and custom SVG favicon.

## Latest UI and reliability update

The stylesheet uses one black-and-white glass design system throughout the app. The navigation bar and mobile menu use translucent blurred glass; dashboard cards, simulator panels, KPI tiles, forms, tables, terminal surfaces, tabs and dialogs share matching glass surfaces, borders, highlights and corner radii. White and neutral-grey accents keep the palette monochrome, while structural wrappers and repeated list rows remain visually calm instead of becoming cluttered nested cards. It retains consistent focus states, larger touch targets, compact KPI grids on small screens and horizontally scrollable tables where needed. The responsive rules include reduced-motion support and are designed to avoid narrow-screen overflow.

The browser theme color and PWA manifest colors match the monochrome interface. The service-worker cache version is **v28**, which prompts returning installations to fetch the updated app shell and stylesheet. The stylesheet remains part of the offline cache.

### Validation

The GitHub Actions validation workflow checks:
- Inline JavaScript, the World Simulation module and service-worker syntax.
- Existing CEO Simulator, Corporate Empire, Strategy Lab, Asset Empire, CorpShell and World Simulation feature markers.
- Responsive stylesheet linkage and mobile layout rules.
- PWA theme consistency, service-worker cache version and offline module caching.

The GitHub Pages workflow publishes the repository root as a static site. Check the repository's **Actions** tab for the latest validation and deployment results; a successful validation run does not by itself mean the Pages deployment has finished.

This interface update is presentation and compatibility work. It preserves the existing local game systems and save formats; it should not be interpreted as a claim that every gameplay mechanic has received a full end-to-end browser test.

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


## Navigation visibility fix

The decorative “All systems nominal” status label is hidden so it cannot consume navigation width. On desktop, the navigation links receive the available space and remain horizontally accessible; on smaller screens, the existing responsive menu is retained. The offline shell cache is versioned as v27.


## Monochrome neon finish

The interface adds a restrained black-and-white neon finish: white edge lighting and soft glow accents on the navigation, active tabs, buttons, card edges, progress indicators and keyboard focus. The palette remains strictly monochrome with no coloured neon accents. Glow is deliberately subtle to preserve legibility and avoid visual clutter; reduced-motion preferences remain respected. The offline shell cache is versioned as v28.


## Full monochrome neon glass treatment

The latest visual pass strengthens the black-and-white neon identity across the complete interface:
- Dark translucent glass cards with brighter white neon borders, inner highlights and soft outer glow.
- Illuminated header logo and matching glowing favicon, 192px and 512px installed-app icons using the same ExecutiveOS mark.
- Neon edge lighting on navigation, selected tabs, primary and secondary buttons, form focus states, progress meters and status indicators.
- Monochrome-only lighting: no blue, green, pink, purple or other coloured neon accents.
- Responsive layouts, keyboard focus visibility and reduced-motion / reduced-transparency preferences are retained.
- Offline shell cache refreshed to v29 so returning visitors can receive the updated styles and icons.


## Charcoal-black and navy-blue neon visual theme

The current visual identity uses only three colour families: deep charcoal black for the entire interface, white for all readable text, and navy / electric blue strictly for neon illumination.
- Deep charcoal-black page background, cards, panels, terminal windows, navigation and form surfaces.
- White primary text and soft neutral-grey secondary text for clear contrast.
- Navy-blue neon glow on the logo, matching browser favicon and installed-app icons, cards, navigation, buttons, controls, focus states and progress indicators.
- No green, red, amber, purple, pink or other coloured accents; semantic status text is neutral white.
- Browser chrome and installed-app theme colours match the charcoal-black interface.
- Offline app shell cache refreshed to v31.


## Strict charcoal, white and navy palette

The final visual layer enforces a restricted three-tone interface palette across the app shell, all game modules, controls, tables, terminal output, status indicators and World Simulation:
- Charcoal black backgrounds and dark charcoal glass cards/panels.
- White primary text and neutral grey secondary text.
- Navy/electric blue is the only accent and glow colour, including the logo, navigation, buttons, progress indicators and focus states.
- Legacy green, red, amber, purple and other coloured status treatments are neutralized rather than used as separate UI colours.
- The offline shell cache is refreshed to v32.


## PWA installation fix

The header **Install** button now captures the browser's `beforeinstallprompt` event and opens the native installation prompt when the browser makes it available. If one-tap installation is unavailable, the button displays device-specific instructions instead. Installed-app state is reflected in the button, and the install control remains visible on very narrow mobile screens. The service-worker shell cache is refreshed to **v33** so returning visitors receive the corrected install flow. On iPhone and iPad, use Safari's Share menu and choose **Add to Home Screen**.


## Three.js 3D card interface

The interface now uses a locally bundled **Three.js r180** renderer to draw shallow, charcoal-black 3D card bodies behind the existing HTML content. Cards have restrained navy edge shading, realistic side depth, soft contact shadows and subtle pointer tilt rather than large neon halos. The effect covers dashboard metrics, panels, feature cards, world-simulation cards, dialogs and terminal surfaces while leaving list rows and navigation controls visually lighter.

Three.js is stored in the repository and cached by the service worker; it is not loaded from a CDN and does not require an API, account, build step or paid service. If WebGL is unavailable, the cards retain a CSS-based depth and shadow fallback. The service-worker cache is refreshed to **v35**. Both the Three.js renderer bundle and its matching core bundle are stored locally and cached for offline use. Three.js is distributed under the MIT License; see `THREE-LICENSE.txt`.


## Always refresh to the latest published interface

The PWA shell cache is versioned as **v36**. On activation, the service worker removes older ExecutiveOS shell caches and takes control of open tabs. Each app launch requests a service-worker update with HTTP cache bypass; an already-open controlled tab reloads once when the new worker takes control. While online, navigation and application code are fetched from the current deployment before falling back to the latest cached copy when offline. CSS and JavaScript asset URLs are versioned to prevent stale browser-cache reuse.


## True Three.js glass cards (v37)

- Card bodies use translucent Three.js physical materials with clearcoat highlights, subtle reflectivity and shaded charcoal/navy sides.
- Frosted-glass HTML surfaces add background blur, fine cool-grey borders and soft inset highlights over the live Three.js depth layer.
- Navigation, terminal sub-panels, controls, forms and the sticky header share the same glass treatment.
- Glow remains restrained within the charcoal, white and muted navy palette.
- Reduced-transparency settings and lighter mobile blur remain supported.
- Local app-shell assets are refreshed and versioned as v37.


## Animated 3D glass depth (v38)

- Three.js card meshes use visible 22px physical depth, brighter shaded sides, stronger edge lines and responsive pointer tilt.
- Cards gently float at staggered phases; pointer hover adds a 3D lean, lift and scale.
- Frosted glass remains translucent with charcoal/navy reflections and white highlights.
- CSS 3D tilt and float remain available when WebGL is unavailable.
- Motion respects reduced-motion preferences and pauses while the page is hidden.
- Versioned assets and offline app-shell cache are refreshed to v38.


## Clean proportion and layout pass (v39)

The latest presentation pass standardizes the content width, page rhythm, heading alignment, card radii, panel padding, metric sizing, button heights and grid gaps. Dashboard metrics use balanced columns; content cards keep consistent proportions; long labels wrap without forcing adjacent cards wider. Tablet and phone layouts reflow deliberately instead of shrinking desktop columns, while tables remain horizontally scrollable when their data needs it. The Three.js glass layer is kept restrained so card edges, spacing and text hierarchy remain clear. No simulator rules, save keys, save formats or player data were changed. Versioned assets and the offline shell cache are refreshed to v39.


## Visible 3D glass finish (v40)

The locally bundled Three.js renderer gives cards 22px physical depth, shaded side faces and brighter edge lines. Pointer tilt is slightly stronger, with a restrained lift and staggered floating animation. Cards use translucent charcoal/navy glass, background blur and a soft white reflection rather than heavy neon glow. Reduced-motion preferences disable the animated movement and pointer tilt. Three.js and its core bundle are served from the repository itself; no paid APIs, external runtime services, subscriptions, ads or usage fees are required. Versioned assets and the offline cache are refreshed to v40.


## Latest-shell refresh policy (v41)

The app shell and all versioned UI/game modules now use the v41 asset set. The service worker fetches navigations without relying on the browser HTTP cache, installs the new shell before activating it, removes older ExecutiveOS shell caches, and claims open clients. Existing controlled tabs reload once when the new worker takes control. When offline, the app falls back to the latest complete shell that was successfully installed. This avoids intentionally serving an older UI while online; offline use necessarily remains limited to the most recently cached release. Existing local saves are not cleared or migrated by this update.


## Proportion and alignment pass (v42)

The v42 interface pass normalizes page widths, heading scales, panel padding, KPI sizing, grid gaps, and responsive card columns across the overview, CEO, terminal, asset, corporate, strategy, and achievement areas. Unnecessary continuous card-floating motion is removed; 3D pointer tilt is restrained so panels retain stable visual proportions. Existing saves and game systems remain unchanged.
