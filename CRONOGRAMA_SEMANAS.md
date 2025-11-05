# CRONOGRAMA DE ENTREGABLES POR SEMANA

**Curso:** CC341 - Ingeniería de Software  
**Institución:** Universidad Nacional de Ingeniería (UNI)  
**Proyecto:** BookMate  
**Grupo:** 6.2  
**Período:** Semanas 7-17 (Ciclo 2024-2)

---

## TABLA CRONOLÓGICA DE ENTREGABLES

| Semana | Tipo Entrega | Entregable Oficial | Artefactos Documentación | Evidencias Demo | Criterios de Aceptación | Responsables |
|--------|--------------|-------------------|-------------------------|-----------------|------------------------|--------------|
| **7** | **PC2** | Charter del proyecto<br>Modelo de negocio BPMN<br>Visión<br>Glosario | `/deliverables/semana_07/charter.tex`<br>`/deliverables/semana_07/glosario.tex`<br>`/deliverables/semana_07/bpmn/bpmn.tex`<br>`/deliverables/semana_07/bpmn/diagramas/proceso_actual.puml`<br>`/deliverables/semana_07/bpmn/diagramas/proceso_futuro.puml` | `/product/basic/PLAN_BASIC.md`<br>Estructura de carpetas creada | ✅ Charter aprobado con alcance claro<br>✅ BPMN AS-IS y TO-BE completos<br>✅ Visión alineada con stakeholders<br>✅ Glosario con 20+ términos técnicos<br>✅ Tag `v0.1` en repositorio | **Integrante 1:** Charter, Visión<br>**Integrante 2:** BPMN<br>**Integrante 3:** Glosario<br>**Todos:** Revisión |
| **8** | **Parcial** | Software Requirement Specification (SRS)<br>Modelo de casos de uso<br>Prototipo UC<br>Mapeo Requisitos/Casos de Uso | `/deliverables/semana_08/srs.tex`<br>`/deliverables/semana_08/diagramas/casos_uso_general.puml`<br>`/deliverables/semana_08/diagramas/uc_registrar_usuario.puml`<br>`/deliverables/semana_08/diagramas/uc_buscar_libros.puml`<br>`/deliverables/semana_08/diagramas/uc_gestionar_biblioteca.puml`<br>`/deliverables/semana_08/diagramas/uc_recomendar_libros.puml`<br>`/deliverables/semana_08/diagramas/c4/c4_contexto.puml`<br>`/deliverables/semana_08/diagramas/c4/c4_contenedores.puml` | `/product/basic/index.html`<br>`/product/basic/catalog.html`<br>`/product/basic/details.html`<br>`/product/basic/about.html`<br>`/product/basic/assets/data/books.json`<br>Prototipo navegable funcional | ✅ SRS con 15+ RF, 10+ RNF<br>✅ 5+ casos de uso especificados<br>✅ Matriz trazabilidad completa<br>✅ Prototipo HTML con 4+ páginas<br>✅ Diseño responsive validado<br>✅ C4 niveles 1-2 documentados<br>✅ Tarjetas CRC para 10+ clases<br>✅ Tag `v0.2` en repositorio | **Integrante 1:** SRS, Requisitos<br>**Integrante 2:** Casos de Uso, C4<br>**Integrante 3:** CRC<br>**Integrante 4:** Prototipo HTML<br>**Integrante 5:** Datos mock<br>**Integrante 6:** Validación responsive |
| **11** | **PC3** | Especificaciones UC con prototipo<br>Modelo de Análisis<br>Diagrama de robustez<br>Diagrama de secuencia<br>Arquitectura C4 - Niveles C1 y C2 (Gráficos)<br>Diagramas de estado (si aplicara)<br>**Entrega al 40%** | `/deliverables/semana_11/analisis.tex`<br>`/deliverables/semana_11/diagramas/robustez_uc01.puml`<br>`/deliverables/semana_11/diagramas/secuencia_analisis_uc01.puml`<br>`/deliverables/semana_11/diagramas/estados_libro.puml`<br>`/deliverables/semana_11/diagramas/estados_usuario.puml`<br>`/deliverables/semana_11/diagramas/clases_analisis.puml` | `/product/ai/app.py` (Flask API)<br>`/product/ai/models/` (SQLAlchemy)<br>`/product/ai/migrations/` (Alembic)<br>`/product/ai/requirements.txt`<br>Backend con 5+ endpoints<br>BD Postgres funcional<br>Colección Postman | ✅ Diagramas robustez, secuencia, estados completados<br>✅ Tarjetas CRC actualizadas<br>✅ Backend Flask con endpoints REST<br>✅ BD Postgres con esquema normalizado (3FN)<br>✅ 100+ libros en BD<br>✅ API documentada en Postman<br>✅ Entrega 40% validada<br>✅ Tag `v0.4` en repositorio | **Integrante 1:** Análisis, Robustez<br>**Integrante 2:** Secuencias, Estados<br>**Integrante 3:** Backend Flask, API<br>**Integrante 5:** BD Postgres, Migraciones<br>**Integrante 6:** Postman, Pruebas API |
| **13** | **PC4** | Prototipo Navegable<br>Plan de desarrollo del software<br>Arquitectura C4 - Niveles C3 y C4 (Gráficos)<br>Documento de Arquitectura (versión inicial)<br>**Entrega al 60%** | `/deliverables/semana_13/arquitectura.tex`<br>`/deliverables/semana_13/plan_desarrollo.tex`<br>`/deliverables/semana_13/diagramas/c4_componentes.puml`<br>`/deliverables/semana_13/diagramas/c4_codigo.puml`<br>Especificaciones UC detalladas con flujos alternativos | `/product/ai/auth/` (Autenticación)<br>`/product/ai/routes/library.py`<br>Endpoints `/api/library` funcionales<br>Biblioteca personal operativa<br>Estados de lectura implementados | ✅ Especificaciones UC con flujos alternativos<br>✅ Arquitectura C4 niveles 3-4 documentada<br>✅ Plan de desarrollo actualizado<br>✅ Sistema de autenticación funcional<br>✅ Biblioteca personal CRUD completo<br>✅ Estados: Leído, Leyendo, Por leer<br>✅ Entrega 60% validada<br>✅ Tag `v0.6` en repositorio | **Integrante 1:** Especificaciones UC<br>**Integrante 2:** Arquitectura C4 (C3-C4)<br>**Integrante 3:** Autenticación JWT<br>**Integrante 4:** Frontend integración<br>**Integrante 5:** Biblioteca personal<br>**Integrante 6:** Plan desarrollo |
| **15** | **PC5** | Modelo de diseño<br>Diagrama de clases de diseño<br>Diagrama de secuencia de diseño (Caso de uso principal)<br>Diagrama de colaboración<br>Diagrama de componentes<br>Diagrama de despliegue<br>**Entrega al 80%** | `/deliverables/semana_15/diseno.tex`<br>`/deliverables/semana_15/diagramas/clases_diseno.puml`<br>`/deliverables/semana_15/diagramas/secuencia_diseno.puml`<br>`/deliverables/semana_15/diagramas/colaboracion.puml`<br>`/deliverables/semana_15/diagramas/componentes.puml`<br>`/deliverables/semana_15/diagramas/despliegue.puml` | `/product/ai/recommender/heuristic.py`<br>`/product/ai/routes/recommendations.py`<br>Endpoint `/api/recommendations/<user_id>`<br>`/product/ai/docker-compose.yml`<br>`/product/ai/Dockerfile`<br>Docker Compose funcional (web+db)<br>Recomendador heurístico operativo | ✅ Modelo de diseño completo<br>✅ Diagramas de diseño completos<br>✅ Recomendador heurístico funcional<br>✅ Docker Compose ejecutándose<br>✅ Pruebas unitarias con pytest<br>✅ Tiempo respuesta <1s<br>✅ Entrega 80% validada<br>✅ Tag `v0.8` en repositorio | **Integrante 2:** Modelo y diagramas diseño<br>**Integrante 3:** Docker web service<br>**Integrante 5:** Recomendador heurístico<br>**Integrante 6:** Pruebas unitarias, validación |
| **16** | **Final** | Demo<br>Link al Drive.Google.com con todo lo anterior plus software e indicaciones para ejecutar<br>Plan de pruebas<br>Plan de despliegue<br>Plan de adm. de la configuración<br>**Entrega al 100%** | `/deliverables/semana_16/informe_final.tex`<br>`/deliverables/semana_16/pruebas.tex`<br>`/deliverables/semana_16/despliegue.tex`<br>`/deliverables/semana_16/gestion_config.tex`<br>Todos los documentos consolidados<br>`/deliverables/beamer_templates/presentacion_base.tex`<br>Link Google Drive con documentación completa | `/product/ai/ai_service/` (Servicio IA)<br>`/product/ai/ai_service/embeddings.py`<br>Endpoint `/api/recommendations/ai/<user_id>`<br>Docker Compose 3 servicios (web+db+ai)<br>`docker-compose up` funcional<br>README con instrucciones completas<br>Video demo (backup) | ✅ Demo completa funcional (10-15 min)<br>✅ Sistema IA con embeddings operativo<br>✅ Recomendaciones semánticas >0.7 similitud<br>✅ Fallback heurístico funcional<br>✅ Docker Compose sin errores<br>✅ Plan de pruebas con 20+ casos<br>✅ Plan de despliegue con Docker<br>✅ Plan admin. configuración<br>✅ Documentación completa en Drive<br>✅ Instrucciones ejecución claras<br>✅ Informe final consolidado<br>✅ Entrega 100% validada<br>✅ Tag `v1.0` en repositorio | **Integrante 5:** Servicio IA, embeddings<br>**Integrante 3:** Integración IA-web<br>**Integrante 6:** Planes (pruebas, despliegue, config), Docker ai_service<br>**Integrante 1:** Informe final<br>**Integrante 2:** Presentación<br>**Todos:** Demo, ensayo |
| **17** | **Sustitutorio** | Subsanaciones | Correcciones según feedback docente<br>Documentos actualizados<br>Observaciones resueltas | Código refactorizado según observaciones<br>Bugs corregidos | ✅ Todas las observaciones resueltas<br>✅ Documentos corregidos<br>✅ Código mejorado según feedback | **Según necesidad:** Integrantes asignados por tipo de observación |

