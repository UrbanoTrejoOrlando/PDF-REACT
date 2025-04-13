import { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  const downloadPDF =()=>{
    const doc = new jsPDF();

      // Obtiene la fecha actual
      const today = new Date();
      const formattedDate = today.toLocaleDateString("es-ES");

      doc.setFontSize(18);
      doc.setTextColor("#e11d48");
      doc.text("Reporte - "+ formattedDate, 14,20);

      autoTable(doc,{
        startY:30,
        head:[["Categoria", "Producto", "Precio"]],
        body: productosFiltrados.map((products)=>{
          return[
            products.category, 
            products.name, 
            "$"+products.price];
        }),
        styles:{
          fontSize:12
        },
        headStyles:{
          fillColor:[244,63,94],
          textColor:[255,255,255],
          halign: "center",
        },
        bodyStyles:{
          halign: "center"
        },


      })
      doc.save(`reporte-${formattedDate}.pdf`)
  
  }

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
          onClick={downloadPDF}
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
