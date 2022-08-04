import React, { FunctionComponent, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { datesActive } from '@utils';
import { DateTime } from 'luxon';

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
};

export type CounterProps = {
  startDate: string;
  endDate: string;
};

export const Counter: FunctionComponent<CounterProps> = ({
  startDate,
  endDate,
}) => {
  const startTime = Number(DateTime.now().toJSDate()) / 1000; // use UNIX timestamp in seconds
  const endTime = Number(DateTime.fromISO(startDate).toJSDate()) / 1000;

  const remainingTime = endTime - startTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  const [displayDays, setDisplayDays] = useState(days > 1);
  const [displayHours, setDisplayHours] = useState(true);
  const [displayMinutes, setDisplayMinutes] = useState(true);

  const isLive = datesActive(startDate, endDate);

  /* eslint-disable no-bitwise */
  const getTimeMinutes = (time: number) =>
    ((time % hourSeconds) / minuteSeconds) | 0;

  const getTimeHours = (time: number) =>
    ((time % daySeconds) / hourSeconds) | 0;

  const getTimeDays = (time: number) => (time / daySeconds) | 0;
  /* eslint-enable */

  const renderTime = (dimension: string, time: number) => (
    <div className="time-wrapper h-[120px] w-[120px] text-center bg-white rounded-full opacity-70 px-6 py-6 relative -z-50 flex flex-col justify-center">
      <div className="time text-5xl font-bold text-black">{time}</div>
      <div className="uppercase font-bold text-sm text-black">{dimension}</div>
    </div>
  );

  return (
    <>
      <svg className="absolute">
        <defs>
          <linearGradient id="timer-gradient" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#fd2384" stopOpacity=".6" />
            <stop offset="33%" stopColor="#fd387c" stopOpacity=".6" />
            <stop offset="66%" stopColor="#fd4c72" stopOpacity=".6" />
            <stop offset="100%" stopColor="#fd8a66" stopOpacity=".6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex">
        {!displayDays && !displayHours && !displayMinutes && (
          <>
            {isLive && (
              <div className="font-display text-5xl drop-shadow">
                This event is live
              </div>
            )}
            {!isLive && (
              <div className="font-display text-5xl drop-shadow">
                This event has ended
              </div>
            )}
          </>
        )}
        <div className={`mx-3 ${displayDays === false ? 'hidden' : ''}`}>
          <CountdownCircleTimer
            {...timerProps}
            colors="url(#timer-gradient)"
            trailColor="rgba(255,255,255,0)"
            strokeWidth={6}
            strokeLinecap="square"
            duration={daysDuration}
            initialRemainingTime={remainingTime}
            isPlaying={displayDays}
            updateInterval={60}
            onUpdate={(_remainingTime) => {
              if (displayDays && _remainingTime <= daySeconds) {
                setDisplayDays(false);
              }
            }}
          >
            {({ elapsedTime, color }) => (
              <span style={{ color }}>
                {renderTime('days', getTimeDays(daysDuration - elapsedTime))}
              </span>
            )}
          </CountdownCircleTimer>
        </div>
        <div className={`mx-3 ${displayHours === false ? 'hidden' : ''}`}>
          <CountdownCircleTimer
            {...timerProps}
            colors="url(#timer-gradient)"
            trailColor="rgba(255,255,255,0)"
            strokeWidth={6}
            strokeLinecap="square"
            duration={daySeconds}
            updateInterval={60}
            initialRemainingTime={remainingTime % daySeconds}
            onUpdate={(_remainingTime) => {
              if (
                !displayDays &&
                displayHours &&
                _remainingTime <= hourSeconds
              ) {
                setDisplayHours(false);
              }
            }}
            onComplete={(totalElapsedTime) => {
              const repeat = remainingTime - totalElapsedTime > hourSeconds;
              setDisplayHours(repeat);
              return { shouldRepeat: repeat };
            }}
          >
            {({ elapsedTime, color }) => (
              <span style={{ color }}>
                {renderTime('hours', getTimeHours(daySeconds - elapsedTime))}
              </span>
            )}
          </CountdownCircleTimer>
        </div>
        <div className={`mx-3 ${displayMinutes === false ? 'hidden' : ''}`}>
          <CountdownCircleTimer
            {...timerProps}
            colors="url(#timer-gradient)"
            trailColor="rgba(255,255,255,0)"
            strokeWidth={6}
            strokeLinecap="square"
            duration={hourSeconds}
            updateInterval={60}
            initialRemainingTime={remainingTime % hourSeconds}
            onUpdate={(_remainingTime) => {
              if (
                !displayHours &&
                displayMinutes &&
                _remainingTime <= minuteSeconds
              ) {
                setDisplayMinutes(false);
              }
            }}
            onComplete={(totalElapsedTime) => {
              const repeat = remainingTime - totalElapsedTime > minuteSeconds;
              setDisplayMinutes(repeat);
              return { shouldRepeat: repeat };
            }}
          >
            {({ elapsedTime, color }) => (
              <span style={{ color }}>
                {renderTime(
                  'minutes',
                  getTimeMinutes(hourSeconds - elapsedTime)
                )}
              </span>
            )}
          </CountdownCircleTimer>
        </div>
        {/* // KEEPING the seconds timer for troubleshooting */}
        {/* <div className="hidden">
          <CountdownCircleTimer
            {...timerProps}
            colors="url(#timer-gradient)"
            trailColor="rgba(255,255,255,0)"
            strokeWidth={6}
            strokeLinecap={"square"}
            duration={minuteSeconds}
            initialRemainingTime={remainingTime % minuteSeconds}
            onComplete={totalElapsedTime => ({
              shouldRepeat: remainingTime - totalElapsedTime > 0,
            })}
          >
            {({ elapsedTime, color }) => (
              <span style={{ color }}>
                {renderTime("seconds", getTimeSeconds(elapsedTime))}
              </span>
            )}
          </CountdownCircleTimer>
        </div> */}
      </div>
    </>
  );
};
