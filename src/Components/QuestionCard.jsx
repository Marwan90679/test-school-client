import React from 'react';
import { Button } from './Button';
import { Card } from './Card';

export const QuestionCard = ({ question, selectedAnswer, onAnswerSelect, questionNumber }) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="text-lg font-semibold">
          Question {questionNumber}: {question.question}
        </div>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === option ? 'default' : 'outline'}
              onClick={() => onAnswerSelect(option)}
              className={`w-full justify-start ${selectedAnswer === option ? 'bg-primary text-primary-foreground' : ''}`}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};