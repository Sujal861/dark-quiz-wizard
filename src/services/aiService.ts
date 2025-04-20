
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
  
  // Generate topic-specific questions with accurate answers
  if (options.topic === 'web-development') {
    questions = getWebDevelopmentQuestions(quizId, options.difficulty);
  } else if (options.topic === 'artificial-intelligence') {
    questions = getArtificialIntelligenceQuestions(quizId, options.difficulty);
  } else if (options.topic === 'science-technology') {
    questions = getScienceTechnologyQuestions(quizId, options.difficulty);
  } else if (options.topic === 'general-knowledge') {
    questions = getGeneralKnowledgeQuestions(quizId, options.difficulty);
  } else if (options.topic === 'corporate-skills') {
    questions = getCorporateSkillsQuestions(quizId, options.difficulty);
  } else if (options.topic === 'competitive-exams') {
    questions = getCompetitiveExamsQuestions(quizId, options.difficulty);
  }

  // Make sure we have enough questions according to the count requested
  while (questions.length < options.questionCount) {
    // If we don't have enough specific questions, add generic ones
    const questionNumber = questions.length + 1;
    const difficultyFactor = options.difficulty === 'easy' ? 5 : 
                            options.difficulty === 'medium' ? 10 : 15;
    
    questions.push({
      id: `${quizId}-q${questionNumber}`,
      type: 'multiple-choice',
      question: `Question ${questionNumber} about ${topicMap[options.topic]}?`,
      options: [
        { id: `${quizId}-q${questionNumber}-a`, text: 'Correct answer', isCorrect: true },
        { id: `${quizId}-q${questionNumber}-b`, text: 'Wrong answer 1', isCorrect: false },
        { id: `${quizId}-q${questionNumber}-c`, text: 'Wrong answer 2', isCorrect: false },
        { id: `${quizId}-q${questionNumber}-d`, text: 'Wrong answer 3', isCorrect: false },
      ],
      points: difficultyFactor,
    });
  }

  // If we have more questions than requested, trim the list
  if (questions.length > options.questionCount) {
    questions = questions.slice(0, options.questionCount);
  }

  return {
    id: quizId,
    title: `${topicTitles[options.topic]} (${options.difficulty})`,
    description: `AI-generated quiz on ${topicMap[options.topic]} with ${options.questionCount} questions.`,
    timeLimit: options.questionCount * 30, // 30 seconds per question
    questions,
  };
};

// Helper functions to generate accurate topic-specific questions

function getWebDevelopmentQuestions(quizId: string, difficulty: string): Question[] {
  const basePoints = difficulty === 'easy' ? 5 : 
                    difficulty === 'medium' ? 10 : 15;
  
  return [
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
      points: basePoints,
    },
    {
      id: `${quizId}-q2`,
      type: 'true-false',
      question: 'TypeScript is a superset of JavaScript.',
      options: [
        { id: `${quizId}-q2-a`, text: 'True', isCorrect: true },
        { id: `${quizId}-q2-b`, text: 'False', isCorrect: false },
      ],
      points: basePoints,
    },
    {
      id: `${quizId}-q3`,
      type: 'multiple-choice',
      question: 'Which HTML tag is used to create a hyperlink?',
      options: [
        { id: `${quizId}-q3-a`, text: '<a>', isCorrect: true },
        { id: `${quizId}-q3-b`, text: '<link>', isCorrect: false },
        { id: `${quizId}-q3-c`, text: '<href>', isCorrect: false },
        { id: `${quizId}-q3-d`, text: '<url>', isCorrect: false },
      ],
      points: basePoints,
    },
    {
      id: `${quizId}-q4`,
      type: 'multiple-choice',
      question: 'What is the purpose of the "box-sizing" CSS property?',
      options: [
        { id: `${quizId}-q4-a`, text: 'To include padding and border in element\'s total width/height', isCorrect: true },
        { id: `${quizId}-q4-b`, text: 'To specify the element\'s visibility', isCorrect: false },
        { id: `${quizId}-q4-c`, text: 'To create a box shadow', isCorrect: false },
        { id: `${quizId}-q4-d`, text: 'To determine the stacking order of elements', isCorrect: false },
      ],
      points: basePoints + 5,
    },
    {
      id: `${quizId}-q5`,
      type: 'multiple-choice',
      question: 'What does the "async" keyword do in JavaScript?',
      options: [
        { id: `${quizId}-q5-a`, text: 'Defines a function that returns a Promise', isCorrect: true },
        { id: `${quizId}-q5-b`, text: 'Makes all code execute in parallel', isCorrect: false },
        { id: `${quizId}-q5-c`, text: 'Prevents the function from being called', isCorrect: false },
        { id: `${quizId}-q5-d`, text: 'Runs the function only once', isCorrect: false },
      ],
      points: basePoints + 5,
    }
  ];
}

