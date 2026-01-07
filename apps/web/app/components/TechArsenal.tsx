'use client';

import React from 'react';
import StackIcon from 'tech-stack-icons';

export default function TechArsenal() {
  const technologies = [
    { name: 'Python', icon: 'python' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'PyTorch', icon: 'pytorch' },
    { name: 'tailwindcss', icon: 'tailwindcss' },
    { name: 'Firebase', icon: 'firebase' },
    { name: 'React', icon: 'react' },
    { name: 'Next.js', icon: 'nextjs2' },
    { name: 'Flask', icon: 'flask' },
    { name: 'LangChain', icon: 'langchain' },
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'Redis', icon: 'redis' },
    { name: 'MongoDB', icon: 'mongodb' },
    { name: 'Hugging Face', icon: 'huggingface' },
    { name: 'Docker', icon: 'docker' },
    { name: 'Prisma', icon: 'prisma' },
    { name: 'Git', icon: 'git' },
  ];

  return (
    <section className="mb-32">
      <h2 className="section-heading">
        Stack I Use
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {technologies.map((tech) => {
          return (
            <div
              key={tech.name}
              className="flex flex-col items-center justify-center p-4 md:p-6 bg-[#111] border border-[#222] hover:border-[#444] hover:bg-[#161616] transition-all group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 mb-3 transition-all">
                <StackIcon name={tech.icon as any} />
              </div>
              <span className="text-[10px] md:text-[11px] font-semibold text-white/60 group-hover:text-white/80 text-center uppercase tracking-wider transition-colors">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
