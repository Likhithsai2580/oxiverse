import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user ?? null
}

export async function isAuthenticated() {
  const session = await getServerSession(authOptions)
  return !!session?.user
}

/**
 * Admin authorization guard.
 *
 * Returns a NextResponse (401/403) when the request is NOT allowed to proceed,
 * or `null` when the caller is an authenticated ADMIN and may continue.
 *
 * Differs from the old `if (!session?.user)` checks: it also verifies the
 * `role` claim, so a logged-in USER can no longer reach admin endpoints.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Forbidden: administrator role required' },
      { status: 403 }
    )
  }
  return null
}

/**
 * Like requireAdmin(), but on success returns the admin session user so the
 * caller can use the authenticated identity (e.g. as an authorId).
 * Returns `{ response }` (non-null) when the request must be rejected.
 */
export async function requireAdminUser(): Promise<
  { response: NextResponse; user: null } | { response: null; user: { id: string; role: string } }
> {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return { response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), user: null }
  }
  if (session.user.role !== 'ADMIN') {
    return {
      response: NextResponse.json(
        { error: 'Forbidden: administrator role required' },
        { status: 403 }
      ),
      user: null,
    }
  }
  return { response: null, user: { id: session.user.id, role: session.user.role } }
}
