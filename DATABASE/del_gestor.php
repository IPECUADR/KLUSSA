<?php
// Actualización de endpoint para eliminar gestores de residuos con validaciones de seguridad y control de sesión por Victor Alvarez
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
        'mensaje' => 'No se pudo identificar el gestor.'
    ));

    mysqli_close($con);
    exit;
}


// Verificar si el gestor está siendo utilizado en la tabla dispocicion
$queryUso = "
    SELECT COUNT(*) AS total
    FROM dispocicion
    WHERE FK_gest = $id
";

$resultadoUso = mysqli_query($con, $queryUso);

if (!$resultadoUso) {
    echo json_encode(array(
        'status' => 'error',
        'mensaje' => 'No fue posible verificar el uso del gestor.'
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
        'No se puede eliminar el gestor porque está utilizado en ' .
            $totalUsos .
            ' registro(s) de disposición.'
    ));

    mysqli_close($con);
    exit;
}


$del = "DELETE  FROM    gestor  where PK_gestor  = $id";

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
