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

    $catalogos['tipos_vacuna'] = $pdoSalud
        ->query("
            SELECT 
                PK_t_vc,
                t_vacuna,
                des_t_vacuna
            FROM t_vacuna
            ORDER BY t_vacuna ASC
        ")
        ->fetchAll();

    $catalogos['dosis'] = $pdoSalud
        ->query("
            SELECT 
                PK_ds,
                Dosis,
                des_ds
            FROM dosis
            ORDER BY PK_ds ASC
        ")
        ->fetchAll();

    $catalogos['marcas'] = $pdoSalud
        ->query("
            SELECT 
                PK_m_vc,
                Marca
            FROM marca_vc
            ORDER BY Marca ASC
        ")
        ->fetchAll();

    $catalogos['estados'] = $pdoSalud
        ->query("
            SELECT 
                PK_est_vc,
                estado_vacuna
            FROM est_vacuna
            ORDER BY PK_est_vc ASC
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
        'mensaje' => 'Error al cargar catálogos de vacunas'
    ], JSON_UNESCAPED_UNICODE);
}