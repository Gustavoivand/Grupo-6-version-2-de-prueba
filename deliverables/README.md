# Deliverables - Documentación Académica BookMate

**Proyecto:** BookMate  
**Curso:** CC341 - Ingeniería de Software  
**Institución:** Universidad Nacional de Ingeniería (UNI)  
**Grupo:** 6

---

## 📋 Descripción

Este directorio contiene toda la documentación académica del proyecto BookMate, **organizada por semanas de entrega** según el calendario del curso CC341.

**Principios de redacción:**
- ✅ **Tiempo verbal:** TODO en tiempo FUTURO ("se implementará", "se diseñará")
- ✅ **Voz:** IMPERSONAL (tercera persona o voz pasiva)
- ✅ **Formato:** LaTeX compilado a PDF
- ✅ **Diagramas:** StarUML XPD (`.uml`) integrados en documentos
- ✅ **Metodología:** S7-11 = Análisis sin tecnologías, S13-16 = Diseño con tecnologías

---

## 📁 Estructura por Semanas

```
deliverables/
├── commons/                    # Archivos comunes reutilizables
│   ├── preamble.tex           # Configuración LaTeX
│   └── referencias.bib        # Bibliografía BibLaTeX
│
├── semana_07/                  # SEMANA 7 - PC2
│   ├── charter.tex
│   ├── glosario.tex
│   ├── presentacion_07.tex
│   └── bpmn/
│       ├── bpmn.tex
│       └── diagramas/
│
├── semana_08/                  # SEMANA 8 - Parcial
│   ├── srs.tex
│   ├── presentacion_08.tex
│   └── diagramas/
│       ├── casos_uso_general.uml
│       └── uc_*.uml
│
├── semana_11/                  # SEMANA 11 - PC3 (40%)
│   ├── analisis.tex
│   ├── presentacion_11.tex
│   └── diagramas/
│
├── semana_13/                  # SEMANA 13 - PC4 (60%)
│   ├── arquitectura.tex
│   ├── plan_desarrollo.tex
│   ├── presentacion_13.tex
│   └── diagramas/
│
├── semana_15/                  # SEMANA 15 - PC5 (80%)
│   ├── diseno.tex
│   ├── presentacion_15.tex
│   └── diagramas/
│
├── semana_16/                  # SEMANA 16 - Final (100%)
│   ├── informe_final.tex
│   ├── pruebas.tex
│   ├── despliegue.tex
│   ├── gestion_config.tex
│   └── diagramas/
│
└── beamer_templates/           # Presentaciones
    └── presentacion_base.tex
```

---

## 📅 Mapeo Semana → Documentos

| Semana | Carpeta | Documentos | Entregable |
|--------|---------|------------|------------|
| **7** | `semana_07/` | charter.tex<br>glosario.tex<br>bpmn/bpmn.tex<br>presentacion_07.tex | PC2 |
| **8** | `semana_08/` | srs.tex<br>Diagramas UC<br>presentacion_08.tex | Parcial |
| **11** | `semana_11/` | analisis.tex<br>Diagramas análisis<br>C4 (C1-C2)<br>CRC<br>presentacion_11.tex | PC3 (40%) |
| **13** | `semana_13/` | arquitectura.tex<br>plan_desarrollo.tex<br>C4 (C3-C4)<br>presentacion_13.tex | PC4 (60%) |
| **15** | `semana_15/` | diseno.tex<br>Diagramas diseño<br>Estados diseño<br>presentacion_15.tex | PC5 (80%) |
| **16** | `semana_16/` | informe_final.tex<br>**pruebas.tex**<br>**despliegue.tex**<br>**gestion_config.tex**<br>presentacion_16.tex | Final (100%) |

---

## 🛠️ Compilación de Documentos LaTeX

### Compilación Manual

```bash
# Ejemplo: Compilar charter
cd deliverables/semana_07/
latexmk -pdf charter.tex
```

### Con latexmk (Recomendado)

```bash
latexmk -pdf documento.tex
```

---

## 📊 Creación de Diagramas UML con StarUML

Los diagramas UML se crean con **StarUML 5** y se guardan en formato XPD (`.uml`), un XML legacy propio de StarUML que permite versionado en Git.

**Ubicación:** `semana_XX/diagramas/*.uml`

**Ventajas:**
- ✅ Formato XML legible y versionable en Git
- ✅ Compatible con StarUML 5 (legacy)
- ✅ Permite edición colaborativa
- ✅ Sin necesidad de compilación (a diferencia de PlantUML)

---

## ✍️ Pautas de Redacción

### Tiempo FUTURO

**Correcto:** "Se implementará un sistema de autenticación..."  
**Incorrecto:** "Implementamos un sistema..."

### Voz IMPERSONAL

**Correcto:** "Se diseñará la arquitectura..."  
**Incorrecto:** "Nosotros diseñaremos..."

---

## 📝 Nota Importante: Análisis vs Diseño

**Semanas 7-11 (Fase de ANÁLISIS):**
- Se modelará el sistema de forma abstracta
- **NO** se mencionarán tecnologías específicas (Spring Boot, PostgreSQL, etc.)
- Enfoque en el dominio del problema, no en la solución técnica

**Semanas 13-16 (Fase de DISEÑO):**
- Se modelará considerando tecnologías específicas
- **SÍ** se mencionarán Spring Boot, PostgreSQL, Docker, Spring Security, etc.
- Enfoque en la arquitectura técnica y decisiones de implementación

---

**Versión:** 2.0 (Reorganizado por semanas)  
**Última actualización:** Noviembre 2025
