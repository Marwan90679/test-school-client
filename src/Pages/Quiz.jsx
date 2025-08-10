import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { AssessmentHeader } from "../Components/AssessmentHeader";
import { ProgressBar } from "../Components/ProgressBar";
import { QuestionCard } from "../Components/QuestionCard";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { Button } from "../Components/Button";
import { Card } from "../Components/Card";
import { getTestResults } from '../utils/scoringRules';


// Utility function to get a random sample from an array
const getRandomSample = (array, size) => {
    if (!array || array.length === 0) return [];
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
};

const Quiz = () => {
    const { id: testId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null); 
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [finalResults, setFinalResults] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('/quiz.json');
                const data = await response.json();
                
                let combinedQuestions = [];
                if (testId === 'step1') {
                    const a1Sample = getRandomSample(data.A1, 2);
                    const a2Sample = getRandomSample(data.A2, 2);
                    combinedQuestions = [...a1Sample, ...a2Sample];
                } else if (testId === 'step2') {
                    const b1Sample = getRandomSample(data.B1, 2);
                    const b2Sample = getRandomSample(data.B2, 2);
                    combinedQuestions = [...b1Sample, ...b2Sample];
                } else if (testId === 'step3') {
                    const c1Sample = getRandomSample(data.C1, 2);
                    const c2Sample = getRandomSample(data.C2, 2);
                    combinedQuestions = [...c1Sample, ...c2Sample];
                }
                
                const searchParams = new URLSearchParams(location.search);
                const customTimerPerQuestion = parseInt(searchParams.get('timer'), 10);
                
                const timerPerQuestion = !isNaN(customTimerPerQuestion) && customTimerPerQuestion > 0
                    ? customTimerPerQuestion
                    : 60;
                
                const testDuration = combinedQuestions.length * timerPerQuestion;
                
                setQuestions(combinedQuestions);
                setTimeLeft(testDuration); // The timer now starts only after questions are loaded
                setIsLoading(false);
            } catch (error) {
                console.error("Error loading questions:", error);
                setIsLoading(false);
            }
        };
        fetchQuestions();
    }, [testId, location.search]);

    // Timer countdown logic
    useEffect(() => {
        if (isTimerRunning && timeLeft > 0 && !showResults) {
            const timerId = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [timeLeft, isTimerRunning, showResults]);

    // Auto-submit logic when timer hits zero
    useEffect(() => {
        // This check is the key fix. It only runs if timeLeft is a number and is 0.
        // It will not run on the initial render when timeLeft is null.
        if (typeof timeLeft === 'number' && timeLeft === 0 && isTimerRunning) {
            handleSubmitQuiz();
        }
    }, [timeLeft, isTimerRunning]);


    const handleAnswerSelect = (answer) => {
        setSelectedAnswers({...selectedAnswers, [currentQuestionIndex]: answer});
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const calculateCorrectAnswers = () => {
        let correctAnswers = 0;
        questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correct_answer) {
                correctAnswers++;
            }
        });
        return correctAnswers;
    };
    
    const handleSubmitQuiz = () => {
        setIsTimerRunning(false);
        const correctAnswers = calculateCorrectAnswers();
        const results = getTestResults(testId, correctAnswers, questions.length);
        setFinalResults(results);
        setShowResults(true);
    };

    if (isLoading || timeLeft === null) {
        return (
            <div className="text-center p-8 min-h-screen bg-gray-900 text-white">
                Loading questions for {testId}...
            </div>
        );
        
    }
    
    const handleProceedToNext = () => {
        navigate(`/quiz/step${parseInt(testId.replace('step', '')) + 1}`);
    };
    
    if (showResults) {
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
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const selectedAnswer = selectedAnswers[currentQuestionIndex];

    return (
        <div className="min-h-screen bg-gradient-hero">
            <AssessmentHeader
                timeLeft={timeLeft}
                onTimeUp={handleSubmitQuiz}
                isTimerRunning={isTimerRunning}
                onLogout={() => navigate('/')}
            />
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    <ProgressBar
                        current={currentQuestionIndex + 1}
                        total={questions.length}
                        step={testId.toUpperCase()}
                    />
                    {currentQuestion && (
                        <QuestionCard
                            question={currentQuestion}
                            selectedAnswer={selectedAnswer}
                            onAnswerSelect={handleAnswerSelect}
                            questionNumber={currentQuestionIndex + 1}
                        />
                    )}
                    <Card className="p-6 shadow-medium">
                        <div className="flex items-center justify-between">
                            <Button
                                variant="outline"
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestionIndex === 0}
                                className="gap-2"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={handleSubmitQuiz}
                                    className="gap-2 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                                >
                                    <Flag className="h-4 w-4" />
                                    Submit Test
                                </Button>
                                {isLastQuestion ? (
                                    <Button
                                        onClick={handleSubmitQuiz}
                                        disabled={!selectedAnswer}
                                        className="gap-2 bg-success text-success-foreground"
                                    >
                                        Finish Test
                                        <Flag className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleNextQuestion}
                                        disabled={!selectedAnswer}
                                        className="gap-2 bg-gradient-primary"
                                    >
                                        Next
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Quiz;