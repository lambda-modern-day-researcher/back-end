const request = require('supertest');

const server = require('./server');
const db = require('../database/dbConfig');

describe('server', () => {

    describe('register', () => {
        it('should send back an arry', () => {
            request(server)
                .post('/api/auth/login')
                .send({
                    email: 'random@gmail.com',
                    username: 'random user',
                    password: '1234'
                })
                .then(res => {
                    expect(Array.isArray(res)).toBe(true)
                })
        })
    })

    describe('login', () => {
        it('should send back a token', () => {
            request(server)
                .post('/api/auth/login')
                .send({
                    username: 'random user',
                    password: '1234'
                })
                .then(res => {
                    expect(typeof(res.token)).toBe('string')
                })
        })
    })

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
                    expect(res.message).toBe('link added successfully')
                })
        })
    })

    describe('link', () => {
        it('should toggle is_pinned state', () => {
            request(server)
                .put('/api/aut/users/2/links/2/pinne')
                .then(res => {
                    expect(res.message).toBe('lin')
                })
        })
    })

    describe('link', () => {
        it('should toggle completed state', () => {
            request(server)
                .put('/api/auth/users/2/links/2/completed')
                .then(res => {
                    expect(res.message).toBe('link updated')
                })
        })
    })

    describe('link', () => {
        it('should update the title', () => {
            request(server)
                .post('/api/auth/users/2/links/2/title')
                .send({
                    title: 'newTitle'
                })
                .then(res => {
                    expect(res.message).toBe('title updated')
                })
        })
    })

    describe('link', () => {
        it('should send back an array of links', () => {
            request(server)
                .get('/api/auth/users/')
                .then(res => {
                    expect(Array.isArray(res)).toBe(true)
                })
        })
    })
    
})