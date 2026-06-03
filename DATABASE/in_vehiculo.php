<?php


require('../CONFIG/sys.res.con.php');

//DATOS INSERCION


$cbx_t_vh = $_POST['cbx_t_vh'];
$sn_maquina = $_POST['sn_maquina'];
$des_vhiculo = $_POST['des_vhiculo'];





$busqueda = "SELECT * FROM  maquina where serie_maquina = '$sn_maquina'  ";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['PK_maquina'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Esta maquina ya fue registrada.'));

    


     }else{


          $insert ="INSERT INTO `maquina` (
                           
                                  `serie_maquina`,                                 
                                  `des_vehiculo`,
                                  `FK_t_vehiculo`
                            
                          
                              ) VALUES (
                               
                                  '$sn_maquina',                          
                                  '$des_vhiculo',
                                  '$cbx_t_vh'
                       
                                 
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






































