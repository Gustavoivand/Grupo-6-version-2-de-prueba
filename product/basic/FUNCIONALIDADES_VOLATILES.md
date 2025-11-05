# Funcionalidades Volátiles - BookMate (Track Basic)

## ✅ Implementación Completada

Este documento describe las **funcionalidades volátiles** implementadas en el producto básico de BookMate. Estas funcionalidades simulan características del sistema completo usando almacenamiento del navegador, sin necesidad de backend.

---

## 🔐 Sistema de Autenticación Volátil

### Características Implementadas

1. **Registro de Usuarios**
   - Formulario de registro con validación
   - Campos: Nombre completo, email, contraseña
   - Validación de contraseña (mínimo 6 caracteres)
   - Verificación de emails duplicados
   - Auto-login después del registro exitoso
   - **Almacenamiento:** `localStorage` con key `bookmate_users`

2. **Inicio de Sesión**
   - Formulario de login con email y contraseña
   - Usuario de prueba pre-configurado:
     - Email: `demo@bookmate.com`
     - Contraseña: `demo123`
   - Validación de credenciales
   - **Almacenamiento:** `sessionStorage` con key `bookmate_current_user`

3. **Gestión de Sesión**
   - Sesión persiste mientras el navegador esté abierto
   - Se pierde al cerrar el navegador (por diseño, usando sessionStorage)
   - Logout manual disponible
   - UI dinámica que se actualiza según estado de autenticación

### Archivos Relacionados

```
/product/basic/assets/
├── js/
│   └── auth.js                    # Clase AuthManager + funciones UI
└── includes/
    └── auth-modals.html           # Modales de login y registro
```

### Funciones Principales

- `AuthManager`: Clase para manejar autenticación
- `updateAuthUI()`: Actualiza navbar según estado de sesión
- `handleLogin()`: Procesa inicio de sesión
- `handleRegister()`: Procesa registro
- `handleLogout()`: Cierra sesión
- `showLoginModal()`: Muestra modal de login
- `showRegisterModal()`: Muestra modal de registro

---

## 📚 Biblioteca Personal Volátil

### Características Implementadas

1. **Agregar Libros a Biblioteca**
   - Botón "Agregar a Mi Biblioteca" en cada libro
   - Validación de usuario logueado
   - Prevención de duplicados
   - Estado inicial: "Por leer"

2. **Estados de Lectura**
   - **Por leer** (to-read): Libros guardados para leer después
   - **Leyendo** (reading): Libros que se están leyendo actualmente
   - **Leído** (read): Libros terminados
   - Cambio de estado mediante dropdown

3. **Gestión de Biblioteca**
   - Ver todos los libros guardados
   - Filtrar por estado de lectura (tabs)
   - Eliminar libros de la biblioteca
   - Estadísticas: Total, Por leer, Leyendo, Leídos

4. **Persistencia**
   - **Almacenamiento:** `localStorage` con key `bookmate_library`
   - Estructura: `{ userId: [{ bookId, status, addedAt, updatedAt }] }`
   - Los datos persisten incluso al cerrar el navegador
   - Se pierden al limpiar caché/datos del navegador

### Archivos Relacionados

```
/product/basic/
├── library.html                   # Página de biblioteca personal
└── assets/
    └── js/
        ├── library.js             # Clase LibraryManager + funciones
        └── library-page.js        # UI específica de library.html
```

### Funciones Principales

**library.js:**
- `LibraryManager`: Clase para manejar biblioteca
- `addBook()`: Agregar libro a biblioteca
- `removeBook()`: Eliminar libro
- `updateStatus()`: Cambiar estado de lectura
- `getStats()`: Obtener estadísticas
- `updateBookDetailUI()`: Actualizar UI en página de detalle

**library-page.js:**
- `loadLibrary()`: Cargar y renderizar biblioteca
- `renderBooks()`: Renderizar libros por categoría
- `createLibraryBookCard()`: Crear card de libro con controles
- `updateStatusAndReload()`: Cambiar estado y refrescar
- `removeAndReload()`: Eliminar y refrescar

---

## 🎨 Integración en la UI

### Navbar Dinámica

**Usuario NO logueado:**
```
[ Inicio ] [ Catálogo ] [ Mi Biblioteca ] [ Acerca de ]  [ Iniciar Sesión ] [ Registrarse ]
```

**Usuario logueado:**
```
[ Inicio ] [ Catálogo ] [ Mi Biblioteca ] [ Acerca de ]  [ ▼ Juan Pérez ]
                                                              └─ Mi Biblioteca
                                                              └─ Cerrar Sesión
```

### Página de Detalles (details.html)

