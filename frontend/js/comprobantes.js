document.addEventListener('DOMContentLoaded', async () => {
    const comprobantesTable = document.getElementById('comprobantes-table').getElementsByTagName('tbody')[0];
    const addComprobanteModal = document.getElementById('add-comprobante-modal');
    const addComprobanteForm = document.getElementById('add-comprobante-form');
    const addComprobanteBtn = document.getElementById('add-comprobante-btn');
    const closeComprobanteModalBtn = document.getElementById('close-comprobante-modal');
    const comprobanteTypeSelector = document.getElementById('comprobante-type-selector');

    // ** Función para cargar comprobantes **
    async function loadComprobantes() {
        const tipo = comprobanteTypeSelector.value;
        const comprobantes = await getComprobantes(tipo);
        comprobantesTable.innerHTML = ''; // Limpiar la tabla

        comprobantes.forEach(comprobante => {
            const row = comprobantesTable.insertRow();
            row.innerHTML = `
                <td>${comprobante.tipo}</td>
                <td>${comprobante.numero}</td>
                <td>${comprobante.fecha}</td>
                <td>${comprobante.monto}</td>
                <td>${comprobante.cliente_proveedor}</td>
                <td>
                    ${comprobante.archivo_pdf ? `<a href="${API_URL}/comprobantes/download/${comprobante.archivo_pdf}" target="_blank">Ver PDF</a>` : ''}
                    ${comprobante.archivo_json ? `<a href="${API_URL}/comprobantes/download/${comprobante.archivo_json}" target="_blank">Ver JSON</a>` : ''}
                </td>
                <td>
                    <button class="edit-btn" data-id="${comprobante.id}">Editar</button>
                    <button class="delete-btn" data-id="${comprobante.id}">Eliminar</button>
                </td>
            `;
        });
    }

    // ** Función para agregar un comprobante **
    async function agregarComprobante(formData) {
        try {
            const response = await fetch(`${API_URL}/comprobantes`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: formData,
            });

            if (!response.ok) throw new Error('Error al agregar el comprobante');

            alert('Comprobante agregado exitosamente');
            loadComprobantes(); // Recarga la tabla
        } catch (error) {
            console.error('Error al agregar comprobante:', error);
            alert('No se pudo agregar el comprobante');
        }
    }

    // ** Función para editar un comprobante **
    async function editarComprobante(id, formData) {
        try {
            const response = await fetch(`${API_URL}/comprobantes/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: formData,
            });

            if (!response.ok) throw new Error('Error al actualizar el comprobante');

            alert('Comprobante actualizado exitosamente');
            loadComprobantes();
        } catch (error) {
            console.error('Error al editar comprobante:', error);
            alert('No se pudo actualizar el comprobante');
        }
    }

    // ** Evento global para manejar el envío del formulario **
    addComprobanteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const formData = new FormData(addComprobanteForm);
    
        // Remover archivos vacíos
        if (formData.get('archivo_pdf').size === 0) {
            formData.delete('archivo_pdf');
        }
        if (formData.get('archivo_json').size === 0) {
            formData.delete('archivo_json');
        }
    
        console.log('Datos en el FormData después de limpiar archivos vacíos:');
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }
    
        const isEdit = addComprobanteForm.dataset.action === 'edit';
        const id = addComprobanteForm.dataset.id;
    
        if (isEdit) {
            await editarComprobante(id, formData);
        } else {
            await agregarComprobante(formData);
        }
    
        addComprobanteModal.style.display = 'none'; // Cierra el modal
    });
    

    // ** Evento: Abrir modal para editar un comprobante **
    comprobantesTable.addEventListener('click', async (event) => {
        if (event.target.classList.contains('edit-btn')) {
            const id = event.target.getAttribute('data-id');
            try {
                const comprobantes = await getComprobantes();
                const comprobante = comprobantes.find(comp => comp.id == id);

                if (!comprobante) {
                    alert('No se encontró el comprobante');
                    return;
                }

                // Rellenar los campos del formulario
                document.getElementById('comprobante-tipo').value = comprobante.tipo;
                document.getElementById('comprobante-numero').value = comprobante.numero;
                document.getElementById('comprobante-fecha').value = comprobante.fecha;
                document.getElementById('comprobante-monto').value = comprobante.monto;
                document.getElementById('comprobante-cliente_proveedor').value = comprobante.cliente_proveedor;
                document.getElementById('empresa-id').value = comprobante.empresa_id;

                // Mostrar enlaces de archivos existentes
                document.getElementById('archivo_pdf_link').innerHTML = comprobante.archivo_pdf
                    ? `<a href="${API_URL}/comprobantes/download/${comprobante.archivo_pdf}" target="_blank">Ver PDF existente</a>`
                    : 'No hay PDF asociado';

                document.getElementById('archivo_json_link').innerHTML = comprobante.archivo_json
                    ? `<a href="${API_URL}/comprobantes/download/${comprobante.archivo_json}" target="_blank">Ver JSON existente</a>`
                    : 'No hay JSON asociado';

                // Configurar formulario para edición
                addComprobanteForm.dataset.action = 'edit';
                addComprobanteForm.dataset.id = id;

                addComprobanteModal.style.display = 'block'; // Abre el modal
            } catch (error) {
                console.error('Error al cargar comprobante:', error);
            }
        }
    });




    // ** Evento: Abrir modal para agregar comprobante **
    addComprobanteBtn.addEventListener('click', () => {
        addComprobanteForm.reset(); // Limpia el formulario
        delete addComprobanteForm.dataset.action;
        delete addComprobanteForm.dataset.id;
        document.getElementById('archivo_pdf_link').innerHTML = '';
        document.getElementById('archivo_json_link').innerHTML = '';
        addComprobanteModal.style.display = 'block';
    });

    // ** Evento: Cerrar el modal **
    closeComprobanteModalBtn.addEventListener('click', () => {
        addComprobanteModal.style.display = 'none';
    });

    // ** Evento: Eliminar un comprobante **
    comprobantesTable.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const id = event.target.getAttribute('data-id');
            const confirmed = confirm('¿Estás seguro de eliminar este comprobante?');
            if (confirmed) {
                const success = await deleteComprobante(id);
                if (success) loadComprobantes();
            }
        }
    });

    // ** Evento: Cambiar el tipo de comprobante y cargarlo **
    comprobanteTypeSelector.addEventListener('change', loadComprobantes);

    // ** Inicializar la carga de comprobantes **
    loadComprobantes();
});
