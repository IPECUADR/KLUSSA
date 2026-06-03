<?php 





require('../CONFIG/sys.res.con.php');












  $query="SELECT * from t_residuo ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        
                        't_residuo'=> $row['t_residuo'],
                        'icono_res'=> $row['icono_res'],
                        'des_res'=> $row['des_res'],
                        'PK_t_res'=> $row['PK_t_res'],
                         
                     );

                  }
                  if(isset($json[0]['PK_t_res'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Datos incorrectos.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'ERROR EN BDD '));

	}


	mysqli_close($con);
?>