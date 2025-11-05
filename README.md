# 📚 PROYECTO BOOKMATE

**Sistema de Recomendación Inteligente de Libros**

---

## 📋 INFORMACIÓN

- **Curso:** CC341 - Ingeniería de Software
- **Institución:** Universidad Nacional de Ingeniería (UNI)
- **Grupo:** 6.2
- **Período:** Semanas 7-17 (Ciclo 2024-2)

---

## 🎯 DESCRIPCIÓN

BookMate es una plataforma web de recomendación de libros que evoluciona en dos fases:

1. **Fase Heurística:** Recomendaciones basadas en metadatos (autor, género, páginas)
2. **Fase IA:** Recomendaciones con similitud semántica usando embeddings

---

## 📂 ESTRUCTURA DEL PROYECTO

```
Grupo 6.2/
│
├── README.md                    # Este archivo
├── PLAN_PROYECTO.md             # Plan maestro del proyecto
├── CRONOGRAMA_SEMANAS.md        # Cronograma detallado por semanas
│
├── deliverables/                # Documentación académica (LaTeX)
│   ├── commons/                 # Archivos comunes
│   ├── semana_07/              # PC2 - Charter + BPMN
│   ├── semana_08/              # Parcial - SRS + UC + C4(1-2)
│   ├── semana_11/              # PC3 (40%) - Análisis
│   ├── semana_13/              # PC4 (60%) - Arquitectura + C4(3-4)
│   ├── semana_15/              # PC5 (80%) - Diseño
│   ├── semana_16/              # Final (100%) - Informe + Planes
│   └── beamer_templates/       # Presentaciones
│
└── product/                    # Código fuente
    ├── basic/                  # Track HTML estático
    └── ai/                     # Track Flask + Postgres + Docker
```

---

## 🗓️ CRONOGRAMA

| Semana | Tipo | Entregable | Carpeta | % |
|--------|------|-----------|---------|---|
| **7** | PC2 | Charter + BPMN + Visión + Glosario | `semana_07/` | 10% |
| **8** | Parcial | SRS + UC + Prototipo + C4(1-2) | `semana_08/` | 25% |
| **11** | PC3 | Análisis + Robustez + Estados | `semana_11/` | 40% |
| **13** | PC4 | Arquitectura + C4(3-4) | `semana_13/` | 60% |
| **15** | PC5 | Diseño Completo | `semana_15/` | 80% |
| **16** | Final | Informe + Planes + Demo | `semana_16/` | 100% |

📖 **Ver detalle:** `CRONOGRAMA_SEMANAS.md`

---

## 🚀 INICIO RÁPIDO

### 📄 Compilar Documentación

```bash
# Compilar documentos de una semana
cd deliverables/semana_07/
latexmk -pdf charter.tex

# Generar diagramas
plantuml deliverables/semana_07/bpmn/diagramas/*.puml
```

### 💻 Ejecutar Código

**Track Básico (HTML):**
```bash
cd product/basic/
# Abrir index.html en navegador
```

**Track AI (Docker):**
```bash
cd product/ai/
docker-compose up --build
# Acceder a http://localhost:5000
```

---

## 📝 REGLAS DE REDACCIÓN

### Documentos LaTeX:
- ✅ **Tiempo FUTURO:** "se implementará", "se diseñará"
- ✅ **Voz IMPERSONAL:** tercera persona
- ✅ **Incluir preamble:** `\input{../commons/preamble.tex}`

### Diagramas PlantUML:
- ✅ **Incluir config:** `!include ../../commons/plantuml_config.puml`
- ✅ **Título descriptivo:** `title Diagrama de...`

📖 **Guía completa:** `deliverables/README.md`

---

## 🛠️ TECNOLOGÍAS

### Documentación:
- LaTeX, PlantUML, BibLaTeX, Beamer

### Track Básico:
- HTML5, CSS3, JavaScript, GitHub Pages

### Track AI:
- Flask, PostgreSQL, SQLAlchemy, Docker
- Sentence Transformers (IA)

---

## 📚 DOCUMENTOS CLAVE

1. **README.md** (este archivo) - Inicio rápido
2. **PLAN_PROYECTO.md** - Plan maestro completo
3. **CRONOGRAMA_SEMANAS.md** - Cronograma detallado
4. **deliverables/README.md** - Guía de compilación LaTeX
5. **product/basic/PLAN_BASIC.md** - Plan del track básico
6. **product/ai/PLAN_AI.md** - Plan del track AI

---

## 👥 EQUIPO - GRUPO 6.2

6 integrantes - Roles por semana en `CRONOGRAMA_SEMANAS.md`

---

## ⚠️ NOTAS IMPORTANTES

1. **Separación estricta:** `/deliverables/` = docs, `/product/` = código
2. **Organización:** Carpetas por semana de entrega
3. **Planes en Semana 16:** pruebas, despliegue, config
4. **Tags de versión:** v0.1, v0.2, v0.4, v0.6, v0.8, v1.0

---

## 📄 LICENCIA

Proyecto académico - Universidad Nacional de Ingeniería (UNI)

---

**Última actualización:** Noviembre 2024  
**Versión:** 2.0 (Reorganizado por Semanas)

✅ **Estructura lista para entregas semanales**
