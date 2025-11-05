# PLAN DE DESARROLLO - TRACK AI

**Proyecto:** BookMate  
**Track:** AI (Aplicación Completa con Inteligencia Artificial)  
**Curso:** CC341 - Ingeniería de Software (UNI)  
**Grupo:** 6.2  
**Versión:** 1.0  

---

## 1. OBJETIVO DEL TRACK AI

El track AI se desarrollará como la **aplicación completa y funcional** de BookMate con backend, base de datos y sistema de recomendación inteligente. Este track implementará:

1. **Backend robusto** con Flask y arquitectura MVC
2. **Base de datos relacional** PostgreSQL con esquema normalizado
3. **Sistema de autenticación** con JWT o sesiones Flask
4. **Biblioteca personal** por usuario con estados de lectura
5. **Recomendador heurístico** basado en metadatos (autor, tags, páginas)
6. **Recomendador IA** con embeddings semánticos de sinopsis (fase final)
7. **Contenedorización** completa con Docker Compose

**Alcance:**
- ✅ **Incluido:** Backend Flask, PostgreSQL, autenticación, biblioteca personal, heurística, IA, Docker
- ❌ **Excluido:** Interfaz web compleja (se puede reutilizar HTML del track BASIC o usar API REST directamente)

---

## 2. ARQUITECTURA DEL SISTEMA

### 2.1 Visión General (C4 - Nivel 2: Contenedores)

El sistema se compondrá de **3 contenedores Docker** orquestados con Docker Compose:

```
┌──────────────────────────────────────────────────────────────────────┐
│                          SISTEMA BOOKMATE                            │
│                                                                      │
│  ┌─────────────┐      ┌──────────────┐      ┌──────────────────┐  │
│  │   Cliente   │      │   Web API    │      │   AI Service     │  │
│  │  (Navegador)│─────▶│   (Flask)    │─────▶│   (Flask + ML)   │  │
│  │             │ HTTP │   Puerto     │ HTTP │   Puerto 5001    │  │
│  └─────────────┘      │   5000       │      └──────────────────┘  │
│                       │              │               │             │
│                       │              │               │             │
│                       │              ▼               │             │
│                       │     ┌─────────────────┐      │             │
│                       │     │   PostgreSQL    │      │             │
│                       └────▶│   (Base Datos)  │◀─────┘             │
│                             │   Puerto 5432   │                    │
│                             └─────────────────┘                    │
└──────────────────────────────────────────────────────────────────────┘
```

### 2.2 Componentes Principales

#### A) Web Service (Flask)
- **Responsabilidad:** API REST principal, autenticación, lógica de negocio
- **Puerto:** 5000
- **Base de datos:** PostgreSQL
- **Endpoints principales:**
  - Autenticación: `/api/auth/register`, `/api/auth/login`, `/api/auth/profile`
  - Libros: `/api/books`, `/api/books/<id>`, `/api/search`
  - Biblioteca: `/api/library`, `/api/library/<book_id>`
  - Recomendaciones: `/api/recommendations/<user_id>` (heurística)
  - Recomendaciones IA: `/api/recommendations/ai/<user_id>` (con fallback)

#### B) AI Service (Flask + ML)
- **Responsabilidad:** Generación de embeddings, cálculo de similitud, recomendaciones IA
- **Puerto:** 5001
- **Modelo:** Sentence Transformers (e.g., `all-MiniLM-L6-v2`)
- **Endpoints principales:**
  - `/embed` → POST: generar embedding de texto
  - `/recommend` → POST: recomendaciones por similitud de embeddings
  - `/health` → GET: health check del servicio

#### C) Database (PostgreSQL 15)
- **Responsabilidad:** Persistencia de datos
- **Puerto:** 5432
- **Esquema:** Ver sección 3.2

---

## 3. DISEÑO DE BASE DE DATOS

### 3.1 Diagrama Entidad-Relación

