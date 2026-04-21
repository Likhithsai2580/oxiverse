import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, Button } from '@/components/ui'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/admin/login')
  }

  const adminId = session.user.id

  const [
    counts,
    recentBlogs,
    recentResearch
  ] = await Promise.all([
    prisma.$transaction([
      prisma.blog.count(),
      prisma.researchPaper.count(),
      prisma.project.count(),
      prisma.poster.count(),
      prisma.blog.count({ where: { published: true } }),
      prisma.researchPaper.count({ where: { published: true } }),
    ]),
    prisma.blog.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
        author: { select: { name: true, email: true } }
      }
    }),
    prisma.researchPaper.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true
      }
    })
  ])

  const [blogCount, researchCount, projectCount, posterCount, publishedBlogs, publishedResearch] = counts

  return (
    <div className="p-8 pb-12 overflow-y-auto max-h-[calc(100vh-64px)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold font-display text-white mb-2">Workspace</h1>
          <p className="text-dark-400">Welcome back, {session.user.name || session.user.email}</p>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
          <Link href="/admin/blog/[id]?id=new" as="/admin/blog/new">
            <Button size="sm" variant="primary" className="shadow-lg shadow-primary-500/20">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Post
            </Button>
          </Link>
          <Link href="/admin/research/new">
            <Button size="sm" variant="outline" className="glass">
              Publish Paper
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="bg-gradient-to-br from-primary-500/5 to-transparent border-primary-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-dark-500 mb-2">Blog Portfolio</p>
              <p className="text-3xl font-bold text-white mb-1">{blogCount}</p>
              <div className="flex items-center text-xs text-green-400 font-bold">
                <span className="mr-1">{publishedBlogs}</span>
                <span className="text-dark-500 font-normal">published</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-400 border border-primary-500/10">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l5 5v11a2 2 0 01-2 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 4v5h5" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-accent-500/5 to-transparent border-accent-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-dark-500 mb-2">Research Index</p>
              <p className="text-3xl font-bold text-white mb-1">{researchCount}</p>
              <div className="flex items-center text-xs text-accent-400 font-bold">
                <span className="mr-1">{publishedResearch}</span>
                <span className="text-dark-500 font-normal">published</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-accent-500/10 flex items-center justify-center text-accent-400 border border-accent-500/10">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/5 to-transparent border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-dark-500 mb-2">Ecosystem Projects</p>
              <p className="text-3xl font-bold text-white mb-1">{projectCount}</p>
              <span className="text-[10px] text-dark-500">active nodes</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/10">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/5 to-transparent border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-dark-500 mb-2">Visual Posters</p>
              <p className="text-3xl font-bold text-white mb-1">{posterCount}</p>
              <span className="text-[10px] text-dark-500">linked assets</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/10">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Blog Posts */}
        <Card className="border-white/5 bg-dark-900/40 p-0 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <div>
              <h2 className="text-xl font-bold text-white">Latest Posts</h2>
              <p className="text-xs text-dark-500">Recently created blog entries</p>
            </div>
            <Link href="/admin/blog" className="text-xs font-bold text-primary-400 hover:text-primary-300 transition-colors uppercase tracking-widest">
              Manager →
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {recentBlogs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-dark-500 italic">No activity recorded</p>
              </div>
            ) : (
              recentBlogs.map((blog) => (
                <div key={blog.id} className="p-4 hover:bg-white/[0.02] transition-colors group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-4">
                      <Link
                        href={`/admin/blog/${blog.id}`}
                        className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors truncate block"
                      >
                        {blog.title}
                      </Link>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-dark-500 uppercase tracking-tight">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-[10px] text-dark-600">•</span>
                        <span className="text-[10px] text-dark-500">
                          {blog.author.name || 'Anonymous'}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${blog.published ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                        {blog.published ? 'Live' : 'Draft'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Recent Research Papers */}
        <Card className="border-white/5 bg-dark-900/40 p-0 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <div>
              <h2 className="text-xl font-bold text-white">Technical Research</h2>
              <p className="text-xs text-dark-500">Latest academic and systems papers</p>
            </div>
            <Link href="/admin/research" className="text-xs font-bold text-accent-400 hover:text-accent-300 transition-colors uppercase tracking-widest">
              Manager →
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {recentResearch.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-dark-500 italic">No papers published</p>
              </div>
            ) : (
              recentResearch.map((paper) => (
                <div key={paper.id} className="p-4 hover:bg-white/[0.02] transition-colors group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-4">
                      <Link
                        href={`/admin/research/${paper.id}`}
                        className="text-sm font-semibold text-white group-hover:text-accent-400 transition-colors truncate block"
                      >
                        {paper.title}
                      </Link>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-dark-500 uppercase tracking-tight">
                          {new Date(paper.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${paper.published ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                        {paper.published ? 'Live' : 'Draft'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Quick Tips */}
      <div className="mt-12 p-6 glass rounded-2xl border border-white/5 flex flex-col md:flex-row items-center gap-6">
        <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-white mb-1">Professional Management</h4>
          <p className="text-sm text-dark-400">
            Use the PDF upload feature in the Blog Manager to automatically convert documentation into rich Markdown content.
            All media is now stored securely on the local server.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="https://codeberg.org/itxLikhith/intent-engine" target="_blank">
            <Button size="sm" variant="ghost" className="text-xs">Documentation</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
