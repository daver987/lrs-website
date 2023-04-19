import { PrismaClient } from '@prisma/client'
import chalk from 'chalk'

const prismaLogger = (...args: any[]) => {
  console.log(chalk.magenta('[PRISMA]'), ' - ', ...args)
}

export const prismaDb = new PrismaClient({
  log:
    process.env.DEBUG === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
})

prismaDb.$use(async (params, next) => {
  const before = Date.now()
  const result = await next(params)
  const after = Date.now()

  prismaLogger(`${params.model}.${params.action} - ${after - before}ms`)
  return result
})

export type PrismaDb = PrismaClient
