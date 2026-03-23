import { PrismaClient, Role } from '@prisma/client'
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
      password: hashedPassword,
      role: Role.ADMIN,
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Admin',
      role: Role.ADMIN,
    },
  })

  console.log('✅ Created admin user:', admin.email)
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
