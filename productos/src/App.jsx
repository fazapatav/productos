import { useState, useEffect, use } from "react";
import "./App.css";

function App() {
  const API_URL = "https://69065dcdee3d0d14c135a255.mockapi.io/products";
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    console.log("Componente montado");
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        console.log("productos", data);
      });
  }, []);

  const crearProducto = () => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nombre,
        price: precio,
        category: categoria,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProductos([...productos, data]);
        setNombre("");
        setPrecio(0);
        setCategoria("");
      });
  };

  const eliminarProducto = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setProductos(productos.filter((producto) => producto.id !== id));
      });
  };

  return (
    <div className="app">
      <h1>🛒 CRUD de Productos</h1>
      {/* FORMULARIO */}
      <div className="formulario">
        <h2>{editando ? "Editar Producto" : "Agregar Producto"}</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        {editando ? (
          <button onClick={crearProducto} className="Actualizar">
            Actualizar Cambios
          </button>
        ) : (
          <button onClick={crearProducto} className="Agregar">
            Agregar Producto
          </button>
        )}
      </div>
      {/* LISTA DE PRODUCTOS */}
      <div className="lista"></div>
      <h2>Lista de Productos</h2>
      {productos.map((producto) => (
        <div key={producto.id} className="producto">
          <h3>{producto.name}</h3>
          <h3>stock: {producto.stock}</h3>
          <p>Precio: ${producto.price}</p>
          <p>Categoria: {producto.category}</p>
          <button className="editar">Editar</button>
          <button
            onClick={() => eliminarProducto(producto.id)}
            className="eliminar"
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
