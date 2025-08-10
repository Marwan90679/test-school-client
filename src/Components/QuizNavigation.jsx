import React from "react";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { Button } from "../Components/Button";
import { Card } from "../Components/Card";

const QuizNavigation = ({
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <Card className="p-6 shadow-medium max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onSubmit}
            className="gap-2 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Flag className="h-4 w-4" />
            Submit Test
          </Button>
          {isLastQuestion ? (
            <Button
              onClick={onSubmit}
              disabled={!selectedAnswer}
              className="gap-2 bg-success text-success-foreground"
            >
              Finish Test
              <Flag className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={onNext}
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
  );
};

export default QuizNavigation;
