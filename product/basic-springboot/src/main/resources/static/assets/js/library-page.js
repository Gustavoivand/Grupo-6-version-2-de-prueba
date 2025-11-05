/* ============================================================================
   BOOKMATE - PÁGINA DE BIBLIOTECA PERSONAL
   Manejo de UI específico para library.html
   ============================================================================ */

// Variables globales
let selectedBooksForRecommendation = new Set();

/**
 * Inicializar página de biblioteca
 */
document.addEventListener('DOMContentLoaded', async function() {
    // Verificar autenticación
    if (!authManager.isLoggedIn()) {
        showNotLoggedIn();
        return;
    }

    // Cargar biblioteca
    await loadLibrary();
    
    // Actualizar botón de recomendaciones
    updateRecommendationButton();
});

/**
 * Mostrar mensaje de no autenticado
 */
function showNotLoggedIn() {
    document.getElementById('libraryLoading').style.display = 'none';
    document.getElementById('notLoggedIn').style.display = 'block';
    document.getElementById('libraryStats').style.display = 'none';
    document.getElementById('statusTabs').style.display = 'none';
}

/**
 * Cargar y renderizar biblioteca
 */
async function loadLibrary() {
    try {
        const stats = libraryManager.getStats();
        const library = libraryManager.getUserLibrary();
        const allBooks = await window.BookMate.loadBooks();

        // Ocultar loading
        document.getElementById('libraryLoading').style.display = 'none';

        // Si la biblioteca está vacía
        if (library.length === 0) {
            document.getElementById('emptyLibrary').style.display = 'block';
            document.getElementById('libraryStats').style.display = 'none';
            document.getElementById('statusTabs').style.display = 'none';
            document.getElementById('recommendationControls').style.display = 'none';
            return;
        }

        // Mostrar estadísticas
        updateStats(stats);

        // Renderizar libros por categoría
        renderBooks(library, allBooks);

    } catch (error) {
        console.error('Error al cargar biblioteca:', error);
        showError();
    }
}

/**
 * Actualizar estadísticas
 */
function updateStats(stats) {
    document.getElementById('totalBooks').textContent = stats.total;
    document.getElementById('toReadBooks').textContent = stats.toRead;
    document.getElementById('readingBooks').textContent = stats.reading;
    document.getElementById('readBooks').textContent = stats.read;
}

/**
 * Renderizar libros en las grids
 */
function renderBooks(library, allBooks) {
    // Contenedores
    const allBooksGrid = document.getElementById('allBooksGrid');
    const toReadBooksGrid = document.getElementById('toReadBooksGrid');
    const readingBooksGrid = document.getElementById('readingBooksGrid');
    const readBooksGrid = document.getElementById('readBooksGrid');

    // Limpiar grids
    allBooksGrid.innerHTML = '';
    toReadBooksGrid.innerHTML = '';
    readingBooksGrid.innerHTML = '';
    readBooksGrid.innerHTML = '';

    // Mapear libros de biblioteca con datos completos
    const booksWithData = library.map(item => {
        const book = allBooks.find(b => b.id === item.bookId);
        return {
            ...book,
            libraryStatus: item.status,
            addedAt: item.addedAt
        };
    }).filter(book => book.id); // Filtrar libros que no se encontraron

    // Renderizar todos los libros
    booksWithData.forEach(book => {
        const card = createLibraryBookCard(book);
        allBooksGrid.appendChild(card);

        // Agregar a grid según estado
        const cardClone = createLibraryBookCard(book);
        if (book.libraryStatus === 'to-read') {
            toReadBooksGrid.appendChild(cardClone);
        } else if (book.libraryStatus === 'reading') {
            readingBooksGrid.appendChild(cardClone);
        } else if (book.libraryStatus === 'read') {
            readBooksGrid.appendChild(cardClone);
        }
    });

    // Mostrar mensaje si alguna categoría está vacía
    if (toReadBooksGrid.children.length === 0) {
        toReadBooksGrid.innerHTML = '<div class="col-12 text-center py-4"><p class="text-muted">No tienes libros marcados como "Por Leer"</p></div>';
    }
    if (readingBooksGrid.children.length === 0) {
        readingBooksGrid.innerHTML = '<div class="col-12 text-center py-4"><p class="text-muted">No tienes libros en "Leyendo"</p></div>';
    }
    if (readBooksGrid.children.length === 0) {
        readBooksGrid.innerHTML = '<div class="col-12 text-center py-4"><p class="text-muted">No tienes libros "Leídos"</p></div>';
    }
}

