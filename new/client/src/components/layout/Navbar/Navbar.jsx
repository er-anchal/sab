import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Export Desktop components
import NavbarDesktop from './Desktop/NavbarDesktop';

// Export Mobile components
import MobileMenu from './Mobile/MobileMenu';
import MobileMenuToggle from './Mobile/MobileMenuToggle';

// Export Common components
import NavLogo from './Common/NavLogo';
import NavbarShell from './Common/NavbarShell';

// Export hooks
import useNavbarScroll from './hooks/useNavbarScroll';
import useBodyScrollLock from './hooks/useBodyScrollLock';
import { navLinks } from "../../../data";

const Navbar = () => {
  const navigate = useNavigate();

  const scrolled = useNavbarScroll(50);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useBodyScrollLock(mobileMenuOpen);

  const handleSignIn = () => {
    navigate("/login");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <NavbarShell scrolled={scrolled} hidden={mobileMenuOpen}>
        <NavLogo />

        <NavbarDesktop
          items={navLinks}
          onSignIn={handleSignIn}
        />

        <MobileMenuToggle
          isOpen={mobileMenuOpen}
          onToggle={() => setMobileMenuOpen((prev) => !prev)}
        />
      </NavbarShell>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        menuItems={navLinks}
        onItemClick={() => setMobileMenuOpen(false)}
        onSignInClick={handleSignIn}
      />
    </>
  );
};

export default Navbar;