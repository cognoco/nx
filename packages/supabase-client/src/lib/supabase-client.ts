import {
  createClient,
  SupabaseClient,
  SupabaseClientOptions,
} from '@supabase/supabase-js';
import type { Database } from './database.types.js';

/**
 * Storage adapter type for Supabase auth
 * Can be browser localStorage (default) or React Native AsyncStorage
 */
export interface StorageAdapter {
  getItem: (key: string) => Promise<string | null> | string | null;
  setItem: (key: string, value: string) => Promise<void> | void;
  removeItem: (key: string) => Promise<void> | void;
}

/**
 * Configuration options for creating a Supabase client
 */
export interface SupabaseConfig {
  /** Supabase project URL */
  url: string;
  /** Supabase anonymous key */
  anonKey: string;
  /** Custom storage adapter (e.g., AsyncStorage for React Native) */
  storage?: StorageAdapter;
  /** Additional Supabase client options */
  options?: Partial<SupabaseClientOptions<'public'>>;
}

/**
 * Creates a configured Supabase client instance
 *
 * @param config - Configuration options for the Supabase client
 * @returns A Supabase client instance with typed database schema
 *
 * @example
 * // Browser usage (default)
 * const supabase = createSupabaseClient({
 *   url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
 *   anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
 * });
 *
 * @example
 * // React Native usage with AsyncStorage
 * import AsyncStorage from '@react-native-async-storage/async-storage';
 *
 * const supabase = createSupabaseClient({
 *   url: process.env.EXPO_PUBLIC_SUPABASE_URL!,
 *   anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
 *   storage: AsyncStorage,
 * });
 */
export function createSupabaseClient(
  config: SupabaseConfig
): SupabaseClient<Database> {
  const { url, anonKey, storage, options = {} } = config;

  return createClient<Database>(url, anonKey, {
    ...options,
    auth: {
      ...(storage && { storage }),
      autoRefreshToken: true,
      persistSession: true,
      // Only detect session in URL when storage is not provided (default browser behavior)
      detectSessionInUrl: !storage,
      ...(options.auth || {}),
    },
  });
}

/**
 * Gets the Supabase URL from environment variables
 * Supports both Next.js and Expo naming conventions
 */
export function getSupabaseUrl(): string {
  if (typeof process !== 'undefined') {
    // Next.js or Node.js environment
    return (
      process.env['NEXT_PUBLIC_SUPABASE_URL'] ||
      process.env['EXPO_PUBLIC_SUPABASE_URL'] ||
      ''
    );
  }
  return '';
}

/**
 * Gets the Supabase anonymous key from environment variables
 * Supports both Next.js and Expo naming conventions
 */
export function getSupabaseAnonKey(): string {
  if (typeof process !== 'undefined') {
    // Next.js or Node.js environment
    return (
      process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] ||
      process.env['EXPO_PUBLIC_SUPABASE_ANON_KEY'] ||
      ''
    );
  }
  return '';
}
