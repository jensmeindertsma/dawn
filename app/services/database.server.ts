import { PrismaClient } from "../generated/prisma";
import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3";

export function getDatabase() {
  const adapter = new PrismaBetterSQLite3({
    url: "file:./data/database.db",
  });

  const client = new PrismaClient({ adapter });

  console.warn(`[${formatDate(new Date())}] instantiated new Prisma Client`);

  return client;
}

function formatDate(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // getMonth is zero-based
  const year = date.getFullYear();

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
