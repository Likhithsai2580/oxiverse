import { NextResponse } from 'next/server'

export function validateApiKey(request: Request): NextResponse | null {
  const apiKey = request.headers.get('x-api-key')
  const expectedKey = process.env.PUBLISH_API_KEY

  if (!expectedKey) {
    return NextResponse.json(
      { error: 'PUBLISH_API_KEY not configured on server' },
      { status: 500 }
    )
  }

  if (!apiKey || apiKey !== expectedKey) {
    return NextResponse.json(
      { error: 'Invalid or missing API key. Provide via x-api-key header.' },
      { status: 401 }
    )
  }

  return null
}
