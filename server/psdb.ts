import { Client } from '@planetscale/database'

const client = new Client({
  host: 'aws.connect.psdb.cloud',
  username: '8piyh335n914ex0gh12j',
  password: 'pscale_pw_ytC9Ahn2dBMBZLvSP2AFULYlwsbUMREgBUvAa2obIB6',
})

export async function createPSContext() {
  const conn = client.connection()
  return {
    conn,
    execute: conn.execute.bind(conn),
  }
}

export type PlanetScaleContext = ReturnType<typeof createPSContext>
