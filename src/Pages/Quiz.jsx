import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext'; 
import { AssessmentHeader } from "../Components/AssessmentHeader";
import QuizContent from "../Components/QuizContent";
import QuizNavigation from "../Components/QuizNavigation";
import QuizResults from "../Components/QuizResults";
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

    // Get the user object from the AuthContext to access the email
    const { user } = useContext(AuthContext);

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null); 
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [finalResults, setFinalResults] = useState(null);
    const [isPatching, setIsPatching] = useState(false);

    // This effect runs whenever the quiz ID or location search params change.
    // It fetches new questions and resets the state for a fresh quiz.
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
                setTimeLeft(testDuration);
                setIsLoading(false);
                
                // Resetting other states for a fresh quiz instance.
                setShowResults(false);
                setSelectedAnswers({});
                setCurrentQuestionIndex(0);
                setIsTimerRunning(true);
                setFinalResults(null);

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
    
    const handleSubmitQuiz = async () => {
        setIsTimerRunning(false);
        const correctAnswers = calculateCorrectAnswers();
        const results = getTestResults(testId, correctAnswers, questions.length);
        setFinalResults(results);

        // New logic: Check for certification and patch user data
        if (user && results.certificationLevel) {
            setIsPatching(true);
            try {
                // The API URL now uses the user's email as a query parameter
                const apiUrl = `http://localhost:5000/users/certificates?email=${user.email}`;
                
                const response = await fetch(apiUrl, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ certificate: results.certificationLevel }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to patch user certificate');
                }

                console.log(`Successfully patched certificate for user ${user.email}`);
            } catch (error) {
                console.error("Failed to patch user certificate:", error);
            } finally {
                setIsPatching(false);
            }
        }
        
        setShowResults(true);
    };

    const onProceedToNext = () => {
        // Reset the state to show the quiz again
        setShowResults(false);
        const nextStepId = `step${parseInt(testId.replace('step', '')) + 1}`;
        const searchParams = new URLSearchParams(location.search);
        const timer = searchParams.get('timer') || '60';
        navigate(`/quiz/${nextStepId}?timer=${timer}`);
    };


    if (isLoading || timeLeft === null) {
        return (
            <div className="text-center p-8 min-h-screen bg-gray-900 text-white">
                Loading questions for {testId}...
            </div>
        );
    }
    
    if (showResults) {
        return <QuizResults testId={testId} finalResults={finalResults} navigate={navigate} onProceedToNext={onProceedToNext} isPatching={isPatching} />;
    }

    const selectedAnswer = selectedAnswers[currentQuestionIndex];

    return (
        <div className="min-h-screen bg-gradient-hero">
            <AssessmentHeader
                timeLeft={timeLeft}
                onTimeUp={handleSubmitQuiz}
                isTimerRunning={isTimerRunning}
            
            />
            <div className="container mx-auto px-6 py-8">
                <QuizContent
                    currentQuestionIndex={currentQuestionIndex}
                    questions={questions}
                    selectedAnswer={selectedAnswer}
                    onAnswerSelect={handleAnswerSelect}
                    testId={testId}
                />
            </div>
            <QuizNavigation
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                selectedAnswer={selectedAnswer}
                onPrevious={handlePreviousQuestion}
                onNext={handleNextQuestion}
                onSubmit={handleSubmitQuiz}
            />
        </div>
    );
};

export default Quiz;
