# BookMate - Productos

> **Plataforma de Gestión de Libros Personales - Grupo 6.2**

Este directorio contiene los diferentes tracks de desarrollo del proyecto BookMate.

---

## 📦 Productos Disponibles

### 1. **Basic (Flask)** - `basic/`
**Track:** Prototipo Estático  
**Backend:** Flask (Python)  
**Puerto:** 5000  
**Estado:** ✅ Completado

Versión original del prototipo con servidor Flask.

```bash
cd basic
python server.py
# http://localhost:5000
```

[Ver README completo →](basic/README.md)

---

### 2. **Basic (Spring Boot)** - `basic-springboot/` ⭐ NUEVO
**Track:** Prototipo Estático  
**Backend:** Spring Boot (Java)  
**Puerto:** 8080  
**Estado:** ✅ Completado

Versión Spring Boot con funcionalidades idénticas al Flask.

```bash
cd basic-springboot
./run.bat              # Windows
./run.sh               # Linux/Mac
# http://localhost:8080
```

[Ver README completo →](basic-springboot/README.md)

---

### 3. **AI** - `ai/`
**Track:** Sistema Completo con IA  
**Estado:** 🚧 Pendiente

Sistema completo con inteligencia artificial, base de datos, y API REST.

[Ver Plan →](ai/PLAN_AI.md)

---

## 🎯 Comparación Rápida

| Característica | Basic (Flask) | Basic (Spring Boot) | AI (Futuro) |
|----------------|---------------|---------------------|-------------|
| **Backend** | Python + Flask | Java + Spring Boot | Spring Boot + IA |
| **Puerto** | 5000 | 8080 | 8080 |
| **Base de Datos** | ❌ (localStorage) | ❌ (localStorage) | ✅ PostgreSQL |
| **Auth Real** | ❌ | ❌ | ✅ JWT |
| **IA** | ❌ | ❌ | ✅ Embeddings |
| **API REST** | ❌ | ❌ | ✅ Completa |
| **Producción** | ❌ | ✅ | ✅ |

---

## ✨ Funcionalidades (Basic)

Ambas versiones Basic incluyen:

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

### Recomendado: Spring Boot

```bash
# Requisito: Java 17+
cd basic-springboot
./run.bat              # Windows (automático)
```

### Alternativo: Flask

```bash
# Requisito: Python 3.8+
cd basic
pip install -r requirements.txt
python server.py
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

### ✅ Fase 1: Basic (Completada)
- [x] Frontend completo
- [x] Sistema de recomendaciones heurísticas
- [x] Login/Registro volátil
- [x] Panel admin
- [x] Versión Flask
- [x] **Versión Spring Boot**

### 🚧 Fase 2: AI (Pendiente)
- [ ] Base de datos PostgreSQL
- [ ] Autenticación JWT
- [ ] Sistema de recomendaciones con IA
- [ ] API REST completa
- [ ] Docker deployment

---

## 📁 Estructura

```
product/
├── basic/                        # Versión Flask (original)
│   ├── index.html
│   ├── catalog.html
│   ├── details.html
│   ├── library.html
│   ├── about.html
│   ├── admin.html
│   ├── assets/
│   ├── server.py
│   └── README.md
│
├── basic-springboot/            # Versión Spring Boot (nuevo)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/static/
│   │   └── test/
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd
│   ├── run.bat / run.sh
│   └── README.md
│
├── ai/                          # Versión con IA (futuro)
│   └── PLAN_AI.md
│
├── README.md                    # Este archivo
└── MIGRACION_SPRINGBOOT.md     # Documentación de migración
```

---

## 🛠️ Tecnologías

### Frontend (Ambos Basic)
- HTML5
- CSS3 + Bootstrap 5
- JavaScript (Vanilla)
- LocalStorage API

### Backend Basic (Flask)
- Python 3.8+
- Flask 3.0

### Backend Basic (Spring Boot)
- Java 17
- Spring Boot 3.2
- Maven

### Backend AI (Futuro)
- Spring Boot + Spring Data JPA
- PostgreSQL
- Python (microservicio IA)
- Docker

---

## 🤝 Contribución

**Equipo:** Grupo 6.2  
**Curso:** CC341 IS - Ingeniería de Software  
**Ciclo:** Actual

---

## 📝 Notas

1. **Prioridad:** Usar `basic-springboot/` para el proyecto final
2. **Referencia:** `basic/` se mantiene como backup
3. **Frontend idéntico:** Ambos Basic tienen el mismo frontend
4. **Localhost:** Flask usa puerto 5000, Spring Boot usa 8080

---

## ✅ Estado del Proyecto

- ✅ **Basic (Flask):** Funcional y completo
- ✅ **Basic (Spring Boot):** Funcional y completo
- 🚧 **AI:** Planificado

**Última actualización:** 2024-11-05

---

**¡Explora BookMate! 📖✨**





