import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

// Ensure DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables.");
}

// Initialize Neon Postgres client
export const sql = neon(process.env.DATABASE_URL);

console.log('Connected to Neon Postgres database.');

