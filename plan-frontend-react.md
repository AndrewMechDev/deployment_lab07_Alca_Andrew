# Plan de Desarrollo: Frontend React para API de Autenticación

## 1. Estrategia de Estructura del Proyecto
**¿Es viable trabajar en el mismo proyecto o aparte?**
Es altamente recomendable trabajar el frontend en una **carpeta separada** para mantener una arquitectura limpia (Separation of Concerns). Mezclar el código de React con el del backend Node.js en la misma raíz puede causar conflictos de dependencias (en el `package.json`) y dificultar el despliegue futuro.

**Decisión:** Crearemos una carpeta llamada `frontend` dentro de tu directorio actual (`lab07-Des.Aplic.Web-Alca-Andrew/frontend`), que funcionará como un proyecto independiente impulsado por **Vite**.

---

## 2. Pila Tecnológica (Stack)
- **Framework:** React.js (inicializado con Vite por su extrema rapidez).
- **Enrutamiento:** `react-router-dom` (para manejar las páginas de Inicio, Login y Usuario).
- **Peticiones HTTP:** `axios` (facilita el envío de headers y manejo de errores de forma muy limpia).
- **Diseño y Estilos:** Vanilla CSS moderno. Implementaremos un diseño premium y llamativo tipo **"Glassmorphism"** (cristal esmerilado), modo oscuro, animaciones suaves y colores vibrantes neon.

---

## 3. Comandos de Inicialización (Terminal)
Para levantar este proyecto, ejecutaremos los siguientes comandos desde la raíz actual:

```bash
# 1. Crear el proyecto React con Vite en la carpeta 'frontend'
npx -y create-vite@latest frontend --template react

# 2. Entrar a la nueva carpeta
cd frontend

# 3. Instalar las dependencias base de React
npm install

# 4. Instalar dependencias adicionales (Rutas y Axios)
npm install react-router-dom axios

# 5. Levantar el entorno de desarrollo del frontend
npm run dev
```

---

## 4. Estructura de Carpetas y Archivos a Crear
Dentro de `frontend/src/`, organizaremos el código así:

```text
src/
 ├── components/      # Componentes reutilizables
 │    └── Navbar.jsx  # Barra de navegación dinámica
 ├── pages/           # Vistas de la aplicación
 │    ├── Home.jsx    # Página de inicio pública
 │    ├── Login.jsx   # Formulario de inicio de sesión con validaciones
 │    └── User.jsx    # Página protegida del usuario (consume API)
 ├── context/         # Manejo de Estado global (Context API)
 │    └── AuthContext.jsx # Para guardar usuario, token y proveer login/logout
 ├── services/        # Lógica de consumo de APIs
 │    └── api.js      # Funciones para llamar al backend con Axios
 ├── App.jsx          # Configuración de Rutas (React Router)
 ├── main.jsx         # Punto de entrada de React
 └── index.css        # Estilos globales (Glassmorphism, variables, fuentes web)
```

---

## 5. Plan de Ejecución de Tareas

### Fase 1: Arquitectura Base y Diseño
- Limpiar el código por defecto de Vite.
- Configurar el diseño visual en `index.css`: importar fuentes modernas (ej. Inter o Outfit), definir paleta de colores oscura, utilidades para el efecto cristal (fondos semitransparentes + backdrop-filter) y animaciones de hover.
- Configurar el React Router en `App.jsx`.

### Fase 2: Estado Global (AuthContext)
- Crear `AuthContext` para almacenar el `usuario` y el `accessToken`.
- Incluir soporte para `localStorage` para que la sesión no se pierda al recargar la página.
- Proveer métodos `login(token, userData)` y `logout()`.

### Fase 3: Componentes de Interfaz
- **Navbar:** Componente que escucha el `AuthContext`.
  - Si no hay usuario: Muestra `Inicio` | `Login`.
  - Si hay usuario: Muestra `Inicio` | `Usuario` | `Cerrar Sesión`.

### Fase 4: Flujo de Autenticación (Login)
- **Login.jsx:** Formulario atractivo con Glassmorphism.
- **Validación Frontend:** Antes de enviar, verificar que los campos no estén vacíos y cumplan con longitudes mínimas. Mostrar alertas estilizadas si hay error.
- **Consumo de API:** Hacer `POST` a `http://localhost:3000/api/auth/signin` enviando `username` y `password`.
- Al recibir el `200 OK`, pasar el `accessToken` y datos del usuario al `AuthContext` y redirigir a la vista de usuario.

### Fase 5: Vista Protegida y Consumo de Datos (User)
- **User.jsx:** Vista de bienvenida que dice *"Hola [username], tu rol es: [role]"*.
- **Consumo Protegido:** Hacer petición `GET` a `http://localhost:3000/api/test/user`.
- Pasar el token en los headers: `Authorization: Bearer <TOKEN>` (o `x-access-token`).
- Mostrar en una tarjeta el mensaje exacto que devuelve el backend ("User Content.").
- Implementar el botón de cerrar sesión que limpia todo y lleva al login.
