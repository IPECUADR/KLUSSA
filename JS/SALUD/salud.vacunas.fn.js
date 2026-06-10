// JS/SALUD/salud.vacunas.fn.js
document.addEventListener('DOMContentLoaded', function () {
    cargarVacunasSalud();

    const inputBuscar = document.getElementById('buscarVacuna');

    if (inputBuscar) {
        inputBuscar.addEventListener('keyup', filtrarVacunas);
    }
});

// Función para cargar las vacunas desde el servidor
async function cargarVacunasSalud() {
    const tbody = document.getElementById('contenidoVacunas');
    const alerta = document.getElementById('alertaVacunas');

    try {
        const respuesta = await fetch('../DATABASE/SALUD/vacunas_listar.php', {
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
                    <td colspan="12" class="text-center text-muted">
                        No existen vacunas registradas.
                    </td>
                </tr>
            `;
            return;
        }

        let contador = 1;

        json.data.forEach(function (item) {
            const paciente = `${item.nombre_prs ?? ''} ${item.apellido_ps ?? ''}`.trim();
            const estadoHtml = obtenerEstadoVacunaHtml(item.estado_vacuna);
            const evidenciaHtml = obtenerEvidenciaVacunaHtml(item.evidencia_vc);

            const fila = `
                <tr>
                    <td>${contador}</td>
                    <td>${escaparHtml(item.hcl_num)}</td>
                    <td>${escaparHtml(paciente)}</td>
                    <td>${escaparHtml(item.ci_prs)}</td>
                    <td>${escaparHtml(item.cargo)}</td>
                    <td>${escaparHtml(item.agencia_ag)}</td>
                    <td>${escaparHtml(item.t_vacuna)}</td>
                    <td>${escaparHtml(item.Dosis)}</td>
                    <td>${escaparHtml(item.Marca)}</td>
                    <td>${escaparHtml(item.fc_vc)}</td>
                    <td>${evidenciaHtml}</td>
                    <td>${estadoHtml}</td>
                </tr>
            `;

            tbody.insertAdjacentHTML('beforeend', fila);
            contador++;
        });

    } catch (error) {
        console.error(error);

        tbody.innerHTML = `
            <tr>
                <td colspan="12" class="text-center text-danger">
                    Error al cargar vacunas.
                </td>
            </tr>
        `;
    }
}

// Función para filtrar las vacunas en la tabla
function filtrarVacunas() {
    const input = document.getElementById('buscarVacuna');

    if (!input) {
        return;
    }

    const texto = input.value.toLowerCase();
    const filas = document.querySelectorAll('#contenidoVacunas tr');

    filas.forEach(function (fila) {
        const contenido = fila.textContent.toLowerCase();

        if (contenido.includes(texto)) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
}

// Función para obtener el HTML del estado de la vacuna
function obtenerEstadoVacunaHtml(estado) {
    const estadoNormalizado = String(estado || '').trim().toUpperCase();

    if (estadoNormalizado === 'EJECUTADO') {
        return '<span class="badge bg-success">EJECUTADO</span>';
    }

    if (estadoNormalizado === 'PROGRAMADO') {
        return '<span class="badge bg-info text-dark">PROGRAMADO</span>';
    }

    if (estadoNormalizado === 'ELIMINADO') {
        return '<span class="badge bg-danger">ELIMINADO</span>';
    }

    return `<span class="badge bg-secondary">${escaparHtml(estado)}</span>`;
}

// Función para obtener el HTML del enlace de evidencia de la vacuna
function obtenerEvidenciaVacunaHtml(evidencia) {
    const ruta = evidencia ? String(evidencia).trim() : '';

    if (ruta === '') {
        return 'Pendiente';
    }

    return `
        " target="_blank" rel="noopener" class="btn btn-sm btn-outline-success">
            Ver evidencia
        </a>
    `;
}

// Función para escapar caracteres HTML y evitar vulnerabilidades XSS
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

// Función para escapar caracteres en atributos HTML
function escaparAtributo(valor) {
    if (valor === null || valor === undefined) {
        return '';
    }

    return String(valor)
        .replaceAll('&', '&amp;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
}