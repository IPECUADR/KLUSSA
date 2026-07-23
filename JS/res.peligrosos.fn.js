$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {

    let url = '../DATABASE/cg_res_hse_esp.php'; // URL estándar
    let t_url = '../DATABASE/t_res_p.php';
    let params = {};

    c_aut_des_p(url, params);
    total(t_url, params);
    fil_cbx_agencia();
    fil_residuos();
    fil_res();
    cbx_clasificacion();
    fil_cbx_rhomb();//para flitrar por rhomb esto hace que se cargue el cbx de rhomb al iniciar la pagina victor alvarez

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});




/// vatiables de entorno
// URL estándar
let llenar_tabla = [];
let url = '../DATABASE/cg_res_hse_esp.php';
let params = {};


function c_aut_des_p(url, params) {


  $.ajax({
    url: url,
    data: params,
    type: 'POST',

    success: function (response) {
      console.log(response);
      $('#content_table').empty();
      llenar_tabla = Object.values(JSON.parse(response)).filter(item => typeof item === 'object');
      var json = JSON.parse(response);






      if (!json.err) {
        var contador = 1;

        $.each(json, function (i, item) {






          if (i != "err") {








            var codigo = `
              <tr>
                <td>${contador}</td>
                <td>${item.mes_res}</td>
                <td>${item.fc_disp}</td>
                <td>${item.code_res}</td>
               
                <td> <span class="badge text-white bg-secondary p-2"><i class="far fa-check-circle"></i> ${item.ct_kg} Kg</span></td>
                <td><span class="badge text-white bg-dark p-2"><i class="far fa-check-circle"></i> ${item.ct_tn} T</span></td>
                <td><span class="badge text-white bg-info p-2"><i class="far fa-check-circle"></i> ${item.ct_lit} L</span></td>
                <td><span class="badge text-white bg-primary p-2" > <i class="far fa-check-circle"></i> ${item.ct_gl} Gl</span></td>
                
                <td>${item.proyecto}</td>
                <td>${item.clf_sis_r}</td>
                <td>${item.gestor_res}</td>
                <td>${item.resp_des}</td>
                <td><span class="badge text-white bg-danger p-2">$ ${item.ct_total_des} .00</span></td>
                <td id="${item.PK_disp}">
                 
                  <button type="button" class="btn btn-warning btn-sm mb-1 mt-1" id="btn_edit">
                    <i class="fas fa-edit"></i>
                  </button> 
          
                
                  <button type="button" id="btn_delete" class="btn btn-danger btn-sm mb-1 mt-1">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
`;




          }


          //asignacion de informacion

          $('#content_table').append(codigo);

          contador++


        })
      } else {

        mensaje(json.mensaje, 'info')

      }
    }
  })


}

/// mostrar datos en  el  sistema



























$(document).on('click', '#bnt_reg_res_p', function () {


  $('#modal').modal('show');


  cbx_mes_res();
  cbx_res();
  cbx_agencia();
  modal_insert();
  cbx_ubicacion();
  cbx_maquina();
  cbx_gestora();
})






