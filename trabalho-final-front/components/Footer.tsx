import React from "react";

const Footer = () => {
  return (
    <footer className="w-screen">
      <div className="bg-gray-dark flex justify-center  px-4 py-2 shadow-gray-800 shadow-inner">
        <a href="https://byron.solutions" target="_blank">
          <picture>
            <img src="/images/copyright-byron.png" alt="" />
          </picture>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
