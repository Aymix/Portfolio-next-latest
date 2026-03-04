import Image from 'next/image';

interface Experience {
  title: string;
  company: string;
  period: string;
  logo: string;
}

const experiences: Experience[] = [
  {
    title: "Senior Frontend Developer",
    company: "AMITECHSS",
    period: "09/2024 – Present",
    logo: "/company-logos/amitechss.png"
  },
  {
    title: "Fullstack Web Engineer",
    company: "ACOBA",
    period: "08/2022 – 08/2024",
    logo: "/company-logos/acoba.png"
  },
  {
    title: "Senior Software Engineer",
    company: "ITWORX",
    period: "03/2020 - 07/2022",
    logo: "/company-logos/itworx.png"
  },
  {
    title: "Web Developer",
    company: "IT GATE",
    period: "09/2019 – 03/2020",
    logo: "/company-logos/itgate.png"
  },
  {
    title: "Fullstack Developer",
    company: "DRAWNDESIGN",
    period: "09/2017 – 07/2019",
    logo: "/company-logos/drawndesign.png"
  },
  {
    title: "Software Developer",
    company: "FREELANCER",
    period: "10/2016 – 09/2017",
    logo: "/company-logos/freelancer.jpg"
  }
];

const WorkExperience = () => {
  return (
    <section className='w-full flex pt-16 lg:pt-0'>
      <div className='w-full px-4 lg:px-0'>
        <div className="h-[1px] bg-[#E0D7CE] mb-5"></div>
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#101010]/40 font-semibold text-center sm:text-left">
          Companies he worked with
        </h3>
        <h2 className="text-[26px] font-serif mb-5 text-[#101010] text-center lg:text-left">Working experience</h2>

        <div className="space-y-4">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="bg-white border border-[#e5e7eb] rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-lg transition-shadow gap-4 sm:gap-0"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] shrink-0">
                  <div className="absolute inset-0 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center p-2 sm:p-3">
                    <div className="relative w-full h-full">
                      <Image
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg mb-1 text-[#101010]">{experience.title}</h3>
                  <p className="font-bold text-sm sm:text-base text-[#101010]">{experience.company}</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm sm:text-base whitespace-nowrap">{experience.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
