import Link from "next/link";

const URL_ESTRELLAS =
  "https://checkout.estrellas.app/co/store?storeSlug=witshoppe&groupSlug=9l2p";

export default function Encabezado({ volver }) {
  return (
    <header className="encabezado">
      <div className="envoltura">
        <Link className="marca" href="/">
          Wit<span>shoppe</span>
        </Link>
        <nav className="nav-derecha">
          {volver && (
            <Link className="nav-volver" href={volver.href}>
              {volver.texto}
            </Link>
          )}
          <a
            className="nav-estrellas"
            href={URL_ESTRELLAS}
            target="_blank"
            rel="noopener"
          >
            Catálogo de marca
          </a>
        </nav>
      </div>
    </header>
  );
}
