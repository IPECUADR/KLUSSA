<?php

session_start();

require('../CONFIG/sys.res.con.php');

if (!isset($_SESSION['user']) || empty($_SESSION['user'])) {
    echo json_encode(array(
        'err' => true,
        'status' => 'error',
        'mensaje' => 'La sesión no es válida.'
    ));

    mysqli_close($con);
    exit;
}

$rol = (int) ($_SESSION['user']['rol'] ?? 0);

if (!in_array($rol, array(1, 2), true)) {
    echo json_encode(array(
        'err' => true,
        'status' => 'warning',
        'mensaje' => 'No tienes permisos para editar datos maestros.'
    ));

    mysqli_close($con);
    exit;
}

$id = filter_input(
    INPUT_POST,
    'id',
    FILTER_VALIDATE_INT
);

$aditivo = trim($_POST['aditivo'] ?? '');
$aditivo = preg_replace('/\s+/u', ' ', $aditivo);

if (!$id || $id <= 0) {
    echo json_encode(array(
        'err' => true,
        'status' => 'warning',
        'mensaje' => 'No se pudo identificar el aditivo.'
    ));

    mysqli_close($con);
    exit;
}

if ($aditivo === '') {
    echo json_encode(array(
        'err' => true,
        'status' => 'warning',
        'mensaje' => 'El nombre del aditivo es obligatorio.'
    ));

    mysqli_close($con);
    exit;
}

$nombreNormalizado = mb_strtoupper(
    $aditivo,
    'UTF-8'
);

$queryDuplicado = "
    SELECT PK_ad
    FROM aditivos_rs
    WHERE UPPER(TRIM(ad_rs)) = ?
      AND PK_ad <> ?
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
        'mensaje' => 'No fue posible verificar el nombre del aditivo.'
    ));

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

mysqli_stmt_bind_result(
    $stmtDuplicado,
    $idDuplicado
);

$existeDuplicado = mysqli_stmt_fetch(
    $stmtDuplicado
);

mysqli_stmt_close($stmtDuplicado);

if ($existeDuplicado) {
    echo json_encode(array(
        'err' => true,
        'status' => 'warning',
        'mensaje' => 'El aditivo ya se encuentra registrado.'
    ));

    mysqli_close($con);
    exit;
}

$queryActualizar = "
    UPDATE aditivos_rs
    SET ad_rs = ?
    WHERE PK_ad = ?
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
    ));

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
        'mensaje' => 'Aditivo actualizado correctamente.'
    ));
} else {
    echo json_encode(array(
        'err' => true,
        'status' => 'error',
        'mensaje' => 'No fue posible actualizar el aditivo.'
    ));
}

mysqli_stmt_close($stmtActualizar);
mysqli_close($con);