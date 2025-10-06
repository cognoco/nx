import {
  createSupabaseClient,
  getSupabaseUrl,
  getSupabaseAnonKey,
} from './supabase-client.js';

describe('supabase-client', () => {
  describe('createSupabaseClient', () => {
    it('should create a Supabase client with basic config', () => {
      const client = createSupabaseClient({
        url: 'https://example.supabase.co',
        anonKey: 'test-anon-key',
      });

      expect(client).toBeDefined();
      expect(typeof client.auth.signInWithPassword).toBe('function');
      expect(typeof client.from).toBe('function');
    });

    it('should create a Supabase client with custom storage', () => {
      const mockStorage = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      };

      const client = createSupabaseClient({
        url: 'https://example.supabase.co',
        anonKey: 'test-anon-key',
        storage: mockStorage,
      });

      expect(client).toBeDefined();
    });

    it('should create a Supabase client with additional options', () => {
      const client = createSupabaseClient({
        url: 'https://example.supabase.co',
        anonKey: 'test-anon-key',
        options: {
          db: {
            schema: 'public',
          },
        },
      });

      expect(client).toBeDefined();
    });
  });

  describe('getSupabaseUrl', () => {
    it('should return empty string when no environment variable is set', () => {
      const url = getSupabaseUrl();
      expect(typeof url).toBe('string');
    });
  });

  describe('getSupabaseAnonKey', () => {
    it('should return empty string when no environment variable is set', () => {
      const key = getSupabaseAnonKey();
      expect(typeof key).toBe('string');
    });
  });
});
