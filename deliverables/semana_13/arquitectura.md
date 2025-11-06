# Documento de Arquitectura - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Noviembre 2025  
**Versión:** 1.0  

---

## 1. Introducción

### 1.1 Propósito del Documento

Este documento describe la arquitectura técnica del sistema BookMate, incluyendo el stack tecnológico seleccionado, la arquitectura C4 completa (Niveles 1-4), los patrones de diseño aplicados, las decisiones arquitectónicas clave y los aspectos de seguridad y comunicación entre servicios.

### 1.2 Alcance

Este documento corresponde a la **fase de diseño arquitectónico** (Semana 13), donde se definen las tecnologías específicas y la arquitectura de implementación. A diferencia de la fase de análisis (Semana 11), aquí se especifican:

- ✅ **Tecnologías concretas** (Spring Boot, PostgreSQL, Python, Docker)
- ✅ **Clases de implementación** con nombres reales
- ✅ **Patrones de diseño** aplicados
- ✅ **Decisiones técnicas** específicas

### 1.3 Audiencia

- **Desarrolladores:** Para entender la arquitectura y tecnologías
- **Arquitectos de software:** Para revisar decisiones técnicas
- **Stakeholders técnicos:** Para validar la viabilidad
- **Equipo de proyecto:** Para guiar la implementación

---

## 2. Stack Tecnológico

### 2.1 Backend Principal

#### 2.1.1 Java

**Versión:** 17+ (probado con Java 24)  
**Propósito:** Lenguaje de programación del backend principal

**Justificación:**
- Lenguaje maduro y robusto
- Amplio ecosistema de librerías
- Requisito académico del curso
- Excelente rendimiento
- Tipado estático para mayor seguridad

**Alternativas consideradas:**
- **Node.js/TypeScript:** Rechazado (requisito académico Java)
- **Python:** Rechazado (usado solo para servicio IA)
- **Kotlin:** Considerado, pero Java es más estándar

---

#### 2.1.2 Spring Boot

**Versión:** 3.2.0  
**Propósito:** Framework principal del backend

**Justificación:**
- Convención sobre configuración (reduce código boilerplate)
- Ecosistema completo (Spring Data JPA, Spring Security, Spring Web)
- Auto-configuración inteligente
- Excelente documentación y comunidad
- Ideal para APIs REST
- Facilita testing con TestRestTemplate

**Dependencias principales:**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

**Alternativas consideradas:**
- **Quarkus:** Considerado, pero Spring Boot es más maduro
- **Micronaut:** Considerado, pero Spring Boot tiene mejor ecosistema

---

#### 2.1.3 Spring Data JPA

**Versión:** (incluido en Spring Boot 3.2.0)  
**Propósito:** Abstracción de acceso a datos

**Justificación:**
- Reduce código boilerplate (CRUD automático)
- Integración nativa con Spring Boot
- Soporte para consultas personalizadas
- Paginación y ordenamiento automáticos
- Manejo de transacciones declarativo

**Características utilizadas:**
- Repositorios Spring Data (interfaces)
- Consultas derivadas de métodos
- `@Query` para consultas personalizadas
- Paginación con `Pageable`
- Auditoría con `@CreatedDate`, `@LastModifiedDate`

---

#### 2.1.4 Flyway

**Versión:** 9.x  
**Propósito:** Versionado y migración de esquema de base de datos

**Justificación:**
- Control de versiones del esquema de BD
- Migraciones automáticas al iniciar aplicación
- Historial completo de cambios
- Rollback de migraciones
- Integración nativa con Spring Boot

**Estructura de migraciones:**
```
src/main/resources/db/migration/
├── V1__Initial_schema.sql
├── V2__Add_authors_table.sql
├── V3__Add_embeddings_table.sql
└── ...
```

**Alternativas consideradas:**
- **Liquibase:** Considerado, pero Flyway es más simple
- **Scripts SQL manuales:** Rechazado (sin control de versiones)

---

### 2.2 Base de Datos

#### 2.2.1 PostgreSQL

**Versión:** 16  
**Propósito:** Base de datos relacional principal

**Justificación:**
- Open source y robusto
- Excelente soporte ACID
- Extensible (permite agregar funcionalidades)
- Ampliamente usado en producción
- Compatible con Spring Data JPA
- Soporte para tipos de datos avanzados (JSON, arrays)

