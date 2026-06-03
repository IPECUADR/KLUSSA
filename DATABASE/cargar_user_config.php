<?php 




require('conexion.php');








  $query="SELECT * from t_user, usuario where t_user.PK_t_user  = usuario.FK_t_user  ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        'nom_user'=>utf8_encode( $row['nom_user']),
                        'ap_user'=> utf8_encode($row['ap_user']),
                        'cargo_user'=> utf8_encode($row['cargo_user']),
                        'agencia_reg_user'=> utf8_encode($row['agencia_reg_user']),
                        'ci_user'=> $row['ci_user'],
                        'des_t_user'=> utf8_encode($row['des_t_user']),
                         'PK_user'=> $row['PK_user'],
                         'username_user'=> utf8_encode($row['username_user']),
                         'password_user'=> $row['password_user'],
                         'FK_t_user'=> $row['FK_t_user'],
                     );

                  }
                  if(isset($json[0]['PK_user'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Datos incorrectos.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'No existen registros. '));

	}


	mysqli_close($con);
?>