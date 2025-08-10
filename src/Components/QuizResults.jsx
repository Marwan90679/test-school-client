import React from "react";
import { useLocation } from "react-router";
import { Button } from "../Components/Button";

const QuizResults = ({ testId, finalResults, navigate, onProceedToNext }) => {
    const location = useLocation();

    const handleProceedToNext = () => {
        // The parent component handles the navigation and state reset
        onProceedToNext();
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col justify-center items-center">
            <div className="max-w-2xl mx-auto text-center space-y-6">
                <h1 className="text-5xl font-extrabold text-white">
                    {testId.toUpperCase()} Results
                </h1>
                <p className="text-2xl font-bold text-gray-400">
                    {finalResults.message}
                </p>
                <div className="bg-gray-800 p-8 rounded-lg shadow-xl space-y-4">
                    <div className="flex justify-between items-center text-xl">
                        <span className="font-semibold">Correct Answers:</span>
                        <span className="text-green-400 font-bold">{finalResults.correctAnswers} / {finalResults.totalQuestions}</span>
                    </div>
                    <div className="flex justify-between items-center text-xl">
                        <span className="font-semibold">Score:</span>
                        <span className="text-purple-400 font-bold">{finalResults.percentage.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center text-xl">
                        <span className="font-semibold">Certification Level:</span>
                        <span className="text-amber-400 font-bold">{finalResults.certificationLevel}</span>
                    </div>
                </div>
                <div className="flex justify-center gap-4 mt-8">
                    {finalResults.canProceed && (
                        <Button
                            onClick={handleProceedToNext}
                            className="bg-gradient-primary"
                        >
                            Proceed to Next Test
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        onClick={() => navigate('/')}
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QuizResults;
