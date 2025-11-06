# Modelo de Análisis - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Octubre 2025  
**Versión:** 1.0  

---

## Nota Importante - Fase de Análisis

Este documento corresponde a la **fase de análisis conceptual** (Semana 11). Por lo tanto:

- ❌ **NO se mencionan tecnologías, frameworks o lenguajes**
- ❌ **NO se habla de clases de implementación o código**
- ✅ **SE enfoca en el modelo conceptual del dominio**
- ✅ **SE identifican entidades, relaciones y comportamientos**

Las clases de diseño e implementación se definirán en la **fase de diseño** (Semanas 13-15).

---

## 1. Introducción

### 1.1 Propósito del Modelo de Análisis

El modelo de análisis proporciona una representación conceptual del sistema BookMate, identificando:

- Entidades del dominio
- Relaciones entre entidades
- Responsabilidades de cada entidad
- Comportamientos del sistema
- Flujos de información

### 1.2 Enfoque del Análisis

Este modelo utiliza la notación Boundary-Control-Entity (BCE) para organizar los elementos del sistema:

- **Boundary (Frontera):** Elementos que interactúan con actores externos
- **Control (Control):** Elementos que coordinan comportamientos y flujos
- **Entity (Entidad):** Elementos que representan conceptos del dominio

---

## 2. Entidades del Dominio

### 2.1 Entidad: Libro

**Descripción:** Representa un libro académico en el catálogo del sistema.

**Atributos:**
- Identificador único
- Título
- Género
- Precio
- Fecha de edición
- Sinopsis
- Código ISBN
- Editorial
- Número de páginas
- URL de imagen de portada
- Calificación promedio
- Lista de etiquetas temáticas

**Responsabilidades:**
- Mantener información completa del libro
- Proveer datos para búsquedas
- Proveer contenido textual para análisis semántico

**Relaciones:**
- Pertenece a un Autor (0..* libros por autor)
- Tiene una Representación Semántica (0..1)
- Aparece en Resultados de Búsqueda (0..*)
- Aparece en Recomendaciones (0..*)

---

### 2.2 Entidad: Autor

**Descripción:** Representa un autor de libros académicos.

**Atributos:**
- Identificador único
- Nombre completo
- Biografía
- Nacionalidad
- Fecha de nacimiento

**Responsabilidades:**
- Mantener información del autor
- Proveer datos para búsquedas por autor
- Relacionar libros del mismo autor

**Relaciones:**
- Tiene asociados 0..* Libros

---

### 2.3 Entidad: Representación Semántica

**Descripción:** Representa la interpretación del contenido semántico de un libro, utilizada para calcular similitudes.

**Atributos:**
- Identificador único
- Vector numérico de dimensión fija (representación vectorial del significado)
- Fecha de generación
- Método de generación

**Responsabilidades:**
- Almacenar la representación semántica del contenido textual
- Proveer datos para cálculo de similitud
- Indicar si está actualizada respecto al contenido del libro

**Relaciones:**
- Pertenece a exactamente 1 Libro
- Es utilizada por el Analizador de Similitud

---

### 2.4 Entidad: Recomendación

**Descripción:** Representa una sugerencia de libro similar a un libro de referencia.

**Atributos:**
- Libro recomendado
- Puntuación de similitud (0.0 a 1.0)
- Método utilizado (análisis semántico o heurístico)
- Fecha de generación

**Responsabilidades:**
- Mantener el resultado de un cálculo de similitud
- Proveer información sobre la relevancia
- Indicar el método usado para generar la recomendación

**Relaciones:**
- Hace referencia a 1 Libro
- Es parte de un Conjunto de Recomendaciones

---

### 2.5 Entidad: Usuario

**Descripción:** Representa un usuario del sistema que consulta el catálogo.

**Atributos:**
- Identificador único
- Nombre
- Correo electrónico
- Rol (Usuario general o Administrador)

**Responsabilidades:**
- Mantener información del usuario
- Determinar permisos de acceso

**Relaciones:**
- Realiza Búsquedas (0..*)
- Solicita Recomendaciones (0..*)
- Si es Administrador: Gestiona Libros y Autores

---

### 2.6 Entidad: Resultado de Búsqueda

**Descripción:** Representa el conjunto de libros que coinciden con un criterio de búsqueda.

**Atributos:**
- Consulta original (texto ingresado)
- Lista de libros encontrados
- Puntuación de relevancia por libro
- Número total de resultados
- Fecha de búsqueda

