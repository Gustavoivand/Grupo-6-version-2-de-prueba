# PLAN DE DESARROLLO - TRACK BASIC

**Proyecto:** BookMate  
**Track:** BASIC (Prototipo Estático Navegable)  
**Curso:** CC341 - Ingeniería de Software (UNI)  
**Grupo:** 6
**Versión:** 1.0  

---

## 1. OBJETIVO DEL TRACK BASIC

El track BASIC se desarrollará como un **prototipo estático navegable** que servirá para:

1. **Validar diseño UI/UX** con stakeholders y usuarios potenciales antes de implementar backend complejo
2. **Cumplir requisitos de prototipo** para entregas académicas tempranas (Semana 8 - Parcial)
3. **Demostrar flujos de usuario** completos de manera visual e interactiva
4. **Facilitar desarrollo frontend** independiente del backend (trabajo paralelo)
5. **Servir como especificación visual** para el track AI (qué páginas y componentes se implementarán)

**Características principales:**
- Páginas HTML/CSS/JavaScript estáticas
- Datos mock en archivos JSON (sin base de datos)
- Navegación funcional entre páginas
- Diseño responsive (mobile, tablet, desktop)
- Interacciones simuladas con JavaScript
- **Opcional:** Mini servidor Flask para desarrollo local (solo entorno dev, no producción)

**Alcance:**
- ✅ **Incluido:** UI completa, flujos de usuario, datos mock, diseño responsive
- ❌ **Excluido:** Backend real, autenticación real, base de datos, persistencia, IA

---

## 2. PÁGINAS A DESARROLLAR

### 2.1 Página de Inicio (`index.html`)

**Objetivo:** Presentar el sistema BookMate y dar acceso rápido a funcionalidades principales.

**Componentes:**
- **Header:** Logo BookMate, navegación (Inicio, Catálogo, Mi Biblioteca, Acerca de), botones Login/Registro
- **Hero Section:** Banner con mensaje principal ("Descubre tu próxima lectura favorita"), CTA "Explorar catálogo"
- **Sección Destacados:** Carrusel con 5-6 libros destacados (simulado con datos mock)
- **Sección Cómo Funciona:** 3 pasos (Registra, Agrega libros, Recibe recomendaciones) con iconos
- **Footer:** Links legales, redes sociales, copyright

**Interacciones:**
- Carrusel de libros con flechas navegación
- Hover effects en botones y tarjetas
- Click en libros destacados → navega a `details.html?id=X`
- Click en "Explorar catálogo" → navega a `catalog.html`

**Datos mock requeridos:**
- 5-6 libros destacados en `assets/data/featured_books.json`

---

### 2.2 Página de Catálogo (`catalog.html`)

**Objetivo:** Mostrar todos los libros disponibles con capacidades de búsqueda y filtrado.

**Componentes:**
- **Header:** Igual que index.html
- **Barra de búsqueda:** Input text con botón "Buscar" (búsqueda por título/autor simulada con JS)
- **Filtros laterales (sidebar):**
  - Por género (checkboxes: Ficción, No ficción, Ciencia, Historia, etc.)
  - Por año (rango: 1900-2024)
  - Por número de páginas (rangos: <200, 200-400, 400-600, >600)
  - Botón "Limpiar filtros"
- **Grid de libros:** Tarjetas con cover, título, autor, año, rating (estrellas), botón "Ver detalle"
- **Paginación:** Navegación por páginas (10 libros por página)
- **Footer:** Igual que index.html

**Interacciones:**
- Búsqueda en tiempo real (filtra libros mientras se escribe)
- Aplicar filtros → actualiza grid dinámicamente con JavaScript
- Click en tarjeta de libro → navega a `details.html?id=X`
- Paginación funcional (anterior, números de página, siguiente)

