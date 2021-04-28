var chai= require('chai');

const request= require('supertest');
const app= require('../server');
var accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwLCJ1c2VyTmFtZSI6ImFobWVkIiwibW9iaWxlTnVtYmVyIjoiMDEwMTM4NDg4MDkiLCJ1c2VyQmFsYW5jZSI6MTAwMCwiaWF0IjoxNjE5NTcyMDczLCJleHAiOjE2MTk2NTg0NzN9.q4ASUXRDC6x9P-f4XUb_AxydL_0P7mYJL-horYgH18s';

describe('Get /products', () =>{
    it('return list', () =>{
        return request(app)
        .get('/products/getAllProducts')
        .set({ "token": `${accessToken}`})
        .expect(200)
    }) 
})