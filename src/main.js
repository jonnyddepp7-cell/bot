```javascript
import "./style.css";

const pages = [
  ["overview", "Overview", "⌂"],
  ["trading", "Trading Terminal", "↗"],
  ["markets", "Markets", "◈"],
  ["portfolio", "Portfolio", "▤"],
  ["wallet", "Wallet & Funding", "▣"],
  ["orders", "Order History", "⇄"],
  ["analytics", "Analytics", "▥"],
  ["signals", "Signals & News", "◉"],
  ["notifications", "Notifications", "♧"],
  ["profile", "Profile & Settings", "⚙"],
  ["support", "Help & Support", "?"],
  ["admin", "Admin Center", "⌘"]
];

const markets = [
  { symbol: "XAU/USD", name: "Gold / US Dollar", price: "2,650.40", change: "+0.82%", up: true },
  { symbol: "EUR/USD", name: "Euro / US Dollar", price: "1.08420", change: "+0.21%", up: true },
  { symbol: "GBP/USD", name: "British Pound / US Dollar", price: "1.29450", change: "-0.14%", up: false },
  { symbol: "BTC/USD", name: "Bitcoin / US Dollar", price: "67,420.00", change: "+1.45%", up: true },
  { symbol: "USD/JPY", name: "US Dollar / Japanese Yen", price: "149.820", change: "-0.32%", up: false }
];

let activePage = "overview";
let balance = 10000;
let demoOrders = [];

const app = document.querySelector("#app");

function money(value) {
  return "$" + Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  })[char]);
}

function navLink(page) {
  return `
    <button class="nav-link ${activePage === page[0] ? "active" : ""}"
      data-page="${page[0]}">
      <span class="nav-icon">${page[2]}</span>
      <span>${page[1]}</span>
      ${page[0] === "notifications" ? '<span class="nav-dot"></span>' : ""}
    </button>`;
}

function marketRows() {
  return markets.map(m => `
    <tr>
      <td>
        <div class="asset">
          <span class="asset-icon">${m.symbol.split("/")[0].slice(0, 1)}</span>
          <span><strong>${m.symbol}</strong><small>${m.name}</small></span>
        </div>
      </td>
      <td class="price">${m.price}</td>
      <td><span class="change ${m.up ? "positive" : "negative"}">${m.change}</span></td>
      <td><button class="small-button" data-trade="${m.symbol}">Trade</button></td>
    </tr>`).join("");
}

function overview() {
  return `
    <section class="welcome-row">
      <div><p class="eyebrow">YOUR TRADING WORKSPACE</p>
        <h1>Good to see you again.</h1>
        <p class="muted">Track the markets and manage your demo portfolio.</p>
      </div>
      <span class="demo-label"><span></span> DEMO ACCOUNT</span>
    </section>

    <section class="stat-grid">
      <article class="stat-card">
        <p>Demo Account Balance <span>ⓘ</span></p>
        <h2>${money(balance)}</h2>
        <small class="muted">Simulated funds only</small>
      </article>
      <article class="stat-card">
        <p>Open Positions <span>↗</span></p>
        <h2>${demoOrders.length}</h2>
        <small class="muted">Demo trades placed</small>
      </article>
      <article class="stat-card">
        <p>Today's P/L <span>⌁</span></p>
        <h2>$0.00</h2>
        <small class="muted">No live profit calculated</small>
      </article>
      <article class="stat-card">
        <p>Account Status <span>◉</span></p>
        <h2 class="status-text">Practice</h2>
        <small class="muted">No real money involved</small>
      </article>
    </section>

    <section class="content-grid">
      <article class="panel market-panel">
        <div class="panel-heading">
          <div><h3>Market Watch</h3><p class="muted">Illustrative prices for interface testing</p></div>
          <button class="text-button" data-page="markets">View markets →</button>
        </div>
        <div class="table-wrap"><table>
          <thead><tr><th>Instrument</th><th>Price</th><th>24h Change</th><th></th></tr></thead>
          <tbody>${marketRows()}</tbody>
        </table></div>
      </article>

      <article class="panel activity-panel">
        <div class="panel-heading"><div><h3>Quick Actions</h3>
          <p class="muted">Choose where to go next</p></div></div>
        <button class="action-tile" data-page="trading"><span>↗</span><div><strong>Open Trading Terminal</strong><small>Practice placing demo trades</small></div><b>→</b></button>
        <button class="action-tile" data-page="wallet"><span>▣</span><div><strong>Wallet & Funding</strong><small>View demo funding options</small></div><b>→</b></button>
        <button class="action-tile" data-page="portfolio"><span>▤</span><div><strong>My Portfolio</strong><small>Review your demo positions</small></div><b>→</b></button>
        <div class="notice"><strong>Trading risk reminder</strong><p>Market prices can move quickly. This website currently uses simulated data and does not execute real trades.</p></div>
      </article>
    </section>`;
}

function trading() {
  return `
    <section class="welcome-row"><div><p class="eyebrow">PRACTICE MODE</p><h1>Trading Terminal</h1>
    <p class="muted">Practice with simulated orders, not real markets.</p></div><span class="demo-label"><span></span> DEMO</span></section>
    <section class="content-grid trading-grid">
      <article class="panel chart-panel">
        <div class="panel-heading"><div><h3>Gold / US Dollar</h3><p class="muted">XAU/USD · Illustrative data</p></div><span class="change positive">+0.82%</span></div>
        <div class="fake-chart"><div class="chart-label">$2,650.40</div>
          <svg viewBox="0 0 700 280" role="img" aria-label="Illustrative gold price chart">
            <defs><pattern id="grid" width="70" height="46" patternUnits="userSpaceOnUse"><path d="M 70 0 L 0 0 0 46" fill="none" stroke="#e8edf4" stroke-width="1"/></pattern></defs>
            <rect width="700" height="280" fill="url(#grid)"/>
            <polyline points="0,205 40,180 80,200 120,140 160,160 200,120 240,150 280,95 320,135 360,115 400,150 440,85 480,100 520,65 560,90 600,40 640,68 700,25" fill="none" stroke="#c69b43" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
          </svg>
          <div class="chart-foot"><span>09:00</span><span>11:00</span><span>13:00</span><span>15:00</span><span>17:00</span></div>
        </div>
        <p class="muted disclaimer">This chart is a visual mock-up. It is not a live market feed.</p>
      </article>
      <article class="panel order-panel"><h3>Place Demo Order</h3>
        <p class="muted">No real orders will be sent.</p>
        <form id="trade-form">
          <label>Instrument<select id="instrument">${markets.map(m=>`<option value="${m.symbol}">${m.symbol}</option>`).join("")}</select></label>
          <label>Order size (demo units)<input id="trade-size" type="number" min="1" max="1000" value="1" required></label>
          <div class="order-buttons"><button class="buy-button" name="side" value="Buy">Buy</button><button class="sell-button" name="side" value="Sell">Sell</button></div>
          <p class="muted tiny">This demo records an order in your browser session only.</p>
        </form>
      </article>
    </section>`;
}

function genericPage() {
  const content = {
    markets: ["Markets", "Explore the available illustrative instruments.", `<div class="table-wrap"><table><thead><tr><th>Instrument</th><th>Price</th><th>24h Change</th><th></th></tr></thead><tbody>${marketRows()}</tbody></table></div>`],
    portfolio: ["Portfolio", "Your demo positions and account overview.", `<div class="empty-state"><span>▤</span><h3>Your portfolio</h3><p>Demo trades you place will be listed in Order History.</p><button class="primary-button" data-page="trading">Open trading terminal</button></div>`],
    wallet: ["Wallet & Funding", "View demo balance and funding information.", `<div class="wallet-card"><p>Demo balance</p><h2>${money(balance)}</h2><span>Practice funds · Not withdrawable</span></div><div class="notice"><strong>Funding is disabled</strong><p>No deposits or withdrawals are processed on this demo platform. Never send funds to an unverified account.</p></div>`],
    orders: ["Order History", "Orders created during this browser session.", demoOrders.length ? `<div class="table-wrap"><table><thead><tr><th>Instrument</th><th>Side</th><th>Units</th><th>Status</th></tr></thead><tbody>${demoOrders.map(o=>`<tr><td>${escapeHtml(o.symbol)}</td><td>${escapeHtml(o.side)}</td><td>${o.size}</td><td><span class="change positive">Demo recorded</span></td></tr>`).join("")}</tbody></table></div>` : `<div class="empty-state"><span>⇄</span><h3>No demo orders yet</h3><p>Your practice orders will appear here.</p><button class="primary-button" data-page="trading">Place a demo order</button></div>`],
    analytics: ["Analytics", "A future home for performance charts and trading statistics.", `<div class="empty-state"><span>▥</span><h3>Analytics workspace</h3><p>Performance metrics will appear when a verified demo-tracking system is added.</p></div>`],
    signals: ["Signals & News", "A workspace for market research and signal notes.", `<div class="notice"><strong>Verify every trading signal</strong><p>No live signals are provided here. Trading signals are not guaranteed to be accurate or profitable.</p></div><div class="empty-state"><span>◉</span><h3>No published signals</h3><p>Market updates can be added when a trusted data source is configured.</p></div>`],
    notifications: ["Notifications", "Platform updates and account messages.", `<div class="empty-state"><span>♧</span><h3>You're all caught up</h3><p>No notifications are available in this demo.</p></div>`],
    profile: ["Profile & Settings", "Manage your demo preferences.", `<div class="panel form-panel"><h3>Demo preferences</h3><label>Display name<input id="display-name" placeholder="Your display name"></label><label>Preferred currency<select><option>USD — US Dollar</option><option>NGN — Nigerian Naira</option></select></label><p class="muted">These settings are not saved to a user account yet.</p><button class="primary-button" id="save-profile">Save in this session</button></div>`],
    support: ["Help & Support", "Guidance for using this demo.", `<div class="notice"><strong>Need help?</strong><p>This is a front-end demo. Authentication, funding, live prices, and real trading require further secure integration.</p></div><div class="empty-state"><span>?</span><h3>Support center</h3><p>Support tickets are not connected yet.</p></div>`],
    admin: ["Admin Center", "Reserved for a future secure administration system.", `<div class="notice"><strong>Restricted functionality not configured</strong><p>This page is only a visual placeholder. It does not verify administrator permissions. Do not use it to manage real users, balances, or payments.</p></div><div class="empty-state"><span>⌘</span><h3>Administration tools</h3><p>Secure server-side roles and database access policies must be implemented before enabling admin actions.</p></div>`]
  };
  const data = content[activePage] || content.overview;
  return `<section class="welcome-row"><div><p class="eyebrow">AURUMTRADE WORKSPACE</p><h1>${data[0]}</h1><p class="muted">${data[1]}</p></div></section><section class="panel page-panel">${data[2]}</section>`;
}

