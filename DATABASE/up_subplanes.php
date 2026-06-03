<?php


require('../DATABASE/conexion.php');

//DATOS INSERCION



$user_up = $_POST['user_up'];

$sub = $_POST['sub'];
$cbx = $_POST['cbx'];
$id = $_POST['id_up'];



$busqueda = "SELECT * FROM  sub_plan where sub_plan = '$sub' and FK_plan = '$cbx' and  PK_sub != $id ";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['sub_plan'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Este subplan ya esta registrado.'));

    


     }else{


          $update =" UPDATE `sub_plan` 
                      SET 
                        `sub_plan`        = '$sub', 
                        `FK_plan`         = '$cbx', 
                        `aut_us_sub_aut`  = '$user_up', 
                        `aut_fc_up_sub`   = CURRENT_TIMESTAMP()
                         WHERE `PK_sub` = '$id';
                      ";

               $up = mysqli_query($con,$update);

                        if ($up){


                                    echo json_encode(array('err' => false, 'mensaje' => ' Subplan actualizado exitosamente.'));

                                    
                                }else{

                                    
                                     echo json_encode(array('err' => TRUE, 'mensaje' => 'No se pudo completar la actualizacion. Intente nuevamente.'));



                                }


     }
           
      

 }else{


echo json_encode(array('err' => TRUE, 'mensaje' => 'Error en sistema.'));



}






































