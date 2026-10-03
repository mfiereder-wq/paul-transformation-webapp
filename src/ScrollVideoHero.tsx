import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring, type Variants } from 'framer-motion'
import { ChevronRight, PlayCircle } from 'lucide-react'
import './scrollVideoHero.css'

interface HeroChapter {
  id: string
  label: string
  eyebrow: string
  heading: ReactNode
  description: string
  media: { type: 'video'; src: string; poster: string } | { type: 'image'; src: string }
  cta: { label: string; href: string; external: boolean }
}

const FILM_GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`

function FilmGrain() {
  return (
    <div className="hero-scroll-grain" aria-hidden="true">
      <div className="hero-scroll-grain-noise" style={{ backgroundImage: FILM_GRAIN_URL }} />
    </div>
  )
}

export default function ScrollVideoHero({ bookingLink }: { bookingLink: string }) {
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const chapters: HeroChapter[] = [
    {
      id: '01',
      label: 'Personal Training',
      eyebrow: '01 / Personal Training',
      heading: <>ERREICHE DEINE<br />BESTE GESUNDHEIT<br /><em>UND ERLEBE DEIN<br />BESTES SELBST!</em></>,
      description: 'Mit ganzheitlichem Transformations-Coaching – zu mehr Gesundheit, Motivation, Energie und Balance im Leben.',
      media: {
        type: 'video',
        src: 'https://res.cloudinary.com/dtzpydtdg/video/upload/v1789407646/Trainer_coaching_client_in_gym_20260914193806_gavgg6.webm',
        poster: '/assets/paul-scroll-frame-02-desktop.webp',
      },
      cta: { label: 'Erstgespräch buchen', href: bookingLink, external: true },
    },
    {
      id: '02',
      label: 'Ernährung',
      eyebrow: '02 / Ernährung & Mindset',
      heading: <>ERNÄHRUNG<br /><em>& MINDSET</em></>,
      description: 'Energie, Fokus und neue Gewohnheiten. Eine flexible Strategie, die dich im Alltag unterstützt und Disziplin ohne unnötigen Druck aufbaut.',
      media: { type: 'image', src: '/assets/nutrition-prep.jpg' },
      cta: { label: 'Angebote entdecken', href: '#angebote', external: false },
    },
    {
      id: '03',
      label: 'Mindset & Fokus',
      eyebrow: '03 / Mindset & Fokus',
      heading: <>MINDSET<br /><em>& FOKUS</em></>,
      description: 'Fokus und Motivation, damit du auch dann dranbleibst, wenn der Alltag anspruchsvoll wird. Kleine, klare Schritte bauen Disziplin und Selbstkontrolle langfristig auf.',
      media: { type: 'image', src: 'https://res.cloudinary.com/dtzpydtdg/image/upload/v1789114354/Gemini_Generated_Image_3xiefh3xiefh3xie_wmh3f9.jpg' },
      cta: { label: 'Termin buchen', href: bookingLink, external: true },
    },
  ]

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const heroInView = useInView(containerRef)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const index = Math.round(latest * (chapters.length - 1))
      setActiveIndex(Math.min(Math.max(index, 0), chapters.length - 1))
    })
    return unsubscribe
  }, [scrollYProgress, chapters.length])

  const duration = reduceMotion ? 0 : 0.8
  const textContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
  }
  const textReveal: Variants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: '0%', opacity: 1, transition: { duration, ease: [0.16, 1, 0.3, 1] as const } },
  }
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration, delay: reduceMotion ? 0 : 0.4, ease: 'easeOut' } },
  }

  return (
    <section id="top" className="hero-scroll-section" aria-label="PCT Einstieg" ref={containerRef} style={{ height: `${chapters.length * 100}svh` }}>
      {/* 1. Sticky background: Video- und Bild-Crossfade */}
      <div className="hero-scroll-bg">
        {chapters.map((chapter, index) => (
          <motion.div
            key={chapter.id}
            className="hero-scroll-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === activeIndex ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 1.2, ease: 'easeInOut' }}
          >
            {chapter.media.type === 'video'
              ? <video src={chapter.media.src} poster={chapter.media.poster} autoPlay={!reduceMotion} muted loop playsInline preload="metadata" aria-hidden="true" />
              : <img src={chapter.media.src} alt="" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" aria-hidden="true" />}
          </motion.div>
        ))}
        <div className="hero-scroll-overlay" aria-hidden="true" />
        <FilmGrain />
      </div>

      {/* 2. Chapter-Navigation (fixed) */}
      <div className="hero-scroll-nav-wrap">
        <AnimatePresence>
          {heroInView && (
            <motion.div
              key="hero-scroll-nav"
              className="hero-scroll-nav"
              aria-hidden="true"
              initial={{ y: 100, opacity: 0, transition: { duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.5 } }}
              animate={{ y: 0, opacity: 1, transition: { duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.5 } }}
              exit={{ y: 100, opacity: 0, transition: { duration: reduceMotion ? 0 : 0.3, delay: 0 } }}
            >
              <div className="hero-scroll-nav-text">
                <span className="hero-scroll-nav-kicker">Kapitel {chapters[activeIndex].id}</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeIndex}
                    className="hero-scroll-nav-title"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25 }}
                  >
                    {chapters[activeIndex].label}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="hero-scroll-nav-ring">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <circle className="hero-scroll-ring-track" cx="24" cy="24" r="18" strokeWidth="2" fill="none" />
                  <motion.circle className="hero-scroll-ring-progress" cx="24" cy="24" r="18" strokeWidth="2" fill="none" strokeDasharray="113" style={{ pathLength: smoothProgress }} />
                </svg>
                <PlayCircle size={16} className="hero-scroll-nav-play" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Kapitel-Content (scrollt über den Hintergrund) */}
      <div className="hero-scroll-content">
        {chapters.map((chapter, index) => (
          <div className="hero-scroll-chapter" key={chapter.id}>
            <motion.div
              className="hero-scroll-chapter-inner"
              variants={textContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: '-20%' }}
            >
              <motion.div className="hero-scroll-eyebrow" variants={fadeIn}>
                <span className="hero-scroll-eyebrow-line" />
                <span>{chapter.eyebrow}</span>
              </motion.div>
              <div className="hero-scroll-title-mask">
                {index === 0
                  ? <motion.h1 className="hero-scroll-title" variants={textReveal}>{chapter.heading}</motion.h1>
                  : <motion.h2 className="hero-scroll-title" variants={textReveal}>{chapter.heading}</motion.h2>}
              </div>
              <motion.p className="hero-scroll-card" variants={fadeIn}>{chapter.description}</motion.p>
              <motion.a
                className="hero-scroll-cta"
                variants={fadeIn}
                whileHover={reduceMotion ? undefined : { scale: 1.05, x: 10 }}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                href={chapter.cta.href}
                target={chapter.cta.external ? '_blank' : undefined}
                rel={chapter.cta.external ? 'noopener noreferrer' : undefined}
              >
                <span className="hero-scroll-cta-circle"><span className="hero-scroll-cta-fill" /><ChevronRight size={20} className="hero-scroll-cta-icon" /></span>
                <span className="hero-scroll-cta-label">{chapter.cta.label}</span>
              </motion.a>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
