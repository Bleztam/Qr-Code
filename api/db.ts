import sqlite3 from 'sqlite3';
import path from 'path';

// In Vercel, only /tmp is writable. So we check if we are in a Vercel environment.
const isVercel = process.env.VERCEL === '1';
const dbPath = isVercel ? '/tmp/database.sqlite' : path.resolve(process.cwd(), 'database.sqlite');

// Initialize SQLite Database
export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create Table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        category TEXT NOT NULL,
        image TEXT NOT NULL,
        inStock BOOLEAN NOT NULL,
        custom BOOLEAN DEFAULT false
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table', err.message);
      } else {
        // Seed database if empty
        db.get('SELECT COUNT(*) as count FROM menu_items', (err, row: any) => {
          if (!err && row.count === 0) {
            console.log('Seeding initial menu items...');
            const seedData = [
              { id: '1', name: 'Classic Burger', description: 'Juicy beef patty with lettuce, tomato, and our secret sauce.', price: 350, category: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400', inStock: true, custom: false },
              { id: '2', name: 'Shiro Tegabino', description: 'Traditional Ethiopian chickpea stew served bubbling hot in a clay pot.', price: 250, category: 'Traditional', image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80&w=400', inStock: true, custom: false },
              { id: '3', name: 'Doro Wat', description: 'Spicy chicken stew slow-cooked with berbere and served with boiled egg.', price: 550, category: 'Traditional', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400', inStock: true, custom: false },
              { id: '4', name: 'Crispy Fries', description: 'Golden, perfectly salted french fries.', price: 120, category: 'Sides', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=400', inStock: true, custom: false },
              { id: '5', name: 'Coca-Cola', description: 'Chilled glass bottle.', price: 60, category: 'Soft Drinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400', inStock: true, custom: false }
            ];

            const stmt = db.prepare('INSERT INTO menu_items VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
            seedData.forEach(item => {
              stmt.run(item.id, item.name, item.description, item.price, item.category, item.image, item.inStock ? 1 : 0, item.custom ? 1 : 0);
            });
            stmt.finalize();
          }
        });
      }
    });
  }
});
