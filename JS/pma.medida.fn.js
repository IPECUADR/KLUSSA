
$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {
   
   medidas();

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});

///CARGAR DATOS


function medidas(){

  

   
  $.ajax({
    url: '../DATABASE/cargar_medida.php',
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

            <td ><b>`+contador+`</b></td>
            <td ><b>`+item.plan_nom+`</b></td>
            <td ><b>`+item.sub_plan+`</b></td> 
           <td ><b>`+item.aspecto_amb+`</b></td>
             
       
         
            <td >`+item.medida+`</td>
            <td >`+item.verificacion+`</td>
            <td >`+item.frecuencia_fc+`</td>
          
       
     
         
            <td id ="`+item.PK_act+`" md ="`+item.medida+`" vrf= "`+item.verificacion+`"  asp = "`+item.aspecto_amb+`" >


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


  function cbx_plan(){

   $.ajax({
     url: '../DATABASE/cg_plan_cbx.php',
     type: 'POST',
     success: function(response){
       var json = JSON.parse(response);
       if(!json.err){
         $('#cbx_plan').empty();
        $('#cbx_plan').append('<option value="">SELECIONE UNA OPCION</option> ');
         $.each(json, function(i,item){
           if(i!="err"){
           var codigo = '<option value="'+item.PK_plan+'">'+item.plan_nom +' </option> ';
           $('#cbx_plan').append(codigo);
           }
         })
       }
     }
   })
 }
   
$(document).on('change', '#cbx_plan', function () {

    const plan = $(this).val();

    if (plan.length !=0 ) {

         cbx_subplan(plan);


      
       

    }else{

      showToast("⚠️ Por favor selecciona un plan válido", "warning");
  

       $('#cbx_sub').empty();
    }

 
   
});

  function cbx_subplan(plan){


   $.ajax({
     url: '../DATABASE/cg_subplan_cbx.php',
     type: 'POST',
     data:{plan},
     success: function(response){
       var json = JSON.parse(response);
       if(!json.err){
         $('#cbx_sub').empty();
        $('#cbx_sub').append('<option value="">SELECIONE UNA OPCION</option> ');
         $.each(json, function(i,item){
           if(i!="err"){
           var codigo = '<option value="'+item.PK_sub+'">'+item.sub_plan +' </option> ';
           $('#cbx_sub').append(codigo);
           }
         })
       }
     }
   })
 }

$(document).on('change', '#cbx_sub', function () {

    const subplan = $(this).val();

    if (subplan.length !=0 ) {

         cbx_asp_amb(subplan);

    
       

    }else{

      showToast("⚠️ Por favor selecciona un plan válido", "warning");
  

       $('#cbx').empty();
    }

 
   
});










///  CARGAR Taspecto

  function cbx_asp_amb(subplan){

   $.ajax({
     url: '../DATABASE/cg_aspecto_cbx.php',
     type: 'POST',
     data:{subplan},
     success: function(response){
       var json = JSON.parse(response);
       if(!json.err){
         $('#cbx').empty();
        $('#cbx').append('<option value="">SELECIONE UNA OPCION</option> ');
         $.each(json, function(i,item){
           if(i!="err"){
           var codigo = '<option value="'+item.PK_asp_amb+'">'+item.aspecto_amb +' </option> ';
           $('#cbx').append(codigo);
           }
         })
       }
     }
   })
 }


   function cbx_frecuencia(){

   $.ajax({
     url: '../DATABASE/cg_frecuencia_cbx.php',
     type: 'POST',
     success: function(response){
       var json = JSON.parse(response);
       if(!json.err){
         $('#cbx_fr').empty();
        $('#cbx_fr').append('<option value="">SELECIONE UNA OPCION</option> ');
         $.each(json, function(i,item){
           if(i!="err"){
           var codigo = '<option value="'+item.PK_fc+'">'+item.frecuencia_fc +' </option> ';
           $('#cbx_fr').append(codigo);
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
  cbx_frecuencia();

  //mostramos el   modal y limpiamos las secciones 

      $('#modal_pma').modal('show');
      $('#mod_title').empty();
      $('#modal_body').empty();
      $('#modal_footer').empty();

      user_up_aut = $('#usuario_sistema').val();

 /// asignacion de valores de la tabla a objetos

title_modal_up = 'Insertar Medidas';


form_modal_up = `


<form name="formulario-envia" id="formulario-envia" enctype="multipart/form-data" method="POST">


<input type="hidden" class="form-control" name="user_up" id="user_up" value="`+user_up_aut+`">
<input type="hidden" class="form-control" name="id_up" id="id_up" value="">


<div class="form-group">
          <label for="cbx" class="col-form-label"><b>PLAN :</b></label>
           <select class="form-select" name="cbx_plan" id="cbx_plan"> </select>
         </div>

<div class="form-group">
          <label for="cbx" class="col-form-label"><b>SUBPLAN :</b></label>
           <select class="form-select" name="cbx_sub" id="cbx_sub"> </select>
         </div>

<div class="form-group">
          <label for="cbx" class="col-form-label"><b>ASPECTO AMBIENTAL:</b></label>
           <select class="form-select" name="cbx" id="cbx"> </select>
         </div>

 <div class="form-group">
          <label for="md" class="col-form-label"><b>MEDIDA:</b></label>
           <textarea class="form-control" name="md" id="md" placeholder="Medida Ambiental"></textarea>
          
       </div>

  <div class="form-group">
          <label for="vrf" class="col-form-label"><b>VERIFICACION :</b></label>
           <textarea class="form-control" name="vrf" id="vrf" placeholder="Verificacion"></textarea>
          
       </div>


 <div class="form-group">
          <label for="cbx_fr" class="col-form-label"><b>FRECUENCIA:</b></label>
           <select class="form-select" name="cbx_fr" id="cbx_fr"> </select>
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
  let cbx_fr = $("#cbx_fr").val().trim();
  let md = $("#md").val().trim();
  let vrf = $("#vrf").val().trim();
  /// verificacion 

  let id = $("#id_up").val().trim();


  
if (cbx === "") {
  showToastError("Debe selecionar un Aspecto Ambiental.");
  return;
}

if (md === "") {
  showToastError("Debe ingresar un Medida de Gestion.");
  return;
}


if (vrf === "") {
  showToastError("Debe ingresar un Medio de Verificacion.");
  return;
}

if (cbx_fr === "") {
  showToastError("Debe selecionar una Frecuencia");
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
    url:"../DATABASE/insert_acciones.php",
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
          
            medidas();
           
         
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
  cbx_frecuencia();



  ///obtenemos datos de las tablas
 var elementoupdate = $(this)[0].parentElement;
     id = $(elementoupdate).attr("id");
     md = $(elementoupdate).attr("md");
     vrf = $(elementoupdate).attr("vrf");
   


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
           <select class="form-select" name="cbx_plan" id="cbx_plan"> </select>
         </div>

<div class="form-group">
          <label for="cbx" class="col-form-label"><b>SUBPLAN :</b></label>
           <select class="form-select" name="cbx_sub" id="cbx_sub"> </select>
         </div>

<div class="form-group">
          <label for="cbx" class="col-form-label"><b>ASPECTO AMBIENTAL:</b></label>
           <select class="form-select" name="cbx" id="cbx"> </select>
         </div>

 <div class="form-group">
          <label for="md" class="col-form-label"><b>MEDIDA:</b></label>
           <textarea class="form-control" name="md" id="md" placeholder="Medida Ambiental">`+md+`</textarea>
          
       </div>

  <div class="form-group">
          <label for="vrf" class="col-form-label"><b>VERIFICACION :</b></label>
           <textarea class="form-control" name="vrf" id="vrf" placeholder="Verificacion">`+vrf+`</textarea>
          
       </div>


 <div class="form-group">
          <label for="cbx_fr" class="col-form-label"><b>FRECUENCIA:</b></label>
           <select class="form-select" name="cbx_fr" id="cbx_fr"> </select>
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
    url:"../DATABASE/up_actividades.php",
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
          
            medidas();

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
    url: '../DATABASE/up_history_actividades.php',
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
                             
                               <h5> <strong>Usuario Modificaciones: </strong>`+item.user_up_act_aut+`  </h5>
                              <p class="card-text"><strong> Fecha Registro: </strong> `+item.fc_reg_aut_act+`</p>
                               <p class="card-text"><strong> Fecha Actualizacion: </strong> `+item.fc_up_aut_act+`</p>

                               
                              
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
            $.post('../DATABASE/del_actividades.php', { 
              
              
              id_delete: id  


            })
                .done(function(response) {
                   
                        const res = JSON.parse(response);
                        Swal.fire({
                            icon: res.status,
                            title: res.mensaje
                        });

                        if (res.status === 'success') {
                            medidas();
                        }
               
                })
                
        }
    });
});