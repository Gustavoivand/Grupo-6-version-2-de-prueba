# Plan de Administración de Configuración - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Noviembre 2025  
**Versión:** 1.0  

---

## 1. Introducción

### 1.1 Propósito del Plan

Este documento describe la estrategia de administración de configuración del proyecto BookMate, incluyendo Git workflow, versionado semántico, CI/CD y gestión de dependencias.

### 1.2 Alcance

El plan cubre:
- Git workflow y branches
- Versionado semántico
- CI/CD (si aplica)
- Gestión de dependencias
- Gestión de secretos

---

## 2. Git Workflow

### 2.1 Estructura de Branches

**Branches principales:**
- `main`: Código estable, listo para producción
- `develop`: Integración de features
- `feature/*`: Features individuales
- `hotfix/*`: Correcciones urgentes
- `release/*`: Preparación de releases

---

### 2.2 Estrategia de Merge

**Flujo:**
```
feature/xxx → develop → release/v1.x → main
```

**Reglas:**
- Features se desarrollan en `feature/*`
- Merge a `develop` después de revisión
- Releases se preparan en `release/*`
- Merge a `main` solo después de pruebas completas

---

### 2.3 Commits Semánticos

**Formato:**
```
<tipo>(<alcance>): <descripción>

[body opcional]

[footer opcional]
```

**Tipos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Documentación
- `style`: Formato (sin cambios de código)
- `refactor`: Refactorización
- `test`: Pruebas
- `chore`: Tareas de mantenimiento

**Ejemplos:**
```
feat(recommendations): agregar cálculo de similitud con IA
fix(api): corregir timeout en servicio IA
docs(readme): actualizar instrucciones de despliegue
```

---

## 3. Versionado Semántico

### 3.1 Formato

**Formato:** `MAJOR.MINOR.PATCH`

- **MAJOR:** Cambios incompatibles
- **MINOR:** Nuevas funcionalidades compatibles
- **PATCH:** Correcciones de bugs compatibles

**Ejemplos:**
- `1.0.0`: Versión inicial
- `1.1.0`: Nueva funcionalidad (recomendaciones IA)
- `1.1.1`: Corrección de bug
- `2.0.0`: Cambio mayor (refactorización completa)

---

### 3.2 Etiquetas Git

**Crear tag:**
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

**Listar tags:**
```bash
git tag -l
```

---

## 4. CI/CD (Opcional)

### 4.1 Pipeline Básico

**Herramienta:** GitHub Actions (si aplica)

**Pipeline:**
1. **Build:** Compilar código
2. **Test:** Ejecutar pruebas
3. **Lint:** Verificar código
4. **Deploy:** Desplegar (si aplica)

**Archivo:** `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
      - name: Run tests
        run: ./mvnw test
      - name: Generate coverage report
        run: ./mvnw jacoco:report
```

---

## 5. Gestión de Dependencias

### 5.1 Maven (Java)

**Archivo:** `pom.xml`

**Gestión:**
- Versiones en `properties`
- Dependencias en `dependencies`
- Plugins en `build/plugins`

**Actualización:**
```bash
# Verificar dependencias desactualizadas
./mvnw versions:display-dependency-updates

# Actualizar dependencias
./mvnw versions:use-latest-versions
```

---

### 5.2 requirements.txt (Python)

**Archivo:** `ai-service/requirements.txt`

**Formato:**
```
flask==2.3.0
sentence-transformers==2.2.2
numpy==1.24.3
scipy==1.11.1
```

**Actualización:**
```bash
# Generar requirements.txt actualizado
pip freeze > requirements.txt

# Instalar dependencias
pip install -r requirements.txt
```

---

## 6. Gestión de Secretos

### 6.1 Variables de Entorno

**Archivo:** `.env` (no versionado)

**Contenido:**
```bash
POSTGRES_PASSWORD=secret_password
JWT_SECRET=secret_jwt_key
```

**Gitignore:**
```
.env
*.env
.env.local
```

---

### 6.2 Configuración Sensible

**No versionar:**
- Contraseñas
- API keys
- JWT secrets
- Credenciales de BD

**Versionar:**
- Estructura de configuración
- Variables de entorno con valores por defecto
- Documentación de configuración

---

## 7. Estructura del Repositorio

```
.
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── ai-service/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   └── ...
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
└── LICENSE
```

---

## 8. Conclusiones

Este plan de administración de configuración asegura:

- ✅ Control de versiones organizado
- ✅ Versionado semántico claro
- ✅ Gestión de dependencias
- ✅ Seguridad de secretos
- ✅ Reproducibilidad de builds

---

**Versión:** 1.0  
**Última actualización:** Noviembre 2025  
**Grupo 6** - Universidad Nacional de Ingeniería

