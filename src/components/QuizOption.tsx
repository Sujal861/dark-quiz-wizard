
import React from 'react';
import { Option } from '../types/quiz';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

interface QuizOptionProps {
  option: Option;
  isSelected: boolean;
  isRevealed: boolean;
  onSelect: (optionId: string) => void;
  animationDelay: number;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  isRevealed,
  onSelect,
  animationDelay,
}) => {
  const getOptionClasses = () => {
    if (!isRevealed) {
      return isSelected ? 'quiz-option-selected' : '';
    }
    
    if (option.isCorrect) {
      return 'quiz-option-correct';
    }
    
    if (isSelected && !option.isCorrect) {
      return 'quiz-option-incorrect';
    }
    
    return '';
  };

  const handleClick = () => {
    if (!isRevealed) {
      onSelect(option.id);
    }
  };

  return (
    <div
      className={cn(
        "quiz-option animate-slide-in-right relative",
        getOptionClasses()
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          {option.text}
        </div>
        {isRevealed && (
          <div className="flex-shrink-0">
            {option.isCorrect ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              isSelected && <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizOption;
