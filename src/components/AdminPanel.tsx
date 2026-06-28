/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import {
  Menu as MenuIcon,
  BookOpen,
  CreditCard,
  BarChart3,
  User,
  Image as ImageIcon,
  Edit2,
  Trash2,
  Plus,
  Power,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Award,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { MenuItem } from '../types';
import { useStore } from '../store';

interface AdminPanelProps {
  onExitAdmin: () => void;
}

export default function AdminPanel({ onExitAdmin }: AdminPanelProps) {
  const menuItems = useStore((state) => state.menuItems);
  const addMenuItem = useStore((state) => state.addMenuItem);
  const updateMenuItem = useStore((state) => state.updateMenuItem);
  const deleteMenuItem = useStore((state) => state.deleteMenuItem);
  
  const paymentConfig = useStore((state) => state.paymentConfig);
  const setPaymentConfig = useStore((state) => state.setPaymentConfig);
  const orders = useStore((state) => state.orders);

  const onAddOrUpdateItem = (item: MenuItem) => {
    const exists = menuItems.some((i) => i.id === item.id);
    if (exists) updateMenuItem(item);
    else addMenuItem(item);
  };
  
  const onDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      deleteMenuItem(id);
    }
  };

  const onUpdatePaymentConfig = setPaymentConfig;
  // Navigation tabs
  const [activeSubTab, setActiveSubTab] = useState<'Menu Management' | 'Payment Info' | 'Analytics'>('Menu Management');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Mobile menu sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formCategory, setFormCategory] = useState('Burgers');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formInStock, setFormInStock] = useState(true);

  // Payment settings states
  const [paymentTelebirr, setPaymentTelebirr] = useState(paymentConfig.telebirr);
  const [paymentCbe, setPaymentCbe] = useState(paymentConfig.cbeBankAccount);
  const [paymentSaved, setPaymentSaved] = useState(false);

  // Filter items for list
  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  // Set form to edit item
  const handleEditClick = (item: MenuItem) => {
    setEditingId(item.id);
    setFormName(item.name);
    setFormPrice(item.price.toString());
    setFormCategory(item.category);
    setFormDescription(item.description);
    setFormImage(item.image);
    setFormInStock(item.inStock);
  };

  // Clear form
  const handleClearForm = () => {
    setEditingId(null);
    setFormName('');
    setFormPrice('');
    setFormCategory('Burgers');
    setFormDescription('');
    setFormImage('');
    setFormInStock(true);
  };

  // Save / Update item
  const handleSaveItem = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formPrice) {
      alert('Please fill out the name and price fields.');
      return;
    }

    // Default image if empty
    const defaultImagesByCategory: Record<string, string> = {
      Burgers: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
      Traditional: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=400&q=80',
      Sides: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80',
      'Soft Drinks': 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=400&q=80',
      Salads: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
      Bowls: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
    };

    const imageUrl = formImage.trim() || defaultImagesByCategory[formCategory] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';

    const itemData: MenuItem = {
      id: editingId || 'item-' + Date.now(),
      name: formName,
      description: formDescription,
      price: parseFloat(formPrice),
      category: formCategory,
      image: imageUrl,
      inStock: formInStock,
      custom: true,
    };

    onAddOrUpdateItem(itemData);
    handleClearForm();
  };

  // Save payment details
  const handleSavePayment = (e: FormEvent) => {
    e.preventDefault();
    onUpdatePaymentConfig({
      telebirr: paymentTelebirr,
      cbeBankAccount: paymentCbe,
    });
    setPaymentSaved(true);
    setTimeout(() => setPaymentSaved(false), 3000);
  };

  // Preset quick images for fast-casual
  const presetImages = [
    { name: 'Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80' },
    { name: 'Salad', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80' },
    { name: 'Traditional Stew', url: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=400&q=80' },
    { name: 'French Fries', url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80' },
    { name: 'Cocktail/Juice', url: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=400&q=80' },
  ];

  // Helper calculations for Analytics
  const totalRevenue = orders.reduce((total, order) => total + order.totalPrice, 0) + 12450; // Seed with standard offset
  const totalOrdersCount = orders.length + 32;
  const averageOrderValue = Math.round(totalRevenue / totalOrdersCount);

  return (
    <div className="bg-surface h-screen flex overflow-hidden w-full text-on-surface">
      
      {/* Sidebar Navigation (Hidden on mobile unless toggled) */}
      <aside className={`w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col shrink-0 transition-transform duration-300 md:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0 fixed inset-y-0 left-0 z-50' : '-translate-x-full absolute md:relative'
      }`}>
        <div className="p-container-padding border-b border-outline-variant flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-primary p-1.5">
              <BookOpen className="w-5 h-5" />
            </span>
            <span className="font-headline-md text-headline-md text-primary tracking-tight font-extrabold">
              FreshServe
            </span>
          </div>
          {isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-1 text-on-surface hover:bg-surface-container rounded-full"
            >
              <XIcon />
            </button>
          )}
        </div>

        <nav className="flex-1 py-stack-md flex flex-col gap-1 px-2 overflow-y-auto">
          <div className="px-3 pb-2 pt-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            Admin Area
          </div>
          
          <button
            onClick={() => { setActiveSubTab('Menu Management'); setIsSidebarOpen(false); }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-body-lg text-body-lg w-full text-left transition-colors cursor-pointer ${
              activeSubTab === 'Menu Management'
                ? 'bg-primary text-on-primary'
                : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <BookOpen className="w-4.5 h-4.5" />
            Menu Management
          </button>
          
          <button
            onClick={() => { setActiveSubTab('Payment Info'); setIsSidebarOpen(false); }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-body-lg text-body-lg w-full text-left transition-colors cursor-pointer ${
              activeSubTab === 'Payment Info'
                ? 'bg-primary text-on-primary'
                : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <CreditCard className="w-4.5 h-4.5" />
            Payment Info
          </button>
          
          <button
            onClick={() => { setActiveSubTab('Analytics'); setIsSidebarOpen(false); }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-body-lg text-body-lg w-full text-left transition-colors cursor-pointer ${
              activeSubTab === 'Analytics'
                ? 'bg-primary text-on-primary'
                : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <BarChart3 className="w-4.5 h-4.5" />
            Analytics
          </button>
        </nav>

        <div className="p-container-padding border-t border-outline-variant">
          <button
            onClick={onExitAdmin}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container font-body-lg text-body-lg w-full text-left transition-colors cursor-pointer"
          >
            <User className="w-4.5 h-4.5" />
            Exit Admin Area
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full bg-background">
        
        {/* Mobile Header */}
        <header className="flex flex-col items-center w-full px-container-padding bg-surface border-b border-outline-variant sticky top-0 z-40 md:hidden shrink-0">
          <div className="flex items-center justify-between w-full h-16">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-on-surface p-2"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-extrabold">FreshServe</span>
            <button
              onClick={onExitAdmin}
              className="text-primary hover:bg-surface-container font-label-caps text-label-caps px-3 py-1.5"
            >
              Exit
            </button>
          </div>
        </header>

        {/* Dynamic Inner Screens */}
        {activeSubTab === 'Menu Management' && (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full">
            {/* Left Side: Menu Items List (65%) */}
            <section className="flex-1 lg:w-[65%] flex flex-col overflow-y-auto p-container-padding lg:p-stack-lg gap-stack-lg border-r border-outline-variant w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface">Menu Items</h1>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Manage your current offerings.</p>
                </div>
                {/* Category Filter Pills */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {['All', 'Burgers', 'Traditional', 'Sides', 'Soft Drinks'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-1.5 rounded-full font-label-caps text-label-caps whitespace-nowrap cursor-pointer transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* List of Items */}
              <div className="flex flex-col gap-2">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-surface-container-lowest border border-outline-variant rounded-lg p-3 flex items-center gap-container-padding hover:shadow-sm transition-shadow group ${
                      !item.inStock ? 'opacity-70' : ''
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0 border border-outline-variant/30"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="font-headline-md text-headline-md text-on-surface truncate">
                          {item.name}
                        </h3>
                        <span className="font-price-display text-price-display text-primary whitespace-nowrap ml-2">
                          {item.price} ETB
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded font-label-caps text-label-caps uppercase text-[10px]">
                          {item.category}
                        </span>
                        <span className="text-xs text-secondary flex items-center gap-1 font-medium">
                          <span className={`w-2 h-2 rounded-full inline-block ${item.inStock ? 'bg-primary' : 'bg-outline'}`} />
                          {item.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons shown on hover on desktop / always on mobile */}
                    <div className="flex flex-col sm:flex-row gap-2 pr-2 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="p-2 text-outline hover:text-primary hover:bg-surface-container rounded-full cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="p-2 text-outline hover:text-error hover:bg-error-container rounded-full cursor-pointer transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Right Side: Form Sidebar (35%) */}
            <aside className="w-full lg:w-[35%] bg-surface-container-lowest border-l border-outline-variant flex flex-col h-full overflow-y-auto shrink-0 z-10">
              <div className="p-container-padding border-b border-outline-variant bg-surface-container-lowest sticky top-0 z-20 flex justify-between items-center">
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  {editingId ? 'Edit Item' : 'Add Item'}
                </h2>
                {editingId && (
                  <button
                    onClick={handleClearForm}
                    className="text-xs font-semibold text-outline hover:text-on-surface"
                  >
                    Reset Form
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveItem} className="p-container-padding flex flex-col gap-stack-md flex-grow">
                {/* Image URL with Preset selection */}
                <div className="flex flex-col gap-unit">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    Image Settings
                  </label>
                  
                  {formImage ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-2 border border-outline-variant">
                      <img src={formImage} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormImage('')}
                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-surface-container-low transition-colors cursor-pointer bg-surface-bright mb-2">
                      <ImageIcon className="text-outline mb-2 w-7 h-7" />
                      <p className="font-body-sm text-body-sm text-on-surface">Select a preset or enter URL below</p>
                    </div>
                  )}

                  {/* Preset quick selection */}
                  {!formImage && (
                    <div className="flex gap-1.5 overflow-x-auto pb-1.5 mb-2 scrollbar-hide">
                      {presetImages.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setFormImage(preset.url)}
                          className="bg-surface-container hover:bg-primary-fixed text-on-surface px-2.5 py-1 rounded-md text-[9px] font-label-caps text-label-caps tracking-wide shrink-0 cursor-pointer border border-outline-variant/30"
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  )}

                  <input
                    type="text"
                    placeholder="Enter absolute Image URL (Optional)"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="w-full bg-surface-bright border border-outline-variant rounded-md px-3 py-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-outline-variant"
                  />
                </div>

                {/* Item Name */}
                <div className="flex flex-col gap-unit">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="itemName">
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="itemName"
                    placeholder="e.g. Traditional Doro Wat"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    className="w-full bg-surface-bright border border-outline-variant rounded-md px-3 py-2 font-body-lg text-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-outline-variant"
                  />
                </div>

                {/* Grid for Price and Category */}
                <div className="grid grid-cols-2 gap-container-padding">
                  <div className="flex flex-col gap-unit">
                    <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="itemPrice">
                      Price (ETB)
                    </label>
                    <input
                      type="number"
                      id="itemPrice"
                      placeholder="e.g. 250"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      required
                      min="1"
                      className="w-full bg-surface-bright border border-outline-variant rounded-md px-3 py-2 font-body-lg text-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="flex flex-col gap-unit">
                    <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="itemCategory">
                      Category
                    </label>
                    <select
                      id="itemCategory"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-surface-bright border border-outline-variant rounded-md px-3 py-2 font-body-lg text-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
                    >
                      <option value="Burgers">Burgers</option>
                      <option value="Traditional">Traditional</option>
                      <option value="Sides">Sides</option>
                      <option value="Soft Drinks">Soft Drinks</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-unit">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="itemDesc">
                    Description
                  </label>
                  <textarea
                    id="itemDesc"
                    placeholder="Describe the main ingredients and flavors..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-surface-bright border border-outline-variant rounded-md px-3 py-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>

                {/* Stock Toggle */}
                <div className="flex items-center justify-between py-2 border-t border-outline-variant mt-2">
                  <div className="flex flex-col">
                    <span className="font-body-lg text-body-lg text-on-surface font-semibold">Availability</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Visible to customers</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formInStock}
                      onChange={(e) => setFormInStock(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>

                {/* Actions */}
                <div className="p-container-padding border-t border-outline-variant bg-surface-container-lowest sticky bottom-0 z-20 flex gap-3 mt-auto pt-4">
                  <button
                    type="button"
                    onClick={handleClearForm}
                    className="flex-1 py-2.5 px-4 rounded-md border border-outline-variant text-on-surface font-label-caps text-label-caps hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    Clear Form
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-md bg-primary text-on-primary font-label-caps text-label-caps hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm cursor-pointer"
                  >
                    {editingId ? 'Update Item' : 'Save Item'}
                  </button>
                </div>
              </form>
            </aside>
          </div>
        )}

        {/* Payment Info Sub-tab */}
        {activeSubTab === 'Payment Info' && (
          <div className="flex-1 p-6 max-w-lg mx-auto w-full flex flex-col justify-center animate-fadeIn">
            <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
              <h2 className="text-headline-md font-headline-md text-primary flex items-center mb-1">
                <CreditCard className="w-5 h-5 mr-2" />
                Configure Payment Info
              </h2>
              <p className="font-body-sm text-body-sm text-outline mb-5 leading-normal">
                These credentials will display immediately on the customer success screen for checkout.
              </p>

              <form onSubmit={handleSavePayment} className="space-y-4">
                <div className="flex flex-col gap-unit">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    Telebirr Registered Mobile
                  </label>
                  <input
                    type="text"
                    value={paymentTelebirr}
                    onChange={(e) => setPaymentTelebirr(e.target.value)}
                    required
                    className="w-full bg-surface-bright border border-outline-variant rounded-md px-3 py-2 font-body-lg text-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono"
                  />
                </div>

                <div className="flex flex-col gap-unit">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    CBE Bank Account Number
                  </label>
                  <input
                    type="text"
                    value={paymentCbe}
                    onChange={(e) => setPaymentCbe(e.target.value)}
                    required
                    className="w-full bg-surface-bright border border-outline-variant rounded-md px-3 py-2 font-body-lg text-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-on-primary font-headline-md text-headline-md py-3 rounded-xl transition-colors mt-4 cursor-pointer"
                >
                  Save Payment Settings
                </button>
              </form>

              {paymentSaved && (
                <div className="mt-4 p-3 bg-secondary-container text-on-secondary-container text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 border border-outline-variant/35 animate-fadeIn">
                  <Power className="w-4 h-4 text-primary" />
                  Settings saved successfully!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analytics Dashboard */}
        {activeSubTab === 'Analytics' && (
          <div className="flex-1 p-4 lg:p-6 overflow-y-auto w-full animate-fadeIn bg-background">
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Analytics</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 mb-6">Real-time stats of FreshServe operations.</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Card 1 */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                    Total Revenue
                  </span>
                  <span className="p-1.5 bg-primary-container/20 text-primary rounded-lg">
                    <DollarSign className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-4">
                  <span className="font-price-display text-price-display text-primary text-[24px] font-bold">{totalRevenue} ETB</span>
                  <div className="text-[10px] text-primary font-semibold mt-1 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +14.5% vs last week
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                    Total Orders
                  </span>
                  <span className="p-1.5 bg-primary-container/20 text-primary rounded-lg">
                    <ShoppingBag className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-4">
                  <span className="font-price-display text-price-display text-on-surface text-[24px] font-bold">{totalOrdersCount}</span>
                  <div className="text-[10px] text-primary font-semibold mt-1 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +12.3% vs last week
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                    Avg. Ticket
                  </span>
                  <span className="p-1.5 bg-primary-container/20 text-primary rounded-lg">
                    <TrendingUp className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-4">
                  <span className="font-price-display text-price-display text-on-surface text-[24px] font-bold">{averageOrderValue} ETB</span>
                  <div className="text-[10px] text-primary font-semibold mt-1 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +2.1% improvement
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                    Top Sellers
                  </span>
                  <span className="p-1.5 bg-primary-container/20 text-primary rounded-lg">
                    <Award className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-4">
                  <span className="font-headline-md text-headline-md text-on-surface truncate block">
                    {menuItems[1]?.name || 'Doro Wat'}
                  </span>
                  <div className="text-[10px] text-outline font-semibold mt-1">
                    Ordered 14 times today
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-sm">
                <h3 className="font-label-caps text-label-caps text-on-surface mb-4 uppercase tracking-wider">
                  Weekly Sales Volume
                </h3>
                <div className="h-48 flex items-end justify-between gap-2.5 pt-6 font-mono text-xs">
                  {/* Monday */}
                  <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="bg-primary w-full rounded-t-lg transition-all hover:opacity-85" style={{ height: '35%' }} />
                    <span className="text-[10px] text-outline">Mon</span>
                  </div>
                  {/* Tuesday */}
                  <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="bg-primary w-full rounded-t-lg transition-all hover:opacity-85" style={{ height: '45%' }} />
                    <span className="text-[10px] text-outline">Tue</span>
                  </div>
                  {/* Wednesday */}
                  <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="bg-primary w-full rounded-t-lg transition-all hover:opacity-85" style={{ height: '55%' }} />
                    <span className="text-[10px] text-outline">Wed</span>
                  </div>
                  {/* Thursday */}
                  <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="bg-primary w-full rounded-t-lg transition-all hover:opacity-85" style={{ height: '40%' }} />
                    <span className="text-[10px] text-outline">Thu</span>
                  </div>
                  {/* Friday */}
                  <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="bg-primary w-full rounded-t-lg transition-all hover:opacity-85" style={{ height: '78%' }} />
                    <span className="text-[10px] text-outline">Fri</span>
                  </div>
                  {/* Saturday */}
                  <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="bg-primary w-full rounded-t-lg transition-all hover:opacity-85" style={{ height: '95%' }} />
                    <span className="text-[10px] text-outline">Sat</span>
                  </div>
                  {/* Sunday */}
                  <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="bg-primary-container w-full rounded-t-lg transition-all hover:opacity-85" style={{ height: '88%' }} />
                    <span className="text-[10px] text-outline">Sun</span>
                  </div>
                </div>
              </div>

              {/* Order Status Summary */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-label-caps text-label-caps text-on-surface mb-4 uppercase tracking-wider">
                    Recent Orders Stream
                  </h3>
                  <div className="space-y-3">
                    {orders.slice(-3).reverse().map((o, index) => (
                      <div key={index} className="flex justify-between items-center text-xs pb-2.5 border-b border-surface-container">
                        <div>
                          <p className="font-semibold text-on-surface">Table #{o.tableNumber}</p>
                          <p className="text-[10px] text-outline">{o.timestamp}</p>
                        </div>
                        <span className="bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-bold">
                          {o.totalPrice} ETB
                        </span>
                      </div>
                    ))}
                    {orders.length === 0 && (
                      <div className="text-center py-10 text-xs text-outline">
                        No recent active sessions recorded.
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center text-[11px] text-outline mt-4 font-semibold hover:underline flex items-center justify-center gap-1">
                  View full order ledger <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Simple fallback X close icon for sidebar
function XIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
