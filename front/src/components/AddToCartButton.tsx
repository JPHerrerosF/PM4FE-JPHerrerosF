'use client';

import { useAuth } from '../app/context/AuthContext';
import { Product } from '../types/product';

export default function AddToCartButton({ product }: { product: Product }) {
  const { cart, addToCart, removeFromCart } = useAuth();
  const isInCart = cart.some(item => item.id === product.id);

  return (
    <div className="space-y-3">
      <button
        onClick={() => addToCart({ id: product.id, name: product.name, price: product.price })}
        disabled={isInCart}
        className={`w-full py-4 rounded-xl text-lg font-medium transition-all ${
          isInCart
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isInCart ? '✓ Ya en carrito' : 'Agregar al carrito'}
      </button>

      {isInCart && (
        <button
          onClick={() => removeFromCart(product.id)}
          className="w-full py-4 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          Eliminar del carrito
        </button>
      )}
    </div>
  );
}