---

## DETALLE POR SEMANA

### SEMANA 7 - PC2

**Fecha estimada:** Semana 7 del ciclo  
**Tipo:** Práctica Calificada 2 + Exposición  
**Peso académico:** 15%  

**Entregables oficiales:**
1. Charter del proyecto
2. Modelo de negocio en BPMN
3. Visión
4. Glosario

**Artefactos a producir:**
- Documento LaTeX con charter (introducción, objetivos, justificación, alcance, restricciones, supuestos, stakeholders, hitos, riesgos)
- Documento LaTeX con glosario (20+ términos técnicos)
- Documento LaTeX con modelo de negocio (procesos AS-IS y TO-BE en BPMN)
- Diagramas PlantUML: proceso_actual.puml, proceso_futuro.puml
- Presentación Beamer para exposición

**Código/Prototipos:**
- Estructura de carpetas `/product/basic/` y `/product/ai/` creada
- Planificación de tracks documentada en PLAN_BASIC.md

**Criterios de éxito:**
- Documentos compilados sin errores en PDF
- Charter con alcance claro y realista
- BPMN modelando correctamente el proceso de recomendación de libros
- Glosario con terminología técnica del dominio
- Presentación de 10 minutos ensayada

**Responsables principales:**
- Integrante 1: Coordinación, charter, visión
- Integrante 2: Diagramas BPMN
- Integrante 3: Glosario

