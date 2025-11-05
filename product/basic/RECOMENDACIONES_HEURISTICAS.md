# Sistema de Recomendaciones Heurísticas - BookMate

## ✅ Implementado en Biblioteca Personal

### 🎯 Funcionalidad

Sistema de recomendaciones inteligentes **sin IA** (por ahora) basado en algoritmo heurístico que analiza:
- **Tags similares** (hasta 40 puntos)
- **Mismo autor** (30 puntos)
- **Mismo género** (20 puntos)
- **Rating alto** (10 puntos bonus)

---

## 🚀 Cómo Usar

### 1. Ir a Mi Biblioteca
- Login en BookMate
- Click en "Mi Biblioteca"

### 2. Seleccionar Libros
- Cada libro tiene un checkbox: "✓ Usar para recomendaciones"
- Selecciona **1 o más libros** que te gusten
- El contador muestra: "X libro(s) seleccionado(s)"
- Los libros seleccionados tienen un **borde azul**

### 3. Obtener Recomendaciones
- El botón "Obtener Recomendaciones" se activa (verde) al seleccionar al menos 1 libro
- Click en el botón
- Sistema "analiza" tus preferencias (animación de loading)
- Aparecen **3 recomendaciones** debajo

### 4. Ver Recomendaciones
Cada recomendación muestra:
- **Match score** (puntos de similitud)
- Información del libro (título, autor, rating, género)
- **"Por qué lo recomendamos"** con razones específicas:
  - "Mismo autor: X"
  - "Género: Y"
  - "Tags similares: tag1, tag2..."
  - "Alta calificación: 4.8 ⭐"
- Botón "Agregar a Mi Biblioteca"

---

## 🧮 Algoritmo Heurístico

### Sistema de Puntuación

```javascript
Puntuación Total = Suma de:
├── Mismo Autor: +30 puntos
├── Mismo Género: +20 puntos
├── Tags Similares: +10 puntos por tag (máx 40)
└── Rating Alto (≥4.5): +10 puntos bonus
```

### Ejemplo Práctico

**Libro Seleccionado:**
- Título: "Harry Potter y la Piedra Filosofal"
- Autor: J.K. Rowling
- Género: Fantasía
- Tags: magia, aventura, joven adulto

**Libro Recomendado:**
- Título: "Harry Potter y la Cámara Secreta"
- Autor: J.K. Rowling ✓ (+30)
- Género: Fantasía ✓ (+20)
- Tags: magia ✓, aventura ✓ (+20)
- Rating: 4.7 ✓ (+10)
- **Total: 80 puntos** 🏆

---

## 💡 Características

### Inteligente
- ✅ Analiza múltiples libros simultáneamente
- ✅ Combina preferencias de todos los libros seleccionados
- ✅ Excluye libros ya en tu biblioteca
- ✅ Ordena por score (los mejores primero)

### Visual
- ✅ Checkboxes intuitivos
- ✅ Borde azul en libros seleccionados
- ✅ Contador dinámico
- ✅ Botón que cambia de color
- ✅ Loading con animación
- ✅ Recomendaciones con borde verde
- ✅ Explicación de cada match

### UX
- ✅ Scroll automático a recomendaciones
- ✅ Animación suave (fadeIn)
- ✅ Feedback visual constante
- ✅ Botón "Agregar" directo

---

## 📊 Ubicación de la Funcionalidad

### Actual
**Página de Detalles** (`details.html`):
- Sistema simple de "Libros Similares"
- Basado solo en género O autor
- Muestra 6 libros
- Código en `details.js` líneas 116-136

**Biblioteca Personal** (`library.html`):
- Sistema avanzado con checkboxes
- Algoritmo heurístico multi-factor
- Muestra 3 mejores matches
- Código en `library-page.js`

### Diferencias

| Característica | Details.js | Library.js |
|----------------|------------|------------|
| Activación | Automático | Manual (checkbox) |
| Criterios | Género O Autor | Autor + Género + Tags + Rating |
| Cantidad | 6 libros | 3 mejores |
| Explicación | No | Sí (razones) |
| Puntuación | No | Sí (score) |
| Multi-libro | No | Sí |

---

## 🔮 Migración a IA (Futuro)

En la fase AI (Track AI), este sistema se extenderá:

### Backend Flask
```python
@app.route('/api/recommendations', methods=['POST'])
def get_ai_recommendations():
    book_ids = request.json['book_ids']
    
    # Opción 1: Heurístico (ya implementado)
    if not use_ai:
        return heuristic_recommendations(book_ids)
    
    # Opción 2: IA con embeddings
    embeddings = get_book_embeddings(book_ids)
    similar = find_similar_by_embeddings(embeddings)
    return jsonify(similar)
```

### Con Embeddings
- Usar modelos de NLP (sentence-transformers)
- Generar embeddings de sinopsis
- Similitud coseno entre vectores
- Ranking por similitud semántica
- Fallback a heurístico si falla

### Híbrido
- Combinar score heurístico + score IA
- Peso: 40% heurístico + 60% IA
- Mejor de ambos mundos

---

## 🧪 Testing

### Caso 1: Un Solo Libro
```
1. Selecciona "1984" de George Orwell
2. Click "Obtener Recomendaciones"
3. Espera: Libros de Orwell, distopías, o con tags similares
```

### Caso 2: Múltiples Libros Mismo Género
```
1. Selecciona 3 libros de Fantasía
2. Click "Obtener Recomendaciones"
3. Espera: Más libros de Fantasía con altos scores
```

### Caso 3: Libros Diversos
```
1. Selecciona 1 Terror + 1 Romance + 1 Ciencia Ficción
2. Click "Obtener Recomendaciones"
3. Espera: Mix inteligente que equilibra preferencias
```

### Caso 4: Todos los Libros del Catálogo en Biblioteca
```
1. Agrega todos los libros disponibles
2. Selecciona algunos
3. Click "Obtener Recomendaciones"
4. Resultado: "No se encontraron recomendaciones"
   (porque todos ya están en biblioteca)
```

---

## 📁 Archivos Modificados

```
/product/basic/
├── library.html                    # Agregado UI de recomendaciones
├── assets/
│   ├── js/
│   │   └── library-page.js        # Algoritmo heurístico completo
│   └── css/
│       └── styles.css             # Estilos para checkboxes y animaciones
```

---

## 📊 Métricas

- **Líneas de código:** ~250
- **Funciones nuevas:** 5
  - `toggleBookSelection()`
  - `getRecommendations()`
  - `calculateRecommendations()`
  - `createRecommendationCard()`
  - `updateRecommendationButton()`
- **Algoritmo:** O(n*m) donde n=libros seleccionados, m=catálogo
- **Tiempo de respuesta:** <2 segundos para 30 libros

---

## ✨ Conclusión

Sistema de recomendaciones **funcional y visual** que:
- ✅ No requiere IA (por ahora)
- ✅ Da recomendaciones inteligentes
- ✅ Explica cada match
- ✅ Es fácil de usar
- ✅ Prepara el terreno para IA futura

**Estado:** ✅ Implementado y Funcional

**Última actualización:** 2024-11-05