function render() {
  const current = pages.find(p => p[0] === activePage) || pages[0];
  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <a class="brand" href="#" data-page="overview"><span class="brand-mark">A</span><span>AURUM<span class="gold">TRADE</span><small>TRADING PLATFORM</small></span></a>
        <div class="account-chip"><span class="account-avatar">D</span><span><strong>Demo Account</strong><small>Practice workspace</small></span><span class="online-dot"></span></div>
        <p class="nav-caption">WORKSPACE</p>
        <nav>${pages.map(navLink).join("")}</nav>
        <div class="sidebar-bottom"><div class="secure-note"> <span>◆</span><div><strong>Practice environment</strong><small>No live trading enabled</small></div></div><p>© 2026 AurumTrade Demo</p></div>
      </aside>
      <main class="main-area">
        <header class="topbar"><button class="mobile-menu" id="mobile-menu" aria-label="Toggle navigation">☰</button><div class="breadcrumb">Workspace <span>/</span> ${current[1]}</div><div class="top-actions"><span class="top-demo"><span></span> Demo mode</span><button class="icon-button" data-page="notifications" aria-label="Notifications">♧</button><button class="user-chip" data-page="profile"><span class="user-avatar">U</span><span>User profile</span>⌄</button></div></header>
        <div class="page-content">${activePage === "overview" ? overview() : activePage === "trading" ? trading() : genericPage()}</div>
        <footer class="footer"><span>AurumTrade Demo</span><span>Simulated data · No real trades or payments</span></footer>
      </main>
    </div>
    <div id="toast" class="toast" role="status"></div>`;

  app.querySelectorAll("[data-page]").forEach(button => button.addEventListener("click", event => {
    event.preventDefault();
    activePage = button.dataset.page;
    app.querySelector(".sidebar").classList.remove("sidebar-open");
    render();
  }));

  app.querySelectorAll("[data-trade]").forEach(button => button.addEventListener("click", () => {
    activePage = "trading";
    render();
    const select = document.querySelector("#instrument");
    if (select) select.value = button.dataset.trade;
  }));

  const menu = document.querySelector("#mobile-menu");
  if (menu) menu.addEventListener("click", () => document.querySelector(".sidebar").classList.toggle("sidebar-open"));

  const form = document.querySelector("#trade-form");
  if (form) form.addEventListener("submit", event => {
    event.preventDefault();
    const side = event.submitter?.value || "Buy";
    const symbol = document.querySelector("#instrument").value;
    const size = Number(document.querySelector("#trade-size").value);
    if (!Number.isFinite(size) || size < 1 || size > 1000) {
      showToast("Enter a demo size between 1 and 1000.");
      return;
    }
    demoOrders.unshift({ symbol, side, size, status: "Demo recorded" });
    showToast(`${side} demo order recorded for ${symbol}.`);
    render();
  });

  const save = document.querySelector("#save-profile");
  if (save) save.addEventListener("click", () => showToast("Preferences are only temporary in this demo."));
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

render();
```
