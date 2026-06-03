<?php 




require('conexion.php');

$id_ac = $_POST['id_ac'];






  $query="SELECT * 
  
  FROM 
  
  programacion, 
  estado_act
  
  WHERE 
  
  FK_act = $id_ac 
  
  AND  estado_act.PK_est_act = programacion.FK_est_act ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        'PK_prg'=> $row['PK_prg'],
                        'rp_ac_ec'=> utf8_encode($row['rp_ac_ec']),
                        'evidencia_des'=> utf8_encode($row['evidencia_des']),
                        'evidencia_arc'=> utf8_encode($row['evidencia_arc']),
                        'des_estado_act'=> utf8_encode( $row['des_estado_act']),
                        'fc_pr_ac'=> $row['fc_pr_ac'],
                        'fc_up_rp_ac'=> $row['fc_up_rp_ac'],
                        'FK_est_act'=> $row['FK_est_act'],
                     );

                  }
                  if(isset($json[0]['PK_prg'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'No tenemos programación para esta actividad.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'¡Usuario o contraseña, incorrectos!! '));

	}


	mysqli_close($con);
?>