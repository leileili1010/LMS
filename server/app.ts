require('dotenv').config();
import express, {NextFunction, Request, Response} from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middleware/error';
import userRouter from './routes/user.route';

// body parser
app.use(express.json({limit: '50mb'}));

// cookie parser
app.use(cookieParser());

// cors
app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );

// routes
app.use('/api/v1/', userRouter)


// testing api
app.get('/test', (req:Request, res:Response, next:NextFunction) => {
  res.status(200).json({
        success: true,
        message: 'API is working fine'
    });
});

app.all("*", (req:Request, res:Response, next:NextFunction) => {
    const err = new Error(`Route not found - ${req.originalUrl}`) as any;
    err.statusCode = 404;
    next(err);
});

app.use(ErrorMiddleware)