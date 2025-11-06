# Plan de Pruebas - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Noviembre 2025  
**Versión:** 1.0  

---

## 1. Introducción

### 1.1 Propósito del Plan de Pruebas

Este documento describe la estrategia, tipos, casos y criterios de pruebas para el sistema BookMate, asegurando que el software cumple con los requisitos funcionales y no funcionales especificados.

### 1.2 Alcance

El plan cubre:
- Pruebas unitarias (Java y Python)
- Pruebas de integración
- Pruebas del servicio IA
- Pruebas de API REST
- Pruebas de sistema
- Criterios de aceptación

### 1.3 Objetivo de Cobertura

**Cobertura objetivo:** >80% del código

---

## 2. Estrategia de Pruebas

### 2.1 Niveles de Pruebas

1. **Pruebas Unitarias:** Clases y métodos individuales
2. **Pruebas de Integración:** Interacción entre componentes
3. **Pruebas de Sistema:** Sistema completo end-to-end
4. **Pruebas de Rendimiento:** Tiempos de respuesta
5. **Pruebas de Seguridad:** Autenticación y autorización

### 2.2 Herramientas

| Tipo de Prueba | Herramienta | Propósito |
|----------------|-------------|-----------|
| **Unitarias Java** | JUnit 5 | Framework de pruebas |
| **Cobertura Java** | JaCoCo | Medición de cobertura |
| **Unitarias Python** | pytest | Framework de pruebas |
| **API REST** | Postman / TestRestTemplate | Pruebas de endpoints |
| **Integración** | Spring Boot Test | Pruebas de integración |
| **BD** | Testcontainers / H2 | Base de datos de prueba |

---

## 3. Pruebas Unitarias

### 3.1 Backend Spring Boot (Java)

#### 3.1.1 LibrosServiceTest

**Clase:** `LibrosServiceTest`

**Casos de prueba:**
```java
@Test
void testListarLibros_ConFiltros_RetornaListaFiltrada() {
    // Arrange
    FiltrosLibro filtros = new FiltrosLibro("IA", null, null);
    
    // Act
    List<LibroDTO> resultado = librosService.listarLibros(filtros);
    
    // Assert
    assertThat(resultado).isNotEmpty();
    assertThat(resultado).allMatch(l -> 
        l.getTitulo().contains("IA") || 
        l.getSinopsis().contains("IA"));
}

@Test
void testObtenerLibro_ConIdValido_RetornaLibro() {
    // Arrange
    Long id = 1L;
    
    // Act
    LibroDTO resultado = librosService.obtenerLibro(id);
    
    // Assert
    assertThat(resultado).isNotNull();
    assertThat(resultado.getId()).isEqualTo(id);
}

@Test
void testObtenerLibro_ConIdInvalido_LanzaExcepcion() {
    // Arrange
    Long id = 999L;
    
    // Act & Assert
    assertThrows(LibroNotFoundException.class, () -> {
        librosService.obtenerLibro(id);
    });
}

@Test
void testCrearLibro_ConDatosValidos_CreaLibro() {
    // Arrange
    CrearLibroDTO dto = new CrearLibroDTO();
    dto.setTitulo("Nuevo Libro");
    dto.setAutorId(1L);
    // ... otros campos
    
    // Act
    LibroDTO resultado = librosService.crearLibro(dto);
    
    // Assert
    assertThat(resultado).isNotNull();
    assertThat(resultado.getTitulo()).isEqualTo("Nuevo Libro");
    verify(aiServiceClient).generarEmbedding(anyLong(), anyString());
}

@Test
void testActualizarLibro_ConDatosValidos_ActualizaLibro() {
    // Arrange
    Long id = 1L;
    ActualizarLibroDTO dto = new ActualizarLibroDTO();
    dto.setTitulo("Título Actualizado");
    
    // Act
    LibroDTO resultado = librosService.actualizarLibro(id, dto);
    
    // Assert
    assertThat(resultado.getTitulo()).isEqualTo("Título Actualizado");
}

@Test
void testEliminarLibro_ConIdValido_EliminaLibro() {
    // Arrange
    Long id = 1L;
    
    // Act
    librosService.eliminarLibro(id);
    
    // Assert
    verify(librosRepository).deleteById(id);
}
```

