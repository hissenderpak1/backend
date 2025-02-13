const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'shop_management'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.post('/users', (req, res) => {
    const { user_name, user_email, password, user_role } = req.body;
    const sql = 'INSERT INTO users (user_name, user_email, password, user_role) VALUES (?, ?, ?, ?)';
    db.query(sql, [user_name, user_email, password, user_role], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User created successfully', userId: result.insertId });
    });
});

app.post('/shops', (req, res) => {
    const { userId, shop_name, shop_description, logo_url, contact_info } = req.body;
    const sql = 'INSERT INTO service (userId, shop_name, shop_description, logo_url, contact_info) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [userId, shop_name, shop_description, logo_url, contact_info], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Shop created successfully', shopId: result.insertId });
    });
});

app.post('/products', (req, res) => {
    const { shopId, product_name, product_description, price, stock, image_url } = req.body;
    const sql = 'INSERT INTO products (shopId, product_name, product_description, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [shopId, product_name, product_description, price, stock, image_url], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product added successfully', productId: result.insertId });
    });
});

app.post('/payments', (req, res) => {
    const { userId, shopId, amount, payment_method, status } = req.body;
    const sql = 'INSERT INTO payments (userId, shopId, amount, payment_method, status) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [userId, shopId, amount, payment_method, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Payment recorded successfully', paymentId: result.insertId });
    });
});

app.post('/reviews', (req, res) => {
    const { userId, shopId, rating, comment } = req.body;
    const sql = 'INSERT INTO reviews (userId, shopId, rating, comment) VALUES (?, ?, ?, ?)';
    db.query(sql, [userId, shopId, rating, comment], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Review submitted successfully', reviewId: result.insertId });
    });
});

app.post('/loans', (req, res) => {
    const { userId, shopId, amount, status } = req.body;
    const sql = 'INSERT INTO loans (userId, shopId, amount, status) VALUES (?, ?, ?, ?)';
    db.query(sql, [userId, shopId, amount, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Loan request submitted', loanId: result.insertId });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
