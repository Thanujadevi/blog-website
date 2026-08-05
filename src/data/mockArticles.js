export const INITIAL_CATEGORIES = [
  { id: 'programming', name: 'Programming', icon: 'Code', color: 'from-blue-500 to-cyan-500', count: 12 },
  { id: 'ai', name: 'Artificial Intelligence', icon: 'Cpu', color: 'from-purple-500 to-indigo-500', count: 10 },
  { id: 'science', name: 'Science', icon: 'Atom', color: 'from-emerald-500 to-teal-500', count: 8 },
  { id: 'technology', name: 'Technology', icon: 'Smartphone', color: 'from-sky-500 to-blue-600', count: 15 },
  { id: 'history', name: 'History', icon: 'Landmark', color: 'from-amber-500 to-orange-500', count: 7 },
  { id: 'health', name: 'Health', icon: 'HeartPulse', color: 'from-rose-500 to-pink-500', count: 9 },
  { id: 'productivity', name: 'Productivity', icon: 'Zap', color: 'from-violet-500 to-purple-600', count: 11 },
  { id: 'business', name: 'Business', icon: 'TrendingUp', color: 'from-blue-600 to-indigo-700', count: 6 },
  { id: 'space', name: 'Space', icon: 'Rocket', color: 'from-indigo-600 to-sky-700', count: 7 },
  { id: 'general', name: 'General Knowledge', icon: 'Globe', color: 'from-teal-500 to-emerald-600', count: 14 }
];

