<?php 

require('../CONFIG/sys.res.con.php');


  $query="SELECT * from proyectos ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        
                        'PK_pro'=> $row['PK_pro'],
                        'proyecto'=> $row['proyecto'],
                        'provincia'=> $row['provincia']
              
                         
                     );

                  }
                  if(isset($json[0]['PK_pro'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Datos incorrectos.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'ERROR EN BDD '));

	}


	mysqli_close($con);
?>