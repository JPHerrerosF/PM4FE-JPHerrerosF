export default function Landing() {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <h1 className="text-7xl font-bold tracking-tighter mb-6">APPLEN'T</h1>
        <p className="text-2xl text-gray-400 mb-12">Tu tienda de productos Apple... o casi</p>
        
        <a 
          href="/tienda" 
          className="inline-block bg-white text-black px-14 py-6 rounded-3xl text-xl font-medium hover:bg-gray-200 transition-all"
        >
          Ver la tienda →
        </a>
      </div>
    </div>
  );
}