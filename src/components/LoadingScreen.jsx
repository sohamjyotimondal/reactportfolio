import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import trophyIcon from '../assets/award.png';

const LoadingScreen = ({ showAchievement }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            className="fixed top-8 right-8 flex items-center bg-gradient-to-r from-green-500 to-green-400 text-white p-4 rounded-lg shadow-2xl border-2 border-green-300"
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.8
            }}
            style={{
              minWidth: '320px',
              maxWidth: '400px',
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            {/* Left side - Logo/Trophy */}
            <motion.div
              className="flex-shrink-0 mr-4 relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              {/* Trophy/Logo background circle */}
              <motion.div
                className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center border-2 border-green-300 relative overflow-hidden"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(34, 197, 94, 0.4)",
                    "0 0 0 8px rgba(34, 197, 94, 0)",
                    "0 0 0 0 rgba(34, 197, 94, 0)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              >
                {/* Your SM Logo - Replace this with your actual logo */}
                <motion.img
  src={trophyIcon}
  alt="Trophy Logo"
  className="w-8 h-8 filter brightness-0 invert" // Makes it white like the text was
  animate={{ 
    rotate: [0, 10, -10, 0],
    scale: [1, 1.1, 1]
  }}
  transition={{ 
    duration: 0.6,
    repeat: Infinity,
    repeatDelay: 1.5
  }}
/>
                
                {/* Glowing pulse effect */}
                <motion.div
                  className="absolute inset-0 bg-white rounded-full"
                  animate={{ 
                    opacity: [0, 0.3, 0],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Right side - Text content */}
            <div className="flex-1 min-w-0">
              {/* Achievement Unlocked text */}
              <motion.div
                className="text-sm font-semibold text-green-100 mb-1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                ACHIEVEMENT UNLOCKED
              </motion.div>
              
              {/* Main achievement text */}
              <motion.h3
                className="text-lg font-bold text-white leading-tight"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                VibeCoding Portfolio
              </motion.h3>
              
              {/* Optional gamerscore or description */}
              <motion.div
                className="text-xs text-green-100 mt-1 opacity-90"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                View on pc for a better experience
              </motion.div>
            </div>

            {/* Gamerscore badge (optional) */}
            <motion.div
              className="flex-shrink-0 ml-3 text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="w-8 h-8 bg-green-600 border border-green-300 rounded flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <span className="text-xs font-bold text-white">100</span>
              </motion.div>
              <div className="text-xs text-green-100 mt-1">G</div>
            </motion.div>

            {/* Top highlight bar */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background particles/stars effect during achievement */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoadingScreen;
