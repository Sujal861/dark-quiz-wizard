
import React from 'react';
import { formatTime } from '../utils/quizUtils';
import { Progress } from '@/components/ui/progress';

interface QuizHeaderProps {
  title: string;
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining: number;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  title,
  currentQuestion,
  totalQuestions,
  timeRemaining,
}) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight gradient-text">{title}</h2>
        <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full">
          <span className="font-mono text-primary-foreground">
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span>Question {currentQuestion} of {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

export default QuizHeader;
