<?php 




require('conexion.php');






$subplan = $_POST['subplan'] ;

  $query="SELECT * FROM aspecto_ambiental  where FK_sub  = $subplan ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(

                        'aspecto_amb'=>  utf8_encode($row['aspecto_amb']),
                        'PK_asp_amb'=>  $row['PK_asp_amb'],
                    
                         
                     );

                  }
                  if(isset($json[0]['PK_asp_amb'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'No tenemos nada que mostrarte.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'Error a nivel de sistema'));

	}


	mysqli_close($con);
?>