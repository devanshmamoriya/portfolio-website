// Real projects, described honestly. Fill in GitHub / demo links when public.
const projects = [
  {
    id: 'airbnb-clone',
    name: 'Airbnb Clone — Spring Boot Microservices',
    category: ['Java', 'Spring Boot', 'Microservices'],
    short: 'A production-quality Airbnb clone built as a distributed system of Spring Boot microservices.',
    problem:
      'Model a real booking platform — users, listings, and reservations — as an independently deployable set of services rather than a monolith, while keeping each service testable and loosely coupled.',
    solution:
      'User, Listing, and Booking services are implemented as separate Spring Boot microservices, with a Payment Service planned as the next addition. The architecture is designed to span roughly 20 services as it grows.',
    architectureNote:
      'Each service follows SOLID principles directly in its design: dependency inversion through interfaces, single-responsibility enforced by extracting dedicated mappers, and the Open/Closed principle applied via the Specification pattern for flexible query logic.',
    features: [
      'Independently deployable User, Listing, and Booking services',
      'Defense-in-depth JWT validation across service boundaries',
      'Structured SLF4J logging for traceability across services',
      'JUnit 5 + Mockito unit tests and Spring Boot integration tests backed by H2',
    ],
    technologies: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'JUnit 5', 'Mockito', 'H2'],
    github: 'YOUR_GITHUB_PROJECT_URL',
    demo: 'YOUR_LIVE_DEMO_URL',
  },
  {
    id: 'notification-microservice',
    name: 'Notification Microservice',
    category: ['Java', 'Spring Boot', 'Microservices'],
    short: 'A standalone, Kafka-driven notification service designed to plug into existing Spring Boot systems.',
    problem:
      'Give multiple backend systems a single, reliable way to send notifications across channels without duplicating delivery logic — and without one failing notification provider taking down the whole flow.',
    solution:
      'A dedicated microservice listens on Kafka topics and dispatches notifications through a Strategy-pattern channel abstraction, so Email, Push, and SMS are interchangeable implementations behind one interface.',
    architectureNote:
      'Resilience4j circuit breakers and dead-letter queues isolate failing channels, and idempotency guards prevent duplicate sends on retry — the same properties a payments or booking system would need from a notification dependency.',
    features: [
      'Strategy-pattern dispatch across Email, Push, and SMS channels',
      'Dead-letter queues for messages that repeatedly fail delivery',
      'Resilience4j circuit breakers to isolate failing downstream providers',
      'Idempotency guards to prevent duplicate notifications on retry',
      'Docker Compose environment for local development',
    ],
    technologies: ['Java', 'Spring Boot', 'Kafka', 'Resilience4j', 'Docker Compose'],
    integrations: 'Integrated into both an E-Commerce Order Management system and a Healthcare Appointment Management system.',
    github: 'YOUR_GITHUB_PROJECT_URL',
    demo: 'YOUR_LIVE_DEMO_URL',
  },
  {
    id: 'otbr-dashboard',
    name: 'OTBR Dashboard',
    category: ['React', 'Networking', 'Embedded'],
    short: 'A frontend dashboard for an OpenThread Border Router (OTBR) REST API, including a live mesh topology view.',
    problem:
      'OTBR exposes a REST API for a Thread mesh network, but no visual way to see device state or how nodes in the mesh actually connect to each other.',
    solution:
      'Started as a single-file HTML prototype, then rebuilt as a full TypeScript / React 18 application with Zustand for state and TanStack React Query for data fetching against the OTBR REST API.',
    architectureNote:
      'The centerpiece is a custom force-directed SVG topology visualizer that renders the live mesh — nodes and links — directly from the router\u2019s reported network state, with a CORS proxy workaround to reach the device locally.',
    features: [
      'Custom force-directed SVG topology visualizer for the live Thread mesh',
      'TanStack React Query for resilient data fetching against the OTBR REST API',
      'Zustand for lightweight, predictable client state',
      'Iterated from a single-file HTML prototype to a typed React 18 app',
    ],
    technologies: ['React 18', 'TypeScript', 'Zustand', 'TanStack Query', 'SVG', 'OpenThread / OTBR'],
    github: 'YOUR_GITHUB_PROJECT_URL',
    demo: 'YOUR_LIVE_DEMO_URL',
  },
  {
    id: 'otns-performance-testing',
    name: 'OpenThread OTNS Performance Testing Framework',
    category: ['Networking', 'Embedded', 'DevOps'],
    short: 'A pytest-based performance testing framework for OpenThread network simulations, with 117+ test cases.',
    problem:
      'OpenThread\u2019s network simulator (OTNS) needed a repeatable, reportable way to validate mesh behavior under different topologies, loads, and failure conditions — not one-off manual runs.',
    solution:
      'Built a structured pytest framework spanning topology, resilience, payload, energy, security, QoS, and multicast test modules, with Allure for readable, shareable test reports.',
    architectureNote:
      'Screen capture wasn\u2019t reliable under Wayland for visualizing simulated topologies, so topology visualization was reimplemented using matplotlib as a dependable workaround.',
    features: [
      '117+ test cases across seven functional modules',
      'Allure reporting for readable pass/fail and trend visibility',
      'Matplotlib-based topology visualization workaround for Wayland',
      'Accompanying documentation on performance metrics and multi-site test architecture',
    ],
    technologies: ['Python', 'pytest', 'Allure', 'matplotlib', 'OpenThread / OTNS'],
    github: 'YOUR_GITHUB_PROJECT_URL',
    demo: 'YOUR_LIVE_DEMO_URL',
  },
  {
    id: 'job-search-automation',
    name: 'Job Search & Referral Automation Tooling',
    category: ['Java', 'React', 'Full Stack'],
    short: 'A small suite of tools for referral outreach and job-search automation, including a Gmail-integrated referral finder.',
    problem:
      'Finding the right people to ask for referrals, and following up with them, is repetitive and easy to let slip — worth automating like any other workflow.',
    solution:
      'Built a Gmail-integrated referral-finder app that drafts outreach messages, plus a Node.js / Express dashboard using LinkedIn OAuth 2.0 — built with honest handling of LinkedIn\u2019s API partner restrictions rather than working around them.',
    architectureNote:
      'An earlier version, "Job Mailer," was a Python Flask bulk-email tool integrated with Zoho Mail; after the Zoho REST attachment endpoint proved unreliable, delivery was switched to Zoho SMTP via smtplib.',
    features: [
      'Gmail-integrated referral finder with AI-drafted outreach messages',
      'LinkedIn OAuth 2.0 dashboard built in Node.js / Express',
      'CSV recipient import and resume attachments in the earlier Job Mailer tool',
      'Reusable, categorized referral message templates',
    ],
    technologies: ['Node.js', 'Express', 'Python', 'Flask', 'Gmail API', 'LinkedIn OAuth 2.0', 'Zoho SMTP'],
    github: 'YOUR_GITHUB_PROJECT_URL',
    demo: 'YOUR_LIVE_DEMO_URL',
  },
]

export default projects
