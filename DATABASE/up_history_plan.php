<?php 




require('conexion.php');

$user = $_POST['user'];
$id = $_POST['id'];





  $query="SELECT * FROM usuario, planes WHERE usuario.username_user ='$user' and planes.PK_plan ='$id' ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        'nom_user'=> $row['nom_user'],
                        'ap_user'=> $row['ap_user'],
                        'agencia_reg_user'=> $row['agencia_reg_user'],
                        'username_user'=> $row['username_user'],
                        'fc_up_plan_aut'=> $row['fc_up_plan_aut'],
                        'PK_plan'=> $row['PK_plan'],
                        
                         
                     );

                  }
                  if(isset($json[0]['PK_plan'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'No se tienen actividades cargadas a este plan.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'¡Usuario o contraseña, incorrectos!! '));

	}


	mysqli_close($con);
?>