**Libro NO en biblioteca:**
```
[ + Agregar a Mi Biblioteca ]  [ Estado de Lectura (deshabilitado) ]
```

**Libro EN biblioteca:**
```
[✓ En tu Biblioteca]  [ ▼ Por Leer ]
                           └─ Por Leer (activo)
                           └─ Leyendo
                           └─ Leído
                           ───────────────
                           └─ 🗑 Eliminar de Biblioteca
```

### Página de Biblioteca (library.html)

#### Estadísticas

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│   📚 Total  │ 🔖 Por Leer │ 📖 Leyendo  │ ✅ Leídos   │
│      8      │      3      │      2      │      3      │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

#### Tabs de Filtrado

```
[ Todos ]  [ Por Leer ]  [ Leyendo ]  [ Leídos ]
```

Cada tab muestra solo los libros del estado correspondiente.

---

## 🔧 Tecnologías y Arquitectura

### Almacenamiento

| Dato | Storage | Key | Descripción |
|------|---------|-----|-------------|
| Usuarios | `localStorage` | `bookmate_users` | Lista de usuarios registrados |
| Sesión actual | `sessionStorage` | `bookmate_current_user` | Usuario logueado (se pierde al cerrar) |
| Bibliotecas | `localStorage` | `bookmate_library` | Bibliotecas de todos los usuarios |

### Arquitectura

```
┌─────────────────────────────────────────────┐
│              Browser Storage                │
├─────────────────────────────────────────────┤
│  localStorage                               │
│    ├── bookmate_users: [...]               │
│    └── bookmate_library: { userId: [...] } │
│                                             │
│  sessionStorage                             │
│    └── bookmate_current_user: { ... }      │
└─────────────────────────────────────────────┘
         ↑                           ↑
         │                           │
    AuthManager                LibraryManager
         │                           │
         └───────────┬───────────────┘
                     │
           ┌─────────┴──────────┐
           │    UI Functions    │
           │  updateAuthUI()    │
           │  renderLibrary()   │
           │  updateBookDetailUI()│
           └────────────────────┘
```

### Clases Principales

**AuthManager (auth.js):**
```javascript
class AuthManager {
    register(name, email, password)
    login(email, password)
    logout()
    getCurrentUser()
    isLoggedIn()
}
```

**LibraryManager (library.js):**
```javascript
class LibraryManager {
    getUserLibrary()
    saveUserLibrary(library)
    addBook(bookId, status)
    removeBook(bookId)
    updateStatus(bookId, newStatus)
    hasBook(bookId)
    getBookStatus(bookId)
    getStats()
}
```

---

## ⚠️ Limitaciones y Advertencias

### Limitaciones Técnicas

1. **Sin cifrado de contraseñas**
   - Las contraseñas se almacenan en texto plano
   - ⚠️ **NO usar contraseñas reales**
   - Solo para propósitos de demostración

2. **Volatilidad de datos**
   - Los datos se pierden al limpiar caché del navegador
   - No hay sincronización entre dispositivos
   - No hay backup o recuperación

3. **Sin validación de email**
   - No se envía email de verificación
   - Solo validación de formato

4. **Límites de almacenamiento**
   - localStorage tiene límite de ~5-10 MB
   - Puede fallar si se excede el límite

### Advertencias en UI

En el modal de registro:
```
⚠️ Nota: Los datos se guardan solo en tu navegador.
   Al limpiar el caché se perderán.
```

---

## 📝 Instrucciones de Uso

### 1. Primera Vez (Usuario Nuevo)

1. Abrir `index.html` en navegador
2. Click en **"Registrarse"**
3. Llenar formulario:
   - Nombre: Tu nombre
   - Email: tu@email.com
   - Contraseña: mínimo 6 caracteres
4. Click en **"Crear Cuenta"**
5. Auto-login y redirección

### 2. Usuario Existente

1. Click en **"Iniciar Sesión"**
2. Ingresar credenciales
3. Click en **"Iniciar Sesión"**

**Usuario de prueba:**
- Email: `demo@bookmate.com`
- Contraseña: `demo123`

### 3. Agregar Libros a Biblioteca

1. Navegar a **Catálogo** o ver detalles de un libro
2. Click en **"Agregar a Mi Biblioteca"**
3. El libro se guarda con estado "Por leer"

### 4. Gestionar Biblioteca

1. Navegar a **"Mi Biblioteca"**
2. Ver estadísticas en la parte superior
3. Usar tabs para filtrar por estado
4. Click en dropdown de cada libro para:
   - Cambiar estado de lectura
   - Eliminar de biblioteca

### 5. Cerrar Sesión

1. Click en tu nombre en navbar
2. Click en **"Cerrar Sesión"**
3. Redirección a página de inicio

