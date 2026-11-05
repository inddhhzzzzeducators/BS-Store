import { useMemo, useState } from 'react'

const products = [
  {id:1,name:'Premium Basmati Rice',brand:'BS Select',category:'Staples',unit:'5 kg',retail:449,wholesale:415,tag:'Bestseller',emoji:'🍚'},
  {id:2,name:'Whole Wheat Atta',brand:'Daily Essentials',category:'Staples',unit:'10 kg',retail:389,wholesale:355,tag:'Value pack',emoji:'🌾'},
  {id:3,name:'Toor Dal',brand:'Kitchen Gold',category:'Staples',unit:'1 kg',retail:168,wholesale:151,tag:'Popular',emoji:'🫘'},
  {id:4,name:'Refined Sunflower Oil',brand:'PureDrop',category:'Staples',unit:'1 L',retail:142,wholesale:132,tag:'',emoji:'🫗'},
  {id:5,name:' iodized Table Salt'.replace(' iodized','Iodized'),brand:'Daily Essentials',category:'Staples',unit:'1 kg',retail:24,wholesale:20,tag:'',emoji:'🧂'},
  {id:6,name:'Masala Potato Chips',brand:'Crunch Time',category:'Snacks',unit:'Pack of 10',retail:100,wholesale:82,tag:'Combo',emoji:'🥔'},
  {id:7,name:'Assorted Biscuits',brand:'Tea Time',category:'Snacks',unit:'Family pack',retail:95,wholesale:79,tag:'',emoji:'🍪'},
  {id:8,name:'Instant Noodles',brand:'QuickBite',category:'Snacks',unit:'Pack of 12',retail:168,wholesale:144,tag:'Popular',emoji:'🍜'},
  {id:9,name:'Premium Tea',brand:'Morning Leaf',category:'Beverages',unit:'500 g',retail:245,wholesale:218,tag:'',emoji:'🍵'},
  {id:10,name:'Mango Fruit Drink',brand:'Juicy',category:'Beverages',unit:'Pack of 6',retail:120,wholesale:99,tag:'',emoji:'🧃'},
  {id:11,name:'Almonds',brand:'NutriBasket',category:'Dry Fruits',unit:'500 g',retail:425,wholesale:390,tag:'Premium',emoji:'🥜'},
  {id:12,name:'Cashew Nuts',brand:'NutriBasket',category:'Dry Fruits',unit:'500 g',retail:475,wholesale:438,tag:'Premium',emoji:'🌰'},
  {id:13,name:'Bathing Soap',brand:'FreshFeel',category:'Personal Care',unit:'Pack of 4',retail:150,wholesale:126,tag:'',emoji:'🧼'},
  {id:14,name:'Daily Care Shampoo',brand:'FreshFeel',category:'Personal Care',unit:'瓶 650 ml'.replace('瓶 ',' '),retail:299,wholesale:270,tag:'',emoji:'🧴'},
  {id:15,name:'Laundry Detergent',brand:'BrightWash',category:'Household',unit:'2 kg',retail:235,wholesale:208,tag:'Value pack',emoji:'🫧'},
  {id:16,name:'Dishwash Liquid',brand:'Sparkle',category:'Household',unit:'500 ml',retail:110,wholesale:94,tag:'',emoji:'🧽'},
  {id:17,name:'Pasta',brand:'QuickBite',category:'Staples',unit:'500 g',retail:68,wholesale:56,tag:'',emoji:'🍝'},
  {id:18,name:'Pet Food',brand:'Paw Pantry',category:'Pet Supplies',unit:'1 kg',retail:210,wholesale:188,tag:'',emoji:'🐾'}
]
const categories = ['All','Staples','Snacks','Beverages','Dry Fruits','Personal Care','Household','Pet Supplies']
const money = n => '₹' + n.toLocaleString('en-IN')