**Características utilizadas:**
- Transacciones ACID
- Índices para optimización de búsquedas
- Constraints de integridad referencial
- Tipos de datos: VARCHAR, INTEGER, DECIMAL, TIMESTAMP, TEXT

**Alternativas consideradas:**
- **MySQL:** Considerado, pero PostgreSQL es más robusto
- **MongoDB:** Rechazado (requisito académico relacional)
- **SQLite:** Rechazado (no adecuado para producción)

---

#### 2.2.2 HikariCP

**Versión:** (incluido en Spring Boot)  
**Propósito:** Connection pool para PostgreSQL

**Justificación:**
- Pool de conexiones eficiente
- Configuración automática en Spring Boot
- Excelente rendimiento
- Monitoreo de conexiones

**Configuración típica:**
```properties
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
```

---

### 2.3 Servicio de Inteligencia Artificial

#### 2.3.1 Python

**Versión:** 3.11+  
**Propósito:** Lenguaje del microservicio de IA

**Justificación:**
- Ecosistema rico en machine learning y NLP
- Librerías maduras para embeddings
- Fácil integración de modelos preentrenados
- Ideal para microservicios de IA
- Separación de responsabilidades (Java backend, Python IA)

**Alternativas consideradas:**
- **Java con DL4J:** Rechazado (menos maduro para NLP)
- **Node.js:** Rechazado (ecosistema ML limitado)

---

#### 2.3.2 Flask

**Versión:** 2.3+  
**Propósito:** Framework web ligero para el servicio IA

**Justificación:**
- Simple y rápido
- Adecuado para microservicios
- Fácil de configurar
- Buena documentación
- Ideal para APIs REST simples

**Alternativas consideradas:**
- **FastAPI:** Considerado, pero Flask es más simple
- **Django:** Rechazado (demasiado pesado para microservicio)

---

#### 2.3.3 Sentence Transformers

**Versión:** 2.2+  
**Propósito:** Generación de embeddings semánticos

**Justificación:**
- Modelos preentrenados disponibles
- Fácil de usar
- Excelente rendimiento
- Soporte para múltiples idiomas
- Modelos optimizados para producción

**Modelo utilizado:**
- `all-MiniLM-L6-v2` (modelo ligero, rápido, bueno para español/inglés)

**Alternativas consideradas:**
- **BERT directo:** Rechazado (más complejo, requiere más recursos)
- **Word2Vec:** Rechazado (menos preciso que Sentence Transformers)

---

#### 2.3.4 NumPy y SciPy

**Versión:** NumPy 1.24+, SciPy 1.11+  
**Propósito:** Cálculos numéricos y similitud

**Justificación:**
- Operaciones vectoriales eficientes
- Cálculo de similitud de coseno optimizado
- Estándar de la industria
- Integración con Sentence Transformers

**Uso:**
- Cálculo de similitud de coseno entre embeddings
- Operaciones vectoriales para comparación masiva

---

### 2.4 Frontend

#### 2.4.1 HTML5, CSS3, JavaScript

**Versión:** Estándares web modernos  
**Propósito:** Interfaz de usuario

**Justificación:**
- Estándares web universales
- Sin dependencias externas pesadas
- Compatible con todos los navegadores modernos
- Fácil de mantener

---

#### 2.4.2 Bootstrap

**Versión:** 5.1.3  
**Propósito:** Framework CSS para diseño responsive

**Justificación:**
- Sistema de grid responsive
- Componentes UI listos para usar
- Ampliamente usado y documentado
- Fácil personalización
- Compatible con todos los navegadores

---

#### 2.4.3 Font Awesome

**Versión:** 6.4.0  
**Propósito:** Biblioteca de iconos

**Justificación:**
- Amplia colección de iconos
- Fácil de usar
- Consistente visualmente
- Ligero

---

### 2.5 Containerización y Despliegue

#### 2.5.1 Docker

**Versión:** 24+  
**Propósito:** Containerización de aplicaciones

**Justificación:**
- Estándar de la industria
- Aislamiento de servicios
- Portabilidad entre entornos
- Reproducibilidad
- Facilita desarrollo local

---

#### 2.5.2 Docker Compose

**Versión:** 2.20+  
**Propósito:** Orquestación de múltiples contenedores

**Justificación:**
- Gestión simplificada de múltiples servicios
- Configuración declarativa
- Desarrollo local fácil
- Redes y volúmenes automáticos

**Servicios orquestados:**
- Backend Spring Boot
- Base de datos PostgreSQL
- Servicio Python IA

