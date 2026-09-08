import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function obtenerCategorias() {
  return (await redis.get("categorias")) || [];
}

export async function obtenerProductos() {
  return (await redis.get("productos")) || [];
}

export async function guardarCategorias(categorias) {
  await redis.set("categorias", categorias);
}

export async function guardarProductos(productos) {
  await redis.set("productos", productos);
}

export function formatoPrecio(valor) {
  if (valor === "" || valor === null || valor === undefined) return "";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}

export function enlaceWhatsapp(producto) {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMERO || "573000000000";
  const texto = encodeURIComponent(
    `Hola, quiero más información sobre "${producto.nombre}".`
  );
  return `https://wa.me/${numero}?text=${texto}`;
}
