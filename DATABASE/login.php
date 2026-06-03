<?php 


session_start();

require('conexion.php');

$username = $_POST['username'];
$password = sha1($_POST['password']);

$_SESSION['username']=$username;






  $query="SELECT *FROM usuario where  username_user = '$username' and password_user ='$password'";

	$result = mysqli_query($con,$query); 
	$filas = mysqli_fetch_array($result);


if($filas){
       
		if($filas['FK_t_user']== 1){
          
			echo json_encode(array('err'=>false, 'mensaje'=>'Usuario con rol  de administrador', 'rol'=> $filas['FK_t_user'], 'nom_user' => $filas['nom_user'], 'ap'=>$filas['ap_user']));

		
        
        
        }else if($filas['FK_t_user']== 5){
            
    	echo json_encode(array('err'=>false, 'mensaje'=>'Usuario con rol  de administrador', 'rol'=> $filas['FK_t_user'], 'nom_user' => $filas['nom_user'], 'ap'=>$filas['ap_user']));

            
        }else if($filas['FK_t_user']== 6){
            
    	echo json_encode(array('err'=>false, 'mensaje'=>'Usuario con rol  de administrador', 'rol'=> $filas['FK_t_user'], 'nom_user' => $filas['nom_user'], 'ap'=>$filas['ap_user']));

            
        }else if($filas['FK_t_user']== 7){
            
    	echo json_encode(array('err'=>false, 'mensaje'=>'Usuario con rol  de administrador', 'rol'=> $filas['FK_t_user'], 'nom_user' => $filas['nom_user'], 'ap'=>$filas['ap_user']));

            
        }else{

			echo json_encode(array('err'=>true, 'mensaje'=>'Aun  no se te asignado un rol'));
			
		}
	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'¡Usuario o contraseña, incorrectos!! '));

	}


	mysqli_close($con);
?>