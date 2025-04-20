
import React, { useState, useEffect, useCallback } from 'react';
import { Quiz, QuizState, QuizResult } from '../types/quiz';
import QuizHeader from './QuizHeader';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';
import { Button } from '@/components/ui/button';
import { getQuizResult, saveQuizResult } from '../utils/quizUtils';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { ChevronRight } from 'lucide-react';

interface QuizContainerProps {
  quiz: Quiz;
  onFinish: () => void;
  onRestart: () => void;
}

const QuizContainer: React.FC<QuizContainerProps> = ({ quiz, onFinish, onRestart }) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    timeRemaining: quiz.timeLimit,
    isFinished: false,
    startTime: Date.now(),
  });
  
  const [isRevealing, setIsRevealing] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const { toast } = useToast();

  const currentQuestion = quiz.questions[quizState.currentQuestionIndex];
  
  // Timer countdown
  useEffect(() => {
    if (quizState.isFinished) return;
    
    const timer = setInterval(() => {
      setQuizState((prevState) => {
        const newTimeRemaining = prevState.timeRemaining - 1;
        
        if (newTimeRemaining <= 0) {
          clearInterval(timer);
          const quizResult = getQuizResult(quiz, { 
            ...prevState, 
            isFinished: true, 
            endTime: Date.now() 
          });
          setResult(quizResult);
          saveQuizResult(quizResult);
          return { ...prevState, timeRemaining: 0, isFinished: true, endTime: Date.now() };
        }
        
        return { ...prevState, timeRemaining: newTimeRemaining };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quiz, quizState.isFinished]);
  
  const handleSelectOption = useCallback((questionId: string, optionId: string) => {
    setQuizState((prevState) => ({
      ...prevState,
      answers: { ...prevState.answers, [questionId]: optionId },
    }));
    
    // Show toast for answer submission
    toast({
      title: "Answer submitted",
      description: "Your answer has been recorded",
    });
  }, [toast]);
  
  const handleNextQuestion = useCallback(() => {
    if (isRevealing) return;
    
    const isLastQuestion = quizState.currentQuestionIndex === quiz.questions.length - 1;
    
    if (isLastQuestion) {
      // Show results
      setQuizState((prevState) => {
        const updatedState = { ...prevState, isFinished: true, endTime: Date.now() };
        const quizResult = getQuizResult(quiz, updatedState);
        setResult(quizResult);
        saveQuizResult(quizResult);
        return updatedState;
      });
    } else {
      // Show answer feedback before moving to next question
      setIsRevealing(true);
      
      setTimeout(() => {
        setIsRevealing(false);
        setQuizState((prevState) => ({
          ...prevState,
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }));
      }, 1500);
    }
  }, [quizState.currentQuestionIndex, quiz, isRevealing]);
  
  if (quizState.isFinished && result) {
    return (
      <QuizResult 
        result={result}
        onRestart={onRestart}
        onStartNewQuiz={onFinish}
      />
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto px-4">
      <QuizHeader
        title={quiz.title}
        currentQuestion={quizState.currentQuestionIndex + 1}
        totalQuestions={quiz.questions.length}
        timeRemaining={quizState.timeRemaining}
      />
      
      <Card className="mt-8 border-accent bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <QuizQuestion
            question={currentQuestion}
            selectedOption={quizState.answers[currentQuestion.id]}
            isRevealed={isRevealing}
            onSelectOption={handleSelectOption}
          />
        </CardContent>
      </Card>
      
      <div className="mt-6 flex justify-end">
        <Button 
          onClick={handleNextQuestion}
          disabled={!quizState.answers[currentQuestion.id]}
          className="animate-pulse"
        >
          {quizState.currentQuestionIndex === quiz.questions.length - 1 
            ? 'Finish Quiz' 
            : 'Next Question'}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuizContainer;
