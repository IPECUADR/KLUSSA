document.addEventListener('DOMContentLoaded', function () {
    cargarVacunasSalud();

    const inputBuscar = document.getElementById('buscarVacuna');

    if (inputBuscar) {
        inputBuscar.addEventListener('keyup', filtrarVacunas);
    }

    const btnNuevaVacuna = document.getElementById('btnNuevaVacuna');

    if (btnNuevaVacuna) {
        btnNuevaVacuna.addEventListener('click', abrirModalNuevaVacuna);
    }

    const btnGuardarVacuna = document.getElementById('btnGuardarVacuna');

    if (btnGuardarVacuna) {
        btnGuardarVacuna.addEventListener('click', guardarVacuna);
    }

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('btnEditarVacuna')) {
            const idVacuna = event.target.getAttribute('data-id');
            abrirModalEditarVacuna(idVacuna);
        }
    });
});

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
                    <td colspan="13" class="text-center text-muted">
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
                    <td>
                        <button type="button"
                            class="btn btn-sm btn-outline-primary btnEditarVacuna"
                            data-id="${escaparHtml(item.PK_vc)}"
                        >   Editar
                        </button>
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
                    Error al cargar vacunas.
                </td>
            </tr>
        `;
    }
}

// Función para abrir el modal de registro de nueva vacuna
async function abrirModalNuevaVacuna() {
    limpiarFormularioVacuna();

    document.getElementById('modalVacunaLabel').textContent = 'Registrar Vacuna';
    document.getElementById('btnGuardarVacuna').textContent = 'Guardar Vacuna';

    await cargarCatalogosVacuna();

    const modalElement = document.getElementById('modalVacuna');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}


// Función para limpiar el formulario de registro de vacuna
function limpiarFormularioVacuna() {
    const form = document.getElementById('formVacuna');
    const alerta = document.getElementById('alertaFormularioVacuna');

    if (form) {
        form.reset();
    }

    const inputId = document.getElementById('PK_vc');

    if (inputId) {
        inputId.value = '';
    }

    const inputEvidenciaActual = document.getElementById('evidencia_vc_actual');

    if (inputEvidenciaActual) {
        inputEvidenciaActual.value = '';
    }

    const contenedorEvidencia = document.getElementById('contenedorEvidenciaActual');
    const enlaceEvidencia = document.getElementById('enlaceEvidenciaActual');

    if (contenedorEvidencia) {
        contenedorEvidencia.style.display = 'none';
    }

    if (enlaceEvidencia) {
        enlaceEvidencia.href = '#';
    }

    if (alerta) {
        alerta.innerHTML = '';
    }

    const btnGuardar = document.getElementById('btnGuardarVacuna');

    if (btnGuardar) {
        btnGuardar.disabled = false;
        btnGuardar.textContent = 'Guardar Vacuna';
    }
}

// Función para cargar los catálogos de vacunas
async function cargarCatalogosVacuna() {
    const alerta = document.getElementById('alertaFormularioVacuna');

    try {
        const respuesta = await fetch('../DATABASE/SALUD/catalogos_vacuna.php', {
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

        llenarSelectPacientesVacuna('FK_prs', json.data.pacientes);
        llenarSelect('FK_t_vc', json.data.tipos_vacuna, 'PK_t_vc', 't_vacuna');
        llenarSelect('FK_ds', json.data.dosis, 'PK_ds', 'Dosis');
        llenarSelect('FK_mc', json.data.marcas, 'PK_m_vc', 'Marca');
        llenarSelect('FK_est_vc', json.data.estados, 'PK_est_vc', 'estado_vacuna');

    } catch (error) {
        console.error(error);

        alerta.innerHTML = `
            <div class="alert alert-danger">
                Error al cargar catálogos de vacunas.
            </div>
        `;
    }
}

// Función para llenar un select con los pacientes
function llenarSelectPacientesVacuna(idSelect, datos) {
    const select = document.getElementById(idSelect);

    if (!select) {
        return;
    }

    select.innerHTML = '<option value="">Seleccione un paciente</option>';

    if (!datos || datos.length === 0) {
        return;
    }

    datos.forEach(function (item) {
        const option = document.createElement('option');
        const paciente = `${item.hcl_num} - ${item.apellido_ps} ${item.nombre_prs} - ${item.ci_prs}`;

        option.value = item.PK_prs;
        option.textContent = paciente;

        select.appendChild(option);
    });
}

// Función para llenar un select con datos genéricos
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

// Función para guardar una nueva vacuna
async function guardarVacuna() {
    const alerta = document.getElementById('alertaFormularioVacuna');
    const btnGuardar = document.getElementById('btnGuardarVacuna');

    const validacion = validarFormularioVacuna();

    if (!validacion.ok) {
        alerta.innerHTML = `
            <div class="alert alert-warning">
                ${validacion.mensaje}
            </div>
        `;
        return;
    }

    const form = document.getElementById('formVacuna');
    const datos = new FormData(form);

    try {
        btnGuardar.disabled = true;
        btnGuardar.textContent = 'Guardando...';

        const idVacuna = document.getElementById('PK_vc').value.trim();

        const url = idVacuna === ''
            ? '../DATABASE/SALUD/vacuna_insertar.php'
            : '../DATABASE/SALUD/vacuna_actualizar.php';

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

        await cargarVacunasSalud();

        setTimeout(function () {
            const modalElement = document.getElementById('modalVacuna');
            const modal = bootstrap.Modal.getInstance(modalElement);

            if (modal) {
                modal.hide();
            }

            limpiarFormularioVacuna();
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
        btnGuardar.textContent = 'Guardar Vacuna';
    }
}

// Función para abrir el modal de edición de vacuna
async function abrirModalEditarVacuna(idVacuna) {
    const alerta = document.getElementById('alertaFormularioVacuna');

    limpiarFormularioVacuna();

    document.getElementById('modalVacunaLabel').textContent = 'Editar Vacuna';
    document.getElementById('btnGuardarVacuna').textContent = 'Actualizar Vacuna';

    await cargarCatalogosVacuna();

    try {
        const respuesta = await fetch(`../DATABASE/SALUD/vacuna_obtener.php?PK_vc=${encodeURIComponent(idVacuna)}`, {
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

        const vacuna = json.data;

        document.getElementById('PK_vc').value = vacuna.PK_vc;
        document.getElementById('FK_prs').value = vacuna.FK_prs;
        document.getElementById('FK_t_vc').value = vacuna.FK_t_vc;
        document.getElementById('FK_ds').value = vacuna.FK_ds;
        document.getElementById('FK_mc').value = vacuna.FK_mc;
        document.getElementById('fc_vc').value = vacuna.fc_vc;
        document.getElementById('FK_est_vc').value = vacuna.FK_est_vc;

        const evidenciaActual = vacuna.evidencia_vc ? String(vacuna.evidencia_vc).trim() : '';
        const inputEvidenciaActual = document.getElementById('evidencia_vc_actual');
        const contenedorEvidencia = document.getElementById('contenedorEvidenciaActual');
        const enlaceEvidencia = document.getElementById('enlaceEvidenciaActual');

        if (inputEvidenciaActual) {
            inputEvidenciaActual.value = evidenciaActual;
        }

        if (contenedorEvidencia && enlaceEvidencia) {
            if (evidenciaActual !== '') {
                contenedorEvidencia.style.display = 'block';
                enlaceEvidencia.href = '../' + evidenciaActual.replace(/^\/+/, '');
            } else {
                contenedorEvidencia.style.display = 'none';
                enlaceEvidencia.href = '#';
            }
        }

        const modalElement = document.getElementById('modalVacuna');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();

    } catch (error) {
        console.error(error);

        alerta.innerHTML = `
            <div class="alert alert-danger">
                Error al cargar información de la vacuna.
            </div>
        `;
    }
}


// Función para validar el formulario de vacuna
function validarFormularioVacuna() {
    const campos = [
        { id: 'FK_prs', nombre: 'Paciente' },
        { id: 'FK_t_vc', nombre: 'Tipo de vacuna' },
        { id: 'FK_ds', nombre: 'Dosis' },
        { id: 'FK_mc', nombre: 'Marca' },
        { id: 'fc_vc', nombre: 'Fecha de vacuna' },
        { id: 'FK_est_vc', nombre: 'Estado' }
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

    return {
        ok: true,
        mensaje: ''
    };
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

// Función para obtener el HTML del enlace de evidencia de vacuna
function obtenerEvidenciaVacunaHtml(evidencia) {
    const ruta = evidencia ? String(evidencia).trim() : '';

    if (ruta === '') {
        return 'Pendiente';
    }
    // Normalizar la ruta para evitar problemas con barras invertidas o espacios
    const rutaLimpia = ruta.replace(/\\/g, '/').replace(/^\/+/, '');
    return `
        <a href="../${rutaLimpia}" target="_blank" class="btn btn-sm btn-outline-success">
            <i class="fa fa-file-medical"></i> Ver evidencia
        </a>
    `;
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