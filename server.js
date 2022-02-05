import http from 'http';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config(); // dotevn 라이브러리 사용
const prisma = new PrismaClient();

import routes from './routes';

const PORT = process.env.PORT;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// route
app.use(routes);

// server test
app.use('/ping', (req, res) => {
  return res.status(200).json({ message: 'pong' });
});

// create server
const server = http.createServer(app);

// run my server
const serverStart = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`server is listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
  }
};

serverStart();
