export interface CareerPath {
  id: string;
  titleId: string;
  titleEn: string;
  roleId: string;
  roleEn: string;
  descId: string;
  descEn: string;
  color: string;
  badge: string;
  trackSlugs: string[];
}

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'fullstack-ts',
    titleId: 'Fullstack JavaScript & TypeScript Architect',
    titleEn: 'Fullstack JavaScript & TypeScript Architect',
    roleId: 'Fullstack Engineer',
    roleEn: 'Fullstack Engineer',
    descId: 'Dari pondasi HTML/CSS/JS modern, reaktivitas React & Next.js, backend Node.js, database PostgreSQL hingga orkestrasi Docker.',
    descEn: 'From modern HTML/CSS/JS, React & Next.js reactivity, Node.js backend, PostgreSQL database to Docker containerization.',
    color: '#3B82F6',
    badge: 'Paling Populer',
    trackSlugs: ['html5', 'css3', 'javascript', 'typescript', 'react', 'nextjs', 'nodejs', 'postgresql', 'docker'],
  },
  {
    id: 'backend-go',
    titleId: 'High-Performance Go Systems Engineer',
    titleEn: 'High-Performance Go Systems Engineer',
    roleId: 'Go Backend & Systems Engineer',
    roleEn: 'Go Backend & Systems Engineer',
    descId: 'Spesialis sistem konkurensi tinggi: arsitektur Go goroutines & channels, caching Redis, database PostgreSQL, dan kontainerisasi Docker.',
    descEn: 'High concurrency systems specialist: Go goroutines & channels, Redis caching, PostgreSQL database, and Docker containers.',
    color: '#00ADD8',
    badge: 'High Performance',
    trackSlugs: ['golang', 'postgresql', 'redis', 'docker'],
  },
  {
    id: 'python-backend',
    titleId: 'Modern Python & Backend Specialist',
    titleEn: 'Modern Python & Backend Specialist',
    roleId: 'Python Backend Developer',
    roleEn: 'Python Backend Developer',
    descId: 'Kuasai Python idiomatik, framework web Django, manipulasi data PostgreSQL, caching Redis, dan arsitektur production Docker.',
    descEn: 'Master idiomatic Python, Django web framework, PostgreSQL data manipulation, Redis caching, and production Docker architecture.',
    color: '#EAB308',
    badge: 'Data & Web',
    trackSlugs: ['python', 'django', 'postgresql', 'redis', 'docker'],
  },
  {
    id: 'enterprise-architect',
    titleId: 'Enterprise Backend Architect (.NET & Spring)',
    titleEn: 'Enterprise Backend Architect (.NET & Spring)',
    roleId: 'Enterprise Software Architect',
    roleEn: 'Enterprise Software Architect',
    descId: 'Arsitektur skala korporasi multi-tier: C# .NET atau Java Spring Boot, manajemen database MySQL, Redis, dan microservices Docker.',
    descEn: 'Corporate-grade multi-tier architecture: C# .NET or Java Spring Boot, MySQL database management, Redis, and Docker microservices.',
    color: '#8B5CF6',
    badge: 'Enterprise Grade',
    trackSlugs: ['csharp', 'spring', 'mysql', 'redis', 'docker'],
  },
  {
    id: 'frontend-specialist',
    titleId: 'Modern Reactive Frontend Engineer',
    titleEn: 'Modern Reactive Frontend Engineer',
    roleId: 'Senior Frontend Engineer',
    roleEn: 'Senior Frontend Engineer',
    descId: 'Spesialis UI performa tinggi: styling Tailwind CSS, state management React & Vue 3, reaktivitas Svelte, dan rendering Next.js SSR.',
    descEn: 'High-performance UI specialist: Tailwind CSS styling, React & Vue 3 state management, Svelte reactivity, and Next.js SSR rendering.',
    color: '#EC4899',
    badge: 'UI / UX Pro',
    trackSlugs: ['html5', 'css3', 'tailwind', 'javascript', 'typescript', 'react', 'nextjs', 'vue', 'svelte'],
  },
  {
    id: 'devops-cloud',
    titleId: 'DevOps & Cloud-Native Engineer',
    titleEn: 'DevOps & Cloud-Native Engineer',
    roleId: 'Cloud & DevOps Engineer',
    roleEn: 'Cloud & DevOps Engineer',
    descId: 'Fondasi infrastruktur modern: kontainerisasi Docker, optimasi database PostgreSQL & MySQL, in-memory Redis, dan API GraphQL.',
    descEn: 'Modern infrastructure foundation: Docker containerization, PostgreSQL & MySQL database tuning, in-memory Redis, and GraphQL APIs.',
    color: '#10B981',
    badge: 'Cloud & Infra',
    trackSlugs: ['docker', 'postgresql', 'mysql', 'redis', 'graphql'],
  },
];
