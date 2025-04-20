import { Quiz } from "../types/quiz";

export const quizzes: Quiz[] = [
  {
    id: "typescript-basics",
    title: "TypeScript Fundamentals",
    description: "Test your knowledge of TypeScript basic concepts and syntax",
    timeLimit: 300, // 5 minutes
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "What is TypeScript?",
        options: [
          { 
            id: "q1_a", 
            text: "A programming language that is a superset of JavaScript", 
            isCorrect: true 
          },
          { 
            id: "q1_b", 
            text: "A new JavaScript framework", 
            isCorrect: false 
          },
          { 
            id: "q1_c", 
            text: "A JavaScript library for building user interfaces", 
            isCorrect: false 
          },
          { 
            id: "q1_d", 
            text: "A JavaScript testing framework", 
            isCorrect: false 
          },
        ],
        points: 10,
      },
      {
        id: "q2",
        type: "true-false",
        question: "TypeScript code needs to be compiled before it can run in a browser.",
        options: [
          { id: "q2_a", text: "True", isCorrect: true },
          { id: "q2_b", text: "False", isCorrect: false },
        ],
        points: 5,
      },
      {
        id: "q3",
        type: "multiple-choice",
        question: "Which of the following is NOT a primitive type in TypeScript?",
        options: [
          { id: "q3_a", text: "string", isCorrect: false },
          { id: "q3_b", text: "boolean", isCorrect: false },
          { id: "q3_c", text: "object", isCorrect: true },
          { id: "q3_d", text: "number", isCorrect: false },
        ],
        points: 10,
      },
      {
        id: "q4",
        type: "multiple-choice",
        question: "What does the 'interface' keyword do in TypeScript?",
        options: [
          { 
            id: "q4_a", 
            text: "Creates a new instance of a class", 
            isCorrect: false 
          },
          { 
            id: "q4_b", 
            text: "Defines a data structure contract that objects must adhere to", 
            isCorrect: true 
          },
          { 
            id: "q4_c", 
            text: "Declares a new variable", 
            isCorrect: false 
          },
          { 
            id: "q4_d", 
            text: "Creates a new function", 
            isCorrect: false 
          },
        ],
        points: 15,
      },
      {
        id: "q5",
        type: "multiple-choice",
        question: "Which symbol is used for optional properties in TypeScript interfaces?",
        options: [
          { id: "q5_a", text: "?", isCorrect: true },
          { id: "q5_b", text: "!", isCorrect: false },
          { id: "q5_c", text: "*", isCorrect: false },
          { id: "q5_d", text: "&", isCorrect: false },
        ],
        points: 10,
      },
      {
        id: "q6",
        type: "true-false",
        question: "TypeScript supports all JavaScript libraries and frameworks.",
        options: [
          { id: "q6_a", text: "True", isCorrect: true },
          { id: "q6_b", text: "False", isCorrect: false },
        ],
        points: 5,
      },
      {
        id: "q7",
        type: "multiple-choice",
        question: "What is the 'any' type in TypeScript?",
        options: [
          { 
            id: "q7_a", 
            text: "A type that can represent any JavaScript value", 
            isCorrect: true 
          },
          { 
            id: "q7_b", 
            text: "A type that can only contain arrays", 
            isCorrect: false 
          },
          { 
            id: "q7_c", 
            text: "A type for unknown values", 
            isCorrect: false 
          },
          { 
            id: "q7_d", 
            text: "A type that cannot be used in TypeScript", 
            isCorrect: false 
          },
        ],
        points: 10,
      },
      {
        id: "q8",
        type: "multiple-choice",
        question: "How do you define a function type in TypeScript?",
        options: [
          { 
            id: "q8_a", 
            text: "function myFunc(): string {}", 
            isCorrect: false 
          },
          { 
            id: "q8_b", 
            text: "let myFunc: () => string;", 
            isCorrect: true 
          },
          { 
            id: "q8_c", 
            text: "type myFunc = string;", 
            isCorrect: false 
          },
          { 
            id: "q8_d", 
            text: "const myFunc: Function;", 
            isCorrect: false 
          },
        ],
        points: 15,
      },
      {
        id: "q9",
        type: "true-false",
        question: "TypeScript supports generics for creating reusable components.",
        options: [
          { id: "q9_a", text: "True", isCorrect: true },
          { id: "q9_b", text: "False", isCorrect: false },
        ],
        points: 5,
      },
      {
        id: "q10",
        type: "multiple-choice",
        question: "Which TypeScript feature allows for compile-time checking of property names?",
        options: [
          { id: "q10_a", text: "Classes", isCorrect: false },
          { id: "q10_b", text: "Decorators", isCorrect: false },
          { id: "q10_c", text: "Type guards", isCorrect: false },
          { id: "q10_d", text: "Interfaces", isCorrect: true },
        ],
        points: 15,
      }
    ],
  },
  {
    id: "advanced-typescript",
    title: "Advanced TypeScript",
    description: "Challenge yourself with advanced TypeScript concepts and features",
    timeLimit: 600, // 10 minutes
    questions: [
      {
        id: "adv_q1",
        type: "multiple-choice",
        question: "What are TypeScript decorators primarily used for?",
        options: [
          { id: "adv_q1_a", text: "Type checking", isCorrect: false },
          { id: "adv_q1_b", text: "Code formatting", isCorrect: false },
          { id: "adv_q1_c", text: "Metadata programming and annotations", isCorrect: true },
          { id: "adv_q1_d", text: "Database operations", isCorrect: false },
        ],
        points: 15,
      },
      // Other advanced questions would be here
    ],
  }
];
