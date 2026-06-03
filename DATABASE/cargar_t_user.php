<?php 




require('conexion.php');








  $query="SELECT * from t_user ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        
                        'des_t_user'=>utf8_encode($row['des_t_user']),
                        'PK_t_user'=> $row['PK_t_user'],
                     
                    
                         
                     );

                  }
                  if(isset($json[0]['PK_t_user'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Datos incorrectos.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'ERROR EN BDD '));

	}


	mysqli_close($con);
?>