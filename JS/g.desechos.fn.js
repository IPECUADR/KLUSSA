$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {
   
t_residuos();

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});


let llenar_tabla = []; 

function t_residuos(){

  

   
  $.ajax({
    url: '../DATABASE/cg_desechos.php',
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

        
        if(item.id == 1){

           icon_hml = 'fa-biohazard';

         }else if(item.id == 2){

          icon_hml = 'fa-recycle';

         }  
          
         
      


  var codigo =`
          



          
  <!-- Mini Card 1 -->
  <div class="col-6">
    <div id="card_item" class="card   text-dark shadow-sm border-0 rounded-4  p-3 text-center ">
      <div class="text-dark mb-2" style="font-size: 38px;">
        <i class="fa-solid ${icon_hml}"></i>
      </div>
      <h6 class="fw-bold text-uppercase">${item.tipo}</h6>
      <p class="small   text-dark badge  my-2 bg-warning mb-0">${item.total_residuos}</p>

    <div id="${item.id}" tipo="${item.tipo}" class="d-flex justify-content-center mt-3">
        <button class="btn btn-primary btn-sm me-2" id="btn_ver" title="Ver_mas">
         <i class="fas fa-list"></i>
        </button>
         <button class="btn btn-success btn-sm me-2" id="btn_registar" title="Editar registro">
         <i class="fas fa-cloud-upload-alt"></i>
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






function contar_tipo_clf(id) {

  $.ajax({
    url: '../DATABASE/cg_clf_des_g.php',
    type: 'POST',
    data: { data: id },

    success: function (response) {

      $('#clf_deschos').empty();
      var json = JSON.parse(response);

      if (!json.err) {

        var contador = 1;

        $.each(json, function (i, item) {

          if (i !== "err") {

            var codigo = `

<div class="list-group mb-2" id="${item.id}" sec="item_${contador}">
  <a class="list-group-item list-group-item-action d-flex justify-content-between align-items-center ver_clf_g"
     data-bs-toggle="collapse"
     href="#item_${contador}"
     role="button"
     aria-expanded="false"
     aria-controls="item_${contador}">

    <div class="d-flex align-items-center gap-2">
      <span class="fw-semibold text-dark">${item.t_res}</span>
      <span class="badge rounded-pill bg-success">${item.total_residuos}</span>
    </div>

    <i class="fa-solid fa-plus"></i>
  </a>

  <div class="collapse" id="item_${contador}">
    <div class="card card-body border-top-0 rounded-0">
      <!-- Aquí se cargará la tabla -->
    </div>
  </div>
</div>
            `;

            $('#clf_deschos').append(codigo);
            contador++;
          }
        });

      } else {
        Swal.fire({
          icon: 'info',
          title: json.mensaje,
          text: 'No existen registros en el sistema.'
        });
      }
    }
  });
}



let clf_res_data = 0;
let sec_data = 0;
/// ver mas detalles de los residuos
$(document).on('click', '.ver_clf_g', function () {

  var lis_data = $(this).closest('.list-group');
  var id_up = lis_data.attr("id");
  var sec = lis_data.attr("sec");

  
clf_res_data = id_up;
sec_data = sec;


  cargardatos(id_up, sec);
});




function cargardatos(id, sec) {

  // Limpieza del contenedor correcto
  $(`#${sec} .card-body`).empty();

  // ID único para el tbody
  var tbodyID = `id_llenar_des_${id}`;

  var tabla = `
  <div class="table-responsive rounded-3 shadow-sm mt-2 tabla-residuos">
    <table class="table table-hover align-middle mb-0 text-uppercase">
      <thead>
        <tr>
          <th>N°</th>
          <th>RESIDUO</th>
          <th>CÓDIGO</th>
          <th>OPCIONES</th>
        </tr>
      </thead>
      <tbody id="${tbodyID}"></tbody>
    </table>
  </div>
  `;

  $(`#${sec} .card-body`).append(tabla);

  $.ajax({
    url: '../DATABASE/cg_desechos_list.php',
    type: 'POST',
    data: { data: id },
    success: function (response) {

      var json = JSON.parse(response);
      $(`#${tbodyID}`).empty();

      if (!json.err) {

        var contador = 1;

        $.each(json, function (i, item) {
          if (i !== "err") {

            var datos_tabal = `
             <tr data-id="${item.pk}">
              <td>${contador}</td>

              <td class="editable" data-campo="res">
                <span>${item.res}</span>
                <input type="text" class="form-control form-control-sm d-none" value="${item.res}">
              </td>

              <td class="editable" data-campo="code">
                <span>${item.code}</span>
                <input type="text" class="form-control form-control-sm d-none" value="${item.code}">
              </td>

              <td class="text-center">
                <button class="btn btn-sm btn-outline-primary btn-editar">✏️</button>
                 <button class="btn btn-sm btn-outline-danger btn-eliminar">🗑️</button>
                <button class="btn btn-sm btn-outline-success btn-guardar d-none">💾</button>
                <button class="btn btn-sm btn-outline-danger btn-cancelar d-none">✖</button>
              </td>
            </tr>

            `;

            $(`#${tbodyID}`).append(datos_tabal);
            contador++;
          }
        });

      }
    }
  });
}

/// 

//ejecucion de actualizacion de registros
$(document).on('click', '.btn-guardar', function () {

const fila = $(this).closest('tr');

  const id   = fila.data('id');
  const res  = fila.find('[data-campo="res"] input').val().trim();
  const code = fila.find('[data-campo="code"] input').val().trim();
 console.log('Datos a actualizar:', { id, res, code });


  update_campos_fila(id, res, code);


});
// actualizar registro 
function update_campos_fila(id, res, code) {
 $.post(
                  '../DATABASE/up_deschos.php',
                  { id: id, res: res, code: code },
                  function(response) {  
                    var json = JSON.parse(response);

                    console.log('Respuesta del servidor:', response);
                    mensaje(json.mensaje, 'success');
                   
                  }
                );
 
}



// eventroi que convierte los span en input para editar

$(document).on('click', '.btn-editar', function () {

  const fila = $(this).closest('tr');

  // Alternar vista → edición
  fila.find('.editable span').addClass('d-none');
  fila.find('.editable input').removeClass('d-none');
  // Botones
  $(this).addClass('d-none');
  fila.find('.btn-guardar, .btn-cancelar').removeClass('d-none');
  
});



$(document).on('click','#btn_ver',function(event){

 var delete_info = $(this)[0].parentElement;
 id = $(delete_info).attr("id");
console.log('Ide sleccionado',id);
 // paso la funcion para contar los tipos de clasificacion
 contar_tipo_clf(id);
  

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
      <span class="fw-semibold" style="font-size:0.95rem;">LISTA DE DESECHOS SEGÚN TIPO </span>
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
   
    



    <div class="container-fluid py-2" id="clf_deschos">
    
   



   </div>



   
 

       

        

       



   
   
   
   `;
  
   

$('#modal').modal('show');
$('#titulo_modal').append(title);
$('#form_modal').append(form);



});







/// eliminacion de registros//
$(document).on('click','.btn-eliminar',function(event){

     clf_res_data = id;
  

     console.log('Ide sleccionado para eliminar',clf_res_data);
    console.log('Seccion sleccionado para eliminar',sec_data);

   // paso la funcion para contar los tipos de clasificacion

// MOSTRAMOS LOS RECURSOS PARA CARGAR DATOS

const fila = $(this).closest('tr');
const id_res_del   = fila.data('id');


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
            $.post('../DATABASE/del_desecho.php', { 
              
              
              id_delete: id_res_del  


            })
                .done(function(response) {
                   
                        const res = JSON.parse(response);
                        console.log(response);

                              mensaje(res.mensaje, res.status);

                        if (res.status === 'success') {
                     
                             cargardatos(id, sec_data);
                             t_residuos();

                        }
               
                })
                
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






function modal_insert(  tipo, tipo_res_id){

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








   
     <div class="container mt-2">
  <div class="card shadow-sm border-0 rounded-3 ficha-form">
    <div class="card-header text-white fw-bold py-3" style="background: #212529;">
      <i class="fa-solid fa-recycle me-2"></i>REGISTRO DESECHOS | ${tipo}  
    </div>
   
 <form id="detalle_residuo" class="container-fluid py-2">

  <div class="card border-0 shadow-sm">
    <div class="card-body">

      

      <!-- Cuerpo del formulario -->
      <div class="row g-3 ">

        <div class="col-md-6" id="seccion_code_res">
         
        </div>

          <div class="col-md-6">
          <label for="cbx_t_res" class="form-label small fw-semibold text-muted">TIPO DESECHO</label>
          <select class="form-select form-select-sm" id="cbx_t_res" name="cbx_t_res"></select>
        </div>


   


        <div class="col-md-6">
          <label for="cbx_certib" class="form-label small fw-semibold text-muted">CERTIB</label>
          <select class="form-select form-select-sm" id="cbx_certib" name="cbx_certib"></select>
        </div>

   

        <div class="col-md-6">
          <label for="cbx_rhom" class="form-label small fw-semibold text-muted">CLASIFICACION RHOMB</label>
          <select class="form-select form-select-sm" id="cbx_rhom" name="cbx_rhom" readonly></select>
        </div>

        <div class="col-12">
          <label for="des_desecho" class="form-label small fw-semibold text-muted">DESCRIPCIÓN DESECHO</label>
          <textarea class="form-control form-control-sm" rows="3" id="des_desecho" name="des_desecho" placeholder="Descripción del desecho"></textarea>
        </div>


   





    

      </div>
    </div>
  </div>
</form>



   
   
   
   `;


   $('#seccion_code_res').empty();





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



 if(tipo_res_id == 2){


   imput_code_res = `
   <label for="code_res"  class="form-label small fw-semibold text-muted">CÓDIGO DESECHO</label>
   <input type="text" class="form-control form-control-sm" id="code_res" name="code_res" value="NO APLICA" readonly >
   `;




 }else if(tipo_res_id == 1){


    imput_code_res = `  
    <label for="code_res" class="form-label small fw-semibold text-muted">CÓDIGO DESECHO</label>
    <input type="text" class="form-control form-control-sm" id="code_res" name="code_res"  >
    `;


  console.log('tipo de residuo seleccionado para codigo',tipo_res_id);
  
  
  }
     $('#seccion_code_res').append(imput_code_res);
   

$('#form_modal_footer').append(footer);


}




let tipo_res_id = 0;

$(document).on('click', '#btn_registar', function() {

 

 var info_event = $(this)[0].parentElement;
 id = $(info_event).attr("id");
 tipo = $(info_event).attr("tipo");
 console.log('tipo selecionado ',tipo);
 // paso la funcion para contar los tipos de clasificacion

 tipo_res_id = id;

$('#modal').modal('show');


 
   modal_insert(tipo,tipo_res_id);
   cbx_ubicacion();
   cbx_rhom();
   cbx_t_res(tipo_res_id);

   console.log('Tipo de residuo ID seleccionado:', tipo_res_id);
})




 function cbx_ubicacion(){
  $.ajax({
    url: '../DATABASE/cbx_cretib.php', // PHP que devuelve los manifiestos
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_certib').empty();
        $('#cbx_certib').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_ceti+'">'+item.CRTIB+'</option>';
            $('#cbx_certib').append(option);
          }
        });
      }
    }
  });
}

 function cbx_rhom(){
  $.ajax({
    url: '../DATABASE/cbx_rhom.php', // PHP que devuelve los manifiestos
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_rhom').empty();
        $('#cbx_rhom').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_clf_sis_r+'">'+item.clf_sis_r+'</option>';
            $('#cbx_rhom').append(option);
          }
        });
      }
    }
  });
}


