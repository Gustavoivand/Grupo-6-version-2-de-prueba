# Plan de Desarrollo del Software - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Noviembre 2025  
**Versión:** 1.0  

---

## 1. Introducción

### 1.1 Propósito del Plan

Este documento establece el plan de desarrollo del software BookMate, definiendo las fases, sprints, cronograma, asignación de roles, tecnologías seleccionadas y estrategias de gestión del proyecto.

### 1.2 Alcance del Plan

El plan cubre el desarrollo completo del sistema desde la Semana 7 hasta la Semana 16, incluyendo:

- Fases del proyecto y entregables
- Sprints y cronograma detallado
- Asignación de roles y responsabilidades
- Stack tecnológico seleccionado
- Hitos y criterios de aceptación
- Gestión de riesgos

### 1.3 Metodología

**Enfoque Híbrido: Ágil con Soporte RUP**

**Principios Ágiles:**
- Iteraciones cortas alineadas a entregas académicas
- Desarrollo incremental del MVP
- Colaboración continua
- Adaptación a cambios según feedback

**Disciplinas RUP:**
- Modelado de negocio (BPMN)
- Requisitos (SRS, casos de uso)
- Análisis y diseño (UML, C4)
- Implementación (código fuente)
- Pruebas (unitarias, integración, sistema)
- Despliegue (Docker)
- Gestión de configuración (Git)

---

## 2. Fases del Proyecto

### 2.1 Fase 0: Planificación (Semana 7)

**Objetivo:** Establecer fundamentos del proyecto

**Entregables:**
- Charter del proyecto
- Visión del producto
- Glosario de términos técnicos
- Modelo de negocio BPMN

**Criterios de Aceptación:**
- ✅ Charter aprobado con alcance claro
- ✅ BPMN AS-IS y TO-BE completos
- ✅ Visión alineada con stakeholders
- ✅ Glosario con 20+ términos técnicos

**Duración:** 1 semana  
**Peso académico:** 15% (PC2)

---

### 2.2 Fase 1: Requisitos (Semana 8)

**Objetivo:** Especificar requisitos funcionales y no funcionales

**Entregables:**
- Software Requirements Specification (SRS)
- Modelo de casos de uso
- Prototipo UC navegable
- Matriz de trazabilidad

**Criterios de Aceptación:**
- ✅ SRS con 15+ requisitos funcionales, 10+ no funcionales
- ✅ 5+ casos de uso completamente especificados
- ✅ Prototipo HTML navegable funcional
- ✅ Diseño responsive validado
- ✅ Matriz de trazabilidad completa

**Duración:** 1 semana  
**Peso académico:** 20% (Parcial)

---

### 2.3 Fase 2: Análisis (Semana 11)

**Objetivo:** Análisis conceptual del sistema (sin tecnologías específicas)

**Entregables:**
- Especificaciones detalladas de casos de uso
- Modelo de análisis (BCE)
- Diagramas de robustez
- Diagramas de secuencia de análisis
- Arquitectura C4 Niveles 1-2 (Contexto, Contenedores)
- Diagramas de estados
- Tarjetas CRC

**Criterios de Aceptación:**
- ✅ Diagramas de robustez completos
- ✅ Diagramas de secuencia de análisis
- ✅ Arquitectura C4 niveles 1-2 documentada
- ✅ 20 tarjetas CRC con responsabilidades claras
- ✅ Modelo de análisis completo

**Duración:** 1 semana  
**Peso académico:** 15% (PC3)  
**Hito:** Entrega al 40%

---

### 2.4 Fase 3: Diseño Arquitectónico (Semana 13)

**Objetivo:** Definir arquitectura técnica con tecnologías específicas

**Entregables:**
- Documento de arquitectura completo
- Arquitectura C4 Niveles 3-4 (Componentes, Código)
- Plan de desarrollo del software
- Prototipo navegable actualizado

**Criterios de Aceptación:**
- ✅ Stack tecnológico definido y justificado
- ✅ Arquitectura C4 niveles 3-4 documentada
- ✅ Patrones de diseño identificados
- ✅ Decisiones arquitectónicas documentadas
- ✅ Plan de desarrollo actualizado

**Duración:** 1 semana  
**Peso académico:** 15% (PC4)  
**Hito:** Entrega al 60%

**Implementación paralela:**
- Backend Spring Boot básico
- Base de datos PostgreSQL
- API REST funcional
- Autenticación JWT

