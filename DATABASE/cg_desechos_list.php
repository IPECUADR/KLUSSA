<?php 





require('../CONFIG/sys.res.con.php');


$data = $_POST['data'];


$query="SELECT 
    
   residuos.id_res as pk, 
   residuos.descrip_residuo as res , 
   residuos.code_res as code

 FROM 
 
    residuos

WHERE 
  
    residuos.FK_t_res = $data ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        
                        'pk'=> $row['pk'],
                        'res'=> $row['res'],
                        'code'=> $row['code']
                   
                         
                     );

                  }
                  if(isset($json[0]['pk'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Datos incorrectos.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'ERROR EN BDD '));

	}


	mysqli_close($con);
?>