**Cobertura objetivo:** >90%

---

#### 3.1.2 RecommendationServiceTest

**Clase:** `RecommendationServiceTest`

**Casos de prueba:**
```java
@Test
void testObtenerRecomendaciones_ConIADisponible_UsaIA() {
    // Arrange
    Long bookId = 1L;
    when(aiServiceClient.verificarDisponibilidad()).thenReturn(true);
    when(aiServiceClient.calcularSimilitud(bookId))
        .thenReturn(Arrays.asList(2L, 3L, 4L, 5L, 6L, 7L));
    
    // Act
    List<LibroDTO> resultado = recommendationService.obtenerRecomendaciones(bookId);
    
    // Assert
    assertThat(resultado).hasSize(6);
    verify(aiServiceClient).calcularSimilitud(bookId);
    verify(heuristicRecommender, never()).recomendar(bookId);
}

@Test
void testObtenerRecomendaciones_ConIANoDisponible_UsaHeuristicas() {
    // Arrange
    Long bookId = 1L;
    when(aiServiceClient.verificarDisponibilidad()).thenReturn(false);
    when(heuristicRecommender.recomendar(bookId))
        .thenReturn(Arrays.asList(/* libros */));
    
    // Act
    List<LibroDTO> resultado = recommendationService.obtenerRecomendaciones(bookId);
    
    // Assert
    assertThat(resultado).isNotEmpty();
    verify(heuristicRecommender).recomendar(bookId);
    verify(aiServiceClient, never()).calcularSimilitud(bookId);
}

@Test
void testObtenerRecomendaciones_ConIAFalla_FallbackAHeuristicas() {
    // Arrange
    Long bookId = 1L;
    when(aiServiceClient.verificarDisponibilidad()).thenReturn(true);
    when(aiServiceClient.calcularSimilitud(bookId))
        .thenThrow(new RuntimeException("IA no disponible"));
    when(heuristicRecommender.recomendar(bookId))
        .thenReturn(Arrays.asList(/* libros */));
    
    // Act
    List<LibroDTO> resultado = recommendationService.obtenerRecomendaciones(bookId);
    
    // Assert
    assertThat(resultado).isNotEmpty();
    verify(heuristicRecommender).recomendar(bookId);
}
```

**Cobertura objetivo:** >85%

---

#### 3.1.3 HeuristicRecommenderTest

**Clase:** `HeuristicRecommenderTest`

**Casos de prueba:**
```java
@Test
void testRecomendar_ConLibroReferencia_RetornaTop6() {
    // Arrange
    Long bookId = 1L;
    Libro referencia = crearLibroReferencia();
    List<Libro> todosLosLibros = crearListaLibros();
    
    // Act
    List<LibroDTO> resultado = heuristicRecommender.recomendar(bookId);
    
    // Assert
    assertThat(resultado).hasSize(6);
    assertThat(resultado).isSortedAccordingTo(
        Comparator.comparing(RecomendacionDTO::getSimilitud).reversed());
}

@Test
void testCalcularPuntuacion_ConGeneroCompartido_Suma3Puntos() {
    // Arrange
    Libro libro = crearLibro("IA", "Autor1", "Informática");
    Libro referencia = crearLibro("ML", "Autor2", "Informática");
    
    // Act
    int puntuacion = heuristicRecommender.calcularPuntuacion(libro, referencia);
    
    // Assert
    assertThat(puntuacion).isGreaterThanOrEqualTo(3);
}

@Test
void testCalcularPuntuacion_ConAutorComun_Suma5Puntos() {
    // Arrange
    Autor autor = new Autor(1L, "Autor Común");
    Libro libro = crearLibro("Libro1", autor);
    Libro referencia = crearLibro("Libro2", autor);
    
    // Act
    int puntuacion = heuristicRecommender.calcularPuntuacion(libro, referencia);
    
    // Assert
    assertThat(puntuacion).isGreaterThanOrEqualTo(5);
}
```

