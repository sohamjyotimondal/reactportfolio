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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500">
              Technical Skills
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Expertise spanning AI/ML, software development, and cutting-edge technologies
          </p>
        </motion.div>

        {/* Skills Cards */}
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
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="relative group"
            >
              {/* Glowing border effect */}
              <motion.div
                className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.6), rgba(59, 130, 246, 0.4))'
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Card */}
              <div 
                className="relative h-full p-8 rounded-2xl border border-white/10 overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Category Title */}
                <motion.h3 
                  className="text-2xl font-bold text-white mb-8 text-center"
                  whileHover={{ 
                    scale: 1.05,
                    color: "rgba(6, 182, 212, 1)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {category.title}
                </motion.h3>

                {/* Skills Pills */}
                <div className="flex flex-wrap gap-3 justify-center">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      variants={skillBadgeVariants}
                      whileHover={{
                        scale: 1.1,
                        y: -3,
                        boxShadow: "0 10px 25px rgba(6, 182, 212, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-full text-sm font-medium cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(59, 130, 246, 0.1))',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        color: 'rgba(255, 255, 255, 0.9)'
                      }}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      transition={{
                        delay: index * 0.1 + skillIndex * 0.05
                      }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>

                {/* Subtle corner decoration */}
                <motion.div
                  className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-20"
                  style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.2))'
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 flex justify-center"
        >
          <motion.div 
            className="flex items-center space-x-8 px-8 py-4 rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {[
              { label: "Languages", count: "7+" },
              { label: "Frameworks", count: "10+" },
              { label: "Specializations", count: "6+" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                animate={{
                  y: [0, -2, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: "easeInOut"
                }}
              >
                <div className="text-2xl font-bold text-teal-400">{stat.count}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
