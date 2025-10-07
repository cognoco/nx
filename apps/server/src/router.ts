import { os } from '@orpc/server';
import { prisma } from '@nx-test/database';
import {
  todoCreateSchema,
  todoUpdateSchema,
  todoDeleteSchema,
  todoGetSchema,
  todoListSchema,
} from '@nx-test/schemas';

/**
 * Base procedure with typed error definitions
 */
const base = os.errors({
  UNAUTHORIZED: {
    status: 401,
    message: 'Authentication required',
  },
  NOT_FOUND: {
    status: 404,
    message: 'Resource not found',
  },
});

/**
 * Health check endpoint
 */
const healthHandler = os.handler(() => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

/**
 * List todos endpoint
 */
const listTodosHandler = base
  .input(todoListSchema)
  .handler(async ({ input, context, errors }) => {
    const userId = (context as { userId?: string }).userId;

    if (!userId) {
      throw errors.UNAUTHORIZED();
    }

    const todos = await prisma.todo.findMany({
      where: {
        userId,
        ...(input.completed !== undefined && { completed: input.completed }),
      },
      take: input.limit,
      skip: input.offset,
      orderBy: { createdAt: 'desc' },
    });

    return todos;
  });

/**
 * Get single todo endpoint
 */
const getTodoHandler = base
  .input(todoGetSchema)
  .handler(async ({ input, context, errors }) => {
    const userId = (context as { userId?: string }).userId;

    if (!userId) {
      throw errors.UNAUTHORIZED();
    }

    const todo = await prisma.todo.findFirst({
      where: {
        id: input.id,
        userId,
      },
    });

    if (!todo) {
      throw errors.NOT_FOUND();
    }

    return todo;
  });

/**
 * Create todo endpoint
 */
const createTodoHandler = base
  .input(todoCreateSchema)
  .handler(async ({ input, context, errors }) => {
    const userId = (context as { userId?: string }).userId;

    if (!userId) {
      throw errors.UNAUTHORIZED();
    }

    const todo = await prisma.todo.create({
      data: {
        text: input.text,
        userId,
      },
    });

    return todo;
  });

/**
 * Update todo endpoint
 */
const updateTodoHandler = base
  .input(todoUpdateSchema)
  .handler(async ({ input, context, errors }) => {
    const userId = (context as { userId?: string }).userId;

    if (!userId) {
      throw errors.UNAUTHORIZED();
    }

    // Verify todo ownership
    const existingTodo = await prisma.todo.findFirst({
      where: {
        id: input.id,
        userId,
      },
    });

    if (!existingTodo) {
      throw errors.NOT_FOUND();
    }

    const todo = await prisma.todo.update({
      where: { id: input.id },
      data: {
        ...(input.text !== undefined && { text: input.text }),
        ...(input.completed !== undefined && { completed: input.completed }),
      },
    });

    return todo;
  });

/**
 * Delete todo endpoint
 */
const deleteTodoHandler = base
  .input(todoDeleteSchema)
  .handler(async ({ input, context, errors }) => {
    const userId = (context as { userId?: string }).userId;

    if (!userId) {
      throw errors.UNAUTHORIZED();
    }

    // Verify todo ownership
    const existingTodo = await prisma.todo.findFirst({
      where: {
        id: input.id,
        userId,
      },
    });

    if (!existingTodo) {
      throw errors.NOT_FOUND();
    }

    await prisma.todo.delete({
      where: { id: input.id },
    });

    return { success: true };
  });

/**
 * Main oRPC router
 */
export const router = {
  health: healthHandler,
  todos: {
    list: listTodosHandler,
    get: getTodoHandler,
    create: createTodoHandler,
    update: updateTodoHandler,
    delete: deleteTodoHandler,
  },
};

/**
 * AppRouter type for client type-safety
 */
export type AppRouter = typeof router;