**Datos mock requeridos:**
- 20-30 libros en `assets/data/books.json` con campos:
  ```json
  {
    "id": 1,
    "title": "Cien años de soledad",
    "author": "Gabriel García Márquez",
    "year": 1967,
    "genre": "Ficción",
    "pages": 417,
    "rating": 4.8,
    "cover": "assets/images/covers/cien-anos-soledad.jpg",
    "synopsis": "La historia de la familia Buendía a lo largo de siete generaciones...",
    "isbn": "978-0307474728",
    "tags": ["Realismo mágico", "Clásico", "Latinoamérica"]
  }
  ```

---

### 2.3 Página de Detalle de Libro (`details.html`)

**Objetivo:** Mostrar información completa de un libro específico.

**Componentes:**
- **Header:** Igual que páginas anteriores
- **Sección principal:**
  - Cover del libro (imagen grande)
  - Título, autor, año, páginas, ISBN
  - Rating con estrellas + número de valoraciones
  - Tags (badges: género, etiquetas temáticas)
  - Sinopsis completa (2-3 párrafos)
  - Botón "Agregar a Mi Biblioteca" (simulado con alert o modal)
  - Dropdown "Estado de lectura" (Leído, Leyendo, Por leer) - solo visual
- **Sección "Libros similares":** Grid de 4-6 libros recomendados (simulación heurística simple: misma genre o autor)
- **Footer:** Igual que páginas anteriores

**Interacciones:**
- Obtener ID de libro de URL query parameter (`?id=1`)
- Cargar datos del libro desde JSON mediante JavaScript
- Click en "Agregar a Mi Biblioteca" → mostrar alert "Libro agregado a tu biblioteca" (simulado)
- Click en libros similares → navega a `details.html?id=Y`
- Si ID no existe → mostrar mensaje "Libro no encontrado"

**Datos mock requeridos:**
- Usar mismo `assets/data/books.json` que catalog.html
- Lógica JS para encontrar libro por ID
- Lógica JS simple para recomendaciones: filtrar libros del mismo género o autor

---

### 2.4 Página "Acerca de" (`about.html`)

**Objetivo:** Presentar el proyecto BookMate y el equipo.

**Componentes:**
- **Header:** Igual que páginas anteriores
- **Sección "Sobre BookMate":** Descripción del proyecto (2-3 párrafos), misión, visión
- **Sección "Funcionalidades":** Lista con iconos:
  - Catálogo extenso de libros
  - Búsqueda y filtros avanzados
  - Biblioteca personal
  - Recomendaciones inteligentes (heurísticas e IA)
- **Sección "Tecnologías":** Badges de tecnologías usadas (Flask, PostgreSQL, Docker, IA)
- **Sección "Equipo":** Tarjetas de los 6 integrantes con foto placeholder, nombre, rol
- **Footer:** Igual que páginas anteriores

**Interacciones:**
- Página informativa estática, sin interacciones complejas
- Links externos a tecnologías (opcional)

**Datos mock requeridos:**
- Información del equipo en `assets/data/team.json` (opcional, puede estar hardcodeado en HTML)

---

## 3. ESTRUCTURA DE ARCHIVOS

```
product/basic/
├── PLAN_BASIC.md (este archivo)
├── README.md (instrucciones de ejecución)
├── index.html
├── catalog.html
├── details.html
├── about.html
├── assets/
│   ├── css/
│   │   ├── styles.css (estilos globales)
│   │   ├── catalog.css (estilos específicos catálogo)
│   │   └── details.css (estilos específicos detalle)
│   ├── js/
│   │   ├── main.js (funciones globales, navegación)
│   │   ├── catalog.js (lógica búsqueda, filtros, paginación)
│   │   └── details.js (cargar detalle, recomendaciones)
│   ├── images/
│   │   ├── logo.png
│   │   ├── hero-banner.jpg
│   │   └── covers/ (imágenes de portadas de libros)
│   │       ├── book1.jpg
│   │       ├── book2.jpg
│   │       └── ...
│   └── data/
│       ├── books.json (20-30 libros mock)
│       ├── featured_books.json (5-6 IDs de libros destacados)
│       └── team.json (información del equipo - opcional)
├── server.py (Flask opcional para desarrollo local)
└── requirements.txt (si se usa Flask opcional)
```

