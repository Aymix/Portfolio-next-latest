'use client';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="flex mt-8 md:mt-16 lg:mt-24 justify-center h-full w-full">
      <div className="flex flex-col items-center lg:items-start gap-6 w-full max-w-[600px] lg:max-w-none text-center lg:text-left">
        <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto lg:mx-0">
          <Image
            src="/profile-image.jpeg"
            alt="Profile"
            fill
            className="rounded-[35px] object-cover"
            priority
          />
        </div>

        <div className="w-full px-4 lg:px-0">
          <h1 className="text-[36px] md:text-[44px] lg:text-[50px] font-serif text-[#101010] leading-tight">
            Meet Aymen Hmida
          </h1>
          <p className="text-[18px] md:text-[20px] lg:text-[23px] text-[#101010] max-w-[450px] mx-auto lg:mx-0 mt-4">
            He does not like to do introductions. He makes cool stuff.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