---

### SEMANA 8 - EXAMEN PARCIAL

**Fecha estimada:** Semana 8 del ciclo  
**Tipo:** Examen Parcial + Exposición  
**Peso académico:** 20%  

**Entregables oficiales:**
1. Software Requirement Specification (SRS) con casos de uso
2. Modelo de casos de uso
3. Prototipo UC
4. Mapeo Requisitos/Casos de Uso
5. Arquitectura C4 - Niveles C1 y C2
6. Tarjetas CRC

**Artefactos a producir:**
- Documento LaTeX SRS completo (introducción, descripción general, requisitos funcionales, no funcionales, restricciones)
- Diagrama PlantUML de casos de uso general
- 5+ diagramas PlantUML de casos de uso específicos (registrar usuario, buscar libros, gestionar biblioteca, recomendar libros, otros)
- Matriz de trazabilidad requisitos-casos de uso
- Diagramas C4 nivel 1 (contexto) y nivel 2 (contenedores) en PlantUML
- Tarjetas CRC para 10+ clases principales
- Presentación Beamer

**Código/Prototipos:**
- Prototipo HTML navegable con páginas: index.html, catalog.html, details.html, about.html
- Archivos CSS para diseño responsive
- JavaScript para interacciones básicas
- Datos mock en JSON (20+ libros con metadatos completos)
- Mini servidor Flask opcional para desarrollo local