---

## 🧪 Casos de Prueba

### Test 1: Registro y Login
- [ ] Registrar nuevo usuario
- [ ] Verificar auto-login
- [ ] Cerrar sesión
- [ ] Login con credenciales recién creadas

### Test 2: Persistencia de Sesión
- [ ] Login
- [ ] Navegar entre páginas (index → catalog → details)
- [ ] Verificar que sesión se mantiene en navbar
- [ ] Cerrar navegador
- [ ] Abrir de nuevo → sesión debe estar cerrada

### Test 3: Biblioteca Personal
- [ ] Login
- [ ] Agregar 5 libros a biblioteca
- [ ] Verificar que aparecen en "Mi Biblioteca"
- [ ] Cambiar estados: 2 "Leyendo", 3 "Por leer"
- [ ] Verificar estadísticas correctas
- [ ] Marcar 1 como "Leído"
- [ ] Verificar tabs filtran correctamente

### Test 4: Persistencia de Biblioteca
- [ ] Agregar libros a biblioteca
- [ ] Cerrar navegador
- [ ] Abrir de nuevo y login
- [ ] Verificar libros siguen en biblioteca

### Test 5: UI Dinámica en Detalles
- [ ] Ver detalle de libro NO en biblioteca
- [ ] Verificar botón "Agregar a Mi Biblioteca"
- [ ] Agregar libro
- [ ] Verificar UI cambia a "En tu Biblioteca"
- [ ] Cambiar estado desde dropdown
- [ ] Eliminar libro
- [ ] Verificar UI vuelve a mostrar "Agregar"

### Test 6: Usuarios Múltiples
- [ ] Registrar Usuario A
- [ ] Agregar 3 libros a su biblioteca
- [ ] Cerrar sesión
- [ ] Registrar Usuario B
- [ ] Agregar 2 libros diferentes
- [ ] Verificar que bibliotecas son independientes
- [ ] Login como Usuario A → ver sus 3 libros
- [ ] Login como Usuario B → ver sus 2 libros

---

## 🚀 Migración a Sistema Completo

Cuando se implemente el backend real (Track AI), estas funcionalidades se migrarán:

### Backend (Flask + PostgreSQL)

**Auth:**
- Reemplazar `AuthManager` con JWT tokens
- Implementar bcrypt para hash de contraseñas
- Agregar verificación de email
- Implementar recuperación de contraseña

**Library:**
- Crear tabla `user_libraries` en PostgreSQL
- Endpoints REST:
  - `POST /api/library/books` - Agregar libro
  - `GET /api/library/books` - Obtener biblioteca
  - `PATCH /api/library/books/{id}` - Actualizar estado
  - `DELETE /api/library/books/{id}` - Eliminar libro
- Sincronización en tiempo real

### Frontend

- Reemplazar llamadas a `localStorage`/`sessionStorage` con fetch API
- Mantener misma UI y UX
- Agregar loading states y error handling
- Implementar sincronización offline (opcional)

---

## 📊 Métricas de Implementación

| Componente | Archivos | Líneas de Código | Estado |
|------------|----------|------------------|--------|
| Autenticación | 2 | ~280 | ✅ Completo |
| Biblioteca | 2 | ~280 | ✅ Completo |
| UI Integration | 5 HTML | ~150 | ✅ Completo |
| **TOTAL** | **9** | **~710** | **✅ 100%** |

---

## 📌 Notas de Desarrollo

### Decisiones de Diseño

1. **sessionStorage para sesión**: Para simular comportamiento real de tokens que expiran
2. **localStorage para biblioteca**: Para demostrar persistencia de datos
3. **Clases ES6**: Código modular y mantenible
4. **Bootstrap modals**: UI consistente con el resto del proyecto
5. **Alertas temporales**: Feedback visual sin interrumpir flujo

### Mejoras Futuras (Track AI)

- [ ] Cifrado de contraseñas con bcrypt
- [ ] Tokens JWT con expiración
- [ ] Verificación de email
- [ ] Recuperación de contraseña
- [ ] OAuth (Google, Facebook)
- [ ] Sincronización multi-dispositivo
- [ ] Backup automático
- [ ] Exportar biblioteca (CSV, JSON)

---

## ✨ Conclusión

Las funcionalidades volátiles implementadas proporcionan una **experiencia completa de usuario** en el producto básico, permitiendo:

- ✅ Registro y login funcional
- ✅ Gestión de biblioteca personal
- ✅ Estados de lectura
- ✅ UI dinámica y responsive
- ✅ Persistencia local de datos
- ✅ Base sólida para migración a backend

**Estado:** ✅ Implementación Completa y Funcional

**Última actualización:** 2024-11-05

