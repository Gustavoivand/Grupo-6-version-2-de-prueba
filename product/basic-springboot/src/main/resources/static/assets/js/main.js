/* ============================================================================
   BOOKMATE - FUNCIONES GLOBALES
   Track: BASIC (Prototipo Estático)
   ============================================================================ */

// URLs de datos (relativas para que funcionen en GitHub Pages)
const DATA_URLS = {
    books: './assets/data/books.json',
    featured: './assets/data/featured_books.json'
};

// Cache de datos para evitar múltiples fetch
let booksCache = null;

/**
 * Cargar todos los libros del catálogo
 * Prioridad: 1. localStorage (admin), 2. books.json (default)
 * @returns {Promise<Array>} Array de libros
 */
async function loadBooks() {
    if (booksCache) {
        return booksCache;
    }
    
    try {
        // Intentar cargar desde localStorage primero (modificado por admin)
        const storedBooks = localStorage.getItem('bookmate_books');
        
        if (storedBooks) {
            booksCache = JSON.parse(storedBooks);
            return booksCache;
        }
        
        // Si no hay en localStorage, cargar desde archivo JSON
        const response = await fetch(DATA_URLS.books);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        booksCache = await response.json();
        return booksCache;
    } catch (error) {
        console.error('Error al cargar libros:', error);
        throw error;
    }
}

/**
 * Limpiar caché de libros (útil cuando admin modifica catálogo)
 */
function clearBooksCache() {
    booksCache = null;
}

/**
 * Obtener un libro por su ID
 * @param {number} id - ID del libro
 * @returns {Promise<Object|null>} Libro encontrado o null
 */
async function getBookById(id) {
    const books = await loadBooks();
    return books.find(book => book.id === parseInt(id)) || null;
}

/**
 * Cargar IDs de libros destacados
 * @returns {Promise<Array>} Array de IDs
 */
async function loadFeaturedBooksIds() {
    try {
        const response = await fetch(DATA_URLS.featured);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error al cargar libros destacados:', error);
        throw error;
    }
}

/**
 * Cargar y mostrar libros destacados en la página de inicio
 */
async function loadFeaturedBooks() {
    const container = document.getElementById('featuredBooksContainer');
    const loading = document.getElementById('featuredBooksLoading');
    
    if (!container || !loading) return;
    
    try {
        // Cargar datos
        const [books, featuredIds] = await Promise.all([
            loadBooks(),
            loadFeaturedBooksIds()
        ]);
        
        // Filtrar libros destacados
        const featuredBooks = books.filter(book => featuredIds.includes(book.id));
        
        // Ocultar loading, mostrar container
        loading.style.display = 'none';
        container.style.display = 'flex';
        
        // Renderizar libros
        container.innerHTML = featuredBooks.map(book => createBookCard(book)).join('');
        
    } catch (error) {
        loading.innerHTML = `
            <div class="alert alert-danger alert-custom">
                <i class="fas fa-exclamation-triangle"></i>
                Error al cargar libros destacados. Por favor, intenta nuevamente.
            </div>
        `;
    }
}

/**
 * Crear HTML para una tarjeta de libro
 * @param {Object} book - Objeto libro
 * @returns {string} HTML de la tarjeta
 */
function createBookCard(book) {
    const stars = generateStars(book.rating);
    
    return `
        <div class="col-lg-4 col-md-6">
            <div class="book-card">
                <div class="book-cover">
                    ${book.title}
                </div>
                <div class="book-card-body">
                    <h5 class="book-title">${book.title}</h5>
                    <p class="book-author">
                        <i class="fas fa-user"></i> ${book.author}
                    </p>
                    <div class="book-meta">
                        <span class="book-year">
                            <i class="fas fa-calendar"></i> ${book.year > 0 ? book.year : 'Antiguo'}
                        </span>
                        <span class="rating">
                            ${stars} ${book.rating.toFixed(1)}
                        </span>
                    </div>
                    <div class="mt-3">
                        <a href="details.html?id=${book.id}" class="btn btn-sm btn-primary-custom w-100">
                            <i class="fas fa-info-circle"></i> Ver Detalle
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Generar HTML de estrellas según rating
 * @param {number} rating - Rating del libro (0-5)
 * @returns {string} HTML de estrellas
 */
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Estrellas llenas
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Media estrella
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

/**
 * Obtener parámetro de URL
 * @param {string} name - Nombre del parámetro
 * @returns {string|null} Valor del parámetro o null
 */
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * Formatear número con separadores de miles
 * @param {number} num - Número a formatear
 * @returns {string} Número formateado
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Truncar texto a cierta longitud
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

/**
 * Scroll suave a elemento
 * @param {string} elementId - ID del elemento
 */
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Exportar funciones para uso global
window.BookMate = {
    loadBooks,
    getBookById,
    loadFeaturedBooks,
    createBookCard,
    generateStars,
    getUrlParameter,
    formatNumber,
    truncateText,
    smoothScrollTo
};