///cbx tipo de desecho

 function cbx_t_res(id){
  
 
  $.ajax({
    url: '../DATABASE/cbx_t_desecho.php', // PHP que devuelve los manifiestos
    type: 'POST',
    data: {id},
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_t_res').empty();
        $('#cbx_t_res').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_t_res+'">'+item.t_residuo+'</option>';
            $('#cbx_t_res').append(option);
          }
        });
      }
    }
  });
}


//accion de reegistro de desechos

$(document).on('click', '#btn_registro', function () {
  
// capturo datos del formulario
  const code_res = $('#code_res').val().trim();
  const des_desecho = $('#des_desecho').val().trim();
  const cbx_certib = $('#cbx_certib').val();
  const cbx_rhom = $('#cbx_rhom').val();
  const tipo_res = tipo_res_id;
  const cbx_t_res = $('#cbx_t_res').val();

  
  /// validdacion, si los campos estan vacios


  if (code_res === '') return mensaje('Debes ingresar un código de residuo', 'warning');
  if (des_desecho === '') return mensaje('Debes ingresar una descripción', 'warning');
  if (cbx_certib === '') return mensaje('Debes seleccionar un CERTIB', 'warning');
  if (cbx_rhom === '') return mensaje('Debes seleccionar una clasificación RHOMB', 'warning');
  if (cbx_t_res === '') return mensaje('Debes seleccionar un tipo de residuo', 'warning');
  if (tipo_res === 0) return mensaje('Tipo de residuo no seleccionado', 'warning');




///  ingreso del  registro, 

 $.ajax({
    url: '../DATABASE/in_desecho.php',
    type: 'POST',
    data: { code_res,des_desecho,cbx_certib,cbx_rhom,tipo_res,cbx_t_res },
    
    beforeSend: function () {
      mensaje('Enviando datos...', 'info');
      $('#btn_registro').prop('disabled', true);
    },
    success: function (response) {
     
       var json = JSON.parse(response);
    
        if(!json.err){  mensaje(json.mensaje,'success');     t_residuos();  $('#modal').modal('hide'); }else{ mensaje( json.mensaje,'error')}

        t_residuos();

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

