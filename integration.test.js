const request = require('supertest');
const app = require('./server'); // Ensure this path points to your server.js
const Cat = require('./model/Cat'); // Ensure this path points to your Cat model
const mongoose = require('mongoose');

describe('Cat API Integration Tests', () => {
    // Connect to the MongoDB Atlas database before all tests
    beforeAll(async () => {
        const url = `mongodb+srv://shariqsaleem06:UrV1I9fkbzVQsQ8m@cluster0.hmdoch7.mongodb.net/test_database?retryWrites=true&w=majority&appName=Cluster0`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    // Clean up the database before each test
    beforeEach(async () => {
        await Cat.deleteMany({});
    });

    // Close the database connection after all tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create and retrieve a cat', async () => {
        // Step 1: Create a new cat
        const catData = {
            name: 'Tom',
            title: 'The Chaser',
            imageName: 'tom.jpeg',
            description: 'A playful cat who loves to chase mice.'
        };

        const postRes = await request(app).post('/api/cats').send(catData);
        expect(postRes.statusCode).toBe(201);
        expect(postRes.body._id).toBeDefined();
        expect(postRes.body.name).toBe('Tom');

        const createdCatId = postRes.body._id;

        // Step 2: Retrieve the created cat by ID
        const getRes = await request(app).get(`/api/cats/${createdCatId}`);
        expect(getRes.statusCode).toBe(200);
        expect(getRes.body._id).toBe(createdCatId);
        expect(getRes.body.name).toBe('Tom');
    });

    it('should return an error when trying to retrieve a non-existent cat', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/api/cats/${nonExistentId}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe('Cat not found');
    });

    it('should delete a cat', async () => {
        // Step 1: Create a new cat
        const catData = {
            name: 'Jerry',
            title: 'The Runner',
            imageName: 'jerry.jpeg',
            description: 'A clever cat who always escapes.'
        };

        const postRes = await request(app).post('/api/cats').send(catData);
        expect(postRes.statusCode).toBe(201);
        const createdCatId = postRes.body._id;

        // Step 2: Delete the created cat
        const deleteRes = await request(app).delete(`/api/cats/${createdCatId}`);
        expect(deleteRes.statusCode).toBe(200);
        expect(deleteRes.body.message).toBe('Cat deleted successfully');

        // Step 3: Try to retrieve the deleted cat (should return 404)
        const getRes = await request(app).get(`/api/cats/${createdCatId}`);
        expect(getRes.statusCode).toBe(404);
        expect(getRes.body.error).toBe('Cat not found');
    });
});
