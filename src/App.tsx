import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleCheck,
  Dumbbell,
  Flame,
  HeartPulse,
  Menu,
  MoveRight,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { type CalculatorInput, type Experience, type Goal, getTimeline } from './lib/calculator'
import './mobile.css'
import './challenge.css'
import './motion.css'
import { siteNavigation, siteBrand, siteBrandSubtitle } from './siteNavigation'

const FIRST_CALL_LINK = 'https://wa.me/41768127782?text=Hallo%20Paul%2C%20ich%20m%C3%B6chte%20gerne%20einen%20Termin%20vereinbaren.'
const BOOTCAMP_LINK = 'https://wa.me/41768127782?text=Hallo%20Paul%2C%20ich%20interessiere%20mich%20f%C3%BCr%20das%20Bootcamp.'

const services = [
  {
    number: '01',
    title: 'FIT FOR CHRIST BOOTCAMP',
    label: 'Für Gruppen / Organisationen',
    lead: 'Fitness, Glaube & Abenteuer.',
    description: 'Ein Erlebnis, das Bewegung, biblische Prinzipien und Fellowship verbindet.',
    image: '/assets/bootcamp-community.jpg',
    link: BOOTCAMP_LINK,
    action: 'Bootcamp buchen',
  },
  {
    number: '02',
    title: 'ERSTGESPRÄCH — ONLINE',
    label: 'Der erste Kontakt',
    lead: 'Klarheit für deinen Weg.',
    description: 'Wir finden unkompliziert und persönlich die passende Lösung für dein Anliegen.',
    image: 'https://res.cloudinary.com/dtzpydtdg/image/upload/v1787645142/Erstelle_cover_f%C3%BCr_personal_trai__202608251005_sp1beg.jpg',
    link: FIRST_CALL_LINK,
    action: 'Erstgespräch buchen',
  },
  {
    number: '03',
    title: 'PERSONAL TRAINING',
    label: 'Individuell / 1:1',
    lead: 'Deine beste Version.',
    description: 'Persönliche Betreuung, ein klarer Trainingsplan und ehrliches Coaching.',
    image: 'https://res.cloudinary.com/dtzpydtdg/image/upload/v1787645143/Erstelle_cover_f%C3%BCr_personal_trai__202608251002_yjanwc.jpg',
    link: FIRST_CALL_LINK,
    action: 'Personal Training anfragen',
  },
]

const challenges = [
  {
    title: 'STAGNATION IM GYM?',
    trigger: 'Du trainierst, aber ohne klaren nächsten Schritt.',
    reframe: 'Ein Plan zeigt dir, worauf du diese Woche wirklich achtest.',
  },
  {
    title: 'KEINE ENERGIE NACH DER ARBEIT?',
    trigger: 'Der Alltag verschiebt dein Training immer wieder nach hinten.',
    reframe: 'Ein alltagstauglicher Rahmen macht auch kurze Einheiten wertvoll.',
  },
  {
    title: 'DIÄT-FRUST?',
    trigger: 'Zu viele Regeln nehmen dir Energie statt sie dir zu geben.',
    reframe: 'Eine flexible Struktur schafft Klarheit, ohne dein Leben zu blockieren.',
  },
]

