<?php


require('../CONFIG/sys.res.con.php');

//DATOS INSERCION


$gestor = $_POST['gestor'];






$busqueda = "SELECT * FROM  gestor where gestor_res = '$gestor' ";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['PK_gestor'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Este gestor ya fue registrado.'));

    


     }else{


          $insert ="INSERT INTO `gestor` (
                           
                                                                
                                  `gestor_res`
                           
                            
                          
                              ) VALUES (
                               
                                                      
                                  '$gestor'
                                 
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






