**Responsabilidades:**
- Mantener el resultado de una búsqueda
- Ordenar libros por relevancia
- Proveer estadísticas de la búsqueda

**Relaciones:**
- Contiene 0..* Libros
- Fue generado por 1 Usuario

---

## 3. Elementos de Control

### 3.1 Gestor de Catálogo

**Descripción:** Coordina las operaciones de gestión del catálogo de libros y autores.

**Responsabilidades:**
- Coordinar creación de nuevos libros
- Coordinar actualización de libros existentes
- Coordinar eliminación de libros
- Validar datos de entrada
- Notificar a otros componentes sobre cambios (ej: generar representación semántica)
- Gestionar operaciones CRUD de autores

**Colaboraciones:**
- Comunica con Interfaz de Administración
- Accede a entidades Libro y Autor
- Notifica al Generador de Representaciones Semánticas

---

### 3.2 Gestor de Búsqueda

**Descripción:** Coordina las operaciones de búsqueda y filtrado del catálogo.

**Responsabilidades:**
- Recibir consultas de búsqueda
- Aplicar criterios de búsqueda en múltiples campos
- Aplicar filtros adicionales (precio, género, etc.)
- Calcular relevancia de resultados
- Ordenar resultados por relevancia
- Generar Resultados de Búsqueda

**Colaboraciones:**
- Comunica con Interfaz de Búsqueda
- Consulta entidades Libro y Autor
- Genera entidades Resultado de Búsqueda

---

### 3.3 Generador de Recomendaciones

**Descripción:** Coordina el proceso de generación de recomendaciones de libros similares.

**Responsabilidades:**
- Recibir solicitudes de recomendaciones
- Determinar método a utilizar (análisis semántico o heurístico)
- Coordinar con Analizador Semántico (si disponible)
- Activar Calculador Heurístico (si necesario)
- Recuperar detalles de libros recomendados
- Generar conjunto final de Recomendaciones

**Colaboraciones:**
- Comunica con Interfaz de Detalle de Libro
- Coordina con Analizador Semántico
- Coordina con Calculador Heurístico
- Consulta entidades Libro y Representación Semántica
- Genera entidades Recomendación

**Lógica de Decisión:**
```
SI Analizador Semántico disponible:
    Usar análisis semántico
SINO:
    Usar calculador heurístico
```

---

### 3.4 Analizador Semántico

**Descripción:** Procesa contenido textual y genera representaciones semánticas.

**Responsabilidades:**
- Recibir contenido textual (sinopsis)
- Generar representación vectorial del significado
- Almacenar Representaciones Semánticas
- Calcular similitud entre representaciones
- Retornar libros más similares

**Colaboraciones:**
- Es coordinado por Generador de Recomendaciones
- Es coordinado por Gestor de Catálogo (al crear/actualizar libros)
- Genera y consulta Representaciones Semánticas
- Utiliza componente externo de Inteligencia Artificial

**Algoritmo Conceptual:**
```
1. Recibir texto (sinopsis del libro)
2. Preprocesar texto (limpiar, normalizar)
3. Convertir texto a representación vectorial (N dimensiones)
4. Para calcular similitud:
   a. Obtener representación del libro de referencia
   b. Obtener representaciones de todos los demás libros
   c. Calcular medida de similitud (coseno del ángulo entre vectores)
   d. Ordenar por similitud descendente
   e. Seleccionar top N libros
```

---

### 3.5 Calculador Heurístico

**Descripción:** Genera recomendaciones basadas en reglas y características explícitas.

**Responsabilidades:**
- Recibir libro de referencia
- Calcular similitud heurística con cada libro del catálogo
- Aplicar reglas de puntuación
- Ordenar por puntuación total
- Retornar top N libros

**Colaboraciones:**
- Es activado por Generador de Recomendaciones (como respaldo)
- Consulta entidades Libro

**Reglas de Puntuación:**
```
Para cada libro candidato:
    puntuación = 0
    
    SI género == género_referencia:
        puntuación += 3
    
    SI autor == autor_referencia:
        puntuación += 5
    
    PARA cada etiqueta compartida:
        puntuación += 2
    
    SI |precio - precio_referencia| / precio_referencia <= 0.20:
        puntuación += 1
    
    SI calificación >= 4.0:
        puntuación += 1

Ordenar por puntuación descendente
Seleccionar top 6 libros
```

---

### 3.6 Validador de Datos

**Descripción:** Verifica la integridad y validez de datos ingresados al sistema.

