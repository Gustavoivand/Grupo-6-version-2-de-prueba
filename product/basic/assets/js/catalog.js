/* ============================================================================
   BOOKMATE - LÓGICA DEL CATÁLOGO
   Track: BASIC (Prototipo Estático)
   ============================================================================ */

// Estado del catálogo
const catalogState = {
    allBooks: [],
    filteredBooks: [],
    currentPage: 1,
    booksPerPage: 9,
    selectedGenres: [],
    searchTerm: '',
    yearRange: '',
    pagesRange: '',
    sortBy: 'rating-desc'
};

/**
 * Inicializar catálogo al cargar la página
 */
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Cargar libros
        catalogState.allBooks = await window.BookMate.loadBooks();
        catalogState.filteredBooks = [...catalogState.allBooks];
        
        // Inicializar UI
        initializeGenreFilters();
        initializeEventListeners();
        
        // Renderizar catálogo
        renderCatalog();
        
    } catch (error) {
        showError('Error al cargar el catálogo. Por favor, recarga la página.');
    }
});

/**
 * Inicializar filtros de género dinámicamente
 */
function initializeGenreFilters() {
    const genres = [...new Set(catalogState.allBooks.map(book => book.genre))].sort();
    const container = document.getElementById('genreFilters');
    
    container.innerHTML = genres.map(genre => `
        <div class="form-check genre-checkbox">
            <input class="form-check-input" type="checkbox" value="${genre}" id="genre-${genre.replace(/\s+/g, '-')}">
            <label class="form-check-label" for="genre-${genre.replace(/\s+/g, '-')}">
                ${genre}
            </label>
        </div>
    `).join('');
}

/**
 * Inicializar event listeners
 */
function initializeEventListeners() {
    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Filtros de género
    const genreCheckboxes = document.querySelectorAll('#genreFilters input[type="checkbox"]');
    genreCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleGenreFilter);
    });
    
    // Filtro de año
    document.getElementById('yearFilter').addEventListener('change', handleYearFilter);
    
    // Filtro de páginas
    document.getElementById('pagesFilter').addEventListener('change', handlePagesFilter);
    
    // Ordenamiento
    document.getElementById('sortBy').addEventListener('change', handleSort);
    
    // Limpiar filtros
    document.getElementById('clearFilters').addEventListener('click', clearAllFilters);
}

/**
 * Manejar búsqueda por texto
 */
function handleSearch(event) {
    catalogState.searchTerm = event.target.value.toLowerCase().trim();
    catalogState.currentPage = 1;
    applyFilters();
}

/**
 * Manejar filtro de género
 */
function handleGenreFilter() {
    const checkboxes = document.querySelectorAll('#genreFilters input[type="checkbox"]:checked');
    catalogState.selectedGenres = Array.from(checkboxes).map(cb => cb.value);
    catalogState.currentPage = 1;
    applyFilters();
}

/**
 * Manejar filtro de año
 */
function handleYearFilter(event) {
    catalogState.yearRange = event.target.value;
    catalogState.currentPage = 1;
    applyFilters();
}

/**
 * Manejar filtro de páginas
 */
function handlePagesFilter(event) {
    catalogState.pagesRange = event.target.value;
    catalogState.currentPage = 1;
    applyFilters();
}

/**
 * Manejar ordenamiento
 */
function handleSort(event) {
    catalogState.sortBy = event.target.value;
    applyFilters();
}

/**
 * Aplicar todos los filtros
 */
function applyFilters() {
    let books = [...catalogState.allBooks];
    
    // Filtro de búsqueda
    if (catalogState.searchTerm) {
        books = books.filter(book => 
            book.title.toLowerCase().includes(catalogState.searchTerm) ||
            book.author.toLowerCase().includes(catalogState.searchTerm)
        );
    }
    
    // Filtro de género
    if (catalogState.selectedGenres.length > 0) {
        books = books.filter(book => 
            catalogState.selectedGenres.includes(book.genre)
        );
    }
    
    // Filtro de año
    if (catalogState.yearRange) {
        books = books.filter(book => {
            const year = book.year;
            switch(catalogState.yearRange) {
                case '2020-2024': return year >= 2020 && year <= 2024;
                case '2010-2019': return year >= 2010 && year <= 2019;
                case '2000-2009': return year >= 2000 && year <= 2009;
                case '1990-1999': return year >= 1990 && year <= 1999;
                case '1900-1989': return year >= 1900 && year <= 1989;
                case 'ancient': return year < 1900;
                default: return true;
            }
        });
    }
    
    // Filtro de páginas
    if (catalogState.pagesRange) {
        books = books.filter(book => {
            const pages = book.pages;
            switch(catalogState.pagesRange) {
                case '0-200': return pages < 200;
                case '200-400': return pages >= 200 && pages <= 400;
                case '400-600': return pages >= 400 && pages <= 600;
                case '600+': return pages > 600;
                default: return true;
            }
        });
    }
    
    // Ordenamiento
    books = sortBooks(books, catalogState.sortBy);
    
    catalogState.filteredBooks = books;
    renderCatalog();
}