function modal_insert() {

  $('#modal').modal('show');
  $('#titulo_modal').empty('');
  $('#form_modal').empty('');
  $('#form_modal_footer').empty('');



  var title = `
<div class="container-fluid py-2 border-bottom" >
  <div class="row align-items-center">
    <div class="col-3 d-flex align-items-center">
      <img src="../IMAGE/lg.png" alt="Logo" style="height:32px; width:auto;">
    </div>
    <div class="col-6 text-center">
      <span class="fw-semibold" style="font-size:0.95rem;">BITÁCORA DE GESTIÓN AMBIENTAL</span>
    </div>
    <div class="col-3 text-end">
      <small class="text-light opacity-75 fw-semibold">EC-HSE-F-53 </small>
    </div>
  </div>
</div>

<button type="button" class="btn btn-link text-danger p-0" data-bs-dismiss="modal" aria-label="Close">
  <i class="fa-solid fa-xmark fa-lg"></i>
</button>
`;

  var form = `
   
     <div class="container mt-2">
  <div class="card shadow-sm border-0 rounded-3 ficha-form">
    <div class="card-header text-white fw-bold py-3" style="background: #212529;">
      <i class="fa-solid fa-recycle me-2"></i>REGISTRO | BITACORA DE CONTROL RESIDUOS PELIGROSOS Y/O ESPECIALES
    </div>
   
 <form id="detalle_residuo" class="container-fluid py-2">

  <div class="card border-0 shadow-sm">
    <div class="card-body">

      

      <!-- Cuerpo del formulario -->
      <div class="row g-3">

        <div class="col-md-6">
          <label for="cbx_mes" class="form-label small fw-semibold text-muted">Mes</label>
          <select class="form-select form-select-sm"  id="cbx_mes_res" name="cbx_mes"></select>
        </div>

        <div class="col-md-6">
          <label for="fecha_entrega" class="form-label small fw-semibold text-muted">Fecha de entrega</label>
          <input type="date" class="form-control form-control-sm" id="fecha_entrega" name="fecha_entrega" >
        </div>


        <div class="col-md-6">
          <label for="cbx_res" class="form-label small fw-semibold text-muted">Código</label>
          <select class="form-select form-select-sm" id="cbx_res" name="cbx_res"></select>
        </div>

        <div class="col-md-6" id="des_residuo">
          <label for="cbx_codigo" class="form-label small fw-semibold text-muted">Descripción del Residuo</label>
          <input type="text" class="form-control form-control-sm" readonly placeholder="Descripción automática">
        </div>

        <div class="col-md-6">
          <label for="cbx_agencia" class="form-label small fw-semibold text-muted">Agencia</label>
          <select class="form-select form-select-sm" id="cbx_agencia" name="cbx_agencia"></select>
        </div>

        <div class="col-md-6">
          <label for="cbx_ubicacion" class="form-label small fw-semibold text-muted">Ubicación</label>
          <select class="form-select form-select-sm" id="cbx_ubicacion" name="cbx_ubicacion" readonly></select>
        </div>

        <div class="col-md-6">
          <label for="cbx_maquina" class="form-label small fw-semibold text-muted">Máquina</label>
          <select class="form-select form-select-sm" id="cbx_maquina" name="cbx_maquina" readonly></select>
        </div>

        <div class="col-md-6">
          <label for="ct_kg" class="form-label small fw-semibold text-muted">Cantidad (kg)</label>
          <input type="text" class="form-control form-control-sm" id="ct_kg" name="ct_kg" placeholder="Kilos">
        </div>

        <div class="col-md-6">
          <label for="ct_ton" class="form-label small fw-semibold text-muted">Cantidad (ton)</label>
          <input type="text" class="form-control form-control-sm" id="ct_ton" name="ct_ton" placeholder="Toneladas" >
        </div>

        <div class="col-md-6">
          <label for="ct_lt" class="form-label small fw-semibold text-muted">Cantidad (L)</label>
          <input type="text" class="form-control form-control-sm" id="ct_lt" name="ct_lt" placeholder="Litros" >
        </div>

        <div class="col-md-6">
          <label for="ct_gl" class="form-label small fw-semibold text-muted">Cantidad (gal)</label>
          <input type="text" class="form-control form-control-sm" id="ct_gl" name="ct_gl" placeholder="Galones" >
        </div>

        <div class="col-md-6">
          <label for="cbx_gestora" class="form-label small fw-semibold text-muted">Gestora</label>
          <select class="form-select form-select-sm" id="cbx_gestora" name="cbx_gestora"></select>
        </div>

        <div class="col-md-6">
          <label for="manifesto" class="form-label small fw-semibold text-muted">Manifiesto</label>
          <input type="text" class="form-control form-control-sm" id="manifesto" name="manifesto" placeholder="Manifesto">
        </div>

        <div class="col-md-6">
          <label for="responsable" class="form-label small fw-semibold text-muted">Responsable</label>
          <input type="text" class="form-control form-control-sm" id="responsable" name="responsable" placeholder="Katty Conforme">
        </div>

        <div class="col-md-6">
          <label for="cargo" class="form-label small fw-semibold text-muted">Cargo</label>
          <input type="text" class="form-control form-control-sm" id="cargo" name="cargo" placeholder="Cargo del Responsable">
        </div>
         <div class="col-md-3">
          <label for="ct_trans" class="form-label small fw-semibold text-muted">$ Transporte</label>
          <input type="number" class="form-control form-control-sm" id="ct_trans" name="ct_trans" placeholder="Costo del Transporte">
        </div>
        <div class="col-md-3">
          <label for="ct_gest" class="form-label small fw-semibold text-muted">$ Gestor</label>
          <input type="number" class="form-control form-control-sm" id="ct_gest" name="ct_gest" placeholder="Costo del Gestor">
        </div>
        <div class="col-12">
          <label for="desc_dispo" class="form-label small fw-semibold text-muted">Descripción Disposición</label>
          <textarea class="form-control form-control-sm" rows="3" id="desc_dispo" name="desc_dispo" placeholder="Descripción de la disposición"></textarea>
        </div>

      </div>
    </div>
  </div>
</form>



   
   
   
   `;
  var footer = `

   <div class="container-fluid border-top pt-3" >
  <div class="row g-2">



    <div class="col-md-6 col-12">
      <button type="button" class="btn btn-outline-primary w-100" id="btn_registro">
       <i class="fas fa-save"></i>  Guardar Registro
      </button>
    </div>



 <div class="col-md-6 col-12">
 
      <button type="button" class="btn btn-outline-danger w-100" id="btn_cerrar" data-bs-dismiss="modal">
        <i class="fas fa-times-circle"></i> Cancelar
      </button>
    </div>

  </div>
</div>



</div>
   `;


  $('#modal').modal('show');
  $('#titulo_modal').append(title);
  $('#form_modal').append(form);
  $('#form_modal_footer').append(footer);


}
///// funcion carga de fecha automatica al seleccionar el mes


$(document).on('change', '#cbx_mes_res', function () {

  mes = this.value;

  let an = new Date().getFullYear(); // año actual

  mes = mes.padStart(2, '0'); // 01,02,03...

  console.log('Mes seleccionado:', mes); // Verificar el valor del mes seleccionado 

  if (mes !== '') {
    im_fc = an + '-' + mes + '-01';

    $('#fecha_entrega').val(im_fc);

  } else { mensaje('Selecciona un mes', 'warning'); }

});





///
function cbx_mes_res() {
  $.ajax({
    url: '../DATABASE/cbx_mes_res_p.php',
    type: 'POST',
    success: function (response) {
      var json = JSON.parse(response);
      if (!json.err) {
        $('#cbx_mes_res').empty();
        $('#cbx_mes_res').append('<option value="">MES</option>');
        $.each(json, function (i, item) {
          if (i != "err") {
            var option = '<option value="' + item.PK_mes + '">' + item.mes_res + '</option>';
            $('#cbx_mes_res').append(option);
          }
        });
      }
    }
  });
}


/// filtros 