---

## 3. Arquitectura C4 Completa

### 3.1 Nivel 1: Contexto del Sistema

**Descripción:** Vista de alto nivel mostrando el sistema BookMate en su contexto, interactuando con usuarios y sistemas externos.

**Actores:**
- **Usuario:** Estudiante, profesor o investigador que usa el sistema
- **Administrador:** Bibliotecario o gestor de catálogo

**Sistema:**
- **BookMate:** Sistema principal de recomendación de libros

**Sistemas Externos:**
- **Servicio de IA:** Microservicio Python para análisis semántico

**Flujos principales:**
1. Usuario busca libros y obtiene recomendaciones
2. Administrador gestiona catálogo
3. Sistema solicita análisis semántico al servicio IA

**Tecnologías:**
- Frontend: HTML5, CSS3, JavaScript, Bootstrap
- Backend: Spring Boot 3.2.0
- Base de datos: PostgreSQL 16
- Servicio IA: Python 3.11, Flask, Sentence Transformers

---

### 3.2 Nivel 2: Contenedores

**Descripción:** Descomposición del sistema en contenedores (aplicaciones y almacenamiento de datos).

#### 3.2.1 Aplicación Web (Frontend)

**Tecnología:** HTML5, CSS3, JavaScript, Bootstrap 5.1.3  
**Propósito:** Interfaz de usuario

**Responsabilidades:**
- Interfaz de catálogo
- Formularios de búsqueda
- Vista de detalles de libro
- Mostrar recomendaciones
- Panel de administración

**Características:**
- Responsive (móvil/tablet/desktop)
- <5 clicks para tareas comunes
- Sin estado del servidor (SPA-like)

**Comunicación:**
- HTTP REST con backend
- JSON para intercambio de datos

---

#### 3.2.2 Sistema de Gestión (Backend)

**Tecnología:** Spring Boot 3.2.0, Java 17+  
**Propósito:** Lógica de negocio y coordinación

**Responsabilidades:**
- Operaciones CRUD de libros y autores
- Búsquedas avanzadas
- Coordinación de recomendaciones
- Autenticación y autorización
- Validación de datos

**Componentes principales:**
- Controllers (REST endpoints)
- Services (lógica de negocio)
- Repositories (acceso a datos)
- DTOs (transferencia de datos)

**Comunicación:**
- HTTP REST con frontend
- JDBC con PostgreSQL
- HTTP REST con servicio IA

---

#### 3.2.3 Sistema de Almacenamiento (Base de Datos)

**Tecnología:** PostgreSQL 16  
**Propósito:** Persistencia de datos

**Almacena:**
- Libros (título, autor, género, precio, sinopsis, ISBN, etc.)
- Autores (nombre, biografía, nacionalidad)
- Representaciones semánticas (embeddings)
- Usuarios y roles
- Biblioteca personal de usuarios

**Características:**
- Integridad referencial
- Consultas eficientes (<1s)
- Transacciones ACID
- Migraciones con Flyway

**Esquema principal:**
- Tabla `libros` (id, titulo, autor_id, genero, precio, sinopsis, isbn, etc.)
- Tabla `autores` (id, nombre, biografia, nacionalidad)
- Tabla `embeddings` (id, libro_id, vector, fecha_generacion)
- Tabla `usuarios` (id, email, password_hash, rol)
- Tabla `biblioteca_personal` (usuario_id, libro_id, estado_lectura)

---

#### 3.2.4 Servicio de Inteligencia Artificial

**Tecnología:** Python 3.11, Flask 2.3, Sentence Transformers 2.2  
**Propósito:** Análisis semántico y generación de recomendaciones

**Funciones:**
1. **Generar Embeddings:**
   - Recibe sinopsis del libro
   - Genera vector semántico con Sentence Transformers
   - Retorna embedding para almacenamiento

2. **Calcular Similitud:**
   - Recibe ID de libro de referencia
   - Calcula similitud de coseno con todos los libros
   - Retorna top 6 libros más similares

**Requisitos:**
- Latencia <3s (p95)
- Relevancia >70%

**Comunicación:**
- HTTP REST con backend
- Lectura de embeddings desde PostgreSQL (opcional)

---

### 3.3 Nivel 3: Componentes

**Descripción:** Descomposición del backend en componentes de software.

#### 3.3.1 Controllers (Capa de Presentación)

**Tecnología:** Spring MVC (`@RestController`)

