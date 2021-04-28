var chai= require('chai');

const request= require('supertest');
const app= require('../server');
var accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQyLCJ1c2VyTmFtZSI6ImFobWVkIiwibW9iaWxlTnVtYmVyIjoiMDEwMTM4NDg4MDkiLCJpYXQiOjE2MTk2MDgxMDgsImV4cCI6MTYyODI0ODEwOH0.gX4oeDXru_FvcHg_YArqHyxQQ4vVu0IifJorcrqjh-Y';

describe('Get /products', () =>{
    it('return list', () =>{
        return request(app)
        .get('/products/getAllProducts')
        .set({ "token": `${accessToken}`})
        .expect(200)
    }) 
})