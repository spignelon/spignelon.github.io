"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// removed unused maath import
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { Mail, ChevronDown, Terminal, Shield, Code, Cpu, Database, Wrench, Layers } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaTelegram } from "react-icons/fa";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as THREE from "three";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const initialSphere = new Float32Array(800 * 3);
for (let i = 0; i < 800; i++) {
  const r = 1.5 * Math.cbrt(Math.random());
  const theta = Math.random() * 2 * Math.PI;
  const phi = Math.acos(2 * Math.random() - 1);
  initialSphere[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  initialSphere[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  initialSphere[i * 3 + 2] = r * Math.cos(phi);
}

function ParticleBackground(props: { [key: string]: unknown }) {
  const ref = useRef<THREE.Points>(null);
  
  const sphere = initialSphere;

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
          <PointMaterial
            transparent
            color="#ffffff"
            size={0.012}
            sizeAttenuation={true}
            depthWrite={false}
          />
        </Points>
      </group>
  );
}

const PROJECTS = [
  {
    title: "Social2Amazon",
    description: "AI-powered tool that converts social media content into complete Amazon product listings.",
    descriptionFull: "Social2Amazon is an AI-powered tool that converts social media content (Instagram, Facebook, TikTok) into complete Amazon product listings by analyzing text, images, videos, and Reels—earning 1st Runner-Up at the Amazon Sambhav Hackathon for this smart social-to-ecommerce solution.",
    points: [
      "Scrapes & Analyzes Social Content from Instagram, TikTok, and Facebook (incl. Reels & images).",
      "AI Generates Product Listings with titles, descriptions, and attributes.",
      "Auto-Publishes to Amazon with dashboard support for account and data management."
    ],
    image: "/social2amazon.png",
    tags: ["Django", "React.js", "LLMs", "BeautifulSoup", "Selenium"],
    github: "#",
    link: "#"
  },
  {
    title: "WaitBin",
    description: "A time-locked pastebin service to create content hidden until a specific timeline.",
    descriptionFull: "WaitBin is a time-locked pastebin service that allows you to create content that remains hidden until a specific date and time. Perfect for surprises, scheduled announcements, or future messages.",
    points: [
      "Time-locked pastes that unlock at your chosen time with a live countdown",
      "Shareable and editable links using codes or account access",
      "Easily manage all WaitBins from a personal dashboard"
    ],
    image: "/waitbin.png",
    tags: ["Flask", "MongoDB", "Python", "Tailwind CSS", "JavaScript"],
    github: "#",
    link: "#"
  },
  {
    title: "NoLlama",
    description: "A terminal-based chat interface for Google’s Gemini models with low memory footprint.",
    descriptionFull: "NoLlama is a terminal-based chat interface for Google’s Gemini models like 2.0 Flash and 2.5 Pro, offering clean markdown output, multiple model support, and low memory usage. Ollama, Groq, and OpenRouter support coming soon.",
    points: [
      "Access Gemini Models in Terminal with support for 2.0 Flash, 2.5 Flash Preview, and Pro models",
      "Smooth Chat Experience with multi-turn context, real-time streaming, and easy model switching",
      "Lightweight & Intuitive UI featuring colorful markdown, low memory usage, and simple commands like clear or exit"
    ],
    image: "/nollama.png",
    tags: ["Python", "Chatbots", "LLMs", "AI", "Gemini"],
    github: "#",
    link: "#"
  },
  {
    title: "Facemap",
    description: "A high-accuracy face recognition photo sharing app with 99.2% accuracy.",
    descriptionFull: "A high-accuracy face recognition photo sharing app with 99.2% accuracy. Developed custom Python modules for image filtering and metadata stripping. Won 2nd prize in HackEDCode hackathon.",
    points: [
      "Built with Django 4.2, PostgreSQL, deepface, and FaceNet",
      "Google OAuth integration for secure authentication",
      "Responsive front-end with Bootstrap, HTML/CSS/JavaScript"
    ],
    image: "/facemap.png",
    tags: ["Django", "FaceNet", "PostgreSQL", "Bootstrap", "Google OAuth"],
    github: "#",
    link: "#"
  },
  {
    title: "TorBreaker",
    description: "Cybersecurity platform capable of de-anonymizing onion sites on the Tor Network.",
    descriptionFull: "A robust cybersecurity platform built during Smart India Hackathon (SIH) 2024, capable of de-anonymizing onion sites operating on the Tor Network. Includes automated URL crawling and AI-driven site legality validation.",
    points: [
      "15+ custom Python modules for misconfiguration detection",
      "Django with Celery and Redis for task queue management",
      "MongoDB database for flexible data storage"
    ],
    image: "/torbreaker.png",
    tags: ["Django", "Celery", "Redis", "MongoDB", "Python"],
    github: "#",
    link: "#"
  }
];

const HorizontalScrollCarousel = ({ setActiveProject }: { setActiveProject: (project: typeof PROJECTS[0] | null) => void }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-transparent">
      <div className="sticky top-0 flex h-[100vh] pt-24 pb-8 items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 px-4 md:px-12 w-max items-center h-full max-h-[700px]">
          {PROJECTS.map((project, i) => (
            <div 
              key={i}
              className="w-[85vw] md:w-[65vw] lg:w-[45vw] xl:w-[40vw] h-full max-h-[550px] shrink-0"
            >
              <div
                className="w-full h-full rounded-[2rem] bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col group cursor-pointer"
                onClick={() => setActiveProject(project)}
              >
                {/* Top Side: Image */}
                <div className="relative w-full h-[60%] bg-slate-950 flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                    />
                  ) : (
                    <div className="text-3xl text-slate-800 font-bold blur-[1px]">{project.title}</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                </div>

                {/* Bottom Side: Content */}
                <div className="p-8 md:p-10 flex flex-col justify-center flex-1">
                  <span className="text-blue-400 font-mono text-xs uppercase tracking-widest mb-3 block">
                    Project 0{i + 1}
                  </span>
                  <h3 className="text-3xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag: string, j: number) => (
                      <span key={j} className="px-3 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/10 rounded-lg font-mono text-[11px] whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default function Portfolio() {
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroTextRef.current) {
      gsap.fromTo(
        heroTextRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const [activeProject, setActiveProject] = useState<typeof PROJECTS[0] | null>(null);
  

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500 selection:text-slate-950 overflow-x-clip">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleBackground />
        </Canvas>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/80 to-slate-950 z-10"></div>
      </div>

      {/* Navigation Bar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-50 rounded-2xl bg-slate-950/40 backdrop-blur-xl border border-white/5 shadow-2xl"
      >
        <div className="px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="font-bold text-xl tracking-tight text-neutral-100 flex items-center gap-1 group">
            <span className="tracking-tighter">Ujjawal Saini</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] group-hover:scale-150 transition-transform duration-300"></span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-blue-400 transition-colors relative group">About</a>
            <a href="#experience" className="hover:text-blue-400 transition-colors relative group">Experience</a>
            <a href="#skills" className="hover:text-blue-400 transition-colors relative group">Skills</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors relative group">Projects</a>
            <a href="#achievements" className="hover:text-blue-400 transition-colors relative group">Achievements</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors relative group">Contact</a>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              className="px-5 py-2 bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-slate-950 border border-blue-500/30 hover:border-blue-500 transition-all duration-300 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              Resume
            </a>
          </div>
        </div>
      </motion.nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center relative pt-20 pb-24" id="hero">
          <div ref={heroTextRef} className="max-w-4xl flex flex-col items-center">
            <h1 className="text-blue-400 font-mono mb-4 text-base md:text-lg">Hi, my name is</h1>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-2 tracking-tight text-white">
              Ujjawal Saini.
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-300 mb-8 tracking-tight">
              I build things for the web & AI.
            </h3>
            <p className="text-slate-300 max-w-2xl text-lg md:text-xl mb-12 leading-relaxed">
              A versatile developer and hacker proficient in <span className="text-blue-400">Artificial Intelligence</span>, <span className="text-blue-400">Backend Web Development</span>, <span className="text-blue-400">Machine Learning</span>, <span className="text-blue-400">Deep Learning</span> and <span className="text-blue-400">Cyber Security</span>.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <a href="#projects" className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-mono font-medium rounded transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                See My Work
              </a>
              <a href="#contact" className="px-8 py-3 bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500/10 font-mono font-medium rounded transition-colors">
                Get In Touch
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-slate-300 text-xl">
              <a href="https://github.com/spignelon" target="_blank" className="hover:text-[#3b82f6] transition-colors"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/spignelon" target="_blank" className="hover:text-[#3b82f6] transition-colors"><FaLinkedin /></a>
              <a href="https://t.me/spignelon" target="_blank" className="hover:text-[#3b82f6] transition-colors"><FaTelegram /></a>
              <a href="mailto:ujjawalsaini47@gmail.com" className="hover:text-[#3b82f6] transition-colors"><Mail size={20} /></a>
              <a href="https://twitter.com/spignelon" target="_blank" className="hover:text-[#3b82f6] transition-colors"><FaTwitter /></a>
            </div>
          </div>
          <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-blue-400 hover:text-blue-300 font-mono text-sm animate-bounce cursor-pointer transition-colors z-20">
            Scroll Down
            <ChevronDown size={20} />
          </a>
        </section>
        
        <section id="about" className="py-32 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-16 flex items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">01. <span className="text-blue-400 font-mono text-2xl md:text-3xl">About Me</span></h2>
            <span className="h-[1px] bg-slate-800 flex-grow max-w-sm"></span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Content Card - Abstract Story */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 bg-slate-900/30 border border-slate-800/50 backdrop-blur-md p-8 md:p-10 rounded-2xl hover:border-blue-500/20 transition-colors shadow-2xl"
            >
              <div className="space-y-6 text-neutral-300 text-base md:text-lg leading-relaxed">
                <p>
                  Hello! I&apos;m <span className="text-blue-400 font-medium">Ujjawal Saini</span>, a 2025 AIML graduate from Guru Gobind Singh Indraprastha University. I am currently based in Bangalore, working at <span className="text-blue-400 font-medium">Chrysalis Gold</span>.
                </p>
                <p>
                  I&apos;m a versatile developer and hacker proficient in Full Stack Web Development, Artificial Intelligence, Machine Learning, Deep Learning, and Cyber Security. My passion lies in building robust backend systems, creating intelligent solutions with Artificial Intelligence and Machine Learning, and securing digital infrastructure.
                </p>
                <p>
                  My journey in tech has been marked by multiple hackathon victories (including Amazon Sambhav & Intel GenAI at IIT Delhi) and hands-on experience as a Backend Developer Intern & Consultant at Mudraksh & McShaw Tech LLP and Repairo Tech—where I migrated legacy stacks, built AI-driven trade tools, and actively contributed to open-source.
                </p>
                <p>
                  Beyond writing code, I have a massive interest in tech startups and business. If you share this mindset and want to build something amazing together, <a href="#contact" className="text-blue-400 hover:text-blue-300 transition-colors border-b border-blue-400/30 hover:border-blue-400">let&apos;s connect!</a>
                </p>
              </div>
            </motion.div>

            {/* Right Group - Technologies & Education */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Technologies Card */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="bg-slate-900/30 border border-slate-800/50 backdrop-blur-md p-8 rounded-2xl hover:border-blue-500/20 transition-colors shadow-2xl flex-grow"
              >
                <p className="text-blue-400 font-mono text-sm mb-6">Here are some technologies I&apos;ve been working with recently:</p>
                <ul className="grid grid-cols-2 lg:grid-cols-2 gap-x-4 gap-y-3 font-mono text-sm text-slate-300">
                  {['Python', 'Django', 'TensorFlow', 'PyTorch', 'Flask', 'MongoDB', 'PostgreSQL', 'Linux', 'Golang'].map((tech, i) => (
                    <li key={i} className="flex items-center gap-2">
                       <span className="text-blue-400 text-xs">▹</span> {tech}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Education Card */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="bg-slate-900/30 border border-slate-800/50 backdrop-blur-md p-8 rounded-2xl hover:border-blue-500/20 transition-colors shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-xl font-bold text-white mb-6 relative z-10 flex items-center gap-3">
                  <Terminal size={20} className="text-blue-400" /> My Education
                </h3>
                
                <div className="relative z-10 pl-4 border-l-2 border-slate-800">
                  <div className="absolute w-3 h-3 bg-blue-400 rounded-full -left-[7px] top-1.5 shadow-[0_0_10px_rgba(74,222,128,0.6)]"></div>
                  <h4 className="text-lg font-bold text-slate-200">Bachelor of Technology [AIML]</h4>
                  <p className="text-blue-400 font-mono text-sm mt-1 mb-2">Guru Gobind Singh Indraprastha University</p>
                  <p className="text-neutral-500 text-sm font-mono mb-4">August 2021 - July 2025 | CGPA: 7.9</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Pursuing a B.Tech in AIML with a strong focus on applying AI/ML concepts to real-world problems through projects and research. Actively involved in hackathons, coding competitions, and open-source contributions to strengthen practical understanding beyond academics.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

                <section id="experience" className="py-32 relative border-t border-white/5">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-20 flex flex-col items-center justify-center gap-6">
             <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-4">
                <span className="text-blue-500 font-mono text-2xl md:text-4xl">02.</span> Where I&apos;ve Worked
             </h2>
             <p className="text-slate-400 text-lg md:text-xl text-center max-w-2xl">
                My professional journey across startups, open-source communities, and enterprise tech.
             </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto px-4 md:px-0">
            {/* Background Line */}
            <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 w-[2px] bg-slate-800/50 rounded-full"></div>

            <div className="space-y-16 md:space-y-24">
              {[
                {
                  role: "Associate Engineer - Data Science",
                  company: "Chrysalis Gold",
                  date: "August 2025 - Present",
                  points: ["Architected production-grade async PDF extraction pipeline for digital & scanned PDFs with concurrent processing for text, tables, images, and charts.", "Integrated multi-engine OCR (PaddleOCR, EasyOCR, Pytesseract) and table parsers (Tabula, Camelot) with post-processing, Flask backend, and frontend UI.", "Built production-grade AI Agent system with tool use, multi-step reasoning, and agentic loops for automated document understanding workflows.", "Designed and deployed end-to-end RAG system with vector embeddings, semantic retrieval, and LLM-powered Q&A over large document corpora."]
                },
                {
                  role: "Backend Developer Intern",
                  company: "Mudraksh & McShaw Tech",
                  date: "March 2025 - July 2025",
                  points: ["Improved WorkSage backend with task tagging, analytics, and employee tracking for efficient operations.", "Built Trade Compass for calculating trade P&L using Flask, Pandas, and real-time data from TrueData.in API.", "Accelerated MVP development using Agentic AI tools for idea-to-product workflows."]
                },
                {
                  role: "Summer Intern",
                  company: "IBM",
                  date: "July 2024 - August 2024",
                  points: ["Completed summer internship with IBM SkillsBuild and CSRBOX, focused on AI/ML technologies.", "Gained hands-on experience building AI/ML solutions using industry-standard tools and methodologies.", "Worked on practical AI/ML projects solving real-world technological challenges."]
                },
                {
                  role: "Backend Consultant",
                  company: "Repairo Tech. India",
                  date: "Sept 2022 - Dec 2024",
                  points: ["Porting Laravel PHP backend to Python Django, resolving backend bugs and issues.", "Advised developers and executives on service development, ensuring smooth operation and optimal user experience.", "Guided the startup owner in business decisions and operations."]
                }
              ].map((exp, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Empty div for spacing on large screens */}
                  <div className="hidden md:block md:w-[45%]"></div>

                  {/* Center Node on the Timeline */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                    className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full border-4 border-slate-950 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-20 flex-shrink-0"
                  />

                  {/* Card Content */}
                  <motion.div 
                    initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                    className={`w-full md:w-[45%] pl-16 md:pl-0 relative`}
                  >
                    <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden group hover:border-blue-500/40 hover:bg-slate-800/80 transition-all duration-500">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/5 to-transparent transition-opacity duration-500"></div>
                      
                      <div className="relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-slate-950 text-blue-400 font-mono text-xs uppercase tracking-wider border border-blue-500/20 mb-6">
                          {exp.date}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">{exp.role}</h3>
                        <h4 className="text-lg text-slate-400 font-medium mb-6 flex items-center gap-2">
                          <span className="w-4 h-[1px] bg-blue-500/50 block"></span>
                          {exp.company}
                        </h4>

                        <ul className="space-y-3 text-slate-300">
                          {exp.points.map((point, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <Terminal className="w-4 h-4 text-blue-500 mt-1 shrink-0 opacity-70" />
                              <span className="text-base text-slate-400 leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="py-32 relative border-t border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950/20 to-transparent pointer-events-none"></div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-20 flex flex-col items-center justify-center gap-4 relative z-10 px-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-mono mb-4 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
               <Shield size={14} /> Skills
             </div>
             <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-4 text-center">
                <span className="text-blue-500 font-mono text-2xl md:text-4xl block md:inline">03.</span> My Arsenal
             </h2>
             <p className="text-slate-400 max-w-2xl text-center text-lg mt-4">
               A constellation of languages, tools, and frameworks I use to engineer modern, scalable and intelligent solutions.
             </p>
          </motion.div>

          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

              {/* Languages - span 7 */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-7 group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[60px] group-hover:bg-blue-500/10 transition-colors duration-500 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3.5 bg-blue-500/10 rounded-xl text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:scale-110 transition-transform duration-300">
                      <Code className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Languages</h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {["Python", "C++", "Java", "JavaScript", "TypeScript", "Golang", "Shell/Bash"].map((skill) => (
                      <span key={skill} className="px-5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-300 font-mono text-sm shadow-sm hover:text-blue-400 hover:border-blue-500/50 hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* AI & ML - span 5 */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }} className="md:col-span-5 group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[60px] group-hover:bg-purple-500/10 transition-colors duration-500 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3.5 bg-purple-500/10 rounded-xl text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)] group-hover:scale-110 transition-transform duration-300">
                      <Cpu className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">AI & Deep Learning</h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {["PyTorch", "TensorFlow", "scikit-learn", "Huggingface", "Pandas", "NumPy", "FastAI"].map((skill) => (
                      <span key={skill} className="px-5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-300 font-mono text-sm shadow-sm hover:text-purple-400 hover:border-purple-500/50 hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Frameworks & Libraries - span 4 */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:col-span-4 group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[60px] group-hover:bg-emerald-500/10 transition-colors duration-500 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3.5 bg-emerald-500/10 rounded-xl text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:scale-110 transition-transform duration-300">
                      <Layers className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white">Frameworks</h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {["Django", "Flask", "React.js", "Next.js", "FastAPI", "TailwindCSS"].map((skill) => (
                      <span key={skill} className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-300 font-mono text-xs lg:text-sm shadow-sm hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-slate-900 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* DBs and Storage - span 4 */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.3 }} className="md:col-span-4 group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-[60px] group-hover:bg-cyan-500/10 transition-colors duration-500 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3.5 bg-cyan-500/10 rounded-xl text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:scale-110 transition-transform duration-300">
                      <Database className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white">Data & DBs</h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {["PostgreSQL", "MongoDB", "Redis", "Vector DBs", "MySQL", "AWS S3"].map((skill) => (
                      <span key={skill} className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-300 font-mono text-xs lg:text-sm shadow-sm hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-900 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* DevOps & Tools - span 4 */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.4 }} className="md:col-span-4 group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 hover:border-orange-500/50 transition-all duration-500 overflow-hidden">
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-500/5 rounded-full blur-[60px] group-hover:bg-orange-500/10 transition-colors duration-500 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3.5 bg-orange-500/10 rounded-xl text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)] group-hover:scale-110 transition-transform duration-300">
                      <Wrench className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white">Tools & Cloud</h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {["Docker", "Git/GitHub", "AWS", "Azure", "Linux", "Celery", "Nginx"].map((skill) => (
                      <span key={skill} className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-300 font-mono text-xs lg:text-sm shadow-sm hover:text-orange-400 hover:border-orange-500/50 hover:bg-slate-900 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        <section id="projects" className="py-32 relative border-t border-white/5">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-20 flex items-center gap-6">
             <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">04. <span className="text-blue-400 font-mono text-2xl md:text-3xl">Things I&apos;ve Built</span></h2>
             <span className="h-[1px] bg-slate-800 flex-grow max-w-sm"></span>
          </motion.div>

          <HorizontalScrollCarousel setActiveProject={setActiveProject} />

          <AnimatePresence>
            {activeProject && (
              <motion.div
                onClick={(e) => {
                  if (e.target === e.currentTarget) setActiveProject(null);
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full max-w-[90vw] lg:max-w-7xl h-auto lg:h-[80vh] overflow-hidden rounded-xl bg-[#09101d] shadow-2xl flex flex-col md:flex-row mt-12"
                >
                  <button
                    onClick={() => setActiveProject(null)}
                    className="absolute top-4 right-4 z-50 text-slate-300 hover:text-white transition-colors cursor-pointer bg-slate-800/50 p-2 rounded-full"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>

                  <div className="w-full md:w-[50%] relative flex items-center justify-center p-8 bg-slate-900 border-r border-[#1e293b] lg:overflow-hidden">
                    {activeProject.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="object-contain w-full h-auto max-h-full rounded-md shadow-lg"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-neutral-700 text-3xl font-bold">
                        {activeProject.title}
                      </div>
                    )}
                  </div>

                  <div className="w-full md:w-[50%] flex flex-col pt-12 pb-10 px-8 lg:px-12 bg-[#09101d] justify-center">
                    <span className="text-blue-400 font-mono text-sm mb-3 block">
                      Featured Project
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight">
                      {activeProject.title}
                    </h2>
                    
                    <div className="bg-transparent border-none p-0 flex-grow text-neutral-300 text-sm md:text-[15px] leading-relaxed tracking-wide">
                      <p className="mb-4 text-slate-300">{activeProject.descriptionFull}</p>
                      {activeProject.points && (
                        <ul className="list-disc list-outside ml-5 space-y-2 text-slate-400 marker:text-blue-500">
                          {activeProject.points.map((point, idx) => (
                            <li key={idx} className="pl-1 leading-snug">{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-[#1e293b]">
                      {activeProject.tags.map((tag: string, i: number) => (
                        <span key={i} className="text-blue-400 font-mono text-[13px] hover:underline cursor-default">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Other Noteworthy Projects Section */}
          <div className="max-w-6xl mx-auto px-4 mt-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-16 flex justify-center">
               <h3 className="text-2xl md:text-3xl font-bold text-center text-white">
                 Other Noteworthy Projects
               </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "ML-Powered Text Analyzer",
                  description: "A machine learning tool that analyzes text sentiment, extracts key information, and categorizes content using NLP techniques.",
                  tags: "Python NLP TensorFlow Flask",
                  icon: "📊"
                },
                {
                  title: "Secure API Gateway",
                  description: "A security-focused API gateway that provides authentication, rate limiting, and intrusion detection for microservices.",
                  tags: "Golang JWT Redis Docker",
                  icon: "⚙️"
                },
                {
                  title: "Linux System Monitor",
                  description: "A lightweight but powerful system monitoring tool for Linux servers with alerting capabilities and historical data analysis.",
                  tags: "Python Bash SQLite Chart.js",
                  icon: "📅"
                }
              ].map((project, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-900 border border-slate-800 p-8 rounded-xl hover:-translate-y-2 transition-transform duration-300 group flex flex-col h-full"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 flex items-center justify-center text-emerald-400 text-2xl bg-emerald-400/10 rounded-sm">
                      {project.icon}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-200 mb-4 group-hover:text-emerald-400 transition-colors">{project.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                    {project.description}
                  </p>
                  <div className="text-slate-300 font-mono text-xs tracking-wide space-x-3">
                    {project.tags}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <a href="https://github.com/spignelon" target="_blank" rel="noreferrer" className="px-6 py-3 border border-slate-700 text-emerald-400 hover:bg-slate-800 font-mono text-sm rounded bg-slate-900 transition-colors group flex items-center gap-2">
                View More on GitHub <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </section>

        <section id="achievements" className="py-32 relative border-t border-white/5">
          <div className="absolute inset-0 bg-slate-950/20"></div>
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-20 flex items-center justify-start gap-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-4">
                  <span className="text-blue-500 font-mono text-2xl md:text-4xl">05.</span> My Achievements
              </h2>
              <span className="h-[1px] bg-slate-800 flex-grow max-w-[200px]"></span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* LeetCode */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-400 opacity-50"></div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-yellow-500 text-xl">⚡</span> LeetCode Status
                </h3>
                <div className="space-y-4 text-slate-400 text-[15px] leading-relaxed">
                  <p>Rated <span className="text-emerald-400 font-mono">1753</span> on LeetCode, placing in the <span className="text-emerald-400 font-bold">Top 9.67%</span> globally, demonstrating strong problem-solving and algorithmic thinking.</p>
                  <p>Consistently performed well in timed contests, reflecting my ability to think under pressure &mdash; a skill crucial for coding interviews and competitive programming.</p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-800">
                  <a href="https://leetcode.com/u/spignelon/" className="inline-flex items-center text-sm font-mono text-blue-400 hover:text-blue-300 transition-colors">
                    View LeetCode Profile <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </a>
                </div>
              </motion.div>

              {/* Quine */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-400 opacity-50"></div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-blue-400 text-xl flex items-center justify-center bg-blue-500/20 w-8 h-8 rounded-full">🧑‍💻</span> Quine DevRank
                </h3>
                <div className="space-y-4 text-slate-400 text-[15px] leading-relaxed">
                  <p>Global <span className="text-blue-400 font-bold">Top 10%</span> on Quine DevRank &mdash; Ranked among the top developers worldwide based on overall contributions, code quality, and developer activity.</p>
                  <p>Recognized for writing clean, efficient, and maintainable code, reflecting strong software engineering principles and best practices.</p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-800">
                  <a href="https://quine.sh/user/spignelon" className="inline-flex items-center text-sm font-mono text-blue-400 hover:text-blue-300 transition-colors">
                    View Quine Profile <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </a>
                </div>
              </motion.div>

              {/* Hackathons */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-50"></div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-emerald-400 text-xl">🏆</span> Hackathon & Competition Wins
                </h3>
                <ul className="space-y-3 text-slate-400 text-sm leading-relaxed">
                  <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">&bull;</span> <span><strong className="text-emerald-400">1st runner-up</strong> at Amazon Sambhav 2024 (National Level)</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">&bull;</span> <span><strong className="text-emerald-400">Winner</strong> at International Intel X Red Hat AI Hackathon (International)</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">&bull;</span> <span><strong className="text-emerald-400">1st Rank</strong> in Intel Gen AI Hackathon at IIT Delhi (Premier Institution)</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">&bull;</span> <span><strong className="text-emerald-400">P.S. Winner</strong> in CodeUtsav 8.0 at NIT Raipur</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">&bull;</span> <span><strong className="text-emerald-400">2nd Rank</strong> in hackEDCode 2.0 at GGSIPU (University Level)</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">&bull;</span> <span><strong className="text-emerald-400">3rd Rank</strong> in HackDUCS at Delhi University (Hackathon)</span></li>
                </ul>
              </motion.div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-slate-900/60 flex flex-col items-center justify-center p-8 rounded-3xl border border-slate-800"
              >
                <div className="text-4xl font-bold text-emerald-400 mb-2">7+</div>
                <div className="text-slate-400 font-mono text-sm uppercase tracking-wider">Hackathons Won</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-slate-900/60 flex flex-col items-center justify-center p-8 rounded-3xl border border-slate-800"
              >
                <div className="text-4xl font-bold text-emerald-400 mb-2">1753</div>
                <div className="text-slate-400 font-mono text-sm uppercase tracking-wider">LeetCode Rating</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-slate-900/60 flex flex-col items-center justify-center p-8 rounded-3xl border border-slate-800"
              >
                <div className="text-4xl font-bold text-emerald-400 mb-2">Top 10%</div>
                <div className="text-slate-400 font-mono text-sm uppercase tracking-wider">Global DevRank</div>
              </motion.div>
            </div>

          </div>
        </section>

        <section id="contact" className="py-32 border-t border-white/5 relative">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-12 flex items-center justify-start gap-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-4">
                  <span className="text-emerald-400 font-mono text-2xl md:text-3xl">06.</span> Get In Touch
              </h2>
              <span className="h-[1px] bg-slate-800 flex-grow max-w-[200px]"></span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-slate-400 text-center text-lg leading-relaxed mb-16 mx-auto max-w-2xl"
            >
              I'm always open to interesting conversations, collaborations, and side projects. Whether you have a question, a project idea, or just want to say hello &mdash; feel free to reach out!
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {[
                { icon: "📧", title: "Email", text: "Mail me", href: "mailto:ujjawalsaini47@gmail.com" },
                { icon: "🔗", title: "LinkedIn", text: "linkedin.com/in/spignelon", href: "https://www.linkedin.com/in/spignelon" },
                { icon: "𝕏", title: "Twitter", text: "@spignelon", href: "https://twitter.com/spignelon" }
              ].map((contact, i) => (
                <motion.a 
                  key={i} href={contact.href} target="_blank" rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-[#0F172A] border border-transparent p-8 rounded-xl flex flex-col items-center hover:-translate-y-2 hover:border-slate-800 transition-all duration-300"
                >
                  <div className="text-emerald-400 text-4xl mb-4">{contact.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{contact.title}</h3>
                  <p className="text-slate-400 text-sm font-mono text-center">{contact.text}</p>
                </motion.a>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center">
             <h3 className="text-2xl font-bold text-white mb-8">Send Me a Message</h3>
             <form action="https://formsubmit.co/ujjawalsaini47@gmail.com" method="POST" className="w-full space-y-6" suppressHydrationWarning>
               <input type="hidden" name="_captcha" value="false" />
               <input type="hidden" name="_next" value="https://ujjawalsaini.com" />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className="text-slate-400 font-mono text-sm">Name</label>
                    <input name="name" id="name" required suppressHydrationWarning type="text" placeholder="Your Name" className="bg-[#0F172A] border border-[#1E293B] rounded-md px-4 py-3 text-slate-300 focus:outline-none focus:border-emerald-500 transition-colors" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-slate-400 font-mono text-sm">Email</label>
                    <input name="email" id="email" required suppressHydrationWarning type="email" placeholder="Your Email" className="bg-[#0F172A] border border-[#1E293B] rounded-md px-4 py-3 text-slate-300 focus:outline-none focus:border-emerald-500 transition-colors" />
                  </div>
               </div>
               <div className="flex flex-col space-y-2">
                 <label htmlFor="subject" className="text-slate-400 font-mono text-sm">Subject</label>
                 <input name="_subject" id="subject" required suppressHydrationWarning type="text" placeholder="Subject" className="bg-[#0F172A] border border-[#1E293B] rounded-md px-4 py-3 text-slate-300 focus:outline-none focus:border-emerald-500 transition-colors" />
               </div>
               <div className="flex flex-col space-y-2">
                 <label htmlFor="message" className="text-slate-400 font-mono text-sm">Message</label>
                 <textarea name="message" id="message" required suppressHydrationWarning rows={5} placeholder="Your Message" className="bg-[#0F172A] border border-[#1E293B] rounded-md px-4 py-3 text-slate-300 focus:outline-none focus:border-emerald-500 transition-colors resize-none"></textarea>
               </div>
               <div className="text-center pt-4">
                 <button suppressHydrationWarning type="submit" className="px-8 py-3 border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-[#09101d] font-mono rounded transition-colors">
                   Send Message
                 </button>
               </div>
             </form>
          </motion.div>

            <div className="mt-24 flex justify-center gap-6 text-slate-400 text-xl">
              <a href="https://github.com/spignelon" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors"><FaGithub /></a>
              <a href="https://linkedin.com/in/spignelon" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors"><FaLinkedin /></a>
              <a href="https://twitter.com/spignelon" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors"><FaTwitter /></a>
              <a href="mailto:ujjawalsaini47@gmail.com" className="hover:text-emerald-400 transition-colors"><Mail size={20} /></a>
              <a href="https://t.me/spignelon" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors"><FaTelegram /></a>
            </div>

          </div>
        </section>

        <footer className="relative border-t border-white/10 bg-slate-950 pt-20 pb-12 overflow-hidden">
          {/* Awesome Background Effects */}
          <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] opacity-20 pointer-events-none">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 blur-[100px] rounded-full mix-blend-screen"></div>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-[500px] bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none z-0"></div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
              <div className="md:col-span-5 lg:col-span-6 pr-4">
                <h3 className="text-2xl font-bold text-white mb-6 inline-block">
                  Ujjawal Saini
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-8">
                  A versatile developer and hacker proficient in Artificial Intelligence, Full Stack Web Development, Machine Learning, Deep Learning, and Cyber Security. Shaping ideas into elegant digital experiences.
                </p>
                <div className="flex items-center gap-5 text-slate-400">
                  <a href="https://github.com/spignelon" target="_blank" rel="noreferrer" className="p-2 lg:p-3 rounded-xl bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300"><FaGithub size={20} /></a>
                  <a href="https://linkedin.com/in/spignelon" target="_blank" rel="noreferrer" className="p-2 lg:p-3 rounded-xl bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300"><FaLinkedin size={20} /></a>
                  <a href="https://twitter.com/spignelon" target="_blank" rel="noreferrer" className="p-2 lg:p-3 rounded-xl bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300"><FaTwitter size={20} /></a>
                  <a href="mailto:ujjawalsaini47@gmail.com" className="p-2 lg:p-3 rounded-xl bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300"><Mail size={20} /></a>
                  <a href="https://t.me/spignelon" target="_blank" rel="noreferrer" className="p-2 lg:p-3 rounded-xl bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300"><FaTelegram size={20} /></a>
                </div>
              </div>

              <div className="md:col-span-4 lg:col-span-3">
                <h4 className="text-white font-bold text-lg mb-6 tracking-wide relative inline-block">
                  Quick Links
                  <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></span>
                </h4>
                <div className="flex flex-col gap-3">
                  {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Achievements', 'Contact'].map((item) => (
                     <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-400 hover:text-blue-400 text-sm font-mono flex items-center group w-fit transition-all duration-300">
                       <span className="h-px w-0 bg-blue-400 mr-0 group-hover:w-4 group-hover:mr-3 transition-all duration-300 ease-out"></span>
                       {item}
                     </a>
                  ))}
                </div>
              </div>

              <div className="md:col-span-3 lg:col-span-3">
                <h4 className="text-white font-bold text-lg mb-6 tracking-wide relative inline-block">
                  External Links
                  <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></span>
                </h4>
                <div className="flex flex-col gap-3">
                  {[
                    { name: 'GitHub', link: 'https://github.com/spignelon' },
                    { name: 'LinkedIn', link: 'https://linkedin.com/in/spignelon' },
                    { name: 'Quine', link: 'https://quine.sh/user/spignelon' },
                    { name: 'Blog', link: '#' },
                    { name: 'Telegram', link: 'https://t.me/spignelon' }
                  ].map((ext) => (
                    <a key={ext.name} href={ext.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-emerald-400 text-sm font-mono flex items-center gap-2 group w-fit transition-all duration-300">
                      {ext.name}
                      <svg className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Back to top button */}
            <div className="flex justify-center mb-12 relative z-20">
              <a href="#hero" className="p-4 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:-translate-y-2 transition-all duration-300 animate-bounce">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
              </a>
            </div>

            {/* Copyright Section */}
            <div className="text-center space-y-4 pt-8 border-t border-slate-800/50">
              <p className="text-slate-300 text-sm font-mono">
                Built with <span className="text-red-500 animate-pulse inline-block">❤</span> by <span className="font-semibold text-white">Ujjawal Saini</span>
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-slate-500 text-xs font-mono">
                <p>&copy; {new Date().getFullYear()} Ujjawal Saini. All rights reserved.</p>
                <span className="hidden md:inline text-slate-700">|</span>
                <div className="flex gap-4">
                  <a href="/resume.pdf" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">Resume</a>
                  <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}


