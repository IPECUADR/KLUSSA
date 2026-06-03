





$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {
   
   users_pma()

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});















function users_pma(){

  

   
  $.ajax({
    url: '../DATABASE/cargar_user_config.php',
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
          <td >`+item.nom_user+`</td>
          <td >`+item.ap_user+`</td>
          <td >`+item.cargo_user+`</td>         
          <td >`+item.agencia_reg_user+`</td>
           <td >`+item.username_user  +`</td>
          <td >`+item.ci_user+`</td>
          <td >`+item.des_t_user+`</td>
         
            <td ci ="`+item.ci_user+`" cg ="`+item.cargo_user+`"   t_user ="`+item.FK_t_user+`"  ag ="`+item.agencia_reg_user+`"  id="`+item.PK_user+`" nom ="`+item.nom_user+`" ap ="`+item.ap_user+`"  user ="`+item.username_user+`"   >


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

/// mostrar datos en  el  sistema


// automarizacion de registros


$('#btn_reg').click(function(){

  cg_tipo_usuario();
  //mostramos el   modal y limpiamos las secciones 

      $('#modal_pma').modal('show');
      $('#mod_title').empty();
      $('#modal_body').empty();
      $('#modal_footer').empty();

      user_up_aut = $('#usuario_sistema').val();

 /// asignacion de valores de la tabla a objetos

title_modal_up = 'Insertar Usuario';


form_modal_up = `


<form name="formulario-envia" id="formulario-envia" enctype="multipart/form-data" method="POST">


<input type="hidden" class="form-control" name="user_up" id="user_up" value="`+user_up_aut+`">
<input type="hidden" class="form-control" name="PK_user" id="PK_user" value="">

<div class="row">

 <div class="form-group">
            <label for="ci" class="col-form-label"><b> IDENTIFICACION N°:</b></label>
            <input type="text" class="form-control" name="ci" id="ci" >
          </div>

   <div class="form-group col-6">
            <label for="nom" class="col-form-label"><b> NOMBRE : </b></label>
            <input type="text" class="form-control" name="nom" id="nom" >
          </div>

  <div class="form-group col-6">
            <label for="ap" class="col-form-label"><b> APELLIDOS :</b></label>
            <input type="text" class="form-control" name="ap" id="ap" >
          </div>

          
  <div class="form-group col-6">
            <label for="ag" class="col-form-label"><b> AGENCIA :</b></label>
            <input type="text" class="form-control" name="ag" id="ag" >
          </div>


  <div class="form-group col-6">
            <label for="cg" class="col-form-label"><b>CARGO :</b></label>
               <input type="text" class="form-control" name="cg" id="cg" >

   </div>

  

<div class="form-group">
          <label for="cbx" class="col-form-label"><b> TIPO USUARIO :</b></label>
           <select class="form-select" name="cbx" id="cbx"> </select>
         </div>

    <div class="form-group">
            <label for="em" class="col-form-label"><b> EMAIL :</b></label>
            <input type="email" class="form-control" name="em" id="em" >
         </div>
         
    <div class="form-group mb-4">
            <label for="pass" class="col-form-label"><b> PASSWORD :</b></label>
            <input type="password" class="form-control" name="ps" id="ps" >
         </div>


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

  let ci = $("#ci").val().trim();
  let nom = $("#nom").val().trim();
  let ap = $("#ap").val().trim();
  let ag = $("#ag").val().trim();
  let cg = $("#cg").val().trim();
  let t_u = $("#cbx").val().trim();
  let em = $("#em").val().trim();
  let pass = $("#pass").val();

  /// verificacion 

  let id = $("#PK_user").val().trim();

  console.log(pass);
  
if (ci === "") {
  showToastError("El campo Identificación es obligatorio");
  return;
}

if (nom === "") {
  showToastError("El campo Nombre es obligatorio");
  return;
}

if (ap === "") {
  showToastError("El campo Apellidos es obligatorio");
  return;
}

if (ag === "") {
  showToastError("El campo Agencia es obligatorio");
  return;
}

if (cg === "") {
  showToastError("El campo Cargo es obligatorio");
  return;
}

if (t_u === "") {
  showToastError("Seleciona un tipo de usuario");
  return;
}

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(em)) {

     showToastError( "Por favor, ingresa un email válido");
     return;

 }

 if (pass === "") {
  showToastError("Debes ingresar una contrseña");
  return;
}



if(id.length != 0){

  update_user();

  console.log('es actualizacion');

}else{

  insert_user();
    console.log('es registro');


}



}



/// insertar registros



function insert_user(){

  var parametros = new FormData($("#formulario-envia")[0]);

  

  $.ajax({
    type:"POST",
    url:"../DATABASE/insert_user.php",
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
          
            users_pma();
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










/// actualizar registros

$(document).on('click','#btn_editar',function(event){

 user_up_aut = $('#usuario_sistema').val();

  cg_tipo_usuario();
  ///obtenemos datos de las tablas
 var elementoupdate = $(this)[0].parentElement;
    id = $(elementoupdate).attr("id");
    nom = $(elementoupdate).attr("nom");
    ci = $(elementoupdate).attr("ci");
    ap = $(elementoupdate).attr("ap");
    user = $(elementoupdate).attr("user");
    
    ag = $(elementoupdate).attr("ag");
    cg = $(elementoupdate).attr("cg");
    t_u = $(elementoupdate).attr("t_user");


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

<input type="hidden" class="form-control" name="PK_user" id="PK_user" value="`+id+`">

<div class="row">

 <div class="form-group col-12">

            <label for="ci" class="col-form-label"><b> IDENTIFICACION N°:</b></label>
            <input type="text" class="form-control" name="ci" id="ci" value="`+ci+`">
          </div>

   <div class="form-group col-6">
            <label for="nom" class="col-form-label"><b> NOMBRE : </b></label>
            <input type="text" class="form-control" name="nom" id="nom" value="`+nom+`">
          </div>

  <div class="form-group col-6">
            <label for="ap" class="col-form-label"><b> APELLIDOS :</b></label>
            <input type="text" class="form-control" name="ap" id="ap" value="`+ap+`">
          </div>

          
  <div class="form-group col-6">
            <label for="ag" class="col-form-label"><b> AGENCIA :</b></label>
            <input type="text" class="form-control" name="ag" id="ag" value="`+ag+`">
          </div>




  <div class="form-group col-6">
            <label for="cg" class="col-form-label"><b>CARGO :</b></label>
            <input class="form-control" name="cg" id="cg" value="`+cg+`">
   </div>

   <div class="form-group col-12">
          <label for="cbx" class="col-form-label"><b> Tipo Usuario :</b></label>
           <select class="form-select" name="cbx" id="cbx"> </select>
         </div>

   <div class="form-group col-6">
            <label for="em" class="col-form-label"><b>EMAIL :</b></label>
            <input class="form-control" name="em" id="em" value="`+user+`">
   </div>

   <div class="form-group col-6">
           <label for="pas" class="col-form-label"><b>PASSWORD :</b></label>
           <input type="password" class="form-control" name="ps" id="ps" >
   </div>


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









function update_user(){

  var parametros = new FormData($("#formulario-envia")[0]);

  $.ajax({
    type:"POST",
    url:"../DATABASE/up_user.php",
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
          
            users_pma();
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
///  CARGAR T USUARIO


  function cg_tipo_usuario(){

   $.ajax({
     url: '../DATABASE/cargar_t_user.php',
     type: 'POST',
     success: function(response){
       var json = JSON.parse(response);
       if(!json.err){
         $('#cbx').empty();
        $('#cbx').append('<option value="">SELECIONE UNA OPCION</option> ');
         $.each(json, function(i,item){
           if(i!="err"){
           var codigo = '<option value="'+item.PK_t_user+'">'+item.des_t_user+' </option> ';
           $('#cbx').append(codigo);
           }
         })
       }
     }
   })
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
    url: '../DATABASE/up_history_users.php',
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
                             
                               <h5> <strong>Usuario: </strong>`+item.user_up_reg+`  </h5>
                              
                               <p class="card-text"><strong> Fecha Actualizacion: </strong> `+item.fc_up_aut_user+`</p>

                               
                              
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
            $.post('../DATABASE/del_user.php', { 
              
              
              PK_user: id  


            })
                .done(function(response) {
                   
                        const res = JSON.parse(response);
                        Swal.fire({
                            icon: res.status,
                            title: res.mensaje
                        });

                        if (res.status === 'success') {
                            users_pma();
                        }
               
                })
                
        }
    });
});