


$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {
   
   cargar_opciones(user_log)

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});




function cargar_opciones(user_log){


 
 

   
console.log(user_log);

   
   

$.ajax({
  url: '../DATABASE/home_permisos.php',
  type: 'POST',
  data:{user_log},
  success: function(response){
    var json = JSON.parse(response);
    console.log(response);
    // limpieza de seccion
   $('#datos_user').empty();

// limpieza de menu segun el  tipo de acceso
  $('#op_menu').empty();

    if(!json.err){
      var contador=1;
      $.each(json, function(i,item){
        if(i!="err"){
        
        //administrador
        
        if(item.FK_t_user == 1){
 
 
      





                                    
                                                var codigo =  ` 
                                                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"> <img src="../IMAGE/us.png" class="user-image rounded-circle shadow" alt="User Image"> <span class="d-none d-md-inline"> `+item.nom_user+ ` `+item.ap_user+`</span> </a>
                                                        <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-end"> <!--begin::User Image-->
                                                            <li class="user-header text-bg-dark" > <img src="../IMAGE/us.png" class="rounded-circle shadow" alt="User Image">
                                                                <p id="">
                                                                  
                                                                    <b>`+item.cargo_user+`
                                                                    <br><small>`+item.agencia_reg_user+`</small>
                                                                    <br><small>`+item.username_user+`</small>
                                                                </p>
                                                            </li> <!--end::User Image--> 
                                                            
                                                                    <!--begin::Menu Body-->
                                                                    <li class="user-footer"> <a href="#" class="  btn btn-default btn-flat">PERFIL</a> 
                                                                    <a href="#" id="btn_close" class="  btn btn-default btn-flat float-end">CERRAR SESION</a> </li> 
                                                                    <!--end::Menu Footer-->
                
                
                
                                                        </ul>
                                                `;
                                                
                                               


                                           // opciones administrativas
                                                menu=  `
                                                
                                                
                                          <li class="nav-item"> <a href="#" class="nav-link"> <i class="nav-icon fas fa-user-cog"></i>
                                                    <p>
                                                    Gestión Administrativa
                                                        <i class="nav-arrow bi bi-chevron-right"></i>
                                                    </p>
                                                </a>
                                                <ul class="nav nav-treeview">
                                                  
                                                
                                                    <li class="nav-item"> <a href="#" id="btn_usuarios" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                                            <p>Usuarios</p>
                                                        </a> </li>

                                                 
                                                  
                                                </ul>
                                            </li>



                                  <li class="nav-item"> <a href="#" class="nav-link"> <i class="fas fa-seedling"></i>
                                                    <p>
                                                  Gestion Ambiental 
                                                        <i class="nav-arrow bi bi-chevron-right"></i>
                                                    </p>
                                                </a>
                                                <ul class="nav nav-treeview">
                                                  
                                                
                                                    <li class="nav-item"> <a href="#" id="btn_pln" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                                            <p> PMA - PLANES</p>
                                                        </a> </li>
                                                            
                                                    <li class="nav-item"> <a href="#" id="btn_subplanes" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                                            <p>PMA - SUBPLANES</p>
                                                        </a> </li>

                                                        <li class="nav-item"> <a href="#" id="btn_aspectos" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                                         <p>ASPECTO AMBIENTAL</p>
                                                        </a> </li>

                                                      <li class="nav-item"> <a href="#" id="btn_medidas" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                                         <p>MEDIDAS DE CONTROL</p>
                                                        </a> </li>

                                                 
                                                  
                                                </ul>
                                    </li>





                                               <li class="nav-item"> <a href="#" id="btn_pma" class="nav-link"> <i class="fas fa-tasks"></i>
                                                        <p>PMA - KDE</p>
                                                    </a> </li>

                                              
                                               <li class="nav-item"> <a href="#" id="btn_docs" class="nav-link"> <i class="fas fa-archive"></i>
                                                        <p>PMA - DOCS </p>
                                                    </a> </li>

                                                


                                                
                                                `;

                          
                            
 
 // COLABORADOR
        }else if(item.FK_t_user == 2){
 
                                acciones_klussa_des =`
                                    

                            <a class="btn shadow col-12 p-2 dropdown-toggle d-flex align-items-center gap-2 ps-2"  href="#" id="adminDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i class="fa-solid fa-gear"></i> <span>CONFIGURACIÓN</span>
                                                            </a>

                                                            <ul class="dropdown-menu col-12 shadow" aria-labelledby="adminDropdown">

                                                            <li>
                                                                    <a class="dropdown-item" id="clas_des_btn">
                                                                        <i class="fa-solid fa-tasks"></i> CLASIFICACION
                                                                    </a>
                                                                </li>
                                                                
                                                            <li>
                                                                    <a class="dropdown-item" id="resnopel">
                                                                    <i class="fa-solid fa-clipboard-list"></i> DESECHOS
                                                                    </a>
                                                                </li>

                                                            

                                                                <li>
                                                                    <a class="dropdown-item" id="proyectos">
                                                                    <i class="fa-solid fa-map-signs"></i> PROYECTOS
                                                                    </a>
                                                                </li>

                                                                <li>
                                                                    <a class="dropdown-item" id="ubicaciones">
                                                                        <i class="fa-solid fa-location-dot"></i> UBICACIONES
                                                                    </a>
                                                                </li>

                                                                    <li>
                                                                    <a class="dropdown-item" id="gestores_r">
                                                                    <i class="fa-solid fa-building"></i> GESTORES

                                                                    </a>
                                                                </li>

                                                                    <li>
                                                                    <a class="dropdown-item" id="maquinas">
                                                                    <i class="fa-solid fa-hard-hat"></i> MAQUINAS
                                                                    </a>
                                                                </li>
                                                                
                                                                
                                                                    <li>
                                                                    <a class="dropdown-item" id="aditivos">
                                                                    <i class="fa-solid fa-bong"></i> ADITIVOS
                                                                    </a>
                                                                </li>
                                                                
                                                                
                                                            </ul>
                                                    
                                    
                        
                            
                            
                            
                                `;

         $('#klussa_ad_des').append(acciones_klussa_des);

 
 //PROVEEEDOR 
        }else if(item.FK_t_user == 7){
 
                                var codigo =  ` 
                                                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"> <img src="../IMAGE/us.png" class="user-image rounded-circle shadow" alt="User Image"> <span class="d-none d-md-inline"> `+item.nom_user+ ` `+item.ap_user+`</span> </a>
                                                        <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-end"> <!--begin::User Image-->
                                                            <li class="user-header text-bg-dark" > <img src="../IMAGE/us.png" class="rounded-circle shadow" alt="User Image">
                                                                <p id="">
                                                                  
                                                                    <b>`+item.cargo_user+`
                                                                    <br><small>`+item.agencia_reg_user+`</small>
                                                                    <br><small>`+item.username_user+`</small>
                                                                </p>
                                                            </li> <!--end::User Image--> 
                                                            
                                                                    <!--begin::Menu Body-->
                                                                    <li class="user-footer"> <a href="#" class="  btn btn-default btn-flat">PERFIL</a> 
                                                                    <a href="#" id="btn_close" class="  btn btn-default btn-flat float-end">CERRAR SESION</a> </li> 
                                                                    <!--end::Menu Footer-->
                
                
                
                                                        </ul>
                                                `;
                                                
                                               


                                           // opciones administrativas
                                                menu=  `
                                                
                                                
                                          <li class="nav-item"> <a href="#" class="nav-link"> <i class="nav-icon fas fa-user-cog"></i>
                                                    <p>
                                                    Gestión Administrativa
                                                        <i class="nav-arrow bi bi-chevron-right"></i>
                                                    </p>
                                                </a>
                                                <ul class="nav nav-treeview">
                                                  
                                                
                                                    <li class="nav-item"> <a href="#" id="btn_usuarios" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                                            <p>Usuarios</p>
                                                        </a> </li>

                                                 
                                                  
                                                </ul>
                                            </li>



                                  <li class="nav-item"> <a href="#" class="nav-link"> <i class="fas fa-seedling"></i>
                                                    <p>
                                                  Gestion Ambiental 
                                                        <i class="nav-arrow bi bi-chevron-right"></i>
                                                    </p>
                                                </a>
                                                <ul class="nav nav-treeview">
                                                  
                                                
                                                    <li class="nav-item"> <a href="#" id="btn_pln" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                                            <p> PMA - PLANES</p>
                                                        </a> </li>
                                                            
                                                    <li class="nav-item"> <a href="#" id="btn_subplanes" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                                            <p>PMA - SUBPLANES</p>
                                                        </a> </li>

                                                        <li class="nav-item"> <a href="#" id="btn_aspectos" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                                         <p>ASPECTO AMBIENTAL</p>
                                                        </a> </li>

                                                      <li class="nav-item"> <a href="#" id="btn_medidas" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                                         <p>MEDIDAS DE CONTROL</p>
                                                        </a> </li>

                                                 
                                                  
                                                </ul>
                                    </li>





                                               <li class="nav-item"> <a href="#" id="btn_pma" class="nav-link"> <i class="fas fa-tasks"></i>
                                                        <p>PMA - KDE</p>
                                                    </a> </li>

                                              
                                               <li class="nav-item"> <a href="#" id="btn_docs" class="nav-link"> <i class="fas fa-archive"></i>
                                                        <p>PMA - DOCS </p>
                                                    </a> </li>

                                                


                                                
                                                `;

                          
 //DEVELOP
        }else if(item.FK_t_user == 6){





                                                var codigo =  ` 
                                                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"> <img src="../IMAGE/us.png" class="user-image rounded-circle shadow" alt="User Image"> <span class="d-none d-md-inline"> `+item.nom_user+ ` `+item.ap_user+`</span> </a>
                                                        <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-end"> <!--begin::User Image-->
                                                            <li class="user-header text-bg-dark" > <img src="../IMAGE/us.png" class="rounded-circle shadow" alt="User Image">
                                                                <p id="">
                                                                  
                                                                    <b>`+item.cargo_user+`
                                                                    <br><small>`+item.agencia_reg_user+`</small>
                                                                    <br><small>`+item.username_user+`</small>
                                                                </p>
                                                            </li> <!--end::User Image--> 
                                                            
                                                                    <!--begin::Menu Body-->
                                                                    <li class="user-footer"> <a href="#" class="  btn btn-default btn-flat">PERFIL</a> 
                                                                    <a href="#" id="btn_close" class="  btn btn-default btn-flat float-end">CERRAR SESION</a> </li> 
                                                                    <!--end::Menu Footer-->
                
                
                
                                                        </ul>
                                                `;
                                                
                                               


                                           // opciones administrativas
                                                menu=  `
                                                
                                                
                                          <li class="nav-item"> <a href="#" class="nav-link"> <i class="nav-icon fas fa-user-cog"></i>
                                                    <p>
                                                    Gestión Administrativa
                                                        <i class="nav-arrow bi bi-chevron-right"></i>
                                                    </p>
                                                </a>
                                                <ul class="nav nav-treeview">
                                                  
                                                
                                                    <li class="nav-item"> <a href="#" id="btn_usuarios" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                                            <p>Usuarios</p>
                                                        </a> </li>

                                                 
                                                  
                                                </ul>
                                            </li>



                                  <li class="nav-item"> <a href="#" class="nav-link"> <i class="fas fa-seedling"></i>
                                                    <p>
                                                  Gestion Ambiental 
                                                        <i class="nav-arrow bi bi-chevron-right"></i>
                                                    </p>
                                                </a>
                                                <ul class="nav nav-treeview">
                                                  
                                                
                                                    <li class="nav-item"> <a href="#" id="btn_pln" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                                            <p> PMA - PLANES</p>
                                                        </a> </li>
                                                            
                                                    <li class="nav-item"> <a href="#" id="btn_subplanes" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                                            <p>PMA - SUBPLANES</p>
                                                        </a> </li>

                                                        <li class="nav-item"> <a href="#" id="btn_aspectos" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                                         <p>ASPECTO AMBIENTAL</p>
                                                        </a> </li>

                                                      <li class="nav-item"> <a href="#" id="btn_medidas" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                                         <p>MEDIDAS DE CONTROL</p>
                                                        </a> </li>

                                                 
                                                  
                                                </ul>
                                    </li>





                                               <li class="nav-item"> <a href="#" id="btn_pma" class="nav-link"> <i class="fas fa-tasks"></i>
                                                        <p>PMA - KDE</p>
                                                    </a> </li>

                                              
                                               <li class="nav-item"> <a href="#" id="btn_docs" class="nav-link"> <i class="fas fa-archive"></i>
                                                        <p>PMA - DOCS </p>
                                                    </a> </li>

                                                


                                                
                                                `;

                          







        }

 
             //datos de inicio  de sesion

               $('#datos_user').append(codigo);
               $('#op_menu').append(menu);  
               
                
                //// menu de opciones    
           
 
 
 
       
 
        }
      })
    }
    else{
 
         Swal.fire({
              icon: 'info',
              title: json.mensaje,
              text:  'Sistema en fase de pruebas'
              ,footer: '<a href>Ver manual</a>'
 
              })
        }
  }
 })


          
        
        
        
        
        }



  



