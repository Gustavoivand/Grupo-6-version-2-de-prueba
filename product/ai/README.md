# BookMate - Track AI (Aplicación Completa con IA)

**Proyecto:** BookMate  
**Track:** AI  
**Curso:** CC341 - Ingeniería de Software (UNI)  
**Tipo:** Aplicación completa con backend, BD y recomendaciones IA  

---

## 📋 Descripción

Este es el track AI de BookMate: la **aplicación completa y funcional** con backend Flask, base de datos PostgreSQL y sistema de recomendación inteligente que combina heurística con inteligencia artificial.

**Características principales:**
- ✅ Backend REST API con Flask
- ✅ Base de datos PostgreSQL con esquema normalizado
- ✅ Autenticación JWT
- ✅ Biblioteca personal por usuario
- ✅ Recomendador heurístico (metadatos)
- ✅ Recomendador IA (embeddings semánticos)
- ✅ Docker Compose para orquestación completa

---

## 🏗️ Arquitectura del Sistema

El sistema se compone de **3 servicios dockerizados**:

```
┌──────────────┐      ┌──────────────┐      ┌───────────────┐
│   Cliente    │─────▶│  Web Service │─────▶│  AI Service   │
│  (Navegador/ │ HTTP │  (Flask API) │ HTTP │  (Flask + ML) │
│   Postman)   │      │  Puerto 5000 │      │  Puerto 5001  │
└──────────────┘      └──────┬───────┘      └───────────────┘
                             │
                             ▼
                      ┌──────────────┐
                      │  PostgreSQL  │
                      │  Puerto 5432 │
                      └──────────────┘
```

**Web Service:** API REST principal, autenticación, CRUD, recomendaciones  
**AI Service:** Generación de embeddings y recomendaciones IA  
**Database:** PostgreSQL con datos persistentes  

---

## 🚀 Ejecución con Docker Compose (Recomendado)

### Requisitos Previos

- Docker 24+ instalado
- Docker Compose instalado
- 4GB+ RAM disponible (para servicio IA)
- 2GB+ espacio en disco

### Pasos

```bash
# 1. Clonar repositorio y navegar a carpeta
cd product/ai/

# 2. Crear archivo .env desde ejemplo
cp .env.example .env

# 3. (Opcional) Editar .env con credenciales deseadas
nano .env

# 4. Construir imágenes y levantar servicios
docker-compose up --build

# En otra terminal:

# 5. Ejecutar migraciones de base de datos
docker-compose exec web flask db upgrade

# 6. Poblar BD con datos iniciales (100+ libros)
docker-compose exec web python seed.py

# 7. (Opcional) Pre-calcular embeddings
docker-compose exec ai_service python precompute_embeddings.py
```

**Acceso:**
- **API Web:** http://localhost:5000
- **AI Service:** http://localhost:5001
- **PostgreSQL:** localhost:5432 (usuario: `bookmate`, password: ver `.env`)

**Detener servicios:**
```bash
docker-compose down
```

**Eliminar datos y empezar de cero:**
```bash
docker-compose down -v  # -v elimina volúmenes
```

---

## 🛠️ Ejecución sin Docker (Desarrollo Local)

### Requisitos Previos

- Python 3.11+
- PostgreSQL 15 instalado y corriendo
- virtualenv o venv

### Configuración Base de Datos

```bash
# Crear base de datos PostgreSQL
createdb bookmate_db

# O con psql:
psql -U postgres
CREATE DATABASE bookmate_db;
CREATE USER bookmate WITH PASSWORD 'secret123';
GRANT ALL PRIVILEGES ON DATABASE bookmate_db TO bookmate;
\q
```

### Configuración Web Service

```bash
# 1. Navegar a carpeta
cd product/ai/

# 2. Crear entorno virtual
python -m venv venv

# 3. Activar entorno virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 4. Instalar dependencias
pip install -r requirements.txt

# 5. Crear archivo .env
cp .env.example .env

# 6. Editar .env con credenciales de PostgreSQL local
nano .env
# DATABASE_URL=postgresql://bookmate:secret123@localhost:5432/bookmate_db

# 7. Ejecutar migraciones
flask db upgrade

# 8. Poblar BD con datos iniciales
python seed.py

# 9. Ejecutar servidor web
flask run
# O con hot reload:
export FLASK_ENV=development
flask run --reload
```

