# Sistema de Administración - BookMate

## ✅ Implementación Completada

Este documento describe el **sistema de administración** implementado en el producto básico de BookMate, que permite a usuarios con rol de administrador gestionar el catálogo de libros.

---

## 🔑 Credenciales de Administrador

Para acceder al panel de administración, usa estas credenciales:

- **Email:** `admin@bookmate.com`
- **Contraseña:** `admin123`
- **Rol:** `admin`

---

## 🎯 Funcionalidades Implementadas

### 1. Sistema de Roles

**Dos roles de usuario:**
- **`user`**: Usuario normal (puede ver catálogo y gestionar su biblioteca)
- **`admin`**: Administrador (además de lo anterior, puede gestionar el catálogo)

**Características:**
- Los nuevos registros son `user` por defecto
- Usuarios predefinidos: 1 admin + 1 user demo
- Verificación de rol en cada operación administrativa
- Protección de rutas: `admin.html` solo accesible para admins

### 2. Panel de Administración (`admin.html`)

#### Dashboard con Estadísticas

Muestra métricas en tiempo real:
- **Total de libros** en el catálogo
- **Rating promedio** de todos los libros
- **Total de reviews** acumuladas
- **Número de géneros** únicos

#### Gestión de Libros

**Tabla interactiva** con:
- Paginación (10 libros por página)
- Búsqueda en tiempo real (título, autor, género)
- Ordenamiento por columnas
- Vista responsive

**Acciones por libro:**
- ✏️ **Editar**: Modificar todos los campos del libro
- 🗑️ **Eliminar**: Eliminar libro con confirmación

#### Acciones Globales

Botones de acción rápida:
- ➕ **Agregar Nuevo Libro**: Formulario completo
- 📤 **Importar desde CSV**: Carga masiva de libros
- 📥 **Exportar a CSV**: Descargar catálogo actual
- 📄 **Descargar Plantilla CSV**: Template para importación
- 🔄 **Resetear Catálogo**: Restaurar a libros originales

### 3. Agregar/Editar Libros

**Formulario modal** con campos:
- **Título*** (obligatorio)
- **Autor*** (obligatorio)
- **Año*** (obligatorio, numérico)
- **Páginas*** (obligatorio, numérico)
- **Género*** (obligatorio, selector)
- **Rating*** (obligatorio, 0-5)
- **Reviews** (opcional, numérico)
- **ISBN*** (obligatorio)
- **Sinopsis*** (obligatoria, textarea)
- **Tags** (opcional, separados por coma)

**Validaciones:**
- Campos obligatorios marcados con *
- Validación de tipos de datos
- Rating entre 0 y 5
- Año entre 1000 y 2100
- Tags convertidos a array automáticamente

**Funcionamiento:**
- **Agregar**: Genera ID único automáticamente
- **Editar**: Mantiene ID original, actualiza resto de campos
- **Guardado**: Inmediato en localStorage
- **Feedback**: Alertas de éxito/error

### 4. Importar Libros desde CSV

**Características:**
- Upload de archivo `.csv` desde el navegador
- Parsing inteligente con manejo de comillas y comas
- Validación de columnas requeridas
- Generación automática de IDs únicos
- Conversión automática de tipos de datos

**Formato CSV esperado:**

```csv
title,author,year,pages,genre,rating,reviews_count,isbn,synopsis,tags
"El Quijote","Miguel de Cervantes",1605,863,"Clásico",4.8,12500,"978-84-376-0494-7","Las aventuras del ingenioso hidalgo","clásico;aventura;español"
"1984","George Orwell",1949,328,"Ficción",4.9,25000,"978-0-452-28423-4","Una distopía totalitaria","distopía;ficción;clásico"
```

**Columnas obligatorias:**
- `title`, `author`, `year`, `pages`, `genre`, `rating`, `synopsis`, `isbn`

**Columnas opcionales:**
- `reviews_count`, `tags`

**Tags:**
- Pueden ir separados por `;` o `,`
- Se convierten automáticamente a array

