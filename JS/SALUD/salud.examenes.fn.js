// JS para gestión de exámenes de salud
document.addEventListener('DOMContentLoaded', function () {
    cargarExamenesSalud();

    const inputBuscar = document.getElementById('buscarExamen');

    if (inputBuscar) {
        inputBuscar.addEventListener('keyup', filtrarExamenes);
    }

    const btnNuevoExamen = document.getElementById('btnNuevoExamen');

    if (btnNuevoExamen) {
        btnNuevoExamen.addEventListener('click', abrirModalNuevoExamen);
    }

    const btnGuardarExamen = document.getElementById('btnGuardarExamen');
    

    if (btnGuardarExamen) {
        btnGuardarExamen.addEventListener('click', guardarExamen);
    }

    const btnGuardarResultadoExamen = document.getElementById('btnGuardarResultadoExamen');

    if (btnGuardarResultadoExamen) {
        btnGuardarResultadoExamen.addEventListener('click', guardarResultadoExamen);
    }

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('btnEditarExamen')) {
            const idExamen = event.target.getAttribute('data-id');
            abrirModalEditarExamen(idExamen);
        }

        if (event.target.classList.contains('btnResultadoExamen')) {
            const idExamen = event.target.getAttribute('data-id');
            abrirModalResultadoExamen(idExamen);
        }
    });
});

