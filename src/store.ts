import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MenuItem, CartItem, Order, PaymentConfig } from './types';
import { INITIAL_MENU_ITEMS, DEFAULT_PAYMENT_CONFIG } from './data';

interface AppState {
  menuItems: MenuItem[];
  orders: Order[];
  cart: CartItem[];
  paymentConfig: PaymentConfig;
  tableNumber: string;
  isAdminAuthenticated: boolean;

  // Actions
  setAdminAuthenticated: (auth: boolean) => void;
  setTableNumber: (num: string) => void;
  
  // Menu Actions
  fetchMenuItems: () => Promise<void>;
  addMenuItem: (item: MenuItem) => Promise<void>;
  updateMenuItem: (item: MenuItem) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  
  // Cart Actions
  addToCart: (item: MenuItem) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  clearCart: () => void;

  // Order Actions
  placeOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;

  // Payment Actions
  setPaymentConfig: (config: PaymentConfig) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      menuItems: [],
      orders: [],
      cart: [],
      paymentConfig: DEFAULT_PAYMENT_CONFIG,
      tableNumber: '4',
      isAdminAuthenticated: false,

      setAdminAuthenticated: (auth) => set({ isAdminAuthenticated: auth }),
      setTableNumber: (num) => set({ tableNumber: num }),

      fetchMenuItems: async () => {
        try {
          const res = await fetch('/api/menu');
          const data = await res.json();
          if (Array.isArray(data)) {
            set({ menuItems: data });
          }
        } catch (error) {
          console.error("Failed to fetch menu items", error);
        }
      },

      addMenuItem: async (item) => {
        try {
          await fetch('/api/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
          });
          set((state) => ({ menuItems: [...state.menuItems, item] }));
        } catch (error) {
          console.error("Failed to add menu item", error);
        }
      },
      updateMenuItem: async (item) => {
        try {
          await fetch(`/api/menu/${item.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
          });
          set((state) => ({
            menuItems: state.menuItems.map((m) => (m.id === item.id ? item : m)),
          }));
        } catch (error) {
          console.error("Failed to update menu item", error);
        }
      },
      deleteMenuItem: async (id) => {
        try {
          await fetch(`/api/menu/${id}`, { method: 'DELETE' });
          set((state) => ({
            menuItems: state.menuItems.filter((m) => m.id !== id),
          }));
        } catch (error) {
          console.error("Failed to delete menu item", error);
        }
      },

      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((c) => c.menuItem.id === item.id);
          if (existing) {
            return {
              cart: state.cart.map((c) =>
                c.menuItem.id === item.id
                  ? { ...c, quantity: c.quantity + 1 }
                  : c
              ),
            };
          }
          return { cart: [...state.cart, { menuItem: item, quantity: 1 }] };
        }),
      updateCartQuantity: (id, delta) =>
        set((state) => ({
          cart: state.cart
            .map((c) => {
              if (c.menuItem.id === id) {
                return { ...c, quantity: c.quantity + delta };
              }
              return c;
            })
            .filter((c) => c.quantity > 0),
        })),
      clearCart: () => set({ cart: [] }),

      placeOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),

      setPaymentConfig: (config) => set({ paymentConfig: config }),
    }),
    {
      name: 'tommy-juicebar-storage',
      partialize: (state) => ({
        menuItems: state.menuItems,
        orders: state.orders,
        cart: state.cart,
        paymentConfig: state.paymentConfig,
        tableNumber: state.tableNumber,
        // we intentionally do not persist isAdminAuthenticated
      }),
    }
  )
);
