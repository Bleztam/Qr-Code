/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileText, ClipboardList, CheckCircle2, ChevronRight, Landmark } from 'lucide-react';
import { Order } from '../types';

interface OrdersViewProps {
  orders: Order[];
  onShowPaymentDetails: (order: Order) => void;
}

export default function OrdersView({ orders, onShowPaymentDetails }: OrdersViewProps) {
  return (
    <div className="w-full max-w-md mx-auto py-6 px-4 flex flex-col flex-grow animate-fadeIn">
      <div className="flex items-center gap-2.5 mb-6 border-b border-outline-variant pb-4">
        <ClipboardList className="w-5 h-5 text-primary" />
        <div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-on-surface">Your Orders</h1>
          <p className="font-label-caps text-label-caps text-outline">Receipt and payment tracking history</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center py-20 text-center border border-outline-variant bg-surface-container-low/50 p-6 rounded-xl">
          <div className="border border-outline-variant p-5 bg-surface mb-4 text-on-surface-variant rounded-full">
            <FileText className="w-6 h-6" />
          </div>
          <p className="font-headline-md text-headline-md text-on-surface">No active orders</p>
          <p className="font-body-sm text-body-sm text-outline mt-1.5 max-w-[240px] leading-relaxed">
            Ready to dine? Explore our current menu selection to place your order.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 flex-grow overflow-y-auto">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-5 relative overflow-hidden flex flex-col gap-4 shadow-none"
              id={`order-card-${order.id}`}
            >
              {/* Top Row */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-headline-md text-[16px] md:text-headline-md text-on-surface">Order #{order.id}</span>
                  <p className="font-body-sm text-[11px] text-outline mt-0.5">{order.timestamp}</p>
                </div>
                <span className="bg-surface-container border border-outline-variant text-on-surface px-2.5 py-1 rounded-full text-[10px] font-label-caps text-label-caps flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  {order.status}
                </span>
              </div>

              {/* Items List inside Receipt */}
              <div className="bg-surface-container-low rounded-lg p-4 text-xs space-y-2 border border-outline-variant/30">
                {order.items.map((item) => (
                  <div key={item.menuItem.id} className="flex justify-between items-center text-on-surface-variant font-medium">
                    <span>
                      {item.menuItem.name} <span className="font-bold text-on-surface">x{item.quantity}</span>
                    </span>
                    <span className="font-price-display text-price-display text-primary">
                      {item.menuItem.price * item.quantity} ETB
                    </span>
                  </div>
                ))}
                
                {/* Total Row */}
                <div className="flex justify-between items-center pt-2.5 border-t border-outline-variant font-price-display text-price-display text-primary">
                  <span>Total Due</span>
                  <span>{order.totalPrice} ETB</span>
                </div>
              </div>

              {/* Payment Action Button */}
              <button
                onClick={() => onShowPaymentDetails(order)}
                className="w-full bg-primary hover:bg-primary/90 text-on-primary font-headline-md text-headline-md py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                id={`btn-order-pay-${order.id}`}
              >
                <Landmark className="w-4.5 h-4.5" />
                Show Payment Details
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
