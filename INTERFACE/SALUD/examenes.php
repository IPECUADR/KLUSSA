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
                placeholder="Buscar por HCL, paciente, cédula, tipo, estado, agencia o cargo"
            >
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
                                </tr>
                            </thead>

                            <tbody id="contenidoExamenes">
                                <tr>
                                    <td colspan="14" class="text-center text-muted">
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

<script src="../JS/SALUD/salud.examenes.fn.js"></script>