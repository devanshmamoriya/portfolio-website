import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import projects from '../data/projects'
import SectionHeading from './SectionHeading'
import ProjectModal from './ProjectModal'

const FILTERS = ['All', 'Java', 'Spring Boot', 'React', 'Microservices', 'Networking', 'Embedded', 'Full Stack', 'DevOps']

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category.includes(filter))),
    [filter]
  )

  return (
    <section id="projects" className="py-24 lg:py-32 bg-mist-raised/60 dark:bg-void-raised/40">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="A mix of backend microservices work and the networking / embedded tooling I build alongside it."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-mono transition-colors border ${
                filter === f
                  ? 'bg-signal text-void border-signal'
                  : 'border-line-light dark:border-line-dark text-ink/70 dark:text-fog/80 hover:border-signal hover:text-signal'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid sm:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="card p-6 sm:p-7 flex flex-col hover:border-signal/50 transition-colors duration-300"
              >
                <div className="flex flex-wrap gap-2">
                  {project.category.map((c) => (
                    <span key={c} className="chip !py-0.5">{c}</span>
                  ))}
                </div>

                <h3 className="mt-4 font-display text-xl font-semibold text-ink dark:text-white">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm text-muted-light dark:text-muted leading-relaxed flex-1">
                  {project.short}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="chip !text-[11px]">{t}</span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="chip !text-[11px]">+{project.technologies.length - 4}</span>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={() => setActive(project)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal hover:gap-2.5 transition-all"
                  >
                    View Architecture <ArrowUpRight size={15} />
                  </button>
                  <div className="flex items-center gap-3 text-ink/50 dark:text-fog/60">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} on GitHub`} className="hover:text-signal transition-colors">
                      <Github size={17} />
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} live demo`} className="hover:text-signal transition-colors">
                      <ExternalLink size={17} />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
