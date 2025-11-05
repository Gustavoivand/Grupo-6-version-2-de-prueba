/* ============================================================================
   BOOKMATE - BOOK MANAGER (ADMIN)
   Gestión de catálogo de libros para administradores
   ============================================================================ */

/**
 * Clase para manejar CRUD de libros
 */
class BookManager {
    constructor() {
        this.BOOKS_KEY = 'bookmate_books';
        this.ORIGINAL_BOOKS_URL = 'assets/data/books.json';
    }

    /**
     * Obtener todos los libros
     * Prioridad: 1. localStorage (modificados por admin), 2. books.json (originales)
     */
    async getAllBooks() {
        // Intentar obtener de localStorage primero
        const storedBooks = localStorage.getItem(this.BOOKS_KEY);
        
        if (storedBooks) {
            return JSON.parse(storedBooks);
        }

        // Si no hay en localStorage, cargar originales
        try {
            const response = await fetch(this.ORIGINAL_BOOKS_URL);
            const books = await response.json();
            return books;
        } catch (error) {
            console.error('Error al cargar libros:', error);
            return [];
        }
    }

    /**
     * Guardar libros en localStorage
     */
    saveBooks(books) {
        localStorage.setItem(this.BOOKS_KEY, JSON.stringify(books));
        return { success: true, message: 'Cambios guardados correctamente' };
    }

    /**
     * Obtener libro por ID
     */
    async getBookById(id) {
        const books = await this.getAllBooks();
        return books.find(book => book.id === parseInt(id));
    }

    /**
     * Agregar nuevo libro
     */
    async addBook(bookData) {
        const books = await this.getAllBooks();
        
        // Generar ID único
        const maxId = books.length > 0 ? Math.max(...books.map(b => b.id)) : 0;
        const newBook = {
            id: maxId + 1,
            ...bookData,
            reviews_count: parseInt(bookData.reviews_count) || 0,
            rating: parseFloat(bookData.rating) || 0,
            year: parseInt(bookData.year) || new Date().getFullYear(),
            pages: parseInt(bookData.pages) || 0
        };

        books.push(newBook);
        return this.saveBooks(books);
    }

    /**
     * Actualizar libro existente
     */
    async updateBook(id, bookData) {
        const books = await this.getAllBooks();
        const index = books.findIndex(book => book.id === parseInt(id));

        if (index === -1) {
            return { success: false, message: 'Libro no encontrado' };
        }

        books[index] = {
            ...books[index],
            ...bookData,
            id: parseInt(id), // Mantener ID original
            reviews_count: parseInt(bookData.reviews_count) || 0,
            rating: parseFloat(bookData.rating) || 0,
            year: parseInt(bookData.year) || new Date().getFullYear(),
            pages: parseInt(bookData.pages) || 0
        };

        return this.saveBooks(books);
    }

    /**
     * Eliminar libro
     */
    async deleteBook(id) {
        const books = await this.getAllBooks();
        const filteredBooks = books.filter(book => book.id !== parseInt(id));

        if (filteredBooks.length === books.length) {
            return { success: false, message: 'Libro no encontrado' };
        }

        return this.saveBooks(filteredBooks);
    }

    /**
     * Importar libros desde CSV
     */
    async importFromCSV(csvText) {
        try {
            const lines = csvText.trim().split('\n');
            
            if (lines.length < 2) {
                return { success: false, message: 'El archivo CSV está vacío' };
            }

            // Leer encabezados
            const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
            
            // Validar encabezados requeridos
            const requiredHeaders = ['title', 'author', 'year', 'pages', 'genre', 'rating', 'synopsis', 'isbn'];
            const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
            
            if (missingHeaders.length > 0) {
                return { 
                    success: false, 
                    message: `Faltan columnas requeridas: ${missingHeaders.join(', ')}` 
                };
            }

            // Procesar filas
            const newBooks = [];
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;

                const values = this.parseCSVLine(line);
                const book = {};

                headers.forEach((header, index) => {
                    if (values[index] !== undefined) {
                        book[header] = values[index];
                    }
                });

                // Convertir tags de string a array
                if (book.tags && typeof book.tags === 'string') {
                    book.tags = book.tags.split(',').map(t => t.trim());
                } else {
                    book.tags = [];
                }

                newBooks.push(book);
            }

            if (newBooks.length === 0) {
                return { success: false, message: 'No se encontraron libros válidos en el CSV' };
            }

            // Agregar libros al catálogo existente
            const books = await this.getAllBooks();
            const maxId = books.length > 0 ? Math.max(...books.map(b => b.id)) : 0;
            
            newBooks.forEach((book, index) => {
                book.id = maxId + index + 1;
                book.reviews_count = parseInt(book.reviews_count) || 0;
                book.rating = parseFloat(book.rating) || 0;
                book.year = parseInt(book.year) || new Date().getFullYear();
                book.pages = parseInt(book.pages) || 0;
            });

            const updatedBooks = [...books, ...newBooks];
            this.saveBooks(updatedBooks);

            return { 
                success: true, 
                message: `${newBooks.length} libro(s) importado(s) correctamente`,
                count: newBooks.length
            };

        } catch (error) {
            console.error('Error al importar CSV:', error);
            return { success: false, message: 'Error al procesar el archivo CSV' };
        }
    }

    /**
     * Parsear línea de CSV manejando comillas
     */
    parseCSVLine(line) {
        const values = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }

        values.push(current.trim());
        return values;
    }

    /**
     * Exportar libros a CSV
     */
    async exportToCSV() {
        const books = await this.getAllBooks();

        // Encabezados
        const headers = ['id', 'title', 'author', 'year', 'pages', 'genre', 'rating', 'reviews_count', 'isbn', 'synopsis', 'tags'];
        
        // Convertir a CSV
        let csv = headers.join(',') + '\n';

        books.forEach(book => {
            const row = headers.map(header => {
                let value = book[header];
                
                // Convertir array de tags a string
                if (header === 'tags' && Array.isArray(value)) {
                    value = value.join(';');
                }
                
                // Escapar comillas y envolver en comillas si contiene comas
                if (value && (typeof value === 'string' && (value.includes(',') || value.includes('"')))) {
                    value = '"' + value.replace(/"/g, '""') + '"';
                }
                
                return value || '';
            });
            
            csv += row.join(',') + '\n';
        });

        return csv;
    }

    /**
     * Descargar CSV
     */
    downloadCSV(csv, filename = 'bookmate_catalog.csv') {
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /**
     * Resetear a libros originales
     */
    async resetToOriginal() {
        localStorage.removeItem(this.BOOKS_KEY);
        return { success: true, message: 'Catálogo restaurado a valores originales' };
    }

    /**
     * Obtener estadísticas
     */
    async getStats() {
        const books = await this.getAllBooks();
        
        return {
            total: books.length,
            byGenre: this.groupBy(books, 'genre'),
            avgRating: (books.reduce((sum, b) => sum + b.rating, 0) / books.length).toFixed(2),
            totalReviews: books.reduce((sum, b) => sum + b.reviews_count, 0)
        };
    }

    /**
     * Agrupar por campo
     */
    groupBy(array, key) {
        return array.reduce((result, item) => {
            const value = item[key];
            result[value] = (result[value] || 0) + 1;
            return result;
        }, {});
    }
}

// Instancia global
const bookManager = new BookManager();

// Exportar
window.bookManager = bookManager;

