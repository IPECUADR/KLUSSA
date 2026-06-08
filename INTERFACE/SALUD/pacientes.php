<section class="container-fluid py-4">

    <div class="row mb-4">
        <div class="col-12">
            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div>
                        <h3 class="mb-1">Pacientes</h3>
                        <p class="text-muted mb-0">
                            Listado de personas registradas en Salud Ocupacional.
                        </p>
                    </div>

                    <a href="../CONTROLLERS/SALUD.php" class="btn btn-outline-secondary">
                        Volver a Salud
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-md-6">
            <input type="text" id="buscarPaciente" class="form-control" placeholder="Buscar por HCL, nombres, apellidos, cédula, agencia o cargo">
        </div>
    </div>

    <div class="row">
        <div class="col-12">

            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-body">

                    <div id="alertaPacientes"></div>

                    <div class="table-responsive">
                        <table class="table table-bordered table-hover align-middle" id="tablaPacientes">
                            <thead class="table-light">
                                <tr>
                                    <th>N°</th>
                                    <th>HCL</th>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Cédula</th>
                                    <th>Agencia</th>
                                    <th>Fecha Nacimiento</th>
                                    <th>Edad</th>
                                    <th>Sexo</th>
                                    <th>Cargo</th>
                                    <th>Grupo Atención</th>
                                    <th>Grupo Sanguíneo</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody id="contenidoPacientes">
                                <tr>
                                    <td colspan="13" class="text-center text-muted">
                                        Cargando pacientes...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>
    </div>

</section>

<script src="../JS/SALUD/salud.pacientes.fn.js"></script>