```
┌──────────────┐          ┌──────────────┐
│    users     │          │    books     │
├──────────────┤          ├──────────────┤
│ id (PK)      │          │ id (PK)      │
│ username     │          │ title        │
│ email        │          │ author       │
│ password_hash│          │ year         │
│ created_at   │          │ genre        │
└──────────────┘          │ pages        │
       │                  │ synopsis     │
       │                  │ isbn         │
       │                  │ cover_url    │
       │                  │ rating       │
       │                  └──────────────┘
       │                         │
       │                         │
       ▼                         ▼
┌──────────────┐          ┌──────────────┐
│  user_books  │          │  book_tags   │
├──────────────┤          ├──────────────┤
│ id (PK)      │          │ book_id (FK) │
│ user_id (FK) │          │ tag_id (FK)  │
│ book_id (FK) │          └──────────────┘
│ status       │                 │
│ added_at     │                 │
└──────────────┘                 ▼
                          ┌──────────────┐
                          │     tags     │
                          ├──────────────┤
                          │ id (PK)      │
                          │ name         │
                          └──────────────┘
```

### 3.2 Esquema de Tablas

#### Tabla: `users`
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Tabla: `books`
```sql
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    year INTEGER,
    genre VARCHAR(100),
    pages INTEGER,
    synopsis TEXT,
    isbn VARCHAR(20) UNIQUE,
    cover_url VARCHAR(500),
    rating DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_books_author ON books(author);
CREATE INDEX idx_books_genre ON books(genre);
```

#### Tabla: `tags`
```sql
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE INDEX idx_tags_name ON tags(name);
```

#### Tabla: `book_tags` (N:M entre books y tags)
```sql
CREATE TABLE book_tags (
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, tag_id)
);
```

#### Tabla: `user_books` (N:M entre users y books con estado)
```sql
CREATE TABLE user_books (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    status VARCHAR(20) CHECK (status IN ('Leído', 'Leyendo', 'Por leer')),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, book_id)
);

CREATE INDEX idx_user_books_user_id ON user_books(user_id);
```

