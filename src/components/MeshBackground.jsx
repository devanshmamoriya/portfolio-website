import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Signature visual: a Thread-mesh-style node topology with traveling "packets"
// along its edges — directly inspired by the force-directed mesh visualizer
// built for the OTBR dashboard project. Not decoration: it's a literal picture
// of the kind of system this engineer builds and operates.

const NODES = [
  { id: 'n1', x: 60, y: 90 },
  { id: 'n2', x: 190, y: 40 },
  { id: 'n3', x: 320, y: 100 },
  { id: 'n4', x: 110, y: 200 },
  { id: 'n5', x: 260, y: 220 },
  { id: 'n6', x: 380, y: 190 },
  { id: 'n7', x: 200, y: 320 },
  { id: 'n8', x: 40, y: 260 },
]

const EDGES = [
  ['n1', 'n2'],
  ['n2', 'n3'],
  ['n1', 'n4'],
  ['n2', 'n5'],
  ['n3', 'n6'],
  ['n4', 'n5'],
  ['n5', 'n6'],
  ['n4', 'n8'],
  ['n5', 'n7'],
  ['n7', 'n8'],
]

function find(id) {
  return NODES.find((n) => n.id === id)
}

export default function MeshBackground({ className = '' }) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const packets = useMemo(
    () =>
      EDGES.map(([a, b], i) => ({
        id: `${a}-${b}`,
        from: find(a),
        to: find(b),
        delay: i * 0.6,
        duration: 3 + (i % 3),
      })),
    []
  )

  return (
    <svg
      viewBox="0 0 420 360"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g opacity="0.55">
        {EDGES.map(([a, b]) => {
          const from = find(a)
          const to = find(b)
          return (
            <line
              key={`${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-line-light dark:text-line-dark"
            />
          )
        })}
      </g>

      {!prefersReducedMotion &&
        packets.map((p) => (
          <motion.circle
            key={p.id}
            r="2.6"
            fill="#00D9A3"
            initial={{ cx: p.from.x, cy: p.from.y, opacity: 0 }}
            animate={{
              cx: [p.from.x, p.to.x, p.from.x],
              cy: [p.from.y, p.to.y, p.from.y],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

      {NODES.map((n, i) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r={i === 0 ? 6 : 4}
            fill={i === 0 ? '#FF9F43' : '#00D9A3'}
            opacity={i === 0 ? 0.95 : 0.85}
          />
          <circle
            cx={n.x}
            cy={n.y}
            r={i === 0 ? 11 : 8}
            fill="none"
            stroke={i === 0 ? '#FF9F43' : '#00D9A3'}
            strokeWidth="1"
            opacity="0.25"
          />
        </g>
      ))}
    </svg>
  )
}
