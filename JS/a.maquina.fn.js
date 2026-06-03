$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {
   
    maquinas();

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});


let llenar_tabla = []; 

function maquinas(){

  

   
  $.ajax({
    url: '../DATABASE/cg_maquinas.php',
    type: 'POST',
  
      success: function(response){
      console.log(response);
      $('#lista_residuos').empty();
      llenar_tabla = Object.values(JSON.parse(response)).filter(item => typeof item === 'object');
      
      console.log('llenar_tabla:', llenar_tabla);
      console.log('Es array:', Array.isArray(llenar_tabla));



      
      if(!llenar_tabla.err){
          var contador=1;

        $.each(llenar_tabla, function(i,item){


   
          
         
        if(i!="err"){


          if(item.clf==1){
              
            var icono=`<i class="fas fa-snowplow"></i>`;
  
          }else if (item.clf==2){

            var icono=`<i class="fas fa-truck-monster"></i>`;

          }else if (item.clf==3){

            var icono=`<i class="fas fa-exclamation-triangle"></i>`;

          }else{
            var icono=`<i class="fas fa-cogs"></i>`;

          }
                var codigo =`
                                            
             <!-- Mini Card 1 -->
<div class="col-sm-6 col-md-4 col-xl-3 mt-3 mb-3">
  <div id="card_item" class="card text-dark shadow-sm border-0 rounded-4 h-100 p-3 text-center">

    <!-- Icono -->
    <div class="text-dark mb-2" style="font-size: 38px;">
      ${icono}
    </div>

    <!-- Título -->
    <h6 class="fw-bold text-uppercase mb-1">${item.sn}</h6>

    <!-- Estado / tipo -->
    <p class="small text-white badge bg-success my-2 mb-2">
      ${item.d}
    </p>

    

    <!-- Acciones -->
    <div id="${item.id}" class="d-flex justify-content-center mt-auto">
      <button class="btn btn-danger btn-sm me-2" id="btn_delete" title="Eliminar registro">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button class="btn btn-primary btn-sm me-2" id="btn_edit" title="Editar registro">
        <i class="fa-solid fa-pencil"></i>
      </button>
    </div>

  </div>
</div>

                `;


        
       }



          //asignacion de informacion

         $('#lista_residuos').append(codigo);
        
         contador ++


        })
      }
      else{

           Swal.fire({
                icon: 'info',
                title: json.mensaje,
                text:  'No existen exámenes agendados.'
                

                })
          }
    }
  })


}

/// mostrar datos en  el  sistema
















$(document).on('click','#bnt_reg',function(event){
cbx_t_vhiculo();
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
      <span class="fw-semibold" style="font-size:0.95rem;">REGISTRO DE VEHICULOS</span>
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
   

<form id="detalle_residuo" class="container-fluid py-2">

  <div class="card border-0 shadow-sm w-100">
    <div class="card-body w-100">

      <!-- Cuerpo del formulario -->
      <div class="row g-3 w-100">

        <div class="col-12">

     
          
  
        <div class="mb-3">
          <label for="cbx_t_vh" class="form-label fw-bold">Clasificacion</label>
     
          <select class="form-select form-select-sm" id="cbx_t_vh" name="cbx_t_vh"></select>
         </div>


       <div class="row g-3 mb-3">
        <div class="col-md-12">
          <label for="sn_maquina" class="form-label fw-bold">Serie Maquina</label>
          <input type="text" class="form-control" id="sn_maquina" name="sn_maquina" placeholder="PDR3422 / SOLO SN" required>
        </div>


        <div class="col-md-12">
          <label for="des_vhiculo" class="form-label fw-bold">Descripcion</label>
          <textarea class="form-control" id="des_vhiculo" name="descripcion" rows="1" placeholder="Descripción del vehiculo"></textarea>
        </div>
      </div>

         

        </div>

      </div>
    </div>
  </div>

</form>




   
   
   
   `;
   var footer =`

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


});







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
            $.post('../DATABASE/del_maquina.php', { 
              
              
              id_delete: id  


            })
                .done(function(response) {
                   
                        const res = JSON.parse(response);
                        console.log(response);

                              mensaje(res.mensaje, res.status);

                        if (res.status === 'success') {
                     
                           maquinas();

                        }
               
                })
                
        }
    });
});


/// registro de residuos