---

## 4. DATOS MOCK

### 4.1 Estructura de `assets/data/books.json`

Se creará un archivo JSON con 20-30 libros realistas con la siguiente estructura:

```json
[
  {
    "id": 1,
    "title": "Cien años de soledad",
    "author": "Gabriel García Márquez",
    "year": 1967,
    "genre": "Ficción",
    "pages": 417,
    "rating": 4.8,
    "reviews_count": 2543,
    "cover": "assets/images/covers/cien-anos-soledad.jpg",
    "synopsis": "La historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo. Una obra maestra del realismo mágico que narra el auge y la caída de una dinastía marcada por la soledad, el amor y la tragedia.",
    "isbn": "978-0307474728",
    "tags": ["Realismo mágico", "Clásico", "Latinoamérica", "Épico"]
  },
  {
    "id": 2,
    "title": "1984",
    "author": "George Orwell",
    "year": 1949,
    "genre": "Ciencia ficción",
    "pages": 328,
    "rating": 4.7,
    "reviews_count": 3821,
    "cover": "assets/images/covers/1984.jpg",
    "synopsis": "En un futuro distópico, Winston Smith vive en Oceanía, un estado totalitario donde el Partido controla cada aspecto de la vida. Una novela visionaria sobre vigilancia, manipulación y resistencia.",
    "isbn": "978-0451524935",
    "tags": ["Distopía", "Clásico", "Político", "Ciencia ficción"]
  }
  // ... 18-28 libros más
]
```

**Géneros a incluir:**
- Ficción (5-7 libros)
- No ficción (3-4 libros)
- Ciencia ficción (3-4 libros)
- Historia (2-3 libros)
- Biografía (2-3 libros)
- Técnico/Ingeniería (2-3 libros - relevante para audiencia UNI)

**Fuentes de datos sugeridas:**
- Goodreads (copiar metadatos de libros populares)
- Open Library API
- Datos manuales para libros conocidos

---

## 5. SERVIDOR FLASK OPCIONAL (SOLO DESARROLLO)

### 5.1 Propósito

Se podrá crear un **mini servidor Flask opcional** SOLO para facilitar desarrollo local, con las siguientes características:

- **Servir archivos estáticos** (HTML, CSS, JS, imágenes)
- **Habilitar CORS** si se hacen peticiones AJAX desde diferente puerto
- **NO implementar backend real** (sin BD, sin autenticación real, sin lógica de negocio)

### 5.2 Código de `server.py`

```python
"""
Mini servidor Flask OPCIONAL para desarrollo local del track BASIC.
NO es parte del producto final. Solo facilita servir archivos estáticos.
"""
from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    print("=" * 60)
    print("Servidor de desarrollo BÁSICO iniciado")
    print("Accede a: http://localhost:8000")
    print("NOTA: Este servidor es SOLO para desarrollo local")
    print("      NO incluye backend real, BD ni autenticación")
    print("=" * 60)
    app.run(host='0.0.0.0', port=8000, debug=True)
```

### 5.3 `requirements.txt` (opcional)

```
Flask==3.0.0
```

### 5.4 Ejecución

```bash
cd product/basic/
pip install -r requirements.txt
python server.py
# Abrir navegador en http://localhost:8000
```

**Alternativa sin Flask:** Abrir `index.html` directamente en navegador (puede tener limitaciones con CORS al cargar JSON).

---

## 6. PUBLICACIÓN EN GITHUB PAGES

### 6.1 Posibilidad y Limitaciones

El track BASIC **puede publicarse en GitHub Pages** con las siguientes consideraciones:

**✅ Funciona en GitHub Pages:**
- Páginas HTML estáticas
- Archivos CSS y JavaScript
- Imágenes
- Archivos JSON (cargados con fetch/AJAX)
- Navegación entre páginas

