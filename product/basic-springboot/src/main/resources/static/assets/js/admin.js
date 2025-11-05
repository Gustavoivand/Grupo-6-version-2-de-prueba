/* ============================================================================
   BOOKMATE - ADMIN PANEL
   Lógica del panel de administración
   ============================================================================ */

let currentPage = 1;
const booksPerPage = 10;
let allBooks = [];
let filteredBooks = [];
let editingBookId = null;

/**
 * Inicializar panel de admin
 */
document.addEventListener('DOMContentLoaded', async function() {
    // Verificar autorización
    if (!authManager.isAdmin()) {
        document.getElementById('adminContent').style.display = 'none';
        document.getElementById('notAuthorized').style.display = 'block';
        return;
    }

    // Cargar datos
    await loadAdminData();

    // Configurar búsqueda en tabla
    document.getElementById('searchTable').addEventListener('input', handleTableSearch);
});

/**
 * Cargar datos del admin
 */
async function loadAdminData() {
    try {
        // Cargar libros
        allBooks = await bookManager.getAllBooks();
        filteredBooks = [...allBooks];

        // Cargar estadísticas
        await loadStats();

        // Renderizar tabla
        renderBooksTable();

    } catch (error) {
        console.error('Error al cargar datos:', error);
        showAlert('Error al cargar datos del panel', 'danger');
    }
}

/**
 * Cargar estadísticas
 */
async function loadStats() {
    const stats = await bookManager.getStats();

    document.getElementById('statTotalBooks').textContent = stats.total;
    document.getElementById('statAvgRating').textContent = stats.avgRating;
    document.getElementById('statTotalReviews').textContent = stats.totalReviews.toLocaleString();
    document.getElementById('statTotalGenres').textContent = Object.keys(stats.byGenre).length;
}

/**
 * Renderizar tabla de libros
 */
function renderBooksTable() {
    const tbody = document.getElementById('booksTableBody');
    tbody.innerHTML = '';

    // Calcular paginación
    const start = (currentPage - 1) * booksPerPage;
    const end = start + booksPerPage;
    const paginatedBooks = filteredBooks.slice(start, end);

    if (paginatedBooks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center">No se encontraron libros</td></tr>';
        return;
    }

    // Renderizar filas
    paginatedBooks.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.id}</td>
            <td><strong>${book.title}</strong></td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td><span class="badge bg-secondary">${book.genre}</span></td>
            <td><i class="fas fa-star text-warning"></i> ${book.rating}</td>
            <td>${book.pages}</td>
            <td>
                <div class="btn-group btn-group-sm" role="group">
                    <button class="btn btn-outline-primary" onclick="editBook(${book.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline-danger" onclick="deleteBook(${book.id})" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Renderizar paginación
    renderPagination();
}

/**
 * Renderizar paginación
 */
function renderPagination() {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const pagination = document.getElementById('tablePagination').querySelector('.pagination');
    pagination.innerHTML = '';

    if (totalPages <= 1) return;

    // Botón anterior
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">Anterior</a>`;
    pagination.appendChild(prevLi);

    // Páginas
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            const li = document.createElement('li');
            li.className = `page-item ${i === currentPage ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>`;
            pagination.appendChild(li);
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            const li = document.createElement('li');
            li.className = 'page-item disabled';
            li.innerHTML = '<span class="page-link">...</span>';
            pagination.appendChild(li);
        }
    }

    // Botón siguiente
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">Siguiente</a>`;
    pagination.appendChild(nextLi);
}

/**
 * Cambiar página
 */
function changePage(page) {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderBooksTable();
}

/**
 * Buscar en tabla
 */
function handleTableSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (!searchTerm) {
        filteredBooks = [...allBooks];
    } else {
        filteredBooks = allBooks.filter(book => 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.genre.toLowerCase().includes(searchTerm)
        );
    }

    currentPage = 1;
    renderBooksTable();
}

/**
 * Mostrar modal de agregar libro
 */
function showAddBookModal() {
    editingBookId = null;
    document.getElementById('bookModalTitle').textContent = 'Agregar Nuevo Libro';
    document.getElementById('bookForm').reset();
    document.getElementById('bookId').value = '';
    
    const modal = new bootstrap.Modal(document.getElementById('bookModal'));
    modal.show();
}

/**
 * Editar libro
 */
async function editBook(id) {
    const book = await bookManager.getBookById(id);
    
    if (!book) {
        showAlert('Libro no encontrado', 'danger');
        return;
    }

    editingBookId = id;
    document.getElementById('bookModalTitle').textContent = 'Editar Libro';
    document.getElementById('bookId').value = book.id;
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthor').value = book.author;
    document.getElementById('bookYear').value = book.year;
    document.getElementById('bookPages').value = book.pages;
    document.getElementById('bookGenre').value = book.genre;
    document.getElementById('bookRating').value = book.rating;
    document.getElementById('bookReviews').value = book.reviews_count;
    document.getElementById('bookISBN').value = book.isbn;
    document.getElementById('bookSynopsis').value = book.synopsis;
    document.getElementById('bookTags').value = Array.isArray(book.tags) ? book.tags.join(', ') : '';

    const modal = new bootstrap.Modal(document.getElementById('bookModal'));
    modal.show();
}

