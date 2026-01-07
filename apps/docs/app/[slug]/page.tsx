import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getPostBySlug, getAllPostSlugs } from '../../lib/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    const post = await getPostBySlug(slug);
    
    const portfolioUrl = process.env.NODE_ENV === 'production'
      ? 'https://nijeeshnj.tech'
      : 'http://localhost:3001';

    return (
      <div className="min-h-screen bg-[var(--bg-main)]">
        {/* Header */}
        <header className="border-b border-[var(--border-color)]">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Blog</span>
            </Link>
            <a 
              href={portfolioUrl}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              Portfolio
            </a>
          </div>
        </header>

        {/* Header Image */}
        {post.headerImage && (
          <div className="w-full h-64 md:h-80 bg-[var(--bg-card)] overflow-hidden">
            <img 
              src={post.headerImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article */}
        <article className="max-w-3xl mx-auto px-6 py-12">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-[var(--text-muted)]">
              {post.date}
            </span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="text-sm text-[var(--text-muted)]">
              {post.category}
            </span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="text-sm text-[var(--text-muted)]">
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Content */}
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Footer */}
        <footer className="border-t border-[var(--border-color)]">
          <div className="max-w-3xl mx-auto px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link 
                href="/" 
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
              >
                ← Back to all posts
              </Link>
              <div className="flex items-center gap-6">
                <a href="https://github.com/codebyNJ" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/nijeesh-nj" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  } catch {
    notFound();
  }
}