// funcionalidades aside - administrador/ PMA








$(document).on('click','#btn_pma',function(event){


    location.href="../CONTROLLERS/PLANES_AMBIENTALES.php";

});



$(document).on('click','#btn_pln',function(event){


    location.href="../CONTROLLERS/PLANES.php";

});



$(document).on('click','#btn_docs',function(event){


    location.href="../CONTROLLERS/PMA-DOCS.php";

});


$(document).on('click','#btn_usuarios',function(event){


    location.href="../CONTROLLERS/PMA-USERS.php";

});


$(document).on('click','#btn_subplanes',function(event){


    location.href="../CONTROLLERS/PMA-SUBPLANES.php";

});




///apecto 



$(document).on('click','#btn_aspectos',function(event){


    location.href="../CONTROLLERS/PMA-ASPECTO.php";

});

// medidas


$(document).on('click','#btn_medidas',function(event){


    location.href="../CONTROLLERS/PMA-MEDIDAS.php";

});



// dashboard



$(document).on('click','#btn_dashboard',function(event){


    location.href="../CONTROLLERS/DASHBOARD_PMA.php";

});



/// ACCIONES MODULO DISPOSICIONAMIENTO RESIDUOS PELIGROSOS /  NO PELIGROSOS

$(document).on('click','#home_page',function(event){


    location.href="../CONTROLLERS/HOME.php";

});


