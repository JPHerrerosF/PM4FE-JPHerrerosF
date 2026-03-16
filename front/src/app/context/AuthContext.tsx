'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
}

interface Purchase {
  date: string;
  products: CartItem[];
  total: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  cart: CartItem[];
  purchases: Purchase[];
  login: (userData: User, newToken: string) => void;
  logout: () => void;
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  completePurchase: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedCart = localStorage.getItem('cart');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setToken(storedToken);

      const key = `purchases_${parsedUser.email}`;
      const storedPurchases = localStorage.getItem(key);
      if (storedPurchases) setPurchases(JSON.parse(storedPurchases));
    }
    if (storedCart) setCart(JSON.parse(storedCart));

    setLoading(false);
  }, []);

  const login = (userData: User, newToken: string) => {
    setUser(null);
    setToken(null);
    setCart([]);
    setPurchases([]);

    setUser(userData);
    setToken(newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', newToken);

    const key = `purchases_${userData.email}`;
    const storedPurchases = localStorage.getItem(key);
    setPurchases(storedPurchases ? JSON.parse(storedPurchases) : []);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
    setPurchases([]);  
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    localStorage.removeItem('user');  
  };

  const addToCart = (product: CartItem) => {
    if (!cart.some(item => item.id === product.id)) {
      const newCart = [...cart, product];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const removeFromCart = (id: number) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const completePurchase = () => {
    if (cart.length === 0 || !user) return;

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const newPurchase: Purchase = {
      date: new Date().toISOString(),
      products: [...cart],
      total
    };

    const newPurchases = [newPurchase, ...purchases];
    setPurchases(newPurchases);

    const key = `purchases_${user.email}`;
    localStorage.setItem(key, JSON.stringify(newPurchases));

    clearCart();
  };

  return (
    <AuthContext.Provider value={{
      user, token, loading, cart, purchases,
      login, logout, addToCart, removeFromCart, clearCart, completePurchase
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}