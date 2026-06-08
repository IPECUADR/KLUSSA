document.addEventListener('DOMContentLoaded', function () {
    cargarExamenesSalud();

    const inputBuscar = document.getElementById('buscarExamen');

    if (inputBuscar) {
        inputBuscar.addEventListener('keyup', filtrarExamenes);
    }
});

async function cargarExamenesSalud() {
    const tbody = document.getElementById('contenidoExamenes');
    const alerta = document.getElementById('alertaExamenes');

    try {
        const respuesta = await fetch('../DATABASE/SALUD/examenes_listar.php', {
            method: 'GET'
        });

        const json = await respuesta.json();

        tbody.innerHTML = '';

        if (json.err) {
            alerta.innerHTML = `
                <div class="alert alert-warning">
                    ${json.mensaje}
                </div>
            `;
            return;
        }

        if (!json.data || json.data.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="14" class="text-center text-muted">
                        No existen exámenes registrados.
                    </td>
                </tr>
            `;
            return;
        }

        let contador = 1;

        json.data.forEach(function (item) {
            const paciente = `${item.nombre_prs ?? ''} ${item.apellido_ps ?? ''}`.trim();

            const claseEstado = obtenerClaseEstadoExamen(item.estado_exam);

            const resultado = item.resultado_exam && item.resultado_exam.trim() !== ''
                ? item.resultado_exam
                : 'Pendiente';

            const valoracion = item.v_medica && item.v_medica.trim() !== ''
                ? item.v_medica
                : 'Pendiente';

            const certificado = item.cal_cert_exam && item.cal_cert_exam.trim() !== ''
                ? item.cal_cert_exam
                : 'Pendiente';

            const fila = `
                <tr>
                    <td>${contador}</td>
                    <td>${escaparHtml(item.hcl_num)}</td>
                    <td>${escaparHtml(paciente)}</td>
                    <td>${escaparHtml(item.ci_prs)}</td>
                    <td>${escaparHtml(item.cargo)}</td>
                    <td>${escaparHtml(item.agencia_ag)}</td>
                    <td>${escaparHtml(item.tp_examen)}</td>
                    <td>${escaparHtml(item.fc_prog_exam)}</td>
                    <td>${escaparHtml(item.an_prog)}</td>
                    <td>
                        <span class="${claseEstado}">
                            ${escaparHtml(item.estado_exam)}
                        </span>
                    </td>
                    <td>${escaparHtml(item.valor_vrd_ex)}</td>
                    <td>${escaparHtml(resultado)}</td>
                    <td>${escaparHtml(valoracion)}</td>
                    <td>${escaparHtml(certificado)}</td>
                </tr>
            `;

            tbody.insertAdjacentHTML('beforeend', fila);
            contador++;
        });

    } catch (error) {
        console.error(error);

        tbody.innerHTML = `
            <tr>
                <td colspan="14" class="text-center text-danger">
                    Error al cargar exámenes.
                </td>
            </tr>
        `;
    }
}

function filtrarExamenes() {
    const input = document.getElementById('buscarExamen');

    if (!input) {
        return;
    }

    const texto = input.value.toLowerCase();
    const filas = document.querySelectorAll('#contenidoExamenes tr');

    filas.forEach(function (fila) {
        const contenido = fila.textContent.toLowerCase();

        if (contenido.includes(texto)) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
}

function obtenerClaseEstadoExamen(estado) {
    const estadoNormalizado = String(estado || '').trim().toUpperCase();

    if (estadoNormalizado.includes('EJECUTADO')) {
        return 'badge bg-success';
    }

    if (estadoNormalizado.includes('VENCIDO')) {
        return 'badge bg-danger';
    }

    if (estadoNormalizado.includes('ALERTA')) {
        return 'badge bg-warning text-dark';
    }

    if (estadoNormalizado.includes('AGENDADO')) {
        return 'badge bg-info text-dark';
    }

    if (estadoNormalizado.includes('PROCESO')) {
        return 'badge bg-primary';
    }

    if (estadoNormalizado.includes('TIEMPO')) {
        return 'badge bg-success';
    }

    return 'badge bg-secondary';
}

function escaparHtml(valor) {
    if (valor === null || valor === undefined) {
        return '';
    }

    return String(valor)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}