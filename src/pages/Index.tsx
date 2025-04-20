import React, { useState } from 'react';
import { Quiz } from '../types/quiz';
import { quizzes } from '../data/quizzes';
import Navbar from '../components/Navbar';
import QuizSelector from '../components/QuizSelector';
import QuizContainer from '../components/QuizContainer';
import QuizIntro from '../components/QuizIntro';
import QuizGenerator from '../components/QuizGenerator';
import ParticleBackground from '../components/ParticleBackground';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [appState, setAppState] = useState<'select' | 'intro' | 'quiz' | 'generate'>('select');
  const [availableQuizzes, setAvailableQuizzes] = useState<Quiz[]>(quizzes);

  const handleSelectQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setAppState('intro');
  };

  const handleStartQuiz = () => {
    setIsStarted(true);
    setAppState('quiz');
  };

  const handleFinishQuiz = () => {
    setSelectedQuiz(null);
    setIsStarted(false);
    setAppState('select');
  };

  const handleRestartQuiz = () => {
    setIsStarted(true);
    setAppState('quiz');
  };
  
  const handleShowGenerator = () => {
    setAppState('generate');
  };
  
  const handleQuizGenerated = (quiz: Quiz) => {
    setAvailableQuizzes(prev => [quiz, ...prev]);
    setSelectedQuiz(quiz);
    setAppState('intro');
  };
  
  const handleBackToSelector = () => {
    setAppState('select');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ParticleBackground />
      <Navbar />
      
      <main className="flex-1 container mx-auto py-6 md:py-10">
        {appState === 'select' && (
          <QuizSelector 
            quizzes={availableQuizzes} 
            onSelectQuiz={handleSelectQuiz} 
            onShowGenerator={handleShowGenerator}
          />
        )}
        
        {appState === 'generate' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <Button 
                onClick={handleBackToSelector} 
                variant="outline" 
                className="mb-4"
              >
                Back to Quiz Selection
              </Button>
            </div>
            <QuizGenerator onQuizGenerated={handleQuizGenerated} />
          </div>
        )}
        
        {appState === 'intro' && selectedQuiz && (
          <div className="flex items-center justify-center h-full py-10">
            <QuizIntro quiz={selectedQuiz} onStart={handleStartQuiz} />
          </div>
        )}
        
        {appState === 'quiz' && selectedQuiz && (
          <QuizContainer 
            quiz={selectedQuiz} 
            onFinish={handleFinishQuiz}
            onRestart={handleRestartQuiz}
          />
        )}
      </main>
      
      <footer className="py-6 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Dark Quiz Wizard. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
