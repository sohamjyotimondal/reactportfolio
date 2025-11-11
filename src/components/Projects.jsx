import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    accent: "from-pink-500/30 via-rose-500/20 to-fuchsia-400/30",
    liveUrl: "https://github.com/sohamjyotimondal/HUMoR",
    githubUrl: "https://github.com/sohamjyotimondal/HUMoR"
  },
  {
    id: 2,
    title: "NExUS - Neural Cryptographic Block Cipher",
    description: "Novel 128-bit symmetric-key block cipher combining Invertible Neural Networks with traditional cryptography. Replaces static S-boxes with learnable bijective transformations using modular arithmetic, achieving near-ideal avalanche effect and resistance to differential/linear attacks.",
    technologies: ["Python", "Invertible Neural Networks", "Cryptography", "SHA-512", "Modular Arithmetic"],
    metrics: {
      "Avalanche Effect": "63.92 bits (ideal: 64)",
      "Key Avalanche": "64.01 bits",
      "Ciphertext Uniformity": "p-value: 0.791",
      "SAC Probability": "0.4997 (ideal: 0.5)"
    },
    category: "Cryptography & Security",
    accent: "from-purple-500/30 via-indigo-500/20 to-blue-400/30",
    liveUrl: "https://github.com/sohamjyotimondal",
    githubUrl: "https://github.com/sohamjyotimondal"
  },
  {
    id: 3,
    title: "Revenant NeuroSpawn - RL Zombie Spawner",
    description: "Deep RL-powered intelligent zombie spawner for Unity shooter game with strategic spawn decisions. Features running normalizer, custom state simulation, and policy gradient training with entropy regularization for dynamic, context-aware gameplay.",
    technologies: ["Unity", "Deep Learning", "C#", "Reinforcement Learning", "Policy Gradients"],
    metrics: {
      "Neural Network": "11-input state, 5 spawn points",
      "Architecture": "Shared layers + specialized heads",
      "Training": "Policy gradients with LR scheduling"
    },
    category: "Game AI",
    accent: "from-green-500/30 via-teal-500/20 to-emerald-400/30",
    liveUrl: "https://github.com/sohamjyotimondal/Neurospawn",
    githubUrl: "https://github.com/sohamjyotimondal/Neurospawn"
  },
  {
    id: 4,
    title: "NLP Customer Priority System",
    description: "Developed NLP system for automatic customer complaint prioritization using BERT and RoBERTa with attention-based fine-tuning for enhanced after-sales service efficiency.",
    technologies: ["BERT", "RoBERTa", "NLP", "Text Classification"],
    category: "Natural Language Processing",
    accent: "from-blue-500/30 via-cyan-500/20 to-sky-400/30",
    liveUrl: "https://github.com/sohamjyotimondal"
  },
  {
    id: 5,
    title: "Game of Thrones Chatbot",
    description: "Built a Game of Thrones-themed chatbot that delivers witty, in-character quotes using Groq's fast LLM inference and LlamaIndex for data orchestration, wrapped in a stylish 'Game of Quotes' interface.",
    technologies: ["Groq LLM", "LlamaIndex", "Python", "Gradio"],
    metrics: {
      "Response Speed": "Ultra-fast with Groq LPU",
      "Character Accuracy": "In-character quotes",
      "Interface": "Game of Quotes themed"
    },
    category: "AI Chatbot",
    accent: "from-amber-500/30 via-orange-500/20 to-yellow-400/30",
    liveUrl: "https://github.com/sohamjyotimondal", // Update with actual repo
    githubUrl: "https://github.com/sohamjyotimondal" // Update with actual repo
  },
  {
    id: 6,
    title: "CrewDoc-AI - Healthcare Risk Prediction Engine",
    description: "AI-driven risk prediction engine forecasting 90-day deterioration probability for chronic care patients. Features synthetic longitudinal patient data generation, 197 engineered time-series features, calibrated XGBoost model with AUROC 0.909, SHAP explainability, and multi-agent CrewAI validation. Includes interactive Streamlit dashboards for cohort management, patient deep dives, and clinical decision support.",
    technologies: ["XGBoost", "SHAP", "CrewAI", "Streamlit", "Python", "Scikit-learn", "Optuna", "Time-Series ML"],
    metrics: {
      "AUROC": "0.909",
      "AUPRC": "0.684",
      "Sensitivity/Specificity": "0.804 / 0.848",
      "Calibration": "Brier Score 0.098",
      "Feature Set": "197 engineered features",
      "Dataset": "5,000 synthetic patients"
    },
    category: "Healthcare AI & MLOps",
    accent: "from-amber-500/30 via-orange-500/20 to-yellow-400/30",
    liveUrl: "https://github.com/sohamjyotimondal/crewdocscreening",
    githubUrl: "https://github.com/sohamjyotimondal/crewdocscreening"
  }
];




