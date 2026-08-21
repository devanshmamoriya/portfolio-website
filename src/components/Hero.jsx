import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin, Newspaper } from 'lucide-react'
import profile from '../data/profile'
import MeshBackground from './MeshBackground'

const TERMINAL_LINES = [
  { prompt: '$ whoami', output: profile.name },
  { prompt: '$ role', output: profile.role },
  { prompt: '$ experience', output: profile.experienceYears.toLowerCase() },
  { prompt: '$ stack', output: 'Java · Spring Boot · React · MySQL' },
]

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid-light dark:bg-grid-dark opacity-40"
        style={{ backgroundSize: '42px 42px' }}
        aria-hidden="true"
      />
      <div className="container-px mx-auto max-w-6xl relative grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-eyebrow"
          >
            {profile.experienceYears} · {profile.role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-4 font-display font-semibold text-4xl sm:text-5xl xl:text-6xl leading-[1.08] text-ink dark:text-white"
          >
            Hi, I&apos;m {profile.name.split(' ')[0]}.
            <br />
            I build backend systems that <span className="text-signal">hold up</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-6 text-lg text-muted-light dark:text-muted max-w-lg leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button onClick={() => scrollTo('projects')} className="btn-primary">
              View My Work
              <ArrowRight size={16} />
            </button>
            <button onClick={() => scrollTo('contact')} className="btn-secondary">
              Contact Me
            </button>
            <a href={profile.resumeUrl} download className="btn-secondary">
              <Download size={15} />
              Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex items-center gap-4"
          >
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="text-ink/60 dark:text-fog/70 hover:text-signal transition-colors">
              <Github size={20} />
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="text-ink/60 dark:text-fog/70 hover:text-signal transition-colors">
              <Linkedin size={20} />
            </a>
            <a href={profile.social.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium profile" className="text-ink/60 dark:text-fog/70 hover:text-signal transition-colors">
              <Newspaper size={20} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-6 text-ink/40 dark:text-white/40">
            <MeshBackground className="w-full h-full" />
          </div>

          <div className="relative card p-5 sm:p-6 font-mono text-sm shadow-xl shadow-black/5 dark:shadow-black/40">
            <div className="flex items-center gap-1.5 pb-3 mb-3 border-b border-line-light dark:border-line-dark">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
              <span className="ml-3 text-xs text-muted">devansh@portfolio ~</span>
            </div>
            {TERMINAL_LINES.map((line, i) => (
              <div key={line.prompt} className="mb-2 last:mb-0">
                <p className="text-signal">{line.prompt}</p>
                <p className="text-ink/80 dark:text-fog/90 pl-1">
                  {line.output}
                  {i === TERMINAL_LINES.length - 1 && (
                    <span className="inline-block w-2 h-4 bg-signal ml-1 align-middle animate-blink" />
                  )}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
