<?php 




require('conexion.php');








  $query="SELECT * FROm  planes";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        'doc_pln_mc_lg'=> $row['doc_pln_mc_lg'],
                        'plan_nom'=> utf8_encode($row['plan_nom']),
                        'plan_desc'=> utf8_encode($row['plan_desc']),
                        'PK_plan'=> utf8_encode($row['PK_plan']),
                        'plan_an'=> utf8_encode($row['plan_an']),
                        'user_up_plan_aut'=> utf8_encode($row['user_up_plan_aut']),
                         
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