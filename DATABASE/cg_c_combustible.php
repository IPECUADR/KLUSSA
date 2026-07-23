<?php


require('../CONFIG/sys.res.con.php');



$query = "SELECT 
         PK_co_vh_ag as id,
         fc_in_c_vh_ag AS fc, 
         maquina.serie_maquina as serie,
         maquina.des_vehiculo as vehiculo,
         t_vehiculo.tipo_vehiculo as vh, 
         t_vehiculo.clf_comb_rhom as clf, 
         mes.mes_res as mes, 
         proyectos.proyecto as ag, 
         con_gal_vh_ag as gl, 
         con_lit_vh_ag as li, 
         rp_in_c_vh_ag as rp,
         t_combustible.t_com as com

      FROM 

         c_co_vh_ag,
         mes,
         maquina,
         t_combustible,
         proyectos, 
         t_vehiculo

      WHERE

         mes.PK_mes = c_co_vh_ag.FK_mes
         AND maquina.PK_maquina = c_co_vh_ag.FK_maquina
         AND t_combustible.PK_t_com = c_co_vh_ag.FK_t_com
         AND proyectos.PK_pro = c_co_vh_ag.FK_pro
         AND t_vehiculo.PK_t_vehiculo = maquina.FK_t_vehiculo
      ORDER BY
         c_co_vh_ag.fc_in_c_vh_ag ASC,
         proyectos.proyecto ASC,
         c_co_vh_ag.PK_co_vh_ag ASC
      
      ";

$result = mysqli_query($con, $query);



if ($result) {

   $json = array('err' => false);
   while ($row = mysqli_fetch_array($result)) {
      $json[] = array(

         'id' => $row['id'],
         'fc' => $row['fc'],
         'serie' => $row['serie'],
         'vehiculo' => $row['vehiculo'],
         'clf' => $row['clf'],
         'mes' => $row['mes'],
         'ag' => $row['ag'],
         'gl' => $row['gl'],
         'li' => $row['li'],
         'rp' => $row['rp'],
         'com' => $row['com'],
         'vh' => $row['vh']

      );
   }
   if (isset($json[0]['id'])) {
      echo json_encode($json);
   } else {
      echo json_encode(array('err' => true, 'mensaje' => 'Ups. No tenemos nada que mostrarte!!'));
   }
} else {

   echo json_encode(array('err' => true, 'mensaje' => 'ERROR EN BDD '));
}


mysqli_close($con);
