<?php


require('../CONFIG/sys.res.con.php');

//DATOS INSERCION



$t_res = $_POST['t_res'];
$des_t_res = $_POST['des_t_res'];
$icono = $_POST['icono'];
$clf_deschos = $_POST['clf_deschos'];

$id = $_POST['pk_registro'];



$busqueda = "SELECT * FROM  t_residuo where t_residuo = '$t_res'  and  PK_t_res != $id  and t_res_p = '$clf_deschos' ";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['aspecto_amb'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Este aspecto ambiental ya esta registrado.'));

    


     }else{


          $update =" UPDATE `t_residuo` 
                      SET 
                        `t_residuo`     = '$t_res', 
                        `icono_res`     = '$icono', 
                        `des_res`       = '$des_t_res',
                        `t_res_p`       = '$clf_deschos'
                         WHERE `PK_t_res` = '$id';
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






































