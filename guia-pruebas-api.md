# Guía de Pruebas de API - Autenticación y Roles

Esta guía explica cómo probar tu API (registro, inicio de sesión y acceso a rutas) usando herramientas como Apidog, Postman o Insomnia.

## 1. Crear Usuarios (Signup)

El endpoint `signup` permite registrar usuarios y asignarles roles. Si no envías la propiedad `roles`, el sistema asignará el rol `user` por defecto.

**URL:** `POST http://localhost:3000/api/auth/signup`
**Headers:** `Content-Type: application/json`

### Body para un Usuario Normal (`user`)
```json
{
  "username": "usuario_normal",
  "email": "user@test.com",
  "password": "password123"
}
```

### Body para un Administrador (`admin`)
```json
{
  "username": "admin_jefe",
  "email": "admin@test.com",
  "password": "password123",
  "roles": ["admin"]
}
```

### Body para un Moderador (`moderator`)
```json
{
  "username": "mod_vigilante",
  "email": "mod@test.com",
  "password": "password123",
  "roles": ["moderator"]
}
```

> **NOTA IMPORTANTE:** Para que esto funcione, la tabla `roles` en tu base de datos debe tener pre-registrados los roles "user", "admin" y "moderator". Si la tabla está vacía, el servidor fallará al intentar asignar el rol.

---

## 2. Iniciar Sesión (Signin)

Una vez creados los usuarios, necesitas iniciar sesión para obtener un **Token JWT**.

**URL:** `POST http://localhost:3000/api/auth/signin`
**Headers:** `Content-Type: application/json`

### Body
```json
{
  "username": "admin_jefe",
  "password": "password123"
}
```

### Respuesta Esperada (Copia el Token)
Al ejecutar esta petición recibirás una respuesta como esta. **Copia el valor de `accessToken`**, lo vas a necesitar.
```json
{
  "id": 2,
  "username": "admin_jefe",
  "email": "admin@test.com",
  "roles": ["ROLE_ADMIN"],
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## 3. Probar las Rutas Protegidas (GET)

Ahora vamos a usar el token copiado para acceder a las rutas restringidas.

**Headers obligatorios para todas estas rutas:**
- Key: `x-access-token`
- Value: `<Pega_aqui_el_accessToken_obtenido>`

*(Alternativamente, tu middleware `authJwt.js` también soporta `Authorization: Bearer <token>` si lo prefieres).*

### Pruebas a realizar:

1. **Ruta Pública:**
   - **URL:** `GET http://localhost:3000/api/test/all`
   - **Token:** No requerido.
   - **Resultado:** "Public Content."

2. **Ruta de Usuario Normal:**
   - **URL:** `GET http://localhost:3000/api/test/user`
   - **Token:** Cualquiera que sea válido.
   - **Resultado:** "User Content."

3. **Ruta de Moderador:**
   - **URL:** `GET http://localhost:3000/api/test/mod`
   - **Token:** Debes usar el token del usuario que creaste con rol `"moderator"`.
   - **Resultado:** "Moderator Content." (Si usas el token del admin o user normal, te dirá que requieres el rol de moderador).

4. **Ruta de Administrador:**
   - **URL:** `GET http://localhost:3000/api/test/admin`
   - **Token:** Debes usar el token del usuario que creaste con rol `"admin"`.
   - **Resultado:** "Admin Content." (Si usas otro token, dará error 403).
