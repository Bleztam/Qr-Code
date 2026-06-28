/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, ShieldCheck, MapPin, Sparkles, Instagram, Send, Globe } from 'lucide-react';

interface ProfileViewProps {
  userEmail: string;
  tableNumber: string;
  onTableNumberChange: (tableNum: string) => void;
  onSwitchToAdmin: () => void;
}

export default function ProfileView({
  userEmail,
  tableNumber,
  onTableNumberChange,
  onSwitchToAdmin,
}: ProfileViewProps) {
  return (
    <div className="w-full max-w-md mx-auto py-6 px-4 flex flex-col flex-grow animate-fadeIn">
      {/* Title */}
      <div className="flex items-center gap-2.5 mb-6 border-b border-outline-variant pb-4">
        <User className="w-5 h-5 text-primary" />
        <div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-on-surface">Your Session</h1>
          <p className="font-label-caps text-label-caps text-outline">Table configuration and admin toggles</p>
        </div>
      </div>

      {/* User Card */}
      <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-5 shadow-none mb-5 flex items-center gap-4">
        <div className="w-12 h-12 bg-primary rounded-full border border-primary flex items-center justify-center text-on-primary shrink-0 font-bold text-base">
          {userEmail ? userEmail[0].toUpperCase() : 'C'}
        </div>
        <div className="min-w-0">
          <p className="font-headline-md text-[16px] md:text-headline-md text-on-surface">Customer Session</p>
          <p className="font-body-sm text-body-sm text-on-surface-variant truncate">{userEmail || 'guest@tommyjuicebar.com'}</p>
        </div>
      </div>

      {/* Table Selection Settings */}
      <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-5 shadow-none mb-5 space-y-4">
        <div className="flex items-center gap-2 text-on-surface">
          <MapPin className="w-4.5 h-4.5 text-primary" />
          <h2 className="font-headline-md text-[16px] md:text-headline-md text-on-surface">Table Allocation</h2>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Select your table number below. Newly created orders will be dispatched directly to your table.
        </p>

        <div className="grid grid-cols-4 gap-2">
          {['2', '4', '8', '12'].map((num) => {
            const isSelected = tableNumber === num;
            return (
              <button
                key={num}
                onClick={() => onTableNumberChange(num)}
                className={`py-2 rounded-xl font-label-caps text-label-caps transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-on-primary border border-primary'
                    : 'bg-surface-container text-on-surface hover:bg-surface-variant border border-transparent'
                }`}
                id={`btn-table-select-${num}`}
              >
                Table {num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contact & Socials */}
      <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-5 shadow-none mb-5 space-y-4">
        <div className="flex items-center gap-2 text-on-surface">
          <Globe className="w-4.5 h-4.5 text-primary" />
          <h2 className="font-headline-md text-[16px] md:text-headline-md text-on-surface">Orion Technologies</h2>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          For technical support, feedback, custom solutions, or business inquiries, connect with the developers at Orion Technologies.
        </p>

        <div className="grid grid-cols-3 gap-3">
          <a
            href="https://instagram.com/bleztam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container hover:bg-surface-variant transition-colors text-on-surface hover:text-primary gap-1 border border-outline-variant/20 cursor-pointer"
          >
            <Instagram className="w-5 h-5 text-primary" />
            <span className="font-label-caps text-[10px] tracking-wide mt-1 font-semibold">Instagram</span>
          </a>

          <a
            href="https://t.me/bleztam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container hover:bg-surface-variant transition-colors text-on-surface hover:text-primary gap-1 border border-outline-variant/20 cursor-pointer"
          >
            <Send className="w-5 h-5 text-primary" />
            <span className="font-label-caps text-[10px] tracking-wide mt-1 font-semibold">Telegram</span>
          </a>

          <a
            href="https://oriontechnologiesskdjf.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container hover:bg-surface-variant transition-colors text-on-surface hover:text-primary gap-1 border border-outline-variant/20 cursor-pointer"
          >
            <Globe className="w-5 h-5 text-primary" />
            <span className="font-label-caps text-[10px] tracking-wide mt-1 font-semibold">Website</span>
          </a>
        </div>
      </div>

      {/* Admin Panel Access Callout */}
      <div className="bg-surface-container-low border border-outline-variant/40 rounded-xl p-5 shadow-none mb-6 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 text-primary/5">
          <Sparkles className="w-20 h-20" />
        </div>
        
        <div className="relative z-10">
          <span className="bg-surface text-primary px-2.5 py-1 rounded-full text-[9px] font-label-caps text-label-caps mb-3 inline-block border border-outline-variant/30">
            For Reviewers & Admins
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-1.5 flex items-center gap-1.5">
            <ShieldCheck className="w-4.5 h-4.5 text-primary" />
            Restaurant Admin Panel
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-4 max-w-[280px]">
            Switch modes to manage menu items in real-time, modify payment accounts, and view live sales analytics.
          </p>

          <button
            onClick={onSwitchToAdmin}
            className="w-full py-4 bg-primary hover:bg-primary/90 text-on-primary font-headline-md text-headline-md rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            id="btn-switch-admin-card"
          >
            <ShieldCheck className="w-4.5 h-4.5" />
            Switch to Admin Area
          </button>
        </div>
      </div>
    </div>
  );
}