---

### 2.5 Fase 4: Diseño Detallado (Semana 15)

**Objetivo:** Diseño detallado con clases de implementación

**Entregables:**
- Modelo de diseño completo
- Diagrama de clases de diseño
- Diagrama de secuencia de diseño
- Diagrama de colaboración
- Diagrama de componentes
- Diagrama de despliegue
- Diagramas de estados de diseño

**Criterios de Aceptación:**
- ✅ Modelo de diseño completo
- ✅ Diagramas de diseño con clases reales
- ✅ Recomendador heurístico funcional
- ✅ Docker Compose ejecutándose
- ✅ Pruebas unitarias con cobertura >80%

**Duración:** 1 semana  
**Peso académico:** 15% (PC5)  
**Hito:** Entrega al 80%

**Implementación paralela:**
- Servicio de recomendaciones heurísticas
- Integración frontend-backend
- Docker Compose básico
- Pruebas unitarias

---

### 2.6 Fase 5: Integración y Servicio IA (Semana 16)

**Objetivo:** Integrar servicio de IA y completar sistema

**Entregables:**
- Demo funcional completa
- Plan de pruebas
- Plan de despliegue
- Plan de administración de configuración
- Servicio IA operativo
- Sistema completo dockerizado

**Criterios de Aceptación:**
- ✅ Demo completa funcional (10-15 min)
- ✅ Sistema IA con embeddings operativo
- ✅ Recomendaciones semánticas >0.7 similitud
- ✅ Fallback heurístico funcional
- ✅ Docker Compose sin errores
- ✅ Plan de pruebas con 20+ casos
- ✅ Documentación completa

**Duración:** 1 semana  
**Peso académico:** 20% (Final)  
**Hito:** Entrega al 100%

**Implementación:**
- Microservicio Python IA
- Integración completa
- Docker Compose 3 servicios
- Pruebas de integración
- Documentación final

---

### 2.7 Fase 6: Sustitutorio (Semana 17)

**Objetivo:** Subsanar observaciones y correcciones

**Entregables:**
- Correcciones según feedback
- Documentos actualizados
- Código refactorizado

**Criterios de Aceptación:**
- ✅ Todas las observaciones resueltas
- ✅ Documentos corregidos
- ✅ Código mejorado según feedback

**Duración:** 1 semana (si aplica)

---

## 3. Cronograma Detallado

### 3.1 Timeline General

| Semana | Fase | Entregable | Porcentaje | Estado |
|--------|------|------------|------------|--------|
| **7** | Planificación | PC2 | 15% | ✅ Completado |
| **8** | Requisitos | Parcial | 20% | ✅ Completado |
| **11** | Análisis | PC3 | 15% | ✅ Completado |
| **13** | Diseño Arquitectónico | PC4 | 15% | 📝 En progreso |
| **15** | Diseño Detallado | PC5 | 15% | 📝 Pendiente |
| **16** | Integración y Final | Final | 20% | 📝 Pendiente |
| **17** | Sustitutorio | Correcciones | - | 📝 Si aplica |

**Total:** 10 semanas de desarrollo activo

---

### 3.2 Sprints por Fase

#### Sprint 1: Planificación (Semana 7)
- **Duración:** 1 semana
- **Objetivo:** Establecer fundamentos
- **Entregables:** Charter, Visión, Glosario, BPMN
- **Estado:** ✅ Completado

#### Sprint 2: Requisitos (Semana 8)
- **Duración:** 1 semana
- **Objetivo:** Especificar requisitos
- **Entregables:** SRS, Casos de Uso, Prototipo, Trazabilidad
- **Estado:** ✅ Completado

#### Sprint 3: Análisis (Semana 11)
- **Duración:** 1 semana
- **Objetivo:** Análisis conceptual
- **Entregables:** Modelo de Análisis, Robustez, C4 C1-C2, CRC
- **Estado:** ✅ Completado

#### Sprint 4: Diseño Arquitectónico (Semana 13)
- **Duración:** 1 semana
- **Objetivo:** Arquitectura técnica
- **Entregables:** Arquitectura, C4 C3-C4, Plan Desarrollo
- **Implementación paralela:**
  - Backend Spring Boot básico
  - PostgreSQL configurado
  - API REST funcional
- **Estado:** 📝 En progreso