#### Tabla: `embeddings` (para almacenar embeddings pre-calculados - fase IA)
```sql
CREATE TABLE embeddings (
    book_id INTEGER PRIMARY KEY REFERENCES books(id) ON DELETE CASCADE,
    synopsis_embedding BYTEA NOT NULL,
    model_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3.3 Normalización

El esquema está en **3FN (Tercera Forma Normal)**:

- ✅ No hay atributos multi-valuados
- ✅ No hay dependencias parciales
- ✅ No hay dependencias transitivas
- ✅ Relaciones N:M correctamente modeladas con tablas intermedias

---

## 4. BACKEND: WEB SERVICE (FLASK)

### 4.1 Estructura del Proyecto

```
product/ai/
├── app.py                          # Punto de entrada principal
├── config.py                       # Configuraciones (BD, JWT, etc.)
├── requirements.txt                # Dependencias Python
├── models/                         # Modelos SQLAlchemy
│   ├── __init__.py
│   ├── user.py
│   ├── book.py
│   ├── tag.py
│   └── user_book.py
├── routes/                         # Blueprints de rutas
│   ├── __init__.py
│   ├── auth.py                    # Autenticación
│   ├── books.py                   # CRUD libros
│   ├── library.py                 # Biblioteca personal
│   └── recommendations.py         # Recomendaciones (heurística + IA)
├── services/                       # Lógica de negocio
│   ├── __init__.py
│   ├── auth_service.py
│   ├── book_service.py
│   ├── recommendation_service.py  # Heurística
│   └── ai_client.py               # Cliente HTTP para ai_service
├── utils/                          # Utilidades
│   ├── __init__.py
│   ├── decorators.py              # @jwt_required, @admin_required
│   └── validators.py              # Validaciones
├── migrations/                     # Migraciones Alembic
│   └── versions/
├── tests/                          # Pruebas pytest
│   ├── test_auth.py
│   ├── test_books.py
│   └── test_recommendations.py
├── Dockerfile                      # Docker image para web service
└── .env.example                    # Variables de entorno ejemplo
```

### 4.2 Endpoints REST

#### Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Auth | Body |
|--------|----------|-------------|------|------|
| POST | `/api/auth/register` | Registrar nuevo usuario | No | `{username, email, password}` |
| POST | `/api/auth/login` | Autenticar usuario | No | `{email, password}` → retorna JWT |
| POST | `/api/auth/logout` | Cerrar sesión | Sí | - |
| GET | `/api/auth/profile` | Obtener perfil del usuario | Sí | - |

#### Libros (`/api/books`)

| Método | Endpoint | Descripción | Auth | Query Params |
|--------|----------|-------------|------|--------------|
| GET | `/api/books` | Listar todos los libros | No | `?page=1&per_page=10&genre=Ficción&author=García` |
| GET | `/api/books/<id>` | Detalle de un libro | No | - |
| POST | `/api/books` | Crear libro (admin) | Sí | `{title, author, year, genre, pages, synopsis, isbn, cover_url, tags[]}` |
| PUT | `/api/books/<id>` | Actualizar libro (admin) | Sí | Campos a actualizar |
| DELETE | `/api/books/<id>` | Eliminar libro (admin) | Sí | - |
| GET | `/api/search` | Búsqueda avanzada | No | `?q=query&genre=&year_min=&year_max=` |

#### Biblioteca Personal (`/api/library`)

| Método | Endpoint | Descripción | Auth | Body |
|--------|----------|-------------|------|------|
| GET | `/api/library` | Libros en biblioteca del usuario | Sí | - |
| POST | `/api/library` | Agregar libro a biblioteca | Sí | `{book_id, status: "Por leer"}` |
| DELETE | `/api/library/<book_id>` | Eliminar libro de biblioteca | Sí | - |
| PUT | `/api/library/<book_id>/status` | Cambiar estado de lectura | Sí | `{status: "Leído"}` |

#### Recomendaciones (`/api/recommendations`)

| Método | Endpoint | Descripción | Auth | Query Params |
|--------|----------|-------------|------|--------------|
| GET | `/api/recommendations/<user_id>` | Recomendaciones heurísticas | Sí | `?limit=5` |
| GET | `/api/recommendations/ai/<user_id>` | Recomendaciones IA (con fallback) | Sí | `?limit=5` |

### 4.3 Autenticación: JWT (JSON Web Tokens)

Se implementará autenticación con JWT usando `flask-jwt-extended`:

**Flujo:**
1. Usuario hace POST a `/api/auth/login` con `{email, password}`
2. Backend valida credenciales contra BD
3. Si son correctas, genera JWT con `user_id` en payload
4. Retorna `{access_token: "eyJ..."}`
5. Cliente incluye token en headers de requests subsecuentes: `Authorization: Bearer <token>`
6. Backend valida token con decorador `@jwt_required()`

**Configuración:**
```python
# config.py
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'super-secret-key-cambiar-en-prod')
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
```

### 4.4 Tecnologías Web Service

- **Python 3.11+**
- **Flask 3.0** - Framework web
- **Flask-SQLAlchemy** - ORM
- **Flask-Migrate** (Alembic) - Migraciones de BD
- **Flask-JWT-Extended** - Autenticación JWT
- **Flask-CORS** - Permitir requests desde frontend
- **psycopg2** - Driver PostgreSQL
- **python-dotenv** - Variables de entorno
- **Werkzeug** - Password hashing

---

## 5. RECOMENDADOR HEURÍSTICO

### 5.1 Algoritmo de Scoring

El recomendador heurístico asignará puntos a cada libro según similitud con libros en biblioteca del usuario:

**Criterios de scoring:**

1. **Autor coincidente:** +3 puntos
   - Si el libro candidato tiene el mismo autor que algún libro en biblioteca del usuario

2. **Tags coincidentes:** +2 puntos por tag
   - Por cada tag en común entre libro candidato y libros en biblioteca
   - Ejemplo: Si usuario tiene libro con tags ["Distopía", "Clásico"] y candidato tiene ["Distopía", "Ciencia ficción"], suma +2

3. **Páginas similares:** +1 punto
   - Si el número de páginas del candidato está en rango ±15% de promedio de páginas de libros en biblioteca
   - Ejemplo: Usuario tiene libros de 300, 400 y 500 páginas (promedio 400). Candidato con 350-460 páginas suma +1

4. **Género coincidente:** +2 puntos
   - Si el género del candidato coincide con el género más frecuente en biblioteca

**Ordenamiento:** Los libros se ordenan por score descendente y se retornan los top N (por defecto 5).

**Exclusiones:** No se recomiendan libros que ya están en la biblioteca del usuario.

### 5.2 Pseudocódigo

```python
def recommend_heuristic(user_id, limit=5):
    # Obtener libros en biblioteca del usuario
    user_books = get_user_library(user_id)
    
    if not user_books:
        # Si biblioteca vacía, retornar libros mejor valorados
        return get_top_rated_books(limit)
    
    # Calcular estadísticas de biblioteca
    author_counts = count_authors(user_books)
    genre_counts = count_genres(user_books)
    tag_counts = count_tags(user_books)
    avg_pages = average_pages(user_books)
    
    most_common_genre = max(genre_counts, key=genre_counts.get)
    
    # Obtener todos los libros candidatos (excluir los que ya tiene)
    user_book_ids = [b.id for b in user_books]
    candidates = get_all_books(exclude_ids=user_book_ids)
    
    scores = []
    for book in candidates:
        score = 0
        
        # Criterio 1: Autor coincidente
        if book.author in author_counts:
            score += 3
        
        # Criterio 2: Tags coincidentes
        common_tags = set(book.tags) & set(tag_counts.keys())
        score += len(common_tags) * 2
        
        # Criterio 3: Páginas similares (±15%)
        if avg_pages * 0.85 <= book.pages <= avg_pages * 1.15:
            score += 1
        
        # Criterio 4: Género coincidente
        if book.genre == most_common_genre:
            score += 2
        
        scores.append((book, score))
    
    # Ordenar por score descendente
    scores.sort(key=lambda x: x[1], reverse=True)
    
    # Retornar top N
    return [book for book, score in scores[:limit]]
