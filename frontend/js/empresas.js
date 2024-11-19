document.addEventListener('DOMContentLoaded', () => {
    console.log('Fronted cargado correctamente');

    const companiesTable = document.getElementById('companies-table').getElementsByTagName('tbody')[0];
    const addCompanyModal = document.getElementById('add-company-modal');
    const addCompanyForm = document.getElementById('add-company-form');
    const addCompanyBtn = document.getElementById('add-company-btn');
    const closeModalBtn = document.getElementById('close-modal');

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
                    <button class="delete-btn" data-id="${empresa.id}">Eliminar</button>
                </td>
            `;
        });
    }

    // Abrir el modal para agregar empresa
    addCompanyBtn.addEventListener('click', () => {
        addCompanyModal.style.display = 'block';
    });

    // Cerrar el modal
    closeModalBtn.addEventListener('click', () => {
        addCompanyModal.style.display = 'none';
    });

    // Agregar una nueva empresa
    addCompanyForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const newEmpresa = {
            nombre: document.getElementById('company-nombre').value,
            tipo: document.getElementById('company-tipo').value,
            direccion: document.getElementById('company-direccion').value,
            telefono: document.getElementById('company-telefono').value,
            correo: document.getElementById('company-correo').value,
        };

        const empresa = await CreateEmpresa(newEmpresa);
        if (empresa) {
            addCompanyModal.style.display = 'none';
            loadEmpresas(); // Recargar las empresas
        }
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

    // Inicializar la carga de empresas
    loadEmpresas();
});