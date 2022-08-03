import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

export function BackToTop() {
  const [offset, setOffset] = useState(0);
  const [progress, setProgress] = useState(0);
  const circleRef = useRef<any>(null);

  const size = 70;
  const strokeWidth = 8;

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = Math.max(
        document.body.offsetHeight,
        document.body.scrollHeight
      );
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const scrollPercentRounded = Math.round(scrollPercent * 100);
      //      console.log(scrollTop, docHeight, winHeight, scrollPercent, scrollPercentRounded)
      setOffset(window.scrollY);
      setProgress(((100 - scrollPercentRounded) / 100) * circumference);
      circleRef.current!.style =
        'transition: stroke-dashoffset 50ms ease-in-out';
    };
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [circumference]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <span
      onClick={scrollToTop}
      role="presentation"
      className={`fixed cursor-pointer z-50 bottom-5 right-5 inline-block invisible ${
        offset < 120 ? 'animate-fade-out' : 'animate-fade-in'
      }`}
    >
      <svg className="svg" width={size} height={size}>
        <defs>
          <linearGradient id="scroll-gradient" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#fd2384" stopOpacity=".6" />
            <stop offset="33%" stopColor="#fd387c" stopOpacity=".6" />
            <stop offset="66%" stopColor="#fd4c72" stopOpacity=".6" />
            <stop offset="100%" stopColor="#fd8a66" stopOpacity=".6" />
          </linearGradient>
        </defs>
        <circle
          className="svg-circle-bg fill-pink opacity-10"
          cx={center}
          cy={center}
          r={radius}
          stroke="#fff"
          strokeDasharray={circumference}
          strokeWidth={strokeWidth}
        />
        <circle
          className="svg-circle fill-white"
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#scroll-gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          ref={circleRef}
        />
        <FontAwesomeIcon
          x={size / 2 - 10}
          y={size / 2 - 10}
          width={20}
          height={20}
          icon={faAngleUp}
          className="text-pink text-sm w-1 h-1"
        />
      </svg>
    </span>
  );
}
