<?php 




require('conexion.php');

$pla_Amb = $_POST['pla_Amb'];






  $query="SELECT * FROM 
            planes,
            sub_plan, 
            actividades, 

            aspecto_ambiental, 
            frecuencia
            where 

            planes.PK_plan = sub_plan.FK_plan
            AND sub_plan.PK_sub = aspecto_ambiental.FK_sub
            AND aspecto_ambiental.PK_asp_amb = actividades.FK_asp_amb 
            AND  frecuencia.PK_fc = actividades.FK_fc 
            AND planes.PK_plan = $pla_Amb";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                     'sub_plan'=> utf8_encode($row['sub_plan']),
                        'aspecto_amb'=>utf8_encode( $row['aspecto_amb']),
                        'medida'=>utf8_encode( $row['medida']),
                        'verificacion'=>utf8_encode($row['verificacion']),
                        'frecuencia_fc'=> utf8_encode($row['frecuencia_fc']),
                        'PK_plan'=> $row['PK_plan'],
                        'PK_act'=> $row['PK_act'],
                         
                     );

                  }
                  if(isset($json[0]['PK_plan'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'No se tienen actividades cargadas a este plan.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'¡Usuario o contraseña, incorrectos!! '));

	}


	mysqli_close($con);
?>