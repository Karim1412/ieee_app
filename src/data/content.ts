// ============================================================
//  IEEE EPI SB: ALL EDITABLE CONTENT LIVES IN THIS FILE
//  Images go in /public/images/... and are written here as /images/...
//  The extension must match the real file exactly (.jpg, .png, .webp),
//  and names are case-sensitive: Chair.JPG is NOT chair.jpg
// ============================================================

// ---------- NEXT EVENT (countdown) ----------
// Month is 0-based: 0 = January ... 9 = October
export const NEXT_EVENT = { name: 'IEEE Day', date: new Date(2026, 9, 15, 0, 0, 0) }

// ---------- LINKS ----------
export const REGISTRATION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd4MA0sYbJRtfGLxbXNgcKEBUZd17E7g3vCWciq0Irm22nj1w/viewform?usp=dialog'
export const CONTACT_EMAIL = 'karimthabet@ieee.org'
export const SOCIALS = [
  { label: 'Instagram', url: 'https://instagram.com/YOUR_PAGE' },   // TODO
  { label: 'Facebook', url: 'https://facebook.com/YOUR_PAGE' },     // TODO
  { label: 'LinkedIn', url: 'https://linkedin.com/company/YOUR_PAGE' }, // TODO
]

// ---------- ABOUT ----------
export const ABOUT_IEEE = {
  title: 'What is IEEE?',
  text: 'IEEE (Institute of Electrical and Electronics Engineers) is the world’s largest professional organization for technology and engineering. Its members (students, researchers and engineers) publish standards and research, run conferences and build careers together.',
  points: ['Global network of engineers and scientists', 'Access to research, standards and learning', 'Student chapters, competitions and leadership'],
}
export const ABOUT_SB = {
  title: 'What is IEEE EPI SB?',
  text: 'IEEE EPI SB is the IEEE Student Branch of EPI Digital School. We bring students together around technology, innovation and leadership through workshops, competitions and community events.', // TODO: your real text
}

// ---------- CHAPTERS ----------
export interface Chapter { id: string; name: string; full: string; logo: string; description: string; mission: string }
export const CHAPTERS: Chapter[] = [
  { id: 'ras', name: 'RAS', full: 'Robotics and Automation Society',
    logo: '/images/chapters/ras.png',
    description: 'explores robots, automation and embedded systems.',
    mission: 'help students build and program real robotic systems.' },
  { id: 'cs', name: 'CS', full: 'Computer Society',
    logo: '/images/chapters/cs.png',
    description: 'software, algorithms and computing technologies.',
    mission: 'grow coding and problem-solving skills.' },
  { id: 'cis', name: 'CIS', full: 'Computational Intelligence Society',
    logo: '/images/chapters/cis.png',
    description: 'AI, machine learning and data science.',
    mission: 'make AI accessible through hands-on projects.' },
  { id: 'ias', name: 'IAS', full: 'Industry Applications Society',
    logo: '/images/chapters/ias.png',
    description: 'industrial technology, energy and applied engineering.',
    mission: 'connect students with real industry practice.' },
  { id: 'wie', name: 'WIE', full: 'Women in Engineering',
    logo: '/images/chapters/wie.png',
    description: 'supports and inspires women in engineering and technology.',
    mission: 'build an inclusive community of future engineers.' },
]

// ---------- EVENTS ----------
// Each photo must be listed here, files are NOT detected automatically.
export interface EventItem { id: string; name: string; date: string; description: string; photos: string[] }
export const EVENTS: EventItem[] = [
  { id: 'ieee-day', name: 'IEEE Day', date: '15 October 2026',
    description: 'the yearly celebration of IEEE and the ways engineers and technology improve the world, with activities for our members.', // TODO
    photos: ['/images/events/ieee-day.jpg', '/images/events/ieee-day1.jpg', '/images/events/ieee-day2.jpg'] },
  { id: 'ieee-xtreme', name: 'IEEE Xtreme', date: '31 October 2026',
    description: 'a 24-hour global programming competition where student teams solve algorithmic problems.',
    photos: ['/images/events/ieee-xtreme1.jpg', '/images/events/ieee-xtreme2.jpg'] },
  { id: 'robostation', name: 'Robostation', date: 'Coming Soon',
    description: 'a robotics event with workshops, challenges and live demos.',
    photos: ['/images/events/robostation.jpg', '/images/events/robostation1.jpg'] },
  { id: 'mystery-night', name: 'Mystery Night', date: 'Coming Soon',
    description: 'a night of puzzles, clues and teamwork where teams race to solve the mystery.',
    photos: ['/images/events/mystery-night.jpg', '/images/events/mystery-night1.jpg'] },
  { id: 'hackarena', name: 'Hackarena', date: 'Coming Soon',
    description: 'a hackathon where teams build a working project in a limited time.',
    photos: ['/images/events/hackarena.jpg', '/images/events/hackarena1.jpg'] },
]