function fil_res() {
  $.ajax({
    url: '../DATABASE/cbx_mes_res_p.php',
    type: 'POST',
    success: function (response) {
      var json = JSON.parse(response);
      if (!json.err) {
        $('#cbx_fil_mes').empty();
        $('#cbx_fil_mes').append('<option value="">MES</option>');
        $.each(json, function (i, item) {
          if (i != "err") {
            var option = '<option value="' + item.PK_mes + '">' + item.mes_res + '</option>';
            $('#cbx_fil_mes').append(option);
          }
        });
      }
    }
  });
}


function fil_residuos() {
  $.ajax({
    url: '../DATABASE/cg_codigo_cbx_des_p.php',
    type: 'POST',
    success: function (response) {
      var json = JSON.parse(response);
      if (!json.err) {
        $('#cbx_fil_res').empty();
        $('#cbx_fil_res').append('<option value="">RESIDUO</option>');
        $.each(json, function (i, item) {
          if (i != "err") {
            var option = `<option value="${item.id_res}">${item.code_res}</option>`;
            desc = item.descrip_residuo;
            option = $(option).data('desc', desc);

            $('#cbx_fil_res').append(option);


          }
        });
      }
    }
  });
}


function cbx_clasificacion() {
  $.ajax({
    url: '../DATABASE/cbx_t_residuo_f_p.php', // PHP que devuelve los manifiestos
    type: 'POST',
    success: function (response) {
      var json = JSON.parse(response);
      if (!json.err) {
        $('#cbx_tipo').empty();
        $('#cbx_tipo').append('<option value="">TIPO </option>');
        $.each(json, function (i, item) {
          if (i != "err") {
            var option = '<option value="' + item.PK_t_res + '">' + item.t_residuo + '</option>';
            $('#cbx_tipo').append(option);
          }
        });
      }
    }
  });
}

/// modal 

function cbx_res() {
  $.ajax({
    url: '../DATABASE/cg_codigo_cbx_des_p.php',
    type: 'POST',
    success: function (response) {
      var json = JSON.parse(response);
      if (!json.err) {
        $('#cbx_res').empty();
        $('#cbx_res').append('<option value="">RESIDUO</option>');
        $.each(json, function (i, item) {
          if (i != "err") {
            var option = `<option value="${item.id_res}">${item.code_res}</option>`;
            desc = item.descrip_residuo;
            option = $(option).data('desc', desc);

            $('#cbx_res').append(option);


          }
        });
      }
    }
  });
}


// Mostrar descripción al cambiar el select
$(document).on('change', '#cbx_res', function () {
  $('#des_residuo').empty();
  const desc = $(this).find(':selected').data('desc') || 'Sin descripción';
  cargar_des(desc);
});


function cargar_des(valor) {





  var des = `
 

     
          <label for="cbx_codigo" class="form-label small fw-semibold text-muted">Descripción del Residuo</label>
       
        
     

        <textarea class="form-control form-control-sm mt-2" rows="2" readonly>`+ valor + `</textarea>



        
  `;

  $('#des_residuo').append(des);



}




function cbx_maquina() {
  $.ajax({
    url: '../DATABASE/cbx_ma_res.php',
    type: 'POST',
    success: function (response) {
      var json = JSON.parse(response);
      if (!json.err) {
        $('#cbx_maquina').empty();
        $('#cbx_maquina').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function (i, item) {
          if (i != "err") {
            var option = '<option value="' + item.PK_maquina + '">' + item.serie_maquina + '</option>';
            $('#cbx_maquina').append(option);
          }
        });
      }
    }
  });
}

function cbx_agencia() {
  $.ajax({
    url: '../DATABASE/cg_agencia_cbx.php',
    type: 'POST',
    success: function (response) {
      var json = JSON.parse(response);
      if (!json.err) {
        $('#cbx_agencia').empty();
        $('#cbx_agencia').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function (i, item) {
          if (i != "err") {
            var option = '<option value="' + item.PK_pro + '">' + item.proyecto + '</option>';
            $('#cbx_agencia').append(option);
          }
        });
      }
    }
  });
}

function cbx_gestora() {
  $.ajax({
    url: '../DATABASE/cbx_gestora_des_p.php',
    type: 'POST',
    success: function (response) {
      var json = JSON.parse(response);
      if (!json.err) {
        $('#cbx_gestora').empty();
        $('#cbx_gestora').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function (i, item) {
          if (i != "err") {
            var option = '<option value="' + item.PK_gestor + '">' + item.gestor_res + '</option>';
            $('#cbx_gestora').append(option);
          }
        });
      }
    }
  });
}


function cbx_ubicacion() {
  $.ajax({
    url: '../DATABASE/cbx_ubicacion.php', // PHP que devuelve los manifiestos
    type: 'POST',
    success: function (response) {
      var json = JSON.parse(response);
      if (!json.err) {
        $('#cbx_ubicacion').empty();
        $('#cbx_ubicacion').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function (i, item) {
          if (i != "err") {
            var option = '<option value="' + item.PK_ub + '">' + item.ubicacion + '</option>';
            $('#cbx_ubicacion').append(option);
          }
        });
      }
    }
  });
}




/////////////// calcular 


///// CALCULO AUTOMATICO

let bloqueandoKG = false;
let bloqueandoLT = false;

/* ===========================
   FUNCIONES DE BLOQUEO
   =========================== */
function bloquearPeso() {
  $('#ct_kg, #ct_ton').prop('disabled', true).val(0);
}

function desbloquearPeso() {
  $('#ct_kg, #ct_ton').prop('disabled', false);
}

function bloquearVolumen() {
  $('#ct_lt, #ct_gl').prop('disabled', true).val(0);
}

function desbloquearVolumen() {
  $('#ct_lt, #ct_gl').prop('disabled', false);
}

