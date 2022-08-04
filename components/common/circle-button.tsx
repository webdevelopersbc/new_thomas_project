import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export type CircleButtonProps = {
  direction: 'right' | 'left';
  className?: string;
  onClick?: () => void;
};

export const CircleButton: FunctionComponent<CircleButtonProps> = ({
  direction,
  className = '',
  onClick,
}) => {
  const disabled =
    className.indexOf('disabled') !== -1 ? 'text-gray-400' : 'text-pink';

  const rightLeft =
    direction === 'left'
      ? '!right-auto !left-0 md:!left-auto md:!right-[105px] lg:!right-36'
      : '!right-0 !left-auto md:!right-6 lg:!right-12';

  return (
    /* Overriding all the Slick styles */
    <button
      type="button"
      onClick={onClick}
      className={`circle-button2 ${className} relative !h-[70px] !w-[70px] md:!-top-12 ${rightLeft} z-30`}
    >
      <div className="bg-white top-[10px] left-[10px] rounded-full h-[50px] w-[50px] absolute z-20 flex items-center justify-center">
        {direction === 'right' && (
          <FontAwesomeIcon
            icon={faAngleRight}
            className={`${disabled} text-lg`}
          />
        )}
        {direction === 'left' && (
          <FontAwesomeIcon
            icon={faAngleLeft}
            className={`${disabled} text-lg`}
          />
        )}
      </div>
      <div className="gradient-bg rounded-full h-[70px] w-[70px] opacity-20 absolute z-10 top-0 left-0" />
    </button>
  );
};
