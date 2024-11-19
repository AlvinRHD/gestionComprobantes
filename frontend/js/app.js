document.addEventListener('DOMContentLoaded', () => {
    console.log('Fronted cargado correctamente');


    





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


