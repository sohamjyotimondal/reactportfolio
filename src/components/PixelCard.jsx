// PixelCard.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const PixelCard = ({ 
  children, 
  className = "", 
  pixelSize = 8, 
  pixelCount = 50,
  colors = ['#14b8a6', '#06b6d4', '#8b5cf6', '#3b82f6'],
  animationDuration = 0.6,
  ...props 
}) => {
  const [pixels, setPixels] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Generate random pixels on hover
  const generatePixels = () => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const newPixels = [];
    
    for (let i = 0; i < pixelCount; i++) {
      newPixels.push({
        id: i,
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: pixelSize + Math.random() * pixelSize,
        delay: Math.random() * 0.3,
        duration: animationDuration + Math.random() * 0.4
      });
    }
    
    setPixels(newPixels);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    generatePixels();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Keep pixels visible for a moment before clearing
    setTimeout(() => {
      if (!isHovered) {
        setPixels([]);
      }
    }, animationDuration * 1000);
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Original card content */}
      {children}
      
      {/* Pixel overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {pixels.map((pixel) => (
          <motion.div
            key={pixel.id}
            className="absolute"
            style={{
              left: pixel.x,
              top: pixel.y,
              width: pixel.size,
              height: pixel.size,
              backgroundColor: pixel.color,
            }}
            initial={{ 
              scale: 0, 
              opacity: 0,
              rotate: 0
            }}
            animate={{ 
              scale: isHovered ? [0, 1.2, 1] : 0, 
              opacity: isHovered ? [0, 0.8, 0.6, 0] : 0,
              rotate: isHovered ? [0, 180, 360] : 0
            }}
            transition={{
              duration: pixel.duration,
              delay: pixel.delay,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PixelCard;
