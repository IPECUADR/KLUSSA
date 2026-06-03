<?php
require('../CONFIG/sys.res.con.php');

$query = "SELECT * FROM t_vehiculo ORDER BY PK_t_vehiculo ASC";
$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'PK_t_vehiculo'  => $row['PK_t_vehiculo'],
            'tipo_vehiculo' => strtoupper($row['tipo_vehiculo'])
        );
    }
    echo json_encode($json);
} else {
    echo json_encode(array('err' => true, 'mensaje' => 'Error cargando elementos'));
}

mysqli_close($con);
?>