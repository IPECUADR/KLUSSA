$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {
   
  proyectos_admin();

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});


let llenar_tabla = []; 

function proyectos_admin(){

  

   
  $.ajax({
    url: '../DATABASE/cg_proyectos.php',
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
                    <i class="fas fa-map-marked-alt"></i>
                  </div>
                  <h6 class="fw-bold text-uppercase">${item.proyecto}</h6>
                  <p class="small   text-white badge bg-primary my-2 bg-success mb-0">${item.provincia}</p>

                <div id="${item.PK_pro}" class="d-flex justify-content-center mt-3">
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
        <div class="col-md-4">
          <label for="proyecto" class="form-label fw-bold">Proyecto</label>
          <input type="text" class="form-control" id="proyecto" name="nombre_tipo" placeholder="Ej: Macas" required>
        </div>

        <div class="col-md-8">
          <label for="descripcion" class="form-label fw-bold">Provincia</label>
          <textarea class="form-control" id="descripcion" name="descripcion" rows="1" placeholder="Descripción del tipo de residuo"></textarea>
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
            $.post('../DATABASE/del_proyecto.php', { 
              
              
              id_delete: id  


            })
                .done(function(response) {
                   
                        const res = JSON.parse(response);
                        console.log(response);

                              mensaje(res.mensaje, res.status);

                        if (res.status === 'success') {
                     
                            proyectos_admin();

                        }
               
                })
                
        }
    });
});


/// registro de residuos

$(document).on('click', '#btn_registro', function () {
  
// capturo datos del formulario
  const proyecto = $('#proyecto').val().trim();
  const descripcion = $('#descripcion').val().trim();
 
  /// validdacion, si los campos estan vacios


  if (proyecto === '') return mensaje('Debes ingresar un proyecto', 'warning');
  if (descripcion === '') return mensaje('Debes ingresar una descripción', 'warning');

  
  
///  ingreso del  registro, 

 $.ajax({
    url: '../DATABASE/in_proyecto.php',
    type: 'POST',
    data: { proyecto,descripcion },
    
    beforeSend: function () {
      mensaje('Enviando datos...', 'info');
      $('#btn_registro').prop('disabled', true);
    },
    success: function (response) {
     
       var json = JSON.parse(response);
    
        if(!json.err){  mensaje(json.mensaje,'success');     proyectos_admin();  $('#modal').modal('hide'); }else{ mensaje( json.mensaje,'error')}



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
  let cp = llenar_tabla.find(item => item.PK_pro == parseInt(id));
  
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
   





<form id="detalle_residuo" class="container-fluid py-2">

  <div class="card border-0 shadow-sm w-100">
    <div class="card-body w-100">

      <!-- Cuerpo del formulario -->
      <div class="row g-3 w-100">

        <div class="col-12">

        <div class="row g-3 mb-3">
        <div class="col-md-4">
          <label for="proyecto" class="form-label fw-bold">Proyecto</label>
          <input type="text" class="form-control" id="proyecto" name="nombre_tipo" placeholder="Ej: Macas" value="${cp.proyecto}" required>
        </div>

        <div class="col-md-8">
          <label for="descripcion" class="form-label fw-bold">Provincia</label>
          <textarea class="form-control" id="descripcion" name="descripcion" rows="1" placeholder="Descripción del tipo de residuo">${cp.provincia}</textarea>
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
  const proyecto = $('#proyecto').val().trim();
  const provincia = $('#descripcion').val().trim();

  
  /// validdacion, si los campos estan vacios


  if (proyecto === '') return mensaje('Debes ingresar un proyecto', 'warning');
  if (provincia === '') return mensaje('Debes ingresar una provincia', 'warning');



///  ingreso del  registro, 
   $.post(
                        '../DATABASE/up_proyecto.php',
                        { id: id, proyecto: proyecto, provincia: provincia },
                        function(response) {
                        
          
                          var json = JSON.parse(response);

                          console.log('Respuesta del servidor:', response);
                          mensaje(json.mensaje, json.status);
                          proyectos_admin(); 
                          $('#modal').modal('hide');
                          
                          // refrescar la tabla después de la actualización
                        }
                      );



});


