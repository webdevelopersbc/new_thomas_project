import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';

export type ButtonProps = {
  className?: string;
  link: string;
  text: string;
  icon?: boolean;
};

export const Button: FunctionComponent<ButtonProps> = ({
  className = '',
  link = '',
  text,
  icon,
}) => (
  <a
    href={link}
    className={`px-6 py-3 rounded-full gradient-bg whitespace-nowrap h-fit inline-flex items-center text-white hover:text-white text-lg font-body font-bold ${className}`}
  >
    {text}{' '}
    {icon && (
      <FontAwesomeIcon icon={faRightLong} className="ml-4 top-px relative" />
    )}
  </a>
);