export const INITIAL_ARTICLES = [
  {
    id: 'art-1',
    title: 'Why JavaScript Event Loop Doesn’t Freeze Your Browser',
    slug: 'javascript-event-loop-explained',
    summary: 'Discover how JavaScript executes asynchronous code smoothly despite being single-threaded.',
    content: `JavaScript is inherently single-threaded, meaning it can only execute one command at a time on its main thread. How then can a web page make HTTP requests, stream videos, and respond to user clicks all at once without freezing the interface?

The secret lies in the Event Loop working alongside Web APIs, the Callback Queue, and the Microtask Queue. When you perform an asynchronous task like a fetch call or setTimeout, the browser delegates this operation to C++ web APIs running in the background.

Once the background task completes, its callback function is pushed to the task queue. Meanwhile, synchronous code continues executing on the Call Stack. The Event Loop constantly monitors the Call Stack. As soon as the stack becomes completely empty, the Event Loop takes the first callback from the microtask queue (e.g. Promises) or task queue and pushes it onto the Call Stack to execute.

Understanding this mechanism is fundamental to avoiding blocking the main thread. Heavy computations can be broken down using requestAnimationFrame or offloaded to Web Workers, keeping your web applications lightning-fast and responsive for all users.`,
    category: 'Programming',
    readTime: '1 min read',
    wordCount: 182,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    author: {
      id: 'author-1',
      name: 'Aarav Sharma',
      role: 'Principal Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-08-01T10:00:00Z',
    likes: 412,
    bookmarksCount: 98,
    tags: ['JavaScript', 'WebDev', 'Async', 'Frontend'],
    featured: true,
    trending: true,
    comments: [
      {
        id: 'c1',
        userName: 'Ananya Deshmukh',
        userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        content: 'This single minute read explained event loop clearer than a 20-minute video tutorial!',
        createdAt: '2026-08-02T14:20:00Z'
      },
      {
        id: 'c2',
        userName: 'Rohan Gupta',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        content: 'Crucial distinction between microtasks and macrotasks!',
        createdAt: '2026-08-03T09:15:00Z'
      }
    ]
  },
  {
    id: 'art-2',
    title: 'How Transformer Models Transformed Modern AI',
    slug: 'transformer-models-explained',
    summary: 'The breakthrough architecture behind ChatGPT, Gemini, and modern generative AI explained in 60 seconds.',
    content: `Before 2017, natural language processing relied heavily on Recurrent Neural Networks (RNNs). RNNs processed text sequentially, word by word, making training slow and losing context over long passages.

Everything changed with the seminal research paper "Attention Is All You Need", introducing the Transformer architecture. Instead of sequential processing, Transformers analyze an entire sequence simultaneously using a mechanism called Self-Attention.

Self-attention allows every word in a sentence to dynamically calculate context weights relative to every other word. For instance, in "The animal didn't cross the street because it was too tired", the model connects "it" directly to "animal" rather than "street".

Furthermore, because Transformers process data in parallel, they leverage modern GPU clusters efficiently. This parallel processing capability unlocked massive scaling, directly enabling today's Large Language Models like Gemini and GPT-4.`,
    category: 'Artificial Intelligence',
    readTime: '1 min read',
    wordCount: 156,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    author: {
      id: 'author-2',
      name: 'Dr. Priya Ananth',
      role: 'Lead AI Research Scientist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-08-03T14:30:00Z',
    likes: 589,
    bookmarksCount: 165,
    tags: ['AI', 'MachineLearning', 'Transformers', 'DeepLearning'],
    featured: false,
    trending: true,
    comments: [
      {
        id: 'c3',
        userName: 'Vikram Malhotra',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
        content: 'Fascinating breakdown of self-attention mechanism!',
        createdAt: '2026-08-04T11:00:00Z'
      }
    ]
  },
  {
    id: 'art-3',
    title: 'The Pomodoro Technique: Maximizing Focus in 25 Minutes',
    slug: 'pomodoro-technique-guide',
    summary: 'Beat procrastination and avoid cognitive burnout with structured 25-minute focus intervals.',
    content: `Developed by Francesco Cirillo in the late 1980s, the Pomodoro Technique is one of the simplest yet most powerful productivity frameworks ever created. The core principle rests on human attention spans: sustained focus declines after 25 to 30 minutes of continuous effort.

Here is the exact framework: Select a task, set a timer for 25 minutes (one Pomodoro), and work with absolute focus until the timer chimes. No emails, no phone checks, no multi-tasking.

When the timer rings, take a mandatory 5-minute break. Step away from your desk, stretch, or grab water. Repeat this cycle four times, then take a longer 15-to-30-minute restorative rest.

The brilliance of Pomodoro is psychological: it turns daunting projects into manageable 25-minute sprints. By granting your brain frequent scheduled breaks, you dramatically reduce mental fatigue while keeping deep focus sharp throughout your workday.`,
    category: 'Productivity',
    readTime: '1 min read',
    wordCount: 154,
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    author: {
      id: 'author-3',
      name: 'Vikram Malhotra',
      role: 'Productivity & Leadership Coach',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-08-04T08:15:00Z',
    likes: 310,
    bookmarksCount: 110,
    tags: ['Productivity', 'Focus', 'TimeManagement', 'Mindset'],
    featured: false,
    trending: true,
    comments: []
  },
  {
    id: 'art-4',
    title: 'James Webb Telescope: Peer Into the Early Universe',
    slug: 'james-webb-telescope-discoveries',
    summary: 'How infrared light allows JWST to capture galaxies formed over 13.5 billion years ago.',
    content: `The James Webb Space Telescope (JWST) orbits the Sun at Lagrange Point 2, approximately 1.5 million kilometers from Earth. Unlike Hubble, which observes primarily in visible light, JWST operates in the infrared spectrum.

Why is infrared crucial? As the universe expands, light emitted by the earliest stars and galaxies billions of years ago gets stretched into longer, redder wavelengths—a phenomenon known as cosmological redshift.

Equipped with a gold-coated beryllium mirror measuring 6.5 meters across, JWST can penetrate thick cosmic dust clouds that block visible light. This enables astronomers to observe galaxy formation as early as 200 million years after the Big Bang.

JWST is also spectrally analyzing the atmospheres of distant exoplanets, searching for chemical signatures like water vapor, carbon dioxide, and methane that could indicate potentially habitable worlds beyond our solar system.`,
    category: 'Space',
    readTime: '1 min read',
    wordCount: 152,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    author: {
      id: 'author-4',
      name: 'Kavya Iyer',
      role: 'Astrophysicist & Space Scholar',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-08-02T18:40:00Z',
    likes: 465,
    bookmarksCount: 128,
    tags: ['Space', 'Astronomy', 'JWST', 'Physics'],
    featured: false,
    trending: false,
    comments: []
  },
  {
    id: 'art-5',
    title: 'The Science of Sleep Hygiene & Circadian Rhythms',
    slug: 'science-of-sleep-hygiene',
    summary: 'Optimize your sleep architecture through light exposure, temperature control, and evening routines.',
    content: `Sleep is not a passive resting state; it is an active, vital neurological process during which your brain clears metabolic waste through the glymphatic system and consolidates memory.

Your sleep-wake cycle is governed by your circadian rhythm, anchored by the suprachiasmatic nucleus in your brain. Morning sunlight triggers cortisol release, setting your internal timer. 14 hours later, the pineal gland secretes melatonin to induce drowsiness.

To optimize your sleep quality: First, view bright outdoor light within 30 minutes of waking. Second, avoid blue screen light and heavy meals 2 hours before bedtime, as blue wavelengths suppress melatonin production.

Finally, lower your bedroom temperature to around 18°C (65°F). Your core body temperature must drop by roughly 1°C to initiate deep, restful slow-wave sleep.`,
    category: 'Health',
    readTime: '1 min read',
    wordCount: 142,
    coverImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    author: {
      id: 'author-5',
      name: 'Ananya Deshmukh',
      role: 'Neuroscientist & Wellness Researcher',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-08-01T12:00:00Z',
    likes: 380,
    bookmarksCount: 92,
    tags: ['Health', 'Sleep', 'Wellness', 'Science'],
    featured: false,
    trending: false,
    comments: []
  },
  {
    id: 'art-6',
    title: 'What is Quantum Supremacy?',
    slug: 'quantum-supremacy-explained',
    summary: 'How quantum qubits harness superposition and entanglement to solve problems classic supercomputers cannot.',
    content: `Classical computers store information in binary bits: either 0 or 1. Quantum computers, however, utilize qubits that leverage quantum mechanical principles—superposition and entanglement.

Superposition enables a qubit to exist in a complex state of 0 and 1 simultaneously until measured. Entanglement links multiple qubits so that the state of one instantaneously influences another, regardless of distance.

Quantum supremacy occurs when a quantum processor executes a specific calculation that would take the world’s fastest classical supercomputers thousands of years to compute.

While practical fault-tolerant quantum computing is still evolving, potential applications span drug discovery by simulating molecular interactions, optimizing global supply chains, and revolutionizing cryptography.`,
    category: 'Science',
    readTime: '1 min read',
    wordCount: 122,
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    author: {
      id: 'author-1',
      name: 'Aarav Sharma',
      role: 'Principal Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-07-29T15:00:00Z',
    likes: 245,
    bookmarksCount: 78,
    tags: ['Quantum', 'Physics', 'Computing', 'Tech'],
    featured: false,
    trending: false,
    comments: []
  }
];

export const TOP_CONTRIBUTORS = [
  {
    id: 'author-1',
    name: 'Aarav Sharma',
    role: 'Principal Systems Architect',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    articlesCount: 14,
    totalLikes: 1650,
    badge: '🏆 Top Author'
  },
  {
    id: 'author-2',
    name: 'Dr. Priya Ananth',
    role: 'Lead AI Research Scientist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    articlesCount: 12,
    totalLikes: 1480,
    badge: '🧠 AI Pioneer'
  },
  {
    id: 'author-3',
    name: 'Vikram Malhotra',
    role: 'Productivity Coach',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    articlesCount: 10,
    totalLikes: 1120,
    badge: '⚡ Focus Guru'
  },
  {
    id: 'author-4',
    name: 'Kavya Iyer',
    role: 'Astrophysicist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    articlesCount: 9,
    totalLikes: 980,
    badge: '🚀 Space Scholar'
  }
];
