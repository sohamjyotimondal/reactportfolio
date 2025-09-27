import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Custom hook for mouse follow effect
const useMouseFollow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Scale the movement (reduce intensity)
    const moveX = mouseX * 0.1; // 10% of mouse offset
    const moveY = mouseY * 0.1; // 10% of mouse offset
    
    setMousePosition({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return {
    ref,
    mousePosition,
    handleMouseMove,
    handleMouseLeave
  };
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  
  // Track if shimmer animation has been shown
  const [shimmerComplete, setShimmerComplete] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Medical Image Segmentation with MoE",
      description: "Developed a compact segmentation model using knowledge distillation from a modified UNETR model with mixture of experts. Achieved 46% reduction in inference time and 75% decrease in model size.",
      technologies: ["PyTorch", "UNETR", "Medical Imaging", "Model Distillation"],
      metrics: {
        "Inference Time Reduction": "46%",
        "Model Size Reduction": "75%",
        "Dice Score Drop": "Only 2%"
      },
      category: "Medical AI",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      id: 2,
      title: "Reinforcement Learning Game AI",
      description: "Implemented RL-based zombie spawner for Unity game that dynamically adjusts spawn patterns based on real-time player state using deep neural networks and custom reward functions.",
      technologies: ["Unity", "Deep Learning", "C#", "Reinforcement Learning"],
      category: "Game Development",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      id: 3,
      title: "Cryptographic Neural Networks",
      description: "Built cryptographic system using Invertible Neural Networks and normalizing flows with controlled randomness creating avalanche effect, reducing computational overhead by 30%.",
      technologies: ["Python", "Cryptography", "Neural Networks", "Security"],
      metrics: {
        "Overhead Reduction": "30%"
      },
      category: "Security",
      gradient: "from-green-500 to-teal-500"
    },
    {
      id: 4,
      title: "NLP Customer Priority System",
      description: "Developed NLP system for automatic customer complaint prioritization using BERT and RoBERTa with attention-based fine-tuning for enhanced after-sales service efficiency.",
      technologies: ["BERT", "RoBERTa", "NLP", "Text Classification"],
      category: "Natural Language Processing",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 5,
      title: "Graph Neural Course Recommendations",
      description: "Created GNN-based recommendation system for corporate environments, modeling complex relationships between employees, course history, and hierarchical management levels.",
      technologies: ["Graph Neural Networks", "Python", "Recommendation Systems"],
      category: "Recommendation Systems",
      gradient: "from-orange-500 to-red-500"
    },
    {
  id: 6,
  title: "Game of Thrones Chatbot",
  description: "Built a Game of Thrones-themed chatbot that delivers witty, in-character quotes using Groq's fast LLM inference and LlamaIndex for data orchestration, wrapped in a stylish 'Game of Quotes' interface.",
  technologies: ["Groq LLM", "LlamaIndex", "Python", "Gradio"],
  metrics: {
    "Response Speed": "Ultra-fast with Groq LPU",
    "Character Accuracy": "In-character quotes",
    "Interface": "Game of Quotes themed"
  },
  category: "AI Chatbot",
  gradient: "from-amber-500 to-orange-500"
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

  const projectVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const overlayVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  // Project Card Component with Mouse Follow Effect and One-time Shimmer
  const ProjectCard = ({ project, index }) => {
    const { ref, mousePosition, handleMouseMove, handleMouseLeave } = useMouseFollow();

    return (
      <motion.div
        variants={projectVariants}
        whileHover="hover"
        className="relative group cursor-pointer"
        onClick={() => setSelectedProject(project)}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          variants={cardHoverVariants}
          className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 h-full hover:border-teal-500/30 transition-colors duration-300 overflow-hidden"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.1
          }}
        >
          {/* Shimmer Effect - Only runs once on first load */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 rounded-xl"
            initial={{ x: "-100%" }}
            animate={isInView && !shimmerComplete ? { x: "200%" } : { x: "-100%" }}
            transition={{
              duration: 1.2,
              delay: index * 0.15 + 0.5,
              ease: "easeInOut"
            }}
            onAnimationComplete={() => {
              if (isInView && !shimmerComplete) {
                // Mark shimmer as complete after the last card finishes
                if (index === projects.length - 1) {
                  setShimmerComplete(true);
                }
              }
            }}
            style={{ zIndex: 1 }}
          />

          {/* Category Badge */}
          <motion.div
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 bg-gradient-to-r ${project.gradient} text-white relative z-10`}
            whileHover={{ scale: 1.05 }}
          >
            {project.category}
          </motion.div>

          {/* Project Title */}
          <motion.h3 
            className="text-xl font-bold mb-3 text-white group-hover:text-teal-400 transition-colors duration-300 relative z-10"
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-3 relative z-10">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4 relative z-10">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(20, 184, 166, 0.2)" }}
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs text-gray-500">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          {/* Metrics Preview */}
          {project.metrics && (
            <div className="mt-4 pt-4 border-t border-gray-700/50 relative z-10">
              <div className="text-xs text-gray-500 mb-2">Key Achievements</div>
              <div className="space-y-1">
                {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-400">{key}:</span>
                    <span className="text-teal-400 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ opacity: 1 }}
          />

          {/* View Details Button */}
          <motion.div
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm">
              →
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="py-20 px-4 relative" ref={sectionRef}>
      {/* Background with animated blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CF835D] to-[#691734]">
              Projects which stand out
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Innovative solutions combining AI, machine learning, and cutting-edge technologies
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Content */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProject(null)}
              >
                ×
              </motion.button>

              {/* Category */}
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 bg-gradient-to-r ${selectedProject.gradient} text-white`}>
                {selectedProject.category}
              </div>

              {/* Title */}
              <motion.h3
                className="text-3xl font-bold mb-4 text-white"
              >
                {selectedProject.title}
              </motion.h3>

              {/* Description */}
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-lg text-sm"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(20, 184, 166, 0.2)" }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              {selectedProject.metrics && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <motion.div
                        key={key}
                        className="flex justify-between items-center bg-gray-700/30 rounded-lg p-3"
                        whileHover={{ backgroundColor: "rgba(20, 184, 166, 0.1)" }}
                      >
                        <span className="text-gray-300">{key}</span>
                        <span className="text-teal-400 font-bold text-lg">{value}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
