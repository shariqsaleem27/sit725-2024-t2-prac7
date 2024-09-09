const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Cat', catSchema);
