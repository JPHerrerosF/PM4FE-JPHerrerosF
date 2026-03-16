'use client';
import { useAuth } from '../app/context/AuthContext';
import Link from 'next/link';

export default function AuthLink() {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">Hola</span>
        <button
          onClick={logout}
          className="text-sm hover:text-red-400 transition-colors font-medium"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <Link href="/login" className="hover:text-white/80 transition-colors">
      Iniciar Sesión
    </Link>
  );
}