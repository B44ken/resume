export type Contact = { id: string, href: string, label: string }

export type SectionBlock = { id: string, kind: 'section', title: string }
export type EntryBlock = { id: string, kind: 'entry', company: string, title: string, dates: string, link: string, bullets: string[] }
export type SkillBlock = { id: string, kind: 'skill', title: string, skills: string }
export type Block = SectionBlock | EntryBlock | SkillBlock

export type ResumeData = { name: string, info: Contact[], blocks: Block[] }

export type Bounds = { min: number, max: number }
export type FitLimits = { fontSize: Bounds, lineHeight: Bounds }

// the automatic fit walks each value in these increments
export const FONT_STEP = 0.25
export const LINE_STEP = 0.01

// how far the inputs let the bounds themselves be moved, so a stray keystroke
// cannot make the resume unreadable
export const FONT_BOUNDS: Bounds = { min: 6, max: 32 }
export const LINE_BOUNDS: Bounds = { min: 0.8, max: 2.5 }

export const defaultFit = (): FitLimits => ({
  fontSize: { min: 10, max: 16 },
  lineHeight: { min: 1.15, max: 1.5 },
})

export const newId = () =>
  `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

export const emptySection = (): SectionBlock => ({ id: newId(), kind: 'section', title: 'New Section' })

export const emptyEntry = (): EntryBlock =>
  ({ id: newId(), kind: 'entry', company: 'Company', title: 'Title', dates: 'Dates', link: '', bullets: ['Describe what you did'] })

export const emptySkill = (): SkillBlock => ({ id: newId(), kind: 'skill', title: 'Category', skills: 'Skills' })

const section = (title: string): SectionBlock => ({ id: newId(), kind: 'section', title })

const entry = (company: string, bullets: string[] = [], opts: Partial<EntryBlock> = {}): EntryBlock =>
  ({ id: newId(), kind: 'entry', company, title: '', dates: '', link: '', bullets, ...opts })

const skill = (title: string, skills: string): SkillBlock => ({ id: newId(), kind: 'skill', title, skills })

const contact = (label: string, href: string): Contact => ({ id: newId(), label, href })

export const defaultResume = (): ResumeData => ({
  name: 'Bradley Boratto',
  info: [
    contact('github/b44ken', 'https://github.com/b44ken'),
    contact('boratto.ca', 'https://boratto.ca'),
    contact('226 961 6479', 'tel:2269616479'),
    contact('brad@boratto.ca', 'mailto:brad@boratto.ca'),
  ],
  blocks: [
    section('Education'),
    entry('University of Toronto', [], { title: 'Bachelor of Science, Computer Science & Physics Majors', dates: 'Expected Apr 2027' }),

    section('Experience'),
    entry('RIIS', [
      'Built drone remote controller completely from scratch with custom PCB and case as well as software',
      'Designed efficient C++ firmware (on 2KB RAM, 16MHz CPU) based on asynchronous event loop',
      'Communicated directly with clients to make design choices and iterate based on feedback',
    ], { title: 'Software Engineering Intern', dates: 'May 2025 - Aug 2025' }),

    entry('Watoga Technologies', [
      'Used Python to process 440MB of poorly formatted rock samples, cleanup, and add to SQL database',
      'Multithreaded code to solve file parsing library bottleneck (7.6x speedup)',
      'Built Scipy/Matplotlib models to find mineral rich deposits, using 2D and 3D visualizations to prove accuracy',
    ], { title: 'Riipen Intern', dates: 'Feb 2025 - Mar 2025' }),

    entry('Optimotive', [
      'Primary engineer of an industrial cleaning robot prototype (programming, fabrication, & electronics)',
      'Programmed subsystems (ex. depth cameras), interfacing with our robot chassis via its Linux computer',
      'Reverse engineered undocumented motor controller protocols to support game controller input',
    ], { title: 'Robotics Intern', dates: 'Jan 2023 - May 2023' }),

    section('Extracurricular'),
    entry('UofT Autonomous Scale Racing', [
      'Firmware development, electronics, etc... in production of an autonomously driving 1/10th scale RC car',
    ], { title: 'Team Member', dates: 'Nov 2024 - Present' }),

    entry('CS Games', [
      'Selected by university to participate in 3 days of pair competitive-programming style challenges',
      'Won "High-Performance Computing", best performance optimizing an ML framework in C++ & WebGPU',
    ], { title: 'Participant/Winner', dates: 'Mar 2024' }),

    section('Projects'),
    entry('microgpt (live demo)', [
      'Interactive GPT-like small LLM in the browser via TensorFlow.js. Learns to generate names from 30k samples. Users can visualize model architecture, weights, and activations as it runs. 70k views on Hacker News.',
    ], { link: 'https://microgpt.boratto.ca' }),

    entry('finetune (github)', [
      'Finetuned Qwen 14B on personal chat data (250+ samples) using Unsloth, runs locally via Ollama',
      'Built Chrome extension to feed model output as input events to Discord; supports extensible app targets',
    ], { link: 'https://github.com/b44ken/finetune' }),

    entry('reactutor (live demo)', [
      'AI tutor. Users upload course materials so Gemini understands the course, which serves targeted long-form practice problems to help them learn, via spaced repetition. I use this to help me study.',
    ], { link: 'https://reactutor.boratto.ca' }),

    entry('wasm67 (github)', [
      'WASM4 virtual console runtime (Rust) for Raspberry Pi Pico. Implements framebuffer, input, and system calls',
    ], { link: 'https://github.com/b44ken/wasm67' }),

    entry('gloom (live demo)', [
      'WinHacks 2025 talk: built a raycasting engine and game from scratch with participants in one hour',
    ], { link: 'https://boratto.ca/doom' }),

    entry('onef (github)', [
      'Deep learning framework in plain C++. Supports inference, training (SGD & backprop) for sequential networks. Solves MNIST, XOR, etc.',
    ], { link: 'https://github.com/b44ken/onef#onef' }),

    section('Technical Skills'),
    skill('Languages', 'C, C++, C#, Rust, Go, Python, HTML, CSS, JavaScript, Java, Bash'),
    skill('Developer Tools', 'React, Tailwind, Firebase, Unity, MongoDB, SQL, Git, Docker'),
    skill('Other', 'Fusion 360, 3D Printing, Linux, Embedded Systems, Arduino, ESP32'),
  ],
})

const STORAGE_KEY = 'resume.data.v1'
const FIT_KEY = 'resume.fit.v1'

const str = (value: unknown, fallback = '') => typeof value === 'string' ? value : fallback

const parseBlock = (raw: unknown): Block | null => {
  if (typeof raw !== 'object' || raw === null) return null
  const block = raw as Record<string, unknown>
  const id = str(block.id) || newId()

  if (block.kind === 'section')
    return { id, kind: 'section', title: str(block.title) }

  if (block.kind === 'skill')
    return { id, kind: 'skill', title: str(block.title), skills: str(block.skills) }

  if (block.kind === 'entry')
    return {
      id, kind: 'entry',
      company: str(block.company),
      title: str(block.title),
      dates: str(block.dates),
      link: str(block.link),
      bullets: Array.isArray(block.bullets) ? block.bullets.map(item => str(item)) : [],
    }

  return null
}

// resume data is user supplied (localStorage or an imported file), so every
// field is validated back into the shape the components expect
export const parseResume = (raw: unknown): ResumeData | null => {
  if (typeof raw !== 'object' || raw === null) return null
  const data = raw as Record<string, unknown>
  if (!Array.isArray(data.blocks)) return null

  return {
    name: str(data.name),
    info: Array.isArray(data.info)
      ? data.info.flatMap(item => {
        if (typeof item !== 'object' || item === null) return []
        const entry = item as Record<string, unknown>
        return [{ id: str(entry.id) || newId(), label: str(entry.label), href: str(entry.href) }]
      })
      : [],
    blocks: data.blocks.flatMap(block => {
      const parsed = parseBlock(block)
      return parsed ? [parsed] : []
    }),
  }
}

export const loadResume = (): ResumeData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return defaultResume()
    return parseResume(JSON.parse(stored)) ?? defaultResume()
  } catch {
    return defaultResume()
  }
}

export const saveResume = (data: ResumeData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // storage may be unavailable (private mode, quota); editing still works
  }
}

export const clearResume = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(FIT_KEY)
  } catch {
    // ignore
  }
}

export const clamp = (value: number, bounds: Bounds) => Math.min(bounds.max, Math.max(bounds.min, value))

// the bounds are user supplied too, so they are kept inside what the inputs
// allow and in the right order before anything is measured with them
const parseBounds = (raw: unknown, limits: Bounds, fallback: Bounds): Bounds => {
  const value = typeof raw === 'object' && raw !== null ? raw as Record<string, unknown> : {}
  const num = (candidate: unknown, other: number) =>
    typeof candidate === 'number' && Number.isFinite(candidate) ? clamp(candidate, limits) : other

  const min = num(value.min, fallback.min)
  return { min, max: Math.max(min, num(value.max, fallback.max)) }
}

export const parseFit = (raw: unknown): FitLimits => {
  const value = typeof raw === 'object' && raw !== null ? raw as Record<string, unknown> : {}
  const fallback = defaultFit()

  return {
    fontSize: parseBounds(value.fontSize, FONT_BOUNDS, fallback.fontSize),
    lineHeight: parseBounds(value.lineHeight, LINE_BOUNDS, fallback.lineHeight),
  }
}

export const loadFit = (): FitLimits => {
  try {
    const stored = localStorage.getItem(FIT_KEY)
    return stored ? parseFit(JSON.parse(stored)) : defaultFit()
  } catch {
    return defaultFit()
  }
}

export const saveFit = (limits: FitLimits) => {
  try {
    localStorage.setItem(FIT_KEY, JSON.stringify(limits))
  } catch {
    // storage may be unavailable (private mode, quota); editing still works
  }
}

const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:']

const hasScheme = (value: string) => /^[a-z][a-z\d+.-]*:/i.test(value)

// a plain email address, recognised without a backtracking regex
const isEmail = (value: string) => {
  const at = value.indexOf('@')
  if (at <= 0 || value.indexOf('@', at + 1) !== -1) return false
  if (/[\s:/]/.test(value)) return false

  const domain = value.slice(at + 1)
  return domain.length > 2 && domain.includes('.') && !domain.startsWith('.') && !domain.endsWith('.')
}

// only allow schemes that are safe to put in an href, so imported or pasted
// data can't smuggle in javascript: urls
export const safeHref = (href: string): string | undefined => {
  const value = href.trim()
  if (!value) return undefined
  if (value.startsWith('/') || value.startsWith('#')) return value
  if (isEmail(value)) return `mailto:${value}`

  const scheme = hasScheme(value)
  try {
    const url = new URL(scheme ? value : `https://${value}`)
    if (!ALLOWED_PROTOCOLS.includes(url.protocol)) return undefined
    // "Some Company" should stay plain text rather than become a link
    if (!scheme && !url.hostname.includes('.')) return undefined
    return url.href
  } catch {
    return undefined
  }
}