```

### 5.3 Criterios de Aceptación Heurística

- ✅ **Funcionalidad:** Endpoint `/api/recommendations/<user_id>` retorna 5+ libros
- ✅ **Relevancia:** Libros recomendados son semánticamente relevantes (validación manual con perfiles de prueba)
- ✅ **Exclusión:** No recomienda libros ya en biblioteca
- ✅ **Rendimiento:** Tiempo de respuesta <1 segundo
- ✅ **Fallback:** Si biblioteca vacía, retorna libros mejor valorados del catálogo

---

## 6. SERVICIO DE INTELIGENCIA ARTIFICIAL

### 6.1 Arquitectura del AI Service

El servicio IA será una **aplicación Flask independiente** que se comunica con el web service vía HTTP.

**Ventajas de servicio separado:**
- Escalabilidad independiente (IA consume más recursos)
- Despliegue independiente (actualizar modelo sin afectar web)
- Aislamiento de dependencias (PyTorch es pesado)
- Fallback: si IA falla, web service sigue operativo con heurística

### 6.2 Estructura AI Service

```
product/ai/ai_service/
├── app.py                          # Flask app del servicio IA
├── config.py                       # Configuración
├── requirements.txt                # Dependencias ML
├── models/                         # Gestión de modelos
│   ├── __init__.py
│   └── embedder.py                # Clase para generar embeddings
├── services/
│   ├── __init__.py
│   └── recommendation_service.py  # Lógica recomendaciones IA
├── utils/
│   ├── __init__.py
│   └── similarity.py              # Cálculo similitud coseno
├── data/
│   └── embeddings.pkl             # Embeddings pre-calculados
├── Dockerfile                      # Docker image para AI service
└── .env.example
```

### 6.3 Modelo de Embeddings

Se utilizará **Sentence Transformers** con modelo pre-entrenado:

**Modelo recomendado:** `all-MiniLM-L6-v2`
- **Dimensión:** 384
- **Velocidad:** ~14,000 sentences/sec en CPU
- **Calidad:** Buen balance precision/velocidad
- **Tamaño:** ~80MB
- **Multilingüe:** Sí (inglés principalmente, español decente)

**Alternativa si se necesita más precisión:** `all-mpnet-base-v2` (768 dim, más lento pero más preciso)

### 6.4 Generación de Embeddings

**Fase 1: Pre-cálculo (Offline)**

Al poblar la base de datos con libros, se pre-calcularán embeddings de todas las sinopsis:

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

# Para cada libro en BD
for book in books:
    embedding = model.encode(book.synopsis)
    save_embedding(book.id, embedding)  # Guardar en embeddings.pkl o tabla embeddings
```

