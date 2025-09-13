import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const [titleText, setTitleText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  
  const titles = [
    "AI/ML Engineer & Research Enthusiast",
    "Deep Learning Specialist",
    "Computer Vision Researcher", 
    "Neural Architecture Designer",
    "Medical AI Researcher",
    "Machine Learning Engineer"
  ];
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Typewriter effect for titles
  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && titleText === currentTitle) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && titleText === '') {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      } else if (isDeleting) {
        setTitleText(currentTitle.substring(0, titleText.length - 1));
      } else {
        setTitleText(currentTitle.substring(0, titleText.length + 1));
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [titleText, titleIndex, isDeleting, titles]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const primaryButtonVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const secondaryButtonVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <>
      {/* CSS for animated gradient and improved glassmorphism */}
      <style jsx>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animated-gradient-text {
          background: linear-gradient(
            90deg,
            #dfd9d7,
            #82909aff,
            #11658bff,
            #0f6782ff,
            #328a99ff,
            #dfd9d7
          );
          background-size: 300% 300%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: gradientMove 8s ease-in-out infinite;
        }

        .improved-glass-button {
          /* Ultra transparent - true glassmorphism */
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          
          /* Subtle border for glass edge */
          border: 1px solid rgba(255, 255, 255, 0.12);
          
          /* White text with subtle shadow */
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          
          position: relative;
          overflow: hidden;
          
          /* Professional glass shadow */
          box-shadow: 
            0 8px 32px rgba(31, 38, 135, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .improved-glass-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          /* Minimal tint overlay */
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%);
          z-index: -1;
        }

        .improved-glass-button:hover {
          /* Slightly more visible on hover */
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(40px) saturate(200%);
          -webkit-backdrop-filter: blur(40px) saturate(200%);
          
          box-shadow: 
            0 12px 40px rgba(31, 38, 135, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .improved-glass-button:hover::before {
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
        }

        .secondary-button {
          background: transparent;
          border: 2px solid #14b8a6;
          color: #14b8a6;
          box-shadow: 
            0 0 10px rgba(20, 184, 166, 0.1),
            inset 0 0 10px rgba(20, 184, 166, 0.05);
        }

        .secondary-button:hover {
          background: rgba(20, 184, 166, 0.1);
          border: 2px solid #0d9488;
          color: #0d9488;
          box-shadow: 
            0 0 15px rgba(20, 184, 166, 0.2),
            inset 0 0 15px rgba(20, 184, 166, 0.1);
        }
      `}</style>

      <section id="home" className="relative min-h-screen flex items-center justify-center px-4">
        {/* Subtle background elements to showcase glassmorphism */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient background shapes */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-teal-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-l from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
          {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-cyan-300/10 to-indigo-400/10 rounded-full blur-2xl"></div> */}
        </div>

        <motion.div
          style={{ y, opacity }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center z-10 max-w-4xl mx-auto"
        >
          {/* Enhanced Name with Slow Animated Gradient */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animated-gradient-text"
            variants={itemVariants}
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Soham Jyoti Mondal
          </motion.h1>

          {/* Animated Title with Typewriter Effect */}
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 h-20 flex items-center justify-center"
            variants={itemVariants}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-blue-300">
              {titleText}
              {showCursor && (
                <span className="animate-pulse text-teal-300 ml-1">|</span>
              )}
            </span>
          </motion.p>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            And Icarus laughed as he fell, for he knew to fall means to once have soared.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.button
              variants={primaryButtonVariants}
              whileHover="hover"
              whileTap="tap"
              className="improved-glass-button px-8 py-4 rounded-full text-lg font-medium transition-all duration-300"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </motion.button>
            
            <motion.button
              variants={secondaryButtonVariants}
              whileHover="hover"
              whileTap="tap"
              className="secondary-button px-8 py-4 rounded-full text-lg font-medium transition-all duration-300"
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                animate={{
                  y: [0, 12, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
