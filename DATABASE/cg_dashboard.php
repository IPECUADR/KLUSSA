<?php
require('conexion.php');

// Consulta: cantidad de actividades agrupadas por estado
$query = "
  SELECT estado_act.des_estado_act AS estado, COUNT(*) AS total
  FROM programacion
  INNER JOIN estado_act ON estado_act.PK_est_act = programacion.FK_est_act
  GROUP BY estado_act.des_estado_act
";

$result = mysqli_query($con, $query);

$labels = [];
$values = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $labels[] = $row['estado'];     // Ejemplo: Pendiente, Ejecutado
        $values[] = (int)$row['total']; // Ejemplo: 5, 3
    }
}

echo json_encode([
    "labels" => $labels,
    "values" => $values
]);

mysqli_close($con);
