$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {

    let url = '../DATABASE/cg_res_hse_no_p.php'; // URL estándar
    let params = {};
    let t_url = '../DATABASE/t_res_n_p.php';// URL estándar
    residuos_no_peligrosos(url, params);
    total(t_url, params);
    fil_residuos();
    fil_res();
    cbx_clasificacion();
    fil_cbx_agencia();

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});

 /// variables de entorno
    let url = '../DATABASE/cg_res_hse_no_p.php'; // URL estándar
    let params = {};
    let llenar_tabla = []; 



function residuos_no_peligrosos (url,params){

  

   
  $.ajax({
      url:url ,
      data:params, 
      type: 'POST',
  
  
      success: function(response){
      console.log(response);
      $('#content_table').empty();
      llenar_tabla = Object.values(JSON.parse(response)).filter(item => typeof item === 'object');
      

      var json = JSON.parse(response);

      
      if(!json.err){
          var contador=1;

        $.each(json, function(i,item){


   
          
         
        if(i!="err"){

        
          
          
         
      


          var codigo =`
          
                      
       <tr>
          <td>${contador}</td>
          <td>${item.mes_res}</td>
          <td>${item.fc_disp}</td>
          <td>${item.descrip_residuo}</td>
          <td> <span class="badge text-white bg-secondary p-2"><i class="far fa-check-circle"></i> ${item.ct_kg} Kg</span></td>
          <td><span class="badge text-white bg-dark p-2"><i class="far fa-check-circle"></i> ${item.ct_tn} T</span></td>
          <td><span class="badge text-white bg-info p-2"><i class="far fa-check-circle"></i> ${item.ct_lit} L</span></td>
          <td><span class="badge text-white bg-primary p-2" ><i class="far fa-check-circle"></i> ${item.ct_gl} Gl</span></td>
          <td>${item.proyecto}</td>
          <td>${item.clf_sis_r}</td>
          <td>${item.gestor_res}</td>
          <td>${item.resp_des}</td>
          <td><span class="badge text-white bg-danger p-2">$ ${item.ct_total_des ?? 0} .00</span></td>
          <td id="${item.PK_disp}">

              <button type="button" id="btn_edit" class="btn btn-warning btn-sm mb-1 mt-1">
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
        
         contador ++


        })
      }
      else{

            mensaje(json.mensaje,'info')
            
          }
    }
  })


}

/// mostrar datos en  el  sistema






$(document).on('click', '#bnt_reg_res_p', function() {

 
$('#modal').modal('show');


    cbx_mes_res();
    cbx_res();
    cbx_maquina();
    cbx_agencia();
    modal_insert();
   cbx_gestora();
   cbx_ubicacion();
})






function modal_insert(){

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

   var form =`

<form id="detalle_residuo" class="container-fluid p-4 shadow-sm rounded-3 bg-white border">

  <!-- HEADER -->
  <div class="card border-0 mb-4">
    <div class="card-header text-white fw-bold py-3 rounded-3" style="background:#212529;">
      <i class="fa-solid fa-recycle me-2"></i>
      REGISTRO | BITÁCORA DE CONTROL RESIDUOS NO PELIGROSOS
    </div>
  </div>

  <div class="row g-3">

    <!-- MES -->
    <div class="col-md-6">
      <label class="form-label">Mes</label>
      <select class="form-select" id="cbx_mes_res" name="cbx_mes_res"></select>
    </div>

    <!-- FECHA -->
    <div class="col-md-6">
      <label class="form-label">Fecha de entrega</label>
      <input type="date" class="form-control" id="fecha_entrega" name="fecha_entrega">
    </div>

    <!-- RESIDUO -->
    <div class="col-md-6">
      <label class="form-label">Residuo</label>
      <select class="form-select" id="cbx_res" name="cbx_res"></select>
    </div>

    <!-- AGENCIA -->
    <div class="col-md-6">
      <label class="form-label">Agencia</label>
      <select class="form-select" id="cbx_agencia" name="cbx_agencia"></select>
    </div>

    <!-- UBICACIÓN -->
    <div class="col-md-6">
      <label class="form-label">Ubicación</label>
      <select class="form-select" id="cbx_ubicacion" name="cbx_ubicacion"></select>
    </div>

    <!-- MAQUINA -->
    <div class="col-md-6">
      <label class="form-label">Máquina</label>
      <select class="form-select" id="cbx_maquina" name="cbx_maquina"></select>
    </div>

    <!-- CANTIDADES (AGRUPADO) -->
    <div class="col-12">
      <label class="form-label fw-bold">Cantidades</label>
      <div class="row g-2">

        <div class="col-md-3">
          <input type="text" class="form-control" id="ct_kg" placeholder="KG">
        </div>

        <div class="col-md-3">
          <input type="text" class="form-control" id="ct_ton" placeholder="TON">
        </div>

        <div class="col-md-3">
          <input type="text" class="form-control" id="ct_lt" placeholder="L">
        </div>

        <div class="col-md-3">
          <input type="text" class="form-control" id="ct_gl" placeholder="GL">
        </div>

      </div>
    </div>

    <!-- COMPROBANTE -->
    <div class="col-md-6">
      <label class="form-label">Comprobante</label>
      <input type="text" class="form-control" id="comprobante" placeholder="Ej: N° 001-2025">
    </div>

    <!-- GESTORA -->
    <div class="col-md-6">
      <label class="form-label">Gestora</label>
      <select class="form-select" id="cbx_gestora"></select>
    </div>

    <!-- RESPONSABLE -->
    <div class="col-md-6">
      <label class="form-label">Responsable</label>
      <input type="text" class="form-control" id="responsable">
    </div>

    <!-- CARGO -->
    <div class="col-md-6">
      <label class="form-label">Cargo</label>
      <input type="text" class="form-control" id="cargo">
    </div>

     <!-- RESPONSABLE -->
    <div class="col-md-3">
      <label class="form-label"> $ Costo Transporte</label>
      <input type="number" class="form-control" id="ct_trans">
    </div>

    <!-- CARGO -->
    <div class="col-md-3">
      <label class="form-label"> $ Costo Gestor</label>
      <input type="number" class="form-control" id="ct_gest">
    </div>

    <!-- DESCRIPCIÓN -->
    <div class="col-12">
      <label class="form-label">Descripción de la disposición</label>
      <textarea class="form-control" rows="3" id="desc_dispo"></textarea>
    </div>

  </div>




</form>
   

   
   
   
   `;

var footer = `
<div class="container-fluid border-top pt-3" >
  <div class="row g-2">





 <div class="col-md-6 col-12">
      <button type="button" class="btn btn-outline-success  w-100" id="btn_registro">
      <i class="fas fa-save"></i> Guardar
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

   

$('#modal').modal('show');
$('#titulo_modal').append(title);
$('#form_modal').append(form);
$('#form_modal_footer').append(footer);


}



/// cabio dinamico de  select 

$(document).on('change', '#cbx_mes_res', function() {
 
   mes =  this.value; 

   let an = new Date().getFullYear(); // año actual

    mes = mes.padStart(2, '0'); // 01,02,03...

    console.log('Mes seleccionado:', mes); // Verificar el valor del mes seleccionado 
    
    if(mes !== ''){ im_fc = an + '-' + mes + '-01';  
        
        $('#fecha_entrega').val(im_fc);

     } else { mensaje('Selecciona un mes', 'warning'); }

});





function cbx_res(){
  $.ajax({
    url: '../DATABASE/cg_res_hse_no_p_lst.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_res').empty();
        $('#cbx_res').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function(i,item){
          if(i!="err"){
           var option = `<option value="${item.id_res}">${item.descrip_residuo}</option>`;
           desc = item.descrip_residuo;
           option = $(option).data('desc', desc);
      
            $('#cbx_res').append(option);
          

          }
        });
      }
    }
  });
}




function cbx_mes_res(){
  $.ajax({
    url: '../DATABASE/cbx_mes_res_p.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_mes_res').empty();
        $('#cbx_mes_res').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_mes+'">'+item.mes_res+'</option>';
            $('#cbx_mes_res').append(option);
          }
        });
      }
    }
  });
}




