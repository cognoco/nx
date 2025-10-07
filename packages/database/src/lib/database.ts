import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// PrismaClient singleton to prevent multiple instances in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Initialize connection pool and Prisma client with PostgreSQL adapter
const createPrismaClient = () => {
  const isDevelopment = process.env['NODE_ENV'] !== 'production';

  // Configure pg connection pool with production-ready settings
  const pool = new Pool({
    connectionString: process.env['DATABASE_URL'],

    // Connection pool configuration
    max: isDevelopment ? 5 : 20, // Max connections (dev: 5, prod: 20)
    min: isDevelopment ? 0 : 2, // Min connections (dev: 0, prod: 2)
    idleTimeoutMillis: isDevelopment ? 10000 : 30000, // Idle timeout
    connectionTimeoutMillis: 2000, // Connection timeout (2s)
  });

  // Create Prisma driver adapter for PostgreSQL (Rust-free client)
  const adapter = new PrismaPg(pool);

  // Instantiate PrismaClient with adapter
  return new PrismaClient({
    adapter,
    log: isDevelopment ? ['query', 'error', 'warn'] : ['error'],
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env['NODE_ENV'] !== 'production') {
  globalForPrisma.prisma = prisma;
}

export type { PrismaClient } from '@prisma/client';