#### Sprint 5: Diseño Detallado (Semana 15)
- **Duración:** 1 semana
- **Objetivo:** Diseño detallado
- **Entregables:** Modelo de Diseño, Diagramas de Diseño
- **Implementación paralela:**
  - Recomendador heurístico
  - Docker Compose básico
  - Pruebas unitarias
- **Estado:** 📝 Pendiente

#### Sprint 6: Integración y Final (Semana 16)
- **Duración:** 1 semana
- **Objetivo:** Sistema completo
- **Entregables:** Demo, Planes, Servicio IA
- **Implementación:**
  - Microservicio Python IA
  - Integración completa
  - Docker Compose 3 servicios
  - Pruebas de integración
- **Estado:** 📝 Pendiente

---

## 4. Equipo y Roles

### 4.1 Integrantes del Equipo

| Integrante | Nombre | Roles Principales |
|------------|--------|-------------------|
| **1** | Delgado R., G. | Coordinación, Requisitos, Análisis |
| **2** | Osorio M., A. | Casos de Uso, Arquitectura C4, Diseño |
| **3** | Rojas A., J. | Backend Spring Boot, API REST, Autenticación |
| **4** | Torres R., J. | Frontend, Integración UI |
| **5** | Valverde G., Y. | Base de Datos, Servicio IA, Recomendaciones |
| **6** | Villanueva A., F. | Pruebas, Despliegue, Configuración |

### 4.2 Asignación de Responsabilidades por Fase

#### Fase 0: Planificación (Semana 7)
- **Integrante 1:** Charter, Visión
- **Integrante 2:** BPMN
- **Integrante 3:** Glosario
- **Todos:** Revisión

#### Fase 1: Requisitos (Semana 8)
- **Integrante 1:** SRS, Requisitos, Trazabilidad
- **Integrante 2:** Casos de Uso, Arquitectura C4
- **Integrante 4:** Prototipo HTML/CSS/JS
- **Integrante 5:** Datos mock
- **Integrante 6:** Validación responsive

#### Fase 2: Análisis (Semana 11)
- **Integrante 1:** Análisis, Robustez
- **Integrante 2:** Secuencias, Estados
- **Integrante 3:** Backend Spring Boot, API
- **Integrante 5:** BD PostgreSQL, Migraciones
- **Integrante 6:** Postman, Pruebas API

#### Fase 3: Diseño Arquitectónico (Semana 13)
- **Integrante 1:** Especificaciones UC
- **Integrante 2:** Arquitectura C4 (C3-C4)
- **Integrante 3:** Autenticación JWT
- **Integrante 4:** Frontend integración
- **Integrante 5:** Biblioteca personal
- **Integrante 6:** Plan desarrollo

#### Fase 4: Diseño Detallado (Semana 15)
- **Integrante 2:** Modelo y diagramas diseño
- **Integrante 3:** Docker web service
- **Integrante 5:** Recomendador heurístico
- **Integrante 6:** Pruebas unitarias, validación

#### Fase 5: Integración y Final (Semana 16)
- **Integrante 5:** Servicio IA, embeddings
- **Integrante 3:** Integración IA-web
- **Integrante 6:** Planes (pruebas, despliegue, config), Docker ai_service
- **Integrante 1:** Informe final
- **Integrante 2:** Presentación
- **Todos:** Demo, ensayo

---

## 5. Stack Tecnológico Seleccionado

### 5.1 Backend Principal

| Tecnología | Versión | Propósito | Justificación |
|------------|---------|-----------|---------------|
| **Java** | 17+ (probado con 24) | Lenguaje de programación | Maduro, robusto, amplio ecosistema |
| **Spring Boot** | 3.2.0 | Framework backend | Convención sobre configuración, productividad |
| **Spring Data JPA** | (incluido) | Acceso a datos | Abstracción de persistencia, reduce código boilerplate |
| **Spring Web** | (incluido) | API REST | Facilita creación de endpoints REST |
| **Flyway** | 9.x | Migraciones BD | Versionado de esquema, control de cambios |
| **Maven** | 3.9.5 | Build tool | Gestión de dependencias, compilación |

### 5.2 Base de Datos

| Tecnología | Versión | Propósito | Justificación |
|------------|---------|-----------|---------------|
| **PostgreSQL** | 16 | Base de datos relacional | Open source, robusto, ACID, extensible |
| **JDBC** | (incluido) | Driver de conexión | Conectividad estándar Java-BD |
| **HikariCP** | (incluido) | Connection pool | Pool de conexiones eficiente |

