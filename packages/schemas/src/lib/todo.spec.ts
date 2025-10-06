import {
  todoCreateSchema,
  todoUpdateSchema,
  todoDeleteSchema,
  todoGetSchema,
  todoListSchema,
  todoSchema,
} from './todo.js';

describe('todo schemas', () => {
  describe('todoCreateSchema', () => {
    it('should validate valid todo creation', () => {
      const validData = { text: 'Buy groceries' };
      expect(() => todoCreateSchema.parse(validData)).not.toThrow();
    });

    it('should reject empty text', () => {
      const invalidData = { text: '' };
      expect(() => todoCreateSchema.parse(invalidData)).toThrow();
    });

    it('should reject text that is too long', () => {
      const invalidData = { text: 'a'.repeat(501) };
      expect(() => todoCreateSchema.parse(invalidData)).toThrow();
    });

    it('should reject missing text', () => {
      const invalidData = {};
      expect(() => todoCreateSchema.parse(invalidData)).toThrow();
    });
  });

  describe('todoUpdateSchema', () => {
    it('should validate valid todo update with text', () => {
      const validData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        text: 'Updated text',
      };
      expect(() => todoUpdateSchema.parse(validData)).not.toThrow();
    });

    it('should validate valid todo update with completed', () => {
      const validData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        completed: true,
      };
      expect(() => todoUpdateSchema.parse(validData)).not.toThrow();
    });

    it('should validate valid todo update with both text and completed', () => {
      const validData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        text: 'Updated text',
        completed: true,
      };
      expect(() => todoUpdateSchema.parse(validData)).not.toThrow();
    });

    it('should reject invalid UUID', () => {
      const invalidData = {
        id: 'invalid-uuid',
        text: 'Updated text',
      };
      expect(() => todoUpdateSchema.parse(invalidData)).toThrow();
    });

    it('should reject missing id', () => {
      const invalidData = { text: 'Updated text' };
      expect(() => todoUpdateSchema.parse(invalidData)).toThrow();
    });
  });

  describe('todoDeleteSchema', () => {
    it('should validate valid todo deletion', () => {
      const validData = { id: '550e8400-e29b-41d4-a716-446655440000' };
      expect(() => todoDeleteSchema.parse(validData)).not.toThrow();
    });

    it('should reject invalid UUID', () => {
      const invalidData = { id: 'invalid-uuid' };
      expect(() => todoDeleteSchema.parse(invalidData)).toThrow();
    });
  });

  describe('todoGetSchema', () => {
    it('should validate valid todo get request', () => {
      const validData = { id: '550e8400-e29b-41d4-a716-446655440000' };
      expect(() => todoGetSchema.parse(validData)).not.toThrow();
    });

    it('should reject invalid UUID', () => {
      const invalidData = { id: 'invalid-uuid' };
      expect(() => todoGetSchema.parse(invalidData)).toThrow();
    });
  });

  describe('todoListSchema', () => {
    it('should validate valid todo list request with no filters', () => {
      const validData = {};
      const result = todoListSchema.parse(validData);
      expect(result.limit).toBe(50);
      expect(result.offset).toBe(0);
    });

    it('should validate valid todo list request with completed filter', () => {
      const validData = { completed: true };
      expect(() => todoListSchema.parse(validData)).not.toThrow();
    });

    it('should validate valid todo list request with limit and offset', () => {
      const validData = { limit: 10, offset: 20 };
      expect(() => todoListSchema.parse(validData)).not.toThrow();
    });

    it('should reject limit over 100', () => {
      const invalidData = { limit: 101 };
      expect(() => todoListSchema.parse(invalidData)).toThrow();
    });

    it('should reject negative offset', () => {
      const invalidData = { offset: -1 };
      expect(() => todoListSchema.parse(invalidData)).toThrow();
    });
  });

  describe('todoSchema', () => {
    it('should validate valid todo object', () => {
      const validData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        text: 'Buy groceries',
        completed: false,
        userId: 'user-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      expect(() => todoSchema.parse(validData)).not.toThrow();
    });

    it('should reject invalid UUID in id', () => {
      const invalidData = {
        id: 'invalid-uuid',
        text: 'Buy groceries',
        completed: false,
        userId: 'user-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      expect(() => todoSchema.parse(invalidData)).toThrow();
    });

    it('should reject missing required fields', () => {
      const invalidData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        text: 'Buy groceries',
      };
      expect(() => todoSchema.parse(invalidData)).toThrow();
    });
  });
});
