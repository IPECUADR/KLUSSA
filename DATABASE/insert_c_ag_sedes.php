<?php


require('../CONFIG/sys.res.con.php');

//DATOS INSERCION

$fc_inicio = $_POST['fc_inicio'];
$fc_cierre = $_POST['fc_cierre'];
$mes = $_POST['mes'];
$agencia = $_POST['agencia'];
$m_cubicos = $_POST['m_cubicos'];
$litros = $_POST['litros'];
$responsable = $_POST['responsable'];





$busqueda = "SELECT * FROM  c_agua_ag where fc_in_ca_ag = '$fc_inicio' and fc_crt_ca_ag = '$fc_cierre' and FK_mes = '$mes' and FK_ag = '$agencia'  ";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['fc_in_ca_ag'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Este consumo  ya fue registrado.'));

    


     }else{


          $insert ="INSERT INTO `c_agua_ag` (
                           
                                  `fc_in_ca_ag`, 
                                  `fc_crt_ca_ag`,
                                  `FK_mes`,
                                  `FK_ag`,
                                  `cm_m_c`,
                                  `cm_lit`,
                                  `user_reg`
                            
                          
                              ) VALUES (
                               
                                  '$fc_inicio',                          
                                  '$fc_cierre', 
                                  '$mes',
                                  '$agencia',
                                  '$m_cubicos',
                                  '$litros',
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






