/* ===========================
   KILOS -> TONELADAS
   =========================== */
$(document).on('input', '#ct_kg', function () {
  if (bloqueandoKG) return;
  bloqueandoKG = true;

  const kg = parseFloat(this.value) || 0;
  const ton = kg / 1000;

  $('#ct_ton').val(ton.toFixed(3));

  if (kg > 0) {
    bloquearVolumen();
  } else {
    desbloquearVolumen();
  }

  bloqueandoKG = false;
});

$(document).on('input', '#ct_ton', function () {
  if (bloqueandoKG) return;
  bloqueandoKG = true;

  const ton = parseFloat(this.value) || 0;
  const kg = ton * 1000;

  $('#ct_kg').val(kg.toFixed(3));

  if (ton > 0) {
    bloquearVolumen();
  } else {
    desbloquearVolumen();
  }

  bloqueandoKG = false;
});

/* ===========================
   LITROS -> GALONES
   =========================== */
$(document).on('input', '#ct_lt', function () {
  if (bloqueandoLT) return;
  bloqueandoLT = true;

  const litros = parseFloat(this.value) || 0;
  const galones = litros / 3.785;

  $('#ct_gl').val(galones.toFixed(3));

  if (litros > 0) {
    bloquearPeso();
  } else {
    desbloquearPeso();
  }

  bloqueandoLT = false;
});

$(document).on('input', '#ct_gl', function () {
  if (bloqueandoLT) return;
  bloqueandoLT = true;

  const galones = parseFloat(this.value) || 0;
  const litros = galones * 3.785;

  $('#ct_lt').val(litros.toFixed(3));

  if (galones > 0) {
    bloquearPeso();
  } else {
    desbloquearPeso();
  }

  bloqueandoLT = false;
});



$(document).on('click', '#btn_registro', function () {

  let url = '../DATABASE/cg_res_hse_esp.php'; // URL estándar
  let params = {};

  // capturo datos del formulario
  const fechaEntrega = $('#fecha_entrega').val().trim();
  const mes = $('#cbx_mes_res').val().trim();
  const codigo = $('#cbx_res').val().trim();
  const agencia = $('#cbx_agencia').val().trim();
  const ub = $('#cbx_ubicacion').val().trim();
  const mq = $('#cbx_maquina').val().trim();
  const kg = $('#ct_kg').val().trim();
  const ton = $('#ct_ton').val().trim();
  const lt = $('#ct_lt').val().trim();
  const gl = $('#ct_gl').val().trim();
  const gestora = $('#cbx_gestora').val().trim();
  const manifesto = $('#manifesto').val().trim();
  const responsable = $('#responsable').val().trim();
  const cargo = $('#cargo').val().trim();
  const descrip = $('#desc_dispo').val().trim(); //  valor de  la  descripcion  del  residuo
  const ct_trans = $('#ct_trans').val().trim(); // costo transporte
  const ct_gest = $('#ct_gest').val().trim(); // costo gestor 
  /// validdacion, si los campos estan vacios


  if (fechaEntrega === '') return mensaje('Selecciona una fecha de entrega', 'warning');
  if (mes === '') return mensaje('Selecciona el mes correspondiente', 'warning');
  if (codigo === '') return mensaje('Selecciona un código de residuo', 'warning');
  if (agencia === '') return mensaje('Selecciona una agencia', 'warning');
  if (ub === '') return mensaje('Selecciona la ubicación', 'warning');
  if (mq === '') return mensaje('Selecciona la máquina o equipo', 'warning');
  if (kg === '' && ton === '' && lt === '' && gl === '')
    return mensaje('Debes ingresar al menos una cantidad (kg, ton, lt o gl)', 'warning');
  if (gestora === '') return mensaje('Selecciona una empresa gestora', 'warning');

  if (manifesto === '') return mensaje('Ingresa un manifesto', 'warning');
  if (responsable === '') return mensaje('Ingresa el nombre del responsable', 'warning');
  if (cargo === '') return mensaje('Ingrese su cargo', 'warning');
  if (descrip === '') return mensaje('Ingrese una descripcion', 'warning');

  if (ct_trans === '') return mensaje('Ingresa el costo del transporte,  si no aplica ingresa 0', 'info');
  if (ct_gest === '') return mensaje('Ingresa el costo del gestor,  si no aplica ingresa 0', 'info');
  ///  ingreso del  registro, 

  $.ajax({
    url: '../DATABASE/insert_reg_p.php',
    type: 'POST',
    data: { fechaEntrega, mes, codigo, agencia, ub, mq, kg, ton, lt, gl, gestora, responsable, manifesto, cargo, descrip, ct_gest, ct_trans },

    beforeSend: function () {
      mensaje('Enviando datos...', 'info');
      $('#btn_registro').prop('disabled', true);
    },
    success: function (response) {
      console.log(response);
      var json = JSON.parse(response);

      if (!json.err) { mensaje(json.mensaje, 'success'); c_aut_des_p(url, params); $('#modal').modal('hide'); } else { mensaje(json.mensaje, 'error') }



    },
    error: function (xhr, status, error) {
      console.error(error);
      mensaje('Ocurrió un error en la solicitud', 'error');
    },
    complete: function () {
      $('#btn_registro').prop('disabled', false);
    }
  });


});


function mensaje(mensaje, icono) {

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: icono,
    title: mensaje,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
  });


}












