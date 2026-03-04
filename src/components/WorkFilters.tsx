import { useState } from 'react';
import { FaReact, FaWordpress, FaDocker, FaPhp, FaLaravel, FaJs, FaAws, FaMobile, FaShoppingCart, FaGit, FaTimes, FaMicrosoft } from 'react-icons/fa';
import { SiNextdotjs, SiMongodb, SiDotnet, SiElementor, SiCodeigniter, SiSocketdotio, SiMysql, SiAngular, SiFlutter, SiPostgresql, SiMagento, SiShopify, SiPrestashop, SiMoodle, SiTrello, SiJira, SiClickup, SiExpo, SiWebpack, SiVite } from 'react-icons/si';
import { BiCodeAlt } from 'react-icons/bi';
import { AiFillLock } from 'react-icons/ai';
import { MdDesignServices, MdIntegrationInstructions, MdPayment, MdEmail } from 'react-icons/md';
import { BsFileEarmarkCode } from 'react-icons/bs';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { TbBrandTailwind } from 'react-icons/tb';
import { IoLogoNodejs } from 'react-icons/io';

interface Category {
  name: string;
  tags: string[];
}

const categories: Category[] = [
  {
    name: 'OS',
    tags: ['Linux', 'Windows', 'macOS']
  },
  {
    name: 'Languages',
    tags: ['JavaScript', 'TypeScript', 'PHP', 'Python', 'Java']
  },
  {
    name: 'Frontend',
    tags: ['React', 'Next.js', 'Vue.js', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind', 'jQuery', 'JavaScript']
  },
  {
    name: 'Backend',
    tags: ['Node.js', 'Laravel', 'CodeIgniter', '.NET']
  },
  {
    name: 'Database',
    tags: ['MySQL', 'MongoDB', 'PostgreSQL']
  },
  {
    name: 'CMS',
    tags: ['WordPress', 'Elementor', 'WooCommerce', 'Shopify', 'Prestashop', 'Magento', 'Moodle']
  },
  {
    name: 'Mobile',
    tags: ['React Native', 'Flutter', 'Ionic']
  },
  {
    name: 'Tools',
    tags: ['Docker', 'Git', 'Webpack', 'Vite']
  },
  {
    name: 'Cloud',
    tags: ['AWS', 'Azure']
  }

];

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
  'PostgreSQL': <SiPostgresql className="mr-1" />,
  'Angular': <SiAngular className="mr-1" />,
  'Flutter': <SiFlutter className="mr-1" />,
  'Design': <MdDesignServices className="mr-1" />,
  'Integration': <MdIntegrationInstructions className="mr-1" />,
  'PaymentGateway': <MdPayment className="mr-1" />,
  'WooCommerce': <FaShoppingCart className="mr-1" />,
  'Shopify': <SiShopify className="mr-1" />,
  'Prestashop': <SiPrestashop className="mr-1" />,
  'Magento': <SiMagento className="mr-1" />,
  'Moodle': <SiMoodle className="mr-1" />,
  'Git': <FaGit className="mr-1" />,
  'Trello': <SiTrello className="mr-1" />,
  'Jira': <SiJira className="mr-1" />,
  'ClickUp': <SiClickup className="mr-1" />,
  'Azure': <FaMicrosoft className="mr-1" />,
  'Expo': <SiExpo className="mr-1" />,
  'Webpack': <SiWebpack className="mr-1" />,
  'Vite': <SiVite className="mr-1" />,
  'Tailwind': <TbBrandTailwind className="mr-1" />,
  'Node.js': <IoLogoNodejs className="mr-1" />,
  'NDA': <AiFillLock className="mr-1" />,
  'Confidential': <AiFillLock className="mr-1" />,
};

const getIcon = (tag: string) => {
  return tagIcons[tag] || <BiCodeAlt className="mr-1" />;
};

interface WorkFiltersProps {
  allTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

const WorkFilters = ({ allTags, selectedTags, onTagToggle }: WorkFiltersProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className='w-full mb-8'>
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-4">
        {/* Main Category Filters */}
        <div className="w-full md:flex-1 md:pr-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Main Filters</h3>
          <div className="flex flex-wrap gap-2 justify-start">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}
                className={`px-4 py-2 text-sm rounded-md transition-all ${activeCategory === category.name
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Category Sub-filters Section */}
          {activeCategory && (
            <div className="mt-[30px] md:mt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">{activeCategory} Filters</h3>
              <div className="flex flex-wrap gap-2">
                {categories.find(cat => cat.name === activeCategory)?.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onTagToggle(tag)}
                    className={`px-3 py-1 text-sm rounded-md flex items-center transition-all ${selectedTags.includes(tag)
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                  >
                    {getIcon(tag)}
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider - Hidden on mobile */}
        <div className="hidden md:block w-px bg-gray-200 self-stretch"></div>

        {/* Selected Filters Section */}
        <div className="w-full md:w-64 md:pl-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Selected Filters</h3>
          {selectedTags.length > 0 ? (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onTagToggle(tag)}
                    className="px-3 py-1 text-sm rounded-md flex items-center bg-black text-white hover:bg-gray-800"
                  >
                    {getIcon(tag)}
                    {tag}
                    <FaTimes className="ml-2" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <span className="text-gray-400 text-sm">No filters selected</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkFilters;
