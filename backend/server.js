import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import connectDB from './config/db.js';
import { errorHandler } from './middlewares/error.handler.js';
import userRoutes from './routes/user.routes.js';

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

app.use(morgan('dev'));
app.use(express.json());

if (NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );
}

app.use('/api/v1/users', userRoutes);

app.use(errorHandler);

if (NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Mode => ${NODE_ENV}`);
  });
});

export default app;
