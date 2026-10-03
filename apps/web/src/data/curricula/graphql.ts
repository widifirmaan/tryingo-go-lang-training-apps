import type { LevelInfo } from '../curriculum';

// GraphQL curriculum — product-driven research-backed structure
export const graphqlCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Fondasi Skema & Eksekusi Query/Mutation',
    nameEn: 'Schema Foundations & Query/Mutation Execution',
    descId: 'Filosofi Schema-First SDL, Scalar & Object Types, penyusunan query/mutation, resolver execution tree, dan eliminasi N+1 problem dengan DataLoader.',
    descEn: 'Schema-First SDL philosophy, Scalar & Object Types, query/mutation authoring, resolver execution trees, and N+1 elimination via DataLoader.',
    weeks: [
      { week: 1, topicId: 'filosofi-graphql-sdl-dan-query-pertama', titleId: 'Filosofi GraphQL vs REST: SDL, Scalar & Query Pertama', titleEn: 'GraphQL vs REST Philosophy: SDL, Scalars & First Query' },
      { week: 2, topicId: 'mutations-input-types-fragments-dan-directives', titleId: 'Mutations, Input Types, Fragments & Directives', titleEn: 'Mutations, Input Types, Fragments & Directives' },
      { week: 3, topicId: 'resolver-execution-tree-dan-context-autentikasi', titleId: 'Resolver Execution Tree & Context Autentikasi', titleEn: 'Resolver Execution Tree & Auth Context' },
      { week: 4, topicId: 'masalah-n-plus-1-dan-batching-dataloader', titleId: 'Masalah N+1 Query & Batching dengan DataLoader', titleEn: 'The N+1 Query Problem & DataLoader Batching' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Real-Time Subscriptions, Keamanan & Federation',
    nameEn: 'Real-Time Subscriptions, Security & Federation',
    descId: 'WebSocket Subscriptions, Query Depth & Complexity limiting, autentikasi berbasis Context, Apollo Federation v2 multi-subgraph, dan capstone API Gateway.',
    descEn: 'WebSocket Subscriptions, Query Depth & Complexity guards, Context-driven auth, Apollo Federation v2 multi-subgraphs, and API Gateway capstone.',
    weeks: [
      { week: 5, topicId: 'real-time-subscriptions-websocket-dan-pubsub', titleId: 'Real-Time Subscriptions, WebSockets & PubSub', titleEn: 'Real-Time Subscriptions, WebSockets & PubSub' },
      { week: 6, topicId: 'keamanan-graphql-depth-limiting-dan-complexity', titleId: 'Keamanan GraphQL: Query Depth, Complexity & Introspection', titleEn: 'GraphQL Security: Query Depth, Complexity & Introspection' },
      { week: 7, topicId: 'apollo-federation-v2-arsitektur-subgraph', titleId: 'Apollo Federation v2 & Arsitektur Microservices', titleEn: 'Apollo Federation v2 & Microservices Architecture' },
      { week: 8, topicId: 'capstone-unified-federated-api-gateway', titleId: 'Capstone Project: Unified Federated E-Commerce Gateway', titleEn: 'Capstone Project: Unified Federated E-Commerce Gateway' }
    ],
  }
];
