import React, { useState } from "react";
import { Button } from "@components";
import Link from "next/link";
import HamburgerMenu from "react-hamburger-menu";

export function Navigation() {
  const [menuState, setMenuState] = useState(false);
  return (
    <span className="content-start whitespace-nowrap">
      <Link href="/">
        <a className="mx-2 xl:mx-3 hidden lg:inline-flex px-1 xl:px-2 !text-white border-solid border-0 border-transparent border-b-4 hover:border-b-4 hover:border-pink pb-4">
          Home
        </a>
      </Link>
      <Link href="/events">
        <a className="mx-2 xl:mx-3 hidden lg:inline-flex px-1 xl:px-2 !text-white border-solid border-0 border-transparent border-b-4 hover:border-b-4 hover:border-pink pb-4">
          Events
        </a>
      </Link>
      <Link href="/faqs">
        <a className="mx-2 xl:mx-3 hidden lg:inline-flex px-1 xl:px-2 !text-white border-solid border-0 border-transparent border-b-4 hover:border-b-4 hover:border-pink pb-4">
          FAQs
        </a>
      </Link>
      <Link href="/about">
        <a className="mx-2 xl:mx-3 hidden lg:inline-flex px-1 xl:px-2 !text-white border-solid border-0 border-transparent border-b-4 hover:border-b-4 hover:border-pink pb-4">
          About
        </a>
      </Link>
      <Link href="/contact">
        <a className="mx-2 xl:mx-3 hidden lg:inline-flex px-1 xl:px-2 !text-white border-solid border-0 border-transparent border-b-4 hover:border-b-4 hover:border-pink pb-4">
          Contact
        </a>
      </Link>
      <Button
        text="Create Event"
        link="/app/new-event"
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
    </span>
  );
}
