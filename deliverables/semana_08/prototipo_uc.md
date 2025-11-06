# Prototipo de Casos de Uso - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Octubre 2025  
**Versión:** 1.0  

---

## 1. Introducción

### 1.1 Propósito del Prototipo

Este documento describe el prototipo de casos de uso desarrollado para validar los requisitos funcionales del sistema BookMate. El prototipo es una versión simplificada pero funcional que demuestra las funcionalidades principales del sistema.

### 1.2 Alcance del Prototipo

El prototipo actual implementa:

- ✅ Interfaz web responsive
- ✅ Catálogo de libros navegable
- ✅ Búsqueda básica de libros
- ✅ Visualización de detalles
- ✅ Sistema de recomendaciones heurísticas (funcional)
- ✅ Panel de administración básico (CRUD de libros)

### 1.3 Ubicación del Prototipo

El prototipo está disponible en: `product/basic-springboot/`

---

## 2. Arquitectura del Prototipo

### 2.1 Componentes

El prototipo actual consiste en:

1. **Frontend Estático:**
   - HTML5, CSS3, JavaScript Vanilla
   - Bootstrap 5.1.3 para UI responsive
   - Font Awesome 6.4.0 para iconos
   - Ubicación: `src/main/resources/static/`

2. **Backend Minimalista:**
   - Spring Boot 3.2.0 (StaticController)
   - Servidor Tomcat embebido
   - Sirve archivos estáticos
   - Puerto: 8080

3. **Datos:**
   - JSON estático (`books.json`, `featured_books.json`)
   - LocalStorage del navegador para persistencia volátil
   - 30 libros precargados

### 2.2 Arquitectura Simplificada

```
┌────────────────────────────────────────┐
│         Navegador del Usuario          │
│  ┌──────────────────────────────────┐  │
│  │   Frontend (HTML/CSS/JS)         │  │
│  │   - Interfaz responsive          │  │
│  │   - Lógica de recomendaciones    │  │
│  │   - Gestión de estado            │  │
│  └──────────────────────────────────┘  │
│            ↓ HTTP GET                   │
└────────────────────────────────────────┘
             ↓
┌────────────────────────────────────────┐
│    Spring Boot Backend (Puerto 8080)   │
│  ┌──────────────────────────────────┐  │
│  │   StaticController               │  │
│  │   - Sirve archivos estáticos     │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
             ↓
┌────────────────────────────────────────┐
│       Archivos Estáticos               │
│  ┌──────────────────────────────────┐  │
│  │   - index.html                   │  │
│  │   - catalog.html                 │  │
│  │   - details.html                 │  │
│  │   - admin.html                   │  │
│  │   - books.json                   │  │
│  │   - *.js, *.css                  │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
             ↓
┌────────────────────────────────────────┐
│       LocalStorage (Navegador)         │
│  - Usuarios de prueba                  │
│  - Sesiones                            │
│  - Cambios del admin                   │
│  - Biblioteca personal                 │
└────────────────────────────────────────┘
```

---

## 3. Funcionalidades Implementadas

### 3.1 UC-02: Listar Libros

**Estado:** ✅ Implementado

**Descripción:** El catálogo completo de libros es navegable.

**Implementación:**
- Archivo: `catalog.html`, `catalog.js`
- Carga los libros desde `books.json`
- Muestra grid responsive de tarjetas de libros
- Cada tarjeta incluye: portada, título, autor, género, precio, rating

**Limitaciones:**
- Sin paginación (muestra todos los libros)
- Sin ordenamiento dinámico

**Captura de pantalla:** (Pendiente)

---

### 3.2 UC-05: Buscar Libros

**Estado:** ✅ Implementado

**Descripción:** Búsqueda de libros por título, autor o género.

**Implementación:**
- Archivo: `catalog.js` (función `searchBooks`)
- Búsqueda en tiempo real (al escribir)
- Insensible a mayúsculas/minúsculas
- Busca en: título, autor, género

**Código relevante:**
```javascript
function searchBooks(query) {
    const lowerQuery = query.toLowerCase();
    return allBooks.filter(book => 
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        book.genre.toLowerCase().includes(lowerQuery)
    );
}
```

**Limitaciones:**
- Solo búsqueda simple (sin filtros avanzados)
- Sin autocompletado

---

### 3.3 UC-07: Ver Detalle de Libro

**Estado:** ✅ Implementado

**Descripción:** Visualización completa de la información de un libro.

**Implementación:**
- Archivo: `details.html`, `details.js`
- Muestra todos los metadatos del libro
- Incluye botón "Ver recomendaciones similares"
- Formato responsive

