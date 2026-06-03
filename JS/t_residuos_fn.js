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
    url: '../DATABASE/cg_t_res.php',
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

        
          
          
         
      


          var codigo =`
          



          
  <!-- Mini Card 1 -->
  <div class="col-sm-6 col-md-4 col-xl-3 mt-3 mb-3 ">
    <div id="card_item" class="card   text-dark shadow-sm border-0 rounded-4 h-100 p-3 text-center ">
      <div class="text-dark mb-2" style="font-size: 38px;">
        <i class="fa-solid ${item.icono_res}"></i>
      </div>
      <h6 class="fw-bold text-uppercase">${item.t_residuo}</h6>
      <p class="small   text-white badge bg-primary my-2 bg-success mb-0">${item.des_res}</p>

    <div id="${item.PK_t_res}" class="d-flex justify-content-center mt-3">
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
clf_t_res();
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
      <i class="fa-solid fa-recycle me-2"></i>CLASIFICACION |  RESIDUOS 
    </div>
   
 <form id="detalle_residuo" class="container-fluid py-2">

  <div class="card border-0 shadow-sm">
    <div class="card-body">

      

      <!-- Cuerpo del formulario -->
      <div class="row g-3">

        
        


        <form id="form_tipo_residuo">

    <!-- Nombre del tipo -->
    <div class="mb-3">
        <label for="nombre_tipo" class="form-label fw-bold">Clasificacion</label>
     
          <select class="form-select form-select-sm" id="cbx_clf_res" name="cbx_clf_res"></select>

        
    </div>
    
    <!-- Nombre del tipo -->
    <div class="mb-3">
        <label for="nombre_tipo" class="form-label fw-bold">Nombre del tipo</label>
        <input type="text" class="form-control" id="t_res" name="nombre_tipo" placeholder="Ej: Reciclable" required>
    </div>

    <!-- Descripción -->
    <div class="mb-3">
        <label for="descripcion" class="form-label fw-bold">Descripción</label>
        <textarea class="form-control" id="des_t_res" name="descripcion" rows="2" placeholder="Descripción del tipo de residuo"></textarea>
    </div>



<div class="mb-3">
    <label class="form-label fw-bold">Seleccionar icono</label>

    <div class="row g-2">

        <!-- Contaminado -->
        <div class="col-4 col-md-2 text-center">
            <label>
                <input type="radio" name="icon_tipo" class="radio-icon" value="fa-biohazard">
                <div class="icon-card">
                    <i class="fa-solid fa-biohazard fa-2x"></i>
                    <div class="small mt-1">Contaminado</div>
                </div>
            </label>
        </div>

        <!-- Reciclable -->
        <div class="col-4 col-md-2 text-center">
            <label>
                <input type="radio" name="icon_tipo" class="radio-icon" value="fa-recycle">
                <div class="icon-card">
                    <i class="fa-solid fa-recycle fa-2x"></i>
                    <div class="small mt-1">Reciclable</div>
                </div>
            </label>
        </div>

        <!-- Especial -->
        <div class="col-4 col-md-2 text-center">
            <label>
                <input type="radio" name="icon_tipo" class="radio-icon" value="fa-star">
                <div class="icon-card">
                    <i class="fa-solid fa-star fa-2x"></i>
                    <div class="small mt-1">Especial</div>
                </div>
            </label>
        </div>

        <!-- Orgánico -->
        <div class="col-4 col-md-2 text-center">
            <label>
                <input type="radio" name="icon_tipo" class="radio-icon" value="fa-leaf">
                <div class="icon-card">
                    <i class="fa-solid fa-leaf fa-2x"></i>
                    <div class="small mt-1">Orgánico</div>
                </div>
            </label>
        </div>

        <!-- Común -->
        <div class="col-4 col-md-2 text-center">
            <label>
                <input type="radio" name="icon_tipo" class="radio-icon" value="fa-trash">
                <div class="icon-card">
                    <i class="fa-solid fa-trash fa-2x"></i>
                    <div class="small mt-1">Común</div>
                </div>
            </label>
        </div>

        <!-- Electrónicos -->
        <div class="col-4 col-md-2 text-center">
            <label>
                <input type="radio" name="icon_tipo" class="radio-icon" value="fa-plug">
                <div class="icon-card">
                    <i class="fa-solid fa-plug fa-2x"></i>
                    <div class="small mt-1">Electrónicos</div>
                </div>
            </label>
        </div>

    </div>
</div>




</form>


       

        

       

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
            $.post('../DATABASE/del_t_reg.php', { 
              
              
              id_delete: id  


            })
                .done(function(response) {
                   
                        const res = JSON.parse(response);
                        console.log(response);

                              mensaje(res.mensaje, res.status);

                        if (res.status === 'success') {
                     
                            t_residuos();

                        }
               
                })
                
        }
    });
});


/// registro de residuos

$(document).on('click', '#btn_registro', function () {
  
// capturo datos del formulario
  const t_res = $('#t_res').val().trim();
  const des_t_res = $('#des_t_res').val().trim();
  const icono = $('input[name="icon_tipo"]:checked').val();
  const  clf_deschos = $('#cbx_clf_res').val();
  
  /// validdacion, si los campos estan vacios


  if (t_res === '') return mensaje('Debes ingresar un tipo de residuo', 'warning');
  if (des_t_res === '') return mensaje('Debes ingresar una descripción', 'warning');
   if ($('input[name="icon_tipo"]:checked').length === 0) {
        return mensaje('Debes seleccionar un icono', 'warning');
    }
  if (clf_deschos === '') return mensaje('Debes seleccionar una clasificación', 'warning');
  
    console.log('icono seleccionado:', icono);
///  ingreso del  registro, 

 $.ajax({
    url: '../DATABASE/in_t_residuo.php',
    type: 'POST',
    data: { t_res,des_t_res, icono, clf_deschos },
    
    beforeSend: function () {
      mensaje('Enviando datos...', 'info');
      $('#btn_registro').prop('disabled', true);
    },
    success: function (response) {
     
       var json = JSON.parse(response);
    
        if(!json.err){  mensaje(json.mensaje,'success');     t_residuos();  $('#modal').modal('hide'); }else{ mensaje( json.mensaje,'error')}



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

  clf_t_res();

  var edit_reg = $(this)[0].parentElement;
  id = $(edit_reg).attr("id");  // más limpio que parentElement

  console.log('ID capturado:', id);
  console.log('llenar_tabla:', llenar_tabla); // 👈 verifica que tenga datos antes de buscar

  // buscar el objeto correspondiente en el JSON global
  let cp = llenar_tabla.find(item => item.PK_t_res == parseInt(id));
  
   pk_registro = id;



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
      <i class="fa-solid fa-recycle me-2"></i>CLASIFICACION |  RESIDUOS 
    </div>
   
 <form id="detalle_residuo" class="container-fluid py-2">

  <div class="card border-0 shadow-sm">
    <div class="card-body">

      

      <!-- Cuerpo del formulario -->
      <div class="row g-3">

        
        
    <!-- Nombre del tipo -->
    <div class="mb-3">
        <label for="nombre_tipo" class="form-label fw-bold">Clasificacion</label>
     
          <select class="form-select form-select-sm" id="cbx_clf_res" name="cbx_clf_res"></select>

        
    </div>

        <form id="form_tipo_residuo">

    <!-- Nombre del tipo -->
    <div class="mb-3">
        <label for="nombre_tipo" class="form-label fw-bold">Nombre del tipo</label>
        <input type="text" class="form-control" id="t_res" name="nombre_tipo"  value="${cp.t_residuo}" placeholder="Ej: Reciclable" required>
    </div>

    <!-- Descripción -->
    <div class="mb-3">
        <label for="descripcion" class="form-label fw-bold">Descripción</label>
        <textarea class="form-control" id="des_t_res" name="descripcion" rows="2" placeholder="Descripción del tipo de residuo">${cp.des_res}</textarea>
    </div>



<div class="mb-3">
    <label class="form-label fw-bold">Seleccionar icono</label>

    <div class="row g-2">

        <!-- Contaminado -->
        <div class="col-4 col-md-2 text-center">
            <label>
                <input type="radio" name="icon_tipo" class="radio-icon" value="fa-biohazard">
                <div class="icon-card">
                    <i class="fa-solid fa-biohazard fa-2x"></i>
                    <div class="small mt-1">Contaminado</div>
                </div>
            </label>
        </div>

        <!-- Reciclable -->
        <div class="col-4 col-md-2 text-center">
            <label>
                <input type="radio" name="icon_tipo" class="radio-icon" value="fa-recycle">
                <div class="icon-card">
                    <i class="fa-solid fa-recycle fa-2x"></i>
                    <div class="small mt-1">Reciclable</div>
                </div>
            </label>
        </div>

        <!-- Especial -->
        <div class="col-4 col-md-2 text-center">
            <label>
                <input type="radio" name="icon_tipo" class="radio-icon" value="fa-star">
                <div class="icon-card">
                    <i class="fa-solid fa-star fa-2x"></i>
                    <div class="small mt-1">Especial</div>
                </div>
            </label>
        </div>

        <!-- Orgánico -->
        <div class="col-4 col-md-2 text-center">
            <label>
                <input type="radio" name="icon_tipo" class="radio-icon" value="fa-leaf">
                <div class="icon-card">
                    <i class="fa-solid fa-leaf fa-2x"></i>
                    <div class="small mt-1">Orgánico</div>
                </div>
            </label>
        </div>

        <!-- Común -->
        <div class="col-4 col-md-2 text-center">
            <label>
                <input type="radio" name="icon_tipo" class="radio-icon" value="fa-trash">
                <div class="icon-card">
                    <i class="fa-solid fa-trash fa-2x"></i>
                    <div class="small mt-1">Común</div>
                </div>
            </label>
        </div>

        <!-- Electrónicos -->
        <div class="col-4 col-md-2 text-center">
            <label>
                <input type="radio" name="icon_tipo" class="radio-icon" value="fa-plug">
                <div class="icon-card">
                    <i class="fa-solid fa-plug fa-2x"></i>
                    <div class="small mt-1">Electrónicos</div>
                </div>
            </label>
        </div>

    </div>
</div>




</form>


       

        

       

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
  const t_res = $('#t_res').val().trim();
  const des_t_res = $('#des_t_res').val().trim();
  const icono = $('input[name="icon_tipo"]:checked').val();
  const  clf_deschos = $('#cbx_clf_res').val();  
  
  /// validdacion, si los campos estan vacios


  if (t_res === '') return mensaje('Debes ingresar un tipo de residuo', 'warning');
  if (des_t_res === '') return mensaje('Debes ingresar una descripción', 'warning');
  if ($('input[name="icon_tipo"]:checked').length === 0) {
        return mensaje('Debes seleccionar un icono', 'warning');
    }
  if (clf_deschos === '') return mensaje('Debes seleccionar una clasificación', 'warning');


  console.log('icono seleccionado:', icono);
///  ingreso del  registro, 

 $.ajax({
    url: '../DATABASE/up_t_res.php',
    type: 'POST',
    data: { t_res,des_t_res, icono, clf_deschos, pk_registro },
    
    beforeSend: function () {
      mensaje('Enviando datos...', 'info');
      $('#btn_registro').prop('disabled', true);
    },
    success: function (response) {
     
       var json = JSON.parse(response);
    
        if(!json.err){  mensaje(json.mensaje,'success');     t_residuos();  $('#modal').modal('hide'); }else{ mensaje( json.mensaje,'error')}



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


///cbx tipo de desecho

 function clf_t_res(){
  $.ajax({
    url: '../DATABASE/cbx_clf_t_des.php', // PHP que devuelve los manifiestos
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_clf_res').empty();
        $('#cbx_clf_res').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_clf_des+'">'+item.clf_desechos+'</option>';
            $('#cbx_clf_res ').append(option);
          }
        });
      }
    }
  });
}
