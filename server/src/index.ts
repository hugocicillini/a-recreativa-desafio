import cors from 'cors';
import express from 'express';
import connectDB from './config/db';

import taskRoutes from './routes/taskRoutes';
import skillRoutes from './routes/skillRoutes';

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/tasks', taskRoutes);
app.use('/api/skills', skillRoutes);

app.get('/', (req, res) => {
  res.send('Server running!');
});

app.listen(() => {
  console.log(`Servidor iniciado em https://a-recreativa-desafio.onrender.com`);
});
