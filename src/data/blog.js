// Placeholder / demo articles — these do not exist externally yet.
// Once you publish real posts (e.g. on Medium), replace `url` with the live link
// and set `external: true` so "Read More" opens it in a new tab.
const blog = [
  {
    id: 'jvm-architecture',
    title: 'Understanding JVM Architecture',
    category: 'Java',
    description: 'A walkthrough of class loading, the runtime data areas, and how the JIT compiler turns bytecode into fast native code.',
    readingTime: '7 min read',
    date: 'Draft',
    tags: ['Java', 'JVM'],
  },
  {
    id: 'spring-boot-microservices-explained',
    title: 'Spring Boot Microservices, Explained',
    category: 'Spring Boot',
    description: 'What actually changes when you split a Spring Boot monolith into services — boundaries, contracts, and the operational cost you take on.',
    readingTime: '9 min read',
    date: 'Draft',
    tags: ['Spring Boot', 'Microservices'],
  },
  {
    id: 'how-rest-apis-work',
    title: 'How REST APIs Actually Work',
    category: 'System Design',
    description: 'Resources, verbs, and status codes — and the design decisions that separate a clean REST API from a leaky one.',
    readingTime: '6 min read',
    date: 'Draft',
    tags: ['REST', 'System Design'],
  },
  {
    id: 'java-memory-management',
    title: 'Java Memory Management, In Practice',
    category: 'Java',
    description: 'Heap generations, garbage collection strategies, and the memory bugs that show up in production Spring Boot services.',
    readingTime: '8 min read',
    date: 'Draft',
    tags: ['Java', 'Performance'],
  },
  {
    id: 'openwrt-architecture-explained',
    title: 'OpenWrt Architecture Explained',
    category: 'OpenWrt',
    description: 'How OpenWrt structures its packages, UCI config system, and network stack on top of embedded Linux.',
    readingTime: '10 min read',
    date: 'Draft',
    tags: ['OpenWrt', 'Embedded Linux'],
  },
  {
    id: 'openthread-otbr-architecture',
    title: 'OpenThread and OTBR Architecture',
    category: 'OpenThread',
    description: 'How a Thread Border Router bridges a low-power mesh network to IP, and what that means for building tools on top of it.',
    readingTime: '9 min read',
    date: 'Draft',
    tags: ['OpenThread', 'Networking'],
  },
  {
    id: 'docker-for-java-developers',
    title: 'Docker for Java Developers',
    category: 'DevOps',
    description: 'A practical guide to containerizing Spring Boot services — image layers, JVM tuning inside containers, and compose setups for local dev.',
    readingTime: '7 min read',
    date: 'Draft',
    tags: ['Docker', 'Java'],
  },
]

export default blog

export const blogCategories = ['All', ...new Set(blog.map((b) => b.category))]
