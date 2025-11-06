# Especificaciones Detalladas de Casos de Uso - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Octubre 2025  
**Versión:** 1.0  

---

## Nota Importante - Fase de Análisis

Este documento corresponde a la **fase de análisis conceptual** (Semana 11). Por lo tanto:

- ❌ **NO se mencionan tecnologías específicas**
- ❌ **NO se habla de frameworks, lenguajes o herramientas**
- ✅ **SE enfoca en el comportamiento del sistema**
- ✅ **SE describen los elementos conceptuales (entidades, controladores, fronteras)**

Las tecnologías específicas se definirán en la **fase de diseño** (Semana 13).

---

## 1. Introducción

### 1.1 Propósito

Este documento especifica en detalle los casos de uso más importantes del sistema BookMate, proporcionando descripciones completas de flujos, precondiciones, postcondiciones y excepciones.

### 1.2 Casos de Uso Priorizados

Este documento detalla los siguientes casos de uso:

| ID | Nombre | Prioridad | Complejidad |
|----|--------|-----------|-------------|
| **UC-06** | Obtener Recomendaciones | **Muy Alta** | Alta |
| **UC-01** | Crear Libro | Alta | Media |
| **UC-05** | Buscar Libros | Alta | Media |
| **UC-03** | Actualizar Libro | Alta | Media |
| **UC-04** | Eliminar Libro | Alta | Baja |

---

## 2. UC-06: Obtener Recomendaciones

### 2.1 Descripción General

**Caso de Uso Crítico** - Define el valor principal del sistema

**Resumen:** El sistema genera una lista de libros similares a un libro de referencia seleccionado por el usuario, utilizando análisis semántico o reglas heurísticas.

**Actores:**
- **Actor Principal:** Usuario (estudiante, profesor, investigador)
- **Actor Secundario:** Componente de Inteligencia Artificial

**Frecuencia de Uso:** Alta (múltiples veces por sesión de usuario)

**Valor para el Negocio:** Muy Alto - Es el diferenciador principal del sistema

### 2.2 Precondiciones

1. El libro de referencia existe en el sistema
2. El catálogo contiene al menos 7 libros (incluyendo el libro de referencia)
3. El usuario ha accedido a la vista de detalles del libro de referencia

### 2.3 Postcondiciones Exitosas

1. Se retornan exactamente 6 libros similares al libro de referencia
2. Los libros retornados no incluyen el libro de referencia
3. Los libros están ordenados por relevancia descendente
4. Se indica el método usado (análisis semántico o heurístico)
5. El tiempo de respuesta es inferior a 3 segundos (percentil 95)

### 2.4 Flujo Principal - Recomendaciones con Análisis Semántico

**Desencadenante:** Usuario hace click en "Ver libros similares" en la vista de detalle de un libro

| Paso | Actor | Acción del Sistema |
|------|-------|-------------------|
| 1 | Usuario | Solicita recomendaciones para el libro X |
| 2 | | Sistema recupera los datos del libro X desde el almacenamiento |
| 3 | | Sistema verifica disponibilidad del componente de IA |
| 4 | | Sistema envía solicitud al componente de IA con: <br>- Identificador del libro X <br>- Contenido textual del libro (sinopsis) <br>- Número de recomendaciones solicitadas (6) |
| 5 | Componente IA | Genera representación semántica del contenido textual |
| 6 | Componente IA | Recupera representaciones semánticas de todos los libros del catálogo |
| 7 | Componente IA | Calcula medida de similitud entre representaciones |
| 8 | Componente IA | Ordena libros por similitud descendente |
| 9 | Componente IA | Selecciona los 6 libros más similares (excluye el libro X) |
| 10 | Componente IA | Retorna lista con: <br>- Identificadores de libros recomendados <br>- Puntuaciones de similitud <br>- Método: "análisis_semántico" <br>- Tiempo de procesamiento |
| 11 | | Sistema recupera detalles completos de los libros recomendados |
| 12 | | Sistema formatea recomendaciones para presentación |
| 13 | | Sistema muestra recomendaciones al usuario con: <br>- Portada, título, autor <br>- Indicador de relevancia <br>- Mensaje: "Basado en análisis semántico" |
| 14 | Usuario | Visualiza las recomendaciones |

### 2.5 Flujo Alternativo 1 - Componente de IA No Disponible

**Punto de divergencia:** Paso 3

