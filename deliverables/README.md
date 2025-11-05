# Deliverables - Documentación Académica BookMate

**Proyecto:** BookMate  
**Curso:** CC341 - Ingeniería de Software  
**Institución:** Universidad Nacional de Ingeniería (UNI)  
**Grupo:** 6.2  

---

## 📋 Descripción

Este directorio contiene toda la documentación académica del proyecto BookMate, **organizada por semanas de entrega** según el calendario del curso CC341.

**Principios de redacción:**
- ✅ **Tiempo verbal:** TODO en tiempo FUTURO ("se implementará", "se diseñará")
- ✅ **Voz:** IMPERSONAL (tercera persona o voz pasiva)
- ✅ **Formato:** LaTeX compilado a PDF
- ✅ **Diagramas:** PlantUML (`.puml`) integrados en documentos

---

## 📁 Estructura por Semanas

```
deliverables/
├── commons/                    # Archivos comunes reutilizables
│   ├── preamble.tex           # Configuración LaTeX
│   ├── referencias.bib        # Bibliografía BibLaTeX
│   └── plantuml_config.puml   # Estilos UML
│
├── semana_07/                  # SEMANA 7 - PC2
│   ├── charter.tex
│   ├── glosario.tex
│   └── bpmn/
│       ├── bpmn.tex
│       └── diagramas/
│
├── semana_08/                  # SEMANA 8 - Parcial
│   ├── srs.tex
│   └── diagramas/
│       ├── casos_uso_general.puml
│       ├── uc_*.puml
│       └── c4/
│
├── semana_11/                  # SEMANA 11 - PC3 (40%)
│   ├── analisis.tex
│   └── diagramas/
│
├── semana_13/                  # SEMANA 13 - PC4 (60%)
│   ├── arquitectura.tex
│   ├── plan_desarrollo.tex
│   └── diagramas/
│
├── semana_15/                  # SEMANA 15 - PC5 (80%)
│   ├── diseno.tex
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
| **7** | `semana_07/` | charter.tex<br>glosario.tex<br>bpmn/bpmn.tex | PC2 |
| **8** | `semana_08/` | srs.tex<br>Diagramas UC<br>C4 (C1-C2) | Parcial |
| **11** | `semana_11/` | analisis.tex<br>Diagramas análisis | PC3 (40%) |
| **13** | `semana_13/` | arquitectura.tex<br>plan_desarrollo.tex<br>C4 (C3-C4) | PC4 (60%) |
| **15** | `semana_15/` | diseno.tex<br>Diagramas diseño | PC5 (80%) |
| **16** | `semana_16/` | informe_final.tex<br>**pruebas.tex**<br>**despliegue.tex**<br>**gestion_config.tex** | Final (100%) |

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

## 📊 Generación de Diagramas PlantUML

```bash
# Generar PNG de todos los diagramas
plantuml semana_*/diagramas/**/*.puml

# O específico
plantuml semana_07/bpmn/diagramas/proceso_actual.puml
```

---

## ✍️ Pautas de Redacción

### Tiempo FUTURO

**Correcto:** "Se implementará un sistema de autenticación..."  
**Incorrecto:** "Implementamos un sistema..."

### Voz IMPERSONAL

**Correcto:** "Se diseñará la arquitectura..."  
**Incorrecto:** "Nosotros diseñaremos..."

---

**Versión:** 2.0 (Reorganizado por semanas)  
**Última actualización:** Noviembre 2024
