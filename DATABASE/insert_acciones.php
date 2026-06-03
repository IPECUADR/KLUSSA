<?php


require('../DATABASE/conexion.php');

//DATOS INSERCION

$user_up = $_POST['user_up'];

$md = $_POST['md'];
$cbx = $_POST['cbx'];
$vrf = $_POST['vrf'];
$cbx_fr = $_POST['cbx_fr'];



$busqueda = "SELECT * FROM  actividades where medida = '$md' and verificacion = '$vrf' and FK_fc = '$cbx_fr' and FK_asp_amb = '$cbx'";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['medida'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Esta Medida y su gestión ambiental, ya están registradas.'));

    


     }else{


          $insert ="INSERT INTO `actividades` (
                           
                                  `medida`, 
                                  `verificacion`, 
                                  `FK_fc`, 
                                  `fc_up_ac`, 
                                  `FK_asp_amb`, 
                                  `fc_reg_aut_act`, 
                                  `fc_up_aut_act`, 
                                  `user_up_act_aut`
                              ) VALUES (
                               
                                  '$md',
                                  '$vrf',
                                  '$cbx_fr',
                                  '2025-07-16 18:35:28.000000',
                                  '$cbx',
                                  CURRENT_TIMESTAMP(),
                                  '0000-00-00 00:00:00.000000',
                                  '$user_up'
                              )";


               $reg = mysqli_query($con,$insert);

                        if ($reg){


                                    echo json_encode(array('err' => false, 'mensaje' => ' Aspecto ambiental, registrado exitosamente.'));

                                    
                                }else{

                                    
                                     echo json_encode(array('err' => TRUE, 'mensaje' => 'No se pudo completar el registro. Intente nuevamente.'));



                                }


     }
           
      

 }else{


echo json_encode(array('err' => TRUE, 'mensaje' => 'Error en sistema.'));



}






































