# BookMate - Productos

> **Plataforma de Gestión de Libros Personales - Grupo 6**

Este directorio contiene los diferentes tracks de desarrollo del proyecto BookMate.

---

## 📦 Productos Disponibles

### 1. **Basic (Spring Boot)** - `basic-springboot/` ⭐ PRODUCTO PRINCIPAL
**Track:** Prototipo Estático  
**Backend:** Spring Boot (Java)  
**Puerto:** 8080  
**Estado:** ✅ Completado

Base del proyecto oficial. Prototipo con Spring Boot que sirve archivos estáticos.

```bash
cd basic-springboot
./run.bat              # Windows
./run.sh               # Linux/Mac
# http://localhost:8080
```

[Ver README completo →](basic-springboot/README.md)

---

### 2. **AI** - `ai/`
**Track:** Sistema Completo con IA  
**Estado:** 🚧 En Desarrollo

Sistema completo basado en **basic-springboot/** con inteligencia artificial, base de datos PostgreSQL, y API REST completa. Incluye microservicio Python para recomendaciones semánticas.

**Tecnologías:**
- Spring Boot 3.2 (Java 17+)
- PostgreSQL 15 + Flyway
- Microservicio Python IA (Sentence Transformers)
- Docker Compose

[Ver Plan →](ai/PLAN_AI.md)

---

### 3. **Basic (Flask)** - `basic/` 🗂️ LEGACY (Solo Referencia)
**Track:** Prototipo Inicial (Deprecated)  
**Backend:** Flask (Python)  
**Puerto:** 5000  
**Estado:** ⚠️ LEGACY - No se desarrollará

**⚠️ IMPORTANTE:** Esta carpeta contiene un prototipo inicial en Flask que sirvió como **exploración tecnológica preliminar**. **NO se trabajará sobre este código**. El proyecto oficial se desarrolla sobre `basic-springboot/` (Spring Boot).

Se mantiene únicamente como referencia histórica.

---

## 🎯 Comparación Rápida

| Característica | Basic (Spring Boot) ⭐ | AI (En Desarrollo) | Basic (Flask) LEGACY |
|----------------|------------------------|-------------------|---------------------|
| **Backend** | Java + Spring Boot | Spring Boot + Microservicio IA | Python + Flask |
| **Puerto** | 8080 | 8080 | 5000 |
| **Base de Datos** | ❌ (localStorage) | ✅ PostgreSQL + Flyway | ❌ (localStorage) |
| **Auth Real** | ❌ | ✅ JWT (Spring Security) | ❌ |
| **IA** | ❌ | ✅ Embeddings (Python) | ❌ |
| **API REST** | ❌ | ✅ Completa | ❌ |
| **Estado** | ✅ Producción | 🚧 En Desarrollo | ⚠️ Deprecated |

---

## ✨ Funcionalidades (Basic Spring Boot)

El prototipo básico incluye:

### Frontend
- ✅ Landing Page con libros destacados
- ✅ Catálogo completo (búsqueda, filtros, paginación)
- ✅ Detalles de libro con similares
- ✅ Biblioteca personal (Por Leer, Leyendo, Leído)
- ✅ **Sistema de recomendaciones heurísticas**
  - Checkboxes para selección múltiple
  - Algoritmo: tags + autor + género + rating
  - Top 3 matches con explicaciones
- ✅ Login/Registro volátil
- ✅ Panel de administración (CRUD libros, CSV)
- ✅ Página "Acerca de"

### Datos
- 📚 30 libros mock
- 👤 Usuarios predefinidos (user + admin)
- 💾 Persistencia en localStorage

---

## 🚀 Inicio Rápido

### Producto Principal: Spring Boot

```bash
# Requisito: Java 17+
cd basic-springboot
./run.bat              # Windows (automático)
./run.sh               # Linux/Mac
# Acceder a http://localhost:8080
```

### AI Track (En Desarrollo)

```bash
# Requisito: Docker + Docker Compose
cd ai
docker-compose up --build
# Acceder a http://localhost:8080
```

---

## 📖 Documentación

- **Migración Flask → Spring Boot:** [MIGRACION_SPRINGBOOT.md](MIGRACION_SPRINGBOOT.md)
- **Recomendaciones Heurísticas:** [basic/RECOMENDACIONES_HEURISTICAS.md](basic/RECOMENDACIONES_HEURISTICAS.md)
- **Sistema Admin:** [basic/SISTEMA_ADMIN.md](basic/SISTEMA_ADMIN.md)
- **Funcionalidades Volátiles:** [basic/FUNCIONALIDADES_VOLATILES.md](basic/FUNCIONALIDADES_VOLATILES.md)

---

## 👤 Credenciales de Prueba

### Usuario Regular
```
Email: user@example.com
Password: password123
```

### Administrador
```
Email: admin@bookmate.com
Password: admin123
```

---

## 🔮 Roadmap

### ✅ Fase 1: Prototipo Basic Spring Boot (Completada)
- [x] Frontend completo
- [x] Sistema de recomendaciones heurísticas (simulado)
- [x] Login/Registro volátil (localStorage)
- [x] Panel admin
- [x] Servidor Spring Boot integrado
- [x] Prototipo navegable funcional

### 🚧 Fase 2: AI Track (En Desarrollo - Semanas 11-16)
- [ ] **Semana 11:** Backend Spring Boot con API REST + PostgreSQL
- [ ] **Semana 13:** Autenticación JWT con Spring Security
- [ ] **Semana 15:** Sistema de recomendaciones heurísticas (real)
- [ ] **Semana 16:** Microservicio Python IA con embeddings
- [ ] Docker Compose (web + db + ai_service)

---

## 📁 Estructura

```
product/
├── basic-springboot/            # ⭐ PRODUCTO PRINCIPAL
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/bookmate/
│   │   │   └── resources/static/
│   │   └── test/
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd
│   ├── run.bat / run.sh
│   └── README.md
│
├── ai/                          # 🚧 EN DESARROLLO (upgrade de basic-springboot)
│   ├── src/main/java/          # Backend Spring Boot
│   ├── ai_service/             # Microservicio Python IA
│   ├── docker-compose.yml
│   └── README.md
│
├── basic/                       # 🗂️ LEGACY (Solo referencia histórica)
│   ├── *.html
│   ├── server.py (Flask)
│   └── README.md
│
└── README.md                    # Este archivo
```

---

## 🛠️ Tecnologías

### Frontend (Basic Spring Boot)
- HTML5
- CSS3 + Bootstrap 5
- JavaScript (Vanilla)
- LocalStorage API

### Backend (Basic Spring Boot)
- Java 17
- Spring Boot 3.2
- Maven

### Backend AI Track (En Desarrollo)
- **Web Service:** Spring Boot 3.2 + Spring Data JPA
- **Base de Datos:** PostgreSQL 15 + Flyway
- **Microservicio IA:** Python 3.11+ con Sentence Transformers
- **Contenedores:** Docker + Docker Compose
- **Seguridad:** Spring Security + JWT

---

## 🤝 Contribución

**Equipo:** Grupo 6
**Curso:** CC341 IS - Ingeniería de Software  
**Ciclo:** Actual

---

## 📝 Notas Importantes

1. **⭐ Producto Principal:** `basic-springboot/` es la BASE del proyecto
2. **🚧 AI Track:** Se desarrolla como UPGRADE de `basic-springboot/`, no de `basic/`
3. **⚠️ LEGACY:** `basic/` (Flask) NO se usará en el desarrollo. Solo es referencia histórica
4. **Puerto 8080:** Tanto `basic-springboot/` como `ai/` usan el puerto 8080
5. **Stack Oficial:** Java 17 + Spring Boot + PostgreSQL + Microservicio Python (IA)

---

## ✅ Estado del Proyecto

- ✅ **Basic (Spring Boot):** Completado y funcional
- 🚧 **AI Track:** En desarrollo (Semanas 11-16)
- 🗂️ **Basic (Flask):** Deprecated - Solo referencia

**Última actualización:** 2025-11-05

---

## ⚠️ Advertencia sobre /basic/ (Flask)

La carpeta `basic/` contiene un prototipo inicial en Flask que sirvió como exploración tecnológica. **NO se trabajará sobre este código**.

El proyecto oficial se desarrolla sobre:
- **Base:** `basic-springboot/` (Spring Boot)
- **Evolución:** `ai/` (Spring Boot + PostgreSQL + Microservicio Python IA)

El track Flask se mantiene únicamente como referencia histórica.

---

**¡Explora BookMate! 📖✨**





