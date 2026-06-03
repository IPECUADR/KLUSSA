<?php
require('../CONFIG/sys.res.con.php');

$id = $_POST['id'];
$noche_ini = $_POST['noche_ini'];
$noche_fin = $_POST['noche_fin'];
$consumo = $_POST['consumo'];
$litros = $_POST['litros'];

$b = "SELECT * FROM c_ag_posos WHERE PK_c_ag_ps = $id ";
$res = mysqli_query($con, $b);

if ($res){

  $datos = mysqli_fetch_array($res);
  
  $consumo_actual = $datos['cm_t_gl_c_ag_ps'];
  $litros_actual = $datos['cm_t_li_c_ag_ps'];

 $total_consumo = $consumo_actual + $consumo;
 $total_litros = $litros_actual + $litros;



   $up = "UPDATE c_ag_posos SET t_n_md_in = '$noche_ini', t_n_md_fn = '$noche_fin', cm_t_gl_c_ag_ps = '$total_consumo' , 	cm_t_li_c_ag_ps = '$total_litros'  WHERE PK_c_ag_ps = $id ";

      $update = mysqli_query($con, $up);

        if ($update) {
            echo json_encode(array('err'=>false, 'status'=>'success','mensaje'=>'Actualizacion exitosa .'));
          } else {

            echo json_encode(['err' => true, 'status'=>'err','mensaje' => 'Error al insertar: ' . mysqli_error($con)]);

              mysqli_error($con);
          }



}else{

  echo json_encode(['err' => true, 'status'=>'err','mensaje' => 'Error al Actualizar: ' . mysqli_error($con)]);

    mysqli_error($con);
}


 


mysqli_close($con);
?>
