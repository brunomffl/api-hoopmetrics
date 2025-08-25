import { PrismaClient } from '../generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Verificar se já existe um admin
    const existingAdmin = await prisma.user.findFirst({
        where: { role: 'admin' }
    })

    if (existingAdmin) {
        console.log('✅ Admin já existe no banco de dados')
        return
    }

    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@hoopmetrics.com',
            password: await bcrypt.hash('admin123', 10),
            name: 'Administrador Principal',
            role: 'admin',
            admin: {
                create: {}
            }
        },
        include: {
            admin: true
    }
});

}

main()
    .catch((e) => {
        console.error('❌ Erro durante o seed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
        console.log('🏁 Seed finalizado!')
    })
