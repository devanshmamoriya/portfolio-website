import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar } from 'lucide-react'
import experience from '../data/experience'
import SectionHeading from './SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="py-24 lg:py-32 bg-mist-raised/60 dark:bg-void-raised/40">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />

        <div className="mt-14 relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-line-light dark:bg-line-dark hidden sm:block" />

          <div className="space-y-10">
            {experience.map((job, i) => (
              <motion.div
                key={job.company + job.duration}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative sm:pl-14"
              >
                <span className="hidden sm:flex absolute left-0 top-1 h-10 w-10 items-center justify-center rounded-full bg-signal/10 border border-signal/30 text-signal">
                  <Briefcase size={16} />
                </span>

                <div className="card p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink dark:text-white">
                        {job.role}
                      </h3>
                      <p className="text-signal font-medium mt-0.5">{job.company}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-xs font-mono text-muted-light dark:text-muted">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} /> {job.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} /> {job.location}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2">
                    {job.responsibilities.map((r) => (
                      <li key={r} className="flex gap-2.5 text-sm text-muted-light dark:text-muted leading-relaxed">
                        <span className="mt-2 h-1 w-1 rounded-full bg-signal shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.technologies.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
