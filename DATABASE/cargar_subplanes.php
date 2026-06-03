<?php 




require('conexion.php');








  $query="SELECT * FROM planes, sub_plan  WHERE planes.PK_plan  = sub_plan.FK_plan  ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                       
                        'plan_nom'=> utf8_encode($row['plan_nom']),
                        'plan_desc'=> utf8_encode($row['plan_desc']),
                        'PK_sub'=> $row['PK_sub'],
                        'plan_an'=> $row['plan_an'],
                        'sub_plan'=> utf8_encode($row['sub_plan']),
                        'user_up_plan_aut'=>utf8_encode( $row['user_up_plan_aut']),
                         
                     );

                  }
                  if(isset($json[0]['PK_sub'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Ups. No tenemos nada que mostrarte!!'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'Error al tratar de cargar informacion!! '));

	}


	mysqli_close($con);
?>