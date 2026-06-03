<?php 




require('conexion.php');

$id = $_POST['id'];





  $query="SELECT * FROM sub_plan WHERE  PK_sub ='$id' ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                      
                        'PK_sub'=> $row['PK_sub'],
                        'aut_us_sub_aut'=> $row['aut_us_sub_aut'],
                        'aut_fc_reg_sub'=> $row['aut_fc_reg_sub'],
                        'aut_fc_up_sub'=> $row['aut_fc_up_sub'],
                        
                         
                     );

                  }
                  if(isset($json[0]['PK_sub'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'No existen registros.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'¡Usuario o contraseña, incorrectos!! '));

	}


	mysqli_close($con);
?>