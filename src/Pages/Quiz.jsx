import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { AssessmentHeader } from "../Components/AssessmentHeader";
import QuizContent from "../Components/QuizContent";
import QuizNavigation from "../Components/QuizNavigation";
import QuizResults from "../Components/QuizResults";
import { getTestResults } from "../utils/scoringRules";

const getRandomSample = (array, size) => {
  if (!array || array.length === 0) return [];
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
};

const Quiz = () => {
  const { id: testId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const [hasFailed, setHasFailed] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [finalResults, setFinalResults] = useState(null);
  const [isPatching, setIsPatching] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState("");

  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:5000/users/data?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          // Correcting the case to match the user data provided
          const failed = data.certificates?.includes("Failed") || false;
          setHasFailed(failed);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5000/");
        const data = await response.json();

        // Assuming the API returns an array with one document containing all levels
        const quizData = data[0]; // Access the first (and likely only) document

        let combinedQuestions = [];
        if (testId === "step1") {
          const a1Sample = getRandomSample(quizData.A1, 22);
          const a2Sample = getRandomSample(quizData.A2, 22);
          combinedQuestions = [...a1Sample, ...a2Sample];
        } else if (testId === "step2") {
          const b1Sample = getRandomSample(quizData.B1, 22);
          const b2Sample = getRandomSample(quizData.B2, 22);
          combinedQuestions = [...b1Sample, ...b2Sample];
        } else if (testId === "step3") {
          const c1Sample = getRandomSample(quizData.C1, 22);
          const c2Sample = getRandomSample(quizData.C2, 22);
          combinedQuestions = [...c1Sample, ...c2Sample];
        }

        const searchParams = new URLSearchParams(location.search);
        const customTimerPerQuestion = parseInt(searchParams.get("timer"), 10);

        const timerPerQuestion =
          !isNaN(customTimerPerQuestion) && customTimerPerQuestion > 0
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
        setShowTransition(false);
        setTransitionMessage("");
      } catch (error) {
        console.error("Error loading questions:", error);
        setIsLoading(false);
      }
    };
    // Only fetch questions if the user exists and has not failed
    if (userData && !hasFailed) {
      fetchQuestions();
    } else if (userData && hasFailed) {
      // This ensures that if the user has failed, isLoading is set to false
      // so the component can proceed to the next rendering block.
      setIsLoading(false);
    }
  }, [userData, hasFailed, testId, location.search]);

  // Timer countdown logic
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0 && !showResults && !showTransition) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft, isTimerRunning, showResults, showTransition]);

  // Auto-submit logic when timer hits zero
  useEffect(() => {
    if (typeof timeLeft === "number" && timeLeft === 0 && isTimerRunning) {
      handleSubmitQuiz();
    }
  }, [timeLeft, isTimerRunning]);

  const getSections = () => {
    if (testId === "step1") {
      return [
        { name: "A1", start: 0, end: 21 },
        { name: "A2", start: 22, end: 43 },
      ];
    } else if (testId === "step2") {
      return [
        { name: "B1", start: 0, end: 21 },
        { name: "B2", start: 22, end: 43 },
      ];
    } else if (testId === "step3") {
      return [
        { name: "C1", start: 0, end: 21 },
        { name: "C2", start: 22, end: 43 },
      ];
    }
    return [];
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: answer });
  };

  const handleNextQuestion = () => {
    const sections = getSections();
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      if (sections.length > 1 && nextIndex === sections[1].start) {
        setShowTransition(true);
        setTransitionMessage(
          `${sections[0].name} questions completed. Move to ${sections[1].name}.`
        );
        return;
      }
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleProceedToNextSection = () => {
    setShowTransition(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
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

    if (user) {
      if (testId === "step1" && results.certificationLevel === "Fail") {
       
        try {
          await fetch(
            `http://localhost:5000/users/mark-failed?email=${user.email}`,
            {
              method: "PATCH",
            }
          );
          console.log(`User ${user.email} marked as Failed.`);
        } catch (error) {
          console.error("Failed to mark user as Failed:", error);
        }
      } else if (
        results.certificationLevel &&
        results.certificationLevel !== "None"
      ) {
        // Existing certificate patch logic
        let certificateToPatch = results.certificationLevel;
        if (certificateToPatch === "Fail") {
          certificateToPatch = "Failed";
        }
        try {
          const apiUrl = `http://localhost:5000/users/certificates?email=${user.email}`;
          await fetch(apiUrl, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ certificate: certificateToPatch }),
          });
        } catch (error) {
          console.error("Failed to patch user certificate:", error);
        }
      }
    }

    setShowResults(true);
  };

  const onProceedToNext = () => {
    // Reset the state to show the quiz again
    setShowResults(false);
    const nextStepId = `step${parseInt(testId.replace("step", "")) + 1}`;
    const searchParams = new URLSearchParams(location.search);
    const timer = searchParams.get("timer") || "60";
    navigate(`/quiz/${nextStepId}?timer=${timer}`);
  };

  // Renders the "Access Denied" page immediately if the user has failed.
  if (hasFailed) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-red-400">
            Access Denied
          </h2>
          <p className="text-lg">
            We're sorry, you have a **Failed** status and cannot retake any
            quizzes or proceed at this time.
          </p>
        </div>
      </div>
    );
  }
  // Now, check for loading only after we know the user hasn't failed.
  if (isLoading || timeLeft === null) {
    return (
      <div className="text-center p-8 min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        <span className="ml-4 text-lg">Loading questions for {testId}...</span>
      </div>
    );
  }

  if (showResults) {
    return (
      <QuizResults
        testId={testId}
        finalResults={finalResults}
        navigate={navigate}
        onProceedToNext={onProceedToNext}
        isPatching={isPatching}
      />
    );
  }

  if (showTransition) {
    return (
      <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold mb-4">{transitionMessage}</h2>
        <button
          onClick={handleProceedToNextSection}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
        >
          Proceed
        </button>
      </div>
    );
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
