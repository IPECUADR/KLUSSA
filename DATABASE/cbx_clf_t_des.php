<?php
require('../CONFIG/sys.res.con.php');

$query = "SELECT * FROM clf_desechos ORDER BY PK_clf_des ASC";
$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'PK_clf_des'  => $row['PK_clf_des'],
            'clf_desechos' => $row['clf_desechos']
        );
    }
    echo json_encode($json);
} else {
    echo json_encode(array('err' => true, 'mensaje' => 'Error cargando manifiestos'));
}

mysqli_close($con);
?>
