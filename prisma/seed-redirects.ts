// Run with: npx tsx prisma/seed-redirects.ts
// Seeds the SlugRedirect table with known old → new URL mappings.
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const redirects = [
  {
    oldPath: '/blog/ravana-v2-building-a-cognitive-architecture-with-bounded-agi',
    newPath: '/blog/building-ravana-v2-a-proto-homeostatic-cognitive-architecture',
    type: 'blog',
  },
  {
    oldPath: '/blog/intentforge-architecture-how-we-built-a-privacy-first-search-engine-with-tor',
    newPath: '/blog/intentforge-architecture',
    type: 'blog',
  },
  {
    oldPath: '/blog/intent-engine-building-a-selfimproving-search-system',
    newPath: '/blog/intent-engine',
    type: 'blog',
  },
  {
    oldPath: '/research/ravana-cognitive-dissonance-in-agi-alignment',
    newPath: '/research/ravana-cognitive-dissonance',
    type: 'research',
  },
  {
    oldPath: '/research/intentforge-a-privacy-preserving-self-improving-intent-driven-search-platform',
    newPath: '/research/intentforge',
    type: 'research',
  },
  {
    oldPath: '/health',
    newPath: '/',
    type: 'page',
  },
]

async function main() {
  for (const r of redirects) {
    await prisma.slugRedirect.upsert({
      where: { oldPath: r.oldPath },
      update: { newPath: r.newPath, type: r.type },
      create: r,
    })
    console.log(`  ${r.oldPath} → ${r.newPath}`)
  }
  console.log('\nDone. All redirects seeded.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
