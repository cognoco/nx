import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import { RPCHandler } from '@orpc/server/node';
import { router } from './router';

const host = process.env['HOST'] ?? 'localhost';
const port = process.env['PORT'] ? Number(process.env['PORT']) : 4000;

const app = express();

// Enable CORS for web clients
app.use(cors());

// Create oRPC handler
const rpcHandler = new RPCHandler(router);

// Health check endpoint
app.get('/', (req, res) => {
  res.send({ message: 'Server is running', version: '1.0.0' });
});

// oRPC endpoint
app.use('/rpc*', async (req, res, next) => {
  try {
    const { matched } = await rpcHandler.handle(req, res, {
      prefix: '/rpc',
      context: {
        headers: req.headers,
        // TODO: Add authentication middleware to extract userId from JWT
        // For now, userId will be undefined (all requests will be unauthorized)
        userId: undefined,
      },
    });

    if (matched) return;
    next();
  } catch (error) {
    console.error('RPC handler error:', error);
    next(error);
  }
});

// Global error handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    ...(process.env['NODE_ENV'] !== 'production' && { details: err.message }),
  });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
  console.log(`[ oRPC ] http://${host}:${port}/rpc`);
});
