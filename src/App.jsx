import { useEffect, useMemo, useState } from 'react'
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiBell,
  FiBriefcase,
  FiCalendar,
  FiCheck,
  FiChevronDown,
  FiChevronRight,
  FiClock,
  FiDownload,
  FiFilter,
  FiGrid,
  FiHeart,
  FiMail,
  FiMoreHorizontal,
  FiPlus,
  FiSearch,
  FiSliders,
  FiUsers,
  FiX,
} from 'react-icons/fi'
import {
  FaCoffee,
  FaCodepen,
  FaFacebookF,
  FaGithub,
  FaGlobe,
  FaHeart,
  FaLinkedinIn,
  FaPatreon,
  FaYoutube,
} from 'react-icons/fa'
import './App.css'

const stageList = ['New', 'Contacted', 'Qualified', 'Customer']
const today = new Date()
const publicBase = import.meta.env.BASE_URL
const currentYear = today.getFullYear()
const dateToday = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
const formatIsoDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
const isoDate = (offset = 0) => {
  const date = new Date(today)
  date.setDate(date.getDate() + offset)
  return formatIsoDate(date)
}

const starterContacts = [
  {
    id: 'c-01', name: 'Nora Ellis', role: 'Partnerships Lead', company: 'Northstar Studio',
    email: 'nora@northstar.studio', phone: '+1 (415) 555-0138', stage: 'New',
    tags: ['Design', 'Warm intro'], lastContact: isoDate(-2), nextFollowUp: isoDate(0),
    owner: 'You', notes: 'Met through Daniel at the product roundtable. Interested in a shared launch calendar.',
    avatar: `${publicBase}images/nora-ellis.jpg`, color: 'lavender',
  },
  {
    id: 'c-02', name: 'Mateo Chen', role: 'Founder', company: 'Cedar & Coast',
    email: 'mateo@cedarcoast.co', phone: '+1 (415) 555-0191', stage: 'New',
    tags: ['Retail'], lastContact: isoDate(-5), nextFollowUp: isoDate(2),
    owner: 'You', notes: 'Looking at a new customer portal for the winter collection.', avatar: '', color: 'peach',
  },
  {
    id: 'c-03', name: 'Ava Morgan', role: 'Head of Growth', company: 'Common Thread',
    email: 'ava@commonthread.io', phone: '+1 (212) 555-0174', stage: 'Contacted',
    tags: ['SaaS', 'Referral'], lastContact: isoDate(-1), nextFollowUp: isoDate(1),
    owner: 'You', notes: 'Sent the intro deck. Circle back with the onboarding examples.',
    avatar: `${publicBase}images/ava-morgan.jpg`, color: 'mint',
  },
  {
    id: 'c-04', name: 'Jonah Brooks', role: 'Operations Director', company: 'Goodwell Market',
    email: 'jonah@goodwell.market', phone: '+1 (312) 555-0142', stage: 'Contacted',
    tags: ['Retail'], lastContact: isoDate(-3), nextFollowUp: isoDate(3),
    owner: 'You', notes: 'Asked for a short overview before bringing in the wider team.', avatar: '', color: 'blue',
  },
  {
    id: 'c-05', name: 'Priya Shah', role: 'Product Manager', company: 'Daymark Health',
    email: 'priya@daymark.health', phone: '+1 (646) 555-0104', stage: 'Qualified',
    tags: ['Health', 'Priority'], lastContact: isoDate(-1), nextFollowUp: isoDate(0),
    owner: 'You', notes: 'Strong fit for the Q4 pilot. Share a proposal with the implementation outline.', avatar: '', color: 'yellow',
  },
  {
    id: 'c-06', name: 'Elliot Park', role: 'Creative Director', company: 'Fieldwork Co.',
    email: 'elliot@fieldwork.design', phone: '+1 (206) 555-0162', stage: 'Qualified',
    tags: ['Design'], lastContact: isoDate(-4), nextFollowUp: isoDate(2),
    owner: 'You', notes: 'Wants to review a small scope with the studio team next week.', avatar: '', color: 'peach',
  },
  {
    id: 'c-07', name: 'Samira Okafor', role: 'Customer Experience', company: 'Little Lantern',
    email: 'samira@littlelantern.com', phone: '+1 (917) 555-0186', stage: 'Customer',
    tags: ['Retail', 'Partner'], lastContact: isoDate(-2), nextFollowUp: isoDate(4),
    owner: 'You', notes: 'Quarterly check-in. Their team recently added two new locations.', avatar: '', color: 'lavender',
  },
  {
    id: 'c-08', name: 'Theo Williams', role: 'Co-founder', company: 'Morrow Supply',
    email: 'theo@morrowsupply.com', phone: '+1 (503) 555-0116', stage: 'Customer',
    tags: ['Retail'], lastContact: isoDate(-6), nextFollowUp: isoDate(5),
    owner: 'You', notes: 'Share the referral kit and ask how the new dashboard is landing.', avatar: '', color: 'mint',
  },
]

