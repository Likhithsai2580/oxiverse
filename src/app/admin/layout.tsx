import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { ReactNode } from 'react'
import AdminLayoutClient from './components/AdminLayoutClient'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)
  
  return (
    <AdminLayoutClient session={session}>
      {children}
    </AdminLayoutClient>
  )
}
