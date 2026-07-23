<?php
// Endpoint para calcular el total de agua en m3 y litros según los filtros proporcionados (mes y agencia). por victor Alvarez
require('../CONFIG/sys.res.con.php');

header('Content-Type: application/json; charset=utf-8');

$mes = trim($_POST['mes'] ?? '');
$agencia = trim($_POST['agencia'] ?? '');

$filtros = array();

if ($mes !== '') {
    $mesSeguro = mysqli_real_escape_string($con, $mes);

    $filtros[] = "
        c_agua_ag.FK_mes = '$mesSeguro'
    ";
}

if ($agencia !== '') {
    $agenciaSegura = mysqli_real_escape_string($con, $agencia);

    $filtros[] = "
        c_agua_ag.FK_ag = '$agenciaSegura'
    ";
}

$where = '';

if (!empty($filtros)) {
    $where = ' WHERE ' . implode(' AND ', $filtros);
}

$query = "
    SELECT
        ROUND(
            COALESCE(SUM(c_agua_ag.cm_m_c), 0),
            2
        ) AS total_m3,

        ROUND(
            COALESCE(SUM(c_agua_ag.cm_lit), 0),
            2
        ) AS total_litros

    FROM c_agua_ag

    $where
";

$result = mysqli_query($con, $query);

if ($result) {
    $row = mysqli_fetch_assoc($result);

    echo json_encode(
        array(
            'err' => false,
            'total_m3' => (float) ($row['total_m3'] ?? 0),
            'total_litros' => (float) ($row['total_litros'] ?? 0)
        ),
        JSON_UNESCAPED_UNICODE
    );
} else {
    echo json_encode(
        array(
            'err' => true,
            'mensaje' => 'No fue posible calcular los totales de agua.'
        ),
        JSON_UNESCAPED_UNICODE
    );
}

mysqli_close($con);
