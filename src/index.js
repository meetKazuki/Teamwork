import { config } from 'dotenv';
import debug from 'debug';
import express from 'express';
import router from './routes';

config();

const app = express();
const DEBUG = debug('dev');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to Teamwork' });
});

app.all('*', (req, res) => {
  res.status(404).json({ error: 'endpoint doesn\'t exist' });
});

const port = process.env.NODE_ENV === 'test' ? 6378 : process.env.PORT || 3000;
app.listen(port, () => DEBUG(`server running on ${port}`));

export default app;
