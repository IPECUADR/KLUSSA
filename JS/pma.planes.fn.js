


$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {
   
   cargar_planes(user_log)
   



  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});






$(document).on('click','#proyecto',function(event){


    var elementoupdate = $(this)[0].parentElement;
     pla_Amb = $(elementoupdate).attr("pk");
     console.log(pla_Amb);
    cargar_actividades(pla_Amb);

  //var PK_vacuna = $(elementoupdate).attr("PK_vacuna");
     contenido_tab();


     $('#calendar').empty();

  

})




 function contenido_tab(){

      $('#tb_Activites').empty();

      var conent =`
      
          <div class="input-group mb-3 p-2 shadow mt-2 mb-2">
                                 <input type="text" class="form-control " placeholder="Buscar" id="searchTerm" onkeyup="doSearch()" />
                                <div class="input-group-text"> <span class="fas fa-search"></span></div>
                               </div>



                               <div class="shadow rounded">
                                <table class="  table-bordered table rounded p-2  " id="datatable">
                                        <thead>
                                            <tr class="">
                                                <th>N°</th>
                                                <th>SUBPLAN</th>
                                                <th>ASPECTO AMBIENTAL</th>
                                                <th>MEDIDA</th>
                                                <th>MEDIO DE VERIFICACION </th>
                                                <th>FRECUENCIA</th>
                                                <th>OPCIONES</th>
                                            </tr>
                                        </thead>
                                        <tbody  id="content_table">
                                          
                                        </tbody>
                                    </table>
                                  
                                    </div>

      
      `;



      $('#tb_Activites').append(conent);






 }







