<?php

// Catálogo dinámico de clasificaciones RHOMB utilizadas
// en los registros de consumo de combustible por victor alvarez.

require('../CONFIG/sys.res.con.php');

header('Content-Type: application/json; charset=utf-8');

$query = "
    SELECT DISTINCT
        TRIM(t_vehiculo.clf_comb_rhom) AS clf_comb_rhom
    FROM c_co_vh_ag
    INNER JOIN maquina
        ON maquina.PK_maquina = c_co_vh_ag.FK_maquina
    INNER JOIN t_vehiculo
        ON t_vehiculo.PK_t_vehiculo = maquina.FK_t_vehiculo
    WHERE t_vehiculo.clf_comb_rhom IS NOT NULL
      AND TRIM(t_vehiculo.clf_comb_rhom) != ''
    ORDER BY clf_comb_rhom ASC
";

$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);

    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'clf_comb_rhom' => $row['clf_comb_rhom']
        );
    }

    echo json_encode($json, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(
        array(
            'err' => true,
            'mensaje' => 'Error al cargar clasificaciones RHOMB de combustible'
        ),
        JSON_UNESCAPED_UNICODE
    );
}

mysqli_close($con);