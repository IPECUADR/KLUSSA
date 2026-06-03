<?php
require('../CONFIG/sys.res.con.php');

$query = "SELECT * FROM proyectos ORDER BY proyecto ASC";
$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'PK_pro' => $row['PK_pro'],
            'proyecto'=> strtoupper($row['proyecto'])
        );
    }
    echo json_encode($json);
} else {
    echo json_encode(array('err' => true, 'mensaje' => 'Error cargando agencias'));
}

mysqli_close($con);
?>
