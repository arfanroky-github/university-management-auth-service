import express, { Application,  Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// applicaiton route
app.use('/api/v1/users', UserRoutes);

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello from university managment!');
});
app.use(globalErrorHandler);

export default app;