### 5.3 Servicio de Inteligencia Artificial

| Tecnología | Versión | Propósito | Justificación |
|------------|---------|-----------|---------------|
| **Python** | 3.11+ | Lenguaje del servicio IA | Ecosistema rico en ML/NLP |
| **Flask** | 2.3+ | Framework web ligero | Simple, rápido, adecuado para microservicio |
| **Sentence Transformers** | 2.2+ | Modelos de embeddings | Modelos preentrenados, fácil de usar |
| **NumPy** | 1.24+ | Cálculos numéricos | Operaciones vectoriales eficientes |
| **SciPy** | 1.11+ | Cálculo científico | Funciones de similitud (coseno) |

### 5.4 Frontend

| Tecnología | Versión | Propósito | Justificación |
|------------|---------|-----------|---------------|
| **HTML5** | - | Estructura | Estándar web |
| **CSS3** | - | Estilos | Estándar web |
| **JavaScript** | ES6+ | Lógica cliente | Estándar web, sin dependencias |
| **Bootstrap** | 5.1.3 | UI framework | Responsive, componentes listos |
| **Font Awesome** | 6.4.0 | Iconos | Biblioteca completa de iconos |

### 5.5 Containerización y Despliegue

| Tecnología | Versión | Propósito | Justificación |
|------------|---------|-----------|---------------|
| **Docker** | 24+ | Containerización | Aislamiento, portabilidad |
| **Docker Compose** | 2.20+ | Orquestación | Gestión multi-contenedor, desarrollo local |
| **Nginx** | (opcional) | Servidor estático | Servir frontend en producción |

### 5.6 Herramientas de Desarrollo

| Tecnología | Propósito |
|------------|-----------|
| **Git** | Control de versiones |
| **Postman** | Pruebas de API REST |
| **JUnit** | Pruebas unitarias Java |
| **pytest** | Pruebas unitarias Python |
| **JaCoCo** | Cobertura de código Java |

---

## 6. Hitos y Entregables por Fase

### 6.1 Hito 1: Planificación Completada (Semana 7)

**Entregables:**
- ✅ Charter del proyecto
- ✅ Visión del producto
- ✅ Glosario (20+ términos)
- ✅ Modelo BPMN (AS-IS y TO-BE)
- ✅ Presentación Beamer

**Criterios de Éxito:**
- Documentos aprobados
- Alcance claro y realista
- Equipo conformado

---

### 6.2 Hito 2: Requisitos Especificados (Semana 8)

**Entregables:**
- ✅ SRS completo (15+ RF, 10+ RNF)
- ✅ Modelo de casos de uso (15 UC)
- ✅ Prototipo UC navegable
- ✅ Matriz de trazabilidad
- ✅ Presentación Beamer

**Criterios de Éxito:**
- Requisitos completos y trazables
- Prototipo funcional
- Diseño responsive validado

---

### 6.3 Hito 3: Análisis Conceptual (Semana 11) - 40%

**Entregables:**
- ✅ Especificaciones UC detalladas
- ✅ Modelo de análisis (BCE)
- ✅ Diagramas de robustez
- ✅ Diagramas de secuencia de análisis
- ✅ Arquitectura C4 Niveles 1-2
- ✅ Diagramas de estados
- ✅ 20 tarjetas CRC
- ✅ Presentación Beamer

**Criterios de Éxito:**
- Diagramas UML completos
- Modelo de análisis coherente
- Arquitectura conceptual clara

**Implementación paralela:**
- Backend Spring Boot básico
- PostgreSQL configurado
- 5+ endpoints REST funcionales
- 100+ libros en BD

---

### 6.4 Hito 4: Diseño Arquitectónico (Semana 13) - 60%

**Entregables:**
- 📝 Documento de arquitectura
- 📝 Arquitectura C4 Niveles 3-4
- 📝 Plan de desarrollo
- 📝 Prototipo navegable actualizado
- 📝 Presentación Beamer

**Criterios de Éxito:**
- Stack tecnológico definido
- Arquitectura C4 completa
- Patrones de diseño identificados
- Decisiones arquitectónicas documentadas

**Implementación paralela:**
- Autenticación JWT funcional
- Biblioteca personal CRUD completo
- Estados de lectura implementados
- Frontend integrado con backend

---

