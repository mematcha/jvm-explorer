import { create } from 'zustand';

interface ProgressState {
  completedLessons: string[];
  currentLessonId: string | null;

  completeLesson: (id: string) => void;
  setCurrentLesson: (id: string | null) => void;
  isCompleted: (id: string) => boolean;
}

export const useProgress = create<ProgressState>((set, get) => ({
  completedLessons: JSON.parse(localStorage.getItem('lessonProgress') || '[]'),
  currentLessonId: null,

  completeLesson: (id: string) => {
    const updated = [...new Set([...get().completedLessons, id])];
    localStorage.setItem('lessonProgress', JSON.stringify(updated));
    set({ completedLessons: updated });
  },

  setCurrentLesson: (id: string | null) => set({ currentLessonId: id }),

  isCompleted: (id: string) => get().completedLessons.includes(id),
}));
