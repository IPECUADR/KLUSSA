<?php
require('../CONFIG/sys.res.con.php');

$query = "SELECT * FROM t_residuo where t_res_p= 2 ORDER BY PK_t_res ASC";
$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'PK_t_res'  => $row['PK_t_res'],
            't_residuo' => strtoupper($row['t_residuo'])
        );
    }
    echo json_encode($json);
} else {
    echo json_encode(array('err' => true, 'mensaje' => 'Error cargando manifiestos'));
}

mysqli_close($con);
?>