**Responsabilidades:**
- Validar datos antes de crear/actualizar entidades
- Verificar que campos obligatorios estén completos
- Verificar formatos y rangos válidos
- Verificar unicidad de identificadores (ISBN, etc.)
- Generar mensajes de error descriptivos

**Colaboraciones:**
- Es utilizado por Gestor de Catálogo
- Consulta entidades existentes para verificar unicidad

**Reglas de Validación:**
```
Para Libro:
    - Título: no vacío, máximo 200 caracteres
    - Precio: número > 0
    - Fecha edición: fecha válida, no futura
    - ISBN: formato válido (si se proporciona), único
    - Autor: debe existir en el sistema
    - Género: no vacío
    - Número de páginas: entero > 0 (si se proporciona)
    - Calificación: entre 0.0 y 5.0 (si se proporciona)

Para Autor:
    - Nombre: no vacío, máximo 100 caracteres
    - Nombre único en el sistema
```

---

## 4. Elementos de Frontera

### 4.1 Interfaz de Catálogo

**Descripción:** Punto de interacción del usuario con el catálogo de libros.

**Responsabilidades:**
- Mostrar lista de libros disponibles
- Capturar selección de libro por parte del usuario
- Proporcionar navegación entre libros
- Mostrar información resumida de cada libro

**Colaboraciones:**
- Interactúa con actor Usuario
- Comunica solicitudes a Gestor de Búsqueda
- Muestra entidades Libro

---

### 4.2 Interfaz de Búsqueda

**Descripción:** Punto de interacción para realizar búsquedas en el catálogo.

**Responsabilidades:**
- Capturar consulta de búsqueda del usuario
- Capturar filtros adicionales (precio, género)
- Mostrar resultados de búsqueda
- Permitir refinamiento de búsqueda

**Colaboraciones:**
- Interactúa con actor Usuario
- Envía solicitudes a Gestor de Búsqueda
- Muestra entidades Resultado de Búsqueda y Libro

---

### 4.3 Interfaz de Detalle de Libro

**Descripción:** Punto de interacción para visualizar información completa de un libro.

**Responsabilidades:**
- Mostrar todos los atributos de un libro
- Mostrar información del autor asociado
- Capturar solicitud de recomendaciones
- Mostrar recomendaciones generadas

**Colaboraciones:**
- Interactúa con actor Usuario
- Muestra entidades Libro, Autor
- Envía solicitudes a Generador de Recomendaciones
- Muestra entidades Recomendación

---

### 4.4 Interfaz de Administración

**Descripción:** Punto de interacción para gestión del catálogo (solo administradores).

**Responsabilidades:**
- Mostrar formularios de creación/edición de libros y autores
- Capturar datos ingresados por administrador
- Mostrar confirmaciones y errores
- Proporcionar funciones de eliminación con confirmación

**Colaboraciones:**
- Interactúa con actor Administrador
- Envía solicitudes a Gestor de Catálogo
- Muestra entidades Libro, Autor
- Recibe validaciones de Validador de Datos

---

### 4.5 Interfaz con Componente de IA

**Descripción:** Punto de comunicación con el sistema externo de inteligencia artificial.

**Responsabilidades:**
- Enviar solicitudes al componente externo
- Formatear datos para envío (texto, parámetros)
- Recibir respuestas del componente externo
- Manejar timeouts y errores de comunicación
- Transformar respuestas a formato interno

**Colaboraciones:**
- Es utilizada por Analizador Semántico
- Comunica con Actor Externo: Sistema de IA

**Formato de Comunicación Conceptual:**
```
Solicitud:
    - Identificador del libro
    - Contenido textual (sinopsis)
    - Número de recomendaciones solicitadas

Respuesta:
    - Lista de identificadores de libros recomendados
    - Puntuaciones de similitud
    - Método utilizado
    - Tiempo de procesamiento
```

---

## 5. Flujos de Información

### 5.1 Flujo: Obtener Recomendaciones (Caso Crítico)

