<?php
require('../CONFIG/sys.res.con.php');

$query = "SELECT * FROM residuos WHERE FK_clf_res = 2 ORDER BY code_res ASC";
$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'id_res'   => $row['id_res'],
            'descrip_residuo'  => strtoupper($row['descrip_residuo']),
            'code_res'  => $row['code_res'] 
        );
    }
    echo json_encode($json);
} else {
    echo json_encode(array('err' => true, 'mensaje' => 'Error cargando códigos'));
}

mysqli_close($con);
?>
