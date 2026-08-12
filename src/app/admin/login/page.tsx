'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useToastContext } from '@/lib/providers/ToastProvider'
import Spinner from '@/components/ui/Spinner'

export default function AdminLoginPage() {
  const router = useRouter()
  const { error } = useToastContext()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        error('Invalid email or password')
      } else {
        router.push('/admin/dashboard')
        router.refresh()
      }
    } catch {
      error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#080b12] px-4 py-10 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(45,212,191,0.14),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(14,165,233,0.16),transparent_34%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-px w-[min(70vw,720px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary-400/70 to-transparent" />

      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden flex-col justify-between border-r border-white/10 bg-gradient-to-br from-primary-500/[0.13] via-transparent to-accent-400/[0.08] p-10 lg:flex xl:p-14">
          <div>
            <div className="mb-12 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/15 bg-black/20">
                <Image src="/favicon-256x256.png" alt="Oxiverse logo" fill priority className="object-contain" />
              </div>
              <span className="text-xl font-black tracking-[-0.06em]">Oxi<span className="text-primary-300">verse</span></span>
            </div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary-300/80">Operations workspace</p>
            <h1 className="max-w-md text-4xl font-black leading-[1.05] tracking-[-0.04em] text-white xl:text-5xl">Shape the next layer of the Oxiverse.</h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-slate-300/75">Manage research, publishing, ecosystem projects, and the content systems that power the public experience.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-300/70">
            <div className="rounded-2xl border border-white/10 bg-black/10 p-4"><span className="mb-2 block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />Secure access</div>
            <div className="rounded-2xl border border-white/10 bg-black/10 p-4"><span className="mb-2 block h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />Live publishing</div>
          </div>
        </section>

        <section className="p-7 sm:p-10 lg:p-12">
          <div className="mb-10 lg:hidden">
            <div className="mb-8 flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-white/15"><Image src="/favicon-256x256.png" alt="Oxiverse logo" fill priority className="object-contain" /></div>
              <span className="text-xl font-black tracking-[-0.06em]">Oxi<span className="text-primary-300">verse</span></span>
            </div>
          </div>
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-300/20 bg-primary-300/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-200"><span className="h-1.5 w-1.5 rounded-full bg-primary-300" />Private area</div>
            <h2 className="text-3xl font-black tracking-[-0.04em]">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-400">Sign in to continue to your admin workspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm font-semibold text-slate-200" htmlFor="email">Email address
              <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} placeholder="admin@oxiverse.com" required disabled={isLoading} className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-primary-300/70 focus:ring-4 focus:ring-primary-300/10 disabled:opacity-60" />
            </label>
            <label className="block text-sm font-semibold text-slate-200" htmlFor="password">Password
              <input id="password" name="password" type="password" autoComplete="current-password" value={formData.password} onChange={(event) => setFormData({ ...formData, password: event.target.value })} placeholder="Enter your password" required disabled={isLoading} className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-primary-300/70 focus:ring-4 focus:ring-primary-300/10 disabled:opacity-60" />
            </label>
            <button type="submit" disabled={isLoading} className="flex h-12 w-full items-center justify-center rounded-xl bg-primary-200 px-5 text-sm font-black uppercase tracking-[0.16em] text-slate-950 shadow-lg shadow-primary-300/10 transition hover:bg-primary-100 focus:outline-none focus:ring-4 focus:ring-primary-300/20 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60">{isLoading ? <Spinner size="sm" /> : 'Enter workspace'}</button>
          </form>
          <p className="mt-8 text-center text-xs leading-5 text-slate-500">Access is restricted to authorized operators.<br />Need access? Contact your system administrator.</p>
        </section>
      </div>
    </main>
  )
}