**Componentes:**
- **LibrosController:**
  - `GET /api/books` - Listar libros con filtros
  - `GET /api/books/{id}` - Obtener detalle de libro
  - `POST /api/books` - Crear libro (admin)
  - `PUT /api/books/{id}` - Actualizar libro (admin)
  - `DELETE /api/books/{id}` - Eliminar libro (admin)

- **AutorController:**
  - `GET /api/autores` - Listar autores
  - `GET /api/autores/{id}` - Obtener detalle de autor
  - `POST /api/autores` - Crear autor (admin)
  - `PUT /api/autores/{id}` - Actualizar autor (admin)
  - `DELETE /api/autores/{id}` - Eliminar autor (admin)

- **RecommendationController:**
  - `GET /api/recommendations/{bookId}` - Obtener recomendaciones para un libro
  - `GET /api/recommendations/user/{userId}` - Obtener recomendaciones personalizadas

- **SearchController:**
  - `GET /api/search?q={query}` - Búsqueda avanzada

- **AuthController:**
  - `POST /api/auth/login` - Iniciar sesión
  - `POST /api/auth/register` - Registrarse
  - `POST /api/auth/logout` - Cerrar sesión

**Responsabilidades:**
- Recibir peticiones HTTP
- Validar entrada
- Invocar servicios
- Retornar respuestas HTTP
- Manejar excepciones

---

#### 3.3.2 Services (Capa de Negocio)

**Tecnología:** Spring (`@Service`)

**Componentes:**
- **LibrosService:**
  - `List<LibroDTO> listarLibros(FiltrosLibro filtros)`
  - `LibroDTO obtenerLibro(Long id)`
  - `LibroDTO crearLibro(CrearLibroDTO dto)`
  - `LibroDTO actualizarLibro(Long id, ActualizarLibroDTO dto)`
  - `void eliminarLibro(Long id)`

- **AutorService:**
  - `List<AutorDTO> listarAutores()`
  - `AutorDTO obtenerAutor(Long id)`
  - `AutorDTO crearAutor(CrearAutorDTO dto)`
  - `AutorDTO actualizarAutor(Long id, ActualizarAutorDTO dto)`
  - `void eliminarAutor(Long id)`

- **RecommendationService:**
  - `List<LibroDTO> obtenerRecomendaciones(Long bookId)`
  - `List<LibroDTO> obtenerRecomendacionesPersonalizadas(Long userId)`
  - `void decidirMetodoRecomendacion()` (Strategy pattern)

- **AIServiceClient:**
  - `float[] generarEmbedding(String sinopsis)`
  - `List<Long> calcularSimilitud(Long bookId)`
  - `boolean verificarDisponibilidad()`

- **HeuristicRecommender:**
  - `List<LibroDTO> recomendar(Long bookId)`
  - `int calcularPuntuacion(Libro libro, Libro referencia)`

- **SearchService:**
  - `List<LibroDTO> buscar(String query, FiltrosBusqueda filtros)`

**Responsabilidades:**
- Lógica de negocio
- Coordinación entre componentes
- Aplicación de reglas de negocio
- Transformación de entidades a DTOs

---

#### 3.3.3 Repositories (Capa de Datos)

**Tecnología:** Spring Data JPA (`@Repository`)

**Componentes:**
- **LibrosRepository:**
  - `List<Libro> findByTituloContaining(String titulo)`
  - `List<Libro> findByAutorId(Long autorId)`
  - `List<Libro> findByGenero(String genero)`
  - `Page<Libro> findAll(Pageable pageable)`

- **AutorRepository:**
  - `Optional<Autor> findByNombre(String nombre)`
  - `List<Autor> findAll()`

- **EmbeddingRepository:**
  - `Optional<Embedding> findByLibroId(Long libroId)`
  - `void save(Embedding embedding)`

**Responsabilidades:**
- Acceso a base de datos
- Consultas optimizadas
- Manejo de transacciones

---

#### 3.3.4 DTOs (Data Transfer Objects)

**Tecnología:** Clases Java simples

**Componentes:**
- **LibroDTO:** Transferencia de datos de libro
- **AutorDTO:** Transferencia de datos de autor
- **RecomendacionDTO:** Resultado de recomendación
- **CrearLibroDTO:** DTO para creación
- **ActualizarLibroDTO:** DTO para actualización

**Propósito:**
- Separar capa de presentación de entidades
- Controlar qué datos se exponen
- Validación de entrada

