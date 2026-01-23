# Gim Frontend — Angular

Frontend web para la gestión de gimnasios (usuarios, socios, planes, inscripciones, pagos e ingresos).  
Proyecto construido con **Angular** y consumiendo la API del backend (`gim_backend`).

---

## 🚀 Stack

- Angular (CLI)
- TypeScript
- RxJS
- Bootstrap (si aplica en tu proyecto)
- SweetAlert2 (si aplica en tu proyecto)

---

## 📋 Requisitos

- Node.js 18+ (recomendado)
- npm 9+
- Backend corriendo (ver README del backend)

---

## 📦 Instalación

```bash
git clone https://github.com/facuduran31/gim_frontend.git
cd gim_frontend
npm install
```

---

## ⚙️ Configuración (API URL / Entornos)

### Opción A (recomendada): `environment.ts`

En Angular lo estándar es configurar la URL de la API en `src/environments/`.

Creá / verificá estos archivos:

**`src/environments/environment.ts`**

```ts
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000",
};
```

**`src/environments/environment.prod.ts`**

```ts
export const environment = {
  production: true,
  urlApi: "https://TU_BACKEND_EN_PROD",
};
```

Asegurate de importar así:

```ts
import { environment } from "src/environments/environment";
```

> Si en tu proyecto estabas importando `environment` de otra forma, migrarlo a este estándar evita errores de build y hace más fácil el deploy.

---

### Opción B: Proxy (para cookies JWT + CORS en dev)

Si el backend autentica con **cookie httpOnly**, es común evitar CORS usando proxy.

1. Crear `proxy.conf.json` en la raíz:

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

2. En tus servicios, llamás a la API con prefijo `/api`:

- Ej: `/api/usuarios/login` en lugar de `http://localhost:3000/usuarios/login`

3. Levantar Angular con:

```bash
ng serve --proxy-config proxy.conf.json
```

---

## ▶️ Ejecutar

### Desarrollo

```bash
npm start
# o
ng serve
```

Por defecto:

- `http://localhost:4200`

### Build producción

```bash
npm run build
# o
ng build --configuration production
```

El output queda en:

- `dist/`

---

## 🔐 Autenticación (cómo funciona)

El login se hace contra:

- `POST /usuarios/login` (backend)

Según tu backend, el token puede viajar:

- en cookie `authToken` (recomendado para browser)
- y/o en header `Authorization: Bearer <token>`

### Recomendaciones para el frontend

- Si usás **cookie httpOnly**, en los `fetch/httpClient` asegurate de enviar credenciales:
  - `withCredentials: true` en Angular HttpClient
- Si usás **Bearer**, guardá el token en memoria / storage (según tu decisión) y agregalo con un **Interceptor**.

> Ideal: usar un `AuthInterceptor` que agregue token o habilite `withCredentials` en cada request.

---

## 🧭 Pantallas / Módulos (conceptual)

Dependiendo de tu implementación, normalmente se organiza en módulos/features como:

- Auth / Login
- Gimnasios (configuración / datos del gimnasio)
- Socios (alta, baja, listado, búsqueda por DNI)
- Planes (ABM de planes)
- Inscripciones (asignar plan y vigencias)
- Pagos (registrar pago, historial)
- Ingresos (validación de ingreso / listado)

---

## 🌐 Endpoints que consume (resumen)

Tu frontend consume la API del backend. Endpoints principales:

- Usuarios: `/usuarios/login`, `/usuarios/me`, `/usuarios/logout`
- Gimnasios: `/gimnasios`, `/gimnasios/:id`
- Socios: `/socios`, `/socios/gimnasio/:idGimnasio`, `/socios/gimnasio/:idGimnasio/con-plan-actual`
- Planes: `/planes`, `/planes/gimnasio/:idGimnasio`, `/planes/actual/:idSocio`
- Inscripciones: `/inscripciones`, `/inscripciones/actual/:idSocio`
- Pagos: `/pagos`, `/pagos/socio-plan/:idSocioPlan`, `/pagos/gimnasio/:idGimnasio`
- Ingresos: `/ingresos`, `/ingresos/validar`

> Para el detalle completo, ver el README del backend.

---

## 🧰 Scripts útiles

Los scripts reales pueden variar según tu `package.json`, pero típicamente:

```bash
npm start       # levanta el servidor dev
npm run build   # build de producción
npm test        # tests
npm run lint    # lint
npm run format  # (si agregaste prettier) formatear
```

---

## 🧼 Formateo (Ctrl + S)

Recomendación: usar **Prettier + ESLint** y settings de VS Code:

- `.prettierrc`
- `.prettierignore`
- `.vscode/settings.json` con `editor.formatOnSave: true`

Si ya lo configuraste, con `Ctrl + S` se ajusta la indentación automáticamente.

---

## 🐞 Troubleshooting

### 1) Problemas de CORS / cookies

- Usar `proxy.conf.json` en desarrollo (recomendado)
- O habilitar `withCredentials` y configurar CORS en backend

### 2) API URL incorrecta

- Verificar `environment.urlApi`
- Verificar que backend esté corriendo en el puerto correcto

### 3) Login funciona pero luego no “queda logueado”

- Si el backend usa cookie httpOnly, necesitás:
  - `withCredentials: true` en Angular
  - CORS en backend con credenciales habilitadas, o proxy

---

## 📄 Licencia

MIT
