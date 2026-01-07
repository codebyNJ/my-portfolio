import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

// Notion-style header component for blog posts
export function BlogHeader() {
  const portfolioUrl = process.env.NODE_ENV === 'production'
    ? 'https://nijeeshnj.tech'
    : 'http://localhost:3001';

  return (
    <header className="border-b border-[#2f2f2f] sticky top-0 bg-[#191919]/80 backdrop-blur-md z-50">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 bg-linear-to-br from-[#ff6b6b] to-[#feca57] rounded flex items-center justify-center text-xs font-bold">
            N
          </div>
          <span className="text-white/80 font-medium text-sm">Nijeesh's Blog</span>
        </Link>
        <a 
          href={portfolioUrl}
          className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          Portfolio
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
}

// Back to home link
export function BackLink() {
  return (
    <Link href="/" className="back-link">
      <ArrowLeft className="w-4 h-4" />
      Back to All Posts
    </Link>
  );
}

// Blog post metadata display
interface BlogMetaProps {
  date: string;
  category: string;
  readTime?: string;
}

export function BlogMeta({ date, category, readTime }: BlogMetaProps) {
  return (
    <div className="blog-meta">
      <span>{date}</span>
      <span>•</span>
      <span>{category}</span>
      {readTime && (
        <>
          <span>•</span>
          <span>{readTime}</span>
        </>
      )}
    </div>
  );
}
