import Link from "next/link";
import Encabezado from "../../components/Encabezado";
import Pie from "../../components/Pie";
import { obtenerCategorias, obtenerProductos, formatoPrecio } from "../../lib/datos";

export const dynamic = "force-dynamic";

export default async function PaginaCategoria({ params }) {
  const { cat } = params;
  const [categorias, productos] = await Promise.all([
    obtenerCategorias(),
    obtenerProductos(),
  ]);

  const categoria = categorias.find((c) => c.id === cat);
  const productosCategoria = productos.filter(
    (p) => p.categoria === cat && p.activo
  );

  return (
    <>
      <Encabezado volver={{ href: "/", texto: "← Todas las categorías" }} />
      <section className="heroe">
        <div className="envoltura">
          <h1>{categoria ? categoria.nombre : "Categoría no encontrada"}</h1>
          <p>{categoria?.descripcion}</p>
        </div>
      </section>

      <section className="envoltura">
        <div className="grilla-productos">
          {productosCategoria.length === 0 && (
            <div className="estado-vacio">
              Aún no hay productos publicados en esta categoría. Vuelve
              pronto.
            </div>
          )}
          {productosCategoria.map((p) => (
            <div className="tarjeta-producto" key={p.slug}>
              <Link href={`/p/${p.slug}`} className="imagen-caja">
                <img src={p.imagenes[0]} alt={p.nombre} loading="lazy" />
              </Link>
              <div className="cuerpo">
                <h3>{p.nombre}</h3>
                <div>
                  {p.precioAntes && (
                    <span className="precio-antes">
                      {formatoPrecio(p.precioAntes)}
                    </span>
                  )}
                  <span className="precio">{formatoPrecio(p.precio)}</span>
                </div>
                <Link className="ver-producto" href={`/p/${p.slug}`}>
                  Ver detalle
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Pie />
    </>
  );
}
