import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/codebyNJ', icon: Github },
    { label: 'Twitter', href: 'https://x.com/nijeeshnj', icon: Twitter },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nijeesh-nj-062468285', icon: Linkedin },
    { label: 'Mail', href: 'mailto:nijeesh10th@gmail.com', icon: Mail },
  ];

  return (
    <footer className="pt-20 border-t border-[#222]">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
        <div>
          <h4 className="text-5xl serif-italic italic mb-4 text-white">NJ</h4>
          <p className="text-[11px] text-white/30 uppercase font-semibold tracking-[0.4em]">
            Building from zero
          </p>
        </div>
        
        <div>
          <h5 className="section-heading mb-6">Let&apos;s Connect</h5>
          <div className="flex gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-10 h-10 flex items-center justify-center border border-[#222] hover:border-[#444] hover:bg-[#111] transition-all"
                  aria-label={link.label}
                >
                  <Icon className="w-4 h-4 text-white/60" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="text-center py-8 border-t border-[#222]">
        <p className="text-[11px] text-white/30 uppercase tracking-widest">
          © {new Date().getFullYear()} NJ. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
