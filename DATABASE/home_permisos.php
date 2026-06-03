<?php 




require('conexion.php');

$user_log = $_POST['user_log'];






  $query="SELECT *FROM usuario where  username_user = '$user_log' ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        'nom_user'=> $row['nom_user'],
                        'ap_user'=> $row['ap_user'],
                        'cargo_user'=> $row['cargo_user'], 
                        'agencia_reg_user'=> $row['agencia_reg_user'],
                        'FK_t_user'=> $row['FK_t_user'],
						'username_user'=> $row['username_user'],
                        'PK_user'=> $row['PK_user'],
                         
                     );

                  }
                  if(isset($json[0]['PK_user'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Datos incorrectos.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'¡Usuario o contraseña, incorrectos!! '));

	}


	mysqli_close($con);
?>