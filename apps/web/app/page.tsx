import Header from './components/Header';
import ProfileHeader from './components/ProfileHeader';
import TechArsenal from './components/TechArsenal';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Blogs from './components/Blogs';
import GitHubSummary from './components/GitHubSummary';
import Footer from './components/Footer';

export default function Page() {
  return (
    <>
      <Header />
      
      <main className="max-w-6xl mx-auto px-8 -mt-24 relative z-10 pb-32">
        <ProfileHeader />
        <TechArsenal />
        <Experience />
        <Projects />
        <Blogs />
        <GitHubSummary />
        <Footer />
      </main>
    </>
  );
}

