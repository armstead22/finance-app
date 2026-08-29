'use client'

import { useMemo, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Bell, BookOpen, ChevronRight, Home, LineChart, Menu, Plus, Search, Star, WalletCards, X } from 'lucide-react'

const stocks = [
  { symbol: 'AAPL', name: 'Apple', price: 226.96, change: 1.84, color: '#d9a441' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 127.25, change: 3.21, color: '#75b843' },
  { symbol: 'TSLA', name: 'Tesla', price: 248.98, change: -0.74, color: '#e65151' },
  { symbol: 'AMZN', name: 'Amazon', price: 186.49, change: 1.12, color: '#e08c42' },
  { symbol: 'MSFT', name: 'Microsoft', price: 416.72, change: 0.48, color: '#4f93d1' },
  { symbol: 'META', name: 'Meta Platforms', price: 567.36, change: 2.08, color: '#648bd5' },
]
const crypto = [
  { symbol: 'BTC', name: 'Bitcoin', price: 109842.12, change: 2.84, color: '#e09b36' },
  { symbol: 'ETH', name: 'Ethereum', price: 3968.44, change: 1.73, color: '#8b8fd8' },
  { symbol: 'SOL', name: 'Solana', price: 184.26, change: -1.12, color: '#8b69cf' },
]
const contracts = [{ strike: 220, call: '8.40', put: '1.28', volume: '12.4K', iv: '28.7%' }, { strike: 225, call: '5.65', put: '2.44', volume: '8.1K', iv: '26.9%' }, { strike: 230, call: '3.18', put: '4.82', volume: '18.9K', iv: '25.4%' }, { strike: 235, call: '1.54', put: '8.12', volume: '5.7K', iv: '24.8%' }]
const knowledge = [{ title: 'What is a put option?', body: 'A put gives the buyer the right, but not the obligation, to sell an underlying asset at a chosen strike price before expiration.' }, { title: 'Greeks: Delta', body: 'Delta estimates how much an option price may change when the underlying moves by one dollar. It is not a guarantee.' }, { title: 'Know the risks', body: 'Options can expire worthless, and selling options can create significant or unlimited loss. Review the full contract before trading.' }]
const ranges = ['1D', '1W', '1M', '3M', '1Y', 'ALL']

function Chart({ change }: { change: number }) {
  const points = useMemo(() => { const base = [42,49,46,54,47,60,56,64,58,66,61,73,69,77,72,84,78,88,82,91,86,95,92,104,99,111,105,118,113,124,119,133,127,139,136,148,143,158,152,166,160,176,169,184,178,195,188,204]; return change < 0 ? base.map((p, i) => p - i * 3.8) : base }, [change])
  const polyline = points.map((y, i) => `${(i / (points.length - 1)) * 100},${y}`).join(' ')
  const tone = change < 0 ? 'var(--loss)' : 'var(--gain)'
  return <div className="chart-wrap"><svg viewBox="0 0 100 220" preserveAspectRatio="none" className="chart-svg" role="img" aria-label="Performance chart"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={tone} stopOpacity=".22" /><stop offset="1" stopColor={tone} stopOpacity="0" /></linearGradient></defs><polygon points={`0,220 ${polyline} 100,220`} fill="url(#area)" /><polyline points={polyline} fill="none" stroke={tone} strokeWidth="2.3" vectorEffect="non-scaling-stroke" /></svg><div className="chart-y"><span>$235</span><span>$220</span><span>$205</span><span>$190</span></div></div>
}

