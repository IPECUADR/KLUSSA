<?php 




require('conexion.php');

$id = $_POST['id'];





  $query="SELECT * FROM actividades WHERE  PK_act  ='$id' ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                      
                        'PK_act'=> $row['PK_act'],
                        'user_up_act_aut'=> $row['user_up_act_aut'],
                        'fc_reg_aut_act'=> $row['fc_reg_aut_act'],
                        'fc_up_aut_act'=> $row['fc_up_aut_act'],
                        
                         
                     );

                  }
                  if(isset($json[0]['PK_act'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'No existen registros.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'¡Usuario o contraseña, incorrectos!! '));

	}


	mysqli_close($con);
?>