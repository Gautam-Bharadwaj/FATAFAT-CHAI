const express = require('express');
const router = express.Router();

const products = [
    { id: 'masala-chai', name: 'Masala Chai', price: 450, description: 'The classic 7-spice blend. Ginger, cardamom, and clove dance in a cup of strong Assam tea.', image: '/assets/masala-chai.png', category: 'Classic' },
    { id: 'elaichi-chai', name: 'Elaichi Chai', price: 450, description: 'Pure, aromatic green cardamom. Sweet, floral, and incredibly refreshing.', image: '/assets/elaichi-chai.png', category: 'Bestseller' },
    { id: 'adrak-chai', name: 'Adrak Chai', price: 420, description: 'Fresh ginger root extract for that perfect morning kick. Spicy and invigorating.', image: '/assets/adrak-chai.png', category: 'Classic' },
    { id: 'kesar-chai', name: 'Kesar Chai', price: 550, description: 'Royal saffron strands blended with cardamom. A golden cup of luxury for special moments.', image: '/assets/kesar-chai.png', category: 'Premium' },
    { id: 'tulsi-chai', name: 'Tulsi Chai', price: 420, description: 'Healing Holy Basil leaves with a touch of spice. An immunity-boosting herbal embrace.', image: '/assets/tulsi-chai.png', category: 'Herbal' },
    { id: 'chocolate-chai', name: 'Chocolate Chai', price: 480, description: 'Rich dark cocoa meets spicy chai. A modern fusion that tastes like a warm hug.', image: '/assets/chocolate-chai.png', category: 'Fusion' }
];

router.get('/', (req, res) => {
    res.json(products);
});

router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

module.exports = router;
