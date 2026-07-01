const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 🗄️ DATABASE SQLITE (Bikin file proxie_sticker.db otomatis)
const db = new sqlite3.Database('./proxie_sticker.db', (err) => {
    if (err) {
        console.error('Gagal terhubung ke database:', err.message);
    } else {
        console.log('⚡ Terhubung sukses ke Database SQLite (proxie_sticker.db)');
    }
});

// Membuat tabel pesanan otomatis
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            whatsapp TEXT NOT NULL,
            address TEXT NOT NULL,
            sticker_detail TEXT NOT NULL,
            total_price INTEGER NOT NULL,
            status TEXT DEFAULT 'Diproses',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

// 🌐 API ENDPOINTS

// 1. Customer kirim pesanan ke database
app.post('/api/orders', (req, res) => {
    const { customer_name, whatsapp, address, sticker_detail, total_price } = req.body;
    const query = `INSERT INTO orders (customer_name, whatsapp, address, sticker_detail, total_price) VALUES (?, ?, ?, ?, ?)`;
    
    db.run(query, [customer_name, whatsapp, address, sticker_detail, total_price], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true, orderId: this.lastID });
    });
});

// 2. Admin ambil semua data dari database (Udah support SELECT * / Ambil semua kolom)
app.get('/api/orders', (req, res) => {
    db.all(`SELECT * FROM orders ORDER BY id DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json(rows);
    });
});

// 3. Admin update status pesanan di database
app.put('/api/orders/:id/status', (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;
    const query = `UPDATE orders SET status = ? WHERE id = ?`;
    
    db.run(query, [status, orderId], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 🗄️ DATABASE SQLITE (Bikin file proxie_sticker.db otomatis)
const db = new sqlite3.Database('./proxie_sticker.db', (err) => {
    if (err) {
        console.error('Gagal terhubung ke database:', err.message);
    } else {
        console.log('⚡ Terhubung sukses ke Database SQLite (proxie_sticker.db)');
    }
});

// Membuat tabel pesanan otomatis
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            whatsapp TEXT NOT NULL,
            address TEXT NOT NULL,
            sticker_detail TEXT NOT NULL,
            total_price INTEGER NOT NULL,
            status TEXT DEFAULT 'Diproses',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

// 🌐 API ENDPOINTS

// 1. Customer kirim pesanan ke database
app.post('/api/orders', (req, res) => {
    const { customer_name, whatsapp, address, sticker_detail, total_price } = req.body;
    const query = `INSERT INTO orders (customer_name, whatsapp, address, sticker_detail, total_price) VALUES (?, ?, ?, ?, ?)`;
    
    db.run(query, [customer_name, whatsapp, address, sticker_detail, total_price], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true, orderId: this.lastID });
    });
});

// 2. Admin ambil semua data dari database (Udah support SELECT * / Ambil semua kolom)
app.get('/api/orders', (req, res) => {
    db.all(`SELECT * FROM orders ORDER BY id DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json(rows);
    });
});

// 3. Admin update status pesanan di database
app.put('/api/orders/:id/status', (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;
    const query = `UPDATE orders SET status = ? WHERE id = ?`;
    
    db.run(query, [status, orderId], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 SERVER PROXIE STICKER AKTIF! Jalankan: http://localhost:${PORT}`);
    console.log(`=======================================================`);
});

// 🟢 BARIS SAKTI TAMBAHAN KHUSUS VERCEL (TARUH PALING BAWAH):
module.exports = app;
    console.log(`=======================================================`);
    console.log(`🚀 SERVER PROXIE STICKER AKTIF! Jalankan: http://localhost:${PORT}`);
    console.log(`=======================================================`);
});