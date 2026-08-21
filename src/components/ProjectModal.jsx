import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink } from 'lucide-react'
import { useEffect } from 'react'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} details`}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-2xl max-h-[88vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-mist-raised dark:bg-void-raised border border-line-light dark:border-line-dark p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-lg border border-line-light dark:border-line-dark text-ink dark:text-white hover:border-signal hover:text-signal transition-colors"
            >
              <X size={16} />
            </button>

            <p className="section-eyebrow">{project.category.join(' · ')}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-ink dark:text-white pr-10">
              {project.name}
            </h3>

            <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-light dark:text-muted">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wide text-signal mb-1.5">Problem</h4>
                <p>{project.problem}</p>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wide text-signal mb-1.5">Solution</h4>
                <p>{project.solution}</p>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wide text-signal mb-1.5">Architecture</h4>
                <p>{project.architectureNote}</p>
              </div>
              {project.integrations && (
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wide text-signal mb-1.5">Integrations</h4>
                  <p>{project.integrations}</p>
                </div>
              )}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wide text-signal mb-2">Key Features</h4>
                <ul className="space-y-1.5">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 rounded-full bg-signal shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                <Github size={15} /> GitHub
              </a>
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                <ExternalLink size={15} /> Live Demo
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
