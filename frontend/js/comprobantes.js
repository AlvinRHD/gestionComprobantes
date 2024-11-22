document.addEventListener('DOMContentLoaded', async () => {
    const comprobantesTable = document.getElementById('comprobantes-table').getElementsByTagName('tbody')[0];
    const addComprobanteModal = document.getElementById('add-comprobante-modal');
    const addComprobanteForm = document.getElementById('add-comprobante-form');
    const addComprobanteBtn = document.getElementById('add-comprobante-btn');
    const closeComprobanteModalBtn = document.getElementById('close-comprobante-modal');
    const comprobanteTypeSelector = document.getElementById('comprobante-type-selector');

    let isProcessing = false;

    // ** Evento global para manejar el envío del formulario **
    addComprobanteForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evitar recarga automática del formulario

        if (isProcessing) return; // Si ya se está procesando, salir
        isProcessing = true; // Establecer como procesado

        // Captura los valores del formulario
        const newComprobante = {
            tipo: document.getElementById('comprobante-tipo').value,
            numero: document.getElementById('comprobante-numero').value,
            fecha: document.getElementById('comprobante-fecha').value,
            monto: parseFloat(document.getElementById('comprobante-monto').value),
            cliente_proveedor: document.getElementById('comprobante-cliente_proveedor').value,
            empresa_id: document.getElementById('empresa-id').value,
        };

        // Crea una instancia de FormData
        const formData = new FormData();

        // Agregar datos del formulario al FormData
        for (const key in newComprobante) {
            formData.append(key, newComprobante[key]);
        }

        // Agregar archivos al FormData (si existen)
        const archivo_pdf = document.getElementById('archivo_pdf').files[0];
        const archivo_json = document.getElementById('archivo_json').files[0];

        if (archivo_pdf) formData.append('archivo_pdf', archivo_pdf);
        if (archivo_json) formData.append('archivo_json', archivo_json);

        // Depuración: Verifica el contenido de FormData antes de enviarlo
        console.log('Contenido de FormData:');
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]); // pair[1] mostrará el valor (archivo o dato)
        }

        try {
            // Envía los datos al servidor
            const response = await fetch(`${API_URL}/comprobantes`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Si tu sistema usa autenticación
                },
                body: formData, // FormData maneja los datos y archivos
            });

            // Manejo de errores del servidor
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error del servidor:', errorData);
                throw new Error(errorData.message || 'Error desconocido al agregar el comprobante');
            }

            // Respuesta exitosa del servidor
            const comprobante = await response.json();
            alert('Comprobante agregado exitosamente');
            console.log('Comprobante agregado:', comprobante);
            loadComprobantes(); // Recarga la tabla

        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('No se pudo agregar el comprobante');
        } finally {
            isProcessing = false; // Restablecer el indicador de procesamiento
        }
    });

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

    // ** Función para editar un comprobante existente **
    async function editarComprobante(id) {
        const updatedComprobante = {
            tipo: document.getElementById('comprobante-tipo').value,
            numero: document.getElementById('comprobante-numero').value,
            fecha: document.getElementById('comprobante-fecha').value,
            monto: parseFloat(document.getElementById('comprobante-monto').value),
            cliente_proveedor: document.getElementById('comprobante-cliente_proveedor').value,
            empresa_id: document.getElementById('empresa-id').value,
        };

        const success = await updateComprobante(id, updatedComprobante);
        if (success) {
            addComprobanteModal.style.display = 'none';
            loadComprobantes();
        }
    }

    // ** Evento: Abrir modal para editar un comprobante **
    comprobantesTable.addEventListener('click', async (event) => {
        if (event.target.classList.contains('edit-btn')) {
            const id = event.target.getAttribute('data-id');

            // Obtener datos del comprobante actual
            const comprobantes = await getComprobantes();
            const comprobante = comprobantes.find(comp => comp.id == id);

            if (!comprobante) {
                alert('No se encontró el comprobante');
                return;
            }

            // Rellenar el formulario con los datos del comprobante
            document.getElementById('comprobante-tipo').value = comprobante.tipo;
            document.getElementById('comprobante-numero').value = comprobante.numero;
            document.getElementById('comprobante-fecha').value = comprobante.fecha;
            document.getElementById('comprobante-monto').value = comprobante.monto;
            document.getElementById('comprobante-cliente_proveedor').value = comprobante.cliente_proveedor;
            document.getElementById('empresa-id').value = comprobante.empresa_id;

            // Cambiar el comportamiento del formulario a "Editar"
            addComprobanteForm.onsubmit = (e) => {
                e.preventDefault();
                editarComprobante(id);
            };

            // Abrir el modal
            addComprobanteModal.style.display = 'block';
        }
    });

    // ** Evento: Abrir modal para agregar comprobante **
    addComprobanteBtn.addEventListener('click', () => {
        addComprobanteForm.reset(); // Limpia el formulario
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
                if (success) {
                    loadComprobantes();
                }
            }
        }
    });

    // ** Evento: Cambiar el tipo de comprobante y cargarlo **
    comprobanteTypeSelector.addEventListener('change', loadComprobantes);

    // ** Inicializar la carga de comprobantes **
    loadComprobantes();
});
