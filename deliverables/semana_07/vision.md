# Visión del Producto - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Octubre 2025  

---

## 1. Declaración de la Visión

> **BookMate será la plataforma líder en gestión y descubrimiento inteligente de libros académicos, transformando la manera en que estudiantes y profesionales encuentran contenido relevante mediante el poder de la inteligencia artificial y el análisis semántico.**

---

## 2. Problema a Resolver

### 2.1 Situación Actual

Los estudiantes universitarios y profesionales que buscan libros académicos enfrentan múltiples desafíos:

#### 🔍 **Búsqueda Ineficiente**
- Los catálogos tradicionales solo buscan coincidencias exactas de palabras clave
- No comprenden el significado o contexto de las consultas
- Requieren conocer títulos o autores específicos de antemano

#### 📚 **Sobrecarga de Información**
- Existen miles de libros académicos en diversas áreas
- Difícil identificar cuáles son realmente relevantes para las necesidades específicas
- Inversión de tiempo significativa en exploración manual

#### 🎯 **Recomendaciones Superficiales**
- Los sistemas actuales sugieren libros basándose únicamente en:
  - Género (limitado a categorías generales)
  - Autor (solo útil si ya conoces autores relevantes)
  - Popularidad (no necesariamente relevante para necesidades específicas)
- No consideran el contenido real ni la similitud temática profunda

#### 💡 **Falta de Comprensión Semántica**
- Los sistemas no "entienden" de qué tratan los libros
- No pueden identificar libros con contenido similar pero diferente terminología
- Imposibilidad de descubrir contenido relacionado en áreas adyacentes

### 2.2 Impacto del Problema

- **Tiempo perdido**: Estudiantes dedican horas buscando libros relevantes
- **Oportunidades perdidas**: Libros útiles pasan desapercibidos por búsquedas limitadas
- **Frustración**: Dificultad para encontrar material de calidad para investigación o estudio
- **Ineficiencia académica**: Recursos no aprovechados en bibliotecas

---

## 3. Solución Propuesta

### 3.1 ¿Qué es BookMate?

BookMate es un **sistema inteligente de gestión y recomendación de libros académicos** que utiliza **inteligencia artificial** y **procesamiento de lenguaje natural** para comprender el contenido semántico de los libros y proporcionar recomendaciones altamente relevantes y personalizadas.

### 3.2 Características Principales

#### 🤖 **Recomendaciones Inteligentes con IA**

**¿Cómo funciona?**
1. El sistema analiza las sinopsis de los libros usando modelos de lenguaje natural
2. Genera representaciones vectoriales (embeddings) que capturan el significado semántico
3. Calcula similitud entre libros mediante distancia de coseno
4. Sugiere los 6 libros más similares temáticamente

**Ventaja:** Encuentra libros con contenido similar **incluso si no comparten género, autor o palabras clave**.

#### 📊 **Sistema Híbrido**

**Recomendaciones Heurísticas** (backup):
- Basadas en reglas y metadatos estructurados
- Consideran: género, autor, tags, precio, rating
- Activación automática si el servicio de IA no está disponible

**Ventaja:** Garantiza siempre recomendaciones, incluso sin IA.

#### 🔎 **Búsqueda Avanzada**

- Búsqueda por título, autor y género
- Filtrado por precio y otros criterios
- Resultados ordenados por relevancia
- Respuesta rápida (<1 segundo)

#### ⚙️ **Gestión Completa del Catálogo**

- **CRUD de libros**: Crear, leer, actualizar, eliminar
- **CRUD de autores**: Gestión independiente de autores
- **Panel de administración**: Interfaz dedicada para gestores
- **Importación/Exportación**: Soporte CSV (en prototipo)

#### 📱 **Interfaz Intuitiva**

- Diseño responsive (móvil, tablet, desktop)
- Navegación simple (<5 clicks para tareas comunes)
- Vista de catálogo con imágenes de portadas
- Detalles completos de cada libro

---

## 4. Usuarios Objetivo

### 4.1 Perfiles de Usuario

#### 👨‍🎓 **Estudiantes Universitarios**
- **Necesidad**: Encontrar libros para proyectos, tesis o aprendizaje autodirigido
- **Uso**: Búsqueda y exploración de recomendaciones
- **Beneficio**: Descubrir libros relevantes que no conocían

