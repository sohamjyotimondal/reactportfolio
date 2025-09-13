import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import SkillScatter from './components/SkillScatter';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import ParticleBackground from './components/ParticleBackground';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');
  const [showAchievement, setShowAchievement] = useState(false);

  useEffect(() => {
    // Start achievement animation after a brief delay
    const achievementTimeout = setTimeout(() => {
      setShowAchievement(true);
    }, 500);

    // Hide achievement and finish loading
    const loadingTimeout = setTimeout(() => {
      setShowAchievement(false);
      // Small delay before hiding loading screen
      setTimeout(() => {
        setLoading(false);
        
        // Set up intersection observer
        setTimeout(() => {
          const sections = document.querySelectorAll('section[id]');
          
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  setCurrentSection(entry.target.id);
                }
              });
            },
            { 
              threshold: 0.3,
              rootMargin: '-50px 0px -50px 0px'
            }
          );

          sections.forEach((section) => observer.observe(section));
        }, 100);
      }, 800); // Delay to let slide-out complete
    }, 3500);

    return () => {
      clearTimeout(achievementTimeout);
      clearTimeout(loadingTimeout);
    };
  }, []);

  // Show loading screen
  if (loading) {
    return <LoadingScreen showAchievement={showAchievement} />;
  }

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <ParticleBackground />
      <ScrollProgress />
      <Navbar currentSection={currentSection} />
      
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <section id="home">
            <Hero />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="skills">
            <Skills />
            <SkillScatter />
          </section>
          <section id="experience">
            <Experience />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="publications">
            <Publications />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </motion.main>
      </AnimatePresence>
      
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 pointer-events-none z-[-1]" />
    </div>
  );
};

export default App;