**Criterios de éxito:**
- SRS con 15+ requisitos funcionales, 10+ no funcionales
- 5+ casos de uso completamente especificados
- Prototipo navegable funcional en navegador
- Diseño responsive validado en 3 tamaños (mobile, tablet, desktop)
- Arquitectura C4 clara y bien documentada
- Tarjetas CRC con responsabilidades bien definidas

**Responsables principales:**
- Integrante 1: SRS, requisitos, trazabilidad
- Integrante 2: Casos de uso, arquitectura C4
- Integrante 3: Tarjetas CRC
- Integrante 4: Prototipo HTML/CSS/JS
- Integrante 5: Datos mock, validación
- Integrante 6: Pruebas responsive, QA

---

### SEMANA 11 - PC3 (Entrega 40%)

**Fecha estimada:** Semana 11 del ciclo  
**Tipo:** Práctica Calificada 3 + Exposición  
**Peso académico:** 15%  
**Hito:** Entrega al 40%

**Entregables oficiales:**
1. Especificaciones UC con prototipo
2. Modelo de Análisis
3. Diagrama de robustez
4. Diagrama de secuencia
5. Arquitectura C4 - Niveles C1 y C2
6. Diagramas de estado (si aplicara)
7. Tarjetas CRC

**Artefactos a producir:**
- Documento LaTeX de análisis completo
- Diagramas PlantUML de robustez para UC principal
- Diagramas PlantUML de secuencia de análisis
- Diagramas PlantUML de estados (libro: disponible, prestado, reservado; usuario: activo, inactivo, bloqueado)
- Diagrama PlantUML de clases de análisis
- Presentación Beamer

**Código/Prototipos:**
- Backend Flask con estructura de proyecto completa
- Modelos SQLAlchemy (User, Book, Tag, BookTag, UserBook)
- Migraciones Alembic iniciales
- Base de datos PostgreSQL configurada
- 5+ endpoints REST funcionales:
  - GET /api/books (listar con filtros)
  - GET /api/books/<id> (detalle)
  - POST /api/books (crear - admin)
  - GET /api/tags (listar tags)
  - GET /api/search (búsqueda avanzada)
- Colección Postman documentada
- 100+ registros de libros en BD

**Criterios de éxito:**
- Modelo de análisis completo y coherente
- Diagramas UML bien formados y consistentes
- Backend Flask ejecutándose sin errores
- BD Postgres con esquema normalizado (3FN)
- Endpoints REST retornando JSON válido
- Pruebas API exitosas con Postman
- 40% del sistema implementado (backend base + BD)

