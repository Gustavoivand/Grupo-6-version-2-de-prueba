# Charter del Proyecto BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Ciclo:** 2025-2  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Octubre 2025  

---

## 1. Propósito del Proyecto

El proyecto BookMate tiene como propósito desarrollar un sistema de gestión y recomendación de libros académicos que utilice inteligencia artificial para sugerir lecturas personalizadas basándose en el análisis semántico del contenido, preferencias del usuario y patrones de lectura.

### Objetivos Principales

1. **Facilitar el descubrimiento de libros académicos** mediante un sistema de búsqueda y exploración intuitivo
2. **Proporcionar recomendaciones personalizadas** utilizando algoritmos de inteligencia artificial basados en similitud semántica
3. **Permitir la gestión eficiente del catálogo** con operaciones CRUD completas para administradores
4. **Ofrecer una experiencia de usuario fluida** mediante una interfaz web responsive y moderna

---

## 2. Visión del Producto

BookMate será la plataforma de referencia para la gestión y descubrimiento de libros académicos en entornos educativos, distinguiéndose por su capacidad de comprender el contenido semántico de los libros y proporcionar recomendaciones altamente relevantes que vayan más allá de simples coincidencias de género o autor.

### Valor Diferencial

- **Recomendaciones con IA**: Utilización de modelos de procesamiento de lenguaje natural para analizar sinopsis y generar recomendaciones basadas en similitud semántica
- **Sistema híbrido**: Combinación de recomendaciones heurísticas (basadas en reglas) y recomendaciones de IA
- **Enfoque académico**: Diseñado específicamente para libros académicos y técnicos

---

## 3. Alcance del Proyecto

### 3.1 Funcionalidades Incluidas

#### Gestión de Catálogo
- Crear, leer, actualizar y eliminar libros
- Crear, leer, actualizar y eliminar autores
- Búsqueda avanzada por múltiples criterios
- Filtrado por precio, género y otros metadatos
- Navegación del catálogo completo

#### Sistema de Recomendaciones
- **Recomendaciones heurísticas**: Basadas en género, autor, tags y precio
- **Recomendaciones con IA**: Basadas en análisis semántico de sinopsis utilizando embeddings
- Cálculo de similitud mediante distancia de coseno
- Fallback automático a heurísticas si el servicio de IA no está disponible

#### Interfaz de Usuario
- Página de inicio con libros destacados
- Catálogo completo navegable
- Vista de detalles de cada libro
- Panel de administración (para usuarios con rol admin)

### 3.2 Funcionalidades Excluidas (Fuera de Alcance)

- Autenticación y autorización de usuarios (se utilizará un sistema de prueba basado en localStorage)
- Sistema de compras o transacciones
- Integración con bibliotecas externas o APIs de terceros para datos de libros
- Notificaciones por correo electrónico
- Aplicación móvil nativa
- Sistema de reseñas y calificaciones de usuarios

---

## 4. Stakeholders (Interesados)

| Stakeholder | Rol | Responsabilidades | Expectativas |
|------------|-----|-------------------|--------------|
| **Equipo de Desarrollo** | Desarrolladores | Diseño, implementación y pruebas del sistema | Entregar un producto funcional, bien documentado y mantenible |
| **Profesor del Curso** | Cliente/Evaluador | Definir requisitos académicos y evaluar el proyecto | Recibir entregables de calidad que cumplan los objetivos de aprendizaje |
| **Usuarios Finales** | Usuarios del sistema | Utilizar el sistema para descubrir y gestionar libros | Sistema intuitivo, rápido y con recomendaciones relevantes |
| **Administradores** | Gestores de catálogo | Mantener actualizado el catálogo de libros | Herramientas eficientes para gestión CRUD |

---

## 5. Requisitos de Alto Nivel

### 5.1 Requisitos Funcionales Principales

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-01 | El sistema debe permitir gestionar libros (CRUD completo) | Alta |
| RF-02 | El sistema debe permitir gestionar autores (CRUD completo) | Alta |
| RF-03 | El sistema debe proporcionar búsqueda por título, autor y género | Alta |
| RF-04 | El sistema debe generar recomendaciones personalizadas | **Muy Alta** |
| RF-05 | El sistema debe mostrar detalles completos de cada libro | Media |
| RF-06 | El sistema debe permitir filtrar libros por precio | Media |

### 5.2 Requisitos No Funcionales Principales

| ID | Requisito | Objetivo |
|----|-----------|----------|
| RNF-01 | **Rendimiento**: Las búsquedas deben responder en menos de 1 segundo (p95) | <1s |
| RNF-02 | **Rendimiento IA**: Las recomendaciones con IA deben responder en menos de 3 segundos (p95) | <3s |
| RNF-03 | **Usabilidad**: La interfaz debe ser intuitiva, requiriendo menos de 5 clicks para tareas comunes | <5 clicks |
| RNF-04 | **Fiabilidad**: El sistema debe tener 95% de disponibilidad | 95% uptime |
| RNF-05 | **Mantenibilidad**: El código debe tener >80% de cobertura de pruebas | >80% |

---

## 6. Justificación del Proyecto

### 6.1 Problema a Resolver

Los estudiantes y profesionales que buscan libros académicos enfrentan los siguientes desafíos:

