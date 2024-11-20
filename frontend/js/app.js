document.addEventListener('DOMContentLoaded', () => {
    console.log('Frontend cargado correctamente');

    // Verificar el token al cargar cualquier página
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        try {
            // Decodificar el token para obtener el rol
            const payload = JSON.parse(atob(authToken.split('.')[1])); // Decodificar payload
            const userRole = payload.role; // Rol del usuario del token
            configurarNavBar(userRole); // Configurar elementos según el rol
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            alert('Token inválido o expirado. Redirigiendo al login.');
            window.location.href = 'login.html'; // Redirigir al login
        }
    } else {
        console.warn('Usuario no autenticado');
        window.location.href = 'login.html'; // Redirigir al login si no hay token
    }

    // Manejar el formulario de inicio de sesión
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            try {
                const response = await login(email, password);
                if (response && response.token) {
                    // Guardar el token en localStorage
                    localStorage.setItem('authToken', response.token);
                    alert('Inicio de sesión exitoso');
                    window.location.href = 'index.html'; // Redirigir al inicio
                } else {
                    throw new Error('Credenciales inválidas');
                }
            } catch (error) {
                console.error(error);
                errorMessage.style.display = 'block'; // Mostrar mensaje de error
            }
        });
    }
});

/**
 * Configura el menú de navegación según el rol del usuario.
 * @param {string} role - Rol del usuario ('Administrador' o 'Auxiliar').
 */
function configurarNavBar(role) {
    const navEmpresas = document.getElementById('nav-empresas');
    const navUsuarios = document.getElementById('nav-usuarios');
    const currentPage = window.location.pathname; // Obtener la ruta actual

    // Si el usuario es auxiliar y está en las páginas de 'comprobantes', no mostrar Empresas ni Usuarios
    if (role === 'Auxiliar') {
        // Si estamos en la página de 'comprobantes.html', ocultar Empresas y Usuarios
        if (currentPage.includes('comprobantes.html')) {
            if (navEmpresas) navEmpresas.style.display = 'none';
            if (navUsuarios) navUsuarios.style.display = 'none';
        } else {
            // Si no estamos en 'comprobantes.html', seguir la lógica estándar
            if (navEmpresas) navEmpresas.style.display = 'none';
            if (navUsuarios) navUsuarios.style.display = 'none';
        }
    } else if (role === 'Administrador') {
        // Mostrar los elementos de la navegación para el Administrador
        if (navEmpresas) navEmpresas.style.display = 'block';
        if (navUsuarios) navUsuarios.style.display = 'block';
    }
}

