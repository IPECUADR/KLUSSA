


$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {
   
   cargar_planes(user_log)

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});



/// cargo la documentacion  asignada


function cargar_planes(user_log){

  
   
  $.ajax({
    url: '../DATABASE/cargar_plan.php',
    type: 'POST',
    data:{user_log},
    success: function(response){
      console.log(response);
      $('#seec_pro').empty();
      var json = JSON.parse(response);
      if(!json.err){
     
        $.each(json, function(i,item){
          


   
          
         
        if(i!="err"){

        
          
          
         
      


          var codigo =`
          
                             <div id="" class="col-lg-4 col-sm-6 col-md-6"  >
                                        <div class="info-box mb-3" >
                                          <span class="info-box-icon bg-success text-white elevation-1"><i class="fas fa-laptop-house"></i></span>

                                          <div class="info-box-content" >
                                            
                                             <span  class="info-box-text">`+item.plan_nom+`</span>
                                             <span class="info-box-number"> `+item.agencia_mom+`</s pan>
                                                
                                             <div pk="`+item.PK_plan+`" >
                                            <button class="btn btn-dark col-12 mt-2 mb-2" id="proyecto">CARGAR PLAN  <i class="fas fa-file-alt"></i></button>

                                             </div> 



                                            
                                            </div>

                                           
                                          <!-- /.info-box-content -->
                                        </div>
                                        <!-- /.info-box -->
                                    

                                      

                                  </div>

 
          
          `;


         





         
         
         
         

          

         
     
          
      
        
       }



          //asignacion de informacion

         $('#seec_pro').append(codigo);
        



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



/// cargar los documentos

///  cargar la documentacion asignada

$(document).on('click','#proyecto',function(event){


    var elemento_plan = $(this)[0].parentElement;
    plan_doc = $(elemento_plan).attr("pk");



    console.log(plan_doc);
    cargar_documento(plan_doc);

  //var PK_vacuna = $(elementoupdate).attr("PK_vacuna")

})



function cargar_documento (plan_doc){

//limpio la seccion
$('#doc_pma').empty();


  // busco el  documento asignado  a nivel de BDD
  $.ajax({
    url: '../DATABASE/cargar_docs.php',
    type: 'POST',
    data:{plan_doc},
    success: function(response){
      console.log(response);
      var json = JSON.parse(response);
      if(!json.err){
     
        $.each(json, function(i,item){
          


   
          
         
        if(i!="err"){

          var codigo =`
          
            <embed src="http://200.105.244.50/ARCHIVO/DOC/PLANES/`+item.doc_pln_mc_lg+`" type="application/pdf" width="100%" height="600px" />

 
          
          `;
 
        
       }



          //asignacion de informacion

      $('#doc_pma').append(codigo);
        



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