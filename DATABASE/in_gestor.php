<?php
// Actualización de endpoint para registrar gestores de residuos con validaciones de seguridad y control de sesión por Victor Alvarez
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

if (!in_array($rol, array(1, 2), true)) {
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

$gestor = trim($_POST['gestor'] ?? '');
$gestor = preg_replace('/\s+/u', ' ', $gestor);

if ($gestor === '') {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'warning',
            'mensaje' => 'El nombre del gestor es obligatorio.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

if (mb_strlen($gestor, 'UTF-8') > 150) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'warning',
            'mensaje' => 'El nombre del gestor es demasiado largo.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

function normalizarNombreGestor($nombre)
{
    $nombre = trim((string) $nombre);
    $nombre = preg_replace('/\s+/u', ' ', $nombre);

    return mb_strtoupper($nombre, 'UTF-8');
}

$nombreNormalizado = normalizarNombreGestor($gestor);

$queryCatalogo = "
    SELECT
        PK_gestor,
        gestor_res
    FROM gestor
";

$resultadoCatalogo = mysqli_query($con, $queryCatalogo);

if (!$resultadoCatalogo) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'error',
            'mensaje' => 'No fue posible verificar el catálogo de gestores.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

while ($registro = mysqli_fetch_assoc($resultadoCatalogo)) {
    $nombreExistente = normalizarNombreGestor(
        $registro['gestor_res'] ?? ''
    );

    if ($nombreExistente === $nombreNormalizado) {
        echo json_encode(
            array(
                'err' => true,
                'status' => 'warning',
                'mensaje' => 'El gestor ya se encuentra registrado.'
            ),
            JSON_UNESCAPED_UNICODE
        );

        mysqli_free_result($resultadoCatalogo);
        mysqli_close($con);
        exit;
    }
}

mysqli_free_result($resultadoCatalogo);

$queryInsertar = "
    INSERT INTO gestor (
        gestor_res
    ) VALUES (?)
";

$stmtInsertar = mysqli_prepare($con, $queryInsertar);

if (!$stmtInsertar) {
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
    $stmtInsertar,
    's',
    $nombreNormalizado
);

if (mysqli_stmt_execute($stmtInsertar)) {
    echo json_encode(
        array(
            'err' => false,
            'status' => 'success',
            'mensaje' => 'Gestor registrado exitosamente.'
        ),
        JSON_UNESCAPED_UNICODE
    );
} else {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'error',
            'mensaje' => 'No fue posible registrar el gestor.'
        ),
        JSON_UNESCAPED_UNICODE
    );
}

mysqli_stmt_close($stmtInsertar);
mysqli_close($con);
