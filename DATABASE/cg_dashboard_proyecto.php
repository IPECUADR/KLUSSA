<?php
require('conexion.php');

$id = $_POST['id_proyecto']; // ID del plan seleccionado

$query = "SELECT 
         estado_act.des_estado_act AS estado, 
         COUNT(*) AS total,
         ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS porcentaje
          FROM 
            programacion
            INNER JOIN estado_act ON estado_act.PK_est_act = programacion.FK_est_act
            INNER JOIN actividades ON actividades.PK_act = programacion.FK_act
            INNER JOIN aspecto_ambiental ON aspecto_ambiental.PK_asp_amb = actividades.FK_asp_amb
            INNER JOIN sub_plan ON sub_plan.PK_sub = aspecto_ambiental.FK_sub
            INNER JOIN planes ON planes.PK_plan = sub_plan.FK_plan
          WHERE 
            planes.PK_plan = $id
          GROUP BY 
            estado_act.des_estado_act;
";

$result = mysqli_query($con, $query);

$labels = [];
$values = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $labels[] = $row['estado'];      // Ej: Pendiente, Ejecutado, Reprogramado
        $values[] = $row['porcentaje'];
    
    }
}

echo json_encode([
    "labels" => $labels,
    "values" => $values
]);

mysqli_close($con);
