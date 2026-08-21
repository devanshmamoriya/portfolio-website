import { Github, Linkedin, Code2, FileText, Newspaper } from 'lucide-react'
import profile from '../data/profile'

const NAV = ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Blog', 'Contact']

const SOCIAL = [
  { label: 'GitHub', href: profile.social.github, icon: Github },
  { label: 'LinkedIn', href: profile.social.linkedin, icon: Linkedin },
  { label: 'LeetCode', href: profile.social.leetcode, icon: Code2 },
  { label: 'GeeksforGeeks', href: profile.social.geeksforgeeks, icon: FileText },
  { label: 'Medium', href: profile.social.medium, icon: Newspaper },
]

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="border-t border-line-light dark:border-line-dark py-14">
      <div className="container-px mx-auto max-w-6xl grid sm:grid-cols-3 gap-10">
        <div>
          <p className="font-display font-semibold text-lg text-ink dark:text-white">
            {profile.name}
          </p>
          <p className="text-sm text-muted-light dark:text-muted mt-1">{profile.role}</p>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-wide text-muted-light dark:text-muted mb-3">Navigate</p>
          <ul className="space-y-2">
            {NAV.map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-sm text-ink/70 dark:text-fog/80 hover:text-signal transition-colors"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-wide text-muted-light dark:text-muted mb-3">Social</p>
          <div className="flex flex-wrap gap-3">
            {SOCIAL.map((s) => {
              const Icon = s.icon
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-light dark:border-line-dark text-ink/70 dark:text-fog/80 hover:text-signal hover:border-signal transition-colors"
                >
                  <Icon size={16} />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div className="container-px mx-auto max-w-6xl mt-10 pt-6 border-t border-line-light dark:border-line-dark flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-light dark:text-muted font-mono">
        <p>&copy; 2026 {profile.name}</p>
        <p>Built with React</p>
      </div>
    </footer>
  )
}
