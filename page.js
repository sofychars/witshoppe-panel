import Link from "next/link";
import Encabezado from "./components/Encabezado";
import Pie from "./components/Pie";
import { obtenerCategorias } from "./lib/datos";

export const dynamic = "force-dynamic";

export default async function Home() {
  const categorias = await obtenerCategorias();

  return (
    <>
      <Encabezado />
      <section className="heroe">
        <div className="envoltura">
          <h1>Un poco de todo, elegido con cuidado</h1>
          <p>
            Explora las categorías activas. Vamos sumando productos y
            secciones cada semana — vuelve pronto si algo aún no está
            disponible.
          </p>
        </div>
      </section>

      <section className="pasillos">
        <div className="envoltura">
          {categorias.map((cat) =>
            cat.activa ? (
              <Link key={cat.id} className="pasillo" href={`/categoria/${cat.id}`}>
                <div className="pasillo-info">
                  <h2>{cat.nombre}</h2>
                  <p>{cat.descripcion}</p>
                </div>
                <span className="pasillo-entrar">Ver productos</span>
              </Link>
            ) : (
              <div key={cat.id} className="pasillo inactivo">
                <div className="pasillo-info">
                  <h2>
                    {cat.nombre}
                    <span className="etiqueta-proximamente">Próximamente</span>
                  </h2>
                  <p>{cat.descripcion}</p>
                </div>
                <span className="pasillo-entrar">Ver productos</span>
              </div>
            )
          )}
        </div>
      </section>

      <Pie />
    </>
  );
}
