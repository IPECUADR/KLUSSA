<?php
require('../CONFIG/sys.res.con.php');

$query = "SELECT  * FROM gestor ORDER BY gestor_res ASC";
$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'PK_gestor'  => $row['PK_gestor'],
            'gestor_res' => strtoupper( $row['gestor_res'])
        );
    }
    echo json_encode($json);
} else {
    echo json_encode(array('err' => true, 'mensaje' => 'Error cargando gestoras'));
}

mysqli_close($con);
?>
