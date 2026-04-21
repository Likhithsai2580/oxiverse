import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const projects = await prisma.project.findMany()
  console.log('Project Links:')
  projects.forEach(p => {
    console.log(`- ${p.title}: ${p.link}`)
  })
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
