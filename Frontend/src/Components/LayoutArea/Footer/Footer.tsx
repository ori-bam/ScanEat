// Footer.tsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="text-white py-4  mt-0">
      <div className="container mx-auto px-4">
        <p className="text-center">
          ScanEat good food good life
        </p>
        <div className="text-center mt-1">
          {/* Font Awesome Icons */}
          <a href="https://www.instagram.com/your_instagram_link" target="_blank" rel="noopener noreferrer" className="mr-4  text-amber-600">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.facebook.com/your_facebook_link" target="_blank" rel="noopener noreferrer" className="mr-4 text-amber-600">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="mailto:your-email@example.com" className="mr-4  text-amber-600">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <a href="tel:+1234567890" className=" text-amber-600">
            <FontAwesomeIcon icon={faPhoneAlt} />
          </a>
        </div>
        <p className="text-center mt-1">
          © {currentYear} ScanEat. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
