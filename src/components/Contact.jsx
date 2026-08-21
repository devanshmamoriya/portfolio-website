import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Copy, Check, Send, Loader2 } from 'lucide-react'
import profile from '../data/profile'
import SectionHeading from './SectionHeading'

const initialForm = { name: '', email: '', subject: '', message: '' }

// Set these from your EmailJS dashboard (Email Services / Email Templates / Account > API Keys).
// Read from a .env file so real keys never get committed — see .env.example.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!form.subject.trim()) errors.subject = 'Subject is required.'
  if (!form.message.trim()) {
    errors.message = 'Message is required.'
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.'
  }
  return errors
}

export default function Contact() {
  const formRef = useRef(null)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [copied, setCopied] = useState(false)

  const isConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    if (!isConfigured) {
      // EmailJS keys aren't set yet — see the README / .env.example.
      console.warn('EmailJS is not configured. Add VITE_EMAILJS_* keys to your .env file.')
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      setStatus('sent')
      setForm(initialForm)
    } catch (err) {
      console.error('EmailJS send failed:', err)
      setStatus('error')
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable — fail silently, the email is still visible.
    }
  }

  const inputClass = (field) =>
    `w-full rounded-xl bg-mist dark:bg-void border px-4 py-3 text-sm text-ink dark:text-white placeholder:text-muted-light/60 dark:placeholder:text-muted/60 focus:outline-none focus:border-signal transition-colors ${
      errors[field] ? 'border-red-400' : 'border-line-light dark:border-line-dark'
    }`

  return (
    <section id="contact" className="py-24 lg:py-32 bg-mist-raised/60 dark:bg-void-raised/40">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great together"
          description="Have a role, a project, or just want to talk shop about microservices and mesh networks? Reach out."
        />

        <div className="mt-12 grid lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="card p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-wide text-muted-light dark:text-muted">Email</p>
                <p className="mt-1 text-sm text-ink dark:text-white">{profile.email}</p>
              </div>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-light dark:border-line-dark text-ink/70 dark:text-fog/80 hover:text-signal hover:border-signal transition-colors"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>
            <div className="card p-5">
              <p className="text-xs font-mono uppercase tracking-wide text-muted-light dark:text-muted">Location</p>
              <p className="mt-1 text-sm text-ink dark:text-white">{profile.location}</p>
            </div>
            <div className="card p-5">
              <p className="text-xs font-mono uppercase tracking-wide text-muted-light dark:text-muted">Response Time</p>
              <p className="mt-1 text-sm text-ink dark:text-white">Usually within a couple of days</p>
            </div>
          </motion.div>

          <motion.form
            ref={formRef}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-3 card p-6 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wide text-muted-light dark:text-muted mb-2">
                  Name
                </label>
                {/* name="name" must match the {{name}} variable in your EmailJS template */}
                <input id="name" name="name" value={form.name} onChange={handleChange} className={inputClass('name')} placeholder="Your name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
                {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wide text-muted-light dark:text-muted mb-2">
                  Email
                </label>
                {/* name="email" is used by EmailJS as the Reply-To address if your template is set up for it */}
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={inputClass('email')} placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
                {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-wide text-muted-light dark:text-muted mb-2">
                Subject
              </label>
              <input id="subject" name="subject" value={form.subject} onChange={handleChange} className={inputClass('subject')} placeholder="What's this about?" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'subject-error' : undefined} />
              {errors.subject && <p id="subject-error" className="mt-1.5 text-xs text-red-400">{errors.subject}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wide text-muted-light dark:text-muted mb-2">
                Message
              </label>
              <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} className={inputClass('message')} placeholder="Tell me a bit about the opportunity or project..." aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
              {errors.message && <p id="message-error" className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
            </div>

            <button type="submit" disabled={status === 'sending'} className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed">
              {status === 'sending' ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message <Send size={15} />
                </>
              )}
            </button>

            {status === 'sent' && (
              <p className="text-sm text-signal" role="status">
                Message sent — thanks for reaching out. I'll get back to you soon.
              </p>
            )}
            {status === 'error' && !isConfigured && (
              <p className="text-sm text-amber" role="status">
                EmailJS isn't configured yet. Add your Service ID, Template ID, and Public Key to a
                <code className="mx-1 font-mono">.env</code> file — see the README.
              </p>
            )}
            {status === 'error' && isConfigured && (
              <p className="text-sm text-red-400" role="status">
                Something went wrong sending your message. Please try again, or email me directly at {profile.email}.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
