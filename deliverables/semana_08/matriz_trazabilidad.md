# Matriz de Trazabilidad - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Octubre 2025  
**Versión:** 1.0  

---

## 1. Introducción

### 1.1 Propósito

Este documento establece la trazabilidad completa entre:
- Requisitos funcionales y no funcionales
- Casos de uso
- Componentes de la arquitectura futura
- Pruebas de validación

### 1.2 Beneficios de la Trazabilidad

- ✅ Garantiza que todos los requisitos están cubiertos por casos de uso
- ✅ Facilita el análisis de impacto ante cambios
- ✅ Permite verificar completitud del sistema
- ✅ Asegura cobertura de pruebas

---

## 2. Matriz: Requisitos → Casos de Uso

### 2.1 Requisitos Funcionales → Casos de Uso

| ID Requisito | Descripción del Requisito | Casos de Uso | Prioridad |
|--------------|---------------------------|--------------|-----------|
| **RF-01** | Gestionar Libros (CRUD completo) | UC-01, UC-02, UC-03, UC-04 | Alta |
| **RF-02** | Gestionar Autores (CRUD completo) | UC-10, UC-11, UC-12, UC-13 | Alta |
| **RF-03** | Búsqueda por título, autor, género | UC-05 | Alta |
| **RF-04** | Generar recomendaciones personalizadas | **UC-06** | **Muy Alta** ⭐ |
| **RF-05** | Mostrar detalles completos de libro | UC-07 | Media |
| **RF-06** | Filtrar libros por precio | UC-08 | Media |
| **RF-07** | Navegar catálogo completo | UC-09 | Media |
| **RF-08** | Importar libros desde CSV | UC-14 | Baja |
| **RF-09** | Exportar catálogo a CSV | UC-15 | Baja |
| **RF-10** | Listar autores | UC-11 | Media |
| **RF-11** | Buscar autor por nombre | UC-11 (extendido) | Media |
| **RF-12** | Ver libros de un autor específico | UC-11 (extendido) | Media |
| **RF-13** | Filtrar por género | UC-05 (extendido) | Media |
| **RF-14** | Ordenar resultados | UC-05, UC-09 (extendido) | Baja |
| **RF-15** | Mostrar estadísticas del catálogo | - (Futuro) | Baja |

### 2.2 Requisitos No Funcionales → Casos de Uso

| ID Requisito | Descripción del Requisito | Casos de Uso Afectados | Métrica |
|--------------|---------------------------|------------------------|---------|
| **RNF-01.1** | Búsquedas <1 segundo (p95) | UC-05 | Latencia <1s |
| **RNF-01.2** | Recomendaciones IA <3 segundos (p95) | UC-06 | Latencia <3s |
| **RNF-01.3** | API REST <500ms (p95) | Todos los UC | Latencia <500ms |
| **RNF-02.1** | Facilidad de uso (<5 clicks) | Todos los UC | Clicks ≤5 |
| **RNF-02.2** | Responsive design | Todos los UC | Visualización correcta |
| **RNF-02.3** | Mensajes de error claros | Todos los UC | Evaluación cualitativa |
| **RNF-03.1** | Disponibilidad 95% | Todos los UC | Uptime ≥95% |
| **RNF-03.2** | Tolerancia a fallos (fallback IA) | UC-06 | Fallback 100% |
| **RNF-03.3** | Recuperación ante errores <5s | Todos los UC | Recovery <5s |
| **RNF-04.1** | HTTPS en producción | Todos los UC | 100% HTTPS |
| **RNF-04.2** | Validación de entrada | UC-01, UC-03, UC-10, UC-12 | 100% validado |
| **RNF-04.3** | Sanitización de salidas (XSS) | Todos los UC | 100% sanitizado |
| **RNF-05.1** | Cobertura de pruebas >80% | Todos los UC | Cobertura ≥80% |
| **RNF-06.1** | Soportar 100 usuarios concurrentes | Todos los UC | 100 usuarios |
| **RNF-08.1** | Relevancia de recomendaciones IA ≥70% | UC-06 | Relevancia ≥70% |

---

## 3. Matriz: Casos de Uso → Componentes (Arquitectura Futura)

### 3.1 Casos de Uso → Componentes del Backend

