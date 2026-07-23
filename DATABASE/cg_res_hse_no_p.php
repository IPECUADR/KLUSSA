<?php 




require('../CONFIG/sys.res.con.php');








  $query="SELECT * 

            FROM
            dispocicion, 
            proyectos, 
            ubicacion, 
            residuos, 
            maquina, 
            gestor, 
            mes, 
            clf_sis_r, 
            clf_desechos, 
            t_residuo

      where

      proyectos.PK_pro = dispocicion.FK_pro
      and ubicacion.PK_ub = dispocicion.FK_ub
      and residuos.id_res = dispocicion.FK_res
      and  maquina.PK_maquina = dispocicion.FK_mq
      and gestor.PK_gestor = dispocicion.FK_gest
      and mes.PK_mes = dispocicion.FK_mes
      and clf_sis_r.PK_clf_sis_r = residuos.FK_clf_sis_r
      and clf_desechos.PK_clf_des = residuos.FK_clf_res
      and t_residuo.PK_t_res = residuos.FK_t_res
      and clf_desechos.PK_clf_des = 2   /* No Peligrosos */
   
   ORDER BY 
    mes.PK_mes ASC,
    proyectos.proyecto ASC,
    fc_disp ASC;

         
   
          ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                       
                           'fc_disp'           => $row['fc_disp'],
                           'PK_disp'           => $row['PK_disp'],
                           'des_des'           => $row['des_des'],
                           'resp_des'          => $row['resp_des'],
                           'mnft'              => $row['mnft'],
                           'cargo'             => $row['cargo'],
                           'proyecto'          => $row['proyecto'],       // en vez de ubicaion_rp
                           'provincia'         => $row['provincia'],      // en vez de elemnto_rp
                           'ubicacion'         => $row['ubicacion'],      // valor real
                           'code_res'          => $row['code_res'],
                           'descrip_residuo'   => $row['descrip_residuo'],
                           'serie_maquina'     => $row['serie_maquina'],
                           'T_maquina' => $row['T_maquina'] ?? '',
                           'ct_kg'             => $row['ct_kg'],
                           'ct_tn'             => $row['ct_tn'],
                           'ct_lit'            => $row['ct_lit'],
                           'ct_gl'             => $row['ct_gl'],
                           'ct_total_des'      => $row['ct_total_des'],
                           'ct_gestor_des'      => $row['ct_gestor_des'],
                           'ct_trasporte_des'   => $row['ct_trasporte_des'],
                           'gestor_res'        => $row['gestor_res'],
                           'mes_res'           => $row['mes_res'],
                           'clf_sis_r'         => $row['clf_sis_r'],
                           'clf_desechos'      => $row['clf_desechos'],
                           't_residuo'         => $row['t_residuo']


                     );

                  }
                  if(isset($json[0]['PK_disp'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Ups. No tenemos nada que mostrarte!!'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'Error al tratar de cargar informacion!! '));

	}


	mysqli_close($con);
?>