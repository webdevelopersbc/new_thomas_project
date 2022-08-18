import clsx from 'clsx';
import { FunctionComponent } from 'react';

export type EventSliderArrowProps = {
  left?: boolean;
  onClick: (e: any) => void;
};

export const EventSliderArrow: FunctionComponent<EventSliderArrowProps> = ({
  onClick,
  left,
}) => (
    <svg
      onClick={onClick}
      className={clsx(
        'w-20 h-20 absolute tttt z-10 -top-5 fill-red-400 cursor-pointer',
        {
          'right-40': left,
          'right-1': !left,
        }
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  );
