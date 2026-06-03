<?php
require('../CONFIG/sys.res.con.php');

$query = "SELECT PK_cd_hse_rp, code_rp FROM code_hse_res_p ORDER BY code_rp ASC";
$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'PK_codigo'   => $row['PK_cd_hse_rp'],
            'codigo_nom'  => $row['code_rp']
        );
    }
    echo json_encode($json);
} else {
    echo json_encode(array('err' => true, 'mensaje' => 'Error cargando códigos'));
}

mysqli_close($con);
?>
