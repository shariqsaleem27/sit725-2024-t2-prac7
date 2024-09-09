const express = require('express');
const router = express.Router();
const Cat = require('../model/Cat');

// Route to add a new cat
router.post('/cats', async (req, res) => {
  try {
    const { name, title, imageName, description } = req.body;
    const image = `${imageName}`; // Construct the image path

    const newCat = new Cat({ name, title, image, description });
    await newCat.save();

    res.status(201).json(newCat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add cat' });
  }
});

// Route to get all cats
router.get('/cats', async (req, res) => {
  try {
    const cats = await Cat.find();
    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get cats' });
  }
});

module.exports = router;
