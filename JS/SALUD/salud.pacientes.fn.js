// JS para gestión de pacientes en salud ocupacional
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

    const btnGuardarPaciente = document.getElementById('btnGuardarPaciente');
    if (btnGuardarPaciente) {
        btnGuardarPaciente.addEventListener('click', guardarPaciente);
    }
});

// Función para cargar pacientes desde el servidor y mostrarlos en la tabla
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
// Función para filtrar pacientes en la tabla
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
// Función para escapar caracteres HTML y prevenir XSS
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
// Función para limpiar el formulario de paciente
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
        btnGuardar.disabled = false;
    }
}
// Función para cargar los catálogos necesarios en el formulario de paciente
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
// Función para llenar un select con datos obtenidos del servidor
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

// Función para guardar un nuevo paciente
async function guardarPaciente() {
    const alerta = document.getElementById('alertaFormularioPaciente');
    const btnGuardar = document.getElementById('btnGuardarPaciente');

    const validacion = validarFormularioPaciente();

    if (!validacion.ok) {
        alerta.innerHTML = `
            <div class="alert alert-warning">
                ${validacion.mensaje}
            </div>
        `;
        return;
    }

    const form = document.getElementById('formPaciente');
    const datos = new FormData(form);

    try {
        btnGuardar.disabled = true;
        btnGuardar.textContent = 'Guardando...';

        const respuesta = await fetch('../DATABASE/SALUD/paciente_insertar.php', {
            method: 'POST',
            body: datos
        });

        const json = await respuesta.json();

        if (json.err) {
            alerta.innerHTML = `
                <div class="alert alert-danger">
                    ${json.mensaje}
                </div>
            `;
            return;
        }

        alerta.innerHTML = `
            <div class="alert alert-success">
                ${json.mensaje}
            </div>
        `;

        await cargarPacientesSalud();

        setTimeout(function () {
            const modalElement = document.getElementById('modalPaciente');
            const modal = bootstrap.Modal.getInstance(modalElement);

            if (modal) {
                modal.hide();
            }

            limpiarFormularioPaciente();
        }, 800);

    } catch (error) {
        console.error(error);

        alerta.innerHTML = `
            <div class="alert alert-danger">
                Error al enviar el formulario.
            </div>
        `;
    } finally {
        btnGuardar.disabled = false;
        btnGuardar.textContent = 'Guardar Paciente';
    }
}

// Función para validar el formulario de paciente antes de enviarlo
function validarFormularioPaciente() {
    const campos = [
        { id: 'hcl_num', nombre: 'N° HCL' },
        { id: 'ci_prs', nombre: 'Cédula' },
        { id: 'nombre_prs', nombre: 'Nombres' },
        { id: 'apellido_ps', nombre: 'Apellidos' },
        { id: 'fc_nan_prc', nombre: 'Fecha de nacimiento' },
        { id: 'FK_sexo_p', nombre: 'Sexo' },
        { id: 'FK_g_sg', nombre: 'Grupo sanguíneo' },
        { id: 'FK_g_atn', nombre: 'Grupo de atención' },
        { id: 'FK_cg', nombre: 'Cargo' },
        { id: 'FK_ag', nombre: 'Agencia' }
    ];

    for (const campo of campos) {
        const elemento = document.getElementById(campo.id);

        if (!elemento || elemento.value.trim() === '') {
            return {
                ok: false,
                mensaje: `Campo obligatorio vacío: ${campo.nombre}`
            };
        }
    }

    const hcl = document.getElementById('hcl_num').value.trim();
    if (!/^[0-9]+$/.test(hcl)) {
        return {
            ok: false,
            mensaje: 'El N° HCL debe ser numérico'
        };
    }

    const ci = document.getElementById('ci_prs').value.trim();
    if (!/^[0-9A-Za-z]{5,15}$/.test(ci)) {
        return {
            ok: false,
            mensaje: 'La cédula o identificación no tiene un formato válido'
        };
    }

    const email = document.getElementById('email_prs').value.trim();
    if (email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return {
            ok: false,
            mensaje: 'El email no tiene un formato válido'
        };
    }

    const celular = document.getElementById('num_cel_prs').value.trim();
    if (celular !== '' && !/^[0-9]{7,10}$/.test(celular)) {
        return {
            ok: false,
            mensaje: 'El celular debe contener entre 7 y 10 dígitos'
        };
    }

    return {
        ok: true,
        mensaje: ''
    };
}
