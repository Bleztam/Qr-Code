/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Utensils, Search, Shield } from 'lucide-react';
import { AppTab } from '../types';

interface HeaderProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  onSearchToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showSearch: boolean;
}

export default function Header({
  currentTab,
  onTabChange,
  onSearchToggle,
  searchQuery,
  onSearchChange,
  showSearch,
}: HeaderProps) {
  return (
    <header className="bg-surface w-full sticky top-0 z-40 border-b border-outline-variant flex flex-col items-center px-container-padding">
      <div className="flex justify-between items-center w-full max-w-[1200px] h-[64px] relative">
        {/* Restaurant Icon */}
        <button
          onClick={() => onTabChange('Menu')}
          className="text-primary dark:text-primary-fixed hover:opacity-90 active:scale-95 transition-transform flex items-center justify-center w-12 h-12 rounded-full cursor-pointer"
          id="btn-header-logo"
        >
          <Utensils className="w-5 h-5" />
        </button>

        {/* Brand Name */}
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary dark:text-primary-fixed-dim tracking-tight">
          FreshServe
        </h1>

        {/* Right Side Buttons: Admin Shield and Search */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onTabChange(currentTab === 'Admin' ? 'Menu' : 'Admin')}
            className={`p-2 rounded-full transition-all cursor-pointer ${
              currentTab === 'Admin' 
                ? 'bg-primary text-on-primary' 
                : 'text-primary hover:bg-surface-container'
            }`}
            title="Switch to Admin Dashboard"
            id="btn-header-admin-toggle"
          >
            <Shield className="w-4.5 h-4.5" />
          </button>
          
          <button
            onClick={onSearchToggle}
            className={`text-primary hover:bg-surface-container active:scale-95 transition-transform flex items-center justify-center w-12 h-12 rounded-full cursor-pointer ${
              showSearch ? 'bg-surface-container' : ''
            }`}
            id="btn-header-search"
          >
            <Search className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {showSearch && (
        <div className="w-full max-w-[1200px] pb-3 px-2 flex animate-fadeIn">
          <input
            type="text"
            placeholder="Search our delicious fresh menu..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2 text-xs font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface placeholder-on-surface-variant/40"
            id="input-header-search-query"
            autoFocus
          />
        </div>
      )}
    </header>
  );
}
