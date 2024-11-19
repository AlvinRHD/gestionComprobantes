document.addEventListener('DOMContentLoaded', async () => {
    const comprobantesTable = document.getElementById('comprobantes-table').getElementsByTagName('tbody')[0];
    const addComprobanteModal = document.getElementById('add-comprobante-modal');
    const addComprobanteForm = document.getElementById('add-comprobante-form');
    const addComprobanteBtn = document.getElementById('add-comprobante-btn');
    const closeComprobanteModalBtn = document.getElementById('close-comprobante-modal');
    const comprobanteTypeSelector = document.getElementById('comprobante-type-selector');

    // Cargar los comprobantes según el tipo
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
                 <button class="edit-btn" data-id="${comprobante.id}">Editar</button>
                    <button class="delete-btn" data-id="${comprobante.id}">Eliminar</button>
                </td>
            `;
        });
    }

    // Abrir el modal para agregar comprobante
    addComprobanteBtn.addEventListener('click', () => {
        addComprobanteModal.style.display = 'block';
    });

    // Cerrar el modal
    closeComprobanteModalBtn.addEventListener('click', () => {
        addComprobanteModal.style.display = 'none';
    });

    // Agregar un nuevo comprobante
    addComprobanteForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const newComprobante = {
            tipo: document.getElementById('comprobante-tipo').value,
            numero: document.getElementById('comprobante-numero').value,
            fecha: document.getElementById('comprobante-fecha').value,
            monto: parseFloat(document.getElementById('comprobante-monto').value), 
            cliente_proveedor: document.getElementById('comprobante-cliente_proveedor').value,
            archivo_pdf: "",
            archivo_json: "",
            empresa_id: document.getElementById('empresa-id').value
        };

        console.log('Datos enviados:', newComprobante);  // Verifica los datos que se están enviando

        const comprobante = await CreateComprobante(newComprobante);
        if (comprobante) {
            addComprobanteModal.style.display = 'none';
            loadComprobantes(); // Recargar los comprobantes
        }
    });

    // Eliminar un comprobante
    comprobantesTable.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const id = event.target.getAttribute('data-id');
            const confirmed = confirm('¿Estás seguro de eliminar este comprobante?');
            if (confirmed) {
                const success = await deleteComprobante(id);
                if (success) {
                    loadComprobantes(); // Recargar los comprobantes
                }
            }
        }
    });


    // Editar un comprobante
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

        // Cambiar el comportamiento del formulario para "Editar"
        addComprobanteForm.onsubmit = async (e) => {
            e.preventDefault();

            const updatedComprobante = {
                tipo: document.getElementById('comprobante-tipo').value,
                numero: document.getElementById('comprobante-numero').value,
                fecha: document.getElementById('comprobante-fecha').value,
                monto: parseFloat(document.getElementById('comprobante-monto').value),
                cliente_proveedor: document.getElementById('comprobante-cliente_proveedor').value,
                empresa_id: document.getElementById('empresa-id').value,
            };

            // Llamar a la función de actualización
            const success = await updateComprobante(id, updatedComprobante);

            if (success) {
                addComprobanteModal.style.display = 'none';
                loadComprobantes(); // Recargar la tabla
            }
        };

        // Abrir el modal
        addComprobanteModal.style.display = 'block';
    }
});


    // Cambiar el tipo de comprobante y cargarlo
    comprobanteTypeSelector.addEventListener('change', loadComprobantes);

    // Inicializar la carga de comprobantes
    loadComprobantes();
});
