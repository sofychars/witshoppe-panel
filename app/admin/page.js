import { obtenerCategorias, obtenerProductos, formatoPrecio } from "../lib/datos";
import {
  alternarCategoria,
  agregarCategoria,
  alternarProducto,
  agregarProducto,
  eliminarProducto,
} from "./acciones";

export const dynamic = "force-dynamic";

export default async function PanelAdmin() {
  const [categorias, productos] = await Promise.all([
    obtenerCategorias(),
    obtenerProductos(),
  ]);

  return (
    <div className="admin-envoltura">
      <h1 className="admin-titulo">Panel Witshoppe</h1>
      <p className="admin-subtitulo">
        Activa, desactiva y administra tus categorías y productos. Los
        cambios se ven en el sitio al instante.
      </p>

      <div className="aviso-admin">
        Esta página está protegida con usuario y contraseña. No compartas el
        enlace ni las credenciales públicamente.
      </div>

      {/* ---- Categorías ---- */}
      <section className="admin-seccion">
        <h2>Categorías</h2>
        {categorias.map((cat) => {
          const alternarConId = alternarCategoria.bind(null, cat.id);
          return (
            <div className="fila-admin" key={cat.id}>
              <div>
                <div className="nombre">{cat.nombre}</div>
                <div className="detalle">{cat.descripcion}</div>
              </div>
              <form action={alternarConId}>
                <div className="interruptor">
                  <span className="estado-texto">
                    {cat.activa ? "Activa" : "Inactiva"}
                  </span>
                  <button
                    type="submit"
                    className={cat.activa ? "activo" : ""}
                    aria-label={`Alternar categoría ${cat.nombre}`}
                  />
                </div>
              </form>
            </div>
          );
        })}

        <form action={agregarCategoria} className="form-admin">
          <div>
            <label>ID único (sin espacios)</label>
            <input name="id" placeholder="ej. bolsos" required />
          </div>
          <div>
            <label>Nombre visible</label>
            <input name="nombre" placeholder="ej. Bolsos" required />
          </div>
          <div className="campo-ancho">
            <label>Descripción corta</label>
            <input name="descripcion" placeholder="Una frase para la categoría" />
          </div>
          <button className="boton-primario" type="submit">
            Agregar categoría
          </button>
        </form>
      </section>

      {/* ---- Productos ---- */}
      <section className="admin-seccion">
        <h2>Productos</h2>
        {productos.map((p) => {
          const alternarConSlug = alternarProducto.bind(null, p.slug);
          const eliminarConSlug = eliminarProducto.bind(null, p.slug);
          return (
            <div className="fila-admin" key={p.slug}>
              <div>
                <div className="nombre">{p.nombre}</div>
                <div className="detalle">
                  {p.categoria} · {formatoPrecio(p.precio)}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <form action={alternarConSlug}>
                  <div className="interruptor">
                    <span className="estado-texto">
                      {p.activo ? "Activo" : "Inactivo"}
                    </span>
                    <button
                      type="submit"
                      className={p.activo ? "activo" : ""}
                      aria-label={`Alternar producto ${p.nombre}`}
                    />
                  </div>
                </form>
                <form action={eliminarConSlug}>
                  <button className="boton-peligro" type="submit">
                    Eliminar
                  </button>
                </form>
              </div>
            </div>
          );
        })}

        <form action={agregarProducto} className="form-admin">
          <div>
            <label>Slug único (para la URL)</label>
            <input name="slug" placeholder="ej. gafas-aviador-negras" required />
          </div>
          <div>
            <label>Nombre</label>
            <input name="nombre" required />
          </div>
          <div>
            <label>Categoría (ID)</label>
            <select name="categoria" required>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>ID en Dropi (opcional)</label>
            <input name="dropiId" />
          </div>
          <div>
            <label>Precio</label>
            <input name="precio" type="number" required />
          </div>
          <div>
            <label>Precio antes (opcional)</label>
            <input name="precioAntes" type="number" />
          </div>
          <div className="campo-ancho">
            <label>Descripción corta</label>
            <input name="descripcionCorta" />
          </div>
          <div className="campo-ancho">
            <label>Descripción larga</label>
            <textarea name="descripcionLarga" />
          </div>
          <div className="campo-ancho">
            <label>URLs de imágenes (separadas por coma)</label>
            <input name="imagenes" placeholder="https://... , https://..." />
          </div>
          <button className="boton-primario" type="submit">
            Agregar producto
          </button>
        </form>
      </section>
    </div>
  );
}
