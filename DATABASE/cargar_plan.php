<?php 




require('conexion.php');

$user_log = $_POST['user_log'];






  $query="SELECT * FROm usuario, planes, agencias, ag_user, ag_plan WHERE usuario.PK_user = ag_user.FK_user and agencias.PK_agencia = ag_user.FK_agencia AND planes.PK_plan = ag_plan.FK_plan and agencias.PK_agencia = ag_plan.FK_agencia and  username_user='$user_log'";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        'agencia_mom'=> utf8_encode($row['agencia_mom']),
                        'plan_nom'=>utf8_encode( $row['plan_nom']),
                         'PK_plan'=> $row['PK_plan'],
                    
                         
                     );

                  }
                  if(isset($json[0]['PK_plan'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Datos incorrectos.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'¡Usuario o contraseña, incorrectos!! '));

	}


	mysqli_close($con);
?>