
import { Achievement, UserProgress } from '../types/achievements';

const STORAGE_KEY = 'quiz_user_progress';

const defaultAchievements: Achievement[] = [
  {
    id: 'first_quiz',
    title: 'First Steps',
    description: 'Complete your first quiz',
    icon: 'award',
    xpPoints: 50,
    isUnlocked: false,
  },
  {
    id: 'perfect_score',
    title: 'Perfect Score',
    description: 'Get 100% on any quiz',
    icon: 'trophy',
    xpPoints: 100,
    isUnlocked: false,
  },
  {
    id: 'streak_3',
    title: 'On Fire',
    description: 'Complete 3 quizzes in a row',
    icon: 'flame',
    xpPoints: 150,
    isUnlocked: false,
  },
];

export const getInitialProgress = (): UserProgress => ({
  totalXp: 0,
  completedQuizzes: 0,
  streak: 0,
  lastQuizDate: null,
  achievements: defaultAchievements,
});

export const getUserProgress = (): UserProgress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : getInitialProgress();
};

export const updateUserProgress = (result: { score: number; maxScore: number }): UserProgress => {
  const progress = getUserProgress();
  const scorePercentage = (result.score / result.maxScore) * 100;
  const earnedXp = Math.round(scorePercentage);
  
  // Update basic stats
  progress.totalXp += earnedXp;
  progress.completedQuizzes += 1;
  
  // Update streak
  const today = new Date().toISOString().split('T')[0];
  if (progress.lastQuizDate !== today) {
    if (progress.lastQuizDate === null || 
        new Date(progress.lastQuizDate).getTime() === new Date(today).getTime() - 86400000) {
      progress.streak += 1;
    } else {
      progress.streak = 1;
    }
    progress.lastQuizDate = today;
  }
  
  // Check achievements
  if (progress.completedQuizzes === 1) {
    progress.achievements.find(a => a.id === 'first_quiz')!.isUnlocked = true;
  }
  if (scorePercentage === 100) {
    progress.achievements.find(a => a.id === 'perfect_score')!.isUnlocked = true;
  }
  if (progress.streak >= 3) {
    progress.achievements.find(a => a.id === 'streak_3')!.isUnlocked = true;
  }
  
  // Save progress
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
};
