document.addEventListener('DOMContentLoaded', () => {
    console.log('Frontend cargado correctamente');

    const companiesTable = document.getElementById('companies-table').getElementsByTagName('tbody')[0];
    const addCompanyModal = document.getElementById('add-company-modal');
    const addCompanyForm = document.getElementById('add-company-form');
    const addCompanyBtn = document.getElementById('add-company-btn');
    const closeModalBtn = document.getElementById('close-modal');

    let editMode = false; // Variable para distinguir entre crear y editar
    let currentEditingId = null; // ID de la empresa en edición

    // Cargar las empresas
    async function loadEmpresas() {
        const empresas = await getEmpresas();
        companiesTable.innerHTML = ''; // Limpiar la tabla

        empresas.forEach(empresa => {
            const row = companiesTable.insertRow();
            row.innerHTML = `
                <td>${empresa.nombre}</td>
                <td>${empresa.tipo}</td>
                <td>${empresa.direccion}</td>
                <td>${empresa.telefono}</td>
                <td>${empresa.correo}</td>
                <td>
                    <button class="edit-btn" data-id="${empresa.id}">Editar</button>
                    <button class="delete-btn" data-id="${empresa.id}">Eliminar</button>
                </td>
            `;
        });
    }

    // Abrir el modal para agregar empresa
    addCompanyBtn.addEventListener('click', () => {
        editMode = false; // Modo de creación
        currentEditingId = null; // Sin ID en edición
        addCompanyForm.reset(); // Limpiar el formulario
        addCompanyModal.style.display = 'block';
    });

    // Cerrar el modal y reiniciar el formulario
    closeModalBtn.addEventListener('click', () => {
        addCompanyForm.reset();
        addCompanyModal.style.display = 'none';
        editMode = false;
        currentEditingId = null;
    });

    // Agregar o editar una empresa
    addCompanyForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const empresaData = {
            nombre: document.getElementById('company-nombre').value,
            tipo: document.getElementById('company-tipo').value,
            direccion: document.getElementById('company-direccion').value,
            telefono: document.getElementById('company-telefono').value,
            correo: document.getElementById('company-correo').value,
        };

        if (editMode) {
            // Actualizar la empresa existente
            const success = await updateEmpresa(currentEditingId, empresaData);
            if (success) {
                alert('Empresa actualizada correctamente');
            }
        } else {
            // Crear una nueva empresa
            const newEmpresa = await CreateEmpresa(empresaData);
            if (newEmpresa) {
                alert('Empresa creada correctamente');
            }
        }

        // Reiniciar el estado del formulario y cerrar el modal
        addCompanyForm.reset();
        addCompanyModal.style.display = 'none';
        editMode = false;
        currentEditingId = null;

        // Recargar las empresas
        loadEmpresas();
    });

    // Eliminar una empresa
    companiesTable.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const id = event.target.getAttribute('data-id');
            const confirmed = confirm('¿Estás seguro de eliminar esta empresa?');
            if (confirmed) {
                const success = await deleteEmpresa(id);
                if (success) {
                    loadEmpresas(); // Recargar las empresas
                }
            }
        }
    });

    // Editar una empresa
    companiesTable.addEventListener('click', async (event) => {
        if (event.target.classList.contains('edit-btn')) {
            const id = event.target.getAttribute('data-id');

            // Obtener la empresa actual
            const empresas = await getEmpresas();
            const empresa = empresas.find(emp => emp.id == id);

            // Rellenar el formulario con los datos actuales
            document.getElementById('company-nombre').value = empresa.nombre;
            document.getElementById('company-tipo').value = empresa.tipo;
            document.getElementById('company-direccion').value = empresa.direccion;
            document.getElementById('company-telefono').value = empresa.telefono;
            document.getElementById('company-correo').value = empresa.correo;

            // Cambiar a modo edición
            editMode = true;
            currentEditingId = id;

            // Mostrar el modal
            addCompanyModal.style.display = 'block';
        }
    });

    // Inicializar la carga de empresas
    loadEmpresas();
});
