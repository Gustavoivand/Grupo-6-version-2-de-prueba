# Glosario de Términos Técnicos - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Octubre 2025  

---

## Introducción

Este glosario define los términos técnicos, acrónimos y conceptos clave utilizados en el proyecto BookMate. El documento está organizado alfabéticamente para facilitar la consulta.

---

## A

### API (Application Programming Interface)
Interfaz de programación de aplicaciones que permite que diferentes componentes de software se comuniquen entre sí mediante un conjunto definido de reglas y protocolos.

**Contexto en BookMate:** El backend expone una API REST para que el frontend consulte libros y obtenga recomendaciones.

### Arquitectura C4
Modelo de documentación de arquitectura de software en 4 niveles de abstracción:
- **C1 (Contexto):** Vista general del sistema y sus usuarios
- **C2 (Contenedores):** Aplicaciones y servicios que componen el sistema
- **C3 (Componentes):** Módulos internos de cada contenedor
- **C4 (Código):** Clases y elementos de código específicos

**Contexto en BookMate:** Se utiliza para documentar la arquitectura desde el nivel conceptual hasta el nivel de implementación.

---

## B

### Biblioteca Personal
Colección de libros organizados por estado de lectura. En el contexto académico, representa el conjunto de libros que un usuario tiene en su catálogo personal.

**Estados típicos:**
- Por Leer
- Leyendo
- Leído

### BPMN (Business Process Model and Notation)
Notación gráfica estándar para modelar procesos de negocio mediante diagramas de flujo.

**Contexto en BookMate:** Se utiliza para modelar el proceso de recomendación de libros y gestión del catálogo.

---

## C

### Caso de Uso
Descripción de una funcionalidad del sistema desde la perspectiva del usuario, especificando quién la usa (actor), qué se logra (objetivo) y cómo se ejecuta (flujo).

**Ejemplo en BookMate:** "UC-06: Obtener Recomendaciones de Libros"

### Coseno (Similitud)
Métrica matemática que mide la similitud entre dos vectores calculando el coseno del ángulo entre ellos.

**Fórmula:** `cos(θ) = (A · B) / (||A|| × ||B||)`

**Rango:** -1 a 1, donde:
- 1 = máxima similitud (vectores idénticos)
- 0 = sin similitud (vectores perpendiculares)
- -1 = opuestos

**Contexto en BookMate:** Se utiliza para calcular la similitud entre embeddings de libros y generar recomendaciones.

### CRC (Class-Responsibility-Collaboration)
Técnica de diseño orientado a objetos que documenta:
- **Class:** Nombre de la clase
- **Responsibilities:** Responsabilidades/funciones de la clase
- **Collaborators:** Otras clases con las que interactúa

### CRUD
Acrónimo de las cuatro operaciones básicas de persistencia:
- **C**reate (Crear)
- **R**ead (Leer)
- **U**pdate (Actualizar)
- **D**elete (Eliminar)

**Contexto en BookMate:** El sistema proporciona CRUD completo para libros y autores.

---

## D

### Diagrama de Robustez
Diagrama UML que muestra la interacción entre tres tipos de objetos:
- **Boundary (Frontera):** Interfaces de usuario o APIs
- **Control (Control):** Lógica de negocio
- **Entity (Entidad):** Objetos de datos/dominio

**Contexto en BookMate:** Se utiliza en la fase de análisis para validar casos de uso.

### Distancia de Coseno
Medida de disimilitud complementaria a la similitud de coseno.

**Fórmula:** `distancia = 1 - similitud_coseno`

**Rango:** 0 (idénticos) a 2 (opuestos)

---

## E

### Embeddings
Representaciones vectoriales densas de texto que capturan significado semántico. Los embeddings transforman palabras, frases o documentos en vectores numéricos de dimensión fija (típicamente 256-768 dimensiones).

**Ventaja:** Textos con significado similar tienen embeddings cercanos en el espacio vectorial, incluso si usan palabras diferentes.

**Contexto en BookMate:** Las sinopsis de libros se convierten en embeddings para calcular similitud semántica.

---

## H

### Heurística
Técnica de resolución de problemas basada en reglas prácticas, experiencia y conocimiento del dominio, en lugar de algoritmos exactos o garantías matemáticas.

**Contexto en BookMate:** Las recomendaciones heurísticas se basan en reglas como:
- Mismo género → mayor relevancia
- Mismo autor → alta similitud
- Tags compartidos → contenido relacionado
- Rango de precio similar

