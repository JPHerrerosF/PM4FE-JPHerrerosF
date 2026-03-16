'use client';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const storedUser = localStorage.getItem(`user_${email}`);
    if (!storedUser) {
      setError('Usuario no encontrado, regístrate primero');
      setLoading(false);
      return;
    }

    const userData = JSON.parse(storedUser);

    if (userData.password !== password) {
      setError('Contraseña incorrecta');
      setLoading(false);
      return;
    }

    const fakeToken = 'fake-jwt-token-' + Date.now();
    login({ name: userData.name, email: userData.email }, fakeToken);
    setSuccess(true);
    setTimeout(() => { window.location.href = '/'; }, 1500);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8">Iniciar Sesión</h1>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-2xl mb-8 text-center">
          ¡Inicio de sesión exitoso!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
          {loading ? 'Iniciando...' : 'Iniciar Sesión'}
        </button>
        <p className="text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
}