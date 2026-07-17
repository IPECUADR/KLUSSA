<div class="p-4 bg-light mt-5 mb-5">

  <div class="card  border-0 shadow-sm rounded-4">



    <!-- Encabezado -->
    <div class="card-body ">

      <!-- BANNER -->
      <div class="card border-0 shadow-sm rounded-4 mb-4" id="bnn_int">
        <div class="card-body text-white py-4 px-4">
          <div class="col-md-12">
            <h4 class="fw-semibold mb-1">
              CONSUMO DE AGUA POZOS
            </h4>

          </div>
        </div>
      </div>






      <div class="card shadow rounded-4 p-3 mb-3 border-0">

        <!-- FILTROS -->
        <div class="row g-2 mb-3">

          <div class="col-12 col-sm-6 col-lg-auto">
            <select name="FK_mes" id="cbx_fil_mes" class="form-select form-select-sm rounded-pill">
              <option value="">Código</option>
            </select>
          </div>

          <div class="col-12 col-sm-6 col-lg-auto">
            <select name="FK_maquina" id="cbx_fil_mq" class="form-select form-select-sm rounded-pill">
              <option value="">MAQUINA</option>
            </select>
          </div>

          <!-- FILTRO POZOS Victor Alvarez -->
          <div class="col-12 col-sm-6 col-lg-auto">
            <select
              name="pozo_c_ag_ps"
              id="cbx_fil_pozo"
              class="form-select form-select-sm rounded-pill"
              style="width: 180px;">
              <option value="">POZO</option>
            </select>
          </div>

          <div class="col-12 col-sm-6 col-lg-auto">
            <select name="FK_pro" id="cbx_fil_ag" class="form-select form-select-sm rounded-pill">
              <option value="">Código</option>
            </select>
          </div>

          <div class="col-12 col-sm-6 col-lg-auto d-grid">
            <button id="btn_flt" class="btn btn-sm btn-dark rounded-pill">
              <i class="fas fa-filter me-1"></i> Filtrar
            </button>
          </div>

        </div>

        <!-- BOTONES + BUSCADOR -->
        <div class="row g-3 align-items-center">

          <!-- BOTONES -->
          <div class="col-12 col-lg-5">
            <div class="row g-2">

              <div class="col-12 col-sm-4 d-grid">
                <button id="bnt_reg_res_p" class="btn btn-sm btn-primary rounded-pill">
                  <i class="fas fa-faucet me-1"></i> Registrar
                </button>
              </div>

              <div class="col-12 col-sm-4 d-grid">
                <button id="btn_pdf" class="btn btn-sm btn-outline-danger rounded-pill">
                  <i class="fas fa-file-pdf me-1"></i> PDF
                </button>
              </div>

              <div class="col-12 col-sm-4 d-grid">
                <button id="btn_export_excel" class="btn btn-sm btn-outline-success rounded-pill">
                  <i class="fas fa-file-excel me-1"></i> Excel
                </button>
              </div>

            </div>
          </div>

          <!-- BUSCADOR -->
          <div class="col-12 col-lg-7">
            <div class="input-group input-group-sm">

              <span class="input-group-text bg-white border-end-0 rounded-start-pill">
                <i class="fa-solid fa-magnifying-glass text-primary"></i>
              </span>

              <input type="text"
                class="form-control border-start-0 border-end-0"
                id="buscar_residuo"
                placeholder="Buscar...">

              <button class="btn btn-outline-danger rounded-end-pill" type="button">
                <i class="fa-solid fa-heart"></i>
              </button>

            </div>
          </div>

        </div>

      </div>


      <!-- RESUMEN DE TOTALES EN LA PARTE SUPERIOR -->
      <div class="card border-0 shadow-sm rounded-4 mb-3">
        <div class="card-body py-3">

          <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <div>
              <h6 class="fw-bold mb-1">
                <i class="fas fa-calculator me-2 text-primary"></i>
                Resumen de consumo de agua
              </h6>

              <small class="text-muted">
                Los valores se actualizan según los filtros seleccionados.
              </small>
            </div>
          </div>

          <div id="resumen_totales" class="row g-2">
            <div class="col-12 text-center text-muted">
              Cargando totales...
            </div>
          </div>

        </div>
      </div>

      <!-- Tabla -->
      <div class="table-responsive rounded-3 shadow-sm">
        <table class="table">

          <thead class="align-middle text-start" style="background:#d9d9d9;">

            <tr>
              <th rowspan="2">N°</th>
              <th rowspan="2">FECHA INICIO</th>
              <th rowspan="2">FECHA FIN</th>
              <th rowspan="2">MES</th>
              <th rowspan="2">MÁQUINA</th>
              <th rowspan="2">PLATAFORMA</th>
              <th rowspan="2">POZO</th>

              <th colspan="2">TURNO DÍA</th>
              <th colspan="2">TURNO NOCHE</th>

              <th rowspan="2">CONSUMO TOTAL (m³)</th>
              <th rowspan="2">CONSUMO EN LITROS</th>
              <th rowspan="2">PROYECTO</th>
              <th rowspan="2">OPCIONES</th>
            </tr>

            <tr>
              <th>MED. INICIAL</th>
              <th>MED. FINAL</th>
              <th>MED. INICIAL</th>
              <th>MED. FINAL</th>
            </tr>

          </thead>

          <tbody id="content_table" class="small table-light"></tbody>

        </table>
        <div class="col-12" id="res_busqueda">

        </div>


      </div>

    </div>

  </div>
</div>

<!-- Modal  multifuncional-->
<div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content border-0 shadow-lg rounded-4">

      <div class="modal-header  text-white" id="titulo_modal" style="background:#040D29; color:#fff;">


      </div>

      <div class="modal-body bg-light" id="form_modal"></div>

      <div class="modal-footer border-top " id="form_modal_footer" style="background:#040D29;">

      </div>

    </div>
  </div>
</div>

<script src="../JS/c.ag.posos.fn.js"></script>