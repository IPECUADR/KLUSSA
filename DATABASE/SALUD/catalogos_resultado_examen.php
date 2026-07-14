<?php

require_once __DIR__ . '/../../CONFIG/sys.salud.pdo.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $catalogos = [];

    $catalogos['estados_examen'] = $pdoSalud
        ->query("
            SELECT
                PK_est_exam,
                estado_exam,
                des_est_exam
            FROM est_exam
            ORDER BY PK_est_exam ASC
        ")
        ->fetchAll();

    $catalogos['validado'] = $pdoSalud
        ->query("
            SELECT
                PK_v_vrd_ex,
                valor_vrd_ex
            FROM v_verdad_ex
            ORDER BY PK_v_vrd_ex ASC
        ")
        ->fetchAll();

    echo json_encode([
        'err' => false,
        'data' => $catalogos
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    error_log($e->getMessage());

    echo json_encode([
        'err' => true,
        'mensaje' => 'Error al cargar catálogos de resultado de examen'
    ], JSON_UNESCAPED_UNICODE);
}