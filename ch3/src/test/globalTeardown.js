export default async function globalTeardown() {
  // eslint-disable-next-line no-undef
  await global.__MONGOINSTANCE.stop()
}