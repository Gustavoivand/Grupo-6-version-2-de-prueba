# Software Requirements Specification (SRS) - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Octubre 2025  
**Versión:** 1.0  

---

## Historial de Revisiones

| Versión | Fecha | Descripción | Autor |
|---------|-------|-------------|-------|
| 0.1 | 15/10/2025 | Borrador inicial | Grupo 6 |
| 1.0 | 22/10/2025 | Versión completa para revisión | Grupo 6 |

---

## Tabla de Contenidos

1. [Introducción](#1-introducción)
2. [Descripción General](#2-descripción-general)
3. [Requisitos Funcionales](#3-requisitos-funcionales)
4. [Requisitos No Funcionales](#4-requisitos-no-funcionales)
5. [Interfaces del Sistema](#5-interfaces-del-sistema)
6. [Restricciones](#6-restricciones)
7. [Casos de Uso](#7-casos-de-uso)
8. [Matriz de Trazabilidad](#8-matriz-de-trazabilidad)
9. [Criterios de Aceptación](#9-criterios-de-aceptación)
10. [Apéndices](#10-apéndices)

---

## 1. Introducción

### 1.1 Propósito

Este documento especifica los requisitos funcionales y no funcionales del Sistema de Recomendación de Libros Académicos (BookMate). Está dirigido a:

- Equipo de desarrollo
- Stakeholders del proyecto
- Evaluadores académicos
- Usuarios finales (como referencia)

### 1.2 Alcance del Producto

**Nombre del producto:** BookMate

**Descripción:** Sistema web de gestión y recomendación de libros académicos que utiliza inteligencia artificial para proporcionar sugerencias personalizadas basadas en análisis semántico del contenido.

**Funcionalidades principales:**

- Gestión completa del catálogo de libros (CRUD)
- Gestión de autores (CRUD)
- Búsqueda avanzada con filtros
- Sistema de recomendaciones con IA
- Sistema de recomendaciones heurísticas (fallback)
- Interfaz web responsive
- Panel de administración

**Beneficios:**

- Reducción del 70% en tiempo de búsqueda de bibliografía
- Descubrimiento de contenido relevante no obvio
- Gestión eficiente del catálogo
- Recomendaciones precisas (>70% relevancia)

### 1.3 Definiciones, Acrónimos y Abreviaturas

| Término | Definición |
|---------|------------|
| **IA** | Inteligencia Artificial |
| **NLP** | Natural Language Processing (Procesamiento de Lenguaje Natural) |
| **Embedding** | Representación vectorial de texto que captura significado semántico |
| **Similitud de Coseno** | Métrica para calcular similitud entre vectores |
| **CRUD** | Create, Read, Update, Delete |
| **API** | Application Programming Interface |
| **UC** | Caso de Uso (Use Case) |
| **RF** | Requisito Funcional |
| **RNF** | Requisito No Funcional |
| **SLA** | Service Level Agreement |
| **p95** | Percentil 95 (95% de las solicitudes cumplen el objetivo) |

### 1.4 Referencias

- Charter del Proyecto BookMate (Semana 7)
- Visión del Producto (Semana 7)
- Glosario de Términos (Semana 7)
- Modelo de Negocio BPMN (Semana 7)

### 1.5 Visión General del Documento

Este SRS está organizado en 10 secciones que cubren todos los aspectos de los requisitos del sistema, desde la descripción general hasta los criterios de aceptación y apéndices técnicos.

---

## 2. Descripción General

### 2.1 Perspectiva del Producto

BookMate es un sistema web independiente diseñado para facilitar la gestión y descubrimiento de libros académicos. El sistema se compone de:

**Componentes principales:**

1. **Aplicación Web (Frontend):** Interfaz de usuario responsive
2. **Sistema de Gestión (Backend):** Lógica de negocio y persistencia
3. **Servicio de IA:** Microservicio para recomendaciones semánticas
4. **Sistema de Almacenamiento:** Persistencia de datos

**Interacciones con sistemas externos:**

- Ninguna en la versión actual (sistema autocontenido)
- Posible integración futura: APIs de bibliotecas, Google Books

### 2.2 Funciones del Producto

#### 2.2.1 Gestión de Catálogo

- Operaciones CRUD para libros
- Operaciones CRUD para autores
- Validación de datos
- Persistencia en base de datos

#### 2.2.2 Búsqueda y Exploración

- Búsqueda por texto libre (título, autor, género)
- Filtrado por múltiples criterios
- Navegación del catálogo completo
- Visualización de detalles

#### 2.2.3 Sistema de Recomendaciones

**Recomendaciones con IA:**
- Análisis semántico de sinopsis
- Generación de embeddings
- Cálculo de similitud de coseno
- Top 6 libros más similares

**Recomendaciones Heurísticas:**
- Basadas en reglas de negocio
- Consideran género, autor, tags, precio
- Activación automática si IA no disponible

#### 2.2.4 Administración

- Panel dedicado para administradores
- Gestión masiva de libros
- Monitoreo del catálogo

### 2.3 Características de los Usuarios

#### Usuario General

- **Descripción:** Estudiante, profesor o investigador
- **Nivel técnico:** Básico a medio
- **Actividades:** Búsqueda, exploración, visualización
- **Frecuencia de uso:** Semanal

#### Administrador

- **Descripción:** Bibliotecario o gestor del catálogo
- **Nivel técnico:** Medio
- **Actividades:** CRUD de libros, gestión del catálogo
- **Frecuencia de uso:** Diaria

### 2.4 Restricciones

#### 2.4.1 Restricciones de Diseño

- Arquitectura de microservicios
- Interfaz web (no aplicación nativa)
- Comunicación HTTP/REST

#### 2.4.2 Restricciones de Implementación

- Sin autenticación compleja (sistema simplificado)
- Sin integración con sistemas externos
- Catálogo limitado (30-50 libros en demo)

#### 2.4.3 Restricciones de Hardware

- Servidor con mínimo 4GB RAM
- Capacidad para modelo de IA preentrenado
- Almacenamiento para base de datos

### 2.5 Supuestos y Dependencias

**Supuestos:**

- Disponibilidad de modelo preentrenado (Sentence Transformers)
- Sinopsis disponibles para todos los libros
- Usuarios tienen navegador moderno con JavaScript habilitado
- Conexión a internet estable

**Dependencias:**

- Modelo de IA preentrenado (all-MiniLM-L6-v2 o similar)
- Bibliotecas de NLP (Python)
- Framework de backend
- Sistema de base de datos

---

## 3. Requisitos Funcionales

### RF-01: Gestionar Libros

**Prioridad:** Alta  
**Descripción:** El sistema debe permitir crear, leer, actualizar y eliminar libros del catálogo.

**Entradas:**
- Título (texto, obligatorio)
- Autor (referencia, obligatorio)
- Género (texto, obligatorio)
- Precio (decimal, obligatorio)
- Fecha de edición (fecha, obligatorio)
- Sinopsis (texto largo, opcional)
- ISBN (texto, opcional)
- Editorial (texto, opcional)
- Número de páginas (entero, opcional)
- Portada (URL, opcional)

**Salidas:**
- Confirmación de operación
- Datos del libro creado/actualizado
- Lista de libros (para operación READ)

**Procesamiento:**
1. Validar datos de entrada
2. Verificar que el autor existe
3. Ejecutar operación en base de datos
4. Si se crea/actualiza y hay sinopsis, notificar al servicio IA para generar embedding
5. Retornar resultado

**Precondiciones:**
- Usuario tiene permisos de administrador (para CREATE, UPDATE, DELETE)
- Autor asociado existe en el sistema (para CREATE, UPDATE)

**Postcondiciones:**
- Libro persistido/modificado/eliminado en base de datos
- Embedding generado/actualizado/eliminado (si aplica)

---

### RF-02: Gestionar Autores

**Prioridad:** Alta  
**Descripción:** El sistema debe permitir crear, leer, actualizar y eliminar autores.

**Entradas:**
- Nombre completo (texto, obligatorio)
- Biografía (texto largo, opcional)
- Nacionalidad (texto, opcional)
- Fecha de nacimiento (fecha, opcional)

**Salidas:**
- Confirmación de operación
- Datos del autor creado/actualizado
- Lista de autores (para operación READ)

**Procesamiento:**
1. Validar datos de entrada
2. Verificar que el nombre no esté duplicado
3. Ejecutar operación en base de datos
4. Para DELETE: verificar que no existan libros asociados
5. Retornar resultado

**Precondiciones:**
- Usuario tiene permisos de administrador

**Postcondiciones:**
- Autor persistido/modificado/eliminado en base de datos

---

### RF-03: Buscar Libros

**Prioridad:** Alta  
**Descripción:** El sistema debe permitir buscar libros por múltiples criterios.

**Entradas:**
- Query de búsqueda (texto)
- Filtros opcionales:
  - Precio mínimo
  - Precio máximo
  - Género
  - Año de publicación

**Salidas:**
- Lista de libros que coinciden con los criterios
- Para cada libro: título, autor, género, precio, rating, portada

**Procesamiento:**
1. Recibir query y filtros
2. Buscar coincidencias en título, autor, género (insensible a mayúsculas)
3. Aplicar filtros adicionales
4. Ordenar por relevancia
5. Retornar resultados

**Precondiciones:**
- Ninguna (disponible para todos los usuarios)

**Postcondiciones:**
- Búsqueda ejecutada en <1 segundo (p95)

---

### RF-04: Obtener Recomendaciones

**Prioridad:** Muy Alta ⭐  
**Descripción:** El sistema debe generar recomendaciones de libros similares basándose en un libro de referencia.

**Entradas:**
- ID del libro de referencia

**Salidas:**
- Lista de 6 libros recomendados
- Para cada libro: título, autor, género, precio, rating, portada, score de similitud

**Procesamiento:**

**Flujo principal (con IA):**
1. Obtener datos del libro de referencia
2. Enviar solicitud al servicio de IA con la sinopsis
3. Servicio IA genera embedding del libro de referencia
4. Servicio IA calcula similitud de coseno con todos los libros del catálogo
5. Servicio IA retorna top 6 libros más similares (excluyendo el original)
6. Sistema consulta detalles de los libros recomendados
7. Retornar lista al usuario

**Flujo alternativo (heurísticas):**
1. Si servicio IA no disponible, aplicar algoritmo heurístico
2. Calcular puntuación basada en:
   - Género compartido: +3 puntos
   - Autor común: +5 puntos
   - Tags compartidos: +2 puntos por tag
   - Precio similar (±20%): +1 punto
   - Rating alto (>4.0): +1 punto
3. Ordenar por puntuación
4. Retornar top 6

**Precondiciones:**
- Libro de referencia existe en el catálogo
- Catálogo tiene al menos 7 libros

**Postcondiciones:**
- Recomendaciones generadas en <3 segundos (p95)
- Al menos 70% de recomendaciones son relevantes

---

### RF-05: Visualizar Detalle de Libro

**Prioridad:** Media  
**Descripción:** El sistema debe mostrar información completa de un libro específico.

**Entradas:**
- ID del libro

**Salidas:**
- Todos los datos del libro:
  - Título, autor, género, precio, fecha de edición
  - Sinopsis, ISBN, editorial, páginas
  - Portada, rating
  - Botón "Ver recomendaciones"

**Procesamiento:**
1. Consultar libro por ID en base de datos
2. Obtener datos del autor asociado
3. Formatear información
4. Retornar vista detallada

**Precondiciones:**
- Libro existe en el sistema

**Postcondiciones:**
- Detalles mostrados en <500ms

---

### RF-06: Filtrar por Precio

**Prioridad:** Media  
**Descripción:** El sistema debe permitir filtrar libros por rango de precio.

**Entradas:**
- Precio mínimo (opcional)
- Precio máximo (opcional)

**Salidas:**
- Lista de libros dentro del rango de precio

**Procesamiento:**
1. Validar que precio_min ≤ precio_max
2. Consultar libros en el rango especificado
3. Ordenar por precio ascendente
4. Retornar lista

**Precondiciones:**
- Ninguna

**Postcondiciones:**
- Filtro aplicado en <500ms

---

### RF-07: Navegar Catálogo

**Prioridad:** Media  
**Descripción:** El sistema debe permitir explorar el catálogo completo de libros.

**Entradas:**
- Página (para paginación, opcional)
- Ordenamiento (por título, autor, precio, fecha, opcional)

**Salidas:**
- Lista de todos los libros (paginada)
- Información de paginación (total de páginas, página actual)

**Procesamiento:**
1. Consultar todos los libros
2. Aplicar ordenamiento seleccionado
3. Dividir en páginas de 20 libros
4. Retornar página solicitada

**Precondiciones:**
- Ninguna

**Postcondiciones:**
- Catálogo cargado en <1 segundo

---

### RF-08: Importar Libros desde CSV

**Prioridad:** Baja  
**Descripción:** El sistema debe permitir importar múltiples libros desde un archivo CSV.

**Entradas:**
- Archivo CSV con columnas: id, title, author, genre, year, pages, rating, cover, description, isbn, publisher, language, tags

**Salidas:**
- Reporte de importación: libros creados, errores encontrados

**Procesamiento:**
1. Validar formato del archivo
2. Leer cada línea
3. Validar datos de cada libro
4. Crear autores si no existen
5. Crear libros
6. Generar embeddings (si IA disponible)
7. Retornar reporte

**Precondiciones:**
- Usuario tiene permisos de administrador
- Archivo cumple formato especificado

**Postcondiciones:**
- Libros válidos importados a la base de datos

---

### RF-09: Exportar Catálogo a CSV

**Prioridad:** Baja  
**Descripción:** El sistema debe permitir exportar el catálogo completo a CSV.

**Entradas:**
- Ninguna (exporta todo el catálogo)

**Salidas:**
- Archivo CSV con todos los libros

**Procesamiento:**
1. Consultar todos los libros con sus autores
2. Formatear a CSV
3. Generar archivo
4. Retornar para descarga

**Precondiciones:**
- Usuario tiene permisos de administrador

**Postcondiciones:**
- Archivo CSV generado

---

### RF-10 a RF-15: Requisitos Adicionales

Por brevedad, se listan de manera resumida:

- **RF-10:** Listar autores (Prioridad: Media)
- **RF-11:** Buscar autor por nombre (Prioridad: Media)
- **RF-12:** Ver libros de un autor específico (Prioridad: Media)
- **RF-13:** Filtrar por género (Prioridad: Media)
- **RF-14:** Ordenar resultados (Prioridad: Baja)
- **RF-15:** Mostrar estadísticas del catálogo (Prioridad: Baja)

---

## 4. Requisitos No Funcionales

### RNF-01: Rendimiento

#### RNF-01.1: Tiempo de Respuesta de Búsquedas
**Categoría:** Rendimiento  
**Descripción:** El 95% de las búsquedas deben responder en menos de 1 segundo.  
**Métrica:** Latencia p95 < 1s  
**Prioridad:** Alta

#### RNF-01.2: Tiempo de Respuesta de Recomendaciones IA
**Categoría:** Rendimiento  
**Descripción:** El 95% de las solicitudes de recomendaciones con IA deben responder en menos de 3 segundos.  
**Métrica:** Latencia p95 < 3s  
**Prioridad:** Muy Alta

#### RNF-01.3: Tiempo de Respuesta API REST
**Categoría:** Rendimiento  
**Descripción:** El 95% de las llamadas a la API REST deben responder en menos de 500ms.  
**Métrica:** Latencia p95 < 500ms  
**Prioridad:** Media

---

### RNF-02: Usabilidad

#### RNF-02.1: Facilidad de Uso
**Categoría:** Usabilidad  
**Descripción:** Cualquier tarea común (buscar, ver detalles, obtener recomendaciones) debe completarse en menos de 5 clicks.  
**Métrica:** Número de clicks ≤ 5  
**Prioridad:** Alta

#### RNF-02.2: Responsive Design
**Categoría:** Usabilidad  
**Descripción:** La interfaz debe adaptarse correctamente a móviles, tablets y desktop.  
**Métrica:** Visualización correcta en pantallas ≥320px de ancho  
**Prioridad:** Alta

#### RNF-02.3: Mensajes de Error Claros
**Categoría:** Usabilidad  
**Descripción:** Los mensajes de error deben ser comprensibles y sugerir acciones correctivas.  
**Métrica:** Evaluación cualitativa en pruebas de usabilidad  
**Prioridad:** Media

---

### RNF-03: Fiabilidad

#### RNF-03.1: Disponibilidad
**Categoría:** Fiabilidad  
**Descripción:** El sistema debe estar disponible el 95% del tiempo.  
**Métrica:** Uptime ≥ 95%  
**Prioridad:** Alta

#### RNF-03.2: Tolerancia a Fallos
**Categoría:** Fiabilidad  
**Descripción:** Si el servicio de IA falla, el sistema debe automáticamente usar recomendaciones heurísticas.  
**Métrica:** Fallback exitoso en 100% de los casos  
**Prioridad:** Muy Alta

#### RNF-03.3: Recuperación ante Errores
**Categoría:** Fiabilidad  
**Descripción:** El sistema debe recuperarse automáticamente de errores transitorios en menos de 5 segundos.  
**Métrica:** Tiempo de recuperación < 5s  
**Prioridad:** Media

---

### RNF-04: Seguridad

#### RNF-04.1: HTTPS en Producción
**Categoría:** Seguridad  
**Descripción:** Todas las comunicaciones en producción deben usar HTTPS.  
**Métrica:** 100% del tráfico sobre HTTPS  
**Prioridad:** Alta (en producción)

#### RNF-04.2: Validación de Entrada
**Categoría:** Seguridad  
**Descripción:** Todos los datos de entrada deben ser validados para prevenir inyecciones.  
**Métrica:** 100% de endpoints validan entrada  
**Prioridad:** Alta

#### RNF-04.3: Sanitización de Datos
**Categoría:** Seguridad  
**Descripción:** Los datos mostrados en la UI deben ser sanitizados para prevenir XSS.  
**Métrica:** 100% de salidas sanitizadas  
**Prioridad:** Alta

---

### RNF-05: Mantenibilidad

#### RNF-05.1: Cobertura de Pruebas
**Categoría:** Mantenibilidad  
**Descripción:** El código debe tener al menos 80% de cobertura de pruebas unitarias.  
**Métrica:** Cobertura ≥ 80%  
**Prioridad:** Alta

#### RNF-05.2: Documentación del Código
**Categoría:** Mantenibilidad  
**Descripción:** Todas las funciones y clases públicas deben estar documentadas.  
**Métrica:** 100% de APIs públicas documentadas  
**Prioridad:** Media

#### RNF-05.3: Código Limpio
**Categoría:** Mantenibilidad  
**Descripción:** El código debe seguir estándares de estilo y buenas prácticas.  
**Métrica:** Análisis estático sin errores críticos  
**Prioridad:** Media

---

### RNF-06: Escalabilidad

#### RNF-06.1: Usuarios Concurrentes
**Categoría:** Escalabilidad  
**Descripción:** El sistema debe soportar al menos 100 usuarios concurrentes.  
**Métrica:** 100 usuarios simultáneos sin degradación  
**Prioridad:** Media

#### RNF-06.2: Tamaño del Catálogo
**Categoría:** Escalabilidad  
**Descripción:** El sistema debe mantener el rendimiento con hasta 10,000 libros.  
**Métrica:** Latencia <1s con catálogo de 10K libros  
**Prioridad:** Baja

---

### RNF-07: Portabilidad

#### RNF-07.1: Navegadores Soportados
**Categoría:** Portabilidad  
**Descripción:** La aplicación debe funcionar en Chrome, Firefox, Edge y Safari (últimas 2 versiones).  
**Métrica:** Compatibilidad verificada  
**Prioridad:** Alta

#### RNF-07.2: Despliegue con Contenedores
**Categoría:** Portabilidad  
**Descripción:** El sistema debe poder desplegarse usando Docker.  
**Métrica:** Docker Compose funcional  
**Prioridad:** Media

---

### RNF-08: Precisión de Recomendaciones

#### RNF-08.1: Relevancia de Recomendaciones IA
**Categoría:** Calidad  
**Descripción:** Al menos el 70% de las recomendaciones con IA deben ser consideradas relevantes.  
**Métrica:** Relevancia ≥ 70% (evaluación manual)  
**Prioridad:** Muy Alta

#### RNF-08.2: Diversidad de Recomendaciones
**Categoría:** Calidad  
**Descripción:** Las recomendaciones no deben estar todas del mismo género/autor.  
**Métrica:** Máximo 50% de recomendaciones del mismo atributo  
**Prioridad:** Media

---

### RNF-09: Internacionalización

#### RNF-09.1: Soporte de Caracteres Especiales
**Categoría:** Internacionalización  
**Descripción:** El sistema debe soportar UTF-8 para manejar caracteres especiales y acentos.  
**Métrica:** Correcta visualización de UTF-8  
**Prioridad:** Alta

---

### RNF-10: Accesibilidad

#### RNF-10.1: Contraste de Colores
**Categoría:** Accesibilidad  
**Descripción:** El contraste de colores debe cumplir con WCAG 2.1 nivel AA.  
**Métrica:** Ratio de contraste ≥ 4.5:1  
**Prioridad:** Media

---

## 5. Interfaces del Sistema

### 5.1 Interfaces de Usuario

#### 5.1.1 Página de Inicio
- **Descripción:** Vista principal con libros destacados y acceso rápido al catálogo
- **Elementos:** Hero section, grid de libros destacados, navegación
- **Acciones:** Navegar a catálogo, ver detalles de libro

#### 5.1.2 Catálogo de Libros
- **Descripción:** Lista completa de libros con búsqueda y filtros
- **Elementos:** Barra de búsqueda, filtros laterales, grid de libros, paginación
- **Acciones:** Buscar, filtrar, ordenar, ver detalles

#### 5.1.3 Detalle de Libro
- **Descripción:** Vista completa de información de un libro
- **Elementos:** Portada, título, autor, sinopsis, metadatos, botón de recomendaciones
- **Acciones:** Obtener recomendaciones, volver al catálogo

#### 5.1.4 Panel de Administración
- **Descripción:** Interfaz para gestión del catálogo
- **Elementos:** Tabla de libros, formularios CRUD, botones de acción
- **Acciones:** Crear, editar, eliminar libros/autores

### 5.2 Interfaces de API REST

#### 5.2.1 Gestión de Libros

```
GET    /api/libros              - Listar todos los libros
GET    /api/libros/{id}         - Obtener libro por ID
POST   /api/libros              - Crear nuevo libro
PUT    /api/libros/{id}         - Actualizar libro
DELETE /api/libros/{id}         - Eliminar libro
GET    /api/libros/search       - Buscar libros
```

#### 5.2.2 Gestión de Autores

```
GET    /api/autores             - Listar todos los autores
GET    /api/autores/{id}        - Obtener autor por ID
POST   /api/autores             - Crear nuevo autor
PUT    /api/autores/{id}        - Actualizar autor
DELETE /api/autores/{id}        - Eliminar autor
```

#### 5.2.3 Recomendaciones

```
GET    /api/recomendaciones/{id} - Obtener recomendaciones para libro {id}
```

#### 5.2.4 Filtros y Búsqueda

```
GET    /api/libros/genero/{genero}       - Filtrar por género
GET    /api/libros/mayor/{precio}        - Filtrar precio mayor a
GET    /api/libros/menor/{precio}        - Filtrar precio menor a
```

### 5.3 Interface con Servicio de IA

**Endpoint:**
```
POST   /recommendations
```

**Request Body:**
```json
{
  "book_id": 123,
  "synopsis": "Texto de la sinopsis del libro...",
  "top_n": 6
}
```

**Response:**
```json
{
  "recommendations": [
    {"id": 45, "similarity": 0.92},
    {"id": 12, "similarity": 0.87},
    {"id": 78, "similarity": 0.84},
    {"id": 34, "similarity": 0.81},
    {"id": 56, "similarity": 0.79},
    {"id": 23, "similarity": 0.76}
  ],
  "method": "ai",
  "time_ms": 2340
}
```

### 5.4 Interface de Base de Datos

**Tablas principales:**

- `libros`: id, titulo, autor_id, genero, precio, fecha_edicion, sinopsis, isbn, editorial, paginas, portada, rating
- `autores`: id, nombre, biografia, nacionalidad, fecha_nacimiento
- `embeddings`: id, libro_id, vector (array de floats)

**Relaciones:**
- `libros.autor_id` → `autores.id` (Many-to-One)
- `embeddings.libro_id` → `libros.id` (One-to-One)

---

## 6. Restricciones

### 6.1 Restricciones de Negocio

- Proyecto académico con duración de 10 semanas
- Presupuesto cero (no servicios cloud pagados)
- Equipo de 6 personas con disponibilidad limitada

### 6.2 Restricciones Técnicas

- No se desarrollará autenticación compleja (fuera de alcance)
- No se integrará con APIs externas de libros
- Catálogo limitado a datos ingresados manualmente o por CSV
- Modelo de IA preentrenado (no se entrenará modelo propio)

### 6.3 Restricciones de Compatibilidad

- Debe funcionar en navegadores modernos (últimas 2 versiones)
- Debe ser responsive (≥320px de ancho)
- Requiere JavaScript habilitado

### 6.4 Restricciones Regulatorias

- Cumplimiento de buenas prácticas de ingeniería de software
- Documentación completa según requisitos académicos

---

## 7. Casos de Uso

**Nota:** Los casos de uso están definidos detalladamente en el documento de Casos de Uso y el diagrama `casos_uso.puml`. A continuación se listan los principales:

### Casos de Uso Principales

| ID | Nombre | Actor | Prioridad |
|----|--------|-------|-----------|
| UC-01 | Crear Libro | Administrador | Alta |
| UC-02 | Listar Libros | Usuario, Admin | Alta |
| UC-03 | Actualizar Libro | Administrador | Alta |
| UC-04 | Eliminar Libro | Administrador | Alta |
| UC-05 | Buscar Libros | Usuario, Admin | Alta |
| UC-06 | Obtener Recomendaciones | Usuario, Admin | Muy Alta |
| UC-07 | Ver Detalle de Libro | Usuario, Admin | Media |
| UC-08 | Filtrar por Precio | Usuario, Admin | Media |
| UC-09 | Navegar Catálogo | Usuario, Admin | Media |
| UC-10 | Crear Autor | Administrador | Alta |
| UC-11 | Listar Autores | Administrador | Media |
| UC-12 | Actualizar Autor | Administrador | Alta |
| UC-13 | Eliminar Autor | Administrador | Alta |
| UC-14 | Importar CSV | Administrador | Baja |
| UC-15 | Exportar CSV | Administrador | Baja |

---

## 8. Matriz de Trazabilidad

Ver documento completo de trazabilidad (`matriz_trazabilidad.md`) para detalles completos.

### Resumen de Trazabilidad Requisitos → Casos de Uso

| Requisito | Casos de Uso Asociados | Prioridad |
|-----------|------------------------|-----------|
| RF-01 | UC-01, UC-02, UC-03, UC-04 | Alta |
| RF-02 | UC-10, UC-11, UC-12, UC-13 | Alta |
| RF-03 | UC-05 | Alta |
| RF-04 | UC-06 | Muy Alta |
| RF-05 | UC-07 | Media |
| RF-06 | UC-08 | Media |
| RF-07 | UC-09 | Media |
| RF-08 | UC-14 | Baja |
| RF-09 | UC-15 | Baja |

---

## 9. Criterios de Aceptación

### 9.1 Criterios Funcionales

El sistema será aceptado si cumple:

1. ✅ **CRUD Completo:** Todas las operaciones CRUD de libros y autores funcionan correctamente
2. ✅ **Búsqueda Operativa:** La búsqueda retorna resultados relevantes
3. ✅ **Recomendaciones IA:** El sistema de recomendaciones con IA funciona y retorna 6 libros similares
4. ✅ **Fallback Funcional:** Si IA no disponible, las recomendaciones heurísticas se activan automáticamente
5. ✅ **Interfaz Completa:** Todas las pantallas (inicio, catálogo, detalle, admin) están implementadas
6. ✅ **Responsive:** La interfaz funciona correctamente en móvil, tablet y desktop

### 9.2 Criterios No Funcionales

El sistema será aceptado si cumple:

1. ✅ **Rendimiento Búsqueda:** 95% de búsquedas responden en <1s
2. ✅ **Rendimiento IA:** 95% de recomendaciones IA responden en <3s
3. ✅ **Precisión IA:** Al menos 70% de recomendaciones IA son relevantes (evaluación manual)
4. ✅ **Cobertura de Tests:** Código tiene >80% de cobertura de pruebas
5. ✅ **Disponibilidad:** Sistema disponible 95% del tiempo durante periodo de pruebas
6. ✅ **Usabilidad:** Tareas comunes requieren ≤5 clicks

### 9.3 Criterios de Documentación

El proyecto será aceptado si incluye:

1. ✅ SRS completo (este documento)
2. ✅ Diagrama de casos de uso
3. ✅ Matriz de trazabilidad
4. ✅ Prototipo funcional
5. ✅ Documentación de arquitectura (Semana 13)
6. ✅ Plan de pruebas (Semana 16)

---

## 10. Apéndices

### Apéndice A: Algoritmo de Recomendaciones Heurísticas

```
funcion recomendaciones_heuristicas(libro_referencia, catalogo, top_n):
    puntuaciones = []
    
    para cada libro en catalogo:
        si libro == libro_referencia:
            continuar
        
        puntuacion = 0
        
        // Género compartido
        si libro.genero == libro_referencia.genero:
            puntuacion += 3
        
        // Autor común
        si libro.autor == libro_referencia.autor:
            puntuacion += 5
        
        // Tags compartidos
        tags_comunes = interseccion(libro.tags, libro_referencia.tags)
        puntuacion += 2 * len(tags_comunes)
        
        // Precio similar (±20%)
        dif_precio = abs(libro.precio - libro_referencia.precio)
        si dif_precio / libro_referencia.precio <= 0.20:
            puntuacion += 1
        
        // Rating alto
        si libro.rating >= 4.0:
            puntuacion += 1
        
        puntuaciones.append((libro, puntuacion))
    
    // Ordenar por puntuación descendente
    puntuaciones.ordenar(descendente)
    
    // Retornar top N
    retornar puntuaciones[0:top_n]
```

### Apéndice B: Formato CSV para Importación

```csv
id,title,author,genre,year,pages,rating,cover,description,isbn,publisher,language,tags
31,El nombre del viento,Patrick Rothfuss,Fantasía,2007,872,4.8,https://example.com/cover.jpg,Un joven huérfano...,978-0-7564-0407-9,DAW Books,es,fantasía|épico|magia
```

**Campos obligatorios:** id, title, author, genre, year, pages, rating  
**Campos opcionales:** cover, description, isbn, publisher, language, tags  
**Tags:** Separados por `|` (pipe)

### Apéndice C: Ejemplo de Embedding

Un embedding de dimensión 384 (modelo all-MiniLM-L6-v2) para la sinopsis "Sistema de gestión de libros con inteligencia artificial" sería un vector como:

```
[0.042, -0.135, 0.287, ..., 0.091, -0.023, 0.176]
```

(384 valores float entre -1 y 1)

### Apéndice D: Referencias Técnicas

- **Sentence Transformers:** https://www.sbert.net/
- **Cosine Similarity:** https://en.wikipedia.org/wiki/Cosine_similarity
- **REST API Best Practices:** https://restfulapi.net/
- **UML Use Case Diagrams:** https://www.uml-diagrams.org/use-case-diagrams.html

---

## Aprobación

Este documento ha sido elaborado por el **Grupo 6** como parte del curso CC341 - Ingeniería de Software.

**Equipo:**
- Delgado R., G.
- Osorio M., A.
- Rojas A., J.
- Torres R., J.
- Valverde G., Y.
- Villanueva A., F.

**Institución:** Universidad Nacional de Ingeniería (UNI)  
**Facultad:** Facultad de Ciencias  
**Fecha:** Octubre 2025  
**Versión:** 1.0  

---

**Fin del Documento SRS**

