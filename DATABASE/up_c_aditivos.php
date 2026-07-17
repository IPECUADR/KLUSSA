<?php
// Endpoint para actualizar un registro de consumo de aditivos por Victor Alvarez
require('../CONFIG/sys.res.con.php');

header('Content-Type: application/json; charset=utf-8');

$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);

$fecha = trim($_POST['fecha'] ?? '');
$pozo = trim($_POST['pozo'] ?? '');
$responsable = trim($_POST['responsable'] ?? '');

$mes = filter_input(INPUT_POST, 'mes', FILTER_VALIDATE_INT);
$maquina = filter_input(INPUT_POST, 'maquina', FILTER_VALIDATE_INT);
$aditivo = filter_input(INPUT_POST, 'aditivo', FILTER_VALIDATE_INT);
$proyecto = filter_input(INPUT_POST, 'proyecto', FILTER_VALIDATE_INT);

$kgTexto = trim($_POST['kg'] ?? '');
$litrosTexto = trim($_POST['litros'] ?? '');

if (
    !$id ||
    $fecha === '' ||
    $pozo === '' ||
    !$mes ||
    !$maquina ||
    !$aditivo ||
    !$proyecto ||
    $responsable === '' ||
    $kgTexto === '' ||
    $litrosTexto === ''
) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'warning',
            'mensaje' => 'Completa todos los campos obligatorios.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

if (!is_numeric($kgTexto) || !is_numeric($litrosTexto)) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'warning',
            'mensaje' => 'Los consumos en kg y litros deben ser numéricos.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

$kg = (float) $kgTexto;
$litros = (float) $litrosTexto;

if ($kg < 0 || $litros < 0) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'warning',
            'mensaje' => 'Ingresa solamente KG o solamente Litros.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

if ($kg == 0 && $litros == 0) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'warning',
            'mensaje' => 'Ingresa un consumo mayor que cero en kg o litros.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

$query = "
    UPDATE c_aditivos
    SET
        fc_in_c_ad = ?,
        FK_mes = ?,
        FK_maquina = ?,
        pozo_c_ad = ?,
        FK_ad_rs = ?,
        kg_c_ad = ?,
        lit_c_ad = ?,
        FK_pro = ?,
        rp_in_c_ad = ?
    WHERE PK_c_ad = ?
";

$stmt = mysqli_prepare($con, $query);

if (!$stmt) {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'error',
            'mensaje' => 'No fue posible preparar la actualización.'
        ),
        JSON_UNESCAPED_UNICODE
    );

    mysqli_close($con);
    exit;
}

mysqli_stmt_bind_param(
    $stmt,
    'siisiddisi',
    $fecha,
    $mes,
    $maquina,
    $pozo,
    $aditivo,
    $kg,
    $litros,
    $proyecto,
    $responsable,
    $id
);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(
        array(
            'err' => false,
            'status' => 'success',
            'mensaje' => 'Registro actualizado correctamente.'
        ),
        JSON_UNESCAPED_UNICODE
    );
} else {
    echo json_encode(
        array(
            'err' => true,
            'status' => 'error',
            'mensaje' => 'No fue posible actualizar el registro.'
        ),
        JSON_UNESCAPED_UNICODE
    );
}

mysqli_stmt_close($stmt);
mysqli_close($con);