$(document).on('click', '#btn_registro', function () {
  
// capturo datos del formulario
  const cbx_t_vh = $('#cbx_t_vh').val().trim();
  const sn_maquina = $('#sn_maquina').val().trim();
  const des_vhiculo = $('#des_vhiculo').val().trim();

  /// validdacion, si los campos estan vacios


  if (cbx_t_vh === '') return mensaje('Debes seleccionar una clasificación', 'warning');
  if (sn_maquina === '') return mensaje('Debes ingresar una serie de maquina', 'warning');
  if (des_vhiculo === '') return mensaje('Debes ingresar una descripción', 'warning');

  
  
///  ingreso del  registro, 

 $.ajax({
    url: '../DATABASE/in_vehiculo.php',
    type: 'POST',
    data: { cbx_t_vh,sn_maquina,des_vhiculo },
    beforeSend: function () {
      mensaje('Enviando datos...', 'info');
      $('#btn_registro').prop('disabled', true);
    },
    success: function (response) {
     
       var json = JSON.parse(response);
    
        if(!json.err){  mensaje(json.mensaje,'success');     maquinas();  $('#modal').modal('hide'); }else{ mensaje( json.mensaje,'error')}



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










  let pk_registro = 0;

$(document).on('click', '#btn_edit', function() {



  var edit_reg = $(this)[0].parentElement;
  id = $(edit_reg).attr("id");  // más limpio que parentElement

  console.log('ID capturado:', id);
  console.log('llenar_tabla:', llenar_tabla); // 👈 verifica que tenga datos antes de buscar

  // buscar el objeto correspondiente en el JSON global
  let cp = llenar_tabla.find(item => item.id == parseInt(id));




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
   



<form id="detalle_residuo" class="container-fluid py-2">

  <div class="card border-0 shadow-sm w-100">
    <div class="card-body w-100">

      <!-- Cuerpo del formulario -->
      <div class="row g-3 w-100">

        <div class="col-12">

        <div class="row g-3 mb-3">
        <div class="col-md-12">
          <label for="cf_mq" class="form-label fw-bold">Clasificacion</label>
          <input type="text" class="form-control" value="${cp.t}" id="cf_mq" name="cf_mq" placeholder="PDR3422 / SOLO SN" disabled>
        </div>



       <div class="row g-3 mb-3">
        <div class="col-md-12">
          <label for="sn_maquina" class="form-label fw-bold">Serie Maquina</label>
          <input type="text" class="form-control" value="${cp.sn}" id="sn_maquina" name="sn_maquina" placeholder="PDR3422 / SOLO SN" required>
        </div>


        <div class="col-md-12">
          <label for="des_vhiculo" class="form-label fw-bold">Descripcion</label>
          <textarea class="form-control" id="des_vhiculo"  name="descripcion" rows="1" placeholder="Descripción del vehiculo">${cp.d}</textarea>
        </div>
      </div>

         

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
      <button type="button" class="btn btn-outline-primary w-100" id="update" >
        <i class="fas fa-times-circle"></i> Update
      </button>
    </div>


 <div class="col-md-6 col-12">
      <button type="button" class="btn btn-outline-danger w-100" id="btn-update" data-bs-dismiss="modal">
        <i class="fas fa-times-circle"></i> Cerrar
      </button>
    </div>

  </div>
</div>
`;



/// asignacion de valores  al modal

$('#form_modal').append(form);
$('#titulo_modal').append(title);

$('#form_modal_footer').append(footer);
});


$(document).on('click', '#update', function () {
  
// capturo datos del formulario
  
  
  pk_registro = id;

  const sn_maquina = $('#sn_maquina').val().trim();
  const des_vhiculo = $('#des_vhiculo').val().trim();

  
  /// validdacion, si los campos estan vacios


  if (sn_maquina === '') return mensaje('Debes ingresar una serie maquina', 'warning');
  if (des_vhiculo === '') return mensaje('Debes ingresar una descripcion', 'warning');


///  ingreso del  registro, 
   $.post(
                        '../DATABASE/up_maquina.php',
                        { id: id, sn_maquina: sn_maquina, des_vhiculo: des_vhiculo },
                        function(response) {
                        
          
                          var json = JSON.parse(response);

                          console.log('Respuesta del servidor:', response);
                          mensaje(json.mensaje, json.status);
                          maquinas(); 
                          $('#modal').modal('hide');
                          
                          // refrescar la tabla después de la actualización
                        }
                      );



});


//// Cargar tipo  maquina 

function cbx_t_vhiculo(){
  $.ajax({
    url: '../DATABASE/cbx_t_vehiculo.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_t_vh').empty();
        $('#cbx_t_vh').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_t_vehiculo+'">'+item.tipo_vehiculo+'</option>';
            $('#cbx_t_vh').append(option);
          }
        });
      }
    }
  });
} 