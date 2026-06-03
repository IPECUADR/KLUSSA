<?php


require('../CONFIG/sys.res.con.php');

//DATOS INSERCION


$ubicacion = $_POST['ubicacion'];






$busqueda = "SELECT * FROM  ubicacion where ubicacion = '$ubicacion' ";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['PK_ub'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Este ubicacion ya fue registrado.'));

    


     }else{


          $insert ="INSERT INTO `ubicacion` (
                           
                                                                
                                  `ubicacion`
                           
                            
                          
                              ) VALUES (
                               
                                                      
                                  '$ubicacion'
                                 
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






































