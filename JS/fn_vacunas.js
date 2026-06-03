$(document).ready(function(){

  cargarVacunas();






});


















function cargarVacunas(){

   



   




   
  $.ajax({
    url: '../DATABASE/cargar_vacunas.php',
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
          <td >`+item.hcl_num+`</td>
          <td >`+item.nombre_prs+`</td>
          <td >`+item.apellido_ps+`</td>         
          <td >`+item.fc_nan_prc+`</td>
          <td >`+item.sexo_p+`</td>
          <td >`+item.cargo+`</td>
          <td >`+item.g_atencion+`</td>
          <td >`+item.est_p+`</td>
          <td >`+item.g_sanginio+`</td>
          <td >`+item.t_vacuna+`</td>
          <td >`+item.Dosis+`</td>
           <td >`+item.Marca+`</td>
          <td class="bg-dark text-white">`+item.fc_vc+`</td>

           <td PK_vacuna="`+item.PK_vc+`" cert="`+item.evidencia_vc+`"   dosis ="`+item.Dosis+`"  tp_examen="`+item.t_vacuna+`"  cel="`+item.num_cel_prs+`"   fc_ag ="`+item.fc_vc+`" nom ="`+item.nombre_prs+`" ap ="`+item.apellido_ps+`">
           <button type="button" id="btn_resultados" class="btn btn-primary btn-sm mt-1 mb-1"><i class="far fa-file-alt"></i></button>
           <button type="button" id="btn_editar" class="btn btn-success  btn-sm mt-1 mb-1"><i class="fas fa-edit"></i></button>
           <button type="button" id="btn_delete" class="btn btn-danger btn-sm mb-1 mt-1"><i class="fas fa-trash-alt"></i></button>          

              
              </td>
          </tr>
          
 
          
          `;


         





         
         
         
         

          

         
     
          
      
        
       }



          //asignacion de informacion

         $('#content_table').append(codigo);
          contador++;



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


//funmciones de navegacion 
$('#btn_reg_p').click(function(){



    cargar_form();


})





function cargar_form(){

    //limpieza de modal

    $('#reg_modal').modal('show'); 
    $('#modal_body').empty();
    $('#modal_footer').empty();
    $('#mod_title').empty();

    //fin
          //modal boy
           var modal_body = ` 
         

          
<form name="formulario-envia" id="formulario-envia" enctype="multipart/form-data" method="POST"> 
  <div class="row">
  <div id="sec_persona" class="form-group p-2 col-md-12 col-lg-12 col-sm-12 ">
                
                <label for="">Paciente </label>
                     <select class="form-select" name="cbx_paciente" id="cbx_paciente">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                     
                        </select>          
              </div>
                  
          
          <div class="form-group p-2 col-md-12 col-lg-6 col-sm-12">
               <label for="">Vacuna </label>
                <select class="form-select" name="cbx_t_vacuna" id="cbx_t_vacuna">
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                 
                  </select>
            </div>

              <div class="form-group p-2 col-md-12 col-lg-6 col-sm-12 ">
                
                <label for="">Dosis</label>
                     <select class="form-select" name="cbx_dosis" id="cbx_dosis">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                     
                        </select>          
              </div>

             <div class="form-group p-2 col-md-12 col-lg-6 col-sm-12">
               <label for="">Fecha de ejecución</label>
               <input type="date" class="form-control" name="imp_fc_ag" id="imp_fc_ag"  placeholder="Ingresar información">
            </div>
            
            
             <div class="form-group p-2 col-md-12 col-lg-6 col-sm-12 ">
                
                <label for="">Marca</label>
                     <select class="form-select" name="cbx_marca_vc" id="cbx_marca_vc">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                     
                        </select>          
              </div>

         <div class="form-group p-2 col-md-12 col-lg-12 col-sm-12">
             <label for="resul_exam" class="p-2"><b>Certificado </b></label>
             <input class="form-control" type="file" name="crt_vacuna" id="crt_vacuna">
          </div>

              
          


      
            
           
         </div>
          

           
</form>
       

     
           `;
         //modal footer

           var modal_footer = ` 
           
           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
           <button type="button" id="btn_registar" class="btn btn-primary">Registrar Vacuna</button>
          
          
           `;
           
           
        // modal title
           var modal_title = `Registro Esquema de Vacunación`;


/// asignacion de valores
$('#mod_title').append(modal_title);
$('#modal_body').append(modal_body);
$('#modal_footer').append(modal_footer);

// carga de cbx 
cargar_T_vacuna();
carar_marca_vc();
cargar_dosis();
cargar_paciente();
}

//cargar datos formularios 






  function cargar_T_vacuna(){

   $.ajax({
     url: '../DATABASE/cargar_t_vacuna.php',
     type: 'POST',
     success: function(response){
       var json = JSON.parse(response);
       if(!json.err){
         $('#cbx_t_vacuna').empty();
        $('#cbx_t_vacuna').append('<option value="">SELECIONE UNA OPCION</option> ');
         $.each(json, function(i,item){
           if(i!="err"){
           var codigo = '<option value="'+item.PK_t_vc+'">'+item.t_vacuna+' </option> ';
           $('#cbx_t_vacuna').append(codigo);
           }
         })
       }
     }
   })
 }


 



function cargar_dosis (){



   $.ajax({
      url: '../DATABASE/cargar_dosis.php',
      type: 'POST',
      success: function(response){
        var json = JSON.parse(response);
        if(!json.err){
          $('#cbx_dosis').empty();
         $('#cbx_dosis').append('<option value="">SELECCIONE UNA OPCION</option> ');
          $.each(json, function(i,item){
            if(i!="err"){
            var codigo = '<option value="'+item.PK_ds +'">'+item.Dosis+' </option> ';
            $('#cbx_dosis').append(codigo);
            }
          })
        }
      }
    })

}

function carar_marca_vc (){



  $.ajax({
     url: '../DATABASE/cargar_marca_vacuna.php',
     type: 'POST',
     success: function(response){
       var json = JSON.parse(response);
       if(!json.err){
         $('#cbx_marca_vc').empty();
        $('#cbx_marca_vc').append('<option value="">SELECCIONE UNA OPCION</option> ');
         $.each(json, function(i,item){
           if(i!="err"){
           var codigo = '<option value="'+item.PK_m_vc +'">'+item.Marca+' </option> ';
           $('#cbx_marca_vc').append(codigo);
           }
         })
       }
     }
   })

}


function cargar_paciente (){



  $.ajax({
     url: '../DATABASE/cargar_paciente.php',
     type: 'POST',
     success: function(response){
       var json = JSON.parse(response);
       if(!json.err){
         $('#cbx_paciente').empty();
        $('#cbx_paciente').append('<option value="">SELECCIONE UNA OPCION</option> ');
         $.each(json, function(i,item){
           if(i!="err"){
           var codigo = '<option value="'+item.PK_prs +'">'+item.nombre_prs+'  '+item.apellido_ps+'</option> ';
           $('#cbx_paciente').append(codigo);
           }
         })
       }
     }
   })

}
//ejecucion de funcion
$(document).on('click','#btn_registar',function(event){



  insertVacuna();

})

// validacion e insercion

function insertVacuna(){

 pasciente = $('#cbx_paciente').val()  
 vacuna = $('#cbx_t_vacuna').val()  
 fc_ag = $('#imp_fc_ag').val()  
 crt =$('#crt_vacuna').val();
 dosis = $('#cbx_dosis').val();
 marca = $('#cbx_marca_vc').val();


if(pasciente.length !== 0){


  if(vacuna.length !== 0){

      if(fc_ag.length !== 0){
     
      

            if(dosis.length !== 0){

            

              if(marca.length !== 0){

                
              if(crt.length !== 0){

            

                
                insert_vacuna();


            
              }else{

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
                title: "No se admiten valores nulos",
                text:"Certificado vacunación, En blanco!"
              });

             }
               

            

                
                


            
              }else{

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
                title: "No se admiten valores nulos",
                text:"Campo marca en blanco. Si no aplica seccionar N/A"
              });

             }
                


            
              }else{

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
                title: "No se admiten valores nulos",
                text:"Campo dosis, En blanco!"
              });

             }
          

          

      }else{
               

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
          title: "No se admiten valores nulos",
          text:"Campo Fecha Ejecución, En blanco!"
        });



      }

  }else{

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
      title: "No se admiten valores nulos",
      text:"Campo Vacuna, En blanco!"
    });

  }

}else{

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
    title: "No se admiten valores nulos",
    text:"Campo Paciente, En blanco!"
  });

}

}



//insertar vacuna


function insert_vacuna(){

  var parametros = new FormData($("#formulario-envia")[0]);

  $.ajax({
    type:"POST",
    url:"../DATABASE/insert_vacuna.php",
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
            $('#reg_modal').modal('hide'); 
            cargarVacunas();
         
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







//actualizar datos


   









// Eliminar agendamiento

$(document).on('click','#btn_delete',function(event){

  
  var elementoupdate = $(this)[0].parentElement;
  var PK_vacuna = $(elementoupdate).attr("PK_vacuna");
  console.log(PK_vacuna);
  Swal.fire({
    title: "Deseas eliminar este registro ?",
    icon:'info',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonColor:'Blue',
    confirmButtonText: "Eliminar",
    denyButtonText: `Cancelar`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

              $.ajax({  
                url: '../DATABASE/eliminar_vacuna.php',
                type: 'POST',
                data:{PK_vacuna}, 
                success: function(response){
                  console.log(response);
                  var json = JSON.parse(response);
                  if(!json.err){
                
                    Swal.fire({
                      icon: 'success',
                      title: json.mensaje,
                      text:  'Correcto'
                      // ,footer: '<a href>Como solucionarlo?</a>'
                      })
                    
                      //cargar tabla

                      cargarVacunas();
                     

                      

                  }else{

                    Swal.fire({
                      icon: 'error',
                      title: json.mensaje,
                      text:  'Error'
                      // ,footer: '<a href>Como solucionarlo?</a>'
                      })

                  }
                }
              })


   
   
    } else if (result.isDenied) {
    
    
      Swal.fire("Acción  Cancelada", "", "info");
    }
  });



})














		
        
        

//examen  ejecutado


//mostar  
$(document).on('click','#btn_resultados',function(event){



  $('#reg_modal').modal('show'); 
  $('#modal_body').empty();
  $('#modal_footer').empty();
  $('#mod_title').empty();



var elementoupdate2 = $(this)[0].parentElement;
var ex=$(elementoupdate2).attr("examen");
var fc_ag=$(elementoupdate2).attr("fc_ag");
var nombre =$(elementoupdate2).attr("nom");
var apellido =$(elementoupdate2).attr("ap");
var certificado  =$(elementoupdate2).attr("cert");
var v_medica =$(elementoupdate2).attr("v_medica");
var dosis =$(elementoupdate2).attr("dosis");
var tp_examen =$(elementoupdate2).attr("tp_examen");

//asignacion de calores







 //cambio  los botones, para la actualizacion  de  los usuarios
 var modal_footer = ` 



<button type="button" class="btn btn-danger col-12" data-bs-dismiss="modal">Cerrar </button>



`;



var modal_body = ` 
<div class="row">


 <div class="form-group p-1 col-md-12 col-lg-12 col-sm-12 text-left">
         
        
         <a class="btn btn-dark mt-2 mr-2 mb-2 ml-2 p-2" download="CERTIFICADOS-VC-`+apellido+``+tp_examen+`" href="../CERTIFICADOS/VACUNAS/`+certificado+`" role="button">CERTIFICADO <i class="fas fa-file-pdf"></i></a>

     </div>
 

          <div class="form-group p-2 col-md-12 col-lg-6 col-sm-12">
             <label for="">Paciente  </label>
             <input type="Text" class="form-control" id="imp_persona"  value="`+nombre+` `+apellido+` " disabled>
          </div>

       

          <div class="form-group p-2 col-md-12 col-lg-6 col-sm-12">
             <label for="">Fecha de Agendamiento </label>
             <input type="date" class="form-control" id="imp_fecha" value ="`+fc_ag+`" placeholder="Ingresar información" disabled >
          </div>

  


            <div class="form-group p-2 col-md-12 col-lg-6 col-sm-12">
             <label for=im_t_examen">Vacuna </label>
             <input type="text" class="form-control" id="im_t_examen" value ="`+tp_examen+`" placeholder="Ingresar información" disabled >
          </div>

             <div class="form-group p-2 col-md-12 col-lg-6 col-sm-12">
             <label for=im_t_examen">Dosis </label>
             <input type="text" class="form-control" id="im_t_examen" value ="`+dosis+`" placeholder="Ingresar información" disabled >
          </div>
          
          


  










       
       
     </div>
`;

var modal_title = `Registro de Vacunación`;


  /// asignacion de valores


  

  $('#mod_title').append(modal_title);
  $('#modal_body').append(modal_body);
  $('#modal_footer').append(modal_footer);
 
  ///limpieza
 /// 
  
})


//mostar  
$(document).on('click','#btn_editar',function(event){



  $('#reg_modal').modal('show'); 
  $('#modal_body').empty();
  $('#modal_footer').empty();
  $('#mod_title').empty();



var elementoupdate2 = $(this)[0].parentElement;
var PK_vacuna=$(elementoupdate2).attr("PK_vacuna");
var nombre =$(elementoupdate2).attr("nom");
  var apellido =$(elementoupdate2).attr("ap");

//asignacion de calores


cargar_T_vacuna();
cargar_dosis();
cargar_paciente();

carar_marca_vc();


 //cambio  los botones, para la actualizacion  de  los usuarios
 var modal_footer = ` 



<button type="button" id="btn_update_vacuna" class="btn btn-primary col-12"><i class="fas fa-notes-medical"></i> Actualizar resultados </button>     
<button type="button" class="btn btn-danger col-12" data-bs-dismiss="modal"> Cerrar</button>



`;



var modal_body = ` 



<form name="formulario-envia" id="formulario-envia" enctype="multipart/form-data" method="POST"> 
  <div class="row">
 <input class="form-control" type="hidden" name="PK_vacuna" id="PK_vacuna" value="`+PK_vacuna+`">


                  
          
          <div class="form-group p-2 col-md-12 col-lg-6 col-sm-12">
               <label for="">Vacuna </label>
                <select class="form-select" name="cbx_t_vacuna" id="cbx_t_vacuna">
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                 
                  </select>
            </div>
        <div class="form-group p-2 col-md-12 col-lg-6 col-sm-12">
               <label for="">Fecha de ejecución</label>
               <input type="date" class="form-control" name="imp_fc_ag" id="imp_fc_ag"  placeholder="Ingresar información">
            </div>
            
              <div class="form-group p-2 col-md-12 col-lg-6 col-sm-12 ">
                
                <label for="">Dosis</label>
                     <select class="form-select" name="cbx_dosis" id="cbx_dosis">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                     
                        </select>          
              </div>

          
            
             <div class="form-group p-2 col-md-12 col-lg-6 col-sm-12 ">
                
                <label for="">Marca</label>
                     <select class="form-select" name="cbx_marca_vc" id="cbx_marca_vc">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                     
                        </select>          
              </div>

         <div class="form-group p-2 col-md-12 col-lg-12 col-sm-12">
             <label for="resul_exam" class="p-2"><b>Certificado </b></label>
             <input class="form-control" type="file" name="crt_vacuna" id="crt_vacuna">
          </div>

              
          


      
            
           
         </div>
          

           
</form>

`;

var modal_title = `Actualizar Registro de Vacunación | <b>`+nombre+` `+apellido+` </b>`;


  /// asignacion de valores


  

  $('#mod_title').append(modal_title);
  $('#modal_body').append(modal_body);
  $('#modal_footer').append(modal_footer);
 
  ///limpieza
 /// 
  
})



$(document).on('click','#btn_update_vacuna',function(event){
  update_vacuna();

});





function update_vacuna(){

  reg_vacuna = $('#PK_vacuna').val()  
  vacuna = $('#cbx_t_vacuna').val()  
  fc_ag = $('#imp_fc_ag').val()  
  crt =$('#crt_vacuna').val();
  dosis = $('#cbx_dosis').val();
  marca = $('#cbx_marca_vc').val();
 
 
 if(reg_vacuna.length !== 0){
 
 
   if(vacuna.length !== 0){
 
       if(fc_ag.length !== 0){
      
       
 
             if(dosis.length !== 0){
 
             
 
               if(marca.length !== 0){
 
                 
               if(crt.length !== 0){
 
             
 
                 
                updateVacuna();
 
 
             
               }else{
 
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
                 title: "No se admiten valores nulos",
                 text:"Certificado vacunación, En blanco!"
               });
 
              }
                
 
             
 
                 
                 
 
 
             
               }else{
 
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
                 title: "No se admiten valores nulos",
                 text:"Campo marca en blanco. Si no aplica seccionar N/A"
               });
 
              }
                 
 
 
             
               }else{
 
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
                 title: "No se admiten valores nulos",
                 text:"Campo dosis, En blanco!"
               });
 
              }
           
 
           
 
       }else{
                
 
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
           title: "No se admiten valores nulos",
           text:"Campo Fecha Ejecución, En blanco!"
         });
 
 
 
       }
 
   }else{
 
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
       title: "No se admiten valores nulos",
       text:"Campo Vacuna, En blanco!"
     });
 
   }
 
 }else{
 
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
     title: "No se admiten valores nulos",
     text:"El registro que desea actualizar no existe!"
   });
 
 }
 
 }


 function updateVacuna(){

  var parametros = new FormData($("#formulario-envia")[0]);

  $.ajax({
    type:"POST",
    url:"../DATABASE/update_vacuna.php",
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
            $('#reg_modal').modal('hide'); 
            cargarVacunas();
         
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