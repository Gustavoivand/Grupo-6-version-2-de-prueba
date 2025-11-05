/* ============================================================================
   BOOKMATE - LÓGICA DE PÁGINA DE DETALLE
   Track: BASIC (Prototipo Estático)
   ============================================================================ */

let currentBook = null;

/**
 * Inicializar página de detalle
 */
document.addEventListener('DOMContentLoaded', async function() {
    const bookId = window.BookMate.getUrlParameter('id');
    
    if (!bookId) {
        showBookNotFound();
        return;
    }
    
    try {
        // Cargar libro
        currentBook = await window.BookMate.getBookById(bookId);
        
        if (!currentBook) {
            showBookNotFound();
            return;
        }
        
        // Renderizar detalles
        renderBookDetails();
        
        // Cargar libros similares
        await loadSimilarBooks();
        
    } catch (error) {
        console.error('Error al cargar detalle:', error);
        showError();
    }
});

/**
 * Renderizar detalles del libro
 */
function renderBookDetails() {
    // Ocultar loading
    document.getElementById('detailsLoading').style.display = 'none';
    document.getElementById('bookDetails').style.display = 'block';
    
    // Actualizar breadcrumb
    document.getElementById('breadcrumbTitle').textContent = currentBook.title;
    
    // Cover
    document.getElementById('bookCoverLarge').textContent = currentBook.title;
    
    // Título
    document.getElementById('bookTitle').textContent = currentBook.title;
    
    // Autor
    document.getElementById('bookAuthor').innerHTML = `
        <i class="fas fa-user"></i> Por ${currentBook.author}
    `;
    
    // Rating
    const stars = window.BookMate.generateStars(currentBook.rating);
    document.getElementById('bookRating').innerHTML = `
        ${stars} ${currentBook.rating.toFixed(1)} 
        <span class="text-muted">(${window.BookMate.formatNumber(currentBook.reviews_count)} reseñas)</span>
    `;
    
    // Año
    document.getElementById('bookYear').textContent = currentBook.year > 0 ? currentBook.year : 'Antiguo';
    
    // Páginas
    document.getElementById('bookPages').textContent = window.BookMate.formatNumber(currentBook.pages);
    
    // Género
    document.getElementById('bookGenre').innerHTML = `
        <span class="badge-custom badge-genre">${currentBook.genre}</span>
    `;
    
    // ISBN
    document.getElementById('bookISBN').textContent = currentBook.isbn;
    
    // Tags
    const tagsContainer = document.getElementById('bookTags');
    tagsContainer.innerHTML = currentBook.tags.map(tag => 
        `<span class="badge-custom">${tag}</span>`
    ).join('');
    
    // Synopsis
    document.getElementById('bookSynopsis').textContent = currentBook.synopsis;
    
    // Renderizar botones de acción
    renderBookActions();
    
    // Actualizar título de página
    document.title = `${currentBook.title} - BookMate`;
}

/**
 * Renderizar botones de acción según estado de autenticación
 */
function renderBookActions() {
    const container = document.getElementById('bookActionsContainer');
    
    if (!container) return;
    
    // Usar la función global de library.js
    if (window.updateBookDetailUI) {
        window.updateBookDetailUI(currentBook.id);
    }
}

/**
 * Cargar libros similares
 */
async function loadSimilarBooks() {
    const container = document.getElementById('similarBooksGrid');
    const loading = document.getElementById('similarBooksLoading');
    
    loading.style.display = 'block';
    
    try {
        const allBooks = await window.BookMate.loadBooks();
        
        // Filtrar libros similares (mismo género o autor, excluir el actual)
        let similarBooks = allBooks.filter(book => 
            book.id !== currentBook.id && (
                book.genre === currentBook.genre ||
                book.author === currentBook.author
            )
        );
        
        // Ordenar por rating y limitar a 6
        similarBooks = similarBooks
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 6);
        
        loading.style.display = 'none';
        
        if (similarBooks.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-4">
                    <p class="text-muted">No se encontraron libros similares.</p>
                </div>
            `;
            return;
        }
        
        // Renderizar libros similares
        container.innerHTML = similarBooks
            .map(book => window.BookMate.createBookCard(book))
            .join('');
        
    } catch (error) {
        console.error('Error al cargar libros similares:', error);
        loading.style.display = 'none';
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    Error al cargar libros similares.
                </div>
            </div>
        `;
    }
}

/**
 * Mostrar mensaje de libro no encontrado
 */
function showBookNotFound() {
    document.getElementById('detailsLoading').style.display = 'none';
    document.getElementById('bookNotFound').style.display = 'block';
    document.title = 'Libro no encontrado - BookMate';
}

/**
 * Mostrar error general
 */
function showError() {
    const loading = document.getElementById('detailsLoading');
    loading.innerHTML = `
        <div class="alert alert-danger alert-custom">
            <i class="fas fa-exclamation-triangle"></i>
            Error al cargar el libro. Por favor, intenta nuevamente.
        </div>
        <div class="text-center mt-3">
            <a href="catalog.html" class="btn btn-primary-custom">
                <i class="fas fa-arrow-left"></i> Volver al Catálogo
            </a>
        </div>
    `;
}