---

## I

### Inteligencia Artificial (IA)
Campo de la informática que desarrolla sistemas capaces de realizar tareas que normalmente requieren inteligencia humana, como comprender lenguaje natural, reconocer patrones y tomar decisiones.

**Subcampos relevantes:**
- Machine Learning (Aprendizaje Automático)
- Deep Learning (Aprendizaje Profundo)
- Natural Language Processing (Procesamiento de Lenguaje Natural)

**Contexto en BookMate:** Se utiliza IA para analizar sinopsis y generar recomendaciones basadas en similitud semántica.

---

## J

### JWT (JSON Web Token)
Estándar abierto (RFC 7519) para transmitir información de forma segura entre partes como un objeto JSON. Se utiliza típicamente para autenticación y autorización.

**Estructura:** `header.payload.signature`

**Contexto en BookMate:** Planeado para autenticación en versiones futuras (fuera del alcance actual).

---

## M

### Metadatos
Datos que describen otros datos. En el contexto de libros, incluyen:
- Título
- Autor
- ISBN
- Año de publicación
- Género
- Editorial
- Número de páginas
- Sinopsis
- Tags

**Contexto en BookMate:** Los metadatos se utilizan tanto para búsqueda como para recomendaciones heurísticas.

### Microservicio
Estilo arquitectónico que estructura una aplicación como una colección de servicios pequeños, independientes y desplegables por separado.

**Características:**
- Autonomía operacional
- Responsabilidad única
- Comunicación mediante APIs
- Despliegue independiente

**Contexto en BookMate:** El sistema se divide en Backend principal (gestión de libros) y Servicio IA (recomendaciones).

### Modelo Preentrenado
Modelo de machine learning entrenado previamente en grandes corpus de texto. Se puede usar directamente o ajustarse (fine-tuning) para tareas específicas.

**Ventaja:** No requiere entrenamiento desde cero, ahorrando tiempo y recursos computacionales.

**Contexto en BookMate:** Se utilizará un modelo Sentence Transformers preentrenado para generar embeddings.

---

## N

### NLP (Natural Language Processing)
Procesamiento de Lenguaje Natural. Campo de la IA que permite que las máquinas comprendan, interpreten y generen lenguaje humano.

**Tareas comunes:**
- Análisis de sentimiento
- Traducción automática
- Extracción de información
- Generación de embeddings

**Contexto en BookMate:** NLP se utiliza para analizar sinopsis y generar representaciones semánticas.

---

## P

### Prototipo UC (Use Case Prototype)
Versión simplificada del sistema que demuestra los casos de uso principales, utilizada para validación temprana de requisitos.

**Contexto en BookMate:** El frontend estático actual sirve como prototipo UC.

---

## R

### Recomendaciones Heurísticas
Sugerencias de libros basadas en reglas predefinidas y metadatos estructurados, sin uso de inteligencia artificial.

**Criterios típicos:**
- Género compartido
- Autor común
- Tags similares
- Rango de precio similar
- Rating alto

**Ventaja:** Rápidas, predecibles y no requieren IA.

**Contexto en BookMate:** Funcionan como fallback cuando el servicio IA no está disponible.

### Recomendaciones IA
Sugerencias de libros generadas mediante algoritmos de inteligencia artificial basados en similitud semántica del contenido.

**Proceso:**
1. Generar embeddings de sinopsis
2. Calcular similitud de coseno
3. Retornar los N libros más similares

**Ventaja:** Encuentra libros relacionados por contenido, no solo por metadatos.

**Contexto en BookMate:** Es el método principal de recomendación (con fallback a heurísticas).

### REST (Representational State Transfer)
Estilo arquitectónico para diseñar APIs web basado en HTTP, utilizando métodos estándar (GET, POST, PUT, DELETE) y representaciones JSON.

**Principios:**
- Sin estado (stateless)
- Cliente-servidor
- Cacheable
- Interfaz uniforme

**Contexto en BookMate:** El backend expone una API REST para el frontend.

---

## S

### Sentence Transformers
Biblioteca de Python y conjunto de modelos preentrenados que generan embeddings de alta calidad para oraciones y textos.

**Modelos populares:**
- `all-MiniLM-L6-v2` (rápido, 384 dims)
- `all-mpnet-base-v2` (mejor calidad, 768 dims)

