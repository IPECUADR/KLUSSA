document.addEventListener('DOMContentLoaded', function () {
    cargarPacientesSalud();

    const inputBuscar = document.getElementById('buscarPaciente');
    if (inputBuscar) {
        inputBuscar.addEventListener('keyup', filtrarPacientes);
    }

    const btnNuevoPaciente = document.getElementById('btnNuevoPaciente');
    if (btnNuevoPaciente) {
        btnNuevoPaciente.addEventListener('click', abrirModalNuevoPaciente);
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

// Función para abrir el modal de nuevo paciente

async function abrirModalNuevoPaciente() {
    limpiarFormularioPaciente();
    await cargarCatalogosPaciente();

    const modalElement = document.getElementById('modalPaciente');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function limpiarFormularioPaciente() {
    const form = document.getElementById('formPaciente');
    const alerta = document.getElementById('alertaFormularioPaciente');

    if (form) {
        form.reset();
    }

    if (alerta) {
        alerta.innerHTML = '';
    }

    const btnGuardar = document.getElementById('btnGuardarPaciente');
    if (btnGuardar) {
        btnGuardar.disabled = true;
    }
}

async function cargarCatalogosPaciente() {
    const alerta = document.getElementById('alertaFormularioPaciente');

    try {
        const respuesta = await fetch('../DATABASE/SALUD/catalogos_paciente.php', {
            method: 'GET'
        });

        const json = await respuesta.json();

        if (json.err) {
            alerta.innerHTML = `
                <div class="alert alert-warning">
                    ${json.mensaje}
                </div>
            `;
            return;
        }

        llenarSelect('FK_sexo_p', json.data.sexo, 'PK_sexo_p', 'sexo_p');
        llenarSelect('FK_g_sg', json.data.grupo_sanguineo, 'PK_g_sg', 'g_sanginio');
        llenarSelect('FK_g_atn', json.data.grupo_atencion, 'PK_g_atn', 'g_atencion');
        llenarSelect('FK_cg', json.data.cargo, 'PK_cg', 'cargo');
        llenarSelect('FK_ag', json.data.agencia, 'PK_ag', 'agencia_ag');

    } catch (error) {
        console.error(error);

        alerta.innerHTML = `
            <div class="alert alert-danger">
                Error al cargar catálogos del formulario.
            </div>
        `;
    }
}

function llenarSelect(idSelect, datos, campoValor, campoTexto) {
    const select = document.getElementById(idSelect);

    if (!select) {
        return;
    }

    select.innerHTML = '<option value="">Seleccione una opción</option>';

    if (!datos || datos.length === 0) {
        return;
    }

    datos.forEach(function (item) {
        const option = document.createElement('option');
        option.value = item[campoValor];
        option.textContent = item[campoTexto];
        select.appendChild(option);
    });
}
