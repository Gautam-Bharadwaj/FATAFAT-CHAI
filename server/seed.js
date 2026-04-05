/**
 * Seed sample products if the products collection is empty.
 * Run: node seed.js (from server directory, with MONGO_URI set)
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/fatafat-chai';

const samples = [
  {
    name: 'Masala Chai',
    price: 450,
    description:
      'The classic 7-spice blend. Ginger, cardamom, and clove dance in a cup of strong Assam tea.',
    image: '/assets/masala-chai.png',
    category: 'Classic',
    stock: 100,
  },
  {
    name: 'Elaichi Chai',
    price: 450,
    description:
      'Pure, aromatic green cardamom. Sweet, floral, and incredibly refreshing.',
    image: '/assets/elaichi-chai.png',
    category: 'Bestseller',
    stock: 120,
  },
  {
    name: 'Adrak Chai',
    price: 420,
    description:
      'Fresh ginger root extract for that perfect morning kick. Spicy and invigorating.',
    image: '/assets/adrak-chai.png',
    category: 'Classic',
    stock: 90,
  },
  {
    name: 'Kesar Chai',
    price: 550,
    description:
      'Royal saffron strands blended with cardamom. A golden cup of luxury for special moments.',
    image: '/assets/kesar-chai.png',
    category: 'Premium',
    stock: 60,
  },
  {
    name: 'Tulsi Chai',
    price: 420,
    description:
      'Healing Holy Basil leaves with a touch of spice. An immunity-boosting herbal embrace.',
    image: '/assets/tulsi-chai.png',
    category: 'Herbal',
    stock: 80,
  },
  {
    name: 'Chocolate Chai',
    price: 480,
    description:
      'Rich dark cocoa meets spicy chai. A modern fusion that tastes like a warm hug.',
    image: '/assets/chocolate-chai.png',
    category: 'Fusion',
    stock: 70,
  },
  {
    name: 'Mumbai Cutting',
    price: 400,
    description: 'Strong, kadak cutting chai — tapri style.',
    image: '/assets/masala-chai.png',
    category: 'Regional',
    stock: 110,
  },
  {
    name: 'Kolkata Bhar',
    price: 410,
    description: 'Light, milky sweetness with a hint of elaichi.',
    image: '/assets/elaichi-chai.png',
    category: 'Regional',
    stock: 95,
  },
  {
    name: 'Jaipur Masala',
    price: 460,
    description: 'Royal Rajasthani spice forward blend.',
    image: '/assets/masala-chai.png',
    category: 'Regional',
    stock: 85,
  },
  {
    name: 'Assam Gold',
    price: 380,
    description: 'Single-origin strong Assam for the purist.',
    image: '/assets/chai-pouch-premium.png',
    category: 'Classic',
    stock: 150,
  },
];

async function run() {
  await mongoose.connect(MONGO_URI);
  const count = await Product.countDocuments();
  if (count > 0) {
    console.log('⚠️ Data already seeded, skipping');
    await mongoose.disconnect();
    process.exit(0);
  }
  await Product.insertMany(samples);
  console.log(`✅ Inserted ${samples.length} sample products`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
