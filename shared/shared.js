/* ============================================================
   SEER / ELECTRIC FOUNDATION
   Shared shell, data, charts, trade ticket, formatting.
   No frameworks. No build. No external chart libraries.
   ============================================================ */

(function () {
  'use strict';

  const SEER = (window.SEER = window.SEER || {});

  /* ---------- Theme (early, no flash) ---------- */
  try {
    const saved = localStorage.getItem('seer-theme');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.dataset.theme = saved;
    }
  } catch (e) { /* storage may be unavailable */ }

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Products ---------- */
  const products = [
    { id: 'home', label: 'Home', href: '../home/index.html', note: 'The protocol beneath the products.' },
    { id: 'app', label: 'App', href: '../app/index.html', note: 'Every market, one precise index.' },
    { id: 'deep', label: 'Deep', href: '../deep/index.html', note: 'Thirty possible futures.' },
    { id: 'futarchy', label: 'Futarchy', href: '../futarchy/index.html', note: 'One proposal, two futures.' },
    { id: 'opportunity', label: 'Opportunity', href: '../opportunity/index.html', note: 'One market for attention.' },
    { id: 'risk', label: 'Risk', href: '../risk/index.html', note: 'Risk in comparable units.' }
  ];
  SEER.products = products;

  const icons = {
    arrow: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M9 4l4 4-4 4"/></svg>',
    arrowUp: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13V3M4 7l4-4 4 4"/></svg>',
    search: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.6"/><path d="M10.4 10.4L14 14"/></svg>',
    sun: '<svg class="icon sun" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="3.1"/><path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.7 3.7l1.4 1.4M12.9 12.9l1.4 1.4M14.3 3.7l-1.4 1.4M5.1 12.9l-1.4 1.4"/></svg>',
    moon: '<svg class="icon moon" viewBox="0 0 18 18" aria-hidden="true"><path d="M15.2 11.2A6.6 6.6 0 016.8 2.8 6.6 6.6 0 1015.2 11.2z"/></svg>',
    bolt: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M9 1L3 9h4l-1 6 7-9H9l0-5z"/></svg>',
    plus: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg>',
    close: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg>',
    filter: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 4h12M4 8h8M6.5 12h3"/></svg>',
    grid: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg>',
    table: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 4h12M2 8h12M2 12h12"/></svg>',
    check: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 4.7"/></svg>',
    flame: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 14c3 0 4.6-2 4.6-4.4 0-2.1-1.3-3.4-2.2-4.8C9.6 3.4 9.3 2.2 9.3 1.5c-2.1 1-3.4 2.9-3.6 5.1-.6-.5-1-1.2-1.1-2C3.5 5.8 3 7.2 3 8.9 3 12 5 14 8 14z"/></svg>',
    clock: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6"/><path d="M8 4.6V8l2.4 1.6"/></svg>',
    users: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="6" cy="6" r="2.2"/><path d="M2.4 13c.4-2.2 1.8-3.4 3.6-3.4S9.2 10.8 9.6 13M10.8 5.2a2.1 2.1 0 010 4M12 10.2c1 .4 1.6 1.4 1.8 2.8"/></svg>',
    chain: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M6.2 6.2l3.6-3.6a2.5 2.5 0 013.6 3.6l-2.1 2.1M9.8 9.8l-3.6 3.6a2.5 2.5 0 01-3.6-3.6l2.1-2.1M6.5 9.5l3-3"/></svg>',
    shield: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.8l5 2v4.1c0 3.1-2.2 5.2-5 6.3-2.8-1.1-5-3.2-5-6.3V3.8l5-2z"/><path d="M6 8l1.5 1.5L10.4 6"/></svg>',
    bookmark: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5h8v11l-4-2.6-4 2.6v-11z"/></svg>',
    external: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3H3v10h10v-3M9 3h4v4M13 3L7 9"/></svg>'
  };
  SEER.icons = icons;

  /* ---------- Formatting ---------- */
  const fmt = {
    usd(v, digits) {
      if (v == null || Number.isNaN(v)) return '—';
      const abs = Math.abs(v);
      if (abs >= 1e9) return '$' + (v / 1e9).toFixed(digits == null ? 2 : digits) + 'B';
      if (abs >= 1e6) return '$' + (v / 1e6).toFixed(digits == null ? 2 : digits) + 'M';
      if (abs >= 1e3) return '$' + (v / 1e3).toFixed(digits == null ? 1 : digits) + 'K';
      return '$' + Math.round(v).toLocaleString('en-US');
    },
    num(v, digits = 0) {
      if (v == null || Number.isNaN(v)) return '—';
      return Number(v).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
    },
    pct(v, digits = 1) {
      if (v == null || Number.isNaN(v)) return '—';
      return (v * 100).toFixed(digits) + '%';
    },
    pts(v, digits = 1) {
      if (v == null || Number.isNaN(v)) return '—';
      return (v > 0 ? '+' : '') + v.toFixed(digits) + ' pts';
    },
    date(iso, opts) {
      if (!iso) return '—';
      const d = new Date(iso + (String(iso).length === 10 ? 'T12:00:00Z' : ''));
      return new Intl.DateTimeFormat('en-GB', opts || { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(d);
    },
    shortDate(iso) {
      return fmt.date(iso, { day: 'numeric', month: 'short', timeZone: 'UTC' });
    },
    ago(iso) {
      if (!iso) return '—';
      const d = new Date(iso + (String(iso).length === 10 ? 'T12:00:00Z' : ''));
      const days = Math.round((Date.now() - d.getTime()) / 864e5);
      if (days === 0) return 'today';
      if (days === 1) return '1 day ago';
      if (days < 30) return days + ' days ago';
      const months = Math.round(days / 30);
      return months + (months === 1 ? ' month ago' : ' months ago');
    },
    until(iso) {
      if (!iso) return '—';
      const d = new Date(iso + (String(iso).length === 10 ? 'T23:59:59Z' : ''));
      const days = Math.ceil((d.getTime() - Date.now()) / 864e5);
      if (days < 0) return 'closed';
      if (days === 0) return 'closes today';
      if (days === 1) return '1 day left';
      return days + ' days left';
    },
    compact(v) {
      if (v == null) return '—';
      if (Math.abs(v) >= 1e9) return (v / 1e9).toFixed(1) + 'B';
      if (Math.abs(v) >= 1e6) return (v / 1e6).toFixed(1) + 'M';
      if (Math.abs(v) >= 1e3) return (v / 1e3).toFixed(1) + 'K';
      return String(Math.round(v));
    },
    titleCase(s) { return s.replace(/(^|\s|\/|-)([a-z])/g, (_, a, b) => a + b.toUpperCase()); }
  };
  SEER.fmt = fmt;

  /* ---------- Canonical illustrative dataset ---------- */
  const DAY = 864e5;
  const TODAY = new Date('2026-10-17T12:00:00Z');

  function dateOffset(days) {
    return new Date(TODAY.getTime() + days * DAY).toISOString().slice(0, 10);
  }

  function makeHistory(end, seed, n = 30, amp = 0.055) {
    const vals = [];
    const phase = seed * 1.73;
    const dir = seed % 3 === 0 ? 1 : -1;
    const start = clamp(end - dir * amp * 1.9, 0.02, 0.98);
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 1 : i / (n - 1);
      const trend = start + (end - start) * t;
      const noise = (Math.sin(i * .57 + phase) * .62 + Math.cos(i * .23 + phase * 1.9) * .38) * amp * (1 - t * .42);
      vals.push(clamp(trend + noise, .012, .988));
    }
    vals[n - 1] = end;
    return vals.map((value, i) => ({ date: new Date(TODAY.getTime() - (n - 1 - i) * DAY).toISOString().slice(0, 10), value }));
  }

  function m(o) {
    const outcomes = o.outcomes || [
      { label: 'Yes', price: o.price },
      { label: 'No', price: 1 - o.price }
    ];
    return Object.assign({
      id: o.id,
      type: 'Categorical',
      chain: 'Ethereum',
      status: 'open',
      resolution: 'Reality.eth · Kleros backstop',
      liquidity: Math.round(o.volume * 0.32),
      rules: 'Resolves from the named public source at the close timestamp. Disputes escalate to Kleros.',
      outcomes
    }, o, { outcomes });
  }

  const markets = [
    m({ id: 'eth-6k', question: 'Will ETH close above $6,000 on 31 December 2026?', type: 'Categorical', category: 'Crypto', chain: 'Ethereum', price: .34, volume: 4820000, traders: 3184, closes: '2026-12-31', change: 2.8, history: makeHistory(.34, 2), liquidity: 1920000 }),
    m({ id: 'reserve-nov', question: 'Will the Meridian Reserve cut rates at the November 2026 meeting?', type: 'Categorical', category: 'Macro', chain: 'Ethereum', price: .58, volume: 2310000, traders: 1892, closes: '2026-11-04', status: 'closing', change: -3.4, history: makeHistory(.58, 4), liquidity: 920000 }),
    m({ id: 'cpi-oct', question: 'Will Aster CPI year-over-year print above 3.2% for October 2026?', type: 'Categorical', category: 'Macro', chain: 'Ethereum', price: .41, volume: 1120000, traders: 906, closes: '2026-11-12', change: 1.2, history: makeHistory(.41, 7), liquidity: 510000 }),
    m({ id: 'stable-growth', question: 'Which chain leads stablecoin supply growth in Q4 2026?', type: 'Multi-outcome', category: 'Crypto', chain: 'Gnosis Chain', volume: 3670000, traders: 2410, closes: '2026-12-31', change: 4.1, history: makeHistory(.42, 9), outcomes: [{ label: 'Ethereum', price: .42 }, { label: 'Orbital', price: .27 }, { label: 'Beacon', price: .19 }, { label: 'Cinder', price: .12 }], liquidity: 1180000 }),
    m({ id: 'lumen-agent', question: 'Will Lumen Labs ship a consumer agent before 1 January 2027?', type: 'Categorical', category: 'Tech', chain: 'Ethereum', price: .63, volume: 1840000, traders: 1520, closes: '2026-12-31', change: 6.2, history: makeHistory(.63, 11), liquidity: 700000 }),
    m({ id: 'sol-etf', question: 'Will the Federal Markets Board approve a spot ORB fund by 30 November 2026?', type: 'Categorical', category: 'Policy', chain: 'Ethereum', price: .71, volume: 5630000, traders: 4021, closes: '2026-11-30', status: 'closing', change: 8.7, history: makeHistory(.71, 13), liquidity: 2210000 }),
    m({ id: 'gnosis-tps', question: 'Will Gnosis Chain exceed 2M daily transactions in Q4 2026?', type: 'Scalar', category: 'Crypto', chain: 'Gnosis Chain', price: .47, volume: 640000, traders: 512, closes: '2026-12-31', change: -1.1, history: makeHistory(.47, 15), liquidity: 260000 }),
    m({ id: 'eth-yield', question: 'Where will ETH staking yield land on 31 December 2026?', type: 'Scalar', category: 'Crypto', chain: 'Ethereum', volume: 890000, traders: 703, closes: '2026-12-31', change: 0.8, history: makeHistory(.48, 17), outcomes: [{ label: '2.6–3.0%', price: .22 }, { label: '3.0–3.4%', price: .48 }, { label: '3.4–3.8%', price: .21 }, { label: 'Above 3.8%', price: .09 }], liquidity: 410000 }),
    m({ id: 'comets', question: 'Will the Harbor Comets make the 2027 Continental Basketball playoffs?', type: 'Categorical', category: 'Sports', chain: 'Gnosis Chain', price: .66, volume: 2080000, traders: 2604, closes: '2027-04-14', change: -2.2, history: makeHistory(.66, 19), liquidity: 640000 }),
    m({ id: 'eth-inflows', question: 'Will a spot ETH ETF see $2B in weekly inflows before 2027?', type: 'Categorical', category: 'Crypto', chain: 'Ethereum', price: .39, volume: 1430000, traders: 1105, closes: '2026-12-31', change: 3.6, history: makeHistory(.39, 21), liquidity: 540000 }),
    m({ id: 'shutdown', question: 'Will the next Aster government shutdown last more than 14 days?', type: 'Categorical', category: 'Politics', chain: 'Ethereum', price: .28, volume: 980000, traders: 784, closes: '2026-12-15', change: -4.8, history: makeHistory(.28, 23), liquidity: 390000 }),
    m({ id: 'foldable', question: 'Will Halcyon release a foldable handset in calendar 2027?', type: 'Categorical', category: 'Tech', chain: 'Gnosis Chain', price: .44, volume: 760000, traders: 602, closes: '2027-09-30', change: 0.4, history: makeHistory(.44, 25), liquidity: 300000 }),
    m({ id: 'ucl', question: 'Will Atletico Meridian win the 2026–27 Continental Cup?', type: 'Categorical', category: 'Sports', chain: 'Gnosis Chain', price: .18, volume: 3210000, traders: 3312, closes: '2027-05-31', change: 1.5, history: makeHistory(.18, 27), liquidity: 840000 }),
    m({ id: 'tvl-winner', question: 'Which protocol wins the most new TVL in Q4 2026?', type: 'Multi-outcome', category: 'DeFi', chain: 'Ethereum', volume: 2740000, traders: 1820, closes: '2026-12-31', change: 2.7, history: makeHistory(.30, 29), outcomes: [{ label: 'Aurelia', price: .30 }, { label: 'Brine', price: .24 }, { label: 'Coil', price: .22 }, { label: 'Eidolon', price: .14 }, { label: 'Other', price: .10 }], liquidity: 810000 }),
    m({ id: 'cex-por', question: 'Will a top-10 CEX publish a proof-of-reserves update in October?', type: 'Categorical', category: 'Crypto', chain: 'Gnosis Chain', price: .61, volume: 410000, traders: 360, closes: '2026-10-31', status: 'closing', change: -0.9, history: makeHistory(.61, 33), liquidity: 180000 }),
    m({ id: 'pectra', question: 'Will the Ethereum Meridian upgrade ship on mainnet by Q2 2027?', type: 'Categorical', category: 'Crypto', chain: 'Ethereum', price: .57, volume: 1950000, traders: 1460, closes: '2027-06-30', change: 3.1, history: makeHistory(.57, 35), liquidity: 730000 }),
    m({ id: 'fmb-chair', question: 'Who will chair the Federal Markets Board before 2027?', type: 'Multi-outcome', category: 'Politics', chain: 'Ethereum', volume: 2120000, traders: 1702, closes: '2026-12-31', change: -1.4, history: makeHistory(.31, 37), outcomes: [{ label: 'Candidate A', price: .31 }, { label: 'Candidate B', price: .24 }, { label: 'Candidate C', price: .19 }, { label: 'Candidate D', price: .16 }, { label: 'Other', price: .10 }], liquidity: 620000 }),
    m({ id: 'arb-budget', question: 'Will the Aurelia DAO pass its 2027 grants budget?', type: 'Futarchy', category: 'Governance', chain: 'Ethereum', price: .72, volume: 530000, traders: 401, closes: '2026-10-16', status: 'resolving', change: 5.2, history: makeHistory(.72, 39), liquidity: 190000 }),
    m({ id: 'eth-4k-sep', question: 'Did ORB close above $4.00 on 30 September 2026?', type: 'Categorical', category: 'Crypto', chain: 'Ethereum', price: 1, volume: 8400000, traders: 6120, closes: '2026-09-30', status: 'resolved', change: 0, history: makeHistory(.99, 41, 30, .01), outcomes: [{ label: 'Yes', price: 1 }, { label: 'No', price: 0 }], liquidity: 0 }),
    m({ id: 'shutdown-oct', question: 'Did the Aster government avoid a shutdown on 1 October 2026?', type: 'Categorical', category: 'Politics', chain: 'Ethereum', price: 0, volume: 3100000, traders: 2200, closes: '2026-10-01', status: 'resolved', change: 0, history: makeHistory(.01, 43, 30, .01), outcomes: [{ label: 'Yes', price: 0 }, { label: 'No', price: 1 }], liquidity: 0 }),
    m({ id: 'deep-r7', question: 'Which six Round 7 proposals will human evaluators score highest?', type: 'Multi-outcome', category: 'Governance', chain: 'Ethereum', volume: 890000, traders: 640, closes: '2026-10-30', change: 3.2, history: makeHistory(.58, 45), outcomes: [{ label: 'Open-source MEV accounting', price: .30 }, { label: 'Public-goods endowment', price: .24 }, { label: 'Zero-knowledge procurement', price: .20 }, { label: 'Weather station network', price: .14 }, { label: 'Other', price: .12 }], liquidity: 340000 })
  ];

  markets.forEach((mk) => {
    if (!mk.history) mk.history = makeHistory(mk.price, 1);
    mk.change = mk.change == null ? 0 : mk.change;
    mk.primaryPrice = mk.outcomes[0].price;
    mk.leading = mk.outcomes.reduce((a, b) => (b.price > a.price ? b : a), mk.outcomes[0]);
  });
  SEER.markets = markets;

  /* ---------- Deep: 30 grant proposals ---------- */
  const proposalRows = [
    ['Open-source MEV accounting for L2 sequencers', 'Lattice Labs', 'Infrastructure', 180],
    ['A public-goods endowment for Ethereum client teams', 'Client Guild', 'Infrastructure', 420],
    ['Zero-knowledge proofs for municipal procurement', 'Civis', 'Public goods', 240],
    ['A community-owned weather station network', 'Stratus', 'Climate', 160],
    ['Retroactive funding for open-source RPC providers', 'Relay Commons', 'Infrastructure', 300],
    ['Local-first voting infrastructure for unions', 'Ballot Box', 'Governance', 210],
    ['An open registry of AI evaluation datasets', 'Eval Commons', 'AI safety', 275],
    ['Microgrants for independent security researchers', 'Whitehat Fund', 'Security', 190],
    ['A protocol-owned liquidity program for Gnosis', 'Gnosis Guild', 'DeFi', 350],
    ['Open hardware for neighbourhood air-quality monitoring', 'Sensor Commons', 'Climate', 140],
    ['A fellowship for women in cryptography', 'Cipher Collective', 'Education', 220],
    ['Decentralized identity for refugee services', 'Horizon ID', 'Public goods', 260],
    ['A shared risk oracle for parametric insurance', 'Risk Pool', 'DeFi', 310],
    ['Public transit data standards for mid-size cities', 'Transit Stack', 'Public goods', 150],
    ['Open satellite imagery for land-rights defence', 'Terra Lens', 'Climate', 230],
    ['A stipend program for protocol translators', 'Lingua', 'Education', 120],
    ['Community audits of algorithmic welfare systems', 'Civic Audit', 'AI safety', 200],
    ['A testnet for local-currency experiments', 'Mint Local', 'DeFi', 170],
    ['Documentation grants for Ethereum execution clients', 'Doc Guild', 'Infrastructure', 130],
    ['A privacy-preserving census toolkit', 'Census Lab', 'Public goods', 280],
    ['Open-source tooling for DAO treasury reporting', 'Ledger Commons', 'Governance', 145],
    ['A fellowship for rural broadband cooperatives', 'Last Mile', 'Public goods', 165],
    ['Reproducible builds for smart-contract verification', 'Build Proof', 'Security', 195],
    ['A public dataset of market calibration', 'Calibration Lab', 'Research', 110],
    ['Accessible wallets for blind and low-vision users', 'A11y Wallet', 'Public goods', 155],
    ['A legal defence fund for open-source developers', 'Defense Pool', 'Security', 330],
    ['Community solar forecasting with local sensors', 'Sunwise', 'Climate', 125],
    ['An open curriculum for protocol governance', 'Governance School', 'Education', 100],
    ['Cross-border payroll rails for cooperatives', 'Coop Pay', 'DeFi', 290],
    ['A resilience fund for RPC outages', 'Uptime Fund', 'Infrastructure', 205]
  ];

  const agentNames = ['Athena-7', 'Quill', 'Meridian', 'Sable', 'Northstar', 'Loom', 'Rook', 'Aster', 'Cinder', 'Halcyon', 'Vela', 'Orin', 'Kestrel', 'Solace', 'Nimbus', 'Tessel', 'Bront', 'Ilex', 'Mako', 'Juniper', 'Argo', 'Lyra', 'Onyx', 'Perigee', 'Saber', 'Tundra', 'Vesper', 'Wren', 'Zephyr', 'Cypher'];
  const weights = [78, 64, 58, 53, 49, 45, 42, 39, 36, 34, 32, 30, 28, 26, 24, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8];
  const wsum = weights.reduce((a, b) => a + b, 0);
  const proposals = proposalRows.map((row, i) => {
    const [title, team, category, ask] = row;
    const prob = weights[i] / wsum;
    const volume = Math.round((180000 + (30 - i) * 42000 + (i % 4) * 17000) / 1000) * 1000;
    const traders = Math.round(74 + prob * 2900 + (i % 5) * 13);
    const aiShare = clamp(0.22 + ((i * 7) % 43) / 100, 0.18, 0.72);
    return {
      id: 'p' + String(i + 1).padStart(2, '0'),
      rank: i + 1,
      title, team, category, ask: ask * 1000,
      prob,
      volume,
      traders,
      aiShare,
      aiVolume: Math.round(volume * aiShare),
      humanVolume: Math.round(volume * (1 - aiShare)),
      change: Number((((i * 13) % 31) / 10 - 1.3).toFixed(1)),
      agent: agentNames[i % agentNames.length],
      agentTrack: (61 + (i * 3) % 12) + '% hit rate · ' + (84 + i * 6) + ' markets',
      reviewScore: Number((3.1 + ((i * 11) % 18) / 10).toFixed(1)),
      note: [
        'Strong public-goods case; needs a clearer maintenance plan.',
        'Good team provenance; budget is high relative to scope.',
        'Novel infrastructure with credible delivery milestones.',
        'High leverage per dollar; evaluation plan is still thin.',
        'Clear beneficiary group; needs a security review before funding.'
      ][i % 5],
      tags: i < 3 ? ['AI conviction'] : i % 4 === 0 ? ['Human-backed'] : i % 5 === 0 ? ['Undervalued'] : []
    };
  });
  // Normalise exactly to 100.0% for display.
  let running = 0;
  proposals.forEach((p, i) => {
    if (i < proposals.length - 1) {
      p.prob = Math.round(p.prob * 1000) / 1000;
      running += p.prob;
    } else {
      p.prob = Math.round((1 - running) * 1000) / 1000;
    }
  });
  SEER.proposals = proposals;

  /* ---------- Futarchy proposal ---------- */
  const futarchy = {
    id: 'AIP-42',
    dao: 'Aurora Collective',
    title: 'Fund Open Grants Round 7 with 2,000,000 USDC over 24 months',
    summary: 'A five-member council would run three open funding rounds per year, publish a public scoring rubric, and hold 20% of the budget for retroactive public-goods funding. The council can be removed by a simple DAO vote after twelve months.',
    decisionDate: '2026-10-28',
    closes: '2026-10-27',
    metric: 'Treasury value in 90 days',
    passPrice: 0.62,
    failPrice: 0.38,
    passLiquidity: 1240000,
    failLiquidity: 860000,
    passTraders: 842,
    failTraders: 611,
    gap: 5.2,
    gapPct: 13.1,
    metrics: {
      treasury: {
        label: 'Treasury value',
        unit: '$M',
        pass: [41.2, 41.5, 41.9, 42.3, 42.6, 42.9, 43.2, 43.5, 43.8, 44.0, 44.2, 44.5, 44.8],
        reject: [41.2, 41.1, 40.9, 40.8, 40.6, 40.4, 40.2, 40.0, 39.9, 39.8, 39.7, 39.6, 39.6],
        yMin: 37,
        yMax: 47
      },
      tvl: {
        label: 'Protocol TVL',
        unit: '$M',
        pass: [128, 129, 130, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141],
        reject: [128, 127, 126, 125, 124, 123, 122, 121, 120, 120, 119, 119, 119],
        yMin: 112,
        yMax: 148
      },
      fees: {
        label: 'Annualised fees',
        unit: '$M',
        pass: [1.9, 1.94, 1.98, 2.02, 2.06, 2.1, 2.14, 2.18, 2.21, 2.24, 2.27, 2.3, 2.4],
        reject: [1.9, 1.88, 1.86, 1.83, 1.8, 1.77, 1.74, 1.71, 1.68, 1.66, 1.64, 1.62, 1.6],
        yMin: 1.4,
        yMax: 2.6
      }
    },
    xLabels: ['17 Oct', '24 Oct', '31 Oct', '7 Nov', '14 Nov', '21 Nov', '28 Nov', '5 Dec', '12 Dec', '19 Dec', '26 Dec', '2 Jan', '16 Jan']
  };
  SEER.futarchy = futarchy;

  /* ---------- Opportunity: one multi-scalar market, prices sum to 1 ---------- */
  const pickedProposals = proposals.slice(0, 14);
  const pickedMax = Math.max(...pickedProposals.map((p) => p.prob));
  const pickedSum = pickedProposals.reduce((a, p) => a + p.prob, 0);
  const submissionRows = pickedProposals.map((p) => {
    const pct = (p.prob / pickedSum) * 100;
    const score = Number((2.2 + (p.prob / pickedMax) * 2.5).toFixed(1));
    return [p.title, p.team, p.category, pct, score, p.volume, p.traders];
  });
  const reviewers = ['M. Okafor', 'R. Singh', 'J. Alvarez'];
  const submissions = submissionRows.map((r, i) => {
    const [title, team, category, pct, score, volume, traders] = r;
    return {
      id: 's' + String(i + 1).padStart(2, '0'),
      rank: i + 1,
      title, team, category,
      price: pct / 100,
      pct,
      reviewerScore: score,
      reviewerNotes: [
        'Clear public beneficiary; scope is fundable in one cycle.',
        'Strong team, but the evaluation plan needs a named partner.',
        'High leverage if the data is released under an open licence.',
        'Useful infrastructure; budget is modest for the ambition.',
        'Good local partnerships; delivery risk is the main concern.'
      ][i % 5],
      volume,
      traders,
      change: Number((((i * 9) % 21) / 10 - 0.8).toFixed(1)),
      history: makeHistory(pct / 100, i + 5, 24, 0.035)
    };
  });
  SEER.opportunity = {
    title: 'Open Grants Round 7',
    question: 'Which 14 of the 30 Round 7 proposals will be funded?',
    closes: '2026-11-08',
    volume: pickedProposals.reduce((a, p) => a + p.volume, 0),
    traders: pickedProposals.reduce((a, p) => a + p.traders, 0),
    liquidity: 760000,
    submissions
  };
  SEER.reviewers = reviewers;

  /* ---------- Risk: 14 protocols × 4 risk types × 3 horizons ---------- */
  const riskTypes = [
    { id: 'exploit', label: 'Smart contract exploit', short: 'Exploit' },
    { id: 'depeg', label: 'Stablecoin depeg', short: 'Depeg' },
    { id: 'governance', label: 'Governance attack', short: 'Governance' },
    { id: 'oracle', label: 'Oracle failure', short: 'Oracle' }
  ];
  const protocolRows = [
    ['Aurelia', 'Lending', 'Ethereum', 12400000000, [1.6, 0.3, 2.2, 0.8]],
    ['Morrow', 'Lending', 'Ethereum', 4100000000, [2.1, 0.2, 1.6, 1.1]],
    ['Elysian', 'Synthetic', 'Ethereum', 5800000000, [2.8, 4.6, 1.2, 1.9]],
    ['Pallas', 'Yield', 'Ethereum', 3600000000, [3.4, 0.4, 1.8, 2.3]],
    ['Umbra', 'DEX', 'Ethereum', 4900000000, [1.9, 0.1, 3.8, 0.7]],
    ['Lodestar', 'LST', 'Ethereum', 17200000000, [1.2, 1.4, 4.6, 0.5]],
    ['Rookery', 'LST', 'Ethereum', 2100000000, [2.6, 0.8, 3.1, 0.9]],
    ['Sable', 'CDP', 'Ethereum', 7100000000, [1.8, 2.9, 5.4, 1.4]],
    ['Coil', 'DEX', 'Ethereum', 2400000000, [3.9, 3.6, 2.8, 2.2]],
    ['Brine', 'DEX', 'Ethereum', 980000000, [4.2, 0.6, 2.4, 1.7]],
    ['Gale', 'Perps', 'Avalon', 620000000, [5.1, 0.3, 1.9, 4.8]],
    ['Helix', 'Perps', 'Hyperion', 3900000000, [3.2, 1.1, 2.6, 3.9]],
    ['Sparrow', 'Lending', 'Ethereum', 2800000000, [2.3, 2.2, 3.4, 1.2]],
    ['Eidolon', 'Restaking', 'Ethereum', 8600000000, [4.6, 0.5, 4.1, 2.8]]
  ];
  const horizonMult = { 30: 1, 90: 1.92, 365: 4.65 };
  const riskProtocols = protocolRows.map((r, i) => {
    const [name, category, chain, tvl, bases] = r;
    const values = {};
    riskTypes.forEach((t, j) => {
      values[t.id] = {};
      [30, 90, 365].forEach((h) => {
        const drift = 1 + ((i * 7 + j * 5) % 9 - 4) / 100;
        const v = clamp(bases[j] * horizonMult[h] * drift, 0.05, 38);
        values[t.id][h] = Number(v.toFixed(1));
      });
    });
    return {
      id: 'r' + (i + 1),
      name, category, chain, tvl,
      values,
      range: 0.5 + (i % 4) * 0.25,
      liquidity: Math.round(120000 + tvl * 0.0008),
      traders: 180 + ((i * 37) % 420),
      trend: Number((((i * 11) % 17) / 10 - 0.8).toFixed(1)),
      history: makeHistory(0.18 + (i % 6) * 0.025, i + 2, 24, 0.03).map((p) => ({ date: p.date, value: Number((p.value * 100).toFixed(1)) }))
    };
  });
  SEER.risk = { types: riskTypes, protocols: riskProtocols, horizons: [30, 90, 365] };

  /* ---------- Home stack ---------- */
  SEER.home = {
    stack: [
      { id: 'app', name: 'App', tag: 'Explorer', desc: 'Every market in one index. The surface people use to find a question, read its price, and take a position.' },
      { id: 'deep', name: 'Deep', tag: 'Many outcomes', desc: 'Fields of possible futures: grants, proposals and agent forecasts, priced as one many-outcome market.' },
      { id: 'futarchy', name: 'Futarchy', tag: 'Conditional', desc: 'Twin markets forecast a success metric if a proposal passes or fails. The gap informs the DAO.' },
      { id: 'opportunity', name: 'Opportunity', tag: 'Selection', desc: 'Submissions become outcomes. Prices sum to one and show where attention is concentrating.' },
      { id: 'risk', name: 'Risk', tag: 'Comparison', desc: 'Protocol risk in comparable units, across types and horizons, instead of a single yes/no price.' }
    ],
    primitives: [
      { name: 'AMM trading', desc: 'Outcome shares trade through Swapr liquidity. Tickets show price impact and slippage, never bids and asks.' },
      { name: 'Conditional Token Framework', desc: 'Pass and fail branches are separate conditional tokens, so a proposal can be priced against its counterfactual.' },
      { name: 'Reality.eth + Kleros', desc: 'Resolution starts with Reality.eth and escalates to Kleros as a backstop when a result is disputed.' },
      { name: 'Yield-bearing collateral', desc: 'Collateral can keep earning while it backs a position, so capital is not idle between trades.' }
    ],
    activity: [3.2, 3.5, 3.1, 3.8, 4.0, 3.7, 4.4, 4.2, 4.8, 5.1, 4.7, 5.4],
    activityLabels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
  };

  /* ---------- Shell injection ---------- */
  function brandMarkup() {
    return '<span class="brand-lockup" aria-hidden="true"></span>';
  }

  function navMarkup(page) {
    return products.map((p) => '<a href="' + p.href + '"' + (p.id === page ? ' aria-current="page"' : '') + '>' + p.label + '</a>').join('');
  }

  function buildShell() {
    const page = document.body.dataset.page || 'home';
    const header = document.getElementById('site-header');
    if (header) {
      header.innerHTML = '<a class="skip-link" href="#main">Skip to content</a>' +
        '<header class="topbar">' +
        '<div class="wrap topbar-inner">' +
        '<a class="brand" href="../home/index.html" aria-label="Seer home">' + brandMarkup() + '</a>' +
        '<nav class="nav-products" aria-label="Seer products">' + navMarkup(page) + '</nav>' +
        '<div class="top-actions">' +
        '<a class="top-search" href="../app/index.html" aria-label="Search all markets"><span aria-hidden="true">' + icons.search + '</span><span>Search markets</span><kbd>/</kbd></a>' +
        '<button class="btn-icon theme-toggle" type="button" aria-label="Switch to light mode" title="Switch theme">' + icons.sun + icons.moon + '</button>' +
        '<a class="btn btn-sm" href="../app/index.html">' + 'Launch app' + icons.arrow + '</a>' +
        '</div></div>' +
        '<div class="mobile-nav"><nav class="nav-rail" aria-label="Seer products, mobile">' + navMarkup(page) + '</nav></div>' +
        '</header>';
    }

    const footer = document.getElementById('site-footer');
    if (footer) {
      footer.innerHTML = '<footer class="footer"><div class="wrap">' +
        '<div class="footer-main">' +
        '<div class="footer-brand"><a class="brand" href="../home/index.html" aria-label="Seer home">' + brandMarkup() + '</a>' +
        '<p>Information Finance for decisions. Markets on Ethereum and Gnosis Chain, resolved through Reality.eth with Kleros as backstop.</p>' +
        '<p class="micro" class="micro footer-note" style="margin-top:1rem">Illustrative data · independent interface study</p></div>' +
        '<div><h3>Products</h3><div class="footer-links">' + products.map((p) => '<a href="' + p.href + '">' + p.label + '</a>').join('') + '</div></div>' +
        '<div><h3>Protocol</h3><div class="footer-links"><a href="#about">About Seer</a><a href="../home/index.html#protocol">Foundation</a><a href="../home/index.html#how">How a market works</a><a href="../app/index.html">Market explorer</a><a href="https://www.figma.com/design/cB6ZFMUkBwMBhHadLdiSmh/Seer-Branding?node-id=118-16652&amp;t=QMoBypRjlqvktMPr-1" target="_blank" rel="noopener noreferrer">Brand kit <span aria-hidden="true">↗</span></a></div></div>' +
        '<div><h3>Surfaces</h3><div class="footer-links"><a href="../deep/index.html">Deep fields</a><a href="../futarchy/index.html">Futarchy</a><a href="../opportunity/index.html">Opportunity</a><a href="../risk/index.html">Risk matrix</a></div></div>' +
        '</div>' +
        '<div class="footer-bottom"><p>© 2026 Seer interface study. Not financial advice.</p><span class="footer-status"><span class="dot"></span>Ethereum · Gnosis Chain · 17 Oct 2026</span></div>' +
        '</div></footer>';
    }

    const toggle = $('.theme-toggle');
    if (toggle) {
      const sync = () => {
        const light = document.documentElement.dataset.theme === 'light';
        toggle.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
        toggle.setAttribute('aria-pressed', light ? 'true' : 'false');
      };
      sync();
      toggle.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        document.documentElement.dataset.theme = next;
        try { localStorage.setItem('seer-theme', next); } catch (e) { /* ignore */ }
        sync();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !document.activeElement.isContentEditable) {
        e.preventDefault();
        if (document.body.dataset.page === 'app') {
          const input = document.getElementById('market-search');
          if (input) { input.focus(); return; }
        }
        window.location.href = '../app/index.html?focus=search';
      }
    });
  }

  /* ---------- Tooltip ---------- */
  let tip = null;
  function showTip(html, x, y) {
    if (!tip) {
      tip = document.createElement('div');
      tip.className = 'chart-tooltip';
      document.body.appendChild(tip);
    }
    tip.innerHTML = html;
    tip.classList.add('is-on');
    const w = tip.offsetWidth || 160;
    const left = clamp(x, w / 2 + 8, window.innerWidth - w / 2 - 8);
    tip.style.left = left + 'px';
    tip.style.top = (y - 10) + 'px';
  }
  function hideTip() {
    if (tip) tip.classList.remove('is-on');
  }
  SEER.showTip = showTip;
  SEER.hideTip = hideTip;

  /* ---------- SVG chart helpers ---------- */
  function smoothPath(points) {
    if (!points.length) return '';
    if (points.length === 1) return 'M' + points[0][0] + ',' + points[0][1];
    let d = 'M' + points[0][0].toFixed(2) + ',' + points[0][1].toFixed(2);
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
      const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
      const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
      const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += 'C' + cp1x.toFixed(2) + ',' + cp1y.toFixed(2) + ' ' + cp2x.toFixed(2) + ',' + cp2y.toFixed(2) + ' ' + p2[0].toFixed(2) + ',' + p2[1].toFixed(2);
    }
    return d;
  }

  function niceMax(v) {
    if (v <= 0) return 1;
    const exp = Math.pow(10, Math.floor(Math.log10(v)));
    const f = v / exp;
    const nf = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
    return nf * exp;
  }

  function lineChart(host, cfg) {
    if (!host) return null;
    if (host._seerChartRO) { host._seerChartRO.disconnect(); host._seerChartRO = null; }
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const remScale = rem / 16;
    const hcs = getComputedStyle(host);
    const hostW = Math.max(300, Math.round((host.getBoundingClientRect().width || host.clientWidth || 800) - (parseFloat(hcs.paddingLeft) || 0) - (parseFloat(hcs.paddingRight) || 0)));
    const W = hostW;
    const H = Math.round((cfg.height || 270) * remScale);
    const m = { l: (W < 420 ? 38 : 44) * remScale, r: 14 * remScale, t: 16 * remScale, b: 30 * remScale };
    const innerW = W - m.l - m.r;
    const innerH = H - m.t - m.b;
    const series = cfg.series || [];
    const n = Math.max(...series.map((s) => s.values.length));
    const labels = cfg.labels || (series[0] && series[0].values.map((v) => v.date)) || [];
    const yMin = cfg.yMin != null ? cfg.yMin : Math.min(...series.flatMap((s) => s.values.map((v) => Array.isArray(v) ? v[1] : v)));
    const yMax = cfg.yMax != null ? cfg.yMax : Math.max(...series.flatMap((s) => s.values.map((v) => Array.isArray(v) ? v[1] : v)));
    const padY = (yMax - yMin) * 0.14 || 1;
    const lo = cfg.yMin != null ? yMin : Math.max(0, yMin - padY);
    const hi = cfg.yMax != null ? yMax : yMax + padY;
    const x = (i) => m.l + (n <= 1 ? innerW / 2 : (i / (n - 1)) * innerW);
    const y = (v) => m.t + innerH - ((v - lo) / (hi - lo)) * innerH;
    const yFmt = cfg.yFormat || ((v) => (Math.abs(v) >= 1000 ? fmt.compact(v) : Number(v).toFixed(v < 10 ? 1 : 0)));
    const xFmt = cfg.xFormat || ((i) => labels[i] || '');

    const gid = 'g' + Math.random().toString(36).slice(2, 8);
    let svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(cfg.label || 'Line chart') + '" tabindex="0" data-chart="line">';
    svg += '<defs><linearGradient id="' + gid + '" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="var(--chart-1)" stop-opacity=".26"/><stop offset="1" stop-color="var(--chart-1)" stop-opacity="0"/></linearGradient></defs>';

    const yTicks = cfg.yTicks || 4;
    for (let i = 0; i <= yTicks; i++) {
      const v = lo + ((hi - lo) * i) / yTicks;
      const yy = y(v);
      svg += '<line class="grid-line" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + yy.toFixed(1) + '" y2="' + yy.toFixed(1) + '"/>';
      svg += '<text x="' + (m.l - 8) + '" y="' + (yy + 3.2).toFixed(1) + '" text-anchor="end">' + esc(yFmt(v)) + '</text>';
    }

    const xTicks = cfg.xTicks || Math.min(5, n);
    const seen = new Set();
    for (let i = 0; i < xTicks; i++) {
      const idx = Math.round((i / (xTicks - 1 || 1)) * (n - 1));
      if (seen.has(idx)) continue;
      seen.add(idx);
      const xx = x(idx);
      svg += '<line class="axis-line" x1="' + xx.toFixed(1) + '" x2="' + xx.toFixed(1) + '" y1="' + m.t + '" y2="' + (H - m.b) + '"/>';
      svg += '<text x="' + xx.toFixed(1) + '" y="' + (H - 9) + '" text-anchor="middle">' + esc(xFmt(idx)) + '</text>';
    }

    // Optional volume bars behind the line.
    if (cfg.volume && cfg.volume.length) {
      const maxV = Math.max(...cfg.volume) || 1;
      const bw = Math.max(1, (innerW / Math.max(1, n)) * 0.55);
      cfg.volume.forEach((v, i) => {
        const bh = Math.max(1, (v / maxV) * innerH * 0.18);
        const bx = x(i) - bw / 2;
        svg += '<rect class="volume-bar" x="' + bx.toFixed(1) + '" y="' + (H - m.b - bh).toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="1"/>';
      });
    }

    // Optional gap band between first two series.
    if (cfg.band && series.length >= 2) {
      const top = series[0].values.map((v, i) => [x(i), y(v)]);
      const bottom = series[1].values.slice().reverse().map((v, j) => [x(series[1].values.length - 1 - j), y(v)]);
      const d = 'M' + top.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('L') + 'L' + bottom.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('L') + 'Z';
      svg += '<path d="' + d + '" fill="' + (cfg.band.fill || 'var(--primary)') + '" opacity="' + (cfg.band.opacity == null ? '.10' : cfg.band.opacity) + '"/>';
    }

    series.forEach((s, si) => {
      const pts = s.values.map((v, i) => [x(i), y(v)]);
      if (s.area) {
        const d = smoothPath(pts) + 'L' + x(n - 1) + ',' + (H - m.b) + 'L' + x(0) + ',' + (H - m.b) + 'Z';
        svg += '<path d="' + d + '" fill="url(#' + gid + ')" opacity=".9"/>';
      }
      const cls = 'series-line' + (si === 1 ? ' secondary' : si === 2 ? ' tertiary' : '');
      svg += '<path class="' + cls + '" d="' + smoothPath(pts) + '" style="' + (s.color ? 'stroke:' + s.color : '') + '"' + (s.dashed ? ' stroke-dasharray="4 5"' : '') + '/>';
    });

    svg += '<g class="cursor" style="display:none"><line class="cursor-line" y1="' + m.t + '" y2="' + (H - m.b) + '"/></g>';
    svg += '<g class="active-points">' + series.map((s, i) => '<circle r="3.5" fill="var(--card)" stroke="' + (s.color || 'var(--chart-' + (i + 1) + ')') + '" stroke-width="1.5" style="display:none"/>').join('') + '</g>';
    svg += '<rect x="' + m.l + '" y="' + m.t + '" width="' + innerW + '" height="' + innerH + '" fill="transparent" class="hit"/>';
    svg += '</svg>';

    host.innerHTML = '<div class="chart"><div class="chart-head">' +
      (cfg.title ? '<div><div class="micro chart-title">' + esc(cfg.title) + '</div>' + (cfg.subtitle ? '<div class="small">' + esc(cfg.subtitle) + '</div>' : '') + '</div>' : '<span></span>') +
      '<div class="legend">' + series.map((s, i) => '<span class="legend-item"><i class="' + (s.dashed ? 'dash' : '') + '" style="' + (s.color ? 'background:' + s.color : '') + '"></i>' + esc(s.name) + '</span>').join('') + '</div></div>' + svg +
      (cfg.caption ? '<div class="chart-caption"><span>' + esc(cfg.caption) + '</span><span>' + esc(cfg.unit || '') + '</span></div>' : '') + '</div>';

    const chart = host.querySelector('.chart');
    const svgEl = chart.querySelector('svg');
    const cursor = svgEl.querySelector('.cursor');
    const cursorLine = cursor.querySelector('line');
    const active = Array.from(svgEl.querySelectorAll('.active-points circle'));
    let current = -1;

    function setIndex(idx, ev) {
      if (idx < 0 || idx >= n) return;
      current = idx;
      const xx = x(idx);
      cursor.style.display = '';
      cursorLine.setAttribute('x1', xx);
      cursorLine.setAttribute('x2', xx);
      active.forEach((c, si) => {
        c.style.display = '';
        c.setAttribute('cx', xx);
        c.setAttribute('cy', y(series[si].values[idx]));
      });
      let rows = series.map((s, si) => '<div class="tt-row"><span><i style="background:' + (s.color || 'var(--chart-' + (si + 1) + ')') + '"></i>' + esc(s.name) + '</span><b>' + esc(yFmt(s.values[idx])) + '</b></div>').join('');
      if (cfg.band && series.length >= 2) {
        const diff = series[0].values[idx] - series[1].values[idx];
        const gapFmt = cfg.band.format ? cfg.band.format(diff) : (diff >= 0 ? '+' : '') + diff.toFixed(1);
        rows += '<div class="tt-row tt-gap"><span>' + esc(cfg.band.label || 'Gap') + '</span><b>' + esc(gapFmt) + '</b></div>';
      }
      showTip('<div class="tt-date">' + esc(xFmt(idx)) + '</div>' + rows, ev ? ev.clientX : 0, ev ? ev.clientY : 0);
    }

    svgEl.addEventListener('pointermove', (ev) => {
      const r = svgEl.getBoundingClientRect();
      const rx = ((ev.clientX - r.left) / r.width) * W;
      const idx = clamp(Math.round(((rx - m.l) / innerW) * (n - 1)), 0, n - 1);
      setIndex(idx, ev);
    });
    svgEl.addEventListener('pointerleave', () => {
      cursor.style.display = 'none';
      active.forEach((c) => (c.style.display = 'none'));
      hideTip();
    });
    svgEl.addEventListener('keydown', (ev) => {
      if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
        ev.preventDefault();
        const start = current < 0 ? n - 1 : current;
        const idx = clamp(start + (ev.key === 'ArrowRight' ? 1 : -1), 0, n - 1);
        const r = svgEl.getBoundingClientRect();
        setIndex(idx, { clientX: r.left + (x(idx) / W) * r.width, clientY: r.top + 28 });
      } else if (ev.key === 'Home' || ev.key === 'End') {
        ev.preventDefault();
        setIndex(ev.key === 'Home' ? 0 : n - 1, null);
      } else if (ev.key === 'Escape') {
        cursor.style.display = 'none';
        active.forEach((c) => (c.style.display = 'none'));
        hideTip();
      }
    });
    svgEl.addEventListener('blur', () => { cursor.style.display = 'none'; active.forEach((c) => (c.style.display = 'none')); hideTip(); });

    // Accessible table.
    const table = '<table class="sr-only"><caption>' + esc(cfg.label || 'Chart data') + '</caption><thead><tr><th scope="col">Period</th>' +
      series.map((s) => '<th scope="col">' + esc(s.name) + '</th>').join('') + '</tr></thead><tbody>' +
      labels.map((lab, i) => '<tr><th scope="row">' + esc(lab) + '</th>' + series.map((s) => '<td>' + esc(yFmt(s.values[i])) + '</td>').join('') + '</tr>').join('') + '</tbody></table>';
    chart.insertAdjacentHTML('beforeend', '<div class="sr-only">' + table + '</div>');
    if (window.ResizeObserver) {
      let lastW = host.clientWidth;
      const ro = new ResizeObserver(() => {
        const nextW = host.clientWidth;
        if (Math.abs(nextW - lastW) > 2) {
          lastW = nextW;
          lineChart(host, cfg);
        }
      });
      ro.observe(host);
      host._seerChartRO = ro;
    }
    return { setIndex, svgEl };
  }

  function sparkline(host, values, opts = {}) {
    if (!host) return;
    const w = opts.width || 120;
    const h = opts.height || 30;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    const pts = values.map((v, i) => [(i / (values.length - 1)) * (w - 2) + 1, h - 2 - ((v - min) / span) * (h - 4)]);
    const d = smoothPath(pts);
    const last = pts[pts.length - 1];
    const color = opts.color || 'var(--chart-1)';
    host.innerHTML = '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" aria-hidden="true" focusable="false"><path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="1.4" vector-effect="non-scaling-stroke" opacity=".9"/><circle cx="' + last[0] + '" cy="' + last[1] + '" r="1.8" fill="' + color + '"/></svg>';
  }

  function barChart(host, cfg) {
    if (!host) return;
    const items = cfg.items || [];
    const W = 800;
    const rowH = cfg.rowH || 30;
    const left = cfg.labelWidth || 190;
    const right = 54;
    const H = Math.max(90, items.length * rowH + 28);
    const max = cfg.max || Math.max(...items.map((i) => i.value)) * 1.12;
    let svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(cfg.label || 'Bar chart') + '" tabindex="0">';
    for (let g = 0; g <= 2; g++) {
      const xx = left + ((W - left - right) * g) / 2;
      svg += '<line class="grid-line" x1="' + xx + '" x2="' + xx + '" y1="8" y2="' + (H - 20) + '"/>';
      svg += '<text x="' + xx + '" y="' + (H - 6) + '" text-anchor="middle">' + esc(fmt.compact((max * g) / 2)) + '</text>';
    }
    items.forEach((it, i) => {
      const yy = 10 + i * rowH;
      const bw = ((W - left - right) * it.value) / max;
      const color = it.color || 'var(--chart-1)';
      svg += '<text class="bar-label" x="' + (left - 9) + '" y="' + (yy + 13) + '" text-anchor="end" fill="var(--text-2)">' + esc(it.label) + '</text>';
      svg += '<rect x="' + left + '" y="' + (yy + 4) + '" width="' + (W - left - right) + '" height="8" rx="2" fill="var(--track)"/>';
      svg += '<rect x="' + left + '" y="' + (yy + 4) + '" width="' + Math.max(1, bw) + '" height="8" rx="2" fill="' + color + '"/>';
      svg += '<text x="' + (W - right + 4) + '" y="' + (yy + 12) + '" fill="var(--text)">' + esc(cfg.format ? cfg.format(it.value) : fmt.pct(it.value)) + '</text>';
    });
    svg += '</svg>';
    host.innerHTML = '<div class="chart">' + svg + '</div>';
  }

  /* ---------- Trade ticket ---------- */
  function tradeTicket(host, cfg) {
    if (!host) return null;
    const outcomes = cfg.outcomes || [{ id: 'yes', label: 'Yes', price: cfg.price || .5 }, { id: 'no', label: 'No', price: 1 - (cfg.price || .5) }];
    const multi = outcomes.length > 2;
    const depth = cfg.depth || 1000000;
    const currency = cfg.currency || 'USDC';
    let outcomeId = cfg.initialOutcome || outcomes[0].id || outcomes[0].label;
    let side = cfg.initialSide || 'yes';
    let amount = cfg.initialAmount || 0;

    function outcome() {
      return outcomes.find((o) => (o.id || o.label) === outcomeId) || outcomes[0];
    }
    function price() {
      const o = outcome();
      if (!multi && side === 'no') return 1 - o.price;
      return o.price;
    }
    function state() {
      const p = price();
      const impactPct = amount > 0 ? (amount / (depth + amount)) * 100 : 0;
      const avg = amount > 0 ? clamp(p * (1 + impactPct / 200), 0.001, 0.999) : p;
      const shares = amount > 0 ? amount / avg : 0;
      const displayOutcome = (!multi && side === 'no') ? { label: 'No', price: 1 - outcome().price } : outcome();
      return { amount, price: p, avgPrice: avg, impactPct, shares, payout: shares, profit: shares - amount, outcome: displayOutcome, side, multi };
    }

    function markup() {
      const o = outcome();
      return '<section class="trade" aria-label="Trade ticket">' +
        '<div class="trade-head"><div><div class="h4">' + esc(cfg.title || 'Trade ticket') + '</div><div class="micro" style="margin-top:3px">' + esc(cfg.subtitle || 'AMM · Swapr') + '</div></div><span class="tag">' + (multi ? 'Multi-outcome' : 'Binary') + '</span></div>' +
        '<div class="trade-body">' +
        (multi ? '<label class="stack-8"><span class="micro">Outcome</span><select class="select" data-outcome>' + outcomes.map((x) => '<option value="' + esc(x.id || x.label) + '"' + ((x.id || x.label) === outcomeId ? ' selected' : '') + '>' + esc(x.label) + ' · ' + fmt.pct(x.price) + '</option>').join('') + '</select></label>' :
          '<div class="trade-side" role="group" aria-label="Side"><button type="button" data-side="yes" aria-pressed="' + (side === 'yes') + '">Yes · ' + fmt.pct(o.price) + '</button><button type="button" data-side="no" aria-pressed="' + (side === 'no') + '">No · ' + fmt.pct(1 - o.price) + '</button></div>') +
        '<label class="trade-amount"><span class="currency">$</span><input data-amount inputmode="decimal" autocomplete="off" placeholder="0.00" value="' + (amount ? amount : '') + '" aria-label="Amount in ' + currency + '"><span class="micro">' + currency + '</span></label>' +
        '<div class="trade-quick">' + [1, 5, 20, 100].map((n) => { const v = n * (cfg.quickScale || 100); return '<button type="button" data-quick="' + v + '">+$' + fmt.num(v) + '</button>'; }).join('') + '</div>' +
        '<div class="trade-rows" aria-live="polite">' +
        '<div class="trade-row"><span>Price</span><b data-price>' + fmt.pct(price()) + '</b></div>' +
        '<div class="trade-row"><span>Avg. price after impact</span><b data-avg>' + fmt.pct(price()) + '</b></div>' +
        '<div class="trade-row"><span>Price impact</span><b data-impact>' + (amount ? '0.00%' : '—') + '</b></div>' +
        '<div class="trade-impact"><span data-impact-bar></span></div>' +
        '<div class="trade-row"><span>Slippage tolerance</span><b>' + (cfg.slippage || '0.50') + '%</b></div>' +
        '<div class="trade-row"><span>Protocol fee</span><b>0.10%</b></div>' +
        '<div class="trade-row"><span>Est. shares</span><b data-shares>—</b></div>' +
        '<div class="trade-row"><span>Max payout</span><b data-payout>—</b></div>' +
        '</div>' +
        '<button class="btn trade-cta" type="button" data-confirm' + (amount <= 0 ? ' aria-disabled="true" title="Enter an amount"' : '') + '>Review trade</button>' +
        '<p class="trade-note">' + esc(cfg.note || 'Shares pay $1 if the outcome resolves true. Prices update with pool depth; this is a preview, not a promise of fill.') + '</p>' +
        '</div></section>';
    }

    function paint() {
      const s = state();
      host.innerHTML = markup();
      host.querySelectorAll('[data-side]').forEach((b) => b.addEventListener('click', () => { side = b.dataset.side; paint(); }));
      const sel = host.querySelector('[data-outcome]');
      if (sel) sel.addEventListener('change', () => { outcomeId = sel.value; paint(); });
      const input = host.querySelector('[data-amount]');
      input.addEventListener('input', () => {
        amount = clamp(Number(String(input.value).replace(/[^0-9.]/g, '')) || 0, 0, 10000000);
        const s2 = state();
        const q = (sel2) => host.querySelector(sel2);
        q('[data-price]').textContent = fmt.pct(s2.price);
        q('[data-avg]').textContent = amount ? fmt.pct(s2.avgPrice) : fmt.pct(s2.price);
        q('[data-impact]').textContent = amount ? s2.impactPct.toFixed(2) + '%' : '—';
        q('[data-impact-bar]').style.width = amount ? clamp(s2.impactPct * 6, 2, 100) + '%' : '0%';
        q('[data-shares]').textContent = amount ? fmt.num(s2.shares, 2) : '—';
        q('[data-payout]').textContent = amount ? '$' + fmt.num(s2.payout, 2) : '—';
        const cta = q('[data-confirm]');
        if (amount > 0) { cta.removeAttribute('aria-disabled'); cta.removeAttribute('title'); }
        else { cta.setAttribute('aria-disabled', 'true'); cta.setAttribute('title', 'Enter an amount'); }
        if (cfg.onChange) cfg.onChange(s2);
      });
      host.querySelectorAll('[data-quick]').forEach((b) => b.addEventListener('click', () => {
        amount = clamp(amount + Number(b.dataset.quick), 0, 10000000);
        const input2 = host.querySelector('[data-amount]');
        input2.value = amount;
        input2.dispatchEvent(new Event('input', { bubbles: true }));
      }));
      const confirm = host.querySelector('[data-confirm]');
      confirm.addEventListener('click', () => {
        const s3 = state();
        if (s3.amount <= 0) return;
        confirm.textContent = 'Confirm ' + fmt.usd(s3.amount, 0) + ' →';
        toast('Trade preview confirmed', fmt.usd(s3.amount, 0) + ' of ' + s3.outcome.label + ' at ' + fmt.pct(s3.avgPrice) + '. Illustrative only.');
        if (cfg.onConfirm) cfg.onConfirm(s3);
        setTimeout(() => { if (confirm.isConnected) confirm.textContent = 'Review trade'; }, 1600);
      });
      if (cfg.onChange) cfg.onChange(state());
    }

    paint();
    return { getState: state, setOutcome: (id) => { outcomeId = id; paint(); } };
  }

  /* ---------- Toast ---------- */
  function toast(title, body) {
    let region = $('.toast-region');
    if (!region) {
      region = document.createElement('div');
      region.className = 'toast-region';
      region.setAttribute('aria-live', 'polite');
      document.body.appendChild(region);
    }
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<span class="tag tag-violet" style="flex:none">✓</span><div><b>' + esc(title) + '</b><span>' + esc(body || '') + '</span></div>';
    region.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(.375rem)'; setTimeout(() => el.remove(), 300); }, 3800);
  }
  SEER.toast = toast;

  /* ---------- Reveal ---------- */
  function initReveal() {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Skeletons ---------- */
  function skeletonCards(host, count) {
    if (!host) return;
    host.innerHTML = Array.from({ length: count }).map(() => '<div class="skeleton skeleton-card"></div>').join('');
  }
  SEER.skeletonCards = skeletonCards;

  /* ---------- Status helpers ---------- */
  function statusLabel(status) {
    return { open: 'Open', closing: 'Closing soon', resolving: 'Resolving', resolved: 'Resolved' }[status] || 'Open';
  }
  function statusMarkup(status) {
    const cls = status === 'closing' ? 'is-closing' : status === 'resolved' ? 'is-resolved' : status === 'resolving' ? 'is-resolving' : 'is-open';
    return '<span class="status ' + cls + '"><span class="dot"></span>' + statusLabel(status) + '</span>';
  }
  SEER.statusLabel = statusLabel;
  SEER.statusMarkup = statusMarkup;


  /* ---------- Information Finance: shared content ---------- */
  const askers = {
    aurora: { name: 'Aurora Collective grants council', role: 'Funding decision', decision: 'Which Round 7 proposals to review and fund.' },
    cedar: { name: 'Cedar treasury committee', role: 'Treasury decision', decision: 'Whether to approve the 24-month Round 7 budget.' },
    athena: { name: 'Athena-7, an AI agent acting for Aurora', role: 'Agent review', decision: 'Which proposals deserve human attention first.' },
    risk: { name: 'A protocol risk team', role: 'Exposure decision', decision: 'How much exposure to carry across DeFi assets.' },
    reviewer: { name: 'Round 7 reviewers', role: 'Selection decision', decision: 'Which submissions to read first and shortlist.' }
  };

  const briefs = {
    deep: {
      asker: 'Aurora Collective funding team, Round 7',
      question: 'What score will human evaluators give each of the 30 Round 7 proposals?',
      prices: 'The score human evaluators are expected to give each proposal. Only 6 of 30 are selected for human review; the market resolves to the actual scores of that sample.',
      use: 'Review the top 5 first, skim the next band, and give low-attention proposals a second look only if the price or the agent gap is surprising. The signal does not decide funding.',
      why: 'Distilled human judgment: humans evaluate a sample, markets estimate the evaluators, and the sample keeps review cost bounded.',
      funded: 'Aurora Collective · 120,000 USDC illustrative subsidy',
      resolution: 'Reality.eth · Kleros backstop',
      close: '2026-10-28',
      response: 'Balanced · more liquidity makes the price move more slowly and harder to push.',
      id: 'DEEP-R7', interface: 'Deep', outcomes: '30 proposals', price: 'Implied score, 0–5'
    },
    futarchy: {
      asker: 'Aurora Collective council',
      question: 'Should Open Grants Round 7 be funded with 2,000,000 USDC over 24 months?',
      prices: 'The pass and reject branches price the chosen metric in two universes. The gap is the market-implied effect of passing, not a vote.',
      use: 'Read the gap beside the vote timeline and the metric definition. The council votes on values; traders price beliefs. This council is advisory.',
      why: 'Futarchy separates values from beliefs: the council chooses the metric, the two branches price what happens if the proposal passes or fails.',
      funded: 'Aurora Collective · 2,000,000 USDC illustrative proposal',
      resolution: 'Reality.eth · Kleros backstop',
      close: '2026-10-27',
      response: 'Steady · deep liquidity makes the gap slower and harder to move.',
      id: 'AIP-42', interface: 'Futarchy', outcomes: 'Pass / reject', price: 'Treasury value in 90 days'
    },
    opportunity: {
      asker: 'Round 7 reviewers',
      question: 'Which 14 of the 30 Round 7 proposals will reviewers select?',
      prices: 'The probability that each submission is selected. Prices across the 14 outcomes sum to 100%; a high price means attention is concentrating, not that a proposal is approved.',
      use: 'Read the top of the allocation first, then the reviewer notes. Prices show where to look; reviewers keep the final selection.',
      why: 'Many proposals arrive, including AI-written ones. A single multi-outcome market surfaces the likely shortlist without replacing review.',
      funded: 'Aurora Collective · 240,000 USDC illustrative subsidy',
      resolution: 'Reality.eth · Kleros backstop',
      close: '2026-11-08',
      response: 'Balanced · more liquidity makes the price move more slowly and harder to push.',
      id: 'OPP-R7', interface: 'Opportunity', outcomes: '14 proposals', price: 'Selection probability'
    },
    risk: {
      asker: 'A treasury or protocol risk team',
      question: 'What is the market-implied probability of a defined loss event for each DeFi protocol?',
      prices: 'The probability of a defined loss event within the selected horizon, with an uncertainty band. It is a market estimate, not a rating or advice.',
      use: 'Compare protocols and horizons, then open one row for the underlying market, liquidity and derivation. The comparison informs exposure; it does not decide it.',
      why: 'Separate yes/no markets distort small probabilities because capital locking dominates the price. One multi-outcome market shares capital across protocols.',
      funded: 'Cedar treasury committee · 90,000 USDC illustrative subsidy',
      resolution: 'Reality.eth · Kleros backstop',
      close: '2026-11-18',
      response: 'Steady · deep liquidity makes the price slower and harder to push.',
      id: 'RISK-14', interface: 'Risk', outcomes: '14 protocols', price: 'Loss probability'
    }
  };
  SEER.briefs = briefs;
  SEER.askers = askers;

  function briefHTML(cfg, compact) {
    if (!cfg) return '';
    const meta = [
      ['Funded by', cfg.funded],
      ['Resolution', cfg.resolution],
      ['Closes', fmt.date(cfg.close) + ' · 21:00 UTC'],
      ['Responsiveness', cfg.response]
    ];
    return '<section class="if-brief" aria-label="Signal Brief">' +
      '<div class="if-brief-head"><div><span class="micro">Signal Brief · illustrative</span><h3>' + esc(cfg.interface || 'Market') + ' · ' + esc(cfg.id || '') + '</h3></div><span class="tag tag-violet">Ask view</span></div>' +
      '<div class="sb-body"><div class="sb-grid">' +
      '<div class="sb-row"><div class="sb-label">Asked by</div><div class="sb-value"><strong>' + esc(cfg.asker) + '</strong><br>' + esc(cfg.question) + '</div></div>' +
      '<div class="sb-row"><div class="sb-label">Prices</div><div class="sb-value">' + esc(cfg.prices) + '</div></div>' +
      '<div class="sb-row"><div class="sb-label">Use it to</div><div class="sb-value">' + esc(cfg.use) + '</div></div>' +
      '<div class="sb-row"><div class="sb-label">Why this design</div><div class="sb-value">' + esc(cfg.why) + '</div></div>' +
      '</div></div>' +
      '<div class="sb-meta">' + meta.map(([k, v]) => '<div><span class="micro">' + esc(k) + '</span><b>' + esc(v) + '</b></div>').join('') + '</div>' +
      (compact ? '<div class="sb-compact"><b>' + esc(cfg.asker) + '</b> asks: ' + esc(cfg.question) + '</div>' : '') +
      '</section>';
  }
  SEER.briefHTML = briefHTML;

  function forAgentsHTML(cfg) {
    const payload = {
      illustrative: true,
      id: cfg.id, question: cfg.question, interface: cfg.interface,
      outcomes: cfg.outcomes, price: cfg.price,
      resolution: cfg.resolution, close: cfg.close, responsiveness: cfg.response
    };
    return '<details class="for-agents"><summary>For agents · copyable market summary</summary><pre>' + esc(JSON.stringify(payload, null, 2)) + '</pre><button class="btn btn-sm copy-agent" type="button">Copy JSON</button></details>';
  }


  function pageExtra(page) {
    if (page === 'deep') return '<div class="if-guidance"><div class="if-note"><b>Funding team brief.</b> Review first: the top 5 by expected score. Skim: ranks 6–12. Low attention: the long tail, unless the agent forecast is far from the human one. Humans decide funding.<ul class="if-list"><li><b>01</b> Open-source MEV accounting · review first · clear public-goods case</li><li><b>07</b> Open evaluation datasets · skim · strong team, thin budget</li><li><b>28</b> Governance curriculum · low attention · price has not moved</li></ul></div><div class="if-note"><b>Agents and humans, separately.</b> Athena-7 forecasts 9.4% for proposal 01 against a human lane at 8.8%, a 0.6 point gap. Quill tracks 64% over 31 illustrative markets; humans are not blended into the agent number.<ul class="if-list"><li>Athena-7 · 31 markets · 64% hit rate</li><li>Quill · 27 markets · 61% hit rate</li><li>Human lane · 74 reviewers · not blended</li></ul></div></div><div class="if-guidance"><div class="if-note"><b>Micro-markets.</b> 6 of 30 proposals have under $1 of volume. Smallest $0.42, median $0.88. Cheap agent forecasts make these tiny markets worth running.</div><div class="if-note"><b>Combined forecast.</b> The sample forecast is a weighted view, not a vote. Responsiveness sets how fast the combination moves; more liquidity makes it slower and harder to push.</div></div>';
    if (page === 'futarchy') return '<div class="if-note"><b>Vote on values, bet on beliefs.</b> The council chose the metric (values). Traders bet on what happens (beliefs). The market does not choose the metric.</div><div class="if-topline" style="margin:.8rem 0 .4rem"><div class="at-switch" role="group" aria-label="Asset or metric"><button type="button" data-fut-mode="asset">Asset</button><button type="button" data-fut-mode="metric" aria-pressed="true">Metric</button></div><div class="at-switch" role="group" aria-label="Futarchy mode"><button type="button" data-fut-advisory="advisory" aria-pressed="true">Advisory</button><button type="button" data-fut-advisory="full">Full futarchy</button></div></div><div class="if-note" id="fut-mode-copy"><b>Metric · 90-day treasury value.</b> It measures what the council wants, resolves after the measurement date, and needs a trusted measurement. The fictional AUR asset is the alternative: always priced and easy to settle, but also moved by unrelated token flows.</div><div class="if-note" id="fut-advisory-copy"><b>Advisory.</b> The council votes; the market informs. Full futarchy would let the market decide. This council is advisory.</div>';
    if (page === 'opportunity') return '<div class="if-note"><b>Selection brief.</b> Many proposals arrive, including AI-written ones. Prices show where to look first; reviewers keep the final selection. <span class="tag">Standard market contract</span> No special contract is needed.</div><div class="if-guidance"><div class="if-note"><b>Notable move.</b> A submitter bought their own proposal up 4.2 points; counter-trades returned the price within 18 minutes. Time and size are illustrative.</div><div class="if-note"><b>For submitters.</b> A price is attention, not approval. It does not guarantee review, funding or a favourable decision. Self-buying is disclosed and can be counter-traded.</div></div>';
    if (page === 'risk') return '<div class="if-guidance"><div class="if-note"><b>Why one pool of capital.</b> Separate yes/no markets make a 1% “yes” mostly reflect the cost of locking capital. One multi-outcome market across protocols shares capital; if two fail, each pays half. Independence is a stated simplification.</div><div class="if-note"><b>How a price becomes a probability.</b> 1. Read the outcome price after AMM impact. 2. Compare it with the uncertainty band. 3. Use it as one input, not a rating. Automated quoting lets bots post from the same estimates.</div></div><div class="if-note"><b>Exposure checker.</b> Compare up to four protocols by amount. This is a comparison, not a combined probability and not a rating.<div class="exposure-grid"><label>Aurelia <input type="number" data-exp="Aurelia" value="10000" min="0" step="1000" aria-label="Aurelia exposure"></label><label>Morrow <input type="number" data-exp="Morrow" value="5000" min="0" step="1000" aria-label="Morrow exposure"></label><label>Elysian <input type="number" data-exp="Elysian" value="2500" min="0" step="1000" aria-label="Elysian exposure"></label><label>Pallas <input type="number" data-exp="Pallas" value="0" min="0" step="1000" aria-label="Pallas exposure"></label></div><div class="exposure-out" id="exposure-out">Enter amounts to compare weighted estimates.</div></div>';
    return '';
  }

  function setView(view, rerender) {
    const v = view === 'trade' ? 'trade' : 'ask';
    document.body.classList.toggle('view-ask', v === 'ask');
    document.body.classList.toggle('view-trade', v === 'trade');
    try { localStorage.setItem('seer-view-' + (document.body.dataset.page || 'home'), v); } catch (e) { /* ignore */ }
    $$('.at-switch button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.at === v)));
    if (rerender) rerender(v);
  }
  SEER.setView = setView;
  SEER.currentView = () => (document.body.classList.contains('view-trade') ? 'trade' : 'ask');

  function mountPageBrief(page, cfg) {
    if (!cfg || page === 'home') return;
    const main = document.getElementById('main');
    if (!main) return;
    const hero = main.querySelector('section');
    const anchor = hero ? hero.nextSibling : main.firstChild;
    const section = document.createElement('section');
    section.className = 'if-surface';
    section.innerHTML = '<div class="wrap"><div class="if-topline"><div><span class="micro">Information Finance · Ask first</span><h2>Who is asking, and what is this price for?</h2></div><div class="at-switch" role="group" aria-label="Ask or trade view"><button type="button" data-at="ask">Ask</button><button type="button" data-at="trade">Trade</button></div></div>' +
      briefHTML(cfg, true) + '<div class="if-ask-only">' + pageExtra(page) + '<div class="if-guidance"><div class="if-note"><b>How to read it.</b> The price is a market estimate, not a verdict. Start with who asked, then the question, then the confidence band.</div><div class="if-note"><b>Resolution trail.</b> ' + esc(cfg.resolution) + ' resolves against the named public source; disputes escalate to Kleros. Closes ' + esc(fmt.date(cfg.close)) + '.</div></div>' + forAgentsHTML(cfg) + '</div><div class="if-trade-slot" id="if-trade-slot"></div></div>';
    main.insertBefore(section, anchor || main.firstChild);
    section.querySelectorAll('[data-at]').forEach((b) => b.addEventListener('click', () => setView(b.dataset.at)));
    const copy = section.querySelector('.copy-agent');
    if (copy) copy.addEventListener('click', async () => {
      const text = section.querySelector('.for-agents pre').textContent;
      try { await navigator.clipboard.writeText(text); toast('Copied', 'Machine-readable market summary copied.'); } catch (e) { toast('Copy failed', 'Select the JSON and copy it manually.'); }
    });
    if (page === 'futarchy') {
      const copy = section.querySelector('#fut-mode-copy');
      section.querySelectorAll('[data-fut-mode]').forEach((b) => b.addEventListener('click', () => {
        section.querySelectorAll('[data-fut-mode]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        copy.innerHTML = b.dataset.futMode === 'asset' ? '<b>Asset · fictional AUR token.</b> It prices at 62¢ if passed and 38¢ if rejected, a 24 point gap. A price is always available and easy to settle, but unrelated token moves also move it.' : '<b>Metric · 90-day treasury value.</b> It measures what the council wants, resolves after the measurement date, and needs a trusted measurement. The fictional AUR asset is the alternative: always priced and easy to settle, but also moved by unrelated token flows.';
      }));
      const adv = section.querySelector('#fut-advisory-copy');
      section.querySelectorAll('[data-fut-advisory]').forEach((b) => b.addEventListener('click', () => {
        section.querySelectorAll('[data-fut-advisory]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        adv.innerHTML = b.dataset.futAdvisory === 'full' ? '<b>Full futarchy.</b> The market decides whether the proposal passes. That is a different governance choice, not the current council.' : '<b>Advisory.</b> The council votes; the market informs. Full futarchy would let the market decide. This council is advisory.';
      }));
    }
    const exp = section.querySelectorAll('[data-exp]');
    if (exp.length && SEER.risk) {
      const out = section.querySelector('#exposure-out');
      const paintExp = () => {
        let total = 0, weighted = 0; const parts = [];
        exp.forEach((input) => {
          const amount = Number(input.value) || 0;
          const p = SEER.risk.protocols.find((x) => x.name === input.dataset.exp);
          if (!p || !amount) return;
          const v = p.values.exploit[90];
          total += amount; weighted += amount * v; parts.push(p.name + ' ' + v.toFixed(1) + '%');
        });
        if (!total) { out.textContent = 'Enter amounts to compare weighted estimates.'; return; }
        out.innerHTML = 'Weighted comparison: <b>' + (weighted / total).toFixed(2) + '%</b> implied exploit estimate across ' + fmt.usd(total, 0) + ' exposure.<br><span class="micro">' + parts.join(' · ') + ' · 90-day horizon · illustrative, not a combined probability.</span>';
      };
      exp.forEach((i) => i.addEventListener('input', paintExp));
      paintExp();
    }
    const tradeSlot = section.querySelector('#if-trade-slot');
    if (tradeSlot) {
      tradeSlot.classList.add('if-trade-only');
      let tr = null;
      if (page === 'risk' && SEER.risk) {
        const p0 = SEER.risk.protocols[0];
        tr = { outcomes: [{ id: 'yes', label: 'Yes · defined loss event', price: p0.values.exploit[90] / 100 }, { id: 'no', label: 'No', price: 1 - p0.values.exploit[90] / 100 }], depth: p0.liquidity, price: p0.values.exploit[90] / 100 };
        const ticket = document.createElement('div'); ticket.id = 'risk-ticket'; tradeSlot.appendChild(ticket);
        tradeTicket(ticket, { title: 'Price a risk estimate', subtitle: 'Aurelia · 90-day exploit · illustrative', outcomes: tr.outcomes, depth: tr.depth, note: 'A preview quote against a shared risk pool. Not a rating or advice.' });
      } else if (page === 'futarchy') {
        tr = { outcomes: [{ id: 'pass', label: 'Pass universe', price: SEER.futarchy.passPrice }, { id: 'fail', label: 'Reject universe', price: SEER.futarchy.failPrice }], depth: SEER.futarchy.passLiquidity, price: SEER.futarchy.passPrice };
      } else if (page === 'opportunity') {
        tr = { outcomes: SEER.opportunity.submissions.slice(0, 4).map((x) => ({ id: x.id, label: x.title, price: x.price })), depth: SEER.opportunity.liquidity, price: SEER.opportunity.submissions[0].price };
      } else if (page === 'deep') {
        tr = { outcomes: [{ id: 'review', label: 'Selected for review', price: SEER.proposals[0].prob }, { id: 'tail', label: 'Long tail', price: 1 - SEER.proposals[0].prob }], depth: 420000, price: SEER.proposals[0].prob };
      }
      if (tr) { const desk = document.createElement('div'); tradeSlot.appendChild(desk); agentDesk(desk, { outcomes: tr.outcomes, depth: tr.depth, price: tr.price }); }
    }
    setView(SEER.currentView());
    return section;
  }
  SEER.mountPageBrief = mountPageBrief;


  /* ---------- Agent desk (browser simulation, no funds) ---------- */
  function agentDesk(host, cfg) {
    if (!host) return;
    const outcomes = cfg.outcomes || [{ id: 'yes', label: 'Yes', price: cfg.price || .5 }];
    let outcome = outcomes[0];
    let belief = Math.round((outcome.price + .08) * 100);
    let confidence = 'medium';
    let budget = 250;
    let maxImpact = 2;
    let style = 'balanced';
    let timer = null, running = false, paused = false;
    let spent = 0, shares = 0, avgSum = 0, fills = 0;
    const slices = () => style === 'patient' ? 10 : style === 'fast' ? 4 : 6;
    const quote = (amount, price, depth) => {
      const impact = amount / (depth + amount);
      return { avg: clamp(price * (1 + impact / 2), .001, .999), impact: impact * 100 };
    };
    const plan = () => {
      const n = slices();
      const per = budget / n;
      const rows = [];
      let p = outcome.price;
      for (let i = 0; i < n; i++) {
        const q = quote(per, p, cfg.depth || 500000);
        rows.push({ i: i + 1, size: per, price: q.avg, impact: q.impact });
        p = clamp(p + q.impact / 100 * .45, .01, .99);
      }
      return rows;
    };
    function shell() {
      host.innerHTML = '<section class="agent-desk" aria-label="Agent trading simulation"><div class="agent-desk-head"><span class="micro">Agent desk · illustrative</span><h3>Let an agent trade this for me</h3><p class="agent-safety">Simulation. No funds move. A real agent would need your wallet and explicit approval for every limit.</p></div>' +
        '<div class="agent-body">' +
        '<div class="agent-field"><label for="ad-outcome">Outcome</label><select id="ad-outcome">' + outcomes.map((o) => '<option value="' + esc(o.id || o.label) + '"' + (o === outcome ? ' selected' : '') + '>' + esc(o.label) + ' · ' + fmt.pct(o.price) + '</option>').join('') + '</select></div>' +
        '<div class="agent-field"><label for="ad-belief">Your belief · <b id="ad-belief-v">' + belief + '%</b></label><input id="ad-belief" type="range" min="1" max="99" value="' + belief + '"></div>' +
        '<div class="agent-field"><label for="ad-confidence">Confidence</label><select id="ad-confidence"><option value="low">Low</option><option value="medium" selected>Medium</option><option value="high">High</option></select></div>' +
        '<div class="agent-field"><label for="ad-budget">Budget · USDC</label><input id="ad-budget" type="number" min="10" max="10000" step="10" value="' + budget + '"></div>' +
        '<div class="agent-field"><label for="ad-impact">Maximum price impact · %</label><input id="ad-impact" type="number" min="0.1" max="20" step="0.1" value="' + maxImpact + '"></div>' +
        '<div class="agent-field"><label for="ad-style">Style</label><select id="ad-style"><option value="patient">Patient · many small slices</option><option value="balanced" selected>Balanced</option><option value="fast">Fast · fewer slices</option></select></div>' +
        '<div class="agent-plan" id="ad-plan"></div>' +
        '<div class="agent-actions"><button class="btn btn-sm" type="button" id="ad-start">Start simulation</button><button class="btn btn-sm btn-ghost" type="button" id="ad-pause" hidden>Pause</button><button class="btn btn-sm btn-ghost" type="button" id="ad-stop" hidden>Stop</button></div>' +
        '<div class="agent-summary" id="ad-summary"></div>' +
        '<div class="agent-log" id="ad-log" aria-live="polite"></div>' +
        '</div></section>';
      paintPlan();
      host.querySelector('#ad-outcome').addEventListener('change', (e) => { outcome = outcomes.find((o) => (o.id || o.label) === e.target.value) || outcomes[0]; belief = Math.round((outcome.price + .08) * 100); host.querySelector('#ad-belief').value = belief; host.querySelector('#ad-belief-v').textContent = belief + '%'; paintPlan(); });
      host.querySelector('#ad-belief').addEventListener('input', (e) => { belief = Number(e.target.value); host.querySelector('#ad-belief-v').textContent = belief + '%'; paintPlan(); });
      host.querySelector('#ad-confidence').addEventListener('change', (e) => { confidence = e.target.value; paintPlan(); });
      host.querySelector('#ad-budget').addEventListener('input', (e) => { budget = clamp(Number(e.target.value) || 0, 10, 10000); paintPlan(); });
      host.querySelector('#ad-impact').addEventListener('input', (e) => { maxImpact = clamp(Number(e.target.value) || .1, .1, 20); paintPlan(); });
      host.querySelector('#ad-style').addEventListener('change', (e) => { style = e.target.value; paintPlan(); });
      host.querySelector('#ad-start').addEventListener('click', start);
      host.querySelector('#ad-pause').addEventListener('click', () => { paused = !paused; host.querySelector('#ad-pause').textContent = paused ? 'Resume' : 'Pause'; if (!paused) tick(); });
      host.querySelector('#ad-stop').addEventListener('click', stop);
    }
    function paintPlan() {
      const rows = plan();
      const total = rows.reduce((a, r) => a + r.size, 0);
      const avg = rows.reduce((a, r) => a + r.price * r.size, 0) / total;
      const max = Math.max(...rows.map((r) => r.impact));
      host.querySelector('#ad-plan').innerHTML = '<div class="micro">Plan before anything runs</div><table><thead><tr><th>Slice</th><th>Size</th><th>Expected price</th><th>Impact</th></tr></thead><tbody>' + rows.map((r) => '<tr><td>' + r.i + '</td><td>' + fmt.usd(r.size, 0) + '</td><td>' + fmt.pct(r.price) + '</td><td>' + r.impact.toFixed(2) + '%</td></tr>').join('') + '</tbody></table><p class="micro" style="margin:.55rem 0 0">Expected average ' + fmt.pct(avg) + ' · ' + rows.length + ' slices · stops above ' + maxImpact + '% impact per slice.</p><p class="micro" style="margin:.35rem 0 0">Buy below ' + fmt.pct(Math.max(0, belief / 100 - (confidence === 'high' ? .02 : confidence === 'low' ? .06 : .04))) + '. Sell above ' + fmt.pct(Math.min(1, belief / 100 + (confidence === 'high' ? .02 : confidence === 'low' ? .06 : .04))) + '. Will not exceed the budget, will not buy above your maximum impact, stops when the market closes or resolves.</p>';
      if (max > maxImpact) host.querySelector('#ad-plan').insertAdjacentHTML('beforeend', '<p class="agent-safety">Some planned slices exceed your impact limit. The simulation skips them.</p>');
    }
    function addLog(action, size, price, pos) {
      const log = host.querySelector('#ad-log');
      const el = document.createElement('div');
      el.innerHTML = '<span>' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + '</span><span>' + action + '</span><span>' + fmt.usd(size, 0) + ' @ ' + fmt.pct(price) + '</span><span>' + fmt.num(pos, 2) + ' sh</span>';
      log.prepend(el);
    }
    function start() {
      if (running && !paused) return;
      if (!running) { spent = 0; shares = 0; avgSum = 0; fills = 0; running = true; paused = false; host.querySelector('#ad-log').innerHTML = ''; host.querySelector('#ad-start').hidden = true; host.querySelector('#ad-pause').hidden = false; host.querySelector('#ad-stop').hidden = false; }
      tick();
    }
    function tick() {
      if (!running || paused) return;
      const rows = plan();
      const idx = fills;
      if (idx >= rows.length) return finish();
      const r = rows[idx];
      const margin = confidence === 'high' ? .02 : confidence === 'low' ? .06 : .04;
      if (outcome.price > Math.min(.99, belief / 100 + margin) && shares > 0) {
        const sellShares = Math.min(shares, r.size / outcome.price);
        shares -= sellShares; spent -= sellShares * outcome.price; avgSum -= outcome.price * sellShares; fills++;
        addLog('Sell', sellShares * outcome.price, outcome.price, shares);
        host.querySelector('#ad-summary').innerHTML = 'Running · sold into strength · position <b>' + fmt.num(shares, 2) + '</b> shares.';
        timer = setTimeout(tick, 220); return;
      }
      if (r.impact > maxImpact) { fills++; addLog('Skip', r.size, r.price, shares); timer = setTimeout(tick, 160); return; }
      if (outcome.price > belief / 100 - margin) { fills++; addLog('Skip', r.size, outcome.price, shares); timer = setTimeout(tick, 160); return; }
      const q = quote(r.size, outcome.price, cfg.depth || 500000);
      const fill = r.size / q.avg;
      spent += r.size; shares += fill; avgSum += q.avg * fill; fills++;
      addLog('Buy', r.size, q.avg, shares);
      outcome.price = clamp(outcome.price + q.impact / 100 * .55, .01, .99);
      host.querySelector('#ad-summary').innerHTML = 'Running · spent <b>' + fmt.usd(spent, 0) + '</b> · position <b>' + fmt.num(shares, 2) + '</b> shares · average <b>' + fmt.pct(avgSum / shares) + '</b>';
      timer = setTimeout(tick, 260);
    }
    function finish() {
      running = false;
      host.querySelector('#ad-start').hidden = false;
      host.querySelector('#ad-start').textContent = 'Run again';
      host.querySelector('#ad-pause').hidden = true;
      host.querySelector('#ad-stop').hidden = true;
      const value = shares * outcome.price;
      host.querySelector('#ad-summary').innerHTML = 'Complete · spent <b>' + fmt.usd(spent, 0) + '</b> · average <b>' + fmt.pct(avgSum / Math.max(shares, 1)) + '</b> · position <b>' + fmt.num(shares, 2) + '</b> shares · worth <b>' + fmt.usd(value, 0) + '</b> at the current price.';
      toast('Simulation complete', 'No funds moved. The plan used the same quote function as the ticket.');
    }
    function stop() {
      running = false; paused = false;
      if (timer) clearTimeout(timer);
      host.querySelector('#ad-start').hidden = false;
      host.querySelector('#ad-start').textContent = 'Run again';
      host.querySelector('#ad-pause').hidden = true;
      host.querySelector('#ad-stop').hidden = true;
      host.querySelector('#ad-summary').innerHTML = 'Stopped · spent <b>' + fmt.usd(spent, 0) + '</b> · position <b>' + fmt.num(shares, 2) + '</b> shares.';
    }
    shell();
  }
  SEER.agentDesk = agentDesk;

  /* ---------- Boot ---------- */
  function boot() {
    buildShell();
    initReveal();
    let savedView = 'ask';
    try { const v = localStorage.getItem('seer-view-' + (document.body.dataset.page || 'home')); if (v === 'trade' || v === 'ask') savedView = v; } catch (e) { /* ignore */ }
    document.body.classList.toggle('view-ask', savedView === 'ask');
    document.body.classList.toggle('view-trade', savedView === 'trade');
    const page = document.body.dataset.page;
    if (briefs[page]) mountPageBrief(page, briefs[page]);
    // Re-init when the document is fully parsed.
    setTimeout(initReveal, 50);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  SEER.charts = { line: lineChart, bar: barChart, sparkline, smoothPath };
  SEER.tradeTicket = tradeTicket;
  SEER.esc = esc;
  SEER.clamp = clamp;
  SEER.dateOffset = dateOffset;
})();
