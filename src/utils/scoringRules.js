export const getTestResults = (testId, correctAnswers, totalQuestions) => {
    const percentage = (correctAnswers / totalQuestions) * 100;
    let certificationLevel = "None";
    let message = "You did not achieve a passing score.";
    let canProceed = false;
  
    switch (testId) {
      case 'step1':
        if (percentage >= 75) {
          certificationLevel = "A2";
          message = "Congratulations! You are certified at the A2 level and can proceed to the next step.";
          canProceed = true;
        } else if (percentage >= 50) {
          certificationLevel = "A2";
          message = "Congratulations! You are certified at the A2 level, but you need a higher score to unlock the next test.";
        } else if (percentage >= 25) {
          certificationLevel = "A1";
          message = "You are certified at the A1 level. To advance, you should retake the test and aim for a higher score.";
        } else {
          certificationLevel = "Fail";
          message = "Your score is below the minimum certification threshold. No certification was awarded.";
        }
        break;
  
      case 'step2':
        if (percentage >= 75) {
          certificationLevel = "B2";
          message = "Congratulations! You are certified at the B2 level and can proceed to the next step.";
          canProceed = true;
        } else if (percentage >= 50) {
          certificationLevel = "B2";
          message = "Congratulations! You are certified at the B2 level, but you need a higher score to unlock the next test.";
        } else if (percentage >= 25) {
          certificationLevel = "B1";
          message = "You are certified at the B1 level. To advance, you should retake the test and aim for a higher score.";
        } else {
          certificationLevel = "A2";
          message = "Your score is below the minimum threshold for B levels. You remain at the A2 level.";
        }
        break;
      
      case 'step3':
        if (percentage >= 50) {
          certificationLevel = "C2";
          message = "Congratulations! You are certified at the C2 level and have completed all steps.";
          canProceed = false; // Last step
        } else if (percentage >= 25) {
          certificationLevel = "C1";
          message = "Congratulations! You are certified at the C1 level.";
        } else {
          certificationLevel = "B2";
          message = "Your score is below the minimum threshold for C levels. You remain at the B2 level.";
        }
        break;
  
      default:
        // Default case for any other test IDs
        message = "Results could not be determined.";
        break;
    }
    
    return { correctAnswers, totalQuestions, percentage, certificationLevel, message, canProceed };
  };