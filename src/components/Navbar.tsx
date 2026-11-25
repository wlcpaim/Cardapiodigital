import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, UtensilsCrossed } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-zinc-900">Sabor<span className="text-orange-500">Flow</span></span>
            <span className="block text-[10px] text-zinc-500 font-medium -mt-1 tracking-wider uppercase">Delivery & Pedidos</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-600 font-semibold px-4 py-2.5 rounded-2xl transition-colors border border-orange-200"
            aria-label="Abrir sacola de compras"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden sm:inline">Sacola</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-md shadow-orange-500/30 animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
