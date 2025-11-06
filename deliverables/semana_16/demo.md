# Guía de Demostración - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Noviembre 2025  
**Versión:** 1.0  

---

## 1. Introducción

Esta guía describe los escenarios de demostración del sistema BookMate para la entrega final (Semana 16). La demo tiene una duración estimada de 10-15 minutos y cubre los flujos críticos del sistema, con especial énfasis en el sistema de recomendaciones con inteligencia artificial.

### 1.1 Objetivo de la Demo

Demostrar que el sistema BookMate:
- ✅ Funciona correctamente con todas sus funcionalidades core
- ✅ Genera recomendaciones inteligentes con IA
- ✅ Tiene fallback automático a heurísticas
- ✅ Es fácil de usar y responsive
- ✅ Cumple con los requisitos de rendimiento

### 1.2 Preparación Previa

**Requisitos:**
- Docker y Docker Compose instalados
- Navegador moderno (Chrome, Firefox, Edge)
- Sistema ejecutándose en `http://localhost:8080`
- Servicio IA funcionando en `http://localhost:5000`
- Base de datos PostgreSQL con datos de prueba

**Datos de prueba:**
- Mínimo 30 libros en la base de datos
- Al menos 5 autores
- Embeddings generados para al menos 20 libros
- 2 usuarios de prueba (usuario estándar y admin)

---

## 2. Escenarios de Demostración

### 2.1 Escenario 1: Usuario Busca y Obtiene Recomendaciones con IA

**Duración estimada:** 4-5 minutos  
**Objetivo:** Demostrar el flujo principal del sistema: búsqueda y recomendaciones inteligentes

#### Pasos:

1. **Acceso al sistema:**
   - Abrir navegador en `http://localhost:8080`
   - Mostrar página principal
   - Navegar a catálogo de libros

2. **Búsqueda de libros:**
   - Ingresar término de búsqueda (ej: "inteligencia artificial")
   - Mostrar resultados filtrados
   - Seleccionar un libro de los resultados

3. **Visualización de detalles:**
   - Mostrar página de detalles del libro
   - Destacar información: título, autor, sinopsis, tags
   - Explicar que la sinopsis será usada para recomendaciones IA

4. **Solicitud de recomendaciones:**
   - Hacer clic en "Ver libros similares" o "Obtener recomendaciones"
   - Mostrar indicador de carga (spinner)
   - Explicar que el sistema está:
     - Verificando disponibilidad del servicio IA
     - Calculando similitud semántica
     - Generando embeddings si es necesario

5. **Visualización de recomendaciones:**
   - Mostrar lista de 6 libros recomendados
   - Destacar que son recomendaciones basadas en IA
   - Mostrar porcentaje de similitud (si está disponible)
   - Explicar que las recomendaciones se basan en:
     - Similitud semántica de sinopsis
     - Embeddings generados con Sentence Transformers
     - Cálculo de coseno entre vectores

6. **Exploración de recomendaciones:**
   - Seleccionar uno de los libros recomendados
   - Mostrar que también tiene sus propias recomendaciones
   - Demostrar que el sistema es navegable y explorable

**Puntos clave a destacar:**
- ⚡ **Rendimiento:** Tiempo de respuesta <3 segundos
- 🎯 **Precisión:** Recomendaciones relevantes (>70% similitud)
- 🤖 **IA:** Uso de embeddings y similitud semántica
- 🔄 **Navegabilidad:** Exploración continua de recomendaciones

---

### 2.2 Escenario 2: Administrador Gestiona Catálogo (CRUD)

**Duración estimada:** 3-4 minutos  
**Objetivo:** Demostrar funcionalidades administrativas y gestión del catálogo

#### Pasos:

1. **Login como administrador:**
   - Ir a página de login
   - Ingresar credenciales: `admin@bookmate.com` / `admin123`
   - Mostrar que se redirige al panel de administración

2. **Crear nuevo libro:**
   - Hacer clic en "Agregar Libro"
   - Completar formulario con:
     - Título: "Nuevo Libro de Prueba"
     - Autor: Seleccionar de lista o crear nuevo
     - Género: "Informática"
     - Precio: 45.99
     - Sinopsis: "Descripción detallada del libro..."
     - Tags: "programación", "algoritmos", "estructuras de datos"
   - Guardar libro
   - Mostrar confirmación

3. **Verificar generación de embedding:**
   - Explicar que al crear el libro, el sistema automáticamente:
     - Notifica al servicio IA
     - Genera embedding de la sinopsis
     - Almacena el embedding en la base de datos
   - Verificar en logs o base de datos que el embedding fue generado

4. **Editar libro existente:**
   - Seleccionar un libro de la lista
   - Hacer clic en "Editar"
   - Modificar la sinopsis
   - Guardar cambios
   - Explicar que el sistema regenerará el embedding automáticamente