// residuos peligrosos

$(document).on('click','#residuos_peligrosos',function(event){


    location.href="../CONTROLLERS/RESIDUOS-PELIGROSOS.php";

});

// RESIDUOS NO PELIGROSOS

$(document).on('click','#residuos_no_peligrosos',function(event){


    location.href="../CONTROLLERS/RESIDUOS-NO-PELIGROSOS.php";

});//CERRAR 


$(document).on('click','#btn_close',function(event){


    location.href="../CONTROLLERS/CLOSE.php";

});

// RESIDUOS NO PELIGROSOS - GESTION 

$(document).on('click','#resnopel',function(event){


    location.href="../CONTROLLERS/GESTION_DESECHOS.php";

});
//
// CLASIFICACION DE RESIDUOS - GESTION
$(document).on('click','#clas_des_btn',function(event){

    location.href="../CONTROLLERS/CLASIFICACION-RESIDUOS.php";

});

// CONSUMO DE AGUA  - SEDES
$(document).on('click','#c_agua_btn',function(event){

    location.href="../CONTROLLERS/CONSUMO-AGUA-SEDES.php";

});


// CONSUMO DE COMBUSTIBLE  - SEDES
$(document).on('click','#c_combustible_btn',function(event){

    location.href="../CONTROLLERS/CONSUMO-COMBUSTIBLE.php";

});