**Acceso:** http://localhost:5000

### Configuración AI Service

```bash
# En otra terminal:

# 1. Navegar a carpeta ai_service
cd product/ai/ai_service/

# 2. Crear entorno virtual independiente
python -m venv venv_ai

# 3. Activar entorno virtual
source venv_ai/bin/activate  # Linux/Mac
# venv_ai\Scripts\activate    # Windows

# 4. Instalar dependencias ML (puede tardar)
pip install -r requirements.txt

# 5. Crear archivo .env
cp .env.example .env

# 6. Ejecutar servidor AI
flask run --port=5001
```

**Acceso:** http://localhost:5001

---

## 📡 Endpoints API

### Autenticación (`/api/auth`)

```bash
# Registrar usuario
POST /api/auth/register
Body: {"username": "juan", "email": "juan@email.com", "password": "pass123"}
Response: {"message": "Usuario creado", "user_id": 1}

# Login
POST /api/auth/login
Body: {"email": "juan@email.com", "password": "pass123"}
Response: {"access_token": "eyJ0eXAiOiJK...", "user_id": 1}

# Perfil (requiere JWT)
GET /api/auth/profile
Headers: Authorization: Bearer <token>
Response: {"id": 1, "username": "juan", "email": "juan@email.com"}
```

### Libros (`/api/books`)

```bash
# Listar libros (con paginación y filtros)
GET /api/books?page=1&per_page=10&genre=Ficción&author=García
Response: {"books": [...], "total": 45, "page": 1, "per_page": 10}

# Detalle de libro
GET /api/books/1
Response: {"id": 1, "title": "Cien años de soledad", ...}

# Buscar libros
GET /api/search?q=soledad
Response: {"results": [...]}
```

### Biblioteca Personal (`/api/library`)

```bash
# Obtener biblioteca (requiere JWT)
GET /api/library
Headers: Authorization: Bearer <token>
Response: {"books": [...], "total": 5}

# Agregar libro a biblioteca
POST /api/library
Headers: Authorization: Bearer <token>
Body: {"book_id": 1, "status": "Por leer"}
Response: {"message": "Libro agregado", "user_book_id": 1}

# Cambiar estado de lectura
PUT /api/library/1/status
Headers: Authorization: Bearer <token>
Body: {"status": "Leyendo"}
Response: {"message": "Estado actualizado"}

# Eliminar libro de biblioteca
DELETE /api/library/1
Headers: Authorization: Bearer <token>
Response: {"message": "Libro eliminado"}
```

### Recomendaciones (`/api/recommendations`)

```bash
# Recomendaciones heurísticas (requiere JWT)
GET /api/recommendations/1?limit=5
Headers: Authorization: Bearer <token>
Response: {"recommendations": [...], "type": "heuristic"}

# Recomendaciones IA (requiere JWT)
GET /api/recommendations/ai/1?limit=5
Headers: Authorization: Bearer <token>
Response: {"recommendations": [...], "type": "ai", "fallback": false}
```

---

## 📊 Base de Datos

### Esquema

```
users (id, username, email, password_hash, created_at)
books (id, title, author, year, genre, pages, synopsis, isbn, cover_url, rating)
tags (id, name)
book_tags (book_id, tag_id)  -- N:M
user_books (id, user_id, book_id, status, added_at)  -- N:M con estado
embeddings (book_id, synopsis_embedding, model_name, created_at)
```

### Migraciones

```bash
# Crear nueva migración (después de modificar modelos)
flask db migrate -m "Descripción del cambio"

# Aplicar migraciones pendientes
flask db upgrade

# Revertir última migración
flask db downgrade
```

---

## 🧠 Sistema de Recomendaciones

### Recomendador Heurístico

Basado en metadatos de libros en biblioteca del usuario:

**Criterios de scoring:**
- Autor coincidente: +3 puntos
- Tags coincidentes: +2 puntos por tag
- Páginas similares (±15%): +1 punto
- Género coincidente: +2 puntos

