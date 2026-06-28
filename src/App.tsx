import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { BookOpen, Receipt, User } from 'lucide-react';
import { Order, AppTab } from './types';
import { useStore } from './store';

// Component imports
import Header from './components/Header';
import CategoryList from './components/CategoryList';
import MenuGrid from './components/MenuGrid';
import CartDrawer from './components/CartDrawer';
import OrderPlacedView from './components/OrderPlacedView';
import AdminPanel from './components/AdminPanel';
import OrdersView from './components/OrdersView';
import ProfileView from './components/ProfileView';
import AdminLogin from './components/AdminLogin';

export default function App() {
  const fetchMenuItems = useStore((state) => state.fetchMenuItems);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  return (
    <Routes>
      <Route path="/admin" element={<AdminRoute />} />
      <Route path="/*" element={<CustomerApp />} />
    </Routes>
  );
}

function AdminRoute() {
  const isAdminAuthenticated = useStore((state) => state.isAdminAuthenticated);
  const navigate = useNavigate();

  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminPanel onExitAdmin={() => navigate('/')} />;
}

function CustomerApp() {
  const navigate = useNavigate();
  const location = useLocation();

  // Global State
  const menuItems = useStore((state) => state.menuItems);
  const cart = useStore((state) => state.cart);
  const orders = useStore((state) => state.orders);
  const paymentConfig = useStore((state) => state.paymentConfig);
  const tableNumber = useStore((state) => state.tableNumber);
  const setTableNumber = useStore((state) => state.setTableNumber);
  
  const addToCart = useStore((state) => state.addToCart);
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);
  const clearCart = useStore((state) => state.clearCart);
  const placeOrder = useStore((state) => state.placeOrder);

  // UI state variables
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSearch, setShowSearch] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Derive currentTab from location
  const currentTab: AppTab = location.pathname.includes('/orders')
    ? 'Orders'
    : location.pathname.includes('/profile')
    ? 'Profile'
    : 'Menu';

  // Actions: Confirm and Submit Order
  const handleConfirmOrder = () => {
    if (cart.length === 0) return;

    const totalPrice = cart.reduce(
      (total, item) => total + item.menuItem.price * item.quantity,
      0
    );

    const dateCode = new Date().toLocaleTimeString('en-US', { hour12: false });
    const formattedTime = dateCode.substring(0, 5); // HH:MM format
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const orderRef = `${randomSuffix}`;

    const newOrder: Order = {
      id: orderRef,
      timestamp: `Today, ${formattedTime}`,
      items: [...cart],
      totalPrice,
      status: 'Confirmed',
      tableNumber,
    };

    placeOrder(newOrder);
    clearCart();
    setIsCartOpen(false);
    setLastPlacedOrder(newOrder);
    navigate('/orders');
  };

  // Filter list of items based on Search query & selected Category
  const customerFilteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate totals
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotalPrice = cart.reduce(
    (total, item) => total + item.menuItem.price * item.quantity,
    0
  );

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans select-none antialiased">
      <div className="flex-grow flex flex-col pb-[160px]">
        
        {/* Top Sticky App Bar */}
        <Header
          currentTab={currentTab}
          onTabChange={(tab) => {
            if (tab === 'Menu') navigate('/');
            else if (tab === 'Orders') navigate('/orders');
            else if (tab === 'Profile') navigate('/profile');
            else if (tab === 'Admin') navigate('/admin');
          }}
          onSearchToggle={() => setShowSearch(!showSearch)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showSearch={showSearch}
        />

        {/* Conditional View Router */}
        {lastPlacedOrder ? (
          <OrderPlacedView
            paymentConfig={paymentConfig}
            onReturnToMenu={() => {
              setLastPlacedOrder(null);
              navigate('/');
            }}
            orderId={lastPlacedOrder.id}
            totalPrice={lastPlacedOrder.totalPrice}
          />
        ) : (
          <div className="flex-grow flex flex-col">
            <Routes>
              {/* Tab 1: Menu List */}
              <Route
                path="/"
                element={
                  <>
                    <CategoryList
                      selectedCategory={selectedCategory}
                      onSelectCategory={setSelectedCategory}
                    />
                    <MenuGrid
                      items={customerFilteredItems}
                      onAddToOrder={addToCart}
                    />

                    {/* Floating Sticky Action Bar: Review Order */}
                    {totalCartItems > 0 && (
                      <div className="fixed bottom-[90px] left-0 w-full px-container-padding z-40 pointer-events-none flex justify-center animate-fadeIn">
                        <button
                          onClick={() => setIsCartOpen(true)}
                          className="w-full max-w-[400px] pointer-events-auto bg-primary text-on-primary rounded-xl px-4 py-4 flex justify-between items-center shadow-[0px_4px_20px_rgba(0,0,0,0.15)] hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-95 cursor-pointer"
                          id="btn-sticky-review-order"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-label-caps text-label-caps text-white">
                              {totalCartItems}
                            </div>
                            <span className="font-headline-md text-headline-md text-white">
                              Review Order
                            </span>
                          </div>
                          <span className="font-price-display text-price-display text-white">
                            {cartTotalPrice} ETB
                          </span>
                        </button>
                      </div>
                    )}
                  </>
                }
              />

              {/* Tab 2: Orders History */}
              <Route
                path="/orders"
                element={
                  <OrdersView
                    orders={orders}
                    onShowPaymentDetails={(order) => setLastPlacedOrder(order)}
                  />
                }
              />

              {/* Tab 3: Customer Profile & Sessions */}
              <Route
                path="/profile"
                element={
                  <ProfileView
                    userEmail="macariustam@gmail.com"
                    tableNumber={tableNumber}
                    onTableNumberChange={setTableNumber}
                    onSwitchToAdmin={() => navigate('/admin')}
                  />
                }
              />
            </Routes>
          </div>
        )}

        {/* Bottom Navigation Bar for Mobile */}
        <nav className="bg-primary fixed bottom-0 left-0 right-0 w-full z-50 flex justify-around items-center px-4 py-2 rounded-t-xl shadow-[0px_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
          
          <button
            onClick={() => { setLastPlacedOrder(null); navigate('/'); }}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all w-16 cursor-pointer ${
              currentTab === 'Menu' && !lastPlacedOrder
                ? 'text-on-primary bg-white/10 scale-98 font-bold'
                : 'text-on-primary/70 hover:bg-white/5 font-semibold'
            }`}
            id="nav-tab-menu"
          >
            <BookOpen className="w-5 h-5 text-on-primary" />
            <span className="font-label-caps text-[10px] mt-1 text-on-primary">Menu</span>
          </button>

          <button
            onClick={() => { setLastPlacedOrder(null); navigate('/orders'); }}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all w-16 cursor-pointer ${
              currentTab === 'Orders'
                ? 'text-on-primary bg-white/10 scale-98 font-bold'
                : 'text-on-primary/70 hover:bg-white/5 font-semibold'
            }`}
            id="nav-tab-orders"
          >
            <Receipt className="w-5 h-5 text-on-primary" />
            <span className="font-label-caps text-[10px] mt-1 text-on-primary">Orders</span>
          </button>

          <button
            onClick={() => { setLastPlacedOrder(null); navigate('/profile'); }}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all w-16 cursor-pointer ${
              currentTab === 'Profile'
                ? 'text-on-primary bg-white/10 scale-98 font-bold'
                : 'text-on-primary/70 hover:bg-white/5 font-semibold'
            }`}
            id="nav-tab-profile"
          >
            <User className="w-5 h-5 text-on-primary" />
            <span className="font-label-caps text-[10px] mt-1 text-on-primary">Profile</span>
          </button>
        </nav>

        {/* Checkout/Cart slide-up Drawer Modal */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cart}
          onUpdateQuantity={updateCartQuantity}
          onConfirmOrder={handleConfirmOrder}
          tableNumber={tableNumber}
        />

      </div>
    </div>
  );
}
