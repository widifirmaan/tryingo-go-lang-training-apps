import fs from 'fs';
import path from 'path';

function createGenerator(slug, trackName, levels, modules) {
  const levelsStr = JSON.stringify(levels, null, 2);
  const modulesStr = JSON.stringify(modules, null, 2);
  
  const content = `import { BaseGenerator } from './lib/base-generator.mjs';

const gen = new BaseGenerator('${slug}', '${trackName}');

const LEVELS = ${levelsStr};

const MODULES = ${modulesStr};

// Add weeks to levels
for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({
    week: m.week, topicId: m.topicId, titleId: m.titleId, titleEn: m.titleEn,
  }));
}

gen.writeFiles(MODULES, LEVELS);
`;
  
  const filePath = path.join('scripts', `generate-${slug}-materials.mjs`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Created:', filePath);
}

createGenerator('test', 'Test', [
  { levelId: 'beginer', nameId: 'Pemula', nameEn: 'Beginner', descId: 'Test', descEn: 'Test' }
], [
  { week: 1, level: 'beginer', topicId: 'test', titleId: 'Test', titleEn: 'Test', programId: 'Test', programEn: 'Test', levelNameId: 'Pemula', levelNameEn: 'Beginner', language: 'javascript', code: 'console.log("test");', objectivesId: ['Test'], objectivesEn: ['Test'], explanationId: 'Test', explanationEn: 'Test', experimentsId: ['Test'], experimentsEn: ['Test'], challengeId: 'Test', challengeEn: 'Test', summaryId: 'Test', summaryEn: 'Test' }
]);
