'use client';

import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { GitCommit, GitPullRequest, CircleDot, Activity, TrendingUp } from 'lucide-react';

interface GitHubStats {
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalContributions: number;
  repos: number;
  followers: number;
  following: number;
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: {
    commits?: { message: string }[];
    action?: string;
  };
}

export default function GitHubSummary() {
  const [stats, setStats] = useState<GitHubStats>({
    totalCommits: 0,
    totalPRs: 0,
    totalIssues: 0,
    totalContributions: 0,
    repos: 0,
    followers: 0,
    following: 0,
  });
  const [recentActivity, setRecentActivity] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const githubUser = 'codebyNJ';

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        // Fetch user profile via REST API for basic stats
        const profileRes = await fetch(`https://api.github.com/users/${githubUser}`);
        const profile = await profileRes.json();
        
        if (profile.id) {
          setStats(prev => ({
            ...prev,
            repos: profile.public_repos,
            followers: profile.followers,
            following: profile.following,
          }));
        }

        // Fetch contribution stats from events (GraphQL requires auth)
        const eventsRes = await fetch(`https://api.github.com/users/${githubUser}/events/public?per_page=100`);
        const events = await eventsRes.json();
        
        if (Array.isArray(events)) {
          // Count contribution types from events
          const commits = events.filter((e: GitHubEvent) => e.type === 'PushEvent').reduce((acc: number, e: GitHubEvent) => 
            acc + (e.payload?.commits?.length || 0), 0);
          const prs = events.filter((e: GitHubEvent) => e.type === 'PullRequestEvent').length;
          const issues = events.filter((e: GitHubEvent) => e.type === 'IssuesEvent').length;
          
          setStats(prev => ({
            ...prev,
            totalCommits: commits,
            totalPRs: prs,
            totalIssues: issues,
            totalContributions: commits + prs + issues,
          }));
          
          setRecentActivity(events.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to fetch GitHub data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchGitHubData();
  }, []);

  const getEventDescription = (event: GitHubEvent) => {
    const repoName = event.repo.name.split('/')[1] || event.repo.name;
    switch (event.type) {
      case 'PushEvent':
        const commitMsg = event.payload?.commits?.[0]?.message || 'Pushed commits';
        return `Pushed to ${repoName}: "${commitMsg.slice(0, 50)}${commitMsg.length > 50 ? '...' : ''}"`;
      case 'CreateEvent':
        return `Created repository ${repoName}`;
      case 'WatchEvent':
        return `Starred ${repoName}`;
      case 'ForkEvent':
        return `Forked ${repoName}`;
      case 'PullRequestEvent':
        return `${event.payload?.action || 'Updated'} PR in ${repoName}`;
      case 'IssuesEvent':
        return `${event.payload?.action || 'Updated'} issue in ${repoName}`;
      default:
        return `Activity in ${repoName}`;
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <section className="mb-32">
      <h2 className="section-heading flex items-center gap-3">
        GitHub Contributions
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 bg-white/80 rounded-full animate-pulse" />
          <span className="text-white/50">@{githubUser}</span>
        </span>
      </h2>
      
      <div className="p-8 bg-[#111] border border-[#222] sharp">
        {/* Contribution Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 mb-10">
          <div>
            <span className="text-[11px] text-white/40 uppercase font-semibold mb-1 tracking-widest flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Contributions
            </span>
            <span className="text-3xl font-bold text-white">
              {loading ? '--' : stats.totalContributions}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-white/40 uppercase font-semibold mb-1 tracking-widest flex items-center gap-1">
              <GitCommit className="w-3 h-3" /> Commits
            </span>
            <span className="text-3xl font-bold text-white">
              {loading ? '--' : stats.totalCommits}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-white/40 uppercase font-semibold mb-1 tracking-widest flex items-center gap-1">
              <GitPullRequest className="w-3 h-3" /> PRs
            </span>
            <span className="text-3xl font-bold text-white">
              {loading ? '--' : stats.totalPRs}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-white/40 uppercase font-semibold mb-1 tracking-widest flex items-center gap-1">
              <CircleDot className="w-3 h-3" /> Issues
            </span>
            <span className="text-3xl font-bold text-white">
              {loading ? '--' : stats.totalIssues}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-white/40 uppercase block font-semibold mb-1 tracking-widest">
              Repositories
            </span>
            <span className="text-3xl font-bold text-white">
              {loading ? '--' : stats.repos}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-white/40 uppercase block font-semibold mb-1 tracking-widest">
              Followers
            </span>
            <span className="text-3xl font-bold text-white">
              {loading ? '--' : stats.followers}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-white/40 uppercase block font-semibold mb-1 tracking-widest">
              Following
            </span>
            <span className="text-3xl font-bold text-white">
              {loading ? '--' : stats.following}
            </span>
          </div>
        </div>

        {/* GitHub Contribution Graph using react-github-calendar */}
        <div className="mb-10">
          <h3 className="text-[11px] text-white/40 uppercase font-semibold mb-4 tracking-widest">
            Contribution Graph
          </h3>
          <div className="overflow-x-auto pb-2">
            <GitHubCalendar
              username={githubUser}
              colorScheme="dark"
              blockSize={15}
              blockMargin={4}
              fontSize={15}
            />
          </div>
        </div>

        {/* Recent Activity */}
        {/* <div>
          <h3 className="text-[11px] text-white/40 uppercase font-semibold mb-4 tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Recent Activity
          </h3>
          {loading ? (
            <div className="text-white/40 text-sm">Loading activity...</div>
          ) : recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((event) => (
                <div 
                  key={event.id} 
                  className="flex items-start gap-3 p-3 border border-[#222] hover:bg-[#161616] transition-colors"
                >
                  <GitCommit className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/80 truncate">
                      {getEventDescription(event)}
                    </p>
                    <span className="text-[10px] text-white/30 uppercase tracking-wider">
                      {getTimeAgo(event.created_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white/40 text-sm">No recent activity</div>
          )}
        </div>*/}
      </div> 
    </section>
  );
}