5. **Eliminar libro:**
   - Seleccionar un libro
   - Hacer clic en "Eliminar"
   - Confirmar eliminación
   - Verificar que el libro desaparece del catálogo

6. **Gestión de autores:**
   - Navegar a sección de autores
   - Crear nuevo autor
   - Asociar libros al autor
   - Mostrar relación autor-libros

**Puntos clave a destacar:**
- ✅ **CRUD completo:** Todas las operaciones funcionan
- 🔄 **Sincronización:** Cambios visibles inmediatamente
- 🤖 **IA integrada:** Generación automática de embeddings
- 🔐 **Seguridad:** Solo administradores pueden gestionar catálogo

---

### 2.3 Escenario 3: Fallback a Heurísticas cuando IA no Disponible

**Duración estimada:** 2-3 minutos  
**Objetivo:** Demostrar resiliencia y alta disponibilidad del sistema

#### Pasos:

1. **Preparación:**
   - Detener el servicio IA (o simular fallo)
   - Explicar que el servicio IA no está disponible

2. **Solicitar recomendaciones:**
   - Seleccionar un libro
   - Hacer clic en "Obtener recomendaciones"
   - Observar que el sistema:
     - Detecta que IA no está disponible
     - Activa automáticamente el modo heurístico
     - No muestra error al usuario

3. **Visualizar recomendaciones heurísticas:**
   - Mostrar lista de 6 libros recomendados
   - Explicar que estas son recomendaciones heurísticas basadas en:
     - Género compartido
     - Autor común
     - Tags compartidos
     - Precio similar
     - Rating alto

4. **Comparar con recomendaciones IA:**
   - Reiniciar servicio IA
   - Solicitar recomendaciones para el mismo libro
   - Comparar resultados
   - Explicar diferencias entre ambos métodos

**Puntos clave a destacar:**
- 🛡️ **Resiliencia:** Sistema siempre funcional
- 🔄 **Fallback automático:** Transparente para el usuario
- ⚡ **Rendimiento:** Heurísticas más rápidas (<1 segundo)
- 🎯 **Disponibilidad:** 100% de disponibilidad de recomendaciones

---

### 2.4 Escenario 4: Biblioteca Personal y Estados de Lectura

**Duración estimada:** 2-3 minutos  
**Objetivo:** Demostrar funcionalidades de usuario personalizadas

#### Pasos:

1. **Login como usuario:**
   - Ingresar credenciales: `demo@bookmate.com` / `demo123`
   - Navegar a "Mi Biblioteca"

2. **Agregar libros a biblioteca:**
   - Buscar y seleccionar varios libros
   - Agregar a biblioteca personal
   - Mostrar que aparecen en "Mi Biblioteca"

3. **Estados de lectura:**
   - Marcar libro como "Para leer"
   - Marcar otro como "Leyendo"
   - Marcar otro como "Leído"
   - Mostrar organización por estados

4. **Recomendaciones personalizadas:**
   - Seleccionar libros favoritos
   - Solicitar recomendaciones personalizadas
   - Mostrar recomendaciones basadas en preferencias

**Puntos clave a destacar:**
- 👤 **Personalización:** Biblioteca personal por usuario
- 📊 **Organización:** Estados de lectura
- 🎯 **Recomendaciones personalizadas:** Basadas en preferencias

---

## 3. Datos de Prueba Sugeridos

### 3.1 Libros de Prueba

**Categoría: Inteligencia Artificial**
- "Inteligencia Artificial: Un Enfoque Moderno" - Stuart Russell
- "Deep Learning" - Ian Goodfellow
- "Pattern Recognition and Machine Learning" - Christopher Bishop
- "Neural Networks and Deep Learning" - Michael Nielsen

**Categoría: Programación**
- "Clean Code" - Robert C. Martin
- "Design Patterns" - Gang of Four
- "The Pragmatic Programmer" - Andrew Hunt
- "Refactoring" - Martin Fowler

**Categoría: Arquitectura de Software**
- "Software Architecture: The Hard Parts" - Neal Ford
- "Building Microservices" - Sam Newman
- "Domain-Driven Design" - Eric Evans
- "Architecture Patterns with Python" - Harry Percival

**Categoría: Bases de Datos**
- "Database Design for Mere Mortals" - Michael J. Hernandez
- "SQL Performance Explained" - Markus Winand
- "PostgreSQL: Up and Running" - Regina Obe

### 3.2 Autores de Prueba

- Stuart Russell
- Ian Goodfellow
- Robert C. Martin
- Eric Evans
- Martin Fowler
- Sam Newman

### 3.3 Usuarios de Prueba

| Email | Contraseña | Rol | Propósito |
|-------|------------|-----|-----------|
| `demo@bookmate.com` | `demo123` | USER | Usuario estándar |
| `admin@bookmate.com` | `admin123` | ADMIN | Administrador |

