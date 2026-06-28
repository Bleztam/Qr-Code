import express from 'express';
import cors from 'cors';
import { db } from './db';

const app = express();

app.use(cors());
app.use(express.json());

// GET all menu items
app.get('/api/menu', (req, res) => {
  db.all('SELECT * FROM menu_items', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // SQLite returns booleans as 0 or 1. We need to convert them back to boolean
    const formattedRows = rows.map((row: any) => ({
      ...row,
      inStock: row.inStock === 1,
      custom: row.custom === 1,
    }));
    res.json(formattedRows);
  });
});

// POST a new menu item
app.post('/api/menu', (req, res) => {
  const { id, name, description, price, category, image, inStock, custom } = req.body;
  const stmt = db.prepare('INSERT INTO menu_items VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  stmt.run(id, name, description, price, category, image, inStock ? 1 : 0, custom ? 1 : 0, function (err: any) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true, id });
  });
  stmt.finalize();
});

// PUT (update) an existing menu item
app.put('/api/menu/:id', (req, res) => {
  const { name, description, price, category, image, inStock, custom } = req.body;
  const id = req.params.id;
  const stmt = db.prepare(`
    UPDATE menu_items 
    SET name = ?, description = ?, price = ?, category = ?, image = ?, inStock = ?, custom = ?
    WHERE id = ?
  `);
  stmt.run(name, description, price, category, image, inStock ? 1 : 0, custom ? 1 : 0, id, function (err: any) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
  stmt.finalize();
});

// DELETE a menu item
app.delete('/api/menu/:id', (req, res) => {
  const id = req.params.id;
  const stmt = db.prepare('DELETE FROM menu_items WHERE id = ?');
  stmt.run(id, function (err: any) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
  stmt.finalize();
});

// For local testing
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const port = process.env.PORT || 3002;
  app.listen(port, () => {
    console.log(`Server running locally on port ${port}`);
  });
}

// Export for Vercel Serverless Function
export default app;
