import React from "react";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";

const QuizContent = ({
  currentQuestionIndex,
  questions,
  selectedAnswer,
  onAnswerSelect,
  testId,
}) => (
  <div className="max-w-4xl mx-auto space-y-8">
    <ProgressBar
      current={currentQuestionIndex + 1}
      total={questions.length}
      step={testId.toUpperCase()}
    />
    {questions[currentQuestionIndex] && (
      <QuestionCard
        question={questions[currentQuestionIndex]}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={onAnswerSelect}
        questionNumber={currentQuestionIndex + 1}
      />
    )}
  </div>
);

export default QuizContent;