---

#### 3.3.5 Entidades JPA

**Tecnología:** JPA (`@Entity`)

**Componentes:**
- **Libro:**
  - `@Id Long id`
  - `String titulo`
  - `@ManyToOne Autor autor`
  - `String genero`
  - `BigDecimal precio`
  - `String sinopsis`
  - `String isbn`
  - `LocalDate fechaEdicion`
  - `Integer numeroPaginas`
  - `Double rating`
  - `List<String> tags`

- **Autor:**
  - `@Id Long id`
  - `String nombre`
  - `String biografia`
  - `String nacionalidad`
  - `@OneToMany List<Libro> libros`

- **Embedding:**
  - `@Id Long id`
  - `@OneToOne Libro libro`
  - `float[] vector`
  - `LocalDateTime fechaGeneracion`

**Responsabilidades:**
- Mapeo objeto-relacional
- Relaciones entre entidades
- Validaciones a nivel de entidad

---

### 3.4 Nivel 4: Código

**Descripción:** Descomposición de componentes en clases y métodos específicos.

#### 3.4.1 Ejemplo: RecommendationController

```java
@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {
    
    private final RecommendationService recommendationService;
    
    @GetMapping("/{bookId}")
    public ResponseEntity<List<LibroDTO>> obtenerRecomendaciones(
            @PathVariable Long bookId) {
        List<LibroDTO> recomendaciones = 
            recommendationService.obtenerRecomendaciones(bookId);
        return ResponseEntity.ok(recomendaciones);
    }
}
```

---

#### 3.4.2 Ejemplo: RecommendationService

```java
@Service
public class RecommendationService {
    
    private final AIServiceClient aiServiceClient;
    private final HeuristicRecommender heuristicRecommender;
    private final LibrosRepository librosRepository;
    
    public List<LibroDTO> obtenerRecomendaciones(Long bookId) {
        // Strategy pattern: decidir método
        if (aiServiceClient.verificarDisponibilidad()) {
            return obtenerRecomendacionesIA(bookId);
        } else {
            return heuristicRecommender.recomendar(bookId);
        }
    }
    
    private List<LibroDTO> obtenerRecomendacionesIA(Long bookId) {
        List<Long> bookIds = aiServiceClient.calcularSimilitud(bookId);
        return librosRepository.findAllById(bookIds)
            .stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }
}
```

---

#### 3.4.3 Ejemplo: AIServiceClient

```java
@Service
public class AIServiceClient {
    
    private final RestTemplate restTemplate;
    private final String aiServiceUrl;
    
    public List<Long> calcularSimilitud(Long bookId) {
        String url = aiServiceUrl + "/api/similarity/" + bookId;
        SimilarityResponse response = restTemplate.getForObject(
            url, SimilarityResponse.class);
        return response.getBookIds();
    }
    
    public boolean verificarDisponibilidad() {
        try {
            String url = aiServiceUrl + "/health";
            restTemplate.getForObject(url, String.class);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
```

---

#### 3.4.4 Estructura de Paquetes Java

```
com.bookmate
├── controller/
│   ├── LibrosController.java
│   ├── AutorController.java
│   ├── RecommendationController.java
│   ├── SearchController.java
│   └── AuthController.java
├── service/
│   ├── LibrosService.java
│   ├── AutorService.java
│   ├── RecommendationService.java
│   ├── AIServiceClient.java
│   ├── HeuristicRecommender.java
│   └── SearchService.java
├── repository/
│   ├── LibrosRepository.java
│   ├── AutorRepository.java
│   └── EmbeddingRepository.java
├── entity/
│   ├── Libro.java
│   ├── Autor.java
│   ├── Embedding.java
│   └── Usuario.java
├── dto/
│   ├── LibroDTO.java
│   ├── AutorDTO.java
│   ├── RecomendacionDTO.java
│   └── ...
└── config/
    ├── SecurityConfig.java
    └── DatabaseConfig.java
```

---

#### 3.4.5 Estructura de Módulos Python (Servicio IA)

```
ai_service/
├── app.py                 # Flask application
├── embeddings.py          # Generación de embeddings
├── similarity.py          # Cálculo de similitud
├── models/               # Modelos Sentence Transformers
├── requirements.txt      # Dependencias
└── Dockerfile           # Containerización
```

**Métodos principales:**
- `generate_embedding(sinopsis: str) -> List[float]`
- `calculate_similarity(book_id: int) -> List[int]`
- `health_check() -> dict`

