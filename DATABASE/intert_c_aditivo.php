<?php


require('../CONFIG/sys.res.con.php');

//DATOS INSERCION

$fc_reg = $_POST['fc_reg'];
$pozo = $_POST['pozo'];
$agencia = $_POST['agencia'];
$mes = $_POST['mes'];
$ad = $_POST['ad'];
$lit = $_POST['lit'];
$kg = $_POST['kg'];
$mq = $_POST['mq'];
$responsable = $_POST['responsable'];









  


          $insert ="INSERT INTO `c_aditivos` (
                           
                                  `fc_in_c_ad`, 
                                  `FK_mes`,
                                  `FK_maquina`,
                                  `pozo_c_ad`,
                                  `FK_ad_rs`,
                                  `kg_c_ad`, 
                                  `lit_c_ad`,
                                  `FK_pro`, 
                                  `rp_in_c_ad`
                             
                            
                          
                              ) VALUES (
                               
                                  '$fc_reg',                          
                                  '$mes', 
                                  '$mq',
                                  '$pozo',
                                  '$ad',
                                  '$kg',
                                  '$lit',
                                  '$agencia',
                                  '$responsable'

                              )";


               $reg = mysqli_query($con,$insert);

                        if ($reg){


                                    echo json_encode(array('err' => false, 'mensaje' => 'Registrado exitosamente.'));

                                    
                                }else{

                                    
                                     echo json_encode(array('err' => TRUE, 'mensaje' => 'No se pudo completar el registro. Intente nuevamente.'));



                                }


     
           
      





































