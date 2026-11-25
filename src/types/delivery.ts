export type Category = 'Burgers' | 'Pizzas' | 'Japonesa' | 'Bebidas' | 'Sobremesas';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image_url: string;
  available: boolean;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'recebido' | 'preparando' | 'entrega' | 'entregue' | 'cancelado';

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  created_at: string;
}