function getArtificialIntelligenceQuestions(quizId: string, difficulty: string): Question[] {
  const basePoints = difficulty === 'easy' ? 5 : 
                    difficulty === 'medium' ? 10 : 15;
  
  return [
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
      points: basePoints,
    },
    {
      id: `${quizId}-q2`,
      type: 'true-false',
      question: 'Neural networks are inspired by the human brain.',
      options: [
        { id: `${quizId}-q2-a`, text: 'True', isCorrect: true },
        { id: `${quizId}-q2-b`, text: 'False', isCorrect: false },
      ],
      points: basePoints,
    },
    {
      id: `${quizId}-q3`,
      type: 'multiple-choice',
      question: 'What is the purpose of the activation function in a neural network?',
      options: [
        { id: `${quizId}-q3-a`, text: 'To introduce non-linearity', isCorrect: true },
        { id: `${quizId}-q3-b`, text: 'To decrease training speed', isCorrect: false },
        { id: `${quizId}-q3-c`, text: 'To reduce the number of neurons needed', isCorrect: false },
        { id: `${quizId}-q3-d`, text: 'To make network training deterministic', isCorrect: false },
      ],
      points: basePoints + 5,
    },
    {
      id: `${quizId}-q4`,
      type: 'multiple-choice',
      question: 'Which algorithm is commonly used in recommendation systems?',
      options: [
        { id: `${quizId}-q4-a`, text: 'Collaborative filtering', isCorrect: true },
        { id: `${quizId}-q4-b`, text: 'Bubble sort', isCorrect: false },
        { id: `${quizId}-q4-c`, text: 'Binary search', isCorrect: false },
        { id: `${quizId}-q4-d`, text: 'Depth-first search', isCorrect: false },
      ],
      points: basePoints + 5,
    },
    {
      id: `${quizId}-q5`,
      type: 'multiple-choice',
      question: 'What is "overfitting" in machine learning?',
      options: [
        { id: `${quizId}-q5-a`, text: 'When a model performs well on training data but poorly on new data', isCorrect: true },
        { id: `${quizId}-q5-b`, text: 'When a model is too simple to capture patterns in the data', isCorrect: false },
        { id: `${quizId}-q5-c`, text: 'When training data is insufficient', isCorrect: false },
        { id: `${quizId}-q5-d`, text: 'When a model takes too long to train', isCorrect: false },
      ],
      points: basePoints + 5,
    }
  ];
}

function getScienceTechnologyQuestions(quizId: string, difficulty: string): Question[] {
  const basePoints = difficulty === 'easy' ? 5 : 
                    difficulty === 'medium' ? 10 : 15;
  
  return [
    {
      id: `${quizId}-q1`,
      type: 'multiple-choice',
      question: 'What is the chemical symbol for gold?',
      options: [
        { id: `${quizId}-q1-a`, text: 'Au', isCorrect: true },
        { id: `${quizId}-q1-b`, text: 'Ag', isCorrect: false },
        { id: `${quizId}-q1-c`, text: 'Fe', isCorrect: false },
        { id: `${quizId}-q1-d`, text: 'Go', isCorrect: false },
      ],
      points: basePoints,
    },
    {
      id: `${quizId}-q2`,
      type: 'true-false',
      question: 'Sound travels faster in water than in air.',
      options: [
        { id: `${quizId}-q2-a`, text: 'True', isCorrect: true },
        { id: `${quizId}-q2-b`, text: 'False', isCorrect: false },
      ],
      points: basePoints,
    },
    {
      id: `${quizId}-q3`,
      type: 'multiple-choice',
      question: 'Which of the following is NOT a renewable energy source?',
      options: [
        { id: `${quizId}-q3-a`, text: 'Natural gas', isCorrect: true },
        { id: `${quizId}-q3-b`, text: 'Solar', isCorrect: false },
        { id: `${quizId}-q3-c`, text: 'Wind', isCorrect: false },
        { id: `${quizId}-q3-d`, text: 'Hydro', isCorrect: false },
      ],
      points: basePoints + 5,
    },
    {
      id: `${quizId}-q4`,
      type: 'multiple-choice',
      question: 'What is the smallest unit of life?',
      options: [
        { id: `${quizId}-q4-a`, text: 'Cell', isCorrect: true },
        { id: `${quizId}-q4-b`, text: 'Atom', isCorrect: false },
        { id: `${quizId}-q4-c`, text: 'Molecule', isCorrect: false },
        { id: `${quizId}-q4-d`, text: 'DNA', isCorrect: false },
      ],
      points: basePoints,
    },
    {
      id: `${quizId}-q5`,
      type: 'multiple-choice',
      question: 'What technology is used to record cryptocurrency transactions?',
      options: [
        { id: `${quizId}-q5-a`, text: 'Blockchain', isCorrect: true },
        { id: `${quizId}-q5-b`, text: 'Cloud computing', isCorrect: false },
        { id: `${quizId}-q5-c`, text: 'Virtual reality', isCorrect: false },
        { id: `${quizId}-q5-d`, text: 'Quantum computing', isCorrect: false },
      ],
      points: basePoints + 5,
    }
  ];
}

