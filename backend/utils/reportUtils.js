const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

module.exports = {
     // Función para exportar a Excel
    exportToExcel: async (data) => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Reporte');

        // Título en la parte superior
        worksheet.mergeCells('A1:F1');
        worksheet.getCell('A1').value = 'Reporte de Comprobantes';
        worksheet.getCell('A1').font = { size: 18, bold: true };
        worksheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getCell('A1').border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        // Agregar encabezados
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Tipo', key: 'tipo', width: 20 },
            { header: 'Fecha', key: 'fecha', width: 15 },
            { header: 'Monto', key: 'monto', width: 15 },
            { header: 'Cliente/Proveedor', key: 'cliente_proveedor', width: 25 },
            { header: 'Empresa', key: 'empresa_nombre', width: 20 },
        ];

        // Estilo para los encabezados
        worksheet.getRow(2).font = { bold: true, size: 12 };
        worksheet.getRow(2).alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getRow(2).eachCell(cell => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDDDDDD' } }; // Fondo gris claro
        });

        // Agregar las filas con los datos
        data.forEach((row, index) => {
            const monto = !isNaN(row.monto) ? parseFloat(row.monto).toFixed(2) : 'N/A';

            const rowData = {
                id: row.id || '',
                tipo: row.tipo || 'N/A',
                fecha: row.fecha || 'N/A',
                monto: monto,
                cliente_proveedor: row.cliente_proveedor || 'N/A',
                empresa_nombre: row.empresa_nombre || 'N/A',
            };

            worksheet.addRow(rowData);
        });

        // Formato de las celdas de fecha
        worksheet.getColumn('fecha').numFmt = 'dd/mm/yyyy';
        
        // Formato de las celdas de monto
        worksheet.getColumn('monto').numFmt = '"$" #,##0.00';

        // Ajustar el tamaño de las filas para contenido
        worksheet.eachRow((row, rowNumber) => {
            row.height = 20;
        });

        // Agregar un pie de página en la última fila
        const totalRow = data.length + 2; // La fila después de los datos
        worksheet.mergeCells(`A${totalRow}:F${totalRow}`);
        worksheet.getCell(`A${totalRow}`).value = 'Este reporte fue generado automáticamente por el sistema.';
        worksheet.getCell(`A${totalRow}`).font = { italic: true, size: 10 };
        worksheet.getCell(`A${totalRow}`).alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getCell(`A${totalRow}`).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    },

    // Función para exportar a PDF
    exportToPDF: (data) => {
        return new Promise((resolve, reject) => {
            try {
                const doc = new PDFDocument({ margin: 50 });
                const buffers = [];

                doc.on('data', buffers.push.bind(buffers));
                doc.on('end', () => resolve(Buffer.concat(buffers)));

                // Encabezado general
                doc.image(__dirname + '/logo.png', { fit: [60, 60], align: 'left' })
                    .fontSize(18)
                    .text('Reporte de Comprobantes', { align: 'center' })
                    .moveDown(0.5);

                doc.fontSize(12)
                    .text('Sistema de Gestión Empresarial', { align: 'center', italic: true })
                    .moveDown(1);

                // Detalles del reporte
                if (data.length > 0) {
                    const empresaNombre = data[0].empresa_nombre || 'Sin Nombre';
                    const fechaInicio = data[0].fecha_inicio || 'N/A';
                    const fechaFin = data[0].fecha_fin || 'N/A';

                    doc.fontSize(12)
                        .text(`Empresa: ${empresaNombre}`, { align: 'left' })
                        .text(`Período: ${fechaInicio} al ${fechaFin}`, { align: 'left' })
                        .moveDown(1);

                    doc.fontSize(10)
                        .text(
                            'Este reporte contiene un listado detallado de los comprobantes registrados, incluyendo información sobre tipo, fecha y monto.',
                            { align: 'justify', lineGap: 2 }
                        )
                        .moveDown(1);
                } else {
                    doc.fontSize(12).text('No hay datos disponibles para este reporte.', { align: 'center' });
                    doc.end();
                    return;
                }

                // Encabezados de la tabla
                doc.fontSize(10)
                    .fillColor('black')
                    .text('No.'.padEnd(5) + 'Tipo'.padEnd(20) + 'Monto'.padEnd(15) + 'Fecha', { underline: true })
                    .moveDown(0.5);

                // Filas de la tabla
                data.forEach((item, index) => {
                    const tipo = item.tipo || 'N/A';
                    const monto = !isNaN(item.monto) ? parseFloat(item.monto).toFixed(2) : 'N/A';
                    const fecha = item.fecha instanceof Date
                        ? item.fecha.toLocaleDateString() // Convertir a formato legible si es un Date
                        : item.fecha || 'N/A'; // O usar "N/A" si no está disponible

                    doc.text(
                        `${String(index + 1).padEnd(5)}${tipo.padEnd(20)}${monto.padEnd(15)}${fecha}`,
                        { lineGap: 4 }
                    );
                });

                // Resumen o estadísticas (opcional)
                const total = data.reduce((sum, item) => sum + (parseFloat(item.monto) || 0), 0);
                doc.moveDown(2)
                    .fontSize(12)
                    .fillColor('blue')
                    .text(`Total Monto Registrado: ${total.toFixed(2)}`, { align: 'right' })
                    .moveDown(1);

                // Pie de página
                doc.moveDown(3)
                    .fontSize(10)
                    .fillColor('gray')
                    .text(
                        'Este reporte fue generado automáticamente por el sistema. Si tiene alguna consulta, por favor contacte al administrador.',
                        { align: 'center', lineGap: 2 }
                    );

                doc.end();
            } catch (error) {
                reject(error);
            }
        });
    },
};
