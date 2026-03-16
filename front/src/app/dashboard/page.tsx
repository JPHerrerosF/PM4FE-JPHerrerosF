'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, purchases } = useAuth();

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Mi Dashboard</h1>

        {user && (
          <div className="bg-white p-8 rounded-3xl shadow-sm mb-12">
            <h2 className="text-2xl font-semibold mb-6">Datos de tu cuenta</h2>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}

        <h2 className="text-3xl font-bold mb-6">Historial de compras</h2>

        {purchases.length === 0 ? (
          <p className="text-gray-500 text-center py-12">Aún no tienes compras. ¡Agrega productos y compra!</p>
        ) : (
          <div className="space-y-6">
            {purchases.map((purchase, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-sm">
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>{new Date(purchase.date).toLocaleDateString('es-ES')}</span>
                  <span className="font-bold text-black">Total: ${purchase.total}</span>
                </div>
                
                <div className="space-y-3">
                  {purchase.products.map((item, i) => (
                    <div key={i} className="flex justify-between border-t pt-3">
                      <span>{item.name}</span>
                      <span>${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}