| Caso de Uso | Componentes Involucrados | Descripción |
|-------------|--------------------------|-------------|
| **UC-01** | LibrosController, LibrosService, LibrosRepository, Libros (Entity), Autor (Entity) | Crear libro requiere validar autor, persistir en BD, notificar a servicio IA |
| **UC-02** | LibrosController, LibrosService, LibrosRepository, Libros (Entity) | Listar todos los libros desde la base de datos |
| **UC-03** | LibrosController, LibrosService, LibrosRepository, Libros (Entity) | Actualizar libro, regenerar embedding si sinopsis cambió |
| **UC-04** | LibrosController, LibrosService, LibrosRepository | Eliminar libro y su embedding asociado |
| **UC-05** | LibrosController, WebController, LibrosService, LibrosRepository | Búsqueda con criterios, aplicar filtros, ordenar |
| **UC-06** | RecommendationController, WebController, RecommendationService, AIService, HeuristicRecommender | **Caso más complejo**: Servicio IA (primario) o heurísticas (fallback) |
| **UC-07** | WebController, LibrosController, LibrosService, Libros (Entity), Autor (Entity) | Consultar libro con autor, formatear para vista |
| **UC-08** | LibrosController, LibrosService, LibrosRepository | Filtrado por precio (query con condiciones) |
| **UC-09** | WebController, LibrosController, LibrosService, LibrosRepository | Listar con paginación y ordenamiento |
| **UC-10** | AutorController, AutorService, AutorRepository, Autor (Entity) | Crear autor, validar unicidad |
| **UC-11** | AutorController, AutorService, AutorRepository | Listar/buscar autores |
| **UC-12** | AutorController, AutorService, AutorRepository, Autor (Entity) | Actualizar datos del autor |
| **UC-13** | AutorController, AutorService, AutorRepository | Eliminar autor (verificar que no tenga libros asociados) |
| **UC-14** | ImportController, ImportService, LibrosService, AutorService | Importar CSV: validar formato, crear autores/libros, notificar IA |
| **UC-15** | ExportController, ExportService, LibrosService | Exportar catálogo a CSV |

### 3.2 Casos de Uso → Servicio de IA

| Caso de Uso | Operaciones del Servicio IA | Tecnología |
|-------------|---------------------------|------------|
| **UC-01** | Generar embedding de sinopsis al crear libro | Python + Sentence Transformers |
| **UC-03** | Regenerar embedding si sinopsis fue modificada | Python + Sentence Transformers |
| **UC-04** | Eliminar embedding del libro eliminado | Python (limpieza) |
| **UC-06** | Calcular similitud de coseno entre embeddings, retornar top 6 libros similares | Python + NumPy/SciPy |
| **UC-14** | Generar embeddings para todos los libros importados | Python + Sentence Transformers (batch) |

---

## 4. Matriz: Casos de Uso → Interfaces de Usuario

### 4.1 Casos de Uso → Pantallas del Frontend

| Caso de Uso | Pantalla/Vista | Ruta | Elementos UI |
|-------------|----------------|------|--------------|
| **UC-02** | Catálogo de Libros | `/catalog.html` | Grid de libros, barra de búsqueda, filtros |
| **UC-05** | Catálogo de Libros (búsqueda) | `/catalog.html` | Input de búsqueda, resultados filtrados |
| **UC-07** | Detalle de Libro | `/details.html` | Portada, metadatos, sinopsis, botón recomendaciones |
| **UC-06** | Detalle de Libro (recomendaciones) | `/details.html` | Modal/sección con 6 libros similares |
| **UC-08** | Catálogo de Libros (filtros) | `/catalog.html` | Sliders de precio min/max |
| **UC-09** | Catálogo de Libros | `/catalog.html` | Grid completo, paginación |
| **UC-01** | Panel de Administración | `/admin.html` | Formulario de creación, validaciones |
| **UC-02** | Panel de Administración (tabla) | `/admin.html` | Tabla de libros con acciones |
| **UC-03** | Panel de Administración (edición) | `/admin.html` | Formulario de edición |
| **UC-04** | Panel de Administración (eliminar) | `/admin.html` | Modal de confirmación |
| **UC-10-13** | Panel de Administración (autores) | `/admin.html` (pestaña) | CRUD de autores |
| **UC-14** | Panel de Administración (importar) | `/admin.html` | Upload de CSV, reporte de importación |
| **UC-15** | Panel de Administración (exportar) | `/admin.html` | Botón de descarga CSV |

---

## 5. Matriz: Casos de Uso → Pruebas

### 5.1 Casos de Uso → Pruebas Unitarias

| Caso de Uso | Clase de Prueba (JUnit) | Métodos de Prueba |
|-------------|-------------------------|-------------------|
| **UC-01** | LibrosServiceTest | `testCreateLibro()`, `testCreateLibroValidation()` |
| **UC-02** | LibrosServiceTest | `testFindAllLibros()`, `testFindAllEmpty()` |
| **UC-03** | LibrosServiceTest | `testUpdateLibro()`, `testUpdateNonExistent()` |
| **UC-04** | LibrosServiceTest | `testDeleteLibro()`, `testDeleteNonExistent()` |
| **UC-05** | LibrosServiceTest | `testSearchLibros()`, `testSearchNoResults()` |
| **UC-06** | RecommendationServiceTest | `testGetRecommendationsAI()`, `testGetRecommendationsHeuristic()`, `testFallbackToHeuristic()` |
| **UC-07** | LibrosServiceTest | `testFindLibroById()`, `testFindLibroByIdNotFound()` |
| **UC-08** | LibrosServiceTest | `testFindByPrecioGreaterThan()`, `testFindByPrecioLessThan()` |
| **UC-10** | AutorServiceTest | `testCreateAutor()`, `testCreateAutorValidation()` |
| **UC-11** | AutorServiceTest | `testFindAllAutores()` |
| **UC-12** | AutorServiceTest | `testUpdateAutor()` |
| **UC-13** | AutorServiceTest | `testDeleteAutor()`, `testDeleteAutorWithLibros()` (debe fallar) |