function cbx_maquina(){
  $.ajax({
    url: '../DATABASE/cbx_ma_res.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_maquina').empty();
        $('#cbx_maquina').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_maquina+'">'+item.serie_maquina+'</option>';
            $('#cbx_maquina').append(option);
          }
        });
      }
    }
  });
}

function cbx_agencia(){
  $.ajax({
    url: '../DATABASE/cg_agencia_cbx.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_agencia').empty();
        $('#cbx_agencia').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_pro+'">'+item.proyecto+'</option>';
            $('#cbx_agencia').append(option);
          }
        });
      }
    }
  });
}

function cbx_gestora(){
  $.ajax({
    url: '../DATABASE/cbx_gestora_des_p.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_gestora').empty();
        $('#cbx_gestora').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_gestor+'">'+item.gestor_res+'</option>';
            $('#cbx_gestora').append(option);
          }
        });
      }
    }
  });
}


function cbx_ubicacion(){
  $.ajax({
    url: '../DATABASE/cbx_ubicacion.php', // PHP que devuelve los manifiestos
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_ubicacion').empty();
        $('#cbx_ubicacion').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_ub+'">'+item.ubicacion+'</option>';
            $('#cbx_ubicacion').append(option);
          }
        });
      }
    }
  });
}




/* ===============================
   VARIABLES DE CONTROL
   =============================== */
