/* ============================================================================
   BOOKMATE - SISTEMA DE AUTENTICACIÓN VOLÁTIL
   Almacenamiento en sessionStorage (se pierde al cerrar navegador)
   ============================================================================ */

/**
 * Clase para manejar autenticación
 */
class AuthManager {
    constructor() {
        this.USERS_KEY = 'bookmate_users';
        this.CURRENT_USER_KEY = 'bookmate_current_user';
        this.initializeDefaultUsers();
    }

    /**
     * Inicializar usuarios de prueba
     */
    initializeDefaultUsers() {
        let users = this.getUsers();
        let needsUpdate = false;

        // Si no hay usuarios, crear defaults
        if (users.length === 0) {
            users = [
                {
                    id: 1,
                    name: 'Usuario Demo',
                    email: 'demo@bookmate.com',
                    password: 'demo123',
                    role: 'user'
                },
                {
                    id: 2,
                    name: 'Administrador',
                    email: 'admin@bookmate.com',
                    password: 'admin123',
                    role: 'admin'
                }
            ];
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
            return;
        }

        // Migrar usuarios existentes sin role
        users = users.map(user => {
            if (!user.role) {
                user.role = 'user';
                needsUpdate = true;
            }
            return user;
        });

        // Verificar si existe admin
        const adminExists = users.some(u => u.email === 'admin@bookmate.com');
        
        if (!adminExists) {
            // Agregar admin
            const maxId = Math.max(...users.map(u => u.id), 0);
            users.push({
                id: maxId + 1,
                name: 'Administrador',
                email: 'admin@bookmate.com',
                password: 'admin123',
                role: 'admin'
            });
            needsUpdate = true;
        }

        // Guardar si hubo cambios
        if (needsUpdate) {
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        }
    }

    /**
     * Obtener todos los usuarios
     */
    getUsers() {
        const users = localStorage.getItem(this.USERS_KEY);
        return users ? JSON.parse(users) : [];
    }

    /**
     * Registrar nuevo usuario
     */
    register(name, email, password) {
        const users = this.getUsers();
        
        // Verificar si el email ya existe
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'El email ya está registrado' };
        }

        // Crear nuevo usuario
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password, // En producción: hash the password!
            role: 'user' // Los nuevos usuarios son 'user' por defecto
        };

        users.push(newUser);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

        return { success: true, message: 'Registro exitoso', user: newUser };
    }

    /**
     * Iniciar sesión
     */
    login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Guardar usuario actual en sessionStorage
            const sessionUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role || 'user'
            };
            sessionStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(sessionUser));
            return { success: true, message: 'Inicio de sesión exitoso', user: sessionUser };
        }

        return { success: false, message: 'Email o contraseña incorrectos' };
    }

    /**
     * Cerrar sesión
     */
    logout() {
        sessionStorage.removeItem(this.CURRENT_USER_KEY);
    }

    /**
     * Obtener usuario actual
     */
    getCurrentUser() {
        const user = sessionStorage.getItem(this.CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    }

    /**
     * Verificar si hay usuario logueado
     */
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

    /**
     * Verificar si el usuario actual es admin
     */
    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    }
}

// Instancia global
const authManager = new AuthManager();

/**
 * Actualizar UI según estado de autenticación
 */
function updateAuthUI() {
    const currentUser = authManager.getCurrentUser();
    const authButtons = document.getElementById('authButtons');
    const libraryLinks = document.querySelectorAll('a[href="library.html"]');

    if (authButtons) {
        if (currentUser) {
            // Usuario logueado - mostrar dropdown con nombre y opciones
            const adminMenuItem = currentUser.role === 'admin' 
                ? '<li><a class="dropdown-item" href="admin.html"><i class="fas fa-cog"></i> Panel Admin</a></li><li><hr class="dropdown-divider"></li>'
                : '';
            
            authButtons.innerHTML = `
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-user-circle"></i> ${currentUser.name}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        ${adminMenuItem}
                        <li><a class="dropdown-item" href="library.html"><i class="fas fa-book"></i> Mi Biblioteca</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="handleLogout(); return false;"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</a></li>
                    </ul>
                </li>
            `;
        } else {
            // Usuario no logueado - mostrar botones de login/registro
            authButtons.innerHTML = `
                <li class="nav-item">
                    <button class="btn btn-login btn-sm" onclick="showLoginModal()">Iniciar Sesión</button>
                </li>
                <li class="nav-item">
                    <button class="btn btn-register btn-sm" onclick="showRegisterModal()">Registrarse</button>
                </li>
            `;
        }
    }

    // Habilitar/deshabilitar links de biblioteca
    libraryLinks.forEach(link => {
        if (!currentUser) {
            link.onclick = function(e) {
                e.preventDefault();
                showLoginModal();
                showAlert('Debes iniciar sesión para acceder a tu biblioteca', 'warning');
                return false;
            };
        } else {
            link.onclick = null;
        }
    });
}

/**
 * Manejar registro
 */
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    // Validaciones
    if (password !== confirmPassword) {
        showAlert('Las contraseñas no coinciden', 'danger');
        return;
    }

    if (password.length < 6) {
        showAlert('La contraseña debe tener al menos 6 caracteres', 'danger');
        return;
    }

    // Registrar
    const result = authManager.register(name, email, password);
    
    if (result.success) {
        showAlert('¡Registro exitoso! Ya puedes iniciar sesión', 'success');
        
        // Cerrar modal de registro
        const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        modal.hide();
        
        // Auto-login
        authManager.login(email, password);
        updateAuthUI();
        
        // Recargar página para actualizar todo
        setTimeout(() => window.location.reload(), 1000);
    } else {
        showAlert(result.message, 'danger');
    }
}

/**
 * Manejar login
 */
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const result = authManager.login(email, password);
    
    if (result.success) {
        showAlert('¡Bienvenido, ' + result.user.name + '!', 'success');
        
        // Cerrar modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
        
        // Actualizar UI
        updateAuthUI();
        
        // Recargar página para actualizar todo
        setTimeout(() => window.location.reload(), 1000);
    } else {
        showAlert(result.message, 'danger');
    }
}

/**
 * Manejar logout
 */
function handleLogout() {
    authManager.logout();
    showAlert('Sesión cerrada exitosamente', 'info');
    setTimeout(() => window.location.href = 'index.html', 1000);
}

/**
 * Mostrar modal de login
 */
function showLoginModal() {
    const modal = new bootstrap.Modal(document.getElementById('loginModal'));
    modal.show();
}

/**
 * Mostrar modal de registro
 */
function showRegisterModal() {
    const modal = new bootstrap.Modal(document.getElementById('registerModal'));
    modal.show();
}

/**
 * Mostrar alerta temporal
 */
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => alertDiv.remove(), 5000);
}

// Exportar funciones globales
window.authManager = authManager;
window.updateAuthUI = updateAuthUI;
window.handleRegister = handleRegister;
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.showLoginModal = showLoginModal;
window.showRegisterModal = showRegisterModal;

// Actualizar UI al cargar
document.addEventListener('DOMContentLoaded', updateAuthUI);

