"use server";

import { revalidatePath } from "next/cache";
import {
  obtenerCategorias,
  obtenerProductos,
  guardarCategorias,
  guardarProductos,
} from "../lib/datos";

function refrescar() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/categoria/[cat]", "page");
  revalidatePath("/p/[slug]", "page");
}

export async function alternarCategoria(id) {
  const categorias = await obtenerCategorias();
  const actualizadas = categorias.map((c) =>
    c.id === id ? { ...c, activa: !c.activa } : c
  );
  await guardarCategorias(actualizadas);
  refrescar();
}

export async function agregarCategoria(formData) {
  const id = String(formData.get("id")).trim();
  if (!id) return;
  const categorias = await obtenerCategorias();
  if (categorias.some((c) => c.id === id)) return;
  categorias.push({
    id,
    nombre: String(formData.get("nombre") || id),
    descripcion: String(formData.get("descripcion") || ""),
    activa: true,
  });
  await guardarCategorias(categorias);
  refrescar();
}

export async function alternarProducto(slug) {
  const productos = await obtenerProductos();
  const actualizados = productos.map((p) =>
    p.slug === slug ? { ...p, activo: !p.activo } : p
  );
  await guardarProductos(actualizados);
  refrescar();
}

export async function agregarProducto(formData) {
  const slug = String(formData.get("slug")).trim();
  if (!slug) return;
  const productos = await obtenerProductos();
  if (productos.some((p) => p.slug === slug)) return;

  const precioAntesRaw = formData.get("precioAntes");
  const imagenesRaw = String(formData.get("imagenes") || "");

  productos.push({
    slug,
    nombre: String(formData.get("nombre") || ""),
    categoria: String(formData.get("categoria") || ""),
    precio: Number(formData.get("precio") || 0),
    precioAntes: precioAntesRaw ? Number(precioAntesRaw) : "",
    descripcionCorta: String(formData.get("descripcionCorta") || ""),
    descripcionLarga: String(formData.get("descripcionLarga") || ""),
    imagenes: imagenesRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    dropiId: String(formData.get("dropiId") || ""),
    activo: true,
    destacado: false,
  });

  await guardarProductos(productos);
  refrescar();
}

export async function eliminarProducto(slug) {
  const productos = await obtenerProductos();
  const filtrados = productos.filter((p) => p.slug !== slug);
  await guardarProductos(filtrados);
  refrescar();
}