| Paso | Actor | Acción del Sistema |
|------|-------|-------------------|
| 3a-1 | | Sistema detecta que el componente de IA no está disponible |
| 3a-2 | | Sistema registra el evento (para monitoreo) |
| 3a-3 | | Sistema activa modo de respaldo (heurísticas) |
| 3a-4 | | Sistema aplica algoritmo heurístico: <br><br>**Para cada libro en el catálogo (excepto X):** <br>• Inicializar puntuación = 0 <br>• Si comparte género: puntuación += 3 <br>• Si comparte autor: puntuación += 5 <br>• Por cada etiqueta compartida: puntuación += 2 <br>• Si precio similar (±20%): puntuación += 1 <br>• Si calificación alta (≥4.0): puntuación += 1 |
| 3a-5 | | Sistema ordena libros por puntuación descendente |
| 3a-6 | | Sistema selecciona los 6 libros con mayor puntuación |
| 3a-7 | | Sistema muestra recomendaciones con mensaje: "Basado en características similares" |
| 3a-8 | Usuario | Visualiza las recomendaciones heurísticas |
| | | **Flujo continúa** normalmente |

### 2.6 Flujo Alternativo 2 - Tiempo de Respuesta Excedido

**Punto de divergencia:** Paso 10

| Paso | Actor | Acción del Sistema |
|------|-------|-------------------|
| 10a-1 | | Sistema detecta que el componente de IA tarda más de 5 segundos |
| 10a-2 | | Sistema cancela la solicitud al componente de IA |
| 10a-3 | | Sistema registra timeout (para análisis de rendimiento) |
| 10a-4 | | Sistema activa modo de respaldo (igual que 3a) |
| 10a-5 | | Sistema genera recomendaciones heurísticas |
| 10a-6 | | Sistema muestra recomendaciones con mensaje: "Basado en características similares (modo rápido)" |

### 2.7 Flujo Alternativo 3 - Pocos Libros en Catálogo

**Punto de divergencia:** Paso 9

| Paso | Actor | Acción del Sistema |
|------|-------|-------------------|
| 9a-1 | | Sistema detecta que hay menos de 6 libros disponibles para recomendar |
| 9a-2 | | Sistema retorna todos los libros disponibles (N < 6) |
| 9a-3 | | Sistema muestra mensaje: "Mostrando X libros similares disponibles" |

### 2.8 Excepciones

#### E1: Libro de referencia no existe

- **Condición:** El identificador del libro X no corresponde a ningún libro en el sistema
- **Respuesta del Sistema:**
  1. Muestra mensaje de error: "El libro seleccionado no está disponible"
  2. Redirige al usuario al catálogo principal
  3. Registra el error para análisis

#### E2: Error en el componente de IA

- **Condición:** El componente de IA retorna un error inesperado
- **Respuesta del Sistema:**
  1. Registra el error detallado
  2. Activa automáticamente el modo de respaldo (heurísticas)
  3. Muestra recomendaciones heurísticas sin notificar del error al usuario

### 2.9 Requisitos Especiales

1. **Rendimiento:**
   - 95% de las solicitudes deben completarse en <3 segundos
   - El modo de respaldo (heurísticas) debe responder en <500ms

2. **Precisión:**
   - Al menos 70% de las recomendaciones con análisis semántico deben ser relevantes (evaluación manual)
   - Al menos 50% de las recomendaciones heurísticas deben ser relevantes

3. **Confiabilidad:**
   - El sistema nunca debe fallar; siempre debe retornar recomendaciones (aunque sean heurísticas)
   - El cambio entre análisis semántico y heurísticas debe ser transparente

---

## 3. UC-01: Crear Libro

### 3.1 Descripción General

**Resumen:** Un administrador agrega un nuevo libro al catálogo del sistema.

**Actores:**
- **Actor Principal:** Administrador (bibliotecario, gestor de catálogo)
- **Actor Secundario:** Componente de Inteligencia Artificial (para generar representación semántica)

**Frecuencia de Uso:** Media (varias veces por semana)

**Valor para el Negocio:** Alto - Mantiene el catálogo actualizado

### 3.2 Precondiciones

1. El administrador ha iniciado sesión en el sistema
2. El administrador tiene permisos de gestión de catálogo
3. El autor del libro ya existe en el sistema, o se creará durante el proceso

### 3.3 Postcondiciones Exitosas

1. El libro queda registrado en el sistema
2. El libro es visible en el catálogo para todos los usuarios
3. Se genera la representación semántica del libro (si hay sinopsis)
4. Se genera un identificador único para el libro

