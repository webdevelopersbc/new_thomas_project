import React, { useState, FunctionComponent } from 'react';
import { limit, randomizeSameDayEvents, sort } from '@utils';
import { useKeenSlider } from 'keen-slider/react';
import { clsx } from 'clsx';
import { HeroTile, SliderArrow } from '@components';

import 'keen-slider/keen-slider.min.css';


export type MainSliderProps = {
  events: any[];
};

export const MainSlider: FunctionComponent<MainSliderProps> = ({ events }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const eventNum = events.length;
  const sortedEvent = sort(events, 'start_date', 'asc');
  const limitedEvent = limit(sortedEvent, eventNum);
  const randomizedEvents = randomizeSameDayEvents(limitedEvent);

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider for-heigth">
        {randomizedEvents.map((event: any) => (
          <div className="keen-slider__slide" key={event.RowKey}>
            <HeroTile event={event} showDetails />
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <>
          <SliderArrow 
            left
            onClick={instanceRef.current?.prev}
          />
          <SliderArrow
            onClick={() => {
              instanceRef.current?.next();
            }}
          />
        </>
      )}
      {loaded && instanceRef.current && (
        <div className="flex absolute bottom-8 left-1/2 -translate-x-1/2 justify-center  ">
          {randomizedEvents.map((event, idx) => (
            <button
              type="button"
              key={event.RowKey}
              onClick={() => {
                instanceRef.current?.moveToIdx(idx);
              }}
              className={clsx(
                'border-0 w-5 h-5 rounded-full mx-2 cursor-pointer focus:outline-none dot',
                {
                  'bg-red-500': currentSlide === idx,
                  'bg-white': currentSlide !== idx,
                }
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
