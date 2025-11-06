# Plan de Despliegue - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Noviembre 2025  
**Versión:** 1.0  

---

## 1. Introducción

### 1.1 Propósito del Plan

Este documento describe la estrategia de despliegue del sistema BookMate utilizando Docker Compose, incluyendo configuración de servicios, variables de entorno, migraciones Flyway y estrategias de backup.

### 1.2 Alcance

El plan cubre:
- Configuración de Docker Compose
- Variables de entorno
- Migraciones Flyway
- Estrategia de backup
- Monitoreo básico

---

## 2. Docker Compose

### 2.1 Configuración Completa

**Archivo:** `docker-compose.yml`

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    container_name: bookmate-postgres
    environment:
      POSTGRES_DB: bookmate_db
      POSTGRES_USER: bookmate_user
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-bookmate_pass}
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U bookmate_user"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - bookmate-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: bookmate-backend
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/bookmate_db
      SPRING_DATASOURCE_USERNAME: bookmate_user
      SPRING_DATASOURCE_PASSWORD: ${POSTGRES_PASSWORD:-bookmate_pass}
      AI_SERVICE_URL: http://ai-service:5000
      JWT_SECRET: ${JWT_SECRET:-secret_key_change_in_production}
    ports:
      - "8080:8080"
    depends_on:
      postgres:
        condition: service_healthy
      ai-service:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks:
      - bookmate-network

  ai-service:
    build:
      context: ./ai-service
      dockerfile: Dockerfile
    container_name: bookmate-ai-service
    environment:
      DATABASE_URL: postgresql://bookmate_user:${POSTGRES_PASSWORD:-bookmate_pass}@postgres:5432/bookmate_db
      MODEL_NAME: all-MiniLM-L6-v2
    ports:
      - "5000:5000"
    depends_on:
      postgres:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks:
      - bookmate-network

volumes:
  postgres-data:
    driver: local

networks:
  bookmate-network:
    driver: bridge
```

---

### 2.2 Variables de Entorno

**Archivo:** `.env` (no versionado en Git)

```bash
# PostgreSQL
POSTGRES_PASSWORD=bookmate_secure_password_123

# Backend Spring Boot
JWT_SECRET=your_secret_jwt_key_here_change_in_production
SPRING_PROFILES_ACTIVE=production

# Servicio IA
MODEL_NAME=all-MiniLM-L6-v2
```

**Nota:** El archivo `.env` debe estar en `.gitignore` para no exponer secretos.

---

## 3. Dockerfiles

### 3.1 Dockerfile Backend

**Archivo:** `backend/Dockerfile`

```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/bookmate-backend-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

### 3.2 Dockerfile Servicio IA

