import LogoImage from './LogoImage';

export default function Experience() {
  const experiences = [
    {
      title: 'AI Engineer + Full Stack Intern',
      company: 'Ankor',
      logo: '/logo/ankor_us_logo.jpg',
      period: 'December 2025 — PRESENT',
      location: 'India (Remote)',
      description: 'Currently working on AI-powered full-stack solutions, combining machine learning with modern web technologies.',
      isActive: true,
    },
    {
      title: 'AI Engineer Intern',
      company: 'Tech Mahindra – INDUS Project',
      logo: '/logo/tech_mahindra_logo.jpg',
      period: 'October 2025 — December 2025',
      location: 'Bangalore, India (Hybrid)',
      description: 'Developed enterprise-grade NLP pipeline for OCR, QnA generation, data cleaning, and document intelligence. Built scalable ingestion system improving document processing speed across internal teams.',
      highlights: [
        'Integrated AI workflows into internal tools, reducing manual effort by 60%',
        'Implemented machine learning pipelines and LLM integration for business process automation',
        'Collaborated with cross-functional teams to design scalable AI systems and REST APIs'
      ],
      isActive: false,
    },
    {
      title: 'AIML Intern',
      company: 'Skill First Labs',
      logo: '/logo/skill_first_labs_logo.jpg',
      period: 'September 2024 — August 2025',
      location: 'Chennai, India (Onsite)',
      description: 'Built resume-analysis and job-match scoring engine using embeddings and semantic similarity. Developed automation scripts for skill extraction, job pattern mining, and report generation.',
      highlights: [
        'Improved scoring accuracy and reduced HR processing time by implementing LLM-based pipelines',
        'Conducted comparative analysis of ML models and development tools, delivering technical documentation'
      ],
      isActive: false,
    },
  ];

  return (
    <section className="mb-32">
      <h2 className="section-heading">
        Professional Experience
      </h2>
      <div className="space-y-10">
        {experiences.map((exp) => (
          <div key={exp.title + exp.company} className="group border-l-2 border-[#222] pl-8 relative">
            <div 
              className={`absolute -left-1.25 top-0 w-2 h-2 sharp ${
                exp.isActive ? 'bg-white' : 'bg-[#333]'
              }`}
            />
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                <h3 className="text-lg md:text-2xl font-bold text-white">{exp.title}</h3>
                <span className="text-xs md:text-[11px] text-white/40 font-semibold uppercase tracking-widest">
                  {exp.period}
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <div className="flex items-center gap-3">
                  {exp.logo && (
                    <LogoImage
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-sm bg-[#0b0b0b] p-1"
                    />
                  )}
                  <p className="text-white/50 text-xs md:text-sm font-semibold uppercase tracking-[0.15em]">
                    {exp.company}
                  </p>
                </div>
                <span className="text-[11px] text-white/30 uppercase tracking-wider">
                  {exp.location}
                </span>
              </div>
            </div>
            <p className="text-sm md:text-base text-white/60 leading-relaxed mb-3">
              {exp.description}
            </p>
            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="space-y-2 mt-4">
                {exp.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-sm md:text-sm text-white/50 leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-white/30">
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
