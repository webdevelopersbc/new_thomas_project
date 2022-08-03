import React from 'react';
import Image from 'next/image';
import { Navigation } from '@components';

export const NavBar = () => (
    <div className="flex bg-black bg-opacity-90 columns-2 px-6 lg:px-10 py-5 lg:py-10 z-50 w-full absolute">
      <div className="text-white w-full relative">
        <Image
          className="w-[376px] absolute -top-2"
          src="/images/community-events-logo.png"
          alt="m365 Events"
          width={340}
          height={52}
        />
      </div>
      <div className="text-white justify-end w-full flex">
        <Navigation />
      </div>
    </div>
  );
