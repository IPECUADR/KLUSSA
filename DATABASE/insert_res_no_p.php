<?php
require('../CONFIG/sys.res.con.php');

// Recibir datos exactamente como vienen del formulario
$mes               = $_POST['cbx_mes'];
$kg                = $_POST['ct_kg'];
$ton               = $_POST['ct_ton'];
$comprobante       = $_POST['comprobante'];
$gestora           = $_POST['cbx_gestora'];  // FK_em_gest
$responsable       = $_POST['responsable'];  // res_gestion
$cargo_responsable = $_POST['cargo_responsable'];
$agencia           = $_POST['cbx_agencia'];

// SQL para insertar en la tabla desechos_no_peligrosos
$sql = "INSERT INTO desechos_no_peligrosos 
  (FK_mes, ct_kg, ct_ton, comp, FK_em_gest, res_gestion, cargo_res_g, FK_agencia)
  VALUES 
  ('$mes', '$kg', '$ton', '$comprobante', '$gestora', '$responsable', '$cargo_responsable', '$agencia')";

if (mysqli_query($con, $sql)) {
    echo json_encode(['err' => false, 'mensaje' => 'Registro insertado correctamente']);
} else {
    echo json_encode(['err' => true, 'mensaje' => 'Error al insertar: ' . mysqli_error($con)]);
}

mysqli_close($con);
?>