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
import { RPCLink } from '@orpc/client/fetch';

describe('api-client', () => {
  describe('createClient', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should create an oRPC client with basic config', () => {
      const client = createClient({
        baseUrl: 'http://localhost:3000',
      });

      expect(client).toBeDefined();
      expect(typeof client).toBe('object');

      // Verify RPCLink was called with correct config
      expect(RPCLink).toHaveBeenCalledTimes(1);
      expect(RPCLink).toHaveBeenCalledWith({
        url: 'http://localhost:3000/rpc',
        headers: undefined,
        fetch: undefined,
      });
    });

    it('should create an oRPC client with headers', () => {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
      };

      const client = createClient({
        baseUrl: 'http://localhost:3000',
        headers,
      });

      expect(client).toBeDefined();

      // Verify RPCLink was called with headers
      expect(RPCLink).toHaveBeenCalledWith({
        url: 'http://localhost:3000/rpc',
        headers,
        fetch: undefined,
      });
    });

    it('should create an oRPC client with header function', () => {
      const headersFn = () => ({
        'Content-Type': 'application/json',
        Authorization: 'Bearer dynamic-token',
      });

      const client = createClient({
        baseUrl: 'http://localhost:3000',
        headers: headersFn,
      });

      expect(client).toBeDefined();

      // Verify RPCLink was called with header function
      expect(RPCLink).toHaveBeenCalledWith({
        url: 'http://localhost:3000/rpc',
        headers: headersFn,
        fetch: undefined,
      });
    });

    it('should create an oRPC client with custom fetch', () => {
      const mockFetch = jest.fn();
      const client = createClient({
        baseUrl: 'http://localhost:3000',
        fetch: mockFetch as unknown as typeof fetch,
      });

      expect(client).toBeDefined();

      // Verify RPCLink was called with custom fetch
      expect(RPCLink).toHaveBeenCalledWith({
        url: 'http://localhost:3000/rpc',
        headers: undefined,
        fetch: mockFetch,
      });
    });
  });

  describe('getApiBaseUrl', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...originalEnv };
    });

    afterAll(() => {
      process.env = originalEnv;
    });

    it('should return default URL when no environment variable is set', () => {
      delete process.env['NEXT_PUBLIC_API_URL'];
      delete process.env['EXPO_PUBLIC_API_URL'];

      expect(getApiBaseUrl()).toBe('http://localhost:4000');
    });

    it('should return NEXT_PUBLIC_API_URL when set', () => {
      process.env['NEXT_PUBLIC_API_URL'] = 'http://nextjs.example.com';
      delete process.env['EXPO_PUBLIC_API_URL'];

      expect(getApiBaseUrl()).toBe('http://nextjs.example.com');
    });

    it('should return EXPO_PUBLIC_API_URL when set and NEXT_PUBLIC_API_URL is not', () => {
      delete process.env['NEXT_PUBLIC_API_URL'];
      process.env['EXPO_PUBLIC_API_URL'] = 'http://expo.example.com';

      expect(getApiBaseUrl()).toBe('http://expo.example.com');
    });

    it('should prioritize NEXT_PUBLIC_API_URL over EXPO_PUBLIC_API_URL', () => {
      process.env['NEXT_PUBLIC_API_URL'] = 'http://nextjs.example.com';
      process.env['EXPO_PUBLIC_API_URL'] = 'http://expo.example.com';

      expect(getApiBaseUrl()).toBe('http://nextjs.example.com');
    });
  });
});
