# PLAN GENERAL DEL PROYECTO BOOKMATE

**Curso:** CC341 - Ingeniería de Software  
**Institución:** Universidad Nacional de Ingeniería (UNI)  
**Ciclo Académico:** 2025-2  
**Grupo:** 6
**Versión:** 1.0  
**Fecha:** Noviembre 2025  

---

## 1. OBJETIVO Y ALCANCE DEL PROYECTO

### 1.1 Objetivo General

Se desarrollará una plataforma web denominada **BookMate** que permitirá a los usuarios gestionar su biblioteca personal de libros y recibir recomendaciones personalizadas basadas en sus preferencias de lectura. El sistema integrará técnicas de recomendación heurística y, en su fase final, incorporará algoritmos de inteligencia artificial basados en embeddings de sinopsis literarias.

### 1.2 Visión del Producto

BookMate se posicionará como una solución integral para lectores que deseen:

- Catalogar y organizar su colección de libros personal
- Descubrir nuevos títulos afines a sus gustos literarios
- Acceder a información detallada sobre libros (sinopsis, autor, género, valoraciones)
- Recibir recomendaciones inteligentes basadas en metadatos y contenido semántico

### 1.3 Alcance del Proyecto Académico

El proyecto se enmarcará en los requisitos del sílabo CC341 y cubrirá:

- **Unidad I:** Fundamentos de Ingeniería de Software
- **Unidad II:** Ciclo de vida y metodologías (RUP + Ágil)
- **Unidad III:** Ingeniería de requisitos y análisis (UML, casos de uso, análisis)
- **Unidad IV:** Diseño de software (arquitectura, patrones, diagramas de diseño)
- **Unidad V:** Gestión de proyectos y configuración (PMBOK, control de versiones)
- **Unidad VI:** Pruebas y calidad de software

El alcance funcional incluirá:

1. **Gestión de usuarios:** Registro, autenticación y perfil
2. **Catálogo de libros:** Búsqueda, filtrado, visualización detallada
3. **Biblioteca personal:** Agregar/eliminar libros, marcar estado de lectura
4. **Sistema de recomendación:** 
   - Fase 1 (heurística): basada en autor, tags, número de páginas
   - Fase 2 (IA): basada en similitud semántica de sinopsis

### 1.4 Restricciones y Supuestos

**Restricciones:**
- Tiempo limitado al calendario académico (semanas 7-17)
- Equipo de 6 integrantes con disponibilidad parcial
- Recursos de hardware limitados para entrenamiento de modelos IA
- Datasets de libros disponibles públicamente

**Supuestos:**
- Se contará con acceso a datasets de libros en formato estructurado
- El equipo tendrá conocimientos básicos de Java/Spring Boot
- Se utilizarán servicios gratuitos para despliegue (GitHub Pages, Docker)
- Los modelos de embeddings pre-entrenados estarán disponibles

---

## 2. METODOLOGÍA DE DESARROLLO

### 2.1 Enfoque Híbrido: Ágil con Soporte RUP

Se aplicará una metodología híbrida que combinará:

**Principios Ágiles:**
- Iteraciones cortas alineadas a las entregas académicas (semanas 7, 8, 11, 13, 15, 16, 17)
- Desarrollo incremental del MVP hacia funcionalidades avanzadas
- Colaboración continua y retrospectivas post-entrega
- Adaptación a cambios en requisitos según feedback

**Disciplinas RUP:**
- **Modelado de negocio:** Análisis BPMN del proceso de recomendación de libros
- **Requisitos:** SRS, casos de uso, trazabilidad
- **Análisis y diseño:** Modelos UML (robustez, secuencia, clases, estados)
- **Implementación:** Código fuente en tracks diferenciados
- **Pruebas:** Plan de pruebas unitarias, integración, sistema
- **Despliegue:** Estrategia de deployment con Docker
- **Gestión de configuración:** Control de versiones con Git, ramas estratégicas

### 2.2 Fases del Proyecto

El proyecto se ejecutará en fases progresivas que construirán el MVP (Minimum Viable Product) hasta el producto completo:

| Fase | Descripción | Semanas | Criterios de Aceptación |
|------|-------------|---------|-------------------------|
| **Fase 0: Planificación** | Charter, visión, glosario, BPMN | 7 | Documentos aprobados, equipo conformado |
| **Fase 1: Requisitos** | SRS, casos de uso, prototipo estático | 8 | 15+ requisitos, 5+ CU, prototipo HTML navegable |
| **Fase 2: Análisis** | Robustez, secuencia, CRC, clases análisis | 11 | Diagramas UML completos, entrega 40% |
| **Fase 3: Diseño** | Arquitectura C4, clases diseño, componentes | 13-15 | C4 niveles 1-4, diagramas diseño, entrega 60-80% |
| **Fase 4: Implementación** | Código funcional, BD, heurística | 13-15 | API REST funcional, BD Postgres, recomendaciones básicas |
| **Fase 5: IA** | Servicio IA con embeddings | 15-16 | Recomendaciones IA operativas, fallback heurístico |
| **Fase 6: Integración** | Docker Compose, pruebas, despliegue | 16 | Sistema completo dockerizado, demo funcional |

