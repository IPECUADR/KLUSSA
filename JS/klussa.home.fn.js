
$(document).ready(function () {


    const user_log = $('#usuario_sistema').val();

    if (user_log && user_log.length !== 0) {

        cargar_menu(user_log)

    } else {
        console.warn('No se encontró el usuario del sistema.');
    }


});




function cargar_menu(user_log) {









    $.ajax({
        url: '../DATABASE/home_permisos.php',
        type: 'POST',
        data: { user_log },
        success: function (response) {
            var json = JSON.parse(response);
            console.log(response);
            // limpieza de seccion


            if (!json.err) {
                var contador = 1;
                $.each(json, function (i, item) {
                    if (i != "err") {


                        perfil = `
                            
                    <div class="col-lg-12 col-md-12 col-sm-12 mt-4 op" id="seccion_user">

                    
                            <div class="d-flex justify-content-between align-items-center">
                                <h3 class="py-3 text-white mb-0">PERFIL DE USUARIO</h3>
                                
                                <span class="badge badge-rol">
                                    ${item.des_t_user}
                                </span>
                            </div>


                        <div class="card. p-4 shadow-lg rounded perfil-card">
                            <div class="row no-gutters align-items-center">

                                <!-- Imagen -->
                                <div class="col-md-3 text-center">
                                    <img src="../IMAGE/u.png" class="img-perfil" alt="usuario">
                                </div>

                                <!-- Información -->
                                <div class="col-md-9">
                                    <div class="card-body text-white">

                                        <h4 class="nombre-user">
                                            ${item.nom_user} ${item.ap_user}
                                        </h4>

                                        <div class="datos-user">
                                            <p>${item.cargo_user}</p>
                                            <p>${item.agencia_reg_user}</p>
                                        </div>

                                        <div class="usuario-email">
                                            ${item.username_user}
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                            
                        `;

                        planes = `
                     
                        <div class="col-lg-12 col-md-12 col-sm-12 mt-4 op" id="seccion_planes_pma">
                                    <H3 class="py-3">PLANES DE MANEJO AMBIENTAL</H3>
                                    
                                    <div class="card    shadow-lg roundle"  >
                                        <img src="../IMAGE/plan.png" class="card-img-top p-4" alt="...">
                                        <div class="card-body text-center d-grid gap-2">
                                            <button class="btn btn-lg  btn-warning " id="btn_registros_pma" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                                        </div>
                                    </div>
                                </div>

                    `;

                        adminitrativo = `
                    
                    
                 


                            
                 


                    <div class="col-lg-6 col-md-12 col-sm-12 mt-4 op" id="sec_user">
                                <H3 class="py-3">USUARIOS</H3>
                                
                                <div class="card    shadow-lg roundle" >
                                    <img src="../IMAGE/user.png" class="card-img-top p-4" alt="...">
                                    <div class="card-body text-center d-grid gap-2">
                                        <button class="btn btn-lg  btn-warning " id="btn_users" type="btn"> Añadir  Usuario</button>
                                    </div>
                                </div>
                            </div>
                            
                            
                    <div class="col-lg-6 col-md-12 col-sm-12 mt-4 op" id="seccion_pedido_online">
                                <H3 class="py-3">PERMISOS</H3>
                                
                                <div class="card    shadow-lg roundle" >
                                    <img src="../IMAGE/per.png" class="card-img-top p-4" alt="...">
                                    <div class="card-body text-center d-grid gap-2">
                                        <button class="btn btn-lg  btn-warning " id="btn_pedidos_online_clbr" type="btn" ></i>Conceder Permisos</button>
                                    </div>
                                </div>
                            </div>


                   
                    


                                        <div class="col-lg-6 col-md-12 col-sm-12 mt-4 op" id="sec_proy">
                                        <H3 class="py-3">PROYECTOS </H3>
                                        
                                        <div class="card    shadow-lg roundle"  >
                                            <img src="../IMAGE/ag.png" class="card-img-top p-4" alt="...">
                                            <div class="card-body text-center d-grid gap-2">
                                                <button class="btn btn-lg  btn-warning " id="btn_proy" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                                            </div>
                                        </div>
                                    
                                    
                                    
                                        </div>
                                
                                    <div class="col-lg-6 col-md-12 col-sm-12 mt-4 op" id="sec_mq">
                                        <H3 class="py-3">MAQUINAS </H3>
                                        
                                        <div class="card    shadow-lg roundle"  >
                                            <img src="../IMAGE/mq.png" class="card-img-top p-4" alt="...">
                                            <div class="card-body text-center d-grid gap-2">
                                                <button class="btn btn-lg  btn-warning " id="btn_mq" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                                            </div>
                                        </div>
                                    
                                    
                                    
                                        </div>

                                                <div class="col-lg-6 col-md-12 col-sm-12 mt-4 op" id="sec_desh">
                                        <H3 class="py-3">DESECHOS </H3>
                                        
                                        <div class="card    shadow-lg roundle"  >
                                            <img src="../IMAGE/des.png" class="card-img-top p-4" alt="...">
                                            <div class="card-body text-center d-grid gap-2">
                                                <button class="btn btn-lg  btn-warning " id="btn_dsh" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                                            </div>
                                        </div>
                                    
                                    
                                    
                                        </div>
                                
                                
                                        <div class="col-lg-6 col-md-12 col-sm-12 mt-4 op" id="sec_ubi">
                                        <H3 class="py-3">UBICACIONES</H3>
                                        
                                        <div class="card    shadow-lg roundle"  >
                                            <img src="../IMAGE/m.png" class="card-img-top p-4" alt="...">
                                            <div class="card-body text-center d-grid gap-2">
                                                <button class="btn btn-lg  btn-warning " id="btn_ubi" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                                            </div>
                                        </div>
                                    
                                    
                                    
                                        </div>
                                        
                                            <div class="col-lg-6 col-md-12 col-sm-12 mt-4 op" id="sec_proveedor">
                                        <H3 class="py-3">GESTORES </H3>
                                        
                                        <div class="card    shadow-lg roundle"  >
                                            <img src="../IMAGE/proveedor.png" class="card-img-top p-4" alt="...">
                                            <div class="card-body text-center d-grid gap-2">
                                                <button class="btn btn-lg  btn-warning " id="btn_gestor" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                                            </div>
                                        </div>
                                    
                                    
                                    
                                        </div>
                                        
                                        
                                <div class="col-lg-6 col-md-12 col-sm-12 mt-4 op" id="sec_ad">
                                        <H3 class="py-3">ADITIVOS</H3>
                                        
                                        <div class="card    shadow-lg roundle"  >
                                            <img src="../IMAGE/aditivos.png" class="card-img-top p-4" alt="...">
                                            <div class="card-body text-center d-grid gap-2">
                                                <button class="btn btn-lg  btn-warning " id="btn_adt" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                                            </div>
                                        </div>
                                    
                                    
                                    
                                        </div>
                                        
                                        
                                
                          
                    
                    `;


                        desechos = `


                        <div class="col-lg-6 col-md-12 col-sm-12 mt-4 op" id="seccion_res_n_p">
                                <H3 class="py-3"> RESIDUOS NO PELIGROSOS </H3>
                                
                                <div class="card    shadow-lg roundle"  >
                                    <img src="../IMAGE/rsnp.png" class="card-img-top p-4" alt="...">
                                    <div class="card-body text-center d-grid gap-2">
                                        <button class="btn btn-lg  btn-warning " id="btn_res_n_p" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                                    </div>
                                </div>
                            
                            
                            
                                </div>



                                <div class="col-lg-6 col-md-12 col-sm-12 mt-4 op" id="seccion_res_p">
                                <H3 class="py-3">RESIDUOS PELIGROSOS Y/O ESPECIALES </H3>
                                
                                <div class="card    shadow-lg roundle"  >
                                    <img src="../IMAGE/rsp.png" class="card-img-top p-4" alt="...">
                                    <div class="card-body text-center d-grid gap-2">
                                        <button class="btn btn-lg  btn-warning " id="btn_rp_hse" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                                    </div>
                                </div>
                            
                            
                            
                                </div>





                                <div class="col-lg-3 col-md-12 col-sm-12 mt-4 op" id="sec_agua">
                                <H3 class="py-3"> CONSUMO AGUA </H3>
                                
                                <div class="card    shadow-lg roundle"  >
                                    <img src="../IMAGE/agua.png" class="card-img-top p-4" alt="...">
                                    <div class="card-body text-center d-grid gap-2">
                                        <button class="btn btn-lg  btn-warning " id="btn_res_n_p" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                                    </div>
                                </div>
                            
                            
                            
                                </div>


                                    <div class="col-lg-3 col-md-12 col-sm-12 mt-4 op" id="sec_comb">
                                        <H3 class="py-3"> CONSUMO COMBUSTIBLE </H3>
                                        
                                        <div class="card    shadow-lg roundle"  >
                                            <img src="../IMAGE/gas.png" class="card-img-top p-4" alt="...">
                                            <div class="card-body text-center d-grid gap-2">
                                                <button class="btn btn-lg  btn-warning " id="btn_res_n_p" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                                            </div>
                                        </div>
                                    
                                    
                                    
                                        </div>




                                    <div class="col-lg-3 col-md-12 col-sm-12 mt-4 op" id="sec_adt">
                                        <H3 class="py-3"> CONSUMO ADITIVOS </H3>
                                        
                                        <div class="card    shadow-lg roundle"  >
                                            <img src="../IMAGE/ad.png" class="card-img-top p-4" alt="...">
                                            <div class="card-body text-center d-grid gap-2">
                                                <button class="btn btn-lg  btn-warning " id="btn_adt" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                                            </div>
                                        </div>
                                    
                                    
                                    
                                        </div>


                                <div class="col-lg-3 col-md-12 col-sm-12 mt-4 op" id="sec_pz">
                                        <H3 class="py-3"> CONSUMO POZO </H3>
                                        
                                        <div class="card    shadow-lg roundle"  >
                                            <img src="../IMAGE/pz.png" class="card-img-top p-4" alt="...">
                                            <div class="card-body text-center d-grid gap-2">
                                                <button class="btn btn-lg  btn-warning " id="btn_res_n_p" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                                            </div>
                                        </div>
                                    
                                    
                                    
                                        </div>

                                        <div class="col-lg-12 col-md-12 col-sm-12 mt-4 op" id="sec_eng">
                                        <H3 class="py-3"> CONSUMO ENERGIA </H3>
                                        
                                        <div class="card    shadow-lg roundle"  >
                                            <img src="../IMAGE/eng.png" class="card-img-top p-4" alt="...">
                                            <div class="card-body text-center d-grid gap-2">
                                                <button class="btn btn-lg  btn-warning " id="btn_eng" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                                            </div>
                                        </div>
                                    
                                    
                                    
                                        </div>

                        

                    `;

                        salud = `
                            <div class="col-lg-12 col-md-12 col-sm-12 mt-4 op" id="sec_salud">
                                <h3 class="py-3 text-white">SALUD OCUPACIONAL</h3>

                                <div class="card shadow-lg roundle border-0 salud-home-card" style="background: rgba(255,255,255,0.08);">
                                    <div class="card-body text-center text-white p-4">

                                        
                                    <div class="mb-3">
                                        <img src="../IMAGE/corazon.png" alt="Corazón" class="img-fluid">
                                    </div>


                                        <h4 class="card-title text-white mb-2">
                                            MÓDULO DE SALUD
                                        </h4>

                                        <p class="card-text text-white-50 mb-4" style="max-width: 650px; margin: 0 auto;">
                                            Gestión de pacientes, exámenes ocupacionales, vacunas y morbilidad.
                                        </p>

                                        <button class="btn btn-success px-5 py-2" id="btn_salud" type="button">
                                            <i class="fas fa-heartbeat"></i> Ingresar
                                        </button>

                                    </div>
                                </div>
                            </div>
                        `;

                        close_sesion = `
      
        <div class="col-lg-12 col-md-12 col-sm-12 mt-4 op" id="sec_close">
                                        <H3 class="py-3">SALIR </H3>
                                        
                                        <div class="card    shadow-lg roundle"  >
                                            <img src="../IMAGE/us.png" class="card-img-top p-4" alt="...">
                                            <div class="card-body text-center d-grid gap-2">
                                                <button class="btn btn-lg  btn-danger " id="btn_close" type="btn" ><i class="fas fa-power-off"></i> Cerrar Sesion </button>
                                            </div>
                                        </div>
                                    
                                    
                                    
                                        </div>
                                
      
      
      `;









                        // dev 
                        if (item.FK_t_user == 1) {

                            $('#perfil_klussa').append(perfil);
                            $('#admin_klussa').append(adminitrativo);
                            $('#planes_klussa').append(planes);
                            $('#desechos_klussa').append(desechos);
                            $('#close_klussa').append(close_sesion);


                        } else if (item.FK_t_user == 2) {
                            //administrador

                            $('#perfil_klussa').append(perfil);
                            $('#admin_klussa').append(adminitrativo);
                            $('#planes_klussa').append(planes);
                            $('#desechos_klussa').append(desechos);
                            $('#close_klussa').append(close_sesion);



                        } else if (item.FK_t_user == 3) {

                            $('#perfil_klussa').append(perfil);
                            $('#salud_klussa').append(salud);
                            $('#close_klussa').append(close_sesion);

                            //salud
                        } else if (item.FK_t_user == 4) {
                            //hse

                            $('#perfil_klussa').append(perfil);


                        } else if (item.FK_t_user == 5) {

                            $('#perfil_klussa').append(perfil);
                            $('#desechos_klussa').append(desechos);
                            $('#close_klussa').append(close_sesion);
                            // desechos

                        } else if (item.FK_t_user == 6) {
                            //salud/plan de manejo ambiental

                            $('#perfil_klussa').append(perfil);
                            $('#salud_klussa').append(salud);
                            $('#planes_klussa').append(planes);
                            $('#close_klussa').append(close_sesion);

                        } else if (item.FK_t_user == 7) {
                            // desechos/plan de manejo ambiental

                            $('#perfil_klussa').append(perfil);
                            $('#desechos_klussa').append(desechos);
                            $('#planes_klussa').append(planes);
                            $('#close_klussa').append(close_sesion);

                        }



                    }





                })
            }
            else {

                Swal.fire({
                    icon: 'info',
                    title: json.mensaje,
                    text: 'Sistema en fase de pruebas'
                    , footer: '<a href>Ver manual</a>'

                })
            }
        }
    })


}






