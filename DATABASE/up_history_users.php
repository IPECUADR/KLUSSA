<?php 




require('conexion.php');

$id = $_POST['id'];





  $query="SELECT * FROM usuario  WHERE  PK_user ='$id' ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                      
                        'fc_up_aut_user'=> $row['fc_up_aut_user'],
                        'user_up_reg'=> $row['user_up_reg'],
                   
                        
                         
                     );

                  }
                  if(isset($json[0]['user_up_reg'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'No se tienen actividades cargadas a este plan.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'¡Usuario o contraseña, incorrectos!! '));

	}


	mysqli_close($con);
?>