let bloqueandoPeso = false;
let bloqueandoVolumen = false;

/* ===============================
   FUNCIONES UTILITARIAS
   =============================== */
function bloquearVolumen() {
    $('#ct_lt, #ct_gl').prop('disabled', true).val('0');
}

function desbloquearVolumen() {
    $('#ct_lt, #ct_gl').prop('disabled', false);
}

function bloquearPeso() {
    $('#ct_kg, #ct_ton').prop('disabled', true).val('0');
}

function desbloquearPeso() {
    $('#ct_kg, #ct_ton').prop('disabled', false);
}

/* ===============================
   KILOS → TONELADAS
   =============================== */
$(document).on('input', '#ct_kg', function () {
    if (bloqueandoPeso) return;
    bloqueandoPeso = true;

    const kg = parseFloat(this.value) || 0;
    const ton = kg / 1000;

    $('#ct_ton').val(ton.toFixed(3));

    if (kg > 0) {
        bloquearVolumen();
        desbloquearPeso();
    } else {
        desbloquearVolumen();
    }

    bloqueandoPeso = false;
});

$(document).on('input', '#ct_ton', function () {
    if (bloqueandoPeso) return;
    bloqueandoPeso = true;

    const ton = parseFloat(this.value) || 0;
    const kg = ton * 1000;

    $('#ct_kg').val(kg.toFixed(3));

    if (ton > 0) {
        bloquearVolumen();
        desbloquearPeso();
    } else {
        desbloquearVolumen();
    }

    bloqueandoPeso = false;
});

/* ===============================
   LITROS → GALONES
   =============================== */
$(document).on('input', '#ct_lt', function () {
    if (bloqueandoVolumen) return;
    bloqueandoVolumen = true;

    const litros = parseFloat(this.value) || 0;
    const galones = litros / 3.785;

    $('#ct_gl').val(galones.toFixed(3));

    if (litros > 0) {
        bloquearPeso();
        desbloquearVolumen();
    } else {
        desbloquearPeso();
    }

    bloqueandoVolumen = false;
});

$(document).on('input', '#ct_gl', function () {
    if (bloqueandoVolumen) return;
    bloqueandoVolumen = true;

    const galones = parseFloat(this.value) || 0;
    const litros = galones * 3.785;

    $('#ct_lt').val(litros.toFixed(3));

    if (galones > 0) {
        bloquearPeso();
        desbloquearVolumen();
    } else {
        desbloquearPeso();
    }

    bloqueandoVolumen = false;
});

/* ===============================
   RESET GENERAL (OPCIONAL)
   =============================== */
function resetUnidades() {
    $('#ct_kg, #ct_ton, #ct_lt, #ct_gl')
        .prop('disabled', false)
        .val('');
}



/// eliminacion de registros//
$(document).on('click','#btn_delete',function(event){

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
                .done(function(response) {
                   
                        const res = JSON.parse(response);
                        console.log(response);

                              mensaje(res.mensaje, res.status);

                        if (res.status === 'success') {
                     
                             residuos_no_peligrosos(url, params);

                        }
               
                })
                
        }
    });
});