**Ventajas pre-cálculo:**
- Recomendaciones en tiempo real (solo calcular similitud, no generar embedding)
- Menor latencia (<2s)

### 6.5 Algoritmo de Recomendación IA

```python
def recommend_ai(user_id, limit=5):
    # Obtener libros en biblioteca del usuario
    user_books = get_user_library(user_id)
    
    if not user_books:
        # Fallback: usar heurística
        return call_heuristic_api(user_id, limit)
    
    # Obtener embeddings de libros en biblioteca
    user_embeddings = [get_embedding(book.id) for book in user_books]
    
    # Calcular embedding promedio de biblioteca (representa gustos del usuario)
    avg_user_embedding = np.mean(user_embeddings, axis=0)
    
    # Obtener embeddings de todos los libros candidatos
    user_book_ids = [b.id for b in user_books]
    candidates = get_all_books(exclude_ids=user_book_ids)
    
    similarities = []
    for book in candidates:
        book_embedding = get_embedding(book.id)
        similarity = cosine_similarity(avg_user_embedding, book_embedding)
        similarities.append((book, similarity))
    
    # Ordenar por similitud descendente
    similarities.sort(key=lambda x: x[1], reverse=True)
    
    # Retornar top N
    return [book for book, sim in similarities[:limit] if sim > 0.5]
```

### 6.6 Endpoints AI Service

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| POST | `/embed` | Generar embedding de texto | `{text: "sinopsis..."}` → `{embedding: [0.1, 0.2, ...]}` |
| POST | `/recommend` | Recomendaciones por similitud | `{user_book_ids: [1,2,3], candidate_book_ids: [4,5,...], limit: 5}` → `{recommended_ids: [7,12,3,...], scores: [0.85, 0.78, ...]}` |
| GET | `/health` | Health check | - → `{status: "healthy", model: "all-MiniLM-L6-v2"}` |

### 6.7 Integración Web ↔ IA con Fallback

```python
# En web service: routes/recommendations.py

@bp.route('/api/recommendations/ai/<int:user_id>')
@jwt_required()
def ai_recommendations(user_id):
    try:
        # Intentar llamar a AI service
        response = requests.post(
            'http://ai_service:5001/recommend',
            json={'user_id': user_id, 'limit': 5},
            timeout=3
        )
    
    if response.status_code == 200:
            return jsonify(response.json())
        else:
            raise Exception("AI service returned error")
    
    except Exception as e:
        # Fallback automático a heurística
        logger.warning(f"AI service failed, using fallback: {e}")
        return heuristic_recommendations(user_id)
```

