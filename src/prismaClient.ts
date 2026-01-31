import { PrismaClient } from "./generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const connectionStr = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString: connectionStr })
const prisma = new PrismaClient({ adapter })

export { prisma }