### 6.5 Hito 5: Diseño Detallado (Semana 15) - 80%

**Entregables:**
- 📝 Modelo de diseño
- 📝 Diagrama de clases de diseño
- 📝 Diagrama de secuencia de diseño
- 📝 Diagrama de colaboración
- 📝 Diagrama de componentes
- 📝 Diagrama de despliegue
- 📝 Diagramas de estados de diseño
- 📝 Presentación Beamer

**Criterios de Éxito:**
- Diagramas de diseño completos
- Recomendador heurístico funcional
- Docker Compose ejecutándose
- Pruebas unitarias >80% cobertura

**Implementación paralela:**
- Recomendador heurístico operativo
- Docker Compose 2 servicios (web+db)
- Pruebas unitarias con pytest/JUnit

---

### 6.6 Hito 6: Sistema Completo (Semana 16) - 100%

**Entregables:**
- 📝 Demo funcional completa
- 📝 Plan de pruebas
- 📝 Plan de despliegue
- 📝 Plan de administración de configuración
- 📝 Presentación Beamer
- 📝 Link Google Drive con documentación completa

**Criterios de Éxito:**
- Demo completa funcional (10-15 min)
- Sistema IA con embeddings operativo
- Recomendaciones semánticas >0.7 similitud
- Fallback heurístico funcional
- Docker Compose 3 servicios sin errores
- Plan de pruebas con 20+ casos
- Documentación completa

**Implementación:**
- Microservicio Python IA completo
- Integración completa
- Docker Compose 3 servicios (web+db+ai)
- Pruebas de integración
- Documentación final

---

## 7. Gestión de Riesgos

### 7.1 Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Estrategia de Mitigación |
|--------|--------------|---------|--------------------------|
| **Complejidad del servicio IA** | Media | Alto | Usar modelo preentrenado, implementar fallback a heurísticas |
| **Integración microservicios** | Media | Medio | Documentar APIs, usar Docker Compose, pruebas de integración |
| **Tiempo insuficiente** | Alta | Alto | Priorizar funcionalidades core, postergar features secundarias |
| **Problemas de rendimiento IA** | Media | Medio | Implementar caché de embeddings, limitar tamaño del catálogo |
| **Disponibilidad del equipo** | Media | Medio | Reuniones semanales, distribución clara de tareas |
| **Problemas con PostgreSQL** | Baja | Medio | Usar Flyway para migraciones, documentar esquema |
| **Dificultades con Docker** | Baja | Medio | Documentar configuración, usar Docker Compose simple |

### 7.2 Plan de Contingencia

**Si el servicio IA no está listo en Semana 16:**
- Usar solo recomendaciones heurísticas
- Documentar que IA es funcionalidad futura
- Demostrar que el fallback funciona correctamente

**Si hay problemas de integración:**
- Simplificar arquitectura temporalmente
- Usar comunicación síncrona simple
- Documentar limitaciones

**Si falta tiempo:**
- Priorizar funcionalidades core (CRUD + recomendaciones básicas)
- Postergar features secundarias (importación CSV, estadísticas avanzadas)
- Documentar roadmap futuro

---

## 8. Estrategia de Implementación

### 8.1 Desarrollo Incremental

**Enfoque:** Construir el sistema de forma incremental, agregando funcionalidades en cada sprint.

**Orden de implementación:**

1. **Sprint 3 (Semana 11):**
   - Backend Spring Boot básico
   - PostgreSQL configurado
   - CRUD de libros
   - API REST básica

2. **Sprint 4 (Semana 13):**
   - Autenticación JWT
   - Biblioteca personal
   - Estados de lectura
   - Frontend integrado

3. **Sprint 5 (Semana 15):**
   - Recomendador heurístico
   - Docker Compose básico
   - Pruebas unitarias

4. **Sprint 6 (Semana 16):**
   - Microservicio Python IA
   - Integración completa
   - Docker Compose 3 servicios
   - Pruebas de integración

### 8.2 Tracks de Desarrollo

**Track A: Prototipo (basic-springboot)**
- Propósito: Validar UI/UX
- Estado: ✅ Funcional
- Uso: Referencia para desarrollo completo

**Track B: Sistema Completo (ai)**
- Propósito: Implementación completa
- Estado: 📝 En desarrollo
- Tecnologías: Spring Boot + PostgreSQL + Python IA

---

## 9. Criterios de Aceptación por Fase

### 9.1 Fase 0: Planificación