---

## 4. Patrones de Diseño Aplicados

### 4.1 Strategy Pattern

**Aplicación:** Sistema de recomendaciones

**Descripción:** Permite seleccionar el algoritmo de recomendación (IA o heurístico) en tiempo de ejecución.

**Implementación:**
```java
public interface RecommenderStrategy {
    List<LibroDTO> recomendar(Long bookId);
}

@Component
public class AIRecommender implements RecommenderStrategy {
    // Implementación con IA
}

@Component
public class HeuristicRecommender implements RecommenderStrategy {
    // Implementación heurística
}

@Service
public class RecommendationService {
    public List<LibroDTO> obtenerRecomendaciones(Long bookId) {
        RecommenderStrategy strategy = 
            aiServiceClient.verificarDisponibilidad() 
                ? aiRecommender 
                : heuristicRecommender;
        return strategy.recomendar(bookId);
    }
}
```

**Justificación:**
- Facilita agregar nuevos algoritmos de recomendación
- Permite cambiar estrategia sin modificar código cliente
- Fallback automático a heurísticas si IA falla

---

### 4.2 Repository Pattern

**Aplicación:** Acceso a datos

**Descripción:** Abstrae la lógica de acceso a datos, proporcionando una interfaz más orientada a objetos.

**Implementación:**
```java
public interface LibrosRepository extends JpaRepository<Libro, Long> {
    List<Libro> findByTituloContaining(String titulo);
    List<Libro> findByAutorId(Long autorId);
    Page<Libro> findAll(Pageable pageable);
}
```

**Justificación:**
- Separa lógica de negocio de detalles de persistencia
- Facilita testing (mocks)
- Spring Data JPA proporciona implementación automática

---

### 4.3 Service Layer Pattern

**Aplicación:** Lógica de negocio

**Descripción:** Capa intermedia entre controllers y repositories que contiene la lógica de negocio.

**Implementación:**
```java
@Service
public class LibrosService {
    private final LibrosRepository librosRepository;
    
    public LibroDTO crearLibro(CrearLibroDTO dto) {
        // Validaciones de negocio
        // Transformaciones
        // Llamadas a repositorios
    }
}
```

**Justificación:**
- Separa lógica de negocio de presentación
- Facilita reutilización
- Facilita testing

---

### 4.4 DTO Pattern

**Aplicación:** Transferencia de datos

**Descripción:** Objetos simples para transferir datos entre capas sin exponer entidades JPA.

**Implementación:**
```java
public class LibroDTO {
    private Long id;
    private String titulo;
    private String autorNombre;
    // Solo campos necesarios para la vista
}
```

**Justificación:**
- Controla qué datos se exponen
- Evita problemas de lazy loading
- Facilita versionado de API

---

### 4.5 Dependency Injection

**Aplicación:** Toda la aplicación

**Descripción:** Spring inyecta dependencias automáticamente mediante `@Autowired` o constructor.

**Implementación:**
```java
@Service
public class RecommendationService {
    private final AIServiceClient aiServiceClient;
    
    public RecommendationService(AIServiceClient aiServiceClient) {
        this.aiServiceClient = aiServiceClient;
    }
}
```

**Justificación:**
- Reduce acoplamiento
- Facilita testing
- Mejora mantenibilidad

---

## 5. Decisiones Arquitectónicas Clave

### 5.1 Microservicio Python Separado para IA

**Decisión:** Implementar el servicio de IA como microservicio Python separado del backend principal.

**Justificación:**
- **Separación de responsabilidades:** IA es un dominio diferente
- **Escalabilidad independiente:** Puede escalarse según demanda
- **Tecnología adecuada:** Python es mejor para ML/NLP
- **Aislamiento de fallos:** Si IA falla, el sistema sigue funcionando con heurísticas

**Alternativas consideradas:**
- **IA integrada en backend Java:** Rechazado (ecosistema ML limitado en Java)
- **IA como librería:** Rechazado (menos flexible)

**Trade-offs:**
- ✅ Ventajas: Separación clara, escalabilidad, tecnología adecuada
- ❌ Desventajas: Complejidad de despliegue, latencia de red

---

### 5.2 Fallback Automático a Heurísticas

**Decisión:** Si el servicio IA no está disponible, usar automáticamente recomendaciones heurísticas.

