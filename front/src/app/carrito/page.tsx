'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';

export default function Carrito() {
  const { cart, removeFromCart, completePurchase } = useAuth();
  const [purchased, setPurchased] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleComprar = () => {
    completePurchase();
    setPurchased(true);
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Mi Carrito</h1>

        {purchased ? (
          <div className="text-center py-20 bg-green-50 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-green-700 mb-4">¡Compra realizada con éxito!</h2>
            <p className="text-gray-600 mb-8">Tu historial se ha actualizado.</p>
            
            <div className="flex flex-col gap-4 max-w-xs mx-auto">
              <Link href="/dashboard" className="bg-black text-white py-4 rounded-2xl font-medium hover:bg-zinc-800">
                Ver historial en Dashboard
              </Link>
              <Link href="/tienda" className="border border-gray-300 py-4 rounded-2xl font-medium hover:bg-gray-50">
                Volver a la tienda
              </Link>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">Tu carrito está vacío</p>
            <Link href="/tienda" className="mt-6 inline-block bg-black text-white px-8 py-4 rounded-2xl hover:bg-zinc-800">
              Ir a la tienda
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-2xl font-bold">${item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-500 font-medium"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-white p-8 rounded-3xl shadow-sm">
              <div className="flex justify-between text-3xl font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
              <button
                onClick={handleComprar}
                className="mt-8 w-full bg-black text-white py-5 rounded-2xl text-lg font-medium hover:bg-zinc-800 transition-all"
              >
                Realizar compra
              </button>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}