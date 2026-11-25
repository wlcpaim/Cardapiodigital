import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Package, LayoutDashboard, LogOut } from 'lucide-react';
import { AUTH_STORAGE_KEY } from '../lib/constants';

export const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    navigate('/admin/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-full md:w-64 bg-zinc-900 text-zinc-300 flex flex-col justify-between shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-white">Sabor<span className="text-orange-500">Flow</span></span>
            <span className="block text-[10px] text-zinc-400 uppercase tracking-widest">Painel Admin</span>
          </div>
        </div>

        <nav className="space-y-2">
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${
              isActive('/admin')
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Gestão & Pedidos
          </Link>
        </nav>
      </div>

      <div className="p-6 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sair da Conta
        </button>
      </div>
    </aside>
  );
};
