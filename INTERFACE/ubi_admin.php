
<div class="p-4 bg-light mt-5 mb-5" >

  <div class="card  border-0 shadow-sm rounded-4">

    <!-- Encabezado -->
    <div class="card-body ">

          <!-- BANNER -->
      <div class="card border-0 shadow-sm rounded-4 mb-4" id="bnn_int">
              <div class="card-body text-white py-4 px-4">
                  <div class="col-md-12">
                    <h4 class="fw-semibold mb-1">
                       UBICACIONES | KLUSSA 
                    </h4>
              
                </div>
        </div>
  </div>

<div class="card shadow rounded-4 p-3 mb-3 border-0">



  <!-- BOTONES + BUSCADOR -->
  <div class="row g-3 align-items-center">

    <!-- BOTONES -->
    <div class="col-12 col-lg-5">
      <div class="row g-2">

        <div class="col-12 col-sm-4 d-grid">
          <button id="bnt_reg" class="btn btn-sm btn-primary rounded-pill">
            <i class="fa-solid fa-gas-pump me-1"></i> Registrar
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
   

      <!-- Tabla -->
      <div class="table-responsive  ">

        <table class="table " id="tabla_res">
          <thead class="text-white" style="background: #212529;">
            <tr>
              <th scope="col" class="px-3 py-3">N°</th>
              <th scope="col" class="px-3 py-3">UBICACIONES</th>
              <th scope="col" class="px-3 py-3">OPCIONES</th>
            </tr>
          </thead>
          <tbody id="content_table" class="small table-light"></tbody>
          <tfoot> <tr class="" id ="totales"></tr> </tfoot>
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

<script src="../JS/ubicaciones.fn.js"></script>
