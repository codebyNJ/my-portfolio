import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getAllPosts } from '../lib/blog';

export default function BlogHomePage() {
  const portfolioUrl = process.env.NODE_ENV === 'production'
    ? 'https://nijeeshnj.tech'
    : 'http://localhost:3001';

  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[var(--bg-main)]">
      {/* Header */}
      <header className="border-b border-[var(--border-color)]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-[var(--text-primary)] font-medium">blog.nijeesh</span>
          </Link>
          <a 
            href={portfolioUrl}
            className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            Portfolio
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <h1 className="text-4xl md:text-5xl font-semibold serif-italic text-[var(--text-primary)] mb-4 leading-tight">
          Thoughts & Writings
        </h1>
        <p className="text-lg text-[var(--text-muted)] max-w-xl leading-relaxed">
          Technical deep-dives, life reflections, and lessons learned along the way.
        </p>
      </div>

      {/* Posts List */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="space-y-0">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="group block"
            >
              <div className="py-6 border-b border-[var(--border-color)] hover:bg-[var(--bg-card)] transition-colors -mx-4 px-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-[var(--text-muted)]">
                    {post.date}
                  </span>
                  <span className="text-[var(--text-muted)]">·</span>
                  <span className="text-xs text-[var(--text-muted)]">
                    {post.category}
                  </span>
                  {post.readTime && (
                    <>
                      <span className="text-[var(--text-muted)]">·</span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {post.readTime}
                      </span>
                    </>
                  )}
                </div>
                <h2 className="text-xl font-medium text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-[15px] text-[var(--text-muted)] leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)]">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-[var(--text-muted)]">© 2026 Nijeesh NJ</span>
            <div className="flex items-center gap-6">
              <a href="https://github.com/codebyNJ" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/in/nijeesh-nj" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
                LinkedIn
              </a>
              <a href={portfolioUrl} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