### 6.8 Tecnologías AI Service

- **Python 3.11+**
- **Flask 3.0** - Framework web
- **Sentence Transformers** - Modelo de embeddings
- **PyTorch** o **TensorFlow** - Backend ML
- **NumPy** - Operaciones con arrays
- **Scikit-learn** - Similitud coseno
- **Requests** - Cliente HTTP (para web service ↔ ai service)

---

## 7. DOCKER COMPOSE

### 7.1 Servicios

El sistema se orquestará con 3 servicios:

```yaml
# docker-compose.yml

version: '3.8'

services:
  db:
    image: postgres:15
    container_name: bookmate_db
    environment:
      POSTGRES_USER: bookmate
      POSTGRES_PASSWORD: secret123
      POSTGRES_DB: bookmate_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U bookmate"]
      interval: 10s
      timeout: 5s
      retries: 5

  web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: bookmate_web
    environment:
      DATABASE_URL: postgresql://bookmate:secret123@db:5432/bookmate_db
      JWT_SECRET_KEY: super-secret-key
      AI_SERVICE_URL: http://ai_service:5001
    ports:
      - "5000:5000"
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - .:/app
    command: flask run --host=0.0.0.0

  ai_service:
    build:
      context: ./ai_service
      dockerfile: Dockerfile
    container_name: bookmate_ai
    ports:
      - "5001:5001"
    volumes:
      - ./ai_service:/app
    command: flask run --host=0.0.0.0 --port=5001

volumes:
  postgres_data:
```

### 7.2 Dockerfile Web Service

```dockerfile
# product/ai/Dockerfile

FROM python:3.11-slim

WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements e instalar
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# Exponer puerto
EXPOSE 5000

# Variables de entorno
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Comando por defecto
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "app:app"]
```

### 7.3 Dockerfile AI Service

```dockerfile
# product/ai/ai_service/Dockerfile

FROM python:3.11-slim

WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements e instalar (incluye torch, transformers, etc.)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Descargar modelo pre-entrenado en build time (optimización)
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"

# Copiar código
COPY . .

# Exponer puerto
EXPOSE 5001

# Variables de entorno
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Comando por defecto
CMD ["gunicorn", "--bind", "0.0.0.0:5001", "--workers", "2", "--timeout", "120", "app:app"]
```

### 7.4 Ejecución

```bash
# Navegar a carpeta
cd product/ai/

# Construir imágenes y levantar servicios
docker-compose up --build

# En segundo terminal: ejecutar migraciones
docker-compose exec web flask db upgrade

# En segundo terminal: poblar BD con datos iniciales
docker-compose exec web python seed.py

# Acceder:
# - Web API: http://localhost:5000
# - AI Service: http://localhost:5001
# - PostgreSQL: localhost:5432
```

---

## 8. CRITERIOS DE ACEPTACIÓN POR HITO

### Hito 1: Backend Básico + BD (Semana 11 - 40%)

- ✅ Flask app ejecutándose sin errores
- ✅ Esquema PostgreSQL creado con migraciones Alembic
- ✅ 5+ endpoints REST funcionales (books, search)
- ✅ BD poblada con 100+ libros
- ✅ Colección Postman documentada
- ✅ Respuestas JSON válidas con códigos HTTP apropiados
- ✅ Manejo de errores (404, 400, 500)

### Hito 2: Autenticación + Biblioteca (Semana 13 - 60%)

- ✅ Sistema autenticación JWT funcional
- ✅ Endpoints `/api/auth/*` operativos
- ✅ Middleware `@jwt_required()` protege rutas
- ✅ Endpoints `/api/library/*` operativos
- ✅ CRUD completo de biblioteca personal
- ✅ Estados de lectura persistidos ("Leído", "Leyendo", "Por leer")
- ✅ Usuarios solo acceden a su propia biblioteca

