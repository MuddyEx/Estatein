import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Info, Building, Briefcase, LogIn } from 'lucide-react';
import LogoImg from '../assets/Logo.png';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', icon: <Home size={16} />, link: '/' },
    { name: 'About Us', icon: <Info size={16} />, link: '/about-us' },
    { name: 'Properties', icon: <Building size={16} />, link: '/properties' },
    { name: 'Support', icon: <Briefcase size={16} />, link: '/support' }
  ];

  return (
    <div className="bg- relative h-fit sticky top-0 z-50 shadow-lg">
      <header className="bg-[#1A1A1A] w-full">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <Link to="/" className="flex">
                <img className="w-auto h-8" src={LogoImg} alt="Logo" />
              </Link>
            </div>
            <div className="hidden lg:flex lg:items-center lg:space-x-10">
              {menuItems.map((item) => (
                <Link
                  to={item.link}
                  key={item.name}
                  className="flex items-center gap-2 text-base text-white transition-all duration-300 hover:text-[#703BF7]"
                >
                  {item.icon} {item.name}
                </Link>
              ))}
            </div>
            <div className="lg:flex lg:items-center lg:space-x-6">
              <Link to="/login" className="hidden text-base text-white lg:inline-flex hover:text-[#703BF7]">
                <LogIn className="mr-2" /> Log in
              </Link>
              <Button className="bg-black text-white shadow-sm shadow-white px-5 py-2.5 rounded-full hover:bg-[#703BF7] hover:text-black">
                Join Now
              </Button>
            </div>
            <button
              className="lg:hidden p-2 text-white rounded-md focus:outline-none hover:bg-[#292929]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden bg-[#1A1A1A] shadow-md rounded-lg mt-4 space-y-4 p-4"
            >
              {menuItems.map((item) => (
                <Link
                  to={item.link}
                  key={item.name}
                  className="flex items-center gap-2 text-base text-white transition-all duration-300 hover:text-[#703BF7]"
                >
                  {item.icon} {item.name}
                </Link>
              ))}
              <Link to="/login" className="flex items-center gap-2 text-base text-white hover:text-[#703BF7]">
                <LogIn size={16} /> Log in
              </Link>
              <Button className="w-full bg-black text-white shadow-sm shadow-white px-5 py-2.5 rounded-full hover:bg-[#703BF7] hover:text-black">
                Join Now
              </Button>
            </motion.div>
          )}
        </div>
      </header>
    </div>
  );
}
