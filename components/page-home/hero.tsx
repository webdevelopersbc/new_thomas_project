import React, { useState, useEffect } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import { limit, randomizeSameDayEvents, sort } from '@utils';
import { HeroTile } from '@components';
import { getEvents } from '@services';
import { QUERY_UPCOMING_EVENTS } from '@constants';

const pluginWrapper = () => {
  require('../../public/scripts/fullpage.scrollHorizontally.min');
};

export function Hero() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>();

  useEffect(() => {
    const fetchData = async () => {
      const events = await getEvents(QUERY_UPCOMING_EVENTS);
      const sorted = sort(events, 'start_date', 'asc');
      const limited = limit(sorted, 5);
      const randomized = randomizeSameDayEvents(limited);
      console.log(randomized);
      setUpcomingEvents(randomized);
    };
    fetchData();
  }, []);

  return (
    <div className="hero-widget">
      {upcomingEvents && (
        <ReactFullpage
          pluginWrapper={pluginWrapper}
          licenseKey={undefined} // "216B910D-F5E14C7C-AAE1B0D7-D1305815"
          autoScrolling={false}
          fitToSection={false}
          scrollHorizontally
          // dataPercentage={80}
          // dataCentered={false}
          offsetSections
          slidesNavPosition="bottom"
          slidesNavigation
          scrollingSpeed={1000}
          render={() => (
            <ReactFullpage.Wrapper>
              <div className="section" id="adjustable-section">
                {upcomingEvents.map((event: any) => (
                  <div className="slide" key={event.RowKey}>
                    <HeroTile event={event} showDetails />
                  </div>
                ))}
              </div>
            </ReactFullpage.Wrapper>
          )}
        />
      )}
    </div>
  );
}
