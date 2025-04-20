
import React from 'react';
import { Quiz } from '../types/quiz';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatTime } from '../utils/quizUtils';
import { Play } from 'lucide-react';

interface QuizIntroProps {
  quiz: Quiz;
  onStart: () => void;
  className?: string;
}

const QuizIntro: React.FC<QuizIntroProps> = ({ quiz, onStart, className }) => {
  return (
    <Card className={`w-full max-w-md mx-auto glass-morphism animate-scale-up ${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl gradient-text">{quiz.title}</CardTitle>
        <CardDescription>{quiz.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-accent rounded-lg p-3">
            <p className="text-sm text-muted-foreground">Questions</p>
            <p className="text-2xl font-bold">{quiz.questions.length}</p>
          </div>
          <div className="bg-accent rounded-lg p-3">
            <p className="text-sm text-muted-foreground">Time Limit</p>
            <p className="text-2xl font-bold">{formatTime(quiz.timeLimit)}</p>
          </div>
        </div>
        
        <div className="bg-accent/50 rounded-lg p-4">
          <h4 className="font-medium mb-2">Quiz Rules</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <span className="block h-1.5 w-1.5 mt-1.5 rounded-full bg-primary flex-shrink-0"></span>
              <span>Answer all questions before the time runs out</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="block h-1.5 w-1.5 mt-1.5 rounded-full bg-primary flex-shrink-0"></span>
              <span>You can't go back to previous questions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="block h-1.5 w-1.5 mt-1.5 rounded-full bg-primary flex-shrink-0"></span>
              <span>You need 70% to pass the quiz</span>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onStart} className="w-full">
          <Play className="mr-2 h-4 w-4" /> Start Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizIntro;