```
Usuario → Interfaz de Detalle
    ↓
    Solicitud: "Ver libros similares"
    ↓
Interfaz de Detalle → Generador de Recomendaciones
    ↓
    Datos: ID del libro de referencia
    ↓
Generador de Recomendaciones ← [Libro: datos completos]
    ↓
    Decisión: ¿Analizador Semántico disponible?
    ↓
    SI → Analizador Semántico
        ↓
        Analizador Semántico → Interfaz con IA
            ↓
            Interfaz con IA → Sistema de IA (Externo)
            ↓
            Sistema de IA procesa → retorna IDs similares
            ↓
        Analizador Semántico ← Respuesta IA
    ↓
    NO → Calculador Heurístico
        ↓
        Aplica reglas de similitud
    ↓
Generador de Recomendaciones ← [Recomendaciones calculadas]
    ↓
    Recupera detalles de libros recomendados
    ↓
Generador de Recomendaciones → Interfaz de Detalle
    ↓
    Lista de 6 libros con puntuaciones
    ↓
Interfaz de Detalle → Usuario
    Muestra recomendaciones
```

---

### 5.2 Flujo: Crear Libro

```
Administrador → Interfaz de Administración
    ↓
    Acción: "Agregar Nuevo Libro"
    ↓
Interfaz de Administración → Administrador
    Muestra: Formulario vacío
    ↓
Administrador → Interfaz de Administración
    ↓
    Datos: título, autor, género, precio, sinopsis, etc.
    ↓
Interfaz de Administración → Gestor de Catálogo
    ↓
Gestor de Catálogo → Validador de Datos
    ↓
    Valida: título no vacío, precio > 0, autor existe, etc.
    ↓
Gestor de Catálogo ← Resultado de validación
    ↓
    SI válido:
        Crea entidad Libro
        ↓
        SI hay sinopsis:
            Gestor de Catálogo → Analizador Semántico
            ↓
            Genera Representación Semántica
        ↓
        Gestor de Catálogo → Interfaz de Administración
        Mensaje: "Libro creado exitosamente"
    ↓
    SI inválido:
        Gestor de Catálogo → Interfaz de Administración
        Mensajes: errores específicos por campo
    ↓
Interfaz de Administración → Administrador
    Muestra: confirmación o errores
```

---

### 5.3 Flujo: Buscar Libros

```
Usuario → Interfaz de Búsqueda
    ↓
    Datos: "arquitectura microservicios"
    ↓
Interfaz de Búsqueda → Gestor de Búsqueda
    ↓
Gestor de Búsqueda:
    - Busca en: título, autor, género, etiquetas
    - Calcula relevancia por coincidencia
    - Ordena por relevancia descendente
    ↓
    Recupera detalles de libros encontrados
    ↓
Gestor de Búsqueda → Interfaz de Búsqueda
    ↓
    Entidad: Resultado de Búsqueda (lista de libros)
    ↓
Interfaz de Búsqueda → Usuario
    Muestra: Grid de libros con información resumida
```

---

## 6. Diagramas de Interacción Conceptual

### 6.1 Diagrama de Entidades y Relaciones

```
┌──────────┐       ┌──────────────────────────┐
│  Autor   │ 1   * │         Libro            │
│          │◄──────│                          │
│  - nombre│       │  - título                │
│  - bio   │       │  - género                │
└──────────┘       │  - precio                │
                   │  - sinopsis              │
                   └──────────────────────────┘
                              │ 1
                              │
                              │ 0..1
                   ┌──────────▼───────────────┐
                   │ Representación Semántica │
                   │                          │
                   │  - vector numér ico      │
                   │  - fecha generación      │
                   └──────────────────────────┘
                              │
                              │ usado por
                              ▼
                   ┌──────────────────────────┐
                   │  Analizador Semántico    │
                   │                          │
                   │  calcula similitud       │
                   └──────────────────────────┘
                              │
                              │ genera
                              ▼
                   ┌──────────────────────────┐
                   │     Recomendación        │
                   │                          │
                   │  - libro recomendado     │
                   │  - puntuación            │
                   └──────────────────────────┘
```

---

### 6.2 Arquitectura Conceptual (Boundary-Control-Entity)

```
┌─────────────────────────────────────────────────────────┐
│                    BOUNDARIES (Fronteras)                │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │  Interfaz  │  │  Interfaz  │  │  Interfaz  │        │
│  │ Catálogo   │  │ Búsqueda   │  │  Detalle   │  ...   │
│  └────────────┘  └────────────┘  └────────────┘        │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                     CONTROLS (Controladores)             │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │  Gestor de │  │  Gestor de │  │ Generador  │        │
│  │ Catálogo   │  │ Búsqueda   │  │    de      │  ...   │
│  │            │  │            │  │Recomen-    │        │
│  │            │  │            │  │daciones    │        │
│  └────────────┘  └────────────┘  └────────────┘        │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                    ENTITIES (Entidades)                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │   Libro    │  │   Autor    │  │Represent.  │        │
│  │            │  │            │  │Semántica   │  ...   │
│  └────────────┘  └────────────┘  └────────────┘        │
└─────────────────────────────────────────────────────────┘
```

