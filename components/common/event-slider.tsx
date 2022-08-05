import React, { FunctionComponent, useCallback } from 'react';
import { EventCard, CircleButton } from '@components';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export type EventSliderProps = {
  title: string;
  events: any[];
  direction: 'left' | 'right';
};

export const EventSlider: FunctionComponent<EventSliderProps> = ({
  title,
  events,
  direction,
}) => {
  // this sets the previous events slider to start on the last item
  const slider = useCallback(
    (node: any) => {
      if (node !== null) {
        if (direction === 'left') {
          node.slickGoTo(node.innerSlider.state.slideCount - 4);
        }
      }
    },
    [direction]
  );

  return (
    <>
      <div className="mx-6 lg:mx-12 mb-0 md:mb-6 font-body font-bold text-black text-3xl md:text-5xl lg:text-6xl">
        {title}
      </div>

      {events && (
        <Slider
          centerMode={false}
          dots={false}
          infinite={false}
          speed={500}
          swipeToSlide
          slidesToShow={4.5}
          slidesToScroll={4}
          responsive={[
            {
              breakpoint: 1060,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
              },
            },
            {
              breakpoint: 960,
              settings: {
                slidesToShow: 3.5,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 860,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 760,
              settings: {
                slidesToShow: 2.5,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 660,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 560,
              settings: {
                slidesToShow: 1.5,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 460,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
          className="mt-0 md:mt-6"
          nextArrow={<CircleButton direction="right" />}
          prevArrow={<CircleButton direction="left" />}
          ref={slider}
        >
          {events.map((event: any) => (
            <div className="slide" key={event.RowKey}>
              <EventCard {...event} />
            </div>
          ))}
        </Slider>
      )}
    </>
  );
};
