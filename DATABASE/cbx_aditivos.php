<?php
require('../CONFIG/sys.res.con.php');

$query = "SELECT * FROM aditivos_rs ORDER BY PK_ad ASC";
$result = mysqli_query($con, $query);

if ($result) {
    $json = array('err' => false);
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'ad_rs'  => $row['ad_rs'],
            'PK_ad' => $row['PK_ad']
        );
    }
    echo json_encode($json);
} else {
    echo json_encode(array('err' => true, 'mensaje' => 'Error cargando elementos'));
}

mysqli_close($con);
?>