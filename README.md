prueba-practica-frontend
Incluye:
- **Autenticación** con token simulado `fake-jwt-token-12345`.
- **Alerts** globales para: crear, editar, eliminar, login y logout.
- **Manejo de 401** (sesión expirada): el interceptor de Axios emite un evento global que muestra alert **"Sesión expirada"** y navega a **/login** automáticamente.
- **Botón** "Simular 401" en el sidebar para probar el flujo.
- **Loading states** (spinners), **feedback** para todas las acciones, **transiciones suaves** y **responsive**.

## Scripts
```bash
npm install
npm run dev
```

## Credenciales
- usuario: `admin`
- contraseña: `admin123`
- token: `fake-jwt-token-12345`


