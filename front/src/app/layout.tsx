import './globals.css';
import Link from 'next/link';
import { AuthProvider } from './context/AuthContext';
import AuthLink from '../components/AuthLink';

export const metadata = {
  title: "APPLEN'T",
  description: 'Tu tienda Apple... o casi',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased bg-zinc-50">
        <AuthProvider>
          <header className="bg-black text-white sticky top-0 z-50 border-b border-white/10">
            <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
              <Link href="/" className="text-4xl font-bold tracking-tighter">APPLEN'T</Link>
              
              <div className="flex items-center gap-10 text-sm font-medium">
                <Link href="/tienda" className="hover:text-white/80 transition-colors">Tienda</Link>
                <Link href="/dashboard" className="hover:text-white/80 transition-colors">Mi Cuenta</Link>
                <Link href="/carrito" className="hover:text-white/80 transition-colors">Carrito</Link>
                <AuthLink />
              </div>
            </nav>
          </header>

          <main className="min-h-screen">
            {children}
          </main>

          <footer className="bg-black text-white/70 py-12 text-center text-sm">
            © 2026 APPLEN'T simulada - Proyecto Henry M4
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}