**Proceso:**
1. Admin hace click en "Importar desde CSV"
2. Selecciona archivo `.csv`
3. Sistema valida formato y columnas
4. Si es válido, agrega libros al catálogo existente
5. Muestra mensaje con cantidad de libros importados
6. Recarga tabla automáticamente

### 5. Exportar Catálogo a CSV

**Características:**
- Exporta catálogo completo actual
- Incluye todas las columnas
- Formato compatible con importación
- Nombre de archivo con fecha: `bookmate_catalog_YYYY-MM-DD.csv`
- Descarga inmediata al navegador

**Uso:**
```
Admin → Click "Exportar a CSV" → Descarga automática
```

**Utilidad:**
- Backup del catálogo
- Edición masiva en Excel/Google Sheets
- Migración a otra máquina
- Compartir catálogo con otros admins

### 6. Plantilla CSV

**Características:**
- Descarga archivo CSV de ejemplo
- Incluye 2 libros de muestra
- Muestra el formato exacto esperado
- Headers correctos
- Ejemplos de tags

**Uso:**
```
Admin → Click "Descargar Plantilla CSV" → Descarga template
→ Editar en Excel → Agregar libros → Guardar como CSV
→ Importar con "Importar desde CSV"
```

### 7. Resetear Catálogo

**Características:**
- Elimina `localStorage` de libros
- Restaura catálogo a `books.json` original
- Confirmación obligatoria
- No afecta usuarios ni bibliotecas

**Uso:**
```
Admin → Click "Resetear a Catálogo Original" 
→ Confirmar → localStorage limpio 
→ Próxima carga usa books.json
```

---

## 📊 Arquitectura y Persistencia

### Estrategia de Almacenamiento

```
┌─────────────────────────────────────────┐
│        Jerarquía de Lectura             │
├─────────────────────────────────────────┤
│  1. localStorage['bookmate_books']      │  ← Admin modifica aquí
│     ↓ Si existe                         │
│     Usar estos libros ✅                │
│                                         │
│  2. assets/data/books.json              │  ← Fallback
│     ↓ Si no hay localStorage            │
│     Cargar originales ✅                │
└─────────────────────────────────────────┘
```

### Flujo de Datos

**Cuando Admin Agrega/Edita/Elimina:**
```
1. Operación en BookManager
2. BookManager actualiza localStorage
3. localStorage['bookmate_books'] = nuevo estado
4. clearBooksCache() limpia caché en memoria
5. Próxima carga lee de localStorage ✅
```

**Cuando User Normal Carga Catálogo:**
```
1. loadBooks() en main.js
2. Verifica localStorage primero
3. Si admin modificó → lee localStorage ✅
4. Si no → lee books.json (original) ✅
5. User ve cambios del admin ✅
```

### Compartir entre Usuarios (Mismo Navegador)

```
┌──────────────────────────────────────────┐
│  Computadora A - Chrome                  │
│  ┌────────────────────────────────────┐  │
│  │ localStorage compartido            │  │
│  │                                    │  │
│  │ Admin login → Agrega 5 libros     │  │
│  │ localStorage['bookmate_books']     │  │
│  │ = [libro1, libro2, ..., libro5]   │  │
│  └────────────────────────────────────┘  │
│                                          │
│  Admin logout                            │
│  User login                              │
│  ↓                                       │
│  Lee localStorage                        │
│  ✅ Ve los 5 libros nuevos!             │
└──────────────────────────────────────────┘
```

**✅ Funciona porque:**
- `localStorage` es compartido entre pestañas/sesiones del mismo navegador
- No importa quién esté logueado
- Todos leen de la misma fuente

**⚠️ NO funciona entre:**
- Diferentes navegadores (Chrome vs Firefox)
- Diferentes computadoras
- Modo incógnito vs normal
- Diferentes usuarios del sistema operativo

### Solución para Multi-Dispositivo

**En Track Básico:**
- Usar **Exportar CSV** en computadora A
- Usar **Importar CSV** en computadora B
- Manual pero funcional ✅

