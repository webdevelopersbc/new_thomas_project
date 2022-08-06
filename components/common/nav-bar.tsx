import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from '@components';

export const NavBar = () => (
  <div className="flex bg-black columns-2 px-6 lg:px-10 py-5 lg:py-10 w-full">
    <div className="text-white w-full relative">
      <Link href="/">
        <Image
          className="w-[376px] absolute cursor-pointer -top-2"
          src="/images/community-events-logo.png"
          alt="m365 Events"
          width={340}
          height={55}
        />
      </Link>
    </div>
    <div className="text-white justify-end flex">
      <Navigation />
    </div>
  </div>
);