// CONSUMO DE AGUA - POSOS
$(document).on('click','#c_agua_pozo_btn',function(event){

    location.href="../CONTROLLERS/CONSUMO-AGUA-POZOS.php";

});

/// PROYECTOS - GESTION AMBIENTAL
$(document).on('click','#proyectos',function(event){
    location.href="../CONTROLLERS/PROYECTOS.php";
});


/// PROYECTOS - GESTION MAQUINAS
$(document).on('click','#maquinas',function(event){
    location.href="../CONTROLLERS/MAQUINAS.php";
});

// CONSUMO ENERGIA SEDES // CONSUMO-ENERGIA
$(document).on('click','#c_en_sedes_btn',function(event){
    location.href="../CONTROLLERS/CONSUMO-ENERGIA.php";
});

// CONSUMO ENERGIA SEDES // CONSUMO-ENERGIA
$(document).on('click','#btn_c_ad',function(event){
    location.href="../CONTROLLERS/CONSUMO-ADITIVOS.php";
});

// CONSUMO ENERGIA SEDES // CONSUMO-ENERGIA
$(document).on('click','#gestores_r',function(event){
   
    location.href="../CONTROLLERS/GESTORES.php";
});


$(document).on('click','#ubicaciones',function(event){
   
    location.href="../CONTROLLERS/UBICACIONES.php";
});


$(document).on('click','#btn_home',function(event){
   
    location.href="../CONTROLLERS/HOME.php";
});

/// RECURSOS DE SERVISE 

$(document).on('click','#aditivos',function(event){
   
    location.href="../CONTROLLERS/ADITIVOS.php";
});



