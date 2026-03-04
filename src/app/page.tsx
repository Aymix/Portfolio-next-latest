'use client';

import { useEffect, useRef, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import WorkExperience from '@/components/WorkExperience';
import Education from '@/components/Education';
import WhatIDo from '@/components/WhatIDo';
import SelectedWorks from '@/components/SelectedWorks';
import IntroSection from '@/components/IntroSection';

export default function Home() {
  const leftRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [leftWidth, setLeftWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const left = leftRef.current;
      const container = containerRef.current;
      if (!left || !container) return;

      if (window.innerWidth < 1024) {
        setIsFixed(false);
        return;
      }

      const containerRect = container.getBoundingClientRect();

      if (containerRect.top <= 0) {
        setLeftWidth(left.offsetWidth);
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    const handleResize = () => {
      setIsFixed(false);
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="font-[family-name:var(--font-geist-sans)] w-full">
      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-4 pb-32"
      >
        {/* Left section — becomes fixed when scrolled */}
        <div
          ref={leftRef}
          style={isFixed ? { position: 'fixed', top: 0, width: leftWidth } : {}}
          className="w-full lg:w-1/2 pt-8 lg:pt-0 shrink-0"
        >
          <HeroSection />
        </div>

        {/* Spacer — only shown when left section is fixed, to fill the gap */}
        {isFixed && (
          <div style={{ width: leftWidth }} className="shrink-0 hidden lg:block" />
        )}

        {/* Right scrollable section */}
        <div className="w-full lg:w-1/2 space-y-16 lg:space-y-24 shrink-0">
          <IntroSection />
          <WorkExperience />
          <Education />
          <WhatIDo />
          <SelectedWorks />
        </div>
      </div>
    </div>
  );
}
