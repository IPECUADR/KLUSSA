<?php


require('../CONFIG/sys.res.con.php');

//DATOS INSERCION


$proyecto = $_POST['proyecto'];
$descripcion = $_POST['descripcion'];





$busqueda = "SELECT * FROM  proyectos where proyecto = '$proyecto' ";

$bs = mysqli_query($con, $busqueda);


if($bs){


  $data_con = mysqli_fetch_array($bs);



  if(isset($data_con['PK_pro'])){


    echo json_encode(array('err' => TRUE, 'mensaje' => 'Este proyecto ya fue registrado.'));

    


     }else{


          $insert ="INSERT INTO `proyectos` (
                           
                                  `proyecto`,                                 
                                  `provincia`
                           
                            
                          
                              ) VALUES (
                               
                                  '$proyecto',                          
                                  '$descripcion'
                                 
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






































