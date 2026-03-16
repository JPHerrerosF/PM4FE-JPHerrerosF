import { Product } from '../../types/product';
import { notFound } from 'next/navigation';
import AddToCartButton from '../../components/AddToCartButton';

async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3001/products', { cache: 'no-store' });
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">{product.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full rounded-2xl shadow-xl"
          />
        </div>
        <div className="space-y-6">
          <p className="text-lg text-gray-600">{product.description}</p>
          <p className="text-4xl font-bold text-green-600">${product.price}</p>
          <p className="text-xl">Stock disponible: {product.stock}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}