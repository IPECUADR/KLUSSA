<?php


require('../DATABASE/conexion.php');

//DATOS INSERCION



$ci = $_POST['ci'];
$nom = $_POST['nom'];
$ap = $_POST['ap'];
$ag = $_POST['ag'];
$cg = $_POST['cg'];
$em = $_POST['em'];
$t_u = $_POST['cbx'];
$id =$_POST['PK_user'];
$user_up =$_POST['user_up'];


$pass = sha1($_POST['ps']);

$busqueda = " SELECT * from  usuario where  ci_user = '$ci' and  PK_user != $id or  username_user = '$em' and  PK_user != $id  ";

$bs = mysqli_query($con, $busqueda);


if($bs){

  $filas = mysqli_fetch_array($bs);

            if (isset($filas['ci_user'])) {
                


                echo json_encode(array('err' => TRUE, 'mensaje' => 'La información que intentas actualizar ya existe y está asociada a otro usuario.'));
                
             



            } else {
            

             $update_reg =  " UPDATE usuario SET nom_user ='$nom' , ap_user = '$ap', cargo_user ='$cg', agencia_reg_user = '$ag', ci_user = '$ci' , user_up_reg = '$user_up', username_user ='$em' , password_user ='$pass' where PK_user  = $id  ";
                        
                    $up = mysqli_query($con,$update_reg);

                        if ($up){


                                    echo json_encode(array('err' => false, 'mensaje' => 'Actualizacion Exitosa.'));

                                    
                                }else{

                                    
                                     echo json_encode(array('err' => TRUE, 'mensaje' => 'No se encuentra el registro.'));



                                }



            }



 }else{


echo json_encode(array('err' => TRUE, 'mensaje' => 'Error en BDD'));



}





	mysqli_close($con);
?>
































