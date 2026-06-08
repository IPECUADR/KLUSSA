document.addEventListener('DOMContentLoaded', function () {
    cargarPacientesSalud();

    const inputBuscar = document.getElementById('buscarPaciente');
    if (inputBuscar) {
        inputBuscar.addEventListener('keyup', filtrarPacientes);
    }
});

async function cargarPacientesSalud() {
    const tbody = document.getElementById('contenidoPacientes');
    const alerta = document.getElementById('alertaPacientes');

    try {
        const respuesta = await fetch('../DATABASE/SALUD/pacientes_listar.php', {
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
                    <td colspan="13" class="text-center text-muted">
                        No existen pacientes registrados.
                    </td>
                </tr>
            `;
            return;
        }

        let contador = 1;

        json.data.forEach(function (item) {
            const estadoClase = parseInt(item.FK_est_p) === 1
                ? 'badge bg-success'
                : 'badge bg-danger';

            const fila = `
                <tr>
                    <td>${contador}</td>
                    <td>${escaparHtml(item.hcl_num)}</td>
                    <td>${escaparHtml(item.nombre_prs)}</td>
                    <td>${escaparHtml(item.apellido_ps)}</td>
                    <td>${escaparHtml(item.ci_prs)}</td>
                    <td>${escaparHtml(item.agencia_ag)}</td>
                    <td>${escaparHtml(item.fc_nan_prc)}</td>
                    <td>${escaparHtml(item.edad_prs)}</td>
                    <td>${escaparHtml(item.sexo_p)}</td>
                    <td>${escaparHtml(item.cargo)}</td>
                    <td>${escaparHtml(item.g_atencion)}</td>
                    <td>${escaparHtml(item.g_sanginio)}</td>
                    <td>
                        <span class="${estadoClase}">
                            ${escaparHtml(item.est_p)}
                        </span>
                    </td>
                </tr>
            `;

            tbody.insertAdjacentHTML('beforeend', fila);
            contador++;
        });

    } catch (error) {
        console.error(error);

        tbody.innerHTML = `
            <tr>
                <td colspan="13" class="text-center text-danger">
                    Error al cargar pacientes.
                </td>
            </tr>
        `;
    }
}

function filtrarPacientes() {
    const texto = document.getElementById('buscarPaciente').value.toLowerCase();
    const filas = document.querySelectorAll('#contenidoPacientes tr');

    filas.forEach(function (fila) {
        const contenido = fila.textContent.toLowerCase();

        if (contenido.includes(texto)) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
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