document.addEventListener('DOMContentLoaded', () => {
    const tablaUsuarios = document.getElementById('tablaUsuarios').querySelector('tbody');
    const formularioUsuario = document.getElementById('formularioUsuario');
    const usuarioForm = document.getElementById('usuarioForm');
    const btnAgregarUsuario = document.getElementById('btnAgregarUsuario');
    const btnCancelar = document.getElementById('btnCancelar');

    const apiBaseUrl = 'http://localhost:4000/api';
    const apiUsuariosUrl = `${apiBaseUrl}/usuarios`;
    const apiEmpresasUrl = `${apiBaseUrl}/empresas`;

    // Obtener el token desde localStorage
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
        console.error('No se encontró token de autenticación. Redirigiendo al login.');
        window.location.href = 'login.html'; // Redirigir al login si no hay token
        return;
    }

    // Configuración de headers con token
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
    };

    // Cargar usuarios
    async function cargarUsuarios() {
        try {
            const res = await fetch(apiUsuariosUrl, { headers });
            if (!res.ok) {
                throw new Error(`Error al cargar usuarios: ${res.statusText}`);
            }
            const usuarios = await res.json();

            tablaUsuarios.innerHTML = usuarios.map(usuario => `
                <tr>
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.correo}</td>
                    <td>${usuario.rol}</td>
                    <td>${usuario.empresa_id || 'N/A'}</td>
                    <td>
                        <button data-id="${usuario.id}" class="editar">Editar</button>
                        <button data-id="${usuario.id}" class="eliminar">Eliminar</button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            console.error(error);
            alert('Error al cargar usuarios.');
        }
    }

    // Manejar envío del formulario
    usuarioForm.addEventListener('submit', async e => {
        e.preventDefault();
        const id = usuarioForm.usuarioId.value;
        const data = Object.fromEntries(new FormData(usuarioForm));
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${apiUsuariosUrl}/${id}` : apiUsuariosUrl;

        try {
            const res = await fetch(url, {
                method,
                headers,
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                throw new Error(`Error al guardar usuario: ${res.statusText}`);
            }
            formularioUsuario.style.display = 'none';
            cargarUsuarios();
        } catch (error) {
            console.error(error);
            alert('Error al guardar el usuario.');
        }
    });

    // Manejar edición
    tablaUsuarios.addEventListener('click', async e => {
        if (e.target.classList.contains('editar')) {
            const id = e.target.dataset.id;
            try {
                const res = await fetch(`${apiUsuariosUrl}/${id}`, { headers });
                if (!res.ok) {
                    throw new Error(`Error al cargar usuario: ${res.statusText}`);
                }
                const usuario = await res.json();
                mostrarFormulario('Editar Usuario', usuario);
            } catch (error) {
                console.error(error);
                alert('No se pudo cargar el usuario.');
            }
        }
    });

    // Cargar empresas para el formulario
    async function cargarEmpresas() {
        try {
            const res = await fetch(apiEmpresasUrl, { headers });
            if (!res.ok) {
                throw new Error(`Error al cargar empresas: ${res.statusText}`);
            }
            const empresas = await res.json();
            const select = document.getElementById('empresa');
            select.innerHTML = empresas.map(empresa => `
                <option value="${empresa.id}">${empresa.nombre}</option>
            `).join('');
        } catch (error) {
            console.error(error);
        }
    }

    // Botones de formulario
    btnAgregarUsuario.addEventListener('click', () => mostrarFormulario('Agregar Usuario'));
    btnCancelar.addEventListener('click', () => formularioUsuario.style.display = 'none');

    // Inicializar
    cargarUsuarios();
    cargarEmpresas();

    // Mostrar formulario
    function mostrarFormulario(titulo, usuario = {}) {
        document.getElementById('formTitulo').textContent = titulo;
        formularioUsuario.style.display = 'block';
        usuarioForm.nombre.value = usuario.nombre || '';
        usuarioForm.correo.value = usuario.correo || '';
        usuarioForm.password.value = '';
        usuarioForm.rol.value = usuario.rol || 'Auxiliar';
        usuarioForm.empresa.value = usuario.empresa_id || '';
        usuarioForm.usuarioId.value = usuario.id || '';
    }
});