/**
 * Crear card de libro para biblioteca
 */
function createLibraryBookCard(book) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-lg-3';

    const statusNames = {
        'to-read': 'Por Leer',
        'reading': 'Leyendo',
        'read': 'Leído'
    };

    const statusIcons = {
        'to-read': 'bookmark',
        'reading': 'book-reader',
        'read': 'check-circle'
    };

    const statusColors = {
        'to-read': 'warning',
        'reading': 'info',
        'read': 'success'
    };

    const isSelected = selectedBooksForRecommendation.has(book.id);

    col.innerHTML = `
        <div class="card h-100 shadow-sm ${isSelected ? 'border-primary border-2' : ''}">
            <div class="card-body">
                <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" id="book-checkbox-${book.id}" 
                           ${isSelected ? 'checked' : ''} 
                           onchange="toggleBookSelection(${book.id})">
                    <label class="form-check-label small text-primary" for="book-checkbox-${book.id}">
                        <i class="fas fa-magic"></i> Usar para recomendaciones
                    </label>
                </div>
                <div class="book-cover mb-3 text-center">
                    ${book.title}
                </div>
                <h6 class="card-title">
                    <a href="details.html?id=${book.id}" class="text-decoration-none">${book.title}</a>
                </h6>
                <p class="text-muted small mb-2">
                    <i class="fas fa-user"></i> ${book.author}
                </p>
                <div class="mb-2">
                    ${window.BookMate.generateStars(book.rating)}
                    <span class="small text-muted">${book.rating.toFixed(1)}</span>
                </div>
                <div class="badge bg-${statusColors[book.libraryStatus]} mb-3">
                    <i class="fas fa-${statusIcons[book.libraryStatus]}"></i> ${statusNames[book.libraryStatus]}
                </div>
                <div class="btn-group w-100" role="group">
                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i class="fas fa-edit"></i> Cambiar
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item ${book.libraryStatus === 'to-read' ? 'active' : ''}" href="#" onclick="updateStatusAndReload(${book.id}, 'to-read'); return false;">
                            <i class="fas fa-bookmark"></i> Por Leer
                        </a></li>
                        <li><a class="dropdown-item ${book.libraryStatus === 'reading' ? 'active' : ''}" href="#" onclick="updateStatusAndReload(${book.id}, 'reading'); return false;">
                            <i class="fas fa-book-reader"></i> Leyendo
                        </a></li>
                        <li><a class="dropdown-item ${book.libraryStatus === 'read' ? 'active' : ''}" href="#" onclick="updateStatusAndReload(${book.id}, 'read'); return false;">
                            <i class="fas fa-check-circle"></i> Leído
                        </a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#" onclick="removeAndReload(${book.id}); return false;">
                            <i class="fas fa-trash"></i> Eliminar
                        </a></li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    return col;
}

/**
 * Toggle selección de libro para recomendaciones
 */
function toggleBookSelection(bookId) {
    if (selectedBooksForRecommendation.has(bookId)) {
        selectedBooksForRecommendation.delete(bookId);
    } else {
        selectedBooksForRecommendation.add(bookId);
    }
    
    // Actualizar botón de recomendaciones
    updateRecommendationButton();
    
    // Re-renderizar para mostrar borde
    const library = libraryManager.getUserLibrary();
    const allBooks = window.booksCache || [];
    if (allBooks.length > 0) {
        renderBooks(library, allBooks);
    }
}

/**
 * Actualizar estado del botón de recomendaciones
 */
function updateRecommendationButton() {
    const button = document.getElementById('getRecommendationsBtn');
    const count = document.getElementById('selectedBooksCount');
    
    if (button) {
        if (selectedBooksForRecommendation.size > 0) {
            button.disabled = false;
            button.classList.remove('btn-secondary');
            button.classList.add('btn-success');
        } else {
            button.disabled = true;
            button.classList.remove('btn-success');
            button.classList.add('btn-secondary');
        }
    }
    
    if (count) {
        count.textContent = selectedBooksForRecommendation.size;
    }
}

/**
 * Obtener recomendaciones basadas en libros seleccionados
 */
async function getRecommendations() {
    if (selectedBooksForRecommendation.size === 0) {
        showAlert('Por favor selecciona al menos un libro', 'warning');
        return;
    }

    const recommendationsContainer = document.getElementById('recommendationsSection');
    const recommendationsGrid = document.getElementById('recommendationsGrid');
    
    // Mostrar loading
    recommendationsContainer.style.display = 'block';
    recommendationsGrid.innerHTML = `
        <div class="col-12 text-center py-4">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-3"><i class="fas fa-brain"></i> Analizando tus preferencias y buscando recomendaciones...</p>
        </div>
    `;

    // Scroll suave a recomendaciones
    setTimeout(() => {
        recommendationsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);

    try {
        // Obtener libros seleccionados
        const allBooks = await window.BookMate.loadBooks();
        const selectedBooks = allBooks.filter(book => 
            selectedBooksForRecommendation.has(book.id)
        );

        // Obtener IDs de libros en biblioteca para excluirlos
        const libraryBookIds = libraryManager.getUserLibrary().map(item => item.bookId);

        // Calcular recomendaciones
        const recommendations = calculateRecommendations(selectedBooks, allBooks, libraryBookIds);

        // Simular delay de "procesamiento IA"
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Renderizar recomendaciones
        if (recommendations.length === 0) {
            recommendationsGrid.innerHTML = `
                <div class="col-12 text-center py-4">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h5>No se encontraron recomendaciones</h5>
                    <p class="text-muted">Intenta seleccionar otros libros o agrega más libros al catálogo.</p>
                </div>
            `;
        } else {
            recommendationsGrid.innerHTML = '';
            recommendations.slice(0, 3).forEach(rec => {
                const bookCard = createRecommendationCard(rec.book, rec.score, rec.reasons);
                recommendationsGrid.appendChild(bookCard);
            });
        }

    } catch (error) {
        console.error('Error al obtener recomendaciones:', error);
        recommendationsGrid.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle"></i>
                    Error al obtener recomendaciones. Por favor, intenta nuevamente.
                </div>
            </div>
        `;
    }
}

