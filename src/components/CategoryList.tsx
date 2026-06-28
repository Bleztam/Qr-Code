/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ALL_CATEGORIES } from '../data';

interface CategoryListProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  availableCategories?: string[];
}

export default function CategoryList({
  selectedCategory,
  onSelectCategory,
  availableCategories = ALL_CATEGORIES,
}: CategoryListProps) {
  // Let's support an "All" option in category filter.
  const categoriesWithAll = ['All', ...availableCategories];

  return (
    <div className="sticky top-[64px] z-30 bg-surface/95 backdrop-blur-sm border-b border-surface-variant py-3 px-container-padding overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 w-max mx-auto max-w-[1200px] justify-start md:justify-center">
        {categoriesWithAll.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-5 py-2.5 rounded-xl font-label-caps text-label-caps transition-all active:scale-95 cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface hover:bg-surface-variant'
              }`}
              id={`btn-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
