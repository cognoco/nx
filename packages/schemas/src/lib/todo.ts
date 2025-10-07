import { z } from 'zod';

/**
 * Schema for creating a new todo
 */
export const todoCreateSchema = z.object({
  text: z
    .string()
    .min(1, 'Todo text cannot be empty')
    .max(500, 'Todo text is too long'),
});

export type TodoCreate = z.infer<typeof todoCreateSchema>;

/**
 * Schema for updating an existing todo
 */
export const todoUpdateSchema = z.object({
  id: z.string().uuid('Invalid todo ID'),
  text: z
    .string()
    .min(1, 'Todo text cannot be empty')
    .max(500, 'Todo text is too long')
    .optional(),
  completed: z.boolean().optional(),
});

export type TodoUpdate = z.infer<typeof todoUpdateSchema>;

/**
 * Schema for deleting a todo
 */
export const todoDeleteSchema = z.object({
  id: z.string().uuid('Invalid todo ID'),
});

export type TodoDelete = z.infer<typeof todoDeleteSchema>;

/**
 * Schema for getting a single todo
 */
export const todoGetSchema = z.object({
  id: z.string().uuid('Invalid todo ID'),
});

export type TodoGet = z.infer<typeof todoGetSchema>;

/**
 * Schema for listing todos with optional filters
 */
export const todoListSchema = z.object({
  completed: z.boolean().optional(),
  limit: z.number().int().positive().max(100).optional().default(50),
  offset: z.number().int().nonnegative().optional().default(0),
});

export type TodoList = z.infer<typeof todoListSchema>;

/**
 * Schema for todo response
 */
export const todoSchema = z.object({
  id: z.string().uuid(),
  text: z.string(),
  completed: z.boolean(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Todo = z.infer<typeof todoSchema>;
