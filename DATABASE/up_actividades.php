<?php


require('../DATABASE/conexion.php');

//DATOS INSERCION



$user_up = $_POST['user_up'];

$md = $_POST['md'];
$cbx = $_POST['cbx'];
$vrf = $_POST['vrf'];
$cbx_fr = $_POST['cbx_fr'];

$id = $_POST['id_up'];



$busqueda = "SELECT * FROM  actividades where medida = '$md' and  FK_fc = '$cbx_fr' and  PK_act != $id and verificacion = '$vrf' and FK_asp_amb = '$cbx'   ";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['PK_asp_amb'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Este Medida ambiental ya esta registrada.'));

    


     }else{


          $update ="UPDATE actividades SET 
            medida = '$md',
            verificacion = '$vrf',
            FK_fc = '$cbx_fr',
            FK_asp_amb = '$cbx',
            fc_up_ac = NOW(),
            user_up_act_aut = '$user_up'
             WHERE PK_act = $id";
                      

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






