**Datos mostrados:**
- Portada grande
- Título, autor
- Género, editorial, año
- Páginas, ISBN, idioma
- Precio, rating
- Sinopsis completa
- Tags

**Limitaciones:**
- Datos estáticos (no editable desde UI normal)

---

### 3.4 UC-06: Obtener Recomendaciones

**Estado:** ⚠️ Implementado parcialmente (solo heurísticas)

**Descripción:** Sistema de recomendaciones basado en reglas heurísticas.

**Implementación:**
- Archivo: `library.js` (función `getRecommendations`)
- Algoritmo heurístico funcional
- Retorna top 6 libros similares

**Algoritmo implementado:**

```javascript
function calculateSimilarity(book1, book2) {
    let score = 0;
    
    // Género compartido: +3 puntos
    if (book1.genre === book2.genre) score += 3;
    
    // Autor común: +5 puntos
    if (book1.author === book2.author) score += 5;
    
    // Tags compartidos: +2 puntos por tag
    const commonTags = book1.tags.filter(tag => 
        book2.tags.includes(tag)
    );
    score += commonTags.length * 2;
    
    // Precio similar (±20%): +1 punto
    const priceDiff = Math.abs(book1.price - book2.price);
    if (priceDiff / book1.price <= 0.20) score += 1;
    
    // Rating alto (≥4.0): +1 punto
    if (book2.rating >= 4.0) score += 1;
    
    return score;
}
```

**Flujo:**
1. Usuario hace click en "Ver recomendaciones" desde detalle de libro
2. Sistema calcula similitud con todos los libros del catálogo
3. Ordena por puntuación descendente
4. Muestra los 6 más similares (excluyendo el libro original)

**Limitaciones:**
- ❌ No implementa recomendaciones con IA (Servicio Python pendiente)
- ✅ Sistema heurístico funcional sirve como fallback

**Casos de prueba validados:**

| Libro de Referencia | Recomendaciones Esperadas | ¿Relevantes? |
|---------------------|---------------------------|--------------|
| "Clean Code" (Programming) | Otros libros de programación/arquitectura | ✅ Sí |
| "El nombre del viento" (Fantasía) | Otros libros de fantasía/épicos | ✅ Sí |
| "Sapiens" (Historia) | Libros de historia/antropología | ✅ Sí |

---

### 3.5 UC-01, UC-03, UC-04: CRUD de Libros (Admin)

**Estado:** ✅ Implementado

**Descripción:** Panel de administración para gestionar el catálogo.

**Implementación:**
- Archivo: `admin.html`, `admin.js`, `book-manager.js`
- Operaciones:
  - ✅ Crear libro (formulario completo)
  - ✅ Listar libros (tabla)
  - ✅ Actualizar libro (edición in-place)
  - ✅ Eliminar libro (con confirmación)

**Persistencia:**
- Cambios guardados en `localStorage`
- Los cambios persisten durante la sesión del navegador
- Los datos originales en `books.json` no se modifican

**Validaciones implementadas:**
- Campos obligatorios: título, autor, género, precio, año, páginas, rating
- Precio > 0
- Año entre 1900 y 2025
- Páginas > 0
- Rating entre 0 y 5

**Limitaciones:**
- Sin backend real (cambios no persisten en servidor)
- Sin gestión de autores (autores son texto libre)
- Sin importación/exportación CSV funcional

---

### 3.6 UC-08: Filtrar por Precio

**Estado:** ✅ Implementado

**Descripción:** Filtrado de libros por rango de precio.

**Implementación:**
- Archivo: `catalog.html`, `catalog.js`
- Sliders para precio mínimo y máximo
- Filtrado en tiempo real

**Limitaciones:**
- Solo filtro de precio (sin otros filtros como género, año)

---

### 3.7 UC-09: Navegar Catálogo

**Estado:** ✅ Implementado

**Descripción:** Exploración completa del catálogo.

**Implementación:**
- Archivo: `catalog.html`
- Grid responsive de libros
- Acceso desde menú principal

**Limitaciones:**
- Sin paginación
- Sin opciones de ordenamiento

---

## 4. Funcionalidades No Implementadas

### 4.1 Sistema de Recomendaciones con IA

**Estado:** ❌ No implementado  
**Razón:** Requiere servicio Python separado  
**Caso de Uso:** UC-06 (versión completa con NLP)  

**Pendiente:**
- Desarrollo del servicio Python con Sentence Transformers
- Generación de embeddings de sinopsis
- Cálculo de similitud de coseno
- Integración vía API REST

**Alternativa actual:** Sistema heurístico funcional como fallback

---