---

## 4. Flujos Críticos a Destacar

### 4.1 Flujo Crítico 1: Recomendaciones con IA

**Importancia:** ⭐⭐⭐⭐⭐ (Máxima)

**Pasos:**
1. Usuario selecciona libro
2. Sistema verifica disponibilidad de IA
3. Sistema envía sinopsis al servicio IA
4. Servicio IA genera embedding (si no existe)
5. Servicio IA calcula similitud con todos los libros
6. Servicio IA retorna top 6 libros similares
7. Sistema consulta detalles de libros recomendados
8. Sistema muestra recomendaciones al usuario

**Métricas a mostrar:**
- Tiempo de respuesta: <3 segundos
- Precisión: >70% similitud
- Número de recomendaciones: 6 libros

**Qué destacar:**
- 🤖 **Uso de IA:** Embeddings y similitud semántica
- ⚡ **Rendimiento:** Respuesta rápida
- 🎯 **Precisión:** Recomendaciones relevantes
- 🔄 **Automatización:** Generación automática de embeddings

---

### 4.2 Flujo Crítico 2: Fallback a Heurísticas

**Importancia:** ⭐⭐⭐⭐ (Alta)

**Pasos:**
1. Sistema detecta que IA no está disponible
2. Sistema activa automáticamente modo heurístico
3. Sistema calcula puntuaciones para todos los libros
4. Sistema ordena por puntuación descendente
5. Sistema retorna top 6 libros

**Métricas a mostrar:**
- Tiempo de respuesta: <1 segundo
- Disponibilidad: 100%
- Transparencia: Usuario no nota el cambio

**Qué destacar:**
- 🛡️ **Resiliencia:** Sistema siempre funcional
- 🔄 **Fallback automático:** Sin intervención manual
- ⚡ **Rendimiento:** Heurísticas más rápidas
- 🎯 **Disponibilidad:** 100% de tiempo activo

---

### 4.3 Flujo Crítico 3: Generación Automática de Embeddings

**Importancia:** ⭐⭐⭐⭐ (Alta)

**Pasos:**
1. Administrador crea/actualiza libro
2. Sistema notifica al servicio IA
3. Servicio IA genera embedding de la sinopsis
4. Servicio IA almacena embedding en base de datos
5. Embedding queda disponible para recomendaciones

**Métricas a mostrar:**
- Tiempo de generación: <2 segundos
- Automatización: 100% automático
- Disponibilidad: Embedding listo para uso inmediato

**Qué destacar:**
- 🤖 **IA integrada:** Generación automática
- 🔄 **Sincronización:** Embeddings actualizados automáticamente
- ⚡ **Eficiencia:** Embeddings precalculados para búsquedas rápidas

---

## 5. Qué Destacar del Sistema IA

### 5.1 Embeddings y Similitud Semántica

**Concepto:**
- Los embeddings son representaciones vectoriales del significado
- Cada libro tiene un vector de 384 dimensiones (modelo all-MiniLM-L6-v2)
- La similitud se calcula usando coseno del ángulo entre vectores

**Ejemplo práctico:**
- Libro A: "Inteligencia Artificial: Un Enfoque Moderno"
- Libro B: "Deep Learning"
- Similitud: 0.87 (87% similar semánticamente)

**Ventajas:**
- Descubre conexiones que no serían evidentes con búsqueda por palabras clave
- Entiende el significado, no solo palabras
- Recomendaciones más relevantes y personalizadas

---

### 5.2 Modelo Sentence Transformers

**Modelo utilizado:** `all-MiniLM-L6-v2`

**Características:**
- Modelo preentrenado
- Optimizado para español e inglés
- Ligero y rápido
- 384 dimensiones por embedding

**Ventajas:**
- No requiere entrenamiento
- Funciona out-of-the-box
- Excelente rendimiento
- Bajo consumo de recursos

---

### 5.3 Cálculo de Similitud

**Algoritmo:** Similitud de coseno

**Fórmula:**
```
similitud = cos(θ) = (A · B) / (||A|| × ||B||)
```

**Proceso:**
1. Obtener embedding del libro de referencia
2. Obtener embeddings de todos los demás libros
3. Calcular similitud de coseno para cada par
4. Ordenar por similitud descendente
5. Seleccionar top 6

**Rendimiento:**
- Cálculo para 100 libros: <1 segundo
- Cálculo para 1000 libros: <3 segundos
- Escalable con índices vectoriales (futuro)

---

## 6. Tiempo Estimado por Escenario