/// eliminacion de registros//
$(document).on('click', '#btn_delete', function (event) {

  let url = '../DATABASE/cg_res_hse_esp.php'; // URL estándar
  let params = {};

  // MOSTRAMOS LOS RECURSOS PARA CARGAR DATOS

  var delete_info = $(this)[0].parentElement;
  id = $(delete_info).attr("id");

  console.log(id);

  Swal.fire({
    title: "¿Deseas eliminar el registro?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "No, cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      $.post('../DATABASE/del_reg_resp.php', {


        id_delete: id


      })
        .done(function (response) {

          const res = JSON.parse(response);
          console.log(response);

          mensaje(res.mensaje, res.status);

          if (res.status === 'success') {

            c_aut_des_p(url, params);

          }

        })

    }
  });
});


/// variable de entorno



// funciones de acciones en modales 

// Mostar ficha de dispocicion de residuos peligrosos

let pk_registro = 0;

$(document).on('click', '#btn_edit', function () {

  // capturo el id del registro
  let view_info = $(this).closest('td');
  let id = view_info.attr('id');  // más limpio que parentElement

  console.log('ID capturado:', id);
  console.log('llenar_tabla:', llenar_tabla); // 👈 verifica que tenga datos antes de buscar

  // buscar el objeto correspondiente en el JSON global
  let cp = llenar_tabla.find(item => item.PK_disp == parseInt(id));


  pk_registro = cp.PK_disp; // asignar a variable global si es necesario



  $('#modal').modal('show');





  $('#titulo_modal').empty('');
  $('#form_modal').empty('');
  $('#form_modal_footer').empty('');


  var title = `
<div class="container-fluid py-2 border-bottom" >
  <div class="row align-items-center">
    <div class="col-3 d-flex align-items-center">
      <img src="../IMAGE/lg.png" alt="Logo" style="height:32px; width:auto;">
    </div>
    <div class="col-6 text-center">
      <span class="fw-semibold" style="font-size:0.95rem;">BITÁCORA DE GESTIÓN AMBIENTAL</span>
    </div>
    <div class="col-3 text-end">
      <small class="text-light opacity-75 fw-semibold">EC-HSE-F-53 </small>
    </div>
  </div>
</div>

<button type="button" class="btn btn-link text-danger p-0" data-bs-dismiss="modal" aria-label="Close">
  <i class="fa-solid fa-xmark fa-lg"></i>
</button>
`;



  var ficha = `
   <div class="container mt-2">
  <div class="card shadow-sm border-0 rounded-3 ficha-form">
    <div class="card-header text-white fw-bold py-3" style="background: #212529;">
      <i class="fa-solid fa-recycle me-2"></i> BITÁCORA DE CONTROL RESIDUOS PELIGROSOS Y/O ESPECIALES
    </div>

    <div class="card-body px-4 py-4">
      <form id="detalle_residuo" class="container-fluid">
        <div class="row g-3">

          <div class="col-md-6">
            <label class="form-label fw-semibold">Fecha de entrega</label>
            <div class="input-group input-group-sm mb-2" id="select_mes">
              <input type="date" class="form-control" id="fc_disp" name="fecha_entrega" value="${cp.fc_disp}" readonly>
              <button class="btn btn-sm bg-transparent border-0" type="button" id="edit" title="Editar fecha"><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-semibold">Mes</label>
            <div class="input-group input-group-sm mb-2">
              <input type="text" class="form-control" name="FK_mes" id="mes_res" value="${cp.mes_res}" readonly>
              <button class="btn btn-sm bg-transparent border-0" type="button" id="edit_select"><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-semibold">Código</label>
            <div class="input-group input-group-sm mb-2">
              <input type="text" class="form-control" name='FK_res'  id="res" value="${cp.code_res}" readonly>
              <button class="btn btn-sm bg-transparent border-0" type="button" id="edit_select"><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>

          <div class="col-md-6" id="des_residuo">
            <label class="form-label fw-semibold">Descripción del Residuo</label>
            <div class="input-group input-group-sm mb-2">
            
               <textarea class="form-control form-control-sm mt-2" rows="2" readonly>${cp.descrip_residuo}</textarea>
           
              <button class="btn btn-sm bg-transparent border-0" type="button" ><i class="fa-solid fa-triangle-exclamation"></i></button>
            </div>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-semibold">Agencia</label>
            <div class="input-group input-group-sm mb-2">
              <input type="text" class="form-control" name="FK_pro" id="agencia" value="${cp.proyecto}" readonly>
              <button class="btn btn-sm bg-transparent border-0" type="button" id="edit_select"><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-semibold">Ubicación</label>
            <div class="input-group input-group-sm mb-2">
              <input type="text" class="form-control" name="FK_ub" id="ubicacion" value="${cp.ubicacion}" readonly>
              <button class="btn btn-sm bg-transparent border-0" type="button" id="edit_select"><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-semibold">Máquina</label>
            <div class="input-group input-group-sm mb-2">
              <input type="text" class="form-control" name="FK_mq" id="maquina" value="${cp.serie_maquina}" readonly>
              <button class="btn btn-sm bg-transparent border-0" type="button" id="edit_select"><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>

          <div class="col-md-3">
            <label class="form-label fw-semibold">Cantidad (kg)</label>
            <div class="input-group input-group-sm mb-2">
              <input type="text" class="form-control" id="ct_kg" value="${cp.ct_kg}" readonly>
              <button class="btn btn-sm bg-transparent border-0" type="button" id="edit"><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>

          <div class="col-md-3">
            <label class="form-label fw-semibold">Cantidad (ton)</label>
            <div class="input-group input-group-sm mb-2">
              <input type="text" class="form-control" id="ct_tn" value="${cp.ct_tn}" readonly>
              <button class="btn btn-sm bg-transparent border-0" type="button" id="edit"><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>

          <div class="col-md-3">
            <label class="form-label fw-semibold">Cantidad (L)</label>
            <div class="input-group input-group-sm mb-2">
              <input type="text" class="form-control" id="ct_lit" value="${cp.ct_lit}" readonly>
              <button class="btn btn-sm bg-transparent border-0" type="button" id="edit"><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>

          <div class="col-md-3">
            <label class="form-label fw-semibold">Cantidad (gal)</label>
            <div class="input-group input-group-sm mb-2">
              <input type="text" class="form-control" id="ct_gl" value="${cp.ct_gl}" readonly>
              <button class="btn btn-sm bg-transparent border-0" type="button" id="edit"><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-semibold">Gestora</label>
            <div class="input-group input-group-sm mb-2">
              <input type="text" class="form-control" name="FK_gest" id="gestora" value="${cp.gestor_res}" readonly>
              <button class="btn btn-sm bg-transparent border-0" type="button" id="edit_select"><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-semibold">Manifiesto</label>
            <div class="input-group input-group-sm mb-2">
              <input type="text" class="form-control" id="mnft" value="${cp.mnft}" readonly>
              <button class="btn btn-sm bg-transparent border-0" type="button" id="edit"><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-semibold">Responsable</label>
            <div class="input-group input-group-sm mb-2">
              <input type="text" class="form-control" id="resp_des" value="${cp.resp_des}" readonly>
              <button class="btn btn-sm bg-transparent border-0" type="button" id="edit"><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-semibold">Cargo</label>
            <div class="input-group input-group-sm mb-2">
              <input type="text" class="form-control" id="cargo" value="${cp.cargo}" readonly>
              <button class="btn btn-sm bg-transparent border-0" type="button" id="edit"><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>

           <div class="col-md-3">
            <label class="form-label fw-semibold">$ Gestor</label>
            <div class="input-group input-group-sm mb-2">
              <input type="text" class="form-control" id="ct_gestor_des" value="${cp.ct_gestor_des}" readonly>
              <button class="btn btn-sm bg-transparent border-0" type="button" id="edit"><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>

           <div class="col-md-3">
            <label class="form-label fw-semibold">$ Transporte</label>
            <div class="input-group input-group-sm mb-2">
              <input type="text" class="form-control" id="ct_trasporte_des" value="${cp.ct_trasporte_des}" readonly>
              <button class="btn btn-sm bg-transparent border-0" type="button" id="edit"><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>

          <div class="col-12">
            <label class="form-label fw-semibold">Descripción disposición</label>
            <div class="input-group input-group-sm mb-2">
              <textarea class="form-control form-control-sm" id="des_des" rows="3" readonly>${cp.des_des}</textarea>
              <button class="btn btn-sm bg-transparent border-0 align-self-start" type="button" id="edit_textarea"><i class="fa-solid fa-pencil"></i></button>
            </div>
          </div>

        </div>
      </form>
    </div>
  </div>
</div>


`;


  var footer = `
<div class="container-fluid border-top pt-3" >
  <div class="row g-2">





 <div class="col-md-6 col-12">
      <button type="button" class="btn btn-outline-info  w-100" id="btn_pdf">
      <i class="fas fa-file-pdf"></i> Imprimir
      </button>
    </div>

 <div class="col-md-6 col-12">
      <button type="button" class="btn btn-outline-danger w-100" id="btn_cerrar" data-bs-dismiss="modal">
        <i class="fas fa-times-circle"></i> Cerrar
      </button>
    </div>

  </div>
</div>
`;



  /// asignacion de valores  al modal

  $('#form_modal').append(ficha);
  $('#titulo_modal').append(title);

  $('#form_modal_footer').append(footer);
});


