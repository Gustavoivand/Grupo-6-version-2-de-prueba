# Prototipo Navegable - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Noviembre 2025  
**Versión:** 1.0  

---

## 1. Introducción

Este documento describe el prototipo navegable actual del sistema BookMate, ubicado en `product/basic-springboot/`. Este prototipo representa una versión funcional simplificada que demuestra las capacidades básicas del sistema y sirve como base para el desarrollo del sistema completo.

### 1.1 Propósito del Prototipo

El prototipo actual tiene los siguientes objetivos:

- ✅ Validar requisitos funcionales principales
- ✅ Demostrar la viabilidad del sistema
- ✅ Proporcionar una base para el desarrollo completo
- ✅ Permitir feedback temprano de stakeholders
- ✅ Servir como referencia para el diseño arquitectónico

### 1.2 Estado Actual

**Ubicación:** `product/basic-springboot/`  
**Versión:** 1.0.0  
**Estado:** Funcional (prototipo básico)  
**Última actualización:** Noviembre 2025  

---

## 2. Arquitectura del Prototipo Actual

### 2.1 Stack Tecnológico Implementado

| Componente | Tecnología | Versión | Propósito |
|------------|------------|---------|-----------|
| **Backend** | Spring Boot | 3.2.0 | Framework web |
| **Servidor** | Tomcat embebido | (incluido) | Servidor HTTP |
| **Frontend** | HTML5, CSS3, JavaScript | ES6+ | Interfaz de usuario |
| **UI Framework** | Bootstrap | 5.1.3 | Diseño responsive |
| **Iconos** | Font Awesome | 6.4.0 | Iconografía |
| **Build Tool** | Maven | 3.9.5 | Gestión de dependencias |
| **Runtime** | Java | 24 (compatible 17+) | Lenguaje de programación |

### 2.2 Arquitectura Simplificada

```
┌─────────────────────────────────────────┐
│         Navegador del Usuario          │
│  ┌──────────────────────────────────┐  │
│  │   Frontend (HTML/CSS/JS)          │  │
│  │   - Interfaz responsive           │  │
│  │   - Lógica de recomendaciones     │  │
│  │   - Gestión de estado             │  │
│  └──────────────────────────────────┘  │
│            ↓ HTTP GET                   │
└─────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│    Spring Boot Backend (Puerto 8080)    │
│  ┌──────────────────────────────────┐  │
│  │   StaticController               │  │
│  │   - Sirve archivos estáticos     │  │
│  │   - Sin lógica de negocio       │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│       Archivos Estáticos                │
│  ┌──────────────────────────────────┐  │
│  │   - index.html                   │  │
│  │   - catalog.html                 │  │
│  │   - details.html                 │  │
│  │   - admin.html                   │  │
│  │   - library.html                 │  │
│  │   - books.json                   │  │
│  │   - *.js, *.css                  │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│       LocalStorage (Navegador)           │
│  - Usuarios de prueba                  │
│  - Sesiones                             │
│  - Cambios del admin                    │
│  - Biblioteca personal                  │
└─────────────────────────────────────────┘
```

### 2.3 Características Clave

**Ventajas del prototipo actual:**
- ✅ Funcional y navegable
- ✅ Interfaz responsive
- ✅ Sistema de recomendaciones heurísticas operativo
- ✅ CRUD completo de libros (panel admin)
- ✅ Fácil de ejecutar (solo Spring Boot)

**Limitaciones del prototipo:**
- ❌ Sin base de datos real (datos en JSON estático)
- ❌ Sin servicio de IA (solo recomendaciones heurísticas)
- ❌ Persistencia volátil (localStorage)
- ❌ Sin autenticación real (usuarios en localStorage)
- ❌ Sin gestión de autores como entidad independiente

---

## 3. Instrucciones de Ejecución

### 3.1 Requisitos Previos

- **Java 17 o superior** (recomendado Java 24)
- **Maven 3.9.5+** (incluido via Maven Wrapper)
- **Navegador moderno** (Chrome, Firefox, Edge, Safari)
- **JavaScript habilitado**