- [x] Charter aprobado con alcance claro
- [x] BPMN modelando correctamente el proceso
- [x] Glosario con terminología técnica
- [x] Presentación ensayada

### 9.2 Fase 1: Requisitos

- [x] SRS con 15+ RF, 10+ RNF
- [x] 5+ casos de uso especificados
- [x] Prototipo navegable funcional
- [x] Diseño responsive validado

### 9.3 Fase 2: Análisis

- [x] Diagramas de robustez completos
- [x] Diagramas de secuencia de análisis
- [x] Arquitectura C4 niveles 1-2
- [x] 20 tarjetas CRC
- [x] Backend básico funcional

### 9.4 Fase 3: Diseño Arquitectónico

- [ ] Stack tecnológico definido
- [ ] Arquitectura C4 niveles 3-4
- [ ] Patrones de diseño identificados
- [ ] Autenticación JWT funcional
- [ ] Biblioteca personal operativa

### 9.5 Fase 4: Diseño Detallado

- [ ] Diagramas de diseño completos
- [ ] Recomendador heurístico funcional
- [ ] Docker Compose ejecutándose
- [ ] Pruebas unitarias >80% cobertura

### 9.6 Fase 5: Integración y Final

- [ ] Sistema IA operativo
- [ ] Recomendaciones semánticas >0.7 similitud
- [ ] Docker Compose 3 servicios
- [ ] Plan de pruebas completo
- [ ] Demo funcional

---

## 10. Métricas y Seguimiento

### 10.1 Métricas de Progreso

| Métrica | Objetivo | Medición |
|---------|----------|----------|
| **Porcentaje de completitud** | 100% en Semana 16 | Entregables completados / Total |
| **Cobertura de pruebas** | >80% | JaCoCo (Java) + pytest (Python) |
| **Documentación** | 100% de documentos | Documentos generados / Planificados |
| **Funcionalidades core** | 100% implementadas | RF críticos implementados / Total RF críticos |

### 10.2 Reuniones de Seguimiento

**Frecuencia:** Semanal (antes de cada entrega)

**Agenda típica:**
1. Revisión de progreso de la semana anterior
2. Identificación de bloqueadores
3. Asignación de tareas para la próxima semana
4. Revisión de riesgos
5. Actualización de cronograma si es necesario

---

## 11. Tecnologías Seleccionadas - Justificación

### 11.1 Spring Boot

**Justificación:**
- Framework maduro y ampliamente usado
- Convención sobre configuración (reduce código boilerplate)
- Ecosistema rico (Spring Data JPA, Spring Security, etc.)
- Excelente documentación y comunidad
- Ideal para APIs REST

**Alternativas consideradas:**
- Node.js/Express: Rechazado (requisito académico Java)
- Django: Rechazado (requisito académico Java)

---

### 11.2 PostgreSQL

**Justificación:**
- Base de datos relacional robusta y open source
- Excelente soporte para ACID
- Extensible (permite agregar funcionalidades)
- Ampliamente usado en producción
- Compatible con Spring Data JPA

**Alternativas consideradas:**
- MySQL: Considerado, pero PostgreSQL es más robusto
- MongoDB: Rechazado (requisito académico relacional)

---

### 11.3 Python para Servicio IA

**Justificación:**
- Ecosistema rico en machine learning y NLP
- Sentence Transformers fácil de usar
- Modelos preentrenados disponibles
- Ideal para microservicios de IA
- Separación de responsabilidades (Java backend, Python IA)

**Alternativas consideradas:**
- Java con DL4J: Rechazado (menos maduro para NLP)
- Node.js: Rechazado (ecosistema ML limitado)

---

### 11.4 Docker y Docker Compose

**Justificación:**
- Containerización estándar de la industria
- Facilita despliegue y desarrollo local
- Aislamiento de servicios
- Reproducibilidad de entornos
- Ideal para arquitectura de microservicios

**Alternativas consideradas:**
- Kubernetes: Rechazado (demasiado complejo para este proyecto)
- Vagrant: Rechazado (Docker es más moderno y ligero)

---

### 11.5 Flyway

**Justificación:**
- Versionado de esquema de base de datos
- Control de cambios de BD
- Integración nativa con Spring Boot
- Scripts SQL versionados
- Rollback de migraciones

**Alternativas consideradas:**
- Liquibase: Considerado, pero Flyway es más simple
- Scripts SQL manuales: Rechazado (sin control de versiones)

