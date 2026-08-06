export interface WeekMaterial {
  trackId: string;
  weekTitle: string;
  objectives: string[];
  topics: { title: string; desc: string }[];
  codeExample: string;
  exercise: string;
  summary: string;
}

// Generated materials — each generator creates its own week materials
export const BEGINNER_WEEK_1: Record<string, WeekMaterial> = {};
