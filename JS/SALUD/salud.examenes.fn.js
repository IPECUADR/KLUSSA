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

async function abrirModalNuevoExamen() {
    limpiarFormularioExamen();
    await cargarCatalogosExamen();

    const modalElement = document.getElementById('modalExamen');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function limpiarFormularioExamen() {
    const form = document.getElementById('formExamen');
    const alerta = document.getElementById('alertaFormularioExamen');

    if (form) {
        form.reset();
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

        const respuesta = await fetch('../DATABASE/SALUD/examen_insertar.php', {
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