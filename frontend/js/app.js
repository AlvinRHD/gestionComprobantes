document.addEventListener('DOMContentLoaded', () => {
    console.log('Frontend cargado correctamente');

    const currentPage = window.location.pathname; // Obtener la página actual
    const authToken = localStorage.getItem('authToken');

    // Evitar bucle infinito en login.html
    if (currentPage.includes('login.html')) {
        if (authToken) {
            // Si el token está presente, redirigir al inicio
            window.location.href = 'index.html';
        }

        // Manejar el formulario de inicio de sesión
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', async (event) => {
                event.preventDefault(); // Evitar el envío predeterminado del formulario

                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const errorMessage = document.getElementById('error-message');

                try {
                    const response = await login(email, password); // Llama a la función login
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

        // Permitir que el usuario permanezca en login.html
        return;
    }

    // Si no hay token y no estamos en login.html, redirigir al login
    if (!authToken) {
        console.warn('Usuario no autenticado');
        window.location.href = 'login.html';
        return;
    }

    try {
        // Decodificar el token para obtener el rol
        const payload = JSON.parse(atob(authToken.split('.')[1])); // Decodificar payload
        const userRole = payload.role; // Rol del usuario del token
        configurarNavBar(userRole); // Configurar elementos según el rol
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        alert('Token inválido o expirado. Redirigiendo al login.');
        localStorage.removeItem('authToken'); // Eliminar token inválido
        window.location.href = 'login.html'; // Redirigir al login
    }


    function logout() {
        // Eliminar el token de localStorage
        localStorage.removeItem('authToken');
        alert('Sesión cerrada exitosamente');
        // Redirigir al login
        window.location.href = 'login.html';
    }

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
    
});



/**
 * Configura el menú de navegación según el rol del usuario.
 * @param {string} role - Rol del usuario ('Administrador' o 'Auxiliar').
 */
function configurarNavBar(role) {
    const navEmpresas = document.getElementById('nav-empresas');
    const navUsuarios = document.getElementById('nav-usuarios');
    const usuariosSection = document.getElementById('usuarios-section'); // Sección de usuarios
    const empresasSection = document.getElementById('empresas-section');
    const currentPage = window.location.pathname; // Obtener la ruta actual

    // Si el usuario es auxiliar y está en las páginas de 'comprobantes', no mostrar Empresas ni Usuarios
    if (role === 'Auxiliar') {
        // Si estamos en la página de 'comprobantes.html', ocultar Empresas y Usuarios
        if (currentPage.includes('comprobantes.html')) {
            if (navEmpresas) navEmpresas.style.display = 'none';
            if (navUsuarios) navUsuarios.style.display = 'none';
            if (usuariosSection) usuariosSection.classList.add('hidden'); // Ocultar sección de usuarios
            if (empresasSection) empresasSection.classList.add('hidden');
        } else {
            // Si no estamos en 'comprobantes.html', seguir la lógica estándar
            if (navEmpresas) navEmpresas.style.display = 'none';
            if (navUsuarios) navUsuarios.style.display = 'none';
            if (usuariosSection) usuariosSection.classList.add('hidden'); // Ocultar sección de usuarios
            if (empresasSection) empresasSection.classList.add('hidden'); 
        }
    } else if (role === 'Administrador') {
        // Mostrar los elementos de la navegación para el Administrador
        if (navEmpresas) navEmpresas.style.display = 'block';
        if (navUsuarios) navUsuarios.style.display = 'block';
        if (usuariosSection) usuariosSection.classList.remove('hidden'); // Mostrar sección de usuarios
        if (empresasSection) empresasSection.classList.remove('hidden');
    }
}