### 3.4 Flujo Principal

| Paso | Actor | Acción del Sistema |
|------|-------|-------------------|
| 1 | Administrador | Selecciona opción "Agregar Nuevo Libro" |
| 2 | | Sistema muestra formulario de creación con campos: <br>- Título (obligatorio) <br>- Autor (obligatorio, selección de lista) <br>- Género (obligatorio) <br>- Precio (obligatorio) <br>- Fecha de edición (obligatorio) <br>- Sinopsis (opcional) <br>- ISBN (opcional) <br>- Editorial (opcional) <br>- Número de páginas (opcional) <br>- URL de portada (opcional) <br>- Etiquetas (opcional) |
| 3 | Administrador | Completa los campos del formulario |
| 4 | Administrador | Hace click en "Guardar" |
| 5 | | Sistema valida los datos ingresados: <br>- Título no vacío <br>- Autor seleccionado existe <br>- Precio > 0 <br>- Fecha válida <br>- ISBN único (si se proporciona) |
| 6 | | Sistema genera identificador único para el libro |
| 7 | | Sistema registra el libro en el almacenamiento |
| 8 | | Si se proporcionó sinopsis: <br>Sistema solicita al componente de IA generar representación semántica |
| 9 | Componente IA | Genera y almacena representación semántica del libro |
| 10 | | Sistema muestra mensaje de confirmación: "Libro agregado exitosamente" |
| 11 | | Sistema muestra el libro recién creado en la lista de administración |
| 12 | Administrador | Visualiza confirmación y puede agregar otro libro o continuar gestionando |

### 3.5 Flujo Alternativo 1 - Datos Inválidos

**Punto de divergencia:** Paso 5

| Paso | Actor | Acción del Sistema |
|------|-------|-------------------|
| 5a-1 | | Sistema detecta errores en los datos: <br>- Título vacío <br>- Autor no seleccionado <br>- Precio ≤ 0 o no numérico <br>- Fecha inválida o futura <br>- ISBN ya existe en el sistema |
| 5a-2 | | Sistema resalta campos con errores |
| 5a-3 | | Sistema muestra mensajes de error específicos por cada campo |
| 5a-4 | | Sistema mantiene los datos ya ingresados en el formulario |
| 5a-5 | Administrador | Corrige los errores |
| | | **Flujo retorna al paso 4** |

### 3.6 Flujo Alternativo 2 - Autor No Existe

**Punto de divergencia:** Paso 5

| Paso | Actor | Acción del Sistema |
|------|-------|-------------------|
| 5b-1 | | Sistema detecta que el autor seleccionado no existe |
| 5b-2 | | Sistema muestra opción: "Autor no encontrado. ¿Desea crear un nuevo autor?" |
| 5b-3 | Administrador | Confirma creación de nuevo autor |
| 5b-4 | | Sistema muestra formulario de creación de autor |
| 5b-5 | Administrador | Ingresa datos del autor (nombre, biografía, etc.) |
| 5b-6 | | Sistema valida y crea el autor |
| 5b-7 | | Sistema selecciona automáticamente el nuevo autor en el formulario de libro |
| | | **Flujo retorna al paso 4** |

### 3.7 Flujo Alternativo 3 - Componente de IA No Disponible

**Punto de divergencia:** Paso 8

| Paso | Actor | Acción del Sistema |
|------|-------|-------------------|
| 8a-1 | | Sistema detecta que el componente de IA no está disponible |
| 8a-2 | | Sistema registra el evento |
| 8a-3 | | Sistema marca el libro para procesamiento posterior |
| 8a-4 | | Sistema continúa y completa la creación del libro |
| 8a-5 | | Sistema muestra advertencia: "Libro creado. La representación semántica se generará próximamente" |
| | | **Flujo continúa al paso 10** |

### 3.8 Excepciones

#### E1: Error de almacenamiento

- **Condición:** No se puede guardar el libro por error en el almacenamiento
- **Respuesta del Sistema:**
  1. Muestra mensaje: "Error al guardar el libro. Intente nuevamente"
  2. Mantiene los datos en el formulario
  3. Registra el error para análisis técnico

### 3.9 Requisitos Especiales

1. **Validación en Tiempo Real:**
   - Los campos se validan mientras el usuario escribe
   - Se muestran indicadores visuales (verde/rojo) de validez

2. **Usabilidad:**
   - El formulario debe ser intuitivo y completarse en <5 minutos
   - Se debe proporcionar ayuda contextual para cada campo

