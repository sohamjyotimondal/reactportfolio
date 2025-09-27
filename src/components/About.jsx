import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MyCustomImage from '../assets/profileimage.jpg';

const About = () => {
 const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    amount: 0.4  
  });
 
  const staticLines = [
    'soham@root:~$ whoami',
    'Soham Jyoti Mondal, Final year VIT Chennai',
    'soham@root:~$ cat interests.txt',
    'Machine Learning & AI Research',
    'Webscraping and Automation',
    'Cybersecurity',
    'soham@root:~$ pip install hobbies',
    'Installing collected packages...',
    'Successfully installed 3 packages:'
  ];

 
  const animatedLines = [
    
    'Reading books and poetry ✓',
    'Coding and Finance',
    'Playing games (the wolf logo is inspired from witcher 3) ;)'
  ];

  const [terminalText, setTerminalText] = useState(staticLines);
  const [currentAnimatedLine, setCurrentAnimatedLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (!isInView || animationStarted) return;
    
    // Start animation when section comes into view
    setAnimationStarted(true);
    
    // Add a delay before starting the typing animation
    const startDelay = setTimeout(() => {
      setTerminalText(prev => [...prev, '']);
    }, 500);

    return () => clearTimeout(startDelay);
  }, [isInView]);

  useEffect(() => {
    if (!animationStarted) return;
    
    if (currentAnimatedLine < animatedLines.length) {
      if (charIndex <= animatedLines[currentAnimatedLine].length) {
        const timer = setTimeout(() => {
          setTerminalText(prev => {
            let newLines = [...prev];
            const lineIndex = staticLines.length + currentAnimatedLine;
            newLines[lineIndex] = animatedLines[currentAnimatedLine].slice(0, charIndex);
            return newLines;
          });
          setCharIndex(c => c + 1);
        }, 60); // Typing speed
        
        return () => clearTimeout(timer);
      } else {
        // Line complete, move to next line
        setTimeout(() => {
          if (currentAnimatedLine < animatedLines.length - 1) {
            setTerminalText(prev => [...prev, '']);
            setCurrentAnimatedLine(l => l + 1);
            setCharIndex(0);
          } else {
            // All animations complete, add empty line for cursor
            setTerminalText(prev => [...prev, '']);
            setAnimationComplete(true);
          }
        }, 800); // Pause between lines
      }
    }
  }, [currentAnimatedLine, charIndex, animationStarted]);

  // Cursor animation
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const cursorTimer = setInterval(() => setBlink(b => !b), 540);
    return () => clearInterval(cursorTimer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="about" className="py-20 px-4 relative" ref={ref}>
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/1 w-80 h-80 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-full blur-2xl"
          animate={{ scale: [1, 1.07, 1], x: [0, 32, 0], y: [0, -18, 0] }}
          transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left side - Avatar */}
          <motion.div variants={itemVariants} className="flex flex-col items-center relative">
            <div className="relative w-80 h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-teal-600/25 to-blue-700/15 backdrop-blur-lg border border-gray-700/30 flex items-center justify-center">
              <img
                src={MyCustomImage}
                alt="Soham Jyoti Mondal"
                className="w-full h-full object-cover rounded-2xl"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
              />
            </div>
          </motion.div>

          {/* Right side - Animated Terminal */}
          <motion.div variants={itemVariants} className="flex items-center justify-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative w-full max-w-xl rounded-2xl shadow-xl border border-teal-800/30 backdrop-blur-lg"
              style={{
                background: "rgba(18,24,39,0.87)",
              }}
            >
              {/* Terminal header */}
              <div className="flex items-center px-6 py-3 rounded-t-2xl bg-gray-700/30 border-b border-gray-800/30">
                <span className="w-3 h-3 rounded-full bg-red-400 mr-2"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                <span className="ml-4 text-xs text-teal-400 font-mono">soham's@terminal</span>
              </div>

              {/* Terminal content */}
              <div className="px-6 py-7 font-mono text-sm text-teal-300 min-h-[400px] leading-relaxed">
                {terminalText.map((line, i) => (
                  <div key={i} className="mb-1">
                    <span className="whitespace-pre">{line}</span>
                    {/* Show cursor during typing */}
                    {i === staticLines.length + currentAnimatedLine && 
                     currentAnimatedLine < animatedLines.length && 
                     !animationComplete &&
                     blink && (
                      <span className="inline-block w-[2px] h-[1em] bg-teal-400 ml-1 translate-y-[2px] animate-blink" />
                    )}
                  </div>
                ))}
                
                {/* Show cursor on new line after animation is complete */}
                {animationComplete && (
                  <div className="mb-1">
                    <span className="whitespace-pre">soham@root:~$</span>
                    {blink && (
                      <span className="inline-block w-[2px] h-[1em] bg-teal-400 ml-1 translate-y-[2px] animate-blink" />
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom cursor blink animation */}
      <style>{`
        .animate-blink {
          animation: blink-cursor 0.9s steps(2, start) infinite;
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default About;
