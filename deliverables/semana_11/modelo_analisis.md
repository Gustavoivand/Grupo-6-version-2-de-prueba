# Modelo de Análisis - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Octubre 2025  
**Versión:** 1.0  

---

## Nota Importante - Fase de Análisis

## 6. Diagramas del Modelo de Análisis

El modelo de análisis de BookMate está compuesto principalmente por dos tipos de diagramas que complementan la descripción conceptual del sistema:

1. **Diagrama de Robustez (BCE)**: Muestra la estructura estática de interacciones entre elementos Boundary-Control-Entity
2. **Diagrama de Secuencia**: Muestra las interacciones temporales y el orden de las operaciones entre elementos

Ambos diagramas utilizan la notación BCE y se complementan para proporcionar una visión completa del comportamiento del sistema.

### 6.1 Diagrama de Robustez

**¿Qué es el Diagrama de Robustez?**

El diagrama de robustez es una técnica de análisis que utiliza la notación Boundary-Control-Entity (BCE) para validar casos de uso y asegurar que todos los elementos necesarios están presentes. Este diagrama muestra:

- **Boundaries (Fronteras)**: Elementos que interactúan con actores externos (usuarios, sistemas externos)
- **Controls (Controladores)**: Elementos que coordinan comportamientos y lógica de negocio
- **Entities (Entidades)**: Elementos que representan conceptos del dominio y almacenan datos

**¿Para qué sirve?**

- Validar que un caso de uso tiene todos los elementos necesarios (boundaries, controls, entities)
- Identificar elementos faltantes antes de pasar a la fase de diseño
- Visualizar la estructura de interacciones de manera estática
- Asegurar que cada caso de uso está completo y bien definido

**Relación con el Modelo BCE:**

El diagrama de robustez es la representación visual del modelo BCE aplicado a casos de uso específicos. Cada caso de uso debe tener:
- Al menos un Boundary que interactúe con el actor
- Al menos un Control que coordine el comportamiento
- Al menos una Entity que almacene o represente datos

**Referencia:**

Los diagramas de robustez detallados para cada caso de uso se encuentran en el archivo `robustez.puml`, que incluye:
- UC-06: Obtener Recomendaciones (caso crítico)
- UC-01: Crear Libro
- UC-05: Buscar Libros
- UC-03: Actualizar Libro
- UC-04: Eliminar Libro
- Vista general del sistema

### 6.2 Diagrama de Secuencia

**¿Qué es el Diagrama de Secuencia?**

El diagrama de secuencia es un diagrama de interacción que muestra cómo los objetos colaboran entre sí a lo largo del tiempo. En el contexto del análisis conceptual, muestra:

- El orden temporal de las interacciones entre actores, boundaries, controls y entities
- Los mensajes intercambiados entre elementos
- La activación de cada elemento durante el proceso
- Flujos alternativos y decisiones

**¿Para qué sirve?**

- Visualizar el orden temporal de las operaciones
- Entender el flujo completo de un caso de uso desde el inicio hasta el final
- Identificar dependencias entre elementos
- Documentar flujos alternativos y excepciones
- Comunicar el comportamiento del sistema de manera clara

**Diferencia entre Diagrama de Robustez y Diagrama de Secuencia:**

| Aspecto | Diagrama de Robustez | Diagrama de Secuencia |
|---------|---------------------|----------------------|
| **Enfoque** | Estructura estática de interacciones | Orden temporal de operaciones |
| **Propósito** | Validar completitud de elementos | Mostrar flujo temporal |
| **Vista** | Relaciones entre elementos | Secuencia de mensajes |
| **Uso** | Validación de casos de uso | Documentación de comportamiento |

**Relación con el Modelo BCE:**

El diagrama de secuencia utiliza los mismos elementos BCE (Boundary-Control-Entity) pero los muestra en acción a lo largo del tiempo. Muestra:
- Cómo el Boundary recibe la solicitud del actor
- Cómo el Control coordina las operaciones
- Cómo las Entities proporcionan o almacenan datos
- El orden específico en que ocurren estas interacciones

**Referencia:**

Los diagramas de secuencia detallados para los casos de uso principales se encuentran en el archivo `secuencia_analisis.puml`, que incluye:
- UC-06: Obtener Recomendaciones (con flujo principal y alternativo)
- UC-01: Crear Libro
- UC-05: Buscar Libros (con flujo alternativo sin resultados)

**Ejemplo de Uso:**