### Hito 3: Recomendador Heurístico (Semana 15 - 80%)

- ✅ Algoritmo heurístico implementado con scoring
- ✅ Endpoint `/api/recommendations/<user_id>` funcional
- ✅ Recomendaciones relevantes (validación manual)
- ✅ Excluye libros ya en biblioteca
- ✅ Tiempo de respuesta <1 segundo
- ✅ Fallback a libros mejor valorados si biblioteca vacía

### Hito 4: Docker Compose Web + DB (Semana 15 - 80%)

- ✅ `docker-compose.yml` con servicios web y db
- ✅ Dockerfile para web service optimizado
- ✅ `docker-compose up` funciona sin errores
- ✅ Healthchecks configurados
- ✅ Volúmenes para persistencia de datos
- ✅ Variables de entorno documentadas en `.env.example`
- ✅ README con instrucciones de ejecución con Docker

### Hito 5: Servicio IA (Semana 16 - 100%)

- ✅ AI service Flask ejecutándose en puerto 5001
- ✅ Modelo Sentence Transformers cargado
- ✅ Endpoints `/embed` y `/recommend` funcionales
- ✅ Embeddings de sinopsis pre-calculados y almacenados
- ✅ Cálculo de similitud coseno implementado
- ✅ Recomendaciones IA con similitud >0.7 en top 5
- ✅ Dockerfile para ai_service con dependencias ML

### Hito 6: Integración Completa (Semana 16 - 100%)

- ✅ docker-compose con 3 servicios (web, db, ai_service)
- ✅ Comunicación web ↔ ai_service funcional
- ✅ Endpoint `/api/recommendations/ai/<user_id>` operativo
- ✅ Fallback automático a heurística si IA falla
- ✅ Logging de errores configurado
- ✅ `docker-compose up` inicia sistema completo sin errores
- ✅ Pruebas end-to-end exitosas
- ✅ Recomendaciones IA más precisas que heurística (validación manual)
- ✅ Tiempo de respuesta <2 segundos

---

## 9. ORDEN DE IMPLEMENTACIÓN (PROGRESIVO)

### Fase 1: Fundamentos (Semana 10-11)

1. Configurar proyecto Flask con estructura MVC
2. Configurar PostgreSQL y SQLAlchemy
3. Crear modelos (User, Book, Tag, BookTag, UserBook)
4. Crear migraciones Alembic
5. Implementar endpoints básicos de libros (GET /api/books, GET /api/books/<id>)
6. Poblar BD con dataset de 100+ libros
7. Documentar API con Postman

### Fase 2: Autenticación (Semana 12-13)

8. Implementar autenticación JWT con Flask-JWT-Extended
9. Crear endpoints de autenticación (register, login, profile)
10. Implementar middleware `@jwt_required()`
11. Crear endpoints de biblioteca personal (CRUD)
12. Implementar estados de lectura

### Fase 3: Recomendador Heurístico (Semana 14-15)

13. Diseñar algoritmo de scoring heurístico
14. Implementar lógica de recomendación en `recommendation_service.py`
15. Crear endpoint `/api/recommendations/<user_id>`
16. Probar con diferentes perfiles de usuario
17. Ajustar pesos del algoritmo según relevancia

### Fase 4: Dockerización (Semana 15)

18. Crear Dockerfile para web service
19. Crear docker-compose.yml con web y db
20. Configurar volúmenes y variables de entorno
21. Configurar healthchecks
22. Probar `docker-compose up` en máquina limpia

### Fase 5: Servicio IA (Semana 15-16) **[FASE FINAL]**

23. Crear estructura de proyecto ai_service
24. Implementar carga de modelo Sentence Transformers
25. Implementar endpoint `/embed`
26. Pre-calcular embeddings de todas las sinopsis
27. Almacenar embeddings (pickle o BD)
28. Implementar endpoint `/recommend` con similitud coseno
29. Crear Dockerfile para ai_service
30. Actualizar docker-compose.yml con servicio ai_service

