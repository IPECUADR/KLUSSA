<?php
//endpoint para calcular el consumo total de energía en kWh según los filtros proporcionados (mes y agencia) por victor Alvarez
require('../CONFIG/sys.res.con.php');

header('Content-Type: application/json; charset=utf-8');

$mes = $_POST['mes'] ?? '';
$agencia = $_POST['agencia'] ?? '';

$filtros = array();

if ($mes !== '') {
    $mesSeguro = mysqli_real_escape_string($con, $mes);
    $filtros[] = "c_en_ag.FK_mes = '$mesSeguro'";
}

if ($agencia !== '') {
    $agenciaSegura = mysqli_real_escape_string($con, $agencia);
    $filtros[] = "c_en_ag.FK_ag = '$agenciaSegura'";
}

$where = '';

if (!empty($filtros)) {
    $where = ' WHERE ' . implode(' AND ', $filtros);
}

$query = "
    SELECT
        ROUND(
            COALESCE(SUM(c_en_ag.c_en_ag), 0),
            2
        ) AS total_kwh
    FROM c_en_ag
    $where
";

$result = mysqli_query($con, $query);

if ($result) {
    $row = mysqli_fetch_assoc($result);

    echo json_encode(
        array(
            'err' => false,
            'total_kwh' => (float) ($row['total_kwh'] ?? 0)
        ),
        JSON_UNESCAPED_UNICODE
    );
} else {
    echo json_encode(
        array(
            'err' => true,
            'mensaje' => 'No fue posible calcular el consumo total de energía.'
        ),
        JSON_UNESCAPED_UNICODE
    );
}

mysqli_close($con);
