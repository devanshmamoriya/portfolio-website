import { motion } from 'framer-motion'
import profile from '../data/profile'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="Full stack, with a backend-first mindset"
        />

        <div className="mt-12 grid lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-5 text-muted-light dark:text-muted leading-relaxed"
          >
            <p>{profile.about.summary}</p>
            <p>{profile.about.approach}</p>
            <p>{profile.about.extra}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 gap-4 content-start"
          >
            {profile.stats.map((stat) => (
              <div key={stat.label} className="card p-5">
                <p className="font-display text-2xl font-semibold text-signal">{stat.value}</p>
                <p className="mt-1 text-xs font-mono uppercase tracking-wide text-muted-light dark:text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