const footerLinks = [
  { label: 'Portfolio', href: 'https://www.ashishranjan.net', icon: <FaGlobe /> },
  { label: 'GitHub', href: 'https://github.com/a2rp', icon: <FaGithub /> },
  { label: 'CodePen', href: 'https://codepen.io/ash1198', icon: <FaCodepen /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aashishranjan', icon: <FaLinkedinIn /> },
  { label: 'Facebook', href: 'https://www.facebook.com/theash.ashish/', icon: <FaFacebookF /> },
  { label: 'YouTube', href: 'https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1', icon: <FaYoutube /> },
  { label: 'Email', href: 'mailto:ash.ranjan09@gmail.com', icon: <FiMail /> },
  { label: 'Support', href: 'https://a2rp-donation-page.netlify.app/', icon: <FaHeart /> },
  { label: 'Buy Me a Coffee', href: 'https://buymeacoffee.com/ashishranjan', icon: <FaCoffee /> },
  { label: 'Patreon', href: 'https://www.patreon.com/ashishranjan', icon: <FaPatreon /> },
]

const readContacts = () => {
  try {
    const saved = localStorage.getItem('kinfield-contacts')
    return saved ? JSON.parse(saved) : starterContacts
  } catch {
    return starterContacts
  }
}

const dateLabel = (date) => new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
  month: 'short', day: 'numeric',
})

