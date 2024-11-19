document.addEventListener('DOMContentLoaded', () => {
    const tablaUsuarios = document.getElementById('tablaUsuarios').querySelector('tbody');
    const formularioUsuario = document.getElementById('formularioUsuario');
    const usuarioForm = document.getElementById('usuarioForm');
    const btnAgregarUsuario = document.getElementById('btnAgregarUsuario');
    const btnCancelar = document.getElementById('btnCancelar');

    const apiBaseUrl = 'http://localhost:4000/api';

// Reemplaza las URLs relativas con esta variable
const apiUsuariosUrl = `${apiBaseUrl}/usuarios`;
const apiEmpresasUrl = `${apiBaseUrl}/empresas`;
    // Cargar usuarios
    async function cargarUsuarios() {
        const res = await fetch(apiUsuariosUrl);
        if (!res.ok) {
            console.error(`Error al cargar usuarios: ${res.statusText}`);
            return;
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
    }

    // Mostrar formulario para agregar o editar
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

    // Manejar envío del formulario
    usuarioForm.addEventListener('submit', async e => {
        e.preventDefault();
        const id = usuarioForm.usuarioId.value;
        const data = new FormData(usuarioForm);
        const method = id ? 'PUT' : 'POST';
        
        const url = id ? `${apiUsuariosUrl}/${id}` : apiUsuariosUrl;
        
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(data)),
        });
        if (res.ok) {
            formularioUsuario.style.display = 'none';
            cargarUsuarios();
        }
    });

    

    // Manejar edición y eliminación
    tablaUsuarios.addEventListener('click', async e => {
        const id = e.target.dataset.id; // El ID debe estar definido en el botón
        if (e.target.classList.contains('editar')) {
            try {
                const res = await fetch(`${apiUsuariosUrl}/${id}`);
                if (!res.ok) {
                    throw new Error(`Error ${res.status}: ${res.statusText}`);
                }
                const usuario = await res.json();
                mostrarFormulario('Editar Usuario', usuario);
            } catch (error) {
                console.error('Error al cargar usuario:', error);
                alert('No se pudo cargar el usuario. Verifique si existe.');
            }
        }

        
    });
    
    

    async function cargarEmpresas() {
        const res = await fetch(apiEmpresasUrl);
        if (!res.ok) {
            console.error(`Error al cargar empresas: ${res.statusText}`);
            return;
        }
        const empresas = await res.json();
        const select = document.getElementById('empresa');
        select.innerHTML = empresas.map(empresa => `
            <option value="${empresa.id}">${empresa.nombre}</option>
        `).join('');
    }
    

    // Botones de formulario
    btnAgregarUsuario.addEventListener('click', () => mostrarFormulario('Agregar Usuario'));
    btnCancelar.addEventListener('click', () => formularioUsuario.style.display = 'none');

    // Inicializar
    cargarUsuarios();
    cargarEmpresas();
});

