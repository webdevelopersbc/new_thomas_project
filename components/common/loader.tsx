import React, { FunctionComponent } from 'react';
import Image from 'next/image';

export type LoaderProps = {
  text: string;
};

export const Loader: FunctionComponent<LoaderProps> = ({ text }) => (
  <div className="fixed flex-col flex items-center justify-center top-0 left-0 w-[100vw] h-[100vh] bg-opacity-80 bg-white z-50">
    <div>
      <Image
        width={80}
        height={80}
        alt="loader"
        src="/images/loader.svg"
      />
    </div>
    {text && <div>{text}</div>}
  </div>
);
