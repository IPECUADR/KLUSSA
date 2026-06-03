<?php


require('../CONFIG/sys.res.con.php');

//DATOS INSERCION


$t_res = $_POST['t_res'];
$des_t_res = $_POST['des_t_res'];
$icono = $_POST['icono'];
$clf_deschos = $_POST['clf_deschos'];




$busqueda = "SELECT * FROM  t_residuo where t_residuo = '$t_res' ";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['t_residuo'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Esta clasificación ya fue registrada.'));

    


     }else{


          $insert ="INSERT INTO `t_residuo` (
                           
                                  `t_residuo`, 
                                  
                                  `des_res`,
                                  `icono_res`,
                                  `t_res_p` 
                            
                          
                              ) VALUES (
                               
                                  '$t_res',                          
                                  '$des_t_res', 
                                  '$icono',
                                  '$clf_deschos'
                              )";


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






































