<?php
require('../CONFIG/sys.res.con.php');

    $id = $_POST['id'];
    $sn_maquina = $_POST['sn_maquina'];
    $des_vhiculo = $_POST['des_vhiculo'];



$bs = "SELECT * FROM maquina WHERE serie_maquina = '$sn_maquina' AND PK_maquina != $id ";

$br = mysqli_query($con, $bs);

$data = mysqli_fetch_array($br);


if ($data) {
    echo json_encode(['err' => true, 'status'=>'warning','mensaje' => 'La serie de la maquina ya existe.']);
    exit();
}


$up = "UPDATE maquina  SET serie_maquina = '$sn_maquina', des_vehiculo = '$des_vhiculo' WHERE PK_maquina   = $id ";


    $update = mysqli_query($con, $up);

        if ($update) {
          echo json_encode(array('err'=>false, 'status'=>'success','mensaje'=>'Actualizacion exitosa .'));
        } else {

          echo json_encode(['err' => true, 'status'=>'error','mensaje' => 'Error al insertar: ' . mysqli_error($con)]);

            mysqli_error($con);
        }


mysqli_close($con);
?>
