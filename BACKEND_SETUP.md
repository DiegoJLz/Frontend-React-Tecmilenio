# Backend Setup Guide

## CORS Configuration for Rust Backend

Para que el frontend pueda conectarse con el backend de Rust, necesitas configurar CORS correctamente.

### 1. Configuración de CORS en Rust

Asegúrate de que tu backend de Rust tenga CORS habilitado. Aquí tienes un ejemplo usando `warp` o `axum`:

#### Para Axum:
```rust
use axum::{
    http::Method,
    response::Json,
    routing::post,
    Router,
};
use tower_http::cors::{CorsLayer, Any};

let cors = CorsLayer::new()
    .allow_origin("http://localhost:3000".parse::<HeaderValue>().unwrap())
    .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE])
    .allow_headers(Any);

let app = Router::new()
    .route("/api/v1/auth/register", post(register_handler))
    .layer(cors);
```

#### Para Warp:
```rust
use warp::cors::cors()
    .allow_origin("http://localhost:3000")
    .allow_methods(vec!["GET", "POST", "PUT", "DELETE"])
    .allow_headers(vec!["content-type"]);

let routes = register_route
    .with(cors);
```

### 2. Endpoints Requeridos

El frontend espera estos endpoints:

- `POST /api/v1/auth/register` - Registro de usuarios
- `POST /api/v1/auth/login` - Inicio de sesión
- `GET /api/v1/health` - Health check (opcional)

### 3. Estructura de Datos para Register

```json
{
  "first_name": "string",
  "last_name": "string",
  "phone": "string",
  "email": "string",
  "password": "string",
  "confirm_password": "string"
}
```

### 4. Respuesta Esperada

```json
{
  "success": true,
  "data": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "guest|host|admin"
  },
  "message": "User created successfully"
}
```

### 5. Verificación

1. Asegúrate de que el backend esté corriendo en puerto 8080
2. Ve a `http://localhost:3000/diagnose` para ejecutar diagnósticos
3. Verifica que no haya errores de CORS en la consola del navegador

### 6. Troubleshooting

- **Error de CORS**: Verifica que el backend permita requests desde `http://localhost:3000`
- **Error 404**: Verifica que el endpoint `/api/v1/auth/register` exista
- **Error de red**: Verifica que el backend esté corriendo en puerto 8080
