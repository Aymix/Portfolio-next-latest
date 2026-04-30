'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import WorkFilters from './WorkFilters';
import { FaReact, FaWordpress, FaDocker, FaPhp, FaLaravel, FaJs, FaAws, FaMobile, FaShoppingCart } from 'react-icons/fa';
import { SiNextdotjs, SiMongodb, SiDotnet, SiElementor, SiCodeigniter, SiSocketdotio, SiMysql, SiAngular, SiFlutter } from 'react-icons/si';
import { BiCodeAlt } from 'react-icons/bi';
import { AiFillLock } from 'react-icons/ai';
import { MdDesignServices, MdIntegrationInstructions, MdPayment, MdEmail } from 'react-icons/md';
import { BsFileEarmarkCode } from 'react-icons/bs';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { FaTimes } from 'react-icons/fa';
import { FiEyeOff } from 'react-icons/fi';

interface Work {
  title: string;
  description: string;
  image: string;
  url?: string;
  tags: string[];
}

const tagIcons: { [key: string]: JSX.Element } = {
  'React': <FaReact className="mr-1" />,
  'NextJs': <SiNextdotjs className="mr-1" />,
  'Wordpress': <FaWordpress className="mr-1" />,
  'Docker': <FaDocker className="mr-1" />,
  'PHP': <FaPhp className="mr-1" />,
  'Laravel': <FaLaravel className="mr-1" />,
  'Javascript': <FaJs className="mr-1" />,
  'AWS': <FaAws className="mr-1" />,
  'MongoDB': <SiMongodb className="mr-1" />,
  '.net': <SiDotnet className="mr-1" />,
  'Elementor': <SiElementor className="mr-1" />,
  'CodeIgniter': <SiCodeigniter className="mr-1" />,
  'Socket.io': <SiSocketdotio className="mr-1" />,
  'MySQL': <SiMysql className="mr-1" />,
  'Angular': <SiAngular className="mr-1" />,
  'Flutter': <SiFlutter className="mr-1" />,
  'Design': <MdDesignServices className="mr-1" />,
  'Integration': <MdIntegrationInstructions className="mr-1" />,
  'PaymentGateway': <MdPayment className="mr-1" />,
  'WooCommerce': <FaShoppingCart className="mr-1" />,
  'NDA': <AiFillLock className="mr-1" />,
  'Confidential': <AiFillLock className="mr-1" />,
  'Mailing': <MdEmail className="mr-1" />,
  'Plugin': <BsFileEarmarkCode className="mr-1" />,
  'AR': <GiArtificialIntelligence className="mr-1" />,
};

const getIcon = (tag: string) => {
  return tagIcons[tag] || <BiCodeAlt className="mr-1" />;
};

const getAllUniqueTags = (works: Work[]): string[] => {
  const tagsSet = new Set<string>();
  works.forEach(work => work.tags.forEach(tag => tagsSet.add(tag)));
  return Array.from(tagsSet).sort();
};

