<?php 


require('../CONFIG/sys.res.con.php');



  $query="SELECT 
  
  fc_in_ca_ag as fc_inicio, 
  fc_crt_ca_ag as fc_corte,
  mes_res as mes, 
  proyecto as sede,
  cm_m_c as m_cubicos, 
  cm_lit as litros,
  user_reg as usuario,
  PK_ca_ag as id


  from 
  
  c_agua_ag, 
  mes,
  proyectos
  
  WHERE
  
      mes.PK_mes = c_agua_ag.FK_mes
  AND proyectos.PK_pro  = c_agua_ag.FK_ag 

  
  
  ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        
                        'fc_inicio'=> $row['fc_inicio'],
                        'fc_corte'=> $row['fc_corte'],
                        'mes'=> $row['mes'],
                        'sede'=> $row['sede'],
                        'm_cubicos'=> $row['m_cubicos'],
                        'litros'=> $row['litros'],
                        'usuario'=> $row['usuario'],
                        'id'=> $row['id']
                     );

                  }
                  if(isset($json[0]['id'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Ups. No tenemos nada que mostrarte!!'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'ERROR EN BDD '));

	}


	mysqli_close($con);
?>