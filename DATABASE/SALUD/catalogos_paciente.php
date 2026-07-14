<?php

require_once __DIR__ . '/../../CONFIG/sys.salud.pdo.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $catalogos = [];

    $catalogos['sexo'] = $pdoSalud
        ->query("SELECT PK_sexo_p, sexo_p FROM sexo_p ORDER BY PK_sexo_p ASC")
        ->fetchAll();

    $catalogos['grupo_sanguineo'] = $pdoSalud
        ->query("SELECT PK_g_sg, g_sanginio FROM grupo_sg ORDER BY PK_g_sg ASC")
        ->fetchAll();

    $catalogos['grupo_atencion'] = $pdoSalud
        ->query("SELECT PK_g_atn, g_atencion FROM g_atencion ORDER BY PK_g_atn ASC")
        ->fetchAll();

    $catalogos['cargo'] = $pdoSalud
        ->query("SELECT PK_cg, cargo FROM cargo ORDER BY cargo ASC")
        ->fetchAll();

    $catalogos['agencia'] = $pdoSalud
        ->query("SELECT PK_ag, agencia_ag FROM agencia ORDER BY agencia_ag ASC")
        ->fetchAll();

    echo json_encode([
        'err' => false,
        'data' => $catalogos
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    error_log($e->getMessage());

    echo json_encode([
        'err' => true,
        'mensaje' => 'Error al cargar catálogos de paciente'
    ], JSON_UNESCAPED_UNICODE);
}