function getGeneralKnowledgeQuestions(quizId: string, difficulty: string): Question[] {
  const basePoints = difficulty === 'easy' ? 5 : 
                    difficulty === 'medium' ? 10 : 15;
  
  return [
    {
      id: `${quizId}-q1`,
      type: 'multiple-choice',
      question: 'Which planet in our solar system has the most moons?',
      options: [
        { id: `${quizId}-q1-a`, text: 'Saturn', isCorrect: true },
        { id: `${quizId}-q1-b`, text: 'Jupiter', isCorrect: false },
        { id: `${quizId}-q1-c`, text: 'Neptune', isCorrect: false },
        { id: `${quizId}-q1-d`, text: 'Uranus', isCorrect: false },
      ],
      points: basePoints + 5,
    },
    {
      id: `${quizId}-q2`,
      type: 'true-false',
      question: 'The Great Wall of China is visible from space with the naked eye.',
      options: [
        { id: `${quizId}-q2-a`, text: 'True', isCorrect: false },
        { id: `${quizId}-q2-b`, text: 'False', isCorrect: true },
      ],
      points: basePoints,
    },
    {
      id: `${quizId}-q3`,
      type: 'multiple-choice',
      question: 'Which country gifted the Statue of Liberty to the United States?',
      options: [
        { id: `${quizId}-q3-a`, text: 'France', isCorrect: true },
        { id: `${quizId}-q3-b`, text: 'Italy', isCorrect: false },
        { id: `${quizId}-q3-c`, text: 'Spain', isCorrect: false },
        { id: `${quizId}-q3-d`, text: 'England', isCorrect: false },
      ],
      points: basePoints,
    },
    {
      id: `${quizId}-q4`,
      type: 'multiple-choice',
      question: 'Who wrote "Romeo and Juliet"?',
      options: [
        { id: `${quizId}-q4-a`, text: 'William Shakespeare', isCorrect: true },
        { id: `${quizId}-q4-b`, text: 'Charles Dickens', isCorrect: false },
        { id: `${quizId}-q4-c`, text: 'Jane Austen', isCorrect: false },
        { id: `${quizId}-q4-d`, text: 'Mark Twain', isCorrect: false },
      ],
      points: basePoints,
    },
    {
      id: `${quizId}-q5`,
      type: 'multiple-choice',
      question: 'What is the capital of Australia?',
      options: [
        { id: `${quizId}-q5-a`, text: 'Canberra', isCorrect: true },
        { id: `${quizId}-q5-b`, text: 'Sydney', isCorrect: false },
        { id: `${quizId}-q5-c`, text: 'Melbourne', isCorrect: false },
        { id: `${quizId}-q5-d`, text: 'Brisbane', isCorrect: false },
      ],
      points: basePoints,
    }
  ];
}

