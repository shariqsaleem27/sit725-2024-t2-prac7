const Cat = require('../model/Cat');

describe('Cat Model', () => {
    it('should be invalid if name, title, image, or description is empty', () => {
        const cat = new Cat();

        const validationError = cat.validateSync();
        expect(validationError.errors.name).toBeDefined();
        expect(validationError.errors.title).toBeDefined();
        expect(validationError.errors.image).toBeDefined();
        expect(validationError.errors.description).toBeDefined();
    });

    it('should save a valid cat', async () => {
        const cat = new Cat({ 
            name: 'Whiskers', 
            title: 'The Adventurer', 
            image: 'cat1.jpeg', 
            description: 'A brave explorer with a knack for finding hidden treats.'
        });

        const savedCat = await cat.save();
        expect(savedCat._id).toBeDefined();
        expect(savedCat.name).toBe('Whiskers');
    });
});
