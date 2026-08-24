'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
} from '@/components/admin/ui'
import { useToastContext } from '@/lib/providers/ToastProvider'
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const { error, success } = useToastContext()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        error('Invalid email or password credentials')
      } else {
        success('Authenticated successfully')
        router.push('/admin/dashboard')
        router.refresh()
      }
    } catch (err) {
      error('An error occurred during authentication')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-950 text-zinc-100 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <Card className="w-full max-w-md border-zinc-800 bg-zinc-950/80 backdrop-blur-xl p-8 shadow-2xl relative z-10">
        <div className="text-center space-y-3 mb-8">
          <div className="relative w-12 h-12 mx-auto rounded-xl bg-zinc-900 border border-zinc-800 p-2 flex items-center justify-center shadow-inner">
            <Image
              src="/oxiverse-logo.svg"
              alt="Oxiverse Logo"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight text-white uppercase">
              Oxiverse <span className="text-sky-400">Admin</span>
            </h1>
            <p className="text-xs text-zinc-400 mt-1">Authenticate to access ecosystem management</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="admin@oxiverse.com"
                required
                disabled={isLoading}
                className="w-full bg-zinc-900/70 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••••••"
                required
                disabled={isLoading}
                className="w-full bg-zinc-900/70 border border-zinc-800 rounded-lg pl-9 pr-9 py-2 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="w-full font-bold mt-2"
            isLoading={isLoading}
          >
            Sign In to Console
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center">
          <p className="text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Protected by NextAuth Role-Based Access Control
          </p>
        </div>
      </Card>
    </div>
  )
}