---

## 3. ARQUITECTURA DEL PROYECTO POR TRACKS

El proyecto se organizará en **dos líneas de desarrollo paralelas** (tracks) que servirán propósitos complementarios:

### 3.1 Track A: BASIC (Prototipo Estático)

**Propósito:** Validar diseño UI/UX, cumplir requisitos de prototipo navegable para entregas tempranas.

**Características:**
- Páginas HTML/CSS/JS estáticas: `index.html`, `catalog.html`, `details.html`, `about.html`
- Datos mock en archivos JSON (`public/assets/data/*.json`)
- Sin base de datos persistente
- Servidor Spring Boot integrado para desarrollo local
- Archivos estáticos servidos desde `/resources/static/`

**Tecnologías:**
- HTML5, CSS3 (Bootstrap 5), JavaScript (Vanilla)
- Spring Boot (servidor integrado para desarrollo local)

**Ubicación:** `/product/basic-springboot/`

**Criterios de Aceptación:**
- ✅ Prototipo navegable funcional en navegador
- ✅ Diseño responsive (mobile, tablet, desktop)
- ✅ Simulación de flujos de usuario completos
- ✅ Datos mock realistas (mínimo 20 libros)

### 3.2 Track B: AI (Aplicación Completa con IA)

**Propósito:** Implementar el sistema completo con persistencia, backend y recomendaciones inteligentes.

**Características:**
- **Backend Web:** Spring Boot con endpoints REST
  - `/api/books` - Listar libros con filtros
  - `/api/books/{id}` - Detalle de libro
  - `/api/library` - Biblioteca personal del usuario
  - `/api/recommendations/{userId}` - Recomendaciones personalizadas
  
- **Base de datos:** PostgreSQL con esquema relacional
  - Tablas: `users`, `books`, `tags`, `book_tags`, `user_books`
  - Relaciones N:M entre libros y tags
  
- **Sistema de recomendación:**
  - **Fase 1 - Heurística:** Basada en metadatos (autor, tags, páginas ±15%)
  - **Fase 2 - IA:** Microservicio Python separado con embeddings de sinopsis
    - Modelo: Sentence Transformers (e.g., `all-MiniLM-L6-v2`)
    - Similitud coseno entre embeddings
    - Fallback automático a heurística si IA falla

- **Infraestructura:** Docker Compose con 3 servicios
  - `web`: Spring Boot app principal
  - `db`: PostgreSQL 15
  - `ai_service`: Microservicio Python IA con modelos pre-entrenados

**Tecnologías:**
- Java 17+, Spring Boot 3.2, Spring Data JPA
- PostgreSQL 15, Flyway (migraciones)
- Microservicio Python 3.11+ con Sentence Transformers, NumPy, Scikit-learn
- Docker + Docker Compose

**Ubicación:** `/product/ai/`

**Orden de Implementación (Progresivo):**
1. **Semana 11:** Backend Spring Boot básico + Postgres + CRUD libros
2. **Semana 13:** Biblioteca personal + autenticación Spring Security
3. **Semana 15:** Recomendador heurístico funcional
4. **Semana 16:** Microservicio Python IA + Docker Compose completo

**Criterios de Aceptación por Hito:**

| Hito | Criterio |
|------|----------|
| Backend básico | Endpoints REST funcionales, Postman collection documentada |
| BD Postgres | Esquema normalizado, migraciones Flyway, 100+ registros mock |
| Heurística | Recomienda 5+ libros relevantes, tiempo respuesta <1s |
| IA | Recomendaciones semánticas precisas, similitud >0.7, fallback operativo |
| Docker | `docker-compose up` funciona sin errores, servicios saludables |

---

## 4. RELACIÓN CON EL SÍLABO CC341 (UNIDADES I-VI)

### Unidad I: Introducción a la Ingeniería de Software

**Aplicación en BookMate:**
- Se identificarán los atributos de calidad del software (usabilidad, confiabilidad, mantenibilidad)
- Se aplicará el código de ética del ingeniero de software en decisiones de diseño
- Se consultará el SWEBOK para estandarizar procesos

**Evidencias:**
- Charter del proyecto con metas de calidad
- Documento de arquitectura con justificación técnica

### Unidad II: Ciclo de Vida del Software

**Aplicación en BookMate:**
- Se adoptará un ciclo iterativo incremental (RUP + Ágil)
- Se modelará el proceso de negocio en BPMN (AS-IS: compra manual de libros, TO-BE: recomendación automatizada)
- Se ejecutarán iteraciones alineadas a las entregas académicas