const works: Work[] = [
  {
    title: "AR Elearning Platform",
    description: "An innovative AR-based e-learning platform leveraging A-Frame for immersive educational experiences.",
    image: "/projects/ar-elearning.png",
    url: "https://www.easyprof.com/easyprof/",
    tags: ["AR", "Aframe", "Javascript", "Integration", "wyswg", "AWS", "NDA"]
  },
  {
    title: "DMS FORME and digi-form",
    description: "Custom WordPress solution with advanced Elementor integration for digital form management.",
    image: "/screenshots/dmsforme/main-page-desktop.png",
    url: "https://www.dmsforme.com",
    tags: ["Wordpress", "Elementor", "Integration"]
  },
  {
    title: "Digi-form Management",
    description: "Internal management sub-page for the DMS FORME platform, featuring complex data tables and filtering.",
    image: "/screenshots/dmsforme/sub-page.png",
    url: "https://www.dmsforme.com",
    tags: ["Wordpress", "Elementor", "Management", "Dashboard", "NDA"]
  },
  {
    title: "KB ITWorx",
    description: "Confidential WordPress plugin development project with custom PHP implementations.",
    image: "/screenshots/Itworx-Screenshots/screencapture-localhost-10040-2025-01-26-20_50_36.png",
    tags: ["Wordpress", "Plugin", "Php",]
  },
  {
    title: "Marovasabe Hotel",
    description: "Elegant hotel website with custom design and WordPress integration.",
    image: "/projects/marovasabe.png",
    url: "https://www.marovasabe.com",
    tags: ["Wordpress", "Design", "Integration", "Elementor", "NDA"]
  },
  {
    title: "Unvarnished by Scott Gilen",
    description: "Custom WordPress website with unique design elements and Elementor integration.",
    image: "/screenshots/unvarnished/portflio.png",
    url: "https://unvarnishedco.com/",
    tags: ["Design", "Wordpress", "Elementor", "Integration"]
  },
  {
    title: "Star2Lead",
    description: "Comprehensive platform with web and mobile applications, featuring Keycloak integration.",
    image: "/screenshots/s2l-landing/main-page-v2.png",
    url: "https://star2Lead.com",
    tags: ["NextJs", "Angular", "React", "Integration", "Keycloak", "Dashboard", "Flutter"]
  },
  {
    title: "S2L Blog",
    description: "WordPress premium blog theme setup and configuration for Star2Lead.",
    image: "/screenshots/s2l-blog/screencapture-blog-star2lead-en-2025-01-26-17_45_43.png",
    url: "https://blog.star2lead.com",
    tags: ["Wordpress", "Integration", "Design"]
  },
  {
    title: "Restaurant Reservation System",
    description: "Confidential project: Advanced restaurant reservation system with QR code integration.",
    image: "/projects/restaurant.png",
    tags: ["Laravel", "VueJs", "QRCode", "NDA", "Dashboard", "Confidential"]
  },
  {
    title: "Camera Management System",
    description: "Modern CMS built with Next.js and MUI, featuring AWS integration and Python backend.",
    image: "/projects/cms.png",
    tags: ["NextJs", "React", "VanilaJS", "AWS", "EC2", "FTP", "Python", "MUI", "NDA"]
  },
  {
    title: "RSS Feed Fetcher",
    description: "Confidential Docker-based RSS feed aggregation system.",
    image: "/projects/rss.png",
    tags: ["Docker", "Integration", "Laravel", "PHP", "RSS/Atom", "NDA", "Confidential"]
  },
  {
    title: "Tunisia Academy Live Platform",
    description: "Real-time e-learning platform with live interaction capabilities.",
    image: "/screenshots/Tunisia-academy/tn-academy-Capture6.PNG",
    tags: ["VueJs", "Laravel", "Integration", "MySQl", "Socket.io", "Design"]
  },
  {
    title: "Bed Builder",
    description: "Session management based interactive bed configuration tool with CodeIgniter backend.",
    image: "/projects/bed-builder.png",
    url: "theraposture.com/bed-builder",
    tags: ["CodeIgniter", "PHP", "Jquery", "Javascript", "Integration", "NDA"]
  },
  {
    title: "Targus New Products",
    description: "E-commerce platform built with NopCommerce and custom integrations.",
    image: "/screenshots/targus.uk.com/targus-landing-page-V2.psd.png",
    url: "targus.uk.com/",
    tags: [".net", "Ecommerce", "Elementor", "Integration", "Javascript", "Design", "NopCommerce"]
  },
  {
    title: "Targus US Product Page Integration",
    description: "High-fidelity product page integration using Bootstrap, featuring PSD slicing and perfect pixel execution.",
    image: "/screenshots/Targus-US-product-page/targus-us-capture9.jpg",
    tags: ["Bootstrap", "PSD Slicing", "Perfect Pixel", "Integration"]
  },
  {
    title: "Cuida Medical Android App",
    description: "Android medical application featuring STT (Speech-To-Text) and TTS (Text-To-Speech) voice assistant capabilities.",
    image: "/projects/cuida-medical.png",
    tags: ["Android", "Java", "Kotlin", "Voice Assistant", "STT", "TTS", "Healthcare", "NDA"]
  },
  {
    title: "Tawaree",
    description: "A professional mobile app showcase website built with WordPress and Elementor.",
    image: "/screenshots/tawaree.qa.com/screencapture-tawaree-local-2026-02-14-17_08_15.png",
    url: "https://tawaree.qa.com",
    tags: ["Wordpress", "Elementor", "Mobile App", "Design"]
  },
  {
    title: "Vagabondage By Maya",
    description: "Custom WooCommerce store with elegant design and functionality.",
    image: "/screenshots/vagabondagebymaya.com/screencapture-vagabondagebymaya-2026-02-11-12_47_09.png",
    url: "https://vagabondagebymaya.com",
    tags: ["Wordpress", "WooCommerce", "Elementor", "Integration", "PHP", "Design"]
  },
  {
    title: "Padel Dashboard",
    description: "Management dashboard for Padel court reservations and club administration.",
    image: "/screenshots/padel-screeshots/dashboard/Screenshot 2026-02-10 at 13.43.10.png",
    tags: ["Flutter", "Node.js", "MongoDB", "Dashboard", "Management"]
  },
  {
    title: "Padel Mobile Application",
    description: "Mobile app for players to book Padel courts and manage their profile.",
    image: "/screenshots/padel-screeshots/mobile-application/image_original5.png",
    tags: ["React Native", "Mobile App", "Booking", "iOS", "Android"]
  },
  {
    title: "Sgovti",
    description: "A comprehensive government service management platform designed for efficiency and transparency.",
    image: "/screenshots/Sgovti-Screenshots/image1.png",
    tags: ["Next.js", "React", "Management", "Dashboard", "Government"]
  },
  {
    title: "Cremeria Scirocco",
    description: "Multi-language WooCommerce store with custom design.",
    image: "/screenshots/cremeriascirocco.it/screencapture-cremeriascirocco-it-wordpress-en-home-2026-02-11-12_29_36.png",
    url: "https://www.cremeriascirocco.it/wordpress/en/home/",
    tags: ["Wordpress", "WooCommerce", "Elementor", "Integration", "PHP", "Design", "Ecommerce"]
  },
  {
    title: "Company Daoudi",
    description: "Professional corporate website for a security and services company.",
    image: "/screenshots/company-daoudi-Screenshots/screencapture-company-daoudi-onrender-2026-01-13-09_56_25 (1).png",
    url: "https://company-daoudi.onrender.com",
    tags: ["React", "Express", "Node.js", "Design", "Security", "Services"]
  },
  {
    title: "Carthage Notes",
    description: "WordPress template integration project.",
    image: "/screenshots/carthage-notes/main-page.png",
    url: "https://carthagenotes.tn",
    tags: ["Wordpress", "Integration", "Template"]
  },
  {
    title: "Flash Interactive Apps",
    description: "Collection of interactive educational games and animations.",
    image: "/projects/flash.png",
    tags: ["Gaming", "Elearning", "Animation", "Motion", "Graphic", "Design", "NDA"]
  },
  {
    title: "RFQ Mailing System",
    description: "Custom mailing system integrated with WooCommerce database.",
    image: "/projects/rfq.png",
    tags: ["Php", "Mailing", "Laravel", "Vuejs", "NDA"]
  },
  {
    title: "IDIS Agency",
    description: "Agency website with custom PHP and Elementor integration.",
    image: "/screenshots/idiscreativemarketing.co.uk/screencapture-idiscreativemarketing-co-uk-2026-02-11-17_18_54.png",
    url: "https://www.idiscreativemarketing.co.uk",
    tags: ["PHP", "Elementor"]
  },
  {
    title: "Theraposture Bed Builder",
    description: "Session management based interactive web application using CodeIgniter that allows users to build and configure custom specialized beds.",
    image: "/screenshots/theraposture-bed-builder/Theraposture-logo.jpg",
    url: "https://www.theraposture.co.uk",
    tags: ["CodeIgniter", "PHP", "JQuery", "Customization", "ProductBuilder"]
  },
  {
    title: "Video Autorun Application",
    description: "Electron-based video player with custom functionality.",
    image: "/projects/video-autorun.png",
    tags: ["ElectronJs", "JQuery", "bootstrap", "NDA", "Confidential", "VideoJs"]
  },
  {
    title: "Fun Projects Collection",
    description: "Various open-source projects showcasing different technologies.",
    image: "/screenshots/fun-projects/fun-projects-screenshots1700758955765.png",
    url: "https://github.com/Aymix",
    tags: ["Vue3", "Vutify", "MongoDB", "Laravel", "ReactNative", "React", "Laravel"]
  }
];