export default function App() {
  const [mode,setMode] = useState('retail')
  const [category,setCategory] = useState('All')
  const [search,setSearch] = useState('')
  const [sort,setSort] = useState('featured')
  const [cart,setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bs-cart') || '{}') } catch { return {} }
  })
  const [cartOpen,setCartOpen] = useState(false)
  const [dialog,setDialog] = useState('')
  const [notice,setNotice] = useState('')

  const price = p => mode === 'retail' ? p.retail : p.wholesale
  const visible = useMemo(() => {
    let list = products.filter(p => (category === 'All' || p.category === category) && (p.name+' '+p.brand+' '+p.category).toLowerCase().includes(search.toLowerCase()))
    if(sort === 'low') list = [...list].sort((a,b)=>price(a)-price(b))
    if(sort === 'high') list = [...list].sort((a,b)=>price(b)-price(a))
    return list
  },[category,search,sort,mode])
  const cartItems = products.filter(p => cart[p.id])
  const count = cartItems.reduce((n,p)=>n+cart[p.id],0)
  const total = cartItems.reduce((n,p)=>n+price(p)*cart[p.id],0)

  function updateCart(id,delta) {
    setCart(old => {
      const next = {...old}
      next[id] = Math.max(0,(next[id]||0)+delta)
      if(!next[id]) delete next[id]
      localStorage.setItem('bs-cart',JSON.stringify(next))
      return next
    })
  }
  function add(p) {
    updateCart(p.id,1)
    setNotice(p.name+' added to cart')
    setTimeout(()=>setNotice(''),1800)
  }

  return <div className="app">
    <div className="top-strip">BANSAL STORE <span>•</span> Retail & Wholesale Grocery Marketplace <span className="top-right">Serving everyday essentials with care</span></div>
    <header className="header">
      <a className="brand" href="#"><span className="brand-mark">BS</span><span><b>BS STORE</b><small>by Bansal Store</small></span></a>
      <div className="search"><select aria-label="Search category" value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search groceries, brands and daily essentials…"/><button onClick={()=>document.querySelector('.catalog')?.scrollIntoView({behavior:'smooth'})}>⌕</button></div>
      <div className="header-actions"><button onClick={()=>setDialog('account')}>♙ <span>Account</span></button><button onClick={()=>setDialog('orders')}>▤ <span>Orders</span></button><button className="cart-button" onClick={()=>setCartOpen(true)}>🛒 <span>Cart</span><i>{count}</i></button></div>
    </header>
    <nav className="nav"><div className="nav-inner"><button onClick={()=>{setCategory('All');setSearch('')}}>☰ All Departments</button>{categories.slice(1).map(c=><button key={c} onClick={()=>setCategory(c)}>{c}</button>)}<span className="nav-deal">Wholesale deals available</span></div></nav>
    <main>
      <section className="hero">
        <div className="hero-copy"><span className="eyebrow">YOUR EVERYDAY GROCERY PARTNER</span><h1>Good prices.<br/><em>Great essentials.</em></h1><p>Shop trusted grocery essentials for your home or business — all in one place.</p><button className="primary" onClick={()=>document.querySelector('.catalog')?.scrollIntoView({behavior:'smooth'})}>Explore products <b>→</b></button></div>
        <div className="hero-art"><div className="sun"></div><div className="basket">🛍️</div><div className="floating f1">🌾</div><div className="floating f2">🥫</div><div className="floating f3">🍪</div><div className="hero-stamp">DAILY<br/>VALUE</div></div>
      </section>
      <section className="trust-row"><div><b>✓</b><span><strong>Retail & wholesale</strong><small>Flexible shopping</small></span></div><div><b>▣</b><span><strong>Everyday essentials</strong><small>Multiple categories</small></span></div><div><b>♡</b><span><strong>Value-focused</strong><small>Clear pricing</small></span></div><div><b>☎</b><span><strong>Need assistance?</strong><small>Contact our store team</small></span></div></section>
      <section className="mode-panel"><div><span className="eyebrow">SHOP YOUR WAY</span><h2>Choose your shopping mode</h2><p>Switch between everyday retail and business-friendly wholesale prices.</p></div><div className="mode-switch"><button className={mode==='retail'?'active':''} onClick={()=>setMode('retail')}>🏠 Retail</button><button className={mode==='wholesale'?'active':''} onClick={()=>setMode('wholesale')}>🏪 Wholesale</button></div></section>
      <section className="category-section"><div className="section-heading"><div><span className="eyebrow">BROWSE BY DEPARTMENT</span><h2>Shop popular categories</h2></div></div><div className="category-grid">{[{n:'Staples',e:'🌾',d:'Rice, atta, pulses & more'},{n:'Snacks',e:'🍪',d:'Biscuits, chips & treats'},{n:'Beverages',e:'🧃',d:'Tea, drinks & refreshments'},{n:'Dry Fruits',e:'🥜',d:'Nuts & premium picks'},{n:'Personal Care',e:'🧴',d:'Daily care essentials'},{n:'Household',e:'🧽',d:'Cleaning & home care'},{n:'Pet Supplies',e:'🐾',d:'Everyday pet needs'}].map(c=><button className="category-card" key={c.n} onClick={()=>{setCategory(c.n);document.querySelector('.catalog')?.scrollIntoView({behavior:'smooth'})}}><span>{c.e}</span><b>{c.n}</b><small>{c.d}</small></button>)}</div></section>
      <section className="catalog">
        <div className="section-heading"><div><span className="eyebrow">HANDPICKED FOR YOU</span><h2>{category==='All'?'Popular products':category}</h2><p>{visible.length} products to explore</p></div><select className="sort" value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div>
        <div className="product-grid">{visible.map(p=><article className="product-card" key={p.id}><div className="product-image"><span className="product-emoji">{p.emoji}</span>{p.tag&&<label>{p.tag}</label>}<button className="heart" onClick={()=>setNotice('Wishlist preview — sign-in will be added in a later release')} aria-label="Add to wishlist">♡</button></div><div className="product-info"><small>{p.brand} · {p.category}</small><h3>{p.name}</h3><p>{p.unit}</p><div className="price-line"><strong>{money(price(p))}</strong>{mode==='wholesale'&&<del>{money(p.retail)}</del>}</div><button className="add-button" onClick={()=>add(p)}>＋ Add to cart</button></div></article>)}</div>
        {!visible.length&&<div className="empty">No matching products. Try another search or category.</div>}
      </section>
      <section className="business-banner"><div><span className="eyebrow">FOR SHOPKEEPERS & BULK BUYERS</span><h2>Buying for your business?</h2><p>Switch to wholesale mode to explore business-friendly prices on selected products.</p></div><button className="primary" onClick={()=>{setMode('wholesale');document.querySelector('.catalog')?.scrollIntoView({behavior:'smooth'})}}>Explore wholesale <b>→</b></button></section>
    </main>
    <footer><div className="footer-brand"><span className="brand-mark">BS</span><div><b>BS STORE</b><small>Bansal Store · Retail & Wholesale Grocery</small></div></div><p>Everyday essentials for homes and businesses.</p><small>© {new Date().getFullYear()} BS Store. Product list and prices shown are sample data for this prototype.</small></footer>

    {notice&&<div className="toast">{notice}</div>}
    {cartOpen&&<div className="overlay" onClick={()=>setCartOpen(false)}><aside className="drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><h2>Your cart <span>({count})</span></h2><button onClick={()=>setCartOpen(false)}>✕</button></div>{!cartItems.length?<div className="empty">Your cart is empty. Add a few essentials to get started.</div>:<>{cartItems.map(p=><div className="cart-row" key={p.id}><span className="cart-emoji">{p.emoji}</span><div className="cart-detail"><b>{p.name}</b><small>{p.unit} · {money(price(p))}</small><div className="qty"><button onClick={()=>updateCart(p.id,-1)}>−</button><span>{cart[p.id]}</span><button onClick={()=>updateCart(p.id,1)}>＋</button></div></div><strong>{money(price(p)*cart[p.id])}</strong></div>)}<div className="cart-total"><span>Estimated total</span><b>{money(total)}</b></div><button className="primary checkout" onClick={()=>setDialog('checkout')}>Continue to checkout →</button><small className="fine-print">Demo only: checkout and order placement are not connected to a backend.</small></>}</aside></div>}
    {dialog&&<div className="overlay" onClick={()=>setDialog('')}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setDialog('')}>✕</button><span className="eyebrow">BS STORE</span><h2>{dialog==='account'?'Customer account':dialog==='orders'?'Your orders':dialog==='checkout'?'Checkout preview':'Welcome'}</h2>{dialog==='account'?<><p>Customer sign-in and registration will be connected after secure backend setup.</p><label>Email or mobile number</label><input placeholder="Enter email or mobile number" disabled/><button className="primary full" disabled>Continue (coming soon)</button></>:dialog==='orders'?<p>Your order history will appear here after customer accounts and order processing are connected.</p>:<><p>Your cart contains {count} item(s), with an estimated total of <b>{money(total)}</b>.</p><p>Online payments, delivery details and order confirmation are not active in this preview.</p></>}<button className="secondary full" onClick={()=>setDialog('')}>Close</button></div></div>}
  </div>
}