#### 👩‍🏫 **Profesores e Investigadores**
- **Necesidad**: Encontrar bibliografía para cursos o investigación
- **Uso**: Búsqueda avanzada y recomendaciones temáticas
- **Beneficio**: Identificar rápidamente literatura relacionada

#### 📚 **Bibliotecarios**
- **Necesidad**: Gestionar catálogos y ayudar a usuarios
- **Uso**: Administración del catálogo (CRUD)
- **Beneficio**: Herramientas eficientes para mantener el catálogo actualizado

### 4.2 Escenarios de Uso

#### Escenario 1: Estudiante busca bibliografía para tesis
María está investigando sobre "arquitectura de microservicios". Ingresa un libro conocido sobre el tema y BookMate le recomienda 6 libros relacionados que cubren:
- Patrones de diseño distribuido
- Docker y contenedores
- Event-driven architecture
- Domain-driven design

**Resultado:** María descubre 4 libros que no conocía pero que son altamente relevantes para su tesis.

#### Escenario 2: Profesor prepara curso nuevo
El profesor García necesita bibliografía para un curso de IA. Busca "machine learning" y explora las recomendaciones basadas en varios libros. BookMate sugiere libros complementarios sobre:
- Deep learning
- Procesamiento de lenguaje natural
- Redes neuronales
- Matemáticas para ML

**Resultado:** El profesor arma una bibliografía completa y coherente en 20 minutos.

#### Escenario 3: Bibliotecario actualiza catálogo
El bibliotecario Juan recibe 50 nuevos libros. Usa el panel de administración para:
1. Agregar los libros al catálogo
2. Asignar metadatos (género, autor, precio)
3. Verificar que las recomendaciones funcionen

**Resultado:** Catálogo actualizado en 1 hora, con recomendaciones funcionando automáticamente.

---

## 5. Valor Diferencial (Unique Selling Points)

### ¿Por qué BookMate es diferente?

| Característica | Sistemas Tradicionales | BookMate |
|----------------|------------------------|----------|
| **Búsqueda** | Coincidencia exacta de texto | Comprensión semántica con NLP |
| **Recomendaciones** | Basadas en género/autor | Análisis de contenido con IA |
| **Descubrimiento** | Requiere conocer títulos/autores | Sugerencias basadas en similitud temática |
| **Precisión** | Variable (~40-50%) | Alta (>70% objetivo) |
| **Rendimiento** | Variable | <3 segundos para recomendaciones IA |
| **Fiabilidad** | Depende de un solo método | Sistema híbrido (IA + heurísticas) |

### Ventajas Competitivas

1. **Comprensión Profunda**: Analiza el contenido real, no solo metadatos
2. **Descubrimiento Serendípico**: Encuentra libros que el usuario no buscaría activamente
3. **Confiabilidad**: Siempre proporciona recomendaciones (fallback a heurísticas)
4. **Enfoque Académico**: Diseñado específicamente para libros técnicos y académicos
5. **Velocidad**: Respuestas rápidas incluso con algoritmos de IA

---

## 6. Beneficios para Stakeholders

### Para Estudiantes
- ⏱️ **Ahorro de tiempo**: Reducción de 70% en tiempo de búsqueda de bibliografía
- 📖 **Mejor cobertura**: Descubrimiento de libros relevantes que no conocían
- 🎯 **Mayor relevancia**: Recomendaciones basadas en contenido real, no solo género

### Para Profesores
- 📚 **Bibliografías completas**: Identificación rápida de literatura relacionada
- 🔍 **Exploración eficiente**: Navegación temática del catálogo
- 📝 **Preparación de cursos**: Selección de bibliografía en menos tiempo

### Para Bibliotecarios
- ⚙️ **Gestión eficiente**: Herramientas CRUD intuitivas
- 📊 **Mejor servicio**: Capacidad de sugerir libros relevantes a usuarios
- 🔄 **Catálogo dinámico**: Fácil mantenimiento y actualización

### Para la Institución
- 💰 **Mejor ROI**: Mayor utilización de recursos bibliográficos existentes
- 📈 **Satisfacción de usuarios**: Experiencia mejorada en biblioteca
- 🏆 **Innovación**: Adopción de tecnologías de IA en servicios académicos

---

## 7. Alcance de la Visión

