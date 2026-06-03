<?php


require('../DATABASE/conexion.php');

//DATOS INSERCION

$user_up = $_POST['user_up'];

$fc_prog = $_POST['fc_prog'];
$id = $_POST['id_ac'];
$rp_asig = $_POST['rp_asig'];
$des_prog = $_POST['des_prog'];



$busqueda = "SELECT * FROM  programacion  where rp_ac_ec = '$rp_asig' and fc_pr_ac = '$fc_prog'  and FK_act = '$id' and FK_est_act = 3  ";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['PK_prg'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Esta actividad , ya está prgramada.'));

    


     }else{


          $insert ="INSERT INTO `programacion` 
                                (
                        
                                `fc_pr_ac`, 
                                `fc_ej_ac`, 
                                `rp_ac_ec`, 
                                `evidencia_des`, 
                                `evidencia_arc`, 
                                `fc_insert_rp_ac`, 
                                `fc_up_rp_ac`, 
                                `user_up_ac_rp`, 
                                `FK_est_act`, 
                                `FK_act`
                                ) 
                                VALUES 
                                (
                                                 
                                '$fc_prog',           -- fc_pr_ac (fecha programada)
                                '0000-00-00',           -- fc_ej_ac (fecha ejecución)
                                '$rp_asig',           -- rp_ac_ec (responsable)
                                '$des_prog',                  -- evidencia_des
                                'n/a',                  -- evidencia_arc
                                CURRENT_TIMESTAMP(),    -- fc_insert_rp_ac (fecha de inserción)
                                '0000-00-00 00:00:00',  -- fc_up_rp_ac (fecha de actualización)
                                '$user_up',                   -- user_up_ac_rp (usuario)
                                '1',                    -- FK_est_act (estado)
                                '$id'                    -- FK_act (actividad relacionada)
                                )";



               $reg = mysqli_query($con,$insert);

                        if ($reg){


                                    echo json_encode(array('err' => false, 'mensaje' => ' Actividad, programada exitosamente.'));

                                    
                                }else{

                                    
                                     echo json_encode(array('err' => TRUE, 'mensaje' => 'No se pudo completar el registro. Intente nuevamente.'));



                                }


     }
           
      

 }else{


echo json_encode(array('err' => TRUE, 'mensaje' => 'Error en sistema.'));



}






































