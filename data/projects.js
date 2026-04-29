// Real screenshots via Thum.io free CDN — no auth, cached server-side.
// To customize: replace `image` with a path to /public/images/projects/your-shot.jpg
const shot = (url, w = 1400, h = 900) =>
  `https://image.thum.io/get/width/${w}/crop/${h}/${url}`

export const projects = [
  {
    id: 'salesforce-ai',
    number: '01',
    title: 'AI-Powered Salesforce Assistant',
    subtitle: 'Agentic RAG · Locally-Hosted LLM',
    summary:
      'A locally-hosted Llama (via Ollama) autonomously selects between semantic doc search, code retrieval, or direct LLM response. LangChain AgentExecutor + ChromaDB.',
    tags: ['React', 'FastAPI', 'LangChain', 'Llama', 'ChromaDB'],
    year: '2025',
    role: 'Architect',
    live: 'https://salesforce-ai-assistance.vercel.app/',
    repo: 'https://github.com/ayushme1234/Salesforce_AI',
    image: shot('https://salesforce-ai-assistance.vercel.app/'),
    featured: true,
  },
  {
    id: 'quickride',
    number: '02',
    title: 'QuickRide OS',
    subtitle: 'A Salesforce Operating System',
    summary:
      'Salesforce-native OS for ride-hailing — driver onboarding, dispatch, surge pricing, settlements via custom objects, flows and LWC dashboards.',
    tags: ['Salesforce', 'LWC', 'Apex', 'Flows'],
    year: '2025',
    role: 'End-to-end',
    live: 'https://quickride-psi.vercel.app/',
    image: shot('https://quickride-psi.vercel.app/'),
  },
  {
    id: 'lwc-geek',
    number: '03',
    title: 'LWC Geek',
    subtitle: 'Interactive LWC Learning Platform',
    summary:
      '15 modules, a live LWC playground with iframe sandbox, multi-tab editor and an Apex code simulator with animated lifecycle diagrams.',
    tags: ['React', 'Prism.js', 'iframe Sandbox'],
    year: '2025',
    role: 'Designer & Engineer',
    live: 'https://lwcgeek.vercel.app/',
    image: shot('https://lwcgeek.vercel.app/'),
  },
  {
    id: 'admin-geek',
    number: '04',
    title: 'Salesforce Admin Mastery',
    subtitle: 'Admin Geek',
    summary:
      'Walkthroughs of OWD, sharing rules, profiles, validation logic, and reports/dashboards — designed to feel like a real admin sandbox.',
    tags: ['React', 'Salesforce Admin', 'Tailwind'],
    year: '2025',
    role: 'Solo Build',
    live: 'https://admin-geek.vercel.app/',
    image: shot('https://admin-geek.vercel.app/'),
  },
  {
    id: 'myntra-sf',
    number: '05',
    title: 'Myntra × Salesforce',
    subtitle: 'E-commerce on Salesforce',
    summary:
      'Myntra-style storefront wired to Salesforce Custom Objects + Apex REST. Product catalog, cart, order placement — all flowing through real Salesforce data.',
    tags: ['LWC', 'Apex REST', 'React', 'E-commerce'],
    year: '2025',
    role: 'Full-stack',
    live: 'https://myntraxsalesforce.vercel.app/',
    image: shot('https://myntraxsalesforce.vercel.app/'),
  },
  {
    id: 'eventhive',
    number: '06',
    title: 'EventHive',
    subtitle: 'Salesforce Event Management',
    summary:
      'End-to-end event CRM — custom objects (Event__c, Registration__c, Speaker__c), real-time seat tracking, screen flows, record-triggered flows, FLS-compliant Apex.',
    tags: ['LWC', 'Apex Triggers', 'Screen Flow', 'SFDX'],
    year: '2025',
    role: 'Architect',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'velocyte',
    number: '07',
    title: 'Velocyte',
    subtitle: 'Precision Typing Lab',
    summary:
      'Real-time WPM/accuracy tracking, dual themes (Minimal + Breach Mode with matrix rain & CRT scan-lines), Web Audio feedback, localStorage stats.',
    tags: ['React', 'Chart.js', 'Web Audio', 'Canvas'],
    year: '2024',
    role: 'Solo Build',
    live: 'https://velocyte.vercel.app/',
    image: shot('https://velocyte.vercel.app/'),
  },
  {
    id: 'es6-geek',
    number: '08',
    title: 'ES6 Geek',
    subtitle: 'Modern JavaScript Reference',
    summary:
      'Reference site for ES6+ — destructuring, modules, async/await, generators, proxies — with live code playgrounds for each feature.',
    tags: ['React', 'Vite', 'JavaScript'],
    year: '2024',
    role: 'Solo Build',
    live: 'https://es6geek.vercel.app/',
    image: shot('https://es6geek.vercel.app/'),
  },
  {
    id: 'js-geek',
    number: '09',
    title: 'JS Geek',
    subtitle: 'JavaScript Fundamentals, Visualized',
    summary:
      'Closures, hoisting, the event loop, prototypes — explained with interactive visualizations and step-through animations.',
    tags: ['React', 'SVG Animations', 'Tailwind'],
    year: '2024',
    role: 'Solo Build',
    live: 'https://js-geek.vercel.app/',
    image: shot('https://js-geek.vercel.app/'),
  },
]
