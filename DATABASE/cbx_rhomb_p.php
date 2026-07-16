<?php

// Catálogo RHOMB asociado únicamente a residuos peligrosos.

require('../CONFIG/sys.res.con.php');

header('Content-Type: application/json; charset=utf-8');

$query = "
    SELECT DISTINCT
        clf_sis_r.PK_clf_sis_r,
        clf_sis_r.clf_sis_r
    FROM clf_sis_r
    INNER JOIN residuos
        ON residuos.FK_clf_sis_r = clf_sis_r.PK_clf_sis_r
    WHERE residuos.FK_clf_res = 1
    ORDER BY clf_sis_r.clf_sis_r ASC
";

$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);

    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'PK_clf_sis_r' => $row['PK_clf_sis_r'],
            'clf_sis_r'    => $row['clf_sis_r']
        );
    }

    echo json_encode($json, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(
        array(
            'err' => true,
            'mensaje' => 'Error al cargar clasificaciones RHOMB de residuos peligrosos'
        ),
        JSON_UNESCAPED_UNICODE
    );
}

mysqli_close($con);
?>