import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
} from '@/components/admin/ui'
import Link from 'next/link'
import {
  BookOpen,
  GraduationCap,
  Network,
  Sparkles,
  Files,
  Megaphone,
  Plus,
  ArrowUpRight,
  Clock,
  User,
  Image as ImageIcon,
  CheckCircle2,
  Sliders,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/admin/login')
  }

  const [
    counts,
    recentBlogs,
    recentResearch,
  ] = await Promise.all([
    prisma.$transaction([
      prisma.blog.count(),
      prisma.researchPaper.count(),
      prisma.project.count(),
      prisma.poster.count(),
      prisma.blog.count({ where: { published: true } }),
      prisma.researchPaper.count({ where: { published: true } }),
      prisma.cmsPage.count(),
      prisma.cmsPage.count({ where: { published: true } }),
      prisma.banner.count(),
      prisma.banner.count({ where: { active: true } }),
    ]),
    prisma.blog.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        published: true,
        createdAt: true,
        author: { select: { name: true, email: true } },
      },
    }),
    prisma.researchPaper.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        published: true,
        createdAt: true,
      },
    }),
  ])

  const [
    blogCount,
    researchCount,
    projectCount,
    posterCount,
    publishedBlogs,
    publishedResearch,
    pageCount,
    publishedPages,
    bannerCount,
    activeBanners,
  ] = counts

  const statCards = [
    {
      title: 'Blog Posts',
      total: blogCount,
      active: publishedBlogs,
      activeLabel: 'published',
      icon: BookOpen,
      href: '/admin/blog',
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-500/20',
    },
    {
      title: 'Research Papers',
      total: researchCount,
      active: publishedResearch,
      activeLabel: 'published',
      icon: GraduationCap,
      href: '/admin/research',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
    },
    {
      title: 'Ecosystem Projects',
      total: projectCount,
      active: projectCount,
      activeLabel: 'nodes live',
      icon: Network,
      href: '/admin/ecosystem',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      title: 'Visual Posters',
      total: posterCount,
      active: posterCount,
      activeLabel: 'in gallery',
      icon: Sparkles,
      href: '/admin/posters',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
    {
      title: 'CMS Pages',
      total: pageCount,
      active: publishedPages,
      activeLabel: 'published',
      icon: Files,
      href: '/admin/pages',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      title: 'Banners',
      total: bannerCount,
      active: activeBanners,
      activeLabel: 'active',
      icon: Megaphone,
      href: '/admin/banners',
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/20',
    },
  ]

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 pb-24">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Workspace Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Welcome back, <span className="text-sky-400 font-semibold">{session.user.name || session.user.email}</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link href="/admin/blog/new">
            <Button variant="default" size="sm" className="font-bold">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              New Post
            </Button>
          </Link>
          <Link href="/admin/research/new">
            <Button variant="outline" size="sm">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Publish Paper
            </Button>
          </Link>
          <Link href="/gallery" target="_blank">
            <Button variant="secondary" size="sm">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
              View Gallery
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Launchpad & Real Status Hub */}
      <Card className="border-zinc-800/80 bg-zinc-950/70 p-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/80" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Oxiverse Production Control
              </h2>
            </div>
            <p className="text-xs text-zinc-400">
              Database synchronized · {publishedBlogs + publishedResearch + publishedPages} published live documents · PostgreSQL + Supabase Storage
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Link href="/admin/assets">
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <ImageIcon className="w-3.5 h-3.5 mr-1.5 text-zinc-400" />
                Media Manager
              </Button>
            </Link>
            <Link href="/admin/ecosystem/new">
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <Network className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                Add Node
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                <Sliders className="w-3.5 h-3.5 mr-1.5" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:border-zinc-700/80 hover:bg-zinc-900/40 transition-all p-5 group cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-black text-white tracking-tight">{stat.total}</p>
                    <p className="text-[11px] text-zinc-500 font-medium">
                      <span className="text-emerald-400 font-semibold">{stat.active}</span> {stat.activeLabel}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color} border ${stat.borderColor} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Recent Activity Dual Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Blog Posts */}
        <Card className="border-zinc-800/80 bg-zinc-950/70 overflow-hidden flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-zinc-800/60">
            <div>
              <CardTitle className="text-sm">Latest Blog Posts</CardTitle>
              <CardDescription>Recently drafted and published posts</CardDescription>
            </div>
            <Link href="/admin/blog">
              <Button variant="ghost" size="sm" className="text-sky-400 hover:text-sky-300">
                View All
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </CardHeader>

          <CardContent className="p-0 flex-1 divide-y divide-zinc-800/60">
            {recentBlogs.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 text-xs italic">
                No blog posts created yet.
              </div>
            ) : (
              recentBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="p-4 hover:bg-zinc-900/40 transition-colors flex items-center justify-between gap-4 group"
                >
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/admin/blog/${blog.id}`}
                      className="text-xs font-semibold text-zinc-200 group-hover:text-sky-400 transition-colors truncate block"
                    >
                      {blog.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-500">
                      <Clock className="w-3 h-3 text-zinc-600" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      <span>·</span>
                      <User className="w-3 h-3 text-zinc-600" />
                      <span className="truncate">{blog.author.name || blog.author.email}</span>
                    </div>
                  </div>

                  <Badge variant={blog.published ? 'success' : 'warning'} dot>
                    {blog.published ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Research Papers */}
        <Card className="border-zinc-800/80 bg-zinc-950/70 overflow-hidden flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-zinc-800/60">
            <div>
              <CardTitle className="text-sm">Research Papers</CardTitle>
              <CardDescription>Academic systems and theoretical works</CardDescription>
            </div>
            <Link href="/admin/research">
              <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300">
                View All
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </CardHeader>

          <CardContent className="p-0 flex-1 divide-y divide-zinc-800/60">
            {recentResearch.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 text-xs italic">
                No research papers added yet.
              </div>
            ) : (
              recentResearch.map((paper) => (
                <div
                  key={paper.id}
                  className="p-4 hover:bg-zinc-900/40 transition-colors flex items-center justify-between gap-4 group"
                >
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/admin/research/${paper.id}`}
                      className="text-xs font-semibold text-zinc-200 group-hover:text-indigo-400 transition-colors truncate block"
                    >
                      {paper.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-500">
                      <Clock className="w-3 h-3 text-zinc-600" />
                      <span>{new Date(paper.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Badge variant={paper.published ? 'success' : 'warning'} dot>
                    {paper.published ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
