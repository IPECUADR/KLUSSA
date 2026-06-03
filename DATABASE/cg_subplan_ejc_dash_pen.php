<?php
require('conexion.php');

$query = "SELECT 
        sub_plan.sub_plan AS nombre_subplan,
        COUNT(*) AS total
    FROM 
        programacion
        INNER JOIN actividades ON actividades.PK_act = programacion.FK_act
        INNER JOIN aspecto_ambiental ON aspecto_ambiental.PK_asp_amb = actividades.FK_asp_amb
        INNER JOIN sub_plan ON sub_plan.PK_sub = aspecto_ambiental.FK_sub
        INNER JOIN estado_act ON estado_act.PK_est_act = programacion.FK_est_act
    WHERE
        estado_act.PK_est_act = 1
    GROUP BY 
        sub_plan.sub_plan
    ORDER BY 
        nombre_subplan;
";

$result = mysqli_query($con, $query);

$data = [];
$totalGeneral = 0;

// Primero sumamos el total general
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $totalGeneral += (int)$row['total'];
        // Guardamos datos preliminares
        $data[] = [
            'nombre_subplan' => utf8_encode($row['nombre_subplan']),
            'total' => (int)$row['total']
        ];
    }
}

// Ahora calculamos porcentaje
foreach ($data as &$item) {
    if ($totalGeneral > 0) {
        $item['porcentaje'] = round(($item['total'] / $totalGeneral) * 100, 2);
    } else {
        $item['porcentaje'] = 0;
    }
}

echo json_encode($data);

mysqli_close($con);