**Cobertura objetivo:** >85%

---

#### 3.1.4 AIServiceClientTest

**Clase:** `AIServiceClientTest`

**Casos de prueba:**
```java
@Test
void testCalcularSimilitud_ConServicioDisponible_RetornaListaIds() {
    // Arrange
    Long bookId = 1L;
    SimilarityResponse response = new SimilarityResponse();
    response.setBookIds(Arrays.asList(2L, 3L, 4L, 5L, 6L, 7L));
    when(restTemplate.getForObject(anyString(), eq(SimilarityResponse.class), eq(bookId)))
        .thenReturn(response);
    
    // Act
    List<Long> resultado = aiServiceClient.calcularSimilitud(bookId);
    
    // Assert
    assertThat(resultado).hasSize(6);
    assertThat(resultado).containsExactly(2L, 3L, 4L, 5L, 6L, 7L);
}

@Test
void testVerificarDisponibilidad_ConServicioDisponible_RetornaTrue() {
    // Arrange
    when(restTemplate.getForObject(anyString(), eq(String.class)))
        .thenReturn("OK");
    
    // Act
    boolean resultado = aiServiceClient.verificarDisponibilidad();
    
    // Assert
    assertThat(resultado).isTrue();
}

@Test
void testVerificarDisponibilidad_ConServicioNoDisponible_RetornaFalse() {
    // Arrange
    when(restTemplate.getForObject(anyString(), eq(String.class)))
        .thenThrow(new RuntimeException("Connection refused"));
    
    // Act
    boolean resultado = aiServiceClient.verificarDisponibilidad();
    
    // Assert
    assertThat(resultado).isFalse();
}

@Test
void testGenerarEmbedding_ConSinopsis_RetornaVector() {
    // Arrange
    String sinopsis = "Descripción del libro...";
    EmbeddingResponse response = new EmbeddingResponse();
    response.setVector(new float[]{0.1f, 0.2f, 0.3f, /* ... */});
    when(restTemplate.postForObject(anyString(), any(), eq(EmbeddingResponse.class)))
        .thenReturn(response);
    
    // Act
    float[] resultado = aiServiceClient.generarEmbedding(sinopsis);
    
    // Assert
    assertThat(resultado).isNotNull();
    assertThat(resultado.length).isEqualTo(384); // Dimensión del modelo
}
```

**Cobertura objetivo:** >80%

---

### 3.2 Servicio IA (Python)

#### 3.2.1 test_embeddings.py

**Archivo:** `tests/test_embeddings.py`

**Casos de prueba:**
```python
def test_generate_embedding_with_valid_text():
    """Test que genera embedding para texto válido"""
    sinopsis = "Un libro sobre inteligencia artificial y machine learning"
    embedding = generate_embedding(sinopsis)
    
    assert embedding is not None
    assert len(embedding) == 384  # Dimensión del modelo
    assert all(isinstance(x, float) for x in embedding)

def test_generate_embedding_with_empty_text():
    """Test que maneja texto vacío"""
    sinopsis = ""
    embedding = generate_embedding(sinopsis)
    
    assert embedding is not None
    assert len(embedding) == 384

def test_generate_embedding_consistency():
    """Test que embeddings son consistentes"""
    sinopsis = "Mismo texto"
    embedding1 = generate_embedding(sinopsis)
    embedding2 = generate_embedding(sinopsis)
    
    assert np.allclose(embedding1, embedding2, rtol=1e-5)
```

---

#### 3.2.2 test_similarity.py

**Archivo:** `tests/test_similarity.py`

