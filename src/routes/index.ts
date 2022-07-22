import express from 'express';
import authRoute from './auth';
import employeeRoute from './employee';

const app = express();

app.use('/auth', authRoute);
app.use('/employee', employeeRoute);

export default app;
