import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';

/**
 * Placeholder AppRouter type
 * This will be replaced with the actual type from @nx-test/server once it's implemented
 */
export type AppRouter = {
  health: {
    handler: () => Promise<{ status: string }>;
  };
  todos: {
    list: {
      handler: () => Promise<Array<unknown>>;
    };
    create: {
      handler: (input: unknown) => Promise<unknown>;
    };
    update: {
      handler: (input: unknown) => Promise<unknown>;
    };
    delete: {
      handler: (input: unknown) => Promise<void>;
    };
  };
};

/**
 * Configuration options for creating an API client
 */
export interface ClientConfig {
  /** Base URL of the API server */
  baseUrl: string;
  /** Optional headers or function that returns headers */
  headers?:
    | Record<string, string>
    | (() => Record<string, string> | Promise<Record<string, string>>);
  /** Optional custom fetch implementation */
  fetch?: typeof fetch;
}

/**
 * Creates a type-safe oRPC client instance
 *
 * @param config - Configuration options for the client
 * @returns A typed oRPC client instance
 *
 * @example
 * // Web usage (Next.js)
 * const client = createClient({
 *   baseUrl: 'http://localhost:4000',
 *   headers: {
 *     'Content-Type': 'application/json',
 *   },
 * });
 *
 * @example
 * // With dynamic headers (for auth tokens)
 * const client = createClient({
 *   baseUrl: 'http://localhost:4000',
 *   headers: async () => {
 *     const token = await getAuthToken();
 *     return {
 *       'Authorization': `Bearer ${token}`,
 *       'Content-Type': 'application/json',
 *     };
 *   },
 * });
 */
export function createClient(
  config: ClientConfig
): ReturnType<typeof createORPCClient<AppRouter>> {
  const link = new RPCLink({
    url: `${config.baseUrl}/rpc`,
    headers: config.headers,
    fetch: config.fetch,
  });

  return createORPCClient<AppRouter>(link);
}

/**
 * Gets the API base URL from environment variables
 * Supports both Next.js and Expo naming conventions
 */
export function getApiBaseUrl(): string {
  if (typeof process !== 'undefined') {
    // Next.js or Node.js environment
    return (
      process.env['NEXT_PUBLIC_API_URL'] ||
      process.env['EXPO_PUBLIC_API_URL'] ||
      'http://localhost:4000'
    );
  }
  return 'http://localhost:4000';
}
