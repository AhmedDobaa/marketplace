var chai= require('chai');

const request= require('supertest');
const app= require('../server');

   describe('Get /users', () =>{
    it('return list', () =>{
        return request(app)
        .get('/users/login/')
        .send({
            "password": "9559",
            "mobile_number": "01013848809"
        })
        .expect(200)
    }) 
})

describe('Post /users', () =>{
    it('return list', () =>{
        return request(app)
        .post('/users/register/')
        .send({
            "user_name": "ahmed",
            "password": "9559",
            "mobile_number": "01013848809"
        })
        .expect(200)
    }) 
})