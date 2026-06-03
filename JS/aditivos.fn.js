$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {

   // url de carga
  gestores();

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});

  function gestores (){

  

   
  $.ajax({
    
    type: 'POST',  

    url:'../DATABASE/cg_aditivos.php',
   
     success: function(response){
      console.log(response);
      $('#content_table').empty();
      llenar_tabla = Object.values(JSON.parse(response)).filter(item => typeof item === 'object');
      

      var json = JSON.parse(response);

      
      if(!json.err){
         
        var contador=1;

        $.each(json, function(i,item){




   
          
         
        if(i!="err"){

        
          
          
         
      


          var codigo = `
              <tr>
                <td>${contador}</td>
                <td>${item.ad_rs}</td>

       
                <td id="${item.PK_ad}">
                 
              
                
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
   
     <div class="container mt-2">
  <div class="card shadow-sm border-0 rounded-3 ficha-form">
    <div class="card-header text-white fw-bold py-3" style="background: #212529;">
      <i class="fa-solid fa-recycle me-2"></i>GESTORES 
    </div>
   
 <form id="detalle_residuo" class="container-fluid py-2">

  <div class="card border-0 shadow-sm">
    <div class="card-body">

      

      <!-- Cuerpo del formulario -->
      <div class="row g-3">

        
        


        <form id="form_tipo_residuo">


    <!-- Nombre del tipo -->
    <div class="mb-3">
        <label for="nombre_tipo" class="form-label fw-bold">NOMBRE ADITIVO </label>
        <input type="text" class="form-control" id="ad_reg" name="gestor" placeholder="Ej: CLAY FREE" required>
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




$(document).on('click', '#btn_registro', function () {
  
// capturo datos del formulario
  const aditivos = $('#ad_reg').val().trim();
  if(aditivos.length === 0 ) return mensaje('Debe insertar algo','warning');
 


 $.ajax({
    url: '../DATABASE/in_adtivo.php',
    type: 'POST',
    data: { aditivos },
    
    beforeSend: function () {
      mensaje('Enviando datos...', 'info');
      $('#btn_registro').prop('disabled', true);
    },
    success: function (response) {
     
       var json = JSON.parse(response);
    
        if(!json.err){  mensaje(json.mensaje,'success');  gestores();  $('#modal').modal('hide'); }else{ mensaje( json.mensaje,'error')}



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
            $.post('../DATABASE/del_adtivo.php', { 
              
              
              id_delete: id  


            })
                .done(function(response) {
                   
                        const res = JSON.parse(response);
                        console.log(response);

                              mensaje(res.mensaje, res.status);

                        if (res.status === 'success') {
                     
                            gestores();

                        }
               
                })
                
        }
    });
});