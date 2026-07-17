<?php

// Catálogo dinámico de pozos registrados en consumo de agua.

require('../CONFIG/sys.res.con.php');

header('Content-Type: application/json; charset=utf-8');

$query = "
    SELECT DISTINCT
        TRIM(pozo_c_ag_ps) AS pozo
    FROM c_ag_posos
    WHERE pozo_c_ag_ps IS NOT NULL
      AND TRIM(pozo_c_ag_ps) != ''
    ORDER BY pozo ASC
";

$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);

    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'pozo' => $row['pozo']
        );
    }

    echo json_encode($json, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(
        array(
            'err' => true,
            'mensaje' => 'Error al cargar los pozos registrados'
        ),
        JSON_UNESCAPED_UNICODE
    );
}

mysqli_close($con);