---

## 12. Cronograma de Implementación Técnica

### 12.1 Semana 11 (Implementación Paralela)

**Backend Spring Boot:**
- [x] Estructura de proyecto creada
- [x] Entidades JPA (Libro, Autor)
- [x] Repositorios Spring Data
- [x] Controladores REST básicos
- [x] PostgreSQL configurado
- [x] Migraciones Flyway iniciales
- [x] 5+ endpoints REST funcionales

---

### 12.2 Semana 13 (Implementación Paralela)

**Backend:**
- [ ] Autenticación JWT (Spring Security)
- [ ] Biblioteca personal (CRUD completo)
- [ ] Estados de lectura implementados
- [ ] Validaciones de datos
- [ ] Manejo de excepciones

**Frontend:**
- [ ] Integración con API REST
- [ ] Autenticación en frontend
- [ ] Biblioteca personal en UI

---

### 12.3 Semana 15 (Implementación Paralela)

**Recomendaciones:**
- [ ] Recomendador heurístico implementado
- [ ] Algoritmo de similitud funcional
- [ ] Endpoint de recomendaciones

**Infraestructura:**
- [ ] Dockerfile para backend
- [ ] Docker Compose 2 servicios (web+db)
- [ ] Configuración de red y volúmenes

**Pruebas:**
- [ ] Pruebas unitarias JUnit
- [ ] Pruebas de integración
- [ ] Cobertura >80%

---

### 12.4 Semana 16 (Implementación Final)

**Servicio IA:**
- [ ] Microservicio Python creado
- [ ] Sentence Transformers integrado
- [ ] Generación de embeddings
- [ ] Cálculo de similitud de coseno
- [ ] API REST para recomendaciones
- [ ] Manejo de errores y timeouts

**Integración:**
- [ ] Comunicación backend-IA
- [ ] Fallback a heurísticas
- [ ] Docker Compose 3 servicios
- [ ] Pruebas de integración completas

**Documentación:**
- [ ] README completo
- [ ] Instrucciones de ejecución
- [ ] Documentación de API
- [ ] Planes completos

---

## 13. Gestión de Calidad

### 13.1 Estándares de Código

**Java:**
- Convenciones de nomenclatura Java
- Documentación Javadoc para clases públicas
- Manejo de excepciones apropiado
- Validación de entrada

**Python:**
- PEP 8 (estilo de código)
- Type hints donde sea posible
- Docstrings para funciones
- Manejo de excepciones

### 13.2 Pruebas

**Cobertura objetivo:** >80%

**Tipos de pruebas:**
- **Unitarias:** JUnit (Java), pytest (Python)
- **Integración:** TestRestTemplate (Spring), Postman
- **Sistema:** Pruebas end-to-end manuales

### 13.3 Revisión de Código

- Pull Requests con revisión obligatoria
- Código revisado por al menos 1 integrante
- Validación de estándares antes de merge

---

## 14. Comunicación y Colaboración

### 14.1 Herramientas

- **Git:** Control de versiones
- **GitHub/GitLab:** Repositorio remoto
- **Comunicación:** Reuniones semanales, chat del equipo

### 14.2 Flujo de Trabajo Git

**Branches:**
- `main`: Código estable, listo para producción
- `develop`: Integración de features
- `feature/*`: Features individuales
- `hotfix/*`: Correcciones urgentes

**Estrategia:**
- Feature branches desde `develop`
- Merge a `develop` después de revisión
- Merge de `develop` a `main` en releases

---

## 15. Conclusiones

Este plan de desarrollo establece una hoja de ruta clara para completar el proyecto BookMate en 10 semanas, con entregas incrementales que validan el progreso y permiten ajustes según feedback.

**Puntos clave:**
- ✅ Metodología híbrida (Ágil + RUP)
- ✅ Fases bien definidas con criterios claros
- ✅ Stack tecnológico justificado
- ✅ Roles y responsabilidades asignados
- ✅ Gestión de riesgos planificada
- ✅ Implementación incremental

**Próximos pasos:**
1. Completar diseño arquitectónico (Semana 13)
2. Implementar diseño detallado (Semana 15)
3. Integrar servicio IA y completar sistema (Semana 16)

---

**Versión:** 1.0  
**Última actualización:** Noviembre 2025  
**Grupo 6** - Universidad Nacional de Ingeniería