const pillars = [
  {
    number: '01',
    icon: Dumbbell,
    title: 'PROGRESSIVER\nKRAFTAUFBAU',
    label: 'Training, das Sinn ergibt',
    copy: 'Ein klarer Trainingsrahmen, der zu deinem Ziel, deinem Niveau und deinem Alltag passt.',
    image: '/assets/coaching-session.jpg',
    points: ['Struktur statt Zufall', 'Fortschritt nachvollziehen', 'Technik im Fokus'],
  },
  {
    number: '02',
    icon: Flame,
    title: 'FLEXIBLE\nERNÄHRUNG',
    label: 'Energie für das echte Leben',
    copy: 'Keine extreme Verbotsliste: Ernährung wird so aufgebaut, dass sie im Alltag Bestand haben kann.',
    image: '/assets/nutrition-prep.jpg',
    points: ['Alltagstaugliche Routinen', 'Klarheit statt Verzicht', 'Individuell einordnen'],
  },
  {
    number: '03',
    icon: HeartPulse,
    title: 'MENTALE\nSTÄRKE',
    label: 'Begleitung, wenn Motivation schwankt',
    copy: 'Fokus, Verbindlichkeit und ein System, das auch dann trägt, wenn die Woche nicht perfekt läuft.',
    image: '/assets/mindset-focus.jpg',
    points: ['Wöchentliche Reflexion', 'Realistische Anpassungen', 'Persönliche Accountability'],
  },
]

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function buildMailto(subject: string, rows: Array<[string, string]>) {
  const body = rows.map(([label, value]) => `${label}: ${value || '—'}`).join('\n')
  return `mailto:welcome@pctransformation.ch?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function App() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, reduceMotion ? 1 : 1.1])
  const heroTextY = useTransform(scrollYProgress, [0, 0.19], [0, reduceMotion ? 0 : -72])
  const heroMediaY = useTransform(scrollYProgress, [0, 0.22], [0, reduceMotion ? 0 : 56])
  const heroOrbitY = useTransform(scrollYProgress, [0, 0.2], [0, reduceMotion ? 0 : -112])
  const heroOrbitRotate = useTransform(scrollYProgress, [0, 0.2], [0, reduceMotion ? 0 : 18])
  const [menuOpen, setMenuOpen] = useState(false)
  const [calculator, setCalculator] = useState<CalculatorInput>({ ageBand: '30–39', goal: 'fat-loss', experience: 'building' })
  const [calculatorSubmitted, setCalculatorSubmitted] = useState(false)
  const [calcName, setCalcName] = useState('')
  const [calcEmail, setCalcEmail] = useState('')
  const [contactSent, setContactSent] = useState(false)

  const result = useMemo(() => getTimeline(calculator), [calculator])
  const reveal = (distance = 34, delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .22 },
    transition: { duration: reduceMotion ? 0 : .68, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  const handleCalculatorLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setCalculatorSubmitted(true)
    window.location.href = buildMailto('PCT Transformations-Orientierung', [
      ['Name', String(form.get('name') ?? '')],
      ['E-Mail', String(form.get('email') ?? '')],
      ['Altersgruppe', calculator.ageBand],
      ['Hauptziel', calculator.goal],
      ['Trainingserfahrung', calculator.experience],
      ['Orientierung', `${result.weeks} – ${result.title}`],
    ])
  }

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setContactSent(true)
    window.location.href = buildMailto('PCT Coaching-Anfrage', [
      ['Name', String(form.get('name') ?? '')],
      ['E-Mail', String(form.get('email') ?? '')],
      ['Telefon', String(form.get('phone') ?? '')],
      ['Ziel', String(form.get('goal') ?? '')],
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
          <a className="nav-book" href="#buchen" onClick={() => setMenuOpen(false)}>Termin buchen <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={21} /> : <Menu size={22} />}
        </button>
      </header>

      <section id="top" className="hero-section" aria-label="PCT Einstieg">
        <motion.div className="hero-media" style={{ scale: heroScale, y: heroMediaY }} aria-hidden="true">
          <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/assets/paul-scroll-frame-01-desktop.webp">
            <source src="https://res.cloudinary.com/dtzpydtdg/video/upload/v1787604728/VID_20260824_224948_886_herqd0.webm" type="video/webm" />
          </video>
          <div className="hero-grid" />
          <div className="hero-vignette" />
          <span className="hero-index">PCT / 01—04</span>
        </motion.div>
        <motion.div className="hero-orbit" style={{ y: heroOrbitY, rotate: heroOrbitRotate }} aria-hidden="true"><span /><span /><span /></motion.div>
        <motion.div className="hero-content" style={{ y: heroTextY }} initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .65, ease: [0.22, 1, 0.36, 1] }}>
          <p className="eyebrow"><span /> PERSONAL TRAINING · ERNÄHRUNG · MINDSET · MELLINGEN</p>
          <p className="hero-kicker">DEINE ENTSCHEIDUNG</p>
          <h1>TRANSFORMIERE<br />DEINEN KÖRPER.<br /><em>BEHERRSCHE<br />DEINEN GEIST.</em></h1>
          <p className="hero-lead">Individuelles Coaching für Menschen, die Kraft, Struktur und Gewohnheiten aufbauen möchten, die im Alltag Bestand haben.</p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={() => scrollToId('buchen')}>Jetzt Erstgespräch buchen <MoveRight size={18} /></button>
            <button className="button button-ghost" type="button" onClick={() => scrollToId('system')}>Das System entdecken</button>
          </div>
        </motion.div>
        <button className="scroll-cue" type="button" onClick={() => scrollToId('huerden')}>SCROLL TO START <ChevronDown size={17} /></button>
      </section>

      <section id="services" className="services-section section-shell" aria-labelledby="services-title">
        <div className="services-heading"><p className="eyebrow"><span /> Dein Weg mit PCT</p><h2 id="services-title">COACHING,<br /><em>DAS ZU DIR PASST.</em></h2><p>Wähle den Rahmen, in dem du deine Veränderung konsequent angehst.</p></div>
        <div className="services-grid">{services.map((service) => <article className="service-card" key={service.number}><div className="service-image"><img src={service.image} alt="" /></div><div className="service-card-content"><span className="service-number">{service.number}</span><p className="service-label">{service.label}</p><h3>{service.title}</h3><p className="service-lead">{service.lead}</p><p className="service-description">{service.description}</p><a className="service-link" href={service.link} target="_blank" rel="noopener noreferrer">{service.action} <ArrowUpRight size={16} /></a></div></article>)}</div>
        <div className="elfsight-app-92fadbe4-70c7-4e47-b6c6-70565f62f57c social-feed-embed" data-elfsight-app-lazy />
      </section>

      <section id="huerden" className="challenge-section section-shell motion-section challenge-motion-section">
        <div className="section-label"><span>01</span> DIE HÜRDEN</div>
        <div className="challenge-intro">
          <motion.div className="challenge-heading" {...reveal(28)}>
            <p className="eyebrow">Wenn der alte Plan nicht mehr trägt</p>
            <h2>DU BRAUCHST NICHT<br /><em>MEHR DRUCK.</em><br />DU BRAUCHST EIN SYSTEM.</h2>
          </motion.div>
          <motion.div className="challenge-intro-copy" {...reveal(28, .11)}>
            <p>Veränderung scheitert selten an einem einzelnen Training. Sie scheitert daran, dass der Plan nicht zum echten Alltag passt.</p>
            <div className="challenge-key"><span>KEINER</span><strong>der nächsten schnellen Lösungen</strong><span>SONDERN EIN RAHMEN, DER BLEIBT.</span></div>
          </motion.div>
        </div>
        <div className="challenge-stage">
          <motion.div className="challenge-portrait" initial={{ opacity: 0, scale: reduceMotion ? 1 : .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .6 }}>
            <img src="/assets/paul-scroll-frame-02-desktop.webp" alt="Paul Christian beim Training" />
            <div className="challenge-portrait-overlay" />
            <p><span>DER KREISLAUF</span>STARTEN · ABBRECHEN · NEU STARTEN</p>
          </motion.div>
          <div className="challenge-list">
          {challenges.map((challenge, index) => (
            <motion.article key={challenge.title} className="challenge-card" initial={{ opacity: 0, y: reduceMotion ? 0 : 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ delay: index * 0.08, duration: 0.48 }}>
              <span>0{index + 1}</span>
              <div className="challenge-main"><h3>{challenge.title}</h3><p>{challenge.trigger}</p></div>
              <div className="challenge-reframe"><span>NEUER BLICK</span><strong>{challenge.reframe}</strong></div>
            </motion.article>
          ))}
          </div>
        </div>
        <motion.div className="challenge-resolution" {...reveal(30)}>
          <p className="eyebrow"><span /> Der PCT Unterschied</p>
          <p>Statt Training, Ernährung und Kopf getrennt zu behandeln, verbindet PCT diese drei Ebenen zu einem Weg, den du verstehen und umsetzen kannst.</p>
          <button className="text-link" type="button" onClick={() => scrollToId('system')}>Zum PCT-System <MoveRight size={17} /></button>
        </motion.div>
      </section>

      <section id="system" className="system-section motion-section system-motion-section">
        <div className="system-sticky section-shell">
          <motion.div className="system-heading" {...reveal(38)}>
            <p className="eyebrow">Der PCT Ansatz</p>
            <h2>PAULS<br /><em>TRANSFORMATIONS-</em><br />SYSTEM.</h2>
            <p>Drei Perspektiven, die zusammen einen realistischen und konsequenten Weg nach vorn bilden.</p>
            <span className="system-line" />
          </motion.div>
          <div className="pillar-stack">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon
              return (
                <motion.article className="pillar-card" key={pillar.number} initial={{ opacity: 0, y: reduceMotion ? 0 : 44, x: reduceMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: reduceMotion ? 0 : .62, delay: reduceMotion ? 0 : index * .1, ease: [0.22, 1, 0.36, 1] }} whileHover={reduceMotion ? undefined : { y: -5 }}>
                  <div className="pillar-visual"><img src={pillar.image} alt="" /><span>{pillar.number}</span></div>
                  <div className="pillar-copy">
                    <div className="pillar-topline"><Icon size={18} aria-hidden="true" /><p>{pillar.label}</p></div>
                    <h3>{pillar.title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h3>
                    <p className="pillar-description">{pillar.copy}</p>
                    <ul>{pillar.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="rechner" className="calculator-section section-shell motion-section calculator-motion-section">
        <motion.div className="calculator-copy" {...reveal(38)}>
          <p className="eyebrow">Transformations-Orientierung</p>
          <h2>DEIN START.<br /><em>DEIN RHYTHMUS.</em></h2>
          <p>Erhalte eine unverbindliche Orientierung, welcher Zeitrahmen für dein Ziel sinnvoll sein könnte. Keine Diagnose, kein Versprechen – nur ein klarer Startpunkt für das Gespräch.</p>
          <div className="calculator-disclaimer"><ShieldCheck size={18} /><span>Deine Angaben dienen nur der Orientierung und sind nicht medizinisch.</span></div>
        </motion.div>
        <motion.div className="calculator-panel" {...reveal(44, .12)}>
          <div className="calculator-step"><span>01</span><p>DEINE AUSGANGSLAGE</p></div>
          <div className="field-grid">
            <label>Altersgruppe<select value={calculator.ageBand} onChange={(event) => setCalculator((state) => ({ ...state, ageBand: event.target.value }))}><option>18–29</option><option>30–39</option><option>40–49</option><option>50+</option></select></label>
            <label>Trainingserfahrung<select value={calculator.experience} onChange={(event) => setCalculator((state) => ({ ...state, experience: event.target.value as Experience }))}><option value="start">Ich starte neu</option><option value="building">Ich trainiere bereits</option><option value="trained">Ich trainiere fortgeschritten</option></select></label>
          </div>
          <fieldset><legend>Hauptziel</legend><div className="goal-buttons">{([['fat-loss', 'Fettverlust'], ['muscle', 'Muskelaufbau'], ['vitality', 'Vitalität']] as Array<[Goal, string]>).map(([value, label]) => <button type="button" className={calculator.goal === value ? 'goal-selected' : ''} onClick={() => setCalculator((state) => ({ ...state, goal: value }))} key={value}>{label}</button>)}</div></fieldset>
          <motion.div key={result.weeks} className="timeline-result" initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}><p>DEINE ORIENTIERUNG</p><strong>{result.weeks}</strong><span>{result.title}</span><small>{result.description}</small></motion.div>
          <form className="calculator-lead" onSubmit={handleCalculatorLead}>

            <p>Optional: Orientierung an dich senden</p>
            <div className="field-grid"><label>Name<input required value={calcName} onChange={(event) => setCalcName(event.target.value)} placeholder="Dein Name" /></label><label>E-Mail<input required type="email" value={calcEmail} onChange={(event) => setCalcEmail(event.target.value)} placeholder="name@beispiel.ch" /></label></div>
            <label className="consent"><input type="checkbox" required /> <span>Ich möchte die Orientierung per E-Mail erhalten und bin mit der Kontaktaufnahme dazu einverstanden.</span></label>
            <button className="button button-primary" type="submit">Orientierung anfragen <ArrowDownRight size={18} /></button>
          {calculatorSubmitted && <p className="form-notice"><CircleCheck size={17} />Danke. Die Datenbankanbindung wird in der separat provisionierten Paul-Webapp aktiviert; bis dahin buchst du dein Erstgespräch direkt über den Terminbutton.</p>}
          </form>
        </motion.div>
      </section>

      <section id="paul" className="paul-section section-shell motion-section paul-motion-section">
        <motion.div className="paul-photo" {...reveal(40)}><motion.img src="/assets/paul-portrait.jpg" alt="Paul Christian" initial={{ scale: reduceMotion ? 1 : 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: .3 }} transition={{ duration: reduceMotion ? 0 : 1.15, ease: [0.22, 1, 0.36, 1] }} /><div className="photo-note"><span>PCT</span><p>MELLINGEN<br />SWITZERLAND</p></div></motion.div>
        <motion.div className="paul-copy" {...reveal(40, .12)}>
          <p className="eyebrow">Vision</p>
          <h2>PAUL<br /><em>CHRISTIAN.</em></h2>
          <p>Meine persönliche Transformationsreise begann 2014. Auf der Suche nach Identität und Selbstwert habe ich zahlreiche Trainings-, Ernährungs- und Persönlichkeitsentwicklungskonzepte durchlaufen – bis mir klar wurde, dass nachhaltige Veränderung mehr braucht als einen gesunden Körper. Heute bin ich ein selbstbewusster, körperlich fitter und mental stärkerer Mann, der gelernt hat, Körper, Geist und Seele in Balance zu bringen. Diese persönliche Erfahrung ist die Grundlage meiner Arbeit als Coach.</p>
          <p>Meine Mission ist es, Menschen auf ihrer persönlichen Transformationsreise zu begleiten und ihnen zu helfen, ihre beste Version zu entwickeln – mit mehr Gesundheit, Selbstvertrauen, Disziplin und Lebensqualität. Ich gebe dir keinen simplen Trainings- oder Ernährungsplan, sondern helfe dir, nachhaltige Gewohnheiten und einen Lebensstil aufzubauen, den du langfristig leben kannst.</p>
          <ul className="paul-credentials">
            <li><strong>Seit 2017</strong><span>Coaching-Erfahrung</span></li>
            <li><strong>400+</strong><span>begleitete Klient:innen</span></li>
            <li><strong>15+ Jahre</strong><span>eigene Trainingserfahrung</span></li>
            <li><strong>SNBF</strong><span>Vizemeister 2017</span></li>
            <li><strong>IFBB</strong><span>Schweizer Juniorenmeister 2018</span></li>
            <li><strong>SAFS / Clever Fit</strong><span>Fitness- &amp; Ernährungsausbildung, B-Lizenz</span></li>
          </ul>
          <p className="paul-note">Für mich ist Coaching mehr als ein Beruf – es ist eine Berufung, Menschen ganzheitlich auf ihrem Weg zu begleiten. Wer mehr über meine Werte und mein Engagement über das Training hinaus erfahren möchte, findet dies unter <a href="/themen">Themen</a>.</p>
          <button type="button" className="text-link" onClick={() => scrollToId('buchen')}>Erstgespräch buchen <MoveRight size={17} /></button>
        </motion.div>
      </section>

      <section id="buchen" className="booking-section section-shell motion-section booking-motion-section">
        <motion.div className="booking-heading" {...reveal(34)}><p className="eyebrow">Dein nächster Schritt</p><h2>WÄHLE DEINEN<br /><em>TERMINWEG.</em></h2><p>Die Buchung öffnet sich direkt bei Wix. Dort wählst du Datum und Uhrzeit – ohne Wix-Navigation innerhalb dieser Website.</p></motion.div>
        <motion.div className="booking-grid" {...reveal(38, .1)}>
          <motion.a whileHover={reduceMotion ? undefined : { y: -6, x: 3 }} whileTap={{ scale: .98 }} className="booking-card primary-booking" href={FIRST_CALL_LINK} target="_blank" rel="noopener noreferrer"><span>01</span><div><CalendarDays size={22} /><h3>ONLINE ERSTGESPRÄCH</h3><p>Dein unverbindlicher Start in die Transformation.</p></div><ArrowUpRight /></motion.a>
          <motion.a whileHover={reduceMotion ? undefined : { y: -6, x: 3 }} whileTap={{ scale: .98 }} className="booking-card" href={BOOTCAMP_LINK} target="_blank" rel="noopener noreferrer"><span>02</span><div><Sparkles size={22} /><h3>FIT FOR CHRIST BOOTCAMP</h3><p>Deinen Platz im nächsten Bootcamp sichern.</p></div><ArrowUpRight /></motion.a>
        </motion.div>
      </section>

      <section id="kontakt" className="contact-section section-shell motion-section contact-motion-section">
        <motion.div {...reveal(34)}><p className="eyebrow">Noch Fragen?</p><h2>SCHREIB<br /><em>PAUL.</em></h2><p>Wenn du vor dem Termin noch etwas klären möchtest, sende eine kurze Nachricht. Dein E-Mail-Programm öffnet sich mit einer vorausgefüllten Anfrage.</p><a href="mailto:welcome@pctransformation.ch">welcome@pctransformation.ch</a></motion.div>
        <motion.form className="contact-form" onSubmit={handleContact} {...reveal(40, .12)}>
          <label>Name<input required name="name" placeholder="Dein Name" /></label>
          <div className="field-grid"><label>E-Mail<input required type="email" name="email" placeholder="name@beispiel.ch" /></label><label>Telefon <small>optional</small><input name="phone" type="tel" placeholder="+41 …" /></label></div>
          <label>Wobei darf Paul dich unterstützen?<textarea required name="goal" rows={5} placeholder="Beschreibe kurz dein Ziel oder deine Frage." /></label>
          <label className="consent"><input type="checkbox" required /> <span>Ich bin damit einverstanden, dass Paul meine Angaben zur Bearbeitung meiner Anfrage verwendet.</span></label>
          <button className="button button-primary" type="submit">Nachricht vorbereiten <MoveRight size={18} /></button>
          {contactSent && <p className="form-notice"><CircleCheck size={17} />Dein E-Mail-Programm sollte sich jetzt öffnen.</p>}
        </motion.form>
      </section>
      <motion.footer initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: reduceMotion ? 0 : .5 }}><span>© 2026 Paul Christian Transformation</span><span><a href="/services">Services</a> · <a href="/shop">Shop</a> · <a href="/themen">Themen</a> · <a href="/datenschutz">Datenschutz</a> · <a href="/impressum">Impressum</a> · <a href="/agb">AGB</a> · Mellingen · Schweiz</span><span>Website erstellt von <a href="https://wildwave.ch" target="_blank" rel="noopener noreferrer">WILDWAVE Marketing</a></span></motion.footer>
    </main>
  )
}

export default App