### 7.1 Fase 1 (Proyecto Actual - Semanas 7-16)

**Objetivo:** Sistema funcional básico con recomendaciones IA

✅ **Incluye:**
- CRUD completo de libros y autores
- Búsqueda y filtrado
- Recomendaciones heurísticas
- Recomendaciones con IA (servicio Python separado)
- Interfaz web responsive
- Panel de administración
- Prototipo funcional para demo

❌ **No incluye:**
- Autenticación real de usuarios
- Sistema de compras
- Integración con bibliotecas externas
- Reseñas y calificaciones
- Aplicación móvil nativa

### 7.2 Visión Futura (Post-proyecto)

**Posibles extensiones:**

1. **Personalización Avanzada**
   - Perfiles de usuario con historial de búsqueda
   - Recomendaciones basadas en lectura previa
   - Machine learning para mejorar sugerencias con el tiempo

2. **Funcionalidades Sociales**
   - Sistema de reseñas y calificaciones
   - Listas de lectura compartidas
   - Comentarios y discusiones sobre libros

3. **Integración Externa**
   - APIs de bibliotecas universitarias
   - Sincronización con Google Books, GoodReads
   - Disponibilidad en tiempo real de libros físicos

4. **Análisis Avanzado**
   - Dashboard de estadísticas de uso
   - Análisis de tendencias de lectura
   - Reportes para bibliotecarios

5. **Multilingüe**
   - Soporte para libros en varios idiomas
   - Recomendaciones cross-language
   - Interfaz traducida

---

## 8. Principios de Diseño

### 8.1 Experiencia de Usuario

1. **Simplicidad**: Menos de 5 clicks para cualquier tarea común
2. **Velocidad**: Respuestas instantáneas (<1s búsqueda, <3s IA)
3. **Claridad**: Interfaz intuitiva sin necesidad de tutorial
4. **Accesibilidad**: Diseño responsive para cualquier dispositivo

### 8.2 Arquitectura Técnica

1. **Modularidad**: Microservicios independientes (Backend + IA)
2. **Escalabilidad**: Arquitectura preparada para crecer
3. **Fiabilidad**: Sistema híbrido con fallbacks
4. **Mantenibilidad**: Código limpio, documentado y probado

### 8.3 Calidad

1. **Precisión**: >70% de relevancia en recomendaciones
2. **Cobertura**: >80% de cobertura de pruebas
3. **Disponibilidad**: 95% de uptime objetivo
4. **Rendimiento**: Cumplimiento de SLAs de respuesta

---

## 9. Medición del Éxito

### Indicadores Clave de Desempeño (KPIs)

| Métrica | Objetivo | Medición |
|---------|----------|----------|
| **Tiempo de respuesta búsqueda** | <1 segundo (p95) | Logs de servidor |
| **Tiempo de respuesta IA** | <3 segundos (p95) | Logs de servicio IA |
| **Precisión recomendaciones** | >70% relevantes | Evaluación manual |
| **Cobertura de pruebas** | >80% | Herramientas de testing |
| **Usabilidad** | <5 clicks tareas comunes | Testing de usabilidad |
| **Disponibilidad** | 95% uptime | Monitoreo de servidor |

### Criterios de Aceptación del Proyecto

El producto cumplirá la visión si:

1. ✅ Sistema de recomendaciones IA funciona correctamente
2. ✅ CRUD completo implementado y probado
3. ✅ Interfaz responsive y usable en móviles
4. ✅ Métricas de rendimiento cumplidas
5. ✅ Demo exitosa con escenarios reales

---

## 10. Conclusión

BookMate representa una evolución significativa en la gestión de catálogos bibliográficos, transformando la búsqueda pasiva de libros en un **descubrimiento activo e inteligente** mediante el uso de inteligencia artificial y procesamiento de lenguaje natural.

Al comprender el contenido semántico de los libros, BookMate permite a estudiantes y profesionales descubrir contenido relevante que de otra manera pasaría desapercibido, maximizando el aprovechamiento de recursos bibliográficos existentes y mejorando significativamente la eficiencia de la investigación académica.

**Esta visión guiará todas las decisiones de diseño e implementación del proyecto.**

---

**Versión:** 1.0  
**Última actualización:** Octubre 2025  
**Grupo 6** - Universidad Nacional de Ingeniería

