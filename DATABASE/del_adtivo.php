<?php

session_start();

require('../CONFIG/sys.res.con.php');

if (!isset($_SESSION['user']) || empty($_SESSION['user'])) {
    echo json_encode(array(
        'status' => 'error',
        'mensaje' => 'La sesión no es válida.'
    ));

    mysqli_close($con);
    exit;
}

$rol = (int) ($_SESSION['user']['rol'] ?? 0);

if (!in_array($rol, array(1, 2), true)) {
    echo json_encode(array(
        'status' => 'warning',
        'mensaje' => 'No tienes permisos para eliminar datos maestros.'
    ));

    mysqli_close($con);
    exit;
}

$id = filter_input(
    INPUT_POST,
    'id_delete',
    FILTER_VALIDATE_INT
);

if (!$id || $id <= 0) {
    echo json_encode(array(
        'status' => 'warning',
        'mensaje' => 'No se pudo identificar el aditivo.'
    ));

    mysqli_close($con);
    exit;
}


$queryUso = "
    SELECT COUNT(*) AS total
    FROM c_aditivos
    WHERE FK_ad_rs = $id
";

$resultadoUso = mysqli_query($con, $queryUso);

if (!$resultadoUso) {
    echo json_encode(array(
        'status' => 'error',
        'mensaje' => 'No fue posible verificar el uso del aditivo.'
    ));

    mysqli_close($con);
    exit;
}

$uso = mysqli_fetch_assoc($resultadoUso);
$totalUsos = (int) ($uso['total'] ?? 0);

if ($totalUsos > 0) {
    echo json_encode(array(
        'status' => 'warning',
        'mensaje' =>
        'No se puede eliminar el aditivo porque está utilizado en ' .
            $totalUsos .
            ' registro(s) de consumo.'
    ));

    mysqli_close($con);
    exit;
}


$del = "DELETE  FROM    aditivos_rs  where PK_ad   = $id";

$delte = mysqli_query($con, $del);





if ($delte) {
    echo json_encode([
        'status' => 'success',
        'mensaje' => 'Registro eliminado de forma exitosa.'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'mensaje' => 'Error al intentar eliminar la medida de gestion.'
    ]);
}








mysqli_close($con);