**Ventajas:**
- ✅ Rápido (<1s)
- ✅ No requiere ML
- ✅ Interpretable

### Recomendador IA

Basado en embeddings semánticos de sinopsis:

**Algoritmo:**
1. Calcular embedding promedio de libros en biblioteca del usuario
2. Calcular similitud coseno con embeddings de libros candidatos
3. Retornar top N con similitud >0.5

**Modelo:** Sentence Transformers `all-MiniLM-L6-v2` (384 dim)

**Ventajas:**
- ✅ Captura similitud semántica profunda
- ✅ No depende de metadatos explícitos
- ✅ Descubre relaciones no obvias

**Fallback:** Si AI service falla, automáticamente usa heurística.

---

## 🐳 Docker: Detalles Técnicos

### Servicios

```yaml
web:       # Flask API principal
  - Imagen: Python 3.11-slim + dependencias
  - Puerto: 5000
  - Depende de: db
  - Healthcheck: curl http://localhost:5000/health

db:        # PostgreSQL 15
  - Imagen oficial postgres:15
  - Puerto: 5432
  - Volumen: postgres_data (persistencia)
  - Healthcheck: pg_isready

ai_service: # Flask + ML
  - Imagen: Python 3.11-slim + PyTorch + Transformers
  - Puerto: 5001
  - Descarga modelo en build time
  - Healthcheck: curl http://localhost:5001/health
```

### Volúmenes

- `postgres_data`: Persistencia de datos de PostgreSQL
- `./ai_service/data/`: Embeddings pre-calculados (montado)

### Variables de Entorno (`.env.example`)

```bash
# Database
DATABASE_URL=postgresql://bookmate:secret123@db:5432/bookmate_db

# JWT
JWT_SECRET_KEY=super-secret-cambiar-en-produccion
JWT_ACCESS_TOKEN_EXPIRES=86400

# AI Service
AI_SERVICE_URL=http://ai_service:5001
AI_MODEL_NAME=all-MiniLM-L6-v2

# Flask
FLASK_APP=app.py
FLASK_ENV=production
```

---

## 🧪 Pruebas

### Pruebas Unitarias con pytest

```bash
# Ejecutar todas las pruebas
pytest

# Ejecutar con cobertura
pytest --cov=. --cov-report=html

# Ejecutar archivo específico
pytest tests/test_auth.py

# Ver reporte de cobertura
open htmlcov/index.html
```

### Pruebas de API con Postman

```bash
# Importar colección Postman incluida
# File: postman_collection.json

# O usar curl:

# Health check
curl http://localhost:5000/health

# Registrar usuario
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@email.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@email.com","password":"pass123"}'

# Obtener libros
curl http://localhost:5000/api/books?page=1&per_page=5
```

---

## 📁 Estructura del Proyecto

```
product/ai/
├── app.py                      # Punto de entrada
├── config.py                   # Configuraciones
├── requirements.txt            # Dependencias
├── .env.example                # Variables de entorno ejemplo
├── Dockerfile                  # Docker image web service
├── docker-compose.yml          # Orquestación servicios
├── seed.py                     # Script poblar BD
├── postman_collection.json     # Colección Postman
├── models/                     # Modelos SQLAlchemy
│   ├── user.py
│   ├── book.py
│   ├── tag.py
│   └── user_book.py
├── routes/                     # Blueprints API
│   ├── auth.py
│   ├── books.py
│   ├── library.py
│   └── recommendations.py
├── services/                   # Lógica de negocio
│   ├── auth_service.py
│   ├── book_service.py
│   ├── recommendation_service.py
│   └── ai_client.py
├── utils/                      # Utilidades
│   ├── decorators.py
│   └── validators.py
├── migrations/                 # Migraciones Alembic
│   └── versions/
├── tests/                      # Pruebas pytest
│   ├── test_auth.py
│   ├── test_books.py
│   └── test_recommendations.py
├── ai_service/                 # Servicio IA
│   ├── app.py
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── models/
│   │   └── embedder.py
│   ├── services/
│   │   └── recommendation_service.py
│   ├── data/
│   │   └── embeddings.pkl
│   └── precompute_embeddings.py
├── PLAN_AI.md                  # Plan detallado
└── README.md                   # Este archivo
```

