import Card from '../../components/Card';
import { Product } from '../../types/product';

async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3001/products', { cache: 'no-store' });
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
}

export default async function Tienda() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-5xl font-bold tracking-tighter text-center mb-16">Nuestros Productos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}