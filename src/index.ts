import express from 'express';
import routes from './routes';
import setupInitialData from './config/data';

const app = express();

app.use(express.json());
app.use(routes);

setupInitialData();

app.listen(3000, () => console.log('>>>Server running at 3000'));
