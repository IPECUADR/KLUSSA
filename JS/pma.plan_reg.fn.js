





$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {
   
   cargar_plan()

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});













function cargar_plan(){

  

   
  $.ajax({
    url: '../DATABASE/cargar_planes_confi.php',
    type: 'POST',
  
    success: function(response){
      console.log(response);
      $('#content_table').empty();
      var json = JSON.parse(response);
      if(!json.err){
          var contador=1;
        $.each(json, function(i,item){
          


   
          
         
        if(i!="err"){

        
          
          
         
      


          var codigo =`
          
                      
          <tr>

          <td >`+contador+`</td>
          <td >`+item.plan_nom+`</td>
          <td >`+item.plan_desc+`</td>
          <td >`+item.plan_an+`</td>         
          <td >`+item.doc_pln_mc_lg+`</td>
  
          
         
            <td user="`+item.user_up_plan_aut+`" id="`+item.PK_plan+`" plan ="`+item.plan_nom+`" des ="`+item.plan_desc+`" an ="`+item.plan_an+`" >

           <a class="btn btn-danger" target="_blank" href="http://200.105.244.50/ARCHIVO/DOC/PLANES/`+item.doc_pln_mc_lg+`" role="button"><i class="far fa-file-pdf"></i></a>

            <button type="button" id="btn_editar" class="btn btn-success  btn-sm mt-1 mb-1"><i class="fas fa-edit"></i></button>

          
           <button type="button" id="btn_history" class="btn btn-dark btn-sm mt-1 mb-1"><i class="fas fa-history"></i></button>
           <button type="button" id="btn_delete" class="btn btn-danger btn-sm mb-1 mt-1"><i class="fas fa-trash-alt"></i></button>          

              
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

           Swal.fire({
                icon: 'info',
                title: json.mensaje,
                text:  'No existen exámenes agendados.'
                

                })
          }
    }
  })


}

/// actualizar registros

$(document).on('click','#btn_editar',function(event){

 user_up_aut = $('#usuario_sistema').val();
  ///obtenemos datos de las tablas
 var elementoupdate = $(this)[0].parentElement;
    id = $(elementoupdate).attr("id");
    plan = $(elementoupdate).attr("plan");
    des = $(elementoupdate).attr("des");
    an = $(elementoupdate).attr("an");

  //mostramos el   modal y limpiamos las secciones 

    $('#modal_pma').modal('show');
      $('#mod_title').empty();
      $('#modal_body').empty();
      $('#modal_footer').empty();


 /// asignacion de valores de la tabla a objetos

title_modal_up = 'Editar Registro';


form_modal_up = `


<form name="formulario-envia" id="formulario-envia" enctype="multipart/form-data" method="POST">


<input type="hidden" class="form-control" name="user_up" id="user_up" value="`+user_up_aut+`">

<input type="hidden" class="form-control" name="PK_plan" id="PK_plan" value="`+id+`">


   <div class="form-group">
            <label for="plan_nm" class="col-form-label"><b> Plan:</b></label>
            <input type="text" class="form-control" name="plan_nm" id="plan_nm" value="`+plan+`">
          </div>


  <div class="form-group">
            <label for="des_plan" class="col-form-label"><b>Descripción:</b></label>
            <textarea class="form-control" name="des_plan" id="des_plan">`+des+`</textarea>
   </div>


    <div class="form-group">
            <label for="an_plan" class="col-form-label"><b>Año:</b></label>
            <input type="text" class="form-control" name="an_plan" id="an_plan" value="`+an+`">
     </div>


       <div class="form-group">
            <label for="doc_plan" class="col-form-label"><b>Documento Legal:</b></label>
            <input type="file" class="form-control" name="doc_plan" id="doc_plan">
     </div>

</form>

`;



op_form_modal_up =` 



<button id="btn_up_plan_reg" type="button" class="btn btn-dark col-12">Actualizar Registro</button>


`;


// asignacion objetos a secciones del  modal


      $('#mod_title').append(title_modal_up);
      $('#modal_body').append(form_modal_up);
      $('#modal_footer').append(op_form_modal_up);



});




$(document).on('click','#btn_up_plan_reg',function(event){

update_plan();

});



function update_plan(){

  var parametros = new FormData($("#formulario-envia")[0]);

  $.ajax({
    type:"POST",
    url:"../DATABASE/up_plan.php",
    data:parametros,
    contentType:false,
    processData: false, 
    success:function(response){
    console.log(response);
        var json = JSON.parse(response);
    
        if(!json.err){


          Swal.fire(
            'Exito!',
            json.mensaje,
            'success');
          
            cargar_plan();
             $('#modal_pma').modal('hide');
         
        }else{


          Swal.fire({
            icon: 'error',
            title: json.mensaje,
            text:  'Error'
            // ,footer: '<a href>Como solucionarlo?</a>'
            })
            
         
        }
      }
  });

}







/// ver cambios a nivel de sisteema


$(document).on('click','#btn_history',function(event){

// MOSTRAMOS LOS RECURSOS PARA CARGAR DATOS

      $('#modal_pma').modal('show');
      $('#mod_title').empty();
      $('#modal_body').empty();
      $('#modal_footer').empty();


/////////////////////////////////////////////////

    var user_cambios = $(this)[0].parentElement;
    user = $(user_cambios).attr("user");
    id = $(user_cambios).attr("id");


  $.ajax({
    url: '../DATABASE/up_history_plan.php',
    type: 'POST',
    data:{user, id},
    success: function(response){
      console.log(response);

      var json = JSON.parse(response);
      if(!json.err){
          var contador=1;
        $.each(json, function(i,item){
          
          
      if(i!="err"){

        
          
          
        

          var info_up_history =`
          
                 <div class="card mb-3" >
                        <div class="row no-gutters">
                          <div class="col-md-4">
                            <img src="../IMAGE/cl.png" class="card-img" alt="...">
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                             
                               <h5>`+item.nom_user+` `+item.ap_user+` </h5>
                              
                               <p class="card-text">`+item.username_user+`</p>

                                <p class="card-text">`+item.fc_up_plan_aut+`</p>
                              
                              <p class="card-text"><small class="text-muted">`+item.agencia_reg_user+`</small></p>
                            </div>
                          </div>
                        </div>
                  </div>
                  
          
          `;
        
       
       
       
        }



        
         
///CARGAMOS DATOS 




      $('#mod_title').append();
      $('#modal_body').append(info_up_history);
      $('#modal_footer').append();







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






});


$('#btn_reg').click(function(){

  //mostramos el   modal y limpiamos las secciones 

      $('#modal_pma').modal('show');
      $('#mod_title').empty();
      $('#modal_body').empty();
      $('#modal_footer').empty();

      user_up_aut = $('#usuario_sistema').val();

 /// asignacion de valores de la tabla a objetos

title_modal_up = 'Editar Registro';


form_modal_up = `


<form name="formulario-envia" id="formulario-envia" enctype="multipart/form-data" method="POST">


<input type="hidden" class="form-control" name="user_up" id="user_up" value="`+user_up_aut+`">




   <div class="form-group">
            <label for="plan_nm" class="col-form-label"><b> Plan:</b></label>
            <input type="text" class="form-control" name="plan_nm" id="plan_nm" value="">
          </div>


  <div class="form-group">
            <label for="des_plan" class="col-form-label"><b>Descripción:</b></label>
            <textarea class="form-control" name="des_plan" id="des_plan"></textarea>
   </div>


    <div class="form-group">
            <label for="an_plan" class="col-form-label"><b>Año:</b></label>
            <input type="text" class="form-control" name="an_plan" id="an_plan" value="">
     </div>


       <div class="form-group">
            <label for="doc_plan" class="col-form-label"><b>Documento Legal:</b></label>
            <input type="file" class="form-control" name="doc_plan" id="doc_plan">
     </div>

</form>

`;



op_form_modal_up =` 



<button id="btn_insert_reg" type="button" class="btn btn-dark col-12">Insertar Registro</button>


`;


// asignacion objetos a secciones del  modal


      $('#mod_title').append(title_modal_up);
      $('#modal_body').append(form_modal_up);
      $('#modal_footer').append(op_form_modal_up);


})






$(document).on('click', '#btn_insert_reg', function () {
    // Obtener valores del formulario
    const plan = $('#plan_nm').val();
    const descripcion = $('#des_plan').val();
    const anio = $('#an_plan').val();
    const archivo = $('#doc_plan').val(); // si es requerido

    let errores = [];



    // Validaciones
    if (plan === '') {
        errores.push('El campo "Plan" es obligatorio.');
    }

    if (descripcion === '') {
        errores.push('El campo "Descripción" es obligatorio.');
    }

    if (!/^\d{4}$/.test(anio)) {
        errores.push('El campo "Año" debe ser un número de 4 dígitos.');
    }

    // Si archivo fuera obligatorio:
    if (archivo === '') {
       errores.push('Debe seleccionar un Documento Legal.');
     }

    if (errores.length > 0) {
        // Mostrar errores

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        // Mostrar cada error como toast
        errores.forEach(error => {
            Toast.fire({
                icon: 'error',
                title: error
            });
        });

        return;
    }


    // si todo es correcto, 

    insert_plan(); 


});





function insert_plan(){

  var parametros = new FormData($("#formulario-envia")[0]);

  

  $.ajax({
    type:"POST",
    url:"../DATABASE/insert_plan.php",
    data:parametros,
    contentType:false,
    processData: false, 
    success:function(response){
    console.log(response);
        var json = JSON.parse(response);
    
        if(!json.err){


          Swal.fire(
            'Exito!',
            json.mensaje,
            'success');
          
            cargar_plan();
             $('#modal_pma').modal('hide');
         
        }else{


          Swal.fire({
            icon: 'error',
            title: json.mensaje,
            text:  'Error'
            // ,footer: '<a href>Como solucionarlo?</a>'
            })
            
         
        }
      }
  });

}



$(document).on('click','#btn_delete',function(event){

// MOSTRAMOS LOS RECURSOS PARA CARGAR DATOS

 var delete_info = $(this)[0].parentElement;
   id = $(delete_info).attr("id");
   
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
            $.post('../DATABASE/del_plan.php', { PK_plan: id })
                .done(function(response) {
                    try {
                        const res = JSON.parse(response);
                        Swal.fire({
                            icon: res.status,
                            title: res.mensaje
                        });

                        if (res.status === 'success') {
                            cargar_plan();
                        }
                    } catch (e) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error inesperado',
                            text: 'Respuesta del servidor no válida.'
                        });
                         
                        console.log(response);



                    }
                })
                
        }
    });
});