export default function Blogs() {
  // For development, use localhost. For production, use subdomain
  // blogs runs on port 3000, portfolio on port 3001
  const blogBaseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://blogs.nijeeshnj.tech'
    : 'http://localhost:3000';
  
  const posts = [
    {
      title: 'The Art of Staying Grounded in Tech',
      date: "JAN '26",
      category: 'Life & Philosophy',
      slug: 'staying-grounded-in-tech',
      excerpt: 'In a field that moves fast, here\'s how I stay grounded without losing momentum.'
    },
    {
      title: 'All You Need Is a Step',
      date: "JAN '26",
      category: 'Life & Growth',
      slug: 'all-you-need-is-a-step',
      excerpt: 'Sometimes the biggest enemy isn\'t external—it\'s FOMO. Here\'s how taking just one step can transform everything.'
    },
    {
      title: 'Never Know',
      date: "JAN '26",
      category: 'Philosophy & Dreams',
      slug: 'never-know',
      excerpt: 'My aim isn\'t to show off—it\'s to find every possible way to turn effort into wealth, freedom, and joy.'
    },
    {
      title: 'Building Aruvi: AI for Heritage Preservation',
      date: "JAN '26",
      category: 'AI & Projects',
      slug: 'building-aruvi',
      excerpt: 'How I built an AI-powered system to protect India\'s cultural heritage using computer vision.'
    },
    {
      title: 'OffyAI: Bringing AI Offline',
      date: "JAN '26",
      category: 'AI & Projects',
      slug: 'offyai-bringing-ai-offline',
      excerpt: 'Why I built an on-device AI system for Android and what I learned about privacy-first AI.'
    },
    {
      title: 'Multi-Judge AI: Consensus Over Bias',
      date: "JAN '26",
      category: 'AI & Projects',
      slug: 'multi-judge-ai-consensus',
      excerpt: 'Why one AI opinion isn\'t enough and how multi-agent systems create fairer decisions.'
    },
  ];

  return (
    <section className="mb-32">
      <h2 className="section-heading">
        Thoughts
      </h2>
      <div className="space-y-3">
        {posts.map((post) => (
          <a
            key={post.title}
            href={`${blogBaseUrl}/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block group p-6 border border-[#222] hover:border-[#444] bg-[#111] hover:bg-[#161616] transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors">
                {post.title}
              </h3>
              <span className="text-[11px] text-white/30 font-semibold uppercase tracking-widest shrink-0 ml-4">
                {post.date}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] px-2 py-1 bg-[#0a0a0a] border border-[#222] text-white/50 font-semibold uppercase tracking-wider">
                {post.category}
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              {post.excerpt}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