**Casos de prueba:**
```python
def test_calculate_similarity_with_valid_book_id():
    """Test que calcula similitud para libro válido"""
    book_id = 1
    similar_books = calculate_similarity(book_id)
    
    assert similar_books is not None
    assert len(similar_books) == 6
    assert all(isinstance(book_id, int) for book_id in similar_books)

def test_calculate_similarity_returns_sorted():
    """Test que retorna libros ordenados por similitud"""
    book_id = 1
    similar_books = calculate_similarity(book_id)
    
    # Verificar que están ordenados (similitud descendente)
    similarities = [get_similarity(book_id, bid) for bid in similar_books]
    assert similarities == sorted(similarities, reverse=True)

def test_calculate_similarity_excludes_reference_book():
    """Test que excluye el libro de referencia"""
    book_id = 1
    similar_books = calculate_similarity(book_id)
    
    assert book_id not in similar_books

def test_cosine_similarity_calculation():
    """Test del cálculo de similitud de coseno"""
    vector1 = np.array([1.0, 0.0, 0.0])
    vector2 = np.array([1.0, 0.0, 0.0])
    
    similarity = cosine_similarity(vector1, vector2)
    
    assert abs(similarity - 1.0) < 1e-5  # Vectores idénticos
```

---

## 4. Pruebas de Integración

### 4.1 Pruebas de API REST

#### 4.1.1 LibrosControllerIntegrationTest

**Clase:** `LibrosControllerIntegrationTest`

**Casos de prueba:**
```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class LibrosControllerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    void testListarLibros_Retorna200() throws Exception {
        mockMvc.perform(get("/api/books"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$[0].titulo").exists());
    }
    
    @Test
    void testObtenerLibro_ConIdValido_Retorna200() throws Exception {
        mockMvc.perform(get("/api/books/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.titulo").exists());
    }
    
    @Test
    void testObtenerLibro_ConIdInvalido_Retorna404() throws Exception {
        mockMvc.perform(get("/api/books/999"))
            .andExpect(status().isNotFound());
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void testCrearLibro_ComoAdmin_Retorna201() throws Exception {
        CrearLibroDTO dto = new CrearLibroDTO();
        dto.setTitulo("Nuevo Libro");
        // ... otros campos
        
        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.titulo").value("Nuevo Libro"));
    }
    
    @Test
    @WithMockUser(roles = "USER")
    void testCrearLibro_ComoUsuario_Retorna403() throws Exception {
        CrearLibroDTO dto = new CrearLibroDTO();
        // ...
        
        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isForbidden());
    }
}
```

---

#### 4.1.2 RecommendationControllerIntegrationTest

**Clase:** `RecommendationControllerIntegrationTest`

**Casos de prueba:**
```java
@Test
void testObtenerRecomendaciones_ConIADisponible_Retorna200() throws Exception {
    // Mock servicio IA disponible
    when(aiServiceClient.verificarDisponibilidad()).thenReturn(true);
    
    mockMvc.perform(get("/api/recommendations/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$").value(hasSize(lessThanOrEqualTo(6))));
}

@Test
void testObtenerRecomendaciones_ConIANoDisponible_Retorna200() throws Exception {
    // Mock servicio IA no disponible
    when(aiServiceClient.verificarDisponibilidad()).thenReturn(false);
    
    mockMvc.perform(get("/api/recommendations/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray());
}
```

---

### 4.2 Pruebas de Integración con Base de Datos

#### 4.2.1 LibrosRepositoryIntegrationTest

**Clase:** `LibrosRepositoryIntegrationTest`

**Casos de prueba:**
```java
@DataJpaTest
class LibrosRepositoryIntegrationTest {
    
    @Autowired
    private LibrosRepository librosRepository;
    
    @Test
    void testFindByTituloContaining_ConTexto_RetornaLibros() {
        // Arrange
        Libro libro = new Libro();
        libro.setTitulo("Inteligencia Artificial");
        librosRepository.save(libro);
        
        // Act
        List<Libro> resultado = librosRepository.findByTituloContaining("IA");
        
        // Assert
        assertThat(resultado).isNotEmpty();
    }
    
    @Test
    void testFindByAutorId_ConIdValido_RetornaLibros() {
        // Arrange
        Autor autor = new Autor();
        autor.setNombre("Autor Test");
        autorRepository.save(autor);
        
        Libro libro = new Libro();
        libro.setAutor(autor);
        librosRepository.save(libro);
        
        // Act
        List<Libro> resultado = librosRepository.findByAutorId(autor.getId());
        
        // Assert
        assertThat(resultado).isNotEmpty();
    }
}
```

