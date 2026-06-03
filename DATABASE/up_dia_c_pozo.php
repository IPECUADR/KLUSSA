<?php
require('../CONFIG/sys.res.con.php');

$id = $_POST['id'];
$dia_ini = $_POST['dia_ini'];
$dia_fin = $_POST['dia_fin'];
$consumo = $_POST['consumo'];
$litros = $_POST['litros'];

$b = "SELECT * FROM c_ag_posos WHERE PK_c_ag_ps = $id ";
$res = mysqli_query($con, $b);

if ($res){

  $datos = mysqli_fetch_array($res);
  
  $consumo_actual = $datos['cm_t_gl_c_ag_ps'];
  $litros_actual = $datos['cm_t_li_c_ag_ps'];


   $up = "UPDATE c_ag_posos SET t_d_md_in = '$dia_ini', t_d_md_fn = '$dia_fin', cm_t_gl_c_ag_ps = '$consumo' , 	cm_t_li_c_ag_ps = '$litros', t_n_md_in= 0 , t_n_md_fn= 0 WHERE PK_c_ag_ps = $id ";

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