---

## 7. Responsabilidades por Elemento

### 7.1 Resumen de Responsabilidades de Entidades

| Entidad | Responsabilidad Principal | Datos Clave |
|---------|---------------------------|-------------|
| Libro | Representar un libro académico | Título, autor, género, sinopsis |
| Autor | Representar un autor | Nombre, biografía |
| Representación Semántica | Almacenar significado vectorial | Vector numérico |
| Recomendación | Representar similitud calculada | Libro, puntuación |
| Usuario | Representar usuario del sistema | Nombre, rol |
| Resultado de Búsqueda | Agrupar resultados de búsqueda | Lista libros, relevancia |

### 7.2 Resumen de Responsabilidades de Controladores

| Controlador | Responsabilidad Principal | Colaboraciones Clave |
|-------------|---------------------------|----------------------|
| Gestor de Catálogo | Coordinar CRUD de libros/autores | Libro, Autor, Validador |
| Gestor de Búsqueda | Coordinar búsquedas | Libro, Resultado Búsqueda |
| Generador de Recomendaciones | Coordinar generación de recomendaciones | Analizador, Calculador, Libro |
| Analizador Semántico | Procesar texto y calcular similitud | Representación Semántica, IA |
| Calculador Heurístico | Aplicar reglas de similitud | Libro |
| Validador de Datos | Verificar integridad de datos | Libro, Autor |

### 7.3 Resumen de Responsabilidades de Fronteras

| Frontera | Responsabilidad Principal | Actor |
|----------|---------------------------|-------|
| Interfaz de Catálogo | Mostrar lista de libros | Usuario |
| Interfaz de Búsqueda | Capturar y mostrar búsquedas | Usuario |
| Interfaz de Detalle | Mostrar libro completo y recomendaciones | Usuario |
| Interfaz de Administración | Gestionar CRUD | Administrador |
| Interfaz con IA | Comunicar con sistema externo | Sistema de IA |

---

## 8. Restricciones del Modelo de Análisis

### 8.1 Restricciones de Negocio

1. **Unicidad de ISBN:** No puede haber dos libros con el mismo ISBN
2. **Existencia de Autor:** Todo libro debe estar asociado a un autor existente
3. **Calificación Válida:** La calificación debe estar entre 0.0 y 5.0
4. **Precio Positivo:** El precio debe ser mayor a 0

### 8.2 Restricciones de Rendimiento

1. **Búsquedas:** Deben completarse en <1 segundo (95% de solicitudes)
2. **Recomendaciones IA:** Deben completarse en <3 segundos (95% de solicitudes)
3. **Recomendaciones Heurísticas:** Deben completarse en <500ms

### 8.3 Restricciones de Calidad

1. **Precisión de Recomendaciones IA:** ≥70% relevantes
2. **Precisión de Recomendaciones Heurísticas:** ≥50% relevantes
3. **Disponibilidad:** Sistema siempre debe retornar recomendaciones (con fallback)

---

## 9. Evolución Hacia el Diseño

Este modelo de análisis servirá como base para:

1. **Fase de Diseño (Semana 13):**
   - Transformar entidades conceptuales en clases de diseño
   - Definir tecnologías específicas para cada componente
   - Especificar interfaces de programación
   - Diseñar arquitectura física

2. **Diagrama de Clases de Diseño (Semana 15):**
   - Agregar métodos específicos
   - Definir tipos de datos
   - Especificar visibilidad (public/private)
   - Agregar clases auxiliares

3. **Implementación (Posterior):**
   - Codificar clases en lenguaje específico
   - Implementar persistencia
   - Desarrollar interfaces de usuario
   - Integrar componente de IA

---

## Conclusiones

El modelo de análisis de BookMate identifica:

- ✅ **6 entidades principales** del dominio
- ✅ **6 controladores** que coordinan comportamientos
- ✅ **5 fronteras** para interacción con actores
- ✅ **Flujos de información** completos para casos de uso críticos
- ✅ **Responsabilidades claras** para cada elemento

Este modelo conceptual es **independiente de tecnologías** y se enfoca en el **comportamiento del sistema** desde una perspectiva de negocio. En la fase de diseño, este modelo se refinará con detalles técnicos específicos.

---

**Versión:** 1.0  
**Última actualización:** Octubre 2025  
**Grupo 6** - Universidad Nacional de Ingeniería

