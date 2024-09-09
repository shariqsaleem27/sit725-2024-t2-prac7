const request = require('supertest');
const app = require('../server');
const Cat = require('../model/Cat');

describe('Cat Routes', () => {
    beforeEach(async () => {
        await Cat.deleteMany({});
    });

    it('should GET all the cats', async () => {
        const res = await request(app).get('/api/cats');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBe(0);
    });

    it('should POST a new cat', async () => {
        const cat = {
            name: 'Whiskers',
            title: 'The Adventurer',
            imageName: 'cat1.jpeg',
            description: 'A brave explorer with a knack for finding hidden treats.'
        };

        const res = await request(app).post('/api/cats').send(cat);
        expect(res.statusCode).toBe(201);
        expect(res.body._id).toBeDefined();
        expect(res.body.name).toBe('Whiskers');
    });
});