---

## 4. UC-05: Buscar Libros

### 4.1 Descripción General

**Resumen:** Un usuario busca libros en el catálogo usando palabras clave.

**Actores:**
- **Actor Principal:** Usuario (cualquier rol)

**Frecuencia de Uso:** Muy Alta (múltiples veces por sesión)

**Valor para el Negocio:** Muy Alto - Funcionalidad core de navegación

### 4.2 Precondiciones

1. El sistema contiene al menos un libro en el catálogo
2. El usuario ha accedido a la interfaz de búsqueda

### 4.3 Postcondiciones Exitosas

1. Se muestra una lista de libros que coinciden con los criterios de búsqueda
2. Los resultados están ordenados por relevancia
3. El usuario puede ver los detalles de cualquier libro del resultado

### 4.4 Flujo Principal

| Paso | Actor | Acción del Sistema |
|------|-------|-------------------|
| 1 | Usuario | Ingresa palabra(s) clave en el campo de búsqueda |
| 2 | | Sistema busca coincidencias en: <br>- Título del libro <br>- Nombre del autor <br>- Género <br>- Etiquetas |
| 3 | | Sistema aplica criterio de búsqueda insensible a mayúsculas |
| 4 | | Sistema calcula relevancia para cada resultado: <br>- Coincidencia exacta en título: máxima prioridad <br>- Coincidencia parcial en título: alta prioridad <br>- Coincidencia en autor: media prioridad <br>- Coincidencia en género/etiquetas: baja prioridad |
| 5 | | Sistema ordena resultados por relevancia descendente |
| 6 | | Sistema muestra resultados con: <br>- Portada miniatura <br>- Título resaltando coincidencias <br>- Autor <br>- Género <br>- Precio <br>- Calificación |
| 7 | Usuario | Visualiza los resultados de búsqueda |

### 4.5 Flujo Alternativo 1 - Sin Resultados

**Punto de divergencia:** Paso 5

| Paso | Actor | Acción del Sistema |
|------|-------|-------------------|
| 5a-1 | | Sistema determina que no hay coincidencias |
| 5a-2 | | Sistema muestra mensaje: "No se encontraron libros que coincidan con 'X'" |
| 5a-3 | | Sistema sugiere: <br>- "Intente con términos más generales" <br>- "Libros populares que podrían interesarle:" |
| 5a-4 | | Sistema muestra 6 libros con mayor calificación |
| 5a-5 | Usuario | Puede refinar la búsqueda o explorar sugerencias |

### 4.6 Flujo Alternativo 2 - Aplicar Filtros

**Punto de extensión:** Después del paso 1

| Paso | Actor | Acción del Sistema |
|------|-------|-------------------|
| 2b-1 | Usuario | Selecciona filtros adicionales: <br>- Rango de precio (mínimo/máximo) <br>- Género específico <br>- Rango de años |
| 2b-2 | | Sistema aplica filtros a los resultados de búsqueda |
| 2b-3 | | Sistema actualiza la lista de resultados en tiempo real |
| | | **Flujo continúa al paso 6** |

### 4.7 Requisitos Especiales

1. **Rendimiento:**
   - La búsqueda debe responder en <1 segundo (95% de las solicitudes)
   - Los resultados deben actualizarse en tiempo real mientras se escribe

2. **Experiencia de Usuario:**
   - Mínimo 3 caracteres para activar la búsqueda
   - Mostrar máximo 50 resultados por página
   - Resaltar términos de búsqueda en los resultados

---

## 5. UC-03: Actualizar Libro

### 5.1 Descripción General

**Resumen:** Un administrador modifica la información de un libro existente en el catálogo.

**Actores:**
- **Actor Principal:** Administrador
- **Actor Secundario:** Componente de IA (si se modifica la sinopsis)

**Frecuencia de Uso:** Media

### 5.2 Flujo Principal

| Paso | Actor | Acción del Sistema |
|------|-------|-------------------|
| 1 | Administrador | Busca y selecciona el libro a editar |
| 2 | | Sistema muestra formulario de edición con datos actuales |
| 3 | Administrador | Modifica los campos deseados |
| 4 | Administrador | Hace click en "Actualizar" |
| 5 | | Sistema valida los nuevos datos |
| 6 | | Sistema actualiza el libro en el almacenamiento |
| 7 | | Si se modificó la sinopsis: <br>Sistema solicita regenerar representación semántica |
| 8 | Componente IA | Regenera y actualiza representación semántica |
| 9 | | Sistema muestra confirmación: "Libro actualizado exitosamente" |

