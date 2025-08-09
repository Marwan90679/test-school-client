import React from 'react';
import { Button } from './Button';
import { Card } from './Card';


export const ResultsModal = ({
  isOpen,
  onClose,
  score,
  totalQuestions,
  level,
  canProceed,
  step,
  onProceedToNext,
  onDownloadCertificate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">Quiz Results</h2>
        <div className="text-center text-lg">
          You scored <span className="font-bold">{score}</span> out of <span className="font-bold">{totalQuestions}</span>.
        </div>
        <div className="text-center text-xl font-semibold">
          Achieved Level: {level}
        </div>
        <div className="flex flex-col gap-2">
          {canProceed ? (
            <>
              <Button onClick={onProceedToNext}>Proceed to Next Step</Button>
              <Button variant="outline" onClick={onDownloadCertificate}>Download Certificate</Button>
            </>
          ) : (
            <div className="text-center text-red-500">
              You did not pass this level. Please try again.
            </div>
          )}
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </Card>
    </div>
  );
};