# 📚 PROYECTO BOOKMATE

**Sistema de Recomendación Inteligente de Libros**

---

## 📋 INFORMACIÓN

- **Curso:** CC341 - Ingeniería de Software
- **Institución:** Universidad Nacional de Ingeniería (UNI)
- **Grupo:** 6
- **Período:** Semanas 7-17 (Ciclo 2025-2)

---

## 🎯 DESCRIPCIÓN

BookMate es una plataforma web de recomendación de libros que evoluciona en dos fases:

1. **Fase Heurística:** Recomendaciones basadas en metadatos (autor, género, páginas)
2. **Fase IA:** Recomendaciones con similitud semántica usando embeddings

---

## 📂 ESTRUCTURA DEL PROYECTO

```
Grupo 6/
│
├── README.md                    # Este archivo
├── PLAN_PROYECTO.md             # Plan maestro del proyecto
├── CRONOGRAMA_SEMANAS.md        # Cronograma detallado por semanas
│
├── deliverables/                # Documentación académica (LaTeX)
│   ├── commons/                 # Archivos comunes
│   ├── semana_07/              # PC2 - Charter + BPMN
│   │   └── presentacion_07.tex
│   ├── semana_08/              # Parcial - SRS + UC
│   │   └── presentacion_08.tex
│   ├── semana_11/              # PC3 (40%) - Análisis + C4(1-2) + CRC
│   │   └── presentacion_11.tex
│   ├── semana_13/              # PC4 (60%) - Arquitectura + C4(3-4)
│   │   └── presentacion_13.tex
│   ├── semana_15/              # PC5 (80%) - Diseño
│   │   └── presentacion_15.tex
│   ├── semana_16/              # Final (100%) - Informe + Planes
│   │   └── presentacion_16.tex
│   └── beamer_templates/       # Plantillas Beamer
│
└── product/                    # Código fuente
    ├── basic-springboot/       # ⭐ Track Spring Boot (BASE)
    ├── ai/                     # 🚧 Track AI (Spring Boot + PostgreSQL + IA)
    └── basic/                  # 🗂️ LEGACY (Flask - Solo referencia)
```

---

## 🗓️ CRONOGRAMA

| Semana | Tipo | Entregable | Carpeta | % |
|--------|------|-----------|---------|---|
| **7** | PC2 | Charter + BPMN + Visión + Glosario | `semana_07/` | 10% |
| **8** | Parcial | SRS + UC + Prototipo | `semana_08/` | 25% |
| **11** | PC3 | Análisis + C4(1-2) + CRC + Robustez + Estados | `semana_11/` | 40% |
| **13** | PC4 | Arquitectura + C4(3-4) | `semana_13/` | 60% |
| **15** | PC5 | Diseño Completo + Estados Diseño | `semana_15/` | 80% |
| **16** | Final | Informe + Planes + Demo | `semana_16/` | 100% |

📖 **Ver detalle:** `CRONOGRAMA_SEMANAS.md`

---

## 🚀 INICIO RÁPIDO

### 📄 Compilar Documentación

```bash
# Compilar documentos de una semana
cd deliverables/semana_07/
latexmk -pdf charter.tex

# Los diagramas UML se crean en StarUML 5 (formato .uml)
```

### 💻 Ejecutar Código

**Track Básico (Spring Boot):**
```bash
cd product/basic-springboot/
./run.bat              # Windows
./run.sh               # Linux/Mac
# Acceder a http://localhost:8080
```

**Track AI (Docker - En Desarrollo):**
```bash
cd product/ai/
docker-compose up --build
# Acceder a http://localhost:8080
```

**⚠️ Nota:** La carpeta `product/basic/` (Flask) es legacy y NO se usa en el proyecto.

---

## 📝 REGLAS DE REDACCIÓN

### Documentos LaTeX:
- ✅ **Tiempo FUTURO:** "se implementará", "se diseñará"
- ✅ **Voz IMPERSONAL:** tercera persona
- ✅ **Incluir preamble:** `\input{../commons/preamble.tex}`
- ✅ **Nota Metodológica:** S7-11 = Análisis sin tecnologías, S13-16 = Diseño con tecnologías

### Diagramas UML:
- ✅ **Herramienta:** StarUML 5 (formato XPD `.uml`)
- ✅ **Ubicación:** `deliverables/semana_XX/diagramas/*.uml`
- ✅ **Versionado:** XML legacy de StarUML compatible con Git

📖 **Guía completa:** `deliverables/README.md`

---

## 🛠️ TECNOLOGÍAS

### Documentación:
- LaTeX, StarUML 5, BibLaTeX, Beamer

### Track Básico (Spring Boot):
- Java 17, Spring Boot 3.2, Maven
- HTML5, CSS3, JavaScript

### Track AI:
- Spring Boot 3.2, Spring Data JPA, Spring Security
- PostgreSQL 15, Flyway (migraciones)
- Microservicio Python IA (Sentence Transformers)
- Docker + Docker Compose

---

## 📚 DOCUMENTOS CLAVE

1. **README.md** (este archivo) - Inicio rápido
2. **PLAN_PROYECTO.md** - Plan maestro completo
3. **CRONOGRAMA_SEMANAS.md** - Cronograma detallado
4. **deliverables/README.md** - Guía de compilación LaTeX
5. **product/basic-springboot/README.md** - Documentación track básico
6. **product/ai/PLAN_AI.md** - Plan del track AI

---

## 👥 EQUIPO - GRUPO 6

6 integrantes - Roles por semana en `CRONOGRAMA_SEMANAS.md`

---

## ⚠️ NOTAS IMPORTANTES

1. **Separación estricta:** `/deliverables/` = docs, `/product/` = código
2. **Organización:** Carpetas por semana de entrega
3. **Stack Oficial:** Spring Boot + PostgreSQL + Microservicio Python IA
4. **Análisis vs Diseño:** S7-11 = Análisis puro sin tecnologías, S13-16 = Diseño con tecnologías
5. **Presentaciones:** Cada semana incluye `presentacion_XX.tex`
6. **Tags de versión:** v0.1, v0.2, v0.4, v0.6, v0.8, v1.0
7. **Legacy:** `product/basic/` (Flask) NO se usa, solo referencia histórica

---

## 📄 LICENCIA

Proyecto académico - Universidad Nacional de Ingeniería (UNI)

---

**Última actualización:** Noviembre 2025  
**Versión:** 2.0 (Reorganizado por Semanas)

✅ **Estructura lista para entregas semanales**
