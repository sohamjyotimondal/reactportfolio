import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Publications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const publications = [
    {
      id: 1,
      title: "SMS Spam Detection and Filtering of Transliterated Messages",
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
      venue: "Redefining Commerce and Management: New Paradigms for the Digital Age",
      isbn: "978-81-19368-52-5",
      description: "Explored the integration of AI in logistics to optimize operational processes, enhance efficiency, and mitigate risks in modern supply chains.",
      type: "Book Chapter",
      icon: "📚",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30
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

  return (
    <section id="publications" className="py-20 px-4 relative" ref={ref}>
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
              Publications
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Research contributions to academic conferences and publications
          </p>
        </motion.div>

        {/* Publications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {publications.map((pub) => (
            <motion.div
              key={pub.id}
              variants={itemVariants}
              className="relative group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-teal-500/30 transition-colors duration-300">
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`text-4xl p-4 rounded-full bg-gradient-to-r ${pub.color} bg-opacity-20`}>
                    {pub.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">
                          {pub.title}
                        </h3>
                        <p className="text-teal-400 font-medium">{pub.venue}</p>
                        {pub.isbn && (
                          <p className="text-gray-400 text-sm">ISBN: {pub.isbn}</p>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${pub.color} text-white`}>
                          {pub.type}
                        </div>
                        <div className="text-gray-400 text-sm">{pub.year}</div>
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed">
                      {pub.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Publication Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { label: "Total Publications", value: "2", icon: "📄" },
            { label: "Research Areas", value: "3", icon: "🔬" },
            { label: "Citations", value: "10+", icon: "📈" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(31, 41, 55, 0.6)"
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

export default Publications;
