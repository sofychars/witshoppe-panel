# Witshoppe — Panel con clic instantáneo

Este es el panel completo: cuando activas/desactivas una categoría o
producto, o agregas uno nuevo, el sitio se actualiza al instante, sin
tocar código ni subir archivos a GitHub cada vez.

## Qué cambia frente a la versión simple
- Los datos ya NO están en archivos JSON del proyecto — viven en una
  base de datos gratuita (Upstash Redis, conectada desde Vercel).
- Tienes una página `/admin` protegida con usuario y contraseña donde
  haces clic para activar/desactivar y agregar/eliminar.
- Sigue siendo 100% gratis en el plan Hobby de Vercel.

## Paso a paso para publicarlo

### 1. Sube el proyecto a GitHub
Crea un repositorio nuevo y sube toda esta carpeta.

### 2. Crea el proyecto en Vercel
- Entra a vercel.com → "Add New Project" → importa el repositorio.
- Esta vez SÍ es un proyecto Next.js, así que Vercel detecta todo
  automáticamente (build command, etc.) — no toques esa configuración.
- Dale "Deploy" (fallará la primera vez porque falta la base de datos,
  es normal, sigue al paso 3).

### 3. Crea la base de datos (Upstash Redis, gratis)
- Dentro de tu proyecto en Vercel, ve a la pestaña **Storage**.
- "Create Database" → busca **Upstash** → elige **Redis** → plan gratuito
  → sigue los pasos → "Connect to Project".
- Esto crea las variables `UPSTASH_REDIS_REST_URL` y
  `UPSTASH_REDIS_REST_TOKEN` automáticamente. No tienes que copiarlas a mano.

### 4. Configura tu usuario, clave y WhatsApp
En tu proyecto en Vercel → **Settings → Environment Variables**, agrega:

| Nombre | Valor |
|---|---|
| `ADMIN_USER` | el usuario que quieras (ej. `sofia`) |
| `ADMIN_PASSWORD` | una contraseña segura, solo tú la debes saber |
| `NEXT_PUBLIC_WHATSAPP_NUMERO` | tu número con indicativo, sin + ni espacios (ej. `573001234567`) |

Después de agregarlas, ve a **Deployments** y vuelve a desplegar
("Redeploy") para que tomen efecto.

### 5. Llena la base de datos con las categorías y productos iniciales
Esto se hace UNA sola vez desde tu computador:

```bash
npm install -g vercel
cd witshoppe-panel
npm install
vercel link            # conecta esta carpeta a tu proyecto en Vercel
vercel env pull .env.local     # trae las claves reales de tu KV
npm run seed            # sube tus 4 categorías y productos de ejemplo
```

Si prefieres no usar la terminal para este paso, dímelo en el chat y
te ayudo a hacerlo de otra forma, o te doy los datos para que los
agregues manualmente uno por uno desde el panel `/admin` (tiene
formulario para eso).

## Cómo usarlo día a día
- Entra a `tusitio.com/admin`, el navegador te pedirá usuario y
  contraseña (los que configuraste en el paso 4).
- Ahí ves todas tus categorías y productos con un interruptor para
  activar/desactivar, y formularios para agregar nuevos.
- Cada producto tiene su propia landing page en `tusitio.com/p/slug`
  para compartir o pautar un solo producto.

## Nota sobre "cerrar sesión"
Como la protección usa autenticación básica del navegador (simple y
gratis, sin necesidad de librerías extra), no hay un botón de
"cerrar sesión" — si compartes el computador, cierra la pestaña o usa
una ventana de incógnito para que el navegador no recuerde la clave.

## Reemplaza las imágenes de ejemplo
Los productos de muestra usan imágenes de prueba
(`via.placeholder.com`). Cámbialas por las fotos reales de tus
productos de Dropi o las que generemos con IA antes de publicar en
serio.
