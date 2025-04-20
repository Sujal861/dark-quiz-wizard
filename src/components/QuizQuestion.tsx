
import React from 'react';
import { Question } from '../types/quiz';
import QuizOption from './QuizOption';

interface QuizQuestionProps {
  question: Question;
  selectedOption?: string;
  isRevealed: boolean;
  onSelectOption: (questionId: string, optionId: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedOption,
  isRevealed,
  onSelectOption,
}) => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-xl font-medium leading-relaxed">{question.question}</div>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <QuizOption
            key={option.id}
            option={option}
            isSelected={selectedOption === option.id}
            isRevealed={isRevealed}
            onSelect={(optionId) => onSelectOption(question.id, optionId)}
            animationDelay={index * 100}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
