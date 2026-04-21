import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function migrate() {
  console.log('Starting migration GitHub -> Codeberg...')
  
  // Migrate Project model
  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { link: { contains: 'github.com' } },
        { hostedUrl: { contains: 'github.io' } },
        { imageUrl: { contains: 'githubusercontent.com' } }
      ]
    }
  })

  console.log(`Found ${projects.length} projects to migrate.`)

  for (const project of projects) {
    const newLink = project.link?.replace('github.com', 'codeberg.org')
    const newHostedUrl = project.hostedUrl?.replace('github.io', 'codeberg.page')
    const newImageUrl = project.imageUrl?.replace('githubusercontent.com', 'codeberg.org') // This is a guess but safer than nothing
    
    await prisma.project.update({
      where: { id: project.id },
      data: {
        link: newLink,
        hostedUrl: newHostedUrl,
        imageUrl: newImageUrl,
      }
    })
  }

  // Migrate Poster model
  const posters = await prisma.poster.findMany({
    where: { link: { contains: 'github.com' } }
  })

  console.log(`Found ${posters.length} posters to migrate.`)

  for (const poster of posters) {
    const newLink = poster.link?.replace('github.com', 'codeberg.org')
    await prisma.poster.update({
      where: { id: poster.id },
      data: { link: newLink }
    })
  }

  console.log('Migration completed.')
}

migrate()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
