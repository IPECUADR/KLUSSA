<?php 




require('conexion.php');








  $query="SELECT * FROM 
  
  planes, 
  sub_plan, 
  aspecto_ambiental,
  actividades, 
  frecuencia
  
   WHERE 
   
   planes.PK_plan  = sub_plan.FK_plan 
   AND sub_plan.PK_sub  = aspecto_ambiental.FK_sub 
   AND aspecto_ambiental.PK_asp_amb  = actividades.FK_asp_amb 
   AND frecuencia.PK_fc = actividades.FK_fc 
   
   ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                       
                        'PK_asp_amb'=> $row['PK_asp_amb'],
                        'aspecto_amb'=> utf8_encode($row['aspecto_amb']),
                        'sub_plan'=> utf8_encode($row['sub_plan']),
                        'plan_nom'=>utf8_encode( $row['plan_nom']),
                        'PK_act'=> utf8_encode($row['PK_act']),
                        'medida'=> utf8_encode($row['medida']),
                        'verificacion'=> utf8_encode($row['verificacion']),
                        'frecuencia_fc'=> utf8_encode($row['frecuencia_fc']),

                         
                     );

                  }
                  if(isset($json[0]['PK_act'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Ups. No tenemos nada que mostrarte!!'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'Error al tratar de cargar informacion!! '));

	}


	mysqli_close($con);
?>