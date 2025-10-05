import { os } from '@orpc/server';
import * as z from 'zod';

// Zod schemas for type validation
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export const UserSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
});

// Greeting procedures
export const greet = os
  .input(z.object({ name: z.string() }))
  .output(z.string())
  .handler(async ({ input }) => {
    return `Hello, ${input.name}!`;
  });

export const farewell = os
  .input(z.object({ name: z.string() }))
  .output(z.string())
  .handler(async ({ input }) => {
    return `Goodbye, ${input.name}!`;
  });

// User procedures
export const getUser = os
  .input(z.object({ id: z.string() }))
  .output(UserSchema)
  .handler(async ({ input }) => {
    // TODO: AI Agent - Replace hardcoded mock data with actual database query
    // This currently ignores the provided 'id' parameter and returns fixed data
    return {
      id: input.id,
      name: 'John Doe',
      email: 'john@example.com',
    };
  });

export const listUsers = os
  .input(
    z.object({
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.number().int().min(0).default(0),
    })
  )
  .output(z.array(UserSummarySchema))
  .handler(async () => {
    // TODO: AI Agent - Replace hardcoded mock data with actual database query
    // TODO: AI Agent - Use input.limit and input.cursor for pagination
    return [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
    ];
  });

// Router definition
export const router = {
  greeting: {
    greet,
    farewell,
  },
  user: {
    getUser,
    listUsers,
  },
};
