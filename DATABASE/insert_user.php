<?php


require('../DATABASE/conexion.php');

//DATOS INSERCION



$ci = $_POST['ci'];
$nom = $_POST['nom'];
$ap = $_POST['ap'];
$ag = $_POST['ag'];
$cg = $_POST['cg'];
$t_u = $_POST['cbx'];
$em =$_POST['em'];
$pass = sha1($_POST['ps']);
$user_up =$_POST['user_up'];




$busqueda = " SELECT * 
FROM usuario 
WHERE ci_user = '$ci' 
OR username_user = '$em';";

$bs = mysqli_query($con, $busqueda);


if($bs){

  $filas = mysqli_fetch_array($bs);

            if (isset($filas['PK_user'])) {
                


                echo json_encode(array('err' => TRUE, 'mensaje' => 'El usuario ya se encuentra registrado.'));
                
             



            } else {
            
                    $insert =  "INSERT INTO `usuario` (
                        
                        `nom_user`, 
                        `ap_user`, 
                        `cargo_user`, 
                        `agencia_reg_user`, 
                        `ci_user`, 
                        `tel_user`, 
                        `username_user`, 
                        `password_user`, 
                        `fc_reg_aut_user`, 
                        `fc_up_aut_user`, 
                        `user_up_reg`, 
                        `FK_t_user`
                    ) VALUES (
                                 -- PK_user (autoincrement)
                        '$nom',            -- nom_user
                        '$ap',              -- ap_user
                        '$cg',             -- cargo_user
                        '$ag',    -- agencia_reg_user
                        '$ci',             -- ci_user
                        'n/a',             -- tel_user
                        '$em',             -- username_user
                        '$pass',             -- password_user
                        CURRENT_TIMESTAMP(), -- fc_reg_aut_user
                        '000-00-00',             -- fc_up_aut_user
                        '$user_up',             -- user_up_reg
                        '$t_u'                -- FK_t_user
                           )";
                        
                    $up = mysqli_query($con,$insert);

                        if ($up){


                                    echo json_encode(array('err' => false, 'mensaje' => 'Registro Exitoso.'));

                                    
                                }else{

                                    
                                     echo json_encode(array('err' => TRUE, 'mensaje' => 'No se encuentra el registro.'));



                                }



            }



 }else{


echo json_encode(array('err' => TRUE, 'mensaje' => 'Error en BDD'));



}





	mysqli_close($con);
?>
































