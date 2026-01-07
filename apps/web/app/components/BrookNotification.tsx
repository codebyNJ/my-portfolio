'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function BrookNotification() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="absolute top-8 right-8 z-10">
      {/* Desktop: Always show full notification */}
      <div className="hidden md:flex items-center gap-3 bg-black/70 border border-white/10 px-4 py-2 sharp backdrop-blur-md">
        <img
          src="/logo/brook_logo.png"
          alt="Brook Logo"
          className="w-6 h-6 object-contain"
        />
        <div className="flex flex-col">
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">
            Building
          </span>
          <span className="text-[11px] text-white/90 font-semibold tracking-wide">
            Brook — India's 1st Crowd Sandbox
          </span>
          <span className="text-[9px] text-white/40 tracking-wider">
            Test your ideas with the crowd
          </span>
        </div>
      </div>

      {/* Mobile: Collapsible notification */}
      <div className="md:hidden">
        <button
          onClick={() => setExpanded(!expanded)}
          className={`flex items-center gap-2 bg-black/70 border border-white/10 backdrop-blur-md transition-all duration-300 ${
            expanded ? 'px-4 py-3 sharp' : 'p-2 sharp'
          }`}
          aria-label="Toggle Brook notification"
        >
          <img
            src="/logo/brook_logo.svg"
            alt="Brook Logo"
            className="w-6 h-6 object-contain"
          />
          {expanded && (
            <div className="flex flex-col text-left animate-in fade-in slide-in-from-left-2 duration-200">
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">
                Building
              </span>
              <span className="text-[11px] text-white/90 font-semibold tracking-wide">
                Brook — India's 1st Crowd Sandbox
              </span>
              <span className="text-[9px] text-white/40 tracking-wider">
                Test your ideas with the crowd
              </span>
            </div>
          )}
          {!expanded && (
            <ChevronRight className="w-3 h-3 text-white/50" />
          )}
        </button>
      </div>
    </div>
  );
}
