/* ============================================================================
   BOOKMATE - BIBLIOTECA PERSONAL VOLÁTIL
   Almacenamiento en localStorage (persiste entre sesiones)
   ============================================================================ */

/**
 * Clase para manejar biblioteca personal
 */
class LibraryManager {
    constructor() {
        this.LIBRARY_KEY = 'bookmate_library';
    }

    /**
     * Obtener biblioteca del usuario actual
     */
    getUserLibrary() {
        const user = authManager.getCurrentUser();
        if (!user) return [];

        const allLibraries = localStorage.getItem(this.LIBRARY_KEY);
        const libraries = allLibraries ? JSON.parse(allLibraries) : {};
        
        return libraries[user.id] || [];
    }

    /**
     * Guardar biblioteca del usuario
     */
    saveUserLibrary(library) {
        const user = authManager.getCurrentUser();
        if (!user) return false;

        const allLibraries = localStorage.getItem(this.LIBRARY_KEY);
        const libraries = allLibraries ? JSON.parse(allLibraries) : {};
        
        libraries[user.id] = library;
        localStorage.setItem(this.LIBRARY_KEY, JSON.stringify(libraries));
        
        return true;
    }

    /**
     * Agregar libro a biblioteca
     */
    addBook(bookId, status = 'to-read') {
        const library = this.getUserLibrary();
        
        // Verificar si ya existe
        const existingIndex = library.findIndex(item => item.bookId === bookId);
        
        if (existingIndex >= 0) {
            return { success: false, message: 'El libro ya está en tu biblioteca' };
        }

        // Agregar nuevo libro
        library.push({
            bookId: bookId,
            status: status, // 'to-read', 'reading', 'read'
            addedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        this.saveUserLibrary(library);
        
        return { success: true, message: 'Libro agregado a tu biblioteca' };
    }

    /**
     * Remover libro de biblioteca
     */
    removeBook(bookId) {
        let library = this.getUserLibrary();
        library = library.filter(item => item.bookId !== bookId);
        this.saveUserLibrary(library);
        
        return { success: true, message: 'Libro eliminado de tu biblioteca' };
    }

    /**
     * Actualizar estado de lectura
     */
    updateStatus(bookId, newStatus) {
        const library = this.getUserLibrary();
        const bookIndex = library.findIndex(item => item.bookId === bookId);
        
        if (bookIndex >= 0) {
            library[bookIndex].status = newStatus;
            library[bookIndex].updatedAt = new Date().toISOString();
            this.saveUserLibrary(library);
            
            return { success: true, message: 'Estado actualizado' };
        }
        
        return { success: false, message: 'Libro no encontrado en tu biblioteca' };
    }

    /**
     * Verificar si un libro está en la biblioteca
     */
    hasBook(bookId) {
        const library = this.getUserLibrary();
        return library.some(item => item.bookId === bookId);
    }

    /**
     * Obtener estado de un libro
     */
    getBookStatus(bookId) {
        const library = this.getUserLibrary();
        const book = library.find(item => item.bookId === bookId);
        return book ? book.status : null;
    }

    /**
     * Obtener libros por estado
     */
    getBooksByStatus(status) {
        const library = this.getUserLibrary();
        return library.filter(item => item.status === status);
    }

    /**
     * Obtener estadísticas de la biblioteca
     */
    getStats() {
        const library = this.getUserLibrary();
        return {
            total: library.length,
            toRead: library.filter(item => item.status === 'to-read').length,
            reading: library.filter(item => item.status === 'reading').length,
            read: library.filter(item => item.status === 'read').length
        };
    }
}

// Instancia global
const libraryManager = new LibraryManager();

/**
 * Agregar libro a biblioteca desde página de detalle
 */
async function addToLibraryAction(bookId) {
    if (!authManager.isLoggedIn()) {
        showAlert('Debes iniciar sesión para agregar libros a tu biblioteca', 'warning');
        showLoginModal();
        return;
    }

    const result = libraryManager.addBook(bookId, 'to-read');
    
    if (result.success) {
        showAlert('📚 ' + result.message, 'success');
        updateBookDetailUI(bookId);
    } else {
        showAlert(result.message, 'info');
    }
}

/**
 * Cambiar estado de lectura
 */
function changeReadingStatus(bookId, newStatus) {
    if (!authManager.isLoggedIn()) {
        showAlert('Debes iniciar sesión', 'warning');
        return;
    }

    const statusNames = {
        'to-read': 'Por Leer',
        'reading': 'Leyendo',
        'read': 'Leído'
    };

    const result = libraryManager.updateStatus(bookId, newStatus);
    
    if (result.success) {
        showAlert(`Estado actualizado a: ${statusNames[newStatus]}`, 'success');
        updateBookDetailUI(bookId);
    } else {
        showAlert(result.message, 'danger');
    }
}

/**
 * Remover libro de biblioteca
 */
function removeFromLibrary(bookId) {
    if (!authManager.isLoggedIn()) return;

    if (confirm('¿Estás seguro de que quieres eliminar este libro de tu biblioteca?')) {
        const result = libraryManager.removeBook(bookId);
        
        if (result.success) {
            showAlert('Libro eliminado de tu biblioteca', 'info');
            
            // Si estamos en library.html, recargar
            if (window.location.pathname.includes('library.html')) {
                setTimeout(() => window.location.reload(), 1000);
            } else {
                updateBookDetailUI(bookId);
            }
        }
    }
}

/**
 * Actualizar UI de detalle según estado en biblioteca
 */
function updateBookDetailUI(bookId) {
    const actionsDiv = document.getElementById('bookActionsContainer');
    if (!actionsDiv) return;

    const isInLibrary = libraryManager.hasBook(bookId);
    const currentStatus = libraryManager.getBookStatus(bookId);

    const statusNames = {
        'to-read': 'Por Leer',
        'reading': 'Leyendo',
        'read': 'Leído'
    };

    const statusIcons = {
        'to-read': 'bookmark',
        'reading': 'book-reader',
        'read': 'check'
    };

    if (isInLibrary) {
        actionsDiv.innerHTML = `
            <button class="btn btn-success" disabled>
                <i class="fas fa-check"></i> En tu Biblioteca
            </button>
            <div class="dropdown d-inline-block ms-2">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    <i class="fas fa-${statusIcons[currentStatus]}"></i> ${statusNames[currentStatus]}
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item ${currentStatus === 'to-read' ? 'active' : ''}" href="#" onclick="changeReadingStatus(${bookId}, 'to-read'); return false;">
                        <i class="fas fa-bookmark"></i> Por Leer
                    </a></li>
                    <li><a class="dropdown-item ${currentStatus === 'reading' ? 'active' : ''}" href="#" onclick="changeReadingStatus(${bookId}, 'reading'); return false;">
                        <i class="fas fa-book-reader"></i> Leyendo
                    </a></li>
                    <li><a class="dropdown-item ${currentStatus === 'read' ? 'active' : ''}" href="#" onclick="changeReadingStatus(${bookId}, 'read'); return false;">
                        <i class="fas fa-check"></i> Leído
                    </a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="#" onclick="removeFromLibrary(${bookId}); return false;">
                        <i class="fas fa-trash"></i> Eliminar de Biblioteca
                    </a></li>
                </ul>
            </div>
        `;
    } else {
        actionsDiv.innerHTML = `
            <button class="btn btn-primary-custom" onclick="addToLibraryAction(${bookId})">
                <i class="fas fa-plus"></i> Agregar a Mi Biblioteca
            </button>
            <div class="dropdown d-inline-block ms-2">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" disabled>
                    <i class="fas fa-book-open"></i> Estado de Lectura
                </button>
            </div>
        `;
    }
}

// Exportar funciones globales
window.libraryManager = libraryManager;
window.addToLibraryAction = addToLibraryAction;
window.changeReadingStatus = changeReadingStatus;
window.removeFromLibrary = removeFromLibrary;
window.updateBookDetailUI = updateBookDetailUI;

