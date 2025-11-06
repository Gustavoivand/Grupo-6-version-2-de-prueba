# Tarjetas CRC - BookMate

**Proyecto:** BookMate - Sistema de Recomendación de Libros Académicos  
**Grupo:** 6  
**Curso:** CC341 - Ingeniería de Software  
**Universidad:** Universidad Nacional de Ingeniería (UNI)  
**Fecha:** Octubre 2025  
**Versión:** 1.0  

---

## Introducción

Las tarjetas CRC (Class-Responsibility-Collaboration) son una técnica de diseño orientado a objetos que documenta:
- **Class (Clase):** Nombre de la clase conceptual
- **Responsibilities (Responsabilidades):** Qué hace la clase
- **Collaborators (Colaboradores):** Con quiénes interactúa

**Nota:** Estas tarjetas corresponden a la **fase de análisis**, por lo que representan clases **conceptuales**, no clases de implementación.

---

## ENTIDADES DEL DOMINIO

### CRC-01: Libro

| **Clase:** Libro |
|------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Mantener información completa del libro | • Autor |
| • Proveer título, género, sinopsis | • RepresentaciónSemántica |
| • Proveer precio y metadatos | |
| • Identificarse únicamente (ID, ISBN) | |
| • Asociarse con un autor | |
| • Tener representación semántica (opcional) | |

---

### CRC-02: Autor

| **Clase:** Autor |
|------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Mantener información del autor | • Libro |
| • Proveer nombre completo | |
| • Proveer biografía y datos adicionales | |
| • Identificarse únicamente | |
| • Asociarse con múltiples libros | |

---

### CRC-03: RepresentaciónSemántica

| **Clase:** RepresentaciónSemántica |
|------------------------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Almacenar vector numérico (embeddings) | • Libro |
| • Representar significado semántico del contenido | • AnalizadorSemántico |
| • Proveer datos para cálculo de similitud | |
| • Mantener fecha de generación | |
| • Indicar método de generación | |

---

### CRC-04: Recomendación

| **Clase:** Recomendación |
|--------------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Representar un libro recomendado | • Libro |
| • Mantener puntuación de similitud | • GeneradorDeRecomendaciones |
| • Indicar método usado (IA o heurístico) | |
| • Proveer fecha de generación | |
| • Permitir ordenamiento por puntuación | |

---

### CRC-05: ResultadoDeBúsqueda

| **Clase:** ResultadoDeBúsqueda |
|--------------------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Mantener lista de libros encontrados | • Libro |
| • Mantener consulta original | • GestorDeBúsqueda |
| • Calcular y mantener relevancia por libro | |
| • Proveer estadísticas (total de resultados) | |
| • Ordenar libros por relevancia | |

---

### CRC-06: Usuario

| **Clase:** Usuario |
|--------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Mantener información del usuario | • ResultadoDeBúsqueda |
| • Identificarse (ID, correo) | • Recomendación |
| • Determinar rol (Usuario o Administrador) | |
| • Autorizar operaciones según rol | |
| • Mantener historial de búsquedas (opcional) | |

---

## CONTROLADORES (LÓGICA DE NEGOCIO)

### CRC-07: GestorDeCatálogo

| **Clase:** GestorDeCatálogo |
|-----------------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Coordinar creación de libros | • Libro |
| • Coordinar actualización de libros | • Autor |
| • Coordinar eliminación de libros | • ValidadorDeDatos |
| • Coordinar operaciones CRUD de autores | • AnalizadorSemántico |
| • Notificar generación de representaciones | • InterfazDeAdministración |
| • Validar datos antes de persistir | |

---

### CRC-08: GestorDeBúsqueda

| **Clase:** GestorDeBúsqueda |
|------------------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Recibir consultas de búsqueda | • Libro |
| • Buscar en múltiples campos (título, autor, género) | • Autor |
| • Aplicar filtros adicionales (precio, etc.) | • ResultadoDeBúsqueda |
| • Calcular relevancia de resultados | • InterfazDeBúsqueda |
| • Ordenar resultados por relevancia | |
| • Generar ResultadoDeBúsqueda | |
| • Sugerir libros populares si no hay resultados | |