/////ACCIONES MODULO HOME

///USUAIRO
$(document).on('click', '#btn_users', function (event) {


    location.href = "../CONTROLLERS/PMA-USERS.php";

});

$(document).on('click', '#sec_user', function (event) {


    location.href = "../CONTROLLERS/PMA-USERS.php";

});

///PLANES

$(document).on('click', '#btn_registros_pma', function (event) {


    location.href = "../CONTROLLERS/PLANES.php";

});


$(document).on('click', '#seccion_planes_pma', function (event) {


    location.href = "../CONTROLLERS/PLANES.php";

});




// residuos 

$(document).on('click', '#btn_rp_hse', function (event) {


    location.href = "../CONTROLLERS/RESIDUOS-PELIGROSOS.php";

});

$(document).on('click', '#seccion_res_p', function (event) {


    location.href = "../CONTROLLERS/RESIDUOS-PELIGROSOS.php";

});

$(document).on('click', '#btn_res_n_p', function (event) {


    location.href = "../CONTROLLERS/RESIDUOS-NO-PELIGROSOS.php";

});

$(document).on('click', '#seccion_res_n_p', function (event) {


    location.href = "../CONTROLLERS/RESIDUOS-NO-PELIGROSOS.php";

});



// seccion  consumo de aguas

$(document).on('click', '#sec_agua', function (event) {


    location.href = "../CONTROLLERS/CONSUMO-AGUA-SEDES.php";

});