---

### 4.3 Pruebas de Integración con Servicio IA

#### 4.3.1 AIServiceIntegrationTest

**Clase:** `AIServiceIntegrationTest`

**Casos de prueba:**
```java
@SpringBootTest
class AIServiceIntegrationTest {
    
    @Autowired
    private AIServiceClient aiServiceClient;
    
    @Test
    @Disabled("Requiere servicio IA ejecutándose")
    void testCalcularSimilitud_ConServicioReal_RetornaLista() {
        // Arrange
        Long bookId = 1L;
        
        // Act
        List<Long> resultado = aiServiceClient.calcularSimilitud(bookId);
        
        // Assert
        assertThat(resultado).isNotNull();
        assertThat(resultado).hasSize(6);
    }
    
    @Test
    @Disabled("Requiere servicio IA ejecutándose")
    void testGenerarEmbedding_ConSinopsis_RetornaVector() {
        // Arrange
        String sinopsis = "Un libro sobre inteligencia artificial";
        
        // Act
        float[] resultado = aiServiceClient.generarEmbedding(sinopsis);
        
        // Assert
        assertThat(resultado).isNotNull();
        assertThat(resultado.length).isEqualTo(384);
    }
}
```

---

## 5. Pruebas del Servicio IA (Python)

### 5.1 Pruebas Unitarias

**Archivo:** `tests/test_ai_service.py`

**Casos de prueba:**
```python
def test_health_check_endpoint():
    """Test del endpoint de health check"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_generate_embedding_endpoint():
    """Test del endpoint de generación de embeddings"""
    data = {"sinopsis": "Descripción del libro"}
    response = client.post("/api/embeddings/generate", json=data)
    
    assert response.status_code == 200
    assert "vector" in response.json()
    assert len(response.json()["vector"]) == 384

def test_calculate_similarity_endpoint():
    """Test del endpoint de cálculo de similitud"""
    book_id = 1
    response = client.get(f"/api/similarity/{book_id}")
    
    assert response.status_code == 200
    assert "bookIds" in response.json()
    assert len(response.json()["bookIds"]) == 6

def test_calculate_similarity_with_invalid_book_id():
    """Test con ID de libro inválido"""
    book_id = 999
    response = client.get(f"/api/similarity/{book_id}")
    
    assert response.status_code == 404
```

---

## 6. Pruebas de Rendimiento

### 6.1 Pruebas de Tiempo de Respuesta

**Objetivo:** Verificar que los tiempos de respuesta cumplen con los requisitos

**Casos de prueba:**

| Endpoint | Requisito | Prueba |
|----------|-----------|--------|
| `GET /api/books` | <1s (p95) | 100 peticiones, medir p95 |
| `GET /api/recommendations/{id}` (IA) | <3s (p95) | 50 peticiones, medir p95 |
| `GET /api/recommendations/{id}` (Heurístico) | <1s (p95) | 100 peticiones, medir p95 |
| `POST /api/books` | <500ms (p95) | 50 peticiones, medir p95 |

**Herramienta:** Apache JMeter o Postman Collection Runner

---

## 7. Pruebas de Seguridad

### 7.1 Autenticación

**Casos de prueba:**
- Login con credenciales válidas → 200 OK
- Login con credenciales inválidas → 401 Unauthorized
- Acceso a endpoint protegido sin token → 401 Unauthorized
- Acceso a endpoint protegido con token válido → 200 OK
- Acceso a endpoint protegido con token expirado → 401 Unauthorized

### 7.2 Autorización

**Casos de prueba:**
- Usuario estándar intenta crear libro → 403 Forbidden
- Administrador crea libro → 201 Created
- Usuario estándar accede a `/api/admin/**` → 403 Forbidden