### 4.2 Gestión de Autores (CRUD)

**Estado:** ❌ No implementado  
**Casos de Uso:** UC-10, UC-11, UC-12, UC-13  

**Pendiente:**
- Tabla de autores independiente
- CRUD completo de autores
- Relación Many-to-One con libros

**Alternativa actual:** Autores como campo de texto en libros

---

### 4.3 Autenticación Real

**Estado:** ❌ No implementado (simplificado)  
**Razón:** Fuera del alcance del prototipo  

**Implementación actual:**
- Sistema de autenticación basado en `localStorage`
- Usuarios de prueba precargados:
  - Usuario: `demo@bookmate.com` / `demo123`
  - Admin: `admin@bookmate.com` / `admin123`

**Pendiente:**
- Backend con base de datos de usuarios
- Hashing de contraseñas
- Tokens JWT
- Sesiones persistentes

---

### 4.4 Importación/Exportación CSV

**Estado:** ⚠️ Parcialmente implementado (UI, sin funcionalidad)  
**Casos de Uso:** UC-14, UC-15  

**Implementación actual:**
- Botones en panel de admin
- Sin funcionalidad real

**Pendiente:**
- Parser de CSV
- Validación de formato
- Generación de CSV
- Descarga de archivo

---

## 5. Flujos de Usuario Demostrados

### 5.1 Flujo 1: Descubrimiento de Libros con Recomendaciones

**Objetivo:** Usuario descubre libros relacionados a uno de interés

**Pasos:**
1. Usuario accede al catálogo (`/catalog.html`)
2. Explora libros o usa búsqueda
3. Hace click en un libro de interés
4. Visualiza detalles completos (`/details.html`)
5. Hace click en "Ver libros similares"
6. Sistema muestra 6 recomendaciones basadas en heurísticas
7. Usuario explora las recomendaciones

**Resultado:** Usuario descubre libros relacionados que no conocía

**Tiempo estimado:** 1-2 minutos

---

### 5.2 Flujo 2: Búsqueda y Filtrado

**Objetivo:** Usuario encuentra libros académicos sobre un tema específico

**Pasos:**
1. Usuario accede al catálogo
2. Ingresa término de búsqueda (ej: "arquitectura")
3. Resultados filtrados aparecen en tiempo real
4. Usuario ajusta rango de precio con sliders
5. Resultados se actualizan automáticamente
6. Usuario selecciona libro de interés

**Resultado:** Usuario encuentra libros relevantes en menos de 30 segundos

**Tiempo estimado:** 30 segundos - 1 minuto

---

### 5.3 Flujo 3: Administrador Gestiona Catálogo

**Objetivo:** Administrador agrega un nuevo libro al catálogo

**Pasos:**
1. Admin hace login con credenciales (`admin@bookmate.com` / `admin123`)
2. Accede al panel de administración (`/admin.html`)
3. Hace click en "Agregar Libro"
4. Completa formulario con metadatos del libro
5. Hace click en "Guardar"
6. Sistema valida datos
7. Libro aparece en la tabla de administración
8. Admin puede ver el libro en el catálogo público

**Resultado:** Nuevo libro agregado al catálogo

**Tiempo estimado:** 2-3 minutos

---

## 6. Tecnologías Utilizadas en el Prototipo

### 6.1 Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| HTML5 | - | Estructura de páginas |
| CSS3 | - | Estilos visuales |
| JavaScript | ES6+ | Lógica de negocio frontend |
| Bootstrap | 5.1.3 | Framework UI responsive |
| Font Awesome | 6.4.0 | Iconos |

### 6.2 Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Java | 24 (compatible con 17+) | Runtime |
| Spring Boot | 3.2.0 | Framework backend |
| Tomcat | Embebido | Servidor web |
| Maven | 3.9.5 | Gestión de dependencias |

### 6.3 Datos

- **Formato:** JSON estático
- **Persistencia volátil:** LocalStorage del navegador
- **Catálogo:** 30 libros de ejemplo

---

## 7. Cómo Ejecutar el Prototipo

### 7.1 Requisitos Previos

- Java 17 o superior (recomendado Java 24)
- Maven 3.9.5+ (o usar Maven Wrapper incluido)
- Navegador moderno (Chrome, Firefox, Edge, Safari)
- JavaScript habilitado

### 7.2 Instrucciones de Ejecución

#### Windows PowerShell:

```powershell
cd "product\basic-springboot"
$env:JAVA_HOME = "C:\Program Files\Java\jdk-24"
.\mvnw.cmd spring-boot:run
```

#### Linux/Mac:

