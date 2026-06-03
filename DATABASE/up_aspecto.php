<?php


require('../DATABASE/conexion.php');

//DATOS INSERCION



$user_up = $_POST['user_up'];

$asp = $_POST['asp'];
$cbx = $_POST['cbx'];
$id = $_POST['id_up'];



$busqueda = "SELECT * FROM  aspecto_ambiental where aspecto_amb = '$asp' and FK_sub = '$cbx' and  PK_asp_amb != $id ";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['aspecto_amb'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Este aspecto ambiental ya esta registrado.'));

    


     }else{


          $update =" UPDATE `aspecto_ambiental` 
                      SET 
                        `aspecto_amb`     = '$asp', 
                        `FK_sub`          = '$cbx', 
                        `usr_up_aut_asp`  = '$user_up', 
                        `fc_up_aut_asp`   = CURRENT_TIMESTAMP()

                         WHERE `PK_asp_amb` = '$id';
                      ";

               $up = mysqli_query($con,$update);

                        if ($up){


                                    echo json_encode(array('err' => false, 'mensaje' => ' Aspecto Ambiental actualizado exitosamente.'));

                                    
                                }else{

                                    
                                     echo json_encode(array('err' => TRUE, 'mensaje' => 'No se pudo completar la actualizacion. Intente nuevamente.'));



                                }


     }
           
      

 }else{


echo json_encode(array('err' => TRUE, 'mensaje' => 'Error en sistema.'));



}






