**❌ NO funciona en GitHub Pages:**
- Backend Flask (server.py)
- Cualquier código Python del lado servidor
- Base de datos

### 6.2 Pasos para Publicar

1. **Configurar repositorio:**
   - Ir a Settings → Pages
   - Source: Deploy from a branch
   - Branch: main (o rama específica) → Carpeta: `/product/basic/` o `/` (según estructura)
   - Save

2. **Ajustar rutas:**
   - Asegurar que rutas en HTML sean relativas: `assets/css/styles.css` en vez de `/assets/css/styles.css`
   - Verificar que fetch de JSON use rutas relativas: `fetch('./assets/data/books.json')`

3. **Commit y push:**
   ```bash
   git add product/basic/
   git commit -m "feat: agregar prototipo estático track BASIC"
   git push origin main
   ```

4. **Acceder:**
   - URL será: `https://<usuario>.github.io/<repo>/` o `https://<usuario>.github.io/<repo>/product/basic/`

**NOTA IMPORTANTE:** El servidor Flask (`server.py`) **NO se ejecutará** en GitHub Pages. Solo sirve para desarrollo local. En GitHub Pages, los archivos se sirven directamente como estáticos.

---

## 7. TECNOLOGÍAS A UTILIZAR

### 7.1 Frontend

- **HTML5:** Estructura semántica de páginas
- **CSS3:** Estilos, animaciones, transiciones
- **JavaScript (ES6+):** Interactividad, carga de datos JSON, filtros, búsqueda

### 7.2 Framework CSS (a elegir uno)

**Opción A: Bootstrap 5**
- **Ventajas:** Componentes pre-construidos (navbar, cards, modals), grid system robusto, documentación extensa
- **Desventajas:** Archivos más pesados, diseño "genérico"
- **Recomendado si:** Equipo tiene experiencia con Bootstrap o prioriza velocidad de desarrollo

**Opción B: Tailwind CSS**
- **Ventajas:** Diseño personalizado con utility classes, archivos optimizados con purge CSS, moderno
- **Desventajas:** Curva de aprendizaje, clases muy verbosas en HTML
- **Recomendado si:** Equipo busca diseño único y está dispuesto a aprender

**Opción C: CSS Vanilla**
- **Ventajas:** Control total, sin dependencias, archivos mínimos
- **Desventajas:** Más tiempo de desarrollo, debe implementar grid/responsive manualmente
- **Recomendado si:** Equipo quiere demostrar habilidades CSS puras

**Decisión sugerida:** Bootstrap 5 para velocidad y cumplir tiempos académicos ajustados.

### 7.3 Librerías JavaScript Opcionales

- **Iconos:** Font Awesome o Bootstrap Icons
- **Carrusel:** Swiper.js (si se necesita carrusel avanzado)
- **Rating estrellas:** Librería simple o implementación custom con CSS

---

## 8. CRITERIOS DE ACEPTACIÓN DEL PROTOTIPO

### 8.1 Funcionalidad

- ✅ **Navegación:** Todas las páginas (index, catalog, details, about) son accesibles mediante header
- ✅ **Búsqueda:** Búsqueda por título/autor filtra resultados en tiempo real en catalog.html
- ✅ **Filtros:** Filtros por género, año y páginas actualizan grid de libros dinámicamente
- ✅ **Paginación:** Navegación entre páginas de catálogo funciona correctamente (si hay 30 libros, 3 páginas de 10)
- ✅ **Detalle:** Página details.html carga información completa del libro según ID en URL
- ✅ **Recomendaciones:** Sección "Libros similares" en details.html muestra 4-6 libros relevantes (mismo género o autor)
- ✅ **Interacciones:** Botones, links y elementos interactivos responden correctamente

### 8.2 Diseño

- ✅ **Responsive:** Diseño adaptado a 3 tamaños:
  - Mobile (320px - 767px): navegación colapsable, cards en 1 columna
  - Tablet (768px - 1023px): grid de 2 columnas
  - Desktop (1024px+): grid de 3-4 columnas
