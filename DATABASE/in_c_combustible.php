<?php


require('../CONFIG/sys.res.con.php');

//DATOS INSERCION

$fecha_registro = $_POST['fecha_registro'];
$maquina = $_POST['maquina'];
$agencia = $_POST['agencia'];
$mes = $_POST['mes'];
$galones = $_POST['galones'];
$litros = $_POST['litros'];
$t_comb = $_POST['t_comb'];
$responsable = $_POST['responsable'];





$busqueda = "SELECT * FROM  c_co_vh_ag where fc_in_c_vh_ag = '$fecha_registro'  and FK_mes  = '$mes' and FK_pro = '$agencia' and FK_maquina = '$maquina' ";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['FK_t_com'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Este consumo  ya fue registrado.'));

    


     }else{


          $insert ="INSERT INTO `c_co_vh_ag` (
                           
                                  `fc_in_c_vh_ag`, 
                                  `FK_mes`,
                                  `FK_maquina`,
                                  `FK_t_com`,
                                  `con_gal_vh_ag`,
                                  `con_lit_vh_ag`,
                                  `FK_pro`,
                                  `rp_in_c_vh_ag`
                            
                          
                              ) VALUES (
                               
                                  '$fecha_registro',                          
                                  '$mes',
                                  '$maquina',
                                  '$t_comb',
                                  '$galones',
                                  '$litros',
                                  '$agencia',
                                  '$responsable'

                              )";


               $reg = mysqli_query($con,$insert);

                        if ($reg){


                                    echo json_encode(array('err' => false, 'mensaje' => 'Registrado exitosamente.'));

                                    
                                }else{

                                    
                                     echo json_encode(array('err' => TRUE, 'mensaje' => 'No se pudo completar el registro. Intente nuevamente.'));



                                }


     }
           
      

 }else{


echo json_encode(array('err' => TRUE, 'mensaje' => 'Error en sistema.'));



}






