**Evidencias:**
- Diagrama BPMN del proceso de recomendación
- Plan de desarrollo iterativo

### Unidad III: Ingeniería de Requisitos

**Aplicación en BookMate:**
- Se capturarán requisitos mediante entrevistas simuladas con stakeholders
- Se especificará el SRS con requisitos funcionales y no funcionales
- Se modelarán casos de uso (Registrar usuario, Buscar libros, Agregar a biblioteca, Recibir recomendaciones)
- Se crearán tarjetas CRC para responsabilidades de clases
- Se diseñarán prototipos navegables para validación

**Evidencias:**
- SRS completo con trazabilidad
- Diagramas de casos de uso y especificaciones detalladas
- Modelo de análisis con robustez y secuencias
- Prototipos HTML interactivos

### Unidad IV: Diseño del Software

**Aplicación en BookMate:**
- Se diseñará la arquitectura con modelo C4 (Contexto, Contenedores, Componentes, Código)
- Se aplicarán patrones arquitectónicos (MVC, Microservicios)
- Se aplicarán patrones de diseño (Repository, Factory, Strategy para recomendadores)
- Se aplicarán patrones GRASP (Controller, Creator, Expert)
- Se crearán diagramas de clases de diseño, secuencia de diseño, colaboración, componentes y despliegue

**Evidencias:**
- Arquitectura C4 documentada con 4 niveles
- Diagramas UML de diseño completos
- Justificación de patrones aplicados

### Unidad V: Gestión de Proyectos y Configuración

**Aplicación en BookMate:**
- Se gestionarán riesgos según prácticas PMBOK (tiempo, complejidad técnica, disponibilidad de datos)
- Se implementará administración de configuración con Git (ramas feature, develop, main)
- Se controlará el versionado semántico (v1.0, v1.1, etc.)
- Se gestionarán cambios mediante Pull Requests con revisión

**Evidencias:**
- Plan de gestión de riesgos
- Plan de administración de configuración
- Repositorio Git con historial de commits organizado

### Unidad VI: Pruebas y Calidad

**Aplicación en BookMate:**
- Se diseñará un plan de pruebas con casos de prueba unitarios, integración y sistema
- Se ejecutarán pruebas de API con Postman/pytest
- Se validará la calidad del código con linters (pylint, flake8)
- Se medirá cobertura de pruebas (objetivo: >70%)

**Evidencias:**
- Plan de pruebas documentado
- Reporte de ejecución de pruebas
- Métricas de calidad y cobertura

---

## 5. FASES DEL MVP (DE PROTOTIPO A DEMO)

### Fase 1: UI Básica (Semana 7-8)
**Objetivo:** Validar diseño y flujos de usuario

**Actividades:**
- Diseñar wireframes de páginas principales
- Implementar prototipo estático HTML/CSS/JS
- Crear datos mock en JSON
- Validar responsive design

**Entregables:**
- Prototipo navegable en `/product/basic/`
- Catálogo de 20+ libros mock

**Criterios de Aceptación:**
- ✅ Navegación entre páginas funcional
- ✅ Búsqueda y filtrado simulados
- ✅ Diseño responsive validado en 3 dispositivos

### Fase 2: Endpoints Mínimos (Semana 11)
**Objetivo:** Implementar API REST básica

**Actividades:**
- Configurar Spring Boot con arquitectura por capas (Controller, Service, Repository)
- Crear endpoints CRUD para libros
- Documentar API con Swagger/OpenAPI
- Probar con Postman

**Entregables:**
- API REST en `/product/ai/`
- Colección Postman

**Criterios de Aceptación:**
- ✅ 5+ endpoints funcionales (GET, POST)
- ✅ Respuestas JSON válidas
- ✅ Manejo de errores HTTP estándar

### Fase 3: Persistencia Postgres (Semana 11-13)
**Objetivo:** Integrar base de datos relacional

**Actividades:**
- Diseñar esquema ER normalizado
- Implementar entidades JPA
- Crear migraciones con Flyway
- Poblar BD con dataset inicial

**Entregables:**
- Esquema BD documentado
- Scripts de migración
- 100+ libros en BD

**Criterios de Aceptación:**
- ✅ Esquema en 3FN
- ✅ CRUD completo funcional
- ✅ Integridad referencial validada

### Fase 4: Biblioteca Personal (Semana 13)
**Objetivo:** Implementar funcionalidad de usuario

**Actividades:**
- Agregar autenticación JWT con Spring Security
- Crear relación usuario-libros
- Implementar endpoints de biblioteca personal
- Marcar estados de lectura

**Entregables:**
- Sistema de autenticación
- Endpoints `/api/library`

**Criterios de Aceptación:**
- ✅ Usuario puede agregar/eliminar libros
- ✅ Estados: "Leído", "Leyendo", "Por leer"
- ✅ Biblioteca persistente por usuario

