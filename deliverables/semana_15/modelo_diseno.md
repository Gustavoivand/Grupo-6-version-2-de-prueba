# Modelo de Diseño - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Noviembre 2025  
**Versión:** 1.0  

---

## 1. Introducción

### 1.1 Propósito del Modelo de Diseño

Este documento describe el modelo de diseño del sistema BookMate, transformando el modelo de análisis conceptual (Semana 11) en un diseño de implementación con tecnologías específicas. Aquí se definen:

- ✅ Clases de implementación reales (Java con JPA)
- ✅ Métodos específicos con firmas completas
- ✅ Relaciones entre clases
- ✅ Patrones de diseño aplicados
- ✅ Justificación técnica de decisiones

### 1.2 Transformación: Análisis → Diseño

**Fase de Análisis (Semana 11):**
- Modelo conceptual (BCE)
- Entidades del dominio (sin tecnologías)
- Controladores conceptuales
- Arquitectura conceptual

**Fase de Diseño (Semana 15):**
- Clases JPA con anotaciones
- Services y Controllers de Spring Boot
- Repositories de Spring Data JPA
- DTOs para transferencia de datos
- Arquitectura física detallada

---

## 2. Mapeo: Entidades Conceptuales → Clases JPA

### 2.1 Entidad: Libro

**Análisis (Conceptual):**
- Atributos: Identificador, Título, Género, Precio, Sinopsis, ISBN, etc.
- Responsabilidades: Mantener información, proveer datos para búsqueda

**Diseño (JPA):**
```java
@Entity
@Table(name = "libros")
public class Libro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    private String titulo;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "autor_id", nullable = false)
    private Autor autor;
    
    @Column(length = 50)
    private String genero;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal precio;
    
    @Column(columnDefinition = "TEXT")
    private String sinopsis;
    
    @Column(unique = true, length = 20)
    private String isbn;
    
    @Column(name = "fecha_edicion")
    private LocalDate fechaEdicion;
    
    @Column(name = "numero_paginas")
    private Integer numeroPaginas;
    
    private Double rating;
    
    @ElementCollection
    @CollectionTable(name = "libro_tags", joinColumns = @JoinColumn(name = "libro_id"))
    @Column(name = "tag")
    private List<String> tags;
    
    @OneToOne(mappedBy = "libro", cascade = CascadeType.ALL)
    private Embedding embedding;
    
    // Getters y setters
    // Constructores
}
```

**Justificación:**
- `@Entity` y `@Table`: Mapeo objeto-relacional
- `@ManyToOne`: Relación con Autor (muchos libros por autor)
- `@OneToOne`: Relación con Embedding (un embedding por libro)
- `@ElementCollection`: Lista de tags como tabla separada
- `FetchType.LAZY`: Optimización de consultas

---

### 2.2 Entidad: Autor

**Análisis (Conceptual):**
- Atributos: Identificador, Nombre, Biografía, Nacionalidad
- Responsabilidades: Mantener información del autor, relacionar libros

**Diseño (JPA):**
```java
@Entity
@Table(name = "autores")
public class Autor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @Column(columnDefinition = "TEXT")
    private String biografia;
    
    @Column(length = 50)
    private String nacionalidad;
    
    @OneToMany(mappedBy = "autor", cascade = CascadeType.ALL)
    private List<Libro> libros;
    
    // Getters y setters
    // Constructores
}
```

**Justificación:**
- `@OneToMany`: Relación inversa con Libro
- `mappedBy`: Indica que la relación está mapeada desde Libro
- `cascade = CascadeType.ALL`: Operaciones en cascada

---

### 2.3 Entidad: Representación Semántica (Embedding)

**Análisis (Conceptual):**
- Atributos: Vector numérico, Fecha de generación
- Responsabilidades: Almacenar embeddings, proveer datos para similitud

**Diseño (JPA):**
```java
@Entity
@Table(name = "embeddings")
public class Embedding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "libro_id", unique = true, nullable = false)
    private Libro libro;
    
    @Column(name = "vector", columnDefinition = "float[]")
    private float[] vector;
    
    @Column(name = "fecha_generacion")
    private LocalDateTime fechaGeneracion;
    
    // Getters y setters
    // Constructores
}
```

