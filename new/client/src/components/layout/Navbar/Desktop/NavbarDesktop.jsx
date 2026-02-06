import React from "react";
import NavMenuItems from "./NavMenuItems";
import NavbarSignInButton from "./NavbarSignInButton";

const NavbarDesktop = ({ items, onItemClick, onSignIn }) => {
  return (
    <div className="hidden lg:flex items-center gap-8">
      <NavMenuItems items={items} onItemClick={onItemClick} />
      <NavbarSignInButton onClick={onSignIn} />
    </div>
  );
};

export default NavbarDesktop;