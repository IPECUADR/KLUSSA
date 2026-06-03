<?php
require('../CONFIG/sys.res.con.php');

$query = "SELECT * FROM ubicacion ORDER BY ubicacion ASC";
$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'PK_ub'  => $row['PK_ub'],
            'ubicacion' => $row['ubicacion']
        );
    }
    echo json_encode($json);
} else {
    echo json_encode(array('err' => true, 'mensaje' => 'Error cargando manifiestos'));
}

mysqli_close($con);
?>