function getCorporateSkillsQuestions(quizId: string, difficulty: string): Question[] {
  const basePoints = difficulty === 'easy' ? 5 : 
                    difficulty === 'medium' ? 10 : 15;
  
  return [
    {
      id: `${quizId}-q1`,
      type: 'multiple-choice',
      question: 'What communication style focuses on expressing needs while respecting others?',
      options: [
        { id: `${quizId}-q1-a`, text: 'Assertive communication', isCorrect: true },
        { id: `${quizId}-q1-b`, text: 'Passive communication', isCorrect: false },
        { id: `${quizId}-q1-c`, text: 'Aggressive communication', isCorrect: false },
        { id: `${quizId}-q1-d`, text: 'Passive-aggressive communication', isCorrect: false },
      ],
      points: basePoints,
    },
    {
      id: `${quizId}-q2`,
      type: 'true-false',
      question: 'Emotional intelligence is more important than IQ for career success.',
      options: [
        { id: `${quizId}-q2-a`, text: 'True', isCorrect: true },
        { id: `${quizId}-q2-b`, text: 'False', isCorrect: false },
      ],
      points: basePoints,
    },
    {
      id: `${quizId}-q3`,
      type: 'multiple-choice',
      question: 'What is the primary purpose of a SWOT analysis?',
      options: [
        { id: `${quizId}-q3-a`, text: 'To identify strengths, weaknesses, opportunities, and threats', isCorrect: true },
        { id: `${quizId}-q3-b`, text: 'To create a financial budget', isCorrect: false },
        { id: `${quizId}-q3-c`, text: 'To evaluate employee performance', isCorrect: false },
        { id: `${quizId}-q3-d`, text: 'To design marketing campaigns', isCorrect: false },
      ],
      points: basePoints + 5,
    },
    {
      id: `${quizId}-q4`,
      type: 'multiple-choice',
      question: 'Which leadership style involves empowering team members to make decisions?',
      options: [
        { id: `${quizId}-q4-a`, text: 'Delegative leadership', isCorrect: true },
        { id: `${quizId}-q4-b`, text: 'Autocratic leadership', isCorrect: false },
        { id: `${quizId}-q4-c`, text: 'Transactional leadership', isCorrect: false },
        { id: `${quizId}-q4-d`, text: 'Laissez-faire leadership', isCorrect: false },
      ],
      points: basePoints + 5,
    },
    {
      id: `${quizId}-q5`,
      type: 'multiple-choice',
      question: 'What is a "SMART" goal?',
      options: [
        { id: `${quizId}-q5-a`, text: 'Specific, Measurable, Achievable, Relevant, Time-bound', isCorrect: true },
        { id: `${quizId}-q5-b`, text: 'Simple, Manageable, Accurate, Realistic, Tactical', isCorrect: false },
        { id: `${quizId}-q5-c`, text: 'Strategic, Motivational, Analytical, Responsive, Technical', isCorrect: false },
        { id: `${quizId}-q5-d`, text: 'Sustainable, Meaningful, Adaptable, Rational, Tested', isCorrect: false },
      ],
      points: basePoints,
    }
  ];
}

function getCompetitiveExamsQuestions(quizId: string, difficulty: string): Question[] {
  const basePoints = difficulty === 'easy' ? 5 : 
                    difficulty === 'medium' ? 10 : 15;
  
  return [
    {
      id: `${quizId}-q1`,
      type: 'multiple-choice',
      question: 'Which of the following is an example of a primary key in a database?',
      options: [
        { id: `${quizId}-q1-a`, text: 'StudentID', isCorrect: true },
        { id: `${quizId}-q1-b`, text: 'StudentName', isCorrect: false },
        { id: `${quizId}-q1-c`, text: 'StudentAddress', isCorrect: false },
        { id: `${quizId}-q1-d`, text: 'StudentGrade', isCorrect: false },
      ],
      points: basePoints,
    },
    {
      id: `${quizId}-q2`,
      type: 'true-false',
      question: 'The time complexity of binary search is O(log n).',
      options: [
        { id: `${quizId}-q2-a`, text: 'True', isCorrect: true },
        { id: `${quizId}-q2-b`, text: 'False', isCorrect: false },
      ],
      points: basePoints,
    },
    {
      id: `${quizId}-q3`,
      type: 'multiple-choice',
      question: 'In statistics, what does the standard deviation measure?',
      options: [
        { id: `${quizId}-q3-a`, text: 'The amount of dispersion in a dataset', isCorrect: true },
        { id: `${quizId}-q3-b`, text: 'The average value of a dataset', isCorrect: false },
        { id: `${quizId}-q3-c`, text: 'The median value of a dataset', isCorrect: false },
        { id: `${quizId}-q3-d`, text: 'The maximum value in a dataset', isCorrect: false },
      ],
      points: basePoints + 5,
    },
    {
      id: `${quizId}-q4`,
      type: 'multiple-choice',
      question: 'Which sorting algorithm has the best average-case time complexity?',
      options: [
        { id: `${quizId}-q4-a`, text: 'Merge sort', isCorrect: true },
        { id: `${quizId}-q4-b`, text: 'Bubble sort', isCorrect: false },
        { id: `${quizId}-q4-c`, text: 'Insertion sort', isCorrect: false },
        { id: `${quizId}-q4-d`, text: 'Selection sort', isCorrect: false },
      ],
      points: basePoints + 5,
    },
    {
      id: `${quizId}-q5`,
      type: 'multiple-choice',
      question: 'In calculus, what is the derivative of sin(x)?',
      options: [
        { id: `${quizId}-q5-a`, text: 'cos(x)', isCorrect: true },
        { id: `${quizId}-q5-b`, text: '-sin(x)', isCorrect: false },
        { id: `${quizId}-q5-c`, text: 'tan(x)', isCorrect: false },
        { id: `${quizId}-q5-d`, text: '-cos(x)', isCorrect: false },
      ],
      points: basePoints + 5,
    }
  ];
}