//seccion consumo de combustible
$(document).on('click', '#sec_comb', function (event) {


    location.href = "../CONTROLLERS/CONSUMO-COMBUSTIBLE.php";

});

//seccion pozo
$(document).on('click', '#sec_pz', function (event) {


    location.href = "../CONTROLLERS/CONSUMO-AGUA-POZOS.php";

});


//seccion adtivos
$(document).on('click', '#sec_adt', function (event) {


    location.href = "../CONTROLLERS/CONSUMO-ADITIVOS.php";

});
// btn aditivos
$(document).on('click', '#btn_adt', function (event) {


    location.href = "../CONTROLLERS/CONSUMO-ADITIVOS.php";

});

//seccion proyectos
$(document).on('click', '#sec_proy', function (event) {


    location.href = "../CONTROLLERS/PROYECTOS.php";

});
// btn proyectos
$(document).on('click', '#btn_proy', function (event) {


    location.href = "../CONTROLLERS/PROYECTOS.php";


});

//seccion energia
$(document).on('click', '#sec_eng', function (event) {


    location.href = "../CONTROLLERS/CONSUMO-ENERGIA.php";

});
// btn energia
$(document).on('click', '#btn_eng', function (event) {



    location.href = "../CONTROLLERS/CONSUMO-ENERGIA.php";


});

