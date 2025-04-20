
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpPoints: number;
  isUnlocked: boolean;
}

export interface UserProgress {
  totalXp: number;
  completedQuizzes: number;
  streak: number;
  lastQuizDate: string | null;
  achievements: Achievement[];
}
