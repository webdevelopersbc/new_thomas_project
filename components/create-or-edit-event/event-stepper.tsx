import React, { FunctionComponent } from 'react';

export type EventStepperProps = {
  currentStep: number;
  stepsLength: number;
  onComplete: (e: any) => void;
};

export const EventStepper: FunctionComponent<EventStepperProps> = ({
  currentStep,
  stepsLength,
  onComplete,
}) => (
  <div className="absolute right-0 top-0">
    <div className="flex justify-end">
      <button
        onClick={onComplete}
        type="button"
        disabled={currentStep <= 0}
        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Previous
      </button>
      <button
        onClick={onComplete}
        type="button"
        disabled={currentStep >= stepsLength - 1}
        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Next
      </button>
      <button
        type="submit"
        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
      </button>
    </div>
  </div>
);
