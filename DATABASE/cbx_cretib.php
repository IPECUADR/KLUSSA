<?php
require('../CONFIG/sys.res.con.php');

$query = "SELECT * FROM certib ORDER BY PK_ceti ASC";
$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'PK_ceti'  => $row['PK_ceti'],
            'CRTIB' => $row['CRTIB']
        );
    }
    echo json_encode($json);
} else {
    echo json_encode(array('err' => true, 'mensaje' => 'Error cargando manifiestos'));
}

mysqli_close($con);
?>