### Fase 5: Recomendador Heurístico (Semana 13-15)
**Objetivo:** Implementar recomendaciones basadas en metadatos

**Actividades:**
- Diseñar algoritmo heurístico (autor coincidente +3 pts, tag coincidente +2 pts, páginas ±15% +1 pt)
- Implementar endpoint `/api/recommendations/{userId}`
- Probar con diferentes perfiles de usuario
- Ajustar pesos según relevancia

**Entregables:**
- Recomendador heurístico funcional
- Documentación del algoritmo

**Criterios de Aceptación:**
- ✅ Recomienda 5+ libros por usuario
- ✅ Libros recomendados no están en biblioteca
- ✅ Tiempo de respuesta <1 segundo
- ✅ Relevancia validada manualmente

### Fase 6: Docker Compose (Semana 15)
**Objetivo:** Containerizar aplicación

**Actividades:**
- Crear Dockerfile para Spring Boot
- Crear Dockerfile para microservicio Python IA (preparación)
- Configurar docker-compose.yml con servicios web + db
- Configurar variables de entorno
- Probar orquestación de contenedores

**Entregables:**
- `docker-compose.yml`
- Dockerfiles
- README con instrucciones de deployment

**Criterios de Aceptación:**
- ✅ `docker-compose up` inicia todos los servicios
- ✅ Healthchecks configurados
- ✅ Persistencia de datos con volúmenes
- ✅ Aplicación accesible en localhost:5000

### Fase 7: IA con Embeddings (Semana 15-16) **[FASE FINAL]**
**Objetivo:** Implementar recomendaciones semánticas

**Actividades:**
- Seleccionar modelo pre-entrenado (Sentence Transformers)
- Generar embeddings de sinopsis de libros
- Implementar microservicio Python IA separado
- Calcular similitud coseno para recomendaciones
- Integrar microservicio IA con Spring Boot principal (RestTemplate/WebClient)
- Implementar fallback automático a heurística

**Entregables:**
- Microservicio IA en `/product/ai/ai_service/`
- Embeddings pre-calculados almacenados
- Endpoint `/api/recommendations/ai/{userId}`

**Criterios de Aceptación:**
- ✅ Recomendaciones IA más precisas que heurística
- ✅ Similitud semántica >0.7 en top 5
- ✅ Fallback funciona si IA falla
- ✅ Tiempo de respuesta <2 segundos

---

## 6. CRITERIOS DE ACEPTACIÓN POR FASE

### Criterios Generales

Cada fase deberá cumplir:

1. **Documentación completa:** Artefactos LaTeX actualizados en `/deliverables/`
2. **Código funcional:** Implementación en `/product/` sin errores críticos
3. **Pruebas validadas:** Casos de prueba ejecutados con éxito
4. **Revisión de pares:** Pull Request aprobado por 2+ miembros
5. **Demo preparada:** Funcionalidad demostrable en presentación

### Criterios Específicos por Entregable

#### Semana 7 (PC2)
- ✅ Charter aprobado con alcance claro
- ✅ BPMN AS-IS y TO-BE validados
- ✅ Visión alineada con stakeholders
- ✅ Glosario con 20+ términos

#### Semana 8 (Parcial)
- ✅ SRS con 15+ requisitos funcionales, 10+ no funcionales
- ✅ 5+ casos de uso especificados
- ✅ Matriz trazabilidad requisitos-UC completa
- ✅ Prototipo HTML navegable con 4+ páginas
- ✅ Arquitectura C4 niveles 1-2 documentada

#### Semana 11 (PC3)
- ✅ Diagramas robustez, secuencia, estados, clases completados
- ✅ Tarjetas CRC para 10+ clases
- ✅ Arquitectura C4 niveles 1-2 documentada
- ✅ Backend Spring Boot con 5+ endpoints funcionales
- ✅ BD Postgres con esquema normalizado
- ✅ Entrega al 40% validada

#### Semana 13 (PC4)
- ✅ Especificaciones UC con flujos alternativos detallados
- ✅ Prototipo navegable actualizado con interacciones reales
- ✅ Arquitectura C4 niveles 3-4 documentada
- ✅ Plan de desarrollo actualizado
- ✅ Entrega al 60% validada

#### Semana 15 (PC5)
- ✅ Diagramas de diseño completos (clases, secuencia, colaboración, componentes, despliegue)
- ✅ Plan de pruebas con 20+ casos de prueba
- ✅ Plan de despliegue con Docker Compose
- ✅ Plan de administración de configuración
- ✅ Recomendador heurístico funcional
- ✅ Entrega al 80% validada

#### Semana 16 (Final)
- ✅ Demo completa funcional
- ✅ Sistema IA operativo con fallback
- ✅ Docker Compose ejecutándose sin errores
- ✅ Documentación completa en Google Drive
- ✅ Instrucciones de ejecución claras
- ✅ Entrega al 100%

---

## 7. RIESGOS Y MITIGACIONES

