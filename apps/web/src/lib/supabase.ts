import {
  createSupabaseClient,
  getSupabaseUrl,
  getSupabaseAnonKey,
} from '@nx-test/supabase-client';

/**
 * Supabase client for web app
 *
 * @remarks
 * This is a placeholder implementation for Stage 1.4.
 * In Phase 2, this will be enhanced with:
 * - Server-side client using @supabase/ssr
 * - Client-side client for browser components
 * - Proper authentication handling
 *
 * @example
 * ```typescript
 * import { supabase } from './lib/supabase';
 *
 * const { data, error } = await supabase
 *   .from('profiles')
 *   .select('*');
 * ```
 */

const url = getSupabaseUrl();
const anonKey = getSupabaseAnonKey();

// Fail fast if environment variables are missing
if (!url || !anonKey) {
  throw new Error(
    '[Supabase] Missing required environment variables.\n' +
      'Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.\n' +
      'See: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs'
  );
}

/**
 * Supabase client instance
 * Uses shared configuration from @nx-test/supabase-client package
 */
export const supabase = createSupabaseClient({
  url,
  anonKey,
});

/**
 * Database type definitions
 * Re-exported from @nx-test/supabase-client for convenience
 */
export type { Database } from '@nx-test/supabase-client';
