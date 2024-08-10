const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
    it('應該回應 Hello World!', async () => {
        const response = await request(app).get('/');
        console.log('Response:', response.text);
        
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Hello World!');
    });
});
