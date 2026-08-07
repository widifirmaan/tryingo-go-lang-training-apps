import fs from 'fs';

const content = String.raw`import { BaseGenerator } from './lib/base-generator.mjs';

const gen = new BaseGenerator('postgresql', 'PostgreSQL');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Dasar SQL dan PostgreSQL: tabel, query, join, index, dan fungsi tersimpan.',
    descEn: 'SQL and PostgreSQL fundamentals: tables, queries, joins, indexes, and stored functions.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'PostgreSQL lanjutan: window functions, JSONB, optimasi performa, replikasi, dan proyek nyata.',
    descEn: 'Advanced PostgreSQL: window functions, JSONB, performance optimization, replication, and real project.',
  },
];

const MODULES = [
  {
    week: 1, level: 'beginer', topicId: 'dasar-postgresql',
    titleId: 'Dasar PostgreSQL & Tabel', titleEn: 'PostgreSQL Basics & Tables',
    programId: 'Membuat Database & Tabel', programEn: 'Creating Database & Tables',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'sql',
`;

fs.writeFileSync('test-output.txt', content.substring(0, 100));
console.log('test write ok');
