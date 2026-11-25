import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Product, Order, OrderStatus } from '../types/delivery';

const LOCAL_PRODUCTS_KEY = 'saborflow_local_products';
const LOCAL_ORDERS_KEY = 'saborflow_local_orders';

const defaultProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Burger Artesanal Trufado',
    description: 'Pão brioche selado na manteiga, burger 180g 100% Angus, queijo cheddar inglês, bacon crocante e maionese trufada.',
    price: 42.90,
    category: 'Burgers',
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-2',
    name: 'Pizza Napolitana Margherita',
    description: 'Massa fermentada por 48h, molho de tomates rústicos italianos, mozzarella di búfala fresca, manjericão e azeite extra virgem.',
    price: 68.00,
    category: 'Pizzas',
    image_url: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80',
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-3',
    name: 'Poke de Salmão Fresco',
    description: 'Base de arroz japonês, cubos de salmão fresco temperados, abacate, pepino sunomono, manga, gergelim e molho ponzu.',
    price: 54.50,
    category: 'Japonesa',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-4',
    name: 'Smash Burger Bacon Double',
    description: 'Dois blends smash de 90g, muito queijo cheddar derretido, duplo bacon crocante e molho especial da casa no pão potato.',
    price: 38.00,
    category: 'Burgers',
    image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-5',
    name: 'Coca-Cola Zero Lata 350ml',
    description: 'Gelada, perfeita para acompanhar seu pedido.',
    price: 7.00,
    category: 'Bebidas',
    image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-6',
    name: 'Petit Gâteau com Sorvete',
    description: 'Bolo de chocolate belo recheado com ganache quente e acompanhado de sorvete de baunilha artesanal.',
    price: 24.90,
    category: 'Sobremesas',
    image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    available: true,
    created_at: new Date().toISOString()
  }
];

function getLocalProducts(): Product[] {
  try {
    const stored = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    if (!stored) {
      localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(defaultProducts));
      return defaultProducts;
    }
    return JSON.parse(stored);
  } catch {
    return defaultProducts;
  }
}

function saveLocalProducts(products: Product[]) {
  try {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
  } catch {}
}

function getLocalOrders(): Order[] {
  try {
    const stored = localStorage.getItem(LOCAL_ORDERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveLocalOrders(orders: Order[]) {
  try {
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
  } catch {}
}

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    return getLocalProducts();
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error || !data || data.length === 0) {
      return getLocalProducts();
    }
    return data as Product[];
  } catch {
    return getLocalProducts();
  }
}

export async function createOrder(orderData: Omit<Order, 'id' | 'created_at' | 'status'>): Promise<Order> {
  const newOrder: Order = {
    ...orderData,
    id: 'ord-' + Math.random().toString(36).substring(2, 9),
    status: 'recebido',
    created_at: new Date().toISOString()
  };

  if (!isSupabaseConfigured) {
    const orders = getLocalOrders();
    orders.unshift(newOrder);
    saveLocalOrders(orders);
    return newOrder;
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: newOrder.customer_name,
          phone: newOrder.phone,
          address: newOrder.address,
          items: newOrder.items,
          total: newOrder.total,
          status: 'recebido'
        }
      ])
      .select();

    if (error || !data || data.length === 0) {
      const orders = getLocalOrders();
      orders.unshift(newOrder);
      saveLocalOrders(orders);
      return newOrder;
    }

    return {
      id: data[0].id,
      customer_name: data[0].customer_name,
      phone: data[0].phone,
      address: data[0].address,
      items: data[0].items,
      total: Number(data[0].total),
      status: data[0].status,
      created_at: data[0].created_at
    };
  } catch {
    const orders = getLocalOrders();
    orders.unshift(newOrder);
    saveLocalOrders(orders);
    return newOrder;
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  if (!isSupabaseConfigured) {
    const orders = getLocalOrders();
    return orders.find(o => o.id === id) || null;
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      const orders = getLocalOrders();
      return orders.find(o => o.id === id) || null;
    }

    return {
      id: data.id,
      customer_name: data.customer_name,
      phone: data.phone,
      address: data.address,
      items: data.items,
      total: Number(data.total),
      status: data.status,
      created_at: data.created_at
    };
  } catch {
    const orders = getLocalOrders();
    return orders.find(o => o.id === id) || null;
  }
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  if (!isSupabaseConfigured) {
    const orders = getLocalOrders();
    const idx = orders.findIndex(o => o.id === id);
    if (idx !== -1) {
      orders[idx].status = status;
      saveLocalOrders(orders);
    }
    return;
  }

  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);

    if (error) {
      const orders = getLocalOrders();
      const idx = orders.findIndex(o => o.id === id);
      if (idx !== -1) {
        orders[idx].status = status;
        saveLocalOrders(orders);
      }
    }
  } catch {
    const orders = getLocalOrders();
    const idx = orders.findIndex(o => o.id === id);
    if (idx !== -1) {
      orders[idx].status = status;
      saveLocalOrders(orders);
    }
  }
}

export async function getAdminOrders(): Promise<Order[]> {
  if (!isSupabaseConfigured) {
    return getLocalOrders();
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return getLocalOrders();
    }

    return data.map((d: any) => ({
      id: d.id,
      customer_name: d.customer_name,
      phone: d.phone,
      address: d.address,
      items: d.items,
      total: Number(d.total),
      status: d.status,
      created_at: d.created_at
    }));
  } catch {
    return getLocalOrders();
  }
}

export async function createProduct(productData: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
  const newProd: Product = {
    ...productData,
    id: 'prod-' + Math.random().toString(36).substring(2, 9),
    created_at: new Date().toISOString()
  };

  if (!isSupabaseConfigured) {
    const prods = getLocalProducts();
    prods.unshift(newProd);
    saveLocalProducts(prods);
    return newProd;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select();

    if (error || !data) {
      const prods = getLocalProducts();
      prods.unshift(newProd);
      saveLocalProducts(prods);
      return newProd;
    }
    return data[0] as Product;
  } catch {
    const prods = getLocalProducts();
    prods.unshift(newProd);
    saveLocalProducts(prods);
    return newProd;
  }
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<void> {
  if (!isSupabaseConfigured) {
    const prods = getLocalProducts();
    const idx = prods.findIndex(p => p.id === id);
    if (idx !== -1) {
      prods[idx] = { ...prods[idx], ...updates };
      saveLocalProducts(prods);
    }
    return;
  }

  try {
    await supabase.from('products').update(updates).eq('id', id);
  } catch {
    const prods = getLocalProducts();
    const idx = prods.findIndex(p => p.id === id);
    if (idx !== -1) {
      prods[idx] = { ...prods[idx], ...updates };
      saveLocalProducts(prods);
    }
  }
}

export async function deleteProduct(id: string): Promise<void> {
  if (!isSupabaseConfigured) {
    const prods = getLocalProducts();
    saveLocalProducts(prods.filter(p => p.id !== id));
    return;
  }

  try {
    await supabase.from('products').delete().eq('id', id);
  } catch {
    const prods = getLocalProducts();
    saveLocalProducts(prods.filter(p => p.id !== id));
  }
}
