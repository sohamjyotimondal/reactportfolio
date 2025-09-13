import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skillCategories = [
    {
      title: "Languages",
      skills: [
        "Python (Advanced)", "Java", "C++", "SQL", "JavaScript", "Dart", "C"
      ]
    },
    {
      title: "Frameworks & Libraries", 
      skills: [
        "TensorFlow", "PyTorch", "LangChain", "FastAPI", "Flask", "Hugging Face", "GraphQL"
      ]
    },
    {
      title: "Specializations",
      skills: [
        "Machine Learning", "Computer Vision", "NLP", "Deep Learning", 
        "Data Analysis", "Model Optimization"
      ]
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const skillBadgeVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  };

  return (
    <>
      {/* CSS for animated gradient text - unique to Skills section */}
      <style jsx>{`
        @keyframes gradientMoveSkills {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animated-gradient-text-skills {
          background: linear-gradient(
            90deg,
            #3c53aeff,
            #26797fff,
            #8ec3dcff,
            #986c92ff,
            #26797fff,
            #3d6ac9ff
          );
          background-size: 300% 300%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: gradientMoveSkills 8s ease-in-out infinite;
        }
      `}</style>

      <section id="skills" className="py-24 px-4 relative overflow-hidden" ref={ref}>
        {/* Floating background elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/6 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(59, 130, 246, 0.3))'
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Header with Unique Animated Gradient Text */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.h2 
              className="text-6xl md:text-7xl font-bold mb-6 animated-gradient-text-skills"
            >
              Technical Skills
            </motion.h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Expertise spanning AI/ML, software development, and cutting-edge technologies
            </p>
          </motion.div>

          {/* Skills Cards with Subtle Green Glowing Border */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 0 25px rgba(6, 182, 212, 0.4), 0 24px 48px -12px rgba(6, 182, 212, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                  borderColor: "rgba(6, 182, 212, 0.5)",
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="relative group backdrop-blur-sm bg-white/5 rounded-2xl p-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                  boxShadow: '0 0 10px rgba(6, 182, 212, 0.25), 0 20px 40px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(14, 123, 143, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Category Title */}
                <motion.h3 
                  className="text-2xl font-semibold bg-gradient-to-r from-[#1D9172] to-[#346A8C] bg-clip-text text-transparent mb-8 text-center"
                  whileHover={{ 
                    scale: 1.05
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {category.title}
                </motion.h3>

                {/* Skills Pills - Smaller Size with Secondary Button Styling */}
                <div className="flex flex-wrap gap-3 justify-center">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      variants={skillBadgeVariants}
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                        boxShadow: "0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.1)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="secondary-button px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer backdrop-blur-sm bg-white/10 border border-white/20 text-gray-300 hover:text-white hover:bg-white/15"
                      style={{
                        boxShadow: "0 0 8px rgba(6, 182, 212, 0.15), 0 0 16px rgba(6, 182, 212, 0.05)",
                        borderColor: "rgba(6, 182, 212, 0.2)"
                      }}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      transition={{
                        delay: index * 0.1 + skillIndex * 0.05,
                        duration: 0.3
                      }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>

                {/* Subtle corner decoration - more transparent */}
                <motion.div
                  className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.1))'
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Skills;
