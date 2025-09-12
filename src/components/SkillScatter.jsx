import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Papa from 'papaparse';

const SkillScatter = () => {
  const [skills, setSkills] = useState([]);
  const [hovered, setHovered] = useState(null);

  // Load CSV on mount
  useEffect(() => {
    Papa.parse('/assets/tsne_embeddings.csv', {
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

        // Increased plot dimensions and expansion factors
        const plotWidth = 800;  // increased from 700
        const plotHeight = 550; // increased from 500
        
        // Expansion factors to stretch the axes
        const xExpansionFactor = 1.2;  // expand x-axis by 40%
        const yExpansionFactor = 1.0;  // increase y-axis by 20%

        const normalizedSkills = parsedSkills.map(({ sentence, x, y }) => ({
          sentence,
          x: normalize(x, xMin, xMax) * plotWidth * xExpansionFactor,
          y: (1 - normalize(y, yMin, yMax)) * plotHeight * yExpansionFactor,
          originalX: x,
          originalY: y
        }));

        setSkills(normalizedSkills);
      },
      error: (err) => {
        console.error('CSV parse error:', err);
      }
    });
  }, []);

  const containerWidth = 1100;  // increased to accommodate larger plot
  const containerHeight = 700;  // reduced since no axes needed
  const plotWidth = 800;
  const plotHeight = 550;
  const marginLeft = 150;  // increased margins for better spacing
  const marginTop = 75;    // reduced since no axis labels needed

  const pointVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20,
        delay: i * 0.02
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
    hidden: { opacity: 0 },
    visible: i => ({
      opacity: 0.9,
      transition: {
        delay: i * 0.02 + 0.1,
        duration: 0.5
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
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-20">
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-3">
          My Technical Skills
        </h2>
        <p className="text-gray-400 font-medium">
          t-SNE visualization of skill relationships
        </p>
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
            initial="hidden"
            animate="visible"
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
                  cx={skill.x}
                  cy={skill.y}
                  r="6"
                  fill="url(#pointGradient)"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="1"
                  className="cursor-pointer"
                  custom={i}
                  variants={pointVariants}
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

      {/* Subtle footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="text-center mt-12"
      >
        <p className="text-xs text-gray-600 font-medium">
          Hover over points to explore • Skills clustered by semantic similarity using Qwen/Qwen3-Embedding-4B
        </p>
      </motion.div>
    </div>
  );
};

export default SkillScatter;