### 5.3 Flujo Alternativo - Sinopsis No Modificada

**Punto de divergencia:** Paso 7

| Paso | Actor | Acción del Sistema |
|------|-------|-------------------|
| 7a-1 | | Sistema detecta que la sinopsis no cambió |
| 7a-2 | | Sistema mantiene la representación semántica existente |
| | | **Flujo continúa al paso 9** (omite paso 8) |

---

## 6. UC-04: Eliminar Libro

### 6.1 Descripción General

**Resumen:** Un administrador elimina un libro del catálogo.

**Actores:**
- **Actor Principal:** Administrador

**Frecuencia de Uso:** Baja

### 6.2 Flujo Principal

| Paso | Actor | Acción del Sistema |
|------|-------|-------------------|
| 1 | Administrador | Selecciona un libro y hace click en "Eliminar" |
| 2 | | Sistema muestra diálogo de confirmación: "¿Está seguro de eliminar '[Título del libro]'? Esta acción no se puede deshacer." |
| 3 | Administrador | Confirma la eliminación |
| 4 | | Sistema elimina el libro del almacenamiento |
| 5 | | Sistema elimina la representación semántica asociada (si existe) |
| 6 | | Sistema actualiza la lista de libros |
| 7 | | Sistema muestra mensaje: "Libro eliminado exitosamente" |

### 6.3 Flujo Alternativo - Cancelar Eliminación

**Punto de divergencia:** Paso 3

| Paso | Actor | Acción del Sistema |
|------|-------|-------------------|
| 3a-1 | Administrador | Hace click en "Cancelar" |
| 3a-2 | | Sistema cierra el diálogo sin eliminar nada |
| 3a-3 | | Sistema mantiene el libro en la lista |

---

## 7. Trazabilidad de Elementos

### 7.1 Entidades Conceptuales Identificadas

De los casos de uso especificados, se identifican las siguientes entidades conceptuales:

- **Libro:** Entidad principal con atributos (título, autor, género, precio, etc.)
- **Autor:** Entidad relacionada con libros
- **Usuario:** Actor que interactúa con el sistema
- **Administrador:** Tipo especial de usuario con permisos adicionales
- **Representación Semántica:** Información calculada a partir del contenido textual
- **Recomendación:** Resultado del análisis de similitud
- **Resultado de Búsqueda:** Conjunto de libros que coinciden con criterios

### 7.2 Componentes Conceptuales Identificados

- **Gestor de Catálogo:** Coordina operaciones CRUD de libros
- **Gestor de Búsqueda:** Coordina búsquedas y filtrado
- **Generador de Recomendaciones:** Coordina la generación de recomendaciones
- **Analizador Semántico:** Componente de IA que procesa texto
- **Calculador Heurístico:** Alternativa al análisis semántico
- **Validador de Datos:** Verifica integridad de datos ingresados

### 7.3 Interfaces Identificadas

- **Interfaz de Catálogo:** Vista principal de libros
- **Interfaz de Detalle:** Vista completa de un libro
- **Interfaz de Búsqueda:** Campo de búsqueda y filtros
- **Interfaz de Administración:** Panel de gestión CRUD
- **Interfaz con Componente IA:** Comunicación con análisis semántico

---

## 8. Matriz de Cobertura

| Caso de Uso | Requisito Funcional | Complejidad | Riesgo |
|-------------|---------------------|-------------|--------|
| UC-06 | RF-04 | Alta | Alto |
| UC-01 | RF-01 | Media | Medio |
| UC-05 | RF-03 | Media | Bajo |
| UC-03 | RF-01 | Media | Medio |
| UC-04 | RF-01 | Baja | Bajo |

---

## Conclusiones

Este documento especifica en detalle los casos de uso más críticos del sistema BookMate. Los flujos descritos servirán como base para:

1. Diagramas de robustez (Boundary-Control-Entity)
2. Diagramas de secuencia de análisis
3. Identificación de entidades del modelo de análisis
4. Tarjetas CRC (Class-Responsibility-Collaboration)

En la fase de diseño (Semana 13), estos casos de uso se complementarán con detalles técnicos específicos y nombres de clases reales.

---

**Versión:** 1.0  
**Última actualización:** Octubre 2025  
**Grupo 6** - Universidad Nacional de Ingeniería

