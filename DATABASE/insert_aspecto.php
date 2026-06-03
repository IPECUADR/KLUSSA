<?php


require('../DATABASE/conexion.php');

//DATOS INSERCION



$user_up = $_POST['user_up'];

$asp = $_POST['asp'];
$cbx = $_POST['cbx'];


$busqueda = "SELECT * FROM  aspecto_ambiental where aspecto_amb = '$asp' and FK_sub = '$cbx'";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['aspecto_amb'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Este aspecto ambiental ya esta registrado.'));

    


     }else{


          $insert ="INSERT INTO `aspecto_ambiental` 
                    (
                     
                      `aspecto_amb`, 
                      `FK_sub`, 
                      `usr_up_aut_asp`, 
                      `fc_reg_aut_asp`, 
                      `fc_up_aut_asp`

                    ) 
                    VALUES 
                    (
          
                      '$asp', 
                      '$cbx', 
                      '$user_up', 
                      CURRENT_TIMESTAMP(), 
                      '0000-00-00 00:00:00.000000'

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






































