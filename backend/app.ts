import{Server} from "http";
import express from "express";
import dotenv from 'dotenv';
import dbConnection from "./config/BD";
import mountRoutes from './routes';
import cors from 'cors';
import mongoose from 'mongoose';
const app: express.Application = express();
dotenv.config()
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:4200,http://localhost:4201')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origin is not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-API-KEY'],
  credentials: true
}))

app.use(express.static('uploads'));
app.use(express.json());
app.get('/health', (_req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;
  res.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? 'ok' : 'database unavailable'
  });
});
dbConnection()
mountRoutes(app)
let server: Server;
const port = Number(process.env.PORT) || 3000;
server = app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})

process.on('unhandledRejection', (err: Error) => {
  console.error(`unhandledRejection Error : ${err.name} | ${err.message}`);
  server.close(() => {
    console.error('Application is shutting down...')
    process.exit(1);
  })

})



