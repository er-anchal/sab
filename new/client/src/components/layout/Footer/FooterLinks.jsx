import { footerLinks } from '../../../data';

/**
 * Desktop footer links component
 */
const FooterLinks = () => {
  return (
    <div className="hidden md:flex justify-center py-12 gap-12 xl:gap-24 border-b border-[rgb(1,95,116)] container mx-auto">
      {Object.entries(footerLinks).map(([title, links]) => (
        <ul key={title} className="flex flex-col gap-1 list-none">
          <li>
            <a 
              href="#" 
              className="font-bold text-white text-lg hover:underline"
            >
              {title}
            </a>
          </li>
          {links.map(link => (
            <li key={link}>
              <a 
                href="#" 
                className="text-[#b4b1b1] hover:text-gray-300 hover:underline"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default FooterLinks;
