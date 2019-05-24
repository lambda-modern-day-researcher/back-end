const request = require('supertest');

const server = require('./server');
const db = require('../database/dbConfig');

describe('server', () => {

    //working
    describe('register', () => {
        it('should send back an arry', () => {
            request(server)
                .post('/api/auth/register')
                .send({
                    email: 'random@gmail.com',
                    username: 'random user2',
                    password: '1234'
                })
                .then(res => {
                    expect(typeof(res)).toBe('object')
                })
        })
    })

    //working
    describe('login', () => {
        it('should send back a token', () => {
            request(server)
                .post('/api/auth/login')
                .send({
                    username: 'random user1',
                    password: '1234'
                })
                .then(res => {
                    expect(res.status).toBe(200);
                })
        })
    })

    //working
    describe('link', () => {
        it('should add a link', () => {
            request(server)
                .post('/api/auth/users/1/links')
                .send({
                    title: 'someTitle',
                    url: 'https//www.random.com',
                    created_by: '1',
                    shared_with: '1'
                })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
    })

    //working
    describe('link', () => {
        it('should toggle is_pinned state', () => {
            return request(server)
                .put('/api/auth/users/2/links/2/pinned')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
    })

    //working
    describe('link', () => {
        it('should toggle completed state', () => {
            return request(server)
                .put('/api/auth/users/2/links/2/completed')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
    })

    //working
    describe('link', () => {
        it('should update the title', () => {
            return request(server)
                .put('/api/auth/users/2/links/2/title')
                .send({
                    title: 'newTitle'
                })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
    })


    describe('link', () => {
        it('should send back an array of links', () => {
            return request(server)
                .get('/api/auth/users/1/links')
                .then(res => {
                    expect(res.text).toBe(true)
                })
        })
    })
    
})
