<?php
require('../CONFIG/sys.res.con.php');

$query = "SELECT * FROM maquina ORDER BY serie_maquina ASC";
$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'PK_maquina'  => $row['PK_maquina'],
            'serie_maquina' => $row['serie_maquina']
        );
    }
    echo json_encode($json);
} else {
    echo json_encode(array('err' => true, 'mensaje' => 'Error cargando elementos'));
}

mysqli_close($con);
?>