const SelectedWorks = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWorkIndex, setModalWorkIndex] = useState<number | null>(null);

  const nonNdaWorks = works.filter(w => !w.tags.includes('NDA'));

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  const openModal = (image: string) => {
    const index = nonNdaWorks.findIndex(w => w.image === image);
    setModalWorkIndex(index !== -1 ? index : null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalWorkIndex(null);
  };

  const nextWork = () => {
    if (modalWorkIndex !== null) {
      setModalWorkIndex((modalWorkIndex + 1) % nonNdaWorks.length);
    }
  };

  const prevWork = () => {
    if (modalWorkIndex !== null) {
      setModalWorkIndex((modalWorkIndex - 1 + nonNdaWorks.length) % nonNdaWorks.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === 'ArrowRight') nextWork();
      if (e.key === 'ArrowLeft') prevWork();
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, modalWorkIndex]);

  const allTags = getAllUniqueTags(works);

  const getThumbnail = (image: string) => {
    if (image.startsWith('/screenshots/')) {
      return image.replace('/screenshots/', '/thumbnails/');
    }
    return image;
  };

  const normalizeTag = (tag: string): string => {
    // Normalize tags to handle case-insensitive matching and common variations
    const normalizations: { [key: string]: string } = {
      'reactjs': 'React',
      'react.js': 'React',
      'nextjs': 'Next.js',
      'next.js': 'Next.js',
      'vuejs': 'Vue.js',
      'vue.js': 'Vue.js',
      'nodejs': 'Node.js',
      'node.js': 'Node.js',
      'dotnet': '.NET',
      '.net': '.NET',
      'postgresql': 'PostgreSQL',
      'wordpress': 'WordPress',
      'woocommerce': 'WooCommerce',
      'javascript': 'JavaScript',
      'js': 'JavaScript',
      'typescript': 'TypeScript',
      'ts': 'TypeScript'
    };

    const normalized = tag.toLowerCase();
    return normalizations[normalized] || tag;
  };

  const filteredWorks = works.filter(work => {
    if (selectedTags.length === 0) return true;

    return selectedTags.some(selectedTag =>
      work.tags.some(workTag =>
        normalizeTag(workTag).toLowerCase() === normalizeTag(selectedTag).toLowerCase()
      )
    );
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <section id="work" className="w-full mt-[60px] pb-12 overflow-x-hidden">
      <div className="w-full px-4 lg:px-0">
        <div className="h-[1px] bg-[#E0D7CE] mb-5"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <h2 className="text-[26px] font-serif text-[#101010] text-center lg:text-left">Selected works</h2>
          <div className="flex justify-center lg:justify-end overflow-x-auto pb-2 scrollbar-hide">
            <WorkFilters
              allTags={allTags}
              selectedTags={selectedTags}
              onTagToggle={toggleTag}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredWorks.map((work, index) => (
            <div
              key={index}
              className="block group animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white border border-[#e5e7eb] rounded-3xl overflow-hidden hover:shadow-lg transition-all">
                <div className={`relative aspect-[4/3] w-full p-6 ${!work.tags.includes('NDA') ? 'cursor-pointer' : ''}`}
                  onClick={() => !work.tags.includes('NDA') && openModal(work.image)}
                >
                  <div className="relative w-full h-full group/img">
                    <Image
                      src={work.tags.includes('NDA') ? '/nda-placeholder.png' : getThumbnail(work.image)}
                      alt={work.title}
                      fill
                      className={`object-cover object-top rounded-2xl transition-transform duration-500 group-hover/img:scale-[1.02] ${work.tags.includes('NDA') ? 'blur-md' : ''
                        }`}
                    />
                    {!work.tags.includes('NDA') && (
                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover/img:opacity-100 rounded-2xl">
                        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    )}
                    {work.tags.includes('NDA') && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FiEyeOff className="text-white text-4xl bg-black/20 p-2 rounded-full" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6 pt-[0px]">
                  <h3 className="text-xl font-serif mb-2 text-[#101010]">
                    {work.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{work.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {work.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-sm rounded-md flex items-center bg-black text-white"
                      >
                        {normalizeTag(tag)}
                      </span>
                    ))}
                  </div>
                  {work.url && !work.tags.includes('NDA') && (
                    <a
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-blue-600 hover:text-blue-800"
                    >
                      Visit Project →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="fixed inset-0 flex items-center justify-center z-50 p-4 lg:p-8 outline-none"
        overlayClassName="fixed inset-0 bg-black/95 backdrop-blur-xl z-40"
        closeTimeoutMS={300}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-[60] text-white/50 hover:text-white transition-all bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md"
            aria-label="Close modal"
          >
            <FaTimes className="text-xl" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); prevWork(); }}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-[60] text-white/50 hover:text-white transition-all bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-md group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextWork(); }}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-[60] text-white/50 hover:text-white transition-all bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-md group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="relative w-full max-w-5xl h-[80vh] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
            {modalWorkIndex !== null && (
              <>
                <div className="relative w-full h-full bg-transparent rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src={nonNdaWorks[modalWorkIndex].image}
                    alt={nonNdaWorks[modalWorkIndex].title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                
                <div className="mt-8 text-center bg-black/40 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/5 shadow-xl">
                  <h3 className="text-2xl font-serif text-white mb-1">
                    {nonNdaWorks[modalWorkIndex].title}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
                    <span>{modalWorkIndex + 1}</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                    <span>{nonNdaWorks.length} projects</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default SelectedWorks;
