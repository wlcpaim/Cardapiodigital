-- SaborFlow Database Schema

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  items JSONB NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'recebido',
  user_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Public update orders" ON orders FOR UPDATE USING (true);

-- Seed initial products
INSERT INTO products (name, description, price, category, image_url, available) VALUES
('Burger Artesanal Trufado', 'Pão brioche selado na manteiga, burger 180g 100% Angus, queijo cheddar inglês, bacon crocante e maionese trufada.', 42.90, 'Burgers', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', true),
('Pizza Napolitana Margherita', 'Massa fermentada por 48h, molho de tomates rústicos italianos, mozzarella di búfala fresca, manjericão e azeite extra virgem.', 68.00, 'Pizzas', 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80', true),
('Poke de Salmão Fresco', 'Base de arroz japonês, cubos de salmão fresco temperados, abacate, pepino sunomono, manga, gergelim e molho ponzu.', 54.50, 'Japonesa', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', true),
('Smash Burger Bacon Double', 'Dois blends smash de 90g, muito queijo cheddar derretido, duplo bacon crocante e molho especial da casa no pão potato.', 38.00, 'Burgers', 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80', true),
('Coca-Cola Zero Lata 350ml', 'Gelada, perfeita para acompanhar seu pedido.', 7.00, 'Bebidas', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80', true),
('Petit Gâteau com Sorvete', 'Bolo de chocolate belo recheado com ganache quente e acompanhado de sorvete de baunilha artesanal.', 24.90, 'Sobremesas', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80', true);
