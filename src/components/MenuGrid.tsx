/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plus } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuGridProps {
  items: MenuItem[];
  onAddToOrder: (item: MenuItem) => void;
}

export default function MenuGrid({ items, onAddToOrder }: MenuGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="border border-outline-variant p-6 mb-4 bg-surface-container-low/50 rounded-xl">
          <svg
            className="w-10 h-10 text-on-surface-variant"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface">No offerings found</h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mt-1">
          Try expanding your search query or another category.
        </p>
      </div>
    );
  }

  return (
    <main className="flex-grow px-container-padding py-stack-lg mx-auto w-full max-w-[1200px]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter-grid md:gap-stack-lg">
        {items.map((item) => (
          <div
            key={item.id}
            className={`bg-surface-container-lowest border border-outline-variant/40 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow relative ${
              !item.inStock ? 'opacity-60' : ''
            }`}
            id={`menu-card-${item.id}`}
          >
            {/* Image Container */}
            <div className="w-full aspect-square bg-surface-variant relative">
              <img
                src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'}
                alt={item.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {!item.inStock && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
                  <span className="bg-surface text-on-surface text-[10px] font-label-caps text-label-caps px-3 py-1.5 rounded-full border border-outline-variant/10 shadow-sm">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Item Content */}
            <div className="p-3 md:p-4 flex flex-col flex-grow">
              <h3 className="font-headline-md text-[16px] md:text-headline-md text-on-surface line-clamp-1 mb-1">
                {item.name}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 flex-grow mb-3">
                {item.description}
              </p>

              {/* Price and Add Button */}
              <div className="flex justify-between items-center mt-auto">
                <span className="font-price-display text-price-display text-primary">
                  {item.price} ETB
                </span>
                
                <button
                  disabled={!item.inStock}
                  onClick={() => onAddToOrder(item)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${
                    item.inStock
                      ? 'bg-primary text-on-primary hover:bg-primary-container active:scale-90 cursor-pointer'
                      : 'bg-surface-container-high text-on-surface-variant/40 cursor-not-allowed'
                  }`}
                  aria-label={`Add ${item.name} to order`}
                  id={`btn-add-item-${item.id}`}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
