<section class="container-fluid py-4">

    <div class="row mb-4">
        <div class="col-12">
            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">

                    <div>
                        <h3 class="mb-1">Vacunas</h3>
                        <p class="text-muted mb-0">
                            Listado de vacunas registradas en Salud Ocupacional.
                        </p>
                    </div>

                    <div class="d-flex gap-2">
                        <button type="button" class="btn btn-primary" id="btnNuevaVacuna">
                            Nueva Vacuna
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
                id="buscarVacuna"
                class="form-control"
                placeholder="Buscar por HCL, paciente, cédula, vacuna, dosis, marca, estado, agencia o cargo">
        </div>
    </div>

    <div class="row">
        <div class="col-12">

            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-body">

                    <div id="alertaVacunas"></div>

                    <div class="table-responsive">
                        <table class="table table-bordered table-hover align-middle" id="tablaVacunas">
                            <thead class="table-light">
                                <tr>
                                    <th>N°</th>
                                    <th>HCL</th>
                                    <th>Paciente</th>
                                    <th>Cédula</th>
                                    <th>Cargo</th>
                                    <th>Agencia</th>
                                    <th>Tipo Vacuna</th>
                                    <th>Dosis</th>
                                    <th>Marca</th>
                                    <th>Fecha Vacuna</th>
                                    <th>Evidencia</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>

                            <tbody id="contenidoVacunas">
                                <tr>
                                    <td colspan="13" class="text-center text-muted">
                                        Cargando vacunas...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <small class="text-muted">
                        Nota: las evidencias subidas se almacenan localmente y no se versionan en Git.
                    </small>

                </div>
            </div>

        </div>
    </div>

</section>

<div class="modal fade" id="modalVacuna" tabindex="-1" aria-labelledby="modalVacunaLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content rounded-4 border-0 shadow">

            <div class="modal-header">
                <h5 class="modal-title" id="modalVacunaLabel">Registrar Vacuna</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <div class="modal-body">

                <form id="formVacuna">
                    <input type="hidden" id="PK_vc" name="PK_vc">

                    <div class="row">

                        <div class="col-md-12 mb-3">
                            <label class="form-label">Paciente</label>
                            <select class="form-select" id="FK_prs" name="FK_prs">
                                <option value="">Seleccione un paciente</option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label class="form-label">Tipo de vacuna</label>
                            <select class="form-select" id="FK_t_vc" name="FK_t_vc">
                                <option value="">Seleccione una opción</option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label class="form-label">Dosis</label>
                            <select class="form-select" id="FK_ds" name="FK_ds">
                                <option value="">Seleccione una opción</option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label class="form-label">Marca</label>
                            <select class="form-select" id="FK_mc" name="FK_mc">
                                <option value="">Seleccione una opción</option>
                            </select>
                        </div>

                        <div class="col-md-3 mb-3">
                            <label class="form-label">Fecha vacuna</label>
                            <input type="date" class="form-control" id="fc_vc" name="fc_vc">
                        </div>

                        <div class="col-md-3 mb-3">
                            <label class="form-label">Estado</label>
                            <select class="form-select" id="FK_est_vc" name="FK_est_vc">
                                <option value="">Seleccione una opción</option>
                            </select>
                        </div>

                        <div class="col-md-12 mb-3">
                            <label class="form-label">Evidencia actual</label>
                            <input
                                type="text"
                                class="form-control"
                                id="evidencia_vc_actual"
                                name="evidencia_vc_actual"
                                placeholder="Archivo actual"
                                readonly>
                        </div>

                        <div class="col-md-12 mb-3">
                            <label class="form-label">Subir nueva evidencia</label>
                            <input
                                type="file"
                                class="form-control"
                                id="archivo_evidencia_vc"
                                name="archivo_evidencia_vc"
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx">
                            <small class="text-muted">
                                Formatos permitidos: PDF, JPG, PNG, DOC, DOCX. Tamaño máximo recomendado: 5 MB.
                            </small>
                        </div>

                        <div class="col-md-12 mb-3" id="contenedorEvidenciaActual" style="display:none;">
                            <a href="#" id="enlaceEvidenciaActual" target="_blank" class="btn btn-outline-primary">
                                <i class="fa fa-file-medical"></i> Ver evidencia actual
                            </a>
                        </div>

                    </div>
                </form>

                <div id="alertaFormularioVacuna"></div>

            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Cancelar
                </button>

                <button type="button" class="btn btn-primary" id="btnGuardarVacuna">
                    Guardar Vacuna
                </button>
            </div>

        </div>
    </div>
</div>

<script src="../JS/SALUD/salud.vacunas.fn.js"></script>