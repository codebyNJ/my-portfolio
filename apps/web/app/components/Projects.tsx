'use client';

import { useState } from 'react';
import { X, ExternalLink, Github, Star, FileText, Gamepad2 } from 'lucide-react';
import Image from 'next/image';
import StackIcon from 'tech-stack-icons';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: Array<{ name: string; icon?: string }>;
  githubUrl: string;
  liveUrl?: string;
  stars?: number;
  highlights?: string[];
  tag?: {
    label: string;
    color: string;
    icon?: 'documenting' | 'hobby';
  };
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'ferbile-seizure',
      title: 'Ferbile Seizure',
      description: 'AI-powered seizure detection and monitoring system',
      longDescription: 'An innovative AI-powered healthcare system designed for early detection and monitoring of febrile seizures in children. This project leverages advanced machine learning algorithms and real-time data analysis to identify seizure patterns and provide early warnings for timely medical intervention. The system aims to reduce response time and improve patient outcomes by enabling healthcare providers and caregivers to act quickly during critical moments.',
      image: '/project-thumb/febrile-thumb.png',
      techStack: [
        { name: 'Python', icon: 'python' },
        { name: 'TensorFlow' },
        { name: 'AI/ML' },
        { name: 'Healthcare' }
      ],
      githubUrl: 'https://github.com/codebyNJ/Ferbile-Seziure',
      tag: {
        label: 'Still Documenting',
        color: 'bg-amber-600/80 text-white border-amber-500 backdrop-blur-sm shadow-lg',
        icon: 'documenting',
      },
      highlights: [
        'AI-powered seizure pattern detection using deep learning models',
        'Real-time monitoring capabilities with IoT sensor integration',
        'Healthcare-focused machine learning implementation with clinical accuracy',
        'Emergency alert system for caregivers and medical professionals',
        'Data visualization dashboard for tracking patient history'
      ]
    },
    {
      id: 'aruvi',
      title: 'Aruvi',
      description: 'AI-powered tool to protect Indian heritage',
      longDescription: 'Aruvi is a pioneering AI-powered application dedicated to protecting and preserving India\'s rich cultural heritage. The system uses state-of-the-art machine learning and computer vision technologies to identify, catalog, and monitor heritage sites and artifacts. It helps detect potential threats, track deterioration, and provide actionable insights for conservation efforts. The platform aims to bridge technology and culture, ensuring that future generations can experience India\'s invaluable heritage.',
      image: '/project-thumb/aruvi-thumb.png',
      techStack: [
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'AI/ML' },
        { name: 'Computer Vision' },
        { name: 'Next.js', icon: 'nextjs2' }
      ],
      githubUrl: 'https://github.com/codebyNJ/Aruvi',
      liveUrl: 'https://aruvi.vercel.app/',
      highlights: [
        'Heritage site identification and classification using computer vision',
        'AI-powered damage detection and monitoring system',
        'Comprehensive cultural preservation database with historical context',
        'Real-time threat assessment and alert mechanisms',
        'Interactive map interface for exploring heritage sites'
      ]
    },
    {
      id: 'multi-judge-ai',
      title: 'Enhanced Multi-Judge AI System',
      description: 'Multi-agent AI system for robust decision making',
      longDescription: 'A sophisticated multi-agent AI system that revolutionizes decision-making by employing multiple AI judges working in consensus. This system is designed to eliminate bias and provide robust, fair evaluations by leveraging different AI models with diverse training backgrounds. Each judge independently analyzes the input, and the system synthesizes their opinions to reach a balanced conclusion. Perfect for applications requiring high-stakes decision-making, content moderation, or objective evaluations.',
      image: '/project-thumb/multijudge-thumb.png',
      techStack: [
        { name: 'Python', icon: 'python' },
        { name: 'Multi-Agent AI' },
        { name: 'LLM' },
        { name: 'Decision Systems' }
      ],
      githubUrl: 'https://github.com/codebyNJ/Enhanced-Multi-Judge-AI-System',
      highlights: [
        'Multi-agent architecture with independent AI judges for unbiased decisions',
        'Consensus-based evaluation system with weighted voting mechanisms',
        'Integration with multiple LLM backends (GPT, Claude, Gemini)',
        'Real-time decision explanation and transparency dashboard',
        'Scalable architecture supporting custom judge configurations'
      ]
    },
    {
      id: 'offyai',
      title: 'OffyAI',
      description: 'Efficient on-device offline AI model inference',
      longDescription: 'OffyAI is a groundbreaking mobile application that brings powerful AI capabilities directly to your Android device without requiring internet connectivity. Built with MediaPipe and optimized model screening, it enables privacy-focused AI inference that keeps all your data on-device. The app is perfect for users who need AI assistance in areas with poor connectivity or who prioritize data privacy. From image recognition to natural language processing, OffyAI makes advanced AI accessible anytime, anywhere.',
      image: '/project-thumb/offyai-thumb.png',
      techStack: [
        { name: 'Kotlin', icon: 'kotlin' },
        { name: 'MediaPipe' },
        { name: 'Android', icon: 'android' },
        { name: 'AI' }
      ],
      githubUrl: 'https://github.com/codebyNJ/offyai',
      liveUrl: 'https://offyai.netlify.app/',
      stars: 3,
      highlights: [
        'Complete on-device AI inference with zero network dependency',
        'Optimized model screening for mobile performance and battery efficiency',
        'Built with Kotlin and MediaPipe for native Android experience',
        'Privacy-first architecture with no data leaving the device',
        'Support for multiple AI tasks: image classification, object detection, NLP'
      ]
    },
    {
      id: 'voiceai',
      title: 'VoiceAI',
      description: 'Voice-powered AI assistant for Raspberry Pi',
      longDescription: 'VoiceAI transforms your Raspberry Pi 4 into an intelligent voice-powered assistant with a beautiful CustomTkinter GUI. This project integrates Google\'s Gemini API for accurate voice transcription and refinement, while using txtai and TinyLlama for intelligent question answering from your document collections. Perfect for creating a personal knowledge assistant that can answer questions about your notes, research papers, or any text-based content using natural voice commands.',
      image: '/project-thumb/voiceai-thumb.png',
      techStack: [
        { name: 'Python', icon: 'python' },
        { name: 'Raspberry Pi'},
        { name: 'Gemini API' },
        { name: 'TinyLlama' }
      ],
      githubUrl: 'https://github.com/codebyNJ/voiceai',
      stars: 3,
      highlights: [
        'Voice-powered interface with Gemini API for accurate transcription',
        'Document Q&A using txtai semantic search and TinyLlama',
        'Custom GUI built with Tkinter optimized for Raspberry Pi displays',
        'Offline document indexing for fast retrieval',
        'Wake word detection and natural conversation flow'
      ]
    },
    {
      id: 'devme',
      title: 'DevMe',
      description: 'Chrome Extension for Developer Productivity',
      longDescription: 'DevMe is your all-in-one Chrome Extension designed to supercharge developer productivity. It intelligently aggregates your LeetCode scores, manages your to-do lists, tracks GitHub activity, and organizes important development links in a sleek, accessible interface. Stop context-switching between multiple tabs and platforms—DevMe brings everything you need into one convenient dashboard. Whether you\'re grinding LeetCode problems, managing project tasks, or monitoring your GitHub contributions, DevMe keeps you focused and organized.',
      image: '/project-thumb/devme-thumb.png',
      techStack: [
        { name: 'JavaScript', icon: 'js' },
        { name: 'Chrome Extension' }
      ],
      githubUrl: 'https://github.com/codebyNJ/DevMe',
      stars: 1,
      tag: {
        label: 'Hobby Project',
        color: 'bg-purple-600/80 text-white border-purple-500 backdrop-blur-sm shadow-lg',
        icon: 'hobby',
      },
      highlights: [
        'Automatic LeetCode score tracking and progress visualization',
        'Real-time GitHub activity monitoring with contribution graphs',
        'Built-in todo list with priority management and deadlines',
        'Quick link management for frequently visited dev resources',
        'Clean, distraction-free interface designed for developers'
      ]
    },
  ];

  return (
    <>
      <section className="mb-32">
        <h2 className="section-heading">
          Proof of Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer border border-[#222] hover:border-[#444] bg-[#111] hover:bg-[#161616] transition-all overflow-hidden"
            >
              <div className="relative w-full h-48 bg-[#0a0a0a] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
                {/* Project Tag */}
                {project.tag && (
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 border font-semibold uppercase tracking-wider ${project.tag.color}`}>
                      {project.tag.icon === 'documenting' && <FileText className="w-3 h-3" />}
                      {project.tag.icon === 'hobby' && <Gamepad2 className="w-3 h-3" />}
                      {project.tag.label}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">
                    {project.title}
                  </h3>
                  {project.stars && (
                    <div className="flex items-center gap-1 text-white/40">
                      <Star className="w-4 h-4" />
                      <span className="text-[11px] font-semibold">{project.stars}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 items-center">
                  {project.techStack.slice(0, 4).map((tech, idx) => (
                    <div
                      key={`${project.id}-${tech.name}-${idx}`}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0a0a0a] border border-[#222] rounded"
                    >
                      {tech.icon && (
                        <div className="w-4 h-4">
                          <StackIcon name={tech.icon as any} />
                        </div>
                      )}
                      <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[10px] px-2 py-1 text-white/40 font-semibold">
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#0a0a0a] border border-[#222] max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#0a0a0a] border-b border-[#222] p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-[#161616] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            <div className="p-6">
              <div className="relative w-full h-64 bg-[#111] mb-6 overflow-hidden">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover object-center"
                />
              </div>

              <p className="text-base text-white/70 leading-relaxed mb-6">
                {selectedProject.longDescription}
              </p>

              {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm uppercase tracking-wider text-white/40 font-semibold mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-white/60 leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-white/30"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wider text-white/40 font-semibold mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.techStack.map((tech, idx) => (
                    <div
                      key={`${selectedProject.id}-modal-${tech.name}-${idx}`}
                      className="flex items-center gap-2 px-3 py-2 bg-[#111] border border-[#222] rounded"
                    >
                      {tech.icon && (
                        <div className="w-5 h-5">
                          <StackIcon name={tech.icon as any} />
                        </div>
                      )}
                      <span className="text-[11px] text-white/70 font-semibold uppercase tracking-wider">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold hover:bg-white/90 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 border border-[#222] text-white hover:bg-[#111] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
