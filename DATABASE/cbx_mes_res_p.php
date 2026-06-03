<?php
require('../CONFIG/sys.res.con.php');

$query = "SELECT * FROM mes  ORDER BY PK_mes ASC";
$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'PK_mes'=> $row['PK_mes'],
            'mes_res' => $row['mes_res']
        );
    }
    echo json_encode($json);
} else {
    echo json_encode(array('err' => true, 'mensaje' => 'Error cargando meses'));
}

mysqli_close($con);
?>