/**
 * Calcular recomendaciones usando algoritmo heurístico
 */
function calculateRecommendations(selectedBooks, allBooks, excludeIds) {
    const recommendations = [];

    // Analizar libros seleccionados
    const selectedAuthors = new Set(selectedBooks.map(b => b.author));
    const selectedGenres = new Set(selectedBooks.map(b => b.genre));
    const selectedTags = new Set();
    
    selectedBooks.forEach(book => {
        if (Array.isArray(book.tags)) {
            book.tags.forEach(tag => selectedTags.add(tag.toLowerCase()));
        }
    });

    // Evaluar cada libro del catálogo
    allBooks.forEach(book => {
        // Excluir libros ya en biblioteca y seleccionados
        if (excludeIds.includes(book.id) || selectedBooksForRecommendation.has(book.id)) {
            return;
        }

        let score = 0;
        const reasons = [];

        // Mismo autor (+30 puntos)
        if (selectedAuthors.has(book.author)) {
            score += 30;
            reasons.push(`Mismo autor: ${book.author}`);
        }

        // Mismo género (+20 puntos)
        if (selectedGenres.has(book.genre)) {
            score += 20;
            reasons.push(`Género: ${book.genre}`);
        }

        // Tags similares (+10 puntos por tag, máximo 40)
        if (Array.isArray(book.tags)) {
            const matchingTags = book.tags.filter(tag => 
                selectedTags.has(tag.toLowerCase())
            );
            
            if (matchingTags.length > 0) {
                const tagScore = Math.min(matchingTags.length * 10, 40);
                score += tagScore;
                reasons.push(`Tags similares: ${matchingTags.join(', ')}`);
            }
        }

        // Bonus por rating alto (+10 si rating >= 4.5)
        if (book.rating >= 4.5) {
            score += 10;
            reasons.push(`Alta calificación: ${book.rating.toFixed(1)} ⭐`);
        }

        // Si tiene algún puntaje, agregarlo
        if (score > 0) {
            recommendations.push({
                book: book,
                score: score,
                reasons: reasons
            });
        }
    });

    // Ordenar por score descendente
    recommendations.sort((a, b) => b.score - a.score);

    return recommendations;
}

