<?php 




require('../CONFIG/sys.res.con.php');








  $query="SELECT * 

            FROM 
            desechos_peligrosos, 
            agencia_rp, 
            certib, 
            empresa_gestora, 
            code_hse_res_p, 
            mes_reg,
            ub_rp, 
            elemnto_rp,
            t_residuo, 
            clf_sis_rh
  
            WHERE

            agencia_rp.PK_agencia = desechos_peligrosos.FK_agencia
            AND mes_reg.PK_mes = desechos_peligrosos.FK_mes
            AND empresa_gestora.PK_em_gest = desechos_peligrosos.FK_em_gest
            AND code_hse_res_p.PK_cd_hse_rp = desechos_peligrosos.FK_cd_hse_rp
            AND ub_rp.PK_ub_rp = desechos_peligrosos.FK_ub_rp
            AND elemnto_rp.PK_elm_rp = desechos_peligrosos.FK_elm_rp
            AND certib.PK_cert = code_hse_res_p.FK_cer
            AND t_residuo.PK_t_res = code_hse_res_p.FK_t_res_p
            AND clf_sis_rh.PK_clf_sis_rhom = code_hse_res_p.FK_clf_rp_rh ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                       
                        'fc_entrega_d_p'=> $row['fc_entrega_d_p'],
                        'PK_d_p'=> $row['PK_d_p'],
                        'mes'=> $row['mes'],
                        'des_rp'=> $row['des_rp'],
                        'empresa_ges'=> $row['empresa_ges'],
                        'code_rp'=> $row['code_rp'],
                        'ubicaion_rp'=> $row['ubicaion_rp'],
                        'elemnto_rp'=> $row['elemnto_rp'],
                        'elemnto_rp'=> $row['elemnto_rp'],
                        't_res'=> $row['t_res'],
                        'agencia'=> $row['agencia'],
                        'clf_sis_rh'=> $row['clf_sis_rh'],
                        'cert_des'=> $row['cert_des'],
                        'ct_kg'=> $row['ct_kg'],
                        'ct_ton'=> $row['ct_ton'],
                        'ct_lt'=> $row['ct_lt'],
                        'ct_gl'=> $row['ct_gl'],
                        'clbr_entrega'=> $row['clbr_entrega'],
                     );

                  }
                  if(isset($json[0]['PK_d_p'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Ups. No tenemos nada que mostrarte!!'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'Error al tratar de cargar informacion!! '));

	}


	mysqli_close($con);
?>