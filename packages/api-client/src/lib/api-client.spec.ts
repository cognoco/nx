// Mock oRPC client to avoid ES module issues in Jest
jest.mock('@orpc/client', () => ({
  createORPCClient: jest.fn(() => ({
    health: jest.fn(),
    todos: {
      list: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));

jest.mock('@orpc/client/fetch', () => ({
  RPCLink: jest.fn().mockImplementation((config) => config),
}));

import { createClient, getApiBaseUrl } from './api-client';

describe('api-client', () => {
  describe('createClient', () => {
    it('should create an oRPC client with basic config', () => {
      const client = createClient({
        baseUrl: 'http://localhost:3000',
      });

      expect(client).toBeDefined();
      expect(typeof client).toBe('object');
    });

    it('should create an oRPC client with headers', () => {
      const client = createClient({
        baseUrl: 'http://localhost:3000',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        },
      });

      expect(client).toBeDefined();
    });

    it('should create an oRPC client with header function', () => {
      const client = createClient({
        baseUrl: 'http://localhost:3000',
        headers: () => ({
          'Content-Type': 'application/json',
          Authorization: 'Bearer dynamic-token',
        }),
      });

      expect(client).toBeDefined();
    });

    it('should create an oRPC client with custom fetch', () => {
      const mockFetch = jest.fn();
      const client = createClient({
        baseUrl: 'http://localhost:3000',
        fetch: mockFetch as unknown as typeof fetch,
      });

      expect(client).toBeDefined();
    });
  });

  describe('getApiBaseUrl', () => {
    it('should return a default URL when no environment variable is set', () => {
      const url = getApiBaseUrl();
      expect(typeof url).toBe('string');
      expect(url.length).toBeGreaterThan(0);
    });
  });
});
