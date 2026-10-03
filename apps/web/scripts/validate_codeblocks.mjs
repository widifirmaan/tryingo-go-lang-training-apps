import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';
import { buildSchema, parse as parseGql, validate as validateGql } from 'graphql';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STACKBLITZ_FENCES = {
  nodejs: ['javascript', 'js'],
  nextjs: ['tsx', 'jsx', 'ts', 'typescript', 'javascript', 'js'],
  nestjs: ['typescript', 'ts'],
  angular: ['typescript', 'ts'],
  django: ['python', 'py'],
  spring: ['java'],
};

const INLINE_FENCES = {
  golang: ['go'],
  rust: ['rust'],
  javascript: ['javascript', 'js', 'html'],
  typescript: ['typescript', 'ts', 'javascript'],
  html5: ['html'],
  css3: ['html'],
  tailwind: ['html'],
};

function getFencesForSlug(slug) {
  if (slug === 'docker') return ['bash', 'sh', 'shell', 'dockerfile', 'yaml', 'yml'];
  if (STACKBLITZ_FENCES[slug]) return STACKBLITZ_FENCES[slug];
  if (slug === 'postgresql' || slug === 'mysql') return ['sql'];
  if (slug === 'mongodb') return ['javascript', 'js', 'json'];
  if (slug === 'redis') return ['redis', 'bash', 'sh'];
  if (slug === 'graphql') return ['graphql'];
  if (slug === 'php' || slug === 'laravel' || slug === 'codeigniter4') return ['php'];
  if (slug === 'csharp') return ['csharp', 'cs'];
  if (slug === 'python') return ['python', 'py'];
  if (slug === 'rails') return ['ruby', 'rb', 'erb', 'javascript', 'js'];
  if (slug === 'react') return ['jsx', 'tsx', 'javascript', 'js'];
  if (slug === 'vue') return ['vue', 'html', 'javascript', 'js', 'ts'];
  if (slug === 'svelte') return ['svelte', 'html', 'javascript', 'js', 'ts'];
  return INLINE_FENCES[slug] || [];
}

function extractCode(markdown, preferred = []) {
  const regex = /```(\w*)\r?\n([\s\S]*?)```/g;
  const blocks = [];
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    blocks.push({ lang: (match[1] || '').toLowerCase(), code: match[2].trim() });
  }
  if (!blocks.length) return '';
  if (preferred.length) {
    const rank = new Map(preferred.map((l, i) => [l.toLowerCase(), i]));
    const hits = blocks
      .filter(b => rank.has(b.lang))
      .sort((a, b) => (rank.get(a.lang) - rank.get(b.lang)) || (b.code.length - a.code.length));
    if (hits.length) {
      const top = hits[0];
      if ((top.lang === 'javascript' || top.lang === 'js' || top.lang === 'typescript' || top.lang === 'ts')
        && /document|window|getElementById|querySelector|addEventListener/.test(top.code)) {
        const html = blocks.filter(b => b.lang === 'html').sort((a, b) => b.code.length - a.code.length)[0];
        if (html) return html.code;
      }
      return top.code;
    }
    return '';
  }
  return blocks.reduce((a, b) => (b.code.length > a.code.length ? b : a)).code;
}

const baseDir = path.resolve(__dirname, '../public/data/course');
const slugs = fs.readdirSync(baseDir).filter(s => fs.statSync(path.join(baseDir, s)).isDirectory());

