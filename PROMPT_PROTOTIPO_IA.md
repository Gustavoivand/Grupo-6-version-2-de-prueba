# Prompt Figma: BookMate con Recomendaciones IA

## Contexto
BookMate: sistema de recomendación de libros con dos métodos:
1. **Heurístico**: Metadatos (autor, género, tags, rating)
2. **IA**: Similitud semántica del contenido

**Objetivo**: Prototipo visual en Figma mostrando interfaz con recomendaciones IA e indicadores visuales del método.

## Páginas Principales

**Biblioteca Personal**: Lista libros por estado (Para leer/Leyendo/Leído), checkboxes para seleccionar, botón "Obtener Recomendaciones", sección con top 3 tarjetas.

**Detalle de Libro**: Portada, título, autor, sinopsis, rating, tags, botones "Agregar a Biblioteca"/"Estado", sección "Libros Similares con IA" (grid 6 libros).

**Catálogo**: Búsqueda, filtros, grid de libros.

## Componentes UI

**Badge Método:**
- IA: Verde 🤖 "IA" (#28a745)
- Heurístico: Amarillo ⚙️ "Heurístico" (#ffc107)

**Tarjeta Recomendación:**
- Header: badge método + puntuación
- Portada, título, autor, rating
- Razones: IA="Similitud semántica: 87%", Heurístico="Mismo autor", "Género: Ficción"
- Botón "Agregar a Biblioteca"
- Tiempo procesamiento (solo IA)

**Estados Carga:**
- IA: "🤖 Analizando con IA..." + spinner
- Heurístico: "⚙️ Calculando..." + spinner

**Indicador Similitud (IA):**
- Porcentaje "87% similitud semántica"
- Verde (>70%), Amarillo (40-70%), Gris (<40%)

## Flujos

**Flujo 1 - IA:**
1. Usuario selecciona 2-3 libros
2. Click "Obtener Recomendaciones"
3. Loading: "🤖 Analizando con IA..."
4. Resultado: 3 tarjetas verde "IA", porcentaje similitud, razones semánticas, tiempo "1.2s"

**Flujo 2 - Heurístico:**
1. Usuario solicita recomendaciones
2. Loading: "⚙️ Usando método heurístico..."
3. Resultado: 3 tarjetas amarillo "Heurístico", puntuación (ej: 50), razones: "Mismo autor", "Género: Ficción"

**Flujo 3 - Similares en Detalle:**
1. Usuario visita detalle libro
2. Scroll a "Libros Similares"
3. Grid 6 libros con badge "IA" y porcentaje similitud

## Diseño

**Colores:** Primario #007bff, IA #28a745, Heurístico #ffc107, Fondo #f8f9fa

**Iconos:** 🤖 IA, ⚙️ Heurístico, ⭐ Rating, 📚 Biblioteca

**Estados:** Inicial, Cargando IA, Cargando Heurístico, Éxito IA (3 tarjetas verde), Éxito Heurístico (3 tarjetas amarillo), Error, Vacío

## Datos Ejemplo

**IA:** "El amor en los tiempos del cólera" - 89% similitud - "Mismo autor y temas similares"

**Heurístico:** "Crónica de una muerte anunciada" - 50 puntos - "Mismo autor: García Márquez", "Género: Ficción"

## Interacciones Figma

- Click "Obtener Recomendaciones" → Transición carga → Resultados
- Hover tarjeta → Elevación/sombra
- Variantes: Tarjeta IA vs Heurístico, Badge verde vs amarillo
- Responsive: Mobile 1 col, Tablet 2 cols, Desktop 3 cols

## Resumen

**Crear:**
- Página Biblioteca con recomendaciones (variantes IA/heurístico)
- Página Detalle con "Libros Similares"
- Componentes: Tarjetas, badges, estados carga
- Indicadores visuales claros método IA vs heurístico
- Flujos interactivos con transiciones
- Diseño responsive

**Enfoque:** UI/UX visual, no implementación técnica.
