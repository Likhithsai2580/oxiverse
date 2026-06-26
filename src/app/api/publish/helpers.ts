import { prisma } from '@/lib/prisma'

export async function resolveAuthor() {
  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } })
  if (!admin) throw new Error('No admin user found. Run db:seed first.')
  return admin.id
}

export async function resolveCategory(name?: string) {
  if (!name) return null
  const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
  return prisma.category.upsert({
    where: { slug },
    update: { name },
    create: { name, slug },
  })
}

export async function resolveTags(names?: string[]) {
  if (!names || names.length === 0) return []
  const results = []
  for (const name of names) {
    const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
    const tag = await prisma.tag.upsert({
      where: { slug },
      update: { name },
      create: { name, slug },
    })
    results.push({ id: tag.id })
  }
  return results
}
