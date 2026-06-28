/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CheckCircle2, Copy, Check, Landmark, Wallet } from 'lucide-react';
import { PaymentConfig } from '../types';

interface OrderPlacedViewProps {
  paymentConfig: PaymentConfig;
  onReturnToMenu: () => void;
  orderId?: string;
  totalPrice?: number;
}

export default function OrderPlacedView({
  paymentConfig,
  onReturnToMenu,
  orderId,
  totalPrice,
}: OrderPlacedViewProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
      }
    } catch (err) {
      console.warn('Fallback copy failed', err);
    }

    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  return (
    <main className="w-full max-w-md flex flex-col items-center justify-center flex-grow space-y-stack-lg animate-fadeIn mx-auto py-8">
      {/* Success Animation / Illustration */}
      <div className="w-48 h-48 rounded-full bg-surface-container-low flex items-center justify-center mb-4 relative overflow-hidden shadow-sm border border-outline-variant/30">
        <div
          className="w-full h-full bg-cover bg-center absolute inset-0 opacity-80"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_21pKfbG_sfaEJK_ggxGufsHxFsfUD7FTYCVmX6mGmjHQGnK10h4hFq6kLkVdLx-b5GC9z6obJO8RY2qokhHUt7cy-A_HpKJeVYx4gRYqpPnh1w8oWeZq0_9Gnf4OVq9t1oQvYMTYqiW3qy4w32etvC-ZtUtDKtM6FDwU7pQzmmkh-TodPCaf2-LaI7SR7X_DlNFCMxd68tFVLfI6Ox_7C3E6yqWyjSsR8yMsotBE_7YPZ70bpo8awubikwI8azVTxJ4qxrVfXQuV')`,
          }}
        />
        <CheckCircle2 className="w-16 h-16 text-primary z-10" />
      </div>

      {/* Heading Section */}
      <div className="text-center space-y-stack-sm w-full">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface">
          Order Placed!
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[280px] mx-auto">
          Please show this screen to your waiter to confirm payment.
        </p>
        {orderId && (
          <p className="text-[10px] font-label-caps text-label-caps text-outline mt-1">
            Reference: #{orderId}
          </p>
        )}
        {totalPrice !== undefined && (
          <div className="bg-surface-container text-primary font-price-display text-price-display px-5 py-2.5 border border-outline-variant inline-block mt-3 rounded-full">
            Total: {totalPrice} ETB
          </div>
        )}
      </div>

      {/* Payment Details Card */}
      <div className="w-full bg-surface border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col space-y-stack-md mt-4 relative overflow-hidden">
        {/* Subtle accent bar on the left */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
        <h2 className="font-headline-md text-headline-md text-primary mb-2 flex items-center">
          <Landmark className="w-5 h-5 mr-2" />
          Payment Details
        </h2>

        <div className="space-y-stack-sm flex flex-col">
          {/* Telebirr Item */}
          <div className="flex items-center justify-between p-4 bg-surface-bright rounded-lg border border-outline-variant/50 hover:bg-surface-container-low transition-colors group">
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface-variant mb-1">Telebirr</span>
              <span className="font-body-lg text-body-lg text-on-surface font-semibold tracking-wide">
                {paymentConfig.telebirr}
              </span>
            </div>
            <button
              aria-label="Copy Telebirr number"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer ${
                copiedType === 'telebirr'
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'text-primary bg-surface-container hover:bg-primary/10'
              }`}
              onClick={() => copyToClipboard(paymentConfig.telebirr, 'telebirr')}
            >
              {copiedType === 'telebirr' ? <Check className="w-4.5 h-4.5" /> : <Copy className="w-4.5 h-4.5" />}
            </button>
          </div>

          {/* CBE Bank Account Item */}
          <div className="flex items-center justify-between p-4 bg-surface-bright rounded-lg border border-outline-variant/50 hover:bg-surface-container-low transition-colors group">
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface-variant mb-1">CBE Bank Account</span>
              <span className="font-body-lg text-body-lg text-on-surface font-semibold tracking-wide">
                {paymentConfig.cbeBankAccount}
              </span>
            </div>
            <button
              aria-label="Copy CBE Bank Account number"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer ${
                copiedType === 'cbe'
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'text-primary bg-surface-container hover:bg-primary/10'
              }`}
              onClick={() => copyToClipboard(paymentConfig.cbeBankAccount, 'cbe')}
            >
              {copiedType === 'cbe' ? <Check className="w-4.5 h-4.5" /> : <Copy className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {/* Toast notification container */}
        {copiedType && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-body-sm text-body-sm px-4 py-2 rounded-full flex items-center whitespace-nowrap z-20 animate-fadeIn">
            <Check className="w-4 h-4 mr-2" />
            <span>Copied!</span>
          </div>
        )}
      </div>

      {/* Return Home Action */}
      <div className="w-full pt-stack-md">
        <button
          onClick={onReturnToMenu}
          className="w-full py-4 px-6 bg-surface-container text-on-surface font-label-caps text-label-caps rounded-full border border-outline-variant hover:bg-surface-variant transition-colors flex items-center justify-center cursor-pointer"
        >
          Return to Menu
        </button>
      </div>
    </main>
  );
}
