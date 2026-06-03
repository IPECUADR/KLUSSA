<?php


require('../CONFIG/sys.res.con.php');

//DATOS INSERCION

$fc_inicio = $_POST['fc_inicio'];
$fc_cierre = $_POST['fc_cierre'];
$agencia = $_POST['agencia'];
$mes = $_POST['mes'];

$c_en = $_POST['c_en'];
$responsable = $_POST['responsable'];






$busqueda = "SELECT * 
 
            FROM  

            c_en_ag 

            WHERE 

            fc_in_en_ag = '$fc_inicio' 
            AND fc_fn_en_ag = '$fc_cierre' 
            AND FK_mes = '$mes' 
            AND FK_ag  = '$agencia' 
            AND c_en_ag = '$c_en' 
        ";


   $bs = mysqli_query($con, $busqueda);


   if($bs){


      $data_con = mysqli_fetch_array($bs);



    if(isset($data_con['PK_c_en_ag'])){


       echo json_encode(array('err' => TRUE, 'mensaje' => 'Este consumo  ya fue registrado.'));

    


     }else{


          $insert ="INSERT INTO `c_en_ag` (
                           
                                  `fc_in_en_ag`, 
                                  `fc_fn_en_ag`,
                                  `FK_mes`,
                                  `FK_ag`,
                                  `c_en_ag`,
                                  `rp_rg_en_ag`
                         
                            
                          
                              ) VALUES (
                               
                                  '$fc_inicio',                          
                                  '$fc_cierre', 
                                  '$mes',
                                  '$agencia',
                                    '$c_en',
                                  '$responsable'

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






































