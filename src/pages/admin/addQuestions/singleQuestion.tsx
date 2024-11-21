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
  questionNumber: number;
  category: string;
  type: string;
  answer:[]
}

const SingleQuestion: React.FC<QuestionProps> = ({
  question,
  answer,
  options,
  category,
  type,
}) => {
  const correctOptions = options
    .map((option, index) => (option.isCorrect ? String.fromCharCode(65 + index) : ''))
    .filter((char) => char !== '')
    .join(', ');
console.log(question)
  return (
    <div className="p-4 bg-primary rounded-lg shadow-md mb-6">
      <div className='flex gap-2 justify-between'>
        <h3 className="text-btn text-lg font-semibold mb-4">{question}</h3>
        <div className='text-sm font-normal'>
          <Edit size={20} className='cursor-pointer' />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        {options.map((option, index) => (
          <div
            key={index}
            className="p-2 rounded-lg bg-secondary text-btn"
          >
            {String.fromCharCode(65 + index)}. {option}
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <p className='bg-secondary px-4 py-1 rounded'>
          Correct Ans: {answer.map((d)=><span>{d}{type === "Multiple choice" && ", "}</span>)}
        </p>
        <p className='bg-secondary px-4 py-1 rounded'>
          Category: {category}
        </p>
        <p className='bg-secondary px-4 py-1 rounded'>
          Question Type: {type}
        </p>
      </div>
    </div>
  );
};

export default SingleQuestion;
