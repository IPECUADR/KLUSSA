<?php
require('../CONFIG/sys.res.con.php');

$query = "SELECT * FROM t_combustible  ORDER BY PK_t_com ASC";
$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'PK_t_com'=> $row['PK_t_com'],
            't_com' => strtoupper($row['t_com'])
        );
    }
    echo json_encode($json);
} else {
    echo json_encode(array('err' => true, 'mensaje' => 'Error cargando meses'));
}

mysqli_close($con);
?>