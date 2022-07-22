import app from '../routes/index';
import request from 'supertest';
import { closeInstance } from '../config/redis';
import { authenticate } from '../services/user';

const token = `Bearer ${authenticate({ username: 'admin', password: 'adminpassword' })}`;
console.log('>>>token', token);
describe('Employees summary statistics', () => {
  afterAll(() => {
    closeInstance();
  });

  describe('GET /employee/statistics', () => {
    test('should respond with status 200', async () => {
      const response = await request(app).get('/employee/statistics').set({ Authorization: token });
      expect(response.statusCode).toBe(200);
    });
  
    test('should return salary statistics of all employees', async () => {
      const response = await request(app).get('/employee/statistics').set({ Authorization: token });
      const { min, max, mean } = response.body;
      expect(min).toEqual(30);
      expect(max).toEqual(200000000);
      expect(mean).toEqual(20073009);
    });
  });
  
  describe('GET /employee/statistics/contracted', () => {
    test('should respond with status 200', async () => {
      const response = await request(app).get('/employee/statistics/contracted').set({ Authorization: token });
      expect(response.statusCode).toBe(200);
    });
  
    test('should return salary statistics of all contracted employees', async () => {
      const response = await request(app).get('/employee/statistics/contracted').set({ Authorization: token });
      const { min, max, mean } = response.body;
      expect(min).toEqual(90000);
      expect(max).toEqual(110000);
      expect(mean).toEqual(100000);
    });
  });

  describe('GET /employee/statistics/department', () => {
    test('should respond with status 200', async () => {
      const response = await request(app).get('/employee/statistics/department').set({ Authorization: token });
      expect(response.statusCode).toBe(200);
    });
  
    test('should return salary statistics by department', async () => {
      const response = await request(app).get('/employee/statistics/department').set({ Authorization: token });
      expect(Object.keys(response.body)).toStrictEqual(['Engineering', 'Banking', 'Operations', 'Administration']);

      const { Engineering, Banking, Operations, Administration } = response.body;
      expect(Engineering.min).toEqual(30);
      expect(Engineering.max).toEqual(200000000);
      expect(Engineering.mean).toEqual(33428338.33);

      expect(Banking.min).toEqual(90000);
      expect(Banking.max).toEqual(90000);
      expect(Banking.mean).toEqual(90000);

      expect(Operations.min).toEqual(30);
      expect(Operations.max).toEqual(70000);
      expect(Operations.mean).toEqual(35015);

      expect(Administration.min).toEqual(30);
      expect(Administration.max).toEqual(30);
      expect(Administration.mean).toEqual(30);
    });
  });
});

