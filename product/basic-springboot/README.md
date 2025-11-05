# 📖 BookMate - Spring Boot

> Plataforma de gestión de libros personales con Spring Boot 3.2.0

## 🚀 Inicio Rápido

### Ejecutar la aplicación

```powershell
primero:
cd "product\basic-springboot"
luego:
$env:JAVA_HOME = "C:\Program Files\Java\jdk-24"
.\mvnw.cmd spring-boot:run
```

Luego abre tu navegador en: **http://localhost:8080**

> **Nota:** El comando configura `JAVA_HOME` temporalmente para esta sesión y luego ejecuta el servidor.

---

## ⚙️ Requisitos

- **Java 17 o superior** (probado con Java 24.0.1)
- **Maven** (incluido via Maven Wrapper `mvnw`)

---

## 🔧 Configuración de JAVA_HOME

### ¿Por qué es necesario?

Si obtienes el error `JAVA_HOME not found`, necesitas configurar esta variable de entorno.

### Verificar tu instalación de Java

```powershell
java -version
# Debería mostrar: java version "24.0.1" o similar (>= 17)
```

### Opción 1: Configurar temporalmente (para esta sesión)

```powershell
cd "D:\02.Estudios\1.UNI\CC341 IS\CICLO ACTUAL\Grupo 6.2\product\basic-springboot"
$env:JAVA_HOME = "C:\Program Files\Java\jdk-24"
.\mvnw.cmd spring-boot:run
```

> **Este es el método recomendado.** Configura Java solo para esta terminal y ejecuta el servidor.

### Opción 2: Configurar permanentemente

**En PowerShell como Administrador:**

```powershell
[System.Environment]::SetEnvironmentVariable('JAVA_HOME', 'C:\Program Files\Java\jdk-24', 'Machine')
```

**Luego reinicia tu computadora.**

**O mediante GUI:**

1. Presiona `Win + R` → escribe `sysdm.cpl` → Enter
2. Pestaña **Opciones Avanzadas** → **Variables de entorno**
3. En **Variables del sistema** → **Nueva**
   - Nombre: `JAVA_HOME`
   - Valor: `C:\Program Files\Java\jdk-24` (ajusta la ruta según tu instalación)
4. **Aceptar** todo
5. **Reinicia** tu computadora

### Encontrar tu JDK

Si no sabes dónde está instalado tu JDK:

```powershell
# Ver dónde está java
(Get-Command java).Path

# Listar todos los JDKs instalados
Get-ChildItem "C:\Program Files\Java\" -Directory
```

---

## 📦 Estructura del Proyecto

```
basic-springboot/
├── src/
│   └── main/
│       ├── java/com/bookmate/
│       │   ├── BookMateApplication.java      # Clase principal
│       │   └── controller/
│       │       └── StaticController.java     # Controlador para servir HTML
│       └── resources/
│           ├── application.properties        # Configuración (puerto 8080)
│           └── static/                       # Frontend completo
│               ├── index.html
│               ├── catalog.html
│               ├── details.html
│               ├── library.html
│               ├── admin.html
│               └── assets/
│                   ├── css/
│                   ├── js/
│                   └── data/
├── pom.xml                                   # Dependencias Maven
├── mvnw / mvnw.cmd                           # Maven Wrapper (no requiere Maven instalado)
└── README.md                                 # Este archivo
```

---

## 🎯 Funcionalidades

### 🔓 Usuarios de Prueba

| Rol | Email | Contraseña | Permisos |
|-----|-------|------------|----------|
| **Usuario** | demo@bookmate.com | demo123 | Ver catálogo, biblioteca personal |
| **Admin** | admin@bookmate.com | admin123 | + Gestionar libros, importar/exportar CSV |

### 📚 Catálogo de Libros

- 30 libros precargados en `assets/data/books.json`
- Búsqueda y filtrado
- Vista de detalles

### 👤 Sistema de Autenticación (Volátil)

- Registro/Login (datos en `localStorage`)
- Sesión persistente durante navegación
- Cierre de sesión

### 📖 Biblioteca Personal

