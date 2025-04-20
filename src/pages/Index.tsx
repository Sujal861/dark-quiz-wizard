
import React, { useState } from 'react';
import { Quiz } from '../types/quiz';
import { quizzes } from '../data/quizzes';
import Navbar from '../components/Navbar';
import QuizSelector from '../components/QuizSelector';
import QuizContainer from '../components/QuizContainer';
import QuizIntro from '../components/QuizIntro';
import ParticleBackground from '../components/ParticleBackground';

const Index = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [appState, setAppState] = useState<'select' | 'intro' | 'quiz'>('select');

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
    // Just restart the same quiz
    setIsStarted(true);
    setAppState('quiz');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ParticleBackground />
      <Navbar />
      
      <main className="flex-1 container mx-auto py-6 md:py-10">
        {appState === 'select' && (
          <QuizSelector quizzes={quizzes} onSelectQuiz={handleSelectQuiz} />
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
