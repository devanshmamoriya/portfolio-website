import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Sun, Moon, Laptop, Download } from 'lucide-react'
import profile from '../data/profile'
import useTheme from '../hooks/useTheme'
import useScrollSpy from '../hooks/useScrollSpy'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

const THEME_ICONS = { light: Sun, dark: Moon, system: Laptop }

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, cycleTheme } = useTheme()
  const activeId = useScrollSpy(LINKS.map((l) => l.id))
  const ThemeIcon = THEME_ICONS[theme]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNavClick = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-mist/85 dark:bg-void/85 backdrop-blur-md border-b border-line-light dark:border-line-dark'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="container-px mx-auto flex h-16 max-w-6xl items-center justify-between">
        <button
          onClick={() => handleNavClick('home')}
          className="font-display font-semibold text-lg text-ink dark:text-white"
          aria-label="Go to home section"
        >
          <span className="text-signal">&lt;</span>DM<span className="text-signal">/&gt;</span>
        </button>

        <ul className="hidden lg:flex items-center gap-1">
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeId === link.id
                    ? 'text-signal'
                    : 'text-ink/70 dark:text-fog/80 hover:text-ink dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={cycleTheme}
            aria-label={`Theme: ${theme}. Click to change.`}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-light dark:border-line-dark text-ink/70 dark:text-fog/80 hover:text-signal hover:border-signal transition-colors"
          >
            <ThemeIcon size={16} />
          </button>
          <a
            href={profile.resumeUrl}
            download
            className="btn-primary !px-4 !py-2 text-sm"
          >
            <Download size={15} />
            Resume
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={cycleTheme}
            aria-label={`Theme: ${theme}. Click to change.`}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-light dark:border-line-dark text-ink/70 dark:text-fog/80"
          >
            <ThemeIcon size={16} />
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-light dark:border-line-dark text-ink dark:text-white"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-mist dark:bg-void border-b border-line-light dark:border-line-dark"
          >
            <ul className="container-px mx-auto max-w-6xl py-3 flex flex-col">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full text-left px-2 py-3 text-base font-medium border-b border-line-light/60 dark:border-line-dark/60 last:border-0 ${
                      activeId === link.id ? 'text-signal' : 'text-ink dark:text-fog'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href={profile.resumeUrl}
                  download
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  <Download size={15} />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