- Agregar/quitar libros del catálogo
- Estados de lectura: "Para leer", "Leyendo", "Leído"
- Estadísticas personales
- **Recomendaciones heurísticas** basadas en tus libros favoritos

### 🔐 Panel de Administración

- **CRUD completo** de libros
- **Importar/Exportar CSV**
- Cambios visibles inmediatamente para todos los usuarios
- Persistencia en `localStorage`

---

## 🛠️ Comandos Útiles

### Compilar sin ejecutar

```bash
mvnw.cmd clean package
```

### Limpiar compilación

```bash
mvnw.cmd clean
```

### Ver dependencias

```bash
mvnw.cmd dependency:tree
```

### Ejecutar JAR compilado

```bash
java -jar target/bookmate-basic-1.0.0.jar
```

---

## 🐛 Solución de Problemas

### Error: `JAVA_HOME not found`

**Causa:** La variable de entorno `JAVA_HOME` no está configurada.

**Solución:** Ver sección "Configuración de JAVA_HOME" arriba.

### Error: `UnsupportedClassVersionError`

**Causa:** Estás usando una versión de Java menor a 17.

**Solución:** Actualiza a Java 17 o superior.

```powershell
java -version  # Verificar versión actual
```

Descarga Java 21 LTS desde: https://www.oracle.com/java/technologies/downloads/

### El puerto 8080 ya está en uso

**Síntoma:**
```
Port 8080 was already in use
```

**Solución 1 - Detener el proceso:**

```powershell
# Encontrar el proceso usando el puerto
netstat -ano | findstr :8080

# Detener el proceso (reemplaza <PID> con el número que viste)
taskkill /PID <PID> /F
```

**Solución 2 - Cambiar el puerto:**

Edita `src/main/resources/application.properties`:

```properties
server.port=8081
```

### Warnings de Java 24

Si ves warnings como:

```
WARNING: A restricted method in java.lang.System has been called
WARNING: sun.misc.Unsafe::objectFieldOffset will be removed
```

**Esto es NORMAL** con Java 24 (muy reciente). Las librerías aún no se han actualizado. **No afecta el funcionamiento.**

### La primera ejecución es lenta

Es normal. Maven descarga todas las dependencias la primera vez (1-2 minutos).

Las siguientes ejecuciones serán mucho más rápidas.

---

## 📱 Uso de la Aplicación

### 1. Página Principal
- Ver libros destacados
- Acceso rápido al catálogo

### 2. Catálogo
- Explorar todos los libros
- Buscar por título/autor
- Ver detalles de cada libro

### 3. Biblioteca Personal (requiere login)
- Tus libros organizados por estado
- Estadísticas de lectura
- **Sistema de recomendaciones:**
  - Selecciona libros que te gustan (checkbox)
  - Haz clic en "Obtener Recomendaciones"
  - Recibe sugerencias basadas en: autor, género, tags, rating

### 4. Panel Admin (solo admin)
- Gestionar catálogo completo
- Agregar/editar/eliminar libros
- Importar libros desde CSV
- Exportar catálogo a CSV

---

## 💾 Persistencia de Datos

| Tipo de Dato | Almacenamiento | Persistencia |
|--------------|----------------|--------------|
| **Usuarios** | `localStorage` | Por navegador |
| **Sesiones** | `sessionStorage` | Por pestaña |
| **Bibliotecas personales** | `localStorage` | Por navegador |
| **Catálogo (cambios admin)** | `localStorage` | Por navegador |
| **Catálogo original** | `books.json` | Permanente |

**Nota:** Los datos en `localStorage` persisten aunque cierres el navegador, pero son locales a tu máquina.

---

## 🔄 Formato CSV para Importación

Estructura del CSV:

```csv
id,title,author,genre,year,pages,rating,cover,description,isbn,publisher,language,tags
31,El nombre del viento,Patrick Rothfuss,Fantasía,2007,872,4.8,https://example.com/cover.jpg,Un joven huérfano se convierte en héroe legendario,978-0-7564-0407-9,DAW Books,es,fantasía|épico|magia
```

**Campos obligatorios:**
- `id`, `title`, `author`, `genre`, `year`, `pages`, `rating`

**Campos opcionales:**
- `cover`, `description`, `isbn`, `publisher`, `language`, `tags`

