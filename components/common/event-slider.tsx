import React, { FunctionComponent, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { EventCard, EventSliderArrow } from '@components';

import 'keen-slider/keen-slider.min.css';

export type EventSliderProps = {
  title: string;
  events: any[];
};

export const EventSlider: FunctionComponent<EventSliderProps> = ({
  title,
  events,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 4,
    },
    breakpoints: {
      '(max-width: 432px)': {
        // loop: false,
        slides: {
          perView: 1,
        },
      },
      '(min-width: 433px) and (max-width: 573px)': {
        // loop: false,
        slides: {
          perView: 1.5,
          spacing : 0,
        },
      },
      '(min-width: 574px) and (max-width: 768px)': {
        // loop: false,
        slides: {
          perView: 3,
         
        },
      },

    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="relative mx-6 lg:mx-9">
    <div className=" lg:mx-4 mx-2 mb-0 md:mb-6 font-body font-bold text-black text-3xl md:text-5xl lg:text-6xl ">
        {title}
      </div>
      <div ref={sliderRef} className="keen-slider for-padd">
        {events.map((event: any) => (
          <div className="keen-slider__slide slider-upcoming" key={event.RowKey}>
            <EventCard {...event} />
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <>
          <EventSliderArrow left onClick={instanceRef.current?.prev} />
          <EventSliderArrow
            onClick={() => {
              instanceRef.current?.next();
            }}
            
          />
        </>
      )}
    </div>
  );
};
