import Card from '../../components/Card';
import { Product } from '../../types/product';

async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3001/products', {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
        Nuestros Productos
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}