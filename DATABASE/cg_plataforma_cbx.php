<?php
require('../CONFIG/sys.res.con.php');

$query = "SELECT PK_ub_rp, ubicaion_rp FROM ub_rp ORDER BY ubicaion_rp ASC";
$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'PK_plataforma'  => $row['PK_ub_rp'],
            'plataforma_nom' => $row['ubicaion_rp']
        );
    }
    echo json_encode($json);
} else {
    echo json_encode(array('err' => true, 'mensaje' => 'Error cargando ubicaciones'));
}

mysqli_close($con);
?>
