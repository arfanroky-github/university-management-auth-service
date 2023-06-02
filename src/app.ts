import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import userRouter from './app/modules/user/user.route';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// applicaiton route
app.use('/api/v1/users', userRouter);

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