**Justificación:**
- **Alta disponibilidad:** Sistema siempre retorna recomendaciones
- **Resiliencia:** No depende completamente de servicio externo
- **Experiencia de usuario:** Usuario siempre recibe resultados

**Implementación:**
- Strategy pattern para seleccionar método
- Health check del servicio IA
- Fallback transparente

---

### 5.3 Flyway para Migraciones de BD

**Decisión:** Usar Flyway para versionado y migración de esquema de base de datos.

**Justificación:**
- **Control de versiones:** Historial completo de cambios
- **Migraciones automáticas:** Al iniciar aplicación
- **Reproducibilidad:** Mismo esquema en todos los entornos
- **Rollback:** Posibilidad de revertir cambios

**Alternativas consideradas:**
- **Liquibase:** Considerado, pero Flyway es más simple
- **Scripts SQL manuales:** Rechazado (sin control de versiones)

---

### 5.4 Docker Compose para Orquestación

**Decisión:** Usar Docker Compose para orquestar los 3 servicios (backend, BD, IA).

**Justificación:**
- **Desarrollo local fácil:** Un comando para levantar todo
- **Reproducibilidad:** Mismo entorno en todos los desarrolladores
- **Aislamiento:** Cada servicio en su contenedor
- **Configuración declarativa:** `docker-compose.yml` documenta la arquitectura

**Alternativas consideradas:**
- **Kubernetes:** Rechazado (demasiado complejo para este proyecto)
- **Vagrant:** Rechazado (Docker es más moderno)

---

### 5.5 Arquitectura de Microservicios Ligera

**Decisión:** Arquitectura de microservicios con 2 servicios principales (backend + IA).

**Justificación:**
- **Separación de responsabilidades:** Backend y IA son dominios diferentes
- **Escalabilidad:** Pueden escalarse independientemente
- **Tecnología adecuada:** Java para backend, Python para IA

**Trade-offs:**
- ✅ Ventajas: Separación clara, escalabilidad, tecnología adecuada
- ❌ Desventajas: Complejidad de despliegue, latencia de red

---

## 6. Comunicación Entre Servicios

### 6.1 Backend ↔ Frontend

**Protocolo:** HTTP REST  
**Formato:** JSON  
**Autenticación:** JWT tokens (en headers)

**Endpoints principales:**
- `GET /api/books` - Listar libros
- `GET /api/books/{id}` - Detalle de libro
- `GET /api/recommendations/{bookId}` - Recomendaciones
- `POST /api/auth/login` - Autenticación

**Ejemplo de petición:**
```http
GET /api/recommendations/123 HTTP/1.1
Host: localhost:8080
Authorization: Bearer {jwt_token}
```

**Ejemplo de respuesta:**
```json
[
  {
    "id": 456,
    "titulo": "Libro Recomendado",
    "autor": "Autor Recomendado",
    "similitud": 0.87
  }
]
```

---

### 6.2 Backend ↔ Servicio IA

**Protocolo:** HTTP REST  
**Formato:** JSON  
**Autenticación:** API key (en headers) o sin autenticación (desarrollo)

**Endpoints del servicio IA:**
- `POST /api/embeddings/generate` - Generar embedding
- `GET /api/similarity/{bookId}` - Calcular similitud
- `GET /health` - Health check

**Ejemplo de petición:**
```http
GET /api/similarity/123 HTTP/1.1
Host: localhost:5000
```

**Ejemplo de respuesta:**
```json
{
  "bookIds": [456, 789, 101, 202, 303, 404],
  "similarities": [0.87, 0.82, 0.79, 0.75, 0.73, 0.70]
}
```

**Manejo de errores:**
- Timeout: 5 segundos
- Retry: 1 intento
- Fallback: Usar heurísticas si falla

---

### 6.3 Backend ↔ PostgreSQL

**Protocolo:** JDBC  
**Driver:** PostgreSQL JDBC Driver  
**Connection Pool:** HikariCP

