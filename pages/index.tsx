import React from 'react';
import Image from 'next/image';
import { Parallax } from 'react-parallax';
import { NextPage } from 'next';
import { Button } from '@components';

const Home: NextPage = () => (
  <Parallax
    bgImage="https://demo2wpopal.b-cdn.net/spker/wp-content/uploads/2019/07/bg1.svg"
    bgImageAlt="m365 is a global technology"
    strength={600}
  >
    <div className="grid grid-cols-1 my-2 mx-6 gap-6 md:grid-cols-2 md:gap -6 md:mx-6 md:my-2 lg:gap-12 lg:mx-12 lg:my-4">
      <div className="bg-[#f4f4f4] rounded-lg py-8 px-10">
        <div className="text-black mb-8 font-dm-sans text-2xl opacity-90">
          What are m365 Events?
        </div>
        <div className="font-body text-lg mb-8">
          <p>
            This is the new events site for all events in the M365 community.
            This site was designed to aggregate all the latest events around the
            global related to Microsoft technologies such as SharePoint,
            PowerPlatform, Azure and more.
          </p>
        </div>
        <Button text="About Us" link="/about" icon />
      </div>
      <div>
        <Image
          width={829}
          height={449}
          src="/images/conference.jpg"
          alt="SharePoint Conference"
          className="rounded-lg"
        />
      </div>
    </div>
  </Parallax>
);

export default Home;
