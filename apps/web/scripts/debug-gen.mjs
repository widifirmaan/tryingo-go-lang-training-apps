import { readFileSync } from 'fs';

const gen = readFileSync('scripts/generate-go-materials.mjs', 'utf8');

// Extract getTheory function
const fnStart = gen.indexOf('function getTheory(');
const fnEnd = gen.indexOf('\nfunction getExercises(');
const fnStr = gen.substring(fnStart, fnEnd);

// Test calling it with week 1
eval(fnStr);
console.log('=== Week 1 ID ===');
const r1 = getTheory(1, 'id');
console.log('type:', typeof r1);
console.log('isObject:', typeof r1 === 'object');
if (typeof r1 === 'object') {
  console.log('keys:', Object.keys(r1));
  console.log('r1.id exists:', 'id' in r1);
  console.log('r1.id:', r1.id ? r1.id.substring(0, 30) + '...' : 'MISSING');
} else {
  console.log('value:', r1 ? r1.substring(0, 50) : 'null/undefined');
}

console.log('');
console.log('=== Week 14 ID ===');
const r14 = getTheory(14, 'id');
console.log('type:', typeof r14);
if (typeof r14 === 'object') {
  console.log('keys:', Object.keys(r14));
  console.log('r14.id:', r14.id ? r14.id.substring(0, 30) + '...' : 'MISSING');
} else {
  console.log('value:', r14 ? r14.substring(0, 50) : 'null/undefined');
}
