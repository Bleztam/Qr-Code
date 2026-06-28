/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in ETB
  category: string; // e.g., 'Burgers', 'Traditional', 'Sides', 'Soft Drinks', 'Salads', 'Bowls', 'Drinks'
  image: string;
  inStock: boolean;
  custom?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  timestamp: string;
  items: CartItem[];
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Completed';
  tableNumber: string;
}

export interface PaymentConfig {
  telebirr: string;
  cbeBankAccount: string;
}

export type AppTab = 'Menu' | 'Orders' | 'Profile' | 'Admin';
export type AdminSubTab = 'Menu Management' | 'Payment Info' | 'Analytics';
