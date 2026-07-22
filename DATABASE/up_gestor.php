<?php
// Endpoint para actualizar gestores de residuos con validaciones de seguridad y control de sesión por Victor Alvarez
session_start();

require('../CONFIG/sys.res.con.php');

header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['user']) || empty($_SESSION['user'])) {
    echo json_encode(array(
        'err' => true,
        'status' => 'error',
        'mensaje' => 'La sesión no es válida.'
    ), JSON_UNESCAPED_UNICODE);

    mysqli_close($con);
    exit;
}

$rol = (int) ($_SESSION['user']['rol'] ?? 0);

if (!in_array($rol, array(1, 2), true)) {
    echo json_encode(array(
        'err' => true,
        'status' => 'warning',
        'mensaje' => 'No tienes permisos para editar datos maestros.'
    ), JSON_UNESCAPED_UNICODE);

    mysqli_close($con);
    exit;
}

$id = filter_input(
    INPUT_POST,
    'id',
    FILTER_VALIDATE_INT
);

$gestor = trim($_POST['gestor'] ?? '');
$gestor = preg_replace('/\s+/u', ' ', $gestor);

if (!$id || $id <= 0) {
    echo json_encode(array(
        'err' => true,
        'status' => 'warning',
        'mensaje' => 'No se pudo identificar el gestor.'
    ), JSON_UNESCAPED_UNICODE);

    mysqli_close($con);
    exit;
}

if ($gestor === '') {
    echo json_encode(array(
        'err' => true,
        'status' => 'warning',
        'mensaje' => 'El nombre del gestor es obligatorio.'
    ), JSON_UNESCAPED_UNICODE);

    mysqli_close($con);
    exit;
}

if (mb_strlen($gestor, 'UTF-8') > 150) {
    echo json_encode(array(
        'err' => true,
        'status' => 'warning',
        'mensaje' => 'El nombre del gestor es demasiado largo.'
    ), JSON_UNESCAPED_UNICODE);

    mysqli_close($con);
    exit;
}

$nombreNormalizado = mb_strtoupper(
    $gestor,
    'UTF-8'
);

$queryDuplicado = "
    SELECT PK_gestor
    FROM gestor
    WHERE TRIM(gestor_res) = ?
      AND PK_gestor <> ?
    LIMIT 1
";

$stmtDuplicado = mysqli_prepare(
    $con,
    $queryDuplicado
);

if (!$stmtDuplicado) {
    echo json_encode(array(
        'err' => true,
        'status' => 'error',
        'mensaje' => 'No fue posible validar el nombre del gestor.'
    ), JSON_UNESCAPED_UNICODE);

    mysqli_close($con);
    exit;
}

mysqli_stmt_bind_param(
    $stmtDuplicado,
    'si',
    $nombreNormalizado,
    $id
);

mysqli_stmt_execute($stmtDuplicado);
mysqli_stmt_store_result($stmtDuplicado);

$existeDuplicado = mysqli_stmt_num_rows(
    $stmtDuplicado
) > 0;

mysqli_stmt_close($stmtDuplicado);

if ($existeDuplicado) {
    echo json_encode(array(
        'err' => true,
        'status' => 'warning',
        'mensaje' => 'El gestor ya se encuentra registrado.'
    ), JSON_UNESCAPED_UNICODE);

    mysqli_close($con);
    exit;
}

$queryActualizar = "
    UPDATE gestor
    SET gestor_res = ?
    WHERE PK_gestor = ?
";

$stmtActualizar = mysqli_prepare(
    $con,
    $queryActualizar
);

if (!$stmtActualizar) {
    echo json_encode(array(
        'err' => true,
        'status' => 'error',
        'mensaje' => 'No fue posible preparar la actualización.'
    ), JSON_UNESCAPED_UNICODE);

    mysqli_close($con);
    exit;
}

mysqli_stmt_bind_param(
    $stmtActualizar,
    'si',
    $nombreNormalizado,
    $id
);

if (mysqli_stmt_execute($stmtActualizar)) {
    echo json_encode(array(
        'err' => false,
        'status' => 'success',
        'mensaje' => 'Gestor actualizado correctamente.'
    ), JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(array(
        'err' => true,
        'status' => 'error',
        'mensaje' => 'No fue posible actualizar el gestor.'
    ), JSON_UNESCAPED_UNICODE);
}

mysqli_stmt_close($stmtActualizar);
mysqli_close($con);