### Fase 6: Integración IA (Semana 16)

31. Implementar cliente HTTP en web service para llamar ai_service
32. Crear endpoint `/api/recommendations/ai/<user_id>`
33. Implementar fallback automático a heurística
34. Configurar logging de errores
35. Probar sistema completo end-to-end
36. Validar precisión de recomendaciones IA vs heurística

---

## 10. MATRIZ DE RIESGOS

| ID | Riesgo | Probabilidad | Impacto | Mitigación |
|----|--------|--------------|---------|------------|
| R01 | Complejidad IA subestimada | Media | Alto | Comenzar con heurística simple, IA como fase final |
| R02 | Dataset de libros con sinopsis insuficiente | Media | Alto | Identificar 3+ fuentes: Kaggle, OpenLibrary API, Goodreads |
| R03 | Hardware insuficiente para modelos ML | Media | Medio | Usar modelos pre-entrenados pequeños, Google Colab |
| R04 | Embeddings consumen mucha RAM | Media | Medio | Pre-calcular y almacenar en disco, cargar bajo demanda |
| R05 | Docker consume muchos recursos | Baja | Medio | Optimizar imágenes (multi-stage build), usar Alpine |
| R06 | AI service lento en inferencia | Media | Medio | Pre-calcular embeddings, usar modelo ligero, timeouts |
| R07 | Problemas de comunicación inter-servicios | Baja | Medio | Healthchecks, retry logic, fallback robusto |
| R08 | Migraciones BD rompen datos | Baja | Alto | Testing en BD de desarrollo, backups antes de migrar |

---

## 11. TECNOLOGÍAS Y DEPENDENCIAS

### Web Service (`requirements.txt`)

```
Flask==3.0.0
Flask-SQLAlchemy==3.1.1
Flask-Migrate==4.0.5
Flask-JWT-Extended==4.5.3
Flask-CORS==4.0.0
psycopg2-binary==2.9.9
python-dotenv==1.0.0
gunicorn==21.2.0
requests==2.31.0
pytest==7.4.3
pytest-flask==1.3.0
```

### AI Service (`ai_service/requirements.txt`)

```
Flask==3.0.0
sentence-transformers==2.2.2
torch==2.1.0
numpy==1.24.3
scikit-learn==1.3.2
gunicorn==21.2.0
python-dotenv==1.0.0
```

---

## 12. DOCUMENTACIÓN ADICIONAL

- **Plan completo del proyecto:** Ver `/PLAN_PROYECTO.md`
- **Cronograma de entregas:** Ver `/CRONOGRAMA_SEMANAS.md`
- **Resumen ejecutivo:** Ver `/PROJECT_SUMMARY.md`
- **Plan track BASIC:** Ver `/product/basic/PLAN_BASIC.md`
- **Instrucciones de ejecución:** Ver `README.md` en esta carpeta

---

## 13. TRABAJO FUTURO (POST-ENTREGA ACADÉMICA)

Mejoras que se podrían implementar después de la semana 16:

- **Recomendaciones híbridas:** Combinar heurística + IA con pesos configurables
- **Feedback del usuario:** Permitir "like/dislike" en recomendaciones para mejorar modelo
- **Caché de recomendaciones:** Redis para cachear resultados frecuentes
- **Búsqueda semántica:** Usar embeddings para búsqueda por similitud de query
- **Filtrado colaborativo:** Recomendar basado en usuarios con gustos similares
- **A/B testing:** Comparar precisión heurística vs IA con métricas reales
- **Dashboard admin:** Panel web para gestionar libros y usuarios
- **CI/CD:** GitHub Actions para testing y deployment automático

---

**Preparado por:** Equipo BookMate - Grupo 6.2  
**Fecha:** Noviembre 2024  
**Versión:** 1.0  
**Estado:** En planificación
