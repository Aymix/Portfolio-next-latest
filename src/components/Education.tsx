import { GraduationIcon, UniversityIcon } from './icons/EducationIcons';

interface Education {
  title: string;
  organization: string;
  date: string;
  icon: 'graduation' | 'university';
}

const education: Education[] = [
  {
    title: "Diploma in Applied Chemistry",
    organization: "Monastir Faculty of sciences",
    date: "2012 – 2016",
    icon: "university"
  },
  {
    title: "Bachelor of Mathematics",
    organization: "College Abou Lkacem Echabi",
    date: "2011 – 2012",
    icon: "graduation"
  }
];

const Education = () => {
  const getIcon = (iconType: Education['icon']) => {
    switch (iconType) {
      case 'graduation':
        return <GraduationIcon className="w-6 h-6" />;
      case 'university':
        return <UniversityIcon className="w-6 h-6" />;
    }
  };

  return (
    <section className='w-full flex mt-[60px]'>
      <div className='w-full px-4 lg:px-0'>
        <div className="h-[1px] bg-[#E0D7CE] mb-5"></div>
        <h2 className="text-[26px] font-serif mb-5 text-[#101010] text-center lg:text-left">Education</h2>

        <div className="space-y-4">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-white border border-[#e5e7eb] rounded-full p-6 flex items-center justify-between hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-gray-600">
                  {getIcon(edu.icon)}
                </div>
                <div>
                  <h3 className="text-lg mb-1 text-[#101010]">{edu.title}</h3>
                  <p className="font-bold text-[#101010]">{edu.organization}</p>
                </div>
              </div>
              <p className="text-gray-500">{edu.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
