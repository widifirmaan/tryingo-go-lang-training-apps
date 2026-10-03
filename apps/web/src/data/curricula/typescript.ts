import type { LevelInfo } from '../curriculum';

// TypeScript curriculum — product-driven research-backed structure
export const typescriptCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pondasi Tipe & Type Narrowing',
    nameEn: 'Type Foundations & Narrowing',
    descId: 'Transisi dari JavaScript ke TypeScript: tipe primitif, inference, union types, interfaces, dan narrowing aman.',
    descEn: 'Transitioning from JavaScript to TypeScript: primitive annotations, inference, union types, interfaces, and safe narrowing.',
    weeks: [
      { week: 1, topicId: 'tipe-primitif-dan-type-inference', titleId: 'Anotasi Tipe Primitif, Type Inference & Union Types', titleEn: 'Primitive Type Annotations, Inference & Union Types' },
      { week: 2, topicId: 'interface-dan-type-alias', titleId: 'Interface vs Type Alias, Optional, Readonly & Index Signatures', titleEn: 'Interface vs Type Alias, Optional, Readonly & Index Signatures' },
      { week: 3, topicId: 'type-narrowing-dan-guards', titleId: 'Type Narrowing: typeof, instanceof, in & Custom Type Guards', titleEn: 'Type Narrowing: typeof, instanceof, in & Custom Type Guards' },
      { week: 4, topicId: 'tuples-enums-dan-void-never', titleId: 'Tuples, Const Enums vs As Const, serta Exhaustive Check dengan never', titleEn: 'Tuples, Const Enums vs As Const & Exhaustive Checks with never' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Generics & Utility Types Modern',
    nameEn: 'Generics & Modern Utility Types',
    descId: 'Menulis kode fleksibel namun ketat: fungsi generik, constraints, utility types bawaan, conditional types, dan infer.',
    descEn: 'Writing flexible yet type-safe code: generic functions, constraints, built-in utility types, conditional types, and infer.',
    weeks: [
      { week: 5, topicId: 'generics-dan-constraints', titleId: 'Generics: Fungsi Generik, Interfaces & Type Constraints (extends)', titleEn: 'Generics: Generic Functions, Interfaces & Constraints (extends)' },
      { week: 6, topicId: 'utility-types-built-in', titleId: 'Utility Types Bawaan: Partial, Required, Pick, Omit, Record & ReturnType', titleEn: 'Built-in Utility Types: Partial, Required, Pick, Omit, Record & ReturnType' },
      { week: 7, topicId: 'conditional-types-dan-infer', titleId: 'Conditional Types, infer Keyword & Template Literal Types', titleEn: 'Conditional Types, the infer Keyword & Template Literal Types' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Sistem Tipe Lanjut & Capstone Portofolio',
    nameEn: 'Advanced Type Systems & Portfolio Capstone',
    descId: 'Mapped types, template literal types, ambient declarations (.d.ts), dan proyek mesin portofolio keuangan enterprise.',
    descEn: 'Mapped types, template literal types, ambient declarations (.d.ts), and the enterprise financial portfolio engine capstone.',
    weeks: [
      { week: 8, topicId: 'mapped-types-dan-keyof', titleId: 'Mapped Types, keyof Operator & Immutable State Store', titleEn: 'Mapped Types, the keyof Operator & Immutable State Store' },
      { week: 9, topicId: 'declaration-files-dan-ambient', titleId: 'Declaration Files (.d.ts), Ambient Types & Module Augmentation', titleEn: 'Declaration Files (.d.ts), Ambient Types & Module Augmentation' },
      { week: 10, topicId: 'capstone-financial-ledger', titleId: 'Capstone: Mesin Portofolio Keuangan & Audit Log Tipe-Ketat', titleEn: 'Capstone: Strongly-Typed Financial Portfolio & Audit Engine' }
    ],
  }
];
