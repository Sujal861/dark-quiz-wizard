
import { Quiz, Question } from '../types/quiz';

// Topic categories for AI-generated quizzes
export type QuizTopic = 
  | 'web-development' 
  | 'artificial-intelligence' 
  | 'science-technology'
  | 'general-knowledge'
  | 'corporate-skills'
  | 'competitive-exams';

export interface GenerateQuizOptions {
  topic: QuizTopic;
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Mock implementation - in a real app, this would call OpenAI API
export const generateQuiz = async (options: GenerateQuizOptions): Promise<Quiz> => {
  console.log('Generating quiz with options:', options);
  
  // In a real implementation, this would call an API
  // For now, we'll generate a mock quiz based on the topic
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const quizId = `${options.topic}-${Date.now()}`;
  
  const topicMap: Record<QuizTopic, string> = {
    'web-development': 'Web Development',
    'artificial-intelligence': 'Artificial Intelligence & ML',
    'science-technology': 'Science & Technology',
    'general-knowledge': 'General Knowledge',
    'corporate-skills': 'Corporate & Soft Skills',
    'competitive-exams': 'Competitive Exam Prep'
  };
  
  const topicTitles: Record<QuizTopic, string> = {
    'web-development': 'Web Development Quiz',
    'artificial-intelligence': 'AI & Machine Learning Quiz',
    'science-technology': 'Science & Technology Quiz',
    'general-knowledge': 'General Knowledge Quiz',
    'corporate-skills': 'Corporate Skills Quiz', 
    'competitive-exams': 'Competitive Exam Prep'
  };

  let questions: Question[] = [];
  
  // Generate mock questions based on topic
  if (options.topic === 'web-development') {
    questions = [
      {
        id: `${quizId}-q1`,
        type: 'multiple-choice',
        question: 'What does CSS stand for?',
        options: [
          { id: `${quizId}-q1-a`, text: 'Cascading Style Sheets', isCorrect: true },
          { id: `${quizId}-q1-b`, text: 'Computer Style Sheets', isCorrect: false },
          { id: `${quizId}-q1-c`, text: 'Creative Style Systems', isCorrect: false },
          { id: `${quizId}-q1-d`, text: 'Colorful Style Sheets', isCorrect: false },
        ],
        points: 10,
      },
      {
        id: `${quizId}-q2`,
        type: 'true-false',
        question: 'TypeScript is a superset of JavaScript.',
        options: [
          { id: `${quizId}-q2-a`, text: 'True', isCorrect: true },
          { id: `${quizId}-q2-b`, text: 'False', isCorrect: false },
        ],
        points: 5,
      },
      // Add more questions based on difficulty
    ];
  } else if (options.topic === 'artificial-intelligence') {
    questions = [
      {
        id: `${quizId}-q1`,
        type: 'multiple-choice',
        question: 'Which of the following is NOT a common type of machine learning?',
        options: [
          { id: `${quizId}-q1-a`, text: 'Supervised learning', isCorrect: false },
          { id: `${quizId}-q1-b`, text: 'Unsupervised learning', isCorrect: false },
          { id: `${quizId}-q1-c`, text: 'Reinforcement learning', isCorrect: false },
          { id: `${quizId}-q1-d`, text: 'Privileged learning', isCorrect: true },
        ],
        points: 10,
      },
      {
        id: `${quizId}-q2`,
        type: 'true-false',
        question: 'Neural networks are inspired by the human brain.',
        options: [
          { id: `${quizId}-q2-a`, text: 'True', isCorrect: true },
          { id: `${quizId}-q2-b`, text: 'False', isCorrect: false },
        ],
        points: 5,
      },
      // Add more questions based on difficulty
    ];
  } else {
    // Default questions for other topics
    questions = [
      {
        id: `${quizId}-q1`,
        type: 'multiple-choice',
        question: `Sample ${topicMap[options.topic]} question 1?`,
        options: [
          { id: `${quizId}-q1-a`, text: 'Correct answer', isCorrect: true },
          { id: `${quizId}-q1-b`, text: 'Wrong answer 1', isCorrect: false },
          { id: `${quizId}-q1-c`, text: 'Wrong answer 2', isCorrect: false },
          { id: `${quizId}-q1-d`, text: 'Wrong answer 3', isCorrect: false },
        ],
        points: 10,
      },
      {
        id: `${quizId}-q2`,
        type: 'true-false',
        question: `Sample ${topicMap[options.topic]} true/false question?`,
        options: [
          { id: `${quizId}-q2-a`, text: 'True', isCorrect: true },
          { id: `${quizId}-q2-b`, text: 'False', isCorrect: false },
        ],
        points: 5,
      },
    ];
  }

  // Add more questions based on questionCount
  while (questions.length < options.questionCount) {
    const questionNumber = questions.length + 1;
    questions.push({
      id: `${quizId}-q${questionNumber}`,
      type: 'multiple-choice',
      question: `Sample ${topicMap[options.topic]} question ${questionNumber}?`,
      options: [
        { id: `${quizId}-q${questionNumber}-a`, text: 'Correct answer', isCorrect: true },
        { id: `${quizId}-q${questionNumber}-b`, text: 'Wrong answer 1', isCorrect: false },
        { id: `${quizId}-q${questionNumber}-c`, text: 'Wrong answer 2', isCorrect: false },
        { id: `${quizId}-q${questionNumber}-d`, text: 'Wrong answer 3', isCorrect: false },
      ],
      points: 10,
    });
  }

  return {
    id: quizId,
    title: `${topicTitles[options.topic]} (${options.difficulty})`,
    description: `AI-generated quiz on ${topicMap[options.topic]} with ${options.questionCount} questions.`,
    timeLimit: options.questionCount * 30, // 30 seconds per question
    questions,
  };
};
