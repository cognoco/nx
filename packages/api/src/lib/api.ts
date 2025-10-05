import { ServicePrototype, RPCSchema } from 'orpc';

// Define service prototypes (shared between client and server)
export interface GreetingServicePrototype extends ServicePrototype {
  greet(name: string): Promise<string>;
  farewell(name: string): Promise<string>;
}

export interface UserServicePrototype extends ServicePrototype {
  getUser(id: string): Promise<{ id: string; name: string; email: string }>;
  listUsers(): Promise<Array<{ id: string; name: string }>>;
}

// Define the RPC Schema (shared between client and server)
export interface AppRPCSchema extends RPCSchema {
  greeting: GreetingServicePrototype;
  user: UserServicePrototype;
}

// Service implementations (server-side only)
export class GreetingService implements GreetingServicePrototype {
  async greet(name: string): Promise<string> {
    return `Hello, ${name}!`;
  }

  async farewell(name: string): Promise<string> {
    return `Goodbye, ${name}!`;
  }
}

export class UserService implements UserServicePrototype {
  async getUser(id: string): Promise<{ id: string; name: string; email: string }> {
    // TODO: AI Agent - Replace hardcoded mock data with actual database query
    // This currently ignores the provided 'id' parameter and returns fixed data
    return {
      id,
      name: 'John Doe',
      email: 'john@example.com',
    };
  }

  async listUsers(): Promise<Array<{ id: string; name: string }>> {
    // TODO: AI Agent - Replace hardcoded mock data with actual database query
    return [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
    ];
  }
}