**Contexto en BookMate:** Se utilizará en el servicio IA para generar embeddings de sinopsis.

### Similitud Semántica
Medida de qué tan parecidos son dos textos en significado, independientemente de las palabras exactas utilizadas.

**Ejemplo:**
- "El perro está corriendo" vs "El can está trotando" → Alta similitud semántica
- "El perro está corriendo" vs "La casa es azul" → Baja similitud semántica

**Contexto en BookMate:** Base del sistema de recomendaciones IA.

### Sinopsis
Resumen breve del contenido de un libro, típicamente de 100-500 palabras.

**Contexto en BookMate:** Las sinopsis se analizan mediante IA para generar recomendaciones basadas en contenido.

### SRS (Software Requirements Specification)
Documento que define de manera completa y detallada qué debe hacer el sistema (requisitos funcionales y no funcionales), restricciones, interfaces y criterios de aceptación.

**Estructura típica:**
- Introducción
- Descripción general
- Requisitos funcionales
- Requisitos no funcionales
- Interfaces
- Restricciones

**Contexto en BookMate:** El SRS se desarrolla en la Semana 8.

---

## T

### Tag (Etiqueta)
Palabra clave que describe un tema, característica o concepto relacionado con un libro.

**Ejemplos:** "machine-learning", "arquitectura", "programación", "matemáticas"

**Uso:**
- Facilitar búsqueda y filtrado
- Mejorar recomendaciones heurísticas
- Clasificación temática

### Transformers
Arquitectura de redes neuronales (Vaswani et al., 2017) especialmente efectiva para tareas de NLP. Utiliza mecanismos de atención para capturar relaciones contextuales en secuencias de texto.

**Modelos famosos:** BERT, GPT, T5, RoBERTa

**Contexto en BookMate:** Sentence Transformers está basado en esta arquitectura.

---

## U

### UC (Use Case)
Abreviatura de "Caso de Uso". Ver: Caso de Uso.

### UML (Unified Modeling Language)
Lenguaje de modelado gráfico estándar para especificar, visualizar, construir y documentar sistemas software.

**Diagramas relevantes:**
- Casos de uso
- Clases
- Secuencia
- Componentes
- Despliegue
- Estados

---

## V

### Vector
Estructura de datos que representa información como una lista ordenada de números. En machine learning, los vectores representan características (features) de datos.

**Contexto en BookMate:** Los embeddings son vectores de alta dimensionalidad (256-768 dimensiones) que representan el significado de las sinopsis.

---

## Acrónimos y Abreviaturas

| Sigla | Significado |
|-------|-------------|
| API | Application Programming Interface |
| BPMN | Business Process Model and Notation |
| C4 | Contexto, Contenedores, Componentes, Código |
| CRC | Class-Responsibility-Collaboration |
| CRUD | Create, Read, Update, Delete |
| HTTP | Hypertext Transfer Protocol |
| IA | Inteligencia Artificial |
| JSON | JavaScript Object Notation |
| JWT | JSON Web Token |
| ML | Machine Learning |
| NLP | Natural Language Processing |
| RF | Requisito Funcional |
| RNF | Requisito No Funcional |
| REST | Representational State Transfer |
| SRS | Software Requirements Specification |
| UC | Use Case (Caso de Uso) |
| UI | User Interface |
| UML | Unified Modeling Language |
| UNI | Universidad Nacional de Ingeniería |

---

## Referencias y Recursos

### Libros y Artículos
- Vaswani et al. (2017). "Attention is All You Need"
- Reimers & Gurevych (2019). "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks"

### Bibliotecas y Herramientas
- **Sentence Transformers:** https://www.sbert.net/
- **PlantUML:** https://plantuml.com/
- **UML:** https://www.uml.org/

### Conceptos de IA
- **Embeddings:** https://en.wikipedia.org/wiki/Word_embedding
- **Cosine Similarity:** https://en.wikipedia.org/wiki/Cosine_similarity
- **Transformers:** https://en.wikipedia.org/wiki/Transformer_(machine_learning_model)

---

**Versión:** 1.0  
**Última actualización:** Octubre 2025  
**Grupo 6** - Universidad Nacional de Ingeniería

---

## Nota para el Equipo

Este glosario es un documento vivo. A medida que el proyecto avanza y se introducen nuevos términos técnicos, este documento debe actualizarse para mantener una referencia completa y actualizada.

