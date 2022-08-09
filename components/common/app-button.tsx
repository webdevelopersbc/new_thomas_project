import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';

export type AppButtonProps = {
  className?: string;
  link?: string;
  text: string;
  hasIcon?: boolean;
  onClick?: () => void;
};

export const AppButton: FunctionComponent<AppButtonProps> = ({
  className = '',
  link = '',
  text,
  hasIcon,
  onClick,
}) => {
  if (link) {
    return (
      <a
        href={link}
        className={`px-6 py-3 rounded-full gradient-bg whitespace-nowrap h-fit inline-flex items-center text-white hover:text-white text-lg font-body font-bold ${className}`}
      >
        {text}
        {hasIcon && (
          <FontAwesomeIcon
            icon={faRightLong}
            className="ml-4 top-px relative"
          />
        )}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-3 rounded-full gradient-bg whitespace-nowrap h-fit inline-flex items-center text-white hover:text-white text-lg font-body font-bold ${className}`}
    >
      {text}
      {hasIcon && (
        <FontAwesomeIcon icon={faRightLong} className="ml-4 top-px relative" />
      )}
    </button>
  );
};