**Configuración:**
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/bookmate
spring.datasource.username=bookmate_user
spring.datasource.password=bookmate_pass
spring.datasource.driver-class-name=org.postgresql.Driver
```

**Transacciones:**
- Spring `@Transactional` para operaciones atómicas
- Rollback automático en caso de error

---

## 7. Seguridad

### 7.1 Autenticación

**Tecnología:** Spring Security + JWT

**Flujo:**
1. Usuario envía credenciales (`POST /api/auth/login`)
2. Backend valida credenciales
3. Backend genera JWT token
4. Frontend almacena token
5. Frontend envía token en headers de peticiones subsecuentes
6. Backend valida token en cada petición

**Implementación:**
```java
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        http
            .csrf().disable()
            .authorizeHttpRequests()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/books/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            .and()
            .addFilterBefore(jwtAuthenticationFilter, 
                UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
```

---

### 7.2 Autorización

**Roles:**
- **USER:** Usuario estándar (puede buscar, ver detalles, obtener recomendaciones)
- **ADMIN:** Administrador (puede CRUD de libros y autores)

**Implementación:**
- `@PreAuthorize("hasRole('ADMIN')")` en métodos de servicios
- Filtros de Spring Security

---

### 7.3 Validación de Entrada

**Tecnología:** Bean Validation (`@Valid`, `@NotNull`, `@Size`, etc.)

**Ejemplo:**
```java
public class CrearLibroDTO {
    @NotBlank(message = "Título es obligatorio")
    @Size(max = 200, message = "Título muy largo")
    private String titulo;
    
    @NotNull(message = "Precio es obligatorio")
    @DecimalMin(value = "0.0", message = "Precio debe ser positivo")
    private BigDecimal precio;
}
```

---

### 7.4 Protección contra Ataques Comunes

**SQL Injection:**
- ✅ Prevenido por JPA (prepared statements automáticos)

**XSS (Cross-Site Scripting):**
- ✅ Validación de entrada
- ✅ Escapado de HTML en frontend

**CSRF (Cross-Site Request Forgery):**
- ✅ Tokens JWT
- ✅ CORS configurado

---

## 8. Rendimiento y Escalabilidad

### 8.1 Optimizaciones de Base de Datos

**Índices:**
- Índice en `libros.titulo` para búsquedas
- Índice en `libros.autor_id` para joins
- Índice en `libros.genero` para filtros

**Consultas optimizadas:**
- Paginación para listados grandes
- Lazy loading para relaciones
- Consultas específicas (no `SELECT *`)

---

### 8.2 Caché de Embeddings

**Estrategia:** Almacenar embeddings en base de datos para evitar regeneración.

**Implementación:**
- Tabla `embeddings` con columna `vector`
- Generar embedding solo si no existe
- Actualizar embedding si sinopsis cambia

---

### 8.3 Connection Pooling

**Tecnología:** HikariCP

**Configuración:**
```properties
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
```

---

### 8.4 Escalabilidad Horizontal

**Backend:**
- Múltiples instancias detrás de load balancer
- Base de datos compartida
- Stateless (sin sesiones en servidor)

**Servicio IA:**
- Múltiples instancias para procesamiento paralelo
- Sin estado compartido (cada instancia independiente)

---

## 9. Monitoreo y Logging

### 9.1 Logging

**Tecnología:** Logback (incluido en Spring Boot)

**Niveles:**
- **ERROR:** Errores críticos
- **WARN:** Advertencias
- **INFO:** Información general
- **DEBUG:** Debug (solo desarrollo)

**Configuración:**
```properties
logging.level.com.bookmate=INFO
logging.level.org.springframework.web=DEBUG
```

---

### 9.2 Health Checks

**Endpoints:**
- Backend: `GET /actuator/health` (Spring Boot Actuator)
- Servicio IA: `GET /health`

**Uso:**
- Docker health checks
- Monitoreo de disponibilidad
- Fallback automático

---

## 10. Conclusiones

### 10.1 Resumen de Arquitectura

La arquitectura de BookMate sigue un enfoque de **microservicios ligero** con:

- **Backend Spring Boot:** Lógica de negocio y API REST
- **PostgreSQL:** Persistencia de datos
- **Servicio Python IA:** Análisis semántico
- **Frontend:** Interfaz de usuario responsive

### 10.2 Principios Aplicados

- **Separación de responsabilidades:** Cada servicio tiene un propósito claro
- **Alta disponibilidad:** Fallback automático a heurísticas
- **Escalabilidad:** Servicios pueden escalarse independientemente
- **Mantenibilidad:** Código organizado, patrones de diseño aplicados
- **Seguridad:** Autenticación JWT, validación de entrada

### 10.3 Próximos Pasos

1. Implementar diseño detallado (Semana 15)
2. Completar integración de servicios
3. Optimizar rendimiento
4. Preparar despliegue con Docker Compose

---

**Versión:** 1.0  
**Última actualización:** Noviembre 2025  
**Grupo 6** - Universidad Nacional de Ingeniería