### 5.2 Casos de Uso → Pruebas de Integración (API REST)

| Caso de Uso | Endpoint | Método | Prueba Postman |
|-------------|----------|--------|----------------|
| **UC-01** | `/api/libros` | POST | Crear libro válido, crear libro inválido |
| **UC-02** | `/api/libros` | GET | Listar todos los libros |
| **UC-03** | `/api/libros/{id}` | PUT | Actualizar libro existente |
| **UC-04** | `/api/libros/{id}` | DELETE | Eliminar libro existente |
| **UC-05** | `/api/libros/search?q={query}` | GET | Buscar por "arquitectura", buscar sin resultados |
| **UC-06** | `/api/recommendations/{id}` | GET | Obtener recomendaciones para libro 1 |
| **UC-07** | `/api/libros/{id}` | GET | Obtener detalle de libro 1 |
| **UC-08** | `/api/libros/precio?min=10&max=50` | GET | Filtrar por rango de precio |
| **UC-10** | `/api/autores` | POST | Crear autor válido |
| **UC-11** | `/api/autores` | GET | Listar todos los autores |
| **UC-12** | `/api/autores/{id}` | PUT | Actualizar autor |
| **UC-13** | `/api/autores/{id}` | DELETE | Eliminar autor |

### 5.3 Casos de Uso → Pruebas de Aceptación

| Caso de Uso | Escenario de Prueba | Criterio de Aceptación |
|-------------|---------------------|------------------------|
| **UC-01** | Administrador crea un libro nuevo | Libro aparece en catálogo |
| **UC-02** | Usuario visualiza catálogo completo | Se muestran todos los libros |
| **UC-03** | Administrador edita precio de un libro | Precio actualizado se refleja en catálogo |
| **UC-04** | Administrador elimina un libro | Libro desaparece del catálogo |
| **UC-05** | Usuario busca "machine learning" | Se muestran libros relevantes de ML/IA |
| **UC-06** | Usuario solicita recomendaciones para "Clean Code" | Se muestran 6 libros de programación/arquitectura relacionados |
| **UC-07** | Usuario visualiza detalle de "Sapiens" | Se muestran todos los metadatos correctamente |
| **UC-08** | Usuario filtra libros entre $20-$50 | Solo se muestran libros en ese rango |
| **UC-09** | Usuario navega el catálogo | Puede explorar todos los libros con paginación |

---

## 6. Matriz: Casos de Uso → Requisitos No Funcionales

### 6.1 Rendimiento

| Caso de Uso | RNF Asociado | Métrica | Cómo se Mide |
|-------------|--------------|---------|--------------|
| **UC-05** | RNF-01.1 | Búsquedas <1s (p95) | Logs de tiempo de respuesta |
| **UC-06** | RNF-01.2 | Recomendaciones IA <3s (p95) | Logs de latencia del servicio IA |
| **UC-02, UC-07** | RNF-01.3 | API REST <500ms (p95) | Monitoreo de endpoints |

### 6.2 Usabilidad

| Caso de Uso | RNF Asociado | Métrica | Cómo se Mide |
|-------------|--------------|---------|--------------|
| **Todos** | RNF-02.1 | <5 clicks para tareas comunes | Testing de usabilidad |
| **Todos** | RNF-02.2 | Responsive design | Pruebas en múltiples dispositivos |
| **UC-01, UC-03** | RNF-02.3 | Mensajes de error claros | Evaluación cualitativa |

### 6.3 Fiabilidad

| Caso de Uso | RNF Asociado | Métrica | Cómo se Mide |
|-------------|--------------|---------|--------------|
| **Todos** | RNF-03.1 | Disponibilidad 95% | Monitoreo de uptime |
| **UC-06** | RNF-03.2 | Fallback a heurísticas 100% | Pruebas de fallos del servicio IA |

### 6.4 Precisión

| Caso de Uso | RNF Asociado | Métrica | Cómo se Mide |
|-------------|--------------|---------|--------------|
| **UC-06** | RNF-08.1 | Relevancia ≥70% | Evaluación manual de recomendaciones |

---

## 7. Cobertura de Requisitos

