<?php 




require('conexion.php');

$id = $_POST['id'];





  $query="SELECT * FROM aspecto_ambiental WHERE  PK_asp_amb ='$id' ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                      
                        'PK_asp_amb'=> $row['PK_asp_amb'],
                        'usr_up_aut_asp'=> $row['usr_up_aut_asp'],
                        'fc_reg_aut_asp'=> $row['fc_reg_aut_asp'],
                        'fc_up_aut_asp'=> $row['fc_up_aut_asp'],
                        
                         
                     );

                  }
                  if(isset($json[0]['PK_asp_amb'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'No existen registros.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'¡Usuario o contraseña, incorrectos!! '));

	}


	mysqli_close($con);
?>