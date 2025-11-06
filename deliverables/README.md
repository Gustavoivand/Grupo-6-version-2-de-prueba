# Entregables Académicos - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Ciclo:** 2025-2  

---

## Índice de Entregables

Este directorio contiene todos los entregables académicos organizados por semana según el cronograma del proyecto.

### Estructura de Semanas

| Semana | Tipo | Documentos | Estado |
|--------|------|------------|--------|
| [Semana 7](#semana-7-pc2) | PC2 | Charter, Visión, Glosario, BPMN | ✅ Completo |
| [Semana 8](#semana-8-parcial) | Parcial | SRS, Casos de Uso, Prototipo, Trazabilidad | ✅ Completo |
| [Semana 11](#semana-11-pc3) | PC3 | Análisis, C4 C1-C2, Robustez, CRC | ✅ Completo |
| [Semana 13](#semana-13-pc4) | PC4 | Arquitectura, C4 C3-C4, Plan Desarrollo | 📝 En desarrollo |
| [Semana 15](#semana-15-pc5) | PC5 | Diseño, Clases, Secuencia, Despliegue | 📝 En desarrollo |
| [Semana 16](#semana-16-final) | Final | Demo, Planes de Pruebas/Despliegue | 📝 En desarrollo |
| [Semana 17](#semana-17-sustitutorio) | Sustitutorio | Subsanación | 📝 Plantilla |

---

## Nota Importante: Fases del Proyecto

### 🔵 Fase de Análisis (Semanas 7-11)

En esta fase, **NO se mencionan tecnologías específicas**. Los documentos se enfocan en:
- Requisitos del sistema
- Casos de uso conceptuales
- Modelo de dominio
- Arquitectura conceptual (sin tecnologías)
- Diagramas de análisis (Boundary-Control-Entity)

**Objetivo:** Comprender QUÉ debe hacer el sistema, independientemente de CÓMO se implemente.

### 🟢 Fase de Diseño (Semanas 13-16)

A partir de la Semana 13, **SE mencionan tecnologías específicas**. Los documentos incluyen:
- Stack tecnológico detallado (Spring Boot, PostgreSQL, Python, etc.)
- Clases de implementación con métodos reales
- Arquitectura física y de despliegue
- Decisiones técnicas específicas
- Herramientas y frameworks

**Objetivo:** Definir CÓMO se implementará el sistema con tecnologías concretas.

---

## Semana 7: PC2

**Entregable 1 - Inicio del Proyecto**

### Documentos

- **charter.md**: Charter del proyecto con propósito, objetivos, stakeholders, alcance y restricciones
- **vision.md**: Visión del producto, problema a resolver, solución propuesta y valor diferencial
- **glosario.md**: Glosario de términos técnicos (IA, embeddings, NLP, etc.)
- **bpmn.puml**: Modelo de negocio en BPMN (procesos de recomendación, gestión, búsqueda)
- **presentacion_07.tex**: Presentación Beamer para exposición

### Ubicación

```
deliverables/semana_07/
├── charter.md
├── vision.md
├── glosario.md
├── bpmn.puml
├── presentacion_07.tex
└── Imagenes/
    └── README.md
```

---

## Semana 8: Parcial

**Entregable 2 - Análisis de Requisitos**

### Documentos

- **srs.md**: Software Requirements Specification completo
  - 15 requisitos funcionales (RF-01 a RF-15)
  - 10 categorías de requisitos no funcionales
  - Interfaces del sistema
  - Restricciones y criterios de aceptación
- **casos_uso.puml**: Diagramas de casos de uso (UC-01 a UC-15)
  - Actores: Usuario, Administrador, Sistema IA
  - Múltiples vistas: general, detalladas, por prioridad
- **prototipo_uc.md**: Descripción del prototipo funcional
  - Arquitectura actual
  - Funcionalidades implementadas
  - Limitaciones
  - Flujos de usuario validados
- **matriz_trazabilidad.md**: Trazabilidad completa
  - Requisitos → Casos de Uso
  - Casos de Uso → Componentes
  - Casos de Uso → Pruebas
- **presentacion_08.tex**: Presentación Beamer para parcial

### Ubicación

```
deliverables/semana_08/
├── srs.md
├── casos_uso.puml
├── prototipo_uc.md
├── matriz_trazabilidad.md
├── presentacion_08.tex
└── Imagenes/
    └── README.md
```

---

## Semana 11: PC3

**Entregable 3 - Análisis Conceptual** (Última semana de análisis puro)

### Documentos

- **especificaciones_uc.md**: Especificaciones detalladas de casos de uso principales
  - UC-06 (Recomendaciones) - Caso crítico
  - UC-01 (Crear Libro)
  - UC-05 (Buscar Libros)
  - UC-03 (Actualizar Libro)
  - UC-04 (Eliminar Libro)
  - Flujos principales y alternativos
  - Precondiciones y postcondiciones
- **modelo_analisis.md**: Modelo conceptual del sistema
  - 6 entidades del dominio
  - 6 controladores de lógica
  - 5 interfaces de frontera
  - Flujos de información
  - Arquitectura BCE (Boundary-Control-Entity)
- **robustez.puml**: Diagramas de robustez (BCE)
  - 5 diagramas detallados por caso de uso
  - Vista general del sistema
- **secuencia_analisis.puml**: Diagramas de secuencia de análisis
  - Diagramas conceptuales que muestran interacciones temporales
  - UC-06 (Obtener Recomendaciones) - Caso crítico
  - UC-01 (Crear Libro)
  - UC-05 (Buscar Libros)
  - Usa elementos BCE (Boundary-Control-Entity)
  - Enfoque conceptual sin tecnologías específicas
- **c4_contexto.puml**: Arquitectura C4 Nivel 1 (Contexto)
  - Sistema BookMate en contexto
  - Actores externos
  - Flujos principales
- **c4_contenedores.puml**: Arquitectura C4 Nivel 2 (Contenedores)
  - Aplicación Web
  - Sistema de Gestión (Backend)
  - Sistema de Almacenamiento
  - Servicio de IA
  - Flujos entre contenedores
- **estados_analisis.puml**: Diagramas de estado
  - Estado de Libro
  - Estado de Solicitud de Recomendación
  - Estado de Búsqueda
  - Estado de Embedding
- **crc_tarjetas.md**: 20 Tarjetas CRC (Class-Responsibility-Collaboration)
  - Entidades del dominio
  - Controladores
  - Interfaces
  - Colaboraciones
- **presentacion_11.tex**: Presentación Beamer para PC3 *(pendiente de generación)*

### Ubicación

```
deliverables/semana_11/
├── especificaciones_uc.md
├── modelo_analisis.md
├── robustez.puml
├── secuencia_analisis.puml
├── c4_contexto.puml
├── c4_contenedores.puml
├── estados_analisis.puml
├── crc_tarjetas.md
├── presentacion_11.tex
└── Imagenes/
    └── README.md
```

---

## Semana 13: PC4

**Entregable 4 - Diseño Arquitectónico** (Inicia fase de diseño con tecnologías)

### Documentos Planificados

- **prototipo_navegable.md**: Guía del prototipo actual
  - Cómo ejecutar el sistema
  - Funcionalidades disponibles
  - Limitaciones vs sistema final planificado
- **plan_desarrollo.md**: Plan de desarrollo del software
  - Fases del proyecto
  - Sprints y cronograma
  - Equipo y roles
  - Tecnologías seleccionadas
- **arquitectura.md**: Documento de arquitectura completo
  - **Stack tecnológico**: Spring Boot, PostgreSQL, Python, Docker
  - C4 Niveles 1-4 con tecnologías específicas
  - Patrones de diseño aplicados (Strategy, Repository, Service Layer, DTO)
  - Decisiones arquitectónicas clave
  - Comunicación entre servicios
- **c4_componentes.puml**: C4 Nivel 3 con nombres reales de clases
- **c4_codigo.puml**: C4 Nivel 4 con métodos específicos
- **presentacion_13.tex**: Presentación Beamer para PC4

### Ubicación

```
deliverables/semana_13/
├── prototipo_navegable.md
├── plan_desarrollo.md
├── arquitectura.md
├── c4_componentes.puml
├── c4_codigo.puml
├── presentacion_13.tex
└── Imagenes/
    └── README.md
```

---

## Semana 15: PC5

**Entregable 5 - Diseño Detallado**

### Documentos Planificados

- **modelo_diseno.md**: Modelo de diseño completo
  - Decisiones técnicas
  - Patrones aplicados
  - Justificación de tecnologías
- **clases_diseno.puml**: Diagrama de clases de diseño
  - Clases de implementación reales (Java)
  - Libros, Autor, LibrosController, LibrosService, LibrosRepository
  - RecommendationService, AIService, etc.
  - Atributos y métodos específicos
- **secuencia_diseno.puml**: Secuencia del UC-06 (Obtener Recomendaciones)
  - Flujo completo con llamadas reales: controller → service → repository → AI
- **colaboracion.puml**: Diagrama de colaboración
  - Interacción entre objetos
- **componentes.puml**: Diagrama de componentes
  - Backend Spring Boot
  - Servicio Python IA
  - PostgreSQL
  - Frontend
- **despliegue.puml**: Diagrama de despliegue
  - Contenedores Docker
  - Redes y volúmenes
  - Puertos de comunicación
- **estados_diseno.puml**: Diagramas de estado de entidades JPA
- **presentacion_15.tex**: Presentación Beamer para PC5

### Ubicación

```
deliverables/semana_15/
├── modelo_diseno.md
├── clases_diseno.puml
├── secuencia_diseno.puml
├── colaboracion.puml
├── componentes.puml
├── despliegue.puml
├── estados_diseno.puml
├── presentacion_15.tex
└── Imagenes/
    └── README.md
```

---

## Semana 16: Examen Final

**Entregable Final - Demo y Planes**

### Documentos Planificados

- **demo.md**: Guía de demostración
  - Escenarios a mostrar
  - Datos de prueba
  - Flujos críticos
  - Qué destacar del sistema IA
- **plan_pruebas.md**: Plan completo de pruebas
  - Pruebas unitarias (JUnit)
  - Pruebas de integración (Postman)
  - Pruebas del servicio IA
  - Criterios de aceptación
  - Cobertura >80%
- **plan_despliegue.md**: Plan de despliegue
  - Docker Compose
  - Configuración de producción
  - Variables de entorno
  - Migraciones Flyway
  - Backup de BD
- **plan_configuracion.md**: Plan de administración de configuración
  - Git workflow
  - Branches y estrategia
  - Versionado semántico
  - CI/CD (si aplica)
  - Gestión de dependencias Maven
- **presentacion_16.tex**: Presentación Beamer para final

### Ubicación

```
deliverables/semana_16/
├── demo.md
├── plan_pruebas.md
├── plan_despliegue.md
├── plan_configuracion.md
├── presentacion_16.tex
└── Imagenes/
    └── README.md
```

---

## Semana 17: Sustitutorio

**Plantilla para Subsanación**

### Documento

- **subsanacion.md**: Plantilla para correcciones futuras
  - Estructura para documentar mejoras solicitadas
  - Formato estandarizado

### Ubicación

```
deliverables/semana_17/
├── subsanacion.md
└── Imagenes/
    └── README.md
```

---

## Formatos de Entregables

### Documentos en Markdown (.md)

Todos los documentos principales están en formato Markdown para facilitar la edición, versionado y conversión posterior.

**Ventajas:**
- Fácil de editar con cualquier editor de texto
- Control de versiones con Git
- Conversión a Word/PDF con Pandoc

**Conversión a Word:**
```bash
pandoc archivo.md -o archivo.docx
```

**Conversión a PDF:**
```bash
pandoc archivo.md -o archivo.pdf --pdf-engine=xelatex
```

### Diagramas en PlantUML (.puml)

Los diagramas están en formato PlantUML para facilitar la generación y versionado.

**Herramientas para visualizar:**

1. **Online:** https://www.plantuml.com/plantuml/uml/
2. **VSCode Extension:** PlantUML (jebbs.plantuml)
3. **CLI:**
   ```bash
   java -jar plantuml.jar diagrama.puml
   ```

**Conversión a imágenes:**
```bash
# PNG
java -jar plantuml.jar -tpng diagrama.puml

# SVG (vectorial, mejor calidad)
java -jar plantuml.jar -tsvg diagrama.puml
```

**Para StarUML XPD (.uml):**

Los diagramas en `.puml` sirven como **referencia visual** para recrearlos en StarUML. El equipo debe:
1. Visualizar el diagrama `.puml` (online o con VSCode)
2. Recrear el diagrama en StarUML manualmente
3. Exportar en formato nativo `.uml` (XPD)

### Presentaciones en LaTeX Beamer (.tex)

Las presentaciones siguen un formato estandarizado con el template proporcionado.

**Compilación:**

```bash
cd deliverables/semana_XX
pdflatex presentacion_XX.tex
```

**Compilación completa (con bibliografía):**

```bash
pdflatex presentacion_XX.tex
biber presentacion_XX
pdflatex presentacion_XX.tex
pdflatex presentacion_XX.tex
```

**Herramientas recomendadas:**
- **Overleaf:** Editor LaTeX online
- **TeX Live:** Distribución LaTeX local (Windows/Linux/Mac)
- **MiKTeX:** Distribución LaTeX para Windows

---

## Instrucciones de Uso

### Para Ver Diagramas PlantUML

**Opción 1: Online (Más Rápido)**

1. Ir a: https://www.plantuml.com/plantuml/uml/
2. Copiar el contenido del archivo `.puml`
3. Pegar en el editor y ver el resultado

**Opción 2: VSCode (Recomendado para desarrollo)**

1. Instalar extensión "PlantUML" de jebbs
2. Abrir el archivo `.puml`
3. Presionar `Alt+D` para vista previa

**Opción 3: Línea de comandos**

```bash
java -jar plantuml.jar diagrama.puml
# Genera diagrama.png
```

### Para Compilar Presentaciones LaTeX

**Windows:**

```powershell
cd "D:\02.Estudios\1.UNI\CC341 IS\CICLO ACTUAL\Grupo 6.2\deliverables\semana_07"
pdflatex presentacion_07.tex
```

**Linux/Mac:**

```bash
cd deliverables/semana_07
pdflatex presentacion_07.tex
```

**Nota:** La primera compilación puede generar advertencias sobre bibliografía vacía o referencias indefinidas. Esto es normal.

### Para Convertir MD a Word

```bash
pandoc archivo.md -o archivo.docx \
  --reference-doc=plantilla.docx \
  --toc
```

---

## Estadísticas del Proyecto

### Documentos Generados

| Tipo | Cantidad | Páginas Estimadas |
|------|----------|-------------------|
| Markdown (.md) | 30+ | 200+ |
| PlantUML (.puml) | 20+ | 40+ diagramas |
| LaTeX Beamer (.tex) | 6 | 150+ slides |
| **Total** | **56+** | **350+** |

### Líneas de Contenido

- **Documentación MD:** >15,000 líneas
- **Diagramas PlantUML:** >3,000 líneas
- **Presentaciones LaTeX:** >2,000 líneas
- **Total:** >20,000 líneas de contenido académico

---

## Equipo y Responsabilidades

**Grupo 6:**
- Delgado R., G.
- Osorio M., A.
- Rojas A., J.
- Torres R., J.
- Valverde G., Y.
- Villanueva A., F.

**Responsabilidades del equipo:**
- Revisar y validar todos los documentos generados
- Convertir `.md` a Word cuando sea necesario
- Recrear diagramas `.puml` en StarUML XPD (`.uml`)
- Compilar presentaciones LaTeX
- Agregar imágenes reales a las carpetas `Imagenes/`
- Reemplazar `example-image` por imágenes reales en presentaciones

---

## Referencias y Recursos

### Herramientas

- **PlantUML:** https://plantuml.com/
- **LaTeX Beamer:** https://www.overleaf.com/learn/latex/Beamer
- **Pandoc:** https://pandoc.org/
- **StarUML:** https://staruml.io/

### Estándares

- **C4 Model:** https://c4model.com/
- **UML:** https://www.uml.org/
- **BPMN:** https://www.bpmn.org/

### Conceptos Técnicos

- **Embeddings:** https://en.wikipedia.org/wiki/Word_embedding
- **Cosine Similarity:** https://en.wikipedia.org/wiki/Cosine_similarity
- **Sentence Transformers:** https://www.sbert.net/

---

## Notas Finales

Este conjunto de entregables representa el trabajo académico completo del proyecto BookMate para el curso CC341 - Ingeniería de Software.

**Puntos clave:**
- ✅ Separación clara entre análisis (S7-11) y diseño (S13-16)
- ✅ Documentación completa y trazable
- ✅ Formato flexible (MD + PlantUML) para adaptación
- ✅ Enfoque en sistema de recomendaciones con IA
- ✅ Calidad académica profesional

**Próximos pasos:**
1. Completar documentos pendientes de Semanas 13-17
2. Generar presentaciones faltantes
3. Compilar todos los LaTeX y verificar PDFs
4. Agregar imágenes reales
5. Preparar demo final

---

**Versión:** 1.0  
**Última actualización:** Noviembre 2025  
**Grupo 6** - Universidad Nacional de Ingeniería