En el caso de UC-06 (Obtener Recomendaciones), el diagrama de secuencia muestra:
1. El usuario solicita recomendaciones a través de la Interfaz de Detalle
2. La interfaz envía la solicitud al Generador de Recomendaciones
3. El generador consulta el Libro de referencia
4. El generador decide si usar Análisis Semántico o Calculador Heurístico
5. Se ejecuta el método seleccionado
6. Se obtienen los detalles de los libros recomendados
7. Se muestran las recomendaciones al usuario

Este flujo temporal complementa el diagrama de robustez, que muestra qué elementos participan pero no el orden en que interactúan.

---

## 7. Diagramas de Interacción Conceptual

### 7.1 Diagrama de Entidades y Relaciones

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

### 7.2 Arquitectura Conceptual (Boundary-Control-Entity)

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

## 8. Responsabilidades por Elemento

### 8.1 Resumen de Responsabilidades de Entidades

| Entidad | Responsabilidad Principal | Datos Clave |
|---------|---------------------------|-------------|
| Libro | Representar un libro académico | Título, autor, género, sinopsis |
| Autor | Representar un autor | Nombre, biografía |
| Representación Semántica | Almacenar significado vectorial | Vector numérico |
| Recomendación | Representar similitud calculada | Libro, puntuación |
| Usuario | Representar usuario del sistema | Nombre, rol |
| Resultado de Búsqueda | Agrupar resultados de búsqueda | Lista libros, relevancia |

### 8.2 Resumen de Responsabilidades de Controladores

| Controlador | Responsabilidad Principal | Colaboraciones Clave |
|-------------|---------------------------|----------------------|
| Gestor de Catálogo | Coordinar CRUD de libros/autores | Libro, Autor, Validador |
| Gestor de Búsqueda | Coordinar búsquedas | Libro, Resultado Búsqueda |
| Generador de Recomendaciones | Coordinar generación de recomendaciones | Analizador, Calculador, Libro |
| Analizador Semántico | Procesar texto y calcular similitud | Representación Semántica, IA |
| Calculador Heurístico | Aplicar reglas de similitud | Libro |
| Validador de Datos | Verificar integridad de datos | Libro, Autor |

### 8.3 Resumen de Responsabilidades de Fronteras

| Frontera | Responsabilidad Principal | Actor |
|----------|---------------------------|-------|
| Interfaz de Catálogo | Mostrar lista de libros | Usuario |
| Interfaz de Búsqueda | Capturar y mostrar búsquedas | Usuario |
| Interfaz de Detalle | Mostrar libro completo y recomendaciones | Usuario |
| Interfaz de Administración | Gestionar CRUD | Administrador |
| Interfaz con IA | Comunicar con sistema externo | Sistema de IA |

---

## 9. Restricciones del Modelo de Análisis

### 9.1 Restricciones de Negocio

1. **Unicidad de ISBN:** No puede haber dos libros con el mismo ISBN
2. **Existencia de Autor:** Todo libro debe estar asociado a un autor existente
3. **Calificación Válida:** La calificación debe estar entre 0.0 y 5.0
4. **Precio Positivo:** El precio debe ser mayor a 0

### 9.2 Restricciones de Rendimiento

1. **Búsquedas:** Deben completarse en <1 segundo (95% de solicitudes)
2. **Recomendaciones IA:** Deben completarse en <3 segundos (95% de solicitudes)
3. **Recomendaciones Heurísticas:** Deben completarse en <500ms

### 9.3 Restricciones de Calidad

1. **Precisión de Recomendaciones IA:** ≥70% relevantes
2. **Precisión de Recomendaciones Heurísticas:** ≥50% relevantes
3. **Disponibilidad:** Sistema siempre debe retornar recomendaciones (con fallback)

---

## 10. Evolución Hacia el Diseño

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
- ✅ **Diagramas de robustez** que validan la estructura de cada caso de uso
- ✅ **Diagramas de secuencia** que muestran el orden temporal de las operaciones
- ✅ **Responsabilidades claras** para cada elemento

Este modelo conceptual es **independiente de tecnologías** y se enfoca en el **comportamiento del sistema** desde una perspectiva de negocio. El modelo está compuesto principalmente por:

1. **Diagramas de Robustez** (`robustez.puml`): Validan la estructura estática de interacciones BCE
2. **Diagramas de Secuencia** (`secuencia_analisis.puml`): Documentan el orden temporal de las operaciones

En la fase de diseño, este modelo se refinará con detalles técnicos específicos.

---

**Versión:** 1.0  
**Última actualización:** Octubre 2025  
**Grupo 6** - Universidad Nacional de Ingeniería

