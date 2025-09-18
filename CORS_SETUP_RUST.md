# 🔧 Configuración CORS para Backend Rust

## ❌ Problema Actual
El frontend (localhost:3000) no puede conectarse al backend (localhost:8080) debido a CORS.

## ✅ Solución: Configurar CORS en tu Backend Rust

### Para Axum (Framework más común en Rust)

```rust
use axum::{
    http::Method,
    response::Json,
    routing::{get, post},
    Router,
};
use tower_http::cors::{CorsLayer, Any};

#[tokio::main]
async fn main() {
    // Configurar CORS
    let cors = CorsLayer::new()
        .allow_origin("http://localhost:3000".parse::<axum::http::HeaderValue>().unwrap())
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE, Method::OPTIONS])
        .allow_headers(Any)
        .allow_credentials(true);

    let app = Router::new()
        .route("/api/v1/auth/register", post(register_handler))
        .route("/api/v1/auth/login", post(login_handler))
        .layer(cors);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:8080").await.unwrap();
    println!("🚀 Server running on http://127.0.0.1:8080");
    axum::serve(listener, app).await.unwrap();
}
```

### Para Actix-web

```rust
use actix_web::{web, App, HttpServer, middleware::Logger};
use actix_cors::Cors;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000")
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE", "OPTIONS"])
            .allowed_headers(vec![
                actix_web::http::header::AUTHORIZATION,
                actix_web::http::header::ACCEPT,
            ])
            .allowed_header(actix_web::http::header::CONTENT_TYPE)
            .supports_credentials();

        App::new()
            .wrap(cors)
            .wrap(Logger::default())
            .route("/api/v1/auth/register", web::post().to(register))
            .route("/api/v1/auth/login", web::post().to(login))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
```

### Para Warp

```rust
use warp::Filter;

#[tokio::main]
async fn main() {
    let cors = warp::cors()
        .allow_origin("http://localhost:3000")
        .allow_headers(vec!["content-type", "authorization"])
        .allow_methods(vec!["GET", "POST", "PUT", "DELETE", "OPTIONS"]);

    let routes = warp::path("api")
        .and(warp::path("v1"))
        .and(warp::path("auth"))
        .and(warp::path("register"))
        .and(warp::post())
        .and_then(register_handler)
        .with(cors);

    warp::serve(routes)
        .run(([127, 0, 0, 1], 8080))
        .await;
}
```

## 🔍 Verificación

### 1. Verifica que tu backend esté corriendo:
```bash
curl http://localhost:8080/api/v1/auth/register -X POST -H "Content-Type: application/json" -d '{"test":"data"}'
```

### 2. Verifica CORS desde el navegador:
- Ve a `http://localhost:3000/test-cors`
- Haz clic en "Test CORS Connection"
- Deberías ver respuestas exitosas

### 3. Headers CORS que debe enviar tu backend:
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

## 🚨 Errores Comunes

1. **"Failed to fetch"** = CORS no configurado
2. **"CORS error"** = Origen no permitido
3. **"Network error"** = Backend no está corriendo

## 📋 Pasos para Arreglar

1. **Agrega CORS a tu backend** usando el código de arriba
2. **Reinicia tu servidor Rust**
3. **Prueba en** `http://localhost:3000/test-cors`
4. **Si funciona, prueba el registro** en `http://localhost:3000/register`

## 🆘 Si Necesitas Ayuda

Comparte:
1. **¿Qué framework usas?** (Axum, Actix-web, Warp, etc.)
2. **Tu código actual** del servidor
3. **El resultado** de `http://localhost:3000/test-cors`


