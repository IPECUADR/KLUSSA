<?php 


require('../CONFIG/sys.res.con.php');



  $query="SELECT 

   fc_in_c_ad as fr, 
   maquina.serie_maquina as mq,
   c_aditivos.pozo_c_ad as pz,
   aditivos_rs.ad_rs as ad,
   c_aditivos.kg_c_ad as kg,
   c_aditivos.lit_c_ad as lt,
   mes.mes_res as mes,
   proyectos.proyecto as pro,
   c_aditivos.PK_c_ad as id,
   c_aditivos.rp_in_c_ad as rp

 FROM

      aditivos_rs,
      c_aditivos,
      maquina,
      proyectos, 
      mes

 WHERE

       proyectos.PK_pro = c_aditivos.FK_pro 
       AND mes.PK_mes = c_aditivos.FK_mes 
       AND aditivos_rs.PK_ad  = c_aditivos.FK_ad_rs 
       AND maquina.PK_maquina   = c_aditivos.FK_maquina    

 ORDER BY

       FK_mes ASC";


	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        
                        'fr'=> $row['fr'],
                        'mq'=> $row['mq'],
                        'mes'=> $row['mes'],
                        'pro'=> $row['pro'],
                        'pz'=> $row['pz'],
                        'ad'=> $row['ad'], 
                        'lt'=> $row['lt'],
                        'kg'=> $row['kg'],
                        'id'=> $row['id'],
                        'rp'=> $row['rp']
                     

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