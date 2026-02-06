import { footerLinks } from "../../../data";

/**
 * Footer accordion for mobile view
 * @param {string[]} openKeys - Currently open accordion keys
 * @param {(key: string) => void} toggleAccordion - Callback to toggle accordion
 */
const FooterAccordion = ({ openKeys, toggleAccordion }) => {
  return (
    <div className="block md:hidden w-full pt-10">
      {Object.entries(footerLinks).map(([title, links]) => {
        const isOpen = openKeys.includes(title);

        return (
          <div
            key={title}
            className={`border-y border-[rgb(1,95,116)] bg-black ${
              isOpen ? "accordion-active" : ""
            }`}
          >
            {/* Accordion Button */}
            <button
              onClick={() => toggleAccordion(title)}
              className={`w-full flex justify-between items-center p-4 bg-black text-white font-medium focus:outline-none ${
                isOpen ? "text-[rgb(1,95,116)]" : ""
              }`}
              aria-expanded={isOpen}
            >
              {title}
              <span className="accordion-arrow filter invert-[1] sepia-[1] saturate-[0] brightness-[2]"></span>
            </button>

            {/* Accordion Content */}
            <div
              className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                isOpen ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              <ul className="pl-4 pb-4 flex flex-col gap-1">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white text-sm hover:text-[rgb(1,95,116)] hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FooterAccordion;