---

## 🐛 Troubleshooting

### Problema: `docker-compose up` falla con error de conexión a BD

**Causa:** Web service inicia antes de que PostgreSQL esté listo.

**Solución:** Ya configurado con `healthcheck` y `depends_on: condition: service_healthy`.

Si persiste, aumentar timeout:
```yaml
healthcheck:
  interval: 10s
  timeout: 10s  # Aumentar
  retries: 10   # Aumentar
```

### Problema: AI service consume mucha RAM

**Causa:** Modelo Sentence Transformers carga en memoria.

**Solución:**
- Usar modelo más pequeño: `all-MiniLM-L6-v2` (ya configurado)
- Aumentar RAM de Docker (Settings → Resources → Memory → 6GB)
- Pre-calcular embeddings y no cargar modelo en runtime

### Problema: Recomendaciones IA siempre usan fallback

**Causa:** AI service no responde o devuelve error.

**Solución:**
```bash
# Verificar logs de AI service
docker-compose logs ai_service

# Verificar health de AI service
curl http://localhost:5001/health

# Reiniciar AI service
docker-compose restart ai_service
```

### Problema: Migraciones fallan

**Causa:** Cambios en modelos incompatibles con BD existente.

**Solución:**
```bash
# Eliminar BD y empezar de cero (DEV ONLY)
docker-compose down -v
docker-compose up --build
docker-compose exec web flask db upgrade
docker-compose exec web python seed.py
```

### Problema: "ModuleNotFoundError" al ejecutar sin Docker

**Causa:** Dependencias no instaladas o virtualenv no activado.

**Solución:**
```bash
# Verificar virtualenv activo
which python  # Debe apuntar a venv/bin/python

# Reinstalar dependencias
pip install -r requirements.txt
```

---

## ⚙️ Configuración Adicional

### Cambiar puerto de web service

```bash
# Editar docker-compose.yml
ports:
  - "8080:5000"  # Cambiar 5000 a 8080

# O sin Docker:
flask run --port=8080
```

### Habilitar logs de debug

```bash
# Editar .env
FLASK_ENV=development

# O en docker-compose.yml:
environment:
  FLASK_ENV: development
  FLASK_DEBUG: 1
```

### Cambiar modelo de embeddings

```bash
# Editar ai_service/.env
AI_MODEL_NAME=all-mpnet-base-v2  # Más preciso pero más lento

# Reconstruir imagen:
docker-compose build ai_service
```

---

## 📈 Métricas de Rendimiento

| Operación | Tiempo Esperado | Observaciones |
|-----------|----------------|---------------|
| GET /api/books | <100ms | Con BD indexada |
| POST /api/auth/login | <200ms | Incluye hashing |
| GET /api/recommendations (heurística) | <1s | Depende de tamaño biblioteca |
| GET /api/recommendations/ai | <2s | Con embeddings pre-calculados |
| Generar embedding nuevo | ~50ms | Por sinopsis promedio |

---

## 📝 Documentación Adicional

- **Plan detallado:** Ver `PLAN_AI.md` en esta carpeta
- **Plan general:** Ver `/PLAN_PROYECTO.md` en raíz
- **Cronograma:** Ver `/CRONOGRAMA_SEMANAS.md` en raíz
- **Track BASIC:** Ver `/product/basic/` para prototipo estático

---

## 👥 Equipo

**Grupo 6.2 - CC341 Ingeniería de Software (UNI)**

| Rol | Responsabilidad Track AI |
|-----|-------------------------|
| Integrante 1 | Requisitos, documentación |
| Integrante 2 | Arquitectura, diagramas |
| Integrante 3 | Backend Flask, Docker web |
| Integrante 4 | Integración frontend (opcional) |
| Integrante 5 | BD, recomendadores, AI service |
| Integrante 6 | Testing, Docker Compose, QA |

---

## 📄 Licencia

Proyecto académico desarrollado para el curso CC341 - Ingeniería de Software (UNI).  
© 2024 Equipo BookMate - Grupo 6.2

---

**Versión:** 1.0  
**Última actualización:** Noviembre 2024  
**Estado:** En desarrollo