1. **Sobrecarga de información**: Existen miles de libros académicos, dificultando encontrar los más relevantes
2. **Búsquedas limitadas**: Los sistemas tradicionales solo buscan coincidencias exactas de texto
3. **Recomendaciones superficiales**: Las sugerencias basadas únicamente en género o autor son insuficientes
4. **Falta de comprensión semántica**: Los sistemas no entienden el contenido real de los libros

### 6.2 Solución Propuesta

BookMate aborda estos problemas mediante:

1. **Análisis semántico**: Procesamiento de lenguaje natural para comprender el contenido de las sinopsis
2. **Recomendaciones inteligentes**: Algoritmos de IA que sugieren libros con contenido similar, incluso si no comparten género o autor
3. **Sistema híbrido**: Combinación de heurísticas y IA para garantizar siempre recomendaciones relevantes
4. **Interfaz intuitiva**: Diseño centrado en el usuario para facilitar el descubrimiento

---

## 7. Restricciones del Proyecto

### 7.1 Restricciones Técnicas

- **Arquitectura**: Se utilizará una arquitectura de microservicios (Backend principal + Servicio IA separado)
- **Lenguajes**: Backend en Java (Spring Boot), Servicio IA en Python
- **Base de datos**: PostgreSQL como sistema de gestión de base de datos
- **Contenedores**: Docker y Docker Compose para despliegue

### 7.2 Restricciones de Tiempo

- **Duración del proyecto**: 10 semanas (Semana 7 a Semana 16)
- **Entregables parciales**: 6 entregas (Semanas 7, 8, 11, 13, 15, 16)
- **Fase de análisis**: Semanas 7-11 (sin mencionar tecnologías específicas)
- **Fase de diseño**: Semanas 13-16 (con implementación técnica)

### 7.3 Restricciones de Recursos

- **Equipo**: 6 integrantes con roles rotativos
- **Infraestructura**: Entorno de desarrollo local, sin presupuesto para servicios cloud
- **Datos de prueba**: Catálogo limitado a 30-50 libros de muestra

---

## 8. Supuestos

1. **Disponibilidad del equipo**: Todos los miembros pueden dedicar 8-10 horas semanales al proyecto
2. **Acceso a herramientas**: El equipo tiene acceso a IDEs, Docker y herramientas de desarrollo necesarias
3. **Modelo de IA**: Se utilizará un modelo preentrenado de Sentence Transformers (no se entrenará un modelo desde cero)
4. **Datos de libros**: Los metadatos de libros serán ingresados manualmente o mediante CSV
5. **Prototipo funcional**: Se priorizará un prototipo funcional sobre optimizaciones de rendimiento avanzadas

---

## 9. Riesgos Principales

| Riesgo | Probabilidad | Impacto | Estrategia de Mitigación |
|--------|--------------|---------|--------------------------|
| **Complejidad del servicio IA** | Media | Alto | Implementar fallback a recomendaciones heurísticas; usar modelo preentrenado |
| **Integración microservicios** | Media | Medio | Documentar bien las APIs; usar Docker Compose para orquestación |
| **Tiempo insuficiente** | Alta | Alto | Priorizar funcionalidades core (CRUD + recomendaciones básicas); postergar features secundarias |
| **Problemas de rendimiento IA** | Media | Medio | Implementar caché de embeddings; limitar tamaño del catálogo |
| **Disponibilidad del equipo** | Media | Medio | Reuniones semanales de seguimiento; distribución clara de tareas |

---

## 10. Hitos del Proyecto

| Semana | Hito | Entregable Principal |
|--------|------|---------------------|
| **7** | Inicio del proyecto | Charter, Visión, Glosario, Modelo BPMN |
| **8** | Análisis de requisitos | SRS completo, Casos de Uso, Prototipo UC |
| **11** | Análisis conceptual | Modelo de Análisis, C4 C1-C2, Robustez, CRC |
| **13** | Diseño arquitectónico | Arquitectura detallada, C4 C3-C4, Plan de desarrollo |
| **15** | Diseño detallado | Modelo de diseño, Diagramas de clases/secuencia/despliegue |
| **16** | Entrega final | Demo funcional, Planes de pruebas/despliegue/configuración |

---

## 11. Criterios de Éxito

El proyecto se considerará exitoso si:

1. ✅ **Funcionalidad core implementada**: CRUD de libros/autores + sistema de recomendaciones funcionando
2. ✅ **Requisitos no funcionales cumplidos**: Búsquedas <1s, Recomendaciones IA <3s
3. ✅ **Documentación completa**: Todos los entregables académicos presentados y aprobados
4. ✅ **Calidad del código**: Cobertura de pruebas >80%, código limpio y mantenible
5. ✅ **Demo funcional**: Demostración exitosa del sistema en la semana 16

---

## 12. Aprobaciones

Este charter ha sido elaborado por el **Grupo 6** como parte del curso CC341 - Ingeniería de Software.

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

---

## Notas Finales

Este documento establece la base del proyecto BookMate. Los requisitos detallados se especificarán en el documento SRS (Semana 8), y el diseño técnico se desarrollará en las semanas posteriores.

**Versión:** 1.0  
**Última actualización:** Octubre 2025

