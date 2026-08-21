import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ArrowUpRight } from 'lucide-react'
import blog, { blogCategories } from '../data/blog'
import SectionHeading from './SectionHeading'

export default function Blog() {
  const [filter, setFilter] = useState('All')
  const [openPost, setOpenPost] = useState(null)

  const visible = useMemo(
    () => (filter === 'All' ? blog : blog.filter((b) => b.category === filter)),
    [filter]
  )

  return (
    <section id="blog" className="py-24 lg:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Writing"
          title="From the blog"
          description="Draft topics I'm working through — these are placeholders until they're published on Medium."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {blogCategories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-1.5 text-xs font-mono transition-colors border ${
                filter === c
                  ? 'bg-signal text-void border-signal'
                  : 'border-line-light dark:border-line-dark text-ink/70 dark:text-fog/80 hover:border-signal hover:text-signal'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((post) => (
              <motion.article
                layout
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="card p-6 flex flex-col hover:border-signal/50 transition-colors duration-300"
              >
                <span className="chip !py-0.5 self-start">{post.category}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink dark:text-white leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted-light dark:text-muted leading-relaxed flex-1">
                  {post.description}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs font-mono text-muted-light dark:text-muted">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} /> {post.readingTime}
                  </span>
                  <span>{post.date}</span>
                </div>
                <button
                  onClick={() => setOpenPost(post)}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-signal hover:gap-2.5 transition-all self-start"
                >
                  Read More <ArrowUpRight size={15} />
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {openPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
            onClick={() => setOpenPost(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full rounded-2xl bg-mist-raised dark:bg-void-raised border border-line-light dark:border-line-dark p-7"
            >
              <span className="chip">{openPost.category}</span>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink dark:text-white">
                {openPost.title}
              </h3>
              <p className="mt-3 text-sm text-muted-light dark:text-muted leading-relaxed">
                {openPost.description}
              </p>
              <p className="mt-4 text-xs font-mono text-amber">
                This article is a draft placeholder — it hasn't been published yet.
              </p>
              <button onClick={() => setOpenPost(null)} className="btn-secondary mt-5 text-sm">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
