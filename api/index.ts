import express from 'express';
import cors from 'cors';
import { sql } from './db.js';

const app = express();

app.use(cors());
app.use(express.json());



// GET all menu items
app.get('/api/menu', async (req, res) => {
  try {
    const rows = await sql`SELECT * FROM menu_items`;
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new menu item
app.post('/api/menu', async (req, res) => {
  const { id, name, description, price, category, image, inStock, custom } = req.body;
  try {
    await sql`
      INSERT INTO menu_items (id, name, description, price, category, image, "inStock", custom)
      VALUES (${id}, ${name}, ${description}, ${price}, ${category}, ${image}, ${inStock}, ${custom})
    `;
    res.json({ success: true, id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) an existing menu item
app.put('/api/menu/:id', async (req, res) => {
  const { name, description, price, category, image, inStock, custom } = req.body;
  const id = req.params.id;
  try {
    await sql`
      UPDATE menu_items 
      SET name = ${name}, description = ${description}, price = ${price}, category = ${category}, image = ${image}, "inStock" = ${inStock}, custom = ${custom}
      WHERE id = ${id}
    `;
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a menu item
app.delete('/api/menu/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await sql`DELETE FROM menu_items WHERE id = ${id}`;
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
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
