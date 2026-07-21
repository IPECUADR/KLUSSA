<?php


require('../CONFIG/sys.res.con.php');



$query = "SELECT 

   fc_in_en_ag as fi, 
   fc_fn_en_ag as fn, 
   mes.mes_res as mes,
   proyectos.proyecto as pro,
   c_en_ag as c, 
   rp_rg_en_ag as p, 
   PK_c_en_ag AS id,
   c_en_ag.FK_mes AS FK_mes,
   c_en_ag.FK_ag AS FK_ag


 FROM

      c_en_ag, 
      
      proyectos, 

      mes

 WHERE

      proyectos.PK_pro = c_en_ag.FK_ag 
      AND mes.PK_mes = c_en_ag.FK_mes 

 ORDER BY
    c_en_ag.fc_in_en_ag ASC,
    c_en_ag.fc_fn_en_ag ASC,
    c_en_ag.PK_c_en_ag ASC
 ";


$result = mysqli_query($con, $query);



if ($result) {

     $json = array('err' => false);
     while ($row = mysqli_fetch_array($result)) {
          $json[] = array(

               'fi' => $row['fi'],
               'fn' => $row['fn'],
               'mes' => $row['mes'],
               'pro' => $row['pro'],
               'c' => $row['c'],
               'p' => $row['p'],
               'id' => $row['id'],
               'FK_mes' => $row['FK_mes'],
               'FK_ag' => $row['FK_ag']


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
