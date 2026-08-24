import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine class names conditionally with Tailwind merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert a string to a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with dashes
    .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
    .replace(/-+/g, '-') // Collapse multiple dashes
}

/**
 * Format a date string for display
 */
export function formatDate(date: Date | string): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format a date with relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
  if (!date) return ''
  const now = new Date()
  const then = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`

  return formatDate(date)
}

/**
 * Truncate text to a specified length
 */
export function truncate(text: string, length: number): string {
  if (!text) return ''
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

/**
 * Calculate estimated reading time for a string
 */
export function calculateReadingTime(content: string): string {
  if (!content) return '1 min read'
  const wordsPerMinute = 200
  const noOfWords = content.split(/\s/g).length
  const minutes = noOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)
  return `${readTime} min read`
}
