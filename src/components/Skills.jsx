
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 95, color: "from-yellow-400 to-green-500" },
        { name: "JavaScript", level: 85, color: "from-yellow-500 to-orange-500" },
        { name: "Java", level: 80, color: "from-red-500 to-pink-500" },
        { name: "C++", level: 75, color: "from-blue-500 to-purple-500" },
        { name: "SQL", level: 85, color: "from-teal-400 to-blue-500" },
        { name: "C", level: 70, color: "from-gray-500 to-gray-700" }
      ]
    },
    {
      title: "AI/ML Frameworks",
      skills: [
        { name: "PyTorch", level: 90, color: "from-orange-500 to-red-500" },
        { name: "TensorFlow", level: 85, color: "from-orange-400 to-yellow-500" },
        { name: "Hugging Face", level: 80, color: "from-yellow-400 to-green-400" },
        { name: "LangChain", level: 75, color: "from-green-400 to-teal-400" },
        { name: "FastAPI", level: 85, color: "from-teal-400 to-blue-400" }
      ]
    },
    {
      title: "Specializations",
      skills: [
        { name: "Computer Vision", level: 90, color: "from-purple-500 to-pink-500" },
        { name: "NLP", level: 85, color: "from-pink-500 to-rose-500" },
        { name: "Deep Learning", level: 88, color: "from-blue-500 to-indigo-500" },
        { name: "Medical Imaging", level: 82, color: "from-cyan-400 to-teal-500" },
        { name: "Reinforcement Learning", level: 75, color: "from-indigo-500 to-purple-500" }
      ]
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const categoryVariants = {
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

  const skillVariants = {
    hidden: {
      opacity: 0,
      x: -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const progressVariants = {
    hidden: {
      width: 0
    },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.2
      }
    })
  };

  return (
    <section id="skills" className="py-20 px-4 relative" ref={ref}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
              Technical Skills
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Expertise spanning AI/ML, software development, and cutting-edge technologies
          </p>
        </motion.div>

        {/* Skills Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={categoryVariants}
              className="relative"
            >
              {/* Category Title */}
              <motion.h3 
                className="text-2xl font-bold text-white mb-8 text-center"
                whileHover={{ scale: 1.05 }}
              >
                {category.title}
              </motion.h3>

              {/* Skills Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={skillVariants}
                    className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 group hover:border-teal-500/30 transition-colors duration-300"
                    whileHover={{
                      y: -5,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                    }}
                  >
                    {/* Skill Name */}
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-medium text-white group-hover:text-teal-400 transition-colors duration-300">
                        {skill.name}
                      </h4>
                      <span className="text-sm text-gray-400 font-medium">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar Background */}
                    <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                      {/* Animated Progress Bar */}
                      <motion.div
                        variants={progressVariants}
                        custom={skill.level}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full`}
                        whileHover={{
                          boxShadow: `0 0 20px rgba(20, 184, 166, 0.5)`
                        }}
                      />
                      
                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ['-100%', '100%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut"
                        }}
                      />
                    </div>

                    {/* Skill Level Indicator */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 flex items-center justify-center text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        rotate: [0, 360],
                        scale: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      ✓
                    </motion.div>

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: "Languages", value: "7+", icon: "💻" },
            { label: "Frameworks", value: "15+", icon: "🛠️" },
            { label: "AI/ML Skills", value: "10+", icon: "🧠" },
            { label: "Years Learning", value: "4+", icon: "📚" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(31, 41, 55, 0.6)"
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut"
              }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-teal-400 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