- ✅ **Consistencia:** Header y footer idénticos en todas las páginas
- ✅ **Tipografía:** Fuentes legibles, jerarquía visual clara (títulos, subtítulos, body)
- ✅ **Colores:** Paleta de colores coherente, buen contraste para accesibilidad
- ✅ **Imágenes:** Covers de libros cargando correctamente, fallback si imagen falta
- ✅ **UX:** Feedback visual en interacciones (hover effects, active states, loading indicators)

### 8.3 Datos

- ✅ **Cantidad:** Mínimo 20 libros en `books.json`
- ✅ **Calidad:** Metadatos realistas y completos (título, autor, año, synopsis, ISBN, tags, cover)
- ✅ **Variedad:** Libros de diferentes géneros, años y autores
- ✅ **Covers:** Imágenes de portadas (pueden ser placeholders con colores y títulos si no se encuentran imágenes reales)

### 8.4 Código

- ✅ **Estructura:** Separación clara de HTML, CSS y JS en carpetas
- ✅ **Nombres:** Nombres de archivos y variables descriptivos (camelCase para JS, kebab-case para archivos)
- ✅ **Comentarios:** Código JavaScript comentado explicando lógica compleja
- ✅ **Validación:** HTML válido (verificar con W3C Validator)
- ✅ **Sin errores:** Console del navegador sin errores JavaScript

### 8.5 Documentación

- ✅ **README.md:** Instrucciones claras de cómo ejecutar el prototipo (con y sin Flask)
- ✅ **Comentarios HTML:** Secciones del HTML comentadas para facilitar navegación
- ✅ **Estructura:** PLAN_BASIC.md (este documento) actualizado con decisiones de implementación

### 8.6 Validación

Se realizarán las siguientes validaciones:

1. **Testing manual:**
   - Probar en 3 navegadores: Chrome, Firefox, Edge
   - Probar en 3 tamaños: mobile (iPhone SE), tablet (iPad), desktop (1920x1080)
   - Verificar flujos de usuario completos:
     - Usuario entra a index → explora catálogo → busca libro → ve detalle → ve recomendaciones
     - Usuario filtra por género → pagina resultados → ve detalles de diferentes libros

2. **Testing técnico:**
   - HTML validado con W3C Markup Validator
   - CSS validado con W3C CSS Validator
   - Lighthouse audit (Performance, Accessibility, Best Practices, SEO) con scores >80

3. **Testing con usuarios:**
   - Mostrar prototipo a 2-3 personas (compañeros, docente, familia)
   - Recopilar feedback sobre usabilidad, claridad, diseño
   - Iterar según comentarios

---

## 9. CRONOGRAMA DE DESARROLLO

### Semana 7 (5 días)

**Día 1-2:**
- Definir paleta de colores, tipografía y estilo visual
- Crear estructura base de archivos y carpetas
- Preparar datos mock (20-30 libros en JSON)

**Día 3:**
- Desarrollar index.html y estilos globales
- Implementar header y footer reutilizables

**Día 4:**
- Desarrollar catalog.html con grid de libros
- Implementar búsqueda y filtros en JavaScript

**Día 5:**
- Desarrollar details.html
- Implementar carga dinámica de libro por ID

### Semana 8 (3 días antes de Parcial)

**Día 1:**
- Desarrollar about.html
- Implementar sección de recomendaciones en details.html

**Día 2:**
- Refinamiento de diseño responsive
- Testing en múltiples navegadores y dispositivos
- Corrección de bugs

**Día 3:**
- Validación HTML/CSS
- Lighthouse audit y optimizaciones
- Preparación de demo para Parcial
- Actualización de README.md con instrucciones finales

---

## 10. ROLES Y RESPONSABILIDADES

