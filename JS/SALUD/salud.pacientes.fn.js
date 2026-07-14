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

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('btnEditarPaciente')) {
            const idPaciente = event.target.getAttribute('data-id');
            abrirModalEditarPaciente(idPaciente);
        }

        if (event.target.classList.contains('btnCambiarEstadoPaciente')) {
            const idPaciente = event.target.getAttribute('data-id');
            const nuevoEstado = event.target.getAttribute('data-estado');
            cambiarEstadoPaciente(idPaciente, nuevoEstado);
        }
    });
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
                    <td colspan="14" class="text-center text-muted">
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
                    <td>
                        <div class="d-flex gap-1 flex-wrap">
                            <button type="button"
                                    class="btn btn-sm btn-outline-primary btnEditarPaciente"
                                data-id="${escaparHtml(item.PK_prs)}">
                                Editar
                            </button>

                            ${parseInt(item.FK_est_p) === 1
                    ? `
                                    <button type="button"
                                        class="btn btn-sm btn-outline-danger btnCambiarEstadoPaciente"
                                        data-id="${escaparHtml(item.PK_prs)}"
                                        data-estado="2">
                                        Desactivar
                                    </button>
                                `
                    : `
                                    <button type="button"
                                        class="btn btn-sm btn-outline-success btnCambiarEstadoPaciente"
                                        data-id="${escaparHtml(item.PK_prs)}"
                                        data-estado="1">
                                        Activar
                                    </button>
            `
                }
    </div>
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
                <td colspan="14" class="text-center text-danger">
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

    document.getElementById('modalPacienteLabel').textContent = 'Registrar Paciente';
    document.getElementById('btnGuardarPaciente').textContent = 'Guardar Paciente';

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

        const idPaciente = document.getElementById('PK_prs').value.trim();

        const url = idPaciente === ''
            ? '../DATABASE/SALUD/paciente_insertar.php'
            : '../DATABASE/SALUD/paciente_actualizar.php';

        const respuesta = await fetch(url, {
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

// Función para abrir el modal de edición de paciente y cargar su información
async function abrirModalEditarPaciente(idPaciente) {
    const alerta = document.getElementById('alertaFormularioPaciente');

    limpiarFormularioPaciente();

    document.getElementById('modalPacienteLabel').textContent = 'Editar Paciente';
    document.getElementById('btnGuardarPaciente').textContent = 'Actualizar Paciente';

    await cargarCatalogosPaciente();

    try {
        const respuesta = await fetch(`../DATABASE/SALUD/paciente_obtener.php?PK_prs=${encodeURIComponent(idPaciente)}`, {
            method: 'GET'
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

        const paciente = json.data;

        document.getElementById('PK_prs').value = paciente.PK_prs;
        document.getElementById('hcl_num').value = paciente.hcl_num;
        document.getElementById('ci_prs').value = paciente.ci_prs;
        document.getElementById('nombre_prs').value = paciente.nombre_prs;
        document.getElementById('apellido_ps').value = paciente.apellido_ps;
        document.getElementById('fc_nan_prc').value = paciente.fc_nan_prc;
        document.getElementById('FK_sexo_p').value = paciente.FK_sexo_p;
        document.getElementById('FK_g_sg').value = paciente.FK_g_sg;
        document.getElementById('FK_g_atn').value = paciente.FK_g_atn;
        document.getElementById('FK_cg').value = paciente.FK_cg;
        document.getElementById('FK_ag').value = paciente.FK_ag;
        document.getElementById('email_prs').value = paciente.email_prs;
        document.getElementById('num_cel_prs').value = paciente.num_cel_prs;

        const modalElement = document.getElementById('modalPaciente');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();

    } catch (error) {
        console.error(error);

        alerta.innerHTML = `
            <div class="alert alert-danger">
                Error al cargar información del paciente.
            </div>
        `;
    }
}

// Función para cambiar el estado de un paciente (activar/desactivar)
async function cambiarEstadoPaciente(idPaciente, nuevoEstado) {
    const accion = parseInt(nuevoEstado) === 1 ? 'activar' : 'desactivar';

    const confirmar = confirm(`¿Deseas ${accion} este paciente?`);

    if (!confirmar) {
        return;
    }

    const datos = new FormData();
    datos.append('PK_prs', idPaciente);
    datos.append('estado', nuevoEstado);

    try {
        const respuesta = await fetch('../DATABASE/SALUD/paciente_estado.php', {
            method: 'POST',
            body: datos
        });

        const json = await respuesta.json();

        if (json.err) {
            alert(json.mensaje);
            return;
        }

        alert(json.mensaje);
        await cargarPacientesSalud();

    } catch (error) {
        console.error(error);
        alert('Error al cambiar estado del paciente.');
    }
}
