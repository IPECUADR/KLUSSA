<?php
require('conexion.php');

$id = $_POST['oficina'];

// Consulta
$query = " SELECT 

 *
  FROM 
  planes,
  sub_plan,
  programacion,
  aspecto_ambiental, 
  estado_act, 
  actividades

  WHERE 
   planes.PK_plan = sub_plan.FK_plan
   AND sub_plan.PK_sub = aspecto_ambiental.FK_sub
   AND aspecto_ambiental.PK_asp_amb = actividades.FK_asp_amb
   AND actividades.PK_act = programacion.FK_act
   AND estado_act.PK_est_act = programacion.FK_est_act
   AND planes.PK_plan = $id";

$result = mysqli_query($con, $query);

$eventos = [];

if ($result) {
  while ($row = mysqli_fetch_assoc($result)) {

   $color = 'gray';
    if ($row['FK_est_act'] == 1) $color = 'blue';    // Ejemplo: estado 1 → verde
    if ($row['FK_est_act'] == 2) $color = 'green';  // estado 2 → naranja
    if ($row['FK_est_act'] == 3) $color = 'red';     // estado 3 → rojo

    $eventos[] = [
      'id'    => $row['PK_prg'],
      'title' =>utf8_encode($row['rp_ac_ec']) . " - " .utf8_encode($row['aspecto_amb'] ). " (" . utf8_encode($row['des_estado_act'] ). ")",
      'subtitulo'   => utf8_encode($row['aspecto_amb']),
      'start' => $row['fc_pr_ac'],
      'estado'   =>utf8_encode($row['des_estado_act']),
      'allDay' => true,
      'color'  => $color, 
      'subtitulo'   => utf8_encode($row['aspecto_amb']),
      'descripcion'   => utf8_encode($row['medida']),
      'nombre'   => utf8_encode($row['rp_ac_ec']), 
      'fecha'   => utf8_encode($row['fc_pr_ac']), 
       'des'   => utf8_encode($row['evidencia_des']), 
       'doc'   => $row['evidencia_arc']
    ];
  }
}

// Devuelve SOLO eventos (FullCalendar los necesita como array)
header('Content-Type: application/json');
echo json_encode($eventos);

	mysqli_close($con);
?>

