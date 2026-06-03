<?php 

require('../CONFIG/sys.res.con.php');


  $query="SELECT 

               maquina.serie_maquina as sn,
               t_vehiculo.tipo_vehiculo as t, 
               maquina.des_vehiculo as d,
               maquina.PK_maquina as id,
               t_vehiculo.PK_t_vehiculo as clf
            
            FROM 
            
               maquina,
               t_vehiculo 

            WHERE 
            
               t_vehiculo.PK_t_vehiculo = maquina.FK_t_vehiculo";


$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        
                        'id'=> $row['id'],
                        'sn'=> strtoupper($row['sn']),
                        'd'=> $row['d'],
                        't'=> $row['t'],
                        'clf'=> $row['clf']
              
                         
                     );

                  }
                  if(isset($json[0]['id'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Datos incorrectos.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'ERROR EN BDD '));

	}


	mysqli_close($con);
?>