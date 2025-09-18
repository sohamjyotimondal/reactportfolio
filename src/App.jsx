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
// Remove this import: import ParticleBackground from './components/ParticleBackground';
import Particles from './components/Particles'; // Keep only this one
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* React Bits Particles Background - Fixed behind everything */}
      <Particles
        particleCount={1000}
        particleSpread={12}
        speed={0.08}
        particleColors={['#14b8a6', '#d73bf6ff', '#06b6d4', '#8b5cf6']}
        moveParticlesOnHover={true}
        particleHoverFactor={0.4}
        alphaParticles={true}
        particleBaseSize={100}
        sizeRandomness={0.8}
        cameraDistance={25}
        disableRotation={false}
      />

      {/* Content layer with proper z-index */}
      <div className="relative z-10">
        <ScrollProgress />
        <Navbar currentSection={currentSection} />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <SkillScatter />
          <Experience />
          <Projects />
          <Publications />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default App;
