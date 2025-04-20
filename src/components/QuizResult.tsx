
import React from 'react';
import type { QuizResult as QuizResultType } from '../types/quiz';
import { Button } from '@/components/ui/button';
import { formatTime } from '../utils/quizUtils';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface QuizResultProps {
  result: QuizResultType;
  onRestart: () => void;
  onStartNewQuiz: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ 
  result, 
  onRestart, 
  onStartNewQuiz 
}) => {
  const scorePercentage = (result.score / result.maxScore) * 100;
  const isPassing = scorePercentage >= 70;

  const getScoreMessage = () => {
    if (scorePercentage >= 90) return "Outstanding!";
    if (scorePercentage >= 80) return "Great job!";
    if (scorePercentage >= 70) return "Well done!";
    if (scorePercentage >= 60) return "Good effort!";
    return "Keep practicing!";
  };

  return (
    <div className="max-w-2xl mx-auto animate-scale-up">
      <Card className="border-accent bg-card/50 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex justify-center">
            <span className={`inline-flex items-center justify-center h-16 w-16 rounded-full ${
              isPassing ? 'bg-green-600/20' : 'bg-amber-600/20'
            }`}>
              <CheckCircle className={`h-8 w-8 ${
                isPassing ? 'text-green-500' : 'text-amber-500'
              }`} />
            </span>
          </div>
          <CardTitle className="text-2xl text-center gradient-text mt-4">
            {getScoreMessage()}
          </CardTitle>
          <CardDescription className="text-center text-lg">
            You scored {result.score} out of {result.maxScore} points
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Your score</span>
              <span>{Math.round(scorePercentage)}%</span>
            </div>
            <Progress value={scorePercentage} className="h-3" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-accent rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Time Taken</p>
              <p className="text-2xl font-bold text-primary-foreground">{formatTime(result.timeTaken)}</p>
            </div>
            <div className="bg-accent rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Correct Answers</p>
              <p className="text-2xl font-bold text-primary-foreground">
                {result.correctAnswers}/{result.totalQuestions}
              </p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3 pt-4">
          <Button onClick={onRestart} className="w-full">
            Try Again
          </Button>
          <Button 
            onClick={onStartNewQuiz} 
            variant="outline" 
            className="w-full"
          >
            Start New Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizResult;
