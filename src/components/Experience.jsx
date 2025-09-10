import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const experiences = [
    {
      id: 1,
      company: "Samsung R&D Institute Bangalore",
      position: "Advanced Research Intern",
      duration: "July 2024 – Feb 2025",
      type: "current",
      logo: "🏢",
      responsibilities: [
        "Explored and implemented various audio preprocessing techniques for body sound analysis, including audio-specific data augmentation and advanced filtering methods to improve the quality and accuracy of sound interpretation.",
        "Benchmarked the Constant Ensemble Distillation (CED) model, evaluating its performance on audio classification tasks. Trained the CED model on new datasets specifically focused on human body sounds, adapting it for specialized audio recognition."
      ],
      technologies: ["Python", "Audio Processing", "Machine Learning", "CED Model", "Data Augmentation"],
      color: "from-blue-500 to-teal-500"
    },
    {
      id: 2,
      company: "Pythian Technologies Pvt Ltd",
      position: "GenAI intern",
      duration: "May 2024 – August 2024",
      type: "completed",
      logo: "⚡",
      responsibilities: [
        "Maritime Risk Assessment System - Collaborated to design a chatbot for a maritime risk assessment platform, enabling natural language queries and seamless information retrieval via GraphQL integration. Streamlined risk data access for business teams.",
        "HR Chatbot for Data Automation - Built a HR chatbot leveraging RAG techniques and prompt engineering. Implemented dynamic SQL query generation and data visualization capabilities for complex datasets to produce data-driven reports and visualize key HR metrics."
      ],
      technologies: ["GraphQL", "RAG", "Prompt Engineering", "SQL", "Data Visualization", "Chatbots"],
      color: "from-purple-500 to-pink-500"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -100
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="experience" className="py-20 px-4 relative" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 25,
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
              Professional Experience
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Building innovative AI solutions across research and industry applications
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 via-blue-500 to-purple-600 transform -translate-x-1/2"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Node */}
              <motion.div
                className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${exp.color} transform -translate-x-1/2 z-10`}
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(20, 184, 166, 0.4)",
                    "0 0 0 10px rgba(20, 184, 166, 0)",
                    "0 0 0 0 rgba(20, 184, 166, 0)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              />

              {/* Content Card */}
              <motion.div
                className={`w-full md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-8 ml-16 md:ml-0' : 'md:ml-8 ml-16'
                }`}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)"
                }}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-teal-500/30 transition-colors duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{exp.logo}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                        <p className="text-teal-400 font-medium">{exp.position}</p>
                      </div>
                    </div>
                    <motion.div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        exp.type === 'current'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}
                      animate={{
                        opacity: exp.type === 'current' ? [0.7, 1, 0.7] : 1
                      }}
                      transition={{
                        duration: 2,
                        repeat: exp.type === 'current' ? Infinity : 0
                      }}
                    >
                      {exp.type === 'current' ? 'Current' : 'Completed'}
                    </motion.div>
                  </div>

                  {/* Duration */}
                  <p className="text-gray-400 text-sm mb-4">{exp.duration}</p>

                  {/* Responsibilities */}
                  <div className="space-y-3 mb-4">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <motion.div
                        key={respIndex}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.2 + respIndex * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm leading-relaxed">{resp}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded"
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: "rgba(20, 184, 166, 0.2)",
                          color: "rgba(20, 184, 166, 1)"
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.2 + techIndex * 0.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8"
        >
          {[
            { label: "Total Experience", value: "1+ Year", icon: "⏰" },
            { label: "Companies", value: "2", icon: "🏢" },
            { label: "Projects Delivered", value: "4+", icon: "🚀" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(31, 41, 55, 0.6)"
              }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.7,
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

export default Experience;