// generacion de pdf
$(document).on('click', '#btn_pdf', function () {



  let cp = llenar_tabla.find(item => item.PK_disp == parseInt(pk_registro));

  if (!cp) {
    console.error('No se encontró el registro c');
    return;
  }

  $.ajax({
    url: '../PDF/bit_peligrosos.php',
    type: 'POST',
    data: { cp: JSON.stringify(cp) },
    xhrFields: { responseType: 'blob' },
    success: function (blob) {
      if (blob.size === 0) {
        alert('Error: PDF vacío o contenido inválido');
        return;
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'EC-HSE-F-53-RESIDUOS_PELIGROSOS.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    },
    error: function (xhr, status, error) {
      console.error('Error AJAX:', error);
    }
  });

});






// generacion de pdf
$(document).on('click', '#btn_pdf__rp', function () {





  if (!llenar_tabla) {
    console.error('No se encontró el registro c');
    return;
  }

  $.ajax({
    url: '../PDF/rp_des_p.php',
    type: 'POST',
    data: { cp: JSON.stringify(llenar_tabla) },
    xhrFields: { responseType: 'blob' },
    success: function (blob) {
      if (blob.size === 0) {
        alert('Error: PDF vacío o contenido inválido');
        return;
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'EC-HSE-F-53-RESIDUOS_PELIGROSOS.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    },
    error: function (xhr, status, error) {
      console.error('Error AJAX:', error);
    }
  });

});




/// editar imputs 

$(document).on('click', '#edit', function () {

  var input = $(this).siblings('input'); // busca el input hermano


  if (input.prop('readonly')) {

    input.prop('readonly', false);

    $(this).attr('title', 'Guardar fecha');
    $(this).find('i').removeClass('fa-pencil').addClass('fa-floppy-disk');


  } else {

    input.prop('readonly', true);
    $(this).attr('title', 'Editar fecha');
    $(this).find('i').removeClass('fa-floppy-disk').addClass('fa-pencil');


    // Aquí puedes agregar la lógica para guardar la nueva fecha en la base de datos si es necesario

    var campo = input.attr('id');
    update_dato = input.val();

    console.log('PK registro:', pk_registro);

    console.log('Nueva dato:', update_dato);

    if (update_dato.length === 0) {
      mensaje('El campo no puede estar vacío', 'warning');
      return;


    }

    $.post(
      '../DATABASE/up_dis_r_p.php',
      { campo: campo, update_dato: update_dato, id: pk_registro },
      function (response) {


        var json = JSON.parse(response);

        console.log('Respuesta del servidor:', response);
        mensaje(json.mensaje, json.status);
        c_aut_des_p(url, params); // refrescar la tabla después de la actualización
      }
    );


  }


});

id_elemento = '';
// editar  select
$(document).on('click', '#edit_select', function () {



  var input = $(this).siblings('input');
  id_elemento = input.attr('id');
  var name = input.attr('name');
  console.log('Campo a editar:', name);

  // Ejecutar función cbx_<campo>
  var cargar_cbx = `cbx_${id_elemento}`;

  if (typeof window[cargar_cbx] === "function") {
    window[cargar_cbx]();
  } else {
    console.log("Función no encontrada:", cargar_cbx);
    return;
  }

  // Crear select
  var select = `
        <select class="form-control form-control-sm" id="cbx_${id_elemento}" name="${name}"></select>
    `;

  // Botón que aparecerá junto al select
  var botonGuardar = `
        <button type="button" class="btn btn-success btn-sm ml-2" id="btn_guardar">
            <i class="fa-solid fa-check"></i>
        </button>
    `;


  // Reemplazar input → select
  input.replaceWith(select);

  // Insertar botón después del select
  $(this).after(botonGuardar);

});


// Guardar selección del select editado
$(document).on('click', '#btn_guardar', function () {
  var select = $(this).siblings('select');
  var name = select.attr('name');
  let newText = select.find("option:selected").text();

  id_reg = select.val();

  if (id_reg.length === 0) {
    mensaje('Debes seleccionar una opción', 'warning');

  } else {


    $.post(
      '../DATABASE/up_dis_r_p.php',
      { campo: name, update_dato: id_reg, id: pk_registro },
      function (response) {


        var json = JSON.parse(response);

        console.log('Respuesta del servidor:', response);
        mensaje(json.mensaje, json.status);
        c_aut_des_p(url, params); // refrescar la tabla después de la actualización
      }
    );


  }



  imput_replace = `<input type="text" class="form-control" name="${name}" id="${id_elemento}" value="${newText}" readonly>`;
  console.log(imput_replace);

  select.replaceWith(imput_replace);
  $(this).remove();


});



//editar textarea
$(document).on('click', '#edit_textarea', function () {


  var textarea = $(this).siblings('textarea'); // busca el textarea hermano


  if (textarea.prop('readonly')) {
    textarea.prop('readonly', false);

    $(this).attr('title', 'Guardar descripción');
    $(this).find('i').removeClass('fa-pencil').addClass('fa-floppy-disk');
  } else {
    textarea.prop('readonly', true);

    $(this).attr('title', 'Editar descripción');
    $(this).find('i').removeClass('fa-floppy-disk').addClass('fa-pencil');
    // Aquí puedes agregar la lógica para guardar la nueva descripción en la base de datos si es necesario
    var campo = textarea.attr('id');
    update_dato = textarea.val();

    console.log('PK registro:', pk_registro);

    console.log('Nueva dato:', update_dato);


    if (update_dato.length === 0) {
      mensaje('El campo no puede estar vacío', 'warning');
      return;



    } $.post(
      '../DATABASE/up_dis_r_p.php',
      { campo: campo, update_dato: update_dato, id: pk_registro },
      function (response) {
        var json = JSON.parse(response);

        console.log('Respuesta del servidor:', response);
        mensaje(json.mensaje, json.status);
        c_aut_des_p(url, params); // refrescar la tabla después de la actualización
      }
    );
  }

})

/// GENERO EL REPORTE EN EXCEL


$("#btn_export_excel").on("click", function () {

  $.ajax({
    url: "../EXCEL/RP_RES_P.php",
    type: "POST",
    data: { data: JSON.stringify(llenar_tabla) },
    xhrFields: { responseType: "blob" },

    success: function (blob) {
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "EC-HSE-F-53-RESIDUOS_PELIGROSOS.xls";
      link.click();
    }
  });

});



/// FILTROS
function verificacar_filtro() {

  const url = '../DATABASE/fil_reg_des_p.php';
  const t_url = '../DATABASE/t_res_p.php';
  let params = {};



  const mes = $('#cbx_fil_mes').val();
  const tipo = $('#cbx_tipo').val();
  const codigo = $('#cbx_fil_res').val();
  const agencia = $('#fil_cbx_agencia').val();
  const rhomb = $('#cbx_fil_rhomb').val();

  const campo1 = $('#cbx_fil_mes').attr('name');
  const campo2 = $('#cbx_tipo').attr('name');
  const campo3 = $('#cbx_fil_res').attr('name');
  const campo4 = $('#fil_cbx_agencia').attr('name');
  const campo5 = $('#cbx_fil_rhomb').attr('name');

  // Agregar filtros solo si tienen valor
  if (mes) {
    params.mes = mes;
    params.campo1 = campo1;
  }

  if (tipo) {
    params.tipo = tipo;
    params.campo2 = campo2;
  }

  if (codigo) {
    params.codigo = codigo;
    params.campo3 = campo3;
  }

  if (agencia) {
    params.agencia = agencia;
    params.campo4 = campo4;
  }

  // Agregar filtro de clasificación RHOMB solo si tiene valor victor Alvarez
  if (rhomb) {
    params.rhomb = rhomb;
    params.campo5 = campo5;
  }
  // Validar que al menos un filtro esté seleccionado
  if (Object.keys(params).length === 0) {
    mensaje('Debes seleccionar al menos un filtro', 'warning');
    return;
  }

  console.log('Filtros enviados:', params);
  c_aut_des_p(url, params);
  total(t_url, params); // actualizar total con filtros aplicados
}

// ejecucion de la funcion filtar
$('#btn_flt').click(function () {

  verificacar_filtro();


});

/// funciones total


// funcion para calcular los totales de los registros filtrados victor alvarez
function total(t_url, params) {

  $.post(t_url, params, function (r) {

    $('#resumen_totales').empty();

    console.log('Respuesta total:', r);

    if (r.err) {
      $('#resumen_totales').html(`
        <div class="col-12">
          <div class="alert alert-info mb-0">
            No existen valores para los filtros seleccionados.
          </div>
        </div>
      `);

      return;
    }

    $.each(r, function (i, item) {

      if (i !== 'err') {

        const kilos = Number(item.t_kg ?? 0).toLocaleString('es-EC', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

        const toneladas = Number(item.t_tn ?? 0).toLocaleString('es-EC', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 3
        });

        const litros = Number(item.t_lit ?? 0).toLocaleString('es-EC', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

        const galones = Number(item.t_gl ?? 0).toLocaleString('es-EC', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

        const gestor = Number(item.t_ges ?? 0).toLocaleString('es-EC', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

        const transporte = Number(item.t_trs ?? 0).toLocaleString('es-EC', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

        const gasto = Number(item.gasto ?? 0).toLocaleString('es-EC', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

        const totales = `
          <div class="col-6 col-md-4 col-xl">
            <div class="border rounded-3 p-3 h-100 bg-light">
              <small class="text-muted d-block mb-1">Kilogramos</small>
              <span class="fw-bold text-dark">${kilos} Kg</span>
            </div>
          </div>

          <div class="col-6 col-md-4 col-xl">
            <div class="border rounded-3 p-3 h-100 bg-light">
              <small class="text-muted d-block mb-1">Toneladas</small>
              <span class="fw-bold text-dark">${toneladas} Tn</span>
            </div>
          </div>

          <div class="col-6 col-md-4 col-xl">
            <div class="border rounded-3 p-3 h-100 bg-light">
              <small class="text-muted d-block mb-1">Litros</small>
              <span class="fw-bold text-info">${litros} L</span>
            </div>
          </div>

          <div class="col-6 col-md-4 col-xl">
            <div class="border rounded-3 p-3 h-100 bg-light">
              <small class="text-muted d-block mb-1">Galones</small>
              <span class="fw-bold text-primary">${galones} Gl</span>
            </div>
          </div>

          <div class="col-6 col-md-4 col-xl">
            <div class="border rounded-3 p-3 h-100 bg-light">
              <small class="text-muted d-block mb-1">Costo gestor</small>
              <span class="fw-bold text-dark">$ ${gestor}</span>
            </div>
          </div>

          <div class="col-6 col-md-4 col-xl">
            <div class="border rounded-3 p-3 h-100 bg-light">
              <small class="text-muted d-block mb-1">Transporte</small>
              <span class="fw-bold text-dark">$ ${transporte}</span>
            </div>
          </div>

          <div class="col-12 col-md-6 col-xl">
            <div class="border border-danger rounded-3 p-3 h-100 bg-light">
              <small class="text-muted d-block mb-1">Costo total</small>
              <span class="fw-bold text-danger">$ ${gasto}</span>
            </div>
          </div>
        `;

        $('#resumen_totales').append(totales);
      }
    });

  }, 'json').fail(function () {

    $('#resumen_totales').html(`
      <div class="col-12">
        <div class="alert alert-danger mb-0">
          No fue posible calcular las sumatorias.
        </div>
      </div>
    `);

  });

}
/// fil extra 


function fil_cbx_agencia() {
  $.ajax({
    url: '../DATABASE/cg_agencia_cbx.php',
    type: 'POST',
    success: function (response) {
      var json = JSON.parse(response);
      if (!json.err) {
        $('#fil_cbx_agencia').empty();
        $('#fil_cbx_agencia').append('<option value="">AGENCIA</option>');
        $.each(json, function (i, item) {
          if (i != "err") {
            var option = '<option value="' + item.PK_pro + '">' + item.proyecto + '</option>';
            $('#fil_cbx_agencia').append(option);
          }
        });
      }
    }
  });
}

// funcion para llenar el select de clasificacion rhomb victor Alvarez
function fil_cbx_rhomb() {
  $.ajax({
    url: '../DATABASE/cbx_rhomb_p.php',
    type: 'POST',
    dataType: 'json',

    success: function (json) {
      $('#cbx_fil_rhomb').empty();

      $('#cbx_fil_rhomb').append(
        '<option value="">CLASIFICACIÓN RHOMB</option>'
      );

      if (json.err) {
        console.warn(json.mensaje);
        return;
      }

      $.each(json, function (i, item) {
        if (i !== 'err') {
          var option =
            '<option value="' +
            item.PK_clf_sis_r +
            '">' +
            item.clf_sis_r +
            '</option>';

          $('#cbx_fil_rhomb').append(option);
        }
      });
    },

    error: function (xhr, status, error) {
      console.error('Error al cargar clasificación RHOMB:', error);
      console.error('Respuesta del servidor:', xhr.responseText);
    }
  });
}
