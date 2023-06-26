import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
// import { generateFacultyId, generateStudentId } from './app/modules/user/user.utils';
// import { generateStudentId } from './app/modules/user/user.utils';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(routes)

// applicaiton route
app.use('/api/v1/', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from university managment!');
});
app.use(globalErrorHandler);

/// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: ' not found',
    errorMessages: [
      {
        path: req.url,
        message: 'Requested url not found',
      },
    ],
  });
  next();
});


export default app;
