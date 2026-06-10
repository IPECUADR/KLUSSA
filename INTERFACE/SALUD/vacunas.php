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
                        <button type="button" class="btn btn-primary" id="btnNuevaVacuna" disabled>
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
                placeholder="Buscar por HCL, paciente, cédula, vacuna, dosis, marca, estado, agencia o cargo"
            >
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
                                </tr>
                            </thead>

                            <tbody id="contenidoVacunas">
                                <tr>
                                    <td colspan="12" class="text-center text-muted">
                                        Cargando vacunas...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <small class="text-muted">
                        Nota: por ahora este módulo solo lista vacunas. El registro y carga de evidencias se migrará en la siguiente fase.
                    </small>

                </div>
            </div>

        </div>
    </div>

</section>

<script src="../JS/SALUD/salud.vacunas.fn.js"></script>