### 7.1 Resumen de Cobertura

| Categoría | Total | Cubiertos por UC | % Cobertura |
|-----------|-------|------------------|-------------|
| **Requisitos Funcionales** | 15 | 15 | **100%** ✅ |
| **Requisitos No Funcionales** | 13 categorías | 13 | **100%** ✅ |

### 7.2 Requisitos sin Casos de Uso Directos

- **RF-15 (Estadísticas):** Planeado para versión futura, no crítico para MVP

---

## 8. Análisis de Impacto

### 8.1 Impacto de Cambios en RF-04 (Recomendaciones)

**Escenario:** Cambiar algoritmo de recomendaciones

**Componentes afectados:**
- UC-06: Obtener Recomendaciones
- RecommendationService
- AIService o HeuristicRecommender
- Pruebas: RecommendationServiceTest
- RNF-01.2 (latencia <3s)
- RNF-08.1 (relevancia ≥70%)

**Estimación de esfuerzo:** Alto (5-8 días de desarrollo)

### 8.2 Impacto de Cambios en RNF-01.2 (Latencia IA)

**Escenario:** Reducir latencia de recomendaciones de 3s a 2s

**Componentes afectados:**
- Servicio de IA (optimización)
- Posible caché de embeddings
- Infraestructura (hardware)

**Estimación de esfuerzo:** Medio (3-5 días de desarrollo + infraestructura)

---

## 9. Validación de Completitud

### 9.1 Checklist de Completitud

- ✅ Todos los requisitos funcionales tienen casos de uso asociados
- ✅ Todos los casos de uso tienen requisitos funcionales asociados
- ✅ Todos los casos de uso tienen componentes de arquitectura identificados
- ✅ Todos los casos de uso tienen pruebas planificadas
- ✅ Todos los RNF están mapeados a casos de uso o sistema global
- ✅ Todas las interfaces de usuario están mapeadas a casos de uso

### 9.2 Casos de Uso Críticos

Los siguientes casos de uso son de prioridad MUY ALTA y requieren atención especial:

1. **UC-06: Obtener Recomendaciones**
   - Define el valor principal del producto
   - Requiere servicio IA funcional
   - Debe cumplir RNF-01.2 (<3s) y RNF-08.1 (≥70% relevancia)
   - Debe tener fallback confiable a heurísticas

**Plan de mitigación de riesgos:**
- Desarrollo temprano del servicio IA
- Implementación robusta de heurísticas como fallback
- Pruebas exhaustivas de rendimiento y relevancia
- Monitoreo continuo de latencia

---

## 10. Trazabilidad Bidireccional

### 10.1 Requisito → Caso de Uso → Componente → Prueba

**Ejemplo: RF-04 (Recomendaciones)**

```
RF-04: Generar recomendaciones personalizadas
   ↓
UC-06: Obtener Recomendaciones
   ↓
Componentes:
   - RecommendationController
   - RecommendationService
   - AIService (Python)
   - HeuristicRecommender
   ↓
Pruebas:
   - RecommendationServiceTest.testGetRecommendationsAI()
   - RecommendationServiceTest.testGetRecommendationsHeuristic()
   - RecommendationServiceTest.testFallbackToHeuristic()
   - GET /api/recommendations/1 (Postman)
   - Prueba de aceptación: Recomendaciones relevantes para "Clean Code"
```

### 10.2 Prueba → Componente → Caso de Uso → Requisito

**Ejemplo: Prueba de rendimiento de búsqueda**

```
Prueba: Búsqueda <1s (p95)
   ↓
Componentes:
   - LibrosController
   - LibrosService
   - LibrosRepository
   ↓
UC-05: Buscar Libros
   ↓
RF-03: Búsqueda por título, autor, género
RNF-01.1: Búsquedas <1 segundo (p95)
```

---

## 11. Conclusiones

### 11.1 Fortalezas de la Trazabilidad

- ✅ **100% de cobertura** de requisitos funcionales
- ✅ **100% de cobertura** de requisitos no funcionales
- ✅ Mapeo claro entre todos los artefactos
- ✅ Facilita análisis de impacto
- ✅ Asegura completitud del sistema

### 11.2 Áreas de Atención

- UC-06 (Recomendaciones) requiere monitoreo especial
- RNF de rendimiento deben ser validados con pruebas de carga
- Servicio de IA es dependencia crítica

---

## 12. Referencias

- Software Requirements Specification (SRS): `deliverables/semana_08/srs.md`
- Diagrama de Casos de Uso: `deliverables/semana_08/casos_uso.puml`
- Charter del Proyecto: `deliverables/semana_07/charter.md`
- Prototipo UC: `deliverables/semana_08/prototipo_uc.md`

---

**Versión:** 1.0  
**Última actualización:** Octubre 2025  
**Grupo 6** - Universidad Nacional de Ingeniería

