
import { Quiz, QuizResult, QuizState } from "../types/quiz";

export const calculateScore = (
  quiz: Quiz,
  answers: Record<string, string>
): { score: number; maxScore: number; correctAnswers: number } => {
  let score = 0;
  let correctAnswers = 0;
  const maxScore = quiz.questions.reduce((sum, q) => sum + q.points, 0);

  quiz.questions.forEach((question) => {
    const selectedOptionId = answers[question.id];
    if (selectedOptionId) {
      const selectedOption = question.options.find(
        (option) => option.id === selectedOptionId
      );
      if (selectedOption && selectedOption.isCorrect) {
        score += question.points;
        correctAnswers++;
      }
    }
  });

  return { score, maxScore, correctAnswers };
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const getQuizResult = (
  quiz: Quiz,
  quizState: QuizState
): QuizResult => {
  const { score, maxScore, correctAnswers } = calculateScore(quiz, quizState.answers);
  const timeTaken = quizState.endTime 
    ? Math.floor((quizState.endTime - quizState.startTime) / 1000) 
    : Math.floor((Date.now() - quizState.startTime) / 1000);

  const answeredQuestions = quiz.questions.map((question) => {
    const selectedOptionId = quizState.answers[question.id];
    const selectedOption = question.options.find(
      (option) => option.id === selectedOptionId
    );
    
    return {
      questionId: question.id,
      selectedOptionId,
      isCorrect: selectedOption?.isCorrect || false,
      points: selectedOption?.isCorrect ? question.points : 0,
    };
  });

  return {
    quizId: quiz.id,
    score,
    maxScore,
    correctAnswers,
    totalQuestions: quiz.questions.length,
    timeTaken,
    answeredQuestions,
  };
};

export const getStoredQuizResults = (): QuizResult[] => {
  const storedResults = localStorage.getItem("quizResults");
  return storedResults ? JSON.parse(storedResults) : [];
};

export const saveQuizResult = (result: QuizResult): void => {
  const storedResults = getStoredQuizResults();
  storedResults.push(result);
  localStorage.setItem("quizResults", JSON.stringify(storedResults));
};
