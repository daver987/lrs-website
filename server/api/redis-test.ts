export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  await useStorage().setItem('test', body)
  return 'Data is set'
})
