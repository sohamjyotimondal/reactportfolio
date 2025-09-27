import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Custom hook to detect click outside of the element
const useClickOutside = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    const maybeHandler = (event) => {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  }, [handler]);

  return domNode;
};

const Publications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [expandedId, setExpandedId] = useState(null);

  const publications = [
    {
      id: 1,
      title: "SMS Spam Detection and Filtering of Transliterated Messages",
      shortTitle: "SMS Spam Detection",
      venue: "Intelligent Computing and Control for Engineering and Business Systems (ICCEBS)",
      year: "2023",
      description: "Conducted a comprehensive survey of SMS spam detection techniques and identified key features that improve classification accuracy.",
      type: "Conference Paper",
      icon: "📱",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "The Evolution of Logistics: Role of AI in Enhanced Operational Efficiency and Risk Mitigation",
      shortTitle: "AI in Logistics",
      venue: "Redefining Commerce and Management: New Paradigms for the Digital Age",
      isbn: "978-81-19368-52-5",
      year: "2024",
      description: "Explored the integration of AI in logistics to optimize operational processes, enhance efficiency, and mitigate risks in modern supply chains.",
      type: "Book Chapter",
      icon: "📚",
      color: "from-purple-500 to-pink-500"
    }
  ];

  // Use custom hook for click outside - only close if something is expanded
  const expandedRef = useClickOutside(() => {
    if (expandedId !== null) {
      setExpandedId(null);
    }
  });

  return (
    <section id="publications" className="py-20 px-4 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
              Publications
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Research contributions to academic conferences and publications
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-blue-500 transform -translate-y-1/2 origin-left"
          />

          {/* Publications Timeline */}
          <div className="flex justify-between items-center relative py-20 px-4">
            {publications.map((pub, index) => {
              const isExpanded = expandedId === pub.id;
              return (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                  className="relative flex flex-col items-center"
                  style={{ 
                    flex: '1 1 0%',
                    minWidth: 0, // Prevent flex items from overflowing
                    maxWidth: isExpanded ? '450px' : '300px'
                  }}
                >
                  {/* Publication Box */}
                  <div 
                    ref={isExpanded ? expandedRef : null}
                    className="mb-8 relative z-10"
                  >
                    <motion.div
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedId(isExpanded ? null : pub.id);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <AnimatePresence mode="wait">
                        {!isExpanded ? (
                          <motion.div
                            key="collapsed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 w-[250px] hover:border-teal-500/50 transition-colors duration-300"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`text-2xl p-2 rounded-full bg-gradient-to-r ${pub.color} bg-opacity-20`}>
                                {pub.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-bold text-white leading-tight truncate">
                                  {pub.shortTitle}
                                </h3>
                                <p className="text-xs text-gray-400">{pub.year}</p>
                              </div>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${pub.color} text-white text-center`}>
                              {pub.type}
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="expanded"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-gray-800/95 backdrop-blur-sm border border-teal-500/50 rounded-xl p-6 w-[400px] shadow-2xl"
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              zIndex: 1000
                            }}
                          >
                            <div className="flex items-start gap-4 mb-4">
                              <div className={`text-3xl p-3 rounded-full bg-gradient-to-r ${pub.color} bg-opacity-30 flex-shrink-0`}>
                                {pub.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-white mb-1 leading-tight">
                                  {pub.title}
                                </h3>
                                <p className="text-teal-400 font-medium text-sm mb-1">{pub.venue}</p>
                                {pub.isbn && (
                                  <p className="text-gray-400 text-xs">ISBN: {pub.isbn}</p>
                                )}
                              </div>
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                              {pub.description}
                            </p>

                            <div className="flex justify-between items-center">
                              <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${pub.color} text-white`}>
                                {pub.type}
                              </div>
                              <div className="text-gray-400 text-sm">{pub.year}</div>
                            </div>

                            {/* Close indicator */}
                            <div className="text-center mt-3">
                              <span className="text-gray-500 text-xs">Click outside to collapse</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    className={`w-6 h-6 rounded-full bg-gradient-to-r ${pub.color} relative z-20 shadow-lg ${
                      isExpanded ? 'ring-4 ring-teal-400/30' : ''
                    }`}
                  >
                    <motion.div
                      className="w-3 h-3 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      animate={isExpanded ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5, repeat: isExpanded ? Infinity : 0, repeatDelay: 1 }}
                    />
                  </motion.div>

                  {/* Year Label Below */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                    className="mt-4 text-gray-400 text-sm font-medium"
                  >
                    {pub.year}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Timeline Glow Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="absolute top-1/2 left-0 right-0 h-8 bg-gradient-to-r from-teal-400/20 to-blue-500/20 blur-xl transform -translate-y-1/2"
          />

          {/* Backdrop for expanded items */}
          <AnimatePresence>
            {expandedId !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                style={{ pointerEvents: 'none' }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 text-sm">
            Click on any publication to view detailed information
          </p>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Publications;