---

### CRC-09: GeneradorDeRecomendaciones

| **Clase:** GeneradorDeRecomendaciones |
|---------------------------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Coordinar generación de recomendaciones | • Libro |
| • Determinar método a usar (IA o heurístico) | • AnalizadorSemántico |
| • Verificar disponibilidad de componente IA | • CalculadorHeurístico |
| • Activar método apropiado | • Recomendación |
| • Recuperar detalles de libros recomendados | • InterfazDeDetalle |
| • Generar conjunto de Recomendaciones | |
| • Manejar fallback transparente | |

---

### CRC-10: AnalizadorSemántico

| **Clase:** AnalizadorSemántico |
|--------------------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Recibir contenido textual (sinopsis) | • Libro |
| • Generar representación vectorial | • RepresentaciónSemántica |
| • Almacenar RepresentaciónSemántica | • InterfazConIA |
| • Calcular similitud entre representaciones | • GeneradorDeRecomendaciones |
| • Retornar libros más similares (top N) | |
| • Comunicarse con componente externo de IA | |
| • Manejar timeouts y errores de IA | |

---

### CRC-11: CalculadorHeurístico

| **Clase:** CalculadorHeurístico |
|---------------------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Calcular similitud basada en reglas | • Libro |
| • Aplicar puntuaciones por género compartido | • GeneradorDeRecomendaciones |
| • Aplicar puntuaciones por autor común | |
| • Aplicar puntuaciones por tags compartidos | |
| • Aplicar puntuaciones por precio similar | |
| • Aplicar puntuaciones por rating alto | |
| • Ordenar por puntuación total | |
| • Retornar top N libros | |

---

### CRC-12: ValidadorDeDatos

| **Clase:** ValidadorDeDatos |
|-----------------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Validar campos obligatorios | • Libro |
| • Verificar formatos correctos | • Autor |
| • Verificar rangos válidos (precio > 0, etc.) | • GestorDeCatálogo |
| • Verificar unicidad (ISBN) | |
| • Verificar existencia de relaciones (autor) | |
| • Generar mensajes de error descriptivos | |

---

## INTERFACES (FRONTERAS)

### CRC-13: InterfazDeCatálogo

| **Clase:** InterfazDeCatálogo |
|-------------------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Mostrar lista de libros disponibles | • Usuario |
| • Capturar selección de libro | • Libro |
| • Proporcionar navegación entre libros | • GestorDeBúsqueda |
| • Mostrar información resumida de libros | |
| • Redirigir a vista de detalle | |

---

### CRC-14: InterfazDeBúsqueda

| **Clase:** InterfazDeBúsqueda |
|-------------------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Capturar consulta de búsqueda | • Usuario |
| • Capturar filtros adicionales | • GestorDeBúsqueda |
| • Mostrar resultados de búsqueda | • ResultadoDeBúsqueda |
| • Permitir refinamiento de búsqueda | • Libro |
| • Mostrar sugerencias si no hay resultados | |

---

### CRC-15: InterfazDeDetalle

| **Clase:** InterfazDeDetalle |
|------------------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Mostrar información completa de un libro | • Usuario |
| • Mostrar información del autor | • Libro |
| • Capturar solicitud de recomendaciones | • Autor |
| • Mostrar recomendaciones generadas | • GeneradorDeRecomendaciones |
| • Mostrar puntuaciones de similitud | • Recomendación |

---

### CRC-16: InterfazDeAdministración

| **Clase:** InterfazDeAdministración |
|-------------------------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Mostrar formularios de creación/edición | • Usuario (Admin) |
| • Capturar datos de libros y autores | • GestorDeCatálogo |
| • Mostrar confirmaciones y errores | • Libro |
| • Proporcionar tabla de gestión CRUD | • Autor |
| • Solicitar confirmación para eliminaciones | • ValidadorDeDatos |

---

### CRC-17: InterfazConIA

| **Clase:** InterfazConIA |
|--------------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Enviar solicitudes al componente externo | • AnalizadorSemántico |
| • Formatear datos para envío | • SistemaDeIA (externo) |
| • Recibir respuestas del componente externo | |
| • Manejar timeouts | |
| • Transformar respuestas a formato interno | |

