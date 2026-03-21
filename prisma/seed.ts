import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@oxiverse.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword, // Ensure the password matches the .env file if the email is same
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Admin',
    },
  })

  console.log('✅ Created admin user:', admin.email)

  // Create sample categories
  const categories = [
    { name: 'Technology', slug: 'technology' },
    { name: 'Research', slug: 'research' },
    { name: 'Updates', slug: 'updates' },
  ]

  for (const category of categories) {
    const createdCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
    console.log('✅ Created category:', createdCategory.name)

    // Add a blog post for each category
    await prisma.blog.upsert({
      where: { slug: `blog-${createdCategory.slug}` },
      update: {},
      create: {
        title: `Dynamic Blog: ${createdCategory.name}`,
        slug: `blog-${createdCategory.slug}`,
        excerpt: `This is a dynamically seeded blog post for the ${createdCategory.name} category.`,
        content: `Full content for ${createdCategory.name} blog.`,
        published: true,
        publishedAt: new Date(),
        authorId: admin.id,
        categoryId: createdCategory.id,
      },
    })

    // Add a research paper for each category
    await prisma.researchPaper.upsert({
      where: { slug: `research-${createdCategory.slug}` },
      update: {},
      create: {
        title: `Dynamic Research: ${createdCategory.name}`,
        slug: `research-${createdCategory.slug}`,
        abstract: `Abstract for the dynamically seeded research paper in ${createdCategory.name}.`,
        content: `Technical details for ${createdCategory.name} research.`,
        published: true,
        publishedAt: new Date(),
        authorId: admin.id,
        categoryId: createdCategory.id,
      },
    })
  }

  console.log('🎉 Seeding completed!')
  console.log('📝 Login credentials set from .env:')
  console.log('   Email:', adminEmail)
  console.log('   Password:', adminPassword)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