| Escenario | Duración | Prioridad |
|-----------|----------|-----------|
| **Escenario 1:** Recomendaciones con IA | 4-5 min | ⭐⭐⭐⭐⭐ |
| **Escenario 2:** Gestión de catálogo (CRUD) | 3-4 min | ⭐⭐⭐⭐ |
| **Escenario 3:** Fallback a heurísticas | 2-3 min | ⭐⭐⭐⭐ |
| **Escenario 4:** Biblioteca personal | 2-3 min | ⭐⭐⭐ |
| **Total:** | **10-15 min** | |

---

## 7. Checklist Pre-Demo

### 7.1 Verificación Técnica

- [ ] Docker Compose ejecutándose sin errores
- [ ] Backend Spring Boot respondiendo en puerto 8080
- [ ] Servicio IA respondiendo en puerto 5000
- [ ] PostgreSQL funcionando en puerto 5432
- [ ] Health checks pasando para todos los servicios
- [ ] Base de datos con al menos 30 libros
- [ ] Embeddings generados para al menos 20 libros
- [ ] Usuarios de prueba creados

### 7.2 Verificación Funcional

- [ ] Búsqueda de libros funciona
- [ ] Visualización de detalles funciona
- [ ] Recomendaciones con IA funcionan
- [ ] Recomendaciones heurísticas funcionan
- [ ] CRUD de libros funciona (admin)
- [ ] CRUD de autores funciona (admin)
- [ ] Login/logout funciona
- [ ] Biblioteca personal funciona

### 7.3 Verificación de Rendimiento

- [ ] Búsqueda de libros: <1 segundo
- [ ] Recomendaciones IA: <3 segundos
- [ ] Recomendaciones heurísticas: <1 segundo
- [ ] Carga de página: <2 segundos

---

## 8. Puntos de Énfasis Durante la Demo

### 8.1 Sistema de Recomendaciones IA

**Mensaje clave:** "BookMate utiliza inteligencia artificial para entender el significado de los libros y recomendar contenido semánticamente similar."

**Qué mostrar:**
- Embeddings generados automáticamente
- Cálculo de similitud en tiempo real
- Recomendaciones relevantes y precisas
- Comparación con búsqueda tradicional

---

### 8.2 Alta Disponibilidad

**Mensaje clave:** "El sistema siempre retorna recomendaciones, incluso si el servicio IA falla, gracias al fallback automático a heurísticas."

**Qué mostrar:**
- Fallback automático transparente
- Sin errores para el usuario
- Sistema siempre funcional

---

### 8.3 Arquitectura de Microservicios

**Mensaje clave:** "Arquitectura moderna con microservicios separados para escalabilidad y mantenibilidad."

**Qué mostrar:**
- Docker Compose con 3 servicios
- Comunicación entre servicios
- Escalabilidad independiente

---

## 9. Posibles Preguntas y Respuestas

### P: ¿Cómo funciona el sistema de recomendaciones con IA?

**R:** El sistema utiliza Sentence Transformers para generar embeddings (vectores numéricos) de las sinopsis de los libros. Luego calcula la similitud de coseno entre el embedding del libro de referencia y todos los demás libros, retornando los 6 más similares.

---

### P: ¿Qué pasa si el servicio IA falla?

**R:** El sistema detecta automáticamente que el servicio IA no está disponible y activa el modo heurístico. Las recomendaciones se generan basándose en género, autor, tags, precio y rating. El usuario no nota la diferencia, garantizando 100% de disponibilidad.

---

### P: ¿Cuánto tiempo tarda en generar recomendaciones?

**R:** Las recomendaciones con IA tardan menos de 3 segundos (p95). Las recomendaciones heurísticas tardan menos de 1 segundo. Ambos métodos cumplen con los requisitos de rendimiento.

---

### P: ¿Cómo se generan los embeddings?

**R:** Cuando se crea o actualiza un libro, el sistema automáticamente envía la sinopsis al servicio IA, que genera el embedding usando Sentence Transformers y lo almacena en la base de datos para uso futuro.

---

### P: ¿Qué tan precisas son las recomendaciones?

**R:** Las recomendaciones con IA tienen una precisión superior al 70% en términos de similitud semántica. Las recomendaciones heurísticas son más rápidas pero menos precisas, por lo que se usan como fallback.

---

## 10. Conclusión

Esta guía de demostración cubre los escenarios críticos del sistema BookMate, con especial énfasis en el sistema de recomendaciones con inteligencia artificial. La demo demuestra que el sistema:

- ✅ Funciona correctamente con todas sus funcionalidades
- ✅ Genera recomendaciones inteligentes con IA
- ✅ Tiene alta disponibilidad con fallback automático
- ✅ Cumple con requisitos de rendimiento
- ✅ Es fácil de usar y navegable

**Duración total estimada:** 10-15 minutos

---

**Versión:** 1.0  
**Última actualización:** Noviembre 2025  
**Grupo 6** - Universidad Nacional de Ingeniería

