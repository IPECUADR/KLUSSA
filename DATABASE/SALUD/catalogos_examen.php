<?php

require_once __DIR__ . '/../../CONFIG/sys.salud.pdo.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $catalogos = [];

    $catalogos['pacientes'] = $pdoSalud
        ->query("
            SELECT 
                PK_prs,
                hcl_num,
                nombre_prs,
                apellido_ps,
                ci_prs
            FROM persona
            WHERE FK_est_p = 1
            ORDER BY apellido_ps ASC, nombre_prs ASC
        ")
        ->fetchAll();

    $catalogos['tipos_examen'] = $pdoSalud
        ->query("
            SELECT 
                PK_t_ex,
                tp_examen
            FROM t_examen
            ORDER BY tp_examen ASC
        ")
        ->fetchAll();

    $catalogos['anios'] = $pdoSalud
        ->query("
            SELECT
                PK_prog_a,
                an_prog
            FROM prog_a
            ORDER BY an_prog DESC
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
        'mensaje' => 'Error al cargar catálogos de exámenes'
    ], JSON_UNESCAPED_UNICODE);
}