**Tags:** Separados por `|` (pipe)

---

## 🏗️ Arquitectura Técnica

### Backend
- **Spring Boot 3.2.0** - Framework
- **Spring Web** - REST controllers
- **Tomcat embebido** - Servidor web

### Frontend
- **HTML5** + **CSS3** + **Vanilla JavaScript**
- **Bootstrap 5.1.3** - UI framework
- **Font Awesome 6.4.0** - Iconos

### Datos
- JSON estático para catálogo
- LocalStorage para datos volátiles
- No requiere base de datos

---

## 📋 Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Java | 24.0.1 (>= 17) | Runtime |
| Spring Boot | 3.2.0 | Framework backend |
| Maven | 3.9.5 | Gestión de dependencias |
| Bootstrap | 5.1.3 | UI/Responsive |
| Font Awesome | 6.4.0 | Iconos |

---

## 🎓 Desarrollo

### Hot Reload

Spring Boot DevTools está incluido. Los cambios en archivos estáticos se reflejan automáticamente (solo recarga el navegador).

### Agregar nuevos libros al catálogo

Edita: `src/main/resources/static/assets/data/books.json`

```json
{
  "id": 31,
  "title": "Nuevo Libro",
  "author": "Autor",
  "genre": "Género",
  "year": 2024,
  "pages": 350,
  "rating": 4.5,
  "cover": "URL_de_imagen",
  "description": "Descripción del libro",
  "isbn": "978-XXX",
  "publisher": "Editorial",
  "language": "es",
  "tags": ["tag1", "tag2"]
}
```

### Modificar el puerto

Edita: `src/main/resources/application.properties`

```properties
server.port=8080
```

---

## 📝 Notas Importantes

1. **Datos Volátiles:** Los cambios realizados por administradores se guardan en `localStorage` del navegador, no en el servidor.

2. **Multi-versión Java:** Si tienes múltiples versiones de Java instaladas, asegúrate de que `JAVA_HOME` apunte a Java 17+.

3. **Navegadores:** Probado en Chrome, Firefox, Edge. Requiere JavaScript habilitado.

4. **Primera Ejecución:** La primera vez que ejecutes `mvnw.cmd` descargará Maven y todas las dependencias (puede tardar 2-3 minutos).

---

## ✅ Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] Java >= 17 instalado (`java -version`)
- [ ] `JAVA_HOME` configurado correctamente
- [ ] Puerto 8080 disponible
- [ ] Navegador con JavaScript habilitado
- [ ] Primera ejecución completada (Maven descargó dependencias)

---

## 🆘 Ayuda Adicional

### Ver logs en tiempo real

Los logs se muestran en la consola donde ejecutaste `mvnw.cmd spring-boot:run`.

### Detener el servidor

Presiona `Ctrl + C` en la terminal donde está corriendo.

### Reiniciar desde cero

```bash
# Limpiar todo
mvnw.cmd clean

# Borrar caché de Maven (si hay problemas)
rmdir /s /q %USERPROFILE%\.m2\repository

# Ejecutar de nuevo
mvnw.cmd spring-boot:run
```

---

## 🎉 ¡Listo!

Tu aplicación BookMate está funcionando en:

### 🌐 http://localhost:8080

**Credenciales de prueba:**
- Usuario: `demo@bookmate.com` / `demo123`
- Admin: `admin@bookmate.com` / `admin123`

---

## 📝 RESUMEN EJECUTIVO

### Para Ejecutar (copia y pega):

```powershell
cd "D:\02.Estudios\1.UNI\CC341 IS\CICLO ACTUAL\Grupo 6.2\product\basic-springboot"
$env:JAVA_HOME = "C:\Program Files\Java\jdk-24"
.\mvnw.cmd spring-boot:run
```

### Luego abre: http://localhost:8080

### Para detener: `Ctrl + C` en la terminal

### Credenciales:
- Usuario: `demo@bookmate.com` / `demo123`
- Admin: `admin@bookmate.com` / `admin123`

---

**¿Problemas?** Revisa la sección "Solución de Problemas" arriba.

**¡Disfruta explorando tu biblioteca personal! 📚✨**