---

## 8. Criterios de Aceptación por Caso de Uso

### 8.1 UC-01: Buscar Libros

**Criterios:**
- [ ] Búsqueda por título retorna resultados relevantes
- [ ] Búsqueda por autor retorna libros del autor
- [ ] Búsqueda por género retorna libros del género
- [ ] Tiempo de respuesta <1 segundo
- [ ] Resultados ordenados por relevancia

---

### 8.2 UC-05: Obtener Recomendaciones con IA

**Criterios:**
- [ ] Recomendaciones generadas con IA cuando disponible
- [ ] Fallback a heurísticas cuando IA no disponible
- [ ] Tiempo de respuesta <3 segundos (IA) o <1 segundo (heurísticas)
- [ ] Precisión >70% (similitud semántica)
- [ ] Retorna exactamente 6 libros recomendados
- [ ] No incluye el libro de referencia en recomendaciones

---

### 8.3 UC-09: Gestionar Libros (CRUD)

**Criterios:**
- [ ] Crear libro funciona correctamente
- [ ] Leer libro retorna datos correctos
- [ ] Actualizar libro modifica datos correctamente
- [ ] Eliminar libro elimina correctamente
- [ ] Solo administradores pueden CRUD
- [ ] Validaciones de datos funcionan

---

## 9. Matriz de Cobertura de Pruebas

| Componente | Pruebas Unitarias | Pruebas Integración | Cobertura Objetivo |
|------------|-------------------|---------------------|-------------------|
| **LibrosService** | ✅ | ✅ | >90% |
| **AutorService** | ✅ | ✅ | >85% |
| **RecommendationService** | ✅ | ✅ | >85% |
| **AIServiceClient** | ✅ | ✅ | >80% |
| **HeuristicRecommender** | ✅ | ✅ | >85% |
| **LibrosController** | ✅ | ✅ | >80% |
| **RecommendationController** | ✅ | ✅ | >80% |
| **Servicio IA (Python)** | ✅ | ✅ | >80% |
| **Total** | ✅ | ✅ | **>80%** |

---

## 10. Ejecución de Pruebas

### 10.1 Pruebas Unitarias Java

```bash
# Ejecutar todas las pruebas unitarias
./mvnw test

# Ejecutar pruebas de un paquete específico
./mvnw test -Dtest=LibrosServiceTest

# Generar reporte de cobertura
./mvnw test jacoco:report
```

---

### 10.2 Pruebas Unitarias Python

```bash
# Ejecutar todas las pruebas
pytest tests/

# Ejecutar con cobertura
pytest tests/ --cov=ai_service --cov-report=html

# Ejecutar pruebas específicas
pytest tests/test_embeddings.py
```

---

### 10.3 Pruebas de Integración

```bash
# Ejecutar pruebas de integración
./mvnw test -Dtest=*IntegrationTest

# Ejecutar con Docker Compose (servicios reales)
docker-compose up -d
./mvnw test -Dtest=*IntegrationTest
docker-compose down
```

---

## 11. Reportes de Pruebas

### 11.1 Reporte de Cobertura

**Herramienta:** JaCoCo (Java) + pytest-cov (Python)

**Métricas:**
- Cobertura de líneas: >80%
- Cobertura de ramas: >75%
- Cobertura de métodos: >85%

**Ubicación de reportes:**
- Java: `target/site/jacoco/index.html`
- Python: `htmlcov/index.html`

---

## 12. Conclusiones

Este plan de pruebas asegura que el sistema BookMate cumple con los requisitos funcionales y no funcionales, con especial énfasis en:

- ✅ Sistema de recomendaciones con IA
- ✅ Fallback automático a heurísticas
- ✅ Rendimiento (<3s para IA, <1s para heurísticas)
- ✅ Seguridad (autenticación y autorización)
- ✅ Cobertura >80%

---

**Versión:** 1.0  
**Última actualización:** Noviembre 2025  
**Grupo 6** - Universidad Nacional de Ingeniería

