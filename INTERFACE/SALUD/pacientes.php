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
                    
                    <div class="d-flex gap-2">
                        <button type="button" class="btn btn-primary" id="btnNuevoPaciente">
                            Nuevo Paciente
                        </button>
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
// Modal para registro y edición de pacientes
<div class="modal fade" id="modalPaciente" tabindex="-1" aria-labelledby="modalPacienteLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content rounded-4 border-0 shadow">
            <div class="modal-header">
                <h5 class="modal-title" id="modalPacienteLabel">Registrar Paciente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <div class="modal-body">
                <form id="formPaciente">
                    <div class="row">

                        <div class="col-md-3 mb-3">
                            <label class="form-label">N° HCL</label>
                            <input type="number" class="form-control" id="hcl_num" name="hcl_num">
                        </div>

                        <div class="col-md-3 mb-3">
                            <label class="form-label">Cédula</label>
                            <input type="text" class="form-control" id="ci_prs" name="ci_prs" maxlength="10">
                        </div>

                        <div class="col-md-3 mb-3">
                            <label class="form-label">Nombres</label>
                            <input type="text" class="form-control" id="nombre_prs" name="nombre_prs">
                        </div>

                        <div class="col-md-3 mb-3">
                            <label class="form-label">Apellidos</label>
                            <input type="text" class="form-control" id="apellido_ps" name="apellido_ps">
                        </div>

                        <div class="col-md-3 mb-3">
                            <label class="form-label">Fecha de nacimiento</label>
                            <input type="date" class="form-control" id="fc_nan_prc" name="fc_nan_prc">
                        </div>

                        <div class="col-md-3 mb-3">
                            <label class="form-label">Sexo</label>
                            <select class="form-select" id="FK_sexo_p" name="FK_sexo_p">
                                <option value="">Seleccione una opción</option>
                            </select>
                        </div>

                        <div class="col-md-3 mb-3">
                            <label class="form-label">Grupo sanguíneo</label>
                            <select class="form-select" id="FK_g_sg" name="FK_g_sg">
                                <option value="">Seleccione una opción</option>
                            </select>
                        </div>

                        <div class="col-md-3 mb-3">
                            <label class="form-label">Grupo de atención</label>
                            <select class="form-select" id="FK_g_atn" name="FK_g_atn">
                                <option value="">Seleccione una opción</option>
                            </select>
                        </div>

                        <div class="col-md-4 mb-3">
                            <label class="form-label">Cargo</label>
                            <select class="form-select" id="FK_cg" name="FK_cg">
                                <option value="">Seleccione una opción</option>
                            </select>
                        </div>

                        <div class="col-md-4 mb-3">
                            <label class="form-label">Agencia / Centro de trabajo</label>
                            <select class="form-select" id="FK_ag" name="FK_ag">
                                <option value="">Seleccione una opción</option>
                            </select>
                        </div>

                        <div class="col-md-4 mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" id="email_prs" name="email_prs">
                        </div>

                        <div class="col-md-4 mb-3">
                            <label class="form-label">Celular</label>
                            <input type="text" class="form-control" id="num_cel_prs" name="num_cel_prs" maxlength="10">
                        </div>

                    </div>
                </form>

                <div id="alertaFormularioPaciente"></div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Cancelar
                </button>
                <button type="button" class="btn btn-primary" id="btnGuardarPaciente" disabled>
                    Guardar Paciente
                </button>
            </div>
        </div>
    </div>
</div>

<script src="../JS/SALUD/salud.pacientes.fn.js"></script>