**Responsables principales:**
- Integrante 1: Documento análisis, especificaciones UC
- Integrante 2: Diagramas robustez, secuencia, estados
- Integrante 3: Backend Flask, endpoints, arquitectura
- Integrante 5: BD Postgres, modelos, migraciones, dataset
- Integrante 6: Colección Postman, pruebas API

---

### SEMANA 13 - PC4 (Entrega 60%)

**Fecha estimada:** Semana 13 del ciclo  
**Tipo:** Práctica Calificada 4 + Exposición  
**Peso académico:** 15%  
**Hito:** Entrega al 60%

**Entregables oficiales:**
1. Especificaciones UC con prototipo navegable
2. Modelo de análisis
3. Arquitectura C4 - Niveles C3 y C4
4. Plan de desarrollo del software
5. Documento de Arquitectura (versión inicial)

**Artefactos a producir:**
- Especificaciones UC detalladas con flujos principales, alternativos y excepcionales
- Arquitectura C4 nivel 3 (componentes web) en PlantUML
- Arquitectura C4 nivel 4 (componentes IA) en PlantUML
- Documento de arquitectura LaTeX (estilos, vistas, decisiones, justificaciones)
- Plan de desarrollo actualizado con cronograma real
- Presentación Beamer

**Código/Prototipos:**
- Sistema de autenticación implementado (JWT o sesiones Flask)
- Endpoints de autenticación:
  - POST /api/auth/register
  - POST /api/auth/login
  - POST /api/auth/logout
  - GET /api/auth/profile
- Endpoints de biblioteca personal:
  - GET /api/library (libros del usuario)
  - POST /api/library (agregar libro)
  - DELETE /api/library/<book_id> (eliminar libro)
  - PUT /api/library/<book_id>/status (cambiar estado)
- Estados de lectura: "Leído", "Leyendo", "Por leer"
- Middleware de autenticación en rutas protegidas
- Prototipo frontend actualizado con integración real (opcional)

**Criterios de éxito:**
- Arquitectura C4 completa (4 niveles) documentada
- Plan de desarrollo realista y detallado
- Autenticación funcional y segura
- Biblioteca personal CRUD completo
- 60% del sistema implementado (backend + auth + biblioteca)

**Responsables principales:**
- Integrante 1: Especificaciones UC detalladas
- Integrante 2: Arquitectura C4 (C3-C4), documento arquitectura
- Integrante 3: Sistema autenticación, middleware
- Integrante 4: Frontend integración (opcional)
- Integrante 5: Biblioteca personal, endpoints
- Integrante 6: Plan desarrollo, cronograma

---

### SEMANA 15 - PC5 (Entrega 80%)

**Fecha estimada:** Semana 15 del ciclo  
**Tipo:** Práctica Calificada 5 + Exposición  
**Peso académico:** 15%  
**Hito:** Entrega al 80%

**Entregables oficiales:**
1. Prototipo Navegable
2. Modelo de diseño
3. Diagrama de clases de diseño
4. Diagrama de secuencia de diseño (caso de uso principal)
5. Diagrama de colaboración
6. Diagrama de componentes
7. Diagrama de despliegue

**Artefactos a producir:**
- Documento LaTeX de diseño completo
- Diagramas PlantUML:
  - clases_diseno.puml (con atributos, métodos, tipos)
  - secuencia_diseno.puml (UC principal con objetos de diseño)
  - colaboracion.puml (interacción entre objetos)
  - componentes.puml (arquitectura de componentes)
  - despliegue.puml (nodos, contenedores, conexiones)
- Presentación Beamer

**Código/Prototipos:**
- Recomendador heurístico implementado:
  - Algoritmo: autor coincidente +3 pts, tag coincidente +2 pts, páginas ±15% +1 pt
  - Endpoint GET /api/recommendations/<user_id>
  - Lógica para excluir libros ya en biblioteca
  - Ordenamiento por score descendente
- Docker Compose configurado:
  - docker-compose.yml con servicios web y db
  - Dockerfile para Flask web
  - Variables de entorno documentadas
  - Volúmenes para persistencia
  - Healthchecks configurados