**Justificación:**
- `@OneToOne`: Relación uno-a-uno con Libro
- `float[]`: Array de floats para el vector de embedding
- `LocalDateTime`: Timestamp de generación

---

### 2.4 Entidad: Usuario

**Análisis (Conceptual):**
- Atributos: Identificador, Nombre, Correo, Rol
- Responsabilidades: Mantener información, determinar permisos

**Diseño (JPA):**
```java
@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    @Column(nullable = false)
    private String passwordHash;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol;
    
    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;
    
    // Getters y setters
    // Constructores
}

public enum Rol {
    USER, ADMIN
}
```

**Justificación:**
- `@Enumerated`: Almacenar enum como String
- `passwordHash`: Almacenar hash, no contraseña en texto plano
- `unique = true`: Email único

---

## 3. Mapeo: Controladores Conceptuales → Services/Controllers

### 3.1 Gestor de Catálogo → LibrosService + LibrosController

**Análisis (Conceptual):**
- Responsabilidades: Coordinar CRUD de libros, validar datos, notificar a IA

**Diseño (Spring Boot):**

**LibrosService:**
```java
@Service
@Transactional
public class LibrosService {
    private final LibrosRepository librosRepository;
    private final AIServiceClient aiServiceClient;
    
    public List<LibroDTO> listarLibros(FiltrosLibro filtros) {
        // Lógica de negocio
        // Aplicar filtros
        // Transformar a DTOs
    }
    
    public LibroDTO obtenerLibro(Long id) {
        Libro libro = librosRepository.findById(id)
            .orElseThrow(() -> new LibroNotFoundException(id));
        return toDTO(libro);
    }
    
    public LibroDTO crearLibro(CrearLibroDTO dto) {
        // Validaciones de negocio
        Libro libro = toEntity(dto);
        libro = librosRepository.save(libro);
        
        // Notificar a IA para generar embedding
        aiServiceClient.generarEmbedding(libro.getId(), libro.getSinopsis());
        
        return toDTO(libro);
    }
    
    public LibroDTO actualizarLibro(Long id, ActualizarLibroDTO dto) {
        Libro libro = librosRepository.findById(id)
            .orElseThrow(() -> new LibroNotFoundException(id));
        
        // Actualizar campos
        libro.setTitulo(dto.getTitulo());
        // ... otros campos
        
        libro = librosRepository.save(libro);
        
        // Regenerar embedding si sinopsis cambió
        if (dto.getSinopsis() != null) {
            aiServiceClient.generarEmbedding(libro.getId(), libro.getSinopsis());
        }
        
        return toDTO(libro);
    }
    
    public void eliminarLibro(Long id) {
        if (!librosRepository.existsById(id)) {
            throw new LibroNotFoundException(id);
        }
        librosRepository.deleteById(id);
    }
    
    private LibroDTO toDTO(Libro libro) {
        // Transformación a DTO
    }
}
```

**LibrosController:**
```java
@RestController
@RequestMapping("/api/books")
public class LibrosController {
    private final LibrosService librosService;
    
    @GetMapping
    public ResponseEntity<List<LibroDTO>> listarLibros(
            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) Long autorId,
            @RequestParam(required = false) String genero) {
        FiltrosLibro filtros = new FiltrosLibro(titulo, autorId, genero);
        List<LibroDTO> libros = librosService.listarLibros(filtros);
        return ResponseEntity.ok(libros);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<LibroDTO> obtenerLibro(@PathVariable Long id) {
        LibroDTO libro = librosService.obtenerLibro(id);
        return ResponseEntity.ok(libro);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LibroDTO> crearLibro(@Valid @RequestBody CrearLibroDTO dto) {
        LibroDTO libro = librosService.crearLibro(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(libro);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LibroDTO> actualizarLibro(
            @PathVariable Long id,
            @Valid @RequestBody ActualizarLibroDTO dto) {
        LibroDTO libro = librosService.actualizarLibro(id, dto);
        return ResponseEntity.ok(libro);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarLibro(@PathVariable Long id) {
        librosService.eliminarLibro(id);
        return ResponseEntity.noContent().build();
    }
}
```

**Justificación:**
- **Service Layer:** Separa lógica de negocio de presentación
- **Controller:** Maneja HTTP, validación de entrada, respuestas
- **@Transactional:** Operaciones atómicas
- **@PreAuthorize:** Autorización por roles

