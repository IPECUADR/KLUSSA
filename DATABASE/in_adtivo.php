<?php
//Actualizacion de endpoint para registrar aditivos de residuos con validaciones de seguridad y control de sesión por victor Alvarez
session_start();

require('../CONFIG/sys.res.con.php');

header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['user']) || empty($_SESSION['user'])) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'error',
            'mensaje' => 'La sesión no es válida.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

$rol = (int) ($_SESSION['user']['rol'] ?? 0);

$rolesPermitidos = array(1, 2);

if (!in_array($rol, $rolesPermitidos, true)) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'warning',
            'mensaje' => 'No tienes permisos para crear datos maestros.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

$aditivo = trim($_POST['aditivos'] ?? '');

$aditivo = preg_replace('/\s+/u', ' ', $aditivo);

if ($aditivo === '') {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'warning',
            'mensaje' => 'El nombre del aditivo es obligatorio.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

if (mb_strlen($aditivo, 'UTF-8') > 150) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'warning',
            'mensaje' => 'El nombre del aditivo es demasiado largo.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

function normalizarNombreAditivo($nombre)
{
    $nombre = trim((string) $nombre);
    $nombre = preg_replace('/\s+/u', ' ', $nombre);

    return mb_strtoupper($nombre, 'UTF-8');
}

$nombreNormalizado = normalizarNombreAditivo($aditivo);

$queryCatalogo = "
    SELECT
        PK_ad,
        ad_rs
    FROM aditivos_rs
";

$resultadoCatalogo = mysqli_query($con, $queryCatalogo);

if (!$resultadoCatalogo) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'error',
            'mensaje' => 'No fue posible verificar el catálogo de aditivos.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

while ($registro = mysqli_fetch_assoc($resultadoCatalogo)) {
    $nombreExistente = normalizarNombreAditivo(
        $registro['ad_rs'] ?? ''
    );

    if ($nombreExistente === $nombreNormalizado) {
        echo json_encode(
            array(
                'err' => true,
                'status' => 'warning',
                'mensaje' => 'El aditivo ya se encuentra registrado.'
            ),
            JSON_UNESCAPED_UNICODE
        );

        mysqli_free_result($resultadoCatalogo);
        mysqli_close($con);
        exit;
    }
}

mysqli_free_result($resultadoCatalogo);

$nombreParaGuardar = $nombreNormalizado;

$queryInsertar = "
    INSERT INTO aditivos_rs (
        ad_rs
    ) VALUES (?)
";

$stmt = mysqli_prepare($con, $queryInsertar);

if (!$stmt) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'error',
            'mensaje' => 'No fue posible preparar el registro.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

mysqli_stmt_bind_param(
    $stmt,
    's',
    $nombreParaGuardar
);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(
        array(
            'err' => false,
            'status' => 'success',
            'mensaje' => 'Aditivo registrado exitosamente.'
        ),
        JSON_UNESCAPED_UNICODE
    );
} else {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'error',
            'mensaje' => 'No se pudo completar el registro.'
        ),
        JSON_UNESCAPED_UNICODE
    );
}

mysqli_stmt_close($stmt);
mysqli_close($con);
