import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  CircleCheck,
  CalendarDays,
  ChevronDown,
  Menu,
  MoveRight,
  X,
} from 'lucide-react'
import './mobile.css'
import './challenge.css'
import './motion.css'
import { siteNavigation, siteBrand, siteBrandSubtitle } from './siteNavigation'

const BOOKING_LINK = 'https://calendly.com/welcome-pctransformation/30min'
const BOOKING_EMBED_LINK = `${BOOKING_LINK}?hide_gdpr_banner=1`
const PAYPAL_LINK = 'https://paypal.me/paulchristian7'
const FUNDRAZR_LINK = 'https://fundrazr.com/42mpe9?ref=sh_0EzmUa_ab_AOWhbf9fuIJAOWhbf9fuIJ'
const LINKTREE_LINK = 'https://linktr.ee/paulchristiantransformation?utm_source=linktree_profile_share&ltsid=dd17141b-6f0c-455a-922b-655590112653'
const CONTACT_EMAIL = 'welcome@pctransformation.ch'

const services = [
  {
    title: 'BODY TRANSFORMATION',
    lead: 'Transform your Body and transform your Life!',
    description: 'Mit Fitness, Ernährung und Mindset Coaching zu mehr Gesundheit, Lebensenergie und Wohlbefinden.',
    image: 'https://res.cloudinary.com/dtzpydtdg/image/upload/f_auto,q_auto,w_640/v1787272358/1787272131550_2_tppoc0.jpg',
    href: '/angebote',
  },
  {
    title: 'PERSONAL TRAINING',
    lead: 'Persönlich – Leidenschaftlich – Individuell.',
    description: 'Mit einem individuellen Trainingsplan und ehrlichem Coaching zu spürbaren und nachhaltigen Ergebnissen.',
    image: '/assets/coaching-session.jpg',
    href: '/angebote',
  },
  {
    title: 'ERNÄHRUNG & MINDSET',
    lead: 'Energie, Fokus und neue Gewohnheiten.',
    description: 'Eine flexible Strategie, die dich im Alltag unterstützt und Disziplin ohne unnötigen Druck aufbaut.',
    image: '/assets/nutrition-prep.jpg',
    href: '/angebote',
  },
  {
    title: 'FIT FOR CHRIST BOOTCAMP',
    lead: 'Fitness, Glaube & Abenteuer.',
    description: 'Ein ganzheitliches Erlebnis, das Bewegung, biblische Prinzipien und Fellowship verbindet.',
    image: '/assets/bootcamp-community.jpg',
    href: '/angebote',
  },
]

const heroSlides = [
  { label: 'Personal Training', image: '/assets/paul-scroll-frame-02-desktop.webp', video: 'https://res.cloudinary.com/dtzpydtdg/video/upload/v1789407646/Trainer_coaching_client_in_gym_20260914193806_gavgg6.webm' },
  { label: 'Ernährung', image: '/assets/nutrition-prep.jpg' },
  { label: 'Mindset & Fokus', image: 'https://res.cloudinary.com/dtzpydtdg/image/upload/v1789114354/Gemini_Generated_Image_3xiefh3xiefh3xie_wmh3f9.jpg' },
]

const programSlides = [
  {
    label: '1:1 Coaching',
    eyebrow: '01 / Persönliche Betreuung',
    description: 'Individuelle Begleitung, klare Strategie und persönliche Unterstützung auf deinem Weg.',
    image: 'https://res.cloudinary.com/dtzpydtdg/image/upload/v1789409868/pct_11_coaching_cover_paul_christian_clean_dz0mdy.png',
  },
  {
    label: 'BT4 Neustart',
    eyebrow: '02 / Der smarte Einstieg',
    description: 'Vier Wochen Struktur für Selbststarter, die ihre gesunden Routinen neu aufbauen möchten.',
    image: 'https://res.cloudinary.com/dtzpydtdg/image/upload/v1789409865/pct_bt4_neustart_cover_paul_christian_clean_jsfqpu.png',
  },
  {
    label: 'VIP Personal Coaching',
    eyebrow: '03 / Maximale Unterstützung',
    description: 'Intensive 1:1-Betreuung mit persönlichem Trainings- und Ernährungsplan.',
    image: 'https://res.cloudinary.com/dtzpydtdg/image/upload/v1789409862/pct_vip_personal_coaching_cover_paul_christian_clean_au6sph.png',
  },
  {
    label: 'BT8 Transformation',
    eyebrow: '04 / Das Flagship-Programm',
    description: 'Die ganzheitliche 8-Wochen-Transformation mit Coaching, Live-Calls und Community.',
    image: 'https://res.cloudinary.com/dtzpydtdg/image/upload/v1789409862/pct_vip_personal_coaching_cover_paul_christian_clean_au6sph.png',
  },
]


