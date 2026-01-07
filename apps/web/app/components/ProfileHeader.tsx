import { MapPin, Terminal, Cpu, Leaf } from 'lucide-react';

export default function ProfileHeader() {
  return (
    <header className="mb-24 text-left">
      <div className="inline-block relative group mb-12">
        <div className="w-36 h-36 bg-[#111] border border-[#222] p-1 shadow-2xl overflow-hidden sharp">
          <img 
            src="/profile.jpeg" 
            alt="Profile" 
            className="w-full h-full object-cover sharp transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-black border border-[#222] p-2 sharp">
          <Leaf className="w-4 h-4 text-white/60" />
        </div>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-white">
        <span className="serif-italic italic font-normal text-white/90">Nijeesh NJ</span>
      </h1>
      
      <p className="text-xl text-white/60 leading-relaxed mb-12 max-w-2xl">
        3rd Year CS Undergrad. A young technology and programming enthusiast. Curious enough to explore a lot in the world of technology and AI. I love to work with young startups and their journey towards AI. Worked on a few{" "}
        <span className="text-white font-semibold text-2xl">Agentic AI</span> and{" "}
        <span className="font-semibold text-white text-2xl">Generative AI projects.</span>.
      </p>

      <div className="flex flex-wrap gap-10 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/40">
        <span className="flex items-center gap-2">
          <MapPin className="w-4 h-4" /> Bengaluru, India
        </span>
        <span className="flex items-center gap-2">
          <Terminal className="w-4 h-4" /> Just Curiosity towards AI
        </span>
      </div>
    </header>
  );
}