### 7.1 Matriz de Riesgos

| ID | Riesgo | Probabilidad | Impacto | Mitigación |
|----|--------|--------------|---------|------------|
| R01 | Retrasos por carga académica de integrantes | Alta | Alto | Planificar sprints cortos, buffer de 2 días por entrega |
| R02 | Complejidad técnica de IA subestimada | Media | Alto | Comenzar con heurística simple, IA como fase final opcional |
| R03 | Dataset de libros insuficiente | Media | Medio | Identificar 3+ fuentes alternativas (Kaggle, OpenLibrary, Goodreads API) |
| R04 | Problemas de integración Docker | Baja | Medio | Documentar troubleshooting, usar imágenes oficiales estables |
| R05 | Falta de experiencia en Spring Boot/PostgreSQL | Media | Medio | Capacitación interna semana 9-10, pair programming |
| R06 | Cambios en requisitos académicos | Baja | Alto | Mantener comunicación con docente, documentar cambios formalmente |
| R07 | Conflictos en Git por trabajo simultáneo | Media | Bajo | Branching strategy estricto, code reviews obligatorios |
| R08 | Hardware insuficiente para entrenar modelos | Media | Medio | Usar modelos pre-entrenados, Google Colab como alternativa |

### 7.2 Plan de Contingencia

**Si IA no funciona a tiempo:**
- Entregar con recomendador heurístico como funcionalidad principal
- Documentar IA como trabajo futuro en informe final
- Mantener 85%+ del valor del proyecto

**Si Docker falla en demo:**
- Preparar ejecución local sin Docker como backup
- Video de demostración pre-grabado
- Documentar issues conocidos

**Si integrante abandona:**
- Redistribuir tareas entre equipo restante
- Priorizar funcionalidades core sobre extras
- Documentar cambio en plan de desarrollo

---

## 8. GOBERNANZA DEL REPOSITORIO

### 8.1 Estructura de Ramas

```
main (producción, solo merges desde develop)
  ├── develop (integración continua)
  │   ├── feature/basic-ui
  │   ├── feature/springboot-api
  │   ├── feature/postgres-schema
  │   ├── feature/auth
  │   ├── feature/heuristic-recommender
  │   ├── feature/ai-service
  │   └── feature/docker-compose
  ├── docs/charter
  ├── docs/srs
  ├── docs/analisis
  ├── docs/diseno
  └── hotfix/* (si se requiere)
```

### 8.2 Flujo de Trabajo

1. **Crear rama desde develop:** `git checkout -b feature/nombre-funcionalidad`
2. **Desarrollar y commitear:** Mensajes descriptivos en español
3. **Push y Pull Request:** Asignar 2 revisores
4. **Code Review:** Aprobar solo si pasa criterios de calidad
5. **Merge a develop:** Squash commits si es necesario
6. **Merge a main:** Solo en entregas oficiales (semanas 7, 8, 11, 13, 15, 16)

### 8.3 Versionado Semántico

- **v0.1 (Semana 7):** Charter + BPMN
- **v0.2 (Semana 8):** SRS + Prototipo
- **v0.4 (Semana 11):** Backend + BD (40%)
- **v0.6 (Semana 13):** Arquitectura + Auth (60%)
- **v0.8 (Semana 15):** Heurística + Docker (80%)
- **v1.0 (Semana 16):** IA + Demo Final (100%)

### 8.4 Convenciones de Commits

```
feat: nueva funcionalidad
fix: corrección de bug
docs: actualización de documentación
refactor: refactorización de código
test: agregar/actualizar pruebas
chore: tareas de mantenimiento
```

Ejemplo: `feat: agregar endpoint de recomendaciones heurísticas`

---

## 9. EQUIPO Y RESPONSABILIDADES

### 9.1 Integrantes (Placeholders)

| # | Nombre | Rol Principal | Responsabilidades |
|---|--------|---------------|-------------------|
| 1 | Integrante 1 | Project Manager / Analista | Coordinación, requisitos, SRS, casos de uso |
| 2 | Integrante 2 | Arquitecto de Software | Diseño C4, patrones, diagramas de diseño |
| 3 | Integrante 3 | Desarrollador Backend | Spring Boot API, BD Postgres, endpoints |
| 4 | Integrante 4 | Desarrollador Frontend | Prototipo HTML/CSS/JS, integración UI |
| 5 | Integrante 5 | Especialista IA/Data | Recomendador heurístico, microservicio IA, embeddings |
| 6 | Integrante 6 | QA / DevOps | Plan de pruebas, Docker, despliegue, CI/CD |

**Nota:** Los roles son rotativos; cada integrante participará en múltiples áreas.

### 9.2 Reuniones

- **Daily Stand-up:** Lunes/Miércoles/Viernes (15 min, virtual)
- **Sprint Planning:** Inicio de cada fase (60 min)
- **Sprint Review:** Antes de cada entrega (45 min)
- **Retrospectiva:** Post-entrega (30 min)