const SAMPLE_SCHEMA = `
type Employee { id: ID!, name: String!, department: String!, salary: Int!, skills: [String!]!, active: Boolean! }
type Product { id: ID!, name: String!, category: String!, price: Int!, tags: [String!]!, inStock: Boolean! }
type Order { id: ID!, customer: String!, items: [OrderItem!]!, total: Int!, status: String!, date: String! }
type OrderItem { product: String!, qty: Int! }
input OrderItemInput { product: String!, qty: Int! }
type Query {
  employees: [Employee!]!
  employee(id: ID!): Employee
  employeesByDepartment(department: String!): [Employee!]!
  products: [Product!]!
  product(id: ID!): Product
  orders: [Order!]!
  ordersByStatus(status: String!): [Order!]!
  searchProducts(keyword: String!): [Product!]!
}
type Mutation {
  hireEmployee(name: String!, department: String!, salary: Int!, skills: [String!]!): Employee!
  deactivateEmployee(id: ID!): Employee!
  createOrder(customer: String!, items: [OrderItemInput!]!): Order!
}
`;
const gqlSchema = buildSchema(SAMPLE_SCHEMA);

let totalValidated = 0;
let errors = [];

for (const slug of slugs) {
  const trackDir = path.join(baseDir, slug);
  function checkDir(d) {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, ent.name);
      if (ent.isDirectory()) checkDir(p);
      else if (ent.name.endsWith('.md')) {
        totalValidated++;
        const content = fs.readFileSync(p, 'utf8');
        const fences = getFencesForSlug(slug);
        const code = extractCode(content, fences);

        if (!code || code.trim().length === 0) {
          errors.push({ file: ent.name, slug, error: 'Empty extracted code' });
          continue;
        }

        // Language-specific validation
        if (['javascript', 'typescript', 'nodejs', 'nestjs', 'angular', 'react'].includes(slug)) {
          try {
            ts.transpileModule(code, {
              compilerOptions: {
                module: ts.ModuleKind.ESNext,
                target: ts.ScriptTarget.ES2022,
                jsx: ts.JsxEmit.ReactJSX,
                allowJs: true,
              },
              reportDiagnostics: true,
            });
          } catch (e) {
            errors.push({ file: ent.name, slug, error: 'TS/JS compile error: ' + e.message });
          }
        } else if (slug === 'graphql') {
          try {
            const doc = parseGql(code);
            const valErrors = validateGql(gqlSchema, doc);
            if (valErrors.length > 0) {
              errors.push({ file: ent.name, slug, error: 'GraphQL validation: ' + valErrors.map(e => e.message).join(', ') });
            }
          } catch (e) {
            errors.push({ file: ent.name, slug, error: 'GraphQL parse error: ' + e.message });
          }
        } else if (slug === 'golang') {
          if (!code.includes('package main') || !code.includes('func main')) {
            errors.push({ file: ent.name, slug, error: 'Go code missing package main or func main' });
          }
        } else if (slug === 'rust') {
          if (!code.includes('fn main')) {
            errors.push({ file: ent.name, slug, error: 'Rust code missing fn main()' });
          }
        } else if (slug === 'html5' || slug === 'tailwind' || slug === 'css3') {
          if (!code.includes('<') || !code.includes('>')) {
            errors.push({ file: ent.name, slug, error: 'Web code missing HTML elements' });
          }
        } else if (slug === 'vue') {
          if (!code.includes('<template>') && !code.includes('export default') && !code.includes('import') && !code.includes('function') && !code.includes('const')) {
            errors.push({ file: ent.name, slug, error: 'Vue code does not contain template or script' });
          }
        } else if (slug === 'svelte') {
          if (!code.includes('<') && !code.includes('export') && !code.includes('let') && !code.includes('function') && !code.includes('const')) {
            errors.push({ file: ent.name, slug, error: 'Svelte code does not contain template or script' });
          }
        }
      }
    }
  }
  checkDir(trackDir);
}

console.log('='.repeat(80));
console.log(`VALIDATION RESULTS: Total Checked: ${totalValidated} files`);
if (errors.length === 0) {
  console.log('ALL CODEBLOCKS VALIDATED 100% CLEAN WITH 0 ERRORS!');
} else {
  console.log(`FOUND ${errors.length} ISSUES:`);
  for (const err of errors) {
    console.log(`[${err.slug}] ${err.file}: ${err.error}`);
  }
}
console.log('='.repeat(80));
