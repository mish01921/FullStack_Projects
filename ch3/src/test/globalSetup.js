import { MongoMemoryServer } from "mongodb-memory-server"
import *as  dotenv from "dotenv"
dotenv.config()
export default async function globalSetup() {
  const instance = await MongoMemoryServer.create({
    binary: {
      version: "6.0.4",
    },
  })
  // eslint-disable-next-line no-undef
  global.__MONGOINSTANCE = instance

  // eslint-disable-next-line no-undef
  process.env.DATABASE_URL = instance.getUri()
}
