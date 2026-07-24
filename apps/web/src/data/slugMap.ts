export const SLUG_MAP: Record<string, string> = {
  'tryngo-lang-html5': 'html5',
  'tryngo-lang-css3': 'css3',
  'tryngo-lang-javascript': 'javascript',
  'tryngo-lang-typescript': 'typescript',
  'tryngo-lang-golang': 'golang',
  'tryngo-lang-nextjs': 'nextjs',
  'tryngo-lang-python': 'python',
  'tryngo-lang-react': 'react',
  'tryngo-lang-vue': 'vue',
  'tryngo-lang-rust': 'rust',
  'tryngo-lang-docker': 'docker',
  'tryngo-lang-nodejs': 'nodejs',
  'tryngo-lang-angular': 'angular',
  'tryngo-lang-svelte': 'svelte',
  'tryngo-lang-php': 'php',
  'tryngo-lang-laravel': 'laravel',
  'tryngo-lang-rails': 'rails',
  'tryngo-lang-postgresql': 'postgresql',
  'tryngo-lang-graphql': 'graphql',
  'tryngo-lang-csharp': 'csharp',
  'tryngo-lang-spring': 'spring',
  'tryngo-lang-codeigniter': 'codeigniter',
  'tryngo-lang-mysql': 'mysql',
  'tryngo-lang-mongodb': 'mongodb',
  'tryngo-lang-redis': 'redis',
  'tryngo-lang-django': 'django',
  'tryngo-lang-nestjs': 'nestjs',
};

export const REVERSE_SLUG_MAP: Record<string, string> = {};
for (const [key, val] of Object.entries(SLUG_MAP)) {
  REVERSE_SLUG_MAP[val] = key;
}
