import { GreetingService, UserService } from './api';

describe('oRPC Services', () => {
  describe('GreetingService', () => {
    let service: GreetingService;

    beforeEach(() => {
      service = new GreetingService();
    });

    it('should greet with provided name', async () => {
      const result = await service.greet('World');
      expect(result).toEqual('Hello, World!');
    });

    it('should farewell with provided name', async () => {
      const result = await service.farewell('World');
      expect(result).toEqual('Goodbye, World!');
    });
  });

  describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
      service = new UserService();
    });

    it('should get user by id', async () => {
      const result = await service.getUser('123');
      expect(result).toEqual({
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
      });
    });

    it('should list users', async () => {
      const result = await service.listUsers();
      expect(result).toEqual([
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
      ]);
    });
  });
});