- Pruebas unitarias con pytest (20+ tests)
- Pruebas de integración API
- README actualizado con instrucciones Docker

**Criterios de éxito:**
- Modelo de diseño completo y detallado
- Diagramas de diseño completos
- Recomendador heurístico funcional y preciso
- Docker Compose ejecutándose sin errores
- `docker-compose up` funciona en primera ejecución
- Pruebas unitarias pasando (cobertura >70%)
- 80% del sistema implementado (backend + biblioteca + recomendador + Docker)

**Responsables principales:**
- Integrante 2: Modelo diseño, diagramas UML diseño
- Integrante 3: Docker web service, Dockerfile
- Integrante 5: Recomendador heurístico, algoritmo
- Integrante 6: Docker Compose, pruebas unitarias pytest

---

### SEMANA 16 - EXAMEN FINAL (Entrega 100%)

**Fecha estimada:** Semana 16 del ciclo  
**Tipo:** Examen Final + Demo + Exposición  
**Peso académico:** 25%  
**Hito:** Entrega al 100%

**Entregables oficiales:**
1. Demo del sistema completo
2. Link a Google Drive con toda la documentación
3. Repositorio GitHub con código fuente
4. Instrucciones de ejecución
5. Plan de pruebas
6. Plan de despliegue
7. Plan de administración de la configuración

**Artefactos a producir:**
- Documento LaTeX informe final consolidado (integra todos los documentos anteriores)
- Documento LaTeX plan de pruebas (estrategia, casos de prueba, matriz trazabilidad)
- Documento LaTeX plan de despliegue (estrategia Docker, ambientes, rollback)
- Documento LaTeX plan gestión configuración (Git flow, ramas, versionado, control cambios)
- Presentación Beamer final (15-20 slides)
- Video de demostración (5-10 min, backup)
- README principal actualizado con:
  - Descripción del proyecto
  - Requisitos de instalación
  - Instrucciones de ejecución con Docker
  - Instrucciones de ejecución sin Docker (local)
  - Credenciales de prueba
  - Endpoints API documentados
  - Troubleshooting
- Carpeta en Google Drive con:
  - Todos los PDFs de documentación
  - Presentaciones
  - Video demo
  - Link al repositorio
  - Instrucciones de ejecución

**Código/Prototipos:**
- Servicio IA implementado:
  - Directorio `/product/ai/ai_service/`
  - Flask app independiente
  - Modelo Sentence Transformers cargado
  - Endpoint POST /embed (generar embedding de texto)
  - Endpoint POST /recommend (recomendaciones por similitud)
  - Embeddings pre-calculados de sinopsis almacenados
  - Cálculo de similitud coseno
- Integración web ↔ IA:
  - Endpoint GET /api/recommendations/ai/<user_id> en web service
  - Cliente HTTP para llamar a ai_service
  - Fallback automático a heurística si IA falla
  - Logging de errores
- Docker Compose 3 servicios:
  - web: Flask web (puerto 5000)
  - db: PostgreSQL (puerto 5432)
  - ai_service: Flask IA (puerto 5001)
- Dockerfile para ai_service con dependencias ML
- Sistema completo funcional end-to-end
- Pruebas de sistema ejecutadas

**Criterios de éxito:**
- Demo exitosa sin errores (10-15 min)
- Sistema IA recomendando libros con alta precisión
- Recomendaciones semánticas con similitud >0.7
- Fallback heurístico funcionando
- Docker Compose con 3 servicios saludables
- Plan de pruebas con 20+ casos
- Plan de despliegue documentado con Docker
- Plan de administración de configuración completo
- Documentación completa y profesional
- Instrucciones de ejecución claras y validadas
- Repositorio limpio y organizado
- Tag v1.0 en main
- 100% del sistema implementado y operativo

**Responsables principales:**
- Integrante 5: Servicio IA, embeddings, modelo
- Integrante 3: Integración IA-web, fallback
- Integrante 6: Docker ai_service, docker-compose completo, planes (pruebas, despliegue, config)
- Integrante 1: Informe final consolidado
- Integrante 2: Presentación Beamer final
- Integrante 4: Video demo, README
- Todos: Ensayo demo, validación completa