//seccion maquinas
$(document).on('click', '#sec_mq', function (event) {


    location.href = "../CONTROLLERS/MAQUINAS.php";

});
// btn maquinas
$(document).on('click', '#btn_mq', function (event) {



    location.href = "../CONTROLLERS/MAQUINAS.php";



});

//seccion desechos
$(document).on('click', '#sec_desh', function (event) {


    location.href = "../CONTROLLERS/GESTION_DESECHOS.php";

});
// btn desechos
$(document).on('click', '#btn_desh', function (event) {



    location.href = "../CONTROLLERS/GESTION_DESECHOS.php";


});

// seccion salud
$(document).on('click', '#sec_salud', function (event) {
    location.href = "../CONTROLLERS/SALUD.php";
});

// boton salud
$(document).on('click', '#btn_salud', function (event) {
    event.stopPropagation();
    location.href = "../CONTROLLERS/SALUD.php";
});


// CERRARR SESION 



$(document).on('click', '#sec_close', function (event) {


    location.href = "../CONTROLLERS/CLOSE.php";

});


$(document).on('click', '#btn_close', function (event) {


    location.href = "../CONTROLLERS/CLOSE.php";

});


$(document).on('click', '#btn_rp_hse', function (event) {


    location.href = "../CONTROLLERS/RESIDUOS-PELIGROSOS.php";

});

$(document).on('click', '#sec_proveedor', function (event) {


    location.href = "../CONTROLLERS/GESTORES.php";

});

$(document).on('click', '#btn_gestor', function (event) {


    location.href = "../CONTROLLERS/GESTORES.php";

});

$(document).on('click', '#sec_ubi', function (event) {


    location.href = "../CONTROLLERS/UBICACIONES.php";

});

$(document).on('click', '#btn_ubi', function (event) {


    location.href = "../CONTROLLERS/UBICACIONES.php";

});



$(document).on('click', '#sec_ad', function (event) {


    location.href = "../CONTROLLERS/ADITIVOS.php";

});
$(document).on('click', '#btn_adt', function (event) {


    location.href = "../CONTROLLERS/ADITIVOS.php";

});
