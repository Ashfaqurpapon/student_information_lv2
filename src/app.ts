import { Application, Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  let a = 10;

  res.send(a);
});

export default app;
