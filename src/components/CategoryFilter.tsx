import React from 'react';
import { Category } from '../types/delivery';

interface CategoryFilterProps {
  selectedCategory: Category | 'Todos';
  onSelectCategory: (category: Category | 'Todos') => void;
}

const categories: (Category | 'Todos')[] = ['Todos', 'Burgers', 'Pizzas', 'Japonesa', 'Bebidas', 'Sobremesas'];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-5 py-2.5 rounded-2xl font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
              isSelected
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 scale-[1.02]'
                : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
