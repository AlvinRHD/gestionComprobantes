document.addEventListener('DOMContentLoaded', async () => {
    console.log('Frontend cargado correctamente');

    // Asegúrate de que el selector sea correcto.
    const companiesTable = document.querySelector('#companies-table');
    const addCompanyModal = document.getElementById('add-company-modal');
    const addCompanyForm = document.getElementById('add-company-form');
    const addCompanyBtn = document.getElementById('add-company-btn');
    const closeModalBtn = document.getElementById('close-modal');

    let editMode = false;
    let currentEditingId = null;

    async function loadEmpresas() {
        const empresas = await getEmpresas(); // Debes tener una función llamada `getEmpresas`.
        companiesTable.innerHTML = ''; // Asegúrate de limpiar correctamente el tbody.

        empresas.forEach(empresa => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-2 border border-gray-300">${empresa.nombre}</td>
                <td class="px-4 py-2 border border-gray-300">${empresa.tipo}</td>
                <td class="px-4 py-2 border border-gray-300">${empresa.direccion}</td>
                <td class="px-4 py-2 border border-gray-300">${empresa.telefono}</td>
                <td class="px-4 py-2 border border-gray-300">${empresa.correo}</td>
                <td class="px-4 py-2 border border-gray-300">
            <button class="edit-btn bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400" data-id="${empresa.id}">Editar</button>
            <button class="delete-btn bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400" data-id="${empresa.id}">Eliminar</button>
        </td>
            `;
            companiesTable.appendChild(row);
        });
    }

    async function populateEmpresaSelect() {
        const empresas = await getEmpresas();
        const empresaSelect = document.getElementById('reporte-empresa');
        empresaSelect.innerHTML = '';

        empresas.forEach(empresa => {
            const option = document.createElement('option');
            option.value = empresa.id;
            option.textContent = empresa.nombre;
            empresaSelect.appendChild(option);
        });
    }

    addCompanyBtn.addEventListener('click', () => {
        editMode = false;
        currentEditingId = null;
        addCompanyForm.reset();
        addCompanyModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        addCompanyForm.reset();
        addCompanyModal.style.display = 'none';
        editMode = false;
        currentEditingId = null;
    });

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
            const success = await updateEmpresa(currentEditingId, empresaData);
            if (success) alert('Empresa actualizada correctamente');
        } else {
            const newEmpresa = await CreateEmpresa(empresaData);
            if (newEmpresa) alert('Empresa creada correctamente');
        }

        addCompanyForm.reset();
        addCompanyModal.style.display = 'none';
        editMode = false;
        currentEditingId = null;

        loadEmpresas();
    });

    companiesTable.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const id = event.target.getAttribute('data-id');
            if (confirm('¿Estás seguro de eliminar esta empresa?')) {
                const success = await deleteEmpresa(id);
                if (success) loadEmpresas();
            }
        }
        if (event.target.classList.contains('edit-btn')) {
            const id = event.target.getAttribute('data-id');
            const empresas = await getEmpresas();
            const empresa = empresas.find(emp => emp.id == id);

            document.getElementById('company-nombre').value = empresa.nombre;
            document.getElementById('company-tipo').value = empresa.tipo;
            document.getElementById('company-direccion').value = empresa.direccion;
            document.getElementById('company-telefono').value = empresa.telefono;
            document.getElementById('company-correo').value = empresa.correo;

            editMode = true;
            currentEditingId = id;

            addCompanyModal.style.display = 'block';
        }
    });

    document.getElementById('generar-reporte-btn').addEventListener('click', async () => {
        const generarBtn = document.getElementById('generar-reporte-btn');
        generarBtn.textContent = 'Generando...';
        generarBtn.disabled = true;

        try {
            const empresaId = document.getElementById('reporte-empresa').value;
            const tipo = document.getElementById('reporte-tipo').value;
            const startDate = document.getElementById('reporte-fecha-inicio').value;
            const endDate = document.getElementById('reporte-fecha-fin').value;
            const format = document.getElementById('reporte-formato').value;

            if (!empresaId) {
                alert('Por favor, selecciona una empresa.');
                return;
            }
            if (!startDate || !endDate) {
                alert('Por favor, selecciona el periodo de tiempo.');
                return;
            }

            const url = `${API_URL}/empresas/reporte?empresaId=${empresaId}&tipo=${tipo}&startDate=${startDate}&endDate=${endDate}&format=${format}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            if (response.ok) {
                const blob = await response.blob();
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `reporte_${tipo}_${startDate}_${endDate}.${format === 'excel' ? 'xlsx' : 'pdf'}`;
                link.click();
            } else {
                alert('Error al generar el reporte');
            }
        } catch (error) {
            console.error('Error al generar el reporte:', error);
            alert('Ocurrió un error inesperado al generar el reporte.');
        } finally {
            generarBtn.textContent = 'Generar Reporte';
            generarBtn.disabled = false;
        }
    });

    await loadEmpresas();
    await populateEmpresaSelect();
});