---

## CLASES AUXILIARES

### CRC-18: Catálogo

| **Clase:** Catálogo |
|---------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Mantener colección de todos los libros | • Libro |
| • Proveer acceso a libros por criterios | • GestorDeBúsqueda |
| • Proveer estadísticas del catálogo | • GestorDeCatálogo |
| • Agregar/eliminar libros | |

---

### CRC-19: ConjuntoDeRecomendaciones

| **Clase:** ConjuntoDeRecomendaciones |
|--------------------------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Mantener lista de recomendaciones | • Recomendación |
| • Ordenar por puntuación | • GeneradorDeRecomendaciones |
| • Limitar a N elementos (ej: 6) | |
| • Indicar método usado (IA/heurístico) | |
| • Proveer tiempo de generación | |

---

### CRC-20: Puntuación

| **Clase:** Puntuación |
|-----------------------|
| **Responsabilidades:** | **Colaboradores:** |
| • Representar valor de similitud (0.0 a 1.0) | • Recomendación |
| • Permitir comparación entre puntuaciones | • CalculadorHeurístico |
| • Convertir entre escalas (ej: 0-100) | • AnalizadorSemántico |

---

## Matriz de Colaboraciones

| Clase | Colaboradores Principales | Número de Colaboraciones |
|-------|---------------------------|--------------------------|
| GeneradorDeRecomendaciones | 5 (Libro, AnalizadorSemántico, CalculadorHeurístico, Recomendación, InterfazDeDetalle) | 5 |
| GestorDeCatálogo | 5 (Libro, Autor, ValidadorDeDatos, AnalizadorSemántico, InterfazDeAdministración) | 5 |
| GestorDeBúsqueda | 4 (Libro, Autor, ResultadoDeBúsqueda, InterfazDeBúsqueda) | 4 |
| AnalizadorSemántico | 4 (Libro, RepresentaciónSemántica, InterfazConIA, GeneradorDeRecomendaciones) | 4 |
| Libro | 2 (Autor, RepresentaciónSemántica) | 2 |
| InterfazDeDetalle | 5 (Usuario, Libro, Autor, GeneradorDeRecomendaciones, Recomendación) | 5 |

**Observación:** Las clases con más colaboraciones son típicamente controladores, lo cual es esperado ya que coordinan múltiples entidades.

---

## Tarjetas CRC Críticas

Las siguientes tarjetas son las más importantes para el sistema:

### Prioridad MUY ALTA:
- **CRC-09: GeneradorDeRecomendaciones** - Define el valor principal del producto
- **CRC-10: AnalizadorSemántico** - Core del sistema de recomendaciones con IA
- **CRC-01: Libro** - Entidad principal del dominio

### Prioridad ALTA:
- **CRC-07: GestorDeCatálogo** - Gestión CRUD completa
- **CRC-08: GestorDeBúsqueda** - Búsqueda es funcionalidad core
- **CRC-11: CalculadorHeurístico** - Fallback crítico del sistema

---

## Evolución hacia Diseño

En la fase de diseño (Semana 15), estas tarjetas CRC conceptuales evolucionarán a:

1. **Clases de diseño con:**
   - Métodos específicos con firmas
   - Atributos con tipos de datos
   - Visibilidad (public/private/protected)
   - Relaciones de herencia e interfaces

2. **Clases de implementación con:**
   - Código fuente en lenguaje específico
   - Manejo de excepciones
   - Algoritmos concretos
   - Tecnologías específicas

---

## Conclusiones

Se han identificado **20 tarjetas CRC** que cubren:
- ✅ **6 Entidades** del dominio
- ✅ **6 Controladores** de lógica de negocio
- ✅ **5 Interfaces** de frontera
- ✅ **3 Clases auxiliares**

Estas tarjetas proporcionan una base sólida para el diseño detallado y la implementación posterior.

---

**Versión:** 1.0  
**Última actualización:** Octubre 2025  
**Grupo 6** - Universidad Nacional de Ingeniería

