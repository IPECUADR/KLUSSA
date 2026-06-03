<?php 


require('../CONFIG/sys.res.con.php');



  $query="SELECT 

      c_ag_posos.fc_in_p_c_ag_ps as fi,
      mes.mes_res as mes,
      c_ag_posos.pozo_c_ag_ps as ps,
      c_ag_posos.fc_fn_p_c_ag_ps as fn, 
      proyectos.proyecto as pro, 
      c_ag_posos.cm_t_gl_c_ag_ps as t_gl, 
      c_ag_posos.cm_t_li_c_ag_ps as t_l,
      c_ag_posos.PK_c_ag_ps as id, 
      c_ag_posos.t_d_md_in as dia_ini,
      c_ag_posos.t_d_md_fn as dia_fin,
      c_ag_posos.t_n_md_in as noche_ini,
      c_ag_posos.t_n_md_fn as noche_fin, 
      maquina.serie_maquina as maquina, 
      comts_c_ag_pz



 FROM

      ubicacion, 
      maquina, 
      proyectos, 
      c_ag_posos,
      mes

 WHERE

      ubicacion.PK_ub = c_ag_posos.FK_ubicacion
      AND maquina.PK_maquina = c_ag_posos.FK_maquina
      AND proyectos.PK_pro = c_ag_posos.FK_pro
      AND mes.PK_mes = c_ag_posos.FK_mes

 ORDER BY

       FK_mes ASC";


	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        
                        'fi'=> $row['fi'],
                        'fn'=> $row['fn'],
                        'mes'=> $row['mes'],
                        'sede'=> $row['pro'],
                        'gal'=> $row['t_gl'],
                        'litros'=> $row['t_l'],
                        'id'=> $row['id'], 
                        'pozo'=> $row['ps'],
                        'dia_ini'=> $row['dia_ini'],
                        'dia_fin'=> $row['dia_fin'],
                        'noche_ini'=> $row['noche_ini'],
                        'noche_fin'=> $row['noche_fin'],
                        'maquina'=> $row['maquina'],
                        'comts_c_ag_pz'=> $row['comts_c_ag_pz']

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