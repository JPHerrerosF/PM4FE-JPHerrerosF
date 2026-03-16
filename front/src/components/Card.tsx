'use client';

import { Product } from '../types/product';
import { useAuth } from '../app/context/AuthContext';
import Link from 'next/link';

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  const { cart, addToCart, removeFromCart } = useAuth();
  const isInCart = cart.some(item => item.id === product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // evita navegar al detalle
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price
    });
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault(); // evita navegar al detalle
    removeFromCart(product.id);
  };

  return (
    <Link href={`/${product.id}`}>
      <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer">
        
        <div className="relative h-80 bg-gray-50 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-semibold text-black tracking-tight">
            {product.name}
          </h2>
          
          <p className="mt-4 text-[15px] text-gray-600 line-clamp-3 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8 flex items-baseline justify-between">
            <div>
              <span className="text-4xl font-bold text-black tracking-tighter">
                ${product.price}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Stock disponible</p>
              <p className="text-lg font-medium text-emerald-600">{product.stock}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={handleAdd}
              disabled={isInCart}
              className={`w-full py-4 rounded-2xl font-medium transition-all ${
                isInCart 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-black text-white hover:bg-zinc-800'
              }`}
            >
              {isInCart ? '✓ Ya en carrito' : 'Agregar al carrito'}
            </button>

            {isInCart && (
              <button
                onClick={handleRemove}
                className="w-full py-4 rounded-2xl font-medium text-red-600 hover:bg-red-50 transition-all"
              >
                Eliminar del carrito
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}