function buildMailto(subject: string, rows: Array<[string, string]>) {
  const body = rows.map(([label, value]) => `${label}: ${value || '—'}`).join('\n')
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function ProgramCarousel() {
  const reduceMotion = useReducedMotion()
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (reduceMotion || isPaused) return
    const timer = window.setInterval(() => setCurrent((slide) => (slide + 1) % programSlides.length), 6500)
    return () => window.clearInterval(timer)
  }, [isPaused, reduceMotion])

  const showSlide = (index: number) => setCurrent((index + programSlides.length) % programSlides.length)

  return (
    <div className="homepage-program-carousel" aria-label="PCT Programme" tabIndex={0} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocus={() => setIsPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false) }} onKeyDown={(event) => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); showSlide(current - 1) }
      if (event.key === 'ArrowRight') { event.preventDefault(); showSlide(current + 1) }
    }}>
      <div className="homepage-program-stage">
        {programSlides.map((slide, index) => <article className={`homepage-program-slide${index === current ? ' is-active' : ''}`} aria-hidden={index !== current} key={slide.label}>
          <div className="homepage-program-visual"><img src={slide.image} alt={`Cover für ${slide.label}`} loading={index === 0 ? 'eager' : 'lazy'} /></div>
          <div className="homepage-program-copy"><p className="eyebrow"><span /> {slide.eyebrow}</p><h3>{slide.label}</h3><p>{slide.description}</p><a className="button button-primary" tabIndex={index === current ? 0 : -1} href="/angebote#programme">Programm entdecken <ArrowUpRight size={17} /></a></div>
        </article>)}
        <button className="homepage-program-control previous" type="button" onClick={() => showSlide(current - 1)} aria-label="Vorheriges Programm">←</button>
        <button className="homepage-program-control next" type="button" onClick={() => showSlide(current + 1)} aria-label="Nächstes Programm">→</button>
      </div>
      <div className="homepage-program-navigation" aria-label="Programme auswählen">
        <div className="homepage-program-dots">{programSlides.map((slide, index) => <button key={slide.label} type="button" onClick={() => showSlide(index)} aria-label={`${slide.label} anzeigen`} aria-current={index === current ? 'true' : undefined}>{index === current ? <span>{slide.label}</span> : <span className="sr-only">{slide.label}</span>}</button>)}</div>
        <span className="homepage-program-counter">0{current + 1} / 0{programSlides.length}</span>
      </div>
    </div>
  )
}

