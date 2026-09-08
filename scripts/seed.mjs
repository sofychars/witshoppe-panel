// Ejecuta esto UNA sola vez para poblar tu base de datos con las
// categorías y productos iniciales.
//
// Pasos:
// 1. npm install
// 2. Instala la CLI de Vercel si no la tienes: npm i -g vercel
// 3. vercel link        (conecta esta carpeta a tu proyecto en Vercel)
// 4. vercel env pull .env.local   (trae las variables de tu KV real)
// 5. npm run seed

import { Redis } from "@upstash/redis";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const redis = Redis.fromEnv();
const __dirname = dirname(fileURLToPath(import.meta.url));

const categorias = JSON.parse(
  readFileSync(join(__dirname, "..", "data", "categorias.json"), "utf-8")
);
const productos = JSON.parse(
  readFileSync(join(__dirname, "..", "data", "productos.json"), "utf-8")
);

async function main() {
  await redis.set("categorias", categorias);
  await redis.set("productos", productos);
  console.log(`Listo: ${categorias.length} categorías y ${productos.length} productos guardados en Vercel KV.`);
}

main().catch((err) => {
  console.error("Error al poblar la base de datos:", err);
  process.exit(1);
});