---

## 10. HERRAMIENTAS Y TECNOLOGÍAS

### 10.1 Desarrollo

| Categoría | Herramienta |
|-----------|-------------|
| Lenguaje Backend | Java 17+ |
| Framework Web | Spring Boot 3.2 |
| ORM | Spring Data JPA / Hibernate |
| Migraciones BD | Flyway |
| Build Tool | Maven |
| Base de Datos | PostgreSQL 15 |
| Lenguaje Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Framework CSS | Bootstrap 5 |
| IA (Microservicio) | Python 3.11+, Flask (micro), Sentence Transformers |
| Testing | JUnit 5, Mockito, RestAssured |
| Contenedores | Docker, Docker Compose |

### 10.1.1 Flyway - Gestión de Migraciones de Base de Datos

**¿Qué es Flyway?**

Flyway es una herramienta de migración de bases de datos que permite versionar y aplicar cambios al esquema de la BD de forma controlada y reproducible. Es una alternativa robusta y ampliamente usada en proyectos Java/Spring Boot.

**¿Cómo funciona?**

1. Los cambios al esquema se escriben en archivos SQL numerados secuencialmente
2. Flyway ejecuta automáticamente las migraciones pendientes al iniciar Spring Boot
3. Registra qué migraciones ya se aplicaron en una tabla de control (`flyway_schema_history`)
4. Garantiza que todos los ambientes (dev, test, prod) tengan el mismo esquema

**Nomenclatura de archivos:**

```
V1__crear_tabla_usuarios.sql
V2__agregar_columna_email.sql
V3__crear_tabla_libros.sql
V4__relacion_usuario_libros.sql
```

- **V** = Versioned migration (obligatorio)
- **Número** = Versión secuencial (1, 2, 3...)
- **__** = Doble guión bajo (separador obligatorio)
- **Descripción** = Texto descriptivo con guiones bajos

**Uso en BookMate:**

```
src/main/resources/db/migration/
├── V1__schema_inicial.sql
├── V2__agregar_tabla_libros.sql
├── V3__agregar_tabla_tags.sql
├── V4__relacion_libros_tags.sql
└── V5__relacion_usuario_libros.sql
```

**Configuración en `application.properties`:**

```properties
spring.flyway.enabled=true
spring.flyway.baseline-on-migrate=true
spring.flyway.locations=classpath:db/migration
```

**Ejemplo de migración (`V1__schema_inicial.sql`):**

