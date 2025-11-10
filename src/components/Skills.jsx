import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const cards = [
  {
    title: 'Generative AI & LLM Systems',
    category: 'AI & ML',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    summary: 'Building production-grade agentic AI systems with advanced RAG pipelines and prompt engineering.',
    highlights: ['LangChain / LlamaIndex', 'CrewAI framework', 'Azure AI / AWS', 'Model fine-tuning'],
    shadowColor: 'rgba(139, 92, 246, 0.5)',
  },
  {
    title: 'Backend Engineering & API Development',
    category: 'Web Engineering',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    summary: 'Architecting scalable REST APIs and data pipelines with automated SQL generation and GraphQL integration.',
    highlights: ['FastAPI / Flask', 'GraphQL integration', 'REST API design', 'Dynamic query generation'],
    shadowColor: 'rgba(34, 211, 238, 0.5)',
  },
  {
    title: 'Web Scraping & Data Collection',
    category: 'Data Engineering',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    summary: 'Building automated scraping pipelines for multi-platform data aggregation with anti-detection strategies.',
    highlights: ['Custom scrapers (Twitter, Reddit)', 'Devfolio / Devpost automation', 'Data pipeline orchestration', 'Beautiful Soup / Scrapy'],
    shadowColor: 'rgba(236, 72, 153, 0.5)',
  },
  {
    title: 'Network Analysis & Security',
    category: 'Cybersecurity',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    summary: 'Protocol analysis and traffic inspection using industry-standard tools for security auditing and debugging.',
    highlights: ['Wireshark packet analysis', 'mitmproxy / Burp Suite', 'API reverse engineering', 'Network debugging'],
    shadowColor: 'rgba(251, 146, 60, 0.5)',
  },
  {
    title: 'Computer Vision & Medical Imaging',
    category: 'Deep Learning',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    summary: 'Specialized in medical image segmentation, model distillation, and efficient deployment strategies.',
    highlights: ['UNETR / MoE architectures', 'Knowledge distillation', '75% size reduction', 'Tumor segmentation'],
    shadowColor: 'rgba(59, 130, 246, 0.5)',
  },
  {
    title: 'Audio Processing & Reinforcement Learning',
    category: 'AI Systems',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
    summary: 'Advanced signal processing for medical diagnostics and adaptive game AI with custom reward functions.',
    highlights: ['CED model benchmarking', 'Unity ML integration', 'Graph neural networks', 'Body sound classification'],
    shadowColor: 'rgba(16, 185, 129, 0.5)',
  },
];




const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.skill-card').forEach((card, index) => {
        const cover = card.querySelector('.skill-card__cover');
        if (!cover) return;

        gsap.fromTo(
          cover,
          { yPercent: -18 },
          {
            yPercent: 18,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          card,
          { y: index % 2 === 0 ? 90 : 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/70 via-slate-900/60 to-black/70 backdrop-blur-[2px]" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-12 right-16 h-56 w-56 rounded-full bg-purple-500/12 blur-3xl" />
        <div className="absolute bottom-0 left-6 h-72 w-72 rounded-full bg-cyan-500/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-24 text-center">
          <p className="text-sm uppercase tracking-[0.8em] text-purple-400/80 mb-6">Skillset</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Don't be a noun be a{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              VERB
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-400">
           The joy of computer science comes from the ability to create impactful solutions across diverse domains.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="skill-card relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_40px_80px_-40px_rgba(15,118,110,0.45)] backdrop-blur-xl transition-transform duration-700 hover:-translate-y-3"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <figure className="relative h-64 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="skill-card__cover absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                  {card.category}
                  <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                </span>
              </figure>

              <div className="relative space-y-5 p-8">
                <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
                <p className="text-base leading-relaxed text-gray-400">{card.summary}</p>
                <ul className="grid gap-3 text-sm text-gray-300 sm:grid-cols-2">
                  {card.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6">
                  {/* <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-white/50">
                    <span>Scroll</span>
                    <span className="h-px w-10 bg-white/40" />
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
