'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button, Input, Card } from '@/components/ui'
import { useToastContext } from '@/lib/providers/ToastProvider'
import Spinner from '@/components/ui/Spinner'

export default function AdminLoginPage() {
  const router = useRouter()
  const { error } = useToastContext()
  const [isLoading, setIsLoading] = useState(false)
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
        error('Invalid email or password')
      } else {
        router.push('/admin/dashboard')
        router.refresh()
      }
    } catch (err) {
      error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-dark-950">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <Image 
              src="/favicon-256x256.png" 
              alt="Oxiverse Logo" 
              fill 
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Oxiverse Admin</h1>
          <p className="text-dark-400">Sign in to manage your content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="admin@oxiverse.com"
            required
            disabled={isLoading}
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••"
            required
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : 'Sign In'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-dark-500 hover:text-dark-400 transition-colors cursor-pointer">
            Forgot password? Contact system administrator.
          </p>
        </div>
      </Card>
    </div>
  )
}
