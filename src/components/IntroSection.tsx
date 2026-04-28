'use client';
import Link from 'next/link';
import { FaGithub, FaDownload, FaEnvelope, FaBriefcase, FaLinkedin, FaStar } from 'react-icons/fa';
import { SiFreelancer } from 'react-icons/si';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    text: "Excellent work as usual, I have been working with Ayment for years now and he never failed me in any delivery",
    author: "@DawletMazen",
    location: "Cairo, Egypt",
    tags: ["Software Development", "Long-term Partner"]
  },
  {
    text: "Flawless experience, fast delivery, excellent communication",
    author: "@brigadehu",
    location: "Budapest, Hungary",
    tags: ["Communication", "Fast Delivery"]
  },
  {
    text: "Great work and patience. I will work with Hmida again if I need another freelancer.",
    author: "@maxiruina",
    location: "Capital Federal, Argentina",
    tags: ["C Programming", "Adobe Flash", "ActionScript", "Adobe Air"]
  },
  {
    text: "Aywin did a fantastic job on my Flash project where he met the unexpected short deadline I gave him. He completed the work to a high standard which was approved by other colleagues.",
    author: "@amarinderb95",
    location: "Hatfield, United Kingdom",
    tags: ["Adobe Flash", "ActionScript", "Adobe Air"]
  },
  {
    text: "He is very professional, he understand well the project and worked on it every day, thanks very much",
    author: "@GB7",
    location: "Portugal",
    tags: ["Adobe Flash"]
  },
  {
    text: "It was a pleasure working with Aywin, as he delivered a very professional service that surpassed my expectations. Testament to how pleased I am, I will be calling on Aywin for his services on further proposals.",
    author: "@houssemm",
    location: "Tunisia",
    tags: ["PHP", "Website Design", "Graphic Design", "HTML"]
  },
  {
    text: "Aywin managed to not only fix the code issues had but also correct several other issues we hadn't caught. We'll be hiring him again very quickly.",
    author: "@DDFletch",
    location: "South Jordan, United States",
    tags: ["PHP", "Java", "JavaScript", "Adobe Flash", "HTML"]
  },
  {
    text: "Aywin did a fantastic job.I would love to hire him again.",
    author: "@studioavishkar",
    location: "Ahmedabad, India",
    tags: ["PHP", "Adobe Flash", "Graphic Design", "Animation", "ActionScript"]
  }
];

const IntroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true
  };

  return (
    <div className="text-center lg:text-left space-y-6 mt-0 lg:mt-8 w-full px-4 lg:px-0">
      <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#101010]/40 font-semibold text-center sm:text-left">
        What you should know about him.
      </h3>
      <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-serif text-[#101010] leading-[1.2] mx-auto lg:mx-0 max-w-[500px] lg:max-w-none">
        Senior Software Developer with 8 years experience
      </h2>

      <div className="flex flex-col gap-6 mt-8 w-full items-center lg:items-start">
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start items-center w-full max-w-[500px] lg:max-w-none">
          <Link
            href="mailto:aymenhmida1@gmail.com"
            title="Talk with me"
            className="group bg-black text-white p-3 md:p-4 rounded-full hover:bg-gray-800 transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md"
          >
            <FaEnvelope className="text-lg md:text-xl group-hover:scale-110 transition-transform" />
          </Link>
          <Link
            href="#work"
            title="See my work"
            className="group bg-white text-black p-3 md:p-4 rounded-full border border-[#E0D7CE] hover:bg-gray-50 transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md"
          >
            <FaBriefcase className="text-lg md:text-xl group-hover:scale-110 transition-transform" />
          </Link>

          <a
            href="https://github.com/Aymix"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="flex items-center justify-center p-3 md:p-4 bg-[#101010] text-white rounded-full hover:bg-black/90 transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <FaGithub className="text-lg md:text-xl group-hover:scale-110 transition-transform" />
          </a>

          <a
            href="https://www.fr.freelancer.com/u/Aywin"
            target="_blank"
            rel="noopener noreferrer"
            title="Freelancer"
            className="flex items-center justify-center p-3 md:p-4 bg-[#29B2FE] text-white rounded-full hover:bg-[#20a0e5] transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <SiFreelancer className="text-lg md:text-xl group-hover:scale-110 transition-transform" />
          </a>

          <a
            href="https://www.linkedin.com/in/aymen-hmida-673570111/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="flex items-center justify-center p-3 md:p-4 bg-[#0077B5] text-white rounded-full hover:bg-[#006097] transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <FaLinkedin className="text-lg md:text-xl group-hover:scale-110 transition-transform" />
          </a>

          <a
            href="https://drive.google.com/file/d/1-ilyvq2EpUSTgv6mo-yxbf1hpeiRHTZ-/view?usp=sharing"
            download
            title="Download CV"
            className="flex items-center justify-center p-3 md:p-4 border-2 border-[#101010] text-[#101010] rounded-full hover:bg-[#101010] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group w-[46px] h-[46px] md:w-[54px] md:h-[54px]"
          >
            <span className="font-bold text-[10px] md:text-xs">CV</span>
          </a>
        </div>

        <div className="mt-4 w-full max-w-[500px] border border-[#101010]/10 bg-[#fbfbfb] p-6 pb-10 lg:pb-10 lg:p-8 rounded-[32px] testimonials-box shadow-sm mx-auto lg:mx-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#101010]/40 font-semibold text-center sm:text-left">
              What my clients saying about my work
            </h3>
            <div className="flex gap-0.5 justify-center sm:justify-start">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-[#FFB800] text-[10px]" />
              ))}
            </div>
          </div>
          <Slider {...settings}>
            {testimonials.map((t, i) => (
              <div key={i} className="outline-none">
                <div className="text-[#101010]/90 text-base lg:text-lg leading-relaxed mb-4 font-serif text-center sm:text-left">
                  "{t.text}"
                </div>
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-medium text-[#101010]/80 justify-center sm:justify-start">
                  <span className="font-bold uppercase tracking-wider">{t.author}</span>
                  <span className="text-[#101010]/20 text-sm md:text-lg">/</span>
                  <span className="text-[#101010]/50 italic">{t.location}</span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
