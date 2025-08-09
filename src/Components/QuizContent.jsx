import React, { useState } from "react";

const QuizContent = ({ quizData }) => {
  // State for current page
  const [currentPage, setCurrentPage] = useState(0);

  // State for selected answers
  const [selectedAnswers, setSelectedAnswers] = useState({});
  // Simulated user
  const user = { level: "A2" }; // Change to A2 to test

  if (!quizData || !quizData[user.level]) {
    return <p className="text-center mt-6">Loading quizzes...</p>;
  }

  const quizzesPerPage = 4;
  const levelQuizzes = quizData[user.level];

  

  // Slice quizzes for current page
  const startIndex = currentPage * quizzesPerPage;
  const currentQuizzes = levelQuizzes.slice(startIndex, startIndex + quizzesPerPage);

  // Handle selecting an answer
  const handleSelect = (quizIndex, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [quizIndex]: option,
    }));
  };

  // Check if all questions on current page are answered
  const allAnswered = currentQuizzes.every(
    (_, idx) => selectedAnswers[startIndex + idx]
  );

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {user.level} Level Quiz (Page {currentPage + 1} /{" "}
        {Math.ceil(levelQuizzes.length / quizzesPerPage)})
      </h1>

      <div className="space-y-6">
        {currentQuizzes.map((quiz, index) => {
          const absoluteIndex = startIndex + index; // Keeps tracking answers across pages
          return (
            <div
              key={absoluteIndex}
              className="bg-white p-4 rounded-lg shadow-md border"
            >
              <p className="font-semibold mb-2">
                {quiz.question}{" "}
                <span className="text-sm text-gray-500">
                  ({quiz.competency})
                </span>
              </p>
              <div className="space-y-2">
                {quiz.options.map((option, idx) => (
                  <label
                    key={idx}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`quiz-${absoluteIndex}`}
                      value={option}
                      checked={selectedAnswers[absoluteIndex] === option}
                      onChange={() => handleSelect(absoluteIndex, option)}
                      className="form-radio text-blue-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((p) =>
              Math.min(p + 1, Math.ceil(levelQuizzes.length / quizzesPerPage) - 1)
            )
          }
          disabled={
            !allAnswered ||
            currentPage === Math.ceil(levelQuizzes.length / quizzesPerPage) - 1
          }
          className={`px-4 py-2 rounded-lg ${
            !allAnswered ||
            currentPage === Math.ceil(levelQuizzes.length / quizzesPerPage) - 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizContent;
