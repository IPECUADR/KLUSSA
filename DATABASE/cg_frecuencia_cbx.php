<?php 




require('conexion.php');







  $query="SELECT * FROM frecuencia ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(

                        'frecuencia_fc'=> utf8_encode($row['frecuencia_fc']),
                        'PK_fc'=> $row['PK_fc'],
                    
                         
                     );

                  }
                  if(isset($json[0]['PK_fc'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Datos incorrectos.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'¡Usuario o contraseña, incorrectos!! '));

	}


	mysqli_close($con);
?>