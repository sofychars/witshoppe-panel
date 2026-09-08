import Encabezado from "../../components/Encabezado";
import Pie from "../../components/Pie";
import { obtenerProductos, formatoPrecio, enlaceWhatsapp } from "../../lib/datos";

export const dynamic = "force-dynamic";

export default async function PaginaProducto({ params }) {
  const { slug } = params;
  const productos = await obtenerProductos();
  const producto = productos.find((p) => p.slug === slug && p.activo);

  return (
    <>
      <Encabezado volver={{ href: "/", texto: "← Ver todo" }} />
      <section className="envoltura">
        {!producto ? (
          <div className="estado-vacio">
            Este producto no está disponible por ahora.
          </div>
        ) : (
          <div className="landing-producto">
            <div className="landing-galeria">
              {producto.imagenes.map((img, i) => (
                <img key={i} src={img} alt={producto.nombre} loading="lazy" />
              ))}
            </div>
            <div className="landing-info">
              <div className="eyebrow-categoria">{producto.categoria}</div>
              <h1>{producto.nombre}</h1>
              <div className="precios">
                {producto.precioAntes && (
                  <span className="precio-antes">
                    {formatoPrecio(producto.precioAntes)}
                  </span>
                )}
                <span className="precio">{formatoPrecio(producto.precio)}</span>
              </div>
              <p className="descripcion">
                {producto.descripcionLarga || producto.descripcionCorta}
              </p>
              <a
                className="boton-whatsapp"
                href={enlaceWhatsapp(producto)}
                target="_blank"
                rel="noopener"
              >
                Pedir por WhatsApp
              </a>
            </div>
          </div>
        )}
      </section>
      <Pie />
    </>
  );
}