**En Track AI (futuro):**
- Backend Flask con PostgreSQL
- Sincronización automática
- Todos los dispositivos actualizados en tiempo real
- ✅ Solución definitiva

---

## 🔒 Seguridad y Validaciones

### Protección de Rutas

**admin.html:**
```javascript
if (!authManager.isAdmin()) {
    // Mostrar "Acceso Denegado"
    // Bloquear todo el contenido
    return;
}
```

**Opciones del Navbar:**
- "Panel Admin" solo visible si `role === 'admin'`
- Users normales nunca ven el link

### Validaciones en Formularios

**Cliente (JavaScript):**
- Campos obligatorios (`required`)
- Tipos de datos (`type="number"`, `min`, `max`)
- Rango de rating (0-5)
- Rango de año (1000-2100)
- Tags convertidos a array

**BookManager:**
- Conversión explícita de tipos:
  ```javascript
  rating: parseFloat(bookData.rating) || 0
  year: parseInt(bookData.year) || currentYear
  pages: parseInt(bookData.pages) || 0
  ```
- IDs únicos autogenerados
- Verificación de libro existente al editar

### Validaciones CSV

- Verificar archivo `.csv` seleccionado
- Validar headers requeridos
- Parsing robusto con comillas
- Manejo de errores con mensajes claros
- Contador de libros importados

---

## 🎨 Interfaz de Usuario

### Vista del Panel Admin

```
╔═════════════════════════════════════════════════════════════╗
║  📊 Panel de Administración - BookMate                      ║
╠═════════════════════════════════════════════════════════════╣
║  Gestiona el catálogo de libros de BookMate                 ║
║                                                              ║
║  ┌───────────┬───────────┬───────────┬───────────┐         ║
║  │ 📚 Total  │ ⭐ Rating │ 💬 Reviews│ 🏷️ Géneros│         ║
║  │   30      │   4.2     │  45,000   │    12     │         ║
║  └───────────┴───────────┴───────────┴───────────┘         ║
║                                                              ║
║  ┌─────────────────────── Acciones ────────────────────┐   ║
║  │ ➕ Agregar Nuevo Libro                               │   ║
║  │ 📤 Importar desde CSV                                │   ║
║  │ 📥 Exportar a CSV                                    │   ║
║  │ 📄 Descargar Plantilla CSV                           │   ║
║  │ 🔄 Resetear a Catálogo Original                      │   ║
║  └──────────────────────────────────────────────────────┘   ║
║                                                              ║
║  ┌─────────────── Catálogo de Libros ──────────────────┐   ║
║  │ [Buscar libro...]                               🔍  │   ║
║  │                                                      │   ║
║  │ ID │ Título    │ Autor │ Año │ Género │ ⭐ │ ⚙️   │   ║
║  │────┼──────────┼───────┼─────┼────────┼───┼─────│   ║
║  │ 1  │ Libro 1  │ A. 1  │2020 │Ficción │4.5│✏️🗑️│   ║
║  │ 2  │ Libro 2  │ A. 2  │2019 │Terror  │4.8│✏️🗑️│   ║
║  │                                                      │   ║
║  │ [◀ Anterior]  [1] [2] [3]  [Siguiente ▶]           │   ║
║  └──────────────────────────────────────────────────────┘   ║
╚═════════════════════════════════════════════════════════════╝
```

### Responsive Design

**Desktop (>768px):**
- Stats en 4 columnas
- Tabla completa con todas las columnas
- Botones con iconos y texto

**Mobile (<768px):**
- Stats en 2 columnas
- Tabla scrollable horizontal
- Botones compactos con iconos
- Formularios stack vertical

---

## 📝 Casos de Uso

### Caso 1: Agregar Libro Manualmente

```
1. Admin login → admin@bookmate.com / admin123
2. Click "Panel Admin" en navbar
3. Click "➕ Agregar Nuevo Libro"
4. Llenar formulario:
   - Título: "El Principito"
   - Autor: "Antoine de Saint-Exupéry"
   - Año: 1943
   - Páginas: 96
   - Género: Clásico
   - Rating: 4.9
   - ISBN: 978-0-156-01219-2
   - Sinopsis: "Historia de un aviador..."
   - Tags: clásico, infantil, filosofía
5. Click "Guardar"
6. ✅ Libro agregado al catálogo
7. Visible en tabla inmediatamente
8. Admin logout → User login
9. User ve "El Principito" en catálogo ✅
```

