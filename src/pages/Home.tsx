import React, { useEffect, useState } from 'react';
import { Product, Category, CartItem } from '../types/delivery';
import { getProducts } from '../services/delivery';
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { Search, Flame, Clock, ShieldCheck, Bike, Sparkles } from 'lucide-react';

interface HomeProps {
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ cart, onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const highlights = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* Hero Banner */}
      <div className="bg-zinc-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Entrega Rápida & Comida Fresca</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Sua fome saciada com <span className="text-orange-500">sabor inigualável</span>
            </h1>
            <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed">
              Burgers artesanais, pizzas napolitanas e pratos orientais preparados com ingredientes selecionados e entregues quentinhos na sua porta.
            </p>

            {/* Search Bar */}
            <div className="mt-8 relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="O que você quer comer hoje? (Ex: Burger, Pizza...)"
                className="w-full bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm font-medium transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Bar */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 text-sm">Entrega Ultra Rápida</h4>
                <p className="text-zinc-500 text-xs mt-0.5">Em média 35 minutos até você</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 text-sm">Ingredientes Frescos</h4>
                <p className="text-zinc-500 text-xs mt-0.5">Qualidade premium garantida</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 text-sm">Pagamento Seguro</h4>
                <p className="text-zinc-500 text-xs mt-0.5">Pix, Cartão ou Dinheiro</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {highlights.length > 0 && searchQuery === '' && selectedCategory === 'Todos' && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Flame className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-extrabold text-zinc-900">Destaques do Dia</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map(product => (
                <ProductCard key={'high-' + product.id} product={product} onAddToCart={onAddToCart} />
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-zinc-900">Nosso Cardápio</h2>
              <p className="text-zinc-500 text-sm mt-1">Escolha suas categorias favoritas</p>
            </div>
            <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="bg-white rounded-3xl h-80 animate-pulse border border-zinc-200" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-zinc-200 p-12 text-center">
              <h3 className="font-bold text-lg text-zinc-800">Nenhum produto encontrado</h3>
              <p className="text-zinc-500 text-sm mt-1">Tente buscar por outro termo ou categoria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Institutional Footer */}
      <footer className="bg-white border-t border-zinc-200 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="font-extrabold text-zinc-900">SaborFlow Delivery & Pedidos</span>
            <p className="text-xs text-zinc-500 mt-1">© {new Date().getFullYear()} Todos os direitos reservados.</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <span>Termos de Uso</span>
            <span>Privacidade</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
