import React from 'react';
import { NextPage } from 'next';
import { ParallaxProps } from 'react-parallax';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  AppButton,
  MainSlider,
  UpcomingEvents,
  PreviousEvents,
} from '@components';
import { getAllCountries, getAllEvents, getEvents } from '@services';
import { QUERY_PREVIOUS_EVENTS, QUERY_UPCOMING_EVENTS } from '@constants';
import { useRouter } from 'next/router';

const Parallax = dynamic<ParallaxProps>(
  () => import('react-parallax').then((m) => m.Parallax),
  { ssr: false }
);

export type HomePageProps = {
  upcommingEvents: any[];
  previousEvents: any[];
};

const Home: NextPage<HomePageProps> = ({ upcommingEvents, previousEvents }) => {
  const router = useRouter();
  return (
    <Parallax
      bgImage="https://demo2wpopal.b-cdn.net/spker/wp-content/uploads/2019/07/bg1.svg"
      bgImageAlt="m365 is a global technology"
      strength={600}
    >
      <MainSlider events={upcommingEvents} />
      <div className="my-16">
        <UpcomingEvents events={upcommingEvents} />
      </div>
      <div className="grid grid-cols-1 my-2 mx-6 gap-6 md:grid-cols-2 md:gap -6 md:mx-6 md:my-2 lg:gap-12 lg:mx-12 lg:my-4">
        <div className="bg-[#f4f4f4] rounded-lg py-8 px-10">
          <div className="text-black mb-8 font-dm-sans text-2xl opacity-90">
            What are m365 Events?
          </div>
          <div className="font-body text-lg mb-8">
            <p>
              This is the new events site for all events in the M365 community.
              This site was designed to aggregate all the latest events around
              the global related to Microsoft technologies such as SharePoint,
              PowerPlatform, Azure and more.
            </p>
          </div>
          <AppButton
            text="About Us"
            onClick={() => router.push('/about')}
            hasIcon
          />
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
      <div className="my-16">
        <PreviousEvents events={previousEvents} />
      </div>
    </Parallax>
  );
};

export default Home;

export async function getStaticProps() {
  const upcommingEventsPromise = getEvents(QUERY_UPCOMING_EVENTS);
  const previousEventsPromise = getEvents(QUERY_PREVIOUS_EVENTS);

  const [upcommingEvents, previousEvents] = await Promise.all([
    upcommingEventsPromise,
    previousEventsPromise,
  ]);

  var x = await getAllEvents();
  console.log('🚀 ~ file: index.tsx ~ line 86 ~ getStaticProps ~ x', x);

  var y = await getAllCountries();
  console.log('🚀 ~ file: index.tsx ~ line 89 ~ getStaticProps ~ y', y);

  return {
    props: { upcommingEvents, previousEvents },
  };
}
