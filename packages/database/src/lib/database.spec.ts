// Mock Prisma Client to avoid database connection during tests
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    $connect: jest.fn().mockResolvedValue(undefined),
    $disconnect: jest.fn().mockResolvedValue(undefined),
    todo: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

import { prisma } from './database.js';

describe('database', () => {
  it('should export prisma client', () => {
    expect(prisma).toBeDefined();
    expect(typeof prisma.$connect).toBe('function');
    expect(typeof prisma.$disconnect).toBe('function');
  });

  it('should have todo model methods', () => {
    expect(prisma.todo).toBeDefined();
    expect(typeof prisma.todo.findMany).toBe('function');
    expect(typeof prisma.todo.create).toBe('function');
  });
});
