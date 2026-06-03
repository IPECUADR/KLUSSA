<?php
require('../CONFIG/sys.res.con.php');

// Recibir datos del formulario exactamente como vienen
   $fechaEntrega = $_POST['fechaEntrega'];
    $mes          = $_POST['mes'];
    $codigo       = $_POST['codigo'];
    $agencia      = $_POST['agencia'];
    $ub           = $_POST['ub'];
    $mq           = $_POST['mq'];
    $kg           = $_POST['kg'];
    $ton          = $_POST['ton'];
    $lt           = $_POST['lt'];
    $gl           = $_POST['gl'];
    $gestora      = $_POST['gestora'];
    $responsable  = $_POST['responsable'];
    $manifesto    = $_POST['manifesto'];
    $cargo        = $_POST['cargo'];
    $descrip      = $_POST['descrip'];
    $ct_trans     = $_POST['ct_trans'];
    $ct_gest      = $_POST['ct_gest'];
    

    $total = $ct_gest + $ct_trans; // Costo total sumando transporte y gestor

// Ahora con manifiesto también
$sql = "INSERT INTO dispocicion 
  (fc_disp,FK_mes,FK_res,FK_pro,FK_ub, FK_mq, FK_gest,ct_kg, ct_tn, ct_lit, ct_gl, mnft, cargo,  resp_des, des_des, ct_trasporte_des, ct_gestor_des, ct_total_des)
  VALUES 
  ('$fechaEntrega', '$mes', '$codigo','$agencia', '$ub', '$mq', '$gestora','$kg', '$ton', '$lt', '$gl',  '$manifesto', '$cargo','$responsable', '$descrip', '$ct_trans', '$ct_gest', '$total')";

if (mysqli_query($con, $sql)) {
    echo json_encode(['success' => true, 'mensaje' => 'Registro insertado correctamente']);
} else {
    echo json_encode(['success' => false, 'mensaje' => 'Error al insertar: ' . mysqli_error($con)]);
}

mysqli_close($con);
?>
