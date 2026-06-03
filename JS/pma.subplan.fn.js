
$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {
   
   subplanes();

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});

///CARGAR DATOS


function subplanes(){

  

   
  $.ajax({
    url: '../DATABASE/cargar_subplanes.php',
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
          <td > <b>`+item.sub_plan+`</b></td>   
          <td >`+item.plan_nom+`</td>
          <td >`+item.plan_desc+`</td>
               
       
     
         
            <td id ="`+item.PK_sub+`" plan ="`+item.plan_nom+`" sub = "`+item.sub_plan+`" up = "`+item.aut_us_sub_aut+`" >


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
                text:  'No existen registros en el sistema.'
                

                })
          }
    }
  })


}


///CARGAR PLANES 

///  CARGAR T USUARIO


  function cbx_plan(){

   $.ajax({
     url: '../DATABASE/cg_plan_cbx.php',
     type: 'POST',
     success: function(response){
       var json = JSON.parse(response);
       if(!json.err){
         $('#cbx').empty();
        $('#cbx').append('<option value="">SELECIONE UNA OPCION</option> ');
         $.each(json, function(i,item){
           if(i!="err"){
           var codigo = '<option value="'+item.PK_plan+'">'+item.plan_nom+' </option> ';
           $('#cbx').append(codigo);
           }
         })
       }
     }
   })
 }

/// mostrar datos en  el  sistema


// REALIZAR REGISTROS EN EL SISTEMA


$('#btn_reg').click(function(){

  cbx_plan();
  //mostramos el   modal y limpiamos las secciones 

      $('#modal_pma').modal('show');
      $('#mod_title').empty();
      $('#modal_body').empty();
      $('#modal_footer').empty();

      user_up_aut = $('#usuario_sistema').val();

 /// asignacion de valores de la tabla a objetos

title_modal_up = 'Insertar Subplan';


form_modal_up = `


<form name="formulario-envia" id="formulario-envia" enctype="multipart/form-data" method="POST">


<input type="hidden" class="form-control" name="user_up" id="user_up" value="`+user_up_aut+`">
<input type="hidden" class="form-control" name="id_up" id="id_up" value="">



<div class="form-group">
          <label for="cbx" class="col-form-label"><b>PLAN :</b></label>
           <select class="form-select" name="cbx" id="cbx"> </select>
         </div>

 <div class="form-group">
            <label for="ci" class="col-form-label"><b> SUB PLAN :</b></label>
            <input type="text" class="form-control" name="sub" id="sub" >
          </div>


  








</form>

`;


op_form_modal_up =` 



<button id="btn_insert" type="button" class="btn btn-dark col-12">Insertar Registro</button>


`;


// asignacion objetos a secciones del  modal


      $('#mod_title').append(title_modal_up);
      $('#modal_body').append(form_modal_up);
      $('#modal_footer').append(op_form_modal_up);


})









/// verificacion de ingreso de informacion

$(document).on('click', '#btn_insert', function () {

validar();
 

});







function validar(){

  let cbx = $("#cbx").val().trim();
  let sub = $("#sub").val().trim();


  /// verificacion 

  let id = $("#id_up").val().trim();


  
if (cbx === "") {
  showToastError("Debe selecionar un plan.");
  return;
}

if (sub === "") {
  showToastError("Debe ingresar un subplan.");
  return;
}






if(id.length != 0){

  update_reg();

  console.log('es actualizacion');

}else{

  inser_reg();
    console.log('es registro');


}



}



/// insertar registros



function inser_reg (){

  var parametros = new FormData($("#formulario-envia")[0]);

  

  $.ajax({
    type:"POST",
    url:"../DATABASE/insert_subplan.php",
    data:parametros,
    contentType:false,
    processData: false, 
    success:function(response){
    console.log(response);
        var json = JSON.parse(response);
    
        if(!json.err){


          Swal.fire(
            'Operación completada con éxito!',
            json.mensaje,
            'success');
          
            subplanes();
           
         
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










/// actualizar registros

$(document).on('click','#btn_editar',function(event){

 user_up_aut = $('#usuario_sistema').val();

  cbx_plan();
  ///obtenemos datos de las tablas
 var elementoupdate = $(this)[0].parentElement;
    id = $(elementoupdate).attr("id");
    sub = $(elementoupdate).attr("sub");
   


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

<input type="hidden" class="form-control" name="id_up" id="id_up" value="`+id+`">

<div class="form-group">
          <label for="cbx" class="col-form-label"><b>PLAN :</b></label>
           <select class="form-select" name="cbx" id="cbx"> </select>
         </div>

 <div class="form-group">
            <label for="ci" class="col-form-label"><b> SUB PLAN :</b></label>
            <input type="text" class="form-control" name="sub" id="sub"  value="`+sub+`">
          </div>


</form>

`;



op_form_modal_up =` 



<button id="btn_up" type="button" class="btn btn-dark col-12">Actualizar Registro</button>


`;


// asignacion objetos a secciones del  modal


      $('#mod_title').append(title_modal_up);
      $('#modal_body').append(form_modal_up);
      $('#modal_footer').append(op_form_modal_up);



});


// verificacion  update

$(document).on('click','#btn_up',function(event){

  
 validar();


});





/// verificacion de datos. 

















function showToastError(mensaje) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  Toast.fire({
    icon: "error",
    title: mensaje
  });
}









function update_reg(){

  var parametros = new FormData($("#formulario-envia")[0]);

  $.ajax({
    type:"POST",
    url:"../DATABASE/up_subplanes.php",
    data:parametros,
    contentType:false,
    processData: false, 
    success:function(response){
    console.log(response);
        var json = JSON.parse(response);
    
        if(!json.err){


          Swal.fire(
           'Operación completada con éxito!',
            json.mensaje,
            'success');
          
            subplanes();
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
    
    id = $(user_cambios).attr("id");
    console.log(id);

  $.ajax({
    url: '../DATABASE/up_history_sub.php',
    type: 'POST',
    data:{ id},
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
                             
                               <h5> <strong>Usuario: </strong>`+item.aut_us_sub_aut+`  </h5>
                              <p class="card-text"><strong> Fecha Registro: </strong> `+item.aut_fc_reg_sub+`</p>
                               <p class="card-text"><strong> Fecha Actualizacion: </strong> `+item.aut_fc_up_sub+`</p>

                               
                              
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
            $.post('../DATABASE/del_subplan.php', { 
              
              
              id_delete: id  


            })
                .done(function(response) {
                   
                        const res = JSON.parse(response);
                        console.log(response);


                        Swal.fire({
                            icon: res.status,
                            title: res.mensaje
                        });

                        if (res.status === 'success') {
                            subplanes();
                        }
               
                })
                
        }
    });
});