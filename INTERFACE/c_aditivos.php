<div class="p-4 bg-light mt-5 mb-5">

  <div class="card  border-0 shadow-sm rounded-4">



    <!-- Encabezado -->
    <div class="card-body bg-light mt-3 mb-4 rounded-4">

      <!-- BANNER -->
      <div class="card border-0 shadow-sm rounded-4 mb-4" id="bnn_int">
        <div class="card-body text-white py-4 px-4">
          <div class="col-md-12">
            <h4 class="fw-semibold mb-1">
              CONSUMO DE ADITIVOS
            </h4>

          </div>
        </div>
      </div>


      <div class="card shadow rounded-4 p-3 mb-3 border-0">

        <!-- FILTROS -->
        <div class="row g-2 mb-3">

          <div class="col-12 col-sm-6 col-lg-auto">
            <select name="FK_mes" id="cbx_fil_mes" class="form-select form-select-sm rounded-pill">
              <option value="">C��digo</option>
            </select>
          </div>

          <div class="col-12 col-sm-6 col-lg-auto">
            <select name="FK_pro" id="cbx_fil_ag" class="form-select form-select-sm rounded-pill">
              <option value="">C��digo</option>
            </select>
          </div>

          <div class="col-12 col-sm-6 col-lg-auto">
            <select name="FK_ad_rs" id="cbx_fil_adt" class="form-select form-select-sm rounded-pill">
              <option value="">ADITIVO</option>
            </select>
          </div>

          <div class="col-12 col-sm-6 col-lg-auto">
            <select name="FK_maquina" id="cbx_fil_mq" class="form-select form-select-sm rounded-pill">
              <option value="">MAQUINA</option>
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
                <button id="bnt_reg" class="btn btn-sm btn-primary rounded-pill">
                  <i class="fas fa-vial me-1"></i> Registrar
                </button>
              </div>

              <div class="col-12 col-sm-4 d-grid">
                <button id="btn_pdf_g" class="btn btn-sm btn-outline-danger rounded-pill">
                  <i class="fas fa-file-pdf me-1"></i> PDF
                </button>
              </div>

              <div class="col-12 col-sm-4 d-grid">
                <button id="btn_excel" class="btn btn-sm btn-outline-success rounded-pill">
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



      <!-- RESUMEN DE TOTALES PARA CONSUMO DE ADITIVOS POR VICTOR ALVAREZ -->
      <div class="card border-0 shadow-sm rounded-4 mb-3">
        <div class="card-body py-3">

          <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <div>
              <h6 class="fw-bold mb-1">
                <i class="fas fa-calculator me-2 text-primary"></i>
                Resumen de consumo de aditivos
              </h6>

              <small class="text-muted">
                Los valores se actualizan según los filtros seleccionados.
              </small>
            </div>
          </div>

          <div id="resumen_totales_aditivos" class="row g-2">
            <div class="col-12 text-center text-muted">
              Cargando totales...
            </div>
          </div>

        </div>
      </div>









      <!-- Tabla -->
      <div class="table-responsive rounded-3 shadow-sm">

        <table class="table table-hover align-middle text-start mb-0 text-nowrap shadow-sm text-uppercase" id="tabla_res">
          <thead class="text-white" style="background: #212529;">
            <tr>
              <th scope="col" class="px-3 py-3">N°</th>

              <th scope="col" class="px-3 py-3">FECHA</th>

              <th scope="col" class="px-3 py-3">MES</th>
              <th scope="col" class="px-3 py-3">MAQUINA</th>
              <th scope="col" class="px-3 py-3">POZO</th>
              <th scope="col" class="px-3 py-3">ADITIVO</th>
              <th scope="col" class="px-3 py-3">KG</th>
              <th scope="col" class="px-3 py-3">LT</th>
              <th scope="col" class="px-3 py-3">PROYECTOS</th>
              <th scope="col" class="px-3 py-3">RESPONSABLE</th>
              <th scope="col" class="px-3 py-3 text-center">ACCIONES</th>
            </tr>
          </thead>
          <tbody id="content_table" class="small table-light text-center"></tbody>
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

<script src="../JS/c.aditivos.fn.js"></script>