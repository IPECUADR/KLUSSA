<?php 





require('../CONFIG/sys.res.con.php');












$query="SELECT 
    
    clf_desechos.clf_desechos as tipo ,
    clf_desechos.PK_clf_des as id, 
    COUNT(residuos.id_res) AS total_residuos

 FROM 
 
    residuos,
    t_residuo,
    clf_sis_r,
    clf_desechos

WHERE 
    clf_sis_r.PK_clf_sis_r = residuos.FK_clf_sis_r
    AND clf_desechos.PK_clf_des = residuos.FK_clf_res
    AND t_residuo.PK_t_res = residuos.FK_t_res

GROUP BY 
   tipo ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        
                        'tipo'=> $row['tipo'],
                        'id'=> $row['id'],
                        'total_residuos'=> $row['total_residuos']
                   
                         
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