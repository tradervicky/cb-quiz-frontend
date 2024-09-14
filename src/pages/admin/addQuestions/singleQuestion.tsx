import { Edit } from 'lucide-react';
import React from 'react';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface QuestionProps {
  question: string;
  options: Option[];
  allowMultiple: boolean;
  questionNumber: number
}

const SingleQuestion: React.FC<QuestionProps> = ({
  question,
  options,
  allowMultiple,
  questionNumber,
}) => {
  const correctOptions = options
    .map((option, index) => (option.isCorrect ? String.fromCharCode(65 + index) : ''))
    .filter((char) => char !== '')
    .join(', ');

  return (
    <div className="p-4 bg-primary rounded-lg shadow-md mb-6">
      <div className='flex gap-2 justify-between'>
      <h3 className="text-btn text-lg font-semibold mb-4">{questionNumber}. {question}</h3>
      <div className='text-sm font-normal'>
      <Edit size={20}/>
      </div>
      </div>
      <div className="space-y-2 mb-4">
        {options.map((option, index) => (
          <div
            key={index}
            className="p-2 rounded-lg bg-secondary text-btn"
          >
            {String.fromCharCode(65 + index)}. {option.text}
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <p className='bg-secondary px-4 py-1 rounded'>
          Correct Ans: {correctOptions}
        </p>
        <p className='bg-secondary px-4 py-1 rounded'>
          Category: Category
        </p>
        <p className='bg-secondary px-4 py-1 rounded'>
          Question Type: {allowMultiple ? "Multiple" : "Single"}
        </p>
      </div>
    </div>
  );
};

export default SingleQuestion;
