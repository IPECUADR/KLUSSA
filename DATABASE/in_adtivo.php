<?php


require('../CONFIG/sys.res.con.php');

//DATOS INSERCION


$aditivos = $_POST['aditivos'];






$busqueda = "SELECT * FROM  aditivos_rs where ad_rs = '$aditivos' ";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['PK_ad'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Este aditivo ya fue registrado.'));

    


     }else{


          $insert ="INSERT INTO `aditivos_rs` (
                           
                                                                
                                  `ad_rs`
                           
                            
                          
                              ) VALUES (
                               
                                                      
                                  '$aditivos'
                                 
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






