```bash
cd product/basic-springboot
export JAVA_HOME=/path/to/jdk-24
./mvnw spring-boot:run
```

### 7.3 Acceso

1. Abrir navegador en: **http://localhost:8080**
2. Credenciales de prueba:
   - Usuario: `demo@bookmate.com` / `demo123`
   - Admin: `admin@bookmate.com` / `admin123`

---

## 8. Pruebas de Validación

### 8.1 Casos de Prueba Ejecutados

| ID | Caso de Prueba | Resultado | Observaciones |
|----|----------------|-----------|---------------|
| PT-01 | Listar todos los libros | ✅ Pasó | Muestra 30 libros correctamente |
| PT-02 | Buscar por título | ✅ Pasó | Búsqueda funciona en tiempo real |
| PT-03 | Ver detalle de libro | ✅ Pasó | Muestra todos los metadatos |
| PT-04 | Obtener recomendaciones heurísticas | ✅ Pasó | Retorna 6 libros relevantes |
| PT-05 | Filtrar por precio | ✅ Pasó | Filtrado funciona correctamente |
| PT-06 | Crear libro (admin) | ✅ Pasó | Validaciones funcionan |
| PT-07 | Editar libro (admin) | ✅ Pasó | Actualización correcta |
| PT-08 | Eliminar libro (admin) | ✅ Pasó | Confirmación funciona |
| PT-09 | Responsive design | ✅ Pasó | Funciona en móvil/tablet/desktop |
| PT-10 | Persistencia LocalStorage | ✅ Pasó | Cambios persisten durante sesión |

### 8.2 Criterios de Aceptación Cumplidos

- ✅ Interfaz responsive funciona en todos los tamaños de pantalla
- ✅ Búsqueda retorna resultados en <1 segundo
- ✅ Recomendaciones heurísticas funcionan correctamente
- ✅ CRUD de libros completo en panel de admin
- ✅ Validaciones de datos funcionan
- ✅ Navegación intuitiva (<5 clicks para tareas comunes)

---

## 9. Limitaciones del Prototipo

### 9.1 Limitaciones Técnicas

1. **Sin backend real:** 
   - Datos en JSON estático
   - Persistencia solo en localStorage
   - Sin base de datos

2. **Sin servicio de IA:**
   - Solo recomendaciones heurísticas
   - No análisis semántico con NLP
   - No embeddings

3. **Autenticación simplificada:**
   - Usuarios en localStorage
   - Sin hashing de contraseñas
   - Sin tokens JWT

4. **Sin gestión de autores:**
   - Autores como texto libre
   - No tabla independiente de autores

### 9.2 Limitaciones Funcionales

1. **Sin paginación** en catálogo
2. **Sin ordenamiento dinámico** de resultados
3. **Sin filtros avanzados** (solo precio)
4. **Sin importación/exportación CSV funcional**
5. **Sin estadísticas** del catálogo

---

## 10. Evolución del Prototipo al Sistema Final

### 10.1 Fase 1: Backend Completo (Semanas 11-13)

- Implementar API REST con Spring Boot
- Base de datos PostgreSQL
- Gestión de autores como entidad independiente
- Persistencia real de datos
- Migraciones con Flyway

### 10.2 Fase 2: Servicio de IA (Semanas 13-15)

- Desarrollar microservicio Python
- Integrar Sentence Transformers
- Generar embeddings de sinopsis
- Calcular similitud de coseno
- API REST para recomendaciones IA

### 10.3 Fase 3: Integración y Despliegue (Semana 15-16)

- Integrar frontend con backend y servicio IA
- Docker Compose para orquestación
- Pruebas de integración
- Optimización de rendimiento
- Documentación completa

---

## 11. Conclusiones

### 11.1 Logros del Prototipo

- ✅ Demuestra viabilidad del sistema
- ✅ Valida requisitos funcionales principales
- ✅ Proporciona base sólida para desarrollo completo
- ✅ Permite feedback temprano de stakeholders
- ✅ Recomendaciones heurísticas funcionan como fallback confiable

### 11.2 Próximos Pasos

1. Desarrollar backend completo con Spring Boot
2. Implementar servicio de IA con Python
3. Integrar componentes
4. Completar funcionalidades faltantes
5. Realizar pruebas exhaustivas

---

## 12. Referencias

- Código fuente: `product/basic-springboot/`
- README técnico: `product/basic-springboot/README.md`
- Charter del proyecto: `deliverables/semana_07/charter.md`
- SRS: `deliverables/semana_08/srs.md`

---

**Versión:** 1.0  
**Última actualización:** Octubre 2025  
**Grupo 6** - Universidad Nacional de Ingeniería

