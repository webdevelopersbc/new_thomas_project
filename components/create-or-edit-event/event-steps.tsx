import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { EventStep } from '@components';

export type EventStepsProps = {
  steps: EventStep[];
};

export const EventSteps: FunctionComponent<EventStepsProps> = ({ steps }) => {
  const renderStep = (step: EventStep, stepIndex: number) => {
    switch (step.status) {
      case 'complete':
        return (
          <>
            {stepIndex !== steps.length - 1 && (
              <div
                className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-indigo-600"
                aria-hidden="true"
              />
            )}
            <span className="relative flex items-start group">
              <span className="h-9 flex items-center">
                <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                  <FontAwesomeIcon
                    icon={faCheck}
                    aria-hidden="true"
                    className="w-5 h-5 text-white"
                  />
                </span>
              </span>
              <span className="ml-4 min-w-0 flex flex-col">
                <span className="text-xs font-semibold tracking-wide uppercase">
                  {step.name}
                </span>
                <span className="text-sm text-gray-500">
                  {step.description}
                </span>
              </span>
            </span>
          </>
        );
      case 'current':
        return (
          <>
            {stepIndex !== steps.length - 1 && (
              <div
                className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                aria-hidden="true"
              />
            )}
            <span
              className="relative flex items-start group"
              aria-current="step"
            >
              <span className="h-9 flex items-center" aria-hidden="true">
                <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full">
                  <span className="h-2.5 w-2.5 bg-indigo-600 rounded-full" />
                </span>
              </span>
              <span className="ml-4 min-w-0 flex flex-col">
                <span className="text-xs font-semibold tracking-wide uppercase text-indigo-600">
                  {step.name}
                </span>
                <span className="text-sm text-gray-500">
                  {step.description}
                </span>
              </span>
            </span>
          </>
        );
      default:
        return (
          <>
            {stepIndex !== steps.length - 1 && (
              <div
                className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                aria-hidden="true"
              />
            )}
            <span className="relative flex items-start group">
              <span className="h-9 flex items-center" aria-hidden="true">
                <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full">
                  <span className="h-2.5 w-2.5 bg-transparent rounded-full" />
                </span>
              </span>
              <span className="ml-4 min-w-0 flex flex-col">
                <span className="text-xs font-semibold tracking-wide uppercase text-gray-500">
                  {step.name}
                </span>
                <span className="text-sm text-gray-500">
                  {step.description}
                </span>
              </span>
            </span>
          </>
        );
    }
  };

  return (
    <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-2">
      <nav aria-label="Progress">
        <ol className="overflow-hidden">
          {steps.map((step, stepIndex) => (
            <li
              key={step.name}
              className={clsx(
                stepIndex !== steps.length - 1 ? 'pb-10' : '',
                'relative'
              )}
            >
              {renderStep(step, stepIndex)}
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
};