const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const spring = {
  type: "spring",
  stiffness: 200,
  damping: 30,
  mass: 0.6,
};

const Card = ({ project, index }) => {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const setRefs = (node) => {
    cardRef.current = node;
    inViewRef(node);
  };

  // GSAP Parallax Effect - Different movement for each column in 3-col layout
  useEffect(() => {
    if (!cardRef.current) return;

    const element = cardRef.current;
    
    // Calculate column position (0 = left, 1 = middle, 2 = right in 3-col layout)
    const columnPosition = index % 3;
    
    // Side columns move down, middle column moves up
    let direction;
    if (columnPosition === 0) {
      direction = 100; // Left - scroll down
    } else if (columnPosition === 1) {
      direction = -80; // Middle - scroll up
    } else {
      direction = 100; // Right - scroll down
    }

    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
      y: direction,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [index]);

  const handleMove = (event) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = clamp((x - centerX) / centerX, -1, 1);
    const percentY = clamp((y - centerY) / centerY, -1, 1);

    rotateY.set(percentX * 8);
    rotateX.set(-percentY * 8);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={setRefs}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 60 }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full flex-col justify-between rounded-3xl border border-white/8 bg-white/[0.02] p-6 text-left backdrop-blur-xl will-change-transform"
      style={{
        transformStyle: "preserve-3d",
        boxShadow: "0 40px 80px -40px rgba(15, 23, 42, 0.45), 0 20px 40px -30px rgba(99, 102, 241, 0.35), 0 0 0 1px rgba(255,255,255,0.05)",
      }}
    >
      <motion.div
        className={`pointer-events-none absolute -inset-px rounded-[26px] bg-gradient-to-br ${project.accent} opacity-40 blur-2xl`}
        style={{ zIndex: 0 }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl border border-white/5"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)" }}
      />

      <div className="relative z-10 flex flex-1 flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className={`mb-3 inline-block rounded-full border border-white/10 bg-gradient-to-r ${project.accent.replace(/\/\d+/g, '')} px-3 py-1 text-xs font-medium uppercase tracking-wide text-white`}>
              {project.category}
            </div>
            <h3 className="text-2xl font-semibold leading-tight text-white md:text-3xl">{project.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300/80 md:text-base">
              {project.description}
            </p>
          </div>
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white/80 backdrop-blur-sm"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
            transition={spring}
          >
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
            <span className="sr-only">Open project</span>
          </motion.a>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-200/70"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-400">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const carouselRef = useRef(null);
  const cursorOffset = useMotionValue(0);
  const { ref: sectionRef, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const handleMouseMove = (event) => {
    const rect = carouselRef.current?.getBoundingClientRect();
    if (!rect) return;
    const offset = ((event.clientX - rect.left) / rect.width - 0.5) * 30;
    cursorOffset.set(offset);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 text-white sm:px-8 md:px-10"
    >
      {/* Parallax background gradient accent */}
      <motion.div
        className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl"
        style={{
          y: useMotionValue(0),
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm">
          Selected Work
        </span>
        <h2 className="mt-6 text-4xl font-semibold sm:text-5xl md:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CF835D] to-[#691734]">
            Projects in Focus
          </span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-300/80 md:text-lg">
          Innovative solutions combining AI, machine learning, and cutting-edge technologies through research-driven design and motion.
        </p>
      </motion.div>

      <div
        ref={carouselRef}
        className="relative mt-16 w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => cursorOffset.set(0)}
      >
        <motion.div
          className="pointer-events-none absolute inset-x-4 top-1/2 z-0 -translate-y-1/2 rounded-full bg-gradient-to-r from-white/[0.08] via-transparent to-white/[0.08] blur-3xl"
          style={{ opacity: 0.7, x: cursorOffset }}
        />

        <div className="grid gap-x-8 gap-y-24 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
