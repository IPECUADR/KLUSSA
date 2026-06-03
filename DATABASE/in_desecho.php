<?php


require('../CONFIG/sys.res.con.php');

//DATOS INSERCION


$code_res = $_POST['code_res'];
$des_desecho = $_POST['des_desecho'];
$cbx_certib = $_POST['cbx_certib'];
$cbx_rhom = $_POST['cbx_rhom'];
$tipo_res = $_POST['tipo_res'];
$t_res = $_POST['cbx_t_res'];




$busqueda = "SELECT * FROM residuos where code_res = '$code_res' and FK_clf_res = 1 ";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['id_res'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Este desecho ya fue registrada.'));

    


     }else{


          $insert ="INSERT INTO `residuos`
        
         (`id_res`, `code_res`, `descrip_residuo`, `FK_crtib`, `FK_clf_res`, `FK_t_res`, `FK_clf_sis_r`)
          
           VALUES (NULL, '$code_res', '$des_desecho', '$cbx_certib', '$tipo_res', '$t_res', '$cbx_rhom')";

               $reg = mysqli_query($con,$insert);

                        if ($reg){


                                    echo json_encode(array('err' => false, 'mensaje' => 'Registrado exitosamente.'));

                                    
                                }else{

                                    
                                     echo json_encode(array('err' => TRUE, 'mensaje' => 'No se pudo completar el registro. Intente nuevamente.'));



                                }


     }
           
      

 }else{


echo json_encode(array('err' => TRUE, 'mensaje' => 'Error en sistema.'));



}






































