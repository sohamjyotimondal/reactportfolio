import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Separate component for each experience item
const ExperienceItem = ({ exp, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Left side card animation (even index)
  const leftItemVariants = {
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

  // Right side card animation (odd index)
  const rightItemVariants = {
    hidden: {
      opacity: 0,
      x: 100
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

  // Node animation - appears after card animation
  const nodeVariants = {
    hidden: {
      opacity: 0,
      scale: 0
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.8 // Appears after card animation (0.8s)
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={index % 2 === 0 ? leftItemVariants : rightItemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`relative flex items-center mb-16 ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Timeline Node - Appears after card animation */}
      <motion.div
        className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${exp.color} timeline-center z-10`}
        variants={nodeVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        onAnimationComplete={() => {
          // Start pulsing after node appears
          if (isInView) {
            setTimeout(() => {
              // This will be handled by the separate animate prop below
            }, 500);
          }
        }}
      />

      {/* Pulsing animation for node (separate from initial animation) */}
      <motion.div
        className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${exp.color} timeline-center z-10`}
        animate={isInView ? {
          scale: [1, 1.2, 1],
          boxShadow: index === 1 ? [
            "0 0 0 0 rgba(251, 146, 60, 0.4)",
            "0 0 0 10px rgba(251, 146, 60, 0)",
            "0 0 0 0 rgba(251, 146, 60, 0)"
          ] : [
            "0 0 0 0 rgba(169, 27, 103, 0.4)",
            "0 0 0 10px rgba(20, 184, 166, 0)",
            "0 0 0 0 rgba(20, 184, 166, 0)"
          ]
        } : {}}
        transition={{
          scale: {
            duration: 2,
            repeat: Infinity,
            delay: 1.3 // Start pulsing after node appears
          },
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            delay: 1.3
          }
        }}
        style={{ pointerEvents: 'none' }} // Prevent interference with the main node
      />

      {/* Content Card */}
      <motion.div
        className={`w-full md:w-5/12 ${
          index % 2 === 0 ? 'md:mr-8 ml-16 md:ml-0' : 'md:ml-8 ml-16'
        }`}
        whileHover={{
          scale: 1.02,
          boxShadow: index === 1 ? "0 25px 50px rgba(251, 146, 60, 0.25)" : "0 25px 50px rgba(84, 55, 211, 0.25)"
        }}
      >
        <div className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 transition-colors duration-300 ${
          index === 1 ? 'hover:border-orange-500/30' : 'hover:border-teal-500/30'
        }`}>
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{exp.logo}</div>
              <div>
                <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                <p className={`font-medium ${index === 1 ? 'text-orange-400' : 'text-teal-400'}`}>{exp.position}</p>
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
                initial={{ 
                  opacity: 0, 
                  x: index % 2 === 0 ? -20 : 20 // Animate from respective sides
                }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: respIndex * 0.1 + 0.3 }}
              >
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  index === 1 ? 'bg-orange-400' : 'bg-teal-400'
                }`}></div>
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
                  backgroundColor: index === 1 ? "rgba(251, 146, 60, 0.2)" : "rgba(20, 184, 166, 0.2)",
                  color: index === 1 ? "rgba(251, 146, 60, 1)" : "rgba(20, 184, 166, 1)"
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: techIndex * 0.05 + 0.5 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const experiences = [
    {
      id: 1,
      company: "Samsung R&D Institute Bangalore",
      position: "Advanced Research Intern",
      duration: "July 2024 – Feb 2025",
      type: "completed",
      logo: "🏢",
      responsibilities: [
        "Explored and implemented various audio preprocessing techniques for body sound analysis, including audio-specific data augmentation and advanced filtering methods to improve the quality and accuracy of sound interpretation.",
        "Benchmarked the Constant Ensemble Distillation (CED) model, evaluating its performance on audio classification tasks. Trained the CED model on new datasets specifically focused on human body sounds, adapting it for specialized audio recognition."
      ],
      technologies: ["Python", "Audio Processing", "Machine Learning", "CED Model", "Data Augmentation"],
      color: "from-indigo-500 to-blue-600"
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
      color: "from-orange-400 to-orange-600"
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 relative">
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
          ref={ref}
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1570A1] to-[#2F3994]">
              Professional Experience
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Building innovative AI solutions across research and industry applications
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#305ABA] via-[#7D19E0] to-[#CF835D] timeline-center"></div>

          {experiences.map((exp, index) => (
            <ExperienceItem key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