### 3.2 Pasos para Ejecutar

#### Windows PowerShell:

```powershell
# 1. Navegar al directorio del prototipo
cd "D:\02.Estudios\1.UNI\CC341 IS\CICLO ACTUAL\Grupo 6.2\product\basic-springboot"

# 2. Configurar JAVA_HOME (si es necesario)
$env:JAVA_HOME = "C:\Program Files\Java\jdk-24"

# 3. Ejecutar la aplicación
.\mvnw.cmd spring-boot:run
```

#### Linux/Mac:

```bash
# 1. Navegar al directorio del prototipo
cd product/basic-springboot

# 2. Configurar JAVA_HOME (si es necesario)
export JAVA_HOME=/path/to/jdk-24

# 3. Ejecutar la aplicación
./mvnw spring-boot:run
```

### 3.3 Acceso al Sistema

1. **Abrir navegador** en: **http://localhost:8080**
2. **Credenciales de prueba:**
   - **Usuario:** `demo@bookmate.com` / `demo123`
   - **Admin:** `admin@bookmate.com` / `admin123`

### 3.4 Verificación de Funcionamiento

**Checklist de verificación:**
- [ ] El servidor inicia sin errores
- [ ] La página principal carga correctamente
- [ ] El catálogo muestra 30 libros
- [ ] La búsqueda funciona
- [ ] El login funciona con credenciales de prueba
- [ ] El panel de administración es accesible (solo admin)
- [ ] Las recomendaciones heurísticas funcionan

---

## 4. Funcionalidades Disponibles

### 4.1 Página Principal (index.html)

**Ruta:** `/` o `/index.html`

**Funcionalidades:**
- Visualización de libros destacados
- Acceso rápido al catálogo
- Navegación principal
- Sistema de login básico

**Datos mostrados:**
- Libros destacados desde `assets/data/featured_books.json`
- Grid responsive de libros

---

### 4.2 Catálogo de Libros (catalog.html)

**Ruta:** `/catalog.html`

**Funcionalidades:**
- ✅ Lista completa de 30 libros precargados
- ✅ Búsqueda en tiempo real por título, autor o género
- ✅ Filtrado por rango de precio (sliders)
- ✅ Visualización en grid responsive
- ✅ Acceso a detalles de cada libro

**Datos fuente:**
- `assets/data/books.json` (30 libros de ejemplo)

**Limitaciones:**
- Sin paginación (muestra todos los libros)
- Sin ordenamiento dinámico
- Sin filtros avanzados (solo precio)

---

### 4.3 Detalle de Libro (details.html)

**Ruta:** `/details.html?id={id}`

**Funcionalidades:**
- ✅ Visualización completa de metadatos del libro
- ✅ Información del autor
- ✅ Sinopsis completa
- ✅ Botón "Ver libros similares" (recomendaciones heurísticas)
- ✅ Botón para agregar a biblioteca personal

**Datos mostrados:**
- Título, autor, género, editorial, año
- Páginas, ISBN, idioma, precio, rating
- Portada, sinopsis, tags

---

### 4.4 Biblioteca Personal (library.html)

**Ruta:** `/library.html` (requiere login)

**Funcionalidades:**
- ✅ Agregar/quitar libros de la biblioteca personal
- ✅ Estados de lectura: "Para leer", "Leyendo", "Leído"
- ✅ Estadísticas personales (total de libros, por estado)
- ✅ **Sistema de recomendaciones heurísticas:**
  - Seleccionar libros favoritos (checkbox)
  - Click en "Obtener Recomendaciones"
  - Algoritmo heurístico calcula similitud
  - Muestra top 6 libros recomendados

**Algoritmo de recomendaciones heurísticas:**
```javascript
// Puntuación por criterio:
// - Género compartido: +3 puntos
// - Autor común: +5 puntos
// - Tags compartidos: +2 puntos cada uno
// - Precio similar (±20%): +1 punto
// - Rating alto (≥4.0): +1 punto
```

**Persistencia:**
- Datos guardados en `localStorage` del navegador
- Persisten entre sesiones del mismo navegador

