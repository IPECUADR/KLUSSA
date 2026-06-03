<?php
require('../CONFIG/sys.res.con.php');

$id = $_POST['id'] ?? null;
$campo = $_POST['campo'] ?? null;
$update_dato = $_POST['update_dato'] ?? null;

$up = "UPDATE c_co_vh_ag SET $campo = '$update_dato' WHERE PK_co_vh_ag = $id ";

$update = mysqli_query($con, $up);

if ($update) {
   echo json_encode(array('err'=>false, 'status'=>'success','mensaje'=>'Actualizacion exitosa .'));
} else {

  echo json_encode(['err' => true, 'status'=>'err','mensaje' => 'Error al insertar: ' . mysqli_error($con)]);

    mysqli_error($con);
}


mysqli_close($con);
?>