---

### 3.2 Generador de Recomendaciones → RecommendationService

**Análisis (Conceptual):**
- Responsabilidades: Coordinar generación, decidir método (IA/heurístico), manejar fallback

**Diseño (Spring Boot):**
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
        try {
            List<Long> bookIds = aiServiceClient.calcularSimilitud(bookId);
            List<Libro> libros = librosRepository.findAllById(bookIds);
            return libros.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        } catch (Exception e) {
            // Fallback a heurísticas si IA falla
            return heuristicRecommender.recomendar(bookId);
        }
    }
}
```

**Justificación:**
- **Strategy Pattern:** Permite cambiar algoritmo en tiempo de ejecución
- **Fallback automático:** Alta disponibilidad
- **Manejo de excepciones:** Resiliencia

---

### 3.3 Analizador Semántico → AIServiceClient

**Análisis (Conceptual):**
- Responsabilidades: Generar embeddings, calcular similitud, comunicarse con IA

**Diseño (Spring Boot):**
```java
@Service
public class AIServiceClient {
    private final RestTemplate restTemplate;
    private final String aiServiceUrl;
    
    public float[] generarEmbedding(String sinopsis) {
        String url = aiServiceUrl + "/api/embeddings/generate";
        EmbeddingRequest request = new EmbeddingRequest(sinopsis);
        
        EmbeddingResponse response = restTemplate.postForObject(
            url, request, EmbeddingResponse.class);
        
        return response.getVector();
    }
    