### Caso 2: Importar Libros Masivamente

```
1. Preparar archivo CSV en Excel:
   | title        | author    | year | pages | genre   | rating | ...
   | "Libro 1"    | "Autor 1" | 2020 | 300   | Ficción | 4.5    | ...
   | "Libro 2"    | "Autor 2" | 2019 | 250   | Terror  | 4.8    | ...
   
2. Guardar como "libros.csv"

3. Admin login → Panel Admin
4. Click "📤 Importar desde CSV"
5. Seleccionar "libros.csv"
6. Click "Importar"
7. ✅ "2 libro(s) importado(s) correctamente"
8. Tabla se actualiza automáticamente
9. User puede ver los nuevos libros ✅
```

### Caso 3: Editar Libro Existente

```
1. Admin en Panel Admin
2. Buscar libro: "1984"
3. Click ✏️ en fila de "1984"
4. Modal se abre con datos prellenados
5. Cambiar rating: 4.8 → 4.9
6. Agregar tag: "vigilancia"
7. Click "Guardar"
8. ✅ Libro actualizado
9. Cambios reflejados inmediatamente
```

### Caso 4: Exportar y Migrar Catálogo

```
Computadora A (Admin):
1. Panel Admin → Click "📥 Exportar a CSV"
2. Descarga "bookmate_catalog_2024-11-05.csv"
3. Enviar archivo por email/USB

Computadora B (Otro Admin):
4. Abrir BookMate → Login como admin
5. Panel Admin → Click "📤 Importar desde CSV"
6. Seleccionar "bookmate_catalog_2024-11-05.csv"
7. Click "Importar"
8. ✅ Catálogo sincronizado manualmente
```

### Caso 5: Resetear Catálogo

```
1. Admin hizo cambios no deseados
2. Panel Admin → Click "🔄 Resetear a Catálogo Original"
3. Confirmar acción
4. ✅ localStorage limpio
5. Próxima carga usa books.json original
6. Catálogo restaurado a 30 libros default
```

---

## 🧪 Testing

### Tests Manuales

**Test 1: Roles y Autorización**
- [ ] Registrar user normal → No ve "Panel Admin"
- [ ] Login como admin → Ve "Panel Admin" en dropdown
- [ ] User intenta acceder `admin.html` → "Acceso Denegado"
- [ ] Admin accede `admin.html` → Ve dashboard completo

**Test 2: CRUD de Libros**
- [ ] Agregar libro → Aparece en tabla
- [ ] Editar libro → Cambios reflejados
- [ ] Eliminar libro → Ya no aparece
- [ ] Búsqueda en tabla → Filtra correctamente
- [ ] Paginación → Funciona con >10 libros

**Test 3: Persistencia Admin → User**
- [ ] Admin agrega 3 libros
- [ ] Admin logout
- [ ] User login → Ve los 3 libros en catálogo ✅
- [ ] User cierra navegador
- [ ] User reabre navegador → Los 3 libros persisten ✅

**Test 4: Importar/Exportar CSV**
- [ ] Exportar catálogo → Descarga CSV
- [ ] Abrir CSV en Excel → Formato correcto
- [ ] Agregar 5 libros en Excel
- [ ] Guardar como CSV
- [ ] Importar CSV → 5 libros agregados ✅
- [ ] Ver catálogo → Todos los libros presentes

**Test 5: Validaciones**
- [ ] Formulario vacío → No permite guardar
- [ ] Rating >5 → No acepta
- [ ] Año 3000 → No acepta
- [ ] CSV sin headers → Muestra error claro
- [ ] CSV con datos incorrectos → Maneja errores

### Tests de Integración

