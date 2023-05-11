import { PrismaClient } from "@prisma/client";
const prisma: PrismaClient =
  // @ts-ignore
  globalThis.prisma ||
  new PrismaClient({
    // log:
    // process.env.NODE_ENV !== "production"
    // ? ["info", "warn", "error", "query"]
    // : [], // "query",
    errorFormat: "pretty",
  });

// @ts-ignore
global.prisma = prisma;
export default prisma;
