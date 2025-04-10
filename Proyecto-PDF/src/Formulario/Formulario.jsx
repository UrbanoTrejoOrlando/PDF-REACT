import { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";

export default function ProductosUI() {
  const { products, categories, fetchProducts } = useProductContext();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  useEffect(() => {
    fetchProducts();
  }, []);

  const productosFiltrados =
    categoriaSeleccionada === "Todos"
      ? products
      : products.filter((producto) => producto.category === categoriaSeleccionada);

  const manejarDescarga = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const enlaceDescarga = document.createElement("a");
    enlaceDescarga.setAttribute("href", dataStr);
    enlaceDescarga.setAttribute("download", "productos.json");
    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();
    document.body.removeChild(enlaceDescarga);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <button
          onClick={() => setCategoriaSeleccionada("Todos")}
          className={`px-4 py-2 rounded-full shadow-sm transition-all duration-300 ${
            categoriaSeleccionada === "Todos"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
        >
          Todos
        </button>
        {categories.map((categoria) => (
          <button
            key={categoria}
            onClick={() => setCategoriaSeleccionada(categoria)}
            className={`px-4 py-2 rounded-full shadow-sm transition-all duration-300 ${
              categoriaSeleccionada === categoria
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {categoria}
          </button>
        ))}
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={manejarDescarga}
          className="px-6 py-2 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-all duration-300"
        >
          Descargar Productos
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <div
              key={producto.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">{producto.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{producto.category}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No hay productos disponibles.
          </p>
        )}
      </div>
    </div>
  );
}