**Archivo:** `ai-service/Dockerfile`

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
```

---

## 4. Migraciones Flyway

### 4.1 Estructura de Migraciones

```
src/main/resources/db/migration/
├── V1__Initial_schema.sql
├── V2__Add_authors_table.sql
├── V3__Add_embeddings_table.sql
├── V4__Add_users_table.sql
└── V5__Add_library_personal_table.sql
```

---

### 4.2 Script de Migración Inicial

**Archivo:** `V1__Initial_schema.sql`

```sql
CREATE TABLE libros (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor_id BIGINT NOT NULL,
    genero VARCHAR(50),
    precio DECIMAL(10, 2),
    sinopsis TEXT,
    isbn VARCHAR(20) UNIQUE,
    fecha_edicion DATE,
    numero_paginas INTEGER,
    rating DOUBLE PRECISION,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_libros_titulo ON libros(titulo);
CREATE INDEX idx_libros_autor_id ON libros(autor_id);
CREATE INDEX idx_libros_genero ON libros(genero);
```

---

### 4.3 Versionado de Esquema

**Flyway versionado:**
- Formato: `V{version}__{description}.sql`
- Ejemplo: `V1__Initial_schema.sql`, `V2__Add_authors_table.sql`
- Migraciones ejecutadas automáticamente al iniciar aplicación

---

## 5. Configuración de Producción

### 5.1 Variables de Entorno Críticas

| Variable | Descripción | Valor por Defecto | Requerido |
|----------|-------------|-------------------|-----------|
| `POSTGRES_PASSWORD` | Contraseña de PostgreSQL | `bookmate_pass` | ✅ Sí |
| `JWT_SECRET` | Clave secreta para JWT | `secret_key` | ✅ Sí |
| `AI_SERVICE_URL` | URL del servicio IA | `http://ai-service:5000` | ✅ Sí |
| `SPRING_PROFILES_ACTIVE` | Perfil de Spring | `production` | ⚠️ Recomendado |

---

### 5.2 Configuración de PostgreSQL

**Configuración recomendada:**
```properties
# application-production.properties
spring.datasource.url=jdbc:postgresql://postgres:5432/bookmate_db
spring.datasource.username=bookmate_user
spring.datasource.password=${POSTGRES_PASSWORD}
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000

spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
```

---

### 5.3 Configuración del Servicio IA

**Configuración recomendada:**
```python
# config.py
DATABASE_URL = os.getenv('DATABASE_URL', 
    'postgresql://bookmate_user:bookmate_pass@postgres:5432/bookmate_db')
MODEL_NAME = os.getenv('MODEL_NAME', 'all-MiniLM-L6-v2')
FLASK_PORT = int(os.getenv('FLASK_PORT', 5000))
```

---

## 6. Estrategia de Backup

### 6.1 Backup de Base de Datos

**Frecuencia:** Diaria (automática)

**Script de backup:**
```bash
#!/bin/bash
# backup_postgres.sh

BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/bookmate_db_$DATE.sql"

docker exec bookmate-postgres pg_dump -U bookmate_user bookmate_db > $BACKUP_FILE

# Comprimir backup
gzip $BACKUP_FILE

# Eliminar backups antiguos (mantener últimos 7 días)
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete
```

**Ejecución automática:**
```bash
# Crontab (ejecutar diariamente a las 2 AM)
0 2 * * * /path/to/backup_postgres.sh
```

---

### 6.2 Restauración de Base de Datos

**Script de restauración:**
```bash
#!/bin/bash
# restore_postgres.sh

BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
    echo "Uso: restore_postgres.sh <backup_file.sql.gz>"
    exit 1
fi

# Descomprimir
gunzip -c $BACKUP_FILE > /tmp/restore.sql

# Restaurar
docker exec -i bookmate-postgres psql -U bookmate_user bookmate_db < /tmp/restore.sql

# Limpiar
rm /tmp/restore.sql
```

---

## 7. Monitoreo Básico

### 7.1 Health Checks

**Backend:**
- Endpoint: `GET /actuator/health`
- Verifica: Conexión a BD, disponibilidad de servicios

**Servicio IA:**
- Endpoint: `GET /health`
- Verifica: Modelo cargado, conexión a BD (opcional)

**PostgreSQL:**
- Comando: `pg_isready`
- Verifica: Servicio disponible

---

### 7.2 Logs

**Visualización de logs:**
```bash
# Logs de todos los servicios
docker-compose logs -f

# Logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f ai-service
docker-compose logs -f postgres
```

---

## 8. Instrucciones de Despliegue

### 8.1 Despliegue Local (Desarrollo)

**Pasos:**
1. Clonar repositorio
2. Configurar variables de entorno (`.env`)
3. Construir imágenes:
   ```bash
   docker-compose build
   ```
4. Iniciar servicios:
   ```bash
   docker-compose up -d
   ```
5. Verificar salud:
   ```bash
   docker-compose ps
   curl http://localhost:8080/actuator/health
   curl http://localhost:5000/health
   ```

---

### 8.2 Despliegue en Producción

**Pasos:**
1. Configurar variables de entorno de producción
2. Construir imágenes con tags de versión:
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```
3. Iniciar servicios:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```
4. Verificar despliegue:
   ```bash
   docker-compose ps
   curl https://api.bookmate.com/actuator/health
   ```

---

## 9. Rollback

### 9.1 Estrategia de Rollback

**Si hay problemas:**
1. Detener servicios actuales:
   ```bash
   docker-compose down
   ```
2. Restaurar backup de BD (si es necesario)
3. Desplegar versión anterior:
   ```bash
   git checkout <version_anterior>
   docker-compose up -d
   ```

---

## 10. Conclusiones

Este plan de despliegue asegura que el sistema BookMate puede ser desplegado de forma reproducible y confiable utilizando Docker Compose, con:

- ✅ Configuración declarativa (docker-compose.yml)
- ✅ Migraciones automáticas (Flyway)
- ✅ Estrategia de backup
- ✅ Health checks
- ✅ Monitoreo básico

---

**Versión:** 1.0  
**Última actualización:** Noviembre 2025  
**Grupo 6** - Universidad Nacional de Ingeniería