/**
 * Crear card de recomendación
 */
function createRecommendationCard(book, score, reasons) {
    const col = document.createElement('div');
    col.className = 'col-md-4';

    col.innerHTML = `
        <div class="card h-100 shadow border-success border-2">
            <div class="card-header bg-success text-white">
                <small><i class="fas fa-star"></i> Match: ${score} puntos</small>
            </div>
            <div class="card-body">
                <div class="book-cover mb-3 text-center">
                    ${book.title}
                </div>
                <h6 class="card-title">
                    <a href="details.html?id=${book.id}" class="text-decoration-none">${book.title}</a>
                </h6>
                <p class="text-muted small mb-2">
                    <i class="fas fa-user"></i> ${book.author}
                </p>
                <div class="mb-2">
                    ${window.BookMate.generateStars(book.rating)}
                    <span class="small text-muted">${book.rating.toFixed(1)}</span>
                </div>
                <div class="mb-3">
                    <span class="badge bg-secondary">${book.genre}</span>
                </div>
                
                <div class="alert alert-light py-2 px-2 small mb-2">
                    <strong><i class="fas fa-lightbulb text-warning"></i> Por qué lo recomendamos:</strong>
                    <ul class="mb-0 ps-3 mt-1">
                        ${reasons.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                </div>
                
                <button class="btn btn-primary btn-sm w-100" onclick="addToLibraryAction(${book.id})">
                    <i class="fas fa-plus"></i> Agregar a Mi Biblioteca
                </button>
            </div>
        </div>
    `;

    return col;
}

/**
 * Actualizar estado y recargar
 */
function updateStatusAndReload(bookId, newStatus) {
    const result = libraryManager.updateStatus(bookId, newStatus);
    if (result.success) {
        showAlert(result.message, 'success');
        setTimeout(() => location.reload(), 500);
    }
}

/**
 * Eliminar y recargar
 */
function removeAndReload(bookId) {
    if (confirm('¿Estás seguro de que quieres eliminar este libro de tu biblioteca?')) {
        const result = libraryManager.removeBook(bookId);
        if (result.success) {
            showAlert(result.message, 'info');
            setTimeout(() => location.reload(), 500);
        }
    }
}

/**
 * Mostrar error
 */
function showError() {
    document.getElementById('libraryLoading').innerHTML = `
        <div class="alert alert-danger">
            <i class="fas fa-exclamation-triangle"></i>
            Error al cargar tu biblioteca. Por favor, intenta nuevamente.
        </div>
    `;
}

// Exportar funciones globales
window.toggleBookSelection = toggleBookSelection;
window.getRecommendations = getRecommendations;
window.updateStatusAndReload = updateStatusAndReload;
window.removeAndReload = removeAndReload;