// ---------- OFFICERS ----------
// bio and link are optional. Use the real extension of each photo.
export interface Officer { role: string; name: string; photo: string; bio?: string; link?: string }
export const OFFICERS: Officer[] = [
  { role: 'Chair', name: 'Karim Thabet', photo: '/images/officers/chair.jpg' },
  { role: 'Vice Chair', name: 'Dhia Zrelli', photo: '/images/officers/vice-chair.jpg' },
  { role: 'Secretary', name: 'Sarah Farjallah', photo: '/images/officers/secretary.jpg' },
  { role: 'Treasurer', name: 'Rima Jaballah', photo: '/images/officers/treasurer.jpg' },
  { role: 'Webmaster', name: 'Radhi Tlili', photo: '/images/officers/webmaster.jpg' },
  { role: 'Media Manager', name: 'Ela ben Yahya', photo: '/images/officers/media-manager.jpg' },
  { role: 'Social Media Manager', name: 'Zaineb Rahall', photo: '/images/officers/social-media-manager.jpg' },
]

// ---------- AWARDS 2026 ----------
// Photos: /public/images/awards/. Use the real file extension.
export interface Award { rank: '1st' | '2nd' | '3rd'; title: string; photo: string }
export const AWARDS: Award[] = [
  { rank: '1st', title: '1st prize in CSTAM 2.0 technical challenge', photo: '/images/awards/cstam1.jpg' },
  { rank: '1st', title: '1st prize in Sumo Squid Robots 6.0', photo: '/images/awards/sumo.jpg' },
  { rank: '2nd', title: '2nd prize All Terrain Squid Robots 6.0', photo: '/images/awards/all-terrain-squid-6.jpg' },
  { rank: '2nd', title: '2nd prize All Terrain in Green Robot Challenge ITBS', photo: '/images/awards/itbs.jpg' },
  { rank: '3rd', title: '3rd prize All Terrain in FSM Robots', photo: '/images/awards/fsm.jpg' },
]

// ---------- UPCOMING NATIONAL EVENTS ----------
// Photos: /public/images/upcoming/. TODO: real dates and final descriptions.
export interface Upcoming { title: string; date: string; description: string; photo: string }
export const UPCOMING: Upcoming[] = [
  { title: 'TSYP 14', date: 'TODO: date', photo: '/images/upcoming/tsyp.jpg',
    description: 'A national congress for IEEE students and young professionals, with technical and non-technical challenges, talks and workshops, welcoming 1200+ students from across the country.' },
  { title: 'TRSYP 2.0', date: 'TODO: date', photo: '/images/upcoming/trsyp.jpg',
    description: 'A national student congress bringing together IEEE members for robotic competitions, technical sessions and networking, with challenges for every profile.' },
  { title: 'WIE ACT 5.0', date: 'TODO: date', photo: '/images/upcoming/wie-act.jpg',
    description: 'A national gathering led by IEEE Women in Engineering: inspiring speakers, hands-on technical challenges and non-technical activities open to hundreds of students.' },
  { title: 'CSTAM 3.0', date: 'TODO: date', photo: '/images/upcoming/cstam.jpg',
    description: 'The new edition of the CSTAM congress, a national event where student teams compete in computer society fields and connect with the IEEE community.' },
]

// ---------- INTERNATIONAL ----------
// Photos: /public/images/international/krakow/. Edit the text freely.
export const INTERNATIONAL = {
  heading: 'IEEE EPI SB shines internationally',
  title: 'R8 SYP Congress · Kraków, Poland 🇵🇱',
  date: 'July 2026',
  description: 'In July 2026, our Chair and Vice Chair earned fully funded grants to attend the IEEE Region 8 Student and Young Professionals (R8 SYP) Congress in Kraków, Poland. They represented IEEE EPI SB and Tunisia, shared our branch’s experience with IEEE volunteers from across the region, and came back with new ideas, connections and practices to strengthen our chapters and events.',
  photos: ['/images/international/1.jpg', '/images/international/2.jpg', '/images/international/3.jpg'],
}
