prueba-practica-frontend
Incluye:
# Dashboard de Gestión de Facturas (React)

Un panel web para gestionar facturas que demuestra autenticación con rutas protegidas, consumo de API con interceptores, manejo de estado con Context + hooks personalizados, y una UI/UX cuidada (alerts, spinners, transiciones y diseño responsive).

---

## Arquitectura y decisiones técnicas

**Stack principal**
- **React 18** con componentes funcionales y hooks.
- **React Router 6** para el enrutamiento y rutas protegidas.
- **Axios** con **interceptores** (token en `Authorization`, manejo de `401`).
- **Bootstrap 5 (CDN)** para estilos base y responsive.
- **Context API** para estado global de autenticación y de facturas.

**Estructura por features**
```
src/
  components/
    layout/           # Layout con Sidebar, Logout y Simular 401
    ui/               # AlertProvider (alerts globales)
  features/
    auth/
      components/     # Login, PrivateRoute
      context/        # AuthContext (token simulado)
      hooks/          # useAuth()
    facturas/
      components/     # Listado, Detalle, Formulario
      context/        # FacturasContext (CRUD simulado)
      hooks/          # useFacturas()
  services/           # api.js (Axios configurado)
  utils/              # helpers (paginación, orden)
  App.jsx, main.jsx, index.css
```

**Decisiones clave**
- **Estado compartido** con `FacturasProvider` para que Listado, Detalle y Form usen el mismo store (evita inconsistencias y garantiza que crear/editar/eliminar se refleje de inmediato).
- **Interceptors**: en cada request se añade el token; ante `401` se emite un evento global que muestra **alert de sesión expirada** y navega a `/login`.
- **UI/UX**: alerts flotantes (feedback), spinners en cargas y botones, transiciones suaves (fade-in) y esquema responsive; botones de paginación con mejor contraste.
- **Estados de facturas**: mezcla determinista (≈ 1/3 **Pagadas** y el resto **Pendientes**) basada en `id` para mantener coherencia.

---

## Instrucciones de instalación y uso

1. **Instalar dependencias**
   ```bash
   npm install
   ```
2. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```
3. **Abrir la aplicación**
   - Navega a `http://localhost:5173`.
4. **Autenticación**
   - Ingresa con las **credenciales de prueba** (ver más abajo).
   - Si ya tienes sesión (token en `localStorage`), verás el dashboard directamente. Puedes cerrar sesión desde el sidebar.

5. **Simular sesión expirada (401)**
   - En el sidebar, pulsa **“Simular 401”**: verás un **alert** de “Sesión expirada” y serás redirigido al login.

---

## Tecnologías usadas
- **React 18** (componentes y hooks).
- **React Router 6** (rutas y protección).
- **Axios** (cliente HTTP con interceptores).
- **Bootstrap 5** (CDN) para estilos y responsive.

---

## Scripts disponibles
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

- `npm run dev`: inicia el servidor de desarrollo (Vite).
- `npm run build`: genera el build de producción.
- `npm run preview`: sirve el build generado para ver la app como producción.

---

## Credenciales de prueba
- **Usuario**: `admin`
- **Contraseña**: `admin123`
- **Token simulado**: `fake-jwt-token-12345` (se guarda en `localStorage`).

---

## Rutas principales
- `/login` – pantalla de ingreso.
- `/dashboard` – Bienvenida a la aplicacion.
- `/facturas` – listado con filtros, búsqueda, orden y paginacion.
- `/facturas/nueva` – crear factura (validación + preview + alerts + spinners).
- `/facturas/:id` – detalle (routing dinámico).
- `/facturas/:id/editar` – editar factura (validación + alerts + spinners).

---

## Notas
- El backend **JSONPlaceholder** es **simulado** (no persiste cambios reales). El store local (Context) mantiene la UI sincronizada tras **POST/PUT/DELETE**.
- Los **alerts** dan feedback para crear/editar/eliminar, login/logout y sesión expirada.
- Los **spinners** acompañan las cargas en Listado, Detalle y en los botones del Form.