    public List<Long> calcularSimilitud(Long bookId) {
        String url = aiServiceUrl + "/api/similarity/" + bookId;
        
        SimilarityResponse response = restTemplate.getForObject(
            url, SimilarityResponse.class, 
            RestTemplateConfig.timeout(5000));
        
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

**Justificación:**
- **RestTemplate:** Cliente HTTP para comunicación con servicio IA
- **Timeout:** 5 segundos para evitar bloqueos
- **Health check:** Verificación de disponibilidad

---

### 3.4 Calculador Heurístico → HeuristicRecommender

**Análisis (Conceptual):**
- Responsabilidades: Calcular similitud heurística, aplicar reglas, ordenar resultados

**Diseño (Spring Boot):**
```java
@Service
public class HeuristicRecommender {
    private final LibrosRepository librosRepository;
    
    public List<LibroDTO> recomendar(Long bookId) {
        Libro libroReferencia = librosRepository.findById(bookId)
            .orElseThrow(() -> new LibroNotFoundException(bookId));
        
        List<Libro> todosLosLibros = librosRepository.findAll();
        
        Map<Libro, Integer> puntuaciones = todosLosLibros.stream()
            .filter(libro -> !libro.getId().equals(bookId))
            .collect(Collectors.toMap(
                libro -> libro,
                libro -> calcularPuntuacion(libro, libroReferencia)
            ));
        
        return puntuaciones.entrySet().stream()
            .sorted(Map.Entry.<Libro, Integer>comparingByValue().reversed())
            .limit(6)
            .map(Map.Entry::getKey)
            .map(this::toDTO)
            .collect(Collectors.toList());
    }
    
    private int calcularPuntuacion(Libro libro, Libro referencia) {
        int puntuacion = 0;
        
        // Género compartido: +3 puntos
        if (libro.getGenero().equals(referencia.getGenero())) {
            puntuacion += 3;
        }
        
        // Autor común: +5 puntos
        if (libro.getAutor().getId().equals(referencia.getAutor().getId())) {
            puntuacion += 5;
        }
        
        // Tags compartidos: +2 puntos cada uno
        long tagsCompartidos = libro.getTags().stream()
            .filter(tag -> referencia.getTags().contains(tag))
            .count();
        puntuacion += (int) tagsCompartidos * 2;
        
        // Precio similar (±20%): +1 punto
        if (esPrecioSimilar(libro.getPrecio(), referencia.getPrecio())) {
            puntuacion += 1;
        }
        
        // Rating alto (≥4.0): +1 punto
        if (libro.getRating() != null && libro.getRating() >= 4.0) {
            puntuacion += 1;
        }
        
        return puntuacion;
    }
    
    private boolean esPrecioSimilar(BigDecimal precio1, BigDecimal precio2) {
        BigDecimal diferencia = precio1.subtract(precio2).abs();
        BigDecimal porcentaje = diferencia.divide(precio2, 2, RoundingMode.HALF_UP)
            .multiply(new BigDecimal(100));
        return porcentaje.compareTo(new BigDecimal(20)) <= 0;
    }
}
```

**Justificación:**
- **Algoritmo heurístico:** Reglas predefinidas para similitud
- **Puntuación:** Sistema de puntos para ordenar resultados
- **Fallback:** Disponible cuando IA no está disponible

---

## 4. Repositories: Acceso a Datos

### 4.1 LibrosRepository

**Diseño:**
```java
@Repository
public interface LibrosRepository extends JpaRepository<Libro, Long> {
    List<Libro> findByTituloContaining(String titulo);
    List<Libro> findByAutorId(Long autorId);
    List<Libro> findByGenero(String genero);
    Page<Libro> findAll(Pageable pageable);
    
    @Query("SELECT l FROM Libro l WHERE " +
           "(:titulo IS NULL OR l.titulo LIKE %:titulo%) AND " +
           "(:autorId IS NULL OR l.autor.id = :autorId) AND " +
           "(:genero IS NULL OR l.genero = :genero)")
    Page<Libro> buscarConFiltros(
        @Param("titulo") String titulo,
        @Param("autorId") Long autorId,
        @Param("genero") String genero,
        Pageable pageable);
}
```

**Justificación:**
- **Spring Data JPA:** Implementación automática
- **Consultas derivadas:** Métodos automáticos por nombre
- **@Query:** Consultas personalizadas cuando es necesario
- **Paginación:** Soporte nativo con Pageable

---

## 5. DTOs: Transferencia de Datos

### 5.1 LibroDTO

**Diseño:**
```java
public class LibroDTO {
    private Long id;
    private String titulo;
    private String autorNombre;
    private Long autorId;
    private String genero;
    private BigDecimal precio;
    private String sinopsis;
    private String isbn;
    private LocalDate fechaEdicion;
    private Integer numeroPaginas;
    private Double rating;
    private List<String> tags;
    
    // Getters y setters
    // Constructores
}
```

**Justificación:**
- **Separación de capas:** No expone entidades JPA
- **Control de datos:** Solo campos necesarios
- **Evita lazy loading:** No problemas de serialización

---

### 5.2 RecomendacionDTO

**Diseño:**
```java
public class RecomendacionDTO {
    private LibroDTO libro;
    private Double similitud;
    private String metodo; // "IA" o "HEURISTICO"
    
    // Getters y setters
    // Constructores
}
```

**Justificación:**
- **Información adicional:** Incluye similitud y método
- **Transparencia:** Usuario sabe cómo se generó la recomendación

---

## 6. Patrones de Diseño Aplicados

### 6.1 Strategy Pattern

**Aplicación:** Sistema de recomendaciones

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
```

**Justificación:**
- Facilita agregar nuevos algoritmos
- Permite cambiar estrategia sin modificar código cliente
- Fallback automático

---

### 6.2 Repository Pattern

**Aplicación:** Acceso a datos

**Implementación:**
- Interfaces Spring Data JPA
- Implementación automática
- Consultas derivadas de métodos

**Justificación:**
- Separa lógica de negocio de persistencia
- Facilita testing (mocks)
- Reduce código boilerplate

---

### 6.3 Service Layer Pattern

**Aplicación:** Lógica de negocio

**Implementación:**
- Services con `@Service`
- Controllers solo manejan HTTP
- Lógica de negocio en Services

**Justificación:**
- Separa lógica de negocio de presentación
- Facilita reutilización
- Facilita testing

---

### 6.4 DTO Pattern

**Aplicación:** Transferencia de datos

**Implementación:**
- DTOs separados de entidades
- Transformación en Services
- Control de qué datos se exponen

**Justificación:**
- Control de exposición de datos
- Evita problemas de lazy loading
- Facilita versionado de API

---

## 7. Decisiones Técnicas Específicas

### 7.1 Uso de JPA en lugar de JDBC directo

**Decisión:** Usar Spring Data JPA en lugar de JDBC directo

**Justificación:**
- Reduce código boilerplate
- Mapeo objeto-relacional automático
- Consultas derivadas de métodos
- Manejo de transacciones declarativo

**Trade-offs:**
- ✅ Ventajas: Menos código, más productividad
- ❌ Desventajas: Menos control sobre SQL generado

---

### 7.2 Lazy Loading para Relaciones

**Decisión:** Usar `FetchType.LAZY` para relaciones ManyToOne y OneToMany

**Justificación:**
- Optimización de consultas
- Evita cargar datos innecesarios
- Mejora rendimiento

**Implementación:**
```java
@ManyToOne(fetch = FetchType.LAZY)
private Autor autor;
```

---

### 7.3 Separación de DTOs y Entidades

**Decisión:** Usar DTOs separados de entidades JPA

**Justificación:**
- Control de qué datos se exponen
- Evita problemas de lazy loading en serialización
- Facilita evolución de API

---

### 7.4 Estrategia de Generación de IDs

**Decisión:** Usar `GenerationType.IDENTITY` para IDs

**Justificación:**
- Utiliza auto-increment de PostgreSQL
- Simple y eficiente
- Compatible con todas las bases de datos

**Implementación:**
```java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
```

---

## 8. Transformación Completa: Análisis → Diseño

### 8.1 Tabla de Mapeo

| Elemento Conceptual (Análisis) | Elemento de Diseño (Implementación) | Tecnología |
|-------------------------------|-------------------------------------|------------|
| **Entidad: Libro** | Clase `Libro` con `@Entity` | JPA |
| **Entidad: Autor** | Clase `Autor` con `@Entity` | JPA |
| **Entidad: Representación Semántica** | Clase `Embedding` con `@Entity` | JPA |
| **Entidad: Usuario** | Clase `Usuario` con `@Entity` | JPA |
| **Controlador: Gestor de Catálogo** | `LibrosService` + `LibrosController` | Spring Boot |
| **Controlador: Generador de Recomendaciones** | `RecommendationService` + `RecommendationController` | Spring Boot |
| **Controlador: Analizador Semántico** | `AIServiceClient` | Spring Boot (RestTemplate) |
| **Controlador: Calculador Heurístico** | `HeuristicRecommender` | Spring Boot |
| **Interfaz: Interfaz de Detalle** | `RecommendationController` (endpoint REST) | Spring MVC |
| **Interfaz: Interfaz con IA** | `AIServiceClient` (HTTP client) | RestTemplate |

---

## 9. Estructura de Paquetes

```
com.bookmate
├── entity/
│   ├── Libro.java
│   ├── Autor.java
│   ├── Embedding.java
│   └── Usuario.java
├── repository/
│   ├── LibrosRepository.java
│   ├── AutorRepository.java
│   └── EmbeddingRepository.java
├── service/
│   ├── LibrosService.java
│   ├── AutorService.java
│   ├── RecommendationService.java
│   ├── AIServiceClient.java
│   └── HeuristicRecommender.java
├── controller/
│   ├── LibrosController.java
│   ├── AutorController.java
│   └── RecommendationController.java
├── dto/
│   ├── LibroDTO.java
│   ├── AutorDTO.java
│   └── RecomendacionDTO.java
└── config/
    ├── SecurityConfig.java
    └── DatabaseConfig.java
```

---

## 10. Conclusiones

### 10.1 Transformación Exitosa

El modelo de análisis conceptual se ha transformado exitosamente en un modelo de diseño de implementación con:

- ✅ Clases JPA con anotaciones específicas
- ✅ Services y Controllers de Spring Boot
- ✅ Repositories de Spring Data JPA
- ✅ DTOs para transferencia de datos
- ✅ Patrones de diseño aplicados
- ✅ Decisiones técnicas justificadas

### 10.2 Principios Aplicados

- **Separación de responsabilidades:** Cada capa tiene su propósito
- **Inversión de dependencias:** Interfaces y abstracciones
- **DRY (Don't Repeat Yourself):** Reutilización de código
- **SOLID:** Principios aplicados en el diseño

### 10.3 Próximos Pasos

1. Implementar clases según este diseño
2. Crear diagramas de secuencia de diseño
3. Crear diagramas de componentes y despliegue
4. Realizar pruebas unitarias e integración

---

**Versión:** 1.0  
**Última actualización:** Noviembre 2025  
**Grupo 6** - Universidad Nacional de Ingeniería