---

### SEMANA 17 - SUSTITUTORIO

**Fecha estimada:** Semana 17 del ciclo  
**Tipo:** Examen Sustitutorio / Subsanaciones  
**Peso académico:** Según necesidad  

**Entregables oficiales:**
- Correcciones según observaciones del docente
- Subsanaciones de entregas anteriores

**Artefactos a producir:**
- Documentos LaTeX corregidos según feedback
- Código refactorizado según observaciones
- Bugs corregidos
- Mejoras implementadas

**Criterios de éxito:**
- Todas las observaciones del docente resueltas
- Documentos actualizados y recompilados
- Código mejorado según estándares
- Entrega de subsanaciones aprobada

**Responsables:**
- Asignación según tipo de observación (documentación, código, diagramas, etc.)

---

## MÉTRICAS DE PROGRESO

| Semana | % Avance Acumulado | Entregables Documentación | Entregables Código | Diagramas UML | Criterio Cumplimiento |
|--------|-------------------|---------------------------|-------------------|---------------|----------------------|
| 7      | 10%               | 3 documentos              | Estructura        | 2 BPMN        | Aprobación charter   |
| 8      | 25%               | +1 documento (SRS)        | Prototipo HTML    | 5 UC + 2 C4   | Prototipo navegable  |
| 11     | 40%               | +1 documento (Análisis)   | Backend + BD      | 5 análisis    | API REST funcional   |
| 13     | 60%               | +Arquitectura             | Auth + Biblioteca | 2 C4 (C3-C4)  | Autenticación OK     |
| 15     | 80%               | +Diseño                   | Heurística + Docker | 5 diseño     | Docker funcional     |
| 16     | 100%              | +4 docs (Final + 3 planes) | IA completa      | Todos         | Demo exitosa         |

---

## DEPENDENCIAS ENTRE ENTREGABLES

```
Semana 7 (Charter + BPMN)
    ↓
Semana 8 (SRS + Casos de Uso + Prototipo) → Depende de alcance definido en Charter
    ↓
Semana 11 (Análisis + Backend) → Depende de requisitos del SRS
    ↓
Semana 13 (Diseño C3-C4 + Auth) → Depende de modelo de análisis
    ↓
Semana 15 (Diseño completo + Heurística + Docker) → Depende de arquitectura
    ↓
Semana 16 (IA + Demo Final + Planes) → Depende de todo lo anterior
    ↓
Semana 17 (Subsanaciones) → Depende de feedback del docente
```

---

## NOTAS IMPORTANTES

1. **Tiempo futuro:** Todos los documentos LaTeX se redactarán en tiempo FUTURO y voz impersonal ("se implementará", "se diseñará", "se aplicará").

2. **Separación estricta:** `/product/` para código, `/deliverables/` para documentación académica. No mezclar.

3. **Organización por semanas:** Los entregables documentales están organizados en `/deliverables/semana_XX/` según la semana de entrega oficial.

4. **Control de versiones:** Crear tag en repositorio al finalizar cada entrega (v0.1, v0.2, v0.4, v0.6, v0.8, v1.0).

5. **Revisión de pares:** Cada artefacto debe ser revisado por al menos 2 integrantes antes de entregar.

6. **Backup:** Video demo pre-grabado como contingencia para demo final.

7. **Compilación LaTeX:** Validar que todos los .tex compilan sin errores 24 horas antes de entrega.

8. **Docker:** Probar `docker-compose up` en máquina limpia antes de semana 15 y 16.

9. **Google Drive:** Organizar carpetas por semana con nomenclatura clara: `Semana_XX_Entregable_Nombre/`

---

**Documento preparado por:** Equipo BookMate - Grupo 6.2  
**Última actualización:** Noviembre 2024  
**Versión:** 2.0 (Reorganizado por semanas)
