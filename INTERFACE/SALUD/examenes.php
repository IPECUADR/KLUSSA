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
                        <button type="button" class="btn btn-primary" id="btnNuevoExamen" disabled>
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
                        Nota: por ahora este módulo solo lista exámenes. El registro y carga de resultados se migrará en la siguiente fase.
                    </small>

                </div>
            </div>

        </div>
    </div>

</section>

<script src="../JS/SALUD/salud.examenes.fn.js"></script>