const relativeDate = (date) => {
  const days = Math.round((new Date(`${date}T12:00:00`) - new Date(`${isoDate()}T12:00:00`)) / 86400000)
  if (days < 0) return `${Math.abs(days)}d overdue`
  if (days === 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  return `In ${days} days`
}

function Avatar({ contact, size = 'regular' }) {
  const initials = contact.name.split(' ').map((part) => part[0]).slice(0, 2).join('')
  return (
    <span className={`avatar avatar-${contact.color || 'mint'} avatar-${size}`}>
      {contact.avatar ? <img src={contact.avatar} alt="" /> : initials}
    </span>
  )
}

function ContactCard({ contact, onOpen }) {
  const due = relativeDate(contact.nextFollowUp)
  return (
    <button className="contact-card" type="button" onClick={() => onOpen(contact)} aria-label={`Open ${contact.name}`}>
      <div className="card-topline">
        <Avatar contact={contact} />
        <span className={`follow-chip ${due.includes('overdue') ? 'is-overdue' : ''}`}>
          <FiClock aria-hidden="true" /> {due}
        </span>
        <span className="card-more"><FiMoreHorizontal aria-hidden="true" /></span>
      </div>
      <span className="contact-name">{contact.name}</span>
      <span className="contact-role">{contact.role}</span>
      <span className="company-line"><FiBriefcase aria-hidden="true" /> {contact.company}</span>
      <span className="tag-row">
        {contact.tags.slice(0, 2).map((tag) => <span className="tag" key={tag}>{tag}</span>)}
      </span>
      <span className="card-divider" />
      <span className="card-footline"><span>Last touch</span><strong>{dateLabel(contact.lastContact)}</strong><FiChevronRight aria-hidden="true" /></span>
    </button>
  )
}

function ContactModal({ contact, onClose, onSave }) {
  const isExisting = Boolean(contact?.name)
  const [form, setForm] = useState(() => contact || {
    id: `c-${Date.now()}`, name: '', role: '', company: '', email: '', phone: '', stage: 'New',
    tags: [], lastContact: isoDate(), nextFollowUp: isoDate(3), owner: 'You', notes: '', avatar: '', color: 'mint',
  })
  const [tagsText, setTagsText] = useState((contact?.tags || []).join(', '))
  const setField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    onSave({ ...form, tags: tagsText.split(',').map((tag) => tag.trim()).filter(Boolean) })
    onClose()
  }

  return (
    <div className="modal-scrim" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <div className="modal-heading">
          <div>
            <span className="eyebrow">{isExisting ? 'CONTACT PROFILE' : 'NEW RELATIONSHIP'}</span>
            <h2 id="contact-modal-title">{isExisting ? 'A little context goes a long way.' : 'Add someone to your board.'}</h2>
          </div>
          <button type="button" className="icon-button close-button" onClick={onClose} aria-label="Close"><FiX /></button>
        </div>
        <form onSubmit={submit}>
          <div className="modal-fields">
            <label className="field full-field">Full name<input name="name" value={form.name} onChange={setField} required placeholder="Name" /></label>
            <label className="field">Role<input name="role" value={form.role} onChange={setField} placeholder="What they do" /></label>
            <label className="field">Company<input name="company" value={form.company} onChange={setField} placeholder="Where they work" /></label>
            <label className="field">Email<input name="email" type="email" value={form.email} onChange={setField} placeholder="name@company.com" /></label>
            <label className="field">Phone<input name="phone" value={form.phone} onChange={setField} placeholder="Optional" /></label>
            <label className="field">Relationship stage<select name="stage" value={form.stage} onChange={setField}>{stageList.map((stage) => <option key={stage}>{stage}</option>)}</select></label>
            <label className="field">Next follow-up<input name="nextFollowUp" type="date" value={form.nextFollowUp} onChange={setField} /></label>
            <label className="field full-field">Tags<input value={tagsText} onChange={(event) => setTagsText(event.target.value)} placeholder="Design, Referral" /></label>
            <label className="field full-field">A note to remember<textarea name="notes" rows="3" value={form.notes} onChange={setField} placeholder="What would be useful to remember next time?" /></label>
          </div>
          <div className="modal-actions">
            <span className="save-hint"><FiCheck aria-hidden="true" /> Saved to this browser</span>
            <div><button type="button" className="button button-quiet" onClick={onClose}>Cancel</button><button type="submit" className="button button-primary">{isExisting ? 'Save changes' : 'Add contact'} <FiArrowUpRight /></button></div>
          </div>
        </form>
      </section>
    </div>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-credit">
        <a className="footer-logo" href="https://www.ashishranjan.net" target="_blank" rel="noreferrer" aria-label="Ashish Ranjan portfolio">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ashish Ranjan logo" />
        </a>
        <p>© {currentYear} <a href="https://github.com/a2rp" target="_blank" rel="noreferrer">Ashish Ranjan</a>. All rights reserved.</p>
      </div>
      <nav className="footer-links" aria-label="Ashish Ranjan links">
        {footerLinks.map((link) => <a href={link.href} key={link.label} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" aria-label={link.label} title={link.label}>{link.icon}<span>{link.label}</span></a>)}
      </nav>
    </footer>
  )
}

function App() {
  const [contacts, setContacts] = useState(readContacts)
  const [search, setSearch] = useState('')
  const [activeStage, setActiveStage] = useState('All stages')
  const [view, setView] = useState('board')
  const [modalContact, setModalContact] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [activeNav, setActiveNav] = useState('overview')
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('kinfield-contacts', JSON.stringify(contacts))
  }, [contacts])

  useEffect(() => {
    if (!toast) return undefined
    const timeout = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const filteredContacts = useMemo(() => contacts.filter((contact) => {
    const query = search.toLowerCase().trim()
    const matchesQuery = !query || [contact.name, contact.company, contact.role, contact.email, ...contact.tags].join(' ').toLowerCase().includes(query)
    return matchesQuery && (activeStage === 'All stages' || contact.stage === activeStage)
  }), [contacts, search, activeStage])

  const dueToday = contacts.filter((contact) => contact.nextFollowUp <= isoDate()).length
  const openRelationships = contacts.filter((contact) => contact.stage !== 'Customer').length
  const thisWeek = contacts.filter((contact) => {
    const days = (new Date(`${contact.nextFollowUp}T12:00:00`) - new Date(`${isoDate()}T12:00:00`)) / 86400000
    return days >= 0 && days <= 7
  }).length

  const openContact = (contact) => {
    setModalContact(contact)
    setModalOpen(true)
  }

  const saveContact = (contact) => {
    setContacts((current) => {
      const exists = current.some((item) => item.id === contact.id)
      return exists ? current.map((item) => item.id === contact.id ? contact : item) : [contact, ...current]
    })
    setToast(contact.id && contacts.some((item) => item.id === contact.id) ? 'Contact details saved' : 'Contact added to your board')
  }

  const markDone = (contact) => {
    const next = new Date(`${isoDate()}T12:00:00`)
    next.setDate(next.getDate() + 7)
    setContacts((current) => current.map((item) => item.id === contact.id
      ? { ...item, lastContact: isoDate(), nextFollowUp: formatIsoDate(next) }
      : item))
    setToast(`Follow-up with ${contact.name.split(' ')[0]} marked done`)
  }

  const exportContacts = () => {
    const headings = ['Name', 'Role', 'Company', 'Email', 'Phone', 'Stage', 'Tags', 'Next follow-up']
    const rows = contacts.map((contact) => [contact.name, contact.role, contact.company, contact.email, contact.phone, contact.stage, contact.tags.join('|'), contact.nextFollowUp])
    const csv = [headings, ...rows].map((row) => row.map((value) => `"${String(value || '').replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'kinfield-contacts.csv'
    link.click()
    URL.revokeObjectURL(url)
    setToast('Your contact list is ready')
  }

  const upcoming = [...contacts].sort((a, b) => a.nextFollowUp.localeCompare(b.nextFollowUp)).slice(0, 4)
  return (
    <div className="app-shell">
      <header className="topbar">
        <a href="#overview" className="brand-lockup" onClick={() => setActiveNav('overview')} aria-label="Kinfield home">
          <span className="brand-mark"><i /><i /><i /><i /></span>
          <span className="brand-name">kinfield<span className="brand-dot">.</span></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#overview" className={activeNav === 'overview' ? 'is-active' : ''} onClick={() => setActiveNav('overview')}>Overview</a>
          <a href="#contacts" className={activeNav === 'contacts' ? 'is-active' : ''} onClick={() => setActiveNav('contacts')}>Contacts <span className="nav-count">{contacts.length}</span></a>
          <a href="#follow-ups" className={activeNav === 'follow-ups' ? 'is-active' : ''} onClick={() => setActiveNav('follow-ups')}>Follow-ups</a>
        </nav>
        <div className="topbar-tools">
          <label className={`search-box ${searchOpen ? 'search-open' : ''}`} onClick={() => { setSearchOpen(true); requestAnimationFrame(() => document.querySelector('.search-box input')?.focus()) }}><FiSearch aria-hidden="true" /><input aria-label="Search contacts" placeholder="Search people, companies..." value={search} onChange={(event) => setSearch(event.target.value)} onBlur={() => { if (!search) setSearchOpen(false) }} /><kbd>⌘ K</kbd></label>
          <button className="icon-button notification-button" type="button" aria-label="Show reminders" onClick={() => { document.querySelector('#follow-ups')?.scrollIntoView({ behavior: 'smooth' }); setActiveNav('follow-ups') }}><FiBell /><i /></button>
          <span className="topbar-rule" />
          <button className="profile-button" type="button" onClick={() => setToast('You are viewing your personal workspace')} aria-label="Your profile"><span className="profile-avatar">AR</span><span className="profile-name">Ashish</span><FiChevronDown /></button>
        </div>
      </header>

      <main className="page-content">
        <section className="welcome-row" id="overview">
          <div>
            <div className="date-kicker"><span className="live-dot" /> YOUR RELATIONSHIP DESK <span className="kicker-separator">/</span> {dateToday.toUpperCase()}</div>
            <h1>Know who's <em>next.</em></h1>
            <p className="welcome-copy">A thoughtful follow-up can change everything. Here's your day at a glance.</p>
          </div>
          <button type="button" className="button button-primary add-button" onClick={() => { setModalContact(null); setModalOpen(true) }}><FiPlus /> Add a contact</button>
        </section>

        <section className="metric-row" aria-label="Relationship summary">
          <article className="metric-card metric-main">
            <div className="metric-head"><span className="metric-icon"><FiUsers /></span><span className="metric-label">PEOPLE IN YOUR CIRCLE</span><button type="button" className="mini-menu" aria-label="Contact summary" onClick={() => setToast('Your full contact list is below')}><FiMoreHorizontal /></button></div>
            <div className="metric-value">{contacts.length}<span className="metric-change"><FiArrowUpRight /> 12%</span></div>
            <p>Across <strong>{new Set(contacts.map((contact) => contact.company)).size} companies</strong> and growing</p>
          </article>
          <article className="metric-card metric-accent">
            <div className="metric-head"><span className="metric-icon"><FiCalendar /></span><span className="metric-label">NEEDS A TOUCH TODAY</span><span className="metric-pulse" /></div>
            <div className="metric-value">{dueToday}<span className="metric-out-of"> / {contacts.length}</span></div>
            <p><strong>{dueToday ? 'A few good conversations' : 'A clear day ahead'}</strong> are waiting</p>
          </article>
          <article className="metric-card metric-third">
            <div className="metric-head"><span className="metric-icon"><FiSliders /></span><span className="metric-label">ACTIVE RELATIONSHIPS</span><span className="metric-caption">THIS WEEK</span></div>
            <div className="metric-value">{openRelationships}<span className="metric-change metric-soft"><FiArrowDownRight /> steady</span></div>
            <p><strong>{thisWeek} follow-ups</strong> on your calendar</p>
          </article>
          <div className="metric-note"><span className="note-mark">“</span><p>People remember how you make the follow-up feel.</p><span className="note-attribution">A LITTLE REMINDER</span></div>
        </section>

        <section className="board-section" id="contacts">
          <div className="section-heading">
            <div className="section-title-wrap">
              <div className="section-icon"><FiUsers /></div>
              <div><div className="eyebrow">YOUR PEOPLE</div><h2>Relationship board<span className="heading-period">.</span></h2></div>
              <span className="contact-total">{filteredContacts.length} contacts</span>
            </div>
            <div className="board-controls">
              <label className="filter-select"><FiFilter /><select aria-label="Filter by stage" value={activeStage} onChange={(event) => setActiveStage(event.target.value)}><option>All stages</option>{stageList.map((stage) => <option key={stage}>{stage}</option>)}</select><FiChevronDown /></label>
              <div className="view-toggle" role="group" aria-label="Board display">
                <button type="button" className={view === 'board' ? 'selected' : ''} onClick={() => setView('board')} aria-label="Board view"><FiGrid /></button>
                <button type="button" className={view === 'list' ? 'selected' : ''} onClick={() => setView('list')} aria-label="List view"><FiSliders /></button>
              </div>
              <button className="icon-button export-button" type="button" onClick={exportContacts} aria-label="Export contacts"><FiDownload /></button>
            </div>
          </div>

          {view === 'board' ? (
            <div className="kanban-board">
              {stageList.map((stage, index) => {
                const inStage = filteredContacts.filter((contact) => contact.stage === stage)
                return (
                  <section className={`kanban-column column-${index + 1}`} key={stage} aria-label={`${stage} contacts`}>
                    <div className="column-heading"><span className="column-marker" /><h3>{stage}</h3><span className="column-count">{inStage.length}</span><button type="button" className="column-menu" aria-label={`${stage} options`} onClick={() => setToast(`${stage} contacts are organized below`)}><FiMoreHorizontal /></button></div>
                    <div className="column-cards">
                      {inStage.length ? inStage.map((contact) => <ContactCard key={contact.id} contact={contact} onOpen={openContact} />) : <p className="empty-stage">No contacts here yet</p>}
                      <button className="add-to-stage" type="button" onClick={() => { setModalContact({ stage, id: `c-${Date.now()}`, name: '', role: '', company: '', email: '', phone: '', tags: [], nextFollowUp: isoDate(3), lastContact: isoDate(), notes: '', owner: 'You', color: 'mint' }); setModalOpen(true) }}><FiPlus /> Add a person</button>
                    </div>
                  </section>
                )
              })}
            </div>
          ) : (
            <div className="contact-table-wrap">
              <table className="contact-table"><thead><tr><th>Person</th><th>Company</th><th>Stage</th><th>Next follow-up</th><th aria-label="Actions" /></tr></thead><tbody>
                {filteredContacts.map((contact) => <tr key={contact.id} onClick={() => openContact(contact)}><td><span className="table-person"><Avatar contact={contact} size="small" /><span><strong>{contact.name}</strong><small>{contact.role}</small></span></span></td><td>{contact.company}</td><td><span className={`stage-pill stage-${contact.stage.toLowerCase()}`}>{contact.stage}</span></td><td>{dateLabel(contact.nextFollowUp)} <small className="table-relative">{relativeDate(contact.nextFollowUp)}</small></td><td><FiChevronRight /></td></tr>)}
                {!filteredContacts.length && <tr><td colSpan="5" className="no-results">No people match that search yet.</td></tr>}
              </tbody></table>
            </div>
          )}
        </section>

        <section className="bottom-grid" id="follow-ups">
          <article className="followup-panel">
            <div className="panel-heading"><div><div className="eyebrow">MAKE THE NEXT MOVE</div><h2>Coming up<span className="heading-period">.</span></h2></div><button type="button" className="text-button" onClick={() => setToast(`${thisWeek} follow-ups are scheduled this week`)}>This week <FiChevronDown /></button></div>
            <div className="followup-list">
              {upcoming.map((contact) => (
                <div className="followup-item" key={contact.id}>
                  <span className={`follow-date ${contact.nextFollowUp <= isoDate() ? 'today' : ''}`}><strong>{new Date(`${contact.nextFollowUp}T12:00:00`).getDate()}</strong><small>{new Date(`${contact.nextFollowUp}T12:00:00`).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</small></span>
                  <Avatar contact={contact} size="small" />
                  <button type="button" className="followup-person" onClick={() => openContact(contact)}><strong>{contact.name}</strong><span>{contact.company} <i>·</i> {contact.role}</span></button>
                  <span className={`follow-relative ${contact.nextFollowUp <= isoDate() ? 'is-today' : ''}`}>{relativeDate(contact.nextFollowUp)}</span>
                  <button type="button" className="done-button" onClick={() => markDone(contact)} aria-label={`Mark follow-up with ${contact.name} done`}><FiCheck /></button>
                </div>
              ))}
            </div>
            <a className="panel-footer-link" href="#contacts" onClick={() => setActiveNav('contacts')}>See everyone on your board <FiArrowUpRight /></a>
          </article>
          <article className="week-card">
            <div className="week-card-top"><span className="week-badge"><FiCalendar /> WEEKLY RHYTHM</span><span className="week-spark" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span></div>
            <div className="week-count">{thisWeek}<span>planned</span></div>
            <p>A good week starts with a small, thoughtful hello.</p>
            <div className="week-bottom"><span><i /> Your next touch is {upcoming[0] ? relativeDate(upcoming[0].nextFollowUp).toLowerCase() : 'all set'}</span><button type="button" onClick={() => { setModalContact(null); setModalOpen(true) }} aria-label="Create a reminder"><FiPlus /></button></div>
          </article>
        </section>

        <div className="closing-note"><span className="closing-icon"><FiHeart /></span><p>Good relationships are built in the little moments. <strong>Keep showing up.</strong></p><span className="closing-stamp">KINFIELD NOTES <i>✳</i> NO. 01</span></div>
        <Footer />
      </main>

      {modalOpen && <ContactModal contact={modalContact} onClose={() => setModalOpen(false)} onSave={saveContact} />}
      {toast && <div className="toast-message" role="status"><span><FiCheck /></span>{toast}</div>}
    </div>
  )
}

export default App
