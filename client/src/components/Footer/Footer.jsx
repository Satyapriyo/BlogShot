import React from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Documentation", href: "/docs" },
      { name: "Updates", href: "/updates" },
    ],
    resources: [
      { name: "Blog", href: "/blog" },
      { name: "Community", href: "/community" },
      { name: "Support", href: "/support" },
      { name: "Terms of Service", href: "/terms" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  };

  const socialLinks = [
    { name: "GitHub", icon: FaGithub, href: "https://github.com" },
    { name: "Twitter", icon: FaTwitter, href: "https://twitter.com" },
    { name: "LinkedIn", icon: FaLinkedin, href: "https://linkedin.com" },
    { name: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-100 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <a href="/" className="flex items-center mb-4" aria-label="BlogShot Home">
              <span className="fontnew text-3xl font-extrabold text-white">BlogShot</span>
            </a>
            <p className="text-gray-400 mb-4">
              Create, share, and discover amazing blog content with BlogShot.
            </p>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-300">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
            <p className="text-gray-400 text-sm">
              © {currentYear} BlogShot. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