export default function StocksApp() {
  const [selected, setSelected] = useState(stocks[0]); const [range, setRange] = useState('1D'); const [query, setQuery] = useState(''); const [watchlist, setWatchlist] = useState(['AAPL', 'NVDA']); const [notice, setNotice] = useState(''); const [tab, setTab] = useState('Home'); const [asset, setAsset] = useState('Stocks'); const [optionSide, setOptionSide] = useState('Calls'); const [article, setArticle] = useState(0)
  const list = asset === 'Crypto' ? crypto : stocks
  const filtered = list.filter((item) => `${item.symbol} ${item.name}`.toLowerCase().includes(query.toLowerCase()))
  const current = asset === 'Crypto' ? crypto[0] : selected
  const action = (label: string) => { setNotice(`${label} order ready for ${current.symbol}`); window.setTimeout(() => setNotice(''), 2600) }
  return <main className="broker-shell">
    <header className="topbar"><div className="brand-mark">Signal</div><div className="header-actions"><button className="icon-button" aria-label="Search"><Search size={20} /></button><button className="icon-button" aria-label="Notifications"><Bell size={20} /><i /></button><button className="avatar" aria-label="Profile">JD</button></div></header>
    <div className="content">
      <div className="asset-tabs" role="tablist">{['Stocks', 'Options', 'Crypto'].map((name) => <button key={name} className={asset === name ? 'active' : ''} onClick={() => setAsset(name)} role="tab" aria-selected={asset === name}>{name}</button>)}</div>
      {asset === 'Options' ? <>
        <section className="portfolio-head"><p className="eyebrow">Options chain</p><div className="portfolio-value">AAPL <span className="muted">Jun 20, 2027</span></div><div className="gain">$226.96 <span>Underlying price</span></div></section>
        <section className="market-card options-card"><div className="market-card-head"><div><span className="eyebrow">AAPL options</span><h1>Calls & puts</h1></div><BookOpen size={22} className="muted" /></div><div className="segmented"><button className={optionSide === 'Calls' ? 'active' : ''} onClick={() => setOptionSide('Calls')}>Calls</button><button className={optionSide === 'Puts' ? 'active' : ''} onClick={() => setOptionSide('Puts')}>Puts</button></div><div className="chain-head"><span>Strike</span><span>{optionSide === 'Calls' ? 'Call last' : 'Put last'}</span><span>Volume / IV</span></div>{contracts.map((row) => <button className="chain-row" key={row.strike} onClick={() => action(`${optionSide} ${row.strike}`)}><strong>${row.strike}</strong><span>${optionSide === 'Calls' ? row.call : row.put}</span><small>{row.volume}<br />{row.iv}</small><ChevronRight size={16} /></button>)}<p className="disclaimer">Quotes are delayed demo data. Options involve risk and are not suitable for all investors.</p></section>
        <section className="education"><div className="section-title"><h2>Learn options</h2><span>{article + 1} of {knowledge.length}</span></div><button className="knowledge-card" onClick={() => setArticle((article + 1) % knowledge.length)}><span className="knowledge-icon"><BookOpen size={20} /></span><span><strong>{knowledge[article].title}</strong><small>{knowledge[article].body}</small></span><ChevronRight size={18} /></button></section>
      </> : <>
        <section className="portfolio-head"><p className="eyebrow">{asset === 'Crypto' ? 'Crypto portfolio' : 'Portfolio'}</p><div className="portfolio-value">$24,891.36</div><div className="gain"><ArrowUpRight size={16} /> $386.21 (1.58%) <span>Today</span></div></section>
        <section className="market-card"><div className="market-card-head"><div><span className="eyebrow">{current.symbol}</span><h1>{current.name}</h1></div><button className={`star-button ${watchlist.includes(current.symbol) ? 'is-favorite' : ''}`} aria-label="Toggle watchlist" onClick={() => setWatchlist((items) => items.includes(current.symbol) ? items.filter((item) => item !== current.symbol) : [...items, current.symbol])}><Star size={21} fill="currentColor" /></button></div><div className="stock-price">${current.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div><div className={current.change < 0 ? 'loss' : 'gain'}>{current.change < 0 ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />} {current.change > 0 ? '+' : ''}{current.change.toFixed(2)}% <span>Today</span></div><Chart change={current.change} /><div className="range-tabs" role="tablist">{ranges.map((item) => <button key={item} className={range === item ? 'active' : ''} onClick={() => setRange(item)}>{item}</button>)}</div></section><section className="quick-actions"><button onClick={() => action('Buy')}><Plus size={18} /> Buy</button><button onClick={() => action('Sell')}><ArrowDownRight size={18} /> Sell</button></section><section className="watch-section"><div className="section-title"><h2>{asset === 'Crypto' ? 'Crypto watchlist' : 'Watchlist'}</h2><span>{filtered.length} assets</span></div><div className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${asset.toLowerCase()}`} aria-label={`Search ${asset.toLowerCase()}`} />{query && <button aria-label="Clear search" onClick={() => setQuery('')}><X size={16} /></button>}</div><div className="stock-list">{filtered.map((item) => <button className={`stock-row ${current.symbol === item.symbol ? 'selected' : ''}`} key={item.symbol} onClick={() => setSelected(item as typeof stocks[number])}><span className="stock-badge" style={{ background: item.color }}>{item.symbol.slice(0, 1)}</span><span className="stock-name"><strong>{item.symbol}</strong><small>{item.name}</small></span><span className="stock-quote"><strong>${item.price.toLocaleString()}</strong><small className={item.change < 0 ? 'loss' : 'gain'}>{item.change > 0 ? '+' : ''}{item.change.toFixed(2)}%</small></span><ChevronRight size={17} className="row-arrow" /></button>)}</div></section><section className="buying-power"><div><span className="eyebrow">Buying power</span><strong>$3,240.18</strong></div><WalletCards size={24} /><ChevronRight size={18} /></section></>}
    </div><nav className="bottom-nav" aria-label="Primary navigation">{[[Home, 'Home'], [LineChart, 'Markets'], [Star, 'Watchlist'], [Menu, 'Menu']].map(([Icon, label]) => <button key={label as string} className={tab === label ? 'active' : ''} onClick={() => setTab(label as string)}><Icon size={21} /><span>{label as string}</span></button>)}</nav>{notice && <div className="toast" role="status">{notice}</div>}
  </main>
}
