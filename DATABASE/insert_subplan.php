<?php


require('../DATABASE/conexion.php');

//DATOS INSERCION



$user_up = $_POST['user_up'];

$sub = $_POST['sub'];
$cbx = $_POST['cbx'];


$busqueda = "SELECT * FROM  sub_plan where sub_plan = '$sub' and FK_plan = '$cbx'";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['sub_plan'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Este subplan ya esta registrado.'));

    


     }else{


          $insert =" INSERT INTO `sub_plan` 
                  (
                   
                    `sub_plan`, 
                    `FK_plan`, 
                    `aut_us_sub_aut`, 
                    `aut_fc_reg_sub`, 
                    `aut_fc_up_sub`

                  ) 
                  VALUES 
                  (
                    '$sub', 
                    '$cbx', 
                    '$user_up', 
                    CURRENT_TIMESTAMP(), 
                    '0000-00-00 00:00:00.000000'

                  ) ";


               $reg = mysqli_query($con,$insert);

                        if ($reg){


                                    echo json_encode(array('err' => false, 'mensaje' => ' Subplan registrado exitosamente.'));

                                    
                                }else{

                                    
                                     echo json_encode(array('err' => TRUE, 'mensaje' => 'No se pudo completar el registro. Intente nuevamente.'));



                                }


     }
           
      

 }else{


echo json_encode(array('err' => TRUE, 'mensaje' => 'Error en sistema.'));



}






