/**
 * Manejar envío de formulario
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookForm');
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            await saveBook();
        });
    }
});

/**
 * Guardar libro
 */
async function saveBook() {
    const bookData = {
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        year: document.getElementById('bookYear').value,
        pages: document.getElementById('bookPages').value,
        genre: document.getElementById('bookGenre').value,
        rating: document.getElementById('bookRating').value,
        reviews_count: document.getElementById('bookReviews').value,
        isbn: document.getElementById('bookISBN').value,
        synopsis: document.getElementById('bookSynopsis').value,
        tags: document.getElementById('bookTags').value.split(',').map(t => t.trim()).filter(t => t)
    };

    let result;
    if (editingBookId) {
        result = await bookManager.updateBook(editingBookId, bookData);
    } else {
        result = await bookManager.addBook(bookData);
    }

    if (result.success) {
        showAlert(result.message, 'success');
        
        // Cerrar modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('bookModal'));
        modal.hide();

        // Limpiar caché y recargar
        clearBooksCache();
        await loadAdminData();
    } else {
        showAlert(result.message, 'danger');
    }
}

/**
 * Eliminar libro
 */
async function deleteBook(id) {
    const book = await bookManager.getBookById(id);
    
    if (!confirm(`¿Estás seguro de que deseas eliminar "${book.title}"?`)) {
        return;
    }

    const result = await bookManager.deleteBook(id);
    
    if (result.success) {
        showAlert('Libro eliminado correctamente', 'success');
        clearBooksCache();
        await loadAdminData();
    } else {
        showAlert(result.message, 'danger');
    }
}

/**
 * Mostrar modal de importar CSV
 */
function showImportCSVModal() {
    const modal = new bootstrap.Modal(document.getElementById('importCSVModal'));
    modal.show();
}

/**
 * Importar CSV
 */
async function importCSV() {
    const fileInput = document.getElementById('csvFile');
    
    if (!fileInput.files.length) {
        showAlert('Por favor selecciona un archivo CSV', 'warning');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function(e) {
        const csvText = e.target.result;
        const result = await bookManager.importFromCSV(csvText);

        if (result.success) {
            showAlert(`¡Éxito! ${result.count} libro(s) importado(s)`, 'success');
            
            // Cerrar modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('importCSVModal'));
            modal.hide();

            // Recargar
            clearBooksCache();
            await loadAdminData();
        } else {
            showAlert('Error: ' + result.message, 'danger');
        }
    };

    reader.readAsText(file);
}

/**
 * Exportar a CSV
 */
async function exportBooksToCSV() {
    const csv = await bookManager.exportToCSV();
    const filename = `bookmate_catalog_${new Date().toISOString().split('T')[0]}.csv`;
    bookManager.downloadCSV(csv, filename);
    showAlert('Catálogo exportado correctamente', 'success');
}

/**
 * Mostrar plantilla CSV
 */
function showTemplateCSV() {
    const template = `title,author,year,pages,genre,rating,reviews_count,isbn,synopsis,tags
"El Quijote","Miguel de Cervantes",1605,863,"Clásico",4.8,12500,"978-84-376-0494-7","Las aventuras del ingenioso hidalgo Don Quijote de la Mancha","clásico;aventura;español"
"1984","George Orwell",1949,328,"Ficción",4.9,25000,"978-0-452-28423-4","Una distopía sobre un futuro totalitario","distopía;ficción;clásico"`;
    
    bookManager.downloadCSV(template, 'plantilla_bookmate.csv');
    showAlert('Plantilla CSV descargada', 'success');
}

/**
 * Resetear catálogo
 */
async function resetCatalog() {
    if (!confirm('¿Estás seguro de que deseas restaurar el catálogo a sus valores originales? Se perderán todos los cambios.')) {
        return;
    }

    const result = await bookManager.resetToOriginal();
    
    if (result.success) {
        showAlert('Catálogo restaurado correctamente', 'success');
        clearBooksCache();
        await loadAdminData();
    }
}

// Exportar funciones globales
window.showAddBookModal = showAddBookModal;
window.editBook = editBook;
window.deleteBook = deleteBook;
window.changePage = changePage;
window.showImportCSVModal = showImportCSVModal;
window.importCSV = importCSV;
window.exportBooksToCSV = exportBooksToCSV;
window.showTemplateCSV = showTemplateCSV;
window.resetCatalog = resetCatalog;

