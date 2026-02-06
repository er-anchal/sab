import React from 'react';
import MobileMenuOverlay from './MobileMenuOverlay';
import MobileMenuHeader from './MobileMenuHeader';
import MobileMenuItems from './MobileMenuItems';
import MobileMenuDivider from './MobileMenuDivider';
import MobileMenuActions from './MobileMenuActions';

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  menuItems, 
  onItemClick,
  onSignInClick,
  onBookNowClick 
}) => {
  return (
    <>
      {/* Overlay */}
      <MobileMenuOverlay isOpen={isOpen} onClose={onClose} />

      {/* Slide-in Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-screen w-80 shadow-2xl transform transition-transform duration-300 ease-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--wander-teal)' }}
      >
        <MobileMenuHeader onClose={onClose} />
        <MobileMenuItems items={menuItems} isOpen={isOpen} onItemClick={onItemClick} />
        <MobileMenuDivider isOpen={isOpen} />
        <MobileMenuActions 
          isOpen={isOpen}
          onSignInClick={onSignInClick}
          onBookNowClick={onBookNowClick}
        />
      </div>
    </>
  );
};

export default MobileMenu;