import "./globals.css";

export const metadata = {
  title: "Witshoppe — Un poco de todo, elegido con cuidado",
  description: "Perfumería, tecnología, gafas, relojes y más. Catálogo multinicho de Witshoppe.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Archivo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
