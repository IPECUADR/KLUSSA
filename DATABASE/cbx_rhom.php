<?php
require('../CONFIG/sys.res.con.php');

$query = "SELECT * FROM clf_sis_r ORDER BY PK_clf_sis_r ASC";
$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'PK_clf_sis_r'  => $row['PK_clf_sis_r'],
            'clf_sis_r' => $row['clf_sis_r']
        );
    }
    echo json_encode($json);
} else {
    echo json_encode(array('err' => true, 'mensaje' => 'Error cargando manifiestos'));
}

mysqli_close($con);
?>
