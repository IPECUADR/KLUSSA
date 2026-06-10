<section class="container-fluid py-4">

    <div class="row mb-4">
        <div class="col-12">
            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">

                    <div>
                        <h3 class="mb-1">Exámenes Ocupacionales</h3>
                        <p class="text-muted mb-0">
                            Listado de exámenes registrados en Salud Ocupacional.
                        </p>
                    </div>

                    <div class="d-flex gap-2">
                        <button type="button" class="btn btn-primary" id="btnNuevoExamen">
                            Nuevo Examen
                        </button>

                        <a href="SALUD.php" class="btn btn-outline-secondary">
                            Volver a Salud
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-md-6">
            <input
                type="text"
                id="buscarExamen"
                class="form-control"
                placeholder="Buscar por HCL, paciente, cédula, tipo, estado, agencia o cargo">
        </div>
    </div>

    <div class="row">
        <div class="col-12">

            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-body">

                    <div id="alertaExamenes"></div>

                    <div class="table-responsive">
                        <table class="table table-bordered table-hover align-middle" id="tablaExamenes">
                            <thead class="table-light">
                                <tr>
                                    <th>N°</th>
                                    <th>HCL</th>
                                    <th>Paciente</th>
                                    <th>Cédula</th>
                                    <th>Cargo</th>
                                    <th>Agencia</th>
                                    <th>Tipo Examen</th>
                                    <th>Fecha Programada</th>
                                    <th>Año</th>
                                    <th>Estado</th>
                                    <th>Validado</th>
                                    <th>Resultado</th>
                                    <th>Valoración Médica</th>
                                    <th>Certificado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>

                            <tbody id="contenidoExamenes">
                                <tr>
                                    <td colspan="15" class="text-center text-muted">
                                        Cargando exámenes...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <small class="text-muted">
                        Nota: el registro inicial deja el examen en estado AGENDADO y validado NO.
                    </small>

                </div>
            </div>

        </div>
    </div>

</section>

<div class="modal fade" id="modalExamen" tabindex="-1" aria-labelledby="modalExamenLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content rounded-4 border-0 shadow">

            <div class="modal-header">
                <h5 class="modal-title" id="modalExamenLabel">Registrar Examen</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <div class="modal-body">

                <form id="formExamen">
                    <input type="hidden" id="PK_examen" name="PK_examen">

                    <div class="row">

                        <div class="col-md-12 mb-3">
                            <label class="form-label">Paciente</label>
                            <select class="form-select" id="FK_prs" name="FK_prs">
                                <option value="">Seleccione un paciente</option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label class="form-label">Tipo de examen</label>
                            <select class="form-select" id="FK_t_ex" name="FK_t_ex">
                                <option value="">Seleccione una opción</option>
                            </select>
                        </div>

                        <div class="col-md-3 mb-3">
                            <label class="form-label">Fecha programada</label>
                            <input type="date" class="form-control" id="fc_prog_exam" name="fc_prog_exam">
                        </div>

                        <div class="col-md-3 mb-3">
                            <label class="form-label">Año</label>
                            <select class="form-select" id="FK_prog_a" name="FK_prog_a">
                                <option value="">Seleccione una opción</option>
                            </select>
                        </div>

                    </div>
                </form>

                <div id="alertaFormularioExamen"></div>

            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Cancelar
                </button>

                <button type="button" class="btn btn-primary" id="btnGuardarExamen">
                    Guardar Examen
                </button>
            </div>

        </div>
    </div>
</div>

<div class="modal fade" id="modalResultadoExamen" tabindex="-1" aria-labelledby="modalResultadoExamenLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content rounded-4 border-0 shadow">

            <div class="modal-header">
                <h5 class="modal-title" id="modalResultadoExamenLabel">Resultado del Examen</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <div class="modal-body">

                <form id="formResultadoExamen">
                    <input type="hidden" id="PK_examen_resultado" name="PK_examen_resultado">

                    <div class="row">

                        <div class="col-md-6 mb-3">
                            <label class="form-label">Estado del examen</label>
                            <select class="form-select" id="FK_est_exam_resultado" name="FK_est_exam_resultado">
                                <option value="">Seleccione una opción</option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label class="form-label">Validado</label>
                            <select class="form-select" id="FK_v_vrd_ex_resultado" name="FK_v_vrd_ex_resultado">
                                <option value="">Seleccione una opción</option>
                            </select>
                        </div>

                        <div class="col-md-12 mb-3">
                            <label class="form-label">Resultado del examen</label>
                            <textarea class="form-control" id="resultado_exam" name="resultado_exam" rows="3" placeholder="Ingrese resultado del examen"></textarea>
                        </div>

                        <div class="col-md-12 mb-3">
                            <label class="form-label">Valoración médica</label>
                            <textarea class="form-control" id="v_medica" name="v_medica" rows="3" placeholder="Ingrese valoración médica"></textarea>
                        </div>

                        <div class="col-md-12 mb-3">
                            <label class="form-label">Certificado / resultado actual</label>
                            <input
                                type="text"
                                class="form-control"
                                id="cal_cert_exam"
                                name="cal_cert_exam"
                                placeholder="Archivo actual o referencia documental"
                                readonly>
                            <small class="text-muted">
                                Este campo muestra el archivo actualmente asociado al examen.
                            </small>
                        </div>

                        <div class="col-md-12 mb-3">
                            <label class="form-label">Subir nuevo certificado / resultado</label>
                            <input
                                type="file"
                                class="form-control"
                                id="archivo_certificado_exam"
                                name="archivo_certificado_exam"
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx">
                            <small class="text-muted">
                                Formatos permitidos: PDF, JPG, PNG, DOC, DOCX. Tamaño máximo recomendado: 5 MB.
                            </small>
                        </div>

                        <div class="col-md-12 mb-3" id="contenedorArchivoActual" style="display:none;">
                            <a href="#" id="enlaceArchivoActual" target="_blank" class="btn btn-sm btn-outline-success">
                                <i class="fa fa-file-medical"></i> Ver archivo actual
                            </a>
                        </div>

                    </div>
                </form>

                <div id="alertaFormularioResultadoExamen"></div>

            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Cancelar
                </button>

                <button type="button" class="btn btn-primary" id="btnGuardarResultadoExamen">
                    Guardar Resultado
                </button>
            </div>

        </div>
    </div>
</div>

<script src="../JS/SALUD/salud.examenes.fn.js"></script>