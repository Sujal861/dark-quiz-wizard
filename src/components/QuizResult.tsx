
import React from 'react';
import type { QuizResult as QuizResultType } from '../types/quiz';
import { Button } from '@/components/ui/button';
import { formatTime } from '../utils/quizUtils';
import { Trophy, Share2, Award, Clock, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const scorePercentage = (result.score / result.maxScore) * 100;
  const isPassing = scorePercentage >= 70;
  const earnedXp = Math.round(scorePercentage);

  const getScoreMessage = () => {
    if (scorePercentage >= 90) return "Outstanding! +100 XP";
    if (scorePercentage >= 80) return "Great job! +80 XP";
    if (scorePercentage >= 70) return "Well done! +70 XP";
    if (scorePercentage >= 60) return "Good effort! +60 XP";
    return "Keep practicing! +40 XP";
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'My Quiz Result',
        text: `I scored ${result.score}/${result.maxScore} (${Math.round(scorePercentage)}%) on the quiz! Can you beat my score?`,
        url: window.location.href,
      });
    } catch (error) {
      toast({
        title: "Sharing not supported",
        description: "Copy your score manually to share with friends!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-scale-up">
      <Card className="border-accent bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-all duration-300">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex justify-center animate-fade-in animation-delay-200">
            <span className={`inline-flex items-center justify-center h-16 w-16 rounded-full ${
              isPassing ? 'bg-green-600/20' : 'bg-amber-600/20'
            } hover:scale-105 transition-transform duration-200`}>
              <Trophy className={`h-8 w-8 ${
                isPassing ? 'text-green-500' : 'text-amber-500'
              }`} />
            </span>
          </div>
          <CardTitle className="text-2xl text-center gradient-text mt-4 animate-fade-in animation-delay-300">
            {getScoreMessage()}
          </CardTitle>
          <CardDescription className="text-center text-lg animate-fade-in animation-delay-400">
            You scored {result.score} out of {result.maxScore} points
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2 animate-slide-up animation-delay-500">
            <div className="flex justify-between text-sm">
              <span>Your score</span>
              <span>{Math.round(scorePercentage)}%</span>
            </div>
            <Progress value={scorePercentage} className="h-3" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center animate-slide-up animation-delay-600">
            <div className="bg-accent rounded-lg p-4 hover:bg-accent/70 transition-colors duration-200">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="text-xl font-bold text-primary-foreground">{formatTime(result.timeTaken)}</p>
            </div>
            <div className="bg-accent rounded-lg p-4 hover:bg-accent/70 transition-colors duration-200">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <p className="text-sm text-muted-foreground">Correct</p>
              <p className="text-xl font-bold text-primary-foreground">
                {result.correctAnswers}/{result.totalQuestions}
              </p>
            </div>
            <div className="bg-accent rounded-lg p-4 hover:bg-accent/70 transition-colors duration-200">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <p className="text-sm text-muted-foreground">XP Gained</p>
              <p className="text-xl font-bold text-primary-foreground">+{earnedXp}</p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3 pt-4 animate-slide-up animation-delay-700">
          <Button 
            onClick={handleShare}
            className="w-full hover:scale-105 transition-transform"
            variant="secondary"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share Result
          </Button>
          <Button onClick={onRestart} className="w-full hover:scale-105 transition-transform">
            Try Again
          </Button>
          <Button 
            onClick={onStartNewQuiz} 
            variant="outline" 
            className="w-full hover:scale-105 transition-transform"
          >
            Start New Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizResult;
