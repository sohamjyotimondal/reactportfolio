import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Papa from 'papaparse';

const SkillScatter = () => {
  const [skills, setSkills] = useState([]);
  const [hovered, setHovered] = useState(null);
  
  // Create ref for intersection observer
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,        // Animation triggers only once
    amount: 0.4    // Trigger when 30% of element is visible
  });

  // Load CSV on mount
  useEffect(() => {
    Papa.parse('/assets/tsne_embeddings1.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const filtered = result.data.filter(r => r.sentence && r.x && r.y);
        
        const parsedSkills = filtered.map(r => ({
          sentence: r.sentence,
          x: parseFloat(r.x),
          y: parseFloat(r.y)
        }));

        const xs = parsedSkills.map(p => p.x);
        const ys = parsedSkills.map(p => p.y);

        const xMin = Math.min(...xs);
        const xMax = Math.max(...xs);
        const yMin = Math.min(...ys);
        const yMax = Math.max(...ys);

        const normalize = (value, min, max) => (value - min) / (max - min);

        // // Increased plot dimensions and expansion factors
        // const plotWidth = 800;  // increased from 700
        // const plotHeight = 550; // increased from 500
        
        // Expansion factors to stretch the axes
        const xExpansionFactor = 1.2;  // expand x-axis by 20%
        const yExpansionFactor = 1.0;  // keep y-axis as is

        const normalizedSkills = parsedSkills.map(({ sentence, x, y }) => ({
          sentence,
          x: normalize(x, xMin, xMax) * plotWidth * xExpansionFactor,
          y: (1 - normalize(y, yMin, yMax)) * plotHeight * yExpansionFactor,
          originalX: x,
          originalY: y,
          // Starting position for scatter animation (top-right corner)
          initialX: plotWidth + 100,
          initialY: -50
        }));

        setSkills(normalizedSkills);
      },
      error: (err) => {
        console.error('CSV parse error:', err);
      }
    });
  }, []);

  const containerWidth = 1100;
  const containerHeight = 700;
  const plotWidth = 800;
  const plotHeight = 550;
  const marginLeft = 50;   // reduced since we have side panel
  const marginTop = 75;

  // Animation duration for points (in seconds)
  const pointsAnimationDuration = 1.5;

  const pointVariants = {
    hidden: (skill) => ({ 
      opacity: 0,
      scale: 0,
      x: skill.initialX, // Start from top-right corner
      y: skill.initialY
    }),
    visible: (skill) => (i) => ({
      opacity: 1,
      scale: 1,
      x: skill.x,  // Animate to final position
      y: skill.y,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 20,
        delay: i * 0.08,  // Staggered delay for scatter effect
        duration: 1.2
      }
    }),
    hover: {
      scale: 1.6,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 25
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: i => ({
      opacity: 0.9,
      scale: 1,
      transition: {
        // Text appears after points have settled (duration + max delay + buffer)
        delay: pointsAnimationDuration + (skills.length * 0.08) + 0.2 + (i * 0.03),
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      opacity: 1,
      scale: 1.1,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 25
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-20" ref={ref}>
      {/* Title */}
      {/* <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-12"
      > */}
        {/* <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-3">
          My Technical Skills
        </h2>
        <p className="text-gray-400 font-medium">
          t-SNE visualization of skill relationships
        </p> */}
      {/* </motion.div> */}

      {/* Main container with side panel and visualization */}
      <div className="flex items-center gap-8 max-w-7xl">
        {/* Left explanation panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-80 backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              How It's Made
            </h3>
            
            <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>
                A <span className="text-blue-300 font-medium">t-SNE</span> (t-Distributed Stochastic Neighbor Embedding) visualisation of my skills.
              </p>
              
              <p>
                Skills are embedded using <span className="text-purple-300 font-medium">Qwen/Qwen3-Embedding-4B</span> sentence transformers, then dimensionally reduced to reveal semantic relationships.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main visualization */}
        <div className="relative">
          <svg
            width={containerWidth}
            height={containerHeight}
            viewBox={`0 0 ${containerWidth} ${containerHeight}`}
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="pointGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Data points and labels */}
            <motion.g
              transform={`translate(${marginLeft}, ${marginTop})`}
            >
              {skills.map((skill, i) => (
                <motion.g 
                  key={skill.sentence}
                  style={{ transformOrigin: `${skill.x}px ${skill.y}px` }}
                >
                  {/* Glow effect for hovered point */}
                  {hovered === i && (
                    <motion.circle
                      cx={skill.x}
                      cy={skill.y}
                      r="15"
                      fill="url(#pointGradient)"
                      opacity="0.2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ transformOrigin: `${skill.x}px ${skill.y}px` }}
                    />
                  )}
                  
                  {/* Main data point */}
                  <motion.circle
                    r="6"
                    fill="url(#pointGradient)"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="1"
                    className="cursor-pointer"
                    custom={skill}
                    variants={pointVariants}
                    initial="hidden"
                    animate={isInView ? pointVariants.visible(skill)(i) : "hidden"}
                    whileHover="hover"
                    onHoverStart={() => setHovered(i)}
                    onHoverEnd={() => setHovered(null)}
                    filter={hovered === i ? "url(#softGlow)" : "none"}
                    style={{
                      filter: 'drop-shadow(0 2px 8px rgba(96, 165, 250, 0.3))',
                      transformOrigin: `${skill.x}px ${skill.y}px`
                    }}
                  />
                  
                  {/* Text label */}
                  <motion.text
                    x={skill.x + 12}
                    y={skill.y + 5}
                    className="text-sm font-medium select-none pointer-events-none"
                    custom={i}
                    variants={textVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    whileHover="hover"
                    style={{
                      fill: hovered === i ? '#e2e8f0' : '#94a3b8',
                      fontWeight: hovered === i ? '600' : '500',
                      filter: hovered === i ? 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5))' : 'none',
                      transformOrigin: `${skill.x + 12}px ${skill.y + 5}px`
                    }}
                  >
                    {skill.sentence}
                  </motion.text>
                </motion.g>
              ))}
            </motion.g>
          </svg>
        </div>
      </div>

      {/* Subtle footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: pointsAnimationDuration + (skills.length * 0.08) + 1 // Appears after all animations
        }}
        className="text-center mt-12"
      >
        <p className="text-xs text-gray-600 font-medium">
          Hover over points to explore • Skills clustered by semantic similarity using Qwen3-Embedding-4B
        </p>
      </motion.div>
    </div>
  );
};

export default SkillScatter;
