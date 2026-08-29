'use client'

import { useMemo, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  ChevronRight,
  Home,
  LineChart,
  Menu,
  Plus,
  Search,
  Star,
  WalletCards,
  X,
} from 'lucide-react'

const stocks = [
  { symbol: 'AAPL', name: 'Apple', price: 226.96, change: 1.84, color: '#d9a441', owned: '4.2 shares' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 127.25, change: 3.21, color: '#75b843', owned: '2.5 shares' },
  { symbol: 'TSLA', name: 'Tesla', price: 248.98, change: -0.74, color: '#e65151', owned: '1.1 shares' },
  { symbol: 'AMZN', name: 'Amazon', price: 186.49, change: 1.12, color: '#e08c42', owned: '3.0 shares' },
  { symbol: 'MSFT', name: 'Microsoft', price: 416.72, change: 0.48, color: '#4f93d1', owned: '1.8 shares' },
  { symbol: 'META', name: 'Meta Platforms', price: 567.36, change: 2.08, color: '#648bd5', owned: '0.7 shares' },
]

const ranges = ['1D', '1W', '1M', '3M', '1Y', 'ALL']

function Chart({ change }: { change: number }) {
  const points = useMemo(() => {
    const base = [42, 49, 46, 54, 47, 60, 56, 64, 58, 66, 61, 73, 69, 77, 72, 84, 78, 88, 82, 91, 86, 95, 92, 104, 99, 111, 105, 118, 113, 124, 119, 133, 127, 139, 136, 148, 143, 158, 152, 166, 160, 176, 169, 184, 178, 195, 188, 204]
    return change < 0 ? base.map((point, i) => point - i * 3.8) : base
  }, [change])
  const polyline = points.map((y, i) => `${(i / (points.length - 1)) * 100},${y}`).join(' ')
  const area = `0,220 ${polyline} 100,220`
  const tone = change < 0 ? 'var(--loss)' : 'var(--gain)'
  return (
    <div className="chart-wrap" aria-label="Performance chart">
      <svg viewBox="0 0 100 220" preserveAspectRatio="none" className="chart-svg" role="img">
        <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={tone} stopOpacity=".22" /><stop offset="1" stopColor={tone} stopOpacity="0" /></linearGradient></defs>
        <polygon points={area} fill="url(#area)" />
        <polyline points={polyline} fill="none" stroke={tone} strokeWidth="2.3" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="chart-y"><span>$235</span><span>$220</span><span>$205</span><span>$190</span></div>
    </div>
  )
}

export default function StocksApp() {
  const [selected, setSelected] = useState(stocks[0])
  const [range, setRange] = useState('1D')
  const [query, setQuery] = useState('')
  const [watchlist, setWatchlist] = useState(['AAPL', 'NVDA'])
  const [notice, setNotice] = useState('')
  const [tab, setTab] = useState('Home')
  const filtered = stocks.filter((stock) => `${stock.symbol} ${stock.name}`.toLowerCase().includes(query.toLowerCase()))

  const action = (label: string) => {
    setNotice(`${label} order ready for ${selected.symbol}`)
    window.setTimeout(() => setNotice(''), 2600)
  }

  return (
    <main className="broker-shell">
      <header className="topbar">
        <div className="brand-mark">arc</div>
        <div className="header-actions"><button className="icon-button" aria-label="Search"><Search size={20} /></button><button className="icon-button" aria-label="Notifications"><Bell size={20} /><i /></button><button className="avatar" aria-label="Profile">JD</button></div>
      </header>

      <div className="content">
        <section className="portfolio-head">
          <p className="eyebrow">Portfolio</p>
          <div className="portfolio-value">$24,891.36</div>
          <div className="gain"><ArrowUpRight size={16} /> $386.21 (1.58%) <span>Today</span></div>
        </section>

        <section className="market-card">
          <div className="market-card-head"><div><span className="eyebrow">{selected.symbol}</span><h1>{selected.name}</h1></div><button className={`star-button ${watchlist.includes(selected.symbol) ? 'is-favorite' : ''}`} aria-label="Toggle watchlist" onClick={() => setWatchlist((items) => items.includes(selected.symbol) ? items.filter((item) => item !== selected.symbol) : [...items, selected.symbol])}><Star size={21} fill="currentColor" /></button></div>
          <div className="stock-price">${selected.price.toFixed(2)}</div>
          <div className={selected.change < 0 ? 'loss' : 'gain'}>{selected.change < 0 ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />} {selected.change > 0 ? '+' : ''}{selected.change.toFixed(2)}% <span>Today</span></div>
          <Chart change={selected.change} />
          <div className="range-tabs" role="tablist">{ranges.map((item) => <button key={item} className={range === item ? 'active' : ''} onClick={() => setRange(item)} role="tab" aria-selected={range === item}>{item}</button>)}</div>
        </section>

        <section className="quick-actions"><button onClick={() => action('Buy')}><Plus size={18} /> Buy</button><button onClick={() => action('Sell')}><ArrowDownRight size={18} /> Sell</button></section>
        <section className="watch-section"><div className="section-title"><h2>Watchlist</h2><span>{watchlist.length} stocks</span></div><div className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stocks" aria-label="Search stocks" />{query && <button aria-label="Clear search" onClick={() => setQuery('')}><X size={16} /></button>}</div><div className="stock-list">{filtered.map((stock) => <button className={`stock-row ${selected.symbol === stock.symbol ? 'selected' : ''}`} key={stock.symbol} onClick={() => setSelected(stock)}><span className="stock-badge" style={{ background: stock.color }}>{stock.symbol.slice(0, 1)}</span><span className="stock-name"><strong>{stock.symbol}</strong><small>{stock.name}</small></span><span className="stock-quote"><strong>${stock.price.toFixed(2)}</strong><small className={stock.change < 0 ? 'loss' : 'gain'}>{stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%</small></span><ChevronRight size={17} className="row-arrow" /></button>)}</div></section>
        <section className="buying-power"><div><span className="eyebrow">Buying power</span><strong>$3,240.18</strong></div><WalletCards size={24} /><ChevronRight size={18} /></section>
      </div>

      <nav className="bottom-nav" aria-label="Primary navigation">{[[Home, 'Home'], [LineChart, 'Markets'], [Star, 'Watchlist'], [Menu, 'Menu']].map(([Icon, label]) => <button key={label as string} className={tab === label ? 'active' : ''} onClick={() => setTab(label as string)}><Icon size={21} fill={tab === label && label === 'Watchlist' ? 'currentColor' : 'none'} /><span>{label as string}</span></button>)}</nav>
      {notice && <div className="toast" role="status">{notice}</div>}
    </main>
  )
}
