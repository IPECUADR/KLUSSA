<?php 




require('conexion.php');






$plan = $_POST['plan'] ;

  $query="SELECT * FROM sub_plan WHERE FK_plan = $plan ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(

                        'sub_plan'=>  utf8_encode($row['sub_plan']),
                        'PK_sub'=>  $row['PK_sub'],
                    
                         
                     );

                  }
                  if(isset($json[0]['PK_sub'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'No tenemos nada que mostrarte.'));	
                  }

	
                  
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'Error a nivel de sistema'));

	}


	mysqli_close($con);
?>