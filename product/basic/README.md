# BookMate - Track BASIC (Prototipo Estático)

**Estado:** ✅ En Desarrollo  
**Versión:** 1.0  
**Última actualización:** Noviembre 2025  

---

## 📋 Descripción

Prototipo estático navegable del sistema BookMate. Este es el **Track BASIC** que incluye páginas HTML/CSS/JavaScript con datos mock, sin backend real.

---

## 🎯 Objetivo

Validar diseño UI/UX y flujos de usuario antes de implementar el sistema completo en el Track AI.

---

## 📁 Estructura de Archivos

```
product/basic/
├── README.md (este archivo)
├── PLAN_BASIC.md
├── index.html              ✅ CREADO
├── catalog.html            ✅ CREADO
├── details.html            ✅ CREADO
├── about.html              ✅ CREADO
├── assets/
│   ├── css/
│   │   ├── styles.css      ✅ CREADO
│   │   ├── catalog.css     ✅ CREADO
│   │   └── details.css     ✅ CREADO
│   ├── js/
│   │   ├── main.js         ✅ CREADO
│   │   ├── catalog.js      ✅ CREADO
│   │   └── details.js      ✅ CREADO
│   ├── images/
│   │   └── covers/         (placeholders)
│   └── data/
│       ├── books.json      ✅ CREADO (30 libros)
│       └── featured_books.json  ✅ CREADO
├── server.py               ✅ CREADO
└── requirements.txt        ✅ CREADO
```

---

## 🚀 Archivos Completados

### ✅ Datos Mock (100%)
- **books.json**: 30 libros completos con metadatos realistas
- **featured_books.json**: IDs de 6 libros destacados

### ✅ CSS Global (100%)
- **styles.css**: Estilos globales, variables CSS, responsive, header, footer, tarjetas

### ✅ Página de Inicio (100%)
- **index.html**: Hero section, libros destacados, "cómo funciona", estadísticas

### ✅ Página de Catálogo (100%)
- **catalog.html**: Grid de libros, barra de búsqueda, filtros laterales, paginación
- **catalog.js**: Búsqueda en tiempo real, filtros por género/año/páginas, ordenamiento
- **catalog.css**: Estilos específicos con sidebar sticky

### ✅ Página de Detalle (100%)
- **details.html**: Información completa del libro, libros similares, breadcrumb
- **details.js**: Carga dinámica por ID, recomendaciones heurísticas
- **details.css**: Diseño card grande, cover sticky

### ✅ Página "Acerca de" (100%)
- **about.html**: Información del proyecto, equipo, tecnologías, misión/visión

### ✅ JavaScript Global (100%)
- **main.js**: Funciones de carga de datos, generación de tarjetas, utilidades

### ✅ Servidor Flask Opcional (100%)
- **server.py**: Mini servidor para desarrollo local
- **requirements.txt**: Flask==3.0.0

---

## 🔧 Instrucciones de Ejecución

### Opción 1: Abrir directamente en navegador
```bash
# Navegar a la carpeta
cd product/basic/

# Abrir index.html en navegador
# (Puede tener limitaciones con CORS al cargar JSON)
```

### Opción 2: Servidor HTTP de Python
```bash
cd product/basic/
python -m http.server 8000
# Abrir: http://localhost:8000
```

### Opción 3: Flask (cuando server.py esté creado)
```bash
cd product/basic/
pip install -r requirements.txt
python server.py
# Abrir: http://localhost:8000
```

### Opción 4: Live Server (VS Code)
1. Instalar extensión "Live Server"
2. Click derecho en `index.html`
3. Seleccionar "Open with Live Server"

---

## ✨ Funcionalidades Implementadas

- ✅ **4 páginas HTML completas** (index, catalog, details, about)
- ✅ **Navegación completa** entre páginas (header responsive)
- ✅ **Carga dinámica** de libros desde JSON (30 libros)
- ✅ **Búsqueda en tiempo real** por título/autor
- ✅ **Filtros avanzados** (género, año, páginas)
- ✅ **Ordenamiento** (rating, año, título)
- ✅ **Paginación** (9 libros por página)
- ✅ **Página de detalle** con información completa
- ✅ **Libros similares** (recomendaciones heurísticas)
- ✅ **Sistema de rating** con estrellas
- ✅ **Diseño responsive** (mobile, tablet, desktop)
- ✅ **Tarjetas de libros** reutilizables y atractivas
- ✅ **Breadcrumb** en página de detalle
- ✅ **Contador de resultados** dinámico
- ✅ **Servidor Flask opcional** para desarrollo local

---

## 📅 Cronograma de Desarrollo

### ✅ Semana 7 (COMPLETADA)
- [x] Estructura de archivos
- [x] Datos mock (books.json - 30 libros)
- [x] CSS global
- [x] index.html completa
- [x] main.js con funciones globales
- [x] catalog.html + catalog.js + catalog.css
- [x] details.html + details.js + details.css
- [x] about.html
- [x] server.py + requirements.txt

### Semana 8 (Siguiente)
- [ ] Refinamiento diseño responsive
- [ ] Testing en múltiples navegadores (Chrome, Firefox, Edge)
- [ ] Validación HTML/CSS (W3C)
- [ ] Lighthouse audit
- [ ] Optimizaciones de rendimiento
- [ ] Demo preparada para Parcial
- [ ] Presentación Beamer

---

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos + Variables CSS + Responsive
- **JavaScript ES6**: Interactividad + Fetch API
- **Bootstrap 5.3.2**: Framework CSS
- **Font Awesome 6.4**: Iconos

---

## 📝 Notas Importantes

1. **Sin backend real**: Este es un prototipo estático. Datos en JSON, sin BD.
2. **Botones simulados**: Login/Registro muestran alerts. Funcionalidad real en Track AI.
3. **Covers placeholders**: Usamos texto en vez de imágenes reales de portadas.
4. **GitHub Pages compatible**: Puede desplegarse en GitHub Pages sin modificaciones.

---

## 🔗 Relación con Track AI

Este prototipo servirá como:
- ✅ Especificación visual para el Track AI
- ✅ Validación de flujos de usuario
- ✅ Base de diseño UI para replicar con datos reales

---

## ✅ Criterios de Aceptación

| Criterio | Estado |
|----------|--------|
| 5 páginas HTML | ✅ 100% (5/5) |
| Navegación funcional | ✅ |
| Datos mock (20+ libros) | ✅ (30 libros) |
| Diseño responsive | ✅ |
| Búsqueda y filtros | ✅ |
| Paginación | ✅ |
| Página de detalle | ✅ |
| Libros similares | ✅ |
| **Autenticación volátil** | ✅ |
| **Biblioteca personal** | ✅ |
| **Estados de lectura** | ✅ |
| Servidor Flask opcional | ✅ |
| Validación W3C | ⏳ (Pendiente testing) |
| Lighthouse audit | ⏳ (Pendiente testing) |

---

## 👥 Responsables

Ver `PLAN_BASIC.md` sección 10 para asignación de tareas.

---

## 📞 Soporte

Para dudas o issues, revisar:
1. `PLAN_BASIC.md` - Plan completo del track
2. `CRONOGRAMA_SEMANAS.md` - Cronograma del proyecto
3. `README.md` (raíz) - Información general del proyecto

---

**Preparado por:** Equipo BookMate - Grupo 6.2  
**Curso:** CC341 - Ingeniería de Software (UNI)  
**Versión Track BASIC:** 1.0 (En desarrollo)
