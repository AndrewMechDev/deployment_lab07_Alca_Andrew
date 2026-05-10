# Guía de Pruebas: Frontend (React) + Backend (Node.js)

Para que la aplicación completa funcione, necesitas tener **dos servidores corriendo en paralelo**. Uno para tu API (Node.js) y otro para tu interfaz de usuario (React).

---

## 1. Levantar el Backend (API Node.js)

1. Abre una terminal.
2. Ubícate en la raíz del proyecto principal (`lab07-Des.Aplic.Web-Alca-Andrew`).
3. Inicia tu API:
   ```bash
   npm start
   ```
4. Debes ver en consola: `Server is running on port 3000` y `Database synchronized`.
5. **No cierres esta terminal.**

---

## 2. Levantar el Frontend (React + Vite)

*(Nota: Pude ver que intentaste correr `npm run dev` en la carpeta principal. Ese comando solo existe dentro de la carpeta `frontend`)*.

1. Abre una **NUEVA terminal** (pestaña nueva en VSCode o consola nueva).
2. **Es obligatorio** entrar a la subcarpeta del frontend primero:
   ```bash
   cd frontend
   ```
3. Ejecuta el servidor de desarrollo de React:
   ```bash
   npm run dev
   ```
4. Se te mostrará una URL local, por defecto: **`http://localhost:5173`**.
5. Abre esa URL en tu navegador web.

---

## 3. Flujo de Pruebas (Test End-to-End)

Con ambos servidores encendidos y el navegador abierto en `http://localhost:5173`, haz lo siguiente:

### Prueba A: Navegación Pública
- Al entrar a la página inicial, verás el diseño Glassmorphism.
- La barra de navegación superior (Navbar) te mostrará únicamente las opciones públicas: **Inicio** y **Login**.

### Prueba B: Validaciones Frontend
1. Ve a la sección **Login**.
2. Intenta hacer clic en "Iniciar Sesión" dejando todo en blanco.
3. El frontend interceptará la acción y te mostrará alertas de error (campos requeridos, longitud mínima) sin siquiera hacer la petición al backend.

### Prueba C: Autenticación (Signin)
1. Escribe las credenciales de un usuario que exista en tu base de datos (por ejemplo, el admin que creamos antes).
2. Haz clic en Iniciar Sesión.
3. Si es exitoso, React guardará el token en `localStorage` internamente y **la página saltará automáticamente** a tu panel privado.

### Prueba D: Panel Protegido (El usuario)
- Observa la barra de navegación: ahora cambió dinámicamente. Apareció la pestaña **Usuario** y el botón **Cerrar Sesión**.
- En la pantalla principal del panel, verás tu nombre de usuario y los roles asignados extraídos del contexto global.
- Verás un cuadro oscuro que dice "Respuesta de la API". Ese mensaje (*ej. "User Content."*) **significa que Axios logró enviar exitosamente tu Token JWT al backend** y el backend le respondió.

### Prueba E: Recargar y Persistencia
- Presiona **F5** (o recarga la página de tu navegador).
- ¡Tu sesión sigue viva! El contexto de React está configurado para recordar tu token.

### Prueba F: Rutas Protegidas y Logout
1. Haz clic en el botón rojo **"Cerrar Sesión"** en la barra superior.
2. Serás devuelto a la página de Login y el token será destruido.
3. Intenta ser tramposo: en la barra de URL de tu navegador, escribe a la fuerza `http://localhost:5173/user` y dale Enter.
4. El sistema de rutas de React detectará que no tienes un token válido y **te rebotará inmediatamente** a la página de Login.
