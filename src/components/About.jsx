import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-20 px-4 relative" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left side - Photo placeholder */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative w-full h-96 rounded-2xl overflow-hidden">
              {/* Placeholder for photo */}
              <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center">
                <div className="text-8xl">
                  👨‍💻
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                AI/ML
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs"
                animate={{
                  y: [-5, 5, -5],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                VIT
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                About Me
              </span>
            </h2>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate Computer Science Engineering student at VIT Chennai, 
              specializing in AI & ML with a strong academic record (CGPA: 9.07/10). 
              My journey in technology spans across cutting-edge research in medical 
              image analysis, innovative game development, and practical applications 
              of artificial intelligence.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              Currently pursuing advanced research at Samsung R&D Institute Bangalore, 
              I focus on audio processing techniques for body sound analysis and 
              ensemble distillation models. My work bridges the gap between 
              theoretical AI concepts and real-world applications.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              With experience in maritime risk assessment systems and HR automation 
              chatbots at Pythian Technologies, I've demonstrated ability to translate 
              complex AI algorithms into practical business solutions.
            </p>

            {/* Education Info */}
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
              whileHover={{ 
                boxShadow: "0 20px 40px rgba(20, 184, 166, 0.1)",
                borderColor: "rgba(20, 184, 166, 0.3)"
              }}
            >
              <h3 className="text-xl font-semibold text-white mb-3">Education</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Institution</span>
                  <span className="text-teal-400 font-medium">VIT Chennai</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Degree</span>
                  <span className="text-teal-400 font-medium">B.Tech CSE (AI & ML)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">CGPA</span>
                  <span className="text-teal-400 font-bold">9.07/10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Duration</span>
                  <span className="text-teal-400 font-medium">2022 - 2026</span>
                </div>
              </div>
            </motion.div>

            
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;