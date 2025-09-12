import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ currentSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Publications', href: '#publications' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
              SJM
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2 relative">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10 ${
                    currentSection === item.href.slice(1)
                      ? 'text-white font-semibold'
                      : 'text-gray-300 hover:text-teal-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Glassmorphism Bubble Background */}
                  {currentSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="glassyBubble"
                      className="absolute inset-0 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        mass: 0.8,
                        velocity: 2
                      }}
                      animate={{
                        scaleX: [0.8, 1.2, 1],
                        scaleY: [1.2, 0.8, 1],
                      }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: `
                          0 8px 32px rgba(20, 184, 166, 0.15),
                          inset 0 1px 0 rgba(255, 255, 255, 0.3),
                          inset 0 -1px 0 rgba(255, 255, 255, 0.1)
                        `
                      }}
                    />
                  )}

                  {/* Inner Glow Layer */}
                  {currentSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="innerGlow"
                      className="absolute inset-0 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 25,
                        mass: 1
                      }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                        filter: 'blur(1px)',
                      }}
                    />
                  )}

                  {/* Outer Glow/Shadow */}
                  {currentSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="outerGlow"
                      className="absolute inset-0 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 30,
                        mass: 1.2
                      }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)',
                        filter: 'blur(8px)',
                        transform: 'scale(1.1)',
                        zIndex: -1
                      }}
                    />
                  )}

                  {/* Shimmer Effect */}
                  {currentSection === item.href.slice(1) && (
                    <motion.div
                      className="absolute inset-0 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.div
                        className="absolute top-0 -left-full h-full w-1/2"
                        animate={{ 
                          x: ["0%", "400%"] 
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                          transform: 'skewX(-20deg)'
                        }}
                      />
                    </motion.div>
                  )}
                  
                  <span className="relative z-10">{item.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="w-6 h-6 relative"
                animate={isOpen ? "open" : "closed"}
              >
                <motion.span
                  className="block absolute h-0.5 w-6 bg-current transform"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 }
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="block absolute h-0.5 w-6 bg-current transform"
                  style={{ y: 8 }}
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block absolute h-0.5 w-6 bg-current transform"
                  style={{ y: 16 }}
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 }
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800/50"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 relative">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative block px-4 py-3 rounded-full text-base font-medium w-full text-left transition-all duration-300 z-10 ${
                    currentSection === item.href.slice(1)
                      ? 'text-white font-semibold'
                      : 'text-gray-300 hover:text-teal-400'
                  }`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  {/* Mobile Glassmorphism Bubble */}
                  {currentSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="glassyBubbleMobile"
                      className="absolute inset-0 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 22,
                        mass: 0.9
                      }}
                      animate={{
                        scaleX: [0.8, 1.15, 1],
                        scaleY: [1.15, 0.85, 1],
                      }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: `
                          0 8px 32px rgba(20, 184, 166, 0.15),
                          inset 0 1px 0 rgba(255, 255, 255, 0.3),
                          inset 0 -1px 0 rgba(255, 255, 255, 0.1)
                        `
                      }}
                    />
                  )}
                  
                  <span className="relative z-10">{item.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