/**
 * Ordenar libros
 */
function sortBooks(books, sortBy) {
    const sorted = [...books];
    
    switch(sortBy) {
        case 'rating-desc':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'rating-asc':
            return sorted.sort((a, b) => a.rating - b.rating);
        case 'year-desc':
            return sorted.sort((a, b) => b.year - a.year);
        case 'year-asc':
            return sorted.sort((a, b) => a.year - b.year);
        case 'title-asc':
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case 'title-desc':
            return sorted.sort((a, b) => b.title.localeCompare(a.title));
        default:
            return sorted;
    }
}

/**
 * Limpiar todos los filtros
 */
function clearAllFilters() {
    // Limpiar búsqueda
    document.getElementById('searchInput').value = '';
    catalogState.searchTerm = '';
    
    // Limpiar géneros
    document.querySelectorAll('#genreFilters input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    catalogState.selectedGenres = [];
    
    // Limpiar año
    document.getElementById('yearFilter').value = '';
    catalogState.yearRange = '';
    
    // Limpiar páginas
    document.getElementById('pagesFilter').value = '';
    catalogState.pagesRange = '';
    
    // Reset ordenamiento
    document.getElementById('sortBy').value = 'rating-desc';
    catalogState.sortBy = 'rating-desc';
    
    // Reset página
    catalogState.currentPage = 1;
    
    // Aplicar (mostrar todos)
    applyFilters();
}

/**
 * Renderizar catálogo completo
 */
function renderCatalog() {
    const loading = document.getElementById('catalogLoading');
    const grid = document.getElementById('booksGrid');
    const noResults = document.getElementById('noResults');
    const paginationContainer = document.getElementById('paginationContainer');
    
    // Ocultar loading
    loading.style.display = 'none';
    
    // Actualizar contador de resultados
    updateResultsCount();
    
    // Verificar si hay resultados
    if (catalogState.filteredBooks.length === 0) {
        grid.style.display = 'none';
        paginationContainer.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    // Mostrar grid
    noResults.style.display = 'none';
    grid.style.display = 'flex';
    
    // Calcular libros de la página actual
    const startIndex = (catalogState.currentPage - 1) * catalogState.booksPerPage;
    const endIndex = startIndex + catalogState.booksPerPage;
    const booksToShow = catalogState.filteredBooks.slice(startIndex, endIndex);
    
    // Renderizar libros
    grid.innerHTML = booksToShow.map(book => window.BookMate.createBookCard(book)).join('');
    
    // Renderizar paginación
    renderPagination();
}

/**
 * Actualizar contador de resultados
 */
function updateResultsCount() {
    const count = catalogState.filteredBooks.length;
    const total = catalogState.allBooks.length;
    const resultsCount = document.getElementById('resultsCount');
    
    resultsCount.textContent = `Mostrando ${count} de ${total} libros`;
}

/**
 * Renderizar paginación
 */
function renderPagination() {
    const container = document.getElementById('paginationContainer');
    const totalPages = Math.ceil(catalogState.filteredBooks.length / catalogState.booksPerPage);
    
    if (totalPages <= 1) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    
    const pagination = container.querySelector('.pagination');
    const currentPage = catalogState.currentPage;
    
    let paginationHTML = '';
    
    // Botón anterior
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">
                <i class="fas fa-chevron-left"></i>
            </a>
        </li>
    `;
    
    // Números de página
    for (let i = 1; i <= totalPages; i++) {
        // Mostrar solo algunas páginas alrededor de la actual
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `
                <li class="page-item disabled">
                    <span class="page-link">...</span>
                </li>
            `;
        }
    }
    
    // Botón siguiente
    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">
                <i class="fas fa-chevron-right"></i>
            </a>
        </li>
    `;
    
    pagination.innerHTML = paginationHTML;
}

/**
 * Cambiar página
 */
function changePage(page) {
    const totalPages = Math.ceil(catalogState.filteredBooks.length / catalogState.booksPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    catalogState.currentPage = page;
    renderCatalog();
    
    // Scroll al top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Mostrar mensaje de error
 */
function showError(message) {
    const loading = document.getElementById('catalogLoading');
    loading.innerHTML = `
        <div class="alert alert-danger alert-custom">
            <i class="fas fa-exclamation-triangle"></i> ${message}
        </div>
    `;
}

/**
 * Debounce para búsqueda
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Hacer changePage global
window.changePage = changePage;

