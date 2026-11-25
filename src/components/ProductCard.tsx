import React from 'react';
import { Product } from '../types/delivery';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
      <div className="relative h-48 overflow-hidden bg-zinc-100">
        <img
          src={product.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-zinc-800 shadow-sm">
          {product.category}
        </div>
        {!product.available && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-red-500 text-white font-bold px-4 py-1.5 rounded-xl text-sm shadow-lg">
              Esgotado
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-zinc-900 group-hover:text-orange-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-zinc-500 text-sm mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 block font-medium">Preço</span>
            <span className="text-xl font-extrabold text-zinc-900">
              R$ {Number(product.price).toFixed(2).replace('.', ',')}
            </span>
          </div>

          <button
            disabled={!product.available}
            onClick={() => onAddToCart(product)}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-200 disabled:text-zinc-400 text-white p-3 rounded-2xl shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 transition-all flex items-center justify-center active:scale-95"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
