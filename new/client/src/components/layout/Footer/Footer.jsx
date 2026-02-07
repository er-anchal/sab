import { useState } from "react";
import FooterLinks from "./FooterLinks";
import FooterAccordion from "./FooterAccordion";
import FooterBottom from "./FooterBottom";
import FooterCopyright from "./FooterCopyright";

/**
 * Main footer component combining all footer sections
 */
const Footer = () => {
  const [openAccordions, setOpenAccordions] = useState([]);

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <footer className="bg-black border-t-[10px] border-[rgb(1,95,116)] rounded-t-xl text-white mt-10">
      {/* Desktop Links */}
      <FooterLinks />

      {/* Mobile Accordion */}
      <FooterAccordion openKeys={openAccordions} toggleAccordion={toggleAccordion} />

      {/* Footer Bottom */}
      <FooterBottom />

      {/* Copyright */}
      <FooterCopyright />
    </footer>
  );
};

export default Footer;
