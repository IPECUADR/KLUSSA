<?php


require('../CONFIG/sys.res.con.php');

//DATOS INSERCION



$pk = $_POST['id'];
$res= $_POST['res'];
$code= $_POST['code'];







$busqueda = "SELECT * FROM  residuos  where code_res = '$code'  and descrip_residuo = '$res' and  id_res != $pk ";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['aspecto_amb'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Este residuo ya esta registrado.'));

    


     }else{


          $update =" UPDATE `residuos` 
                      SET 
                        `descrip_residuo`     = '$res', 
                        `code_res`     = '$code'
                         WHERE `id_res` = '$pk';
                      ";

               $up = mysqli_query($con,$update);

                        if ($up){


                                    echo json_encode(array('err' => false, 'mensaje' => ' Registro actualizado exitosamente.'));

                                    
                                }else{

                                    
                                     echo json_encode(array('err' => TRUE, 'mensaje' => 'No se pudo completar la actualizacion. Intente nuevamente.'));



                                }


     }
           
      

 }else{


echo json_encode(array('err' => TRUE, 'mensaje' => 'Error en sistema.'));



}






































