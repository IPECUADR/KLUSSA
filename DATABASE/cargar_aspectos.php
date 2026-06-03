<?php 




require('conexion.php');








  $query="SELECT * FROM planes, sub_plan, aspecto_ambiental WHERE planes.PK_plan  = sub_plan.FK_plan and sub_plan.PK_sub  = aspecto_ambiental.FK_sub ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                       
                        'PK_asp_amb'=> $row['PK_asp_amb'],
                        'aspecto_amb'=> utf8_encode($row['aspecto_amb']),
                        'sub_plan'=> utf8_encode($row['sub_plan']),
                        'plan_nom'=> utf8_encode($row['plan_nom']),
                         
                     );

                  }
                  if(isset($json[0]['PK_asp_amb'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Ups. No tenemos nada que mostrarte!!'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'Error al tratar de cargar informacion!! '));

	}


	mysqli_close($con);
?>