---

### 4.5 Panel de Administración (admin.html)

**Ruta:** `/admin.html` (requiere login como admin)

**Funcionalidades:**
- ✅ **CRUD completo de libros:**
  - Crear nuevo libro (formulario completo)
  - Listar todos los libros (tabla)
  - Editar libro existente (edición in-place)
  - Eliminar libro (con confirmación)
- ✅ **Validaciones de datos:**
  - Campos obligatorios: título, autor, género, precio, año, páginas, rating
  - Precio > 0
  - Año entre 1900 y 2025
  - Páginas > 0
  - Rating entre 0 y 5
- ✅ **Importar/Exportar CSV:**
  - Botones disponibles (UI implementada)
  - Funcionalidad pendiente de implementación completa

**Persistencia:**
- Cambios guardados en `localStorage`
- Los cambios persisten durante la sesión del navegador
- Los datos originales en `books.json` no se modifican

**Limitaciones:**
- Sin gestión de autores como entidad independiente
- Autores son texto libre (no tabla de autores)
- Sin importación/exportación CSV funcional completa

---

### 4.6 Sistema de Autenticación (Volátil)

**Implementación actual:**
- Usuarios almacenados en `localStorage`
- Sin hashing de contraseñas
- Sin tokens JWT
- Sin sesiones en servidor

**Usuarios de prueba precargados:**
- **Usuario:** `demo@bookmate.com` / `demo123`
- **Admin:** `admin@bookmate.com` / `admin123`

**Flujo:**
1. Usuario ingresa credenciales
2. Sistema valida contra `localStorage`
3. Si válido, guarda sesión en `sessionStorage`
4. Redirige según rol (usuario o admin)

---

## 5. Comparación: Prototipo vs Sistema Final Planificado

### 5.1 Tabla Comparativa

| Aspecto | Prototipo Actual | Sistema Final Planificado |
|---------|------------------|---------------------------|
| **Backend** | Spring Boot (solo StaticController) | Spring Boot completo con Services, Repositories, Controllers |
| **Base de Datos** | JSON estático + localStorage | PostgreSQL 16 con Spring Data JPA |
| **Persistencia** | Volátil (localStorage) | Persistente (PostgreSQL) |
| **Autenticación** | localStorage básico | JWT tokens, Spring Security |
| **Recomendaciones** | Solo heurísticas | IA (embeddings) + Heurísticas (fallback) |
| **Servicio IA** | No implementado | Microservicio Python con Sentence Transformers |
| **Gestión de Autores** | Texto libre | Entidad independiente con CRUD completo |
| **Migraciones BD** | No aplica | Flyway para versionado de esquema |
| **Containerización** | No | Docker + Docker Compose |
| **API REST** | No (solo archivos estáticos) | API REST completa documentada |
| **Pruebas** | Manual | JUnit + Postman + pytest (cobertura >80%) |

### 5.2 Funcionalidades que se Agregarán

**En el sistema final:**

1. **Servicio de IA:**
   - Microservicio Python separado
   - Generación de embeddings con Sentence Transformers
   - Cálculo de similitud de coseno
   - API REST para recomendaciones

2. **Base de Datos Real:**
   - PostgreSQL 16
   - Tablas: libros, autores, usuarios, embeddings
   - Relaciones Many-to-One, One-to-One
   - Migraciones con Flyway

3. **Autenticación Real:**
   - Spring Security
   - JWT tokens
   - Hashing de contraseñas (BCrypt)
   - Sesiones persistentes

4. **API REST Completa:**
   - Endpoints para CRUD de libros
   - Endpoints para CRUD de autores
   - Endpoint para recomendaciones
   - Endpoint para búsquedas
   - Documentación OpenAPI/Swagger

5. **Gestión de Autores:**
   - Tabla independiente de autores
   - CRUD completo de autores
   - Relación Many-to-One con libros

6. **Containerización:**
   - Dockerfile para backend
   - Dockerfile para servicio IA
   - docker-compose.yml para orquestación
   - Volúmenes para PostgreSQL

