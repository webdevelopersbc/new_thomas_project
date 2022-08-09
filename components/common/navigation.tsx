import React, { useState } from 'react';
import { AppButton } from '@components';
import Link from 'next/link';
import HamburgerMenu from 'react-hamburger-menu';
import { useRouter } from 'next/router';

export const Navigation = () => {
  const [menuState, setMenuState] = useState(false);
  const router = useRouter();
  return (
    <div className="whitespace-nowrap self-center">
      <Link href="/">
        <a className="mx-2 xl:mx-3 hidden lg:inline-flex px-1 xl:px-2 !text-white border-solid border-0 border-transparent border-b-4 hover:border-b-4 hover:border-pink">
          Home
        </a>
      </Link>
      <Link href="/events">
        <a className="mx-2 xl:mx-3 hidden lg:inline-flex px-1 xl:px-2 !text-white border-solid border-0 border-transparent border-b-4 hover:border-b-4 hover:border-pink">
          Events
        </a>
      </Link>
      <Link href="/faqs">
        <a className="mx-2 xl:mx-3 hidden lg:inline-flex px-1 xl:px-2 !text-white border-solid border-0 border-transparent border-b-4 hover:border-b-4 hover:border-pink">
          FAQs
        </a>
      </Link>
      <Link href="/about">
        <a className="mx-2 xl:mx-3 hidden lg:inline-flex px-1 xl:px-2 !text-white border-solid border-0 border-transparent border-b-4 hover:border-b-4 hover:border-pink">
          About
        </a>
      </Link>
      <Link href="/contact">
        <a className="mx-2 xl:mx-3 hidden lg:inline-flex px-1 xl:px-2 !text-white border-solid border-0 border-transparent border-b-4 hover:border-b-4 hover:border-pink">
          Contact
        </a>
      </Link>
      <AppButton
        text="Create Event"
        onClick={() => router.push('/app/new-event')}
        className="mx-2 xl:mx-5 hidden lg:inline-flex"
      />
      <HamburgerMenu
        className="inline-flex ml-5 relative top-1"
        isOpen={menuState}
        menuClicked={() => {
          setMenuState(!menuState);
        }}
        width={20}
        height={16}
        strokeWidth={2}
        rotate={0}
        color="white"
        borderRadius={0}
        animationDuration={0.5}
      />
    </div>
  );
};
