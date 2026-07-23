<?php
//Endpoint para calcular los totales de aditivos según los filtros seleccionados por victor alvarez
require('../CONFIG/sys.res.con.php');

header('Content-Type: application/json; charset=utf-8');

$mes = $_POST['mes'] ?? '';
$agencia = $_POST['agencia'] ?? '';
$aditivo = $_POST['adt'] ?? '';
$maquina = $_POST['mq'] ?? '';

$filtros = array();

if ($mes !== '') {
    $mesSeguro = mysqli_real_escape_string($con, $mes);
    $filtros[] = "c_aditivos.FK_mes = '$mesSeguro'";
}

if ($agencia !== '') {
    $agenciaSegura = mysqli_real_escape_string($con, $agencia);
    $filtros[] = "c_aditivos.FK_pro = '$agenciaSegura'";
}

if ($aditivo !== '') {
    $aditivoSeguro = mysqli_real_escape_string($con, $aditivo);
    $filtros[] = "c_aditivos.FK_ad_rs = '$aditivoSeguro'";
}

if ($maquina !== '') {
    $maquinaSegura = mysqli_real_escape_string($con, $maquina);
    $filtros[] = "c_aditivos.FK_maquina = '$maquinaSegura'";
}

$where = '';

if (!empty($filtros)) {
    $where = ' WHERE ' . implode(' AND ', $filtros);
}

$query = "
    SELECT
        ROUND(COALESCE(SUM(c_aditivos.kg_c_ad), 0), 2) AS total_kg,
        ROUND(COALESCE(SUM(c_aditivos.lit_c_ad), 0), 2) AS total_litros
    FROM c_aditivos
    $where
";

$result = mysqli_query($con, $query);

if ($result) {
    $row = mysqli_fetch_assoc($result);

    echo json_encode(
        array(
            'err' => false,
            'total_kg' => (float) ($row['total_kg'] ?? 0),
            'total_litros' => (float) ($row['total_litros'] ?? 0)
        ),
        JSON_UNESCAPED_UNICODE
    );
} else {
    echo json_encode(
        array(
            'err' => true,
            'mensaje' => 'No fue posible calcular los totales de aditivos.'
        ),
        JSON_UNESCAPED_UNICODE
    );
}

mysqli_close($con);