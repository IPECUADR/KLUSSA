<?php
require('../CONFIG/sys.res.con.php');

$query = "SELECT PK_mnf, numero_manifesto FROM manifesto ORDER BY numero_manifesto ASC";
$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'PK_mnf'  => $row['PK_mnf'],
            'mnf_nom' => $row['numero_manifesto']
        );
    }
    echo json_encode($json);
} else {
    echo json_encode(array('err' => true, 'mensaje' => 'Error cargando manifiestos'));
}

mysqli_close($con);
?>