**Test 6: Sincronización localStorage**
```javascript
// Test en consola del navegador
// Admin agrega libro
await bookManager.addBook({
    title: "Test Book",
    author: "Test Author",
    // ... otros campos
});

// Verificar en localStorage
console.log(localStorage.getItem('bookmate_books'));
// Debe incluir "Test Book"

// Limpiar caché y recargar
clearBooksCache();
const books = await loadBooks();
console.log(books.find(b => b.title === "Test Book"));
// Debe encontrar el libro ✅
```

---

## 📚 Documentación de Archivos

### Estructura de Archivos

```
/product/basic/
├── admin.html                      # Página del panel admin
├── assets/
│   ├── css/
│   │   └── admin.css              # Estilos específicos del admin
│   └── js/
│       ├── auth.js                # Extendido con roles (MODIFICADO)
│       ├── main.js                # loadBooks() lee localStorage (MODIFICADO)
│       ├── book-manager.js        # Clase BookManager (NUEVO)
│       └── admin.js               # Lógica del panel admin (NUEVO)
└── assets/data/
    └── books.json                 # Catálogo original (fallback)
```

### API de BookManager

```javascript
const bookManager = new BookManager();

// Obtener libros
await bookManager.getAllBooks();           // Array de todos los libros
await bookManager.getBookById(id);         // Libro específico

// CRUD
await bookManager.addBook(bookData);       // Agregar nuevo
await bookManager.updateBook(id, data);    // Actualizar existente
await bookManager.deleteBook(id);          // Eliminar

// CSV
await bookManager.importFromCSV(csvText);  // Importar desde CSV
await bookManager.exportToCSV();           // Exportar a CSV string
bookManager.downloadCSV(csv, filename);    // Descargar archivo

// Utilidades
await bookManager.getStats();              // Estadísticas
await bookManager.resetToOriginal();       // Resetear catálogo
```

### API de AuthManager (Extendida)

```javascript
const authManager = new AuthManager();

// Existentes
authManager.isLoggedIn();     // boolean
authManager.getCurrentUser(); // { id, name, email, role }

// Nuevos
authManager.isAdmin();        // boolean (verifica role === 'admin')
```

---

## 🚀 Mejoras Futuras (Track AI)

Cuando se implemente el backend real, se migrará a:

### Backend Flask

```python
# Endpoints REST
POST   /api/admin/books          # Agregar libro (solo admin)
GET    /api/admin/books          # Listar libros
PUT    /api/admin/books/<id>     # Actualizar libro (solo admin)
DELETE /api/admin/books/<id>     # Eliminar libro (solo admin)
POST   /api/admin/books/import   # Importar CSV (solo admin)
GET    /api/admin/books/export   # Exportar CSV (solo admin)
```

### Base de Datos PostgreSQL

```sql
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    year INTEGER,
    pages INTEGER,
    genre VARCHAR(100),
    rating DECIMAL(2,1),
    reviews_count INTEGER,
    isbn VARCHAR(20),
    synopsis TEXT,
    tags TEXT[],
    created_at TIMESTAMP DEFAULT NOW(),
    updated_by INTEGER REFERENCES users(id)
);
```

### Autenticación Real

- JWT tokens con expiración
- Bcrypt para hash de contraseñas
- Middleware de autorización por rol
- Logs de auditoría (quién modificó qué)

### Features Adicionales

- Historial de cambios (audit log)
- Búsqueda avanzada con filtros
- Ordenamiento por múltiples columnas
- Paginación server-side
- Caché con Redis
- Subida de imágenes de portadas
- API de terceros (Google Books, OpenLibrary)

---

## ✨ Conclusión

El sistema de administración implementado proporciona:

✅ **Gestión completa del catálogo** con CRUD
✅ **Importación/Exportación CSV** para operaciones masivas
✅ **Persistencia local** con localStorage
✅ **Sincronización** entre admin y users (mismo navegador)
✅ **UI intuitiva** con dashboard y estadísticas
✅ **Validaciones robustas** en cliente
✅ **Protección de rutas** por rol
✅ **Responsive design** para móvil y desktop

**Estado:** ✅ 100% Funcional y Documentado

**Última actualización:** 2024-11-05

