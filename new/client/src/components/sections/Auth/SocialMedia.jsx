import React from 'react';

const SocialMedia = () => {
  const socialIcons = [
    { label: 'Facebook', icon: 'f', href: '#' },
    { label: 'Twitter', icon: '𝕏', href: '#' },
    { label: 'Google', icon: 'G', href: '#' },
    { label: 'LinkedIn', icon: 'in', href: '#' },
  ];

  return (
    <div className="social-media">
      {socialIcons.map((social) => (
        <a
          key={social.label}
          href={social.href}
          className="social-icon"
          title={social.label}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;