function cargar_planes(user_log){

   



   

      $('#seec_pro').empty();
      $('#mostar_btn').empty();



   
  $.ajax({
    url: '../DATABASE/cargar_plan.php',
    type: 'POST',
    data:{user_log},
    success: function(response){
      console.log(response);


      var json = JSON.parse(response);
      if(!json.err){
     
        $.each(json, function(i,item){
          


   
          
         
        if(i!="err"){

        
          
          
         
      


          var codigo =`
          
                             <div id="" class="col-lg-6 col-sm-12 col-md-6"  >
                                        <div class="info-box mb-3" >
                                          <span class="info-box-icon bg-success text-info text-white elevation-1"><i class="fas fa-clipboard-list"></i></span>

                                          <div class="info-box-content" >
                                            
                                             <span  class="info-box-text">`+item.plan_nom+`</span>
                                             <span class="info-box-number"> `+item.agencia_mom+`</s pan>
                                                
                                             <div pk="`+item.PK_plan+`" >
                                            <button class="btn btn-success col-12 mt-2 mb-2" id="proyecto">CARGAR PLAN</button>

                                             </div> 



                                            
                                            </div>

                                           
                                          <!-- /.info-box-content -->
                                        </div>
                                        <!-- /.info-box -->
                                    

                                      

                                  </div>

 
          
          `;


         

      btn_calermdario =`
      
      
      <div class="col-lg-6 col-sm-12 col-md-6 " pk="`+item.PK_plan+`" >
            
    

             <button class="btn btn-outline-light px-4 py-2 mt-2 mb-2  rounded shadow-sm col-12" id="ver_calendario"> CALENDARIO |  `+item.plan_nom+` <i class="fa-solid fa-calendar-days"></i></button>

       
      
      </div>
      
      `;



         
         
         
         

          

                   //asignacion de informacion

         $('#seec_pro').append(codigo);
        

         $('#mostar_btn').append(btn_calermdario);

     
          
      
        
       }





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



function cargar_actividades(pla_Amb){

   
  $.ajax({
    url: '../DATABASE/cargar_actividades.php',
    type: 'POST',
    data:{pla_Amb},
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
          <td >`+item.sub_plan+`</td>
          <td >`+item.aspecto_amb+`</td>
          <td >`+item.medida+`</td>         
          <td >`+item.verificacion+`</td>
          <td >`+item.frecuencia_fc+`</td>
          
         
           <td PK_act="`+item.PK_act+`" asp ="`+item.aspecto_amb+`"  md ="`+item.medida+`"  >
           <button type="button" id="btn_act_pma" class="btn btn-success btn-sm mt-1 mb-1"><i class="fas fa-tasks"></i></button>
           <button type="button" id="btn_print_act" class="btn btn-dark  btn-sm mt-1 mb-1"><i class="fas fa-archive"></i></button>

              
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



$(document).on('click','#btn_act_pma',function(event){

// aqui limpio los campos del modal  para cargar los que corresponden a la verificaicon  de actividades
$('#modal_pma').modal('show');
$('#mod_title').empty();
$('#modal_body').empty();
$('#medida').empty();


$('#modal_footer').empty();


    var elementoupdate = $(this)[0].parentElement;



    asp = $(elementoupdate).attr("asp");
    med = $(elementoupdate).attr("md");
    id_ac = $(elementoupdate).attr("PK_act");


  //cargar tabla


  
   cargar_programaciones(id_ac);


//////////////////////////////////////////////////////////////////////
// LA IDEA ES GENEERAR UN  MODAL  CAMBIANTE PARA REDUCIR CODIGO//

//EN POCAS CON UN SOLO MODAL PUEDES JUGAR Y  CARGAR LA INFROMACION QUE NECESITES

titulo = asp;


body = ` 

        <!--begin::App Main-->
        <main class="app-main"> <!--begin::App Content Header-->
            <div class="app-content-header"> <!--begin::Container-->
                <div class="container-fluid"> <!--begin::Row-->
                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-justify"  id="medida"></h6>
                        </div>
                     




                    </div> <!--end::Row-->
                </div> <!--end::Container-->
            </div> <!--end::App Content Header--> <!--begin::App Content-->
            <div class="app-content"> <!--begin::Container-->
                <div class="container-fluid"> <!--begin::Row-->
                    <div class="row">
                        <div class="col-12"> <!-- Default box -->
                            <div class="card">
                               
                                <div class="card-body">
                                  
                                <input type="hidden" class="form-control" name="id_ac" id="id_ac" value="`+id_ac+`">
                                <button class="btn btn-primary  mt-2 mb-2" id="btn_rg_prog"><i class="fas fa-user-plus"></i> Nuevo Registro</button>
                                
                                      
                                <div class="input-group mb-3 p-1 shadow mt-2 mb-2">
                                 <input type="text" class="form-control " placeholder="Buscar" id="buscador" onkeyup="buscador()" />
                                <div class="input-group-text"> <span class="fas fa-search"></span></div>
                               </div>


                               <div class="shadow rounded">
                                <table class="  table-bordered table rounded p-2  " id="datatable2">
                                        <thead>
                                            <tr class="">
                                                <th>N°</th>
                                                <th>RESPONSABLE</th>
                                                <th>PROGRAMACION</th>
                                                <th>ESTADO</th>
                                                <th>DESCRIPCION</th>
                                                <th>ACTUALIZACION</th>

                                                <th>OPCIONES</th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody  id="programacion_reg">
                                          
                                        </tbody>
                                    </table>
                                  
                                    </div>
                                      
                              <div class="col-12" id="res_busqueda_2">

                              </div>
                                    <!-- Modal -->
                                    <div class="modal modal-lg fade" id="modal_pma" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5"  id="mod_title" >
                                                
                                            Modal title
                                        
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body" id="modal_body">


                                            
                                        
                                        
                                        
                                        
                                        
                                        </div>
                                        <div class="modal-footer " id="modal_footer">


                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Save changes</button>
                                        
                                        
                                        
                                        </div>
                                        </div>
                                    </div>
                                    </div>



                                    
                                </div> <!-- /.card-body -->
                                <div class="card-footer">

                                <ul class="pagination pagination-sm m-0 float-end">
                                        <li class="page-item"> <a class="page-link" href="#">&laquo;</a> </li>
                                        <li class="page-item"> <a class="page-link" href="#">1</a> </li>
                                        <li class="page-item"> <a class="page-link" href="#">2</a> </li>
                                        <li class="page-item"> <a class="page-link" href="#">3</a> </li>
                                        <li class="page-item"> <a class="page-link" href="#">&raquo;</a> </li>
                                    </ul>


                                </div> <!-- /.card-footer-->
                            </div> <!-- /.card -->
                        </div>
                    </div> <!--end::Row-->
                </div> <!--end::Container-->
            </div> <!--end::App Content-->
        </main> <!--end::App Main--> <!--begin::Footer-->
      

`;


actividad= med;


footer = ` 





`;



// asigno los las variables  a los objetos


$('#mod_title').append(titulo);

$('#modal_body').append(body);

$('#medida').append(actividad);


$('#modal_footer').append(footer);





});


////////////////////////////////////////////////////////





function cargar_programaciones(id_ac){


  $.ajax({
    url: '../DATABASE/cargar_programacion.php',
    type: 'POST',
    data:{id_ac},
    success: function(response){
      console.log(response);
      $('#programacion_reg').empty();
      var json = JSON.parse(response);
      if(!json.err){
          var contador=1;
        $.each(json, function(i,item){
          


   
          
         
        if(i!="err"){

        
          
          
         if(item.FK_est_act == 1){


        var codigo =`
              
                          
              <tr>

              <td >`+contador+`</td>
              <td >`+item.rp_ac_ec+`</td>
              <td >`+item.fc_pr_ac+`</td>
              <td >`+item.des_estado_act+`</td>         
              <td >`+item.evidencia_des+`</td>
              <td >`+item.fc_up_rp_ac+`</td>
            
              <td est ="`+item.des_estado_act+`"  pg_id ="`+item.PK_prg+`" des ="`+item.evidencia_des+`"  arc ="`+item.evidencia_arc+`"  rp  ="`+item.rp_ac_ec+`" fc  ="`+item.fc_pr_ac+`">
              <button type="button" id="btn_editar" class="btn btn-success  btn-sm mt-1 mb-1"><i class="fas fa-check-circle"></i></button>
             
              <button type="button" id="btn_delete" class="btn btn-danger btn-sm mb-1 mt-1"><i class="fas fa-trash-alt"></i></button>          

                  
                  </td>
              </tr>
              

    
              
              `;



         }else if(item.FK_est_act == 2){



            var codigo =`
              
                          
              <tr>

              <td >`+contador+`</td>
              <td >`+item.rp_ac_ec+`</td>
              <td >`+item.fc_pr_ac+`</td>
              <td >`+item.des_estado_act+`</td>         
              <td >`+item.evidencia_des+`</td>
              <td >`+item.fc_up_rp_ac+`</td>
            
              <td   arc="`+item.evidencia_arc+`"   est="`+item.des_estado_act+`"  pg_id ="`+item.PK_prg+`" des ="`+item.evidencia_des+`"  arc ="`+item.evidencia_arc+`"  rp  ="`+item.rp_ac_ec+`" fc  ="`+item.fc_pr_ac+`">
              <button type="button" id="btn_editar" class="btn btn-warning  btn-sm mt-1 mb-1"><i class="fas fa-edit"></i></button>
              <button type="button" id="btn_ver_pdf" class="btn btn-danger btn-sm mb-1 mt-1"><i class="fas fa-file-pdf"></i></button>          
              <button type="button" id="btn_delete_ev" class="btn btn-danger btn-sm mb-1 mt-1"><i class="fa-solid fa-trash-can"></i></button>          

                  
                  </td>
              </tr>
              

    
              
              `;



         }else if(item.FK_est_act == 3){



            var codigo =`
              
                          
              <tr>

              <td >`+contador+`</td>
              <td >`+item.rp_ac_ec+`</td>
              <td >`+item.fc_pr_ac+`</td>
              <td >`+item.des_estado_act+`</td>         
              <td >`+item.evidencia_des+`</td>
              <td >`+item.fc_up_rp_ac+`</td>
            
              <td est ="`+item.des_estado_act+`"  pg_id ="`+item.PK_prg+`" des ="`+item.evidencia_des+`"  arc ="`+item.evidencia_arc+`"  rp  ="`+item.rp_ac_ec+`" fc  ="`+item.fc_pr_ac+`">
                    
                 <button type="button" id="btn_editar" class="btn btn-dark  btn-sm mt-1 mb-1"><i class="fas fa-check-circle"></i></button>

                  
                  </td>
              </tr>
              

    
              
              `;



         }
      


          

         





         
         
         
         

          

         
     
          
      
        
       }



          //asignacion de informacion

         $('#programacion_reg').append(codigo);
        
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


/// ver pedf 


$(document).on('click', '#btn_ver_pdf', function(event) {
  var document_bdd = $(this)[0].parentElement;
  var pdf = $(document_bdd).attr("arc");

  if (pdf && pdf.length !== 0) {
    window.open('http://200.105.244.50/ARCHIVO/DOC/ACTIVIDADES/' + pdf, '_blank');
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'No existe dato para mostrar el PDF.',
      confirmButtonText: 'Entendido'
    });
  }
});


$(document).on('click','#btn_rg_prog',function(event){

 id = $('#id_ac').val();
 user_up_aut = $('#usuario_sistema').val();

 

$('#form_modal').modal('show');
///limpio el modal del formulario

$('#form_title').empty();
$('#form_body').empty();
$('#form_footer').empty();

user_up_aut = $('#usuario_sistema').val();

///asigno los valores a variables

t_form =` REGISTAR PROGRAMACION ` ;

b_form =`

<form name="formulario-envia" id="formulario-envia" enctype="multipart/form-data" method="POST">

 <input type="hidden" class="form-control" name="user_up" id="user_up" value="`+user_up_aut+`">
 <input type="hidden" class="form-control" name="id_ac" id="id_ac" value="`+id+`">

    <div class="form-group">
            <label for="fc_prog-name" class="col-form-label">Fecha Programacion:</label>
            <input type="date" class="form-control" name="fc_prog" id="fc_prog"  >
          </div>

    <div class="form-group">
            <label for="rp_asig-name" class="col-form-label">Responsable:</label>
            <input type="text" class="form-control"  name="rp_asig" id="rp_asig">
     </div>

     <div class="form-group">
            <label for="rp_asig-name" class="col-form-label">Descripcion:</label>
            <input type="text" class="form-control"  name="des_prog" id="des_prog">
     </div>

</form>



` ;



f_form =`

<button type="button"  id="btn_pro"  class="btn btn-primary col-12" > PROGRAMAR ACTIVIDAD</button>


` ;






///asigno las variables a los objetos


$('#form_title').append(t_form);
$('#form_body').append(b_form);
$('#form_footer').append(f_form);


})

$(document).on('click','#btn_pro',function(event){

validar();

});


function validar(){

  let fc_pog = $("#fc_prog").val().trim();
  let responsable = $("#rp_asig").val().trim();
  let des_prog = $("#des_prog").val().trim();



  
if (fc_pog === "") {
  showToastError("Debe registar una fecha.");
  return;
}

if (responsable === "") {
  showToastError("Debe registar un responsable.");
  return;
}

if (des_prog === "") {
  showToastError("Debe registar un responsable.");
  return;
}


inser_reg();



}


/// fUNCION PARA CAMBIAR A CTIVIDADES DEL PMA - NIVELES DE CONTROL


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


///// accciones bdd



function inser_reg (){

  var parametros = new FormData($("#formulario-envia")[0]);

  

  $.ajax({
    type:"POST",
    url:"../DATABASE/insert_programacion.php",
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
          
            cargar_programaciones(id_ac);
           $('#form_modal').modal('hide');
         
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



/// eliminacion de registros//
$(document).on('click','#btn_delete',function(event){

// MOSTRAMOS LOS RECURSOS PARA CARGAR DATOS

 var delete_info = $(this)[0].parentElement;
 id = $(delete_info).attr("pg_id");



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
            $.post('../DATABASE/del_programacion.php', { 
              
              
              PK_user: id  


            })
                .done(function(response) {
                   
                        const res = JSON.parse(response);
                        Swal.fire({
                            icon: res.status,
                            title: res.mensaje
                        });

                        if (res.status === 'success') {
                            cargar_programaciones(id_ac);
                        }
               
                })
                
        }
    });
});





$(document).on('click','#btn_editar',function(event){

 user_up_aut = $('#usuario_sistema').val();
  ///obtenemos datos de las tablas
 var elementoupdate = $(this)[0].parentElement;
    id = $(elementoupdate).attr("pg_id");
    fc = $(elementoupdate).attr("fc");
    rp= $(elementoupdate).attr("rp");
    est= $(elementoupdate).attr("est");
   des= $(elementoupdate).attr("des");
  arc= $(elementoupdate).attr("arc");

  //mostramos el   modal y limpiamos las secciones 
$('#form_modal').modal('show');
///limpio el modal del formulario

$('#form_title').empty();
$('#form_body').empty();
$('#form_footer').empty();

 /// asignacion de valores de la tabla a objetos

title_modal_up = 'Editar Registro';


form_modal_up = `

      <div class="modal-body">
        <p><strong>Nombre:</strong> <span id="modalNombre">`+rp+`</span></p>
        <p><strong>Fecha:</strong> <span id="modalFecha">`+fc+`</span></p>
        <p><strong>Estado:</strong> <span id="modalEstado" class="badge bg-success">`+est+`</span></p>
      </div>


<form name="formulario-envia" id="formulario-envia" enctype="multipart/form-data" method="POST">


<input type="hidden" class="form-control" name="user_up" id="user_up" value="`+user_up_aut+`">

<input type="hidden" class="form-control" name="id_prog" id="id_prog" value="`+id+`">





  <div class="form-group">
            <label for="des_plan" class="col-form-label"><b>Descripción:</b></label>
            <textarea class="form-control" name="des_ac" id="des_ac">`+des+`</textarea>
   </div>

   


       <div class="form-group">
            <label for="doc_plan" class="col-form-label"><b>Evidencia:</b></label>
            <input type="file" class="form-control" name="dc_ev" id="dc_ev">
     </div>

</form>

`;



op_form_modal_up =` 



<button id="up_programacion" type="button" class="btn btn-dark col-12">Actualizar Registro</button>


`;


// asignacion objetos a secciones del  modal


     
$('#form_title').append(title_modal_up);
$('#form_body').append(form_modal_up);
$('#form_footer').append(op_form_modal_up);


});


$(document).on('click','#up_programacion',function(event){
validar_actualizacion();
});



function validar_actualizacion() {
  let des_ac = $("#des_ac").val().trim();      // ✅ texto
  let archivo = $("#dc_ev")[0].files[0];     // ✅ archivo

  // Validar descripción
  if (des_ac === "") {
    showToastError("Debe registrar una descripción.");
    return;
  }

  // Validar que haya archivo
  if (!archivo) {
    showToastError("Debe guardar una evidencia.");
    return;
  }

  // Validar extensión PDF
  let extension = archivo.name.split('.').pop().toLowerCase();
  if (extension !== "pdf") {
    showToastError("La evidencia debe ser un archivo PDF.");
    return;
  }

  // Validar tamaño máximo 5MB (opcional)
  if (archivo.size > 50 * 1024 * 1024) {
    showToastError("El archivo no debe superar los 5 MB.");
    return;
  }

update_programacion();


}



function update_programacion(){

  var parametros = new FormData($("#formulario-envia")[0]);

  $.ajax({
    type:"POST",
    url:"../DATABASE/up_programacion.php",
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
          
          cargar_programaciones(id_ac);
             $('#form_modal').modal('hide');
         
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


/// funciones administrativas  de modulo



$(document).on('click','#ver_calendario',function(event){

      var elemto_calendario = $(this)[0].parentElement;
      pma_calendario = $(elemto_calendario).attr("pk");
      cargarCalendario(pma_calendario);
         $('#tb_Activites').empty();
   
});

/// todo gprt
function cargarCalendario(pma_calendario) {
  $('#calendar').empty();
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',

    // 🔹 Aquí pasamos la variable al backend
    events: {
      url: '../DATABASE/cargar_prog_calendar.php',
      method: 'POST',
      extraParams: {
      oficina: pma_calendario   // 👈 En PHP lo recibes como $_POST['oficina']
      }
    },

    eventClick: function(info) {
      let id          = info.event.id;
      let titulo      = info.event.title;
      let estado      = info.event.extendedProps.estado || "No definido";
      let nombre      = info.event.extendedProps.nombre || "No definido";
      let fecha      = info.event.extendedProps.fecha || "No definido";
      let des      = info.event.extendedProps.des || "No definido";
      let subtitulo   = info.event.extendedProps.subtitulo || "Sin subtítulo";
      let descripcion = info.event.extendedProps.descripcion || "Sin descripción";
      let doc = info.event.extendedProps.doc || "Sin archivo";

          if(estado == 'PENDIENTE'){
           
              console.log(id);

        Swal.fire({
          title: `<strong>${nombre}</strong>`,
          html: `
            <div style="
              font-size: 13px; 
              text-align: justify; 
              line-height: 1.4; 
              padding: 10px; 
              border-left: 4px solid #031e3eff; 
              background: #f8f9faff; 
              border-radius: 5px;">
              
              <p style="margin: 5px 0;">
                <span style="color:#28a745; font-weight:bold;">Estado:</span> ${estado}
              </p>
              
              <p style="margin: 5px 0;">
                <span><b>Subtítulo:</b></span> ${subtitulo}
              </p>
              
              <p style="margin: 5px 0;">
                <span><b>Descripción:</b></span> ${descripcion}
              </p>
            </div>
          `,
          icon: 'info',
          showCancelButton: true, // ✅ si quieres también cancelar
          cancelButtonText: 'Cancelar <i class="fa-solid fa-xmark"></i> ',
          cancelButtonColor: '#c92924e1',
          confirmButtonText: 'Ejecutar <i class="fa-solid fa-circle-check"></i>',
          confirmButtonColor: '#031e3eff'
        }).then((result) => {
          if (result.isConfirmed) {
           
            edit_calendar(id,estado,nombre,fecha,des);


         
          } else if (result.dismiss === Swal.DismissReason.cancel) {
        
            console.log('❌ Cancelado');
          }
        });



          }else if(estado == 'EJECUTADO'){

            Swal.fire({
              title: `<strong>${nombre}</strong>`,
          html: `
            <div style="
              font-size: 13px; 
              text-align: justify; 
              line-height: 1.4; 
              padding: 10px; 
              border-left: 4px solid #031e3eff; 
              background: #f8f9faff; 
              border-radius: 5px;">
              
              <p style="margin: 5px 0;">
                <span style="color:#28a745; font-weight:bold;">Estado:</span> ${estado}
              </p>
              
              <p style="margin: 5px 0;">
                <span><b>Subtítulo:</b></span> ${subtitulo}
              </p>
              
              <p style="margin: 5px 0;">
                <span><b>Descripción:</b></span> ${descripcion}
              </p>
              
                <div arc="`+doc+`" >

                  <button class="btn btn-danger btn-sm  mt-2 mb-2" id="btn_ver_pdf"><i class="fa-regular fa-file-pdf"></i> EVIDENCIA</button>

               </div> 
              
            </div>
                  `,
                  icon: 'success',
                  confirmButtonText: 'Editar Registro <i class="fa-solid fa-pen-to-square"></i>',
                  confirmButtonColor: '#28a745', 
                }).then((result) => {
          if (result.isConfirmed) {
           
            edit_calendar(id,estado,nombre,fecha,des);


         
          } else if (result.dismiss === Swal.DismissReason.cancel) {
        
            console.log('❌ Cancelado');
          }
        });
                
                
                
                


          }else if(estado == 'REPROGRAMADO'){



          }


          }


  });

  calendar.render();

  return calendar;
}




function edit_calendar(id,estado,nombre,fecha,des){


$('#form_modal').modal('show');
///limpio el modal del formulario

user_up_aut = $('#usuario_sistema').val();

$('#form_title').empty();
$('#form_body').empty();
$('#form_footer').empty();

 /// asignacion de valores de la tabla a objetos

title_modal_up = 'Editar Registro';


form_modal_up = `

      <div class="modal-body">
        <p><strong>Nombre:</strong> <span id="modalNombre">`+nombre+`</span></p>
        <p><strong>Fecha:</strong> <span id="modalFecha">`+fecha+`</span></p>
        <p><strong>Estado:</strong> <span id="modalEstado" class="badge bg-success">`+estado+`</span></p>
      </div>


<form name="formulario-envia" id="formulario-envia" enctype="multipart/form-data" method="POST">


<input type="hidden" class="form-control" name="user_up" id="user_up" value="`+user_up_aut+`">

<input type="hidden" class="form-control" name="id_prog" id="id_prog" value="`+id+`">





  <div class="form-group">
            <label for="des_plan" class="col-form-label"><b>Descripción:</b></label>
            <textarea class="form-control" name="des_ac" id="des_ac">`+des+`</textarea>
   </div>

   


       <div class="form-group">
            <label for="doc_plan" class="col-form-label"><b>Evidencia:</b></label>
            <input type="file" class="form-control" name="dc_ev" id="dc_ev">
     </div>

</form>

`;



op_form_modal_up =` 



<button id="up_programacion_calendar" type="button" class="btn btn-dark col-12">Actualizar Registro</button>


`;


// asignacion objetos a secciones del  modal


     
$('#form_title').append(title_modal_up);
$('#form_body').append(form_modal_up);
$('#form_footer').append(op_form_modal_up);


  
}








$(document).on('click','#up_programacion_calendar',function(event){
validar_actualizacion_2();
});


function validar_actualizacion_2() {
  let des_ac = $("#des_ac").val().trim();      // ✅ texto
  let archivo = $("#dc_ev")[0].files[0];     // ✅ archivo

  // Validar descripción
  if (des_ac === "") {
    showToastError("Debe registrar una descripción.");
    return;
  }

  // Validar que haya archivo
  if (!archivo) {
    showToastError("Debe guardar una evidencia.");
    return;
  }

  // Validar extensión PDF
  let extension = archivo.name.split('.').pop().toLowerCase();
  if (extension !== "pdf") {
    showToastError("La evidencia debe ser un archivo PDF.");
    return;
  }

  // Validar tamaño máximo 5MB (opcional)
  if (archivo.size > 50 * 1024 * 1024) {
    showToastError("El archivo no debe superar los 5 MB.");
    return;
  }


update_programacion_calendar();

}



function update_programacion_calendar(){

  var parametros = new FormData($("#formulario-envia")[0]);

  $.ajax({
    type:"POST",
    url:"../DATABASE/up_programacion.php",
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
          
             cargarCalendario(pma_calendario);
             $('#form_modal').modal('hide');
         
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





/// eliminacion de registros//
$(document).on('click','#btn_delete_ev',function(event){

// MOSTRAMOS LOS RECURSOS PARA CARGAR DATOS

 var delete_info = $(this)[0].parentElement;
 id = $(delete_info).attr("pg_id");

  
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
            $.post('../DATABASE/del_prog_ev.php', { 
              
              
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
                            cargar_programaciones(id_ac)
                        }
               
                })
                
        }
    });
});