---

## 6. Arquitectura Objetivo vs Prototipo

### 6.1 Arquitectura del Prototipo (Actual)

```
Frontend (HTML/JS)
    ↓ HTTP GET
Spring Boot (StaticController)
    ↓
Archivos Estáticos
    ↓
LocalStorage (Navegador)
```

**Características:**
- Arquitectura monolítica simple
- Sin separación de capas
- Sin base de datos
- Sin servicios externos

### 6.2 Arquitectura Objetivo (Sistema Final)

```
Frontend (HTML/JS)
    ↓ HTTP REST
Spring Boot Backend
    ├─→ PostgreSQL (BD)
    └─→ Servicio IA Python (HTTP)
        └─→ Modelo Sentence Transformers
```

**Características:**
- Arquitectura de microservicios
- Separación de responsabilidades
- Base de datos relacional
- Servicio externo de IA
- Containerización con Docker

### 6.3 Evolución Planificada

**Fase 1 (Prototipo Actual):**
- ✅ Frontend funcional
- ✅ Recomendaciones heurísticas
- ✅ CRUD básico de libros

**Fase 2 (Sistema Final - Semanas 13-16):**
- ⏳ Backend completo con Spring Boot
- ⏳ PostgreSQL con Spring Data JPA
- ⏳ Servicio IA con Python
- ⏳ Autenticación con JWT
- ⏳ API REST documentada
- ⏳ Docker Compose para despliegue

---

## 7. Datos del Prototipo

### 7.1 Catálogo de Libros

**Ubicación:** `src/main/resources/static/assets/data/books.json`

**Contenido:**
- 30 libros de ejemplo
- Metadatos completos: título, autor, género, año, páginas, rating, sinopsis, ISBN, editorial, tags

**Formato:**
```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "genre": "Programación",
  "year": 2008,
  "pages": 464,
  "rating": 4.7,
  "cover": "https://example.com/cover.jpg",
  "description": "Sinopsis del libro...",
  "isbn": "978-0-13-235088-4",
  "publisher": "Prentice Hall",
  "language": "es",
  "tags": ["programación", "arquitectura", "código-limpio"]
}
```

### 7.2 Usuarios de Prueba

**Almacenamiento:** `localStorage` del navegador

**Usuarios precargados:**
- `demo@bookmate.com` / `demo123` (Usuario)
- `admin@bookmate.com` / `admin123` (Administrador)

---

## 8. Flujos de Usuario Validados

### 8.1 Flujo 1: Búsqueda y Recomendaciones

**Objetivo:** Usuario busca libros y obtiene recomendaciones

**Pasos:**
1. Usuario accede a `/catalog.html`
2. Ingresa término de búsqueda (ej: "arquitectura")
3. Sistema filtra resultados en tiempo real
4. Usuario selecciona un libro
5. Visualiza detalles en `/details.html`
6. Hace click en "Ver libros similares"
7. Sistema muestra 6 recomendaciones heurísticas
8. Usuario explora recomendaciones

**Tiempo estimado:** 2-3 minutos

**Resultado:** ✅ Funcional

---

### 8.2 Flujo 2: Administración del Catálogo

**Objetivo:** Administrador agrega un nuevo libro

**Pasos:**
1. Admin hace login con `admin@bookmate.com` / `admin123`
2. Accede a `/admin.html`
3. Hace click en "Agregar Libro"
4. Completa formulario con metadatos
5. Sistema valida datos
6. Libro aparece en la tabla
7. Libro es visible en catálogo público

**Tiempo estimado:** 3-5 minutos

**Resultado:** ✅ Funcional (datos en localStorage)

---

### 8.3 Flujo 3: Biblioteca Personal

**Objetivo:** Usuario gestiona su biblioteca y obtiene recomendaciones

**Pasos:**
1. Usuario hace login
2. Accede a `/library.html`
3. Agrega libros a su biblioteca
4. Marca estado de lectura
5. Selecciona libros favoritos
6. Solicita recomendaciones
7. Sistema calcula similitud heurística
8. Muestra 6 libros recomendados

