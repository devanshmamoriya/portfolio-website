import { motion } from 'framer-motion'
import { Github, Linkedin, Code2, FileText, Newspaper, ArrowUpRight } from 'lucide-react'
import profile from '../data/profile'

const LINKS = [
  { label: 'GitHub', desc: 'Code & repositories', href: profile.social.github, icon: Github },
  { label: 'LinkedIn', desc: 'Professional network', href: profile.social.linkedin, icon: Linkedin },
  { label: 'LeetCode', desc: 'Problem solving', href: profile.social.leetcode, icon: Code2 },
  { label: 'GeeksforGeeks', desc: 'Articles & practice', href: profile.social.geeksforgeeks, icon: FileText },
  { label: 'Medium', desc: 'Long-form writing', href: profile.social.medium, icon: Newspaper },
]

export default function FindMeOnline() {
  return (
    <section className="py-20 lg:py-24 border-t border-line-light dark:border-line-dark">
      <div className="container-px mx-auto max-w-6xl">
        <p className="section-eyebrow text-center">Elsewhere</p>
        <h2 className="section-title text-center">Find me online</h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {LINKS.map((link, i) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="card p-5 group hover:border-signal/50 transition-colors duration-300"
              >
                <div className="flex items-center justify-between">
                  <Icon size={20} className="text-signal" />
                  <ArrowUpRight size={15} className="text-muted-light dark:text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="mt-4 font-semibold text-sm text-ink dark:text-white">{link.label}</p>
                <p className="mt-1 text-xs text-muted-light dark:text-muted">{link.desc}</p>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
