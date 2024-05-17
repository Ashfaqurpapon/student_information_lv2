import { Application, Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import { StudentRoutes } from './app/config/modules/student/student_route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application route
app.use('/api/v1/students', StudentRoutes);

const getAController = (req: Request, res: Response) => {
  let a = 10;
  res.send(a);
};

app.get('/', getAController);

export default app;
