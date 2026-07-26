export interface Checkpoint {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  lessonId: string;
  title: string;
  description: string;
  code: string;
  concepts: string[];
  checkpoint: Checkpoint | null;
}

export interface CurriculumModule {
  moduleId: string;
  level: string;
  title: string;
  description: string;
  sortOrder: number;
  lessons: Lesson[];
}