| Tarea | Responsable Sugerido | Tiempo Estimado |
|-------|---------------------|-----------------|
| Diseño UI/UX (wireframes, mockups) | Integrante 4 | 1 día |
| Datos mock (books.json) | Integrante 5 | 0.5 día |
| index.html + CSS | Integrante 4 | 1 día |
| catalog.html + JS (búsqueda, filtros) | Integrante 4 + Integrante 2 | 1.5 días |
| details.html + JS (carga dinámica) | Integrante 4 | 1 día |
| about.html | Integrante 1 | 0.5 día |
| server.py (Flask opcional) | Integrante 3 | 0.5 día |
| Testing y validación | Integrante 6 | 1 día |
| README y documentación | Integrante 1 | 0.5 día |

**Total:** ~7 días (distribuido entre 6 integrantes)

---

## 11. RIESGOS Y MITIGACIONES

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Retraso en diseño UI | Media | Medio | Usar plantilla Bootstrap pre-construida, adaptar en vez de crear desde cero |
| Datos mock insuficientes | Baja | Bajo | Asignar responsable específico (Integrante 5) con deadline claro |
| Problemas con CORS al cargar JSON | Media | Bajo | Usar servidor Flask opcional o configurar Live Server en VS Code |
| Diseño no responsive | Media | Alto | Usar framework CSS (Bootstrap) con grid system probado, testing temprano en móvil |
| Código JavaScript complejo | Media | Medio | Pair programming, revisión de código, usar funciones simples |

---

## 12. RELACIÓN CON TRACK AI

El track BASIC servirá como **especificación visual** para el track AI:

- **Diseño UI:** Se replicarán los mismos estilos, componentes y layout en el frontend del track AI
- **Flujos de usuario:** Los flujos validados en BASIC se implementarán con funcionalidad real en AI
- **Componentes:** Cards de libros, formularios, modals se reutilizarán con datos reales

**Diferencias:**
- BASIC: datos mock en JSON, sin backend, sin autenticación real
- AI: datos en PostgreSQL, backend Flask, autenticación JWT, recomendaciones IA

---

## 13. ENTREGABLES FINALES DEL TRACK BASIC

1. **Código fuente:**
   - 4 páginas HTML completas y funcionales
   - Archivos CSS organizados
   - Archivos JavaScript con lógica de búsqueda, filtros y navegación
   - Datos mock en JSON (20-30 libros)
   - Imágenes de portadas

2. **Documentación:**
   - PLAN_BASIC.md (este documento)
   - README.md con instrucciones de ejecución
   - Comentarios en código

3. **Demo:**
   - Prototipo navegable accesible localmente o en GitHub Pages
   - Video de demostración de 2-3 minutos (opcional)

4. **Validaciones:**
   - Reporte de validación HTML/CSS (W3C)
   - Captura de pantalla de Lighthouse scores
   - Evidencia de testing en 3 navegadores y 3 tamaños

---

## 14. CRITERIOS DE ÉXITO

El track BASIC se considerará exitoso si cumple:

1. ✅ **Aprobación académica:** Prototipo aceptado como parte del entregable de Semana 8 (Parcial)
2. ✅ **Funcionalidad completa:** Todas las páginas navegables, búsqueda y filtros operativos
3. ✅ **Diseño profesional:** UI atractiva, responsive, sin errores visuales
4. ✅ **Validación técnica:** HTML/CSS válidos, Lighthouse scores >80, sin errores en console
5. ✅ **Utilidad:** Sirve como base para desarrollo del track AI

---

## 15. TRABAJO FUTURO (FUERA DE ALCANCE TRACK BASIC)

El track BASIC NO implementará:

- Backend real (Flask con lógica de negocio)
- Base de datos (PostgreSQL)
- Autenticación real (JWT, sesiones)
- Biblioteca personal persistente
- Recomendaciones reales (heurística o IA)
- Docker

Estas funcionalidades se desarrollarán en el **Track AI** a partir de la Semana 11.

---

**Preparado por:** Equipo BookMate - Grupo 6
**Fecha:** Noviembre 2025
**Versión:** 1.0  
**Estado:** En planificación