**Tiempo estimado:** 3-4 minutos

**Resultado:** ✅ Funcional

---

## 9. Limitaciones Conocidas

### 9.1 Limitaciones Técnicas

1. **Sin base de datos real:**
   - Datos en JSON estático
   - Cambios no persisten en servidor
   - Sin integridad referencial

2. **Sin servicio de IA:**
   - Solo recomendaciones heurísticas
   - No análisis semántico
   - No embeddings

3. **Autenticación simplificada:**
   - Sin seguridad real
   - Contraseñas en texto plano
   - Sin tokens JWT

4. **Persistencia volátil:**
   - Datos en localStorage
   - Se pierden al limpiar caché
   - No compartidos entre navegadores

### 9.2 Limitaciones Funcionales

1. **Sin gestión de autores:**
   - Autores como texto libre
   - No hay tabla de autores
   - No se puede buscar por autor independientemente

2. **Sin importación/exportación CSV completa:**
   - UI implementada
   - Funcionalidad pendiente

3. **Sin paginación:**
   - Muestra todos los libros
   - Puede ser lento con muchos libros

4. **Sin filtros avanzados:**
   - Solo filtro de precio
   - Sin filtros por género, año, rating

---

## 10. Próximos Pasos para el Sistema Final

### 10.1 Backend Completo (Semanas 13-15)

**Tareas:**
- [ ] Implementar entidades JPA (Libro, Autor, Usuario)
- [ ] Crear repositorios Spring Data
- [ ] Implementar servicios de negocio
- [ ] Crear controladores REST
- [ ] Configurar PostgreSQL
- [ ] Implementar migraciones Flyway
- [ ] Agregar validaciones de datos
- [ ] Implementar manejo de excepciones

### 10.2 Servicio de IA (Semanas 13-15)

**Tareas:**
- [ ] Desarrollar microservicio Python
- [ ] Integrar Sentence Transformers
- [ ] Implementar generación de embeddings
- [ ] Implementar cálculo de similitud
- [ ] Crear API REST para recomendaciones
- [ ] Implementar caché de embeddings
- [ ] Manejar timeouts y errores

### 10.3 Integración y Despliegue (Semana 16)

**Tareas:**
- [ ] Integrar frontend con backend
- [ ] Configurar Docker Compose
- [ ] Implementar autenticación JWT
- [ ] Realizar pruebas de integración
- [ ] Optimizar rendimiento
- [ ] Documentar API REST
- [ ] Preparar demo final

---

## 11. Conclusiones

### 11.1 Logros del Prototipo

- ✅ **Validación de requisitos:** Los requisitos funcionales principales están validados
- ✅ **Base sólida:** Proporciona una base clara para el desarrollo completo
- ✅ **Feedback temprano:** Permite obtener feedback antes de implementar el sistema completo
- ✅ **Recomendaciones heurísticas:** Funcionan correctamente como fallback

### 11.2 Valor para el Proyecto

El prototipo actual demuestra:

1. **Viabilidad del sistema:** El concepto es factible y funcional
2. **Interfaz usable:** La UI es intuitiva y responsive
3. **Algoritmos básicos:** Las recomendaciones heurísticas funcionan
4. **Arquitectura base:** Spring Boot es adecuado para el backend

### 11.3 Evolución hacia el Sistema Final

El sistema final se construirá sobre esta base, agregando:

- Base de datos real (PostgreSQL)
- Servicio de IA (Python)
- Autenticación real (JWT)
- API REST completa
- Containerización (Docker)
- Pruebas automatizadas

---

## 12. Referencias

- **Código fuente:** `product/basic-springboot/`
- **README técnico:** `product/basic-springboot/README.md`
- **Charter del proyecto:** `deliverables/semana_07/charter.md`
- **SRS:** `deliverables/semana_08/srs.md`
- **Modelo de análisis:** `deliverables/semana_11/modelo_analisis.md`

---

**Versión:** 1.0  
**Última actualización:** Noviembre 2025  
**Grupo 6** - Universidad Nacional de Ingeniería

