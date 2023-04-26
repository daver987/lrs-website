import { Client } from '@planetscale/database'

const client = new Client({
  host: 'aws.connect.psdb.cloud',
  username: useRuntimeConfig().PLANETSCALE_USERNAME,
  password: useRuntimeConfig().PLANETSCALE_PASSWORD,
})

export async function createPSContext() {
  const conn = client.connection()
  return {
    conn,
    execute: conn.execute.bind(conn),
  }
}

export type PlanetScaleContext = ReturnType<typeof createPSContext>
