import { motion } from 'framer-motion'
import skills from '../data/skills'
import SectionHeading from './SectionHeading'

export default function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="The stack I build with"
          description="Grouped by where they sit in the system, from data to interface — plus the networking and embedded work I do outside typical full-stack projects."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="card p-6 hover:border-signal/50 transition-colors duration-300"
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-signal">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
