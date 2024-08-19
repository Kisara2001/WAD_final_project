require('dotenv').config(); // Ensure dotenv is configured
const mongoose = require('mongoose');
const Product = require('./models/productModel');  // Adjust the path if needed

console.log("MONGODB_URI:", process.env.MONGODB_URI);  // Log the URI to check if it's correct

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const products = [
  {
    productName: 'boAt Airdopes 111',
    brandName: 'boAt',
    category: 'airpodes',
    price: 49.99,
    sellingPrice: 39.99,
    description: 'High-quality wireless earbuds with noise-cancellation.',
    productImage: [
      '/assets/products/airpodes/boAt Airdopes 111 1.webp',
      '/assets/products/airpodes/boAt Airdopes 111 2.webp',
      '/assets/products/airpodes/boAt Airdopes 111 3.webp',
      '/assets/products/airpodes/boAt Airdopes 111 4.webp'
    ]
  },
  // Add more product objects here
];

Product.insertMany(products)
  .then(() => {
    console.log('Data inserted successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting data:', err);
    mongoose.connection.close();
  });
