/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Minus, Plus, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (menuItemId: string, delta: number) => void;
  onConfirmOrder: () => void;
  tableNumber: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onConfirmOrder,
  tableNumber,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.menuItem.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
      {/* Background Dim Backdrop */}
      <div
        className="absolute inset-0 bg-black/10 z-10 transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      />

      {/* Review Order Slide-up Modal */}
      <div className="z-20 w-full max-w-[600px] bg-surface rounded-t-[24px] md:rounded-[24px] shadow-lg flex flex-col h-[85vh] md:h-auto md:max-h-[90vh] transition-all duration-300 animate-slideUp relative">
        {/* Header */}
        <div className="px-container-padding py-stack-md flex justify-between items-center border-b border-surface-variant sticky top-0 bg-surface rounded-t-[24px] z-10">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Your Order</h1>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-variant transition-colors text-on-surface cursor-pointer"
            aria-label="Close cart"
            id="btn-cart-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Item List */}
        <div className="flex-1 overflow-y-auto p-container-padding flex flex-col gap-stack-md">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-3xl mb-4">🍽️</span>
              <p className="font-headline-md text-headline-md text-on-surface">Your selection is empty</p>
              <p className="font-body-sm text-body-sm text-outline mt-1 max-w-xs">
                Browse our seasonal menu to begin your order.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.menuItem.id}
                className="flex items-center gap-gutter-grid bg-surface-bright rounded-xl p-3 border border-outline-variant/30"
                id={`cart-item-${item.menuItem.id}`}
              >
                {/* Thumbnail Image */}
                <div className="w-[80px] h-[80px] rounded-lg overflow-hidden shrink-0 bg-surface-container">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Content Details */}
                <div className="flex-1 flex flex-col justify-between h-full min-w-0">
                  <div>
                    <h2 className="font-headline-md text-headline-md text-on-surface mb-1 truncate">
                      {item.menuItem.name}
                    </h2>
                    <p className="font-body-sm text-body-sm text-outline truncate">
                      {item.menuItem.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <span className="font-price-display text-price-display text-primary">
                      {item.menuItem.price * item.quantity} ETB
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 bg-surface-container rounded-full px-2 py-1">
                      <button
                        onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                        className="text-on-surface hover:text-primary transition-colors flex items-center justify-center cursor-pointer p-0.5"
                        aria-label="Decrease quantity"
                        id={`btn-cart-qty-dec-${item.menuItem.id}`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-body-lg text-body-lg font-semibold w-4 text-center text-on-surface">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                        className="text-on-surface hover:text-primary transition-colors flex items-center justify-center cursor-pointer p-0.5"
                        aria-label="Increase quantity"
                        id={`btn-cart-qty-inc-${item.menuItem.id}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sticky Footer Summary & Action */}
        {cartItems.length > 0 && (
          <div className="p-container-padding bg-surface border-t border-surface-variant sticky bottom-0 z-30 shadow-[0px_-4px_20px_rgba(0,0,0,0.08)] rounded-b-[24px]">
            <div className="flex justify-between items-end mb-stack-md">
              <div className="flex flex-col">
                <span className="font-body-sm text-body-sm text-outline">Total Due</span>
                <span className="font-price-display text-price-display text-primary text-[24px] mt-1">
                  {totalPrice} ETB
                </span>
              </div>
              <div className="text-right">
                <span className="font-label-caps text-label-caps text-on-surface-variant">
                  Includes VAT (Table {tableNumber})
                </span>
              </div>
            </div>

            <button
              onClick={onConfirmOrder}
              className="w-full bg-primary hover:bg-primary/90 text-on-primary font-headline-md text-headline-md py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
              id="btn-cart-confirm"
            >
              <span>Confirm with Waiter</span>
              <CheckCircle2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
