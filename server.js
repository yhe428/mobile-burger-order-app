const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());


const MONGO_URI = 'mongodb://localhost:27017/mealsDatabase';


mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


const mealSchema = new mongoose.Schema({
  id: String,
  title: String,
  desc: String,
  price: Number,
  img: String
});

const Meal = mongoose.model('Meal', mealSchema);


app.get('/api/meals', async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
});


const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
