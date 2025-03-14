import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import LogoImg from '../assets/Logo.png';

const Footer = () => {
  return (
    <section className="py-10 bg-black sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-8 xl:gap-x-12">
          <div className="col-span-2 md:col-span-4 xl:pr-8">
            <img
              className="w-auto h-9"
              src={LogoImg}
              alt="Logo"
            />
            <p className="text-base leading-relaxed text-gray-300 mt-7">
            At Estatein, we specialize in renting high-quality apartments, offering modern living spaces with comfort and convenience. Our team is dedicated to helping you find the perfect home that fits your lifestyle and budget.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-4 font-semibold text-white transition-all duration-200 bg-[#703BF7] rounded-md hover:bg-purple-700 focus:bg-purple-800 mt-7"
            >
              Contact Us
            </a>
          </div>

          {[
            { title: "Company", links: ["How It Works", "About US", "Features", "Properties", "Testimonials", 'Faq'] },
            { title: "Help", links: ["Customer Support", "How It Worksls", "Terms & Conditions", "Privacy Policy"] },
            { title: "Quick Links", links: ["User Login", "Agent Login", "User Signup", "Agent Signup"] },
            { title: "Extra Links", links: ["Customer Support", "Services", "Terms & Conditions", "Privacy Policy"] },
          ].map((section, index) => (
            <div className="lg:col-span-2" key={index}>
              <p className="text-base font-semibold text-[#999999]">{section.title}</p>
              <ul className="mt-6 space-y-5">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="flex text-sm text-white transition-all duration-200 hover:text-[#703BF7] focus:text-purple-800">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="mt-16 mb-10 border-purple-400" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <p className="text-sm text-gray-300">© Copyright 2025, All Rights Reserved by Estatein</p>
          <ul className="flex items-center mt-5 space-x-3 sm:mt-0">
            {[FaTwitter, FaFacebookF, FaInstagram, FaGithub].map((Icon, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center justify-center text-gray-100 transition-all duration-200 bg-transparent border border-gray-200 rounded-full w-7 h-7 hover:text-white hover:bg-purple-600 hover:border-purple-600 focus:bg-purple-600 focus:text-white"
                >
                  <Icon className="w-4 h-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;