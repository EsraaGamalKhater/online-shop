import{Server} from "http";
import express from "express";
import dotenv from 'dotenv';
import dbConnection from "./config/BD";
import mountRoutes from './routes';
import cors from 'cors';
const app: express.Application = express();
dotenv.config()
app.use(cors({
  origin: ['http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-API-KEY'],
  credentials: true
}))

app.use(express.static('uploads'));
app.use(express.json());
dbConnection()
mountRoutes(app)
let server: Server;
server = app.listen(process.env.PORT, () => {
  console.log(`App is listen on port ${process.env.PORT}`);
})

process.on('unhandledRejection', (err: Error) => {
  console.error(`unhandledRejection Error : ${err.name} | ${err.message}`);
  server.close(() => {
    console.error('Application is shutting down...')
    process.exit(1);
  })

})



