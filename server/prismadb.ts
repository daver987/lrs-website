import { PrismaClient } from '@prisma/client'
import chalk from 'chalk'

const prismaLogger = (...args: any[]) => {
  console.log(chalk.magenta('[PRISMA]'), ' - ', ...args)
}

const basePrismaClient = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
})

export const prismaDb = basePrismaClient.$extends({
  query: {
    $allOperations: async ({ model, operation, args, query }) => {
      const before = Date.now()
      const result = await query(args)
      const after = Date.now()

      prismaLogger(`${model}.${operation} - ${after - before}ms`)
      return result
    },
  },
})

export type PrismaDb = typeof prismaDb
