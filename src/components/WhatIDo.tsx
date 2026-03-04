import React, { JSX } from 'react';

interface Service {
  title: string;
  description: string;
  icon: JSX.Element;
}

const services: Service[] = [
  {
    title: "Frontend Development",
    description: "Expert in React.js, Next.js, and modern frontend frameworks. Specializing in responsive design and UI/UX implementation with Tailwind CSS and Material-UI.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8" />
        <path d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4" />
        <path d="M12 4v16" />
      </svg>
    )
  },
  {
    title: "Backend Development",
    description: "Building robust server-side applications using Node.js, Laravel, and Python. Experienced in RESTful APIs and database design with MySQL and MongoDB.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    )
  },
  {
    title: "Cloud & DevOps",
    description: "Deploying and managing applications on AWS and Azure. Proficient in Docker containerization and infrastructure management.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    )
  },
  {
    title: "E-commerce Solutions",
    description: "Implementing and customizing e-commerce platforms including WooCommerce, Shopify, and custom solutions with payment gateway integrations.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
    )
  },
  {
    title: "CMS Development",
    description: "Expert in WordPress, Elementor, and custom CMS solutions. Creating and customizing themes, plugins, and integrating third-party services.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    )
  },
  {
    title: "Mobile Development",
    description: "Building cross-platform mobile applications using React Native, Flutter, and Ionic. Experience in creating hybrid web applications and mobile-first solutions.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#101010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12" y2="18" />
      </svg>
    )
  }
];

const WhatIDo = () => {
  return (
    <section className='w-full flex mt-[60px]'>
      <div className='w-full px-4 lg:px-0'>
        <div className="h-[1px] bg-[#E0D7CE] mb-5"></div>
        <h2 className="text-[26px] font-serif mb-5 text-[#101010] text-center lg:text-left">What he does</h2>

        <div className="space-y-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-[#e5e7eb] rounded-3xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-full flex-shrink-0">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-2 text-[#101010]">{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
