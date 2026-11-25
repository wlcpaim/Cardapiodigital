import React from 'react';
import { CartItem } from '../types/delivery';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-orange-500" />
              <h2 className="text-lg font-bold text-zinc-900">Sua Sacola</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-lg text-zinc-800">Sua sacola está vazia</h3>
                <p className="text-zinc-500 text-sm mt-1 max-w-xs">
                  Explore nosso cardápio e adicione pratos deliciosos para começar.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="font-bold text-zinc-900 text-sm line-clamp-1">{item.product.name}</h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-zinc-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xs text-orange-600 font-bold mt-0.5 block">
                        R$ {Number(item.product.price).toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="text-zinc-500 hover:text-zinc-800 p-0.5"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="text-zinc-500 hover:text-zinc-800 p-0.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="font-extrabold text-zinc-900 text-sm">
                        R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-zinc-200 p-6 bg-white space-y-4">
              <div className="flex justify-between items-center text-zinc-600">
                <span>Subtotal</span>
                <span className="font-bold text-zinc-900">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-600 text-sm">
                <span>Taxa de Entrega</span>
                <span className="text-emerald-600 font-bold">Grátis</span>
              </div>
              <div className="pt-3 border-t border-zinc-100 flex justify-between items-center">
                <span className="font-extrabold text-lg text-zinc-900">Total</span>
                <span className="font-extrabold text-2xl text-orange-600">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Finalizar Pedido</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