/// registro de residuos

$(document).on('click', '#btn_registro', function () {
  
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
  const manifesto = $('#comprobante').val().trim();
  const responsable = $('#responsable').val().trim();
  const cargo = $('#cargo').val().trim();
  const ct_trans = $('#ct_trans').val().trim(); // costo transporte
  const ct_gest = $('#ct_gest').val().trim(); 
  
  const descrip = $('#desc_dispo').val().trim(); //  valor de  la  descripcion  del  residuo
  
  /// validdacion, si los campos estan vacios


 if (fechaEntrega === '') return mensaje('Selecciona una fecha de entrega', 'warning');
  if (mes === '') return mensaje('Selecciona el mes correspondiente', 'warning');
  if (codigo === '') return mensaje('Selecciona un  residuo', 'warning');
  if (agencia === '') return mensaje('Selecciona una agencia', 'warning');
  if (ub === '') return mensaje('Selecciona la ubicación', 'warning');
  if (mq === '') return mensaje('Selecciona la máquina o equipo', 'warning');
  if (kg === '' && ton === '' && lt === '' && gl === '')
    return mensaje('Debes ingresar al menos una cantidad (kg, ton, lt o gl)', 'warning');
  if (gestora === '') return mensaje('Selecciona una empresa gestora', 'warning');

  if (manifesto === '') return mensaje('Ingresa un N° comprobante', 'warning');
  if (responsable === '') return mensaje('Ingresa el nombre del responsable', 'warning');
  if (cargo === '') return mensaje('Ingrese su cargo', 'warning');
  
  if (ct_trans === '' ) return mensaje('Ingresa el costo del transporte,  si no aplica ingresa 0', 'info');
  if (ct_gest === '' ) return mensaje('Ingresa el costo del gestor,  si no aplica ingresa 0', 'info');
  if (descrip === '') return mensaje('Ingrese una descripcion', 'warning');
///  ingreso del  registro, 

 $.ajax({
    url: '../DATABASE/insert_reg_p.php',
    type: 'POST',
    data: { fechaEntrega, mes, codigo, agencia, ub, mq, kg, ton, lt, gl, gestora, responsable,manifesto, cargo, descrip, ct_trans, ct_gest },
    
    beforeSend: function () {
      mensaje('Enviando datos...', 'info');
      $('#btn_registro').prop('disabled', true);
    },
    success: function (response) {
     
       var json = JSON.parse(response);
    
        if(!json.err){  mensaje(json.mensaje,'success');      residuos_no_peligrosos(url, params);  $('#modal').modal('hide'); }else{ mensaje( json.mensaje,'error')}



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


  /// editar registros 


  let pk_registro = 0;

$(document).on('click', '#btn_edit', function() {

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



   var ficha =`

   
   <form id="detalle_residuo" class="container-fluid p-4 shadow-sm rounded-3 bg-white border">

  <!-- HEADER -->
  <div class="card border-0 mb-4">
    <div class="card-header text-white fw-bold py-3 rounded-3" style="background:#212529;">
      <i class="fa-solid fa-recycle me-2"></i>
      REGISTRO | BITÁCORA DE CONTROL RESIDUOS NO PELIGROSOS
    </div>
  </div>

  <div class="row g-3">

    <!-- FECHA -->
    <div class="col-md-6">
      <label>Fecha</label>
      <div class="d-flex">
        <input type="date" class="form-control" id="fc_disp" name="fecha_entrega" value="${cp.fc_disp}" readonly>
        <button type="button" id="edit" class="btn btn-light ms-2">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>

    <!-- MES -->
    <div class="col-md-6">
      <label>Mes</label>
      <div class="d-flex">
        <input type="text" class="form-control" id="mes_res" name="FK_mes" value="${cp.mes_res}" readonly>
        <button type="button" id="edit_select" class="btn btn-light ms-2">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>

    <!-- RESIDUO -->
    <div class="col-md-6">
      <label>Residuo</label>
      <div class="d-flex">
        <input type="text" class="form-control" id="res" name="FK_res" value="${cp.descrip_residuo}" readonly>
        <button type="button" id="edit_select" class="btn btn-light ms-2">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>

    <!-- AGENCIA -->
    <div class="col-md-6">
      <label>Agencia</label>
      <div class="d-flex">
        <input type="text" class="form-control" id="agencia" name="FK_pro" value="${cp.proyecto}" readonly>
        <button type="button" id="edit_select" class="btn btn-light ms-2">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>

    <!-- UBICACIÓN -->
    <div class="col-md-6">
      <label>Ubicación</label>
      <div class="d-flex">
        <input type="text" class="form-control" id="ubicacion" name="FK_ub" value="${cp.ubicacion}" readonly>
        <button type="button" id="edit_select" class="btn btn-light ms-2">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>

    <!-- MAQUINA -->
    <div class="col-md-6">
      <label>Máquina</label>
      <div class="d-flex">
        <input type="text" class="form-control" id="maquina" name="FK_mq" value="${cp.serie_maquina}" readonly>
        <button type="button" id="edit_select" class="btn btn-light ms-2">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>

    <!-- CANTIDADES -->
    <div class="col-12">
      <label class="fw-bold">Cantidades</label>
      <div class="row g-2">

        <div class="col-md-3 d-flex">
          <input type="text" class="form-control" id="ct_kg" value="${cp.ct_kg}" readonly>
          <button type="button" id="edit" class="btn btn-light ms-1">
            <i class="fa-solid fa-pencil"></i>
          </button>
        </div>

        <div class="col-md-3 d-flex">
          <input type="text" class="form-control" id="ct_tn" value="${cp.ct_tn}" readonly>
          <button type="button" id="edit" class="btn btn-light ms-1">
            <i class="fa-solid fa-pencil"></i>
          </button>
        </div>

        <div class="col-md-3 d-flex">
          <input type="text" class="form-control" id="ct_lit" value="${cp.ct_lit}" readonly>
          <button type="button" id="edit" class="btn btn-light ms-1">
            <i class="fa-solid fa-pencil"></i>
          </button>
        </div>

        <div class="col-md-3 d-flex">
          <input type="text" class="form-control" id="ct_gl" value="${cp.ct_gl}" readonly>
          <button type="button" id="edit" class="btn btn-light ms-1">
            <i class="fa-solid fa-pencil"></i>
          </button>
        </div>

      </div>
    </div>

    <!-- GESTOR -->
    <div class="col-md-6">
      <label>Gestor</label>
      <div class="d-flex">
        <input type="text" class="form-control" id="gestora" name="FK_gest" value="${cp.gestor_res}" readonly>
        <button type="button" id="edit_select" class="btn btn-light ms-2">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>

    <!-- COMPROBANTE -->
    <div class="col-md-6">
      <label>Comprobante</label>
      <div class="d-flex">
        <input type="text" class="form-control" id="mnft" value="${cp.mnft}" readonly>
        <button type="button" id="edit" class="btn btn-light ms-2">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>

    <!-- RESPONSABLE -->
    <div class="col-md-6">
      <label>Responsable</label>
      <div class="d-flex">
        <input type="text" class="form-control" id="resp_des" value="${cp.resp_des}" readonly>
        <button type="button" id="edit" class="btn btn-light ms-2">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>

    <!-- CARGO -->
    <div class="col-md-6">
      <label>Cargo</label>
      <div class="d-flex">
        <input type="text" class="form-control" id="cargo" value="${cp.cargo}" readonly>
        <button type="button" id="edit" class="btn btn-light ms-2">
          <i class="fa-solid fa-pencil"></i>
        </button>
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

    <!-- DESCRIPCIÓN -->
    <div class="col-12">
      <label>Descripción</label>
      <div class="d-flex">
        <textarea class="form-control" id="des_des" rows="3" readonly>${cp.des_des}</textarea>
        <button type="button" id="edit_textarea" class="btn btn-light ms-2">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>

  </div>

</form>
   
   
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




/// editar imputs 

$(document).on('click', '#edit', function() {

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

    var campo  = input.attr('id');
    update_dato = input.val();

    console.log('PK registro:', pk_registro);

    console.log('Nueva dato:', update_dato);

        if(update_dato.length === 0){
            mensaje('El campo no puede estar vacío', 'warning');
            return;


         }

          $.post(
                  '../DATABASE/up_dis_r_p.php',
                  { campo: campo, update_dato: update_dato, id: pk_registro },
                  function(response) {
                  
     
                    var json = JSON.parse(response);

                    console.log('Respuesta del servidor:', response);
                    mensaje(json.mensaje, json.status);
                     residuos_no_peligrosos(url, params); // refrescar la tabla después de la actualización
                  }
                );

    
  }


});



//// editar selects 


 id_elemento = '';
// editar  select
$(document).on('click', '#edit_select', function() {



    var input = $(this).siblings('input'); 
     id_elemento  = input.attr('id');
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
        <select class="form-control-plaintext form-control-sm" id="cbx_${id_elemento}" name="${name}"></select>
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
$(document).on('click', '#btn_guardar', function() {
    var select = $(this).siblings('select');
    var name = select.attr('name');
    let newText = select.find("option:selected").text();
    
    id_reg = select.val();

    if(id_reg.length === 0){
        mensaje('Debes seleccionar una opción', 'warning');
        
    }else{


      $.post(
                  '../DATABASE/up_dis_r_p.php',
                  { campo: name, update_dato: id_reg, id: pk_registro },
                  function(response) {
                  
     
                    var json = JSON.parse(response);

                    console.log('Respuesta del servidor:', response);
                    mensaje(json.mensaje, json.status);
                     residuos_no_peligrosos(url, params); // refrescar la tabla después de la actualización
                  }
                );


    }
 

   
     imput_replace = `<input type="text" class="form-control-plaintext" name="${name}" id="${id_elemento}" value="${newText}" readonly>`;
     console.log(imput_replace);

    select.replaceWith(imput_replace);
    $(this).remove();


  });

    //editar textarea
$(document).on('click', '#edit_textarea', function() {


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
    var campo  = textarea.attr('id');
    update_dato = textarea.val();

    console.log('PK registro:', pk_registro);

    console.log('Nueva dato:', update_dato);


        if(update_dato.length === 0){
            mensaje('El campo no puede estar vacío', 'warning');
            return;     



          }          $.post(
                  '../DATABASE/up_dis_r_p.php',
                  { campo: campo, update_dato: update_dato, id: pk_registro },
                  function(response) {  
                    var json = JSON.parse(response);

                    console.log('Respuesta del servidor:', response);
                    mensaje(json.mensaje, json.status);
                     residuos_no_peligrosos(url, params); // refrescar la tabla después de la actualización
                  }
                );
  }
  
})
// BTNG REPORTE 

// generacion de pdf
$(document).on('click', '#btn_pdf__rp', function() {





  if(!  llenar_tabla){
   console.error('No se encontró el registro c');
    return;
  }

  $.ajax({
    url: '../PDF/rp_des_p.php',
    type: 'POST',
    data: { cp: JSON.stringify(  llenar_tabla) },
    xhrFields: { responseType: 'blob' },
    success: function(blob) {
      if(blob.size === 0){
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
    error: function(xhr, status, error){
      console.error('Error AJAX:', error);
    }
  });

});


// generacion de pdf
$(document).on('click', '#btn_pdf', function() {



  let cp = llenar_tabla.find(item => item.PK_disp == parseInt(pk_registro));

  if(!cp){
   console.error('No se encontró el registro c');
    return;
  }

  $.ajax({
    url: '../PDF/bit_no_peligrosos.php',
    type: 'POST',
    data: { cp: JSON.stringify(cp) },
    xhrFields: { responseType: 'blob' },
    success: function(blob) {
      if(blob.size === 0){
        alert('Error: PDF vacío o contenido inválido');
        return;
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'EC-HSE-F-53-NO_RESIDUOS_PELIGROSOS.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    },
    error: function(xhr, status, error){
      console.error('Error AJAX:', error);
    }
  });

});
/// reporte en excel 
$("#btn_export_excel").on("click", function () {

    $.ajax({
        url: "../EXCEL/RP_RES_P.php",
        type: "POST",
        data: { data: JSON.stringify(llenar_tabla) },
        xhrFields: { responseType: "blob" },

        success: function (blob) {
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "EC-HSE-F-53-NO_RESIDUOS_PELIGROSOS.xls";
            link.click();
        }
    });

});

/// filtros 

function fil_res(){
  $.ajax({
    url: '../DATABASE/cbx_mes_res_p.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_fil_mes').empty();
        $('#cbx_fil_mes').append('<option value="">MES</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_mes+'">'+item.mes_res+'</option>';
            $('#cbx_fil_mes').append(option);
          }
        });
      }
    }
  });
}


function fil_residuos(){
  $.ajax({
    url: '../DATABASE/cg_res_hse_no_p_lst.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_fil_res').empty();
        $('#cbx_fil_res').append('<option value="">RESIDUO</option>');
        $.each(json, function(i,item){
          if(i!="err"){
           var option = `<option value="${item.id_res}">${item.descrip_residuo}</option>`;
           desc = item.descrip_residuo;
           option = $(option).data('desc', desc);
      
            $('#cbx_fil_res').append(option);
          

          }
        });
      }
    }
  });
}


function cbx_clasificacion(){
  $.ajax({
    url: '../DATABASE/cbx_t_residuo_f_np.php', // PHP que devuelve los manifiestos
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_tipo').empty();
        $('#cbx_tipo').append('<option value="">TIPO </option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_t_res+'">'+item.t_residuo+'</option>';
            $('#cbx_tipo').append(option);
          }
        });
      }
    }
  });
}

/// ejecucion del filtro 
/// FILTROS
function verificacar_filtro() {

  const url = '../DATABASE/fil_reg_des_np.php';
  const t_url = '../DATABASE/t_res_n_p.php';
  let params = {};

  const mes    = $('#cbx_fil_mes').val();
  const tipo   = $('#cbx_tipo').val();
  const codigo = $('#cbx_fil_res').val();
  const agencia = $('#fil_cbx_agencia').val();
  
  const campo1 = $('#cbx_fil_mes').attr('name');
  const campo2 = $('#cbx_tipo').attr('name');
  const campo3 = $('#cbx_fil_res').attr('name');
  const campo4 = $('#fil_cbx_agencia').attr('name');

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
  // Validar que al menos un filtro esté seleccionado
  if (Object.keys(params).length === 0) {
    mensaje('Debes seleccionar al menos un filtro', 'warning');
    return;
  }
  
  console.log('Filtros enviados:', params);
  residuos_no_peligrosos(url, params);
  total(t_url, params); // actualizar total con filtros aplicados
}

// ejecucion de la funcion filtar
$('#btn_flt').click(function () {

  verificacar_filtro(); 


});

/// funciones total 

function total(t_url, params) {

    $.post(t_url, params, function (r) {

     $('#totales').empty();

     console.log('Respuesta total:', r); // Verificar la respuesta del servidor
        
    $.each(r, function (i, item) {
        if (i !== 'err') {


           var totales = ` 
           
<td colspan="10" class="tfoot-minimal">

  <div class="tfoot-row">

    <span>Litros: <strong>${(item.t_lit ?? 0).toLocaleString()}</strong> L</span>
    <span>Kg: <strong>${(item.t_kg ?? 0).toLocaleString()}</strong></span>
    <span>Tn: <strong>${(item.t_tn ?? 0).toLocaleString()}</strong></span>
    <span>Gal: <strong>${(item.t_gl ?? 0).toLocaleString()}</strong></span>
    <span>Gestor: $ <strong>${item.t_ges ?? '—'}</strong></span>
    <span>Transp: $ <strong>${(item.t_trs ?? 0).toLocaleString()}</strong></span>

    <span class="total">
      Total: $ <strong> ${(item.gasto ?? 0).toLocaleString()}</strong>
    </span>

  </div>

</td>
           
           `;
            




          $('#totales').append(totales);
       
            
        }});
        console.log(r);
          
    }, 'json');


  }
  
  
  //fill mes 
  function fil_cbx_agencia(){
  $.ajax({
    url: '../DATABASE/cg_agencia_cbx.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#fil_cbx_agencia').empty();
        $('#fil_cbx_agencia').append('<option value="">AGENCIA</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_pro+'">'+item.proyecto+'</option>';
            $('#fil_cbx_agencia').append(option);
          }
        });
      }
    }
  });
}
