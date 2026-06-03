<?php
require('../CONFIG/sys.res.con.php');

$query = "SELECT PK_em_gest, empresa_ges FROM empresa_gestora ORDER BY empresa_ges ASC";
$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'PK_gestora'  => $row['PK_em_gest'],
            'gestora_nom' => $row['empresa_ges']
        );
    }
    echo json_encode($json);
} else {
    echo json_encode(array('err' => true, 'mensaje' => 'Error cargando gestoras'));
}

mysqli_close($con);
?>
