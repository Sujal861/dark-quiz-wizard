
import React from 'react';
import { Quiz } from '../types/quiz';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatTime } from '../utils/quizUtils';
import { Timer, RefreshCw } from 'lucide-react';

interface QuizSelectorProps {
  quizzes: Quiz[];
  onSelectQuiz: (quiz: Quiz) => void;
  onShowGenerator: () => void;
}

const QuizSelector: React.FC<QuizSelectorProps> = ({ 
  quizzes, 
  onSelectQuiz,
  onShowGenerator
}) => {
  return (
    <div className="container mx-auto px-4 py-10 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-4xl font-bold gradient-text font-display">Dark Quiz Wizard</h1>
          <p className="text-muted-foreground">Test your knowledge with our interactive quizzes</p>
        </div>
        
        <div className="mb-8">
          <Button 
            onClick={onShowGenerator} 
            className="w-full max-w-sm mx-auto flex items-center justify-center hover:scale-105 transition-transform"
            variant="secondary"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Generate AI Quiz
          </Button>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Create a fresh, AI-generated quiz on any topic
          </p>
        </div>
        
        <div className="grid gap-6">
          {quizzes.map((quiz) => (
            <Card 
              key={quiz.id}
              className="bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-accent"
            >
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5">
                    <Timer className="h-4 w-4" />
                    <span>{formatTime(quiz.timeLimit)}</span>
                  </div>
                  <div>{quiz.questions.length} questions</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => onSelectQuiz(quiz)} 
                  className="w-full"
                  variant="secondary"
                >
                  Start Quiz
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizSelector;