```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20),
    pages INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Ventajas:**
- ✅ Versionado automático del esquema de BD
- ✅ Reproducibilidad en diferentes ambientes
- ✅ Historial completo de cambios
- ✅ Rollback controlado (con migraciones undo)
- ✅ Integración nativa con Spring Boot

### 10.2 Documentación

| Categoría | Herramienta |
|-----------|-------------|
| LaTeX | TeXLive, Overleaf (opcional) |
| Diagramas UML | StarUML 5 (formato XPD .uml) |
| Diagramas C4 | StarUML con templates C4 |
| Gestión Bibliográfica | BibLaTeX |

### 10.3 Gestión

| Categoría | Herramienta |
|-----------|-------------|
| Control de versiones | Git + GitHub |
| Gestión de tareas | GitHub Projects / Trello |
| Comunicación | WhatsApp / Discord |
| Pruebas API | Postman, pytest |
| CI/CD | GitHub Actions (opcional) |

---

## 11. ENTREGABLES ACADÉMICOS

### 11.1 Documentación LaTeX (en `/deliverables/`)

- Charter del proyecto
- Glosario de términos
- Modelo de negocio BPMN
- Documento de visión
- SRS (Software Requirements Specification)
- Especificación de casos de uso
- Modelo de análisis (robustez, secuencia, CRC, clases)
- Documento de arquitectura (C4 niveles 1-4)
- Modelo de diseño (clases, secuencia, colaboración, componentes, despliegue)
- Plan de desarrollo de software
- Plan de pruebas
- Plan de despliegue
- Plan de administración de configuración
- Informe final consolidado

### 11.2 Código Fuente (en `/product/`)

- Track BASIC: Prototipo estático navegable
- Track AI: Aplicación Spring Boot completa con IA

### 11.3 Presentaciones (en `/deliverables/beamer_templates/`)

- Presentaciones Beamer para cada entrega

---

## 12. CHECKLIST DE CONTROL POR SEMANA

### ✅ Semana 7 - PC2

**Documentación (`/deliverables/00_charter/`, `/deliverables/01_bpmn/`):**
- [ ] `charter.tex` completado y compilado
- [ ] `glosario.tex` con 20+ términos
- [ ] `bpmn.tex` con diagramas AS-IS y TO-BE
- [ ] Visión del producto documentada

**Código (`/product/basic/`):**
- [ ] Estructura de carpetas creada
- [ ] `PLAN_BASIC.md` completado

**Presentación:**
- [ ] Beamer para PC2 preparado
- [ ] Ensayo de presentación realizado

**Control de versiones:**
- [ ] Tag `v0.1` creado en main
- [ ] Documentos en Google Drive organizados

---

### ✅ Semana 8 - Examen Parcial

**Documentación (`/deliverables/02_srs/`):**
- [ ] `srs.tex` con requisitos funcionales y no funcionales
- [ ] Diagrama de casos de uso general
- [ ] 5+ casos de uso especificados
- [ ] Matriz de trazabilidad requisitos-UC

**Código (`/product/basic/`):**
- [ ] Prototipo HTML navegable con 4+ páginas
- [ ] Datos mock en JSON (20+ libros)
- [ ] Diseño responsive validado

**Diagramas (`/deliverables/semana_08/diagramas/`):**
- [ ] `casos_uso_general.uml` completado
- [ ] 5+ casos de uso específicos (.uml)
- [ ] Matriz de trazabilidad completada

**Presentación:**
- [ ] Beamer para Parcial preparado
- [ ] Demo de prototipo funcional

**Control de versiones:**
- [ ] Tag `v0.2` creado en main
- [ ] Merge de rama `feature/basic-ui` a develop

---

### ✅ Semana 11 - PC3 (Entrega 40%)

**Documentación (`/deliverables/03_analisis/`):**
- [ ] `analisis.tex` completado
- [ ] Diagramas de robustez para UC principal
- [ ] Diagramas de secuencia de análisis
- [ ] Diagramas de estados (libro, usuario)
- [ ] Diagrama de clases de análisis

**Código (`/product/ai/`):**
- [ ] Backend Spring Boot con 5+ endpoints
- [ ] BD Postgres con esquema normalizado
- [ ] Entidades JPA creadas
- [ ] Migraciones Flyway funcionales
- [ ] 100+ libros en BD
- [ ] Colección Postman documentada

**Diagramas UML:**
- [ ] `robustez_uc_principal.uml`
- [ ] `secuencia_uc_principal.uml`
- [ ] `estados_libro.uml`
- [ ] `estados_usuario.uml`
- [ ] `clases_analisis.uml`
- [ ] `c4_contexto.uml`
- [ ] `c4_contenedores.uml`

**Presentación:**
- [ ] Beamer para PC3 preparado
- [ ] Demo de API con Postman

**Control de versiones:**
- [ ] Tag `v0.4` creado en main
- [ ] Merge de ramas `feature/springboot-api` y `feature/postgres-schema`

---

### ✅ Semana 13 - PC4 (Entrega 60%)

**Documentación:**
- [ ] Especificaciones detalladas de UC con flujos alternativos
- [ ] Modelo de análisis refinado
- [ ] Arquitectura C4 niveles 3-4 documentada
- [ ] Plan de desarrollo actualizado

**Código (`/product/ai/`):**
- [ ] Sistema de autenticación implementado
- [ ] Biblioteca personal funcional
- [ ] Endpoints `/api/library` operativos
- [ ] Estados de lectura (Leído, Leyendo, Por leer)

**Diagramas UML:**
- [ ] `c4_componentes_web.uml`
- [ ] `c4_componentes_ia.uml`
- [ ] Diagramas de componentes actualizados

**Presentación:**
- [ ] Beamer para PC4 preparado
- [ ] Demo con usuarios y biblioteca personal

**Control de versiones:**
- [ ] Tag `v0.6` creado en main
- [ ] Merge de rama `feature/auth`

---

### ✅ Semana 15 - PC5 (Entrega 80%)

**Documentación (`/deliverables/04_diseno/`, `/deliverables/05_gestion_config/`, `/deliverables/06_pruebas/`):**
- [ ] `diseno.tex` completado
- [ ] Diagramas de clases de diseño
- [ ] Diagramas de secuencia de diseño
- [ ] Diagramas de colaboración
- [ ] Diagramas de componentes y despliegue
- [ ] `gestion_config.tex` completado
- [ ] `pruebas.tex` con 20+ casos de prueba
- [ ] Plan de despliegue con Docker

**Código (`/product/ai/`):**
- [ ] Recomendador heurístico implementado
- [ ] Endpoint `/api/recommendations/<user_id>` funcional
- [ ] Docker Compose configurado (web + db)
- [ ] `docker-compose.yml` funcional
- [ ] Dockerfiles optimizados
- [ ] Variables de entorno documentadas

**Diagramas UML:**
- [ ] `clases_diseno.uml`
- [ ] `secuencia_diseno.uml`
- [ ] `colaboracion.uml`
- [ ] `componentes.uml`
- [ ] `despliegue.uml`
- [ ] `estados_diseno.uml`

**Pruebas:**
- [ ] Plan de pruebas ejecutado
- [ ] Casos de prueba unitarios (pytest)
- [ ] Pruebas de integración API

**Presentación:**
- [ ] Beamer para PC5 preparado
- [ ] Demo con recomendaciones heurísticas

**Control de versiones:**
- [ ] Tag `v0.8` creado en main
- [ ] Merge de ramas `feature/heuristic-recommender` y `feature/docker-compose`

---

### ✅ Semana 16 - Examen Final (Entrega 100%)

**Documentación (`/deliverables/07_final/`):**
- [ ] `informe_final.tex` consolidado
- [ ] Todos los documentos anteriores revisados y actualizados
- [ ] Documentación técnica completa en Google Drive

**Código (`/product/ai/`):**
- [ ] Servicio IA implementado con embeddings
- [ ] Endpoint `/api/recommendations/ai/<user_id>` funcional
- [ ] Fallback a heurística operativo
- [ ] Docker Compose con 3 servicios (web + db + ai_service)
- [ ] `docker-compose up` funciona sin errores
- [ ] README con instrucciones de ejecución actualizadas

**Diagramas:**
- [ ] Todos los diagramas UML actualizados y exportados a PDF/PNG

**Pruebas:**
- [ ] Pruebas de sistema ejecutadas
- [ ] Validación de recomendaciones IA
- [ ] Reporte de calidad y cobertura

**Demo:**
- [ ] Demo completa preparada (10-15 min)
- [ ] Video de demostración (backup)
- [ ] Presentación Beamer final

**Entrega:**
- [ ] Link a Google Drive con toda la documentación
- [ ] Repositorio GitHub actualizado
- [ ] Instrucciones de ejecución claras
- [ ] README principal actualizado

**Control de versiones:**
- [ ] Tag `v1.0` creado en main
- [ ] Merge de rama `feature/ai-service`

---

### ✅ Semana 17 - Sustitutorio

**Subsanaciones:**
- [ ] Correcciones post-feedback del docente
- [ ] Documentos actualizados según observaciones
- [ ] Código refactorizado si se requiere

---

## 13. CRITERIOS DE ÉXITO DEL PROYECTO

El proyecto BookMate se considerará exitoso si cumple:

1. **Académico:**
   - ✅ Todos los entregables aprobados (semanas 7, 8, 11, 13, 15, 16)
   - ✅ Calificación promedio ≥16/20 en entregas parciales
   - ✅ Examen final aprobado con demo funcional

2. **Técnico:**
   - ✅ Sistema funcional con backend, BD y recomendaciones operativas
   - ✅ Docker Compose ejecutándose sin errores
   - ✅ Recomendaciones IA con precisión validada
   - ✅ Cobertura de pruebas >70%

3. **Proceso:**
   - ✅ Documentación completa y alineada al sílabo
   - ✅ Repositorio Git con historial limpio y organizado
   - ✅ Aplicación de patrones y buenas prácticas
   - ✅ Gestión de configuración efectiva

4. **Equipo:**
   - ✅ Participación equitativa de los 6 integrantes
   - ✅ Resolución efectiva de conflictos
   - ✅ Aprendizaje colaborativo

---

## 14. CONCLUSIONES

El presente plan de proyecto establece una hoja de ruta clara para el desarrollo de BookMate, alineando objetivos académicos del curso CC341 con la implementación de un sistema real de recomendación de libros. La estrategia de dos tracks (BASIC y AI) permitirá cumplir requisitos de prototipado temprano mientras se avanza hacia una solución técnicamente robusta con inteligencia artificial.

El enfoque híbrido de metodología (Ágil + RUP) se adaptará al calendario académico, garantizando entregas incrementales que demuestren progreso constante. La separación estricta entre código (`/product/`) y documentación (`/deliverables/`) facilitará la organización y trazabilidad.

El éxito del proyecto dependerá de la disciplina en seguir este plan, la comunicación efectiva del equipo y la gestión proactiva de riesgos. La implementación progresiva (heurística primero, IA después) mitiga riesgos técnicos y asegura un producto funcional incluso ante contingencias.

---

## 15. REFERENCIAS

- Pressman, R. S. (2021). *Ingeniería del Software: Un Enfoque Práctico* (9ª ed.). McGraw-Hill.
- Sommerville, I. (2016). *Software Engineering* (10ª ed.). Pearson.
- Larman, C. (2004). *Applying UML and Patterns: An Introduction to Object-Oriented Analysis and Design* (3ª ed.). Prentice Hall.
- Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
- Project Management Institute. (2021). *A Guide to the Project Management Body of Knowledge (PMBOK® Guide)* (7ª ed.).
- IEEE. (2014). *Guide to the Software Engineering Body of Knowledge (SWEBOK)* (Versión 3.0).

---

**Documento preparado por:** Equipo BookMate - Grupo 6  
**Fecha de última actualización:** Noviembre 2025  
**Versión:** 1.0  
**Estado:** Aprobado para ejecución