// Función para cargar exámenes de salud
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
                    <td colspan="15" class="text-center text-muted">
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

            const rutaCertificado = item.cal_cert_exam ? String(item.cal_cert_exam).trim() : '';

            const certificadoHtml = rutaCertificado !== ''
                ?  `<a href="../${rutaCertificado.replace(/^\/+/, '')}" target="_blank" class="btn btn-sm btn-outline-success">
                        <i class="fa fa-file-medical"></i>
                        Ver archivo
                    </a>`
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
                    
                    <td>${certificadoHtml}</td>

                    <td>
                        <div class="d-flex gap-1 flex-wrap">
                            <button type="button"
                                    class="btn btn-sm btn-outline-primary btnEditarExamen"
                                    data-id="${escaparHtml(item.PK_examen)}">
                                Editar
                            </button>

                            <button type="button"
                                    class="btn btn-sm btn-outline-success btnResultadoExamen"
                                    data-id="${escaparHtml(item.PK_examen)}">
                                Resultado
                            </button>
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
                <td colspan="15" class="text-center text-danger">
                    Error al cargar exámenes.
                </td>
            </tr>
        `;
    }
}

// Función para abrir modal de nuevo examen

async function abrirModalNuevoExamen() {
    limpiarFormularioExamen();

    document.getElementById('modalExamenLabel').textContent = 'Registrar Examen';
    document.getElementById('btnGuardarExamen').textContent = 'Guardar Examen';

    await cargarCatalogosExamen();

    const modalElement = document.getElementById('modalExamen');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Función para abrir modal de edición de examen
function limpiarFormularioExamen() {
    const form = document.getElementById('formExamen');
    const alerta = document.getElementById('alertaFormularioExamen');

    if (form) {
        form.reset();
    }

    const inputId = document.getElementById('PK_examen');

    if (inputId) {
    inputId.value = '';
    }

    if (alerta) {
        alerta.innerHTML = '';
    }

    const btnGuardar = document.getElementById('btnGuardarExamen');

    if (btnGuardar) {
        btnGuardar.disabled = false;
        btnGuardar.textContent = 'Guardar Examen';
    }
}

// Función para cargar catálogos necesarios para el formulario de examen
async function cargarCatalogosExamen() {
    const alerta = document.getElementById('alertaFormularioExamen');

    try {
        const respuesta = await fetch('../DATABASE/SALUD/catalogos_examen.php', {
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

        llenarSelectPacientes('FK_prs', json.data.pacientes);
        llenarSelect('FK_t_ex', json.data.tipos_examen, 'PK_t_ex', 'tp_examen');
        llenarSelect('FK_prog_a', json.data.anios, 'PK_prog_a', 'an_prog');

    } catch (error) {
        console.error(error);

        alerta.innerHTML = `
            <div class="alert alert-danger">
                Error al cargar catálogos del examen.
            </div>
        `;
    }
}

// Función para llenar select de pacientes con formato personalizado
function llenarSelectPacientes(idSelect, datos) {
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

// Función genérica para llenar selects
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

// Función para guardar examen (crear o actualizar)
async function guardarExamen() {
    const alerta = document.getElementById('alertaFormularioExamen');
    const btnGuardar = document.getElementById('btnGuardarExamen');

    const validacion = validarFormularioExamen();

    if (!validacion.ok) {
        alerta.innerHTML = `
            <div class="alert alert-warning">
                ${validacion.mensaje}
            </div>
        `;
        return;
    }

    const form = document.getElementById('formExamen');
    const datos = new FormData(form);

    try {
        btnGuardar.disabled = true;
        btnGuardar.textContent = 'Guardando...';

        const idExamen = document.getElementById('PK_examen').value.trim();

        const url = idExamen === ''
            ? '../DATABASE/SALUD/examen_insertar.php'
            : '../DATABASE/SALUD/examen_actualizar.php';

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

        await cargarExamenesSalud();

        setTimeout(function () {
            const modalElement = document.getElementById('modalExamen');
            const modal = bootstrap.Modal.getInstance(modalElement);

            if (modal) {
                modal.hide();
            }

            limpiarFormularioExamen();
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
        btnGuardar.textContent = 'Guardar Examen';
    }
}

// Función para abrir modal de edición de examen
async function abrirModalEditarExamen(idExamen) {
    const alerta = document.getElementById('alertaFormularioExamen');

    limpiarFormularioExamen();

    document.getElementById('modalExamenLabel').textContent = 'Editar Examen';
    document.getElementById('btnGuardarExamen').textContent = 'Actualizar Examen';

    await cargarCatalogosExamen();

    try {
        const respuesta = await fetch(`../DATABASE/SALUD/examen_obtener.php?PK_examen=${encodeURIComponent(idExamen)}`, {
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

        const examen = json.data;

        document.getElementById('PK_examen').value = examen.PK_examen;
        document.getElementById('FK_prs').value = examen.FK_prs;
        document.getElementById('FK_t_ex').value = examen.FK_t_ex;
        document.getElementById('fc_prog_exam').value = examen.fc_prog_exam;
        document.getElementById('FK_prog_a').value = examen.FK_prog_a;

        const modalElement = document.getElementById('modalExamen');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();

    } catch (error) {
        console.error(error);

        alerta.innerHTML = `
            <div class="alert alert-danger">
                Error al cargar información del examen.
            </div>
        `;
    }
}

// Función para validar formulario de examen
function validarFormularioExamen() {
    const campos = [
        { id: 'FK_prs', nombre: 'Paciente' },
        { id: 'FK_t_ex', nombre: 'Tipo de examen' },
        { id: 'fc_prog_exam', nombre: 'Fecha programada' },
        { id: 'FK_prog_a', nombre: 'Año de programación' }
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

// Función para filtrar exámenes en la tabla
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

// Función para obtener clase CSS según estado del examen
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

async function abrirModalResultadoExamen(idExamen) {
    limpiarFormularioResultadoExamen();
    await cargarCatalogosResultadoExamen();

    try {
        const respuesta = await fetch(`../DATABASE/SALUD/examen_obtener.php?PK_examen=${encodeURIComponent(idExamen)}`, {
            method: 'GET'
        });

        const json = await respuesta.json();

        const alerta = document.getElementById('alertaFormularioResultadoExamen');

        if (json.err) {
            alerta.innerHTML = `
                <div class="alert alert-danger">
                    ${json.mensaje}
                </div>
            `;
            return;
        }

        const examen = json.data;

        document.getElementById('PK_examen_resultado').value = examen.PK_examen;
        document.getElementById('FK_est_exam_resultado').value = examen.FK_est_exam;
        document.getElementById('FK_v_vrd_ex_resultado').value = examen.FK_v_vrd_ex;
        document.getElementById('resultado_exam').value = examen.resultado_exam ?? '';
        document.getElementById('v_medica').value = examen.v_medica ?? '';
        document.getElementById('cal_cert_exam').value = examen.cal_cert_exam ?? '';

        const contenedorArchivo = document.getElementById('contenedorArchivoActual');
        const enlaceArchivo = document.getElementById('enlaceArchivoActual');

        const rutaArchivo = examen.cal_cert_exam ? String(examen.cal_cert_exam).trim() : '';

        if (contenedorArchivo && enlaceArchivo) {
            if (rutaArchivo !== '') {
                contenedorArchivo.style.display = 'block';
                enlaceArchivo.href = '../' + rutaArchivo.replace(/^\/+/, '');
            } else {
                contenedorArchivo.style.display = 'none';
                enlaceArchivo.href = '#';
            }
        }

        const modalElement = document.getElementById('modalResultadoExamen');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();

    } catch (error) {
        console.error(error);

        const alerta = document.getElementById('alertaFormularioResultadoExamen');
        alerta.innerHTML = `
            <div class="alert alert-danger">
                Error al cargar información del resultado.
            </div>
        `;
    }
}

function limpiarFormularioResultadoExamen() {
    const form = document.getElementById('formResultadoExamen');
    const alerta = document.getElementById('alertaFormularioResultadoExamen');

    if (form) {
        form.reset();
    }

    if (alerta) {
        alerta.innerHTML = '';
    }

    const btnGuardar = document.getElementById('btnGuardarResultadoExamen');

    if (btnGuardar) {
        btnGuardar.disabled = false;
        btnGuardar.textContent = 'Guardar Resultado';
    }

    const contenedorArchivo = document.getElementById('contenedorArchivoActual');
    const enlaceArchivo = document.getElementById('enlaceArchivoActual');

    if (contenedorArchivo) {
        contenedorArchivo.style.display = 'none';
    }

    if (enlaceArchivo) {
        enlaceArchivo.href = '#';
    }
}

async function cargarCatalogosResultadoExamen() {
    const alerta = document.getElementById('alertaFormularioResultadoExamen');

    try {
        const respuesta = await fetch('../DATABASE/SALUD/catalogos_resultado_examen.php', {
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

        llenarSelect('FK_est_exam_resultado', json.data.estados_examen, 'PK_est_exam', 'estado_exam');
        llenarSelect('FK_v_vrd_ex_resultado', json.data.validado, 'PK_v_vrd_ex', 'valor_vrd_ex');

    } catch (error) {
        console.error(error);

        alerta.innerHTML = `
            <div class="alert alert-danger">
                Error al cargar catálogos del resultado.
            </div>
        `;
    }
}

async function guardarResultadoExamen() {
    const alerta = document.getElementById('alertaFormularioResultadoExamen');
    const btnGuardar = document.getElementById('btnGuardarResultadoExamen');

    const validacion = validarFormularioResultadoExamen();

    if (!validacion.ok) {
        alerta.innerHTML = `
            <div class="alert alert-warning">
                ${validacion.mensaje}
            </div>
        `;
        return;
    }

    const form = document.getElementById('formResultadoExamen');
    const datos = new FormData(form);

    try {
        btnGuardar.disabled = true;
        btnGuardar.textContent = 'Guardando...';

        const respuesta = await fetch('../DATABASE/SALUD/examen_resultado_actualizar.php', {
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

        await cargarExamenesSalud();

        setTimeout(function () {
            const modalElement = document.getElementById('modalResultadoExamen');
            const modal = bootstrap.Modal.getInstance(modalElement);

            if (modal) {
                modal.hide();
            }

            limpiarFormularioResultadoExamen();
        }, 800);

    } catch (error) {
        console.error(error);

        alerta.innerHTML = `
            <div class="alert alert-danger">
                Error al enviar el resultado del examen.
            </div>
        `;
    } finally {
        btnGuardar.disabled = false;
        btnGuardar.textContent = 'Guardar Resultado';
    }
}

function validarFormularioResultadoExamen() {
    const campos = [
        { id: 'FK_est_exam_resultado', nombre: 'Estado del examen' },
        { id: 'FK_v_vrd_ex_resultado', nombre: 'Validado' }
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