function App() {
  const reduceMotion = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroSlide, setHeroSlide] = useState(0)
  const [contactSent, setContactSent] = useState(false)
  const [cookieVisible, setCookieVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('pct-cookie-consent')) setCookieVisible(true)
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(() => setHeroSlide((slide) => (slide + 1) % heroSlides.length), 6500)
    return () => window.clearInterval(timer)
  }, [reduceMotion])

  const reveal = (distance = 34, delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .22 },
    transition: { duration: reduceMotion ? 0 : .68, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  const handleCookieChoice = (choice: 'essential' | 'all') => {
    localStorage.setItem('pct-cookie-consent', choice)
    setCookieVisible(false)
  }

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setContactSent(true)
    window.location.href = buildMailto('PCT Coaching- und Kooperationsanfrage', [
      ['Name', String(form.get('name') ?? '')],
      ['E-Mail', String(form.get('email') ?? '')],
      ['Telefon', String(form.get('phone') ?? '')],
      ['Dein Anliegen', String(form.get('request') ?? '')],
      ['Nachricht', String(form.get('message') ?? '')],
    ])
  }

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Paul Christian Transformation Startseite">
          <img src="https://res.cloudinary.com/dtzpydtdg/image/upload/v1787646036/48989-removebg-preview_wcwifq.png" alt="PCT Logo" />
          <span>{siteBrand}<small>{siteBrandSubtitle}</small></span>
        </a>
        <nav className={menuOpen ? 'nav-open' : ''} aria-label="Hauptnavigation">
          {siteNavigation.map((item) => <a href={item.href} onClick={() => setMenuOpen(false)} key={item.href}>{item.label}</a>)}
          <a className="nav-book" href={BOOKING_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Termin buchen <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={21} /> : <Menu size={22} />}
        </button>
      </header>

      <section id="top" className="hero-section" aria-label="PCT Einstieg">
        <div className="hero-media" aria-hidden="true">
          {heroSlides.map((slide, index) => slide.video ? <video key={slide.label} className={`hero-slide-image${index === heroSlide ? ' is-active' : ''}`} src={slide.video} poster={slide.image} autoPlay={!reduceMotion} muted loop playsInline preload="metadata" aria-hidden="true" /> : <img key={slide.label} className={`hero-slide-image${index === heroSlide ? ' is-active' : ''}`} src={slide.image} alt="" loading="lazy" decoding="async" />)}
          <div className="hero-grid" />
          <div className="hero-vignette" />
        </div>
        <motion.div className="hero-content" initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .65, ease: [0.22, 1, 0.36, 1] }}>
          <p className="hero-slide-label">{heroSlides[heroSlide].label}</p>
          <h1>ERREICHE DEINE<br />BESTE GESUNDHEIT<br /><em>UND ERLEBE DEIN<br />BESTES SELBST!</em></h1>
          <p className="hero-lead">Mit ganzheitlichem Transformations-Coaching – zu mehr Gesundheit, Motivation, Energie und Balance im Leben.</p>
          <div className="hero-actions">
            <a className="button button-primary" href={BOOKING_LINK} target="_blank" rel="noopener noreferrer">Erstgespräch buchen <MoveRight size={18} /></a>
            <a className="button button-ghost" href="#angebote">Angebote entdecken</a>
          </div>
          <div className="hero-slide-controls" aria-label="PCT-Bereiche auswählen">
            {heroSlides.map((slide, index) => <button key={slide.label} type="button" className={index === heroSlide ? 'is-active' : ''} onClick={() => setHeroSlide(index)} aria-label={`${slide.label} anzeigen`} aria-pressed={index === heroSlide}><span>0{index + 1}</span>{slide.label}</button>)}
          </div>
        </motion.div>
        <button className="scroll-cue" type="button" onClick={() => scrollToId('angebote')}>SCROLL TO START <ChevronDown size={17} /></button>
      </section>

      <section id="angebote" className="services-section section-shell" aria-labelledby="services-title">
        <motion.div className="services-heading services-heading-centered" {...reveal(28)}>
          <p className="eyebrow"><span /> 01 / Angebote</p>
          <h2 id="services-title">DEIN WEG.<br /><em>DEINE TRANSFORMATION.</em></h2>
          <p>Alles auf einen Blick: Wähle den Einstieg, der zu deinem Ziel passt. Jede Buchung beginnt mit Klarheit und endet mit einem Plan, den du im echten Leben umsetzen kannst.</p>
        </motion.div>
        <motion.div {...reveal(30)}><ProgramCarousel /></motion.div>
        <div className="services-grid services-grid-four">{services.map((service, index) => <motion.a className="service-card" href={service.href} key={service.title} {...reveal(30, index * .06)} whileHover={reduceMotion ? undefined : { y: -7 }}>
          <div className={`service-image${index < 3 ? ' service-image-focus-top' : ''}`}><img src={service.image} alt="" loading="lazy" decoding="async" /></div>
          <div className="service-card-content"><span className="service-number">0{index + 1}</span><h3>{service.title}</h3><p className="service-lead">{service.lead}</p><p className="service-description">{service.description}</p><span className="service-link">Mehr erfahren <ArrowUpRight size={16} /></span></div>
        </motion.a>)}        </div>
        <div className="centered-cta"><a className="button button-primary" href={BOOKING_LINK} target="_blank" rel="noopener noreferrer">Passendes Angebot finden <CalendarDays size={18} /></a></div>
      </section>

      <section className="paul-story-section section-shell" id="ueber-paul" aria-labelledby="paul-story-title">
        <motion.div className="paul-story-card" {...reveal(34)}>
          <div className="paul-story-image"><img src="https://payhip.com/cdn-cgi/image/format=auto,width=1500/https://pe56d.s3.amazonaws.com/o_1k2irr6pe183m17id1fo71svs2gmc.png" alt="Paul Christian — Gründer von PCT Transformation" loading="lazy" /></div>
          <div className="paul-story-content">
            <p className="eyebrow"><span /> Über Paul</p>
            <h2 id="paul-story-title">MEINE<br /><em>GESCHICHTE.</em></h2>
            <p>Meine persönliche Transformationsreise begann 2014. Durch viele Jahre Erfahrung in Fitness, Ernährung, Training und Persönlichkeitsentwicklung erkannte ich:</p>
            <p className="paul-story-highlight">Nachhaltige Transformation beginnt nicht nur mit dem Körper, sondern mit der Entwicklung des ganzen Menschen.</p>
            <p>Seit 2017 begleite ich Menschen im Bereich Fitness und Gesundheit. Rund 400 Menschen durfte ich bereits auf ihrem Weg unterstützen.</p>
            <p>Mein Glaube an Jesus Christus ist dabei ein wichtiger Bestandteil meiner persönlichen Geschichte und prägt die Werte und langfristige Vision von PCT.</p>
          </div>
        </motion.div>
      </section>

      <section id="kundenreview" className="homepage-review-section section-shell" aria-labelledby="homepage-review-title">
        <motion.div className="homepage-review-card" {...reveal(34)}>
          <div className="homepage-review-image"><img src="https://res.cloudinary.com/dtzpydtdg/image/upload/v1789306498/IMG-20250907-WA0026_edited_gaudij.avif" alt="Kundenreview von Chris Houston zur PCT 8-Week Transformation Challenge" loading="lazy" /></div>
          <div className="homepage-review-content">
            <p className="eyebrow"><span /> Kundenreview</p>
            <h2 id="homepage-review-title">Chris Houston’s<br /><em>Transformation Story.</em></h2>
            <p className="homepage-review-label">8-Week Transformation Challenge</p>
            <blockquote>“I joined Paul Christian’s 8-Week Transformation Challenge, and it changed me both physically and spiritually. Through the program, I discovered patterns in my eating and in my spiritual life that I had never noticed before. With Paul’s guidance—and the Lord’s direction—I learned to address these habits and grow in discipline, strength, and awareness.<br /><br />What impressed me most was the perfect combination of physical training and spiritual growth. Paul is truly being used by God to help men and women reach their goals from the inside out. Not only did my body transform, but the spiritual breakthroughs were even more powerful.<br /><br />I’m grateful for what Paul is doing and for how the Lord works through him. This program is amazing.”</blockquote>
            <a className="button button-primary" href="https://www.youtube.com/watch?v=VMNFZ6kTX4g&amp;list=PL2A1OSnY161EQu4TzpFT9D5FmocCXQ_pk" target="_blank" rel="noopener noreferrer">Chris’ Video ansehen <ArrowUpRight size={18} /></a>
          </div>
        </motion.div>
      </section>

      <section id="termine" className="booking-calendar-section section-shell" aria-labelledby="booking-calendar-title">
        <motion.div className="booking-calendar-copy" {...reveal(30)}><p className="eyebrow"><span /> 02 / Termine</p><h2 id="booking-calendar-title">BUCHE DEINEN<br /><em>TERMIN.</em></h2><p>Wähle deinen passenden Termin direkt im Buchungskalender. Wir freuen uns auf dich.</p><div className="booking-meta"><span>Online oder vor Ort</span><span>Erstgespräch · Personal Training · Coaching</span></div></motion.div>
        <motion.div className="calendly-booking-card" {...reveal(30, .1)}><iframe src={BOOKING_EMBED_LINK} title="Calendly Terminbuchung" loading="lazy" /><a className="button button-primary" href={BOOKING_LINK} target="_blank" rel="noopener noreferrer">Calendly direkt öffnen <ArrowUpRight size={18} /></a></motion.div>
      </section>

      <section id="kundenaufbau" className="customer-section section-shell" aria-labelledby="customer-title">
        <motion.div className="customer-heading" {...reveal(34)}><p className="eyebrow"><span /> 03 / Kundenaufbau</p><h2 id="customer-title">MEHR ALS<br /><em>EIN PLAN.</em></h2><p>Der PCT Weg verbindet Personal Training, Ernährung und Mindset. So entstehen gesunde Gewohnheiten, Disziplin und Selbstkontrolle – für einen Lifestyle, der bleibt.</p><a className="button button-primary" href={BOOKING_LINK} target="_blank" rel="noopener noreferrer">Kundenaufbau starten <MoveRight size={18} /></a></motion.div>
        <div className="customer-benefits">
          {[
            ['Training', 'Strukturierte Einheiten für mehr Kraft, Ausdauer und einen Körper, auf den du dich verlassen kannst.'],
            ['Ernährung', 'Eine alltagstaugliche Strategie für mehr Energie, Wohlbefinden und nachhaltige Ergebnisse.'],
            ['Mindset', 'Fokus und Motivation, damit du auch dann dranbleibst, wenn der Alltag anspruchsvoll wird.'],
            ['Gewohnheiten', 'Kleine, klare Schritte bauen Disziplin und Selbstkontrolle langfristig auf.'],
          ].map(([title, copy], index) => <motion.article className="customer-benefit" key={title} {...reveal(28, index * .06)}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></motion.article>)}
        </div>
      </section>

      <section id="projekte" className="projects-section section-shell" aria-labelledby="projects-title">
        <motion.div className="projects-heading" {...reveal(30)}><p className="eyebrow"><span /> 04 / Projekte</p><h2 id="projects-title">AKTUELL IN<br /><em>BEWEGUNG.</em></h2><p>Projekte und Events, die Menschen zusammenbringen, Bewegung fördern und nachhaltige Veränderung möglich machen.</p></motion.div>
        <div className="project-grid">
          <motion.article className="project-card project-card-featured" {...reveal(30)}><div className="project-card-image"><img src="/assets/bootcamp-community.jpg" alt="PCT Transformations-Studio Projekt" loading="lazy" /></div><div className="project-card-body"><span>PCT TRANSFORMATIONS-STUDIO</span><h3>Unser Studio-Projekt</h3><p>Hilf mit, einen Ort zu schaffen, an dem Fitness, Ernährung und Mindset ganzheitlich zusammenkommen.</p><a className="text-link" href={FUNDRAZR_LINK} target="_blank" rel="noopener noreferrer">Projekt unterstützen <ArrowUpRight size={17} /></a></div></motion.article>
          <motion.article className="project-card" {...reveal(30, .1)}><div className="project-card-image"><img src="https://static.wixstatic.com/media/990908_c7fbb7ec7092400791d0c47c830db8da~mv2.png/v1/fill/w_640,h_640,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/990908_c7fbb7ec7092400791d0c47c830db8da~mv2.png" alt="PCT Neueröffnungs-Events" loading="lazy" /></div><div className="project-card-body"><span>NEUERÖFFNUNGS-EVENTS</span><h3>Gemeinsam eröffnen</h3><p>Das Eröffnungs-Event ist für Oktober/November in Planung. Trag dich vorab ein und wir informieren dich über das offizielle Datum und den Ablauf.</p><a className="text-link" href="/vision#event-vormerkliste">Jetzt für Event vormerken <ArrowUpRight size={17} /></a></div></motion.article>
        </div>
      </section>

      <section id="eroeffnung" className="vision-section vision-section-video-only section-shell" aria-labelledby="vision-title">
        <motion.div className="vision-copy" {...reveal(40)}><p className="eyebrow"><span /> 05 / Eröffnung realisieren</p><h2 id="vision-title">PCT<br /><em>TRANSFORMATIONS-<br />CENTER.</em></h2><p className="vision-motto">Vom Traum zur Erfüllung.</p><p>Unterstütze uns auf dem Weg zur Neueröffnung des PCT Transformations-Centers. Wir möchten einen Ort schaffen, an dem Fitness, Ernährung und Mindset ganzheitlich und professionell zusammenkommen – für Menschen in der Schweiz und darüber hinaus.</p><div className="vision-actions"><a className="button button-primary" href={PAYPAL_LINK} target="_blank" rel="noopener noreferrer">Eröffnung supporten <ArrowUpRight size={18} /></a><a className="button button-ghost dark-ghost" href="/vision">Mehr erfahren</a><a className="button button-ghost dark-ghost" href="/vision#event-vormerkliste">Jetzt für Event vormerken <ArrowUpRight size={18} /></a></div><div className="vision-video-wrapper"><iframe src="https://drive.google.com/file/d/1FKk8bm_bPBJfdpOHFFWIelkL9GGNPE5h/preview" title="PCT Eröffnungsprojekt Video" loading="lazy" allow="autoplay; fullscreen" allowFullScreen /></div><div className="vision-social"><p className="eyebrow"><span /> Social Media</p><h3>Folge uns auf Social Media.</h3><p>Alle PCT-Profile und aktuellen Updates findest du gesammelt auf Linktree.</p><a className="button button-primary" href={LINKTREE_LINK} target="_blank" rel="noopener noreferrer">Social Media auf Linktree <ArrowUpRight size={18} /></a></div></motion.div>
      </section>

      <section id="kontakt" className="contact-section section-shell" aria-labelledby="contact-title">
        <motion.div {...reveal(34)}><p className="eyebrow">Dein nächster Schritt</p><h2 id="contact-title">STARTEN<br /><em>WIR.</em></h2><p>Du bist unsicher, welches Angebot zu dir passt? Schreib uns kurz – wir finden gemeinsam den passenden Einstieg.</p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></motion.div>
        <motion.form className="contact-form" onSubmit={handleContact} {...reveal(40, .12)}>
          <label>Name<input required name="name" autoComplete="name" placeholder="Dein Name" /></label>
          <div className="field-grid"><label>E-Mail<input required type="email" name="email" autoComplete="email" placeholder="name@beispiel.ch" /></label><label>Telefon <small>optional</small><input name="phone" type="tel" autoComplete="tel" placeholder="+41 …" /></label></div>
          <label>Dein Anliegen<select required name="request" defaultValue=""><option value="" disabled>Bitte auswählen</option><option>Coaching &amp; Personal Training</option><option>Ernährung &amp; Mindset</option><option>Bootcamp &amp; Projekt</option><option>Eröffnung &amp; Kooperation</option></select></label>
          <label>Deine Nachricht<textarea required name="message" rows={5} placeholder="Beschreibe kurz dein Anliegen." /></label>
          <label className="consent"><input type="checkbox" required /> <span>Ich bin damit einverstanden, dass Paul meine Angaben zur Bearbeitung meiner Anfrage verwendet.</span></label>
          <button className="button button-primary" type="submit">Anfrage vorbereiten <MoveRight size={18} /></button>
          {contactSent && <p className="form-notice"><CircleCheck size={17} />Dein E-Mail-Programm sollte sich jetzt öffnen.</p>}
        </motion.form>
      </section>

      <footer><span>© 2026 Paul Christian Transformation</span><span><a href="/angebote">Angebote</a> · <a href="#termine">Termine</a> · <a href="#kundenaufbau">Kundenaufbau</a> · <a href="#projekte">Projekte</a> · <a href="#eroeffnung">Eröffnung</a> · <a href="/datenschutz">Datenschutz</a> · <a href="/impressum">Impressum</a> · <a href="/agb">AGB</a></span><span>Website erstellt von <a href="https://wildwave.ch" target="_blank" rel="noopener noreferrer">WILDWAVE Marketing</a></span></footer>

      {cookieVisible && <div className="cookie-banner is-visible" role="dialog" aria-label="Cookie-Hinweis" aria-live="polite"><div className="cookie-inner"><p className="cookie-text">Diese Website verwendet Cookies, um die Nutzung zu verbessern. Notwendige Cookies sind für den Betrieb erforderlich. Mehr dazu in der <a href="/datenschutz">Datenschutzerklärung</a>.</p><div className="cookie-actions"><button className="cookie-btn essential" type="button" onClick={() => handleCookieChoice('essential')}>Nur notwendige</button><button className="cookie-btn accept" type="button" onClick={() => handleCookieChoice('all')}>Alle akzeptieren</button></div></div></div>}
    </main>
  )
}

export default App
